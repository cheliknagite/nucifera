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

**A small change to an existing landing** (one block, the copy, a colour, spacing): read `.design/DESIGN.md` and the page, make the change, run verify once. No concept round and no critic.

**Reading.** Read this file and the references each step names, nothing more; `../ui/SKILL.md` is not needed for a landing. Copy the asset files without reading them: their classes and calls are listed in `references/parts.md`. Read `starter.html` in pieces: its head and first screen, then only the sections the plan keeps (each starts at a `<!-- ====` banner).

## Step 1. Read the product

- Read the brief, the product's own texts and screens, `.design/DESIGN.md` (signature, face) and `.design/calibration.md` (what this user liked and rejected before) when they exist.
- List the material you can show: real screens you can capture or rebuild as live markup, photos, artwork, a character, data. What does not exist must be drawn, captured or asked for; it is never faked.
- Write one line: who arrives, from where, and what they should feel in the first three seconds. Start `.design/DESIGN.md` with that line and the list of material.

## Step 2. Three concepts, shown before any build

Read `references/hooks.md`, `references/finish.md` and `references/parts.md`. Copy `../ui/assets/tokens.css`, `kit.css`, `motion.js` and this skill's `assets/landing.css` and `scene.js` into the project's `.design/` now, without reading them: the sketches use them. Then:

