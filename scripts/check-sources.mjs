// Fetches every expansion source and flags soft 404s (status 200 but a "not found" / bot-wall page).
//   node scripts/check-sources.mjs
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const dir = 'src/domain/knowledge/data/more';
const all = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
  const m = await import(pathToFileURL(resolve(dir, f)).href);
  for (const e of m.entries) all.push({ id: e.id, file: f, url: e.source.url, label: e.source.label });
}
const BAD = /(page not found|not found|404|error 40|page cannot|doesn.t exist|does not exist|no longer available|access denied|forbidden|just a moment|attention required|captcha|are you a robot|verify you are human)/i;
const out = [];
let k = 0;
async function worker() {
  while (k < all.length) {
    const s = all[k++];
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 20000);
      const r = await fetch(s.url, { redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36', Accept: 'text/html,application/pdf,*/*' } });
      clearTimeout(t);
      const ct = r.headers.get('content-type') ?? '';
      let title = '';
      if (ct.includes('html')) {
        const html = (await r.text()).slice(0, 200000);
        title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').replace(/\s+/g, ' ').trim();
        const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (BAD.test(h1) && !BAD.test(title)) title += ` | h1: ${h1}`;
      } else title = `[${ct.split(';')[0]}]`;
      const flag = r.status !== 200 ? `HTTP ${r.status}` : BAD.test(title) ? 'SOFT-404?' : '';
      out.push({ ...s, status: r.status, title, flag });
    } catch (e) {
      out.push({ ...s, status: 0, title: '', flag: `FETCH ${e.name}` });
    }
  }
}
await Promise.all(Array.from({ length: 10 }, worker));
const flagged = out.filter((o) => o.flag);
for (const o of flagged) console.log(`${o.flag.padEnd(10)} ${o.file} ${o.id}\n           ${o.url}\n           title: ${o.title.slice(0, 120)}`);
console.log(`\n${all.length} sources checked, ${flagged.length} flagged`);
