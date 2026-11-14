# Ready parts: what is already built

Read this before the sketches and before the build. The fragile pieces of a landing are written once and tested; use them and spend the effort on the idea, the product's own objects and the words.

| File (in `assets/`) | What it is |
|---|---|
| `scene.js` | `window.nuScene`: runs canvas scenes, backdrops, layered worlds, scroll stops and replaying demos by the contract of `world.md`, and the landing moments |
| `landing.css` | the material of `finish.md` as classes, the header and footer, the scene boxes, nine section compositions. Load it after `tokens.css` and `kit.css` |
| `starter.html` | a whole landing built from these parts and filled with one invented product, so every part can be seen alive |
| `backdrops.js` | the starter's two example backdrops: a simple world and a plan of the product's world. Read the one you need; do not copy the file into another product |

Copy `landing.css` and `scene.js` into `.design/` next to `tokens.css`, `kit.css` and `motion.js` before the sketches; `starter.html` is opened at the build.

## 1. The starter page

Open it in a browser first: it shows what the parts do together. Then build from it.

- **Keep the mechanics, replace the subject.** What stays: the page skeleton, the classes, the calls, the timing. What is rewritten: the hook, the scenes, the product views, the data, the colours and every word. That is most of the file, and it is expected.
- **Not its first screen's arrangement.** A figure on the left, the copy on the right and columns under them belong to the starter's product; moved to another product, the same arrangement was rejected. Take the mechanics from it (a scene tied to a line of type, a backdrop), and arrange the first screen for the chosen concept.
- The page needs `<body class="app">`: without it the kit does not set the type or the colours.
- Every block that still shows the invented product carries `data-example`. Remove the attribute when the block shows the real product; delete the blocks the page plan does not use. `verify.mjs --landing` fails a page with an example left in it.
- The sections stand in the order of a visitor's questions (`page.md`). Take the compositions the plan names; a home page needs at least four different ones, not all nine.
- The page's own classes keep the `lp-` prefix; the parts' classes have none.
- Do not read `landing.css` and `scene.js` through: this file lists what they give. Read the starter in pieces. Every part of it has three pieces under one name: its styles (`/* ---- name`), its markup (`<!-- ==== name`) and its script (`/* ---- name`); search for the name. Start with "first screen", then take the sections the plan keeps.
- The tokens you need without opening `tokens.css`: colours `--bg-0` to `--bg-3`, `--fg-1`, `--fg-2`, `--line-1` to `--line-3`; type `--font-sans`, `--t-hero`, `--t-section`, `--t-lead`, `--t-title`, `--t-body`, `--t-small`; space `--s-1` to `--s-8`, `--s-12`, `--s-16`; radius `--r-sm` to `--r-xl`; motion `--dur-exit`, `--dur-enter`, `--dur-moment`, `--ease-out`, `--ease-move`.
- Colours: set `--obj`, `--obj-ink`, `--cta-bg`, `--cta-fg` and up to three subject colours named by role, in `.design/brand.css`.

## 2. Scenes: `nuScene`

```js
nuScene.canvas(box, {            // box: the .scene element; a canvas is added if it has none
  still: 8.8,                    // the second that shows the scene at its most telling moment
  from: 1,                       // optional: the second it starts at
  pointer: false,                // true: draw gets the mouse as { x, y } from -1 to 1, eased
  draw(ctx, t, w, h, pointer) {  // t: seconds the scene has run; w, h: CSS pixels
    const u = t % 10;            // loops: make everything a pure function of t
  },
});
```

`canvas` keeps the contract for you: one canvas at a pixel ratio of 2 at most, a loop that runs only while the scene is on screen in a visible tab, one frame at `still` under reduced motion, on weak devices and before the start, a redraw on resize. Because `draw` is a pure function of `t`, the still frame and every screenshot are exact. Take randomness from `nuScene.rand(seed)`, so the scene is the same on every load. Things outside the canvas that follow the scene (a lit tile, a label, a notification) are updated from `draw`, and only when their state changes.

```js
nuScene.backdrop(box, {          // what stands behind the text: box is the .backdrop that wraps the first screen
  draw(ctx, t, w, h, env) {      //   env.u: the scroll through the box, 0 to 1
                                 //   env.calm(el, pad, alpha): a calm zone under a block of text (40px, .8 by default)
  },
});
nuScene.layers(box)              // a world from artwork: .world > .world__layer
                                 //   data-depth="0…1": how far a layer leans after the mouse
                                 //   data-drift="90": seconds per pass for a strip that tiles sideways
nuScene.stops(panels, pos => {}) // a journey: pos glides 0, 1, 2… as each panel passes the middle of the screen
nuScene.play(box, {              // a product demo: replays while on screen, shows its result otherwise
  reset() {}, pause: 3600,
  steps: [[900, () => {}], [1500, () => {}]],   // [ms after the previous step, what happens]
});
nuScene.ease(u)  nuScene.out(u)  nuScene.lerp(a, b, u)  nuScene.clamp(v)  nuScene.ink(el, '--token')
nuScene.calm()                   // true while motion is allowed (no reduced motion, not a weak device)
```

Two scenes in the starter show the pattern: the first screen's 21 nights (columns on a zero line under a curve, a cursor walking them) and the season band (a line of values over a zone). Other mechanics are built the same way: a sweep (a beam turns and lights marks: a radar, a lighthouse), a field (cells fill: a timetable, a seat map), a route (a mark travels a path). The mechanic may repeat between projects; the subject, the shapes and the data never do.

