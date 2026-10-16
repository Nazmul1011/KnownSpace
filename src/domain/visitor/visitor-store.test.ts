import { describe, expect, it } from 'vitest';
import { mergeVisitor, migrateVisitor, VISITOR_VERSION, type Settings } from './visitor-store';

const defaults: Settings = { motion: 'system', connections: true, greeting: true, personalize: true, loopShelf: false };

describe('saved visitor state', () => {
  it('turns the looping shelf off for anyone saved before it became opt-in', () => {
    const v2 = { settings: { ...defaults, loopShelf: true }, saved: [{ id: 'pisa', at: 1 }] };
    const next = migrateVisitor(v2, 2);
    expect(next.settings?.loopShelf).toBe(false);
    expect(next.saved).toEqual([{ id: 'pisa', at: 1 }]);
  });

  it('drops the old wide constellations from version 1 saves', () => {
    expect(migrateVisitor({ constellations: [{ id: 'old' }] }, 1).constellations).toEqual([]);
  });

  it('keeps constellations saved by version 2', () => {
    expect(migrateVisitor({ constellations: [{ id: 'kept' }] }, 2).constellations).toEqual([{ id: 'kept' }]);
  });

  it('starts fresh when the saved value is unreadable', () => {
    expect(migrateVisitor(null, 1)).toEqual({});
    expect(migrateVisitor('broken', 2)).toEqual({});
    expect(mergeVisitor([], defaults)).toEqual({});
  });

  it('fills in settings that did not exist when the state was saved', () => {
    const merged = mergeVisitor({ settings: { motion: 'reduce', connections: false, greeting: true, personalize: true } }, defaults);
    expect(merged.settings).toEqual({ ...defaults, motion: 'reduce', connections: false });
  });

  it('keeps a choice the visitor made after the upgrade', () => {
    expect(mergeVisitor({ settings: { ...defaults, loopShelf: true } }, defaults).settings?.loopShelf).toBe(true);
    expect(VISITOR_VERSION).toBe(3);
  });
});
