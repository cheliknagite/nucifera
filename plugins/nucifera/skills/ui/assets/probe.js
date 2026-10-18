/* nucifera probe: measures what code can measure, per screen. Loaded by frame.js with ?probe=1.
   Output: JSON in <pre id="ui-probe">, document.title = "UI_PROBE_DONE".
   FAIL = must fix before hand-over. WARN = look at it, fix unless intended. Mockup chrome (.chrome) is skipped. */
(async () => {
  // measure final states, not transitions in progress
  const still = document.createElement('style'); still.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}';
  document.head.append(still);
  await document.fonts.ready;
  await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  await new Promise(r => setTimeout(r, 300));

  const parse = c => { const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const lum = c => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const blend = (t, b) => ({ r: t.r * t.a + b.r * (1 - t.a), g: t.g * t.a + b.g * (1 - t.a), b: t.b * t.a + b.b * (1 - t.a), a: 1 });
  const hsl = c => { const r = c.r / 255, g = c.g / 255, b = c.b / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; return { s: mx === mn ? 0 : (l > .5 ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn)), l }; };
  const sel = el => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
  const txt = el => (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
  const effBg = el => {
    const stack = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (e.tagName === 'IMG' || cs.backgroundImage.includes('url(')) return { img: true };
      const c = parse(cs.backgroundColor); if (c && c.a > 0) { stack.push(c); if (c.a >= 1) break; }
    }
    let base = { r: 0, g: 0, b: 0, a: 1 }; for (let i = stack.length - 1; i >= 0; i--) base = blend(stack[i], base); return base;
  };
  const accentOf = el => { const d = document.createElement('i'); d.style.color = 'var(--accent)'; el.appendChild(d); const c = getComputedStyle(d).color; d.remove(); return c; };

  const scopes = [...document.querySelectorAll('.phone')];
  if (!scopes.length) scopes.push(document.body);
  const out = { theme: document.documentElement.dataset.theme || 'dark', screens: [] };

  for (const ph of scopes) {
    const fig = ph.closest('.screen');
    const R = ph.getBoundingClientRect();
    const res = { id: fig ? fig.dataset.screen : 'page', size: `${Math.round(R.width)}x${Math.round(R.height)}`, fail: [], warn: [], stats: {} };
    const F = m => res.fail.push(m), W = m => res.warn.push(m);
    const acc = accentOf(ph);
    let accentPlaces = 0, glass = 0, minContrast = 99, small = 0;
    const lang = (ph.closest('[lang]') || document.documentElement).lang || '';
    ph.querySelectorAll('*').forEach(el => {
      if (el.closest('.tg, .chrome')) return;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      const cs = getComputedStyle(el); if (cs.visibility === 'hidden') return;
      if (r.left < R.left - 0.5 || r.right > R.right + 0.5) { if (!el.closest('.chips')) F(`overflow: ${sel(el)} sticks out ${Math.round(Math.max(R.left - r.left, r.right - R.right))}px`); }
      if (el.childElementCount === 0 && el.scrollWidth > el.clientWidth + 1 && (cs.textOverflow === 'ellipsis' || cs.overflow === 'hidden')) W(`clipped text: ${sel(el)} «${txt(el)}»`);
      if (cs.boxShadow !== 'none') for (const part of cs.boxShadow.split(/,(?![^(]*\))/)) {
        const c = parse(part); const n = (part.replace(/rgba?\([^)]*\)/, '').match(/-?[\d.]+px/g) || []).map(parseFloat);
        if (c && !part.includes('inset')) { const h = hsl(c); if ((n[2] || 0) >= 15 && c.a >= .1 && h.s > .3 && h.l >= .2 && h.l <= .9) F(`coloured glow: ${sel(el)}`); }
      }
      const isControl = el.matches('button, a, input, select, textarea, [role="button"], [data-tap], .btn, .chip');
      if (isControl && cs.backgroundImage.includes('gradient')) F(`gradient on a control: ${sel(el)}`);
      if (cs.backdropFilter && cs.backdropFilter !== 'none') glass++;
      if (el.matches('[data-tap], button, a.btn, .btn') && r.height < 44) F(`touch target ${Math.round(r.height)}px < 44: ${sel(el)} «${txt(el)}»`);
      if (el.matches('.chip') && r.height < 32) W(`chip ${Math.round(r.height)}px is small: ${sel(el)}`);
      if (el.matches('input, textarea, select') && parseFloat(cs.fontSize) < 16) F(`input font ${cs.fontSize} < 16px (iOS zooms the page): ${sel(el)}`);
      if (cs.fontVariantNumeric.includes('tabular') && !el.closest('.price, .counter, .row__value, .row__note, .stat, .kv__total, svg')) W(`tabular digits outside prices/counters: ${sel(el)}`);
      const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      if (own) {
        const px = parseFloat(cs.fontSize), w = +cs.fontWeight;
        if (px < 12.5) { small++; W(`text ${px}px is below 13px: ${sel(el)} «${txt(el)}»`); }
        if (el.matches('h1, h2, h3') && w > 650) W(`heading weight ${w} > 600: ${sel(el)}`);
        if (el.matches('h1, h2, h3') && /^(uk|ru|be|bg)/.test(lang)) { const lh = parseFloat(cs.lineHeight) / px; if (lh < 1.12) F(`Cyrillic heading line-height ${lh.toFixed(2)} < 1.15: ${sel(el)}`); }
        const bg = effBg(el);
        if (!bg.img) {
          const fg = parse(cs.color); const k = ratio(blend(fg, bg), bg);
          const need = (px >= 24 || (px >= 18.66 && w >= 600)) ? 3 : 4.5;
          minContrast = Math.min(minContrast, +k.toFixed(2));
          if (k < need) F(`contrast ${k.toFixed(2)} < ${need}: ${sel(el)} «${txt(el)}»`);
        }
        if (cs.color === acc) accentPlaces++;
      }
      if (cs.backgroundColor === acc) accentPlaces++;
    });
    if (glass > 2) F(`glass on ${glass} elements, at most 2`);
    if (accentPlaces > 3) W(`accent colour in ${accentPlaces} places, aim for at most 3`);
    const fams = new Set([...ph.querySelectorAll('h1, h2, h3, p, span, a, button')].filter(e => !e.closest('.tg, .chrome')).map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim()));
    // document.fonts.check() says "yes" for fonts that were never declared, so compare rendered widths instead
    const ctx = document.createElement('canvas').getContext('2d');
    const width = font => { ctx.font = font; return ctx.measureText('Їжак щедрий її 0123 Glyph').width; };
    const missing = [...fams].filter(f => f && !/^(system-ui|-apple-system|sans-serif|serif|monospace)$/i.test(f)
      && width(`16px "${f}", monospace`) === width('16px monospace') && width(`16px "${f}", serif`) === width('16px serif'));
    if (missing.length) F(`font not loaded: ${missing.join(', ')}`);
    res.stats = { minContrast, accentPlaces, glass, fonts: [...fams] };
    out.screens.push(res);
  }
  const pre = document.createElement('pre'); pre.id = 'ui-probe'; pre.hidden = true; pre.textContent = JSON.stringify(out);
  document.body.append(pre); document.title = 'UI_PROBE_DONE';
})();
