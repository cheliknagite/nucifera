# Fragment: a collectible gift (detail)

Source: https://fragment.com/gift/plushpepe-1821, observed 2026-10-22 at 390x844, dark.

**The idea:** every attribute carries its rarity ("Gummy Frog 3%", "Platinum 2%", "Ring 0.4%"), and the ownership history follows straight after: the object is described like a provenance file, by facts, scarcity and dated events.

**Measured:**
- First screen: title 22/700 with a "Sold" tag, the 140px object, 5 attribute rows, the sale block, 4 history rows: 10 real data rows.
- The object takes 6% of the screen; the facts take the rest.
- 13px is 71% of characters, 14px 17%; labels #8C9AA9, values white 13/700.
- Rarity as 10px blue text on a dark tint, one per attribute.
- Colour: blue #4DB2FF in 16 text places (wallet addresses, rarity); red only on "Sold".
- Long addresses cut in the middle ("UQCID…F3nmx4qa"), both ends kept.
- Motion on load: the logo plays once (1000 ms); the gift is an animated sticker in a canvas, not counted by `getAnimations()`.

**Transfer:**
- Pair each attribute with how common it is; scarcity turns a spec sheet into a story.
- Put dated history, newest first, directly under the facts: provenance is part of the object.
- Keep the object small when the facts are the value; the screen is a document, not a poster.
- Shorten long identifiers in the middle so both ends stay checkable.

**Do not copy:** the 10-13px text; blue on every address; the boxed table look; the sticker and the red "Sold" tag; Fragment's navy.

**With nucifera:** `.kv` rows on the canvas: label 14px `--fg-2` left, value 16px `--fg-1` right, the share as a quiet 14px `--fg-2` suffix ("graphite metallic, 12% of listings"); history as `.rows` with `.t-time` dates. The hero photo stays in `.hero` at full clarity, but the facts must start inside the first screen.
