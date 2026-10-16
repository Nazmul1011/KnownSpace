import { catalog, art, categories, type CatalogEntry, type CategoryId } from '@/domain/knowledge';
import { hash, rng, type Rng } from '@/shared/lib/rng';

export const CELL_W = 2400;
export const CELL_H = 1800;

export type Format =
  | 'object'
  | 'editorial'
  | 'tile'
  | 'polaroid'
  | 'circle'
  | 'type'
  | 'question'
  | 'fact'
  | 'diagram'
  | 'map'
  | 'notif'
  | 'note'
  | 'chip'
  | 'greeting'
  | 'caption';

export interface Item {
  key: string;
  objId?: string;
  format: Format;
  /** centre in world units */
  x: number;
  y: number;
  /** box size in world units (already multiplied by s) */
  w: number;
  h: number;
  /** type scale: the item renders at font-size 16px × s */
  s: number;
  rot: number;
  /** seconds per float cycle, 0 = still */
  float: number;
  hero?: boolean;
  stacked?: boolean;
  text?: string;
  tip?: string;
  link?: string;
  /** chips: the hero they orbit, for a tether line */
  anchor?: { x: number; y: number };
  /** entry offset for items that fly in from outside the view */
  from?: { x: number; y: number };
  order: number;
}

export interface CellLabel {
  text: string;
  sub: string;
  x: number;
  y: number;
}

export type Theme = CategoryId | 'mix' | 'home';

export interface Cell {
  key: string;
  i: number;
  j: number;
  theme: Theme;
  items: Item[];
  label?: CellLabel;
}

export const entryById: Record<string, CatalogEntry> = Object.fromEntries(catalog.map((e) => [e.id, e]));
export const entriesByCategory = catalog.reduce(
  (acc, e) => {
    (acc[e.category] ||= []).push(e);
    return acc;
  },
  {} as Record<CategoryId, CatalogEntry[]>,
);

const CATEGORY_IDS = categories.map((c) => c.id);

/* ---------------------------------------------------------------- formats */

/** Photos get a fixed signature format so the curated world feels art-directed rather than random. */
const PHOTO_PRIMARY: Partial<Record<string, Format>> = {
  'cats-purr': 'editorial',
  'ocean-blue': 'editorial',
  'octopus-color': 'tile',
  aurora: 'tile',
  'whale-song': 'tile',
  'blue-eyes': 'circle',
  'coffee-cherry': 'circle',
  fingerprints: 'circle',
  'here-be-dragons': 'polaroid',
  'pyramid-builders': 'polaroid',
  'tall-ceilings': 'polaroid',
  'moon-illusion': 'editorial',
  'stars-twinkle': 'editorial',
  'sunset-colors': 'tile',
  'trees-water': 'tile',
  'trees-communicate': 'editorial',
  bioluminescence: 'tile',
  'cats-land': 'polaroid',
  'bird-migration': 'editorial',
  'ant-traffic': 'editorial',
  'roman-concrete': 'circle',
  'elevator-floors': 'polaroid',
  'airplane-windows': 'tile',
  'volcano-eruption': 'tile',
  'volcanic-lightning': 'editorial',
  'dead-sea': 'editorial',
  'flying-buttress': 'tile',
  'milk-at-back': 'editorial',
  qwerty: 'polaroid',
};

export function primaryFormat(e: CatalogEntry): Format {
  switch (e.visual.kind) {
    case 'object':
      return art[e.visual.image]?.real ? (['tile', 'editorial', 'polaroid', 'circle'] as Format[])[e.id.length % 4] : 'object';
    case 'photo':
      return PHOTO_PRIMARY[e.id] ?? 'editorial';
    case 'diagram':
      return 'diagram';
    case 'type':
      return 'type';
    case 'map':
      return 'map';
    case 'notif':
      return 'notif';
  }
}

function altFormats(e: CatalogEntry): Format[] {
  if (e.visual.kind === 'object' && art[e.visual.image]?.real)
    return ['tile', 'polaroid', 'editorial', 'fact', 'question'].filter((f) => f !== primaryFormat(e)) as Format[];
  switch (e.visual.kind) {
    case 'object':
      return ['fact', 'question', 'editorial'];
    case 'photo':
      return (['tile', 'polaroid', 'circle', 'editorial', 'fact', 'question'] as Format[]).filter((f) => f !== primaryFormat(e));
    case 'diagram':
    case 'map':
      return ['fact', 'question'];
    case 'type':
      return ['question', 'fact'];
    case 'notif':
      return ['question'];
  }
}

