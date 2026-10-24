# Resend: landing hero (hero)

Source: https://resend.com/, observed 2026-10-22 at 390x844, dark.

**The idea:** one break in the type scale carries the brand: "Email for developers" in a 64px high-contrast serif on a black page where everything else is a quiet sans, with one dark 3D object (a cube of tiles) as the only picture.

**Measured:**
- H1 Domaine 64/400, tracking -0.64px (-0.01em), line-height 1.0; the lead Inter 16px #A1A4A5, centred.
- Only 5 text elements in the first screen; 71% of characters are 16px.
- The object: a looping video, 225x225, 15% of the screen, above the announcement pill.
- Colour: none (0 saturated colours) except a thin rainbow border that rotates around the pill.
- One main button "Get started" (full width, dark raised, 16/600) and a text link "Documentation".
- Black #000 canvas; no wash or glow behind the headline.
- Motion on load: the pill slides up and fades in (1000 ms); 2 loops in view: the pill border (30 s) and the object video.

**Transfer:**
- Break the scale once at the headline, by contrast of face, size or weight; everything else stays plain.
- One object, dark on dark and lit from within, as the only picture.
- Five elements on the first screen: object, label, headline, sentence, action.
- A main button can be dark on dark when nothing else competes for attention.

**Do not copy:** the serif headline (Resend's face); the cube; the rotating rainbow pill (a loop on a badge is still a loop); the centred order object, pill, headline; the copy.

**With nucifera:** `.t-display` up to 64px in the house face, tracking no tighter than -0.03em, Cyrillic line-height 1.15; the break comes from size and weight, not a second family. One `--cta-bg` button; the object may move once on load, never loop.
