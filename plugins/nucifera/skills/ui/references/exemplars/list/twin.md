# Generic twin: list

How a default AI generator builds a catalogue or results screen with the same content (usernames on auction, service status, a changelog, used cars):

- A hero band first: centred H1 with one word in gradient text ("Discover **Premium** Usernames"), a 14px grey subtitle, a large search field with a glowing violet focus ring.
- A row of 6-8 filter pills with emoji or icons that runs off the screen edge; the first pill filled violet.
- Results as identical cards in a grid (2 columns on a phone, 3-4 on desktop): 16px radius, 1px border, soft shadow or coloured glow, an icon tile or stock image on top, a title, two lines of 13px grey text, a corner badge ("Hot", "New", "Trending") and a full-width "View details" button inside every card.
- Metadata glued with dots ("2 days left · 12 bids · Verified") in 12-13px, in two or three greys.
- A status pill on every item ("Active", "Available", "Operational").
- Every card fades up with the same 400 ms ease and a 100 ms stagger; hover scales cards to 1.03.
- First screen: hero, pills and 2 cards.

**Named differences:**

1. **Density.** Fragment shows 11 real rows on the first screen and Vercel Status 5 rows each with 30 days of data; the twin shows a hero and 2 cards.
2. **Identity leads the row.** Exemplars open each row with the item's own name or date in the strongest weight; the twin opens with an icon tile and a generic title.
3. **The row has a past.** Vercel Status draws 30 days under each name; the twin has no history, only a badge.
4. **Colour on exceptions only.** Exemplar colour marks the one red day or the one link colour; the twin labels every card "Active" and colours every pill and button.
5. **One voice break, not gradient text.** Resend changes typeface once for the masthead; the twin highlights one word in a gradient.
6. **Still rows.** Exemplar lists run 0-2 load animations and none on items; the twin animates every card on load and on hover.