export function pickFormat(e: CatalogEntry, r: Rng, altChance: number): Format {
  return r.chance(altChance) ? r.pick(altFormats(e)) : primaryFormat(e);
}

function imageOf(e: CatalogEntry) {
  return 'image' in e.visual ? e.visual.image : undefined;
}

/** Unscaled box for a format (s = 1). Card heights are fixed; text inside is line-clamped to fit. */
export function baseSize(format: Format, e?: CatalogEntry, text?: string): { w: number; h: number } {
  const img = e && imageOf(e);
  const aspect = img && art[img] ? art[img].aspect : 1;
  switch (format) {
    case 'object': {
      const a = Math.min(1.6, Math.max(0.62, aspect));
      const w = Math.sqrt(300 * 300 * a);
      return { w, h: w / a + 62 };
    }
    case 'editorial':
      return { w: 288, h: 200 + 212 };
    case 'tile': {
      const w = aspect >= 1 ? 380 : 290;
      return { w, h: w / aspect + 56 };
    }
    case 'polaroid':
      return { w: 268, h: 14 + 240 + 66 };
    case 'circle':
      return { w: 244, h: 236 + 70 };
    case 'type':
      return { w: 420, h: 330 };
    case 'question':
      return { w: 360, h: 230 };
    case 'fact':
      return { w: 320, h: 300 };
    case 'diagram':
      return { w: 340, h: 392 };
    case 'map':
      return { w: 300, h: 372 };
    case 'notif':
      return { w: 410, h: 280 };
    case 'note':
      return { w: 280, h: 170 };
    case 'chip':
      return { w: 30 + (text?.length ?? 6) * 9.2, h: 40 };
    case 'greeting':
      return { w: 680, h: 320 };
    case 'caption':
      return { w: 520, h: 230 };
  }
}

function rotationFor(format: Format, r: Rng) {
  switch (format) {
    case 'polaroid':
      return r.pick([-1, 1]) * r.range(2.2, 5);
    case 'note':
      return r.range(-2.5, 2.5);
    case 'editorial':
    case 'fact':
      return r.chance(0.35) ? r.range(-1.6, 1.6) : 0;
    case 'object':
      return r.range(-3, 3);
    default:
      return 0;
  }
}

function floatFor(format: Format, r: Rng) {
  if (format === 'object') return r.range(7, 11);
  if (format === 'chip' || format === 'note') return r.range(9, 13);
  return r.chance(0.25) ? r.range(10, 14) : 0;
}

/* ----------------------------------------------------------------- packing */

interface Box {
  w: number;
  h: number;
  fixed?: { x: number; y: number };
}

/** Places boxes on a widening golden-angle spiral, first fit wins. Gaps vary per box so the cluster breathes unevenly. */
export function packCluster(r: Rng, cx: number, cy: number, boxes: Box[], gap: [number, number], stretch = 1.35) {
  const placed: { x: number; y: number; w: number; h: number; g: number }[] = [];
  const out: { x: number; y: number }[] = [];
  const angle0 = r.range(0, Math.PI * 2);
  for (const b of boxes) {
    const g = r.range(gap[0], gap[1]);
    let pos = b.fixed;
    if (!pos && placed.length === 0) pos = { x: cx, y: cy };
    if (!pos) {
      for (let k = 1; k < 900; k++) {
        const rad = 40 + 22 * Math.pow(k, 0.9);
        const a = angle0 + k * 2.39996 + r.range(-0.25, 0.25);
        const x = cx + Math.cos(a) * rad * stretch;
        const y = cy + Math.sin(a) * rad;
        const hit = placed.some((p) => Math.abs(p.x - x) < (p.w + b.w) / 2 + (p.g + g) / 2 && Math.abs(p.y - y) < (p.h + b.h) / 2 + (p.g + g) / 2);
        if (!hit) {
          pos = { x, y };
          break;
        }
      }
    }
    pos ||= { x: cx, y: cy };
    placed.push({ x: pos.x, y: pos.y, w: b.w, h: b.h, g });
    out.push(pos);
  }
  return out;
}

/* ------------------------------------------------------- the neighbourhoods */

/**
 * Around home the world is curated: every object appears exactly once, grouped into subject
 * "neighbourhoods" — wedges of cells fanning out from home, sized by how many things each subject has.
 * Related subjects sit next to each other around the circle. Later epochs rotate the whole ring,
 * so districts move but keep their neighbours, and reshuffle which object sits in which cell.
 */
export const CURATED_R = 4;

