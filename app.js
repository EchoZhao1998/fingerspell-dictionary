/*
  app.js — ASL Fingerspelling Practice
  ======================================================================
  HOW TO READ THIS FILE (it runs top-to-bottom, once, when the page loads)

   1. State variables   — the data the app remembers while it runs
                          (current word, score, the round queue, etc.).
   2. Frame builder     — creates the 26 letter images one time at startup.
   3. DOM references     — `const x = document.getElementById("...")` grabs
                          the on-page elements so we can update them later.
   4. Event listeners    — "when the user does X, run function Y"
                          (e.g. click Check Answer -> checkAnswer()).
   5. Persistence        — save/load your history in the browser
                          (localStorage; survives a page refresh).
   6. Results rendering  — fills the stat cards + the history table.
   7. Round logic        — shuffles words into a deck, tracks progress,
                          ends the round after N words.
   8. Animation engine   — fades the letter images in one by one. This is
                          the "video" — there is no real video file.
   9. Per-word flow      — loadNextWord -> checkAnswer / giveUp -> finalizeUI.
  10. Dictionary lookup   — fetches a definition when you tap a history word.
  11. Boot (very bottom)  — the (async () => { ... })() block that actually
                          STARTS everything. Read this last; it calls the rest.

  Two ideas that help when reading JS:
   - Function *declarations* (`function foo(){}`) are "hoisted": the browser
     reads them all first, so foo() can be called before it appears in the file.
   - Nothing happens until something *calls* a function. The chain of calls
     begins at the boot block at the bottom.
  ----------------------------------------------------------------------
*/

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ASSET = (l) => `assets/letters/Sign_language_${l}.svg`;

// State
let packs = [];                 // [{id, name, type, words, ...}]
let packsById = {};             // {id -> pack}
let currentPackId = "short";
let currentWord = "";
let currentSign = null;         // ASL-LEX gloss for the current word (deep-link), or null
let currentIndex = 0;           // lifetime word counter (drives history numbering)
let score = 0;
let total = 0;
let speed = 1;                  // driven by the Difficulty selector
let isRevealed = false;
let animationTimer = null;
let progressTimer = null;
let animStart = 0;
let animDuration = 0;
let currentReplays = 0;         // replays consumed for the current word
let lastGuess = "";             // last input attempted on current word

// Round state — word-count based
let roundSize = 10;             // words per round
let roundIndex = 0;             // 1-based word number within the round
let roundCorrect = 0;           // correct answers in current round
let roundFinalized = 0;         // total finalized words in current round
let roundComplete = false;
let roundQueue = [];            // shuffled, no-replacement queue for the current pack

// History (persisted)
const STORAGE_KEY = "fsd_attempts_v1";
let attempts = [];              // [{word, packId, packName, lastGuess, outcome, replays, ts}]

// Build the layered frame stack (one img per letter, all preloaded)
const player = document.getElementById("player");
const frameMap = {};
LETTERS.forEach(l => {
  const f = document.createElement("div");
  f.className = "frame";
  f.dataset.letter = l;
  const img = document.createElement("img");
  img.src = ASSET(l);
  img.alt = `ASL letter ${l}`;
  f.appendChild(img);
  player.insertBefore(f, player.firstChild);
  frameMap[l] = f;
});

// DOM refs
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const answerEl = document.getElementById("answer");
const checkBtn = document.getElementById("check-btn");
const feedbackEl = document.getElementById("feedback");
const actionRow = document.getElementById("action-row");
const giveupBtn = document.getElementById("giveup-btn");
const nextBtn = document.getElementById("next-btn");
const dictPanel = document.getElementById("dict-panel");
const replayBtn = document.getElementById("replay-btn");
const difficultySelect = document.getElementById("difficulty");
const packSelect = document.getElementById("pack");
const wordCountsSelect = document.getElementById("word-counts");
const roundProgressEl = document.getElementById("round-progress");
const roundBanner = document.getElementById("round-banner");
const roundBannerTitle = document.getElementById("round-banner-title");
const roundBannerSub = document.getElementById("round-banner-sub");
const newRoundBtn = document.getElementById("new-round-btn");
const aslSignLink = document.getElementById("asl-sign-link");

