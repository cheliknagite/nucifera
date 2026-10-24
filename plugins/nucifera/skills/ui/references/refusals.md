# Refusals: AI tells and what to do instead

A list of patterns that make interfaces read as generated, each with a replacement. Dated, because yesterday's fix becomes tomorrow's tell; review once a year with the same measurements. Basis: measurements of 19 reference and copy sites (October 2026), blind reviews, and the tell catalogues of Anthropic's frontend-design, taste-skill, better-frontend, avoid-ai-design and design-slop-cop.

The brief wins: if the user asks for one of these, do it well instead of refusing.

| # | Never | Instead | Basis | Since |
|---|---|---|---|---|
| 1 | colour, font, radius, shadow outside the tokens | the role from tokens.css; brand via `--brand-*` | precise specs are followed; raw values drift | 2026-10 |
| 2 | coloured glow, halo, coloured `box-shadow` (blur 15px+, alpha 0.1+, saturated) on 2+ elements | lightness step or dark `--shadow-float` | 0 of 8 originals, 2 to 5 in copies | 2026-10 |
| 3 | a permanent gradient, shine or coloured shadow on the main button | solid `--cta-bg`; one pass of light when it becomes available is a moment (`.btn--sheen`), not a look | measured on all copies, none of the originals | 2026-10 |
| 4 | gradient text, especially multicolour | `--fg-1`; on a landing one monochrome fade of white at most | detector tells | 2026-10 |
| 5 | background light brighter than alpha 0.08, a new hue, a coloured cloud; light on list or form screens | one light in the background tone behind the landing hero; none in app screens | AI sketches vs originals | 2026-10 |
| 6 | accent in more than three places or on more than ~2% of the screen | selection by lightness; one text accent | originals use 0 to 3 | 2026-10 |
| 7 | glass on cards, more than two glass details, blur without a solid fallback | sticky header or filter bar, one badge over a photo; solid on weak devices | detectors exclude only full-width bars | 2026-10 |
| 8 | decorative coloured dots before labels, in badges, in rows | a dot only for live status | user review, taste-skill, better-frontend | 2026-10 |
| 9 | pills over photos used as decoration ("Plate · 02") | at most one informative badge, opaque | better-frontend | 2026-10 |
| 10 | card inside a card, grids of identical cards, feature lists in icon tiles | flat rows with hairlines, one hero card | Claude's fingerprint in 6 of 6 layouts; template frame | 2026-10 |
| 11 | eyebrow labels over every heading, 01/02/03 when not a real sequence | plain headings | Anthropic tell cluster | 2026-10 |
| 12 | data glued with "·" ("2022 · 39,000 km · petrol") | commas | Anthropic tell cluster | 2026-10 |
| 13 | one word of a heading in another colour or weight | hierarchy through size and weight | Anthropic tell | 2026-10 |
| 14 | headings in 700 to 900 weight, tracking 0 at display sizes | 500 to 600, -0.02 to -0.03em | 6 of 11 copies vs 0 originals | 2026-10 |
| 15 | untuned default font (Latin subset, no optical size, default features) | Geist with Cyrillic subset, house weights; Inter only with `opsz` | the untuned font is the tell, not the family | 2026-10 |
| 16 | line-height 1.0 or tracking tighter than -0.03em on Cyrillic headings | 1.15 and -0.03em at most | collisions of Ї with ц, щ, у; merged "її" | 2026-10 |
| 17 | `tabular-nums` on the whole screen | only prices, counters, timers | headings get wide 1 and slashed zero | 2026-10 |
| 18 | text under 4.5:1, secondary grey you have to squint at | `--fg-2`, one secondary grey at 7:1 or more | WCAG 2.2 AA | 2026-10 |
| 19 | an airy screen with two items where the user came for data | dense real content, all key items visible | blind comparison | 2026-10 |
| 20 | photos dimmed, tinted or faded into the background until they wash out | photos at full clarity; in light theme no fade into white | user review | 2026-10 |
| 21 | warm cream background with a high-contrast serif and a terracotta or sage accent | if warmth is wanted: a muted stone ground, an accent from another hue family, a sans display | the 2026 "tasteful default" | 2026-10 |
| 22 | near-black with one acid accent as the only idea | the signature move from the subject | Anthropic tell cluster | 2026-10 |
| 23 | re-drawn host chrome (header, bottom button, payment sheet, fake status bar) inside an embedded web app | the host platform's native controls; mockups may emulate, labelled | duplicates of the native frame | 2026-10 |
| 24 | light theme made by inverting the dark one | roles per theme ("Dusk"), hero stays a night window | inversion gives invisible cards and 1.8:1 links | 2026-10 |
| 25 | blocks sliding in on scroll in app screens, lift on hover everywhere, `transition: all` | app screens: none; landing pages: one fade-up per block, once (`nuMotion.reveal`), content visible without the script; hover: colour only, where a pointer exists | generated-looking motion; scroll reveals allowed on landings after review | 2026-10 |
| 26 | generic headline that fits any product ("Revolutionize your workflow", "10x faster") | the subject's job in 3 to 5 words with real nouns | template copy | 2026-10 |
| 27 | em dashes as decoration in UI copy | commas, colons, separate sentences; en dash only in ranges like 10:00–12:00 | copy tell | 2026-10 |
| 28 | secondary text in two or three greys at 12 to 13px | body 16px, secondary 14px in one grey (`--fg-2`, 7:1 or more), 13px only for timestamps | blind review of a two-model test: "hard to read" | 2026-10 |
| 29 | data cut into boxes: grids of hairline cells, a card with rows inside, several raised panels on one screen | a plain label-value list on the canvas; one raised surface per screen, for the signature | same test, both models | 2026-10 |
| 30 | a drawing that needs a legend or labels to decode; the same status on every row | dots or a simple shape plus one plain sentence; show only the exception ("paused") | same test, both models | 2026-10 |
| 31 | a filled violet main button on a near-black screen | monochrome dark: a near-white main button, colour only for status; the violet stays in the light theme | same test: "the dark violet looks generated" | 2026-10 |
| 32 | motion everywhere: pulsing indicators, blur entrances on 3+ elements, hover scale on 3+, stagger on 2+ lists in one view, the same fade on 4+ components | motion only where something changes, picked from the recipes in `references/motion.md` | motion tell catalogues (design-motion-principles) | 2026-10 |
| 33 | bounce or overshoot on utility actions, a spring on simple state changes, ease-in on interface motion, entrances from `scale(0)` | `--ease-out`; the 2 % spring only on sheets and the selection pill; start from 95 to 97 % | production CSS of Linear, Vercel, Raycast; agent motion skills | 2026-10 |
| 34 | content held back for show: prices, totals and search results animated in; load choreography on product screens; entrance motion on headings, paragraphs, navigation | the task is there at once; at most one orchestrated moment per page (on landings, the hero) | "never delay the payload" | 2026-10 |
| 35 | one pace for everything: frequent menus as slow as a moment, or moments as quick as a menu | two tempos from the tokens: the interface tempo for the frequent, the moment tempo for the rare; exits about two thirds of entries, press stays 100 ms, 100+/day actions without motion | blind review of twelve recipes, then measured products (120 to 320 ms) | 2026-10 |
| 36 | a kit applied cleanly with no face: the screen could belong to any app | the face line in DESIGN.md (the signature, one thing set larger than the default, real data only this product has), checked against exemplars | blind tests of a rules-only skill: "a well-applied kit, not a product"; near-black with one accent is a known AI default | 2026-10 |
| 37 | moments everywhere: two on one screen, one on a timer or in a loop, the same moment on every open | one moment per screen, on its event, once (`references/motion.md`, section 5); later opens are still | blind showcase of six moments: the wow came from one object followed by the eye; repeated motion annoys | 2026-10 |

Grow the list from tests: after a test round, note which new default replaced a banned one, and add a row only when it repeats in two or more tasks and can be checked. A pattern that keeps coming back after being banned needs a component, not another rule.
