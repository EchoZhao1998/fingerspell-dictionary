# Launch posts — v1.6 (2026-06-01)

Drafts ready to copy/paste. Replace `[LINK]` with the deployed URL before posting. Order: MATT Discord → LinkedIn → Reddit (per HANDOVER launch sequence).

---

## 1. MATT Monash Discord (post first — accessibility peers, low risk)

Hey all — just shipped a tiny ASL fingerspelling practice tool I built for my own daily practice. Watch the word fade-morph through the alphabet, type your guess, hit check. Built-in EN-EN dictionary so I stop bouncing to a separate dict mid-practice. Has CET-4 + IELTS Academic vocab packs if you're studying for those too.

Made it because I'm late-deafened (NF2) and learning ASL from scratch — I wanted something that help me improve english, i.e. how to pronunce a word and how to use it by ASL. Meantime, it can open a door for Deaf non-English native speaker. If you're learning/interested in ASL/Auslan/any sign language, would love a test drive + a list of what's broken.

[LINK](https://echozhao1998.github.io/fingerspell-dictionary/)

Tone notes: casual, short, skill-first. Disclosure mentioned but not the lede. Single CTA: try + report breakage.

---

## 2. LinkedIn (story-first, leads with the holistic-gesture insight)

Most language-learning advice assumes you can hear.

Mine stopped working when I lost my hearing.

As a Chinese-native student studying in English, I must continue to improve my English skills after becoming deaf. If anything, it became more important. That's one reason I started learning ASL—not only as a way to communicate, but also as a way to rebuild a language-learning process that no longer depended on sound.

Over time, I realised ASL learning and English learning were deeply connected. The richer my English vocabulary became, the easier it was to express ideas through sign. When vocabulary was missing, communication often fell back to fingerspelling. Vocabulary remained the foundation.

While using other ASL fingerspelling tools, I ran into a frustrating workflow. When I encountered an unfamiliar word, replaying the animation wasn't enough. I also needed to look up its meaning, pronunciation, and usage. Constantly switching between practice tools and dictionaries broke concentration.

What started as a personal learning aid became an experiment in accessibility, language acquisition, and interaction design. The tool combines fingerspelling recognition and vocabulary learning in a single workflow: recognise the word, then immediately access definitions, examples, and pronunciation guidance without leaving the page.

Another observation shaped the design itself. Fluent signers seem to recognise fingerspelling as a continuous visual pattern rather than consciously decoding every letter. To explore that idea, I use overlapping SVG handshape transitions instead of simple letter-by-letter swaps.

Features such as replay controls, timed practice rounds, vocabulary packs, and response history all emerged from my own daily learning frustrations.

It is a hard time that became deaf during my studies. However, I regard it as another opportunity to learn and explore the world.

This project is a small experiment in that journey.

[LINK](https://lnkd.in/gtgQNzZa)

I'd love feedback from Deaf signers, sign-language educators, accessibility practitioners, HCI researchers, and anyone interested in language learning or inclusive design. 🤟

#Accessibility #InclusiveDesign #HumanComputerInteraction #DeafCommunity #LanguageLearning

---

## 3. Reddit r/learnASL (peer-to-peer, honest about limits)

**Title:** Built a fingerspelling recognition tool for practice english as non-English native speaker

Hey r/learnASL —

I built a small fingerspelling recognition tool for my own daily practice and figured I'd share it in case it's useful to anyone else.

**What it does:** shows you a fade-morph animation of a fingerspelled word, you type what you think it is, hit check. Replay infinitely. Give up reveals the answer. Built-in EN-EN dictionary (meaning, examples, pronunciation guidance) right inside the page, so you don't have to jump apps when a word is unfamiliar.

**Why I built it:** I'm late-deafened (NF2 since 2025), Chinese-native, learning ASL as an adult. So I'm running two loops at once — ASL recognition AND English vocab — and constantly switching to a dictionary kills the flow. Combining them into one surface turned out to be more useful than I expected, and the combo might help other Deaf non-English-native learners, or ESL adults using ASL as an English bridge.

**A few details that might matter:**
- Speed slider 0.5×–2×, push it over time
- 4 length tiers (3 / 4 / 5 / 6+ letters) + CET-4 + IELTS Academic vocab packs
- Response history so you can see which words keep tripping you up
- Time-based rounds (default 8 min — what one real practice burst actually feels like)

**Honest limitation:** it's a CSS morph between 26 static handshapes, not real video. It won't teach you to read a fluent signer's fingerspelling in the wild — but it's good for the recognition step before that.

Free, no login, single HTML file. Source is open.

[LINK](https://echozhao1998.github.io/fingerspell-dictionary/)

Would love feedback — what feels broken, what's missing, what would actually help your practice.

Tone notes: title is plain + honest. Body declares limitation upfront because r/learnASL is sharp; pretending it's more than it is would lose the room. Mod-rule check before posting: confirm r/learnASL allows self-made tool shares (most subs require a flair like "Resource" or "Learning Tool").

---

## Post-launch checklist (when feedback starts coming in)

- Open `HANDOVER.md` → "Friction log" section
- Log each piece of useful feedback as one-liner with source (e.g. `r/learnASL: speed slider should remember last setting`)
- After ~5–10 entries, that log becomes the v2 spec

---

## Plan B — what if no one gives feedback

Realistic baseline: most launch posts get 0–3 responses. Treat zero as the default, not the failure mode. Decide *now* what you'll do at 7 days so silence doesn't feel like rejection.

**1. Use it yourself, daily.** The Friction Log in HANDOVER is empty. Your own friction is valid v2 spec input — you don't need strangers to surface bugs. One week of daily self-use will produce more concrete signal than ten public posts.

**2. DM, don't only post.** Public posts are beacons; DMs are conversations. Reach out individually to: deaf friends or contacts, MDS classmates learning languages, any ASL teacher you've encountered, anyone in a Deaf community group you've intersected with. A single thoughtful DM beats a Reddit post that gets 30 upvotes and no comments.

**3. Use the tool as outreach ammunition.** Email Willoughby (the open Willoughby-follow-up question in HANDOVER), Schembri, Ellis with the URL as a concrete artifact attached to your earlier note. One reply from a researcher is worth more to your PhD/Job tracks than 100 silent Reddit views.

**4. Reframe the silence.** A post with zero comments isn't a failed launch — it's a low-cost public proof-of-work. People who view but don't comment still see "Echo built a thing." That signal compounds the next time your name appears in a different context (job application, PhD pitch, second project).

**5. Hard pivot trigger at 14 days.** If by 14 days you have fewer than 5 feedback items from all sources combined (posts + DMs + self-use friction log), the next move is NOT "promote harder." It's: stop promoting, use it daily for 30 days, let your own friction log drive v2. Promotion ROI on a small tool is low; daily-use ROI on your own practice is high.

**What success actually looks like at 30 days, even with zero comments:**
- Friction log has ≥10 entries you wrote from your own use
- You shipped at least one fix or tweak from that log
- The tool URL is on your CV / LinkedIn / website as a tangible artifact
- You sent it to at least one researcher as a follow-up touchpoint
- You used it almost every day

That is a successful launch. Comments are a bonus, not the metric.