// Alphabet + best-practice modal refs
const abcBtn = document.getElementById("abc-btn");
const abcModal = document.getElementById("abc-modal");
const abcClose = document.getElementById("abc-close");
const refBestPracticeBtn = document.getElementById("ref-bestpractice-btn");
const bpModal = document.getElementById("bp-modal");
const bpClose = document.getElementById("bp-close");

// Stats / history
const resultsBadge = document.getElementById("results-badge");
const statTotal = document.getElementById("stat-total");
const statCorrect = document.getElementById("stat-correct");
const statAccuracy = document.getElementById("stat-accuracy");
const historyBody = document.getElementById("history-body");
const historyClearBtn = document.getElementById("history-clear");

// Tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = {
  practice: document.getElementById("tab-practice"),
  results: document.getElementById("tab-results")
};
const timeEl = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");

// ── Difficulty (speed) handling ──────────────────────
difficultySelect.addEventListener("change", e => {
  speed = parseFloat(e.target.value);
  startNewRound();
});

// ── Category (pack) handling ─────────────────────────
packSelect.addEventListener("change", e => {
  currentPackId = e.target.value;
  startNewRound();
});

// ── Word-counts handling ─────────────────────────────
wordCountsSelect.addEventListener("change", e => {
  roundSize = parseInt(e.target.value, 10);
  startNewRound();
});

// New round button
newRoundBtn.addEventListener("click", startNewRound);

// ── Modals ───────────────────────────────────────────
function openModal(m) { m.classList.add("open"); }
function closeModal(m) { m.classList.remove("open"); }
abcBtn.addEventListener("click", () => openModal(abcModal));
abcClose.addEventListener("click", () => closeModal(abcModal));
abcModal.addEventListener("click", e => { if (e.target === abcModal) closeModal(abcModal); });
refBestPracticeBtn.addEventListener("click", () => openModal(bpModal));
bpClose.addEventListener("click", () => closeModal(bpModal));
bpModal.addEventListener("click", e => { if (e.target === bpModal) closeModal(bpModal); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (abcModal.classList.contains("open")) closeModal(abcModal);
    if (bpModal.classList.contains("open")) closeModal(bpModal);
  }
});

// Tab switching
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    tabButtons.forEach(b => {
      const isActive = b.dataset.tab === tab;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", isActive);
    });
    Object.entries(tabPanels).forEach(([k, p]) => {
      p.classList.toggle("active", k === tab);
    });
    if (tab === "results") renderResultsTab();
  });
});

// History word lookup — clicking a word in the table looks it up in the panel above.
historyBody.addEventListener("click", e => {
  const btn = e.target.closest(".history-word-btn");
  if (!btn) return;
  lookup(btn.dataset.word);
});

// History clear
historyClearBtn.addEventListener("click", () => {
  if (!attempts.length) return;
  if (confirm(`Delete all ${attempts.length} history entries? This can't be undone.`)) {
    attempts = [];
    saveAttempts();
    renderResultsTab();
    updateResultsBadge();
  }
});

// ── Persistence ──────────────────────────────────────
function loadAttempts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    attempts = raw ? JSON.parse(raw) : [];
  } catch (e) { attempts = []; }
}
function saveAttempts() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts)); }
  catch (e) { /* private browsing, quota, etc. — silently skip */ }
}
function recordAttempt(outcome) {
  const pack = packsById[currentPackId];
  attempts.push({
    word: currentWord,
    packId: currentPackId,
    packName: pack ? pack.name : currentPackId,
    lastGuess: lastGuess || "",
    outcome: outcome,                  // 'correct' or 'gaveup'
    replays: currentReplays,
    ts: Date.now()
  });
  saveAttempts();
  updateResultsBadge();
}
function updateResultsBadge() {
  resultsBadge.textContent = attempts.length;
}

