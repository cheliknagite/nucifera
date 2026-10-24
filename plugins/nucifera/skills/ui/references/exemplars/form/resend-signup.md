# Resend: create an account (form)

Source: https://resend.com/signup, observed 2026-10-22 at 390x844, dark.

**The idea:** the form is made of one material: buttons and fields share the same faint grain texture over a dark draped-fabric photo, and the example address is "alan.turing@example.com", a nod to the people who will use it.

**Measured:**
- The whole form fits one screen: title, log-in link, 2 provider buttons, divider, 2 fields, opt-in checkbox, submit, terms.
- Title ABC Favorit 28/500, tracking -0.72px; everything else Inter 14px (62% of characters) and 12px (29%).
- One grey #A1A4A5 for 68% of the text; the title #F0F0F0.
- Fields and buttons all 358x48: a grain texture plus a 5-10% white gradient, the same on both.
- The submit is disabled (label at 30% opacity) until the fields are valid.
- The email field has focus on load: 200 ms box-shadow and outline transitions.
- Colour: none (0 saturated colours); the background photo fills the screen (390x844).

**Transfer:**
- Give inputs and buttons one shared material, so the form reads as a single object.
- Focus the first field on load; typing can start at once.
- Keep the submit disabled until valid instead of letting it fail.
- Make the placeholder an example the product's own users would smile at.

**Do not copy:** the fabric photo, the grain and Favorit (Resend's look); the 12px terms and 14px labels; provider buttons above the form when the product needs only one path; the copy.

**With nucifera:** `.field` on `--bg-1` with a `--line-2` hairline and the same surface for `.btn--secondary`; the main action `--cta-bg`, disabled until valid; labels 14px `--fg-2`, terms 14px, not 12.
