// End-to-end interaction pass in headless Chrome. Fails loudly on page errors.
//   node tests/e2e/flow.e2e.mjs [--shots]
import puppeteer from 'puppeteer-core';
import { enter } from './support/enter.mjs';
const shots = process.argv.includes('--shots');
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
page.on('console', (m) => m.type() === 'error' && errors.push('CONSOLE ' + m.text().slice(0, 300)));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let n = 0;
const results = [];
const check = (name, ok, extra = '') => { results.push(`${ok ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`); };
const shot = async (name) => shots && page.screenshot({ path: `qa-shots/flow-${String(++n).padStart(2, '0')}-${name}.png` });
const st = (fn) => page.evaluate(fn);

await page.evaluateOnNewDocument(() => localStorage.clear());
await page.goto('http://127.0.0.1:5340/', { waitUntil: 'networkidle0' });
await sleep(800);
check('intro shows on first visit', await page.$('.intro') !== null);
await shot('intro');
await page.click('.intro .pill--ink');
await sleep(1700);
check('intro closes into canvas', (await page.$('.intro')) === null && (await page.$('.canvas')) !== null);
check('canvas greets by time of day', await st(() => (document.querySelector('.greeting-title')?.textContent ?? '').length > 5));
await shot('canvas');

// drag
const cam0 = await st(() => ({ ...window.__ks.camera.get() }));
await page.mouse.move(700, 600);
await page.mouse.down();
for (let k = 1; k <= 12; k++) { await page.mouse.move(700 - k * 25, 600 - k * 12); await sleep(16); }
await page.mouse.up();
await sleep(900);
const cam1 = await st(() => ({ ...window.__ks.camera.get() }));
check('drag pans the camera', Math.hypot(cam1.x - cam0.x, cam1.y - cam0.y) > 200, `moved ${Math.round(Math.hypot(cam1.x - cam0.x, cam1.y - cam0.y))}`);
check('drag clears the first coach mark', await st(() => window.__ks.user.getState().onboarding.dragged));

// wheel zoom
await page.keyboard.down('Control');
await page.mouse.move(720, 450);
await page.mouse.wheel({ deltaY: -200 });
await page.keyboard.up('Control');
await sleep(300);
const cam2 = await st(() => ({ ...window.__ks.camera.get() }));
check('ctrl+wheel zooms in gently', cam2.z > cam1.z && cam2.z < cam1.z * 1.6, `${cam1.z.toFixed(2)} → ${cam2.z.toFixed(2)}`);
await st(() => window.__ks.camera.jump({ x: 0, y: 30, z: 0.78 }));
await sleep(900);

// click an object near the centre-right
const target = await st(() => {
  const els = [...document.querySelectorAll('.kitem button.ko')].filter((b) => !b.closest('.kitem')?.dataset.format?.match(/chip|note/));
  const vis = els.map((b) => ({ b, r: b.getBoundingClientRect() })).filter(({ r }) => { const cx = r.left + r.width / 2, cy = r.top + r.height / 2; return cx > 150 && cx < 1290 && cy > 130 && cy < 770 && r.width > 60; });
  const pick = vis[0];
  if (!pick) return null;
  pick.b.setAttribute('data-qa', 'target');
  return { x: pick.r.left + pick.r.width / 2, y: pick.r.top + pick.r.height / 2, label: pick.b.getAttribute('aria-label') };
});
check('found a clickable object in view', !!target, target?.label);
if (target) {
  await page.mouse.click(target.x, target.y);
  await sleep(1100);
  const title = await st(() => document.querySelector('#km-title')?.textContent);
  check('click opens the detail view', !!title, title);
  check('url carries ?k=', await st(() => new URL(location.href).searchParams.has('k')));
  await shot('modal');
  // one more thing
  await st(() => document.querySelector('.km-more-btn')?.scrollIntoView({ block: 'center' }));
  await sleep(300);
  await page.click('.km-more-btn');
  await sleep(500);
  check('one more thing reveals', !!(await page.$('.km-more-text')));
  // save + share labels, then Learned closes the view
  check('share has a label', await st(() => [...document.querySelectorAll('.km-act')].some((b) => b.textContent.trim() === 'Share')));
  check('no learn-another button', !(await page.$('.km-next')));
  await page.click('.km-act');
  await sleep(200);
  check('save recorded', await st(() => window.__ks.user.getState().saved.length === 1));
  await page.click('.km-learn');
  await sleep(1100);
  check('Learned closes the detail view', !(await page.$('.km')));
  check('learned recorded', await st(() => Object.keys(window.__ks.user.getState().learned).length === 1));
  check('header shows session count', await st(() => document.querySelector('.progress')?.textContent?.includes('1 of 20 today')));
  // reopen it to walk related topics
  await st(() => window.__ks.ui.getState().openObject('gps'));
  await sleep(1100);
  await st(() => document.querySelector('.km-rel')?.scrollIntoView({ block: 'center' }));
  await sleep(300);
  const rel1 = await page.$('.km-rel');
  if (rel1) { await rel1.click(); await sleep(700); }
  check('related moves on', (await st(() => window.__ks.ui.getState().modal?.trail.length)) === 2);
  check('trail appears', !!(await page.$('.km-trail')));
  await shot('chain');
  // related
  await st(() => document.querySelector('.km-rel')?.scrollIntoView({ block: 'center' }));
  await sleep(300);
  const rel = await page.$('.km-rel');
  if (rel) { await rel.click(); await sleep(700); }
  check('related opens', (await st(() => window.__ks.ui.getState().modal?.trail.length)) === 3);
  await page.keyboard.press('Escape');
  await sleep(900);
  check('esc closes the modal', (await page.$('.km')) === null);
  check('url cleared', !(await st(() => new URL(location.href).searchParams.has('k'))));
  const cam3 = await st(() => ({ ...window.__ks.camera.get() }));
  check('canvas stays where it was', Math.abs(cam3.x) < 1 && Math.abs(cam3.y - 30) < 1);
}

