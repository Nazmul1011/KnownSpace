// Validates expansion entries in src/domain/knowledge/data/more/*.ts (or one file).
//   node scripts/validate-content.mjs                         # all files
//   node scripts/validate-content.mjs src/domain/knowledge/data/more/food.ts --expect food:24
// Exit code 1 on any error. Warnings (spellings) do not fail.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const only = args.find((a) => a.endsWith('.ts'));
const allowMissing = args.includes('--allow-missing-images');
import { readFileSync as rf } from 'node:fs';
const pending = new Set((existsSync('art/pending-images.tsv') ? rf('art/pending-images.tsv', 'utf8') : '').split('\n').map((l) => l.split('\t')[0]).filter(Boolean));
const expect = {};
for (let i = 0; i < args.length; i++) if (args[i] === '--expect') for (const pair of args[i + 1].split(',')) {
  const [c, n] = pair.split(':');
  expect[c] = Number(n);
}

const CATS = ['science', 'nature', 'history', 'technology', 'psychology', 'space', 'geography', 'design', 'architecture', 'food', 'culture', 'business', 'animals', 'everyday', 'body', 'inventions'];
const MOODS = ['surprising', 'useful', 'strange', 'beautiful', 'mind-bending'];
const BANNED = ['did you know', 'fascinating', 'mind-blowing', 'amazing', 'incredible', 'unlock', 'supercharge'];
const US = ['color', 'colors', 'colored', 'center', 'centers', 'behavior', 'favorite', 'gray', 'organize', 'organized', 'realize', 'realized', 'analyze', 'fiber', 'defense', 'traveled', 'neighbor', 'flavor', 'flavors', 'honor', 'labor', 'humor', 'aluminum', 'meters', 'liters', 'kilometers', 'centimeters', 'millimeters', 'theater', 'catalog', 'jewelry', 'mold', 'program'];

