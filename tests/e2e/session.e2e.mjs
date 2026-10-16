// Session goal QA: learn through the detail view, check medals at 5/10/15/20 and the cap.
//   node tests/e2e/session.e2e.mjs [--shots]
import puppeteer from 'puppeteer-core';
import { enter } from './support/enter.mjs';
const shots = process.argv.includes('--shots');
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)));
await page.evaluateOnNewDocument(() => {
  if (!sessionStorage.getItem('qa-init')) {
    localStorage.clear();
    localStorage.setItem('knowscape-v1', JSON.stringify({ state: { onboarding: { intro: true, dragged: true, opened: true } }, version: 1 }));
    sessionStorage.setItem('qa-init', '1');
  }
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const check = (n, ok, x = '') => results.push(`${ok ? 'ok  ' : 'FAIL'} ${n}${x ? ' — ' + x : ''}`);
const st = (fn) => page.evaluate(fn);
await page.goto('http://127.0.0.1:5340/?k=ocean-blue', { waitUntil: 'networkidle0' });
await enter(page);
await sleep(2400);
check('header shows 0 of 20 today', await st(() => document.querySelector('.progress')?.textContent?.includes('0 of 20 today')));

const IDS = ['ocean-blue', 'sunset-colors', 'color-vision', 'blue-eyes', 'ice-floats', 'honey-spoil', 'popcorn-pops'];
const learnVia = async (id) => {
  await page.evaluate((x) => window.__ks.ui.getState().openObject(x), id);
  await sleep(900);
  await page.click('.km-learn');
  await sleep(1100);
};
await page.keyboard.press('Escape');
await sleep(800);
for (let k = 0; k < 4; k++) await learnVia(IDS[k]);
check('each Learned closes the view', !(await page.$('.km')));
check('header shows 4 of 20', await st(() => document.querySelector('.progress')?.textContent?.includes('4 of 20 today')));
check('no celebration before five', !(await page.$('.celebrate')));
await learnVia(IDS[4]);
await sleep(900);
check('5th thing: celebration after the view closes', !!(await page.$('.celebrate')) && !(await page.$('.km')));
check('Curious medal awarded', await st(() => document.querySelector('.celebrate-num')?.textContent === '5'));
if (shots) await page.screenshot({ path: 'qa-shots/session-5.png' });
await page.click('.celebrate-primary');
await sleep(700);
check('Keep exploring returns to the canvas', !(await page.$('.celebrate')) && !(await page.$('.km')));

await st(() => {
  const s = window.__ks.session;
  const ids = ['gps', 'aurora', 'saturn-rings', 'rust', 'zipper', 'tardigrade', 'velcro', 'pisa', 'qwerty', 'stop-sign', 'lego-1958', 'post-it', 'microwave', 'cuneiform'];
  for (const id of ids) {
    s.getState().learn(id);
    s.getState().dismiss();
  }
});
check('session at 19', (await st(() => window.__ks.session.getState().learned.length)) === 19);
await learnVia(IDS[5]);
await sleep(900);
check('20th thing opens the final celebration', await st(() => document.querySelector('.celebrate-num')?.textContent === '20'));
if (shots) await page.screenshot({ path: 'qa-shots/session-20.png' });
const learnedBefore = await st(() => Object.keys(window.__ks.user.getState().learned).length);
await page.click('.celebrate-primary');
await sleep(800);
check('closing the final card resets the tracker to 0', await st(() => document.querySelector('.progress')?.textContent?.includes('0 of 20 today')));
check('session state is empty again', await st(() => { const s = window.__ks.session.getState(); return s.learned.length === 0 && s.medals.length === 0 && s.rounds === 1; }));
const learnedAfter = await st(() => Object.keys(window.__ks.user.getState().learned).length);
check('the twenty are cleared from Learned', learnedBefore > 0 && learnedAfter === 0, `${learnedBefore} → ${learnedAfter}`);
await page.evaluate(() => window.__ks.ui.getState().openObject('popcorn-pops'));
await sleep(900);
check('a learned-before card can be learned again', await st(() => document.querySelector('.km-learn')?.textContent?.trim() === 'Mark as learned'));
await page.click('.km-learn');
await sleep(1100);
check('the next one starts a new session at 1', await st(() => document.querySelector('.progress')?.textContent?.includes('1 of 20 today')));
await page.click('.progress');
await sleep(500);
check('popover shows sessions completed today', await st(() => document.querySelector('.session-rounds')?.textContent?.includes('1 session completed today')));
if (shots) await page.screenshot({ path: 'qa-shots/session-reset.png' });
await page.keyboard.press('Escape');

// a refresh while the final celebration is open still resets
await st(() => {
  const s = window.__ks.session;
  const ids = ['gps', 'aurora', 'saturn-rings', 'rust', 'zipper', 'tardigrade', 'velcro', 'pisa', 'qwerty', 'stop-sign', 'lego-1958', 'post-it', 'microwave', 'cuneiform', 'ice-floats', 'honey-spoil', 'ocean-blue', 'sunset-colors'];
  for (const id of ids) { s.getState().learn(id); s.getState().dismiss(); }
  s.getState().learn('blue-eyes');
});
check('20 reached again', (await st(() => window.__ks.session.getState().celebrate)) === 4);
await page.reload({ waitUntil: 'networkidle0' });
await enter(page);
check('after a refresh it is back to 0 with 2 sessions done', await st(() => { const s = window.__ks.session.getState(); return s.learned.length === 0 && s.rounds === 2; }) && (await st(() => document.querySelector('.progress')?.textContent?.includes('0 of 20 today'))));
console.log(results.join('\n'));
console.log(errors.length ? 'ERRORS\n' + errors.join('\n') : 'no console errors');
await browser.close();
