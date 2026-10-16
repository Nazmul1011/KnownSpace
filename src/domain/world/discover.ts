/** Choosing what to show: daily picks, Inspire Me (70% you, 30% unexpected), Surprise Me, search and topics. */
import { byCategory, byId, objects, categories, categoryById, type CategoryId, type KnowledgeObject, type Mood } from '@/domain/knowledge';
import type { Cam } from './camera';
import { covered, footprint, type Constellation } from './constellation';
import { CELL_H, CELL_W, getCell, type HomeContext } from './layout';
import { hash, rng } from '@/shared/lib/rng';

type Affinity = Partial<Record<CategoryId, number>>;

function weightOf(cat: CategoryId, affinity: Affinity) {
  const total = Object.values(affinity).reduce((a, b) => a + (b ?? 0), 0);
  if (!total) return 1;
  return 1 + ((affinity[cat] ?? 0) / total) * 12;
}

function weightedPick(r: ReturnType<typeof rng>, pool: KnowledgeObject[], w: (o: KnowledgeObject) => number) {
  const sum = pool.reduce((s, o) => s + w(o), 0);
  let t = r.next() * sum;
  for (const o of pool) {
    t -= w(o);
    if (t <= 0) return o;
  }
  return pool[pool.length - 1];
}

/** Five things for today, stable for the whole day, gently tilted toward what you like. */
export function dailyPicks(dateKey: string, affinity: Affinity, n = 6): string[] {
  const r = rng(hash('daily', dateKey));
  const out: KnowledgeObject[] = [];
  const pool = objects.filter((o) => o.visual.kind === 'photo' || o.visual.kind === 'object');
  while (out.length < n) {
    const left = pool.filter((o) => !out.includes(o) && !out.some((x) => x.category === o.category));
    if (!left.length) break;
    out.push(weightedPick(r, left, (o) => weightOf(o.category, affinity)));
  }
  return out.map((o) => o.id);
}

