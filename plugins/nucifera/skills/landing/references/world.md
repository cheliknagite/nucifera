# The world layer: a scene that lives, an interface that stays quiet

A landing has two layers.

- **The world**: the scene, the backdrop, a character. It may move all the time.
- **The interface**: navigation, text, buttons, tables, the controls inside demos. It follows `../ui/references/motion.md`: quick, on an event, nothing in a loop.

Keeping them apart is what lets a page feel alive without looking generated: the life has one source and a reason, and everything a visitor reads or presses stays calm.

## 1. What the world may do

- Loop slowly. A scene's cycle takes 6 to 20 seconds; drift (clouds, water, stars) a minute or two. Nothing flashes, pulses or bounces.
- Hold small lives: a fire flickers, a beam sweeps, a boat crosses. Each belongs to the subject.
- Answer the pointer lightly (lean, glance), for a mouse only.
- Follow the scroll, when the concept asks for it (section 5).

## 2. The contract every scene keeps

`nuScene.canvas` and `nuScene.layers` (`assets/scene.js`, `parts.md`) keep the mechanical part: one canvas at a pixel ratio of 2 at most, a loop that runs only while the scene is on screen in a visible tab, one frame under reduced motion and on weak devices (`data-perf="low"`), a redraw on resize. What stays with you:

1. **A telling still frame.** Name the `still` second: the scene at its most telling moment, never its empty start. Reduced motion, screenshots and the first paint show it.
2. **A pure function of time.** `draw(ctx, t, w, h)` depends only on `t`, and randomness comes from `nuScene.rand(seed)`: the scene is the same on every load.
3. **A poster for artwork.** Layered artwork and a film have a still image under them; a canvas scene needs an image only for the share picture.
4. **Phones.** The same scene made simpler, and the hook still inside the first screen.
5. **Light.** A 2D scene is plain canvas code with no library; a 3D library only for a true 3D world the user asked for. Layered artwork stays within 1 to 2 MB, a film within about 2 MB.
6. **Real.** Built from the product's own data, art and instruments; examples that could pass for real data are labelled.

## 3. Text over a scene

- Text has its own zone (the scene to one side, the headline on the other) or sits on an opaque panel (`--bg-1` with a hairline). Never straight over moving detail.
- The scene is dimmer under and next to text than where it is the subject; contrast for text stays at 4.5:1 at every moment of the loop.
- Fixed elements (a header, a progress strip, a bottom bar) never cover a panel's text. Check it at each stop.

## 4. Demos: the interface, alive

A demo is the product's real interface replaying a short scenario.

- Three to five steps with real data: a message arrives, a row drops in, a number settles, a mark appears.
- It plays while in view, pauses two to four seconds on the result, then starts again; off screen it stops. Small loops inside it take 1.6 to 3.2 seconds.
- It is live markup built from the kit, so it stays sharp and readable on a phone. Use a screenshot only when the screen cannot be rebuilt, and then crop close.
- Under reduced motion it shows the final state.
- Depicted controls are flat and inert; only the page's own actions are buttons.

`nuScene.play(box, { reset, steps, pause })` replays a scenario while it is on screen and shows its result off screen and under reduced motion. `nuMotion.roll`, `nuMotion.grow` and the kit's `.tempo-calm` give the steps. A step that carries words stays long enough to read them.

## 5. Scroll stops, when the concept needs them

Rare among strong pages; use them only when the chosen concept is a journey.

- A few stops (four to seven), each with one panel: a heading, two sentences, one link. `nuScene.stops(panels, onMove)` gives the camera its value.
- Normal scrolling moves the camera; never take the scroll away and never snap.
- No empty stretch: at every scroll position either a panel or the hero text is on screen.
- The camera eases between stops; under reduced motion it jumps.

## 6. What never moves

Body text and headings after their entrance, prices and results, navigation. No floating decoration, no pulsing indicators, no effects from outside the product's world (`../ui/references/refusals.md`).

## 7. Check

`verify.mjs --landing` fails a first screen where nothing moves once its entrance is over. By eye: the scene resumes when you come back to the tab and stops off screen; under reduced motion one still frame and all content; at 390px the hook is inside the first screen.
