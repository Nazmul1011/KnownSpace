/**
 * Hand-drawn explanatory diagrams. Ink on paper with hairlines; one accent where it carries meaning.
 * All share a 300×220 viewBox so they can sit in cards, the detail view and thumbnails alike.
 */
import { memo, useId } from 'react';
import type { DiagramId } from '../model/types';
import { rng } from '@/shared/lib/rng';

const INK = 'var(--ink)';
const MUTED = 'var(--ink-4)';
const ACCENT = 'var(--blue)';

const Label = ({
  x,
  y,
  children,
  anchor = 'start',
  fill = 'var(--ink-3)',
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  fill?: string;
}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily="var(--sans)" fontSize="9.5" fontWeight="500" fill={fill}>
    {children}
  </text>
);

function Thunder() {
  return (
    <g>
      <path d="M44 34 L30 92 L44 92 L36 140 L64 78 L49 78 L60 34 Z" fill={INK} />
      {[40, 70, 100, 130, 160].map((r, k) => (
        <path
          key={r}
          d={`M ${48 + r * 0.2} ${92 - r * 0.62} A ${r} ${r} 0 0 1 ${48 + r * 0.2} ${92 + r * 0.62}`}
          fill="none"
          stroke={INK}
          strokeWidth="0.8"
          opacity={0.55 - k * 0.09}
          transform={`translate(${r * 0.55} 0)`}
        />
      ))}
      <line x1="66" y1="54" x2="268" y2="54" stroke={ACCENT} strokeWidth="1.2" />
      <path d="M262 50 L270 54 L262 58" fill="none" stroke={ACCENT} strokeWidth="1.2" />
      <Label x={70} y={46} fill={ACCENT}>
        light · 300,000 km/s
      </Label>
      <Label x={150} y={124}>
        sound · 343 m/s
      </Label>
      <circle cx="270" cy="92" r="5" fill={INK} />
      <line x1="30" y1="176" x2="270" y2="176" stroke={INK} strokeWidth="0.6" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={30 + k * 80} y1="172" x2={30 + k * 80} y2="180" stroke={INK} strokeWidth="0.6" />
          <Label x={30 + k * 80} y={192} anchor="middle">
            {k} km
          </Label>
        </g>
      ))}
      <Label x={150} y={210} anchor="middle" fill={INK}>
        count 3 seconds ≈ 1 kilometre
      </Label>
    </g>
  );
}

function Mirror() {
  return (
    <g>
      <rect x="146" y="22" width="8" height="160" fill="var(--sunk-2)" />
      <line x1="150" y1="22" x2="150" y2="182" stroke={INK} strokeWidth="0.8" />
      {Array.from({ length: 16 }, (_, k) => (
        <line key={k} x1="154" y1={26 + k * 10} x2="160" y2={20 + k * 10} stroke={MUTED} strokeWidth="0.5" />
      ))}
      <text x="78" y="128" textAnchor="middle" fontFamily="var(--sans)" fontWeight="650" fontSize="88" fill={INK}>
        R
      </text>
      <text x="-222" y="128" textAnchor="middle" fontFamily="var(--sans)" fontWeight="650" fontSize="88" fill={INK} opacity="0.32" transform="scale(-1 1)">
        R
      </text>
      <path d="M78 150 L78 168 M72 162 L78 168 L84 162" stroke={MUTED} fill="none" strokeWidth="0.8" />
      <path d="M106 108 L136 108 M130 102 L136 108 L130 114" stroke={ACCENT} fill="none" strokeWidth="1.2" />
      <path d="M194 108 L164 108 M170 102 L164 108 L170 114" stroke={ACCENT} fill="none" strokeWidth="1.2" />
      <Label x={150} y={204} anchor="middle" fill={INK}>
        up stays up · left stays left · front ↔ back flips
      </Label>
    </g>
  );
}

/** One of the three square position markers in a QR code. */
function QrFinder({ x, y, cell }: { x: number; y: number; cell: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={cell * 7} height={cell * 7} fill={INK} />
      <rect x={cell} y={cell} width={cell * 5} height={cell * 5} fill="#fff" />
      <rect x={cell * 2} y={cell * 2} width={cell * 3} height={cell * 3} fill={INK} />
    </g>
  );
}

