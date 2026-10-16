import { describe, expect, it } from 'vitest';
import { byId, objects } from './objects';
import { categoryById } from './categories';

describe('knowledge objects', () => {
  it('has a unique id for every object', () => {
    expect(new Set(objects.map((o) => o.id)).size).toBe(objects.length);
  });

  it('only links to objects that exist, never to itself', () => {
    for (const o of objects) for (const r of o.relatedTopics) expect(byId[r] && r !== o.id, `${o.id} → ${r}`).toBe(true);
  });

  it('puts every object in a known subject', () => {
    for (const o of objects) expect(categoryById[o.category], o.id).toBeDefined();
  });

  it('gives every object the text a card and the detail view need', () => {
    for (const o of objects) {
      expect(o.title.length, o.id).toBeGreaterThan(0);
      expect(o.shortFact.length, o.id).toBeGreaterThan(0);
      expect(o.description.length, o.id).toBeGreaterThan(0);
      expect(o.source.url, o.id).toMatch(/^https:\/\//);
    }
  });
});
