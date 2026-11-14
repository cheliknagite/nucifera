# Finish: what makes a first screen reach

Basis: a study in November 2026. One sketch (a huge figure taken from the product's data) was shown in four variants: with depth and material only, with a living scene only, with the product's details only, and with all of them. They were reviewed blind. Each single addition still read as "lacking something"; the variant with all of them was the one that reached, and its weak part was the product card.

## 1. Three layers, together

A first screen reaches when three layers meet:

1. **The idea**: the hook (`hooks.md`).
2. **A living scene from the subject** (`world.md`): under the figure, the coming nights as one curve over a frost zone, a cursor walking to the safe day, a sprout rising there.
3. **A place and material**: behind the text stands the product's world, drawn quietly (the backdrop, `world.md`, section 3), and the hero objects have material. Not a flat black sheet, and not a light effect.

One layer alone reads as thin, whichever it is. Build all three already in the sketch, roughly.

## 2. A place and material

The place is a backdrop about the product (`world.md`, section 3). The material is ready as classes (`parts.md`, section 3): `.solid`, `.cast`, `.tile`, `.btn--lit`; set the hues with `--obj` and `--obj-ink`.

Rules of the material:

- One hue per object, from lighter to darker. Never two hues in one object, never a rainbow.
- Shadows are dark, never coloured. No glow around text, no neon.
- Light comes from one side for everything on the screen (in the classes, from the top left).
- The background is never a light effect. A coloured glow behind the hero object, a vignette, a light from above and an even dark tint were shown side by side and all rejected as generated-looking; so was the flat canvas, and so was a ruled grid of the product's calendar. What reached was the product's world itself.
- This is material for a landing's first screen, its hero objects and the final call. App screens keep the quiet rules of the `ui` skill; rows 2 to 4 of its refusals still describe decoration there.

## 3. The product on the first screen: a moment of use, and no boxes

Three studies led here. A boxed card of label and value rows did not reach: it reads as a settings panel beside the scene. Among three other forms (the product's view drawn as shapes, its data inside the scene, one real moment of use) the moment of use was chosen. In a blind review the moment of use was chosen. Then the same moment was shown with and without interface boxes, and the screen without them was chosen: on a lit scene, tiles and cards with hairlines look like pieces of another page. That was a blind review too.

So on the first screen:

- **Nothing stands beside the hook as an interface box.** No cards, no tiles, no chips with outlines added next to the scene. The only raised object is the main action.
- **When the hook is the live product, its interface is the scene.** It fills the stage at full size with the product's own content: the lessons of a week as blocks in a timetable, a conversation set large in type without chat bubbles. No window frame, no panel and no shadow around it, and nothing shrunk into a card. Both of these were liked in review; a small product widget in a box beside the copy was not.
- **The data is drawn in the scene.** In the study: the nights as columns standing on a zero line under the curve, their dates and temperatures set as plain type under them, the day that matters as the one solid column.
- **The product speaks in type.** One line under the action, separated by a hairline: the product's mark, a time, one or two sentences in its own words. It answers the scene's events (a message at the first frost night, another on the day planting is safe) and each message stays long enough to read, two seconds and more.
- Under reduced motion the last message stands.

Boxes with one style are right below the first screen, where the page turns into sections (`parts.md`, section 5).

## 4. Before you show it

- All three layers are there, each from the product's own world.
- The first screen holds together at 1440 by 900 and at about 1400 by 800: the hook is not cut (`verify.mjs --landing` shoots both: `page-1440.png` and `page-1400x800.png`).
- Watch it for ten seconds in real time: the scene moves, numbers stay rounded, nothing collides midway.
