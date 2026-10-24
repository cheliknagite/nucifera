/* nucifera motion helpers: a plain script, no dependencies. Load it after the page (or with defer).
   Durations and curves are read from tokens.css, so reduced motion and a brand's tempo apply on their own.
   Every helper can be interrupted: a new call cancels the one still running. Rules: references/motion.md.

   window.nuMotion = { setTheme, menu, tooltips, dialog, sheet, toast, crossfade, swap, stagger, grow, collapse,
                       roll, shake, loading, reveal, hairline, ctaBar, haptic, onHaptic, ms,
                       moments: calm, once, morph, arrive, draw, success, sheen, demo, genie } */
(function () {
  const root = document.documentElement;
  const css = name => getComputedStyle(root).getPropertyValue(name).trim();
  const ms = name => { const v = css(name), n = parseFloat(v) || 0; return /ms$/.test(v) ? n : /s$/.test(v) ? n * 1000 : n; };
  const px = name => parseFloat(css(name)) || 0;
  const ease = name => css(name) || 'ease';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* moments play only with full motion on a capable device; otherwise they show their end state */
  const calm = () => !reduced() && root.dataset.perf !== 'low';
  const stop = el => el.getAnimations().forEach(a => a.cancel());
  const nextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  /* theme: switch without every element fading its colours */
  function setTheme(theme) {
    root.classList.add('nu-no-tx');
    root.dataset.theme = theme;
    nextFrame().then(() => root.classList.remove('nu-no-tx'));
  }

  /* haptics with fixed meanings: 'selection' (a choice changed), 'light' (a sheet or toggle settled),
     'success' | 'error' | 'warning' (the result of an action). Never on scroll, typing or every tap.
     The host platform plugs in through nuMotion.onHaptic = kind => { ... }. */
  function haptic(kind) {
    if (typeof api.onHaptic === 'function') { try { api.onHaptic(kind); } catch (e) { /* host without haptics */ } }
  }

  /* menu or popover (.pop): opens from its trigger, closes on outside tap, Escape, or choosing an item */
  function menu(trigger, pop) {
    const set = open => { pop.classList.toggle('open', open); trigger.setAttribute('aria-expanded', String(open)); };
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', e => { e.stopPropagation(); set(!pop.classList.contains('open')); });
    document.addEventListener('click', e => { if (!pop.contains(e.target)) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    pop.addEventListener('click', e => { if (e.target.closest('.menu__item')) set(false); });
    return { open: () => set(true), close: () => set(false) };
  }

  /* tooltips: [data-tip] triggers with a .tip inside. The first waits 400 ms; for 300 ms after one closes
     its neighbours open at once, without animation. Mouse and keyboard only. */
  let warmUntil = 0;
  function tooltips(scope) {
    (scope || document).querySelectorAll('[data-tip]').forEach(trigger => {
      const tip = trigger.querySelector('.tip'); if (!tip) return;
      let timer;
      const show = instant => { tip.classList.toggle('instant', instant); tip.classList.add('open'); };
      const hide = () => {
        clearTimeout(timer);
        if (tip.classList.contains('open')) warmUntil = performance.now() + 300;
        tip.classList.remove('open', 'instant');
      };
      trigger.addEventListener('pointerenter', e => {
        if (e.pointerType !== 'mouse') return;
        clearTimeout(timer);
        if (performance.now() < warmUntil) show(true); else timer = setTimeout(() => show(false), 400);
      });
      trigger.addEventListener('pointerleave', hide);
      trigger.addEventListener('focus', () => { if (trigger.matches(':focus-visible')) show(false); });
      trigger.addEventListener('blur', hide);
      trigger.addEventListener('click', hide);
    });
  }

  /* dialog (.dialog) with its .scrim: open, close, and a short nudge when an action is blocked */
  function dialog(el, scrim) {
    let opener = null;
    const close = () => {
      el.classList.remove('open'); if (scrim) scrim.classList.remove('open');
      if (opener) opener.focus({ preventScroll: true });
    };
    const open = () => {
      opener = document.activeElement;
      el.classList.add('open'); if (scrim) scrim.classList.add('open');
      const first = el.querySelector('button, [href], input, select, textarea');
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 0);
    };
    const nudge = () => {
      if (reduced()) return;
      el.animate([{ transform: 'scale(1)' }, { transform: 'scale(.98)' }, { transform: 'scale(1)' }], { duration: ms('--dur-exit'), easing: ease('--ease-out') });
    };
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && el.classList.contains('open')) close(); });
    if (scrim) scrim.addEventListener('click', () => { if (el.classList.contains('open')) close(); });
    return { open, close, nudge };
  }

  /* bottom sheet (.sheet with a .sheet__grab): rises with the spring; drag it down, and a fast or long drag closes it */
  function sheet(el, scrim, onClose) {
    const grab = el.querySelector('.sheet__grab') || el;
    let isOpen = false, h = 0;
    const place = (y, dur, curve) => {
      el.style.transition = dur ? `transform ${dur}ms ${curve}` : 'none';
      el.style.transform = `translateY(${y}px)`;
      if (scrim) {
        scrim.style.transition = dur ? `opacity ${dur}ms ${ease('--ease-out')}` : 'none';
        scrim.style.opacity = String(Math.max(0, Math.min(1, 1 - y / h)));
      }
    };
    const open = () => {
      stop(el); isOpen = true; el.classList.add('open'); if (scrim) scrim.classList.add('open');
      h = el.offsetHeight;
      if (reduced()) {
        el.style.transition = 'none'; el.style.transform = 'translateY(0)';
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms('--dur-sheet'), easing: ease('--ease-out') });
        if (scrim) scrim.style.opacity = '1';
        return;
      }
      place(h, 0); el.getBoundingClientRect();
      place(0, ms('--dur-sheet'), ease('--ease-spring'));
    };
    const finish = () => {
      if (isOpen) return;
      el.classList.remove('open');
      if (scrim) { scrim.classList.remove('open'); scrim.style.opacity = ''; scrim.style.transition = ''; }
      if (onClose) onClose();
    };
    const close = () => {
      if (!isOpen) return;
      isOpen = false;
      if (reduced()) {
        el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms('--dur-exit'), easing: ease('--ease-out'), fill: 'forwards' }).finished
          .then(() => { if (!isOpen) { el.style.transform = 'translateY(105%)'; stop(el); } finish(); }, () => {});
        if (scrim) { scrim.style.transition = `opacity ${ms('--dur-exit')}ms`; scrim.style.opacity = '0'; }
        return;
      }
      place(h * 1.05, ms('--dur-enter'), ease('--ease-out'));
      setTimeout(finish, ms('--dur-enter') + 20);
    };
    let y0 = 0, dy = 0, lastY = 0, lastT = 0, v = 0, dragging = false;
    grab.addEventListener('pointerdown', e => {
      if (!isOpen) return;
      dragging = true; y0 = lastY = e.clientY; lastT = e.timeStamp; dy = 0; v = 0;
      grab.setPointerCapture(e.pointerId);
    });
    grab.addEventListener('pointermove', e => {
      if (!dragging) return;
      dy = e.clientY - y0; if (dy < 0) dy *= 0.2;
      const dt = e.timeStamp - lastT; if (dt > 0) v = (e.clientY - lastY) / dt;
      lastY = e.clientY; lastT = e.timeStamp;
      place(dy, 0);
    });
    const release = () => {
      if (!dragging) return;
      dragging = false;
      if (v > 0.11 || dy > h * 0.35) close();
      else { place(0, ms('--dur-sheet'), ease('--ease-spring')); if (Math.abs(dy) > 6) haptic('light'); }
    };
    grab.addEventListener('pointerup', release);
    grab.addEventListener('pointercancel', release);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    if (scrim) scrim.addEventListener('click', close);
    return { open, close };
  }

  /* toasts in a .toasts container: newest in front, at most three, each leaves after 4 s (waits while hovered) */
  const stacks = new WeakMap();
  function toast(container, html, timeout) {
    timeout = timeout || 4000;
    let list = stacks.get(container);
    if (!list) {
      list = [];
      stacks.set(container, list);
      container.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') list.forEach(t => clearTimeout(t.timer)); });
      container.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') list.forEach((t, i) => arm(t, 2000 + i * 300)); });
    }
    const layout = () => list.forEach((t, i) => t.el.style.setProperty('--i', i));
    function dismiss(t) {
      if (t.gone) return; t.gone = true; clearTimeout(t.timer);
      t.el.classList.add('out');
      setTimeout(() => { t.el.remove(); const k = list.indexOf(t); if (k >= 0) list.splice(k, 1); layout(); }, ms('--dur-exit') + 30);
    }
    function arm(t, wait) { clearTimeout(t.timer); t.timer = setTimeout(() => dismiss(t), wait); }
    const el = document.createElement('div');
    el.className = 'toast in'; el.setAttribute('role', 'status'); el.innerHTML = html;
    el.style.setProperty('--i', 0);
    const t = { el };
    list.unshift(t); container.append(el); layout();
    list.slice(3).forEach(dismiss);
    el.getBoundingClientRect(); el.classList.remove('in');
    arm(t, timeout);
    return { dismiss: () => dismiss(t) };
  }

  /* swap content in place (a tab panel): change it, then fade it in */
  function crossfade(panel, update) {
    stop(panel); update();
    panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms('--dur-exit'), easing: ease('--ease-out') });
  }

  /* screen change with direction: dir 1 deeper (comes from the right), -1 back, 0 a sibling view (crossfade).
     Both screens are stacked in one positioned parent. A late finish never hides the screen now on top. */
  const onTop = new WeakMap();
  function swap(from, to, dir) {
    dir = dir || 0;
    const parent = to.parentNode; onTop.set(parent, to);
    stop(from); stop(to);
    to.hidden = false; to.style.zIndex = 2; from.style.zIndex = 1;
    from.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms('--dur-exit') * 0.75, easing: ease('--ease-out'), fill: 'forwards' }).finished
      .then(a => { if (onTop.get(parent) !== from) from.hidden = true; a.cancel(); }, () => {});
    to.animate([{ opacity: 0, transform: `translateX(${dir * px('--move-md')}px)` }, { opacity: 1, transform: 'none' }],
      { duration: ms('--dur-enter'), easing: ease('--ease-out') });
  }

  /* first show of a list: up to five rows rise one after another; the rest are there at once */
  function stagger(items) {
    Array.from(items).slice(0, 5).forEach((el, i) => el.animate(
      [{ opacity: 0, transform: `translateY(${px('--move-sm')}px)` }, { opacity: 1, transform: 'none' }],
      { duration: ms('--dur-enter'), delay: i * ms('--stagger'), easing: ease('--ease-out'), fill: 'backwards' }));
  }

  /* a new row (.grow > .grow__in) grows in; collapse removes one, and the rows around it follow */
  function grow(item) { item.classList.add('gone'); item.getBoundingClientRect(); item.classList.remove('gone'); }
  function collapse(item, done) {
    item.classList.add('gone');
    setTimeout(() => { item.remove(); if (done) done(); }, ms('--dur-enter') + 30);
  }

  /* number roll on a .roll element: only the changed characters move, up when the value grows, down when it falls.
     Call it when the action ends (a slider's change, not its input), never while the user is still dragging. */
  function roll(el, text, dir) {
    const from = el.dataset.v || el.textContent.trim();
    el.dataset.v = text; el.textContent = '';
    el.setAttribute('aria-label', text);
    if (!from || from.length !== text.length) {
      const s = document.createElement('span'); s.setAttribute('aria-hidden', 'true'); s.textContent = text; el.append(s);
      if (from) s.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms('--dur-exit'), easing: ease('--ease-out') });
      return;
    }
    const y = 40 * (parseFloat(css('--travel')) || 0);
    for (let i = 0; i < text.length; i++) {
      const slot = document.createElement('span'); slot.className = 'digit'; slot.setAttribute('aria-hidden', 'true');
      const cur = document.createElement('span'); cur.textContent = text[i]; slot.append(cur);
      if (from[i] !== text[i]) {
        const ghost = document.createElement('span'); ghost.className = 'ghost'; ghost.textContent = from[i]; slot.append(ghost);
        cur.animate([{ transform: `translateY(${dir * y}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: ms('--dur-roll'), easing: ease('--ease-out') });
        ghost.animate([{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * y}%)`, opacity: 0 }], { duration: ms('--dur-roll') * 0.6, easing: ease('--ease-out'), fill: 'forwards' })
          .finished.then(() => ghost.remove(), () => {});
      }
      el.append(slot);
    }
  }

  /* error: a short shake, 4 px three times; skipped under reduced motion (the message and haptic still come) */
  function shake(el) {
    if (reduced()) return;
    stop(el);
    el.animate([{ transform: 'none' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' }, { transform: 'translateX(-2px)' }, { transform: 'none' }], { duration: ms('--dur-exit') * 2, easing: 'ease-out' });
  }

  /* waiting: nothing for the first 200 ms; then show() (a skeleton) for at least 400 ms, so nothing flickers.
     hide(wasShown) runs when the work is done; crossfade the result in when wasShown is true. */
  function loading(work, show, hide) {
    let shownAt = 0;
    const timer = setTimeout(() => { shownAt = performance.now(); show(); }, 200);
    const done = () => {
      clearTimeout(timer);
      if (!shownAt) { hide(false); return; }
      setTimeout(() => hide(true), Math.max(0, 400 - (performance.now() - shownAt)));
    };
    return Promise.resolve(work).then(r => { done(); return r; }, e => { done(); throw e; });
  }

  /* landing pages only: blocks below the first screen fade up once as they enter. Content stays visible without
     this script, and blocks already on screen are never hidden. Never use it on app screens. */
  function reveal(selector, scroller) {
    if (reduced() || !('IntersectionObserver' in window)) return;
    const box = scroller ? scroller.getBoundingClientRect() : { bottom: innerHeight };
    const blocks = Array.from(document.querySelectorAll(selector || '.reveal'))
      .filter(b => b.getBoundingClientRect().top > box.bottom - 20);
    blocks.forEach(b => { b.style.opacity = '0'; });
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const b = en.target; io.unobserve(b); b.style.opacity = '';
      b.animate([{ opacity: 0, transform: `translateY(${px('--move-md')}px)` }, { opacity: 1, transform: 'none' }], { duration: ms('--dur-hero'), easing: ease('--ease-out') });
    }), { root: scroller || null, threshold: 0.2 });
    blocks.forEach(b => io.observe(b));
  }

  /* a sticky header (.glassbar--quiet) gets its hairline once the page has scrolled */
  function hairline(bar, scroller) {
    const target = scroller || window;
    const top = () => (scroller ? scroller.scrollTop : scrollY);
    const on = () => bar.classList.toggle('scrolled', top() > 4);
    target.addEventListener('scroll', on, { passive: true }); on();
  }

  /* landing pages on phones: show the .cta-bar while neither the hero's main button nor the final call is on screen */
  function ctaBar(bar, heroAction, finalBlock) {
    if (!('IntersectionObserver' in window)) return;
    const seen = new Map();
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => seen.set(en.target, en.isIntersecting));
      bar.classList.toggle('show', !seen.get(heroAction) && !(finalBlock && seen.get(finalBlock)));
    });
    io.observe(heroAction); if (finalBlock) io.observe(finalBlock);
    return { stop: () => io.disconnect() };
  }

  /* ---- moments (references/motion.md, section 5): rare, once, on an event, at most one per screen.
     Under reduced motion or on a weak device each shows its end state. ---- */

  /* run play() once per session for this key (the signature's first show); later calls do nothing */
  const played = new Set();
  function once(key, play) {
    const k = 'nu-once:' + key;
    try { if (sessionStorage.getItem(k)) return false; sessionStorage.setItem(k, '1'); }
    catch (e) { if (played.has(k)) return false; played.add(k); }
    play(); return true;
  }

  /* shared element: `from` (a thumbnail on screen now) travels into `to` (the detail's hero) while update() changes the screen.
     opts.back for the way back (a quarter faster); opts.screen fades in where View Transitions are missing (default: to).
     Only the latest call may change the screen, so fast taps never leave two screens or none. */
  let morphGen = 0, morphPair = null;
  function morph(from, to, update, opts) {
    opts = opts || {};
    const my = ++morphGen; let done = false, vt = null;
    if (morphPair) morphPair.forEach(el => { el.style.viewTransitionName = ''; });
    morphPair = [from, to];
    const run = () => {
      if (done || my !== morphGen) return;
      done = true; update();
      if (vt) { from.style.viewTransitionName = ''; to.style.viewTransitionName = 'nu-morph'; }
    };
    if (!document.startViewTransition || !calm() || document.visibilityState !== 'visible') {
      run();
      (opts.screen || to).animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms('--dur-exit'), easing: ease('--ease-out') });
      return;
    }
    root.classList.toggle('nu-back', !!opts.back);
    from.style.viewTransitionName = 'nu-morph'; to.style.viewTransitionName = '';
    vt = document.startViewTransition(run);
    const settle = () => {
      run();
      if (my === morphGen) { from.style.viewTransitionName = ''; to.style.viewTransitionName = ''; root.classList.remove('nu-back'); }
    };
    vt.ready.catch(run);   /* the browser skipped it: the screen still changes */
    vt.finished.catch(() => {}).finally(settle);
    setTimeout(settle, ms('--dur-moment') + 250);   /* never leave the user on the old screen, even when no frame is drawn */
  }

  /* the signature element slides into its place on its first show; dx, dy: where it starts, in px from its place.
     Position the element with left/margin or the translate property, not transform. */
  function arrive(el, dx, dy) {
    stop(el); if (!calm()) return;
    el.animate([{ transform: `translate(${dx || 0}px, ${dy || 0}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
      { duration: ms('--dur-signature'), easing: ease('--ease-out') });
  }

  /* a line drawing itself once: an SVG path or polyline with pathLength="1" */
  function draw(path, delay) {
    stop(path); if (!calm()) return;
    path.style.strokeDasharray = '1';
    path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: ms('--dur-draw'), delay: delay || 0, easing: ease('--ease-out'), fill: 'backwards' })
      .finished.then(() => { path.style.strokeDasharray = ''; }, () => {});
  }

  /* success, after the server confirmed: show the result with a .check-draw SVG in it, then call this:
     the block settles from 96 % and the success haptic fires. Once per flow, no confetti. */
  function success(block) {
    if (calm()) { stop(block); block.animate([{ transform: 'scale(.96)' }, { transform: 'none' }], { duration: ms('--dur-moment') * 2 / 3, easing: ease('--ease-out') }); }
    haptic('success');
  }

  /* the main button (.btn--sheen) just became available: one pass of light */
  function sheen(btn) {
    btn.classList.remove('shine');
    if (!calm()) return;
    void btn.offsetWidth; btn.classList.add('shine');
  }

  /* landing pages only: the live product window (.tempo-calm). Call it before the first paint. On screen at load (the hero),
     it fades in after the hero lines; lower on the page, when a quarter of it comes into view. Then it runs steps (functions:
     a row grows in, a price rolls, a note fades in) 600 ms apart, once, and all stays still.
     Under reduced motion or on a weak device the steps run at once. Calling it again replays it. */
  const demos = new WeakMap();
  function demo(win, steps, delay) {
    const prev = demos.get(win);
    if (prev) { prev.timers.forEach(clearTimeout); if (prev.io) prev.io.disconnect(); }
    const st = { timers: [], io: null }; demos.set(win, st);
    if (!calm() || !('IntersectionObserver' in window)) { win.style.opacity = ''; steps.forEach(s => s()); return; }
    const start = wait => {
      win.style.opacity = '';
      win.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms('--dur-hero'), delay: wait, easing: ease('--ease-out'), fill: 'backwards' });
      steps.forEach((s, i) => st.timers.push(setTimeout(s, wait + ms('--dur-hero') + i * 600)));
    };
    const box = win.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) { start(delay == null ? ms('--dur-hero') + 3 * ms('--stagger-hero') : delay); return; }
    win.style.opacity = '0';   /* below the fold: nobody sees it hidden */
    st.io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      st.io.disconnect(); start(delay || 0);
    }, { threshold: 0.25 });
    st.io.observe(win);
  }

  /* websites only: the window genie, like the Mac. A window pours out of the element that opened it and back into it on close:
     a link, a video cover, a list row, a card, or a .dock__slot for a window the user minimizes into a dock. open true pours it
     out (the window already stands in its final place and stays hidden during the pour); false pours it in and hides it
     (visibility, inert). The funnel runs along the axis where the source is farther from the window's centre, mirrored for a
     source above or to the left; a source that overlaps the window gets its mouth at the window's near edge. The window stays
     one body: thin strips across the flow all travel the same distance, and each strip's width and offset come from where it is
     in the funnel at that moment; first the funnel bends, then the body slides. Call it before you lock the page's scroll (a
     vanishing scrollbar shifts the source). On close, focus that was inside the window returns to the source, and a video keeps
     the frame it stopped on. Below 641px, inside a mini app, under reduced motion, on a weak device or without a visible source
     it fades. The window and the source should share a parent without a transform in between (the strips copy its styles). */
  const genies = new WeakMap();
  function genie(win, source, open) {
    if (genies.has(win)) return genies.get(win);
    const show = on => { win.style.visibility = on ? '' : 'hidden'; win.toggleAttribute('inert', !on); };
    const wait = (anims, t) => Promise.race([Promise.all(anims.map(x => x.finished.catch(() => {}))), new Promise(r => setTimeout(r, t + 250))]);
    const slot = source && source.classList && source.classList.contains('dock__slot') ? source : null;   /* a dock slot shows while it holds the window */
    const b = source && source.getClientRects().length ? source.getBoundingClientRect() : null;           /* measured now, before any scroll lock */
    const refocus = !open && win.contains(document.activeElement);
    if (!open) win.querySelectorAll('video').forEach(v => {   /* the strips are copies: keep the frame the video stopped on */
      if (v.readyState < 2 || !v.videoWidth) return;
      try {
        const c = document.createElement('canvas'), k = Math.min(1, 640 / Math.max(v.videoWidth, v.videoHeight));
        c.width = Math.round(v.videoWidth * k); c.height = Math.round(v.videoHeight * k);
        c.getContext('2d').drawImage(v, 0, 0, c.width, c.height); v.poster = c.toDataURL('image/jpeg', .8);
      } catch (e) { /* a cross-origin video keeps its own poster */ }
    });
    const run = async () => {
      if (!calm() || api.miniApp || innerWidth < 641 || !b || !b.width || !b.height) {
        if (open) { if (slot) slot.classList.remove('on'); show(true); await wait([win.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms('--dur-enter'), easing: ease('--ease-out') })], ms('--dur-enter')); }
        else { await wait([win.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms('--dur-exit'), easing: ease('--ease-out') })], ms('--dur-exit')); show(false); if (slot) slot.classList.add('on'); }
        return;
      }
      const a = win.getBoundingClientRect(), W = a.width, H = a.height;
      const dx = b.left + b.width / 2 - (a.left + W / 2), dy = b.top + b.height / 2 - (a.top + H / 2);
      const vert = Math.abs(dy) / H >= Math.abs(dx) / W;                 /* which way the funnel runs */
      const sgn = vert ? (dy >= 0 ? 1 : -1) : (dx >= 0 ? 1 : -1);         /* towards the source */
      const L = vert ? H : W, C = vert ? W : H;                            /* length along the flow, size across it */
      const near = vert ? (sgn > 0 ? b.top - a.top : a.bottom - b.bottom) : (sgn > 0 ? b.left - a.left : a.right - b.right);
      const ud = Math.max(near, L);                                        /* the mouth: at the source, never inside the window */
      const cs = Math.max(10, Math.min(vert ? b.width : b.height, C / 2)), ct = vert ? dx : dy;
      const N = 48, K = 30, d = ms('--dur-genie') * (open ? .76 : 1), sl = L / N;
      const smooth = u => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
      const layer = document.createElement('div'); layer.className = 'nu-genie'; layer.setAttribute('aria-hidden', 'true');
      layer.style.cssText = `left:${a.left}px;top:${a.top}px;width:${W}px;height:${H}px`;
      const strips = [];
      for (let i = 0; i < N; i++) {
        const c = win.cloneNode(true); c.removeAttribute('id'); c.removeAttribute('inert'); c.querySelectorAll('[id]').forEach(x => x.removeAttribute('id'));
        c.style.cssText += `;position:absolute;left:0;top:0;right:auto;bottom:auto;width:${W}px;height:${H}px;margin:0;translate:none;transition:none;visibility:visible`;
        const ui = i * sl + sl / 2;                                        /* the strip's place, counted from the far edge */
        const p0 = sgn > 0 ? i * sl : L - (i + 1) * sl;                    /* where it starts inside the window */
        const lo = Math.max(0, p0 - .5), hi = Math.max(0, L - p0 - sl - .5);
        c.style.clipPath = vert ? `inset(${lo}px 0 ${hi}px 0)` : `inset(0 ${hi}px 0 ${lo}px)`;
        c.style.transformOrigin = vert ? `50% ${p0 + sl / 2}px` : `${p0 + sl / 2}px 50%`;
        const frames = [];
        for (let k = 0; k <= K; k++) {
          const t = k / K, bend = smooth(Math.min(1, t / .38));
          const D = t <= .3 ? 0 : Math.pow((t - .3) / .7, 1.7) * (ud + L);   /* every strip slides the same distance, faster near the source */
          const u = ui + D, f = smooth(u / ud), inside = u > ud;
          const w = inside ? cs : C - bend * (C - cs) * f, cross = inside ? ct : bend * ct * f, flow = sgn * (inside ? ud - ui : D);
          const sa = inside ? .05 : 1, sc = w / C;
          frames.push({ offset: t, opacity: inside ? 0 : 1,
            transform: vert ? `translate(${cross}px, ${flow}px) scale(${sc}, ${sa})` : `translate(${flow}px, ${cross}px) scale(${sa}, ${sc})` });
        }
        layer.append(c); strips.push([c, frames]);
      }
      win.parentNode.append(layer); show(false);
      if (open && slot) slot.classList.remove('on');
      const played = strips.map(([c, f]) => c.animate(f, { duration: d, easing: 'linear', direction: open ? 'reverse' : 'normal', fill: 'both' }));
      const land = !open && slot ? setTimeout(() => { slot.classList.add('on'); slot.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: ms('--dur-exit'), easing: ease('--ease-out') }); }, d * .8) : 0;
      await wait(played, d);
      clearTimeout(land); if (!open && slot) slot.classList.add('on');
      layer.remove(); if (open) show(true);
    };
    const p = run().then(() => { if (refocus && source && source.isConnected && source.getClientRects().length) source.focus({ preventScroll: true }); })
      .finally(() => genies.delete(win));
    genies.set(win, p);
    return p;
  }

  const api = { setTheme, menu, tooltips, dialog, sheet, toast, crossfade, swap, stagger, grow, collapse,
    roll, shake, loading, reveal, hairline, ctaBar, haptic, onHaptic: null, ms,
    calm, once, morph, arrive, draw, success, sheen, demo, genie, miniApp: false };
  window.nuMotion = api;
})();
