# Components (assets/kit.css)

Compose screens from these. When a screen needs something new, add a component to the project's copy of `kit.css` built from the same roles; do not inline one-off values.

| Component | Class | Use it for | Notes |
|---|---|---|---|
| Screen root | `.app` | every screen | canvas colour, body type; set `lang` to the content language |
| Padding | `.pad` | horizontal screen padding | 20px |
| Titles | `.t-display`, `.t-title`, `.t-headline` | screen title, card title, section title | one display title per screen |
| Lead | `.lead` | one sentence under the title | 16px `--fg-2` |
| Button | `.btn--primary`, `.btn--secondary`, `.btn--ghost` | main action, secondary, inline text action | one primary per screen; ghost and `.link` take the link colour, underlined in the dark theme; when a host platform has a native main button, use it instead of a page button |
| Chips | `.chips` > `.chip[aria-pressed]` | filters, quick choices | selected is lighter; 36px visual with a 44px touch area; action and status chips use `.chips--wrap` (wrap, 44px) |
| Field | `.field` > `input` | text input | 48px high, 16px text; `.field--error` + `.field-msg` for errors next to the field |
| Query block | `.query` | the user's request on a results screen | main line + secondary line + `.btn--ghost` "Edit"; replaces a long chip row |
| Card | `.card`, `.card--edge` | raised panel | at most one per screen, for the signature; hairline outline; edge highlight |
| Hero | `.hero` > `.hero__media` + `.hero__body` | the one main object of a screen (best result, product, article) | photo full-bleed, kept clear; in light theme add `.night` |
| Badge | `.badge` | one short label over media or next to a title | opaque, no dot |
| Rows | `.rows` > `.row` | lists of results, settings, history | thumb, title (2 lines max), meta, aside value; hairline separators; a status only when it is not the usual one |
| Stat | `.stat` | a number as the object (score, total, count) | big number + unit + label |
| Key-value | `.kv` > `.kv__row`, `.kv__total` | specs, receipts, summaries, details | a plain list on the canvas: label left in `--fg-2`, value right; no box, no grid of cells; totals in `.price` |
| Section head | `.section-head` | title of a list block with an action on the right | action is a ghost button with a 44px area |
| Glass bar | `.glassbar` | sticky header or filter bar | counts toward the two-glass limit |
| Time | `.t-time` | timestamps only | 13px; all other secondary text is 14px |
| States | `.skeleton`, `.empty`, `.status--ok/warn/err` | loading, empty, status | skeleton mirrors the final layout; empty states explain and offer the way out |
| Light (landing) | `.wash` | the single soft light behind a landing hero | never on app screens |

## Patterns

- Results screen: title with count, query block, one hero (best match) with its photo and the reason it fits, then dense rows. Main action in the bottom action.
- Detail or checkout screen: title, the object summary (thumb + name + key facts), what the user gets (rows or the signature element), when and where (key-value), total, main action.
- Empty state: what happened, why, one action to get out (for example "Reset filters"); shown only after the first server answer.
- Loading: skeleton of the final layout after 150 to 300ms, kept at least 300 to 500ms.
- Error: a line and message at the field on a neutral background, focus on the first one; blocking errors use the platform's alert.
