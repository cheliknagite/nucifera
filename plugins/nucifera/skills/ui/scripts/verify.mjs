#!/usr/bin/env node
// nucifera verify: screenshots + measurements for HTML mockups, with no npm dependencies.
// Uses an installed Chrome, Edge or Chromium in headless mode.
//
//   node verify.mjs <page.html | http://url> [--out <dir>] [--widths 360,390,430] [--light 390] [--browser <path>]
//
// Pages built from assets/frame.html: every screen is shot at each width in the dark theme and at --light widths
// in the light theme, and probe.js measures each screen. Other pages (landings) and URLs: screenshots only, each
// width as the first screen and as a long view, plus the light theme through ?theme=light; no measurements.
// Writes <out>/report.md and <out>/report.json. Exit code 1 when anything FAILs.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir, platform } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : def; };
const target = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1]?.startsWith('--') !== true);
if (!target) { console.error('usage: node verify.mjs <page.html | url> [--out dir] [--widths 360,390,430] [--light 390] [--browser path]'); process.exit(2); }

const isUrl = /^https?:\/\//.test(target);
const base = isUrl ? target : pathToFileURL(resolve(target)).href;
const out = resolve(opt('out', isUrl ? 'verify' : join(dirname(resolve(target)), 'verify')));
const widths = opt('widths', '360,390,430').split(',').map(Number);
const pageWidths = opt('widths', '360,390,430,1440').split(',').map(Number);   /* plain pages also get a desktop view */
const lightWidths = opt('light', '390').split(',').filter(Boolean).map(Number);
const HEIGHT = { 360: 780, 390: 844, 430: 932, 1440: 900 };
const LONG = 5000;
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
  '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, '--virtual-time-budget=10000'];
const url = q => base + (base.includes('?') ? '&' : '?') + new URLSearchParams(q).toString();
const run = extra => execFileSync(browser, [...common, ...extra], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, timeout: 90000, stdio: ['ignore', 'pipe', 'ignore'] });
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

const report = { target, browser, when: new Date().toISOString(), shots: [], probe: [], fail: 0, warn: 0, mode: 'frame' };
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
  report.note = 'No frame.js screens found: screenshots only, no measurements. page-<width>.png is the first screen; ' +
    '-long.png is the page in a 5000px-tall view (sections sized in vh look stretched there, blank space after the footer is outside the page). ' +
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
