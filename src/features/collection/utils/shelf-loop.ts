/**
 * The looping shelf renders three copies of the list side by side and keeps the view inside the middle one.
 * `period` is the width of one copy; the view starts at `period` (the middle copy's first card).
 * Returns how far to jump so the same cards stay on screen: one copy forward or back, or 0 to stay put.
 */
export function loopShift(position: number, period: number): number {
  if (period <= 0) return 0;
  if (position < period * 0.5) return period;
  if (position > period * 1.5) return -period;
  return 0;
}
