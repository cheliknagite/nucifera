# Stripe: "The backbone of global commerce" (stats)

Source: https://stripe.com/ (scrolled to the numbers block, y 4715), observed 2026-10-22 at 390x844 with the top 22px cropped, dark section on a light page.

**The idea:** four big numbers, each tied to a scope and a period ("$1.9T in payments volume processed in 2025", "99.999% historical uptime"), over a globe of payment arcs: the picture is drawn from the same flows the numbers count.

**Measured:**
- Heading 34/300, tracking -0.68px; numbers 28/300, tracking -0.28px; qualifiers 16px, centred.
- 4 numbers in 2x2, split by one horizontal gradient hairline.
- All text pure white; the section runs from deep navy #0D1738 to violet.
- The arc globe takes 35% of the screen below the numbers.
- Numbers keep their real precision: "135+", "$1.9T", "99.999%", "200M+".
- Motion: none in this block (the page runs 258 animations elsewhere).
- Elsewhere on the page the hero carries a live counter, "Global GDP running on Stripe: 1.7365825%", with rolling digits.

**Transfer:**
- Each big number needs a scope and a period written as a plain phrase under it.
- Very large numbers can be light; size does the emphasis.
- Draw the illustration from the data's own metaphor (flows, routes, history), not a generic shape.
- Keep the real precision of a number; "100+" loses trust that "135+" earns.

**Do not copy:** the navy-violet gradient section and the arc globe (Stripe's signature); a 2x2 grid of equal stat tiles (an AI default when the qualifiers are missing); weight 300 (the house minimum is 400); the copy.

**With nucifera:** `.stat` with the number at 32px (`--t-display`), or 48-64px on a landing, and a 16px `--fg-2` qualifier; two or three stats as a vertical list, not a tile grid. A live counter belongs only where the number really changes, animated with `.roll`.
