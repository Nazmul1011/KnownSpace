/** The celebration card at every fifth thing learned. */
import { useUI } from '@/domain/ui-state';
import { imageUrl } from '@/domain/knowledge';
import { useReducedMotion } from '@/domain/visitor';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import { MEDALS, SESSION_GOAL, THOUGHTS, nextMedal, useSession } from '../model/session-store';
import { MedalTrack } from './session-ring';
import './celebration.css';

const CONFETTI = ['#5b8def', '#a8c8fa', '#e85fa6', '#8b5cf6', '#f2b84b', '#5b8def', '#e85fa6', '#a8c8fa', '#8b5cf6', '#f2b84b', '#5b8def', '#e85fa6'];

function Confetti({ seed }: { seed: number }) {
  const reduced = useReducedMotion();
  const pieces = useMemo(
    () =>
      CONFETTI.map((color, k) => {
        const a = (k / CONFETTI.length) * Math.PI * 2 + ((seed * 13 + k * 7) % 10) / 20;
        const d = 118 + ((k * 37 + seed * 11) % 56);
        // a wide, shallow ellipse so nothing drifts onto the title below
        return {
          color,
          x: Math.cos(a) * d * 1.05,
          y: Math.max(-92, Math.min(70, Math.sin(a) * d * 0.62 - 10)),
          r: ((k * 53) % 120) - 60,
          wave: k % 3 !== 0,
          s: 0.8 + ((k * 17) % 5) / 10,
        };
      }),
    [seed],
  );
  return (
    <span className="confetti" aria-hidden>
      {pieces.map((p, k) => (
        <motion.span
          key={k}
          className="confetti-piece"
          initial={reduced ? false : { x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 1, scale: p.s, rotate: p.r }}
          transition={{ type: 'spring', stiffness: 90, damping: 11, delay: 0.12 + k * 0.015 }}
        >
          {p.wave ? (
            <svg width="30" height="14" viewBox="0 0 30 14">
              <path d="M3 9 Q8.5 1 14 7 T25 6" fill="none" stroke={p.color} strokeWidth="5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="10" viewBox="0 0 18 10">
              <rect x="2" y="2" width="14" height="6" rx="2" fill={p.color} />
            </svg>
          )}
        </motion.span>
      ))}
    </span>
  );
}

export function Celebration() {
  const step = useSession((s) => s.celebrate);
  // shows once the detail view has folded back into the canvas
  const modalOpen = useUI((s) => !!s.modal);
  return <AnimatePresence>{step && !modalOpen && <CelebrationCard key={step} step={step} />}</AnimatePresence>;
}

function CelebrationCard({ step }: { step: number }) {
  const count = useSession((s) => s.learned.length);
  const reduced = useReducedMotion();
  const medal = MEDALS[step - 1];
  const next = nextMedal(count);
  const done = step === MEDALS.length;
  const thought = THOUGHTS[(step + new Date().getDate()) % THOUGHTS.length];
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    primaryRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        useSession.getState().dismiss();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, []);

  const close = () => useSession.getState().dismiss();

  return (
    <motion.div className="celebrate-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <div className="celebrate-backdrop" onClick={() => useSession.getState().dismiss()} aria-hidden />
      <motion.div
        className="celebrate"
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebrate-title"
        aria-describedby="celebrate-desc"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={reduced ? { duration: 0.15 } : { type: 'spring', stiffness: 220, damping: 22 }}
      >
        <div className="celebrate-hero">
          <span className="celebrate-glow" aria-hidden />
          <Confetti seed={step} />
          <motion.img
            className="celebrate-medal"
            src={imageUrl(medal.image, 'l')}
            alt={`${medal.name} medal`}
            draggable={false}
            initial={reduced ? false : { scale: 0.4, rotate: -24, y: 20 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.05 }}
          />
        </div>
        <h2 id="celebrate-title" className="celebrate-title">
          <motion.span
            className="celebrate-num"
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.25 }}
          >
            {medal.at}
          </motion.span>
          <span className="celebrate-line">{medal.title}</span>
        </h2>
        <p id="celebrate-desc" className="celebrate-earned">
          {medal.earned}
        </p>
        <p className="celebrate-thought">{thought}</p>

        <MedalTrack count={count} highlight={step} size={46} />

        <p className="celebrate-next">
          {done ? (
            <>Your tracker now starts again from zero. Learn another twenty whenever you like.</>
          ) : (
            <>
              <b>{(next?.at ?? SESSION_GOAL) - count} more</b> to {next?.name}. Twenty completes today's session.
            </>
          )}
        </p>
        <div className="celebrate-actions">
          <button ref={primaryRef} type="button" className="pill pill--ink pill--lg celebrate-primary" onClick={close}>
            {done ? 'Start a new session' : 'Keep exploring'}
            {!done && <ArrowRight size={17} strokeWidth={1.9} aria-hidden />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
