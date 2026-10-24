# Generic twin: form

How a default AI generator builds a checkout, signup or contact form with the same content:

- A centred card with a 24px radius, glass blur, a gradient border and a large drop shadow, floating over a violet-blue gradient blob.
- Title "Welcome back! 👋" or "Get in touch", a 14px grey subtitle.
- Fields with an icon inside (envelope, lock, person), placeholders "Enter your email", "Enter your name", labels floating inside the field; 14px text.
- A row of three social logo buttons and an "or continue with" divider.
- A violet gradient submit button with a glow, always enabled; errors appear only after pressing it, in a red toast.
- For checkout: card fields first, the order summary after them in small grey text, the total in violet, a strip of card logos and "🔒 Secure payment" badges.
- Fields animate in one by one; the button pulses.

**Named differences:**

1. **The answer comes first.** Stripe opens with the total and the currency choice before any field; the twin puts the summary after the fields in small grey.
2. **Pending values are explained.** Stripe writes "Enter address to calculate"; the twin shows "$0.00" or a dash.
3. **Placeholders with a voice.** "alan.turing@example.com" and "Kevin Flynn" versus "Enter your email".
4. **Disabled until valid, focused on load.** Resend's submit waits for valid input and the first field has focus; the twin's button is always active and fails afterwards.
5. **No colour inside the form.** All three exemplars have zero accent colour among their fields; the twin colours icons, borders, the button and the total.
6. **Outcome before asking.** Linear lists three promises above the fields; the twin opens with a greeting.
