# Linear: a changelog post (detail)

Source: https://linear.app/changelog/2026-10-08-stacked-pull-requests, observed 2026-10-22 at 390x844, dark.

**The idea:** the product shows itself: the illustration is a real crop of the Linear interface that dissolves into the black canvas without a frame, so the feature and the page read as one surface.

**Measured:**
- First screen: back link, date with Share, title, the product image (342x199, 21% of the screen), three paragraphs.
- Title 24/590, tracking -0.288px (-0.012em); body 15/400, line-height 24px (1.6), tracking -0.011em.
- Three inks: body #D0D6E0 (79% of text), title #F7F8F8, meta #8A8F98.
- Colour: none in view; links are white text with an underline.
- Canvas #08090A; one hairline under the date row; no cards, no borders around the image.
- Weights 510 and 590 of a variable font; nothing at 700.
- Motion on load: none in the first screen.

**Transfer:**
- Use the product's own interface as the illustration, cropped to the relevant part and fading into the background.
- Date and share on one line above the title, separated from it by a hairline.
- Body in near-white; the title alone gets the brightest ink.
- Links underlined instead of coloured.

**Do not copy:** the dissolving screenshot as a frame for anything that is not the real product; the 15px body (the floor is 16); the exact meta row; Linear's 510/590 weights and its copy.

**With nucifera:** `.hero` without a frame, the media edge fading into `--bg-0`; title `--t-title` 22px; body 16px `--fg-1`, the lead in `--fg-2`; the date in `.t-time`; links already follow `--link` and `--link-line` (white, underlined).
