# Image direction: when to use images, how to brief a generator, how to check the result

Use when a screen needs imagery the project does not have (a landing hero object, onboarding, empty states, share images). This skill does not generate images itself; it writes the brief, and generation runs only after the user says yes and sees the cost (about 0.2 to 0.4 USD per screen: four drafts, a blind pick, one or two finals).

## What premium products actually show

Almost no stock or generated photos. The hero is the real product working, plus at most one object from the brand's or subject's world, lit (a logo turned into an object, a product on a seamless stage). Car brands show CGI of the exact configuration from fixed angles; marketplaces show only real photos in a fixed order. The wow comes from precision, real data and one object, not from many images. Avoided everywhere: purple blobs, people pointing at screens, 3D mascots, fake dashboards.

## Trust first

A product that sells, inspects or compares real things lives on trust. In January 2026 a car auction site pulled a listing whose photos were AI-altered (garbled plate, mismatched lights and emblems); commenters caught it by comparing photos. The EU AI Act (Art. 50, from August 2026) requires disclosing realistic fakes of existing objects, not only people.

Generated images are allowed for: landing and onboarding heroes, paywall, empty states, share and OG images, the bot avatar and cover, abstract objects, and schematic vector diagrams (a top-view car outline to mark paint-gauge readings or damage).

Never: listing cards or listing details; an "example" of a real make, model or year; condition, damage or before-and-after; anything next to a price or a market comparison; faces and testimonials; generative retouching of real listing photos (crop and exposure only).

- A listing without photos gets a line-art silhouette, never a photoreal car.
- A photoreal car or product outside listings is generic and unbadged (no logo, no plate) and carries an "Illustration" caption, in the interface language, wherever it could pass for a real item.
- Match the market: in right-hand traffic countries cars are left-hand drive; check the steering wheel side.
- Keep the originals with their provenance data (C2PA, SynthID) in an archive.

## The brief

Order: scene, subject, light, camera, materials and imperfection, composition, use. Write in positive terms (some models ignore negatives). Use photography language: a real lens, a real light setup. No "8k, hyperrealistic, masterpiece".

```
Studio product photograph for a dark app landing page.
Subject: <generic, unbadged modern car in matte graphite | the object>, front three-quarter view,
front wheels turned slightly toward camera, plain grille, smooth unmarked bodywork, no plate fitted.
Light: one large softbox high on the left drawing a long soft highlight along the shoulder line,
low fill, soft contact shadow under the tyres, the background falls off into darkness.
Camera: full-frame, 50mm, f/8, lens at headlight height, level horizon.
Materials: real paint with faint orange peel, tyre sidewall texture, light dust on the sills.
Composition: subject in the left 55% of the frame, empty dark space on the right. 3:2.
Natural, true-to-life colour; plain seamless charcoal cove.
```

- Generate on a transparent background (where the model supports it) or on plain charcoal, and blend the edges into the page with CSS. Do not ask for an exact hex background or a glossy floor reflection: models miss the hex, and a wrong reflection is a classic AI tell.
- The light theme "Dusk" gets its pair by editing the same image ("keep everything, change the background to pale lilac-grey, softer shadow"), not by a new generation.
- Never ask the generator for text or interface; render real UI instead.

## One look for the whole set

1. Write one style block (light, lens, stage, palette, grain) in `.design/DESIGN.md` under "Images" and append it word for word to every prompt.
2. The user picks one anchor image blind from four drafts; every later image passes the anchor as a style reference.
3. Fix the aspect ratio, camera height and subject scale per image type.
4. Log model, version, seed, prompt and references in `.design/images.json`.

Models that suit this (late 2026): Gemini image models (cheap drafts, strong edits, style references), FLUX 3 or Gemini Pro image for finals, Recraft for vector illustrations and diagrams with a saved style. Use official APIs or official MCP servers only, installed for the project; keep keys out of the repository.

## Check every image (100 % and 200 %, mirrored, in greyscale)

- Wheels: the same spoke count front and rear, round rims, brake calipers present once, tread not smeared, a contact shadow under each tyre.
- Badges, plates, text: no glyph soup, pseudo-logos or mirrored letters.
- Symmetry: matching headlights and taillights, mirrors of one size, shut lines that continue, a sane wheelbase, the right steering side for the market.
- Light: reflections match the studio; highlights and shadows agree; no floor reflection that fails to mirror the car.
- Surfaces: no waxy sheen, banded gradients, halos, everything equally sharp, uniform fake grain, a teal-and-orange grade, or a too-clean world.
- People: avoid; if unavoidable, check hands, teeth, ears and glasses.

## Delivery

AVIF with a WebP fallback in `<picture>`; `srcset` widths 480, 800 and 1200 for a hero, 160, 320 and 480 for thumbnails; always `width` and `height`; `decoding="async"`. The hero that is the largest element gets `fetchpriority="high"` and never `loading="lazy"`; lazy only below the fold. Budgets: hero 150 KB or less, cards 30 KB or less.

## Avoid

Neon, lens flares, bokeh blobs, holograms, floating UI fragments, glowing particles, "futuristic" cityscapes, purple gradients and auroras, glossy 3D blobs, uncanny people, text in images, mixed styles between screens.
