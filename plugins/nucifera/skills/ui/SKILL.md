---
name: ui
description: >-
  Use when the user asks to design, build, restyle, polish or fix any visual
  interface: landing pages and websites, app and mobile screens, forms,
  filters, result lists, checkout screens, empty and loading states,
  dashboards, design mockups. Applies a precise dark product style (in the
  line of Linear, Raycast and Reflect) with a light "Dusk" theme, from tokens
  plus the project's brand file, and checks the rendered screens before
  hand-over. Not for backend, data or copy-only tasks.
license: MIT-0
---

# UI: precise dark style

You are the design lead. The look is dark, precise and product-grade, in the line of Linear, Raycast and Reflect: a near-black canvas, depth by a lightness ladder instead of shadows, 1px hairlines, a monochrome dark theme (white ink, a near-white main button, colour only for status), content that reads without effort, and a light theme "Dusk" with a violet accent as a full sibling. The style lives in precise execution, not in effects; effects are what make a dark page look AI-generated. Near-black with one accent is itself a known AI default, so the style earns its place only through the face of each screen: its signature, its real data and precise type.

Priority: the user's brief > the project's `.design/brand.css` > this style > defaults. If the user pins a look that conflicts with a rule below, follow the user and keep the craft.

## 1. Scene and direction, before any code

Write these to `.design/DESIGN.md` (create the folder; on later tasks update this file instead of starting a new one):

- **Scene**: who looks at the screen, where, in what light and mood. One sentence concrete enough to decide light vs dark.
- **Direction**: this style plus what is specific to the subject.
- **Accent**: the default (no hue in dark: white ink and a near-white main button; violet in the light theme), or the brand colour; name its roles (at most 3: main action, current selection, state).
- **Signature**: one element the screen is remembered by, taken from the subject's own world: its documents, instruments, artifacts or data. A car inspection gives a top-view paint-thickness map; delivery gives the route strip. It can be an object, a typographic statement or the way the data itself is shown; simple screens need none. One per screen; everything around it stays quiet. Read `references/signature-moves.md`.
- **Face**: one sentence on what makes this screen unlike any other product's: the signature, the one thing set larger or bolder than the system's default (a number, a word, a photo), and the real data only this product has. If the sentence fits any app, it is not a face yet.
- **Density**: what must be visible on the first screen without scrolling.
- **Motion**: the motion map, a short table of every state change with its recipe; actions used many times a day stay still. Read `references/motion.md`.

Decide yourself unless the user wants to choose; state the choice in one line of your reply.

Then raise the level with references: open `references/exemplars/index.md`, read the two cards closest to this screen type (pick at random among close matches) and the type's generic twin. Under the face, write a transfer note: three principles you take and three things you do not (block order, shapes, copy, the other product's signature). Close the cards and build from the note and the kit. Never build from a single reference and never repeat a reference's block order: copies are recognised at once.

## 2. Build from the system

Copy `assets/tokens.css`, `assets/kit.css` and `assets/motion.js` into `.design/` (for mockups also `assets/frame.html`, `frame.js`, `probe.js`). Use roles, never raw values: `var(--accent)`, not a hex. The tokens are the closed vocabulary; when something is missing, add a role to the project's brand file instead of inlining a value. For React or Tailwind map the same roles (`references/style.md`).

Compose screens from the kit (`references/components.md`): list rows, hero card, stat, chips, fields, key-value rows, section heads, states. When the kit lacks a piece, add a component rather than one-off styles.

The floor, in numbers:

