# Signature moves: the one thing a screen is remembered by

A clean dark screen with one accent is now what generators produce by default; restraint can be copied, an idea from the subject cannot. In blind comparisons the variants that read as authored took their memorable element from the product's own world. So before building, find one.

## How to find it

1. Write the scene: who, where, in what light, what they fear or want at this moment. ("A nurse after a night shift, on a phone in a dim kitchen, booking a dentist for a child before the clinic closes.")
2. List the subject's own artifacts: documents, instruments, measurements, maps, receipts, parts, schedules, tickets, dials, labels. Things a professional in this trade would recognise at a glance.
3. Pick the one that answers the user's question on this screen and can be drawn simply and truthfully with data.
4. Spend all boldness there. Everything around it stays quiet: standard rows, plain headings, one accent.
5. Offer it to the user (next section), then write the chosen one as the "Signature" line in `.design/DESIGN.md`.

One signature per screen. Two bold elements fight; if the user asks for two, show two variants of the screen and let them choose.

## Ask before building

The signature decides how the product is remembered, so the user chooses it. Ask once per project, kind of screen or landing; not for edits of existing screens, and not when the brief already names it. One question (the question tool if there is one, otherwise one short message), in the user's language, options in this order:

1. **Keep the current one**, when `.design/DESIGN.md` or the product's own design already has a signature: its name and where it lives.
2. **Recommended**: your own idea, from the steps above: what it is, what data it shows, why it answers the user's question; one line. At most one alternative, of another kind (object, typographic, functional).
3. **Your own**: the user describes what they want to see. The question tool adds a free-text field by itself; in a plain message, say they can describe it in their own words.

Example (a booking app for a clinic, no design yet): "Which signature should the schedule screen have? 1) Recommended: the day's appointment book, doctors as columns, free slots lit; it is where the choice is made. 2) Alternative: the next free time set large, with the doctor's name. 3) Or describe your own."

Write the answer into `.design/DESIGN.md` and keep it for every later screen of the project; ask again only for a new kind of screen or when the user wants to change it.

## Three kinds

- **Object**: a thing from the subject's world drawn with data: a route strip, an appointment book, a floor plan.
- **Typographic**: one statement set large and exact, when the screen is about a single number or sentence: the match score, the price, "paid".
- **Functional**: the way the real data is shown or the main action works: a market ruler under the price, a list that ranks itself by value.

Pick the simplest kind that answers the user's question. A signature that needs a legend to read is the wrong kind: switch to typographic or functional. Simple screens (sign-in, a settings list) need none. The signature may move once when it first appears (a dot sliding into place on the ruler); never in a loop.

## Examples

| Subject | Signature | Why it works |
|---|---|---|
| Delivery | the route strip with stops and times | the user's real question is "where is it now" |
| Booking (barber, clinic) | the day's appointment book: columns of staff, rows of hours, taken slots hatched | the decision happens there |
| Online course | the lesson map: done, current, next, with the minutes left | answers "how far am I" |
| Restaurant, bakery | the order ticket as the kitchen prints it, with the time it will be ready | the object the customer waits for |
| Real estate | the floor plan with metres and where the sun comes in | what people compare flats by |
| Fitness | the week as a row of rings or bars from real data | progress is the product |
| Finance | a ledger line with the exact amount in tabular digits | trust comes from precision |
| Event | the ticket stub with seat, gate, time | the object people screenshot |
| A bot that watches listings | a radar sweeping the market, finds lighting up where the beam passes | the bot's work made visible |
| Used cars | a top-view car with paint thickness per panel, or the price on a market ruler | the artifact the buyer pays for |

## Rules

- True to data: draw from the real content; label samples "Sample" when the data does not exist yet.
- Simple, recognisable shapes, hairlines and the house type; one accent for the meaningful part (the current stop, the free slot), not for decoration.
- The signature may break the grid a little (full-bleed photo, a large number); the rest of the screen does not.
- Copy matters as much as shape: phrase what you cannot check as a claim ("the seller says so", "the venue says so"), state the next step plainly.
- Not a signature: a gradient blob, a glow, a mascot unrelated to the subject, a big number with a gradient, an icon grid.
