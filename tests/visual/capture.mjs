// Visual regression: captures the same 13 screens deterministically (seeded random, fixed clock, reduced motion).
// usage: node tests/visual/capture.mjs qa-shots/visual/before   (then again after a change, and compare)
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
const out = process.argv[2];
mkdirSync(out, { recursive: true });
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const errors = [];
async function open(w, h) {
  const pg = await b.newPage();
  await pg.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 720, hasTouch: w < 720 });
  pg.on('pageerror', (e) => errors.push(e.message));
  pg.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await pg.evaluateOnNewDocument(() => {
    let s = 42;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const D = Date, off = new D('2026-10-09T10:00:00').getTime() - D.now();
    class FD extends D { constructor(...a) { a.length ? super(...a) : super(D.now() + off); } static now() { return D.now() + off; } }
    window.Date = FD;
    localStorage.clear(); sessionStorage.clear();
    localStorage.setItem('knowscape-v1', JSON.stringify({ state: { settings: { motion: 'reduce', connections: true, greeting: true, personalize: true }, onboarding: { intro: true, dragged: true, opened: true }, saved: [{ id: 'sphinx-carved', at: 1 }, { id: 'orange-hybrid', at: 2 }], history: [{ id: 'sphinx-carved', at: 1 }] }, version: 2 }));
  });
  await pg.goto(process.env.BASE_URL ?? 'http://127.0.0.1:5340', { waitUntil: 'networkidle0' });
  return pg;
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function enter(pg) {
  await pg.waitForSelector('.intro.is-ready .pill--ink', { timeout: 10000 });
  await wait(1300);
  await pg.click('.intro .pill--ink');
  await pg.waitForFunction(() => !document.querySelector('.intro') && !!document.querySelector('.canvas:not(.is-veiled)'), { timeout: 8000 });
  await wait(1800);
}
const shots = [
  ['01-landing', async (pg) => { await pg.waitForSelector('.intro.is-ready', { timeout: 10000 }); await wait(2800); }],
  ['02-canvas', async (pg) => { await enter(pg); }],
  ['03-search', async (pg) => { await enter(pg); await pg.click('.search-field input'); await wait(700); }],
  ['04-search-typed', async (pg) => { await enter(pg); await pg.click('.search-field input'); await pg.keyboard.type('cats'); await wait(700); }],
  ['05-modal', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().openObject('sphinx-carved')); await wait(1500); }],
  ['06-collection', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().openCollection('saved')); await wait(1200); }],
  ['07-settings', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('settings')); await wait(1200); }],
  ['08-topics', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('topics')); await wait(1200); }],
  ['09-menu', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('menu')); await wait(900); }],
  ['10-progress', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().setOverlay('progress')); await wait(900); }],
  ['11-toast', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().toast('A new arrangement of things to discover.', { label: 'Undo', run() {} })); await wait(500); }],
];
for (const [name, run] of shots) {
  const pg = await open(1440, 900);
  await run(pg);
  await pg.screenshot({ path: `${out}/${name}.png` });
  await pg.close();
}
for (const [name, run] of [['12-mobile-canvas', async (pg) => { await enter(pg); }], ['13-mobile-modal', async (pg) => { await enter(pg); await pg.evaluate(() => window.__ks.ui.getState().openObject('orange-hybrid')); await wait(1500); }]]) {
  const pg = await open(390, 844);
  await run(pg);
  await pg.screenshot({ path: `${out}/${name}.png` });
  await pg.close();
}
await b.close();
console.log('captured', shots.length + 2, 'screens; errors:', errors.length ? errors : 'none');
