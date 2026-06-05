# fingerspell-dictionary — HANDOVER

**Current version:** v1.8 (prototype redesign — 3 filters, minimized)
**v1 shipped:** 2026-06-01
**Owner:** Echo Zhao
**Lives at:** `Portofilo/fingerspell-dictionary/`
**Indexed in:** `Portofilo/PORTOFILIO_HANDOVER.md`

---

## Launch status (2026-06-01)

The tool is **launch-ready** as of v1.6. Sequence:

1. **MATT Monash Discord** — accessibility community, lowest risk. Post first.
2. **LinkedIn** — story-first framing (deaf student / holistic-fingerspell insight / friction-led design). Portfolio + employer signal.
3. **Reddit** — r/deaf, r/ASL, r/learnASL. Strangers using it.
4. **WeChat** — academic / Chinese-speaking peers if CET-4 angle is relevant.
5. **Skip Facebook.**

**Launch-post drafts: ready.** See `launch-posts.md` in this folder for the three drafts (Discord / LinkedIn / Reddit). Replace `[LINK]` with the deployed URL before posting.

## Open question — Willoughby follow-up (planted 2026-06-01)

Echo is wondering how to use this tool as a follow-up touchpoint to A/Prof Louisa Willoughby (Monash Linguistics outreach, initiated 2026-05-27 — see memory `project-willoughby-outreach`). The connection is real and direct: the tool is the *artifact* expression of the holistic-fingerspell-gesture insight that was supposed to lead the academic outreach in the first place (see memory `project-cognitive-insight-fingerspell`). Open angles for the next chat to pick up:

- Forward the LinkedIn post link + tool URL as a short follow-up email ("you may find this tangible expression of the question I raised in my earlier note useful")?
- Position the tool as the v1 prototype that motivates a Phase 2 controlled study (the PhD-shaped research question from the cognitive-insight memory)?
- Or wait until Willoughby replies to the initial cold email before adding a second touchpoint — second cold message risks looking like over-eagerness?

Decision deferred. Echo should think about whether this belongs in the PhD-Track chat (supervisor outreach) or the Self-website-refine chat (portfolio link strategy). Either way, **don't lose this thread** — the holistic-gesture insight is the strongest single signal Echo has, and this tool is now its public proof.

## Chat handoff

This chat (the "Portfolio tool" chat) handed off after v1.6 ship. Reasons it split here:
- Tool reached a coherent shippable state.
- Next work (launch posts, post-launch iteration) is conceptually a new phase.
- Cold handoff possible because this HANDOVER captures every decision.

Next chat should reopen with: launch post drafts (Discord, LinkedIn, Reddit) → ship them → iterate based on responses. PWA / mobile pivot is a separate scoping conversation only if launch feedback says users want it.

---

## What this is

A single-file HTML tool for **ASL fingerspelling recognition practice**, with
an integrated EN-EN dictionary that kills the Eudic context-switch.

User loop: watch animation → type the word → check → (replay infinitely OR
give up to reveal) → optional inline dictionary lookup → next word.

---

## Why it exists (the problem)

Echo practices ASL fingerspelling daily. When recognition fails on a strange
word, the workflow breaks: switch to Eudic, search, return. The friction is
the app switch. This tool collapses practice + dictionary into one surface.

## The differentiation moat

The "video" the user watches is **not a video** — it's a CSS overlap-fade
animation generated from local SVG letter assets. This was a deliberate
choice over external video footage because:

1. **No asset dependency.** Zero licensing, zero scraping, fully offline-capable.
2. **The morph rendering = the teaching mechanic.** Letters fade-overlap rather
   than swap, demonstrating Echo's *holistic fingerspell gesture* insight
   (deaf people read fingerspelling as continuous shape, not letter sequence).
3. **Speed slider is the practice variable.** Users push speed over time;
   that's how the daily-practice habit compounds.

Without this rendering choice, the tool is a wrapper around dictionaryapi.dev
+ public SVGs. With it, it's a small but coherent expression of a research-
grade hypothesis. That distinction is the portfolio talking point.

---

## v1 scope (shipped 2026-06-01)

