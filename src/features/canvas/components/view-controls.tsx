/** Zoom and recentre, plus the coffee link, in the bottom-right corner. */
import { camera } from '@/domain/world';
import { COFFEE_URL } from '@/shared/config/links';
import { CoffeeCup } from '@/shared/ui/brand';
import { LocateFixed, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { recenter, zoomIn, zoomOut } from '../model/navigation';
import { ExternalLink } from '@/shared/ui/external-link';
import { useReducedMotion } from '@/domain/visitor';
import './view-controls.css';

function useZoomPct() {
  const [z, setZ] = useState(() => Math.round(camera.get().z * 100));
  useEffect(() => {
    let raf = 0;
    return camera.subscribe((c) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setZ(Math.round(c.z * 100)));
    }) as () => void;
  }, []);
  return z;
}

export function Controls() {
  const z = useZoomPct();
  const reduced = useReducedMotion();
  return (
    <aside className="hud hud-br hide-sm" aria-label="View controls">
      <ExternalLink className="island coffee-btn" href={COFFEE_URL}>
        <CoffeeCup size={16} steam={!reduced} />
        <span className="coffee-label">Buy me a coffee</span>
      </ExternalLink>
      <div className="island controls" role="toolbar" aria-label="Canvas view">
        <button type="button" onClick={zoomOut} aria-label="Zoom out" title="Zoom out (−)">
          <Minus size={15} strokeWidth={1.9} aria-hidden />
        </button>
        <span className="zoom-val" aria-live="polite">
          {z}%
        </span>
        <button type="button" onClick={zoomIn} aria-label="Zoom in" title="Zoom in (+)">
          <Plus size={15} strokeWidth={1.9} aria-hidden />
        </button>
        <span className="controls-sep" />
        <button type="button" onClick={recenter} aria-label="Back to the start" title="Center (0)">
          <LocateFixed size={15} strokeWidth={1.8} aria-hidden />
        </button>
      </div>
    </aside>
  );
}
