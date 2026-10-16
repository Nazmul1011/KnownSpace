import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { History, X } from 'lucide-react';
import { categoryById } from '@/domain/knowledge';
import { useUI } from '@/domain/ui-state';
import { useReducedMotion, useVisitor, type MotionPref, type Settings as S } from '@/domain/visitor';
import { SegPill } from '@/shared/ui/seg-pill';
import { topCategories } from '@/domain/world';
import './settings.css';

function Toggle({ k, label, hint }: { k: keyof Omit<S, 'motion'>; label: string; hint: string }) {
  const on = useVisitor((s) => s.settings[k]);
  return (
    <label className="set-row">
      <span className="set-text">
        <span className="set-label">{label}</span>
        <span className="set-hint">{hint}</span>
      </span>
      <input type="checkbox" role="switch" className="switch" checked={on} onChange={(e) => useVisitor.getState().setSetting(k, e.target.checked)} />
    </label>
  );
}

export function Settings() {
  const motionPref = useVisitor((s) => s.settings.motion);
  const reduced = useReducedMotion();
  const affinity = useVisitor((s) => s.affinity);
  const [confirm, setConfirm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const top = topCategories(affinity, 3).map((c) => categoryById[c].label.toLowerCase());

  useEffect(() => {
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && useUI.getState().setOverlay(null);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && useUI.getState().setOverlay(null);
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey);
    ref.current?.querySelector<HTMLElement>('button, input')?.focus();
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="popover settings"
      role="dialog"
      aria-label="Settings"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="set-head">
        <h2 className="set-title">Settings</h2>
        <button type="button" className="glass-btn small" aria-label="Close settings" onClick={() => useUI.getState().setOverlay(null)}>
          <X size={15} strokeWidth={1.9} aria-hidden />
        </button>
      </div>

      <div className="set-row is-stack">
        <span className="set-text">
          <span className="set-label">Motion</span>
          <span className="set-hint">Reduced keeps everything still, with no gliding.</span>
        </span>
        <div className="seg seg--small" role="radiogroup" aria-label="Motion">
          {(['system', 'reduce', 'full'] as MotionPref[]).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={motionPref === m}
              className={motionPref === m ? 'is-on' : ''}
              onClick={() => useVisitor.getState().setSetting('motion', m)}
            >
              {motionPref === m && <SegPill group="settings-motion" instant={reduced} />}
              {m === 'system' ? 'System' : m === 'reduce' ? 'Reduced' : 'Full'}
            </button>
          ))}
        </div>
      </div>
      <Toggle k="connections" label="Show connections" hint="Hairlines to related things while you hover." />
      <Toggle k="greeting" label="Daily greeting" hint="A quiet hello at the centre of the canvas." />
      <Toggle k="personalize" label="Learn what I like" hint="Inspire Me leans about 70% toward what you open, 30% toward the unexpected." />
      <Toggle k="loopShelf" label="Loop the collection" hint="Keep scrolling and the shelf comes round again. Off: it stops at either end." />

      <p className="set-note">
        {top.length
          ? `Lately you've been drawn to ${top.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`
          : "Open a few things and Knowspace will start to notice what you're drawn to."}
      </p>

      <div className="set-foot">
        {confirm ? (
          <>
            <span className="set-warn">Clear saved, learned and history on this device?</span>
            <button type="button" className="pill pill--quiet" onClick={() => setConfirm(false)}>
              Keep
            </button>
            <button
              type="button"
              className="pill pill--ink"
              onClick={() => {
                useVisitor.getState().clearHistory();
                setConfirm(false);
                useUI.getState().toast('History cleared.');
              }}
            >
              Clear
            </button>
          </>
        ) : (
          <button type="button" className="text-btn" onClick={() => setConfirm(true)}>
            <History size={15} strokeWidth={1.8} aria-hidden />
            Clear my history…
          </button>
        )}
      </div>
    </motion.div>
  );
}
