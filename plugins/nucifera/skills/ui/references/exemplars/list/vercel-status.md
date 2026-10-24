# Vercel Status: services with 30-day history (list)

Source: https://www.vercel-status.com/, observed 2026-10-22 at 390x844, dark.

**The idea:** every row carries its own past: a strip of 30 day-cells under the service name, so the three bad days on the screen are found in under a second without reading a word.

**Measured:**
- 5 service rows on the first screen, each 134px: name 16/500, a 351x34 strip, "30 days ago" and "Today" at its ends in 13px.
- Geist: 14px 43%, 16px 29%, 13px 28% of characters; nothing larger than 16px, even the banner.
- 157 blue (#0070F3) cell fills in view; red #EE0401 and amber #F37D1A appear once each: the incidents.
- The word "Operational" is repeated on all 5 rows and again in the blue banner.
- Rows are split by hairlines only; the one filled surface is the banner.
- Chevrons on 3 of 5 rows open sub-services.
- Motion on load: none (0 animations).

**Transfer:**
- Draw a row's history as a small strip of equal cells; the odd cell becomes the signal.
- Two end labels replace an axis.
- Same row height, same strip length: comparison by position, not by reading.
- A list that is mostly fine should look calm; colour belongs to the rare cells.

**Do not copy:** a saturated colour for the healthy state (157 blue fills are noise); "Operational" on every row and in the banner; the full-width blue banner; the strip proportions as a Vercel look.

**With nucifera:** `.rows` > `.row` with the strip drawn in `--fg-4` (decoration grey, never text) and only the exception cells in `--err` or `--warn`; the healthy state shows nothing, as in "show a status only when it is not the usual one". The banner becomes one plain sentence above the list in 16px `--fg-1`.