| Feature | State |
|---|---|
| 26 local ASL letter SVGs (Wikimedia, public domain) | shipped |
| Layered fade-overlap animation engine | shipped |
| Speed slider 0.5×–2× | shipped |
| Replay-on-demand (unlimited) | shipped |
| Give-up button → auto-fills the answer | shipped |
| 4 length tiers (3, 4, 5, 6+ letters), 20 words each | shipped |
| CET-4 Core pack (100 words, exam type) | shipped v1.1 |
| Packs schema with optgroup'd selector (length / exam / category) | shipped v1.1 |
| Tabbed Practice/Results UI | shipped v1.2 |
| Round size selector (5/10/20/∞) + progress + completion banner | shipped v1.2 |
| Stat cards: Total / Correct / Accuracy | shipped v1.2 |
| Response History table + localStorage persistence | shipped v1.2 |
| Colorblind-friendly palette (Wong cyan + amber), indigo accent | shipped v1.3 |
| Stat cards customized (multi-color values) | shipped v1.3 |
| Lowercase labels, history rows tinted by outcome | shipped v1.3 |
| IELTS Academic Core (100 words) pack alongside CET-4 | shipped v1.4 |
| Time-based rounds (3 / 5 / 8 min / unlimited, 8 min default) | shipped v1.5 |
| Redundant in-player Replay button removed | shipped v1.5 |
| Mobile-readable polish (no PWA) | shipped v1.5 |
| Same-letter re-articulation (dip transition for APPLE / COFFEE / BALLOON) | shipped v1.6 |
| Check Answer (Enter key or button) | shipped |
| Inline dictionary panel (dictionaryapi.dev) | shipped |
| Merriam-Webster "deeper" link (new tab escape hatch) | shipped |
| Score tracker (correct / total) | shipped |
| Swiss-minimalist visual style | shipped |

Score logic: `total` increments only on a final attempt (correct answer or
give-up); incorrect attempts don't penalize and don't increment total. This
matches the "user controls pacing" decision.

---

## v1.5 / v2 candidates (not built yet)

- **Replay-slow with per-letter labels on give-up.** When user gives up,
  auto-replay at half speed with letter overlay. Teaches the missed letter.
- **Custom word list mode.** Paste-your-own-words (e.g., from Eudic recents).
- **Streaks / daily heatmap.** Light gamification for retention.
- **Edit-distance feedback.** "You got 4 of 5 letters" instead of binary.
- **IPA + mouth-shape rendering** as primary pronunciation (deaf-built
  dictionary framing). Audio button demoted further.
- **Tier 2 morph.** Real SVG path interpolation via flubber.js between
  redrawn simplified hand-outlines. Closer to the holistic-gesture insight,
  but requires redrawing the SVGs as compatible paths.
- **Curriculum / spaced repetition.** Track which words you've missed,
  resurface them.

---

## Decision log

**2026-06-05 — v1.8 (prototype redesign + feature minimize)**
Driven by `aslfd_feedback.md` (2026-06-05) + Figma `prototype_0605.pdf`. Goal Echo
set: *"minimize feature, keep the tool clean and targeted."* Confirmed three product
calls with Echo before building (Category meaning, how far to strip, poster content).
- **Three prototype filters replace the old control cluster.** A labelled row of
  `Difficulty / Category / Word counts` selects now sits above the player:
  - *Difficulty* drives animation speed: Easy 0.5× / Medium 1× (default) / Hard
    1.5× / Advanced 2× / Expert 3×. The manual speed slider is **removed** — speed
    is a difficulty choice now, not a free dial.
  - *Category* is length-bucketed: Short (≤4) / Medium (5–6) / Long (7+).
  - *Word counts* sets round size: 5 / 10 (default) / 15 / 20.
  Changing any of the three starts a fresh round.