function Qr() {
  const id = useId();
  const N = 25;
  const cell = 6.4;
  const ox = 70;
  const oy = 12;
  const r = rng(7);
  const finder = (x: number, y: number) => x < 8 && y < 8;
  const isFinder = (x: number, y: number) => finder(x, y) || finder(N - 1 - x, y) || finder(x, N - 1 - y);
  const mods: [number, number][] = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (isFinder(x, y)) continue;
      if (y === 6 || x === 6) {
        if ((x + y) % 2 === 0) mods.push([x, y]);
        continue;
      }
      if (r.chance(0.5)) mods.push([x, y]);
    }
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-stain`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8a5a2b" stopOpacity="0.55" />
          <stop offset="72%" stopColor="#8a5a2b" stopOpacity="0.42" />
          <stop offset="88%" stopColor="#6b4220" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6b4220" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x={ox - 8} y={oy - 8} width={N * cell + 16} height={N * cell + 16} fill="#fff" />
      {mods.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={ox + x * cell} y={oy + y * cell} width={cell} height={cell} fill={INK} />
      ))}
      <QrFinder x={ox} y={oy} cell={cell} />
      <QrFinder x={ox + (N - 7) * cell} y={oy} cell={cell} />
      <QrFinder x={ox} y={oy + (N - 7) * cell} cell={cell} />
      <ellipse cx={ox + 18.5 * cell} cy={oy + 18 * cell} rx="34" ry="30" fill={`url(#${id}-stain)`} style={{ mixBlendMode: 'multiply' }} />
      <Label x={150} y={204} anchor="middle" fill={INK}>
        up to ~30% can be lost and still read
      </Label>
    </g>
  );
}

function Gps() {
  const p = { x: 150, y: 110 };
  const sats = [
    { x: 100, y: 84, r: 0 },
    { x: 205, y: 80, r: 0 },
    { x: 166, y: 150, r: 0 },
  ].map((s) => ({ ...s, r: Math.hypot(s.x - p.x, s.y - p.y) }));
  return (
    <g>
      {sats.map((s, k) => (
        <g key={k}>
          <circle cx={s.x} cy={s.y} r={s.r} fill="none" stroke={INK} strokeWidth="0.6" opacity="0.5" />
          <rect x={s.x - 5} y={s.y - 4} width="10" height="8" rx="1.5" fill={INK} />
          <line x1={s.x - 11} y1={s.y} x2={s.x + 11} y2={s.y} stroke={INK} strokeWidth="1.6" />
          <Label x={s.x + 9} y={s.y - 8}>
            {`t${k + 1}`}
          </Label>
        </g>
      ))}
      <circle cx={p.x} cy={p.y} r="12" fill={ACCENT} opacity="0.14" />
      <circle cx={p.x} cy={p.y} r="4.5" fill={ACCENT} />
      <Label x={p.x + 12} y={p.y + 22} fill={ACCENT}>
        you
      </Label>
      <Label x={150} y={214} anchor="middle" fill={INK}>
        distance = signal travel time × speed of light
      </Label>
    </g>
  );
}

function Cones() {
  const id = useId();
  const x = (nm: number) => 30 + ((nm - 380) / 340) * 240;
  const curve = (peak: number, width: number) => {
    const pts: string[] = [];
    for (let nm = 380; nm <= 720; nm += 5) {
      const v = Math.exp(-((nm - peak) ** 2) / (2 * width * width));
      pts.push(`${x(nm).toFixed(1)},${(160 - v * 120).toFixed(1)}`);
    }
    return `M${pts.join(' L')}`;
  };
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-spec`} x1="0" x2="1">
          <stop offset="0%" stopColor="#6b3fa0" />
          <stop offset="22%" stopColor="#3b6fe0" />
          <stop offset="40%" stopColor="#2fa6b8" />
          <stop offset="52%" stopColor="#3f9a5b" />
          <stop offset="66%" stopColor="#e3c63a" />
          <stop offset="80%" stopColor="#e3842d" />
          <stop offset="100%" stopColor="#c8382e" />
        </linearGradient>
      </defs>
      <path d={curve(420, 30)} fill="none" stroke="#5b4fd0" strokeWidth="1.4" />
      <path d={curve(534, 42)} fill="none" stroke="#3f9a5b" strokeWidth="1.4" />
      <path d={curve(564, 46)} fill="none" stroke="#d0683a" strokeWidth="1.4" />
      <Label x={x(420)} y={32} anchor="middle">
        S
      </Label>
      <Label x={x(530)} y={32} anchor="middle">
        M
      </Label>
      <Label x={x(575)} y={32} anchor="middle">
        L
      </Label>
      <rect x="30" y="168" width="240" height="8" rx="4" fill={`url(#${id}-spec)`} />
      {[400, 500, 600, 700].map((nm) => (
        <Label key={nm} x={x(nm)} y={192} anchor="middle">
          {nm}
        </Label>
      ))}
      <Label x={150} y={210} anchor="middle" fill={INK}>
        three cone types · wavelength (nm)
      </Label>
    </g>
  );
}

