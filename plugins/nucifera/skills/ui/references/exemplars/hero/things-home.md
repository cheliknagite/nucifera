# Things: product landing hero (hero)

Source: https://culturedcode.com/things/, observed 2026-10-22 at 390x844, light.

**The idea:** the app icon is a crafted object (a blue tray holding a white card with a tick) shown large as the hero, the name under it, and the real app window peeking in at the fold.

**Measured:**
- The icon image (242x291) takes 21% of the screen; the tilted app window at the bottom another 18%, cut by the fold.
- The lead is 20.25px (87% of all characters), #44474B, centred, line-height 1.25.
- Colour: one blue #5C9CF5 for the single link "Watch Introduction Video" with a play icon; otherwise only the icon's own blue.
- Canvas #F2F5F7, a cool very light grey, not white.
- No button anywhere on the first screen; navigation is 3 text links at 50% ink.
- Motion on load: none (0 animations).

**Transfer:**
- Make the hero object a carefully rendered artifact of the product (its icon, a key part) with real material and light.
- A large lead (about 20px) on a light page reads calmer than small grey copy.
- Show the real product at the fold edge so scrolling has an obvious reason.
- A first screen can go without a button when the next action is "look".

**Do not copy:** the tray-and-tick icon; the blue; the centred icon-name-text stack; the Things wordmark.

**With nucifera:** the light theme "Dusk" (`[data-theme="light"]`, lilac `--bg-0`): the hero object stays a dark "night window" (`.night`), the lead is 16-20px in `--fg-2`, the link follows `--link`.
