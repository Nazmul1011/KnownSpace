/** Two wheels: a mood and a subject. */
import { useUI } from '@/domain/ui-state';
import { categories, moods, type CategoryId, type Mood } from '@/domain/knowledge';
import { goToTopic } from '@/features/canvas';
import { Wheel } from '@/shared/ui/wheel';
import { motion } from 'motion/react';
import { useState } from 'react';
import './topic-picker.css';

const TOPICS = [{ id: 'all', label: 'everything' }, ...categories.map((c) => ({ id: c.id, label: c.label.toLowerCase() }))];
const MOODS = moods.map((m) => ({ id: m.id, label: m.label }));

export function TopicPicker({ sheet = false }: { sheet?: boolean }) {
  const [mood, setMood] = useState(1);
  const [topic, setTopic] = useState(6);
  const go = () => {
    const t = TOPICS[topic].id;
    const m = MOODS[mood].id;
    useUI.getState().setOverlay(null);
    goToTopic(t === 'all' ? null : (t as CategoryId), m === 'any' ? null : (m as Mood));
  };
  return (
    <motion.div
      className={`popover picker${sheet ? ' is-sheet' : ''}`}
      role="dialog"
      aria-label="Pick a topic"
      initial={{ opacity: 0, x: sheet ? 0 : -8, y: sheet ? 20 : 0, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: sheet ? 0 : -6, y: sheet ? 20 : 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') useUI.getState().setOverlay(null);
        if (e.key === 'Enter') go();
      }}
    >
      <p className="picker-title">Choose a mood and a subject</p>
      <div className="picker-sentence">
        <div className="picker-wheels">
          <div className="wheel-band" aria-hidden />
          <Wheel items={MOODS} value={mood} onChange={setMood} label="Mood" width={sheet ? 132 : 150} />
          <span className="picker-word picker-mid">things about</span>
          <Wheel items={TOPICS} value={topic} onChange={setTopic} label="Subject" width={sheet ? 140 : 160} />
        </div>
      </div>
      <div className="picker-actions">
        <button type="button" className="pill pill--quiet" onClick={() => useUI.getState().setOverlay(null)}>
          Cancel
        </button>
        <button type="button" className="pill pill--ink" onClick={go}>
          Take me there
        </button>
      </div>
    </motion.div>
  );
}
