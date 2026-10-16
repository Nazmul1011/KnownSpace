import { catalog } from '../data/catalog';
import { batchA } from '../data/text/batch-a';
import { batchB } from '../data/text/batch-b';
import { batchC } from '../data/text/batch-c';
import { batchD } from '../data/text/batch-d';
import { moreEntries } from '../data/more/index';
import type { CategoryId, KnowledgeObject, KnowledgeText } from './types';

const texts = new Map<string, KnowledgeText>([...batchA, ...batchB, ...batchC, ...batchD, ...moreEntries].map((t) => [t.id, t]));
const ids = new Set(catalog.map((c) => c.id));

export const objects: KnowledgeObject[] = catalog.map((c, i) => {
  const t = texts.get(c.id);
  if (!t) throw new Error(`Missing text for ${c.id}`);
  const d = new Date(Date.UTC(2026, 8, 1 + Math.floor(i / 3)));
  return {
    ...c,
    ...t,
    relatedTopics: t.relatedTopics.filter((r) => ids.has(r) && r !== c.id),
    createdAt: d.toISOString(),
  };
});

export const byId: Record<string, KnowledgeObject> = Object.fromEntries(objects.map((o) => [o.id, o]));

export const byCategory = objects.reduce(
  (acc, o) => {
    (acc[o.category] ||= []).push(o);
    return acc;
  },
  {} as Record<CategoryId, KnowledgeObject[]>,
);

export function imageUrl(image: string, size: 's' | 'l' = 's') {
  return `/art/${image}-${size}.webp`;
}

/** The next stop in a curiosity chain: the strongest related topic you haven't opened yet. */
export function nextInChain(id: string, seen: Set<string>) {
  const o = byId[id];
  if (!o) return undefined;
  return o.relatedTopics.find((r) => !seen.has(r)) ?? o.relatedTopics[0];
}
