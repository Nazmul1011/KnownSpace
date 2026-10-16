import { STUDIO_URL } from '@/shared/config/links';
import { ExternalLink } from './external-link';
import './brand.css';
/** The mark: a small landscape with a light rising over it — somewhere worth looking. */
export function Mark({ size = 26, animated = false, loading = false }: { size?: number; animated?: boolean; loading?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className={`mark${animated ? ' is-animated' : ''}${loading ? ' is-loading' : ''}`}>
      <circle cx="16" cy="16" r="16" fill="var(--ink)" />
      <g className="mark-sun">
        <circle cx="19.5" cy="12.2" r="3.4" fill="#fff" />
      </g>
      <path
        className="mark-wave"
        pathLength={1}
        d="M4.2 21.6c4.1-3.9 7.6-5.4 11.2-3.6 3 1.5 5.4 1.7 12.4-1.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        className="mark-wave mark-wave--2"
        pathLength={1}
        d="M7 25.6c3.4-1.9 6.1-2.4 9-1.4"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <Mark />
      <span className="wordmark-text">Knowspace</span>
    </span>
  );
}

/** Maker's credit: "A product by Gr8r Studio", linking out to the studio. */
export function StudioCredit({ className = '' }: { className?: string }) {
  return (
    <ExternalLink className={`studio-credit ${className}`} href={STUDIO_URL}>
      <span className="studio-credit-pre">A product by</span> <span className="studio-credit-name">Gr8r Studio</span>
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="studio-credit-arrow">
        <path d="M3 7 7 3M3.6 3H7v3.4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </ExternalLink>
  );
}

/** Line version of the Buy Me a Coffee cup: lid, tapered cup and band. */
/** With `steam`, two wisps rise from the lid on a loop and the cup tilts every seven seconds (pass false for reduced motion). */
export function CoffeeCup({ size = 16, steam = false }: { size?: number; steam?: boolean }) {
  return (
    <svg
      width={size}
      height={steam ? (size * 32) / 24 : size}
      viewBox={steam ? '0 -8 24 32' : '0 0 24 24'}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={steam ? 'coffee-cup is-steaming' : 'coffee-cup'}
      aria-hidden
    >
      {steam && (
        <g className="coffee-steam" strokeWidth={1.7}>
          {[9.5, 14.5].map((x, k) => (
            <path key={x} d={`M${x} 1.8c-2.4-1.5 2.4-3.3 0-6.3`} opacity={0}>
              <animate attributeName="opacity" values="0;1;0.8;0" keyTimes="0;0.25;0.7;1" dur="2.4s" begin={`${k * 1.2}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 1.5;0 -3" dur="2.4s" begin={`${k * 1.2}s`} repeatCount="indefinite" />
            </path>
          ))}
        </g>
      )}
      <g className="coffee-body">
        {steam && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 12 21;0 12 21;-10 12 21;7 12 21;-3 12 21;0 12 21"
            keyTimes="0;0.84;0.88;0.92;0.96;1"
            dur="7s"
            begin="2.5s"
            repeatCount="indefinite"
          />
        )}
        <path d="M5.5 5.5h13" />
        <path d="M7 3.5h10l1.5 2" />
        <path d="M7 3.5 5.5 5.5" />
        <path d="M6.5 8.5h11l-1.6 11.2a1.5 1.5 0 0 1-1.5 1.3H9.6a1.5 1.5 0 0 1-1.5-1.3Z" />
        <path d="M7.2 12.5h9.6" />
        <path d="M7.7 16h8.6" />
      </g>
    </svg>
  );
}
