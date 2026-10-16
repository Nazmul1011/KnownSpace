/** Saved, recent and learned things, kept as objects on a tilted shelf rather than rows in a table. */
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Bookmark, CheckCircle2, Clock3, Trash2, X } from 'lucide-react';
import { showMeSomething } from '@/features/canvas';
import { byId, categoryById, Visual, displayKind } from '@/domain/knowledge';
import { useUI, type CollectionTab } from '@/domain/ui-state';
import { useReducedMotion, useVisitor, type Visit } from '@/domain/visitor';
import { SegPill } from '@/shared/ui/seg-pill';
import { useShelfScroll } from '../hooks/use-shelf-scroll';
import './collection.css';

const TABS: { id: CollectionTab; label: string }[] = [
  { id: 'saved', label: 'Saved' },
  { id: 'recent', label: 'Recently discovered' },
  { id: 'learned', label: 'Learned' },
];

function ago(t: number) {
  const s = (Date.now() - t) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  const d = Math.floor(s / 86400);
  return d === 1 ? 'yesterday' : `${d} days ago`;
}

const EMPTY: Record<CollectionTab, { title: string; body: string; icon: typeof Clock3 }> = {
  saved: { title: 'Nothing saved yet', body: 'Open anything worth keeping and tap Save. It will wait for you here.', icon: Bookmark },
  recent: {
    title: 'Nothing discovered yet',
    body: 'Everything you open shows up here, newest first. Close this, wander the canvas and open whatever catches your eye.',
    icon: Clock3,
  },
  learned: { title: 'Nothing learned yet', body: 'When something sticks, mark it as learned. Five of them earn your first medal.', icon: CheckCircle2 },
};

function EmptyState({ tab }: { tab: CollectionTab }) {
  const e = EMPTY[tab];
  const I = e.icon;
  return (
    <motion.div
      key={tab}
      className="col-empty"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="col-empty-art" aria-hidden>
        <span className="ghost ghost--l" />
        <span className="ghost ghost--r" />
        <span className="ghost ghost--c">
          <span className="ghost-icon">
            <I size={22} strokeWidth={1.7} />
          </span>
          <span className="ghost-line" />
          <span className="ghost-line is-short" />
        </span>
      </div>
      <h3 className="col-empty-title">{e.title}</h3>
      <p className="col-empty-body">{e.body}</p>
      <div className="col-empty-actions">
        <button type="button" className="pill pill--ink pill--lg" onClick={() => useUI.getState().setOverlay(null)}>
          Start exploring
        </button>
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            useUI.getState().setOverlay(null);
            window.setTimeout(showMeSomething, 250);
          }}
        >
          Or surprise me
        </button>
      </div>
    </motion.div>
  );
}

const CLEAR_LABEL: Record<CollectionTab, string> = { saved: 'saved', recent: 'recently discovered', learned: 'learned' };

export function Collection() {
  const tab = useUI((s) => s.collectionTab);
  const reduced = useReducedMotion();
  const saved = useVisitor((s) => s.saved);
  const history = useVisitor((s) => s.history);
  const learnedMap = useVisitor((s) => s.learned);
  const learned: Visit[] = Object.entries(learnedMap)
    .map(([id, at]) => ({ id, at }))
    .sort((a, b) => b.at - a.at);
  const lists: Record<CollectionTab, Visit[]> = { saved, recent: history, learned };
  const list = lists[tab].filter((v) => byId[v.id]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && useUI.getState().setOverlay(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const loop = useShelfScroll(rackRef, { resetKey: tab, count: list.length });

  /** Empties the current tab; the toast offers Undo. */
  const clearAll = () => {
    const n = list.length;
    if (!n) return;
    const u = useVisitor.getState();
    let undo: () => void;
    if (tab === 'saved') {
      const prev = u.saved;
      useVisitor.setState({ saved: [] });
      undo = () => useVisitor.setState({ saved: prev });
    } else if (tab === 'recent') {
      const prev = u.clearRecent();
      undo = () => useVisitor.setState({ history: prev });
    } else {
      const prev = u.learned;
      useVisitor.setState({ learned: {} });
      undo = () => useVisitor.setState({ learned: prev });
    }
    useUI.getState().toast(`Cleared ${n} ${CLEAR_LABEL[tab]} ${n === 1 ? 'thing' : 'things'}.`, { label: 'Undo', run: undo });
  };

  return (
    <motion.div
      className="collection"
      role="dialog"
      aria-modal="true"
      aria-labelledby="col-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    >
      <div className="col-head">
        <div>
          <span className="col-eyebrow">Your collection</span>
          <h2 id="col-title" className="col-title">
            {TABS.find((t) => t.id === tab)?.label}
          </h2>
        </div>
        <div className="col-controls">
          <div className="seg" role="tablist" aria-label="Collection">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? 'is-on' : ''}
                onClick={() => useUI.getState().openCollection(t.id)}
              >
                {tab === t.id && <SegPill group="collection" instant={reduced} />}
                {t.label}
                <span className="seg-n">{lists[t.id].length}</span>
              </button>
            ))}
          </div>
          <button type="button" className="col-clear" onClick={clearAll} disabled={list.length === 0}>
            <Trash2 size={15} strokeWidth={1.8} aria-hidden />
            Clear all
          </button>
        </div>
        <button ref={closeRef} type="button" className="glass-btn col-close" aria-label="Close collection" onClick={() => useUI.getState().setOverlay(null)}>
          <X size={18} strokeWidth={1.8} aria-hidden />
        </button>
      </div>

      {list.length === 0 ? (
        <EmptyState tab={tab} />
      ) : (
        <div className="rack" ref={rackRef} role="list" aria-label="Drag, scroll or use the arrow keys to move along the shelf">
          {(loop ? [0, 1, 2] : [1]).flatMap((copy) =>
            list.map((v, k) => {
              const o = byId[v.id];
              // the copies either side are for looking at only: screen readers and Tab see the list once
              const clone = copy !== 1;
              return (
                <motion.div
                  key={`${tab}-${copy}-${v.id}`}
                  className="rack-slot"
                  role={clone ? undefined : 'listitem'}
                  aria-hidden={clone || undefined}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: clone ? 0 : Math.min(k, 10) * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    className="rack-card"
                    tabIndex={clone ? -1 : undefined}
                    onClick={() => useUI.getState().openObject(o.id)}
                    aria-label={`${o.title}, ${categoryById[o.category].label}`}
                  >
                    <span className={`rack-art rack-art--${displayKind(o)}`}>
                      <Visual obj={o} />
                    </span>
                    <span className="rack-meta">
                      <span className="rack-cat">
                        {categoryById[o.category].label} · {ago(v.at)}
                      </span>
                      <span className="rack-title">{o.title}</span>
                    </span>
                  </button>
                </motion.div>
              );
            }),
          )}
        </div>
      )}
    </motion.div>
  );
}
