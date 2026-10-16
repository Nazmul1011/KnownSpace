/** A slim column of dots that opens into subject names on hover — present, but out of the way. */
import { useUI } from '@/domain/ui-state';
import { categories } from '@/domain/knowledge';
import { camera } from '@/domain/world';
import { goToCategory } from '@/features/canvas';
import { CircleDashed } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { TopicPicker } from './topic-picker';
import './topic-rail.css';

export function Rail() {
  const filter = useUI((s) => s.filter);
  const topicsOpen = useUI((s) => s.overlay === 'topics');
  const random = () => {
    useUI.getState().setFilter(null);
    const c = camera.get();
    const a = Math.random() * Math.PI * 2;
    const d = 6000 + Math.random() * 9000;
    camera.flyTo({ x: c.x + Math.cos(a) * d, y: c.y + Math.sin(a) * d, z: 0.62 });
  };
  return (
    <nav className="hud rail-wrap hide-sm" aria-label="Subjects">
      <div className="rail island">
        <ul>
          <li>
            <button type="button" className={`rail-item${!filter ? ' is-active' : ''}`} onClick={() => goToCategory(null)} aria-pressed={!filter}>
              <span className="rail-dot is-all" />
              <span className="rail-label">For you</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={`rail-item${filter === c.id ? ' is-active' : ''}`}
                onClick={() => goToCategory(filter === c.id ? null : c.id)}
                aria-pressed={filter === c.id}
              >
                <span className="rail-dot" style={{ '--hue': c.hue } as React.CSSProperties} />
                <span className="rail-label">{c.label}</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="rail-item" onClick={random}>
              <span className="rail-dot is-ring" />
              <span className="rail-label">Random</span>
            </button>
          </li>
        </ul>
        <span className="rail-sep" />
        <button
          type="button"
          className={`rail-item rail-wheel${topicsOpen ? ' is-active' : ''}`}
          onClick={() => useUI.getState().setOverlay(topicsOpen ? null : 'topics')}
          aria-expanded={topicsOpen}
          title="Pick a topic (T)"
        >
          <CircleDashed size={15} strokeWidth={1.8} aria-hidden />
          <span className="rail-label">Pick a topic</span>
        </button>
      </div>
      <AnimatePresence>{topicsOpen && <TopicPicker key="picker" />}</AnimatePresence>
    </nav>
  );
}