- Type: Geist, with the Cyrillic subset when the content needs it. Weights 400/500/600, display at most 600. Tracking no tighter than -0.03em. Cyrillic headings: line-height at least 1.15 (`references/typography-cyrillic.md`).
- Spacing on a 4px grid: mobile screen padding 20, 8 to 12 inside a block, 24 to 32 between blocks.
- Text: body 16px; secondary 14px in one grey (`--fg-2`, 7:1 or more); 13px only for timestamps; never key data in small grey. Contrast at least 4.5:1.
- Surfaces: canvas, then raised steps that are lighter (about +0.02 to +0.03 OKLCH L) with a 1px hairline. On dark, no shadows except under floating layers.
- Touch targets at least 44px; text inputs at least 16px font.
- One accent. The main action is a filled `--cta-bg` button.
- Motion in two tempos from the tokens (`--dur-*`, `--ease-*`): quick for the frequent, calm for moments; built from the kit's recipes and `assets/motion.js`: every press answers, menus grow from their trigger, exits are faster than entries, only transform and opacity move, prices and results never wait for an animation, stagger only on a list's first show. At most one moment per screen (a photo growing into its card, the signature arriving once, success, on websites a window pouring out of the element that opened it and back), on its event, never in a loop. Reduced motion keeps the meaning.

Readable beats compact: people read on the go, and anything they have to decode is a failure.

- Data as a plain list on the canvas: label left, value right, a hairline between rows (`.kv`). No grids of hairline cells, no card with rows inside.
- At most one raised surface per screen, and it holds the signature.
- Say it once: show a status only when it is not the usual one (show "paused", hide "active"); no legend or labels that only explain a drawing.
- Copy in the product's own words: read its interface texts (strings, bot replies, docs) and reuse their terms; never coin a new name for a feature. An offer or a price reads the same wherever it appears.
- A drawing reads without a legend. If it needs one, simplify it and put one plain sentence under it saying what it shows.
- Action and status chips wrap onto a second row (`.chips--wrap`, 44px), never cut at the screen edge.

Density means everything needed is visible, not that it is small: show the real content. A results screen shows as many real items as fit; the hero object gets its photo when the subject has photos. Photos are content: keep them clear, never dim or tint them until they wash out.

The light theme "Dusk" is `[data-theme="light"]`: same fonts, sizes, radii and layout; colours change by role; the screen's hero object stays a dark "night window" (`class="night"`). It is never an inversion.

## 3. Never, and what to do instead

| Never | Instead |
|---|---|
| Colour, font, radius or shadow outside the tokens | the role from `tokens.css`; brand colours only through `--brand-*` |
| Coloured glow, halo or coloured shadow | a lightness step (`--bg-2`) or the dark `--shadow-float` under floating layers |
| Gradient or shine on buttons, gradient text | solid `--cta-bg`; text in `--fg-1` |
| Glass on cards, more than two glass details | glass only on a sticky header or filter bar, or one badge over a photo, with the solid fallback |
| Decorative coloured dots | a dot only for live status; otherwise none |
| Card inside a card, grids of identical icon cards, feature lists in icon tiles | flat rows with hairlines; one hero card per screen |
| Small grey text in several shades; data in grids of hairline cells or in a card with rows inside | 16px body, 14px secondary in one grey; a plain label-value list on the canvas |
| A drawing that needs a legend; the same status repeated on every row | dots or a simple shape plus one plain sentence; show only the exception |
| Motion everywhere: pulsing indicators, the same fade on every element of an app screen, hover scale on many elements, entrance animation on headings and text in app screens | motion only where something changes, from the recipes and the motion map; on landings the scroll reveal (one fade-up per block, once) is a recipe, not this tell |
| Bounce or a spring on simple actions, ease-in, entrances from `scale(0)`, `transition: all`, scroll reveals in app screens | `--ease-out`; the spring only on sheets and the selection pill; scroll reveals only on landing pages |
| Eyebrow labels over every heading, 01/02/03, data glued with "·" | plain headings; data separated by commas |
| One heading word in another colour, headings heavier than 600 | hierarchy through size and weight |
| Untuned font defaults (wrong subset, line-height 1.0 on Cyrillic headings) | the right subset, house weights, line-height 1.15, tracking from -0.03em |
| Pictures of the product's own controls (a chat's keys, a screenshot's buttons) drawn like page buttons | depicted controls flat and inert: no border, default cursor, not focusable; only page actions are buttons |
| An airy screen with two items where the user came for data; washed-out photos | dense real content; photos at full clarity |
| Re-drawing a host platform's own chrome (headers, bottom buttons, payment sheets) inside an embedded web app | the platform's native controls; mockups may show them, labelled approximate |

