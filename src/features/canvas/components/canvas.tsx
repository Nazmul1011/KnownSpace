/**
 * The infinite canvas. Owns gestures (drag, flick, pinch, wheel), culls the world to the cells near the view,
 * applies the constellation field and renders every visible item.
 */
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { byId } from '@/domain/knowledge';
import { useVisitor, useReducedMotion } from '@/domain/visitor';
import { useUI } from '@/domain/ui-state';
import {
  camera,
  type Cam,
  cellRange,
  getCell,
  type Cell,
  type HomeContext,
  type Item,
  covered,
  footprint,
  type Constellation,
  type FieldSource,
} from '@/domain/world';
import { ItemView } from './canvas-item';
import { gesture } from '../model/gesture';
import { Connections, type Placed } from './connections';
import { Greeting } from './greeting';
import { useEntranceZoom } from '../hooks/use-entrance-zoom';
import './canvas.css';

interface Range {
  i0: number;
  i1: number;
  j0: number;
  j1: number;
}

function rangeFor(cam: Cam): Range {
  const hw = camera.vw / 2 / cam.z;
  const hh = camera.vh / 2 / cam.z;
  const m = 760;
  return cellRange(cam.x - hw - m, cam.y - hh - m, cam.x + hw + m, cam.y + hh + m);
}

const sameRange = (a: Range, b: Range) => a.i0 === b.i0 && a.i1 === b.i1 && a.j0 === b.j0 && a.j1 === b.j1;

function lodFor(z: number) {
  return z < 0.36 ? 'far' : z < 0.66 ? 'mid' : z < 1.3 ? 'near' : 'close';
}

