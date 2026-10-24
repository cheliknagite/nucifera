# Linear: contact sales (form)

Source: https://linear.app/contact/sales, observed 2026-10-22 at 390x844, dark.

**The idea:** the form says what you get before it asks (three checked promises), and its placeholders come from the brand's own world ("Kevin Flynn", "kevin@encom.com", from Tron), so even the empty fields have a voice.

**Measured:**
- First screen: title, 3 checklist lines, a support link, a sub-title, 4 fields (name, work email, company size prefilled "10,000+", requirements).
- Title 32/510, tracking -0.704px (-0.022em), line-height 36px; sub-title 17/400; body 15px; labels 13-14px.
- Inks: #8A8F98 (44% of text), #D0D6E0 (41%), #F7F8F8 (12%).
- Labels sit above the fields, never inside them.
- Fields are slightly raised boxes on the #08090A canvas with a 1px edge.
- Colour: none in view; the check marks are white.
- Motion on load: none (0 animations).

**Transfer:**
- Open a form with the outcome in 2-3 short lines; people decide to fill it before they see the fields.
- Write placeholders as a believable example from the subject's world, not "Enter your name".
- Prefill the most likely choice in a select.
- A form needs no colour until its submit button.

**Do not copy:** the Tron references (Linear's in-joke); the 13-15px sizes; the check icons as decoration; the order "Contact sales" then "Tell us how we can help"; the copy.

**With nucifera:** `.field` (48px high, 16px text) with labels in 14px `--fg-2` above; the promises as plain 16px lines; `.check-draw` is kept for the success state after sending, not for decoration.
