# nucifera

A design skill for Claude Code. It makes Claude design interfaces in one precise style, in the line of Linear, Raycast and Reflect: a monochrome dark theme and a light "Dusk" theme with a violet accent, and it checks the rendered screens before handing them over.

> Named after *Cocos nucifera*, the coconut palm: a dark shell with a light inside, like the two themes. Status: 0.2.0, early. See "What it does not promise".

## What it does

- **Starts with a scene, not a template.** Before any code Claude writes five lines to `.design/DESIGN.md`: who looks at the screen and where, the direction, the accent, one signature element taken from the subject's own world (a paint-thickness map for a car inspection, an appointment book for a barbershop), and what must be visible on the first screen.
- **Builds from a closed set of tokens and components.** `tokens.css` defines both themes by role (surfaces, lines, text, accent, main action); `kit.css` has about fifteen components (rows, hero card, stat, chips, fields, key-value, states). No raw colours in screens.
- **Reads without effort.** Body text 16px, secondary text 14px in one grey, data as plain label-value lists instead of boxes and grids, a status shown only when it is the exception, drawings that need no legend.
- **Names the AI tells and what to do instead.** Thirteen rules in the core and a dated list of 31 in the references: no coloured glows, no gradient buttons, no decorative dots, no small grey text in several shades, no data cut into boxes, no eyebrow labels on every heading, no washed-out photos, no airy screens where users came for data, and more. A vague "avoid the AI look" only swaps one default for another; named patterns with replacements hold.
- **Checks pixels with code.** `scripts/verify.mjs` renders every mockup screen at 360, 390 and 430px in the dark theme and at 390px in the light one, and reports overflow, contrast, touch targets, fonts that did not load, small text, extra shades of grey, coloured glows, glass count, accent use and Cyrillic line-height. No npm packages: it uses your installed Chrome, Edge or Chromium.
- **Asks a fresh critic.** The `design-critic` agent sees only the screenshots, the brief and DESIGN.md, and returns at most five rule-backed findings, or none. Claude waits for it before handing over.
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
  skills/ui/SKILL.md            the core (about 2,300 tokens)
  skills/ui/references/         style, components, Cyrillic typography, signature moves, refusals, verify, image direction
  skills/ui/assets/             tokens.css, kit.css, brand.template.css, frame.html + frame.js (mockups), probe.js
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

With love, kokos.
