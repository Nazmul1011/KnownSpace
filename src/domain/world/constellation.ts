/**
 * Constellations are the sets that Inspire Me, Surprise Me, search and the topic picker drop into the world.
 * They never replace anything: an area-preserving "inflation" field pushes the existing world outward to make
 * room, so every object keeps its neighbours and simply drifts aside.
 */
import { baseSize, entryById, packCluster, pickFormat, primaryFormat, type Format, type Item } from './layout';
import { hash, rng } from '@/shared/lib/rng';

export type ConstKind = 'inspire' | 'surprise' | 'search' | 'topic';

export interface Constellation {
  id: string;
  kind: ConstKind;
  cx: number;
  cy: number;
  /** radius of the cleared disc, used by the displacement field */
  r: number;
  label: string;
  eyebrow: string;
  items: Item[];
  createdAt: number;
}

export interface BuildOptions {
  id: string;
  kind: ConstKind;
  ids: string[];
  cx: number;
  cy: number;
  label: string;
  eyebrow: string;
}

export function buildConstellation(o: BuildOptions): Constellation {
  const r = rng(hash('const', o.id));
  const capBox = baseSize('caption');
  const caption: Item = {
    key: `${o.id}:caption`,
    format: 'caption',
    text: o.label,
    tip: o.eyebrow,
    x: o.cx,
    y: o.cy,
    w: capBox.w,
    h: capBox.h,
    s: 1,
    rot: 0,
    float: 0,
    order: 0,
  };

  const items: Item[] = o.ids
    .map((id) => entryById[id])
    .filter(Boolean)
    .map((e, k) => {
      const format: Format = o.kind === 'surprise' ? pickFormat(e, r, 0.35) : r.chance(0.2) ? pickFormat(e, r, 1) : primaryFormat(e);
      const s = format === 'object' ? r.range(0.9, 1.1) : r.range(0.86, 0.98);
      const b = baseSize(format, e);
      return {
        key: `${o.id}:${e.id}`,
        objId: e.id,
        format,
        x: 0,
        y: 0,
        w: b.w * s,
        h: b.h * s,
        s,
        rot: format === 'polaroid' ? r.pick([-1, 1]) * r.range(2, 4.5) : format === 'object' ? r.range(-3, 3) : 0,
        float: format === 'object' ? r.range(7, 11) : 0,
        order: k + 1,
      } satisfies Item;
    });

  // a tight cluster, packed like the world's own clusters, with the caption as its title on top
  const pos = packCluster(
    r,
    o.cx,
    o.cy,
    items.map((it) => ({ w: it.w, h: it.h })),
    [44, 80],
  );
  items.forEach((it, k) => {
    it.x = pos[k].x;
    it.y = pos[k].y;
  });
  let top = Infinity;
  let left = Infinity;
  let right = -Infinity;
  for (const it of items) {
    top = Math.min(top, it.y - it.h / 2);
    left = Math.min(left, it.x - it.w / 2);
    right = Math.max(right, it.x + it.w / 2);
  }
  caption.x = (left + right) / 2;
  caption.y = top - caption.h / 2 + 10;
  const all = [caption, ...items];

  let reach = 0;
  for (const it of all) reach = Math.max(reach, Math.hypot(Math.abs(it.x - o.cx) + it.w / 2, Math.abs(it.y - o.cy) + it.h / 2));

  // where each item enters from: outward for Inspire, from every direction for Surprise
  for (const it of items) {
    const dx = it.x - o.cx;
    const dy = it.y - o.cy;
    const d = Math.hypot(dx, dy) || 1;
    if (o.kind === 'surprise') {
      const a = r.range(0, Math.PI * 2);
      it.from = { x: Math.cos(a) * 2200, y: Math.sin(a) * 1600 };
    } else {
      it.from = { x: (dx / d) * 1500, y: (dy / d) * 1500 };
    }
  }

  return {
    id: o.id,
    kind: o.kind,
    cx: o.cx,
    cy: o.cy,
    r: reach + 120,
    label: o.label,
    eyebrow: o.eyebrow,
    items: all,
    createdAt: Date.now(),
  };
}

/** The area a constellation occupies; world cards inside it step aside (fade out) instead of overlapping. */
export interface FieldSource {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export function footprint(c: Constellation, margin = 90): FieldSource {
  let x0 = Infinity,
    y0 = Infinity,
    x1 = -Infinity,
    y1 = -Infinity;
  for (const it of c.items) {
    x0 = Math.min(x0, it.x - it.w / 2);
    y0 = Math.min(y0, it.y - it.h / 2);
    x1 = Math.max(x1, it.x + it.w / 2);
    y1 = Math.max(y1, it.y + it.h / 2);
  }
  return { x0: x0 - margin, y0: y0 - margin, x1: x1 + margin, y1: y1 + margin };
}

/** Is a card (centre x,y and size) under any of these footprints? */
export function covered(x: number, y: number, w: number, h: number, sources: FieldSource[], from = 0, to = sources.length) {
  for (let k = from; k < to; k++) {
    const f = sources[k];
    if (x + w / 2 > f.x0 && x - w / 2 < f.x1 && y + h / 2 > f.y0 && y - h / 2 < f.y1) return true;
  }
  return false;
}
