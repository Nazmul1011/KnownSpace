// axe-core scan of the canvas and the open detail view.
import puppeteer from 'puppeteer-core';
import { enter } from './support/enter.mjs';
import { readFileSync } from 'node:fs';
const axe = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.evaluateOnNewDocument(() => localStorage.setItem('knowscape-v1', JSON.stringify({ state: { onboarding: { intro: true, dragged: true, opened: true } }, version: 1 })));
await page.goto('http://127.0.0.1:5340/', { waitUntil: 'domcontentloaded' });
await enter(page);
await new Promise((r) => setTimeout(r, 3500));
const run = async (label) => {
  await page.evaluate(axe);
  const res = await page.evaluate(async () => {
    const r = await window.axe.run(document, { resultTypes: ['violations'], rules: { 'color-contrast': { enabled: true } } });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | '), help: v.help }));
  });
  console.log(`\n${label}: ${res.length} rule(s) violated`);
  for (const v of res) console.log(` - [${v.impact}] ${v.id} ×${v.n}: ${v.help}\n     ${v.ex}`);
};
await run('canvas');
await page.evaluate(() => window.__ks.ui.getState().openObject('gps'));
await new Promise((r) => setTimeout(r, 1500));
await run('detail view');
await browser.close();
