#!/usr/bin/env node
// nucifera verify: screenshots + measurements for HTML mockups, with no npm dependencies.
// Uses an installed Chrome, Edge or Chromium in headless mode.
//
//   node verify.mjs <page.html | http://url> [--out <dir>] [--widths 360,390,430] [--light 390 | none] [--landing] [--walk off] [--browser <path>]
//
// Pages built from assets/frame.html: every screen is shot at each width in the dark theme and at --light widths
// in the light theme, and probe.js measures each screen. Other pages (landings) and URLs: still shots (the first
// screen and a long view per width, the light theme through ?theme=light) and a walk in real time, screen by screen,
// at 1440 and 390: detail on each screen, motion on the first one, layout faults, script errors. --landing fails a
// nearly empty screen, a stretch of sparse ones, a still first screen, a page far over its word budget and blocks
// still marked data-example from the starter page.
// Writes <out>/report.md and <out>/report.json. Exit code 1 when anything FAILs.

import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir, platform } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : def; };
const FLAGS = ['--landing'];   /* options without a value */
const target = args.find((a, i) => !a.startsWith('--') && !(args[i - 1]?.startsWith('--') && !FLAGS.includes(args[i - 1])));
if (!target) { console.error('usage: node verify.mjs <page.html | url> [--out dir] [--widths 360,390,430] [--light 390] [--browser path]'); process.exit(2); }

const isUrl = /^https?:\/\//.test(target);
const base = isUrl ? target : pathToFileURL(resolve(target)).href;
const out = resolve(opt('out', isUrl ? 'verify' : join(dirname(resolve(target)), 'verify')));
const widths = opt('widths', '360,390,430').split(',').map(Number);
const pageWidths = opt('widths', '360,390,430,1440').split(',').map(Number);   /* plain pages also get a desktop view */
const lightWidths = opt('light', '390') === 'none' ? [] : opt('light', '390').split(',').filter(Boolean).map(Number);   /* --light none: a dark-only page */
const HEIGHT = { 360: 780, 390: 844, 430: 932, 1440: 900 };
const LONG = Number(opt('long', '9000'));   /* the long view of a plain page; raise it for very long pages */
mkdirSync(out, { recursive: true });

function findBrowser() {
  const env = opt('browser') || process.env.UI_BROWSER || process.env.CHROME_PATH;
  if (env && existsSync(env)) return env;
  const win = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe')];
  const mac = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'];
  const nix = ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge', '/snap/bin/chromium'];
  const list = platform() === 'win32' ? win : platform() === 'darwin' ? mac : nix;
  return list.find(p => p && existsSync(p));
}
const browser = findBrowser();
if (!browser) { console.error('No Chrome, Edge or Chromium found. Pass --browser <path> or set UI_BROWSER. Hand over with "PIXELS UNVERIFIED".'); process.exit(3); }

const profile = join(tmpdir(), 'nucifera-verify-profile');
const common = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--disable-lcd-text', '--force-device-scale-factor=1',
  '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, '--virtual-time-budget=10000',
  '--force-prefers-reduced-motion'];   /* shots show every moment in its end state, the way a still review needs it */
const url = q => base + (base.includes('?') ? '&' : '?') + new URLSearchParams(q).toString();
const launch = extra => execFileSync(browser, [...common, ...extra], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, timeout: 90000, stdio: ['ignore', 'pipe', 'ignore'] });
const run = extra => { try { return launch(extra); } catch { return launch(extra); } };   /* the first launch with a fresh profile can fail: once more */
const dump = q => run(['--window-size=1400,1000', '--dump-dom', url(q)]);
const shot = (q, w, h, file) => { run([`--window-size=${w},${h}`, `--screenshot=${file}`, url(q)]); return file; };
/* headless browsers do not lay a page out narrower than about 500px, so a local plain page is shot inside an iframe
   of exactly the asked width (frame.js pages size their own phone and need no wrapper) */
const frameShot = (q, w, h, file) => {
  if (isUrl) return shot(q, w, h, file);
  const wrap = join(out, `.wrap-${w}-${h}.html`);
  writeFileSync(wrap, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;overflow:hidden;background:#000}` +
    `iframe{display:block;width:${w}px;height:${h}px;border:0}</style><iframe src="${url(q)}"></iframe>`, 'utf8');
  try { run([`--window-size=${w},${h}`, `--screenshot=${file}`, pathToFileURL(wrap).href]); } finally { rmSync(wrap, { force: true }); }
  return file;
};
const pre = (html, id) => { const m = html.match(new RegExp(`<pre id="${id}"[^>]*>([\\s\\S]*?)</pre>`)); return m ? m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : null; };

