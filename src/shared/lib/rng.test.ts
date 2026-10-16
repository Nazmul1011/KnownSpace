import { describe, expect, it } from 'vitest';
import { hash, rng } from './rng';

describe('rng', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = rng(42);
    const b = rng(42);
    expect(Array.from({ length: 20 }, a.next)).toEqual(Array.from({ length: 20 }, b.next));
  });

  it('gives different sequences for different seeds', () => {
    expect(rng(1).next()).not.toEqual(rng(2).next());
  });

  it('stays within its ranges', () => {
    const r = rng(7);
    for (let i = 0; i < 500; i++) {
      const x = r.next();
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
      const n = r.int(3, 6);
      expect(n).toBeGreaterThanOrEqual(3);
      expect(n).toBeLessThanOrEqual(6);
    }
  });

  it('shuffles into a permutation without touching the input', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const out = rng(3).shuffle(input);
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect([...out].sort((p, q) => p - q)).toEqual(input);
  });

  it('hashes the same parts to the same number', () => {
    expect(hash('cell', 1, 2)).toBe(hash('cell', 1, 2));
    expect(hash('cell', 1, 2)).not.toBe(hash('cell', 2, 1));
  });
});
