# Plausible: public analytics dashboard (stats)

Source: https://plausible.io/plausible.io, observed 2026-10-22 at 390x844, light.

**The idea:** the dashboard is live and public: a green dot with the current visitor count at the top, six numbers each with its change, and one chart, so the product proves itself with its own data.

**Measured:**
- First screen: live count, Filter and date range, 6 metrics in 2 columns, a 28-day line chart (330x368, 37% of the screen), the start of the sources tabs.
- Metric values 19.2/600 ("678k", "2.4M", "4m 34s"); labels 12/600 uppercase; deltas 12/500 with arrows.
- 12px is 76% of characters: the screen is carried by numbers, not words.
- Colour: indigo #615FFF only on the chart line and its pale fill; the Sign up button #4F39F6; green #00BC7D on the live dot; green and red only on delta arrows.
- Ink: three neutral greys (OKLCH L 0.21, 0.27, 0.55); the selected metric sits on a grey tile.
- Live data: the visitor count read 217, then 231 on a second capture minutes later.
- Motion on load: one 300 ms opacity fade on a panel; spinners only in panels still loading.

**Transfer:**
- One live number at the top tells the person the screen is current.
- Every number travels with its change over the period; direction by arrow and colour, size by the number.
- One chart, switched by the selected number; the selection is the only highlighted tile.
- Colour belongs to the data marks; the chrome stays neutral.

**Do not copy:** 12px uppercase labels; the 2-column tile grid with dividers; the indigo; the block order of this dashboard.

**With nucifera:** `.stat` for the one number that matters, `.roll` when it updates, the live dot as the only dot on the screen (a dot is allowed for live status); the other metrics as `.kv` rows with the change in 14px `--fg-2` ("+6 this week"), not a tile grid. The chart line in `--fg-1`, `--accent` only on the selected point.
