# Cyrillic typography, numbers, prices

Measured in Chromium (October 2026). Apply to any Cyrillic UI (Ukrainian, Russian, Belarusian, Bulgarian). The Ukrainian letters і ї є ґ and the pair "її" are the hardest test, so check with them even when the content is Russian.

## Font

- Geist, loaded with the Cyrillic subset. In Next.js `next/font` use `subsets: ["latin", "cyrillic"]`; a Latin-only subset silently falls back to the system font for every Cyrillic letter. With Google Fonts CSS2 the `cyrillic` and `cyrillic-ext` ranges come automatically.
- Currency signs like ₴ live in `cyrillic-ext`; the Ukrainian apostrophe is ’ (U+2019); ʼ (U+02BC) only if the font has the glyph.
- Check every new font on "її", "ії", "дії", "інформації", "Їжак". Onest and Manrope merge "її" in headings; Geist merges it at -0.04em; Inter 4 is clean; Fixel needs `font-feature-settings: "liga" 1`.
- Inter, if a project insists on it: use the variable font with the optical-size axis (`family=Inter:opsz,wght@14..32,400..700`, `font-optical-sizing: auto`); never `ss02`, `ss04`, `cv08` on Cyrillic (serifs on І/Ї, slashed zero); `cv11` only on purpose.

## Line-height and tracking

| Setting | Latin habit | Cyrillic rule | Why |
|---|---|---|---|
| Heading line-height (32px and up) | 1.0 | 1.15, at least 1.1 | at 1.0 the tails of ц, щ, у touch the dots of Ї, Й on the next line |
| Display tracking | -0.04 to -0.06em | no tighter than -0.03em | tight pairs like к-у, т-у, г-у collide; "її" merges |
| Ligatures | default | `"liga" 1` explicitly when tracking is not 0 | browsers drop ligatures under tracking |
| Text length | 1.0 | about 1.36 to 1.39 of English | plan buttons and labels for the longer text |

## Numbers and prices

- Tabular digits only in prices, counters and timers (`.price`, `.counter`); proportional elsewhere, including headings.
- One price format per project, produced by `Intl.NumberFormat`, never typed by hand. Pick it with the user and keep it everywhere. Examples:
  - `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })` gives "$27,400";
  - `new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 })` gives "27 400 $" with no-break spaces.
- Separate data with commas, not with "·". Time ranges use an en dash: "10:00–12:00".
- Percent in Ukrainian and Russian text: "94 %" with a no-break space.

## Copy

- Real data in mockups, in the interface language: names, cities, dates, local phone formats.
- Short verbs on buttons, with the amount when there is one.
- No placeholders in another language inside the interface.
