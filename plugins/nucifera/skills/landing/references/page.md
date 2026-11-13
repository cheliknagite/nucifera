# The page: sections, compositions, imagery, words

Read after the user has chosen a concept (`hooks.md`). Basis: landings built with this skill and the reviews they got (October and November 2026), and measurements of about twenty strong landings.

## 1. The plan

Add a "Sections" table to `.design/DESIGN.md`, one row per section, and build from it:

| Section | Visitor's question | Composition | What is shown | Motion | Words | Link |
|---|---|---|---|---|---|---|
| Hero | What is it, is it for me? | scene with headline | the hook | scene | 40 | none |
| Routine | What does it take off my hands? | comparison | by hand against the product, as a chart | moment: the chart fills once | 50 | how it works |
| Output | What do I get? | stage | the real result at full size | demo | 40 | none |

The order follows the questions a visitor asks: what is it and is it for me; what routine does it remove; what do I get; why trust it; how does it work; what does it cost and how do I try it; what else do I need to know; the final call. Merge sections that answer the same question.

If the product already has a design (a signature, a face, real screens in its `.design/DESIGN.md`), the page carries it; one of the three concepts is built on it.

## 2. Compositions

Pick one per section. Neighbouring sections never share one, and a home page uses at least four. Swapping the sides of a split does not make it a different composition.

| Composition | What it is | Good for |
|---|---|---|
| Scene with headline | the hook as a backdrop, the text in its own zone | the hero |
| Split, object leads | the object takes the larger half, the text the smaller | one feature; at most twice per page |
| Stage | one wide object at a readable size, a heading above, one line below | the real output, a demo |
| Close-ups | two to four tiles of unequal size, each a real crop with a one-line caption | details worth zooming into; never icon cards |
| Statement | one number or sentence set very large, one line of support | proof, scale, a promise |
| Steps rail | three to five steps along a line, each with its own small object | how it works |
| Comparison | by hand against the product, before against after, headed by its takeaway | the routine removed |
| Photo band | a real photo or illustration across the content width, text on its masked side | the world around the product |
| Table | plans or specifications, labels once on the left | pricing |
| List | questions or links, one open at a time | questions |
| Final call | an object, one sentence, one action | the end |

## 3. Imagery: something to look at on every screen

- Every section shows a real thing. Scroll the plan in your head: a screenful of text and empty canvas is a hole to fill or a section to merge.
- The product appears many times: whole, cropped close, in use, on a phone. Strong landings carry 20 to 140 images.
- What to show, best first: the interface rebuilt as live markup; a real screenshot cropped to what matters; a photo of the real thing; the product's own artwork; an illustration made for the page; a generated image (ask first and follow `../ui/references/image-direction.md`).
- Crop, do not shrink. A full window scaled down until its text is unreadable shows nothing; take the part that carries the point at full size.
- Every image sits inside the page margins with a radius and a hairline, or runs as a deliberate band across the content width. Nothing is cut by the screen edge by accident, on a desktop or on a phone.
- If the project lacks imagery for the plan, say so before building and propose what to capture, draw or generate.

## 4. Words

- A home page: about 500 to 900 words, legal text aside. A section: a heading of three to eight words, one or two sentences, one thing shown.
- Copy uses the product's own words; one thing has one name everywhere; one format for prices, percents and dates.
- One example story across the site: the same client, item and numbers wherever an example appears.
- The page says each thing once; details live on a detail page, in the product or in the terms.

## 5. A site of several pages

When the story does not fit a short home page, do not lengthen it: split it.

- Home: short blocks, each a heading, two sentences, one thing shown and one link to the page that tells it in full.
- Detail pages: one subject each (how it works, pricing, download, help). They keep the header, the scene in a smaller form (or its poster) and the same tokens.
- Questions live on the help page; the home page keeps at most the three or four that stop a visitor.
- Every page has the main action; the header shows where the visitor is.

## 6. Rhythm and surfaces

- One idea per section; on a desktop a section fits about one screen. `.section` gives `--sec-y` between sections; `.section--screen` gives the hero, the signature and the final call a screen of their own.
- Headings: `.t-hero` for the one headline, `.t-section` for sections, `.t-lead` for the sentence under them.
- Alternate dense and calm sections. No scroll-snap, no slide-by-slide scrolling.
- One grid per section: columns do not change halfway.
- Surfaces: the canvas, a tinted band (`--bg-1`) for a section that should stand apart, an opaque panel over the scene. Light behind one object with `.light-behind`; `.grain` on a large dark gradient. Never a coloured gradient to fill emptiness.

## 7. Charts and drawings

- The heading above a chart is its takeaway, in the reader's words and numbers: "The bot checks up to 68 times a day. By hand, 7." A label such as "Checks per day" says nothing; a small grey caption under the chart is not read.
- Rows are named in the reader's terms ("You, by hand", not "Manual"); the one comparison that matters is marked; an axis needs only its ends.
- A chart may fill once as it comes into view.

## 8. Evidence before claims

- Show the proof first (a real photo, a real number with its source), then the claim that explains it.
- A machine finding is worded as a possibility and says what to check ("possibly a repainted wing: check it with a paint gauge"), never as a verdict.
- Examples that could pass for real data are labelled ("Example").

## 9. Questions and pricing

- Questions: those a buyer actually asks, answers of one or two sentences, one open at a time (`<details name="faq">` inside `.faq`).
- Plans named by situation ("one client to try", "several clients", "a team"), shown as one table: labels once on the left, one column per plan headed by its price and situation. The trial and "no automatic renewal" sit next to the price; the full terms behind a link.

## 10. A character

If the product's character is the chosen hook, it is large and alive on the first screen and returns where it helps. Otherwise it stays small: an avatar, an empty state, a small success.

## 11. Check

- `verify.mjs --landing` walks the page screen by screen in real time: nearly empty and sparse screens, a still first screen, a stretch with no words, media cut by an edge, stretched images, a fixed element over text, script errors. It also counts the words (it warns past 1,000) and warns when the questions can stay open together.
- In the walk shots: something to look at on every screenful, neighbouring sections of different compositions, no image cut by an edge, every chart headed by its point.
- The critic's landing pass (`agents/design-critic.md`).
