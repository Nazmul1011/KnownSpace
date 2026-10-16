import { describe, expect, it } from 'vitest';
import { loopShift } from './shelf-loop';

describe('looping shelf', () => {
  const period = 2400;

  it('stays put anywhere inside the middle copy', () => {
    for (const p of [period * 0.5, period, period * 1.2, period * 1.5]) expect(loopShift(p, period)).toBe(0);
  });

  it('jumps forward one copy when the view drifts into the first copy', () => {
    expect(loopShift(period * 0.49, period)).toBe(period);
  });

  it('jumps back one copy when the view drifts into the last copy', () => {
    expect(loopShift(period * 1.51, period)).toBe(-period);
  });

  it('always lands back inside the middle copy after a jump', () => {
    for (const p of [0, 300, period * 0.4, period * 1.6, period * 1.99]) {
      const next = p + loopShift(p, period);
      expect(next).toBeGreaterThanOrEqual(period * 0.5);
      expect(next).toBeLessThanOrEqual(period * 1.5);
    }
  });

  it('never jumps when the shelf is not looping', () => {
    expect(loopShift(-500, 0)).toBe(0);
    expect(loopShift(99999, 0)).toBe(0);
  });
});
