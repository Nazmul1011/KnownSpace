import { describe, expect, it } from 'vitest';
import { objects } from '@/domain/knowledge';
import { CURATED_R, getCell, type HomeContext } from './layout';

const home: HomeContext = { picks: [], firstVisit: false };
const box = (it: { x: number; y: number; w: number; h: number }) => ({ l: it.x - it.w / 2, r: it.x + it.w / 2, t: it.y - it.h / 2, b: it.y + it.h / 2 });

describe('world layout', () => {
  it('builds the same cell for the same place and epoch', () => {
    const a = getCell(2, -1, 0, home).items.map((it) => [it.key, it.x, it.y]);
    const b = getCell(2, -1, 0, { ...home }).items.map((it) => [it.key, it.x, it.y]);
    expect(a).toEqual(b);
  });

  it('rearranges the world for a new epoch', () => {
    const ids = (epoch: number) => getCell(1, 1, epoch, home).items.map((it) => it.objId);
    expect(ids(0)).not.toEqual(ids(1));
  });

  it('shows every object somewhere in the curated neighbourhoods', () => {
    const seen = new Set<string>();
    for (let j = -CURATED_R; j <= CURATED_R; j++)
      for (let i = -CURATED_R; i <= CURATED_R; i++) for (const it of getCell(i, j, 0, home).items) if (it.objId) seen.add(it.objId);
    const missing = objects.filter((o) => !seen.has(o.id)).map((o) => o.id);
    expect(missing).toEqual([]);
  });

  it('never stacks cards on top of each other within a cell', () => {
    for (let j = -2; j <= 2; j++)
      for (let i = -2; i <= 2; i++) {
        const items = getCell(i, j, 0, home).items.filter((it) => !it.stacked);
        for (let a = 0; a < items.length; a++)
          for (let b = a + 1; b < items.length; b++) {
            const p = box(items[a]);
            const q = box(items[b]);
            const overlap = Math.max(0, Math.min(p.r, q.r) - Math.max(p.l, q.l)) * Math.max(0, Math.min(p.b, q.b) - Math.max(p.t, q.t));
            const smaller = Math.min(items[a].w * items[a].h, items[b].w * items[b].h);
            expect(overlap / smaller, `${items[a].key} / ${items[b].key}`).toBeLessThan(0.05);
          }
      }
  });
});
