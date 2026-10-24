# Linear: 404 page (states)

Source: https://linear.app/changelog/this-page-does-not-exist-404, observed 2026-10-22 at 390x844, dark.

**The idea:** a tiny object tells the story: a small retro screen showing a scrambled, dithered page (the document that is not there), with two calm lines under it and nothing else.

**Measured:**
- The object: SVG 141x151, 6.5% of the screen, centred at y 322-473; static (no change over 3 s).
- "Not found" 15/590 near-white #F7F8F8; one sentence 15/400 in #8A8F98.
- 4 text elements in the first screen; 77% of characters in the grey.
- No button and no links below the message; only the site header.
- Colour: none in view.
- Motion on load: none.

**Transfer:**
- A small object with a precise metaphor is enough; a state does not need a big illustration.
- Keep the type at body size; an error of address is not an event.
- Stillness says "the app is fine, only this address is missing".

**Do not copy:** the retro screen; the lack of any way forward (in an app a state without an action is a dead end); the 15px sizes; the soft light around the drawing on app screens.

**With nucifera:** `.empty` with a drawing of about 140px in `--fg-2` lines; title `--t-headline` 18px, one 16px sentence in `--fg-2`; unlike Linear, always one action (`.btn--primary`, or the host's native main button).
