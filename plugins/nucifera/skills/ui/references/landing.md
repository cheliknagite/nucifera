# Landing pages: say less, one idea per screen

Read this before building any landing or marketing page; it adds to `style.md` ("App screens and landing pages") and `motion.md` (hero, reveal, moments). Basis: a landing built with this skill and reviewed by a reader (October 2026): 2,220 words, 18.5 phone screens, sections taller than the screen with 176px between them. The reader asked to "cut the text in half" and for "one scroll, one slide", and the page felt empty without images.

## 1. Plan the sections before code

Add a "Sections" table to `.design/DESIGN.md`, one row per section, and build from it:

| Section | The visitor's question | Main object | Words | Background | Level | Motion |
|---|---|---|---|---|---|---|
| Hero | What is it, is it for me? | the product working (a chat, a card) | 40 | local light behind the product | high | hero rise, live window |
| Routine | What does it take off my hands? | one before-and-after comparison | 60 | plain | medium | a chart fills once |
| Questions | What else do I need to know? | the list | 150 | plain | low | none |

The default order follows the questions a visitor asks:

1. What is it, and is it for me? Headline, one sentence, the main action, the product working.
2. What routine does it remove? One comparison: by hand versus with the product.
3. What do I get? The real output: one card, one report.
4. Why should I trust it? The evidence: a real photo or number, its source, its limits.
5. How does it work? Three to five steps, each with its own object.
6. What does it cost, and how do I try it? The trial, plans by situation.
7. Questions: five to seven.
8. The final call: one sentence, one action.

Merge sections that answer the same question; a ninth section needs a reason in the table.

If the product already has a design (its own `.design/DESIGN.md`: a signature, a face, real screens), the landing carries that signature and those screens over; it never invents a new face for a product that has one. How the product is shown (in a device frame, in a window or bare) is decided per product in its DESIGN.md; there is no default frame. On a desktop the product takes the larger half of the first screen; the text column is the smaller one.

## 2. Word budget

- The whole page: about 700 to 900 words, legal text aside. Long pages convert worse: in Unbounce's analysis of about 64,000 lead pages, pages over 800 words had a median conversion about a third lower than pages under 200 (a correlation, not a law).
- A section: a heading of three to eight words, one or two sentences, one object. A list longer than five items becomes "the three that matter" plus where to find the rest.
- Details live in the product, the terms or one answer in the questions; the page says each thing once.
- Copy uses the product's own words, and one thing has one name everywhere: a metric is "average" or "median", never both; one price format on the whole page.
- One example story across the page: the same client, car and numbers wherever an example appears (a brief that says $19,000 in the hero says $19,000 in the steps). One number format for prices, percents and dates.

## 3. Rhythm: each section reads as one screen

- One idea per section. On a desktop a section fits about one screen; if it does not, cut it, do not make it scroll in slides.
- Space between sections: `.section` gives `--sec-y` between two sections (80px on phones, up to 200 on a desktop). A heading gets more space above it than below.
- On a desktop a section shorter than half a screen merges with its neighbour; the hero, the signature and the final call may each take a screen of their own (`.section--screen`).
- Headings: `.t-hero` for the page's one headline, `.t-section` for section headings, `.t-lead` for the sentence under them.
- Alternate dense and calm sections; never two dense ones in a row.
- No scroll-snap and no slide-by-slide scrolling: a section taller than the screen gets cut, its end is hard to reach, and phones animate the snap slowly. Short sections with clear air between give the "one scroll, one slide" feeling without taking the scroll away.
- One grid per section: two columns never turn into three halfway; items of another kind get their own heading or their own section.

## 4. How expressive each section is

- High: the hero and the final call. The product scene, a photo or an object, local light, one moment.
- Medium: product demos. Real output, real photos, charts with data.
- Low: questions, terms, pricing details. A plain canvas, text first.

One or two moments in the whole landing (the live product window; a chart that fills once), never more than one per screen.

## 5. Backgrounds: chosen, never left by default

Each section gets one background, written in the table with its reason. Not every background is visible; every one is chosen.

| Background | When | How |
|---|---|---|
| Plain canvas | text and data first: questions, terms, pricing | `--bg-0` |
| Local light | behind the one main object: hero, final call | `.light-behind` on the object: a radial light in the canvas tone that fades out before any edge; never a band with a straight edge |
| Grain | a large dark gradient that would band | `.grain` |
| Photo layer | a scene the story needs: the work the product removes | an image briefed by `image-direction.md`, masked toward the text side; contrast checked |
| Lines | a scale, grid or map that explains something | `--line-1`; never decoration |

Never the same decoration on every section, and never a coloured gradient to fill emptiness. A landing longer than two screens needs images beyond the product window (`image-direction.md`); text and UI alone read as empty.

## 6. Charts and drawings

- The heading above the chart is its takeaway, in the reader's words and numbers: "The bot checks up to 68 times a day. By hand, 7.". A label such as "Checks per day" says nothing; a caption under the chart in small grey is not read.
- Rows are named in the reader's terms ("You, by hand", not "Manual"); the one comparison that matters is marked; an axis needs only its ends.
- A chart may fill once as it comes into view (`motion.md`, "Signature once").

## 7. Evidence before claims

- Show the proof first (a real photo, a real number with its source), then the claim that explains it.
- A machine finding is worded as a possibility and says what to check ("possibly a repainted wing: check it with a paint gauge"), never as a verdict.
- Examples that could pass for real data are labelled ("Example").

## 8. Questions

- Five to seven questions a buyer actually asks; answers of one or two sentences.
- One answer open at a time: `<details name="faq">` inside `.faq`, native in every current browser since 2024. With more than seven questions, keep the seven that matter.

## 9. Pricing

Plans named by situation ("one client to try", "several clients", "a team"), shown as one table: the row labels once on the left, one column per plan headed by its price and its situation; on a phone the same table, or each plan as one row with two or three values. Never three cards that repeat the same labels. The trial and "no automatic renewal" sit next to the price; the full terms behind a link.

## 10. A brand character

A mascot or avatar appears small: as the product's avatar, in empty states, in a small success. Not as a large figure on every screen, and not in a new pose each time.

## 11. Check

- `verify.mjs` counts the page's words and warns past 1,000, and warns when the questions can stay open together.
- Look at the long shots: one section per screen with clear air between, no grid that changes within a section, every chart's heading saying its point.
- The critic's landing pass (`agents/design-critic.md`).