- **Category = length, all sourced from ASL-LEX (Echo's call).** `words.json`
  rebuilt to **schemaVersion 4**: the four old `asllex-*` packs + the curated
  length/exam packs are gone, replaced by exactly three packs (`short` 266 /
  `medium` 174 / `long` 65 = 505 words), every entry `{w,s}` with an ASL-LEX gloss.
  *Rationale Echo gave:* because every word comes from ASL-LEX, every word always
  has a real-sign link — fingerspell **and** sign are always available. The
  IELTS/CET exam packs were **dropped from the picker** (they were Echo's own
  curation and are unaffected by the CC BY-NC license; they can be reinstated as
  a separate axis later if exam-prep positioning matters again).
  - *Bucket boundary note:* feedback wrote "Medium [5,7], Long ≥7" (overlapping at
    7). Resolved cleanly as Short ≤4 / Medium 5–6 / Long ≥7.
- **Rounds are word-count based again (reverted from v1.5 time-based).** Round ends
  after N finalized words; banner reads "K of N correct (X%)". The 3/5/8-min
  duration selector is removed.
- **Word-repeat bug fixed.** Echo's logged error ("the loop of words always repeat
  same word") was random-with-replacement in `pickWord`. Replaced with a
  Fisher–Yates **no-replacement queue** (`buildQueue` / `nextFromQueue`); a round
  draws from a shuffled deck so no word recurs until the deck is exhausted, with a
  seam-swap guard against repeats if a round ever exceeds the pool. Verified: 0
  duplicate words across 24,000 simulated rounds (3 packs × 4 sizes × 2000).
- **Practice/Challenge mode toggle removed.** Single clean practice screen. The
  `fsd_mode_v1` / `fsd_submissions_v1` stores and the Challenge-submissions table
  are gone. **Results tab kept** (Echo's call): stat cards (Total / Correct /
  Accuracy) + Response History persist via `fsd_attempts_v1` (unchanged shape) so
  daily-practice tracking survives.
- **"Best practice with Deaf/deaf/HOH" panel added** (prototype's "Poster" screen,
  built as text per Echo). New bottom button opens a modal with a two-column
  DOs / DON'Ts guide (get attention first, face me, don't cover your mouth, talk to
  me not my interpreter, etc.), first-person framed. Sits beside the existing
  ASL Alphabet button; both render as the prototype's two bottom buttons.
- **Action buttons relabelled to match prototype:** "How to sign in ASL ↗"
  (was "See the real ASL sign"). The sign link shows on **both** correct and
  give-up (finalizeUI runs in both paths). Correct → reveal + sign + Next;
  Incorrect → Give up + sign + Next.
- **Dictionary moved out of the practice flow → Results tab (Echo's call, same-day
  follow-up).** The inline "Look it into Dictionary" button + panel were removed
  from the practice card. A new **"Word lookup"** card sits on the Results tab; each
  word in the Response History is now a **clickable button** that looks the word up
  (meaning, IPA, examples via dictionaryapi.dev, M-W deep link) into that panel.
  `lookupWord()` (current-word) became generic `lookup(word)`. Rationale Echo gave:
  practice is for recognition; checking a word's meaning is a review activity, and
  this lets the user look up any specific word they want from their history.
  *Tradeoff noted:* this trades away the v1 "no app-switch, look it up in the
  moment" moat the original build leaned on — deliberate, per Echo.
  - `scrollIntoView` call guarded (`if (dictPanel.scrollIntoView)`) for non-browser
    test envs; real browsers always have it.
  - Verified via jsdom: history word → click → dictionaryapi fetch → rendered
    definition/IPA/example in the Results panel, no JS errors.
- **Verified:** headless jsdom boot — dropdowns populate, "Word 1 of 10", wrong→
  give-up reveals word + shows sign link, best-practice modal opens, no JS errors.
- *Note for monetization:* with v1.8 **all** word content is now ASL-LEX-derived
  (CC BY-NC). The whole word bank is now NonCommercial-only — if Echo ever paywalls
  this, the entire `words.json` must be relicensed/replaced (the curated length/exam
  packs that used to be "safe" are no longer in the build).

**2026-06-04 — v1.7 (Practice/Challenge modes + ASL-LEX integration)**
Driven by `aslfd_feedback.md` (2026-06-04). Built after launch got no response;
goal is to deepen the use experience.
- **Practice vs Challenge mode split.** New top-level toggle.
  - *Practice*: untimed, any pack, all aids (dictionary + real-sign link),
    keyboard-driven. The duration selector is hidden. Resolves Echo's
    "explore-vs-compete" tension — practice is the "general mode" he wanted.
  - *Challenge*: timed round (3/5/8 min). Pack + speed **lock** for the
    duration ("if time-bound, limit the package"), and each completed round is
    saved as one submission. The "Unlimited" duration option was removed from
    the selector (Practice already covers untimed).
  - Mode persists in `localStorage` (`fsd_mode_v1`).
