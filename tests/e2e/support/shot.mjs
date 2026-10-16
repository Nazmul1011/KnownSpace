// Headless Chrome screenshots (the desktop Browser pane stalls rAF when hidden).
// usage: node tests/e2e/support/shot.mjs <out.png> [--path /?k=id] [--w 1440] [--h 900] [--fresh] [--intro] [--wait 2600] [--eval "js"] [--after "js"] [--dpr 2]
import puppeteer from 'puppeteer-core';
import { enter } from './enter.mjs';
const args = process.argv.slice(2);
const out = args[0] ?? 'qa-shots/shot.png';
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const w = Number(opt('--w', 1440)), h = Number(opt('--h', 900));
const path = opt('--path', '/');
const wait = Number(opt('--wait', 2800));
const pre = opt('--eval', '');
const after = opt('--after', '');
const dpr = Number(opt('--dpr', 1.5));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr, isMobile: w < 720, hasTouch: w < 720 });
page.on('pageerror', (e) => console.error('PAGEERROR', e.message));
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && console.error('CONSOLE', m.type(), m.text().slice(0, 300)));
// seed storage before the app boots
await page.evaluateOnNewDocument((fresh, intro) => {
  if (fresh) localStorage.clear();
  if (!intro && !localStorage.getItem('knowscape-v1')) {
    localStorage.setItem('knowscape-v1', JSON.stringify({ state: { onboarding: { intro: true, dragged: false, opened: false } }, version: 1 }));
  }
}, args.includes('--fresh'), args.includes('--intro'));
await page.goto('http://127.0.0.1:5340' + path, { waitUntil: 'networkidle0' });
if (!args.includes('--intro')) await enter(page);
if (pre) await page.evaluate(pre);
const typed = opt('--type', '');
if (typed) { await new Promise((r) => setTimeout(r, 1200)); await page.click('.search-field input'); await page.keyboard.type(typed, { delay: 40 }); }
await new Promise((r) => setTimeout(r, wait));
if (after) { await page.evaluate(after); await new Promise((r) => setTimeout(r, Number(opt('--wait2', 1500)))); }
await page.screenshot({ path: out });
await browser.close();
console.log('saved', out);
