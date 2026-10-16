// Collection shelf: wheel → sideways, drag with momentum, endless loop both ways, drags never open a card, clicks still do.
//   node tests/e2e/rack.e2e.mjs [--record qa-shots/rack.webp]
import puppeteer from 'puppeteer-core';
import { enter } from './support/enter.mjs';
import sharp from 'sharp';
const rec = process.argv.includes('--record') ? process.argv[process.argv.indexOf('--record') + 1] : null;
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 760, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.evaluateOnNewDocument(() => localStorage.setItem('knowscape-v1', JSON.stringify({ state: { onboarding: { intro: true, dragged: true, opened: true } }, version: 1 })));
await page.goto('http://127.0.0.1:5340/', { waitUntil: 'networkidle0' });
await enter(page);
await page.evaluate(() => {
  const u = window.__ks.user.getState();
  ['octopus-color', 'trees-communicate', 'pisa', 'helvetica', 'bioluminescence', 'stop-sign', 'blue-eyes', 'zipper', 'trees-water', 'popcorn-pops', 'aurora', 'saturn-rings', 'honey-spoil', 'gps', 'whale-song', 'cuneiform'].forEach((id) => u.recordOpen(id, 'science'));
  u.setSetting('loopShelf', true); // looping is opt-in; this test covers both modes
  window.__ks.ui.getState().openCollection('recent');
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(1500);
const frames = [];
const grab = async (n, gap = 70) => {
  for (let k = 0; k < n && rec; k++) {
    frames.push(await page.screenshot({ type: 'png' }));
    await sleep(gap);
  }
};
// distance travelled along the endless shelf (scrollLeft itself wraps)
const left = () => page.evaluate(() => Number(document.querySelector('.rack').dataset.position));
const results = [];
const check = (n, ok, x = '') => results.push(`${ok ? 'ok  ' : 'FAIL'} ${n}${x ? ' — ' + x : ''}`);
await grab(6);
const l0 = await left();
await page.mouse.move(640, 420);
for (let k = 0; k < 6; k++) {
  await page.mouse.wheel({ deltaY: 120 });
  await sleep(40);
  if (rec) frames.push(await page.screenshot({ type: 'png' }));
}
await grab(10);
await sleep(rec ? 0 : 700);
const l1 = await left();
check('mouse wheel scrolls sideways', l1 > l0 + 300, `${Math.round(l0)} → ${Math.round(l1)}`);
// drag right-to-left with a flick
await page.mouse.move(900, 420);
await page.mouse.down();
for (let k = 1; k <= 10; k++) {
  await page.mouse.move(900 - k * 40, 420);
  await sleep(14);
  if (rec && k % 2 === 0) frames.push(await page.screenshot({ type: 'png' }));
}
await page.mouse.up();
const l2 = await left();
await grab(14);
await sleep(rec ? 0 : 900);
const l3 = await left();
check('drag moves the shelf', l2 > l1 + 300, `${Math.round(l1)} → ${Math.round(l2)}`);
check('flick keeps gliding after release', l3 > l2 + 20, `${Math.round(l2)} → ${Math.round(l3)}`);
check('a drag never opens a card', !(await page.$('.km')));
// drag back left-to-right
await page.mouse.move(300, 420);
await page.mouse.down();
for (let k = 1; k <= 10; k++) {
  await page.mouse.move(300 + k * 45, 420);
  await sleep(14);
  if (rec && k % 2 === 0) frames.push(await page.screenshot({ type: 'png' }));
}
await page.mouse.up();
await grab(14);
await sleep(rec ? 0 : 900);
check('drag back reverses', (await left()) < l3);
// endless: keep scrolling right well past one full lap, then left past the start
const lap = await page.evaluate(() => {
  const slots = document.querySelectorAll('.rack-slot');
  return slots[slots.length / 3].offsetLeft - slots[0].offsetLeft;
});
check('long shelves loop (three copies rendered)', (await page.$$eval('.rack-slot', (s) => s.length)) === 48);
const visibleCards = () =>
  page.evaluate(() => [...document.querySelectorAll('.rack-card')].filter((c) => { const r = c.getBoundingClientRect(); return r.right > 100 && r.left < 1180; }).length);
const p0 = await left();
for (let k = 0; k < 40; k++) {
  await page.mouse.wheel({ deltaY: 240 });
  await sleep(30);
}
await sleep(900);
const p1 = await left();
check('wheel keeps going past the end', p1 - p0 > lap * 1.5, `${Math.round(p0)} → ${Math.round(p1)} (one lap ${Math.round(lap)})`);
check('cards still fill the shelf after a lap', (await visibleCards()) >= 4);
for (let k = 0; k < 60; k++) {
  await page.mouse.wheel({ deltaY: -240 });
  await sleep(30);
}
await sleep(900);
check('and keeps going backwards past the start', (await left()) < 0, `→ ${Math.round(await left())}`);
check('cards still fill the shelf going backwards', (await visibleCards()) >= 4);
check('screen readers see the list once', (await page.$$eval('[role=listitem]', (s) => s.length)) === 16);
// with "Loop the collection" off, the shelf is a plain one that stops at both ends
await page.evaluate(() => window.__ks.user.getState().setSetting('loopShelf', false));
await sleep(600);
check('loop off: the list is shown once', (await page.$$eval('.rack-slot', (s) => s.length)) === 16);
for (let k = 0; k < 40; k++) {
  await page.mouse.wheel({ deltaY: 240 });
  await sleep(30);
}
await sleep(900);
await page.mouse.move(640, 60); // off the shelf, so a hovered card isn't spreading its neighbours
await sleep(800);
const end = await page.evaluate(() => { const r = document.querySelector('.rack'); return r.scrollWidth - r.clientWidth - r.scrollLeft; });
check('loop off: stops at the end', end < 2, `${Math.round(end)}px from the end`);
await page.evaluate(() => window.__ks.user.getState().setSetting('loopShelf', true));
await sleep(600);
await page.mouse.move(640, 420);
check('loop back on: copies return', (await page.$$eval('.rack-slot', (s) => s.length)) === 48);
// a plain click still opens
const box = await page.evaluate(() => {
  const r = [...document.querySelectorAll('.rack-card')].map((c) => c.getBoundingClientRect()).find((r) => r.left > 300 && r.right < 1000);
  return r && { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});
await page.mouse.click(box.x, box.y);
await sleep(900);
check('a plain click opens the card', !!(await page.$('.km')));
console.log(results.join('\n'));
console.log(errors.length ? 'ERRORS\n' + errors.join('\n') : 'no page errors');
await browser.close();
if (rec && frames.length) {
  const small = await Promise.all(frames.map((f) => sharp(f).resize(900).png().toBuffer()));
  await sharp(small, { join: { animated: true } }).webp({ quality: 70, delay: Array(small.length).fill(70), loop: 0 }).toFile(rec);
  console.log('saved', rec, small.length, 'frames');
}
