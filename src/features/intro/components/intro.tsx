/** First visit: one sentence, a slow orbit of things worth knowing, and a single way in. */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { byId, imageUrl, Visual, art } from '@/domain/knowledge';
import { useUI } from '@/domain/ui-state';
import { useVisitor, useReducedMotion } from '@/domain/visitor';
import { Mark, StudioCredit } from '@/shared/ui/brand';
import { useMedia } from '@/shared/hooks/use-media';
import { LoadingScreen } from './loading-screen';
import './intro.css';

/** White-background studio objects only: they float on the page like things set out on a table. */
const RING = [
  'hummingbird-hover',
  'lewis-chessmen',
  'kintsugi-gold-repair',
  'pisa',
  'parmesan-bank-vault',
  'tardigrade',
  'viking-horned-helmets',
  'willow-pattern-legend',
  'cuneiform',
  'brazil-nut-agouti',
  'greek-statues-painted',
  'intro-beads',
  'trex-skull',
  'gold-yellow',
];

const LEAVE_MS = 1150;

/** Loading: at least this long so the mark gets one full rise, never longer than the cap. */
const LOAD_MIN_MS = 1600;
const LOAD_MAX_MS = 5000;
/** Entrance: the ring turns and draws in over ENTER_MS, then settles into the orbit. */
const ENTER_MS = 2000;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** The loading screen shows once per page load; replaying the introduction from the menu skips it. */
let bootLoaded = false;

/** The mark's flight from the loading screen into the headline. */
const MARK_FLIGHT = { duration: 0.95, ease: [0.65, 0, 0.35, 1] } as const;

/** The large pictures the landing ring shows, so the loading screen can wait for them. */
function ringImages() {
  return RING.map((id) => {
    const v = byId[id]?.visual;
    return imageUrl((v && 'image' in v && v.image) || id, 'l');
  });
}

/** hand-tuned size for pieces that read larger than the rest */
const TRIM: Record<string, number> = { 'greek-statues-painted': 0.82, 'intro-dove-coin': 0.88, 'intro-beads': 0.9 };

/** each object gets a slot shaped like itself, so tall and wide things carry the same visual weight */
function slotSize(o: { visual: { kind: string; image?: string } }): React.CSSProperties {
  const a = 'image' in o.visual && o.visual.image ? (art[o.visual.image]?.aspect ?? 1) : 1;
  const r = Math.min(1.5, Math.max(0.6, a));
  const k = TRIM[('image' in o.visual && o.visual.image) || ''] ?? 1;
  return { '--sw': (Math.sqrt(r) * k).toFixed(3), '--sh': ((1 / Math.sqrt(r)) * k).toFixed(3) } as React.CSSProperties;
}
/** per-object scatter: how far it flies, which way it veers, how much it tumbles */
/**
 * The entrance: the whole ring arrives as one. It starts wider than the screen and turned back, then turns and
 * draws in together until every object is in its place, and the orbit carries on from there. Every object follows
 * the same path at the same moment, so the spacing between them never changes and nothing overlaps.
 */
const ENTER_SWEEP = Math.PI * 2 * 0.55;
const ENTER_REACH = 1.9;
/** objects fade in one after another round the ring, without changing where they are */
const ENTER_FADE_STEP_MS = 60;
const ENTER_FADE_MS = 500;
const SCATTER = RING.map((_, k) => {
  const h = Math.sin(k * 12.9898) * 43758.5453;
  const f = h - Math.floor(h);
  const g = Math.sin(k * 78.233) * 12345.678;
  const q = g - Math.floor(g);
  return { r: 0.8 + f * 1.4, dx: (q - 0.5) * 2, dy: (f - 0.5) * 2, spin: (q - 0.5) * 260 };
});

/** One landing picture: a knowledge object's own visual, or a landing-only image. */
function RingPicture({ id }: { id: string }) {
  const o = byId[id];
  return o ? <Visual obj={o} size="l" /> : <img className="v-img v-obj" src={imageUrl(id, 'l')} alt="" draggable={false} />;
}

