/**
 * Knowledge constellations: hairline links between related objects. They appear only when relevant —
 * while you hover something, and (once you've learned a handful of things) faintly between what you know.
 */
import { useMemo } from 'react';
import { byId } from '@/domain/knowledge';
import { useUI } from '@/domain/ui-state';
import { useVisitor } from '@/domain/visitor';

export interface Placed {
  key: string;
  objId?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

function curve(a: Placed, b: Placed) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(160, len * 0.18);
  return `M${a.x},${a.y} Q${mx - (dy / len) * bend},${my + (dx / len) * bend} ${b.x},${b.y}`;
}

function nearestOf(placed: Map<string, Placed>, objId: string, from: Placed, maxDist: number) {
  let best: Placed | undefined;
  let bd = maxDist;
  for (const p of placed.values()) {
    if (p.objId !== objId || p.key === from.key) continue;
    const d = Math.hypot(p.x - from.x, p.y - from.y);
    if (d < bd) {
      bd = d;
      best = p;
    }
  }
  return best;
}

export function Connections({ placed }: { placed: Map<string, Placed> }) {
  const hoverKey = useUI((s) => s.hoverKey);
  const show = useVisitor((s) => s.settings.connections);
  const learned = useVisitor((s) => s.learned);
  const map = placed;

  const hoverLinks = useMemo(() => {
    if (!show || !hoverKey || !map) return [];
    const from = map.get(hoverKey);
    const o = from?.objId ? byId[from.objId] : undefined;
    if (!from || !o) return [];
    return o.relatedTopics
      .map((id) => nearestOf(map, id, from, 3400))
      .filter((p): p is Placed => !!p)
      .map((p) => ({ key: `${from.key}>${p.key}`, d: curve(from, p), to: p }));
  }, [hoverKey, show, map]);

  const learnedLinks = useMemo(() => {
    if (!show || !map || Object.keys(learned).length < 5) return [];
    const mine = [...map.values()].filter((p) => p.objId && learned[p.objId]);
    const out: { key: string; d: string }[] = [];
    for (const a of mine) {
      const o = byId[a.objId!];
      for (const b of mine) {
        if (a.key >= b.key || !b.objId || !o.relatedTopics.includes(b.objId)) continue;
        if (Math.hypot(a.x - b.x, a.y - b.y) > 2600) continue;
        out.push({ key: `${a.key}~${b.key}`, d: curve(a, b) });
      }
    }
    return out;
  }, [learned, show, map]);

  if (!hoverLinks.length && !learnedLinks.length) return null;
  return (
    <svg className="links" aria-hidden>
      {learnedLinks.map((l) => (
        <path key={l.key} d={l.d} className="link link--learned" />
      ))}
      {hoverLinks.map((l) => (
        <g key={l.key}>
          <path d={l.d} className="link link--hover" pathLength={1} />
          <circle cx={l.to.x} cy={l.to.y} r={5} className="link-dot" />
        </g>
      ))}
    </svg>
  );
}
