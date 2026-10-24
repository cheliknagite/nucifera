# Linear: landing hero (hero)

Source: https://linear.app/, observed 2026-10-22 at 390x844 and at 1440x900 (second image, shown at 720 px), dark.

**The idea:** the hero object is the product itself: a working issue view with real-looking data (issue IDs, agents, "2 min ago") starts right under the headline, so the first screen is half statement, half interface.

**Measured:**
- H1 38/510 on the phone, 64/510 at 1440; tracking -0.022em; line-height 1.1 and 1.0; lead 15px #8A8F98.
- The product UI starts at y 520 on the phone (bottom 38% of the screen) and fills 45% of the desktop viewport.
- Inside the UI: 12-13px text (68% of characters) with real labels ("DRV-8852 Faster app launch").
- Colour: yellow #F0BF00 on 8 status marks inside the UI, indigo #5E6AD2 on 3; the page chrome has none.
- No button in the phone hero; only "New Loops →" as a text link.
- Motion on load: 23 animations in view; each title line fades in from a blur (opacity, filter, transform, 1000 ms) 33 ms after the previous one (400-499 ms), the lead at 600 ms, the product at 1300 ms; no loops in the first screen.

**Transfer:**
- Make the product the hero; its real interface with believable data beats any illustration.
- On phones, start the product inside the first screen, cut by the fold rather than shrunk.
- Let colour live only inside the product (statuses, priorities); the page stays monochrome.
- Reveal in reading order: headline, lead, then the product.

**Do not copy:** the blur-in title lines and their 33 ms step; the arrangement "headline left, product below"; the indigo and Inter Variable 510; the issue content.

**With nucifera:** a landing `.hero`: `.t-display` 48-64px on desktop, smaller on the phone, Cyrillic line-height 1.15; `.rise` lines with `--i` at the house hero tempo, then the product screen as the one raised surface (`.card--edge`), with `--wash` allowed behind it.
