# fingerspell-dictionary — HANDOVER

**Current version:** v1.6 (launch-ready)
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

Launch-post drafting is deferred to the next chat (see "Chat handoff" below).

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
