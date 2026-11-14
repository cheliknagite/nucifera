/* nucifera landing starter: the two backdrops of its invented product, a garden planner. Examples of the two kinds of
   backdrop that are about the product (references/world.md, section 3):
     nightGarden   a simple world: the garden at night, seen from the ground
     gardenPlan    a plan of the product's world: the plot from above, in thin lines
   Keep the kind, redraw the subject: a real project draws its own world and its own plan, never these.
   window.nuBackdrops = { nightGarden, gardenPlan }; each returns a draw(ctx, t, w, h, env) for nuScene.backdrop. */
(() => {
  const { rand, lerp, ease } = nuScene;
  const LEAF = '143,214,106', INK = '245,244,250', FONT = 'Geist, system-ui, sans-serif';

  /* The garden at night: a sky with slow stars, far hills, a treeline, a greenhouse with a little warm light, bed rows
     running to the horizon, frost on the ground. horizon(): the y of the horizon on screen, so the hook can stand on the ground. */
  function nightGarden(opt) {
    const r = rand(11);
    const stars = Array.from({ length: 150 }, () => [r(), r(), .8 + r() * .9, r() * 6.28, .3 + r() * .7]);
    const trees = Array.from({ length: 46 }, (_, i) => [i / 45 + (r() - .5) * .02, .5 + r() * .9, r() > .72]);
    const frost = Array.from({ length: 26 }, () => [r(), r(), r() * 6.28]);
    const hill = x => Math.sin(x * .0032 + 1.2) * .5 + Math.sin(x * .0074 + 2) * .3 + Math.sin(x * .0163 + .7) * .2;
    return (ctx, t, W, H, env) => {
      const hz = Math.min(H * .9, Math.max(H * .3, opt.horizon() - env.u * H * .2));
      const sky = ctx.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#080b14'); sky.addColorStop(.6, '#0c1420'); sky.addColorStop(1, '#122019');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, hz);
      stars.forEach(([x, y, size, phase, bright]) => { ctx.fillStyle = `rgba(214,226,255,${(bright * (.35 + .3 * Math.sin(t * .5 + phase))).toFixed(2)})`; ctx.fillRect(Math.round(x * W), Math.round(y * hz * .92 - env.u * 30), size, size); });
      ctx.fillStyle = '#0d1a17'; ctx.beginPath(); ctx.moveTo(0, hz); for (let x = 0; x <= W; x += 8) ctx.lineTo(x, hz - 46 - hill(x) * 30); ctx.lineTo(W, hz); ctx.fill();
      ctx.fillStyle = '#0a1512'; trees.forEach(([x, k, tall]) => { const th = (tall ? 62 : 30) * k; ctx.beginPath(); ctx.ellipse(x * W, hz - th * .5 - 4, tall ? 9 : 22 * k, th * .62, 0, 0, 6.3); ctx.fill(); });
      const ground = ctx.createLinearGradient(0, hz, 0, H); ground.addColorStop(0, '#0b1511'); ground.addColorStop(1, '#070a09'); ctx.fillStyle = ground; ctx.fillRect(0, hz - 4, W, H - hz + 4);
      ctx.lineWidth = 1; for (let i = -14; i <= 14; i++) { ctx.strokeStyle = `rgba(${LEAF},${i % 2 ? .05 : .085})`; ctx.beginPath(); ctx.moveTo(W * .5 + i * 14, hz); ctx.lineTo(W * .5 + i * W * .2, H + 40); ctx.stroke(); }
      const gx = W * .8, gw = 150, gh = 46;
      ctx.fillStyle = '#0b1613'; ctx.beginPath(); ctx.moveTo(gx - gw / 2, hz); ctx.lineTo(gx - gw / 2, hz - gh); ctx.lineTo(gx, hz - gh - 20); ctx.lineTo(gx + gw / 2, hz - gh); ctx.lineTo(gx + gw / 2, hz); ctx.fill();
      for (let k = 0; k < 9; k++) { ctx.fillStyle = `rgba(255,214,150,${(.07 + .03 * Math.sin(t * .4 + k)).toFixed(3)})`; ctx.fillRect(gx - gw / 2 + 9 + k * 15, hz - gh + 10, 9, gh - 18); }
      frost.forEach(([x, y, phase]) => { const a = .25 + .3 * Math.sin(t * .8 + phase); if (a <= 0) return; const fx = x * W, fy = hz + 10 + y * (H - hz);
        ctx.strokeStyle = `rgba(190,220,255,${(a * .6).toFixed(2)})`; ctx.beginPath(); ctx.moveTo(fx - 2.5, fy); ctx.lineTo(fx + 2.5, fy); ctx.moveTo(fx, fy - 2.5); ctx.lineTo(fx, fy + 2.5); ctx.stroke(); });
    };
  }

  /* The plot from above, as a landscape plan: beds with their plants, a greenhouse, trees, a path, a barrel, compost,
     small labels and a scale. The scroll moves the eye across it. labels: the words on the plan; quiet(): the blocks
     of text that need a calm zone under them. */
  function gardenPlan(opt) {
    const L = opt.labels;
    return (ctx, t, W, H, env) => {
      const s = Math.max(.5, W / 1500), ox = lerp(-40, 260, ease(env.u)) + Math.sin(t / 11) * 10, oy = lerp(-10, 620, ease(env.u)) + Math.cos(t / 13) * 8;
      ctx.save(); ctx.scale(s, s); ctx.translate(-ox, -oy); ctx.lineWidth = 1 / s; ctx.lineJoin = 'round';
      const line = a => { ctx.strokeStyle = `rgba(${INK},${a})`; }, green = a => { ctx.strokeStyle = `rgba(${LEAF},${a})`; ctx.fillStyle = `rgba(${LEAF},${a})`; };
      const box = (x, y, w, h, rad = 8) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, rad); ctx.stroke(); };
      ctx.fillStyle = `rgba(${INK},.07)`; for (let x = 0; x <= 2300; x += 100) for (let y = 0; y <= 2000; y += 100) ctx.fillRect(x - .8, y - .8, 1.6, 1.6);
      line(.12); ctx.setLineDash([10, 8]); box(100, 90, 2060, 1760, 4); ctx.setLineDash([]);
      line(.1); box(100, 90, 430, 300, 2);
      line(.09); ctx.beginPath(); ctx.moveTo(530, 250); ctx.lineTo(1480, 250); ctx.lineTo(1480, 1700); ctx.moveTo(530, 310); ctx.lineTo(1420, 310); ctx.lineTo(1420, 1700); ctx.stroke();
      for (let k = 0; k < 4; k++) { const x = 1570 + k * 122; line(.14); box(x, 190, 86, 420); green(.26); for (let j = 0; j < 9; j++) { ctx.beginPath(); ctx.arc(x + 43, 220 + j * 45, 9, 0, 6.3); ctx.stroke(); } }
      for (let k = 0; k < 6; k++) { const y = 760 + k * 118; line(.14); box(620, y, 720, 78); green(k % 3 === 1 ? .18 : .28);
        for (let j = 0; j < (k % 2 ? 22 : 15); j++) { ctx.beginPath(); ctx.arc(648 + j * (k % 2 ? 31.5 : 47), y + 39, k % 2 ? 5 : 10, 0, 6.3); if (k % 3 === 2) ctx.fill(); else ctx.stroke(); } }
      line(.2); box(1560, 760, 470, 300, 4); line(.1); ctx.beginPath(); ctx.moveTo(1560, 910); ctx.lineTo(2030, 910); for (let k = 1; k < 9; k++) { ctx.moveTo(1560 + k * 52.2, 760); ctx.lineTo(1560 + k * 52.2, 1060); } ctx.stroke();
      green(.3); for (let k = 0; k < 12; k++) { ctx.beginPath(); ctx.arc(1600 + (k % 6) * 78, 835 + Math.floor(k / 6) * 150, 13, 0, 6.3); ctx.stroke(); }
      [[300, 760, 120], [350, 1180, 150], [270, 1560, 105]].forEach(([x, y, rad]) => {
        green(.16); ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.3); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, rad * .62, 0, 6.3); ctx.stroke();
        for (let k = 0; k < 18; k++) { const a = k / 18 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * rad * .62, y + Math.sin(a) * rad * .62); ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad); ctx.stroke(); }
        ctx.fillRect(x - 2, y - 2, 4, 4); });
      line(.14); ctx.beginPath(); ctx.arc(1500, 1130, 26, 0, 6.3); ctx.stroke(); box(1560, 1160, 120, 120, 2); ctx.beginPath(); ctx.moveTo(1560, 1160); ctx.lineTo(1680, 1280); ctx.moveTo(1680, 1160); ctx.lineTo(1560, 1280); ctx.stroke();
      ctx.font = `${11 / s}px ${FONT}`; ctx.textAlign = 'left'; ctx.fillStyle = `rgba(${INK},.32)`;
      [[L.house, 116, 420], [L.path, 900, 242], [L.beds, 1570, 178], [L.greenhouse, 1560, 748], [L.tree1, 250, 632], [L.tree2, 300, 1022], [L.tree3, 230, 1448], [L.barrel, 1440, 1180], [L.compost, 1560, 1300], [L.rows, 620, 748]]
        .forEach(([text, x, y]) => ctx.fillText(text, x, y));
      line(.3); ctx.beginPath(); ctx.moveTo(140, 1790); ctx.lineTo(390, 1790); ctx.moveTo(140, 1784); ctx.lineTo(140, 1796); ctx.moveTo(390, 1784); ctx.lineTo(390, 1796); ctx.stroke(); ctx.fillText(L.scale, 250, 1780);
      ctx.restore();
      opt.quiet().forEach(el => env.calm(el, 70, .93));
    };
  }

  window.nuBackdrops = { nightGarden, gardenPlan };
})();