// ids that already exist: the base 75 (catalog.ts) + every expansion file
const baseSrc = readFileSync('src/domain/knowledge/data/catalog.ts', 'utf8');
const baseIds = new Set([...baseSrc.matchAll(/\{\s*id: '([^']+)',\s*title:/g)].map((m) => m[1]));
const moreDir = 'src/domain/knowledge/data/more';
const files = readdirSync(moreDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts').map((f) => `${moreDir}/${f}`);
const all = {};
for (const f of files) {
  try {
    const mod = await import(pathToFileURL(resolve(f)).href + `?t=${Date.now()}`);
    all[f] = mod.entries ?? [];
  } catch (e) {
    all[f] = [];
    if (!only || resolve(only) === resolve(f)) {
      console.error(`ERROR ${f}: cannot load — ${e.message}`);
      process.exitCode = 1;
    }
  }
}
const everyId = new Set([...baseIds, ...Object.values(all).flat().map((e) => e.id)]);
const lucide = (n) => existsSync(`node_modules/lucide-react/dist/esm/icons/${n}.mjs`);
const words = (s) => (s ?? '').trim().split(/\s+/).filter(Boolean).length;
const sentences = (s) => (s ?? '').split(/[.?!](\s|$)/).filter((x) => x && x.trim().length > 2).length;

let errors = 0;
let warns = 0;
const seen = new Map();
for (const [id] of [...baseIds].map((x) => [x])) seen.set(id, 'catalog.ts');

for (const [f, list] of Object.entries(all)) {
  const check = !only || resolve(only) === resolve(f);
  const counts = {};
  for (const e of list) {
    const err = (m) => {
      if (check) {
        console.error(`ERROR ${basename(f)} ${e.id ?? '?'}: ${m}`);
        errors++;
      }
    };
    const warn = (m) => {
      if (check) {
        console.warn(`warn  ${basename(f)} ${e.id}: ${m}`);
        warns++;
      }
    };
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id ?? '')) err('id must be kebab-case');
    if (seen.has(e.id)) err(`duplicate id (also in ${seen.get(e.id)})`);
    seen.set(e.id, basename(f));
    counts[e.category] = (counts[e.category] ?? 0) + 1;
    if (!CATS.includes(e.category)) err(`bad category ${e.category}`);
    if (!e.title || e.title.length > 64) err('title missing or longer than 64 chars');
    if (!e.subcategory) err('subcategory missing');
    const v = e.visual ?? {};
    if (v.kind === 'photo' || v.kind === 'object') {
      if (!v.image) err('visual.image missing');
      else if (!existsSync(`art/raw/${v.image}.png`)) {
        if (allowMissing && pending.has(v.image)) warn(`image pending (queued in art/pending-images.tsv)`);
        else err(`image art/raw/${v.image}.png not found${allowMissing ? ' and not queued in art/pending-images.tsv' : ''}`);
      }
    } else if (v.kind === 'map') {
      if (typeof v.lat !== 'number' || typeof v.lon !== 'number' || !v.place) err('map needs lat, lon, place');
    } else if (v.kind === 'type') {
      if (!e.stat) err('type cards need a stat (it is what the card shows)');
    } else err(`visual.kind must be photo, object, map or type (got ${v.kind})`);
    if (words(e.description) > 55) err(`description ${words(e.description)} words (max 55)`);
    const sc = sentences(e.description);
    if (sc < 2 || sc > 3) warn(`description has ${sc} sentences (aim for 2–3)`);
    if (words(e.shortFact) > 18) err(`shortFact ${words(e.shortFact)} words (max 18)`);
    if (words(e.interestingFact) > 35) err(`interestingFact ${words(e.interestingFact)} words (max 35)`);
    if (words(e.oneMoreThing) > 40) err(`oneMoreThing ${words(e.oneMoreThing)} words (max 40)`);
    if (!Array.isArray(e.facts) || e.facts.length !== 3) err('facts must have exactly 3 items');
    else e.facts.forEach((x, k) => words(x) > 16 && err(`fact ${k + 1} ${words(x)} words (max 16)`));
    if (e.stat && (!e.stat.value || !e.stat.label || words(e.stat.label) > 3)) err('stat needs value and a 1–3 word label');
    if (!['established', 'debated'].includes(e.certainty)) err('certainty must be established or debated');
    if (e.certainty === 'debated' && !e.caveat) err('debated entries need a caveat');
    if (e.certainty !== 'debated' && e.caveat) err('caveat only on debated entries');
    if (!Array.isArray(e.moods) || e.moods.length < 1 || e.moods.length > 3 || e.moods.some((m) => !MOODS.includes(m))) err('moods: 1–3 of ' + MOODS.join(', '));
    if (!Array.isArray(e.keywords) || e.keywords.length < 4 || e.keywords.length > 8 || e.keywords.some((k) => k !== k.toLowerCase())) err('keywords: 4–8 lowercase');
    if (!Array.isArray(e.relatedTopics) || e.relatedTopics.length < 3 || e.relatedTopics.length > 5) err('relatedTopics: 3–5 ids');
    else for (const r of e.relatedTopics) {
      if (r === e.id) err('relatedTopics includes itself');
      else if (!everyId.has(r)) err(`relatedTopics: unknown id ${r}`);
    }
    if (!e.icon || !lucide(e.icon)) err(`icon ${e.icon} not found in lucide-react`);
    if (![1, 2, 3].includes(e.difficulty)) err('difficulty must be 1, 2 or 3');
    if (!(e.estimatedReadTime >= 30 && e.estimatedReadTime <= 90)) err('estimatedReadTime must be 30–90');
    if (!e.source?.label || !/^https:\/\//.test(e.source?.url ?? '')) err('source needs label and https url');
    const prose = [e.title, e.description, e.shortFact, e.interestingFact, e.oneMoreThing, ...(e.facts ?? []), e.caveat ?? ''].join(' ');
    if (prose.includes('!')) err('no exclamation marks');
    for (const b of BANNED) if (prose.toLowerCase().includes(b)) err(`banned phrase "${b}"`);
    for (const w of US) if (new RegExp(`\\b${w}\\b`, 'i').test(prose)) warn(`US spelling? "${w}"`);
  }
  if (check) {
    for (const [c, n] of Object.entries(expect)) if ((counts[c] ?? 0) !== n) {
      console.error(`ERROR ${basename(f)}: expected ${n} ${c} entries, found ${counts[c] ?? 0}`);
      errors++;
    }
    console.log(`${basename(f)}: ${list.length} entries ${JSON.stringify(counts)}`);
  }
}
console.log(`${errors} error(s), ${warns} warning(s)`);
if (errors) process.exitCode = 1;