A step that carries words stays long enough to read: in the starter one message holds from the first event to the last, then gives way to the one that matters. A label that changes with every tick of the scene cannot be read.

### Moments: one planned motion per section

Stronger than an app screen allows, so they live here and not in the `ui` kit. Each plays once, as its block comes into view; nothing is hidden without the script, and under reduced motion every block stands in its final state.

| Call or class | What happens | Use it for |
|---|---|---|
| `nuScene.words(heading)` | the words rise out of their own line, one after another | the page's headline, a section heading that carries the idea |
| `nuScene.count(el)` | the figure counts up to its value and settles ("147", "$27,400", "30 years") | a statement, a key number |
| `nuScene.each(box, { gap })` | the children arrive one after another | tiles, cards, steps, close-ups |
| `nuScene.chart(svg)` | `[data-draw="line"]` draws, `[data-draw="fill"]` comes up under it, `[data-draw="mark"]` lands last | every SVG chart |
| `nuScene.assemble(box)` | the children come together as the page scrolls the box into view | a product object made of parts |
| `nuScene.tied(el, u => {})` | your own motion tied to the scroll, `u` from 0 to 1 | one object per page at most; never text |
| `.spot` and `nuScene.spot()` | the card lifts and a soft light follows the pointer over its face and edge | cards and tiles a visitor can explore |
| `.travels` | on a site of several pages the one object with this class on both pages moves from its old place to its new one; pages cross-fade | the object a block and its detail page share |

Quiet by choice: buttons and links answer with a little more light and a leaning arrow (`.btn .arrow`), plain text blocks fade up with `nuMotion.reveal`, and text is never tied to the scroll.

## 3. Material and place

| Class | What it makes |
|---|---|
| `.stage` | the first screen as a place: it clips and stacks its content; it has no light of its own, the backdrop stands behind it |
| `.backdrop` | wraps a stretch of the page that shares one backdrop; `nuScene.backdrop` puts the canvas in it. The canvas stays in the window while the content scrolls over it, and the first block inside is pulled up over it; each stretch gets its own view of the world |
| `.solid` | the hero object in type (a figure, a word): one hue from light to dark, a thin top highlight, a dark cast shadow. `--obj` |
| `.cast` | the contact shadow under an object standing on the stage |
| `.tile`, `.tile.is-chosen` | small raised surfaces; the chosen one lifted and filled with `--obj` |
| `.btn--lit` | the main action in the same material |
| `.panel` | an opaque raised panel: text over a scene, a product view |
| `.frame` | every image and product view: inside the margins, a radius, a hairline |
| `.example` | the label on an example that could pass for real data |

The rules of this material are in `finish.md`. It belongs to a landing's first screen, its hero objects and the final call; app screens stay flat.

## 4. The first screen and the page

| Class | What it is |
|---|---|
| `.wrap` | the page container: 1200px at most, side gutters |
| `.site-head`, `.site-head__logo` | the header: a logo, a `nav`, an action |
| `.first` | the first screen: a column as tall as the window; `.first__hook` is the hook's own area and takes the height that is left; `.first--backdrop` puts the hook behind the copy |
| `.scene`, `.scene__poster` | a canvas scene's box, and the image under an artwork or film scene |
| `.world`, `.world__layer` | a layered world |
| `.section-top`, `.caption` | a section's heading block and a one-line caption |
| `.site-foot` | the footer: the logo with one line, then columns of links |

From `kit.css`: `.section` (the space between sections), `.t-hero`, `.t-section`, `.t-lead`, `.faq`, `.cta-bar`, `.btn`. From `motion.js`: `nuMotion.reveal` and `nuMotion.ctaBar`.

## 5. Section compositions

One class per composition of `page.md`; neighbours never share one.

| Composition | Class | Notes |
|---|---|---|
| Scene with headline | `.first` with `.stage` | the first screen |
| Split, object leads | `.split` | the object is the first child and takes the larger half; `.split--flip` puts it on the right, `.split--top` aligns the halves at the top |
| Stage | `.show` | a heading, one wide `.frame` or `.panel`, `.show__note` |
| Close-ups | `.closeups` | two to four `figure`s of unequal size, each a `.frame` and a `.caption` |
| Statement | `.statement` | `.statement__big`, `.statement__note`; a chart may stand under it as its proof |
| Steps rail | `.steps` | three to five children, each a `.steps__object`, an `h3`, a sentence |
| Comparison | `.compare` | two columns, or `.compare--rows`; the product's side is `.is-ours` |
| Band | `.band` | a photo, a scene or a world across the content width; `.band__text` on its masked side |
| Table | `.plans` | a `table`: labels once on the left, the main plan's cells `.is-main` |
| List | `.faq` | `<details name="faq">`, one open at a time |
| Final call | `.final` | an object, one sentence, one action; with `.stage` it is a lit panel |

Rhythm: a statement and the final call are calm screens, and calm screens work between dense ones. Two calm screens in a row read as emptiness, so plans and questions share one screen (`.split.split--top`) instead of standing as two screens of text.

## 6. What the parts do not do

They do not choose the idea: a page built from them with no hook is still the sterile twin. They carry no artwork. They are a floor, not the look: change sizes, proportions and the first screen's arrangement to fit the concept the user chose.
