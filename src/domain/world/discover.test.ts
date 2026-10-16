import { describe, expect, it } from 'vitest';
import { byId } from '@/domain/knowledge';
import { dailyPicks, searchCategories, searchObjects } from './discover';

describe('search', () => {
  it('finds objects by subject words', () => {
    const hits = searchObjects('volcano');
    expect(hits.length).toBeGreaterThan(0);
    const top = hits[0].obj;
    expect(`${top.title} ${top.keywords.join(' ')}`.toLowerCase()).toContain('volcan');
  });

  it('ranks results from best to worst', () => {
    const scores = searchObjects('light').map((h) => h.score);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });

  it('returns nothing for an empty or unknown query', () => {
    expect(searchObjects('   ')).toEqual([]);
    expect(searchObjects('qzxwv')).toEqual([]);
  });

  it('matches subjects by name', () => {
    expect(searchCategories('space').map((c) => c.id)).toContain('space');
  });
});

describe('daily picks', () => {
  it('stays the same for the whole day', () => {
    expect(dailyPicks('2026-10-9', {})).toEqual(dailyPicks('2026-10-9', {}));
  });

  it('picks pictures from different subjects', () => {
    const picks = dailyPicks('2026-10-9', {}).map((id) => byId[id]);
    expect(picks).toHaveLength(6);
    expect(new Set(picks.map((o) => o.category)).size).toBe(picks.length);
    for (const o of picks) expect(['photo', 'object']).toContain(o.visual.kind);
  });
});
