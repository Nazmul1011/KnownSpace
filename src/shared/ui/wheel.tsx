/**
 * An iOS-style picker wheel: items sit on a cylinder, the centred one is sharp and the rest fall away in
 * depth and opacity. It loops forever in both directions. Scroll, drag (with inertia) or use the arrow
 * keys; it always settles on an item.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import './wheel.css';

const ITEM = 38;
const STEP = 19; // degrees per item
const RADIUS = ITEM / 2 / Math.tan((STEP / 2) * (Math.PI / 180));

export interface WheelItem {
  id: string;
  label: string;
}

export function Wheel({
  items,
  value,
  onChange,
  label,
  width,
}: {
  items: WheelItem[];
  value: number;
  onChange: (i: number) => void;
  label: string;
  width?: number;
}) {
  const [offset, setOffset] = useState(value);
  const pos = useRef(value);
  const vel = useRef(0);
  const raf = useRef(0);
  const dragging = useRef<{ y: number; start: number; samples: { y: number; t: number }[] } | null>(null);
  const wheelIdle = useRef(0);
  const reduced = typeof document !== 'undefined' && document.documentElement.hasAttribute('data-reduced');

  const n = items.length;
  const wrap = useCallback((i: number) => ((Math.round(i) % n) + n) % n, [n]);
  const clamp = useCallback((v: number) => v, []);

  const settle = useCallback(
    (forced?: number) => {
      cancelAnimationFrame(raf.current);
      let last = performance.now();
      const step = (now: number) => {
        const dt = Math.min(40, now - last) / 1000;
        last = now;
        // coast with friction, then a critically damped spring to the nearest item
        if (forced === undefined && Math.abs(vel.current) > 1.2) {
          pos.current = clamp(pos.current + vel.current * dt);
          vel.current *= Math.exp(-dt * 5.5);
        } else {
          const target = forced ?? Math.round(pos.current);
          const k = 170;
          const c = 2 * Math.sqrt(k);
          const a = -k * (pos.current - target) - c * vel.current;
          vel.current += a * dt;
          pos.current += vel.current * dt;
          if (Math.abs(pos.current - target) < 0.002 && Math.abs(vel.current) < 0.02) {
            pos.current = target;
            setOffset(target);
            onChange(wrap(target));
            return;
          }
        }
        setOffset(pos.current);
        raf.current = requestAnimationFrame(step);
      };
      if (reduced) {
        const target = forced ?? Math.round(pos.current);
        pos.current = target;
        setOffset(target);
        onChange(wrap(target));
        return;
      }
      raf.current = requestAnimationFrame(step);
    },
    [clamp, onChange, reduced, wrap],
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    if (wrap(pos.current) !== value && !dragging.current) {
      vel.current = 0;
      pos.current = value;
      setOffset(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const go = (i: number) => {
    vel.current = 0;
    settle(i);
  };

  const onWheel = (e: React.WheelEvent) => {
    cancelAnimationFrame(raf.current);
    pos.current = clamp(pos.current + e.deltaY / 60);
    vel.current = 0;
    setOffset(pos.current);
    window.clearTimeout(wheelIdle.current);
    wheelIdle.current = window.setTimeout(() => settle(), 90);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    cancelAnimationFrame(raf.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = { y: e.clientY, start: pos.current, samples: [{ y: e.clientY, t: performance.now() }] };
    vel.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d) return;
    pos.current = clamp(d.start - (e.clientY - d.y) / ITEM);
    setOffset(pos.current);
    const now = performance.now();
    d.samples.push({ y: e.clientY, t: now });
    while (d.samples.length > 2 && now - d.samples[0].t > 100) d.samples.shift();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d) return;
    dragging.current = null;
    const a = d.samples[0];
    const b = d.samples[d.samples.length - 1];
    const dt = (b.t - a.t) / 1000;
    const moved = Math.abs(e.clientY - d.y);
    if (moved < 4) {
      // a tap: jump to the item that was tapped
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const rel = (e.clientY - (rect.top + rect.height / 2)) / ITEM;
      go(Math.round(pos.current + rel));
      return;
    }
    vel.current = dt > 0 ? -((b.y - a.y) / ITEM) / dt : 0;
    settle();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const cur = Math.round(pos.current);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      go(cur + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      go(cur - 1);
    }
  };

  const centre = Math.round(offset);
  const current = wrap(centre);
  const rows: number[] = [];
  for (let i = centre - 5; i <= centre + 5; i++) rows.push(i);
  return (
    <div
      className="wheel"
      style={{ width }}
      role="listbox"
      aria-label={label}
      aria-activedescendant={`${label}-${current}`}
      tabIndex={0}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <div className="wheel-drum" style={{ height: ITEM }}>
        {rows.map((i) => {
          const d = i - offset;
          if (Math.abs(d) > 4.6) return null;
          const ad = Math.abs(d);
          const it = items[wrap(i)];
          const isCurrent = i === centre;
          return (
            <div
              key={i}
              id={isCurrent ? `${label}-${current}` : undefined}
              role="option"
              aria-selected={isCurrent}
              className={`wheel-item${isCurrent ? ' is-current' : ''}`}
              style={{
                transform: `rotateX(${-d * STEP}deg) translateZ(${RADIUS}px)`,
                opacity: Math.max(0, 1 - ad * 0.27),
                filter: ad > 1.5 ? `blur(${Math.min(1.2, (ad - 1.5) * 0.6)}px)` : undefined,
              }}
            >
              {it.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
