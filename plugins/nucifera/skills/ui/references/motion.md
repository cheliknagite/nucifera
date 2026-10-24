# Motion: what moves, how fast, and why

Restrained is not static. A screen feels finished when every change of state is explained: the menu came out of the button you pressed, the selection slid to the option you chose, the saved item confirmed itself. What makes motion look generated is the opposite: everything fading in on load, pulsing, bouncing, sliding for its own sake. This file says what moves, at which tempo, and which ready recipe to use.

## 1. Before code: the motion map

Add a "Motion" table to `.design/DESIGN.md`, one row per state change on the screen (usually 4 to 8):

| Element | Event | Recipe | Haptic | Reduced motion |
|---|---|---|---|---|
| Sort button | open, choose | menu from the trigger | selection on change | fade |
| Price | value changes | number roll | none | crossfade |
| Brief row | tap | none: opened 100+ times a day | none | none |

Every change gets a recipe from section 4, a moment from section 5, or an explicit "none" with the reason. If no recipe fits, the change probably needs no motion.

Decide each row with three questions:

1. **How often?**

   | How often the user does it | Motion |
   |---|---|
   | 100+ times a day, or from the keyboard | none: instant |
   | tens of times a day | barely visible: colour or opacity, `--dur-exit` |
   | occasionally | a recipe at the interface tempo |
   | rarely (first success, the signature's first show, landing hero) | a moment is allowed: section 5 |

2. **What does it tell the user?** That the action was taken; where something came from or went; which state is current; that the layout did not jump; once in a while, a moment of delight. Motion that tells nothing is removed.
3. **Which recipe?** Section 4; for the rare cases a moment from section 5. Do not invent new curves or durations.

## 2. Tempo: two speeds

Frequent motion is quick, rare motion is calm.

- **Interface tempo** for everything the user sees many times: menus, tabs, sheets, toasts, rows, screen changes. It matches what measured products ship (Linear, Raycast, Apple, Material 3: 120 to 320 ms), so the product feels fast.
- **Moment tempo** for the rare and the first: a photo growing into its card, the signature arriving, a number settling after an action, success, the landing hero (section 5). Calm enough to follow with the eye, so it reads as considered, not generated.

It began as one calm tempo for everything (about 1.75 times the norms, picked in a blind review of twelve recipes); measurements of shipped products split it: fast for the frequent, calm for moments. Press feedback stays fast at any tempo.

| Interface token | ms | For |
|---|---|---|
| `--dur-0` | 0 | hover highlight in; keyboard and 100+/day actions |
| `--dur-press` | 100 | press feedback |
| `--dur-fast` | 120 | tooltip out |
| `--dur-exit` | 180 | leaving (menu, dialog, toast), hover highlight out, colour and state changes, crossfades |
| `--dur-enter` | 240 | arriving or moving: menu, dialog, selection indicator, accordion, screen change, list rows |
| `--dur-sheet` | 420 | bottom sheet in, toast in |
| `--stagger` | 50 | between list rows (first show, at most five) |

| Moment token | ms | For |
|---|---|---|
| `--dur-moment` | 450 | shared element morph (back at 75 %), success check, a block settling |
| `--dur-roll` | 600 | a number rolling to its new value after an action |
| `--dur-signature` | 700 | the signature element arriving on its first show |
| `--dur-draw` | 800 | a line or chart drawing itself once |
| `--dur-hero` | 840 | landing hero, scroll reveal, the product window |
| `--dur-sheen` | 1100 | one pass of light over the main button |
| `--stagger-hero` | 105 | between hero lines |

Inside `.tempo-calm` (a landing's live product window) the kit's recipes take the moment tempo.

| Curve | Value | For |
|---|---|---|
| `--ease-out` | `cubic-bezier(.23, 1, .32, 1)` | enter and exit: everything by default |
| `--ease-move` | `cubic-bezier(.77, 0, .175, 1)` | moving within the screen |
| `--ease-spring` | a `linear()` spring with 2 % overshoot, falls back to `--ease-out` | bottom sheet and the selection pill only |
| `--ease-color` | `ease` | hover and colour |

Exits take about two thirds of the entry. Never ease-in on interface motion. No overshoot anywhere else.

## 3. Rules

1. Appear at once, leave softly: hover highlight in 0 ms, out `--dur-exit`.
2. Everything pressable answers the press: `scale(var(--press-scale))` in `--dur-press`.
3. Menus and popovers grow from their trigger (`transform-origin` on the trigger's side, from `--scale-menu`); dialogs from the centre. Never from `scale(0)`.
4. Exits are faster than entries and never delayed.
5. Anything that can be triggered again uses transitions, not keyframes: a transition reverses from where it is, keyframes restart.
6. Animate `transform` and `opacity` only (height through `grid-template-rows`, as the kit does). Never `transition: all`; never width, height, top, margin, `box-shadow` or a blur radius.
7. One focal point: nothing moves in two directions at once.
8. Do not delay the payload: prices, totals, search results and the main content are there at once. App screens open straight into the task, with no load choreography.
9. Sibling views (tabs, segments) change with a short crossfade; going deeper or back slides 12 px with direction.
10. Stagger only on the first show of a list, at most five rows; never two staggered lists in one view.
11. Hover motion only where a real pointer exists: `@media (hover: hover) and (pointer: fine)`.
12. Interruptible: a new action cancels the running animation; nothing waits for an animation to end.
13. Motion is never the only signal: the state also shows in text, colour or an icon.
14. Reduced motion keeps the meaning: the tokens remove travel and scale and shorten fades; colour, focus rings, loaders and haptics stay. Never a global `transition: none`.
15. The theme switches without transitions (`nuMotion.setTheme`, or `.nu-no-tx` on `<html>` for two frames).
16. Waiting: nothing for the first 200 ms; then a skeleton for at least 400 ms; past 2 s add progress; the result crossfades in (`nuMotion.loading`).

## 4. Recipes

CSS in `assets/kit.css`, behaviour in `assets/motion.js` (load it after the page; it exposes `window.nuMotion`).

| Recipe | Use for | How | Numbers |
|---|---|---|---|
| Press and highlight | buttons, tappable rows, menu items | `.btn`, `.tap`, `.menu__item` | press 100 ms; highlight 0 in, 180 out |
| Menu, popover | sort, actions, pickers | `.pop.menu` > `.menu__item`, `nuMotion.menu(trigger, pop)` | 240 in from 95 % at the trigger, 180 out |
| Tooltip | icon buttons, mouse and keyboard | `[data-tip]` > `.tip`, `nuMotion.tooltips()` | first after 400 ms, 180 in, 120 out; neighbours at once |
| Dialog | confirmations | `.dialog` + `.scrim`, `nuMotion.dialog(el, scrim)`; `nudge()` on a blocked action | 240 in from 96 %, 180 out; nudge to 98 % |
| Bottom sheet | filters and pickers on phones | `.sheet` > `.sheet__grab`, `nuMotion.sheet(el, scrim)` | 420 in on the spring, 240 out; a fast drag or one past 35 % closes it |
| Selection | segmented controls, tabs | `.seg` > `.seg__pill` + `.seg__opt`; `.tabs` > `.tabs__tab` + `.tabs__ink`; set `--i`, `--n`; the panel with `nuMotion.crossfade` | 240 on the spring; panel 180 |
| Toast | confirmations | `.toasts` container, `nuMotion.toast(container, html)` | 420 in from the top, 180 out; three at most; 4 s, waits while hovered |
| New content | added and removed rows; a list's first show | `.grow` > `.grow__in`, `nuMotion.grow`, `nuMotion.collapse`, `nuMotion.stagger` | 240; stagger 50, five rows at most |
| Accordion | details, analysis sections | `.fold` > `.fold__head` (`.fold__chev`) + `.fold__body` > `.fold__in` > `.fold__content`; toggle `.open` | 240 |
| Number change | prices, counters | `.roll`, `nuMotion.roll(el, text, dir)`; dir 1 up, -1 down; call it when the action ends | 600 (moment tempo); the old digit leaves in 360 |
| Screen change | going deeper or back in an app | `nuMotion.swap(from, to, dir)`; screens stacked in one positioned parent | 240 in, 135 out, 12 px by direction |
| Waiting | loading data | `.skeleton`, `nuMotion.loading(work, show, hide)` | thresholds 200 / 400 ms; progress after 2 s |
| Success, error | results of actions | `.check-draw` (SVG with `pathLength="1"`) and `nuMotion.success(block)` (section 5); `nuMotion.shake(el)` plus the message | check 450; shake 4 px three times, 360 |
| Landing hero and scroll | landing pages only | `.rise` with `--i` per line; `nuMotion.reveal('.reveal')`; `.glassbar--quiet` + `nuMotion.hairline(bar)` | hero 840, 105 between lines; reveal 840, once |

## 5. Moments

A moment is a rare, expressive motion that makes a screen memorable: the eye follows one object instead of watching things blink. Six are ready in the kit and `motion.js`.

Rules:

1. At most one moment per screen; each at most once per flow (success once per payment, the signature once per session).
2. Only on an event: the user's action or the first appearance of the thing. Never on a timer, never in a loop.
3. The content is true and readable during the moment: the price, the name, the result are already there; the moment moves something that is already so.
4. Monochrome light: white light, the accent only where it already is; no colour sweeps, glows or particles.
5. Reduced motion and weak devices (`data-perf="low"`) get the end state; `motion.js` does this by itself (`nuMotion.calm()` says whether moments play).
6. A moment goes into the motion map like any recipe, with its event.

| Moment | When | How | Numbers |
|---|---|---|---|
| Shared element | a photo or object opens into its detail (a listing thumbnail into the card's hero) | `nuMotion.morph(from, to, update, { back, screen })`: one named pair travels, the rest of the screen changes plainly; only the latest call changes the screen; without View Transitions the new screen fades in | 450 there, about 340 back |
| Signature once | the signature's first show in a session (a dot sliding to its place on a market ruler, a price history drawing itself) | `nuMotion.once(key, play)`; inside it `nuMotion.arrive(el, dx)` for the object, `nuMotion.draw(path, 150)` for an SVG line with `pathLength="1"`, `haptic('light')` when it lands | dot 700, line 800; later opens: in place, still |
| Number after an action | a count or total that changes because of the user's action (results after a budget slider) | `.roll` and `nuMotion.roll` on `change`, not `input`; the label by the control updates at once | 600; only the changed digits move; never counts up by itself |
| Success | a payment, a sent request, a saved brief, once the server confirmed | a `.check-draw` SVG in the result, then `nuMotion.success(block)`: the block settles from 96 % and the success haptic fires | circle 450, the mark 315 after 180; settle 300; no confetti |
| Main button sheen | the main button just became available (a plan chosen, a form now valid) | `.btn--sheen` on the button, `nuMotion.sheen(btn)` | one pass, 1100, white light |
| Live product window | a landing hero: the real product plays a few steps by itself | heading lines with `.rise`; the window `.tempo-calm` with `nuMotion.demo(win, steps)`: it fades in after the heading, then each step runs 600 apart (a row grows in, a price rolls, a note fades in), then everything stays still | window after about 1.2 s, fade 840; three steps |

Materiality, still: the one raised surface gets a 1 px light top edge (`.lit`), and a large dark gradient gets a fixed grain (`.grain`) so it does not band. Nothing moves. One surface per screen, not every row (refusal 29).

## 6. Haptics

When the page runs inside a host that offers haptics (a native app shell, a mini-app platform), plug it in once: `nuMotion.onHaptic = kind => { ... }`. Then call `nuMotion.haptic(kind)` and keep the meanings fixed:

| Moment | Kind |
|---|---|
| a tab, segment, picker or filter choice changed | `selection` |
| a sheet or toggle settled after a drag | `light` |
| the signature landed on its first show | `light` |
| a result: saved, paid, sent (when the server accepted it, not on the tap) | `success` |
| failed or blocked | `error`, `warning` |
| scroll, typing, navigation, every other tap | none |

One haptic per action. Haptics stay under reduced motion. Add a "Haptic" column to the motion map. If the host draws a native main button with its own progress indicator, use it instead of your own spinner, and keep toasts away from it; if it has its own shine effect, use that for the sheen moment, one pass.

## 7. Check

- `verify.mjs` warns on `transition: all`, ease-in and endless animations outside loaders, read from the page's CSS.
- Open the mockup in a browser and trigger every change from the motion map. In DevTools the Animations panel can slow everything to 10 %: menus grow from their trigger, exits are faster, nothing waits.
- Emulate reduced motion (DevTools, Rendering): nothing travels, all content is visible.
- Moments: at most one per screen, each on its event and once; with reduced motion the end state is there at once.
- The critic reviews the motion map in `DESIGN.md` (it sees still images).

## Sources

Emil Kowalski's agent skills (animate, review-animations, animation-performance), Kyle Zantos's design-motion-principles, the production CSS of Linear, Vercel and Raycast, the motion systems of Material 3, Carbon, Fluent and Atlassian, teardowns of the Linear, Stripe and Raycast landing pages, the View Transitions API, WCAG 2.3.3 and 2.2.2. October 2026.
