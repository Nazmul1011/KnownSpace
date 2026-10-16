/** Search that leads back into exploring: gather a cluster, jump to a subject, or fly to one object. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CornerDownLeft, RefreshCw, Search as SearchIcon, X } from 'lucide-react';
import { byId, objects, art, categoryById, type Category, type KnowledgeObject, Visual, displayKind } from '@/domain/knowledge';
import { flyToObject, gather, goToCategory } from '@/features/canvas';
import { searchCategories, searchObjects } from '@/domain/world';
import { useUI } from '@/domain/ui-state';
import { useVisitor } from '@/domain/visitor';
import { useMedia } from '@/shared/hooks/use-media';
import './search.css';

/** Search ideas that each find several things; eight are shown at a time. */
const SUGGESTION_POOL = [
  'volcanoes',
  'cats',
  'light',
  'memory',
  'ancient',
  'sound',
  'space',
  'food',
  'ocean',
  'bees',
  'gold',
  'sleep',
  'colour',
  'ice',
  'maps',
  'rome',
  'bread',
  'planets',
  'birds',
  'sharks',
  'illusions',
  'money',
  'glass',
  'electricity',
  'music',
  'trees',
  'eyes',
  'salt',
  'language',
  'weather',
  'bridges',
  'coffee',
  'fungi',
  'stars',
  'dreams',
  'moon',
  'magnets',
  'fire',
  'teeth',
];
const FIRST_SUGGESTIONS = ['volcanoes', 'cats', 'light', 'memory', 'ancient', 'sound', 'space', 'food'];