- **Per-session submissions (Kaggle-style).** New `fsd_submissions_v1` store.
  Each finished Challenge round → one row (pack, speed, score, accuracy, time,
  when) in a new "Challenge submissions" table on Results. All-time stat cards
  + full attempt history kept on top — both views coexist, as agreed.
- **Keyboard-driven Next.** On a finalized word (correct or gave-up) focus
  moves to the Next button, so a single Enter advances; loadNextWord refocuses
  the input. No global key handler (avoids double-advance). Verified via jsdom.
- **Alphabet cheat-sheet.** "🔤 Alphabet" button opens a modal showing
  `assets/Asl_alphabet_gallaudet.svg.png` (Esc / click-outside / × to close).
- **ASL-LEX 2.0 integration.** Four new packs under a new "Real ASL signs
  (ASL-LEX)" optgroup: 3 / 4 / 5 / 6+ letters (505 words total, capped ~120-148
  per length, sorted common-first by English word frequency for accessible
  English level). After an answer is revealed, a **"See the real ASL sign ↗"**
  link deep-links to `asl-lex.org/visualization/?sign=<EntryID>` (verified the
  param resolves, incl. disambiguated glosses like `what_1` — the SPA just
  needs ~6-8s to render).
  - *Data pipeline:* pulled `sign_props.json` from the ASL-LEX visualization,
    used `EntryID` as both the spelled word (suffix stripped, uppercased,
    pure-alpha only) and the deep-link gloss; dropped 295 multi-word phrases,
    deduped `_1/_2` variants (kept highest sign-frequency), filtered profanity
    (BITCH/DAMN/HELL). Existing curated length + exam packs kept untouched so
    the two sets don't "conflict" — they're separate, clearly-labelled groups.
  - **schemaVersion bumped to 3:** a pack's `words` entry may now be a plain
    string OR `{w, s}` (word + ASL-LEX sign gloss). `pickWord` normalises both.
- **⚠ LICENSE NOTE (important for the monetization goal).** ASL-LEX is
  **CC BY-NC 4.0 — NonCommercial**; sign videos are © ASL-LEX and may not be
  redistributed. This tool is a free, attributed, educational/portfolio piece,
  and it only *links out* to the videos, so it's within bounds. But the
  ASL-LEX-derived packs **cannot be used in a commercial/paid product.** If
  Echo ever monetizes this, the ASL-LEX packs must be removed or relicensed;
  the curated length/exam packs are Echo's own and are unaffected. Attribution
  added in the "How to use" footer.

**2026-06-01 — v1.6 (same-letter re-articulation)**
Resolves the known issue logged in v1.5.
- When `word[i] === word[i-1]`, the next letter no longer reuses the
  identical frame silently. Instead, the frame enters a brief `dip`
  state (opacity 0.1, scale 0.92) then snaps back to `visible`.
- Dip duration scales with letter speed:
  `dipMs = clamp(perLetterMs * 0.22, 60, 220)` — at default speed ≈ 154ms.
- The previous-letter fade-out is suppressed when the next letter is the
  same; otherwise the dip wouldn't be visible.
- Mimics ASL's natural double-articulation: signers re-stroke the
  handshape for consecutive same letters rather than holding it.
- Verified on APPLE at 2× speed: second P transitions visible → dip
  (660ms) → visible (720ms). Score validity for words like APPLE, COFFEE,
  BALLOON now matches the visible animation.

**2026-06-01 — v1.5 (time-based rounds + mobile polish)**
- **Rounds are now time-based, not word-count-based.** Selector becomes
  3 / 5 / 8 / Unlimited minutes, with 8 min as the default. Echo's
  rationale: practice happens in "crispy time" (short bursts), and 8 min
  matches a real attention chunk.
- **Live countdown in round-progress text:** "Word 3 · 5:42 left" while
  the timer is running. Tick interval: 1s.
