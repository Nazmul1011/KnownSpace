import { useEffect, useSyncExternalStore } from 'react';
import { useVisitor } from './visitor-store';
import { camera } from '@/domain/world';

const query = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

function subscribe(cb: () => void) {
  query?.addEventListener('change', cb);
  return () => query?.removeEventListener('change', cb);
}

/** Reduced motion = the user's setting, or the system preference when the setting is "system". */
export function useReducedMotion() {
  const pref = useVisitor((s) => s.settings.motion);
  const system = useSyncExternalStore(
    subscribe,
    () => !!query?.matches,
    () => false,
  );
  const reduced = pref === 'reduce' || (pref === 'system' && system);
  useEffect(() => {
    camera.reduced = reduced;
    document.documentElement.toggleAttribute('data-reduced', reduced);
  }, [reduced]);
  return reduced;
}