1. Name the category default for this kind of product (for most: headline left, product screenshot right, on a dark empty page) and set it aside. It is nobody's concept.
2. Write three concepts. Each takes its hook from the product's world, and each uses a different hook type (with no artwork the usual spread is the three that markup can draw truthfully: the live product, an instrument scene, a statement in type; when one of them was already rejected for this product, give two concepts of one type with different subjects instead). If the product already has a signature, one concept carries it; the other two differ from it.
3. Sketch the three first screens in one file, `.design/concepts.html`: the real headline and action, the hook at its full size and drafted far enough that its main motion already runs, a backdrop about the product behind it (`references/world.md`, section 3), real or rebuilt product imagery. One screen each: `<div class="backdrop" data-concept>` holding `<section class="first stage">`, so every sketch has its own backdrop; the page's `<body class="app">` turns on the kit's type and colours. Label them A, B, C and put one neutral line at the bottom edge of each sketch: what it is, what moves, what the rest of the page would show. Each sketch already carries the three layers of `finish.md`, roughly: the idea, a scene that moves, depth and material; an idea on a flat black sheet reads as thin and cannot be judged. Start from the ready parts (`references/parts.md`): `landing.css` gives the materials and the backdrop's box, `nuScene.canvas` runs a scene by the contract, so the lines go into the idea. A scene that builds up starts at a later second (`from:`), so no sketch opens empty. A sketch is rough: about 300 lines for the three together, composed for a 1440 by 900 window with the hook reaching the fold (no empty band under it), no other sections. Colours a concept proposes go into CSS variables at the top of the file. Prefix your own class names (`lp-…`): the kit already owns `.app`, `.row`, `.card`, `.hero`, `.section` and others.
4. Check them from the project folder: `node <this skill's folder>/../ui/scripts/verify.mjs .design/concepts.html --widths 1440 --light none --landing --each "[data-concept]"`. It sees every sketch on its own: three frames in real time (`each-<n>-motion-*.png`) and one frame with motion reduced (`each-<n>-still.png`, the scene's `still` second: its most telling moment, never its empty start). Look at those shots yourself and fix what it reports and what is broken: numbers stay rounded, labels do not collide midway.
5. Show the user the file and ask one question: A, B, C, or their own (a mix, another idea). Do not recommend one before they have looked. Write the choice into `.design/DESIGN.md`, and the user's own words into `.design/calibration.md` (create it if missing: one dated line per verdict, quoted).

Do not build the page before the answer: a round of sketches costs far less than a rebuilt site.

## Step 3. Plan the page

Read `references/page.md`. Add a "Sections" table to `.design/DESIGN.md` and build from it:

| Section | Visitor's question | Composition | What is shown | Backdrop | Motion | Phone | Words | Link |
|---|---|---|---|---|---|---|---|---|

- "What is shown" is never empty: every section shows a real thing (a product view, a close crop, a photo, an object, the scene).
- No two neighbouring rows share a composition; a home page uses at least four different ones.
- "Motion" names the section's one planned motion (`references/page.md`, section 1): a scene, a demo, words, count, each, chart, assemble; plain text blocks take reveal. No section with something to show stands still.
- "Backdrop" says what stands behind the section: a view of the product's world, or none. The same view never comes twice: each return shows another place, scale or time of that world (`references/world.md`, section 3).
- "Phone" says how the section is rebuilt on a narrow screen where a plain stack would lose what it shows (`references/page.md`, section 10): a row of 21 cells becomes a calendar of seven, a wide object is recomposed into columns; "stack" where nothing is lost.
- The home page stays short; the full story lives on detail pages, and "Link" names the page a block leads to.

Count the things shown before you build and note the count under the table. If the project has too little imagery for the plan, say so now and propose what to capture, draw or generate; do not fill the gap with text.

## Step 4. Build

- The asset files are in `.design/` since Step 2. The page itself goes where the project keeps its pages (`index.html` in the project root when nothing says otherwise) and links them as `.design/…`. Use roles, never raw values; keep the `lp-` prefix for the page's own classes.
- Start from `assets/starter.html` (`references/parts.md`): a working landing with every part alive, filled with an invented product. Keep the skeleton, the classes, the calls and the timing; expect to rewrite the hook, the scenes, the product views, the data, the words and the colours. Take the sections the plan names in the order the plan gives, not the starter's own set, and never its first-screen arrangement. Remove `data-example` from a block only when it shows the real product. `assets/backdrops.js` is an example to read for the kind of backdrop you need; the product's own backdrop is written for it.
- Build the first screen in the three layers of `references/finish.md`, with the product on it as one real moment of use. Build the hook first, as its own layer: `nuScene.canvas` (or `nuScene.layers` for artwork) keeps the contract of `references/world.md` for you.
- Then the sections, top to bottom, from the table, each with its composition's class. A product demo is live markup replayed by `nuScene.play` while it is in view.
- On a phone the text leads and the hook stays inside the first screen as a band below it; every section takes the form its "Phone" cell names, and nothing scrolls sideways. A bottom bar repeats the main action once the hero button has scrolled away (`.cta-bar`, `nuMotion.ctaBar`).
- One theme, dark, unless the user asks for the light one too.

## Step 5. Check

1. From the project folder run `node <this skill's folder>/../ui/scripts/verify.mjs <page> --landing` on each page (add `--light none` for a dark-only site). It shoots the page still and walks it in real time at 1440 and at 390; what it fails and what it warns about is listed in `references/page.md`, section 11. Fix every FAIL; at most three rounds. A concept of still art sets `data-hook="still"` on `<html>`. Then look at every `walk-*.png` yourself: something to look at on every screenful, neighbouring sections of different compositions, the hook reading on the first screen at both widths, and at 390 every label still there and readable. The check finds holes; it does not judge whether the page is good.
2. If a browser tool is at hand, open the page: the scene runs, stops off screen and in a hidden tab, and stands still under reduced motion; every demo plays. If not, say in the hand-over that this was not checked.
3. Run the `design-critic` agent once (without the plugin installed: a subagent given `agents/design-critic.md`). Hand it eight shots at most: `walk-1440-01`, the three motion frames, the two desktop screens that differ most, `walk-390-01` and the phone screen that was rebuilt most; with them the brief, `.design/DESIGN.md`, the calibration files and `../ui/references/exemplars/hero/twin.md` (both twins). Ask it one extra question: "What would a visitor describe an hour after seeing only the first screen?" If the honest answer is "a dark page with a screenshot", or its verdict is "sterile", go back to the hook, not to polish. Its rule-backed findings get one more round of fixes and a last verify run, on top of the three.
4. Hand over: file paths, the shots, what was not checked. When the user gives a verdict, append their words to `.design/calibration.md`.

## Ten rules of this mode

1. The first screen holds the hook, a headline, one sentence and one action. The hook fills most of the screen (60 to 90 %): as a backdrop, or as a stage with the headline above or inside it. An object in a column beside the text is the default layout again, whatever the object shows. Nothing stands beside the hook as an interface box: no cards, tiles or chips next to the scene. The data is drawn in the scene and the product speaks in type; when the hook is the live product, its own rows and blocks are the scene (`references/finish.md`, section 3).
2. Every screenful has something to look at. A text-only screen is allowed once, for the questions.
3. Show the real product many times: whole, cropped close, in use. Crop instead of shrinking: a screenshot nobody can read shows nothing.
4. Images stay inside the page margins with a frame, or run as a deliberate full-width band; nothing is cut by the screen edge by accident.
5. The scene moves all the time, slowly: loops of 6 to 20 seconds, drift over a minute or two. Buttons, menus and text keep the token tempos.
6. Demos play while in view: three to five steps with real data, a pause, a replay.
7. Neighbouring sections differ in composition (`references/page.md`).
8. Text sits in its own zone or on an opaque panel, never straight over moving detail; contrast stays at 4.5:1.
9. Colour and character come from the product: its screens, artwork and status colours. A product with no colours of its own yet may get up to three from its subject (soil, leaf, frost), named by role in `.design/brand.css` and offered in the concept; the main action may take the lead colour (`--cta-bg`). Behind the first screen stands the product's world, never a light effect; no decoration from outside that world: gradient blobs, glows, particles.
10. Everything works without the scene: the poster, reduced motion, a phone.

## Reference files

- `references/hooks.md`: hook types and how to find three concepts in the product.
- `references/finish.md`: the three layers of a first screen; no boxes on it.
- `references/parts.md`: ready code: scenes, moments, classes, the starter page.
- `references/world.md`: what a scene must keep, demos, scroll stops.
- `references/page.md`: the plan, compositions, motion per section, words, the phone, the check.
- `../ui/references/`: style, components, motion recipes, image direction, refusals.
