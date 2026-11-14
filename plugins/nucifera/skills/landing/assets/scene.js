/* nucifera: scenes and moments for landing pages (references/world.md, references/parts.md). No dependencies.
   window.nuScene = { canvas, backdrop, layers, stops, play,          scenes: they live all the time
                      words, count, each, chart, assemble, tied, spot,  moments: once, as a block comes into view
                      seen, rand, ease, out, lerp, clamp, calm, ink }

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

  /* A backdrop about the product, drawn in code and standing behind a stretch of the page (.backdrop, landing.css).
     box: the .backdrop element that wraps the first screen (and what follows it, while the backdrop should stay).
       draw(ctx, t, w, h, env)  as in canvas, plus env.u: how far the box has scrolled, 0 to 1, so the backdrop opens up
                                as the page moves; env.calm(el, pad, alpha): lays a soft patch of the canvas colour under
                                a block of text, so words never sit on detail
     Two kinds were liked in review: a simple world (a place seen from the ground) and a plan of the product's world
     in thin lines. assets/backdrops.js holds one of each. */
  function backdrop(box, opt) {
    let sc = box.querySelector(':scope > .backdrop__scene');
    if (!sc) { sc = document.createElement('div'); sc.className = 'backdrop__scene scene'; sc.setAttribute('aria-hidden', 'true'); box.prepend(sc); }
    const hex = ink(box, '--bg-0').replace('#', ''), n = parseInt(hex.length === 3 ? hex.replace(/./g, '$&$&') : hex, 16);
    const rgb = Number.isNaN(n) ? '7,6,11' : `${n >> 16 & 255},${n >> 8 & 255},${n & 255}`, env = { u: 0, calm: null };
    const api = canvas(sc, { still: opt.still == null ? 3 : opt.still, from: opt.from, draw(ctx, t, w, h) {
      const r = box.getBoundingClientRect(); env.u = clamp(-r.top / Math.max(1, r.height - h));
      env.calm = (el, pad = 40, a = .8) => {
        const b = el.getBoundingClientRect(); if (b.bottom < -pad || b.top > h + pad || !b.width) return;
        const rx = b.width / 2 + pad, ry = b.height / 2 + pad;
        ctx.save(); ctx.translate(b.left + b.width / 2, b.top + b.height / 2); ctx.scale(1, ry / rx);
        const g = ctx.createRadialGradient(0, 0, rx * .62, 0, 0, rx); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, 6.3); ctx.fill(); ctx.restore();
      };
      opt.draw(ctx, t, w, h, env);
    } });
    let raf = 0;   /* with motion reduced nothing animates, yet the picture still has to follow the scroll */
    addEventListener('scroll', () => { if (!calm() && !raf) raf = requestAnimationFrame(() => { raf = 0; api.redraw(); }); }, { passive: true });
    return api;
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

  /* ---------- landing moments. Stronger than an app screen allows, so they stay on landings. Each plays once, when its
     block comes into view; a block already on screen at load plays at once. Nothing is hidden without this script,
     and under reduced motion or on a weak device every block simply stands in its final state. ---------- */
  const OUT = 'cubic-bezier(.23, 1, .32, 1)', MOVE = 'cubic-bezier(.77, 0, .175, 1)';
  const below = el => el.getBoundingClientRect().top > innerHeight - 20;
  const enter = (el, cb, threshold = .3) => { const off = seen(el, v => { if (v) { off(); cb(); } }, threshold); };

  /* The words of a heading rise out of their own line, one after another. Screen readers keep the whole sentence. */
  function words(el, opt = {}) {
    if (!calm() || el.dataset.nuWords) return;
    el.dataset.nuWords = '1'; el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
    const texts = [], tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let node;
    while ((node = tw.nextNode())) if (node.nodeValue.trim()) texts.push(node);
    texts.forEach(n => {
      const f = document.createDocumentFragment();
      n.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part.trim()) { f.append(part); return; }
        const w = document.createElement('span'), i = document.createElement('i'); w.className = 'nu-word'; w.setAttribute('aria-hidden', 'true'); i.textContent = part; w.append(i); f.append(w);
      });
      n.replaceWith(f);
    });
    const list = [...el.querySelectorAll('.nu-word > i')], wait = below(el);
    if (wait) list.forEach(w => { w.style.transform = 'translateY(108%)'; });
    const run = () => list.forEach((w, i) => { w.style.transform = ''; w.animate([{ transform: 'translateY(108%)' }, { transform: 'none' }], { duration: 760, delay: (opt.delay || 0) + i * 60, easing: OUT, fill: 'backwards' }); });
    if (wait) enter(el, run); else run();
  }

  /* The figure in el counts up to its value and settles: "147", "$27,400", "30 years". Give el tabular figures. */
  function count(el, opt = {}) {
    const text = el.textContent, m = text.match(/\d(?:[\d,\u00a0 ]*\d)?/);
    if (!m || !calm()) return;
    const to = parseInt(m[0].replace(/\D/g, ''), 10), sep = (m[0].match(/[,\u00a0 ]/) || [''])[0], dur = opt.duration || 1400;
    const show = n => { el.textContent = text.replace(m[0], sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n)); };
    const run = () => { const t0 = performance.now(), step = now => { const u = clamp((now - t0) / dur); show(Math.round(to * (1 - Math.pow(1 - u, 4)))); if (u < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); };
    if (below(el)) { show(0); enter(el, run, .6); } else run();
  }

  /* The children of box arrive one after another: tiles, cards, steps. opt.gap: ms between them (80). */
  function each(box, opt = {}) {
    const kids = [...box.children], gap = opt.gap == null ? 80 : opt.gap;
    if (!calm() || !below(box)) return;
    kids.forEach(k => { k.style.opacity = '0'; });
    enter(box, () => kids.forEach((k, i) => { k.style.opacity = ''; k.animate([{ opacity: 0, transform: 'translateY(18px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: i * gap, easing: OUT, fill: 'backwards' }); }), .2);
  }

  /* An SVG chart tells its point in order: [data-draw="line"] draws itself, [data-draw="fill"] comes up under it,
     [data-draw="mark"] lands last, one after another. */
  function chart(svg) {
    if (!calm() || !below(svg)) return;
    const q = k => [...svg.querySelectorAll('[data-draw="' + k + '"]')], lines = q('line'), fills = q('fill'), marks = q('mark');
    lines.forEach(l => { l.setAttribute('pathLength', '1'); l.style.strokeDasharray = '1'; l.style.strokeDashoffset = '1'; });
    fills.concat(marks).forEach(e => { e.style.opacity = '0'; });
    const after = lines.length ? 1150 : 0;
    enter(svg, () => {
      lines.forEach(l => { l.style.strokeDashoffset = ''; l.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1100, delay: 200, easing: MOVE, fill: 'backwards' }); });
      fills.forEach(e => { e.style.opacity = ''; e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: after ? 1000 : 0, easing: 'ease', fill: 'backwards' }); });
      marks.forEach((e, i) => { e.style.opacity = ''; e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'center';
        e.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: after + 200 + i * Math.min(60, 900 / marks.length), easing: OUT, fill: 'backwards' }); });
    }, .4);
  }

  /* Tied to the scroll: fn(u), where u is 0 as el enters at the bottom of the window and 1 once it has risen to the
     upper third. The page scrolls as usual. Under reduced motion fn(1) once. */
  const ties = []; let tieRaf = 0;
  const tieTick = () => { tieRaf = 0; ties.forEach(([el, fn]) => { const r = el.getBoundingClientRect(); fn(calm() ? clamp((innerHeight * .96 - r.top) / (innerHeight * .62)) : 1); }); };
  function tied(el, fn) {
    if (!ties.length) { addEventListener('scroll', () => { if (!tieRaf) tieRaf = requestAnimationFrame(tieTick); }, { passive: true }); addEventListener('resize', tieTick); mq.addEventListener('change', tieTick); }
    ties.push([el, fn]); tieTick();
  }
  /* The children of box come together as the page scrolls it into view: an object assembling from its parts. */
  function assemble(box) {
    const kids = [...box.children], b = box.getBoundingClientRect();
    const from = kids.map(k => { const r = k.getBoundingClientRect(), dx = (r.left + r.width / 2 - b.left - b.width / 2) / (b.width / 2 || 1), dy = (r.top + r.height / 2 - b.top) / (b.height || 1); return [dx * 46, 30 + dy * 34]; });
    tied(box, u => kids.forEach((k, i) => {
      const left = 1 - out(clamp(u * 1.5 - i * .09));
      k.style.transform = left ? `translate(${(from[i][0] * left).toFixed(1)}px, ${(from[i][1] * left).toFixed(1)}px) scale(${(1 - .08 * left).toFixed(3)})` : '';
      k.style.opacity = left ? (1 - .85 * left).toFixed(2) : '';
    }));
  }

  /* The light under the pointer for .spot surfaces (landing.css). One listener for the page; a mouse only. */
  function spot(scope = document) {
    if (!fine.matches) return;
    scope.addEventListener('pointermove', e => { const el = e.target.closest && e.target.closest('.spot'); if (!el) return;
      const r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); }, { passive: true });
  }

  window.nuScene = { canvas, backdrop, layers, stops, play, words, count, each, chart, assemble, tied, spot, seen, rand, ease, out, lerp, clamp, calm, ink };
})();
