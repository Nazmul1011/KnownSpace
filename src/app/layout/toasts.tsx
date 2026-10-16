/** Short confirmations; ones with an action (Undo) run a three-second ring. */
import { useUI } from '@/domain/ui-state';
import { TimerRing } from '@/shared/ui/timer-ring';
import { AnimatePresence, motion } from 'motion/react';
import './toasts.css';

export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  return (
    <div className="toasts" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className="toast"
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.18 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{t.text}</span>
            {t.action && (
              <button
                type="button"
                className="toast-action"
                onClick={() => {
                  t.action?.run();
                  useUI.getState().dismissToast(t.id);
                }}
              >
                {t.action.label}
              </button>
            )}
            {t.action && <TimerRing className="toast-timer" onDone={() => useUI.getState().dismissToast(t.id)} />}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
