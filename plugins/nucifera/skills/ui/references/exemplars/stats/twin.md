# Generic twin: stats

How a default AI generator builds a numbers, analytics or dashboard screen with the same content:

- Four KPI cards in a 2x2 grid, each with a coloured icon in a tinted circle, a big number, a label and a green "+12%" pill; all four cards identical in shape.
- Rounded, generic numbers: "10K+ users", "99% uptime", "24/7 support", "50+ countries".
- A gradient area chart (violet fading to transparent) titled "Overview" or "Analytics", with a legend, full gridlines, 6-8 labels on each axis and a tooltip that appears only on hover.
- A donut chart with a five-colour legend next to it.
- Dark cards with neon accents and a glow under the chart.
- Every number counts up from zero when it scrolls into view.

**Named differences:**

1. **The title is the finding.** Vercel's chart reads "/api/auth error rate increased to 42%"; the twin's reads "Overview".
2. **Live proof.** Plausible shows the current visitor count with a live dot, and Stripe's GDP counter ticks; the twin's numbers are static and rounded.
3. **Scope and period.** Stripe writes "processed in 2025" and "historical uptime"; the twin writes "10K+ users".
4. **Colour on the anomaly only.** Vercel's only colour is the red incident segment and Plausible's only chart colour is one line; the twin colours every icon, pill and chart series.
5. **One chart, chosen by the selected number.** Plausible switches one chart from the metric list; the twin adds a donut and a legend beside the area chart.
6. **Numbers arrive in place.** Exemplars load their numbers with 0-1 animations; the twin counts every number up on scroll.
