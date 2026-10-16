import { motion } from 'motion/react';
import { Mark } from '@/shared/ui/brand';
import './loading-screen.css';

/** The first thing a visitor sees: just the mark, its sun rising and waves drawing on a loop while the landing page's pictures load. */
export function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      role="status"
      aria-label="Loading Knowspace"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div
        className="loading-brand"
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* shares its layoutId with the landing headline's mark, so it flies there when loading ends */}
        <motion.span layoutId="knowspace-mark" layoutCrossfade={false} className="loading-mark">
          <Mark size={72} loading />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