function shuffled<T>(list: readonly T[]) {
  const pool = list.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/** Studio objects with a picture, for the visual suggestions (the prism is left out by request). */
const SKIP = new Set(['newton-seven-colours', 'popcorn-pops']);
const OBJECTS = objects.filter((o) => o.visual.kind === 'object' && art[o.visual.image] && !art[o.visual.image].real && !SKIP.has(o.id));
const PICKS = 16;

function pickObjects() {
  return shuffled(OBJECTS).slice(0, PICKS);
}

type Row = { kind: 'gather'; q: string } | { kind: 'cat'; cat: Category } | { kind: 'obj'; obj: KnowledgeObject };

export function Search() {
  const open = useUI((s) => s.overlay === 'search');
  const [picks, setPicks] = useState(pickObjects);
  const [ideas, setIdeas] = useState(FIRST_SUGGESTIONS);
  const [spin, setSpin] = useState(0);
  const refreshIdeas = () => {
    setIdeas((prev) => shuffled(SUGGESTION_POOL.filter((t) => !prev.includes(t))).slice(0, 8));
    setPicks(pickObjects());
    setSpin((n) => n + 1);
    inputRef.current?.focus();
  };
  const [q, setQuery] = useState('');
  const [active, setActive] = useState(0);
  // a new query starts again from the first result
  const setQ = (value: string) => {
    setQuery(value);
    setActive(0);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const history = useVisitor((s) => s.history);
  const clearedAt = useVisitor((s) => s.recentClearedAt);
  const small = useMedia('(max-width: 1100px)');

  const rows: Row[] = useMemo(() => {
    const t = q.trim();
    if (!t)
      return history
        .filter((v) => v.at > clearedAt)
        .slice(0, 4)
        .map((v) => byId[v.id])
        .filter(Boolean)
        .map((obj) => ({ kind: 'obj', obj }) as Row);
    const cats = searchCategories(t)
      .slice(0, 2)
      .map((cat) => ({ kind: 'cat', cat }) as Row);
    const objs = searchObjects(t)
      .slice(0, 6)
      .map((h) => ({ kind: 'obj', obj: h.obj }) as Row);
    return [...(objs.length ? [{ kind: 'gather', q: t } as Row] : []), ...cats, ...objs];
  }, [q, history, clearedAt]);

  // ⌘K and / focus the field from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable]');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        if (useUI.getState().modal) return;
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => {
    if (useUI.getState().overlay === 'search') useUI.getState().setOverlay(null);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) close();
    };
    window.addEventListener('pointerdown', onDown, true);
    return () => window.removeEventListener('pointerdown', onDown, true);
  }, [open]);

  const choose = (row: Row | undefined) => {
    if (!row) {
      if (q.trim()) gather(q);
      setQ('');
      close();
      return;
    }
    if (row.kind === 'gather') gather(row.q);
    else if (row.kind === 'cat') goToCategory(row.cat.id);
    else flyToObject(row.obj.id);
    // start fresh next time: the "Try" suggestions and objects come back
    setQ('');
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(rows.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(rows[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (q) setQ('');
      else close();
    }
  };

  const listId = 'search-results';
  return (
    <div className={`search${open ? ' is-open' : ''}`} ref={boxRef}>
      <div className="search-field">
        <SearchIcon size={17} strokeWidth={1.8} aria-hidden className="search-icon" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => {
            // a fresh handful every time the dropdown opens
            if (!open) setPicks(pickObjects());
            useUI.getState().setOverlay('search');
          }}
          onKeyDown={onKeyDown}
          placeholder={small ? 'Search anything…' : "Search something you're curious about…"}
          aria-label="Search the canvas"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && rows[active] ? `sr-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
        />
        {q ? (
          <button type="button" className="search-clear" aria-label="Clear search" onClick={() => setQ('')}>
            <X size={14} strokeWidth={2} aria-hidden />
          </button>
        ) : (
          <kbd className="kbd hide-sm">⌘K</kbd>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="search-pop"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {!q.trim() && (
              <div className="search-sugg">
                <div className="search-h-row">
                  <span className="search-h">Try</span>
                  <button type="button" className="search-refresh" onClick={refreshIdeas} aria-label="Show other suggestions" title="Show other suggestions">
                    <RefreshCw size={14} strokeWidth={1.9} aria-hidden style={{ transform: `rotate(${spin * 180}deg)` }} />
                  </button>
                </div>
                <div className="search-chips" key={ideas.join()}>
                  {ideas.map((s) => (
                    <button key={s} type="button" className="chip" onClick={() => setQ(s)}>
                      {s}
                    </button>
                  ))}
                </div>
                <span className="search-h">Or pick something</span>
                <div className="search-objects">
                  {picks.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className="search-obj"
                      title={o.title}
                      aria-label={o.title}
                      onClick={() => {
                        flyToObject(o.id);
                        close();
                      }}
                    >
                      <Visual obj={o} />
                    </button>
                  ))}
                </div>
                {rows.length > 0 && (
                  <div className="search-h-row">
                    <span className="search-h">Recently discovered</span>
                    <button
                      type="button"
                      className="text-btn search-clear-recent"
                      onClick={() => {
                        useVisitor.getState().clearSearchRecents();
                        inputRef.current?.focus();
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}
            {q.trim() && rows.length === 0 && (
              <p className="search-empty">Nothing about “{q.trim()}” on the canvas yet. Try a place, an animal, or something in your kitchen.</p>
            )}
            <ul className="search-list" id={listId} role="listbox" aria-label="Results">
              {rows.map((row, k) => (
                <li
                  key={k}
                  id={`sr-${k}`}
                  role="option"
                  aria-selected={k === active}
                  className={`search-row${k === active ? ' is-active' : ''}`}
                  onPointerEnter={() => setActive(k)}
                  onClick={() => choose(row)}
                >
                  {row.kind === 'gather' && (
                    <>
                      <span className="search-row-icon is-ink">
                        <ArrowRight size={15} strokeWidth={2} aria-hidden />
                      </span>
                      <span className="search-row-main">
                        Gather everything about <b>“{row.q}”</b>
                      </span>
                      <CornerDownLeft size={14} strokeWidth={1.8} className="search-enter" aria-hidden />
                    </>
                  )}
                  {row.kind === 'cat' && (
                    <>
                      <span className="search-row-icon">
                        <span className="dot" style={{ background: row.cat.hue }} />
                      </span>
                      <span className="search-row-main">{row.cat.label}</span>
                      <span className="search-row-sub">Subject</span>
                    </>
                  )}
                  {row.kind === 'obj' && (
                    <>
                      <span className={`search-thumb search-thumb--${displayKind(row.obj)}`}>
                        <Visual obj={row.obj} />
                      </span>
                      <span className="search-row-main">{row.obj.title}</span>
                      <span className="search-row-sub">{categoryById[row.obj.category].label}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