Why these and not "avoid an AI look": a vague ban swaps one default for the next; named patterns with a named replacement hold. The full list with reasons and dates is in `references/refusals.md`.

## 4. Platform

- App screens: quiet mode. No light effects on lists, forms and checkouts; character comes from the signature element, type and density. Mockups use `assets/frame.html` (a phone frame with an optional top bar and bottom action).
- Website or landing: the same tokens. One hero object per page. A single soft light is allowed behind the hero, in the background's tone and at most alpha 0.08 (`--wash`). The hero rises once on load, and blocks may fade up once as they scroll in (`nuMotion.reveal`); app screens get neither. On a phone the hero object crosses into the first screen with its key data. The main action sits in the hero and at the end; on phones a bottom bar repeats it once the hero button has scrolled away (`.cta-bar`, `nuMotion.ctaBar`), and the header holds no action. A landing longer than two screens needs images beyond the product window (the subject's object, a real photo, at most one illustration per section, one look): text and UI alone read as empty (`references/image-direction.md`). Landing pages read `?theme=light|dark` in a one-line head script, so `verify.mjs` can shoot both themes.
- Payment methods and business rules are not this skill's concern: a checkout screen is an ordinary screen.

## 5. Check before hand-over

1. For HTML mockups and pages run `node <this-skill-dir>/scripts/verify.mjs .design/<file>.html`. It renders every screen at 360, 390 and 430px in the dark theme and at 390px in the light one, and writes `.design/verify/report.md` with FAIL and WARN lines: overflow, clipped text, contrast, touch size, fonts, small text, more than one secondary grey, coloured glows, glass count, accent places, tabular digits, and motion lint (`transition: all`, ease-in, endless loops). Fix every FAIL. At most three rounds; if the same FAIL comes back, stop and report it.
2. Look at the screenshots yourself against the checklist in `references/verify.md`: one main element and action, three text levels, no cramped areas or empty thirds, the signature present, nothing from section 3. Open the page in a browser and trigger every change from the motion map.
3. For a new type of screen, or before a release, run the `design-critic` agent with the screenshots, the brief, `.design/DESIGN.md` and the same two exemplar cards plus the twin. It checks the rules and the level: closer to the exemplars or to the generic twin, and the biggest gap. Apply rule findings and level findings that name a place in an exemplar; ignore bare taste claims. If the verdict is "closer to the twin", make one pivot (change the face, the signature or the density, not polish), check again, then stop. Wait for its report before you hand over: never hand over while it runs. If it cannot run or does not answer, write "CRITIC NOT RUN" in the hand-over.
4. Without a browser (claude.ai, the API) build anyway and write "PIXELS UNVERIFIED" in the hand-over.

Hand over: file paths, the screenshots, what was checked, what remains open.

## Reference files

- `references/style.md`: token roles for both themes, light, glass, app screens vs landing pages, Tailwind mapping.
- `references/motion.md`: the tempo, curves, rules, recipes and haptics for motion.
- `references/exemplars/index.md`: reference cards per screen type with their generic twins: the level to aim at, never a template.
- `references/components.md`: the kit and when to use each component.
- `references/typography-cyrillic.md`: Cyrillic typography, numbers and prices.
- `references/signature-moves.md`: how to find the one memorable element in the subject.
- `references/refusals.md`: the full list of AI tells with replacements and dates.
- `references/verify.md`: verification details and the critic checklist.
- `references/image-direction.md`: prompts for image generators in this style.
