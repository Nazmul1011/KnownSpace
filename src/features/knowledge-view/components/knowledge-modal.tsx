/**
 * The detail view: a floating sheet that grows out of the object you clicked and folds back into it.
 * Short by design — a minute of reading, one surprise, three tiny facts and a way onward.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import { ArrowRight, ArrowUpRight, Bookmark, Check, Share, X } from 'lucide-react';
import { byId, categoryById, type KnowledgeObject, Visual, displayKind, art } from '@/domain/knowledge';
import { useUI, type ModalState } from '@/domain/ui-state';
import { useVisitor, useReducedMotion } from '@/domain/visitor';
import { nextMedal, useSession } from '@/features/session-goal';
import { useMedia } from '@/shared/hooks/use-media';
import { ExternalLink } from '@/shared/ui/external-link';
import './knowledge-modal.css';

export function KnowledgeModal() {
  const modal = useUI((s) => s.modal);
  return <AnimatePresence>{modal && <Sheet key="sheet" modal={modal} />}</AnimatePresence>;
}

function Sheet({ modal }: { modal: ModalState }) {
  const id = modal.trail[modal.index];
  const o = byId[id];
  const reduced = useReducedMotion();
  const mobile = useMedia('(max-width: 720px)');
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [closing, setClosing] = useState<null | { x: number; y: number; scale: number }>(null);
  const [scrolled, setScrolled] = useState(false);
  const [savePop, setSavePop] = useState(false);
  const popTimer = useRef(0);
  const drag = useDragControls();

  const saved = useVisitor((s) => s.saved.some((v) => v.id === id));
  const learned = useVisitor((s) => !!s.learned[id]);

  /* opening: record the visit, update the URL */
  useEffect(() => {
    if (!o) return;
    useVisitor.getState().recordOpen(o.id, o.category);
    const url = new URL(window.location.href);
    url.searchParams.set('k', o.id);
    window.history.replaceState(null, '', url);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [o]);

  useLayoutEffect(() => {
    document.body.classList.add('has-modal');
    returnFocus.current =
      (modal.originKey && (document.querySelector(`[data-key="${CSS.escape(modal.originKey)}"] .ko`) as HTMLElement)) ||
      (document.activeElement as HTMLElement);
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.classList.remove('has-modal');
      const url = new URL(window.location.href);
      url.searchParams.delete('k');
      window.history.replaceState(null, '', url);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const W = mobile ? window.innerWidth : Math.min(720, window.innerWidth - 48);
  const origin = modal.originRect;
  const initial = reduced
    ? { opacity: 0 }
    : mobile
      ? { y: '100%' }
      : origin
        ? {
            x: origin.x + origin.w / 2 - window.innerWidth / 2,
            y: origin.y + origin.h / 2 - window.innerHeight / 2,
            scale: Math.max(0.2, origin.w / W),
            opacity: 0,
          }
        : { y: 40, scale: 0.97, opacity: 0 };

  const close = () => {
    if (closing) return;
    if (reduced) return useUI.getState().closeModal();
    if (mobile) return setClosing({ x: 0, y: window.innerHeight, scale: 1 });
    // fold back into the object it came from, if it's still on screen and we're still on it
    const el = modal.originKey && modal.index === 0 ? document.querySelector(`[data-key="${CSS.escape(modal.originKey)}"] [data-visual]`) : null;
    const r = el?.getBoundingClientRect();
    if (r && r.width > 4 && r.bottom > 0 && r.top < window.innerHeight)
      setClosing({ x: r.x + r.width / 2 - window.innerWidth / 2, y: r.y + r.height / 2 - window.innerHeight / 2, scale: Math.max(0.15, r.width / W) });
    else setClosing({ x: 0, y: 24, scale: 0.96 });
  };

  /* keys: Esc closes, Tab stays inside */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (useSession.getState().celebrate) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        close();
      } else if (e.key === 'Tab' && panelRef.current) {
        const f = [...panelRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')].filter(
          (x) => !x.hasAttribute('disabled'),
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  });

  if (!o) return null;
  /** "Learned": count it, then fold back into the canvas so you can keep browsing. */
  const learn = () => {
    const u = useVisitor.getState();
    const ses = useSession.getState();
    if (learned) {
      u.toggleLearned(o.id);
      ses.unlearn(o.id);
      return;
    }
    ses.learn(o.id);
    u.toggleLearned(o.id);
    if (!useSession.getState().celebrate) {
      const n = useSession.getState().learned.length;
      const nx = nextMedal(n);
      useUI.getState().toast(nx ? `Learned. ${nx.at - n} more to ${nx.name}.` : 'Learned.');
    }
    close();
  };

  const share = async () => {
    const url = `${window.location.origin}/?k=${o.id}`;
    try {
      if (navigator.share && mobile) await navigator.share({ title: o.title, text: o.shortFact, url });
      else {
        await navigator.clipboard.writeText(url);
        useUI.getState().toast('Link copied.');
      }
    } catch {
      /* dismissed */
    }
  };

  const animateTo = closing ? { ...closing, opacity: mobile ? 1 : 0 } : mobile ? { y: 0 } : { x: 0, y: 0, scale: 1, opacity: 1 };

  return (
    <>
      <motion.div
        className="km-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4 }}
        onClick={close}
        aria-hidden
      />
      <div className={`km-wrap${mobile ? ' is-sheet' : ''}`}>
        <motion.div
          ref={panelRef}
          className={`km${scrolled ? ' is-scrolled' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="km-title"
          tabIndex={-1}
          initial={initial}
          animate={animateTo}
          exit={{ opacity: 0, transition: { duration: 0.01 } }}
          transition={
            reduced
              ? { duration: 0.15 }
              : closing
                ? { type: 'spring', stiffness: 260, damping: 32 }
                : { type: 'spring', stiffness: 210, damping: 27, mass: 0.9 }
          }
          onAnimationComplete={() => closing && useUI.getState().closeModal()}
          drag={mobile ? 'y' : false}
          dragControls={drag}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 120 || info.velocity.y > 600) close();
          }}
        >
          {mobile && <div className="km-grab" onPointerDown={(e) => drag.start(e)} aria-hidden />}
          <div className="km-topfade" aria-hidden />
          <div className="km-scroll" ref={scrollRef} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 6)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={o.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reduced ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <Hero o={o} />
                <div className="km-body">
                  {modal.trail.length > 1 && <Trail modal={modal} />}
                  <div className="km-meta">
                    <span className="km-cat">
                      <span className="km-dot" style={{ background: categoryById[o.category].hue }} />
                      {categoryById[o.category].label}
                    </span>
                    <span>{o.subcategory}</span>
                    <span>{o.estimatedReadTime} sec read</span>
                  </div>
                  <h2 id="km-title" className="km-title">
                    {o.title}
                  </h2>
                  <p className="km-desc">{o.description}</p>
                  {o.certainty === 'debated' && (
                    <p className="km-caveat">
                      <span className="km-caveat-tag">Still debated</span>
                      {o.caveat}
                    </p>
                  )}
                  <section className="km-section">
                    <h3 className="km-h">The interesting part</h3>
                    <p className="km-pull">{o.interestingFact}</p>
                  </section>
                  <OneMore o={o} />
                  <section className="km-section">
                    <h3 className="km-h">Three tiny facts</h3>
                    <ol className="km-facts">
                      {o.facts.map((f, k) => (
                        <li key={k}>
                          <span className="km-fact-n">{String(k + 1).padStart(2, '0')}</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                  <p className="km-source">
                    Source
                    <ExternalLink href={o.source.url}>
                      {o.source.label}
                      <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden />
                    </ExternalLink>
                  </p>
                  <PhotoCredit o={o} />
                  <Related o={o} />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
          <div className="km-bottomfade" aria-hidden />
          <footer className="km-bar">
            <button
              type="button"
              className={`km-act km-save${saved ? ' is-on' : ''}${savePop ? ' just-saved' : ''}`}
              aria-pressed={saved}
              onClick={() => {
                const on = useVisitor.getState().toggleSave(o.id);
                // replay the burst each time something is saved
                window.clearTimeout(popTimer.current);
                setSavePop(false);
                if (on) {
                  requestAnimationFrame(() => setSavePop(true));
                  popTimer.current = window.setTimeout(() => setSavePop(false), 900);
                }
              }}
            >
              <span className="save-fx" aria-hidden>
                <span className="save-fx-burst" />
                <span className="save-fx-ring" />
                {Array.from({ length: 7 }, (_, k) => (
                  <span key={k} className="save-fx-dots" style={{ '--a': `${k * (360 / 7)}deg` } as React.CSSProperties}>
                    <i />
                    <i />
                  </span>
                ))}
                <Bookmark size={19} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} />
              </span>
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
            <button type="button" className="km-act" onClick={share}>
              <Share size={19} strokeWidth={1.8} aria-hidden />
              <span>Share</span>
            </button>
            <span className="km-bar-gap" />
            <button
              type="button"
              className={`pill km-learn${learned ? ' is-learned' : ''}`}
              aria-pressed={learned}
              onClick={learn}
              title={learned ? 'Click to undo' : 'Count this toward today’s session'}
            >
              <span className="km-learn-check" aria-hidden>
                <Check size={13} strokeWidth={2.8} />
              </span>
              <span>{learned ? 'Marked as learned' : 'Mark as learned'}</span>
            </button>
          </footer>
          <button type="button" className="km-close glass-btn" aria-label="Close" onClick={close}>
            <X size={18} strokeWidth={1.8} aria-hidden />
          </button>
        </motion.div>
      </div>
    </>
  );
}

function Hero({ o }: { o: KnowledgeObject }) {
  const kind = displayKind(o);
  const a = 'image' in o.visual && o.visual.image ? art[o.visual.image] : undefined;
  return (
    <div className={`km-hero km-hero--${kind}${a?.dark ? ' is-dark' : ''}`} style={a ? ({ '--glow': a.glow } as React.CSSProperties) : undefined}>
      <Visual obj={o} size="l" alt={kind === 'photo' || kind === 'object' ? `Illustrative image: ${o.title}` : ''} />
      {(kind === 'photo' || kind === 'object') && (
        <span className="km-hero-blur" aria-hidden>
          <Visual obj={o} size="l" />
        </span>
      )}
      <span className="km-hero-veil" aria-hidden />
      {o.visual.kind === 'map' && <span className="km-hero-place">{o.visual.place}</span>}
    </div>
  );
}

function Trail({ modal }: { modal: ModalState }) {
  return (
    <nav className="km-trail" aria-label="Your trail">
      {modal.trail.map((id, k) => (
        <span key={`${id}-${k}`} className="km-trail-step">
          {k > 0 && <span className="km-trail-arrow">→</span>}
          <button
            type="button"
            className={k === modal.index ? 'is-current' : ''}
            aria-current={k === modal.index ? 'step' : undefined}
            onClick={() => useUI.getState().goTrail(k)}
          >
            {shortName(byId[id]?.title ?? id)}
          </button>
        </span>
      ))}
    </nav>
  );
}

function shortName(t: string) {
  const s = t.replace(/^(Why|How|What|Do|Does|The|A|An)\s+/i, '').replace(/[?.]$/, '');
  return s.length > 26 ? s.slice(0, 24).trimEnd() + '…' : s;
}

function OneMore({ o }: { o: KnowledgeObject }) {
  const [open, setOpen] = useState(false);
  return (
    <section className={`km-more${open ? ' is-open' : ''}`}>
      <AnimatePresence initial={false} mode="popLayout">
        {open ? (
          <motion.div key="text" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <h3 className="km-h">One more thing</h3>
            <p className="km-more-text">{o.oneMoreThing}</p>
          </motion.div>
        ) : (
          <motion.button key="btn" type="button" className="km-more-btn" onClick={() => setOpen(true)} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
            One more thing <ArrowRight size={15} strokeWidth={1.9} aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

function Related({ o }: { o: KnowledgeObject }) {
  const rel = o.relatedTopics
    .map((id) => byId[id])
    .filter(Boolean)
    .slice(0, 5);
  if (!rel.length) return null;
  return (
    <section className="km-related">
      <h3 className="km-h">Related</h3>
      <div className="km-rel-row">
        {rel.map((r, k) => (
          <button
            key={r.id}
            type="button"
            className="km-rel"
            style={{ '--tilt': `${k % 2 ? 1.6 : -1.4}deg` } as React.CSSProperties}
            onClick={() => useUI.getState().pushObject(r.id)}
          >
            <span className={`km-rel-art km-rel-art--${displayKind(r)}`}>
              <Visual obj={r} />
            </span>
            <span className="km-rel-title">{r.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

const PROVIDERS: Record<string, string> = { wikimedia: 'Wikimedia Commons', flickr: 'Flickr', nasa: 'NASA', rawpixel: 'rawpixel', smithsonian: 'Smithsonian' };

function PhotoCredit({ o }: { o: KnowledgeObject }) {
  const c = 'image' in o.visual && o.visual.image ? art[o.visual.image]?.credit : undefined;
  if (!c) return null;
  return (
    <p className="km-credit">
      Photo
      <span>
        <ExternalLink href={c.page}>{c.creator || 'Unknown'}</ExternalLink>
        {' · '}
        {c.licenseUrl ? <ExternalLink href={c.licenseUrl}>{c.license}</ExternalLink> : c.license}
        {c.provider ? ` · via ${PROVIDERS[c.provider.toLowerCase()] ?? c.provider}` : ''}
      </span>
    </p>
  );
}
