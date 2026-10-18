/* nucifera mockup frame. Include at the end of a mockup page built from frame.html.
   It draws an optional status bar, top bar and bottom action from data attributes, and supports query parameters
   used by verify.mjs:
     ?theme=dark|light   colour theme            ?shot=<screen id>&w=360|390|430   one screen, phone size, no gallery
     ?list=1             screen ids into <pre id="ui-screens">      ?probe=1   run probe.js, result into <pre id="ui-probe"> */
(function () {
  const Q = new URLSearchParams(location.search);
  const root = document.documentElement;
  const theme = Q.get('theme') || root.dataset.theme || 'dark';
  root.dataset.theme = theme;
  if (!root.dataset.fx) root.dataset.fx = 'full';
  const SIZES = { 360: [360, 780], 390: [390, 844], 430: [430, 932] };

  const icon = {
    back: '<svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2 2 10l8 8"/></svg>',
    more: '<svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor"><circle cx="2" cy="2" r="1.6"/><circle cx="8" cy="2" r="1.6"/><circle cx="14" cy="2" r="1.6"/></svg>',
    bars: '<svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>',
    batt: '<svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor"/><path d="M23 4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".4"/></svg>'
  };
  const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  document.querySelectorAll('.screen').forEach(fig => {
    const phone = fig.querySelector('.phone');
    if (!phone || phone.dataset.built) return;
    phone.dataset.built = '1';
    const d = fig.dataset;
    const head = document.createElement('div');
    head.className = 'chrome chrome-head';
    let html = d.statusbar === 'false' ? '' : `<div class="chrome-status"><span>9:41</span><span class="chrome-status__icons">${icon.bars}${icon.batt}</span></div>`;
    if (d.barTitle || d.barLeft || d.barBack) {
      const left = d.barBack ? `${icon.back}&nbsp;${esc(d.barBack)}` : esc(d.barLeft || '');
      html += `<div class="chrome-nav"><span class="chrome-nav__l">${left}</span><span class="chrome-nav__t"><b>${esc(d.barTitle || '')}</b>${d.barSubtitle ? `<small>${esc(d.barSubtitle)}</small>` : ''}</span><span class="chrome-nav__r">${d.barMore === 'false' ? '' : icon.more}</span></div>`;
    }
    head.innerHTML = html;
    if (html) phone.prepend(head);
    if (d.action) {
      const bar = document.createElement('div');
      bar.className = 'chrome chrome-bar';
      bar.innerHTML = `<div class="chrome-btn" data-tap><span>${esc(d.action)}</span></div><div class="chrome-home"></div>`;
      phone.append(bar);
    }
  });

  if (Q.get('shot')) {
    document.body.classList.add('ui-shot');
    const keep = document.querySelector(`.screen[data-screen="${CSS.escape(Q.get('shot'))}"]`);
    document.querySelectorAll('.screen').forEach(s => { if (s !== keep) s.remove(); });
    const [w, h] = SIZES[Q.get('w')] || SIZES[390];
    if (keep) { keep.style.setProperty('--pw', w + 'px'); keep.style.setProperty('--ph', h + 'px'); }
  }
  if (Q.get('list')) {
    const pre = document.createElement('pre'); pre.id = 'ui-screens'; pre.hidden = true;
    pre.textContent = JSON.stringify([...document.querySelectorAll('.screen')].map(s => s.dataset.screen));
    document.body.append(pre);
  }
  if (Q.get('probe')) {
    const s = document.createElement('script');
    s.src = (document.currentScript && document.currentScript.src || 'frame.js').replace(/frame\.js(\?.*)?$/, 'probe.js');
    document.body.append(s);
  }
})();