export function Intro() {
  const phone = useMedia('(max-width: 720px)');
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leaveAt = useRef(0);
  const enterAt = useRef(0);
  const [loaded, setLoaded] = useState(bootLoaded);
  // on a replay from the menu there is no loading screen, so the mark plays its own rise instead
  const [replayed] = useState(bootLoaded);

  // wait for the ring's pictures (and fonts), then lift the loading screen
  useEffect(() => {
    if (bootLoaded) return;
    const started = performance.now();
    const urls = ringImages();
    let done = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      bootLoaded = true;
      window.setTimeout(() => setLoaded(true), Math.max(0, LOAD_MIN_MS - (performance.now() - started)));
    };
    const tick = () => {
      done += 1;
      if (done === urls.length + 1) finish();
    };
    for (const url of urls) {
      const img = new Image();
      img.onload = img.onerror = tick;
      img.src = url;
    }
    document.fonts.ready.then(tick, tick);
    const cap = window.setTimeout(finish, LOAD_MAX_MS);
    return () => window.clearTimeout(cap);
  }, []);

  useEffect(() => {
    if (loaded) enterAt.current = performance.now();
  }, [loaded]);

  useEffect(() => {
    let raf = 0;
    let phase = -Math.PI / 2;
    let last = performance.now();
    const place = (now: number) => {
      const dt = now - last;
      last = now;
      // leaving: the ring whips round faster and faster, then everything scatters outward
      const t = leaveAt.current ? Math.min(1, (now - leaveAt.current) / LEAVE_MS) : 0;
      const spin = t * t;
      if (!reduced) phase += dt * (0.000075 + spin * 0.012);
      const w = window.innerWidth;
      const h = window.innerHeight;
      // portrait screens (phones, upright tablets): a tall ring that runs along the edges, clear of the headline
      const portrait = h > w * 1.1;
      const phone = w <= 720;
      const rx = portrait ? w * (phone ? 0.5 : 0.44) : Math.min(w * 0.42, 600);
      const ry = portrait ? h * (phone ? 0.37 : 0.4) : Math.min(h * 0.37, 322);
      const burst = Math.max(0, (t - 0.25) / 0.75);
      const fly = burst * burst * 1.6;
      itemsRef.current.forEach((el, k) => {
        if (!el) return;
        // before the loading screen lifts, nothing is on stage
        if (!enterAt.current) {
          el.style.opacity = '0';
          return;
        }
        // entrance: the whole ring turns and draws in together, then joins the orbit
        const since = now - enterAt.current;
        const e = reduced ? 1 : easeInOutCubic(Math.min(1, Math.max(0, since / ENTER_MS)));
        const shown = reduced ? 1 : Math.min(1, Math.max(0, (since - k * ENTER_FADE_STEP_MS) / ENTER_FADE_MS));
        const a = phase + (k / RING.length) * Math.PI * 2 - (1 - e) * ENTER_SWEEP;
        const reach = 1 + (1 - e) * (ENTER_REACH - 1);
        const depth = (Math.sin(a) + 1) / 2; // 0 back, 1 front
        const s = (0.62 + depth * 0.46) * (1 + burst * 0.5);
        // each object flies off on its own skewed path, tumbling as it goes
        const jitter = SCATTER[k];
        const x = Math.cos(a) * rx * reach * (1 + fly * jitter.r) + jitter.dx * fly * w * 0.15;
        const y = Math.sin(a) * ry * reach * (1 + fly * jitter.r) + jitter.dy * fly * h * 0.15;
        const rot = Math.cos(a) * 6 + burst * jitter.spin;
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s * (1 + (1 - e) * 0.2)}) rotate(${rot}deg)`;
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.opacity = String((0.5 + depth * 0.5) * (1 - burst * burst) * shown);
        // soft while far back in the orbit, and while still travelling in; sharp once in place at the front
        const soft = Math.max(depth < 0.35 ? (0.35 - depth) * 5 : 0, (1 - e) * 6);
        el.style.filter = soft > 0.05 ? `blur(${soft.toFixed(2)}px)` : '';
      });
      raf = requestAnimationFrame(place);
    };
    raf = requestAnimationFrame(place);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const start = () => {
    if (leaving) return;
    leaveAt.current = performance.now();
    setLeaving(true);
    // cross-fade: the (already built) canvas starts appearing while the objects scatter
    window.setTimeout(() => useUI.setState({ introLeaving: true }), reduced ? 0 : 420);
    window.setTimeout(
      () => {
        useVisitor.getState().onboard('intro');
        useUI.getState().setIntro(false);
      },
      reduced ? 50 : LEAVE_MS,
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key === 'Enter' && document.activeElement === document.body)) start();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <motion.div
      className={`intro${leaving ? ' is-leaving' : ''}${loaded ? ' is-ready' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
    >
      {phone ? (
        // phones: two slow conveyor rows, one above the headline and one below, instead of the orbit
        <div className="intro-rows" aria-hidden>
          {[RING.slice(0, 7), RING.slice(7)].map((row, r) => (
            <div key={r} className={`intro-row intro-row--${r ? 'below' : 'above'}`}>
              <div className="intro-row-track">
                {[...row, ...row].map((id, k) => (
                  <div key={`${id}-${k}`} className="intro-row-item">
                    <RingPicture id={id} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="intro-ring" ref={ringRef} aria-hidden>
          {RING.map((id, k) => {
            const o = byId[id];
            const size = o ? slotSize(o) : slotSize({ visual: { kind: 'object', image: id } });
            return (
              <div key={id} className="intro-item" style={size} ref={(el) => void (itemsRef.current[k] = el)}>
                <RingPicture id={id} />
              </div>
            );
          })}
        </div>
      )}
      <div className="intro-haze" aria-hidden />
      <div className="intro-center">
        <span className="intro-brand">
          {loaded ? (
            // the same mark the loading screen showed, flying here and shrinking into place
            <motion.span layoutId="knowspace-mark" layoutCrossfade={false} className="intro-mark-slot" transition={MARK_FLIGHT}>
              <Mark size={40} animated={replayed} />
            </motion.span>
          ) : (
            <span className="intro-mark-slot" />
          )}
          <span className="intro-brand-name">Knowspace</span>
        </span>
        <h1 id="intro-title" className="intro-title">
          <span className="intro-line">There is always something</span> <span className="intro-line">worth knowing.</span>
        </h1>
        <p className="intro-sub">Bite-sized facts, fresh every day.</p>
        <button type="button" className="pill pill--ink pill--lg" onClick={start}>
          Start exploring
          <ArrowRight size={17} strokeWidth={1.9} aria-hidden />
        </button>
      </div>
      <div className="intro-credit">
        <StudioCredit />
      </div>
      <AnimatePresence>{!loaded && <LoadingScreen key="loading" />}</AnimatePresence>
    </motion.div>
  );
}