function Forgetting() {
  const X = (d: number) => 36 + d * 34;
  const Y = (v: number) => 170 - v * 136;
  const cram: string[] = [];
  for (let d = 0; d <= 7; d += 0.1) cram.push(`${X(d).toFixed(1)},${Y(0.18 + 0.82 * Math.exp(-d / 1.2)).toFixed(1)}`);
  const reviews = [0, 1, 3, 6];
  const spaced: string[] = [];
  reviews.forEach((r, k) => {
    const next = reviews[k + 1] ?? 7;
    const tau = 1.2 * Math.pow(2.6, k);
    for (let d = r; d <= next + 0.001; d += 0.1) spaced.push(`${X(d).toFixed(1)},${Y(0.3 + 0.7 * Math.exp(-(d - r) / tau)).toFixed(1)}`);
  });
  return (
    <g>
      <line x1="36" y1="34" x2="36" y2="170" stroke={INK} strokeWidth="0.6" />
      <line x1="36" y1="170" x2="276" y2="170" stroke={INK} strokeWidth="0.6" />
      <path d={`M${cram.join(' L')}`} fill="none" stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 3" />
      <path d={`M${spaced.join(' L')}`} fill="none" stroke={ACCENT} strokeWidth="1.4" />
      {reviews.slice(1).map((r) => (
        <circle key={r} cx={X(r)} cy={Y(1)} r="3" fill={ACCENT} />
      ))}
      <Label x={244} y={150} anchor="end">
        crammed
      </Label>
      <Label x={244} y={64} anchor="end" fill={ACCENT}>
        spaced reviews
      </Label>
      <Label x={30} y={30} anchor="start">
        recall
      </Label>
      <Label x={276} y={186} anchor="end">
        days →
      </Label>
      <Label x={150} y={210} anchor="middle" fill={INK}>
        each review flattens the curve
      </Label>
    </g>
  );
}

function Golden() {
  const phi = 1.618;
  const W = 220;
  const H = W / phi;
  const ox = 40;
  const oy = 24;
  const rects: { x: number; y: number; s: number; d: number }[] = [];
  let x = ox,
    y = oy,
    w = W,
    h = H;
  for (let k = 0; k < 7; k++) {
    const s = Math.min(w, h);
    const dir = k % 4;
    if (dir === 0) {
      rects.push({ x, y, s, d: 0 });
      x += s;
      w -= s;
    } else if (dir === 1) {
      rects.push({ x, y, s, d: 1 });
      y += s;
      h -= s;
    } else if (dir === 2) {
      rects.push({ x: x + w - s, y, s, d: 2 });
      w -= s;
    } else {
      rects.push({ x, y: y + h - s, s, d: 3 });
      h -= s;
    }
  }
  const arc = (r: (typeof rects)[number]) => {
    const { x, y, s, d } = r;
    if (d === 0) return `M${x} ${y + s} A${s} ${s} 0 0 1 ${x + s} ${y}`;
    if (d === 1) return `M${x} ${y} A${s} ${s} 0 0 1 ${x + s} ${y + s}`;
    if (d === 2) return `M${x + s} ${y} A${s} ${s} 0 0 1 ${x} ${y + s}`;
    return `M${x + s} ${y + s} A${s} ${s} 0 0 1 ${x} ${y}`;
  };
  return (
    <g>
      <rect x={ox} y={oy} width={W} height={H} fill="none" stroke={INK} strokeWidth="0.8" />
      {rects.map((r, k) => (
        <rect key={k} x={r.x} y={r.y} width={r.s} height={r.s} fill="none" stroke={INK} strokeWidth="0.5" opacity="0.6" />
      ))}
      {rects.map((r, k) => (
        <path key={k} d={arc(r)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      ))}
      <Label x={150} y={186} anchor="middle" fill={INK}>
        φ ≈ 1.618
      </Label>
      <Label x={150} y={204} anchor="middle">
        beautiful maths, weak evidence in art
      </Label>
    </g>
  );
}

function Bridge() {
  return (
    <g>
      <path d="M20 168 L280 168" stroke={INK} strokeWidth="0.6" />
      {Array.from({ length: 26 }, (_, k) => (
        <line key={k} x1={20 + k * 10} y1="168" x2={14 + k * 10} y2="176" stroke={MUTED} strokeWidth="0.5" />
      ))}
      <path d="M40 168 Q150 40 260 168" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <line x1="22" y1="84" x2="278" y2="84" stroke={INK} strokeWidth="3" />
      {[70, 100, 125, 150, 175, 200, 230].map((x) => {
        const t = (x - 40) / 220;
        const yArch = (1 - t) * (1 - t) * 168 + 2 * (1 - t) * t * 40 + t * t * 168;
        return <line key={x} x1={x} y1="86" x2={x} y2={yArch - 3} stroke={INK} strokeWidth="0.8" />;
      })}
      <path d="M150 30 L150 74 M144 66 L150 74 L156 66" fill="none" stroke={ACCENT} strokeWidth="1.4" />
      <Label x={158} y={42} fill={ACCENT}>
        load
      </Label>
      <path d="M92 118 L62 150 M62 141 L62 150 L71 150" fill="none" stroke={ACCENT} strokeWidth="1.1" />
      <path d="M208 118 L238 150 M238 141 L238 150 L229 150" fill="none" stroke={ACCENT} strokeWidth="1.1" />
      <Label x={150} y={136} anchor="middle">
        compression
      </Label>
      <Label x={150} y={204} anchor="middle" fill={INK}>
        the arch turns weight into a push on the ground
      </Label>
    </g>
  );
}

function Lattice() {
  return (
    <g>
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => {
          const cx = 60 + col * 60 + (row % 2) * 30;
          const cy = 50 + row * 52;
          return (
            <g key={`${row}-${col}`}>
              <polygon
                points={[0, 1, 2, 3, 4, 5]
                  .map((k) => `${cx + 24 * Math.cos((k * Math.PI) / 3 + Math.PI / 6)},${cy + 24 * Math.sin((k * Math.PI) / 3 + Math.PI / 6)}`)
                  .join(' ')}
                fill="none"
                stroke={INK}
                strokeWidth="0.6"
                opacity="0.5"
              />
              <circle cx={cx} cy={cy - 24} r="3.2" fill={ACCENT} />
            </g>
          );
        }),
      )}
      <Label x={150} y={204} anchor="middle" fill={INK}>
        hydrogen bonds hold molecules apart
      </Label>
    </g>
  );
}