export function topCategories(affinity: Affinity, n = 3): CategoryId[] {
  return (Object.entries(affinity) as [CategoryId, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

/** ~70% from what you keep opening, ~30% from subjects you haven't touched. Never an echo chamber. */
export function inspirePicks(affinity: Affinity, personalize: boolean, recent: Set<string>, filter: CategoryId | null, n = 7): string[] {
  const r = rng(Date.now() >>> 0);
  const fresh = objects.filter((o) => !recent.has(o.id));
  const pool = fresh.length >= n * 2 ? fresh : objects;
  const out: KnowledgeObject[] = [];
  const favourites = personalize ? topCategories(affinity, 4) : [];
  const nPersonal = favourites.length || filter ? Math.round(n * 0.7) : 0;
  const take = (cands: KnowledgeObject[], w: (o: KnowledgeObject) => number) => {
    const left = cands.filter((o) => !out.includes(o));
    if (left.length) out.push(weightedPick(r, left, w));
  };
  for (let k = 0; k < nPersonal; k++) {
    const cands = filter ? pool.filter((o) => o.category === filter) : pool.filter((o) => favourites.includes(o.category));
    take(cands.length ? cands : pool, (o) => weightOf(o.category, affinity));
  }
  while (out.length < n) {
    const cands = pool.filter((o) => !favourites.includes(o.category) && !out.some((x) => x.category === o.category));
    take(cands.length ? cands : pool, () => 1);
    if (!cands.length && out.length >= pool.length) break;
  }
  return r.shuffle(out).map((o) => o.id);
}

/** Cross-subject oddities, one per category. */
export function surprisePicks(recent: Set<string>, n = 7): string[] {
  const r = rng((Date.now() * 7) >>> 0);
  const odd = objects.filter((o) => o.moods.some((m) => m === 'strange' || m === 'surprising' || m === 'mind-bending') && !recent.has(o.id));
  const pool = r.shuffle(odd.length >= n ? odd : objects);
  const out: KnowledgeObject[] = [];
  for (const o of pool) {
    if (out.some((x) => x.category === o.category)) continue;
    out.push(o);
    if (out.length >= n) break;
  }
  return out.map((o) => o.id);
}

export function topicPicks(cat: CategoryId | null, mood: Mood | null, n = 8): string[] {
  let pool = cat ? (byCategory[cat] ?? []) : objects;
  if (mood) {
    const withMood = pool.filter((o) => o.moods.includes(mood));
    if (withMood.length >= 3 || !cat) pool = withMood.length ? withMood : pool;
    else pool = [...withMood, ...pool.filter((o) => !withMood.includes(o))];
  }
  const r = rng(Date.now() >>> 0);
  return (cat ? pool : r.shuffle(pool)).slice(0, n).map((o) => o.id);
}

/* ------------------------------------------------------------------ search */

const stem = (w: string) => w.replace(/(ies)$/, 'y').replace(/(es|s)$/, '');

export interface SearchHit {
  obj: KnowledgeObject;
  score: number;
}

export function searchObjects(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map(stem);
  const hits: SearchHit[] = [];
  for (const o of objects) {
    let score = 0;
    const title = o.title.toLowerCase();
    const cat = categoryById[o.category].label.toLowerCase();
    if (title.includes(q)) score += 10;
    for (const k of o.keywords) {
      if (k === q) score += 9;
      else if (stem(k) === stem(q)) score += 8;
      else if (k.includes(q) || q.includes(k)) score += 4;
    }
    if (cat.startsWith(q) || stem(cat) === stem(q)) score += 5;
    if (o.subcategory.toLowerCase().includes(q)) score += 4;
    for (const w of words) {
      if (title.includes(w)) score += 3;
      if (o.keywords.some((k) => k.includes(w))) score += 2;
      if (o.description.toLowerCase().includes(w)) score += 1;
    }
    if (score > 0) hits.push({ obj: o, score });
  }
  return hits.sort((a, b) => b.score - a.score);
}

export function searchCategories(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return categories.filter((c) => c.label.toLowerCase().startsWith(q) || stem(c.label.toLowerCase()) === stem(q));
}

/* ---------------------------------------------------- finding things again */

export interface Found {
  x: number;
  y: number;
  key: string;
}

/** The instance of an object nearest the camera, searching outward ring by ring. */
export function findNearest(objId: string, cam: Cam, epoch: number, home: HomeContext, constellations: Constellation[]): Found | null {
  const sources = constellations.map((c) => footprint(c));
  let best: Found | null = null;
  let bd = Infinity;
  constellations.forEach((c, k) => {
    for (const it of c.items) {
      if (it.objId !== objId || it.format === 'chip' || it.format === 'note') continue;
      if (covered(it.x, it.y, it.w, it.h, sources, k + 1)) continue;
      const p = { x: it.x, y: it.y };
      const d = Math.hypot(p.x - cam.x, p.y - cam.y);
      if (d < bd) {
        bd = d;
        best = { ...p, key: it.key };
      }
    }
  });
  const ci = Math.round(cam.x / CELL_W);
  const cj = Math.round(cam.y / CELL_H);
  for (let ring = 0; ring <= 6; ring++) {
    for (let j = cj - ring; j <= cj + ring; j++)
      for (let i = ci - ring; i <= ci + ring; i++) {
        if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== ring) continue;
        const cell = getCell(i, j, epoch, home);
        for (const it of cell.items) {
          if (it.objId !== objId || it.format === 'chip' || it.format === 'note') continue;
          if (covered(it.x, it.y, it.w, it.h, sources)) continue;
          const p = { x: it.x, y: it.y };
          const d = Math.hypot(p.x - cam.x, p.y - cam.y);
          if (d < bd) {
            bd = d;
            best = { ...p, key: it.key };
          }
        }
      }
    if (best && ring >= 1) break;
  }
  return best;
}

/** Centre of the nearest cluster about a category. */
export function findCategory(cat: CategoryId, cam: Cam, epoch: number, home: HomeContext) {
  const ci = Math.round(cam.x / CELL_W);
  const cj = Math.round(cam.y / CELL_H);
  for (let ring = 0; ring <= 8; ring++)
    for (let j = cj - ring; j <= cj + ring; j++)
      for (let i = ci - ring; i <= ci + ring; i++) {
        if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== ring) continue;
        const cell = getCell(i, j, epoch, home);
        if (cell.theme !== cat) continue;
        const its = cell.items.filter((it) => it.format !== 'chip');
        const x = its.reduce((s, it) => s + it.x, 0) / its.length;
        const y = its.reduce((s, it) => s + it.y, 0) / its.length;
        return { x, y };
      }
  return null;
}

export const numberWord = (n: number) => ['Nothing', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'][n] ?? String(n);

export { byId };
