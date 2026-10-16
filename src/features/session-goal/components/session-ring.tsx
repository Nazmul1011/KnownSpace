/** Today's session: the segmented ring and the medal track. */
import { imageUrl } from '@/domain/knowledge';
import { Lock } from 'lucide-react';
import { MEDALS, STEP } from '../model/session-store';
import './session-ring.css';

/** Four arcs, one per medal, each filling as you learn its five things. */
export function SessionRing({ count, size = 20 }: { count: number; size?: number }) {
  const r = size / 2 - 2;
  const c = size / 2;
  const seg = (Math.PI * 2) / 4;
  const gap = 0.32;
  const arc = (k: number, frac: number) => {
    const a0 = -Math.PI / 2 + k * seg + gap / 2;
    const a1 = a0 + (seg - gap) * frac;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A${r} ${r} 0 ${large} 1 ${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)}`;
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="session-ring">
      {MEDALS.map((m, k) => {
        const frac = Math.max(0, Math.min(1, (count - k * STEP) / STEP));
        return (
          <g key={m.id}>
            <path d={arc(k, 1)} fill="none" stroke="var(--line-2)" strokeWidth="2.6" strokeLinecap="round" />
            {frac > 0 && <path d={arc(k, frac)} fill="none" stroke={m.tint} strokeWidth="2.6" strokeLinecap="round" />}
          </g>
        );
      })}
    </svg>
  );
}

/** The four medals in a row, earned ones in colour, the rest waiting. */
export function MedalTrack({ count, highlight, size = 52 }: { count: number; highlight?: number; size?: number }) {
  const done = Math.floor(count / STEP);
  return (
    <ol className="medal-track" style={{ '--m': `${size}px` } as React.CSSProperties}>
      {MEDALS.map((m, k) => {
        const earned = k < done;
        const frac = Math.max(0, Math.min(1, (count - k * STEP) / STEP));
        return (
          <li key={m.id} className={`medal-slot${earned ? ' is-earned' : ''}${highlight === m.step ? ' is-new' : ''}`}>
            {k > 0 && (
              <span className="medal-link" aria-hidden>
                <span style={{ width: `${Math.max(0, Math.min(1, (count - (k - 1) * STEP) / STEP)) * 100}%` }} />
              </span>
            )}
            <span className="medal-coin">
              <img src={imageUrl(m.image, 's')} alt="" draggable={false} />
              {!earned && frac === 0 && (
                <span className="medal-lock" aria-hidden>
                  <Lock size={11} strokeWidth={2.2} />
                </span>
              )}
            </span>
            <span className="medal-name">{m.name}</span>
            <span className="medal-at">{earned ? 'Earned' : `${m.at} things`}</span>
          </li>
        );
      })}
    </ol>
  );
}