const RING_ORDER: CategoryId[] = [
  'space',
  'science',
  'technology',
  'inventions',
  'everyday',
  'business',
  'design',
  'architecture',
  'history',
  'culture',
  'food',
  'geography',
  'nature',
  'animals',
  'body',
  'psychology',
];

interface Plot {
  theme: CategoryId;
  ids: string[];
  /** first cell of its district: carries the hero and the district label */
  lead: boolean;
}

const planCache = new Map<number, Map<string, Plot>>();

function curatedPlan(epoch: number): Map<string, Plot> {
  const cached = planCache.get(epoch);
  if (cached) return cached;
  // every curated cell except home, ordered by angle around home
  const cells: { i: number; j: number; a: number; d: number }[] = [];
  for (let j = -CURATED_R; j <= CURATED_R; j++)
    for (let i = -CURATED_R; i <= CURATED_R; i++) {
      if (!i && !j) continue;
      const x = i * CELL_W;
      const y = j * CELL_H;
      cells.push({ i, j, a: (Math.atan2(y, x) + Math.PI * 2.5) % (Math.PI * 2), d: Math.hypot(x, y) });
    }
  cells.sort((p, q) => p.a - q.a || p.d - q.d);
  const rot = (epoch * 7) % cells.length;
  const ordered = [...cells.slice(rot), ...cells.slice(0, rot)];

  // hand each subject a run of consecutive cells, in proportion to how many things it has
  const total = catalog.length;
  const runs: { cat: CategoryId; cells: typeof cells }[] = [];
  let cursor = 0;
  let acc = 0;
  RING_ORDER.forEach((cat, k) => {
    acc += (entriesByCategory[cat] ?? []).length;
    const end = k === RING_ORDER.length - 1 ? ordered.length : Math.round((acc / total) * ordered.length);
    runs.push({ cat, cells: ordered.slice(cursor, Math.max(cursor + 1, end)) });
    cursor = Math.max(cursor + 1, end);
  });

  const plan = new Map<string, Plot>();
  for (const run of runs) {
    const r = rng(hash('district', run.cat, epoch));
    const pool = r.shuffle(entriesByCategory[run.cat] ?? []).map((e) => e.id);
    const hero = HERO[run.cat];
    if (hero && pool.includes(hero)) {
      pool.splice(pool.indexOf(hero), 1);
      pool.unshift(hero);
    }
    // nearest cell to home leads; deal the subject's objects round the district
    const byDist = [...run.cells].sort((p, q) => p.d - q.d);
    const buckets: string[][] = byDist.map(() => []);
    pool.forEach((id, k) => buckets[k % buckets.length].push(id));
    byDist.forEach((c, k) => plan.set(`${c.i},${c.j}`, { theme: run.cat, ids: buckets[k], lead: k === 0 }));
  }
  planCache.set(epoch, plan);
  const stalePlan = planCache.keys().next().value;
  if (planCache.size > 8 && stalePlan !== undefined) planCache.delete(stalePlan);
  return plan;
}

export function isCurated(i: number, j: number) {
  return Math.abs(i) <= CURATED_R && Math.abs(j) <= CURATED_R;
}

export function themeFor(i: number, j: number, epoch: number): Theme {
  if (!i && !j) return 'home';
  if (isCurated(i, j)) return curatedPlan(epoch).get(`${i},${j}`)?.theme ?? 'mix';
  const h = hash('theme', i, j, epoch);
  if (h % 10 < 3) return 'mix';
  return CATEGORY_IDS[hash('cat', i, j, epoch) % CATEGORY_IDS.length];
}

/* ------------------------------------------------------------ compositions */

const HERO: Partial<Record<CategoryId, string>> = {
  animals: 'hummingbird-hover',
  space: 'black-holes',
  science: 'ice-floats',
  nature: 'trees-water',
  history: 'roman-concrete',
  food: 'honey-spoil',
  geography: 'volcano-eruption',
  psychology: 'doorway-effect',
  body: 'blue-eyes',
  design: 'stop-sign',
  architecture: 'flying-buttress',
  culture: 'silbo-gomero',
  business: 'lego-1958',
  everyday: 'airplane-windows',
  technology: 'noise-cancelling',
  inventions: 'printing-press',
};

interface Satellite {
  text: string;
  tip: string;
  link: string;
}

