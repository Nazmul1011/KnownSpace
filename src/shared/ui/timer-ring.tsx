import './timer-ring.css';

/** A small ring that runs down over three seconds, then calls onDone. */
export function TimerRing({ className, onDone }: { className: string; onDone: () => void }) {
  return (
    <svg className={`timer-ring ${className}`} width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <circle cx="9" cy="9" r="7" className="timer-ring-track" />
      <circle cx="9" cy="9" r="7" className="timer-ring-bar" pathLength={1} onAnimationEnd={onDone} />
    </svg>
  );
}