// keyboard shortcuts
await page.keyboard.press('s');
await sleep(2900);
check('S = show me something adds a constellation', (await st(() => window.__ks.user.getState().constellations.length)) === 1);
const firstId = await st(() => window.__ks.user.getState().constellations[0]?.id);
await page.click('.hud-right .pill--glass');
await sleep(2900);
check('the header button brings a new group (replacing the one it lands on)', await st((f) => { const c = window.__ks.user.getState().constellations; return c.length >= 1 && c[c.length - 1].id !== f; }, firstId));
check('only one discovery button in the header', (await page.$$('.hud-right .pill--glass')).length === 1);
await shot('after-surprise');
const ep = await st(() => window.__ks.user.getState().epoch);
await page.keyboard.press('r');
await sleep(1200);
check('R = refresh bumps epoch', (await st(() => window.__ks.user.getState().epoch)) === ep + 1);
check('toast with undo', !!(await page.$('.toast-action')));
await page.keyboard.press('t');
await sleep(500);
check('T opens topic picker', !!(await page.$('.picker')));
await page.keyboard.press('Escape');
await sleep(300);

// search
await page.click('.search-field input');
await page.keyboard.type('cats', { delay: 30 });
await sleep(400);
const rows = await page.$$('.search-row');
check('search lists results', rows.length >= 3, `${rows.length} rows`);
await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');
await sleep(2600);
check('choosing a result opens it', !!(await st(() => document.querySelector('#km-title')?.textContent)));
await page.keyboard.press('Escape');
await sleep(800);

// visual suggestions in the empty search dropdown
await page.click('.search-field input');
await sleep(500);
const nObj = (await page.$$('.search-obj')).length;
check('search shows two rows of objects', nObj === 16, `${nObj}`);
const objTitle = await st(() => document.querySelector('.search-obj')?.getAttribute('aria-label'));
await page.click('.search-obj');
// the camera may travel a long way first; wait for the detail view (up to 6 s)
await page.waitForFunction(() => !!document.querySelector('#km-title'), { timeout: 6000 }).catch(() => {});
await sleep(300);
check('clicking an object opens it', (await st(() => document.querySelector('#km-title')?.textContent)) === objTitle, objTitle);
await page.keyboard.press('Escape');
await sleep(800);

// collection
await st(() => window.__ks.ui.getState().openCollection('saved'));
await sleep(700);
check('collection shows saved', (await page.$$('.rack-card')).length === 1);
await shot('collection');
await page.keyboard.press('Escape');
await sleep(400);

// reset
await st(() => window.__ks.actions.resetCanvas());
await sleep(1500);
check('reset clears constellations', (await st(() => window.__ks.user.getState().constellations.length)) === 0);

// refresh always returns to the landing page
await page.reload({ waitUntil: 'networkidle0' });
await sleep(700);
check('refresh opens the landing page', !!(await page.$('.intro')) && !(await page.$('.canvas:not(.is-veiled)')));
await enter(page);
check('start exploring enters the canvas', !(await page.$('.intro')) && !!(await page.$('.canvas:not(.is-veiled)')));

// a returning visitor (no storage wipe) also lands on the landing page, with nothing loading behind it
const p2 = await browser.newPage();
await p2.setViewport({ width: 1440, height: 900 });
await p2.goto('http://127.0.0.1:5340/', { waitUntil: 'networkidle0' });
await p2.evaluate(() => localStorage.setItem('knowscape-v1', JSON.stringify({ state: { onboarding: { intro: true, dragged: true, opened: true } }, version: 1 })));
await p2.reload({ waitUntil: 'networkidle0' });
await sleep(800);
check('returning visitor refresh: landing page, canvas hidden behind it', !!(await p2.$('.intro')) && !(await p2.$('.canvas:not(.is-veiled)')));
await p2.close();

// deep link: landing page first, then the object
await page.goto('http://127.0.0.1:5340/?k=tardigrade', { waitUntil: 'networkidle0' });
await sleep(600);
check('deep link also starts on the landing page', !!(await page.$('.intro')));
await enter(page);
await sleep(2600);
check('deep link opens the object', (await st(() => document.querySelector('#km-title')?.textContent)) === 'The tiny animal that survived open space');
await shot('deeplink');

console.log(results.join('\n'));
console.log(errors.length ? '\nERRORS:\n' + errors.join('\n') : '\nno console errors');
await browser.close();
process.exit(results.some((r) => r.startsWith('FAIL')) || errors.length ? 1 : 0);
