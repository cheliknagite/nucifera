# Finish: what makes a first screen reach

Basis: a study in November 2026. One sketch (a huge figure taken from the product's data) was shown in four variants: with depth and material only, with a living scene only, with the product's details only, and with all of them. They were reviewed blind. Each single addition still read as "lacking something"; the variant with all of them was the one that reached, and its weak part was the product card.

## 1. Three layers, together

A first screen reaches when three layers meet:

1. **The idea**: the hook (`hooks.md`).
2. **A living scene from the subject** (`world.md`): under the figure, the coming nights as one curve over a frost zone, a cursor walking to the safe day, a sprout rising there.
3. **Depth and material**: the screen is a lit space with objects in it, not a flat black sheet with flat shapes.

One layer alone reads as thin, whichever it is. Build all three already in the sketch, roughly.

## 2. Depth and material

Values from the variant that reached; change the hues to the subject's palette, keep the structure.

```css
/* the screen: a wide tone from the subject's palette with the light behind the hero object, a grain, a vignette */
.lp-screen { background: radial-gradient(90% 80% at 24% 44%, #17240f 0%, #0c110b 42%, var(--bg-0) 78%); isolation: isolate; }
.lp-screen::before { /* grain, 6 to 7 % */ content: ""; position: absolute; inset: 0; z-index: 1; opacity: .07; pointer-events: none; background-image: url("…fractal noise svg…"); }
.lp-screen::after { /* vignette */ content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(120% 100% at 50% 40%, transparent 55%, rgb(0 0 0 / .5) 100%); }

/* the hero object is an object: one hue from light to dark, a thin top highlight, a dark cast shadow, a contact shadow under it */
.lp-num { background: linear-gradient(175deg, #b6ef95 8%, #86cf60 46%, #4f9a35 96%); -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 2px 0 rgb(255 255 255 / .14)) drop-shadow(0 34px 38px rgb(0 0 0 / .6)); }
.lp-figure::after { content: ""; position: absolute; left: 2%; right: 14%; bottom: -4px; height: 46px; border-radius: 50%; background: radial-gradient(closest-side, rgb(0 0 0 / .55), transparent); }

/* small surfaces: lighter at the top, a 1px top-edge light, a dark shadow below; the chosen one lifted */
.lp-tile { background: linear-gradient(#1a1922, #111017); box-shadow: inset 0 1px 0 rgb(255 255 255 / .09), inset 0 0 0 1px var(--line-1), 0 10px 18px -10px rgb(0 0 0 / .8); }
.lp-tile.is-chosen { transform: translateY(-6px); box-shadow: inset 0 1px 0 rgb(255 255 255 / .45), 0 18px 26px -12px rgb(0 0 0 / .85); }

/* the main action: the same material */
.lp-cta { background: linear-gradient(#a6e683, #7fcb5a); box-shadow: inset 0 1px 0 rgb(255 255 255 / .45), 0 14px 28px -10px rgb(0 0 0 / .7); }
```

Rules of the material:

- One hue per object, from lighter to darker. Never two hues in one object, never a rainbow.
- Shadows are dark, never coloured. No glow around text, no neon.
- Light comes from one side for everything on the screen (here from the top left).
- The background is never the flat canvas on a first screen, and never a coloured cloud: a wide dark tone of the subject's own colour, darkest at the edges.
- This is material for a landing's first screen and its hero objects. App screens keep the quiet rules of the `ui` skill; rows 2 to 4 of its refusals still describe decoration there.

## 3. The product on the first screen

A boxed card of label and value rows did not reach: it reads as a settings panel beside the scene. Product presence needs another form, and none has been approved yet. Directions to try in a sketch, one at a time:

- the product's own view drawn with the same depth as the scene: its shapes and its one main figure, not rows of text;
- the product's data living inside the scene: the alert as the cursor's label, the beds as marks on the curve;
- one real moment of use (a notification arriving on the day it matters) played as a demo.

## 4. Before you show it

- All three layers are there, each from the product's own world.
- The first screen holds together at 1440 by 900 and at about 1400 by 800: the hook is not cut.
- Watch it for ten seconds in real time: the scene moves, numbers stay rounded, nothing collides midway.
