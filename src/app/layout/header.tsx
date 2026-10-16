import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bookmark, Clock3, Dices, Play, Settings2 } from 'lucide-react';
import { byId, categoryById, Visual, displayKind } from '@/domain/knowledge';
import { freshStart, showMeSomething } from '@/features/canvas';
import { useUI } from '@/domain/ui-state';
import { streak, useVisitor } from '@/domain/visitor';
import { SESSION_GOAL, nextMedal, useSession, MedalTrack, SessionRing } from '@/features/session-goal';
import { COFFEE_URL } from '@/shared/config/links';
import { CoffeeCup, StudioCredit, Wordmark } from '@/shared/ui/brand';
import { Search } from '@/features/search';
import { ExternalLink } from '@/shared/ui/external-link';
import './header.css';

export function Header() {
  return (
    <header className="hud hud-top">
      <div className="island brand">
        <button type="button" className="brand-home" onClick={freshStart} aria-label="Knowspace — start fresh">
          <Wordmark />
        </button>
        <span className="brand-sep hide-md" aria-hidden />
        <StudioCredit className="hide-md" />
      </div>
      <Search />
      <div className="hud-right">
        <Progress />
        <button type="button" className="pill pill--glass hide-sm surprise-btn" onClick={showMeSomething} title="Surprise me (S)">
          <Dices size={16} strokeWidth={1.8} aria-hidden className="surprise-dice" />
          Surprise me
        </button>
        <Menu />
      </div>
    </header>
  );
}

function usePopover(name: 'progress' | 'menu') {
  const open = useUI((s) => s.overlay === name);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) useUI.getState().setOverlay(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && useUI.getState().setOverlay(null);
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return { open, ref, toggle: () => useUI.getState().setOverlay(open ? null : name) };
}

const pop = {
  initial: { opacity: 0, y: -6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.14 } },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};

function Progress() {
  const history = useVisitor((s) => s.history);
  const saved = useVisitor((s) => s.saved.length);
  const days = useVisitor((s) => s.days);
  const count = useSession((s) => s.learned.length);
  const rounds = useSession((s) => s.rounds);
  const { open, ref, toggle } = usePopover('progress');
  const discovered = history.length;
  const topics = new Set(history.map((v) => byId[v.id]?.category).filter(Boolean)).size;
  const st = streak(days);
  const nx = nextMedal(count);
  return (
    <div className="pop-anchor" ref={ref}>
      <button type="button" className="progress" onClick={toggle} aria-expanded={open} aria-haspopup="dialog">
        <SessionRing count={count} />
        <span className="hide-sm">
          {count} of {SESSION_GOAL} today
        </span>
        <span className="show-sm">
          {count}/{SESSION_GOAL}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="popover progress-pop" role="dialog" aria-label="Today's session" {...pop}>
            <p className="session-pop-title">
              Today's session
              {rounds > 0 && (
                <span className="session-rounds">
                  {rounds} {rounds === 1 ? 'session' : 'sessions'} completed today
                </span>
              )}
            </p>
            <p className="session-pop-line">
              {count === 0 ? (
                <>{rounds > 0 ? 'A fresh session. Learn five things to earn the first medal again.' : 'Learn five things to earn your first medal.'}</>
              ) : (
                <>
                  <b>{(nx?.at ?? SESSION_GOAL) - count} more</b> to {nx?.name}. Twenty completes the session.
                </>
              )}
            </p>
            <MedalTrack count={count} size={44} />
            <p className="session-pop-note">Mark something as learned to count it. After twenty, the session starts again from zero.</p>
            {discovered > 0 && (
              <>
                <span className="menu-sep" />
                <p className="progress-line">
                  You've opened <b>{discovered}</b> {discovered === 1 ? 'thing' : 'things'} across <b>{topics}</b> {topics === 1 ? 'subject' : 'subjects'}
                  {saved ? (
                    <>
                      {' '}
                      and saved <b>{saved}</b>
                    </>
                  ) : null}
                  .{st > 1 && <> That's {st} days in a row.</>}
                </p>
                <div className="mini-row">
                  {history.slice(0, 6).map((v) => {
                    const o = byId[v.id];
                    return o ? (
                      <button
                        key={v.id}
                        type="button"
                        className={`mini-obj mini-obj--${displayKind(o)}`}
                        title={o.title}
                        onClick={() => useUI.getState().openObject(o.id)}
                      >
                        <Visual obj={o} />
                      </button>
                    ) : null;
                  })}
                </div>
                <div className="progress-links">
                  <button type="button" className="text-btn" onClick={() => useUI.getState().openCollection('recent')}>
                    Recently discovered →
                  </button>
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => {
                      const prev = useVisitor.getState().clearRecent();
                      useUI.getState().setOverlay(null);
                      useUI.getState().toast('Recently discovered cleared.', { label: 'Undo', run: () => useVisitor.setState({ history: prev }) });
                    }}
                  >
                    Clear
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Menu() {
  const { open, ref, toggle } = usePopover('menu');
  const saved = useVisitor((s) => s.saved.length);
  const fav = useVisitor((s) => Object.entries(s.affinity).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0]);
  const hue = fav ? categoryById[fav as keyof typeof categoryById]?.hue : undefined;
  return (
    <div className="pop-anchor" ref={ref}>
      <button
        type="button"
        className="avatar"
        onClick={toggle}
        aria-label="Your collection and settings"
        aria-expanded={open}
        aria-haspopup="menu"
        style={hue ? ({ '--hue': hue } as React.CSSProperties) : undefined}
      >
        <span aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="popover menu" role="menu" {...pop}>
            <button type="button" role="menuitem" onClick={() => useUI.getState().openCollection('saved')}>
              <Bookmark size={16} strokeWidth={1.8} aria-hidden /> Saved
              {saved > 0 && <span className="menu-count">{saved}</span>}
            </button>
            <button type="button" role="menuitem" onClick={() => useUI.getState().openCollection('recent')}>
              <Clock3 size={16} strokeWidth={1.8} aria-hidden /> Recently discovered
            </button>
            <button type="button" role="menuitem" onClick={() => useUI.getState().setOverlay('settings')}>
              <Settings2 size={16} strokeWidth={1.8} aria-hidden /> Settings
            </button>
            <span className="menu-sep" />
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                useUI.getState().setOverlay(null);
                useUI.getState().setIntro(true);
              }}
            >
              <Play size={16} strokeWidth={1.8} aria-hidden /> Replay introduction
            </button>
            <span className="menu-sep show-sm" />
            <ExternalLink role="menuitem" className="menu-link show-sm" href={COFFEE_URL} onClick={() => useUI.getState().setOverlay(null)}>
              <CoffeeCup size={16} /> Buy me a coffee
            </ExternalLink>
            <span className="menu-sep" />
            <p className="menu-rights">© {new Date().getFullYear()} Gr8r Studio. All rights reserved.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
