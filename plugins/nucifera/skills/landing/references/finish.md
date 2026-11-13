# Finish: what makes a first screen reach

Basis: a study in November 2026. One sketch (a huge figure taken from the product's data) was shown in four variants: with depth and material only, with a living scene only, with the product's details only, and with all of them. They were reviewed blind. Each single addition still read as "lacking something"; the variant with all of them was the one that reached, and its weak part was the product card.

## 1. Three layers, together

A first screen reaches when three layers meet:

1. **The idea**: the hook (`hooks.md`).
2. **A living scene from the subject** (`world.md`): under the figure, the coming nights as one curve over a frost zone, a cursor walking to the safe day, a sprout rising there.
3. **Depth and material**: the screen is a lit space with objects in it, not a flat black sheet with flat shapes.

One layer alone reads as thin, whichever it is. Build all three already in the sketch, roughly.

## 2. Depth and material

The recipe is ready as classes in `assets/landing.css` (`parts.md`, section 3): `.stage` makes the screen a lit space (a wide dark tone of the subject's colour with the light behind the hero object, a grain, a vignette), `.solid` makes a figure or a word an object (one hue from light to dark, a thin top highlight, a dark cast shadow), `.cast` puts a contact shadow under it, `.tile` raises small surfaces and lifts the chosen one, `.btn--lit` gives the main action the same material. Set the hues with `--obj`, `--obj-ink`, `--stage-tone`, `--stage-x` and `--stage-y`.

Rules of the material:

- One hue per object, from lighter to darker. Never two hues in one object, never a rainbow.
- Shadows are dark, never coloured. No glow around text, no neon.
- Light comes from one side for everything on the screen (in the classes, from the top left).
- The background is never the flat canvas on a first screen, and never a coloured cloud: a wide dark tone of the subject's own colour, darkest at the edges.
- This is material for a landing's first screen, its hero objects and the final call. App screens keep the quiet rules of the `ui` skill; rows 2 to 4 of its refusals still describe decoration there.

## 3. The product on the first screen

A boxed card of label and value rows did not reach: it reads as a settings panel beside the scene. In a second study three other forms stood on the same first screen: the product's own view drawn as shapes, the product's data living inside the scene, and one real moment of use. In a blind review the moment of use was chosen.

So the product appears on the first screen as **one real moment of use, played in step with the scene**:

- One object in the material of the stage (`.tile`): the product's mark and name, a time, one or two sentences in the product's own words. In the study it was the morning notification.
- It answers the scene's events: a message when the cursor reaches the first frost night, another on the day planting is safe.
- Each message stays long enough to read (two seconds and more). A label that changes with every tick of the scene cannot be read.
- Under reduced motion it shows the last message.

## 4. Before you show it

- All three layers are there, each from the product's own world.
- The first screen holds together at 1440 by 900 and at about 1400 by 800: the hook is not cut.
- Watch it for ten seconds in real time: the scene moves, numbers stay rounded, nothing collides midway.
