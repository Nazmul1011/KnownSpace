/**
 * Sideways shelf scrolling: wheel and trackpad move it, it can be dragged with momentum, arrow keys step it,
 * and drags never count as clicks. With "Loop the collection" on and more cards than fit, it loops endlessly.
 * Returns whether the shelf is looping, so the component can render the copies it loops over.
 */
import { useEffect, useState, type RefObject } from 'react';
import { useVisitor } from '@/domain/visitor';
import { loopShift } from '../utils/shelf-loop';

export function useShelfScroll(rackRef: RefObject<HTMLDivElement | null>, { resetKey, count }: { resetKey: string; count: number }) {
  // Once the shelf is longer than the screen it loops: three copies side by side, and the scroll position
  // quietly jumps by one copy whenever it leaves the middle one, so you can keep going either way.
  const hasItems = count > 0;
  const loopShelf = useVisitor((s) => s.settings.loopShelf);
  const [overflows, setOverflows] = useState(false);
  const loop = loopShelf && overflows;
  useEffect(() => {
    const rack = rackRef.current;
    if (!rack) return;
    const measure = () => {
      const slots = rack.querySelectorAll<HTMLElement>('.rack-slot');
      const copy = loop ? slots[count].offsetLeft - slots[0].offsetLeft : rack.scrollWidth;
      setOverflows(copy > rack.clientWidth + 1);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(rack);
    return () => ro.disconnect();
  }, [rackRef, resetKey, count, loop]);

  // The shelf scrolls sideways: wheel and trackpad both move it, and you can drag it with momentum.
  useEffect(() => {
    const rack = rackRef.current;
    if (!rack) return;
    const reduced = document.documentElement.hasAttribute('data-reduced');
    const slots = rack.querySelectorAll<HTMLElement>('.rack-slot');
    // width of one copy of the list, measured from the first card of the middle copy
    const period = loop ? slots[count].offsetLeft - slots[0].offsetLeft : 0;
    rack.scrollLeft = period;
    let wraps = 0;
    let target = rack.scrollLeft;
    let current = rack.scrollLeft;
    let vel = 0;
    let raf = 0;
    let drag: { x: number; start: number; moved: boolean; samples: { x: number; t: number }[] } | null = null;
    let suppressClick = false;
    const max = () => rack.scrollWidth - rack.clientWidth;
    const clamp = (v: number) => (loop ? v : Math.max(0, Math.min(max(), v)));
    // keep the view inside the middle copy; the jump is invisible because the copies are identical
    const wrap = () => {
      const shift = loopShift(current, period);
      if (!shift) return;
      current += shift;
      target += shift;
      if (drag) drag.start += shift;
      wraps -= Math.sign(shift);
    };

    const tick = () => {
      if (!drag && Math.abs(vel) > 0.05) {
        target = clamp(target + vel);
        vel *= 0.92;
      } else if (!drag) vel = 0;
      const prev = current;
      current += (target - current) * (reduced ? 1 : 0.16);
      if (Math.abs(target - current) < 0.3) current = target;
      wrap();
      rack.scrollLeft = current;
      // distance travelled along the endless shelf (for tests and debugging)
      rack.dataset.position = String(Math.round(current - period + wraps * period));
      // a little extra tilt while the shelf is moving fast
      const speed = Math.max(-1, Math.min(1, (current - prev) / 40));
      rack.style.setProperty('--tilt', `${(speed * 10).toFixed(2)}deg`);
      if (drag || current !== target || Math.abs(vel) > 0.05) {
        rack.classList.add('is-moving');
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        rack.classList.remove('is-moving');
        rack.style.setProperty('--tilt', '0deg');
      }
    };
    const run = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!d) return;
      e.preventDefault();
      if (!raf) current = target = rack.scrollLeft;
      vel = 0;
      target = clamp(target + d * (e.deltaMode === 1 ? 40 : 1.15));
      run();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      if (!raf) current = target = rack.scrollLeft;
      vel = 0;
      drag = { x: e.clientX, start: target, moved: false, samples: [{ x: e.clientX, t: performance.now() }] };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 5) {
        drag.moved = true;
        rack.setPointerCapture(e.pointerId);
        rack.classList.add('is-dragging');
      }
      if (!drag.moved) return;
      target = clamp(drag.start - dx);
      current = target;
      wrap();
      const now = performance.now();
      drag.samples.push({ x: e.clientX, t: now });
      while (drag.samples.length > 2 && now - drag.samples[0].t > 90) drag.samples.shift();
      run();
    };
    const onUp = () => {
      if (!drag) return;
      if (drag.moved) {
        const a = drag.samples[0];
        const b = drag.samples[drag.samples.length - 1];
        const dt = b.t - a.t;
        if (dt > 0 && !reduced) vel = (-(b.x - a.x) / dt) * 16;
        suppressClick = true;
        window.setTimeout(() => (suppressClick = false), 0);
      }
      rack.classList.remove('is-dragging');
      drag = null;
      run();
    };
    const onClick = (e: MouseEvent) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      if (!raf) current = target = rack.scrollLeft;
      target = clamp(target + (e.key === 'ArrowRight' ? 1 : -1) * 260);
      run();
    };
    rack.dataset.position = '0';

    rack.addEventListener('wheel', onWheel, { passive: false });
    rack.addEventListener('pointerdown', onDown);
    rack.addEventListener('pointermove', onMove);
    rack.addEventListener('pointerup', onUp);
    rack.addEventListener('pointercancel', onUp);
    rack.addEventListener('click', onClick, true);
    rack.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      rack.removeEventListener('wheel', onWheel);
      rack.removeEventListener('pointerdown', onDown);
      rack.removeEventListener('pointermove', onMove);
      rack.removeEventListener('pointerup', onUp);
      rack.removeEventListener('pointercancel', onUp);
      rack.removeEventListener('click', onClick, true);
      rack.removeEventListener('keydown', onKey);
    };
  }, [rackRef, resetKey, hasItems, loop, count]);

  return loop;
}
