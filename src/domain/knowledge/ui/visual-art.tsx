/** Non-photographic visuals: the miniature globe, typographic objects and the notification stack. */
import { memo, useId, useMemo } from 'react';
import { Brain } from 'lucide-react';
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import land110 from 'world-atlas/land-110m.json';
import type { KnowledgeObject } from '../model/types';

const land = feature(land110 as unknown as Topology, (land110 as unknown as Topology).objects.land as GeometryCollection);
const graticule = geoGraticule10();

export const MiniMap = memo(function MiniMap({ lat, lon, place }: { lat: number; lon: number; place: string }) {
  const id = useId();
  const paths = useMemo(() => {
    const projection = geoOrthographic()
      .rotate([-lon + 18, -lat + 12])
      .translate([110, 110])
      .scale(104)
      .clipAngle(90);
    const path = geoPath(projection);
    const p = projection([lon, lat]) ?? [110, 110];
    return {
      sphere: path({ type: 'Sphere' }) ?? '',
      grid: path(graticule) ?? '',
      land: path(land) ?? '',
      pin: p,
    };
  }, [lat, lon]);
  return (
    <svg viewBox="0 0 220 220" className="minimap" role="img" aria-label={`Map pin at ${place}`}>
      <defs>
        <radialGradient id={`${id}-shade`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#1c1b16" stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <path d={paths.sphere} fill="var(--sunk)" />
      <path d={paths.grid} fill="none" stroke="var(--ink)" strokeOpacity="0.08" strokeWidth="0.5" />
      <path d={paths.land} fill="#d9d6cd" stroke="#c9c5ba" strokeWidth="0.4" />
      <path d={paths.sphere} fill={`url(#${id}-shade)`} />
      <path d={paths.sphere} fill="none" stroke="var(--ink)" strokeOpacity="0.14" strokeWidth="0.6" />
      <circle cx={paths.pin[0]} cy={paths.pin[1]} r="9" fill="var(--warm)" opacity="0.18" className="minimap-pulse" />
      <circle cx={paths.pin[0]} cy={paths.pin[1]} r="3.6" fill="var(--ink)" stroke="#fff" strokeWidth="1.4" />
    </svg>
  );
});

/* ---------------------------------------------------------- typographic */

function BlackHole({ light = false }: { light?: boolean }) {
  const id = useId();
  if (light) {
    // a studio-object version for light surfaces: a dark disc in a warm halo, no backdrop to fade
    return (
      <span className="ta ta-bh-light">
        <svg viewBox="0 0 240 200" className="ta-bh-light-art" aria-hidden>
          <defs>
            <radialGradient id={`${id}-halo`} cx="50%" cy="46%" r="50%">
              <stop offset="30%" stopColor="#f6c27a" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f0a35e" stopOpacity="0.55" />
              <stop offset="56%" stopColor="#f3b46a" stopOpacity="0.2" />
              <stop offset="78%" stopColor="#f6c27a" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#f6c27a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${id}-disk`} x1="0" x2="1">
              <stop offset="0%" stopColor="#f0a35e" stopOpacity="0" />
              <stop offset="28%" stopColor="#f2b46e" />
              <stop offset="62%" stopColor="#e4823f" />
              <stop offset="100%" stopColor="#e4823f" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c1b16" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#1c1b16" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="120" cy="184" rx="56" ry="7" fill={`url(#${id}-shadow)`} />
          <circle cx="120" cy="92" r="96" fill={`url(#${id}-halo)`} />
          {/* back half of the disk, then the hole, then the front half */}
          <path d="M28 92 A92 16 0 0 1 212 92" fill="none" stroke={`url(#${id}-disk)`} strokeWidth="4" opacity="0.7" />
          <circle cx="120" cy="92" r="36.5" fill="none" stroke="#f7cf92" strokeWidth="2.4" />
          <circle cx="120" cy="92" r="34" fill="#141413" />
          <path d="M28 92 A92 16 0 0 0 212 92" fill="none" stroke={`url(#${id}-disk)`} strokeWidth="5.5" />
          <path d="M72 84 A50 50 0 0 1 168 84" fill="none" stroke="#f7d29c" strokeWidth="1.8" opacity="0.85" />
        </svg>
      </span>
    );
  }
  return (
    <span className="ta ta-bh">
      <svg viewBox="0 0 200 200" className="ta-bh-art" aria-hidden>
        <defs>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="38%" stopColor="#141413" />
            <stop offset="47%" stopColor="#f6c27a" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#e0773a" stopOpacity="0.45" />
            <stop offset="72%" stopColor="#e0773a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#e0773a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-disk`} x1="0" x2="1">
            <stop offset="0%" stopColor="#f3b46a" stopOpacity="0" />
            <stop offset="30%" stopColor="#f7cf92" />
            <stop offset="70%" stopColor="#e88b45" />
            <stop offset="100%" stopColor="#e88b45" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill={`url(#${id}-glow)`} />
        <g className="ta-bh-spin">
          <ellipse cx="100" cy="100" rx="88" ry="15" fill="none" stroke={`url(#${id}-disk)`} strokeWidth="5" />
        </g>
        <circle cx="100" cy="100" r="34" fill="#141413" />
        <path d="M54 92 A48 48 0 0 1 146 92" fill="none" stroke="#f7d29c" strokeWidth="2.2" opacity="0.9" />
      </svg>
      <span className="ta-bh-word">Black holes</span>
    </span>
  );
}

function Frequency() {
  const words = [
    { t: 'Baader–Meinhof', s: 1.9, x: 8, y: 14, o: 1 },
    { t: 'Baader–Meinhof', s: 0.9, x: 54, y: 4, o: 0.38 },
    { t: 'Baader–Meinhof', s: 1.15, x: 40, y: 44, o: 0.55 },
    { t: 'Baader–Meinhof', s: 0.75, x: 6, y: 66, o: 0.3 },
    { t: 'Baader–Meinhof', s: 1.0, x: 50, y: 78, o: 0.45 },
  ];
  return (
    <span className="ta ta-freq" aria-hidden>
      {words.map((w, k) => (
        <span key={k} style={{ left: `${w.x}%`, top: `${w.y}%`, fontSize: `${w.s}em`, opacity: w.o }}>
          {w.t}
        </span>
      ))}
    </span>
  );
}

function Helvetica() {
  return (
    <span className="ta ta-helv" aria-hidden>
      <span className="ta-helv-aa">Aa</span>
      <span className="ta-helv-line">
        <s>Neue Haas Grotesk</s> <span>→ Helvetica</span>
      </span>
    </span>
  );
}

function Memory() {
  const letters = 'Remember'.split('');
  const off = [
    [0, 0, 0],
    [1, -2, 0.6],
    [-1, 1, 0],
    [0, 3, 1.2],
    [2, -1, 0],
    [-2, 2, 0.8],
    [1, 0, 0],
    [0, -3, 1.6],
  ];
  return (
    <span className="ta ta-mem" aria-hidden>
      <span className="ta-mem-word">
        {letters.map((l, k) => (
          <span key={k} style={{ transform: `translate(${off[k][0]}px, ${off[k][1]}px)`, filter: off[k][2] ? `blur(${off[k][2]}px)` : undefined }}>
            {l}
          </span>
        ))}
      </span>
      <span className="ta-mem-ghost">Remember</span>
    </span>
  );
}

function Price() {
  return (
    <span className="ta ta-price" aria-hidden>
      <span className="ta-price-big">
        £9<span>.99</span>
      </span>
      <span className="ta-price-vs">reads closer to £9 than £10</span>
    </span>
  );
}

function Languages({ obj }: { obj: KnowledgeObject }) {
  const hellos = ['Kia ora', 'Shwmae', 'Aloha', 'Dia dhuit', 'Bures', 'Haku', 'Boozhoo'];
  return (
    <span className="ta ta-lang" aria-hidden>
      <span className="ta-lang-stat">{obj.stat?.value ?? '7,000+'}</span>
      <span className="ta-lang-label">{obj.stat?.label ?? 'living languages'}</span>
      <span className="ta-lang-row">
        {hellos.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </span>
    </span>
  );
}

function StatArt({ obj }: { obj: KnowledgeObject }) {
  return (
    <span className="ta ta-stat" aria-hidden>
      <span className="ta-stat-v">{obj.stat?.value}</span>
      <span className="ta-stat-l">{obj.stat?.label}</span>
    </span>
  );
}

export const TypeArt = memo(function TypeArt({ obj, light = false }: { obj: KnowledgeObject; light?: boolean }) {
  switch (obj.id) {
    case 'black-holes':
      return <BlackHole light={light} />;
    case 'frequency-illusion':
      return <Frequency />;
    case 'helvetica':
      return <Helvetica />;
    case 'memory-rebuilt':
      return <Memory />;
    case 'price-99':
      return <Price />;
    case 'languages-endangered':
      return <Languages obj={obj} />;
    default:
      return <StatArt obj={obj} />;
  }
});

/* --------------------------------------------------------- notification */

export const NotifArt = memo(function NotifArt() {
  return (
    <span className="notif" aria-hidden>
      <span className="notif-card notif-1">
        <span className="notif-icon">
          <Brain size={15} strokeWidth={1.8} />
        </span>
        <span className="notif-body">
          <span className="notif-top">
            <b>Why did I come in here?</b>
            <i>now</i>
          </span>
          <span className="notif-sub">Your brain would like a word.</span>
        </span>
      </span>
      <span className="notif-card notif-2">
        <span className="notif-body">
          <span className="notif-top">
            <b>Walked through a doorway</b>
            <i>4s ago</i>
          </span>
        </span>
      </span>
      <span className="notif-card notif-3">+2 thoughts filed under “previous room”</span>
    </span>
  );
});