/** Visual storytelling: a hero surrounded by the ideas it connects to. */
export const SATELLITES: Record<string, Satellite[]> = {
  'hummingbird-hover': [
    { text: 'Wings', tip: 'Their wings trace a figure-eight, giving lift on both the down- and the upstroke.', link: 'hummingbird-hover' },
    { text: 'Metabolism', tip: 'On cold nights many species drop into torpor, slowing heart and body to save energy.', link: 'hummingbird-hover' },
    { text: 'Flight', tip: 'Many ruby-throated hummingbirds cross the Gulf of Mexico without stopping.', link: 'bird-migration' },
    { text: 'Colour', tip: 'The shimmer on their throats comes from feather structure, not pigment.', link: 'blue-eyes' },
    { text: 'Memory', tip: 'They remember which flowers they have emptied, and roughly when those will refill.', link: 'memory-rebuilt' },
  ],
  'black-holes': [
    { text: 'Gravity', tip: 'Past the event horizon, gravity is strong enough that not even light gets out.', link: 'black-holes' },
    { text: 'Time', tip: 'Clocks run slower in strong gravity. GPS satellites have to correct for the same effect.', link: 'gps' },
    { text: 'Light', tip: 'Mass bends passing light. Astronomers call it gravitational lensing.', link: 'black-holes' },
    { text: 'Relativity', tip: 'General relativity allowed for black holes in 1916. The first image came in 2019.', link: 'gps' },
    { text: 'Stars', tip: 'Most stellar black holes form when a very massive star collapses at the end of its life.', link: 'stars-twinkle' },
  ],
};

const MIX_LABELS = [
  'Something interesting',
  'Worth knowing',
  "Here's something strange.",
  'One small thing about the world.',
  'A tiny fact with a big story.',
  "You probably haven't thought about this.",
  'Keep exploring.',
];

/* ------------------------------------------------------------- cell builder */

/**
 * Last pass over a finished cluster: nothing may touch. Small things (chips, notes) give way first,
 * then ordinary cards; the hero and the greeting never move.
 */
function separate(items: Item[], gap = 28) {
  const rank = (it: Item) => (it.format === 'greeting' ? 3 : it.hero ? 2 : it.format === 'chip' || it.format === 'note' ? 0 : 1);
  for (let iter = 0; iter < 400; iter++) {
    let moved = false;
    for (let a = 0; a < items.length; a++)
      for (let b = a + 1; b < items.length; b++) {
        const A = items[a];
        const B = items[b];
        const ox = (A.w + B.w) / 2 + gap - Math.abs(A.x - B.x);
        const oy = (A.h + B.h) / 2 + gap - Math.abs(A.y - B.y);
        if (ox <= 0 || oy <= 0) continue;
        moved = true;
        const [fixed, mover] = rank(A) >= rank(B) ? [A, B] : [B, A];
        const both = rank(A) === rank(B) && rank(A) < 2;
        const share = both ? 0.5 : 1;
        if (ox < oy) {
          const dir = Math.sign(mover.x - fixed.x) || 1;
          mover.x += dir * (ox + 1) * share;
          if (both) fixed.x -= dir * (ox + 1) * share;
        } else {
          const dir = Math.sign(mover.y - fixed.y) || 1;
          mover.y += dir * (oy + 1) * share;
          if (both) fixed.y -= dir * (oy + 1) * share;
        }
      }
    if (!moved) break;
  }
  // anything small that still can't find room is left out rather than drawn on top of something
  const hit = (A: Item, B: Item) => Math.abs(A.x - B.x) < (A.w + B.w) / 2 + 4 && Math.abs(A.y - B.y) < (A.h + B.h) / 2 + 4;
  for (let k = items.length - 1; k >= 0; k--) {
    const it = items[k];
    if (rank(it) !== 0) continue;
    if (items.some((o) => o !== it && hit(it, o))) items.splice(k, 1);
  }
}

function makeItem(cellKey: string, e: CatalogEntry, format: Format, s: number, r: Rng, order: number, extra: Partial<Item> = {}): Item {
  const b = baseSize(format, e);
  return {
    key: `${cellKey}:${e.id}:${format}`,
    objId: e.id,
    format,
    x: 0,
    y: 0,
    w: b.w * s,
    h: b.h * s,
    s,
    rot: rotationFor(format, r),
    float: floatFor(format, r),
    stacked: format === 'editorial' && r.chance(0.3),
    order,
    ...extra,
  };
}

function finishCluster(r: Rng, items: Item[], cx: number, cy: number, gap: [number, number]) {
  const pos = packCluster(
    r,
    cx,
    cy,
    items.map((it) => ({ w: it.w, h: it.h })),
    gap,
  );
  items.forEach((it, k) => {
    it.x = pos[k].x;
    it.y = pos[k].y;
  });
}