export function Canvas({ home, veiled = false }: { home: HomeContext; veiled?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<Range>(() => rangeFor(camera.get()));
  const reduced = useReducedMotion();
  const epoch = useVisitor((s) => s.epoch);
  const constellations = useVisitor((s) => s.constellations);
  const filter = useUI((s) => s.filter);
  const pulseKey = useUI((s) => s.pulseKey);
  const surprising = useUI((s) => s.surprising);
  const modalOpen = useUI((s) => !!s.modal);

  /* camera wiring */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const world = worldRef.current;
    if (!root || !world) return;
    camera.attach(root, [world]);
    const ro = new ResizeObserver(() => camera.setViewport(root.clientWidth, root.clientHeight));
    ro.observe(root);
    camera.setViewport(root.clientWidth, root.clientHeight);
    let lod = '';
    const off = camera.subscribe((cam) => {
      const next = rangeFor(cam);
      setRange((prev) => (sameRange(prev, next) ? prev : next));
      const l = lodFor(cam.z);
      if (l !== lod) {
        lod = l;
        root.dataset.lod = l;
      }
    });
    root.dataset.lod = lodFor(camera.get().z);
    return () => {
      off();
      ro.disconnect();
      camera.detach();
    };
  }, []);

  useEntranceZoom(rootRef, veiled);

  /* gestures */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pointers = new Map<number, { x: number; y: number }>();
    let moved = false;
    let start = { x: 0, y: 0 };
    let last = { x: 0, y: 0 };
    let samples: { x: number; y: number; t: number }[] = [];
    let pinch: { d: number; mx: number; my: number } | null = null;

    const local = (e: { clientX: number; clientY: number }) => {
      const r = root.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0 && e.button !== 1) return;
      camera.stop();
      pointers.set(e.pointerId, local(e));
      if (pointers.size === 1) {
        moved = false;
        start = last = local(e);
        samples = [{ ...start, t: performance.now() }];
        if (e.button === 1 || gesture.space) {
          moved = true;
          root.setPointerCapture(e.pointerId);
          root.classList.add('is-dragging');
        }
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
        moved = true;
        for (const id of pointers.keys()) root.setPointerCapture(id);
      }
    };

    const move = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      const p = local(e);
      pointers.set(e.pointerId, p);
      if (pointers.size >= 2 && pinch) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        camera.panBy(mx - pinch.mx, my - pinch.my);
        camera.zoomAt(d / pinch.d, mx, my);
        pinch = { d, mx, my };
        return;
      }
      if (!moved && Math.hypot(p.x - start.x, p.y - start.y) > 5) {
        moved = true;
        gesture.dragging = true;
        root.setPointerCapture(e.pointerId);
        root.classList.add('is-dragging');
        useUI.getState().setHover(null);
        const u = useVisitor.getState();
        if (!u.onboarding.dragged) u.onboard('dragged');
      }
      if (moved) {
        camera.panBy(p.x - last.x, p.y - last.y);
        const now = performance.now();
        samples.push({ ...p, t: now });
        while (samples.length > 2 && now - samples[0].t > 90) samples.shift();
      }
      last = p;
    };

    const up = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      if (pointers.size === 1) {
        // continue panning with the remaining finger
        const [p] = [...pointers.values()];
        last = p;
        pinch = null;
        samples = [{ ...p, t: performance.now() }];
        return;
      }
      if (pointers.size > 0) return;
      pinch = null;
      root.classList.remove('is-dragging');
      if (moved) {
        gesture.suppress();
        gesture.dragging = false;
        const a = samples[0];
        const b = samples[samples.length - 1];
        const dt = b && a ? b.t - a.t : 0;
        if (dt > 0 && performance.now() - b.t < 60) camera.release((b.x - a.x) / dt, (b.y - a.y) / dt);
      }
      moved = false;
    };

    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = local(e);
      if (e.ctrlKey || e.metaKey) {
        // trackpad pinches send small deltas; mouse wheels send big notches — keep both gentle
        const raw = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
        const d = Math.max(-60, Math.min(60, raw));
        const k = Math.abs(raw) >= 40 ? 0.0042 : 0.011;
        camera.zoomAt(Math.exp(-d * k), p.x, p.y);
      } else {
        const k = e.deltaMode === 1 ? 32 : 1;
        let dx = e.deltaX * k;
        let dy = e.deltaY * k;
        if (e.shiftKey && !dx) {
          dx = dy;
          dy = 0;
        }
        camera.panBy(-dx, -dy);
      }
    };

    const dbl = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.kitem')) return;
      const p = local(e);
      camera.zoomBy(1.7, p.x, p.y);
    };

    root.addEventListener('pointerdown', down);
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerup', up);
    root.addEventListener('pointercancel', up);
    root.addEventListener('wheel', wheel, { passive: false });
    root.addEventListener('dblclick', dbl);
    return () => {
      root.removeEventListener('pointerdown', down);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerup', up);
      root.removeEventListener('pointercancel', up);
      root.removeEventListener('wheel', wheel);
      root.removeEventListener('dblclick', dbl);
    };
  }, []);

  /* world content */
  const cells = useMemo(() => {
    const out: Cell[] = [];
    for (let j = range.j0; j <= range.j1; j++) for (let i = range.i0; i <= range.i1; i++) out.push(getCell(i, j, epoch, home));
    return out;
  }, [range, epoch, home]);

  const sources: FieldSource[] = useMemo(() => constellations.map((c) => footprint(c)), [constellations]);

  // filled as the cells render, then read by the connection lines drawn after them
  const placed = new Map<string, Placed>();
  const centre = camera.get();
  const ci = Math.round(centre.x / 2400);
  const cj = Math.round(centre.y / 1800);

  const renderItem = (item: Item, pos: { x: number; y: number }, delay: number) => {
    placed.set(item.key, { key: item.key, objId: item.format === 'chip' ? undefined : item.objId, x: pos.x, y: pos.y, w: item.w, h: item.h });
    const o = item.objId ? byId[item.objId] : undefined;
    const dim = !!filter && (!o || o.category !== filter) && item.format !== 'greeting' && item.format !== 'caption';
    if (item.format === 'greeting' || item.format === 'caption')
      return (
        <ItemView key={item.key} item={item} x={pos.x} y={pos.y} dim={dim} pulse={false} delay={delay} reduced={reduced}>
          <Greeting item={item} />
        </ItemView>
      );
    return <ItemView key={item.key} item={item} x={pos.x} y={pos.y} dim={dim} pulse={pulseKey === item.key} delay={delay} reduced={reduced} />;
  };

  return (
    <div
      ref={rootRef}
      className={`canvas${surprising ? ' is-surprising' : ''}${modalOpen ? ' is-receded' : ''}${veiled ? ' is-veiled' : ''}`}
      aria-hidden={veiled || undefined}
      role="region"
      aria-roledescription="canvas"
      aria-label="Knowledge canvas. Drag, scroll or use the arrow keys to move around; plus and minus to zoom; Tab to move between objects."
    >
      <div className="canvas-light" aria-hidden />
      <div ref={worldRef} className="world">
        {cells.map((cell) => (
          <CellView key={cell.key} cell={cell} sources={sources} renderItem={renderItem} dist={Math.hypot(cell.i - ci, cell.j - cj)} reduced={reduced} />
        ))}
        <AnimatePresence>
          {constellations.map((c, k) => (
            <ConstellationView key={c.id} c={c} sources={sources} index={k} renderItem={renderItem} />
          ))}
        </AnimatePresence>
        <Connections placed={placed} />
      </div>
      <div className="canvas-zoomblur" aria-hidden />
    </div>
  );
}