/* ---------- the walk: a plain page (a landing) seen screen by screen in real time, through the browser's debugging port.
   It catches holes a still long shot hides: nearly empty screens, a first screen where nothing moves, screens with no
   words, media cut by the screen edge, stretched images, small fixed elements lying over text, script errors.
   Needs Node 22 or newer (the built-in WebSocket). It does not judge beauty: that stays with the critic and the user. ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', () => rej(new Error('no debugging socket'))); });
  let id = 0; const wait = new Map(), errors = [];
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && wait.has(m.id)) { const [res, rej] = wait.get(m.id); wait.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
    else if (m.method === 'Runtime.exceptionThrown') { const d = m.params.exceptionDetails; errors.push(((d.exception && d.exception.description) || d.text || 'script error').split('\n')[0].slice(0, 200)); }
  });
  const send = (method, params = {}) => new Promise((res, rej) => { wait.set(++id, [res, rej]); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  return { send, evaluate, errors, close: () => { try { ws.close(); } catch { /* already closed */ } } };
}
/* runs in a blank helper page: how much of a screenshot holds detail, and how much changed since the previous one */
const PIX = `window.nuPix = async (b64, key) => {
  const bmp = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob());
  const W = Math.max(60, Math.round(bmp.width / 4)), H = Math.max(40, Math.round(bmp.height / 4));
  const c = new OffscreenCanvas(W, H), g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(bmp, 0, 0, W, H);
  const d = g.getImageData(0, 0, W, H).data, lum = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) lum[i] = (d[i * 4] * 3 + d[i * 4 + 1] * 6 + d[i * 4 + 2]) / 10;
  let busy = 0, n = 0;
  for (let by = 0; by < H; by += 9) for (let bx = 0; bx < W; bx += 9) { let lo = 255, hi = 0;
    for (let y = by; y < Math.min(by + 9, H); y++) for (let x = bx; x < Math.min(bx + 9, W); x++) { const l = lum[y * W + x]; if (l < lo) lo = l; if (l > hi) hi = l; }
    n++; if (hi - lo > 28) busy++; }
  window.nuPrev = window.nuPrev || {}; const prev = window.nuPrev[key]; let moved = null;
  if (prev && prev.length === lum.length) { let m = 0; for (let i = 0; i < lum.length; i++) if (Math.abs(lum[i] - prev[i]) > 14) m++; moved = Math.round(1000 * m / lum.length) / 10; }
  window.nuPrev[key] = lum; return { busy: Math.round(100 * busy / n), moved };
}; 0`;
/* runs in the page at each stop: words on screen, things to look at, and the three layout faults */
const DOMPROBE = `(() => {
  const vw = innerWidth, vh = innerHeight, o = { words: 0, objects: 0, cut: [], stretched: [], floating: [] };
  const vis = r => r.width > 0 && r.height > 0 && r.bottom > 4 && r.top < vh - 4 && r.right > 0 && r.left < vw;
  const sel = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList && el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : '');
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node;
  while ((node = tw.nextNode())) { const t = node.nodeValue.trim(); if (!t) continue; const p = node.parentElement;
    if (!p || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(p.tagName)) continue;
    const cs = getComputedStyle(p); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const rg = document.createRange(); rg.selectNodeContents(node); const r = rg.getBoundingClientRect();
    if (vis(r)) o.words += (t.match(/[\\p{L}\\p{N}]+/gu) || []).length; }
  for (const el of document.querySelectorAll('img, video, canvas, svg')) { const r = el.getBoundingClientRect();
    if (!vis(r) || r.width < 64 || r.height < 48) continue;
    if (el.tagName.toLowerCase() === 'svg' && el.closest('button, a')) continue;
    o.objects++;
    if (el.tagName.toLowerCase() !== 'svg' && r.width < vw * .98 && (r.right > vw + 6 || r.left < -6)) o.cut.push(sel(el));
    if (el.tagName === 'IMG' && el.naturalWidth && el.naturalWidth < r.width * .9) o.stretched.push(sel(el) + ' (' + el.naturalWidth + 'px wide, shown at ' + Math.round(r.width) + 'px)'); }
  const hasText = el => [...el.childNodes].some(n => n.nodeType === 3 && /[\\p{L}\\p{N}]{2}/u.test(n.nodeValue));
  for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el);
    if (cs.position !== 'fixed' || cs.visibility === 'hidden' || +cs.opacity < .3 || cs.display === 'none') continue;
    const r = el.getBoundingClientRect(); const area = r.width * r.height;
    if (!vis(r) || area < 600 || area > vw * vh * .4) continue;
    if (r.top <= 1 || r.bottom >= vh - 1) continue;
    for (const fx of [.2, .5, .8]) { const under = document.elementsFromPoint(r.left + r.width * fx, r.top + r.height / 2).find(u => u !== el && !el.contains(u) && !u.contains(el) && hasText(u));
      if (under) { o.floating.push(sel(el) + ' lies over ' + sel(under)); break; } } }
  return o;
})()`;