function addSatellites(cellKey: string, hero: Item, r: Rng, out: Item[]) {
  const sats = hero.objId ? SATELLITES[hero.objId] : undefined;
  if (!sats) return;
  const rx = hero.w / 2 + 120;
  const ry = hero.h / 2 + 70;
  const start = r.range(-0.4, 0.4) - Math.PI / 2;
  const others = out.filter((it) => it !== hero);
  const hits = (x: number, y: number, w: number, h: number) =>
    others.some((o) => Math.abs(o.x - x) < (o.w + w) / 2 + 18 && Math.abs(o.y - y) < (o.h + h) / 2 + 18);
  sats.forEach((sat, k) => {
    const a0 = start + (k / sats.length) * Math.PI * 2;
    const b = baseSize('chip', undefined, sat.text);
    // nudge a chip outward (then sideways) until it sits in clear space
    let a = a0;
    let f = 1;
    for (let tries = 0; tries < 24 && hits(hero.x + Math.cos(a) * rx * f, hero.y + Math.sin(a) * ry * f, b.w, b.h); tries++) {
      if (f < 1.5) f += 0.1;
      else {
        f = 1;
        a = a0 + (tries % 2 ? 1 : -1) * 0.12 * Math.ceil(tries / 2);
      }
    }
    out.push({
      key: `${cellKey}:sat:${hero.objId}:${sat.text}`,
      format: 'chip',
      objId: sat.link,
      link: sat.link,
      text: sat.text,
      tip: sat.tip,
      x: hero.x + Math.cos(a) * rx * f,
      y: hero.y + Math.sin(a) * ry * f,
      w: b.w,
      h: b.h,
      s: 1,
      rot: 0,
      float: r.range(8, 12),
      anchor: { x: hero.x, y: hero.y },
      order: hero.order + 1 + k,
    });
  });
}

export interface HomeContext {
  picks: string[];
  firstVisit: boolean;
}

function buildHome(ctx: HomeContext): Cell {
  const key = '0,0';
  const r = rng(hash('home', ctx.picks.join(',')));
  const g = baseSize('greeting');
  const greeting: Item = {
    key: `${key}:greeting`,
    format: 'greeting',
    text: ctx.firstVisit ? 'first' : 'daily',
    x: 0,
    y: 0,
    w: g.w,
    h: g.h,
    s: 1,
    rot: 0,
    float: 0,
    order: 0,
  };
  const items: Item[] = [greeting];
  ctx.picks.forEach((id, k) => {
    const e = entryById[id];
    if (!e) return;
    items.push(makeItem(key, e, primaryFormat(e), r.range(0.92, 1.08), r, k + 1));
  });
  const pos = packCluster(
    r,
    0,
    0,
    items.map((it, k) => ({ w: it.w, h: it.h, fixed: k === 0 ? { x: 0, y: 0 } : undefined })),
    [90, 150],
    1.5,
  );
  items.forEach((it, k) => {
    it.x = pos[k].x;
    it.y = pos[k].y;
  });
  separate(items);
  return { key, i: 0, j: 0, theme: 'home', items };
}

