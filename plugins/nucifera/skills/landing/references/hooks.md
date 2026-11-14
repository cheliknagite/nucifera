# Hooks: the idea a landing is remembered by

A hook is one thing from the product's own world that fills the first screen and lives. The test: a visitor sees only the first screen; what do they describe an hour later? "A dark page with a screenshot" means there is no hook. "A radar sweeping the market and lighting up a car" is a hook.

Basis: about twenty strong landings measured in November 2026 (Linear, Stripe, Vercel, Raycast, GitHub, Railway, Neon, Brilliant, Duolingo, game sites), and reviews of pages built without a hook.

## 1. Set the default aside

Every category has a page everyone builds. For most products: a headline on the left, a product screenshot on the right, a dark empty canvas, sections of text below. Name the default for this product in one line and do not offer it as a concept. It may come back only as the "live product" type below, where the product really works on the screen.

## 2. Hook types

| Type | What it is | Fits when | What moves | Weak version to avoid |
|---|---|---|---|---|
| Live product | the real interface doing its job on the first screen: a chat getting an answer, a list updating, a result arriving | the product has a screen worth watching | a scenario of three to five steps, replayed after a pause | an invented dashboard with meaningless charts; a small static screenshot; a panel in a column beside the headline, which is the default again: give the product the stage |
| Instrument scene | the subject's own instrument or data drawn large, behind or around the headline: a radar, a route map, a timetable, a waveform, a star chart | the product watches, measures, routes or schedules | the instrument works: sweeps, draws, ticks | abstract lines or particles that belong to no subject |
| Statement in type | one number or sentence from the product's own data set across the screen, alive: it counts, changes with the day, answers the visitor's place or date | the product is about one figure or one promise | the figure settles or updates; a quiet scene may sit behind it | a slogan in big letters; a number with no source |
| World backdrop | the product's world as layered artwork: a sea, a street, a workshop, a night sky | the product has its own artwork, or the user agrees to have it made | layers drift slowly; small lives in it (a fire, a boat, lights) | a generic generated landscape; parallax on everything |
| Product film | a short muted recording of the real flow, with a poster | the flow itself is the pitch | the film, 10 to 40 seconds, playing while in view | stock footage; a film of nothing happening |
| Character | the product's own character alive: idles, looks, reacts to the pointer and a press | the product already has a designed character | idle loop, reactions | a mascot nobody designed, added for charm |
| Whole world in 3D | the product's world in volume with a camera that follows the scroll | only when the product has such a world and its assets, and the user asks for it | camera stops per block | a default 3D blob or a spinning shape; heavy scenes with a loader |
| Still art direction | one strong real photograph or illustration, no motion | the art is real and strong enough alone | nothing; a page like this needs life elsewhere (demos) | a decorative picture unrelated to the product |

Two types may combine (an instrument scene around a live product), but one leads; say which.

**An instrument from the product's data is not a product board.** A board is the app's own screen shown as it is: panels, widgets, a sidebar, several things at once; on a dark page it reads as one more dashboard. An instrument is one object of the subject drawn across the whole stage with real names, times and numbers, and it works: a tutor's week as a timetable where a lesson moves to a free slot, a season as one curve. If the sketch has more than one kind of panel, it is a board.

## 3. Find three concepts in the product

1. List what the product's world holds: places, instruments, documents, characters, streams of data, the moment the product is used, the thing it saves the user from.
2. For each ask: could this fill a screen and move for a reason?
3. Pick three that use different hook types and feel different at a glance (one about the product working, one about its world, one about a single bold object or statement is a good spread).
4. If `.design/calibration.md` or the product's DESIGN.md shows what the user rejected, do not offer that again in new clothes.
5. Never reuse the scene of the previous project: the mechanics repeat, the subject does not.
6. Match the type to the material. With no artwork, the strong types are the live product on a stage, the instrument scene and the statement in type: all three can be drawn truthfully in markup and canvas. A world backdrop, a character and a film need assets; offer one only with a list of what must be made, and never draw a world out of plain boxes.

Example, a bot that takes coffee pre-orders: (live product) the barista's queue where a new order drops in and moves to "ready"; (instrument scene) the morning as a timeline of cups filling toward the rush hour; (world backdrop) the bar at 7:40 drawn in layers, steam rising, the queue outside the window growing shorter.

## 4. The sketch

A sketch answers one question: is this the page? What it holds is listed in the skill's Step 2: the real headline and action, the hook at its real size with its main motion running, a backdrop about the product behind it, a telling still frame, the proposed colours, real or rebuilt product imagery, one neutral line under the screen. No other sections, no phone layout, no polish. Do not label the sketches by technique and do not say which you prefer until the user has looked.

## 5. Numbers from the measured pages

- Share of the first screen: a backdrop hook 60 to 92 %; an object beside the text 12 to 45 %. In reviews of pages built with this skill, a hook in a column beside the text never passed: make it the stage.
- Loops: small interface loops inside a demo 1.6 to 3.2 s; a scene or film 6 to 21 s; background drift 60 to 120 s.
- Weight: a 2D canvas scene needs no library (a whole scene can be under 100 KB of script); layered artwork 1 to 2 MB; a hero film 1.3 to 2.4 MB; a full 3D world 10 to 17 MB and a loader, which is studio work.
- Images on the page: 20 to 140, median 45. The product is shown many times.
- Below the first screen the background is usually one flat colour and the scrolling is plain: emptiness is cured by the hook and by things to look at, not by gradients.
