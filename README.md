# Fingerspell Dictionary

ASL fingerspelling recognition practice with an integrated EN-EN dictionary.
Built so you don't have to switch to Eudic when you hit a word you don't know.

## What it does

1. Plays an animation of a word being fingerspelled in ASL.
2. You type what you saw.
3. If correct, score up. If wrong, replay as many times as you want.
4. Give up to reveal the answer, or look it up inline.
5. Continue to the next word.

## Run it

```bash
python3 -m http.server 8765
# open http://localhost:8765
```

Opening `index.html` directly via `file://` also works (with a small
fallback word list).

## Structure

```
fingerspell-dictionary/
├── index.html           single-file app (HTML + CSS + JS)
├── words.json           tiered word bank (3, 4, 5, 6+ letters)
├── assets/letters/      26 ASL letter SVGs (Wikimedia, public domain)
├── HANDOVER.md          decision log, friction log, v2 candidates
└── README.md            this file
```

## Why this is different from `asl-context-learning/`

| | fingerspell-dictionary | asl-context-learning |
|---|---|---|
| Domain | letter-level recognition | scene/context vocab |
| Mode | tight test/feedback loop | exploratory learning |
| Status | shipped v1 | mid-refactor |

They are complementary, not redundant.

## Differentiator

The animation is **not a video** — it's a CSS morph-fade rendered from
local SVGs, demonstrating the *holistic fingerspell gesture* observation
that letters are read as continuous shape rather than discrete poses.

See [`HANDOVER.md`](./HANDOVER.md) for the full decision log.
