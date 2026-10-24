# Stripe Checkout: embedded payment form (form)

Source: https://checkout.stripe.dev/ (the "View demo" embedded checkout), observed 2026-10-22 at 390x844, light.

**The idea:** the form opens with the answer: the price in two currencies as a two-option choice with the live rate under it, then a receipt you can check line by line before typing anything.

**Measured:**
- Measured inside the checkout frame: 14px is 58% of characters, 16px 31%, 12px 11%; system font stack.
- Headings stay small: "Choose currency" 16/500; "Total due" amount 16/600; every amount tracked -0.48px.
- One ink at two strengths: near-black at 0.9 alpha (52% of text) and 0.6 (29%).
- Zero saturated colour inside the form; the violet belongs to the demo shell; Apple Pay is a solid black button.
- 5 receipt rows above the fold: item, Subtotal, promo "SAVE10" with "10% off", Tax, Total due.
- Tax reads "Enter address to calculate" instead of 0 or a dash.
- The currency was localised by IP: "UAH 1,342.17" first, "$28.80" second, "1 USD = 46.6031 UAH" in 12px.
- Motion on load: none inside the form (the demo shell's sheet: 250 ms opacity and transform).

**Transfer:**
- Put the decisive number at the top; fields come after the person agrees with the total.
- A pending value says what is missing, never shows 0.
- One ink colour at two strengths is enough for a dense form.
- When two currencies matter, show both as equal options, each with its amount.

**Do not copy:** the demo product, the logo and the block order; the 12px rate line; the black Apple Pay button as a style; the "Hide" summary toggle as is.

**With nucifera:** `.seg` for a two-option choice with the amounts inside the options; the receipt as `.kv` with `.kv__total` and the total in `.price`; pending values in 14px `--fg-2`.
