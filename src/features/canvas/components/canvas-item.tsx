import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useUI } from '@/domain/ui-state';
import { camera, type Item } from '@/domain/world';
import { hashString } from '@/shared/lib/rng';
import { ariaLabel, renderFormat } from './card-formats';
import { gesture } from '../model/gesture';

/** Keys that have already played their entrance, so panning back to them doesn't replay it. */
const seenKeys = new Set<string>();

interface Props {
  item: Item;
  x: number;
  y: number;
  dim: boolean;
  pulse: boolean;
  delay: number;
  reduced: boolean;
  children?: React.ReactNode;
}

export const ItemView = memo(function ItemView({ item, x, y, dim, pulse, delay, reduced, children }: Props) {
  const [wasSeen] = useState(() => seenKeys.has(item.key));
  const [entered, setEntered] = useState(wasSeen || reduced);
  const hoverTimer = useRef(0);
  useEffect(() => {
    seenKeys.add(item.key);
  }, [item.key]);

  const left = x - item.w / 2;
  const top = y - item.h / 2;
  const interactive = !!(item.objId || item.link);

  const initial =
    wasSeen || reduced
      ? false
      : item.from
        ? { x: left + item.from.x, y: top + item.from.y, opacity: 0, scale: 0.82 }
        : { x: left, y: top + 26, opacity: 0, scale: 0.965 };

  const transition = reduced
    ? { duration: 0 }
    : entered
      ? { type: 'spring' as const, stiffness: 70, damping: 19, mass: 1 }
      : item.from
        ? { type: 'spring' as const, stiffness: 46, damping: 15, mass: 1.1, delay }
        : { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const, delay };

  const open = (e: React.MouseEvent<HTMLElement>) => {
    if (gesture.suppressClick()) return;
    const id = item.link ?? item.objId;
    if (!id) return;
    const el = (e.currentTarget.querySelector('[data-visual]') as HTMLElement | null) ?? e.currentTarget;
    useUI.getState().openObject(id, { key: item.key, rect: el.getBoundingClientRect() });
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.matches(':focus-visible')) return;
    const s = camera.toScreen(x, y);
    const m = 80;
    if (s.x < m || s.y < m || s.x > camera.vw - m || s.y > camera.vh - m) camera.flyTo({ x, y }, { duration: 520 });
  };

  // every card idles in its own slow loop; typographic moments (greeting, captions) stay still
  const floats = !reduced && item.format !== 'greeting' && item.format !== 'caption';
  const h = hashString(item.key);
  const floatStyle = floats
    ? ({
        animationDuration: `${6 + (h % 400) / 100}s`,
        animationDelay: `-${(h % 997) / 83}s`,
        '--fx': `${(0.34 + ((h >>> 3) % 24) / 100) * (h & 1 ? 1 : -1)}em`,
        '--fy': `${0.4 + ((h >>> 7) % 24) / 100}em`,
        '--fr': `${(0.6 + ((h >>> 11) % 45) / 100) * (h & 2 ? 1 : -1)}deg`,
      } as React.CSSProperties)
    : undefined;
  const inner = children ?? renderFormat(item);
  const cls = `ko ko--${item.format}${item.hero ? ' is-hero' : ''}`;

  return (
    <motion.div
      className={`kitem${dim ? ' is-dim' : ''}${pulse ? ' is-pulse' : ''}${floats ? ' is-floating' : ''}`}
      data-key={item.key}
      data-format={item.format}
      style={{ width: item.w, height: item.h, fontSize: 16 * item.s }}
      initial={initial}
      animate={{ x: left, y: top, opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.92, transition: { duration: 0.32, ease: [0.4, 0, 1, 1] } }}
      transition={transition}
      onAnimationComplete={() => !entered && setEntered(true)}
    >
      <div className="kitem-float" style={floatStyle}>
        <div className="kitem-rot" style={item.rot ? { rotate: `${item.rot}deg` } : undefined}>
          {interactive ? (
            <button
              type="button"
              className={cls}
              aria-label={ariaLabel(item)}
              onClick={open}
              onFocus={onFocus}
              onPointerEnter={() => {
                window.clearTimeout(hoverTimer.current);
                hoverTimer.current = window.setTimeout(() => useUI.getState().setHover(item.key), 180);
              }}
              onPointerLeave={() => {
                window.clearTimeout(hoverTimer.current);
                if (useUI.getState().hoverKey === item.key) useUI.getState().setHover(null);
              }}
            >
              {inner}
            </button>
          ) : (
            <div className={cls}>{inner}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
