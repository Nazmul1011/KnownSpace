/** The single bottom bar on phones: topics, discover, surprise. */
import { useUI } from '@/domain/ui-state';
import { LiveCompass, refreshWorld, showMeSomething } from '@/features/canvas';
import { TopicPicker } from '@/features/topics';
import { CircleDashed, Dices } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import './mobile-bar.css';

export function MobileBar() {
  const topicsOpen = useUI((s) => s.overlay === 'topics');
  return (
    <aside className="hud hud-mobile show-sm" aria-label="Discover">
      <AnimatePresence>{topicsOpen && <TopicPicker key="sheet" sheet />}</AnimatePresence>
      <div className="island mobile-bar">
        <button type="button" className="mb-btn" onClick={() => useUI.getState().setOverlay(topicsOpen ? null : 'topics')} aria-label="Pick a topic">
          <CircleDashed size={18} strokeWidth={1.8} aria-hidden />
        </button>
        <button type="button" className="mb-btn" onClick={refreshWorld} aria-label="Discover new things">
          <LiveCompass size={18} />
        </button>
        <button type="button" className="pill pill--glass surprise-btn" onClick={showMeSomething}>
          <Dices size={16} strokeWidth={1.8} aria-hidden className="surprise-dice" />
          Surprise me
        </button>
      </div>
    </aside>
  );
}