- **Round-end trigger** switched from `roundFinalized >= roundSize` to
  setTimeout at `roundDurationSec * 1000`. The interval also checks
  in case the tab was backgrounded.
- **Completion banner** now reads: "N words attempted, K correct (X%) in
  M:SS." Replaces the old "N of M correct" format.
- **Removed the small Replay button inside the player frame** — redundant
  with the big "Replay Animation" button below. Player overlay now keeps
  only time + progress bar.
- **Mobile readability polish (no PWA yet):**
  - Header wraps cleanly on narrow viewport (added `flex-wrap: wrap`).
  - History table wrapped in `.history-scroll` for horizontal overflow.
  - Tab buttons get `min-height: 44px` for tap-target compliance.
  - Full PWA (offline + installable manifest) deferred to v2 after launch.

**Known issue identified in v1.5, fixed in v1.6.**

**2026-06-01 — v1.4 (IELTS Academic Core pack)**
- Added **IELTS Academic Core (100)** as the second exam pack. Curated from
  Coxhead's Academic Word List headwords, distributed across the alphabet.
- Sits alongside CET-4 Core under the "Exam prep" optgroup.
- Reason: CET-4 reads as China-specific to international hiring audiences.
  IELTS is a globally recognized credential — keeping CET-4 for Echo's
  personal practice, adding IELTS as the portfolio-facing default.
- Inline JS fallback in `index.html` updated to include both exam packs
  (with shorter starter lists) so file:// users still see the grouped
  exam-pack optgroup.
- No code or schema changes — pure data addition via the v1.1 packs schema.

**2026-06-01 — v1.3 (colorblind palette + dashboard styling)**
Driven by `aslfd_feedback.md`.
- **Colorblind-friendly palette migration.** Red/green replaced with the Wong
  blue+orange scheme: cyan `#0891b2` for correct, amber `#b45309` text on
  `#fef3c7` bg for incorrect/gave-up. Icons (`✓` / `⊘`) carry meaning beyond
  color — same accessibility contract Echo flagged.
- **Indigo accent migration.** Primary `#4f46e5`, hover `#4338ca`. Replaces
  the prior black accent. Adopted from Sigma design tokens Echo dropped in.
- **Stat cards customized per `cards_demo.png`:** Total in dark ink, Correct
  in cyan, Accuracy in indigo. Larger number sizing (40px, weight 700),
  per-card classes `.stat-total / .stat-correct / .stat-accuracy`.
- **Lowercased labels:** removed `text-transform: uppercase` from history
  table headers and dict example labels. Letter-spacing tweaks reverted to 0.
- **Color-coded history rows:** correct rows get cyan-tinted background +
  left border, gave-up rows get amber-tinted background + left border.
  Color reinforces icon, not replaces it.
- **Results tab label** changed from pill badge to inline `Results (N)`
  format matching the cards_demo screenshot.
- **Dark mode tokens in Sigma's file are NOT applied** — single light theme
  is enough for now, dark mode adds complexity without specific demand.
- **Vocab API question** (CET vs international tests): no canonical API
  exists for "all exam vocab." Confirmed by review — best path is curated
  per-pack lists with `source` attribution. CET-4 kept for Echo's self-use.
  Adding IELTS Academic or TOEFL as a parallel international-audience pack
  is the next step if portfolio-positioning matters. Deferred to next
  decision.

**2026-06-01 — v1.2 (tabs + rounds + persistent dashboard)**
- Added tabbed nav: **Practice** | **Results** (badge shows total attempts).
- **Round size selector** (5 / 10 / 20 / Unlimited). Round progress
  "Word N of M" replaces flat counter. Round-complete banner with
  Start-new-round button.
- **Results tab dashboard**: three stat cards (Total Attempts, Correct
  Answers, Accuracy %) + Response History table (word, your answer,
  outcome, pack, when). Clear-history button.
- **localStorage persistence** under key `fsd_attempts_v1`. Each
  finalized attempt (correct or gave-up) writes one row.
  - Attempt shape: `{ word, packId, packName, lastGuess, outcome,
    replays, ts }`. `outcome` is `correct` | `gaveup`.
  - Replays tracked but not yet surfaced in the UI — future column.