// ── Stats + history rendering ────────────────────────
function renderResultsTab() {
  const t = attempts.length;
  const correct = attempts.filter(a => a.outcome === "correct").length;
  const acc = t ? Math.round((correct / t) * 100) : 0;
  statTotal.textContent = t;
  statCorrect.textContent = correct;
  statAccuracy.textContent = acc + "%";
  renderHistory();
}
function renderHistory() {
  if (!attempts.length) {
    historyBody.innerHTML = `
      <div class="history-empty">
        <div class="history-empty-icon">▦</div>
        <div>No responses yet. Start practicing to see your results here.</div>
      </div>`;
    return;
  }
  const rows = attempts.slice().reverse().map(a => {
    const okClass = a.outcome === "correct" ? "ok" : "no";
    const rowClass = a.outcome === "correct" ? "row-correct" : "row-gaveup";
    const icon = a.outcome === "correct" ? "✓ correct" : "⊘ gave up";
    return `<tr class="${rowClass}">
      <td><button class="history-word-btn" data-word="${a.word}">${a.word}</button></td>
      <td class="history-guess">${a.lastGuess || "—"}</td>
      <td class="history-outcome ${okClass}">${icon}</td>
      <td class="history-pack">${a.packName}</td>
      <td class="history-time">${relTime(a.ts)}</td>
    </tr>`;
  }).join("");
  historyBody.innerHTML = `
    <div class="history-scroll">
      <table class="history-table">
        <thead><tr>
          <th>Word</th><th>Your answer</th><th>Outcome</th><th>Category</th><th>When</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}
function relTime(ts) {
  const s = Math.round((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  const d = new Date(ts);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
}

// ── Round logic (word-count based) ───────────────────
function startNewRound() {
  roundIndex = 0;
  roundCorrect = 0;
  roundFinalized = 0;
  roundComplete = false;
  roundBanner.classList.remove("show");
  buildQueue();
  answerEl.disabled = false;
  checkBtn.disabled = false;
  nextBtn.disabled = false;
  loadNextWord();
}

// Fisher–Yates shuffle into a fresh no-replacement queue for the current pack.
// This is the fix for the "words always repeat" bug: every word in a round is
// drawn from a shuffled deck, so no word recurs until the deck is exhausted.
function buildQueue() {
  const pool = (packsById[currentPackId]?.words || []).slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  roundQueue = pool;
}

// Returns {word, sign} pulled from the shuffled queue. Refills (reshuffles) if a
// round is longer than the pack, avoiding an immediate repeat across the seam.
function nextFromQueue() {
  if (!roundQueue.length) {
    const last = currentWord;
    buildQueue();
    if (roundQueue.length > 1 && entryWord(roundQueue[roundQueue.length - 1]) === last) {
      // swap the about-to-be-drawn entry with the front so we don't repeat
      [roundQueue[roundQueue.length - 1], roundQueue[0]] =
        [roundQueue[0], roundQueue[roundQueue.length - 1]];
    }
  }
  const entry = roundQueue.pop();
  if (typeof entry === "string") return { word: entry, sign: null };
  return { word: entry.w, sign: entry.s || null };
}
function entryWord(entry) {
  return typeof entry === "string" ? entry : entry.w;
}

function endRound() {
  if (roundComplete) return;
  roundComplete = true;
  const pct = roundFinalized ? Math.round((roundCorrect / roundFinalized) * 100) : 0;
  roundBannerTitle.textContent = "Round complete";
  roundBannerSub.textContent =
    `${roundCorrect} of ${roundFinalized} correct (${pct}%).`;
  roundBanner.classList.add("show");
  answerEl.disabled = true;
  checkBtn.disabled = true;
  nextBtn.disabled = true;
}
function updateRoundProgress() {
  roundProgressEl.textContent = `Word ${Math.max(1, roundIndex)} of ${roundSize}`;
}

// Load word bank (schema v4: packs array of {w,s} entries, all ASL-LEX)
async function loadWords() {
  try {
    const res = await fetch("words.json");
    const data = await res.json();
    ingestPacks(data.packs || []);
  } catch (e) {
    // Fallback when fetch is blocked (e.g. file://) — small starter set per bucket.
    ingestPacks([
      { id: "short", name: "Short — up to 4 letters", type: "asllex",
        words: [{w:"YOU",s:"you"},{w:"FOR",s:"for"},{w:"LOVE",s:"love"},{w:"HELP",s:"help"},
                {w:"WORK",s:"work"},{w:"HOME",s:"home"},{w:"GOOD",s:"good"},{w:"TIME",s:"time"},
                {w:"NAME",s:"name"},{w:"BOOK",s:"book"}] },
      { id: "medium", name: "Medium — 5 to 6 letters", type: "asllex",
        words: [{w:"THINK",s:"think"},{w:"WATER",s:"water"},{w:"HAPPY",s:"happy"},{w:"MONEY",s:"money_2"},
                {w:"HOUSE",s:"house"},{w:"FRIEND",s:"friend"},{w:"FAMILY",s:"family"},{w:"SCHOOL",s:"school"},
                {w:"PEOPLE",s:"people"},{w:"BETTER",s:"better"}] },
      { id: "long", name: "Long — 7+ letters", type: "asllex",
        words: [{w:"BECAUSE",s:"because"},{w:"NOTHING",s:"nothing"},{w:"PROBLEM",s:"problem_2"},
                {w:"PROMISE",s:"promise"},{w:"PERFECT",s:"perfect"},{w:"TOGETHER",s:"together"},
                {w:"REMEMBER",s:"remember"},{w:"UNDERSTAND",s:"understand"},{w:"IMPORTANT",s:"important"},
                {w:"DIFFERENT",s:"different"}] }
    ]);
  }
}

function ingestPacks(arr) {
  packs = arr;
  packsById = {};
  arr.forEach(p => { packsById[p.id] = p; });
  buildPackSelector();
  if (!packsById[currentPackId]) {
    currentPackId = packs[0]?.id || "short";
  }
  packSelect.value = currentPackId;
}

// Flat category selector — one option per length bucket.
function buildPackSelector() {
  packSelect.innerHTML = "";
  packs.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    packSelect.appendChild(opt);
  });
}

// Animation: overlap fade between letters
function animateWord(word, slowFactor = 1) {
  clearTimeout(animationTimer);
  clearInterval(progressTimer);
  // Reset frames
  Object.values(frameMap).forEach(f => f.classList.remove("visible", "partial"));

  const perLetterMs = 700 / (speed / slowFactor); // base 700ms per letter
  animDuration = perLetterMs * word.length;
  animStart = performance.now();

  // Progress bar
  progressTimer = setInterval(() => {
    const elapsed = performance.now() - animStart;
    const pct = Math.min(100, (elapsed / animDuration) * 100);
    progressBar.style.width = pct + "%";
    timeEl.textContent = (elapsed / 1000).toFixed(1) + "s";
    if (elapsed >= animDuration) clearInterval(progressTimer);
  }, 60);

  let i = 0;
  const dipMs = Math.max(60, Math.min(perLetterMs * 0.22, 220));
  function step() {
    // Fade out previous (only when next letter differs — same letter handled below as a dip)
    if (i > 0) {
      const prev = word[i-1];
      const nextIsSame = i < word.length && word[i] === prev;
      if (frameMap[prev] && !nextIsSame) {
        frameMap[prev].classList.remove("visible");
        frameMap[prev].classList.add("partial");
        setTimeout(() => frameMap[prev]?.classList.remove("partial"), perLetterMs * 0.4);
      }
    }
    // Render current
    if (i < word.length) {
      const cur = word[i];
      const sameAsPrev = i > 0 && cur === word[i-1];
      const f = frameMap[cur];
      if (f) {
        if (sameAsPrev) {
          // Brief blink-out then reassert — re-articulates the same handshape so
          // the user sees TWO of that letter instead of one held frame.
          f.classList.remove("visible", "partial");
          f.classList.add("dip");
          setTimeout(() => {
            if (!f) return;
            f.classList.remove("dip");
            f.classList.add("visible");
          }, dipMs);
        } else {
          f.classList.remove("partial", "dip");
          f.classList.add("visible");
        }
      }
      i++;
      animationTimer = setTimeout(step, perLetterMs);
    } else {
      // Hold last letter briefly, then fade
      setTimeout(() => {
        Object.values(frameMap).forEach(fr => fr.classList.remove("visible", "partial", "dip"));
      }, perLetterMs * 0.6);
    }
  }
  step();
}

function loadNextWord() {
  if (roundComplete) return;
  // End the round once we've finalized roundSize words.
  if (roundFinalized >= roundSize) { endRound(); return; }
  const picked = nextFromQueue();
  currentWord = picked.word;
  currentSign = picked.sign;
  currentIndex++;
  roundIndex++;
  isRevealed = false;
  currentReplays = 0;
  lastGuess = "";
  answerEl.value = "";
  answerEl.disabled = false;
  feedbackEl.className = "feedback";
  feedbackEl.textContent = "";
  feedbackEl.style.display = "none";
  actionRow.style.display = "none";
  giveupBtn.style.display = "";
  aslSignLink.style.display = "none";
  checkBtn.disabled = false;
  checkBtn.classList.remove("correct");
  checkBtn.textContent = "Check Answer";
  nextBtn.disabled = false;
  roundBanner.classList.remove("show");
  updateRoundProgress();
  setTimeout(() => animateWord(currentWord), 200);
  answerEl.focus();
}

// Reveal the "How to sign in ASL" link when this word has an ASL-LEX gloss
function showAslSignLink() {
  if (currentSign) {
    aslSignLink.href = `https://asl-lex.org/visualization/?sign=${encodeURIComponent(currentSign)}`;
    aslSignLink.style.display = "";
  } else {
    aslSignLink.style.display = "none";
  }
}