const CellView = memo(function CellView({
  cell,
  sources,
  renderItem,
  dist,
  reduced,
}: {
  cell: Cell;
  sources: FieldSource[];
  renderItem: (item: Item, pos: { x: number; y: number }, delay: number) => React.ReactNode;
  dist: number;
  reduced: boolean;
}) {
  // cards under a newer group step aside; everything else stays exactly where its cluster put it
  const shown = cell.items.filter((it) => !covered(it.x, it.y, it.w, it.h, sources));
  const tethers = shown.flatMap((it) => (it.anchor ? [{ from: it.anchor, to: { x: it.x, y: it.y }, key: it.key }] : []));
  const label = cell.label && !covered(cell.label.x + 300, cell.label.y - 60, 600, 160, sources) ? cell.label : undefined;
  return (
    <>
      {label && <CellLabelView label={label} pos={{ x: label.x, y: label.y }} reduced={reduced} />}
      {tethers.length > 0 && (
        <svg className="tethers" aria-hidden>
          {tethers.map((t) => (
            <line key={t.key} x1={t.from.x} y1={t.from.y} x2={t.to.x} y2={t.to.y} />
          ))}
        </svg>
      )}
      <AnimatePresence>{shown.map((it) => renderItem(it, { x: it.x, y: it.y }, 0.18 + Math.min(dist, 3) * 0.12 + it.order * 0.055))}</AnimatePresence>
    </>
  );
});

function CellLabelView({ label, pos, reduced }: { label: Cell['label'] & object; pos: { x: number; y: number }; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    camera.addParallax(el, pos.x, pos.y, 0.1);
    return () => camera.removeParallax(el);
  }, [pos.x, pos.y, reduced]);
  return (
    <div ref={ref} className="cell-label" style={{ left: pos.x, top: pos.y }} aria-hidden>
      <span className="cell-label-text">{label.text}</span>
      <span className="cell-label-sub">{label.sub}</span>
    </div>
  );
}

function ConstellationView({
  c,
  sources,
  index,
  renderItem,
}: {
  c: Constellation;
  sources: FieldSource[];
  index: number;
  renderItem: (item: Item, pos: { x: number; y: number }, delay: number) => React.ReactNode;
}) {
  return (
    <motion.div className="constellation" exit={{ opacity: 0, transition: { duration: 0.4 } }}>
      {c.items
        .filter((it) => !covered(it.x, it.y, it.w, it.h, sources, index + 1))
        .map((it) => renderItem(it, { x: it.x, y: it.y }, it.format === 'caption' ? 0.25 : 0.35 + it.order * 0.11))}
    </motion.div>
  );
}