- **Theming deliberately deferred** — bikeshed risk. Style pass happens
  after the first real practice session generates specific complaints.
- Counter logic clarified: `total` and `score` only increment on
  finalized attempts (correct or give-up). Wrong attempts before
  surrendering aren't counted, by design.
- Accuracy on Results tab = correct / total finalized. Whole-history
  metric, not per-round. Per-round accuracy lives in the completion
  banner only.

**2026-06-01 — v1.1 (schema refactor + first vocab pack)**
- Migrated `words.json` from flat tier keys to a `packs` array (schemaVersion 2).
  Each pack now has `id`, `name`, `type` (length / exam / category / custom),
  optional `source`, and `words`. UI selector becomes optgroup'd by type.
- Added **CET-4 Core (100)** pack — hand-curated high-frequency CET-4 vocab.
  First exam-prep pack. Validates the type-axis works.
- Pushed back on building IELTS / TOEFL / category packs at the same time:
  daily-use friction log should drive the next pack choice, not assumption.
- Git repo initialized 2026-06-01 (commands run on host, not sandbox — FUSE
  mount blocks git's atomic temp-file operations). Pushed to GitHub as
  `fingerspell-dictionary` (public).

**2026-06-01 — v1.0.1 patch (Echo iteration)**
- Check Answer button turns green + label flips to "✓ Correct" on success.
  Resets on Next Word. Visual reinforcement of success.
- Dictionary panel now collects up to 3 unique example sentences across all
  meanings/definitions of the entry. Falls back to a quiet "no example
  sentences available" line when the API returns none.
- CSS still inline (single-file portability over separation; revisit when
  CSS > ~500 lines or a second HTML page exists).

**2026-06-01 — Build approach**
Chose Tier 1 morph (CSS overlap-fade) over Tier 2 (flubber.js path morph).
*Why:* Tier 1 ships in v1 at ~10% of Tier 2's cost while still demonstrating
the holistic-gesture insight. Tier 2 is a v2+ investment.

**2026-06-01 — Pivot from "type a word, see it spelled" to "watch and guess"**
Original Gemini spec was input-driven (Echo types a word → sees ASL spelling +
definition). Echo pivoted to recognition-practice (watch → guess → check).
*Why:* matches Echo's actual daily-practice habit. Original mode might return
as a "Learn" toggle in v1.5.

**2026-06-01 — "Video" is generated, not external**
Mockup said "video." Asset reality: no video. Solution: render SVG morph
inside a video-styled player (play/replay controls, time bar, progress).
*Why:* preserves the practice-style UI without external-asset dependency,
and turns the morph rendering into the core mechanic instead of decoration.

**2026-06-01 — Inline dictionary, M-W as escape**
Mockup specced new-tab → Merriam-Webster. Pushed back: new-tab IS an app
switch, which is the friction Echo is trying to eliminate. Inline panel
(dictionaryapi.dev) + small "deeper → M-W" link. Best of both.

**2026-06-01 — Wrong answer = user-controlled, not auto-replay**
Echo overrode the suggested auto-replay-on-fail with: user can replay
infinitely, "give up" auto-fills the answer.
*Why:* respects the user's pacing. Auto-replay implies "the tool decides
when you're allowed to learn"; manual replay respects "I decide when I
surrender."

---

## Friction log

_Populate this section during daily use. Each entry is a one-liner about
something that broke the practice flow. v2 design will be driven by this log._

- _(empty — start logging after first practice session)_

---

## How to run

```
# from this folder:
python3 -m http.server 8765
# then open http://localhost:8765
```

`file://` will also work, but `fetch('words.json')` may be blocked by CORS
on some browsers — the JS has an inline fallback word list for that case.

---

## Tech notes

- Single-file `index.html` (HTML + CSS + JS, no framework).
- `words.json` loaded via fetch with inline fallback.
- 26 SVGs preloaded as layered `<div class="frame">` elements; animation
  toggles `.visible` / `.partial` classes.
- Animation timing: `700ms / speed` per letter, with overlap-fade controlled
  by CSS transitions.
- Dictionary: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}` —
  free, no key, but rate limits exist. Falls back to M-W link on failure.
