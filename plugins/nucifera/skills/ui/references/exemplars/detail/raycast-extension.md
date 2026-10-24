# Raycast Store: an extension page (detail)

Source: https://www.raycast.com/thomas/color-picker, observed 2026-10-22 at 390x844, dark.

**The idea:** the item is shown as a physical key: the extension icon sits in a raised squircle tile like a keycap under a soft light, with its name, one line and three facts underneath, so a store page borrows the product's keyboard world.

**Measured:**
- First screen: icon tile (97x96), name 20/600, one-line description 14px, three facts in one row (author, "625,323 Installs", "AI Extension"), Share, tabs; screenshots start at y 773.
- Inter: 14px is 55% of characters, 13px 39%.
- Two secondary greys: white at 60% (48% of text) and #9C9C9D (39%).
- Colour: none from the page except the red logo; the icon brings the only colour.
- Canvas #07080A with a faint violet wash at the top (#28112E), the same on every extension page.
- Facts separated by 1px vertical hairlines, each with a 16px line icon.
- Motion on load: one 300 ms opacity transition (a carousel control); the page is still.
- About 110px of empty canvas between Share and the tabs.

**Transfer:**
- Present the object as an artifact from the product's own world (a key, a card, a document), not as a floating image.
- Three facts in one line under the name: who made it, how many use it, what kind it is.
- Social proof as an exact number ("625,323"), not "600K+".
- Let the object supply the only colour on the screen.

**Do not copy:** the keycap tile and the violet wash (Raycast's signature); two greys for secondary text; the empty band before the tabs; 13px facts; a centred composition for app screens that need data.

**With nucifera:** the object sits in the screen's one raised surface (`.card--edge`, or `.hero` with `.night` in the light theme); under it one line of three facts in 14px `--fg-2`, separated by commas, no icons. `.tabs` (Overview, History, Details) follow at once, with no gap.