function Waves() {
  const wave = (phase: number, amp: number) => {
    const pts: string[] = [];
    for (let x = 20; x <= 280; x += 4) pts.push(`${x},${(amp * Math.sin((x / 260) * Math.PI * 6 + phase)).toFixed(2)}`);
    return `M${pts.join(' L')}`;
  };
  return (
    <g>
      <g transform="translate(0 50)">
        <path d={wave(0, 18)} fill="none" stroke={INK} strokeWidth="1.2" />
      </g>
      <g transform="translate(0 104)">
        <path d={wave(Math.PI, 18)} fill="none" stroke={ACCENT} strokeWidth="1.2" />
      </g>
      <line x1="20" y1="158" x2="280" y2="158" stroke={INK} strokeWidth="1.2" />
      <Label x={20} y={26}>
        incoming noise
      </Label>
      <Label x={20} y={80} fill={ACCENT}>
        inverted copy
      </Label>
      <Label x={20} y={146}>
        together: near silence
      </Label>
    </g>
  );
}

function Window() {
  return (
    <g>
      <rect x="40" y="40" width="90" height="120" fill="none" stroke={INK} strokeWidth="1" />
      {[
        [40, 40],
        [130, 40],
        [40, 160],
        [130, 160],
      ].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="9" fill="#d0683a" opacity="0.28" />
      ))}
      <rect x="170" y="40" width="90" height="120" rx="40" fill="none" stroke={INK} strokeWidth="1" />
      <Label x={85} y={186} anchor="middle">
        stress gathers in corners
      </Label>
      <Label x={215} y={186} anchor="middle" fill={ACCENT}>
        curves spread it out
      </Label>
    </g>
  );
}

const DIAGRAMS: Record<DiagramId, () => React.ReactElement> = {
  thunder: Thunder,
  mirror: Mirror,
  qr: Qr,
  gps: Gps,
  cones: Cones,
  forgetting: Forgetting,
  golden: Golden,
  bridge: Bridge,
  lattice: Lattice,
  waves: Waves,
  window: Window,
};

export const Diagram = memo(function Diagram({ id, title }: { id: DiagramId; title?: string }) {
  const D = DIAGRAMS[id];
  return (
    <svg viewBox="0 0 300 220" className="diagram" role="img" aria-label={title ? `Diagram: ${title}` : 'Diagram'}>
      <D />
    </svg>
  );
});
