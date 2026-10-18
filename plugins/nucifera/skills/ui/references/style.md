# Style: roles, themes and values

Read when you build or restyle anything. The values live in `assets/tokens.css`; this file says what each role is for and why.

## The idea in one paragraph

Precise, dark, product-grade. Depth comes from lightness steps and 1px hairlines, not from shadows or glow. One accent hue appears only where it means something. Screens are dense and readable: the user sees the real content at once. Character comes from one signature element taken from the subject, plus precise typography; effects are what make a dark page look generated. Reference products: Linear (precision, hairlines, ladder of surfaces), Raycast (one bold object, calm UI), Reflect (violet night, used sparingly).

## Surfaces and lines

| Role | Dark | Light "Dusk" | Use |
|---|---|---|---|
| `--bg-0` | #07060b | #dfddef | canvas |
| `--bg-1` | #100f16 | #f8f7fd | cards, fields, query block, receipts |
| `--bg-2` | #17161f | #d6d3e7 | chips, thumbnails placeholder, hover |
| `--bg-3` | #1f1e29 | #cecbe0 | selected, pressed |
| `--line-1/2/3` | white 7/11/16 % | violet ink 10/15/22 % | separators, card outlines, strong outlines |

Rules: at most three surface steps on a screen; each step is lighter; a raised panel gets a 1px `--line-1` outline (inset box-shadow) and may get the top-left edge highlight (`.card--edge`). On dark, shadows only under floating layers (`--shadow-float`). In light, cards get `--shadow-card` and stay white on the lilac canvas.

## Text

`--fg-1` 17:1 for primary text and headings, `--fg-2` 11:1 for secondary, `--fg-3` about 6:1 for meta and captions, `--fg-4` only for decoration. Never put information the user must read in `--fg-4`, and never key data (price, date, status) in 13px `--fg-3`.

## Accent and main action

- `--accent` #8b7cff (dark) / #5a42b2 (light): text accents, links, current state, the match score. At most three places on a screen.
- `--accent-solid` #6e56cf: filled elements; white label 5.4:1.
- `--cta-bg`: the main action. Dark: the violet `--accent-solid`. Light: #1d1545, a dark violet "night window" button with a white label. When a host platform draws the main button natively, give it these colours.
- Selected chips and tabs are lighter (`--bg-3`), not more colourful.
- Status colours (`--ok`, `--warn`, `--err`) go as text plus their own tint behind; never a second accent for decoration.

## Light theme "Dusk"

The same night seen by day: a lilac mist canvas, violet ink, near-white cards. Fonts, sizes, spacing, radii and layout stay identical to dark. The screen's main object (hero card, signature element) stays a dark "night window": add `class="night"` to it so it keeps the dark roles. Photos are never faded into white. No glow, no white translucent fills.

## Light (landing pages only)

One soft light behind the hero object: `--wash`, in the background's tone, alpha at most 0.08, centred at the top; it must not read as a coloured cloud and must not create a seam under a fixed header (start the fade below the header). App screens with lists, forms or checkouts have no light at all: their character comes from the signature element and type.

## Glass

At most two glass details on a screen: a sticky header or filter bar, or one badge over a photo. CSS default is solid (`--glass-bg` at alpha .96, no blur); set `data-fx="full"` on capable devices and `lite` on mid-range Android (`frame.js` sets `full` in mockups); weak Android and `prefers-reduced-transparency` stay solid. The screen must look finished without blur.

## Type

Geist for everything (text, numbers, headings), Geist Mono only for codes and IDs. Load it with the Cyrillic subset. Weights: 400 text, 500 labels and buttons, 600 titles. Scale: display 32 (landing h1 48 to 64), title 22, headline 17, body 15 to 16, small 13. Tracking: -0.025em on display, -0.012em on 17 to 24px, about 0 on body; never tighter than -0.03em. Line-height: body 1.5, headings 1.15 for Cyrillic (1.1 is the minimum). Tabular digits only for prices, counters and timers. Details for Cyrillic in `typography-cyrillic.md`.

## Space and shape

4px grid. Mobile screen padding 20px; 8 to 12 inside a block; 24 to 32 between blocks; landing sections 96 to 128 on desktop, 48 to 64 on mobile. Radii: pill for chips and badges, 12 for fields and buttons, 16 to 20 for cards; an inner radius never exceeds its parent's. Touch targets 44px; fields 48px with 16px text; the main button 50px.

## Density

The user came for content. On list screens show as many real items as fit above the main button; on a detail or checkout screen everything needed to decide is visible without scrolling. Prefer flat rows with hairlines over stacks of cards. A screen with two items and lots of air is a failure unless it is an empty state or a moment (success, onboarding).

## Motion

Only for state changes and feedback: press `scale(.97)`, 100 to 240ms, ease-out, transform and opacity only, never `transition: all`. Items opened many times a session (rows, chips, menus) appear without animation. Respect `prefers-reduced-motion`.

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