/* runs in the page: wait until entrances (finite animations and transitions) have finished, three and a half seconds at most */
const SETTLE = `(async () => { const t0 = performance.now();
  while (performance.now() - t0 < 3500) {
    const busy = document.getAnimations().some(a => { if (a.playState !== 'running' || !a.effect) return false; const t = a.effect.getComputedTiming(); return t.iterations !== Infinity && t.endTime < 6000; });
    if (!busy && performance.now() - t0 > 450) break;
    await new Promise(r => setTimeout(r, 120)); }
  return 0; })()`;

async function walkPage(pageUrl, walkWidths, landing) {
  const port = 9400 + Math.floor(Math.random() * 500), walkProfile = `${profile}-walk-${process.pid}`;   /* its own profile: a browser left from another run cannot swallow this one */
  const child = spawn(browser, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--enable-unsafe-swiftshader', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', `--remote-debugging-port=${port}`, `--user-data-dir=${walkProfile}`, '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });
  let page, helper; const results = [];
  try {
    let list = null;
    for (let i = 0; i < 100 && !list; i++) { await sleep(250); try { list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch { /* not up yet */ } }
    if (!list) throw new Error('the browser did not open its debugging port');
    const first = list.find(t => t.type === 'page');
    const second = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
    page = await cdp(first.webSocketDebuggerUrl); helper = await cdp(second.webSocketDebuggerUrl);
    await page.send('Page.enable'); await page.send('Runtime.enable'); await helper.evaluate(PIX);
    /* the helper tab opened in front: bring the page back, or it runs as a hidden tab and its animations stand still */
    await page.send('Page.bringToFront'); await page.send('Emulation.setFocusEmulationEnabled', { enabled: true });
    const grab = async () => (await page.send('Page.captureScreenshot', { format: 'png' })).data;
    const pix = (b64, key) => helper.evaluate(`nuPix(${JSON.stringify(b64)}, ${JSON.stringify(key)})`);
    for (const w of walkWidths) {
      const h = HEIGHT[w] || 900, res = { width: w, height: h, screens: [], warn: [], fail: [], motion: null }, seen = new Set();
      const warn = m => { if (!seen.has(m)) { seen.add(m); res.warn.push(m); } };
      await page.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
      page.errors.length = 0;
      await page.send('Page.navigate', { url: pageUrl }); await sleep(1500); await page.evaluate(SETTLE); await sleep(600);
      /* the first screen, three frames a second and a half apart: is anything alive once the entrance is over? */
      const frames = []; for (let k = 0; k < 3; k++) { if (k) await sleep(1500); frames.push(await grab()); }
      let moved = 0, busy0 = 0;
      for (let k = 0; k < 3; k++) { const m = await pix(frames[k], 'motion' + w); if (k === 0) busy0 = m.busy; if (m.moved != null) moved = Math.max(moved, m.moved); }
      res.motion = moved;
      if (w >= 1000) frames.forEach((f, k) => { const file = join(out, `walk-${w}-motion-${k + 1}.png`); writeFileSync(file, Buffer.from(f, 'base64')); report.shots.push(file); });
      const total = await page.evaluate('Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0)');
      const stops = []; for (let y = 0; y < Math.max(1, total - 8) && stops.length < 24; y += h) stops.push(Math.min(y, Math.max(0, total - h)));
      for (let i = 0; i < stops.length; i++) {
        if (i && stops[i] === stops[i - 1]) continue;
        let b64 = frames[2], busy = busy0;
        if (i) { await page.evaluate(`scrollTo(0, ${stops[i]}); 0`); await sleep(350); await page.evaluate(SETTLE); b64 = await grab(); busy = (await pix(b64, 'screen' + w + '-' + i)).busy; }
        const file = join(out, `walk-${w}-${String(i + 1).padStart(2, '0')}.png`); writeFileSync(file, Buffer.from(b64, 'base64')); report.shots.push(file);
        const dom = await page.evaluate(DOMPROBE);
        res.screens.push({ n: i + 1, y: stops[i], busy, words: dom.words, objects: dom.objects });
        const where = `screen ${i + 1} at ${w}px`;
        if (busy < 15) (landing ? res.fail : res.warn).push(`${where} is nearly empty (detail on ${busy} % of it): show something there or merge the section`);
        else if (busy < 24) warn(`${where} is sparse (detail on ${busy} % of it): little to look at`);
        if (i && dom.words === 0) warn(`${where} has no words: a stretch of the scroll with nothing to read`);
        dom.cut.forEach(c => warn(`cut by the screen edge at ${w}px: ${c}`));
        dom.stretched.forEach(c => warn(`stretched image: ${c}`));
        dom.floating.forEach(c => warn(`at ${w}px a fixed element covers text: ${c}`));
      }
      /* a calm screen between dense ones is rhythm (a statement, the final call); a stretch of them, or too many, is an empty page */
      const thin = res.screens.filter(s => s.busy < 24), row = thin.find(s => thin.some(o => o.n === s.n + 1 && o.y - s.y > h * .6));   /* the last stop overlaps the one before it: that pair is one place */
      if (landing && row) res.fail.push(`screens ${row.n} and ${row.n + 1} at ${w}px are both sparse: a stretch of the scroll with little to look at`);
      const bare = res.screens.filter(s => s.busy < 20);   /* clearly thin: the warning line (24 %) is for the eye, a FAIL needs a clear case */
      if (landing && !row && bare.length >= 2 && bare.length * 3 > res.screens.length) res.fail.push(`${bare.length} of ${res.screens.length} screens at ${w}px show detail on under a fifth of their area: the page is mostly empty canvas between its texts`);
      if (landing && moved < 0.3) {   /* a concept of still art says so: <html data-hook="still"> */
        const still = await page.evaluate(`document.documentElement.dataset.hook === 'still'`);
        if (!still) res.fail.push(`nothing moves on the first screen at ${w}px once its entrance is over (${moved} % of it changed in three seconds): a landing needs a living scene or a demo there`);
      }
      [...new Set(page.errors)].forEach(e => res.fail.push(`script error at ${w}px: ${e}`));
      results.push(res);
    }
  } finally {
    if (page) page.close(); if (helper) helper.close(); child.kill();
    await new Promise(r => { if (child.exitCode !== null || child.signalCode) return r(); child.once('exit', r); setTimeout(r, 3000); });
    try { rmSync(walkProfile, { recursive: true, force: true }); } catch { /* the browser may still hold it; the system clears the temp folder */ }
  }
  return results;
}

const report = { target, browser, when: new Date().toISOString(), shots: [], probe: [], pageWarn: [], pageFail: [], fail: 0, warn: 0, mode: 'frame' };
let screens = [];
if (!isUrl) { try { screens = JSON.parse(pre(dump({ list: 1 }), 'ui-screens') || '[]'); } catch { screens = []; } }

if (!screens.length) {
  report.mode = 'page';
  for (const w of pageWidths) {
    report.shots.push(frameShot({}, w, HEIGHT[w] || 900, join(out, `page-${w}.png`)));
    report.shots.push(frameShot({}, w, LONG, join(out, `page-${w}-long.png`)));
  }
  for (const w of lightWidths) {
    report.shots.push(frameShot({ theme: 'light' }, w, HEIGHT[w] || 900, join(out, `page-${w}-light.png`)));
    report.shots.push(frameShot({ theme: 'light' }, w, LONG, join(out, `page-${w}-light-long.png`)));
  }
  if (!isUrl) {   /* landings: count the visible words and look for questions that can stay open together */
    const src = readFileSync(resolve(target), 'utf8');
    const text = src.replace(/<(script|style|svg|template)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
    const words = (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
    const details = (src.match(/<details\b/gi) || []).length, named = (src.match(/<details\b[^>]*\bname\s*=/gi) || []).length;
    report.page = { words, details, namedDetails: named };
    const landing = args.includes('--landing');
    if (landing && words > 1500) report.pageFail.push(`${words} words on the page: a home page reads in about 500 to 900; cut it or move the details to their own pages (landing skill, references/page.md)`);
    else if (words > 1000) report.pageWarn.push(`${words} words on the page: keep the most valuable, about 500 to 900 on a home page (landing skill, references/page.md)`);
    const examples = [...src.replace(/<!--[\s\S]*?-->/g, ' ').matchAll(/<[a-z][^>]*\sdata-example(?:="([^"]*)")?/gi)].map(m => m[1] || 'block');
    if (landing && examples.length) report.pageFail.push(`${examples.length} blocks still show the starter's example product (data-example: ${[...new Set(examples)].slice(0, 6).join(', ')}): fill them with the real product and remove the attribute, or delete them`);
    if (details >= 3 && named < details) report.pageWarn.push('the questions can stay open together: give their <details> one shared name, one answer at a time');
    report.warn += report.pageWarn.length; report.fail += report.pageFail.length;
  }
  if (opt('walk', 'on') !== 'off') {
    if (typeof WebSocket !== 'function') report.walkNote = 'The walk needs Node 22 or newer: only still screenshots were taken.';
    else try {
      const ww = [1440, 390].filter(w => pageWidths.includes(w));
      report.walk = await walkPage(base, ww.length ? ww : [pageWidths[0]], args.includes('--landing'));
      for (const r of report.walk) { report.fail += r.fail.length; report.warn += r.warn.length; }
    } catch (e) { report.walkNote = 'The walk did not run: ' + e.message; }
    if (report.walkNote && args.includes('--landing')) { report.warn++; report.walkNote = 'WARN ' + report.walkNote + ' The landing checks (empty screens, motion, layout faults) were skipped: run it again.'; }
  }
  report.note = 'No frame.js screens found: no layout measurements. page-<width>.png is the first screen; walk-<width>-NN.png are the screens in real time; ' +
    '-long.png is the page in a tall view (--long, 9000px by default) (sections sized in vh look stretched there, blank space after the footer is outside the page). ' +
    'The light shots need the page to read ?theme=light. Build app mockups from assets/frame.html to get measurements.';
} else {
  for (const id of screens) {
    for (const w of widths) report.shots.push(shot({ shot: id, w, theme: 'dark' }, w, HEIGHT[w] || 844, join(out, `${id}-${w}-dark.png`)));
    for (const w of lightWidths) report.shots.push(shot({ shot: id, w, theme: 'light' }, w, HEIGHT[w] || 844, join(out, `${id}-${w}-light.png`)));
  }
  for (const theme of ['dark', 'light']) {
    const raw = pre(dump({ probe: 1, theme }), 'ui-probe');
    if (!raw) { report.probe.push({ theme, error: 'probe did not finish (is probe.js next to frame.js?)' }); report.fail++; continue; }
    const p = JSON.parse(raw);
    for (const s of p.screens) { report.fail += s.fail.length; report.warn += s.warn.length; report.probe.push({ theme, ...s }); }
  }
}

const md = [`# Verify: ${target}`, '', `${report.when} · ${browser}`, ''];
if (report.note) md.push(report.note, '');
md.push(`**${report.fail} FAIL · ${report.warn} WARN**`, '');
if (report.page) md.push(`Page text: ${report.page.words} words`, ...report.pageFail.map(w => `- FAIL ${w}`), ...report.pageWarn.map(w => `- WARN ${w}`), '');
if (report.walkNote) md.push(report.walkNote, '');
for (const r of report.walk || []) md.push(`## Walk · ${r.width}x${r.height} · first screen: ${r.motion} % of it moves`,
  ...r.screens.map(s => `- screen ${s.n}: detail on ${s.busy} %, ${s.words} words, ${s.objects} things shown`), ...r.fail.map(f => `- FAIL ${f}`), ...r.warn.map(w => `- WARN ${w}`), '');
for (const s of report.probe) {
  if (s.error) { md.push(`- FAIL ${s.theme}: ${s.error}`); continue; }
  md.push(`## ${s.id} · ${s.theme} · ${s.size}`, `min contrast ${s.stats.minContrast} · accent places ${s.stats.accentPlaces} · glass ${s.stats.glass} · fonts ${s.stats.fonts.join(', ')}`);
  for (const f of s.fail) md.push(`- FAIL ${f}`);
  for (const w of s.warn) md.push(`- WARN ${w}`);
  if (!s.fail.length && !s.warn.length) md.push('- ok');
  md.push('');
}
md.push('## Screenshots', ...report.shots.map(f => `- ${f}`));
writeFileSync(join(out, 'report.md'), md.join('\n'), 'utf8');
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 1), 'utf8');
console.log(`${report.fail} FAIL, ${report.warn} WARN, ${report.shots.length} screenshots -> ${join(out, 'report.md')}`);
process.exit(report.fail ? 1 : 0);
