# Verify: code measures, a fresh critic looks, the user chooses

Code measures geometry and colour; a separate critic judges hierarchy from images; the choice between two decent options belongs to a human, ideally blind.

## 1. Measure with code

```
node <skill-dir>/scripts/verify.mjs .design/<file>.html [--widths 360,390,430] [--light 390]
```

- Needs Chrome, Edge or Chromium installed (no npm packages). Without a browser: hand over with "PIXELS UNVERIFIED".
- Mockups built from `assets/frame.html` (with `frame.js` and `probe.js` next to them) get screenshots of every screen at each width in the dark theme and at the light widths in "Dusk", plus measurements per screen. Other pages and URLs get screenshots only.
- Output: `.design/verify/report.md`, `report.json`, PNGs. Exit code 1 if anything FAILs.

FAIL (fix before hand-over): overflow past the screen edge, contrast below 4.5:1 (3:1 for large text), touch targets under 44px, input text under 16px, coloured glow, gradient on a control, more than two glass elements, a font that did not load, Cyrillic heading line-height under 1.12.
WARN (look, fix unless intended): clipped text, text under 13px, more than one secondary grey, accent in more than three places, tabular digits outside prices and counters, heading weight over 600, small chips.

Rounds: fix all FAILs, run again; at most three rounds. If the same FAIL survives a fix, stop and report it with the screenshot. Change one thing at a time and undo a change that adds failures.

## 2. Look yourself, with this checklist (yes or no)

1. One main element and one main action on the first screen.
2. Three readable levels of text (title, body 16px, secondary 14px in one grey), and nothing to decode: no legend needed, no data in boxes, nothing said twice.
3. No cramped areas; no empty area larger than a third of the screen (unless empty or success state).
4. At most three surface steps; no card in a card; glass only where allowed and readable.
5. The signature from DESIGN.md is there and carries the screen; the rest is standard. A grey screen with one accent and no signature fails.
6. Nothing from the Never table in SKILL.md and refusals.md.
7. Real data in the right language, one price format; loading, empty and error are distinguishable where relevant.
8. Main action under the thumb; where the host platform has native controls, they are used; no fake platform UI in a real page.
9. Dark theme has no hue except status colours, the main button near-white. Light theme is not an inversion: cards visible, button dark with a white label, links dark violet, hero a night window, same fonts and radii.
10. Every requirement of the brief is on screen.

Screenshot checks: in Cyrillic headings the dots of Ї do not touch descenders above and "її" shows four dots; price digits line up; photos are clear; the light (landing only) has no banding and no seam under the header.

## 3. Fresh critic (agent `design-critic`)

Run it for a new kind of screen and before a release, not for every small change. Give it only: the screenshot paths, the brief, `.design/DESIGN.md`. Do not explain your choices to it. It returns at most five findings, each with the rule it breaks, the screenshot, the place and a concrete fix; zero findings is a valid answer. Apply findings that cite a rule; ignore taste claims. Then ask it for a verdict per finding (resolved / partial / not resolved) without a new search. Wait for its answer before you hand over; if it cannot run or does not answer, write "CRITIC NOT RUN" in the hand-over instead of skipping it silently.

## 4. The user's blind choice

When two decent variants remain, show them side by side with letters instead of names and let the user choose. Agreement between experts on close pairs is about 65%; model judges are near chance there, so the human decides.
