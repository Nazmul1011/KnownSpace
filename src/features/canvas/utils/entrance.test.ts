import { describe, expect, it } from 'vitest';
import { easeEntrance, entranceBlur, zoomSpeed } from './entrance';

describe('entrance zoom', () => {
  it('starts at the beginning and ends exactly at home', () => {
    expect(easeEntrance(0)).toBe(0);
    expect(easeEntrance(1)).toBe(1);
  });

  it('only ever moves forward, with no jolts', () => {
    let prev = 0;
    let prevStep = 0;
    for (let i = 1; i <= 200; i++) {
      const v = easeEntrance(i / 200);
      const step = v - prev;
      expect(step).toBeGreaterThanOrEqual(0);
      // speed changes gradually from frame to frame (no sudden kick)
      expect(Math.abs(step - prevStep)).toBeLessThan(0.002);
      prev = v;
      prevStep = step;
    }
  });

  it('gets going early and lands softly', () => {
    expect(easeEntrance(0.3)).toBeGreaterThan(0.3);
    expect(1 - easeEntrance(0.95)).toBeLessThan(0.01);
  });

  it('blurs only while moving, up to a limit', () => {
    expect(entranceBlur(0)).toBe(0);
    expect(entranceBlur(zoomSpeed(0.2, 0.25, 160))).toBeGreaterThan(entranceBlur(zoomSpeed(0.2, 0.21, 160)));
    expect(entranceBlur(1000)).toBe(7);
  });

  it('measures zoom speed the same at any scale', () => {
    expect(zoomSpeed(0.2, 0.4, 100)).toBeCloseTo(zoomSpeed(1, 2, 100));
  });
});
