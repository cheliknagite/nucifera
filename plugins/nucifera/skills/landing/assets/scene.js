/* nucifera: scenes for landing pages (the world layer, references/world.md). No dependencies.
   window.nuScene = { canvas, layers, stops, play, seen, rand, ease, out, lerp, clamp, calm, ink }

   Everything made with it keeps the scene contract: it runs only while it is on screen in a visible tab, caps the
   pixel ratio at 2, shows one telling still frame under reduced motion and on weak devices (<html data-perf="low">),
   and looks the same on every load when its randomness comes from nuScene.rand(seed). */
(() => {
  'use strict';
  const root = document.documentElement;
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const calm = () => !mq.matches && root.dataset.perf !== 'low';
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, u) => a + (b - a) * u;
  const ease = u => (u = clamp(u)) < .5 ? 2 * u * u : 1 - Math.pow(2 - 2 * u, 2) / 2;   /* in and out: things that travel */
  const out = u => 1 - Math.pow(1 - clamp(u), 3);                                        /* out: things that arrive */
  const ink = (el, name) => getComputedStyle(el).getPropertyValue(name).trim();          /* a token's colour for the canvas */

  /* seeded random numbers, 0 to 1: const r = nuScene.rand(7); r(); r(); */
  function rand(seed = 1) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  /* cb(true) while the element is on screen in a visible tab, cb(false) when it is not. Returns a function that stops watching. */
  function seen(el, cb, threshold = .05) {
    let inView = false, on = false;
    const set = () => { const now = inView && !document.hidden; if (now !== on) { on = now; cb(on); } };
    const io = new IntersectionObserver(en => { inView = en[en.length - 1].isIntersecting; set(); }, { threshold });
    io.observe(el); document.addEventListener('visibilitychange', set);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', set); };
  }

  /* A canvas scene. box: the .scene element (a canvas is added if it has none) or the canvas itself.
       draw(ctx, t, w, h, pointer)  t: seconds the scene has run (it holds while the scene is off screen);
                                    w, h: CSS pixels; pointer: { x, y } from -1 to 1, eased, zero without a mouse
       still: the second that shows the scene at its most telling moment (reduced motion, weak devices, before the start)
       from: the second the scene starts at (default 0);  pointer: true to follow the mouse;  threshold: share on screen to run
     Make draw a pure function of t (use t % cycle for loops): then every still frame and screenshot is exact. */
  function canvas(box, opt) {
    const cv = box.tagName === 'CANVAS' ? box : box.querySelector('canvas') || box.appendChild(document.createElement('canvas'));
    const ctx = cv.getContext('2d'), p = { x: 0, y: 0 }, aim = { x: 0, y: 0 };
    let w = 0, h = 0, t = opt.from || 0, last = 0, raf = 0, on = false, vis = false, ran = false;
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2); w = cv.clientWidth; h = cv.clientHeight;
      if (cv.width !== Math.round(w * d) || cv.height !== Math.round(h * d)) { cv.width = Math.round(w * d); cv.height = Math.round(h * d); }
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const paint = time => { if (!w || !h) return; ctx.clearRect(0, 0, w, h); opt.draw(ctx, time, w, h, p); box.classList.add('is-live'); };
    const rest = () => { size(); paint((ran && calm()) || opt.still == null ? t : opt.still); };
    const frame = now => {
      if (!on) return;
      t += Math.min(.1, (now - last) / 1000); last = now;
      p.x += (aim.x - p.x) * .08; p.y += (aim.y - p.y) * .08;
      paint(t); raf = requestAnimationFrame(frame);
    };
    const start = () => { if (on || !vis || !calm()) return; on = ran = true; last = performance.now(); raf = requestAnimationFrame(frame); };
    const stop = () => { on = false; cancelAnimationFrame(raf); };
    rest();
    new ResizeObserver(() => { if (on) size(); else rest(); }).observe(cv);
    seen(cv, v => { vis = v; if (v) start(); else stop(); }, opt.threshold);
    mq.addEventListener('change', () => { if (calm()) start(); else { stop(); rest(); } });
    if (opt.pointer && fine.matches) {
      box.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); aim.x = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1); aim.y = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1); });
      box.addEventListener('pointerleave', () => { aim.x = aim.y = 0; });
    }
    return { start, stop, redraw: rest, get time() { return t; }, set time(v) { t = v; if (!on) rest(); } };
  }

  /* A world backdrop from layered artwork (.world > .world__layer, landing.css).
       data-depth="0…1"   how far the layer leans after the mouse: 0 the far sky, 1 the nearest layer
       data-drift="90"    seconds for one pass: the layer is a strip that repeats sideways and drifts without a seam
                          (negative: the other way); its image must tile horizontally
     Drift runs only while the world is on screen; under reduced motion and on weak devices everything stands still. */
  function layers(box, opt = {}) {
    const lean = opt.lean == null ? 14 : opt.lean, all = [...box.querySelectorAll('[data-depth], [data-drift]')];
    const drift = all.filter(el => +el.dataset.drift), deep = all.filter(el => +el.dataset.depth);
    drift.forEach(el => { const s = +el.dataset.drift; el.style.animation = `nu-drift ${Math.abs(s)}s linear infinite ${s < 0 ? 'reverse' : 'normal'} paused`; });
    let vis = false, raf = 0; const p = { x: 0, y: 0 }, aim = { x: 0, y: 0 };
    const run = () => drift.forEach(el => { el.style.animationPlayState = vis && calm() ? 'running' : 'paused'; });
    const place = () => deep.forEach(el => { const k = +el.dataset.depth * lean; el.style.translate = `${(-p.x * k).toFixed(2)}px ${(-p.y * k * .5).toFixed(2)}px`; });
    const frame = () => {
      p.x += (aim.x - p.x) * .06; p.y += (aim.y - p.y) * .06; place();
      raf = Math.abs(aim.x - p.x) + Math.abs(aim.y - p.y) > .002 && vis ? requestAnimationFrame(frame) : 0;
    };
    const wake = () => { if (!raf && vis && calm()) raf = requestAnimationFrame(frame); };
    if (lean && fine.matches) {
      box.addEventListener('pointermove', e => { const r = box.getBoundingClientRect(); aim.x = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1); aim.y = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1); wake(); });
      box.addEventListener('pointerleave', () => { aim.x = aim.y = 0; wake(); });
    }
    const off = seen(box, v => { vis = v; run(); });
    mq.addEventListener('change', () => { run(); if (!calm()) { p.x = p.y = aim.x = aim.y = 0; place(); } });
    return { stop() { off(); vis = false; run(); } };
  }

  /* Scroll stops for a concept that is a journey. The page scrolls as usual; a camera value glides from stop to stop.
       panels: the elements that are the stops, top to bottom
       onMove(pos): pos is 0 when the first panel is centred on screen, 1 at the second, 2.4 on the way from the third…
     Eased while the page moves; under reduced motion it jumps to the nearest stop. It never takes the scroll away. */
  function stops(panels, onMove, opt = {}) {
    panels = [...panels]; const k = opt.ease == null ? .12 : opt.ease;
    let pos = 0, aim = 0, raf = 0, first = true;
    const read = () => {
      const mid = innerHeight / 2, c = panels.map(el => { const r = el.getBoundingClientRect(); return r.top + r.height / 2; });
      let i = 0; while (i < c.length - 2 && c[i + 1] <= mid) i++;
      const span = c.length > 1 ? c[i + 1] - c[i] : 0;
      aim = span > 0 ? clamp(i + (mid - c[i]) / span, 0, c.length - 1) : 0;
      if (!calm()) aim = Math.round(aim);
    };
    const frame = () => {
      pos = !calm() || first || Math.abs(aim - pos) < .0015 ? aim : pos + (aim - pos) * k; first = false;
      onMove(pos); raf = pos === aim ? 0 : requestAnimationFrame(frame);
    };
    const wake = () => { read(); if (!raf) raf = requestAnimationFrame(frame); };
    addEventListener('scroll', wake, { passive: true }); addEventListener('resize', wake);
    read(); frame();
    return { get pos() { return pos; }, stop() { removeEventListener('scroll', wake); removeEventListener('resize', wake); cancelAnimationFrame(raf); } };
  }

  /* A product demo that replays while it is on screen: reset(), the steps one after another, a pause on the result, again.
       steps: [[msAfterThePreviousStep, fn], …]   reset: puts the demo back to its first state   pause: ms on the result
     Off screen, under reduced motion and on weak devices it shows the result (every step applied, nothing running). */
  function play(box, opt) {
    const steps = opt.steps || [], pause = opt.pause == null ? 3000 : opt.pause;
    let timers = [], vis = false;
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const result = () => { clear(); if (opt.reset) opt.reset(); steps.forEach(s => s[1]()); };
    const run = () => {
      clear(); if (opt.reset) opt.reset(); let at = 0;
      steps.forEach(([ms, fn]) => { at += ms; timers.push(setTimeout(fn, at)); });
      timers.push(setTimeout(run, at + pause));
    };
    const set = () => { if (vis && calm()) run(); else result(); };
    result();
    const off = seen(box, v => { vis = v; set(); }, opt.threshold == null ? .35 : opt.threshold);
    mq.addEventListener('change', set);
    return { replay: set, stop() { off(); vis = false; result(); } };
  }

  window.nuScene = { canvas, layers, stops, play, seen, rand, ease, out, lerp, clamp, calm, ink };
})();
