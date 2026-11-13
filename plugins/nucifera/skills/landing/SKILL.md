---
name: landing
description: >-
  Use when the user asks to design, build or redo a landing page, a product
  website, a home page, a promo or marketing page, or a small site of several
  pages. Runs the landing mode of the nucifera style: three hook concepts
  shown as sketches before any build, a living scene, something to look at on
  every screen, varied section layouts, then checks. Not for app
  screens, forms or dashboards: those use the ui skill.
license: MIT-0
---

# Landing mode

A landing persuades; an app screen operates. The `ui` skill keeps app screens quiet and dense. Here the same tokens, type and craft apply, but the defaults turn over: a landing that is only clean and correct has failed. Pages built by the quiet rules were rejected in review for four reasons: no idea and no hook, empty with few images, little motion, every section built the same way. So a landing needs four things, and each step below exists to produce them:

1. **A hook**: one idea from the product's own world that fills the first screen, something a visitor could describe an hour later.
2. **Something to look at on every screen**: the real product and real objects, not text on an empty canvas.
3. **Life**: a scene that moves slowly all the time, and product demos that play while in view.
4. **Variety**: neighbouring sections never share a composition.

Priority: the user's brief > the project's `.design/brand.css` and `.design/DESIGN.md` > this mode > the `ui` skill's defaults. From `../ui/SKILL.md` these still hold: tokens and kit, type, contrast, touch sizes, copy in the product's own words. Its rules "one moment per screen", "never in a loop" and "plain backgrounds" describe app screens; they do not bind the scene and the demos here.

## Step 1. Read the product

- Read the brief, the product's own texts and screens, `.design/DESIGN.md` (signature, face) and `.design/calibration.md` (what this user liked and rejected before) when they exist.
- List the material you can show: real screens you can capture or rebuild as live markup, photos, artwork, a character, data. What does not exist must be drawn, captured or asked for; it is never faked.
- Write one line: who arrives, from where, and what they should feel in the first three seconds.

## Step 2. Three concepts, shown before any build

Read `references/hooks.md`. Then:

1. Name the category default for this kind of product (for most: headline left, product screenshot right, on a dark empty page) and set it aside. It is nobody's concept.
2. Write three concepts. Each takes its hook from the product's world, and each uses a different hook type. If the product already has a signature, one concept carries it; the other two differ from it.
3. Sketch the three first screens in one file, `.design/concepts.html`: the real headline and action, the hook at its full size and drafted far enough that its main motion already runs, real or rebuilt product imagery. One screen each (`.section--screen`), labelled A, B, C, with one neutral line under each: what it is, what moves, what the rest of the page would show. A sketch is rough: about 150 lines each, composed for a 1440 by 900 window with the hook reaching the fold (no empty band under it), no other sections. Colours a concept proposes go into CSS variables at the top of the file. Prefix your own class names (`lp-…`): the kit already owns `.app`, `.row`, `.card`, `.hero`, `.section` and others.
4. Shoot them with `node ../ui/scripts/verify.mjs .design/concepts.html --widths 1440 --light none`, look at the shots yourself and fix what is broken. The shots are taken with motion reduced, so give every scene a still frame that shows its most telling moment, never its empty start. Then watch each loop once in a browser if you have one: numbers stay rounded, labels do not collide midway.
5. Show the user the file and ask one question: A, B, C, or their own (a mix, another idea). Do not recommend one before they have looked. Write the choice into `.design/DESIGN.md`, and the user's own words into `.design/calibration.md` (create it if missing: one dated line per verdict, quoted).

Do not build the page before the answer: a round of sketches costs far less than a rebuilt site.

## Step 3. Plan the page

Read `references/page.md`. Add a "Sections" table to `.design/DESIGN.md` and build from it:

| Section | Visitor's question | Composition | What is shown | Motion | Words | Link |
|---|---|---|---|---|---|---|

- "What is shown" is never empty: every section shows a real thing (a product view, a close crop, a photo, an object, the scene).
- No two neighbouring rows share a composition; a home page uses at least four different ones.
- "Motion" is one of: scene, demo, moment, reveal, none.
- The home page stays short; the full story lives on detail pages, and "Link" names the page a block leads to.

Count the things shown before you build. If the project has too little imagery for the plan, say so now and propose what to capture, draw or generate; do not fill the gap with text.

## Step 4. Build

- Copy `../ui/assets/tokens.css`, `kit.css` and `motion.js` into `.design/` as the `ui` skill does; use roles, never raw values; keep the `lp-` prefix for the page's own classes.
- Build the hook first, as its own layer, by `references/world.md`: a poster image under it, running only while visible, a capped pixel ratio, one still frame under reduced motion.
- Then the sections, top to bottom, from the table. A product demo is live markup that replays a short scenario with a pause while it is in view.
- On a phone the hook is inside the first screen, and a bottom bar repeats the main action once the hero button has scrolled away (`.cta-bar`, `nuMotion.ctaBar`).
- One theme, dark, unless the user asks for the light one too.

## Step 5. Check

1. Run `node ../ui/scripts/verify.mjs` on each page (add `--light none` for a dark-only site) and look at every shot, long views included: no screenful without something to look at, neighbouring sections differ, the hook reads on the first screen at 390 and at 1440, nothing covers text, no image is cut by the screen edge.
2. Open the page in a browser: the scene runs, stops off screen and in a hidden tab, and stands still under reduced motion; every demo plays.
3. Run the `design-critic` agent with the shots, the brief, `.design/DESIGN.md` and the calibration files. Ask it one extra question: "What would a visitor describe an hour after seeing only the first screen?" If the honest answer is "a dark page with a screenshot", go back to the hook, not to polish.
4. Hand over: file paths, the shots, what was not checked. When the user gives a verdict, append their words to `.design/calibration.md`.

## Ten rules of this mode

1. The first screen holds the hook, a headline, one sentence and one action. The hook fills most of the screen (60 to 90 %): as a backdrop, or as a stage with the headline above or inside it. An object in a column beside the text is the default layout again, whatever the object shows.
2. Every screenful has something to look at. A text-only screen is allowed once, for the questions.
3. Show the real product many times: whole, cropped close, in use. Crop instead of shrinking: a screenshot nobody can read shows nothing.
4. Images stay inside the page margins with a frame, or run as a deliberate full-width band; nothing is cut by the screen edge by accident.
5. The scene moves all the time, slowly: loops of 6 to 20 seconds, drift over a minute or two. Buttons, menus and text keep the token tempos.
6. Demos play while in view: three to five steps with real data, a pause, a replay.
7. Neighbouring sections differ in composition (`references/page.md`).
8. Text sits in its own zone or on an opaque panel, never straight over moving detail; contrast stays at 4.5:1.
9. Colour and character come from the product: its screens, artwork and status colours. A product with no colours of its own yet may get up to three from its subject (soil, leaf, frost), named by role in `.design/brand.css` and offered in the concept; the main action may take the lead colour (`--cta-bg`). No decoration from outside its world: gradient blobs, glows, particles.
10. Everything works without the scene: the poster, reduced motion, a phone.

## Reference files

- `references/hooks.md`: hook types, how to find three concepts in the product, how rough a sketch is, measured numbers.
- `references/world.md`: the two layers, the scene's performance contract, tempo, readability, scroll stops, demos.
- `references/page.md`: the section plan, compositions, the imagery plan, words, several pages, charts, questions, pricing.
- `../ui/references/`: style, components, motion recipes, image direction, refusals.
