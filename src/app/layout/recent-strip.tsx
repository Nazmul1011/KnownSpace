/** Bottom-left: the active subject filter and the stack of recently opened things. */
import { useUI } from '@/domain/ui-state';
import { categoryById, byId, Visual, displayKind } from '@/domain/knowledge';
import { useVisitor } from '@/domain/visitor';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import './recent-strip.css';

export function RecentStrip() {
  const history = useVisitor((s) => s.history);
  const filter = useUI((s) => s.filter);
  const recent = history
    .slice(0, 4)
    .map((v) => byId[v.id])
    .filter(Boolean);
  return (
    <aside className="hud hud-bl hide-sm" aria-label="Recently discovered">
      <AnimatePresence>
        {filter && (
          <motion.button
            key="filter"
            type="button"
            className="pill pill--glass filter-chip"
            onClick={() => useUI.getState().setFilter(null)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            aria-label={`Showing ${categoryById[filter].label}. Show everything`}
          >
            <span className="dot" style={{ background: categoryById[filter].hue }} />
            Showing {categoryById[filter].label.toLowerCase()}
            <X size={13} strokeWidth={2} aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
      {recent.length > 0 && (
        <button type="button" className="recent" onClick={() => useUI.getState().openCollection('recent')}>
          <span className="recent-stack" aria-hidden>
            {recent.map((o, k) => (
              <span key={o.id} className={`recent-thumb recent-thumb--${displayKind(o)}`} style={{ zIndex: 10 - k }}>
                <Visual obj={o} />
              </span>
            ))}
          </span>
          <span className="recent-label">Recently discovered</span>
        </button>
      )}
    </aside>
  );
}
