# Fragment: username auctions (list)

Source: https://fragment.com/, observed 2026-10-22 at 390x844, dark.

**The idea:** the item is its own name: every row leads with "@handle" in bold with its live link "handle.t.me" under it, so the list reads like a register of names, not a catalogue of cards.

**Measured:**
- 11 auction rows on the first screen, one every 45px, under a 22/700 title, one line of copy and a search field.
- The list takes about 70% of the screen; title, copy and search together under a third.
- A real table (13 `tr` in view): name left; price and time left in a fixed right column; chevron at the edge.
- ProductSans: 11px is 46% of visible characters, 13px 32%, 14px 15%; no negative tracking.
- Colour: one blue #4DB2FF in 23 text places (links, ".t.me"), one filled button #248BDA; the TON diamond before each price is the only icon in the rows.
- Depth by lightness only: canvas #111417, table head #212A33, no shadows.
- Motion on load: 2 animations, the logo plays once (1000 ms) and the tab strip settles (200 ms); rows are still.

**Transfer:**
- Lead each row with the thing's own identifier in the heaviest weight.
- Put the value people compare in one fixed right column, so the eye runs down a single line of numbers.
- Say urgency as data under the value ("4 days 12 hours left"), not as a badge.
- Let one currency or subject glyph be the only icon in a row.

**Do not copy:** the 11-12px secondary text and column headers (below the floor); blue on every subdomain; the navy palette and ProductSans; the TON diamond; the "Username / Minimum bid" table head.

**With nucifera:** `.rows` > `.row` on `--bg-0` with `--line-1` hairlines and no header row: title 16px/600 `--fg-1`, aside value 16px with tabular figures, the time line 14px `--fg-2` under it. No `.card` around the list; if the screen has a raised surface, it is the `.query` block above. Photo thumbs, if used, stay left and small so the name keeps the lead.
