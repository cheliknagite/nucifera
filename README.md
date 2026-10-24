# nucifera

A design skill for Claude Code. It makes Claude design interfaces in one precise style, in the line of Linear, Raycast and Reflect: a monochrome dark theme and a light "Dusk" theme with a violet accent, and it checks the rendered screens before handing them over.

> Named after *Cocos nucifera*, the coconut palm: a dark shell with a light inside, like the two themes. Status: 0.4.3, early. See "What it does not promise".

## What it does

- **Starts with a scene, not a template.** Before any code Claude writes to `.design/DESIGN.md`: who looks at the screen and where, the direction, the accent, one signature element taken from the subject's own world (a paint-thickness map for a car inspection, an appointment book for a barbershop), what must be visible on the first screen, and a motion map: every change of state with its recipe.
- **Builds from a closed set of tokens and components.** `tokens.css` defines both themes by role (surfaces, lines, text, accent, main action); `kit.css` has about fifteen components (rows, hero card, stat, chips, fields, key-value, states). No raw colours in screens.
- **Gives each screen a face.** Before building, Claude names what makes the screen unlike any other product's and reads two reference cards for that screen type next to a "generic twin": how a default generator would build the same content. The cards describe real products (what they measure, what to take, what not to copy) as text only.
- **Moves with intent, in two tempos.** Frequent things move at the speed of shipped products (menus in 240 ms); rare moments get a calm tempo. Ready recipes in `kit.css` and `motion.js`: presses that answer, menus that grow from their trigger, a sliding selection, sheets you can drag away, toasts, screen changes with direction, a waiting ladder that never flickers. Seven moments, at most one per screen: a photo that grows into its detail, the signature arriving once, a number that settles after an action, a success check, one pass of light over the main button, a landing's live product window, and on websites a window that pours out of the element you clicked and back into it, like the Mac genie. Prices and results never wait for an animation, and reduced motion keeps the meaning.
- **Reads without effort.** Body text 16px, secondary text 14px in one grey, data as plain label-value lists instead of boxes and grids, a status shown only when it is the exception, drawings that need no legend.
- **Names the AI tells and what to do instead.** Sixteen rules in the core and a dated list of 41 in the references: no coloured glows, no gradient buttons, no decorative dots, no small grey text in several shades, no data cut into boxes, no eyebrow labels on every heading, no washed-out photos, no airy screens where users came for data, and more. A vague "avoid the AI look" only swaps one default for another; named patterns with replacements hold.
- **Checks pixels with code.** `scripts/verify.mjs` renders every mockup screen at 360, 390 and 430px in the dark theme and at 390px in the light one, and reports overflow, contrast, touch targets, fonts that did not load, small text, extra shades of grey, coloured glows, glass count, accent use and Cyrillic line-height, plus motion lint (`transition: all`, ease-in, endless loops). No npm packages: it uses your installed Chrome, Edge or Chromium.
- **Asks a fresh critic.** The `design-critic` agent sees only the screenshots, the brief, DESIGN.md and the reference cards. It returns at most five rule-backed findings and a level verdict: is the screen closer to the references or to the generic twin? Asked twice in both orders, with a copy check. On "closer to the twin" Claude changes the face of the screen, not the polish. Claude waits for it before handing over.
- **Keeps images honest.** Generated images are for heroes, empty states and share images, never for listings, condition or anything next to a price; a brief recipe, one look for the whole set and a checklist of generator tells.
- **Handles Cyrillic properly**: subsets, line-height and tracking limits, the "її" test.

## Install

```bash
claude plugin marketplace add cheliknagite/nucifera
claude plugin install nucifera@nucifera
```

Then, once per project, inside Claude Code:

```
/nucifera:init
```

It copies the tokens into `.design/`, adds a short "Design" block to the project's `CLAUDE.md` (a line in the project file makes Claude reach for the skill far more reliably), and turns off Anthropic's `frontend-design` plugin for this project only, because two design skills pull in different directions.

Requirements: Claude Code; Node 18 or newer; Chrome, Edge or Chromium for `verify.mjs` (set `UI_BROWSER` to its path if it is not found). Without a browser the skill still works and marks the hand-over "PIXELS UNVERIFIED".

Update: `claude plugin marketplace update` or `/plugin marketplace update`.

## Use

Ask for any screen, page or mockup as usual ("design the checkout screen", "restyle this landing"). For a new kind of screen or before a release run `/nucifera:critique`.

Your brand goes into `.design/brand.css` (colours through `--brand-*`, logo, display font). The brief always wins: if you ask for a glow, you get a good glow.

## What it does not promise

- It removes measurable AI tells and keeps a consistent, precise style. Whether people prefer its screens to ones made without it has not been measured in a fair blind test, for this skill or any other design skill. Treat it as one well-checked opinion, not a proven improvement.
- The style is one look by design. If you want something else entirely, this is not your skill.
- Code checks see geometry and colour, not taste. The critic helps with hierarchy; the final choice is yours.
- Hooks, the critic agent and the verify script work in Claude Code. In claude.ai only the core text of the skill applies.

## Contents

```
plugins/nucifera/
  skills/ui/SKILL.md            the core (about 3,400 tokens)
  skills/ui/references/         style, components, motion, Cyrillic typography, signature moves, refusals, verify, image direction
  skills/ui/references/exemplars/  reference cards per screen type, with a generic twin each (text only)
  skills/ui/assets/             tokens.css, kit.css, motion.js, brand.template.css, frame.html + frame.js (mockups), probe.js
  skills/ui/scripts/verify.mjs  screenshots and measurements
  skills/init, skills/critique  manual commands
  agents/design-critic.md       the critic
  hooks/hooks.json              a one-line reminder at session start
```

## License

MIT No Attribution (MIT-0). Use it for anything: personal projects, free or paid products, change it, sell it. No credit required.

Geist and Geist Mono are by Vercel under the SIL Open Font License 1.1 and load from Google Fonts.

## Credits

The rules were informed by public research and by ideas from other design skills; no text was copied:

- anthropics/skills frontend-design: tell clusters, "the brief wins", spending boldness in one place.
- pbakaus/impeccable: operate vs persuade screens, honouring pinned aesthetics.
- MrIago/better-frontend: grounding design in the subject, decorative dots and pills over images as tells.
- connerkward/ckw-design-skill: rendering and judging the image, not the code.
- arsprengel/design-skill-claude-code: a scene and direction contract before code.
- Leonxlnx/taste-skill, funboy322/avoid-ai-design, AdrianKrebs/design-slop-cop: catalogues and thresholds of AI tells.
- VoltAgent/awesome-design-md: the Linear DESIGN.md as a reference for precision.
- emilkowalski/skills, kylezantos/design-motion-principles, jakubkrehel/make-interfaces-feel-better, mthines/agent-skills, bitjaru/styleseed, yetone/native-feel-skill: motion decisions, review and restraint.

With love, kokos.