export function buildCell(i: number, j: number, epoch: number, home: HomeContext): Cell {
  if (i === 0 && j === 0) return buildHome(home);
  const key = `${i},${j}`;
  const theme = themeFor(i, j, epoch);
  const r = rng(hash('cell', i, j, epoch));
  const curated = isCurated(i, j);
  const plot = curated ? curatedPlan(epoch).get(key) : undefined;
  const cx = i * CELL_W + r.range(-180, 180);
  const cy = j * CELL_H + r.range(-130, 130);
  const altChance = curated ? (epoch === 0 ? 0.14 : 0.3) : 0.42;

  let chosen: CatalogEntry[];
  let heroId: string | undefined;
  if (plot) {
    chosen = plot.ids.map((id) => entryById[id]).filter(Boolean);
    heroId = plot.lead ? chosen[0]?.id : undefined;
  } else if (theme === 'mix' || theme === 'home') {
    const n = r.int(5, 7);
    const pool = r.shuffle(catalog);
    const seen = new Set<CategoryId>();
    chosen = [];
    for (const e of pool) {
      if (seen.has(e.category)) continue;
      seen.add(e.category);
      chosen.push(e);
      if (chosen.length >= n) break;
    }
  } else {
    const all = entriesByCategory[theme] ?? [];
    const others = catalog.filter((e) => e.category !== theme);
    chosen = r.shuffle(all).slice(0, r.int(Math.min(4, all.length), Math.min(7, all.length)));
    const extra = r.int(0, 2);
    for (let k = 0; k < extra; k++) chosen.push(r.pick(others));
    heroId = r.chance(0.5) ? HERO[theme] : undefined;
    if (heroId && !chosen.some((e) => e.id === heroId)) chosen.unshift(entryById[heroId]);
  }
  // hero first, de-duplicated
  const uniq = new Map<string, CatalogEntry>();
  if (heroId && entryById[heroId]) uniq.set(heroId, entryById[heroId]);
  for (const e of chosen) if (e) uniq.set(e.id, e);
  chosen = [...uniq.values()];

  const items: Item[] = chosen.map((e, k) => {
    const isHero = e.id === heroId;
    const format = isHero ? primaryFormat(e) : pickFormat(e, r, altChance);
    const s = isHero ? (format === 'type' ? 1.25 : 1.42) : format === 'object' ? r.range(0.86, 1.18) : r.range(0.84, 1.06);
    return makeItem(key, e, format, s, r, k, { hero: isHero });
  });
  // wherever the whale surfaces, it gets a big stage and a note
  const whale = items.find((it) => it.objId === 'whale-song');
  if (whale && !whale.hero) {
    whale.s = 1.5;
    const b = baseSize(whale.format, entryById['whale-song']);
    whale.w = b.w * whale.s;
    whale.h = b.h * whale.s;
  }

  finishCluster(r, items, cx, cy, [70, 150]);

  if (whale) {
    const b = baseSize('note');
    items.push({
      key: `${key}:note:whale`,
      format: 'note',
      objId: 'whale-song',
      link: 'whale-song',
      text: 'Whales can communicate across enormous distances through low-frequency sounds.',
      x: whale.x + whale.w / 2 + b.w / 2 - 30,
      y: whale.y + whale.h / 2 - 10,
      w: b.w,
      h: b.h,
      s: 1,
      rot: 2,
      float: 11,
      order: whale.order + 1,
    });
  }
  const hero = items[0];
  if (hero?.hero) addSatellites(key, hero, r, items);
  separate(items);

  // label floats above the cluster's top-left corner; inside a district only its lead cell is labelled
  let minX = Infinity,
    minY = Infinity;
  for (const it of items) {
    minX = Math.min(minX, it.x - it.w / 2);
    minY = Math.min(minY, it.y - it.h / 2);
  }
  const things = items.filter((it) => it.objId && it.format !== 'chip' && it.format !== 'note').length;
  let label: CellLabel | undefined;
  if (plot) {
    // every cluster carries its subject; the first one of a neighbourhood also says how many are around
    const n = (entriesByCategory[plot.theme] ?? []).length;
    label = {
      text: categoryLabel(plot.theme),
      sub: plot.lead ? `${n} things nearby` : `${things} things`,
      x: minX,
      y: minY - 90,
    };
  } else if (theme === 'mix') label = { text: MIX_LABELS[hash('mixlabel', i, j, epoch) % MIX_LABELS.length], sub: `${things} things`, x: minX, y: minY - 90 };
  else label = { text: categoryLabel(theme), sub: `${things} things`, x: minX, y: minY - 90 };
  return { key, i, j, theme, items, label };
}

/* ---------------------------------------------------------------- caching */

const cache = new Map<string, Cell>();
let cacheStamp = '';

export function getCell(i: number, j: number, epoch: number, home: HomeContext): Cell {
  const stamp = `${epoch}|${home.picks.join(',')}|${home.firstVisit}`;
  if (stamp !== cacheStamp) {
    cache.clear();
    cacheStamp = stamp;
  }
  const k = `${i},${j}`;
  let c = cache.get(k);
  if (!c) {
    c = buildCell(i, j, epoch, home);
    cache.set(k, c);
    const stale = cache.keys().next().value;
    if (cache.size > 600 && stale !== undefined) cache.delete(stale);
  }
  return c;
}

function categoryLabel(theme: Theme) {
  return categories.find((c) => c.id === theme)?.label ?? '';
}

export function cellRange(x0: number, y0: number, x1: number, y1: number) {
  return {
    i0: Math.floor(x0 / CELL_W + 0.5),
    i1: Math.floor(x1 / CELL_W + 0.5),
    j0: Math.floor(y0 / CELL_H + 0.5),
    j1: Math.floor(y1 / CELL_H + 0.5),
  };
}
