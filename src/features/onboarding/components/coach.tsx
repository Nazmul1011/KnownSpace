import { useUI } from '@/domain/ui-state';
import { useVisitor } from '@/domain/visitor';
import { TimerRing } from '@/shared/ui/timer-ring';
import { Hand } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import './coach.css';

/** One quiet hint for new visitors: drag to explore. It fades after three seconds. */
export function Coach() {
  const ob = useVisitor((s) => s.onboarding);
  const intro = useUI((s) => s.introOpen);
  const modal = useUI((s) => !!s.modal);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2200);
    return () => window.clearTimeout(t);
  }, []);
  const step = !ob.dragged ? 'drag' : null;
  const show = ready && !intro && !modal && step;
  return (
    <aside className="hud hud-coach" aria-label="Hint">
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key="drag"
            className="coach"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hand size={15} strokeWidth={1.8} aria-hidden />
            <span>Drag anywhere to explore</span>
            <TimerRing className="coach-timer" onDone={() => useVisitor.getState().onboard('dragged')} />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
