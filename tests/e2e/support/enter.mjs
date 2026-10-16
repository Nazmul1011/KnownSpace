// Every load starts on the landing page; QA scripts click through it like a person would.
export async function enter(page, settle = 500) {
  // the loading screen lifts first (.is-ready), then the headline and button fade in
  const cta = await page.waitForSelector('.intro.is-ready .pill--ink', { timeout: 10000 }).catch(() => null);
  if (!cta) return;
  await new Promise((r) => setTimeout(r, 1300));
  await cta.click();
  await page.waitForFunction(() => !document.querySelector('.intro') && !!document.querySelector('.canvas:not(.is-veiled)'), { timeout: 8000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, settle));
}
