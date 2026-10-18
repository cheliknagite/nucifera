# Image direction: prompts for image generators in the house style

Use when a screen needs imagery the project does not have (hero objects, empty-state art, onboarding, landing visuals) and the user has an image generator. This skill does not generate images itself; it writes the brief.

## Principles

- Real content first: product photos, the user's own images, screenshots of the real product. Generated images only where nothing real exists, and never pretending to be real listings or people.
- One art direction per project, written once in `.design/DESIGN.md` under "Images", reused in every prompt.
- Images are content, so they stay clear: no heavy filters, no violet tint over photos.

## House art direction (dark theme)

- Subject isolated on a near-black stage (#07060b), studio light from one side, a soft cool-white rim light at low intensity, subtle floor reflection.
- Muted, true-to-life colours of the subject; the only saturated colour is the subject's own.
- Clean negative space on one side for text; no text inside the image.
- Camera: 3/4 view at eye level for products, top view for diagrams and layouts.

Template:

```
<subject>, isolated on a near-black studio stage (#07060b), single soft key light from the left,
faint cool white rim light, subtle reflection on a dark glossy floor, true-to-life colours,
calm and precise, generous empty space on the right, no text, no logos, no gradients in the background,
photographic, 3/4 view, 4:3
```

For the light theme "Dusk": the same subject on a pale lilac-grey seamless background (#dfddef), soft daylight, gentle shadow, no violet rim light.

## Avoid

Neon, lens flares, bokeh blobs, holograms, floating UI fragments, glowing particles, "futuristic" cityscapes, purple gradients, glossy 3D blobs, people with uncanny faces, text in images.
