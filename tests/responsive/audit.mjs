// Responsive audit: every main screen at phone and tablet sizes, one contact sheet per device.
// usage: node tests/responsive/audit.mjs [outdir]   (dev server on 5340)
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
const out = process.argv[2] ?? 'qa-shots/responsive';
mkdirSync(out, { recursive: true });
export const DEVICES = [
  { name: 'android-small', w: 360, h: 780, mobile: true },
  { name: 'iphone', w: 390, h: 844, mobile: true },
  { name: 'iphone-max', w: 430, h: 932, mobile: true },
  { name: 'ipad-portrait', w: 768, h: 1024, mobile: true },
  { name: 'ipad-landscape', w: 1024, h: 768, mobile: true },
];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const SCREENS = [
  ['loading', async () => {}, 'loading'],
  ['landing', async (pg) => { await pg.waitForSelector('.intro.is-ready', { timeout: 10000 }); await wait(3200); }],
  ['canvas', async (pg) => { await enter(pg); }],
  ['search', async (pg) => { await enter(pg); await pg.evaluate(() => document.querySelector('.search-field input')?.focus()); await wait(700); }],
  ['card', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().openObject('axolotl-regrowth')); await wait(1500); }],
  ['card-scrolled', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().openObject('axolotl-regrowth')); await wait(1300); await pg.evaluate(() => { const s = document.querySelector('.km-scroll, .km [class*=scroll], .km'); s?.scrollBy?.(0, 900); document.querySelectorAll('.km *').forEach((e) => { if (e.scrollHeight > e.clientHeight + 20 && getComputedStyle(e).overflowY !== 'visible') e.scrollTop = 900; }); }); await wait(600); }],
  ['collection', async (pg) => { await enter(pg); await pg.evaluate(() => { const u = window.__ks.user.getState(); ['pisa', 'gps', 'aurora', 'lewis-chessmen', 'axolotl-regrowth', 'kintsugi-gold-repair'].forEach((id) => { u.recordOpen(id, 'science'); u.toggleSave(id); }); window.__ks.ui.getState().openCollection('saved'); }); await wait(1300); }],
  ['settings', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('settings')); await wait(900); }],
  ['topics', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('topics')); await wait(1000); }],
  ['menu', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('menu')); await wait(800); }],
  ['progress', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('progress')); await wait(800); }],
  ['celebration', async (pg) => { await enter(pg); await pg.evaluate(() => { for (let i = 0; i < 5; i++) window.__ks.session.getState().learn('x' + i); }); await wait(1600); }],
];
async function enter(pg) {
  await pg.waitForSelector('.intro.is-ready .pill--ink', { timeout: 10000 });
  await wait(1300);
  await pg.click('.intro .pill--ink');
  await pg.waitForFunction(() => !document.querySelector('.intro') && !!document.querySelector('.canvas:not(.is-veiled)'), { timeout: 8000 });
  await wait(2600);
}
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const report = [];
for (const d of DEVICES) {
  const tiles = [];
  for (const [name, run, mode] of SCREENS) {
    const pg = await b.newPage();
    await pg.setViewport({ width: d.w, height: d.h, deviceScaleFactor: 1, isMobile: d.mobile, hasTouch: d.mobile });
    const errs = [];
    pg.on('pageerror', (e) => errs.push(e.message));
    await pg.evaluateOnNewDocument(() => { localStorage.clear(); sessionStorage.clear(); localStorage.setItem('knowscape-v1', JSON.stringify({ state: { onboarding: { intro: true, dragged: true, opened: true } }, version: 3 })); });
    if (mode === 'loading') { pg.goto('http://127.0.0.1:5340/'); await pg.waitForSelector('.loading-screen', { timeout: 8000 }); await wait(300); }
    else { await pg.goto('http://127.0.0.1:5340/', { waitUntil: 'networkidle0' }); await run(pg); }
    // horizontal overflow = content wider than the screen
    const over = await pg.evaluate(() => { const W = innerWidth; return [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && cs.visibility !== 'hidden' && +cs.opacity > 0 && (r.right > W + 2 || r.left < -2) && !e.closest('.canvas, .world, .intro-ring, .rack, .search-chips, .seg, .km-related, [class*=scroll]'); }).slice(0, 4).map((e) => (e.className?.baseVal ?? e.className) + '').map((c) => c.slice(0, 40)); });
    if (over.length || errs.length) report.push(`${d.name} ${name}: ${over.length ? 'overflow ' + over.join(', ') : ''} ${errs.join('; ')}`);
    const png = await pg.screenshot({ type: 'png' });
    tiles.push(await sharp(png).resize(Math.round(d.w / 2), Math.round(d.h / 2)).png().toBuffer());
    await pg.close();
  }
  const tw = Math.round(d.w / 2), th = Math.round(d.h / 2), cols = d.w > 600 ? 4 : 6;
  await sharp({ create: { width: cols * (tw + 8), height: Math.ceil(tiles.length / cols) * (th + 8), channels: 3, background: '#888' } })
    .composite(tiles.map((t, i) => ({ input: t, left: (i % cols) * (tw + 8), top: Math.floor(i / cols) * (th + 8) }))).png().toFile(`${out}/${d.name}.png`);
}
await b.close();
console.log(report.length ? report.join('\n') : 'no overflow or errors found');
console.log('screens:', SCREENS.map((s) => s[0]).join(', '));
