import { motion } from 'motion/react';

/**
 * The dark selection pill of a segmented control (`.seg`). Render it inside the selected button only;
 * buttons that share a `group` hand the pill over with a slide instead of a jump.
 */
export function SegPill({ group, instant = false }: { group: string; instant?: boolean }) {
  return (
    <motion.span
      layoutId={`seg-pill-${group}`}
      className="seg-pill"
      aria-hidden
      transition={instant ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 }}
    />
  );
}
