# Style: roles, themes and values

Read when you build or restyle anything. The values live in `assets/tokens.css`; this file says what each role is for and why.

## The idea in one paragraph

Precise, dark, product-grade. Depth comes from lightness steps and 1px hairlines, not from shadows or glow. The dark theme has no hue: white ink, a near-white main button, colour only for status; the light theme carries the violet. Screens are dense and read without effort: large text, one grey, plain lists, the real content at once. Character comes from one signature element taken from the subject, plus precise typography; effects are what make a dark page look generated. Reference products: Linear (precision, hairlines, ladder of surfaces), Raycast (one bold object, calm UI), Reflect (violet night, used sparingly).

## Surfaces and lines

| Role | Dark | Light "Dusk" | Use |
|---|---|---|---|
| `--bg-0` | #07060b | #dfddef | canvas |
| `--bg-1` | #100f16 | #f8f7fd | cards, fields, query block, receipts |
| `--bg-2` | #17161f | #d6d3e7 | chips, thumbnails placeholder, hover |
| `--bg-3` | #1f1e29 | #cecbe0 | selected, pressed |
| `--line-1/2/3` | white 7/11/16 % | violet ink 10/15/22 % | separators, card outlines, strong outlines |

Rules: at most three surface steps on a screen; each step is lighter; a raised panel gets a 1px `--line-1` outline (inset box-shadow) and may get the top-left edge highlight (`.card--edge`) or the 1px light top edge (`.lit`); a large dark gradient gets a fixed grain (`.grain`) so it does not band. On dark, shadows only under floating layers (`--shadow-float`). In light, cards get `--shadow-card` and stay white on the lilac canvas.

## Text

`--fg-1` for primary text and headings; `--fg-2` is the one secondary grey for everything else (9:1 on the dark canvas, 8.5:1 on the light one, 7:1 or more on every surface); `--fg-3` is the same grey, kept as an alias; `--fg-4` only for decoration, never for text. Sizes: body 16px, secondary 14px, 13px only for timestamps. Never key data (price, date, status) in small grey. Several shades of grey at 12 to 13px are what makes a screen tiring to read.

## Accent and main action

- Dark has no hue. `--accent` is the ink white (#f5f4fa): the current item, the newest mark of a chart. Links are white and underlined (`--link-line`).
- `--cta-bg`: the main action. Dark: #ececee, a near-white button with a #111113 label (16:1). Light: #1d1545, a dark violet "night window" button with a white label. When a host platform draws the main button natively, give it these colours.
- Light: `--accent` #5a42b2 (5.5:1 on the canvas): links, current state, the match score. At most three places on a screen. Night windows inside the light theme keep the violet #8b7cff.
- A brand colour replaces the accent roles in `.design/brand.css` for both themes; check the label on the button and accent text on the canvas at 4.5:1.
- Selected chips and tabs are lighter (`--bg-3`), not more colourful.
- Status colours (`--ok`, `--warn`, `--err`) go as text plus their own tint behind; the light values are dark enough for 4.5:1 on their tint on every surface. Never a second accent for decoration.

## Light theme "Dusk"

The same night seen by day: a lilac mist canvas, violet ink, near-white cards. Fonts, sizes, spacing, radii and layout stay identical to dark. The screen's main object (hero card, signature element) stays a dark "night window": add `class="night"` to it so it keeps the dark roles. Photos are never faded into white. No glow, no white translucent fills.

## Light (landing pages only)

One soft light behind the hero object: `--wash`, in the background's tone, alpha at most 0.08, centred at the top; it must not read as a coloured cloud and must not create a seam under a fixed header (start the fade below the header). App screens with lists, forms or checkouts have no light at all: their character comes from the signature element and type.

## Glass

At most two glass details on a screen: a sticky header or filter bar, or one badge over a photo. CSS default is solid (`--glass-bg` at alpha .96, no blur); set `data-fx="full"` on capable devices and `lite` on mid-range Android (`frame.js` sets `full` in mockups); weak Android and `prefers-reduced-transparency` stay solid. The screen must look finished without blur.

## Type

Geist for everything (text, numbers, headings), Geist Mono only for codes and IDs. Load it with the Cyrillic subset. Weights: 400 text, 500 labels and buttons, 600 titles. Scale: display 32 (landing h1 48 to 64), title 22, headline 18, body 16, secondary 14, timestamps 13. Tracking: -0.025em on display, -0.012em on 17 to 24px, about 0 on body; never tighter than -0.03em. Line-height: body 1.5, headings 1.15 for Cyrillic (1.1 is the minimum). Tabular digits only for prices, counters and timers. Details for Cyrillic in `typography-cyrillic.md`.

## Space and shape

4px grid. Mobile screen padding 20px; 8 to 12 inside a block; 24 to 32 between blocks; landing sections 96 to 128 on desktop, 48 to 64 on mobile. Radii: pill for chips and badges, 12 for fields and buttons, 16 to 20 for cards; an inner radius never exceeds its parent's. Touch targets 44px; fields 48px with 16px text; the main button 50px.

## Density

The user came for content. On list screens show as many real items as fit above the main button; on a detail or checkout screen everything needed to decide is visible without scrolling. Prefer flat rows with hairlines over stacks of cards, and label-value lists over grids of cells. Dense is not small: keep body 16px and secondary 14px, and win space by removing boxes, legends and repeated labels, not by shrinking text. A screen with two items and lots of air is a failure unless it is an empty state or a moment (success, onboarding).

## Motion

The tempo, curves, rules and recipes live in `references/motion.md`; the tokens (`--dur-*`, `--ease-*`, `--move-*`, `--scale-*`) in `tokens.css`. In short: two tempos, quick for the frequent and calm for the rare moments; every press answers, menus grow from their trigger, exits are faster than entries, only transform and opacity move, nothing delays the content, reduced motion keeps the meaning.

## App screens and landing pages: one style, two modes

| | App screen | Landing page |
|---|---|---|
| Main thing | the data and the action | the product and its message |
| Density | high: everything needed is visible | one idea per section, each about one screen; about 700 to 900 words in all (`references/landing.md`) |
| Type | functional; display 32 at most | display 48 to 64 on desktop |
| Images | the subject's real photos, as content | needed beyond the product window: the hero object and at most one per major section, one look |
| Light and effects | none | one soft light behind the hero (`--wash`) |
| Motion | recipes on state changes at the interface tempo; at most one moment per screen, on its event; no load choreography, no scroll reveals | the hero once on load, the live product window; one fade-up per block on scroll |
| Main action | in the flow of the task | next to the value it promises: in the hero and at the end; on phones a bottom bar once the hero button has scrolled away (`.cta-bar`) |

## Tailwind and frameworks

Map the same roles, do not invent new values. Tailwind v4:

```css
@import "tailwindcss";
@theme {
  --*: initial;                       /* drop the default palette so off-system classes do not exist */
  --color-bg-0: var(--bg-0); --color-bg-1: var(--bg-1); --color-bg-2: var(--bg-2); --color-bg-3: var(--bg-3);
  --color-fg-1: var(--fg-1); --color-fg-2: var(--fg-2); --color-fg-3: var(--fg-3);
  --color-line-1: var(--line-1); --color-line-2: var(--line-2);
  --color-accent: var(--accent); --color-accent-solid: var(--accent-solid); --color-cta: var(--cta-bg);
  --font-sans: var(--font-sans); --radius-md: var(--r-md); --radius-lg: var(--r-lg); --spacing: 4px;
}
```

Keep `tokens.css` as the source of truth and import it before Tailwind.
