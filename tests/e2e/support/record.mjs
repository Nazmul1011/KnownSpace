// Records a short animated WebP of the canvas: idle drift, then a hovered card holding still.
//   node tests/e2e/support/record.mjs qa-shots/drift.webp
import puppeteer from 'puppeteer-core';
import { enter } from './enter.mjs';
import sharp from 'sharp';
const out = process.argv[2] ?? 'qa-shots/drift.webp';
const W = 1100, H = 680;
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.evaluateOnNewDocument(() => localStorage.setItem('knowscape-v1', JSON.stringify({ state: { onboarding: { intro: true, dragged: true, opened: true } }, version: 1 })));
await page.goto('http://127.0.0.1:5340/', { waitUntil: 'networkidle0' });
await enter(page);
await page.evaluate(() => window.__ks.camera.jump({ x: 0, y: -1750, z: 0.62 }));
await new Promise((r) => setTimeout(r, 3500));
const frames = [];
const grab = async (n, gap) => {
  for (let k = 0; k < n; k++) {
    frames.push(await page.screenshot({ type: 'png' }));
    await new Promise((r) => setTimeout(r, gap));
  }
};
await page.mouse.move(W - 40, H - 120); // park the cursor on empty canvas
await grab(36, 90);
// hover the hummingbird
const box = await page.evaluate(() => {
  const el = [...document.querySelectorAll('[data-key]')].find((e) => e.dataset.key.includes(':hummingbird-hover:object'));
  const r = el.querySelector('.ko').getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height * 0.4 };
});
await page.mouse.move(box.x, box.y, { steps: 8 });
await grab(36, 90);
await browser.close();
const resized = await Promise.all(frames.map((f) => sharp(f).resize(880).png().toBuffer()));
await sharp(resized, { join: { animated: true } }).webp({ quality: 70, delay: Array(resized.length).fill(90), loop: 0 }).toFile(out);
console.log('saved', out, frames.length, 'frames');
