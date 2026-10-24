# Vercel: observability page, the incident chart (stats)

Source: https://vercel.com/products/observability, observed 2026-10-22 at 390x844, dark.

**The idea:** the chart's title is the finding, "/api/auth error rate increased to 42%", and the only colour on the screen is the red of that incident, inside a shaded time window.

**Measured:**
- H1 GeistSans 40/450, tracking -2.4px (-0.06em), line-height 48px; lead 18/400 #A1A1A1.
- Chart block at y 590: one 14px sentence with the path and the value in weight 550, a mono "5xx" tag, a 310x90 chart with three y labels and two x labels ("12h ago", "now").
- Colour: red #E5484D on one stroke; nothing else saturated in view.
- Two inks for all text: #EDEDED and #A1A1A1.
- Buttons: a filled light "Deploy now" and an outlined "Get a demo", both 16/500 pills.
- A second card ("Investigating") peeks under the first, implying the next step.
- Motion on load: none except a 150 ms colour transition on the menu.

**Transfer:**
- Title a chart with what happened, using the real numbers; the line only confirms it.
- Mark the period of interest as a band and colour only the anomaly.
- Two labels per axis are enough when the sentence carries the value.
- Hint at what comes next (a card peeking) instead of explaining the flow.

**Do not copy:** the -0.06em tracking (the house limit is -0.03em); the card stack; the 10px axis labels; the mono tag and Vercel's black-and-white brand.

**With nucifera:** a chart block with a 16px sentence above it in `--fg-1`, the key number in weight 600; the line in `--fg-2`, the anomaly segment in `--err` (or `--ok` for a good event), the band in `--bg-2`; no legend. On a landing the block can be the one raised surface (`.card--edge`).