function finalizeUI() {
  // Shared UI updates once a word is finalized (correct or gave up)
  isRevealed = true;
  actionRow.style.display = "flex";
  giveupBtn.style.display = "none";
  showAslSignLink();
  // Keyboard-driven Next: move focus to the Next button so a single Enter
  // press advances to the next word without reaching for the mouse.
  if (!roundComplete) nextBtn.focus();
}

function checkAnswer() {
  if (isRevealed) { loadNextWord(); return; }   // Enter again advances
  const guess = answerEl.value.trim().toLowerCase();
  if (!guess) return;
  lastGuess = guess;

  if (guess === currentWord.toLowerCase()) {
    score++;
    total++;
    scoreEl.textContent = score;
    totalEl.textContent = total;
    roundCorrect++;
    roundFinalized++;
    recordAttempt("correct");

    feedbackEl.className = "feedback correct";
    feedbackEl.innerHTML = `✓ Correct — the word is ${currentWord}.<span class="enter-hint">Press Enter for the next word.</span>`;
    answerEl.disabled = true;
    checkBtn.disabled = true;
    checkBtn.classList.add("correct");
    checkBtn.textContent = "✓ Correct";
    finalizeUI();
  } else {
    feedbackEl.className = "feedback incorrect";
    feedbackEl.textContent = `✗ Not quite. Replay the animation and try again, or give up to reveal.`;
    actionRow.style.display = "flex";
    giveupBtn.style.display = "";
    // Don't lock input — they can retry. No counter updates yet.
  }
}

