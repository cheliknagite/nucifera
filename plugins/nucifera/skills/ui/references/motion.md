# Motion: what moves, how fast, and why

Restrained is not static. A screen feels finished when every change of state is explained: the menu came out of the button you pressed, the selection slid to the option you chose, the saved item confirmed itself. What makes motion look generated is the opposite: everything fading in on load, pulsing, bouncing, sliding for its own sake. This file says what moves, at which tempo, and which ready recipe to use.

## 1. Before code: the motion map

Add a "Motion" table to `.design/DESIGN.md`, one row per state change on the screen (usually 4 to 8):

| Element | Event | Recipe | Haptic | Reduced motion |
|---|---|---|---|---|
| Sort button | open, choose | menu from the trigger | selection on change | fade |
| Price | value changes | number roll | none | crossfade |
| Brief row | tap | none: opened 100+ times a day | none | none |

Every change gets a recipe from section 4 or an explicit "none" with the reason. If no recipe fits, the change probably needs no motion.

Decide each row with three questions:

1. **How often?**

   | How often the user does it | Motion |
   |---|---|
   | 100+ times a day, or from the keyboard | none: instant |
   | tens of times a day | barely visible: colour or opacity, `--dur-exit` |
   | occasionally | a recipe at the house tempo |
   | rarely (first success, end of onboarding, landing hero) | a moment is allowed: `--dur-sheet`, `--dur-hero` |

2. **What does it tell the user?** That the action was taken; where something came from or went; which state is current; that the layout did not jump; once in a while, a moment of delight. Motion that tells nothing is removed.
3. **Which recipe?** Section 4. Do not invent new curves or durations.

## 2. Tempo

The house tempo is calm: about 1.75 times the common product norms (Material 3, Carbon, Fluent and Linear's site open menus in about 240 ms; here 420). It was chosen in a blind look at all twelve recipes: faster read as generated, slower read as considered. Press feedback stays fast, or buttons feel slow.

| Token | ms | For |
|---|---|---|
| `--dur-0` | 0 | hover highlight in; keyboard and 100+/day actions |
| `--dur-press` | 100 | press feedback |
| `--dur-fast` | 175 | tooltip out |
| `--dur-exit` | 280 | leaving (menu, dialog, toast), hover highlight out, colour and state changes, crossfades |
| `--dur-enter` | 420 | arriving or moving: menu, dialog, selection indicator, accordion, number roll, screen change, list rows |
| `--dur-sheet` | 700 | bottom sheet in, toast in, success check |
| `--dur-hero` | 840 | landing hero, scroll reveal |
| `--stagger` / `--stagger-hero` | 70 / 105 | between list rows (first show, at most five) / between hero lines |

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
| Press and highlight | buttons, tappable rows, menu items | `.btn`, `.tap`, `.menu__item` | press 100 ms; highlight 0 in, 280 out |
| Menu, popover | sort, actions, pickers | `.pop.menu` > `.menu__item`, `nuMotion.menu(trigger, pop)` | 420 in from 95 % at the trigger, 280 out |
| Tooltip | icon buttons, mouse and keyboard | `[data-tip]` > `.tip`, `nuMotion.tooltips()` | first after 400 ms, 280 in, 175 out; neighbours at once |
| Dialog | confirmations | `.dialog` + `.scrim`, `nuMotion.dialog(el, scrim)`; `nudge()` on a blocked action | 420 in from 96 %, 280 out; nudge to 98 % |
| Bottom sheet | filters and pickers on phones | `.sheet` > `.sheet__grab`, `nuMotion.sheet(el, scrim)` | 700 in on the spring, 420 out; a fast drag or one past 35 % closes it |
| Selection | segmented controls, tabs | `.seg` > `.seg__pill` + `.seg__opt`; `.tabs` > `.tabs__tab` + `.tabs__ink`; set `--i`, `--n`; the panel with `nuMotion.crossfade` | 420 on the spring; panel 280 |
| Toast | confirmations | `.toasts` container, `nuMotion.toast(container, html)` | 700 in from the top, 280 out; three at most; 4 s, waits while hovered |
| New content | added and removed rows; a list's first show | `.grow` > `.grow__in`, `nuMotion.grow`, `nuMotion.collapse`, `nuMotion.stagger` | 420; stagger 70, five rows at most |
| Accordion | details, analysis sections | `.fold` > `.fold__head` (`.fold__chev`) + `.fold__body` > `.fold__in` > `.fold__content`; toggle `.open` | 420 |
| Number change | prices, counters | `.roll`, `nuMotion.roll(el, text, dir)`; dir 1 up, -1 down | 420; the old digit leaves in 280 |
| Screen change | going deeper or back in an app | `nuMotion.swap(from, to, dir)`; screens stacked in one positioned parent | 420 in, 210 out, 12 px by direction |
| Waiting | loading data | `.skeleton`, `nuMotion.loading(work, show, hide)` | thresholds 200 / 400 ms; progress after 2 s |
| Success, error | results of actions | `.check-draw` (SVG with `pathLength="1"`); `nuMotion.shake(el)` plus the message | check 700; shake 4 px three times, 560 |
| Landing hero and scroll | landing pages only | `.rise` with `--i` per line; `nuMotion.reveal('.reveal')`; `.glassbar--quiet` + `nuMotion.hairline(bar)` | hero 840, 105 between lines; reveal 840, once |

The signature element may have one motion of its own when it first appears (a dot sliding into its place on a market ruler). Once, never a loop.

## 5. Haptics

When the page runs inside a host that offers haptics (a native app shell, a mini-app platform), plug it in once: `nuMotion.onHaptic = kind => { ... }`. Then call `nuMotion.haptic(kind)` and keep the meanings fixed:

| Moment | Kind |
|---|---|
| a tab, segment, picker or filter choice changed | `selection` |
| a sheet or toggle settled after a drag | `light` |
| a result: saved, paid, sent (when the server accepted it, not on the tap) | `success` |
| failed or blocked | `error`, `warning` |
| scroll, typing, navigation, every other tap | none |

One haptic per action. Haptics stay under reduced motion. Add a "Haptic" column to the motion map. If the host draws a native main button with its own progress indicator, use it instead of your own spinner, and keep toasts away from it.

## 6. Check

- `verify.mjs` warns on `transition: all`, ease-in and endless animations outside loaders, read from the page's CSS.
- Open the mockup in a browser and trigger every change from the motion map. In DevTools the Animations panel can slow everything to 10 %: menus grow from their trigger, exits are faster, nothing waits.
- Emulate reduced motion (DevTools, Rendering): nothing travels, all content is visible.
- The critic reviews the motion map in `DESIGN.md` (it sees still images).

## Sources

Emil Kowalski's agent skills (animate, review-animations, animation-performance), Kyle Zantos's design-motion-principles, the production CSS of Linear, Vercel and Raycast, the motion systems of Material 3, Carbon, Fluent and Atlassian, WCAG 2.3.3 and 2.2.2. October 2026.
