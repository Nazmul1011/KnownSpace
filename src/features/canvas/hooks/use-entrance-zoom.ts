import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { camera, homeView, MIN_Z } from '@/domain/world';
import { ENTRANCE_HOLD_MS, ENTRANCE_MS, ENTRANCE_ZOOM, easeEntrance, entranceBlur, zoomSpeed } from '../utils/entrance';

/**
 * The way into the canvas from the landing page. While veiled, the camera waits far out so the first thing
 * you see is how much there is; once unveiled it holds for a beat, then zooms into home through a blur
 * (`--zoom-blur` on the canvas root) that clears as the view settles.
 */
export function useEntranceZoom(rootRef: RefObject<HTMLDivElement | null>, veiled: boolean) {
  const wasVeiled = useRef(veiled);
  useLayoutEffect(() => {
    if (veiled) {
      const h = homeView();
      camera.jump({ ...h, z: Math.max(MIN_Z, h.z * ENTRANCE_ZOOM) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const entering = wasVeiled.current && !veiled;
    wasVeiled.current = veiled;
    const root = rootRef.current;
    if (!entering || !root) return;
    if (camera.reduced) {
      camera.flyTo(homeView());
      return;
    }
    root.classList.add('is-zooming');
    let last = { z: camera.get().z, t: performance.now() };
    let settle = 0;
    // blur follows how fast the zoom is moving, so it peaks mid-flight and is gone when the view lands
    const unsubscribe = camera.subscribe((c) => {
      const now = performance.now();
      const speed = zoomSpeed(last.z, c.z, now - last.t);
      last = { z: c.z, t: now };
      root.style.setProperty('--zoom-blur', `${entranceBlur(speed).toFixed(2)}px`);
      window.clearTimeout(settle);
      settle = window.setTimeout(() => root.style.setProperty('--zoom-blur', '0px'), 120);
    }) as () => void;
    const finish = () => {
      unsubscribe();
      window.clearTimeout(settle);
      root.classList.remove('is-zooming');
      root.style.removeProperty('--zoom-blur');
    };
    // if anything else moves the camera during the hold (a search, a shared link), it wins: skip the zoom
    const pose = camera.get();
    const start = window.setTimeout(() => {
      const c = camera.get();
      if (c.x !== pose.x || c.y !== pose.y || c.z !== pose.z) return finish();
      camera.flyTo(homeView(), { duration: ENTRANCE_MS, ease: easeEntrance, done: finish });
    }, ENTRANCE_HOLD_MS);
    // a drag or click during the entrance takes over the camera; clear the blur either way
    const giveUp = window.setTimeout(finish, ENTRANCE_HOLD_MS + ENTRANCE_MS + 400);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(giveUp);
      finish();
    };
  }, [rootRef, veiled]);
}