function giveUp() {
  answerEl.value = currentWord.toLowerCase();
  answerEl.disabled = true;
  checkBtn.disabled = true;
  feedbackEl.className = "feedback revealed";
  feedbackEl.innerHTML = `Revealed — the word is ${currentWord}.<span class="enter-hint">Press Enter for the next word.</span>`;
  total++;
  totalEl.textContent = total;
  roundFinalized++;
  recordAttempt("gaveup");
  finalizeUI();
}

// Dictionary lookup — generic over any word, rendered into the Results-tab panel.
// (Moved out of the practice flow: practice is for recognition; meanings are a
//  review activity on the Results tab, looked up by tapping a history word.)
async function lookup(word) {
  if (!word) return;
  const w = word.toLowerCase();
  const display = word.toUpperCase();
  dictPanel.innerHTML = `<p class="dict-def">Loading definition for “${display}”…</p>`;
  if (dictPanel.scrollIntoView) dictPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`);
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    renderDict(data[0]);
  } catch (e) {
    dictPanel.innerHTML = `
      <p class="dict-word">${display}</p>
      <p class="dict-def">No definition available from dictionaryapi.dev.</p>
      <a class="dict-mw" target="_blank" rel="noopener"
         href="https://www.merriam-webster.com/dictionary/${w}">Try Merriam-Webster ↗</a>`;
  }
}

function renderDict(entry) {
  const phonetic = entry.phonetic ||
    (entry.phonetics?.find(p => p.text)?.text || "");
  const audioObj = entry.phonetics?.find(p => p.audio);
  const meaning = entry.meanings?.[0];
  const pos = meaning?.partOfSpeech || "";
  const def = meaning?.definitions?.[0]?.definition || "";

  // Collect up to 3 unique example sentences across all meanings/definitions.
  const examples = [];
  const seen = new Set();
  for (const m of (entry.meanings || [])) {
    for (const d of (m.definitions || [])) {
      if (d.example) {
        const ex = d.example.trim();
        const key = ex.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          examples.push({ text: ex, pos: m.partOfSpeech });
          if (examples.length >= 3) break;
        }
      }
    }
    if (examples.length >= 3) break;
  }

  let html = `<p class="dict-word">${entry.word}</p>
    <p class="dict-ipa">${phonetic}`;
  if (audioObj) {
    html += ` <button class="dict-audio" onclick="playAudio('${audioObj.audio}')">▶ audio</button>`;
  }
  html += `</p>
    <p class="dict-def"><span class="dict-pos">${pos}.</span>${def}</p>`;

  if (examples.length) {
    html += `<div class="dict-examples"><p class="dict-examples-label">Example${examples.length > 1 ? 's' : ''}</p>`;
    examples.forEach(ex => {
      html += `<p class="dict-example">${ex.pos ? `<span class="dict-pos">${ex.pos}.</span>` : ''}"${ex.text}"</p>`;
    });
    html += `</div>`;
  } else {
    html += `<p class="dict-example dict-example--empty">No example sentences available for this word.</p>`;
  }

  html += `<a class="dict-mw" target="_blank" rel="noopener"
       href="https://www.merriam-webster.com/dictionary/${entry.word}">Deeper → Merriam-Webster ↗</a>`;
  dictPanel.innerHTML = html;
}

function playAudio(url) {
  if (!url) return;
  try { new Audio(url).play(); } catch (e) { /* deaf user, audio may not matter */ }
}

// Wire up
checkBtn.addEventListener("click", checkAnswer);
answerEl.addEventListener("keydown", e => {
  if (e.key === "Enter") checkAnswer();
});
function replayCurrent() {
  if (roundComplete || !currentWord) return;
  currentReplays++;
  animateWord(currentWord);
}
replayBtn.addEventListener("click", replayCurrent);
giveupBtn.addEventListener("click", giveUp);
nextBtn.addEventListener("click", loadNextWord);

// Expose for inline onclick
window.playAudio = playAudio;

// Boot
(async () => {
  loadAttempts();
  updateResultsBadge();
  speed = parseFloat(difficultySelect.value);
  roundSize = parseInt(wordCountsSelect.value, 10);
  await loadWords();
  startNewRound();
})();
