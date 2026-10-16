export type CategoryId =
  | 'science'
  | 'nature'
  | 'history'
  | 'technology'
  | 'psychology'
  | 'space'
  | 'geography'
  | 'design'
  | 'architecture'
  | 'food'
  | 'culture'
  | 'business'
  | 'animals'
  | 'everyday'
  | 'body'
  | 'inventions';

export type Mood = 'surprising' | 'useful' | 'strange' | 'beautiful' | 'mind-bending';

export type DiagramId = 'thunder' | 'mirror' | 'qr' | 'gps' | 'cones' | 'forgetting' | 'golden' | 'bridge' | 'lattice' | 'waves' | 'window';

/** How a knowledge object is drawn. `image` is a basename in public/art (no extension). */
export type Visual =
  | { kind: 'object'; image: string } // studio object shot on warm white, floats on the canvas
  | { kind: 'photo'; image: string } // full-bleed editorial photograph
  | { kind: 'diagram'; diagram: DiagramId; image?: string }
  | { kind: 'type' } // typographic object
  | { kind: 'map'; lat: number; lon: number; place: string }
  | { kind: 'notif' }; // stacked notification composition

export interface CatalogEntry {
  id: string;
  title: string;
  category: CategoryId;
  subcategory: string;
  visual: Visual;
}

/** Editorial text for one object. Written per object in src/content/text/*.ts */
export interface KnowledgeText {
  id: string;
  /** 2–3 sentences, ≤ 55 words. The core explanation. */
  description: string;
  /** One sentence, ≤ 18 words. Shown on canvas cards. */
  shortFact: string;
  /** "The interesting part" — 1–2 sentences, ≤ 35 words. */
  interestingFact: string;
  /** "One more thing" reveal — 1–2 sentences, ≤ 40 words. */
  oneMoreThing: string;
  /** Three tiny facts, each ≤ 16 words. */
  facts: [string, string, string];
  /** A single short, true figure for fact cards, e.g. { value: '2.45 GHz', label: 'Oven frequency' }. */
  stat?: { value: string; label: string };
  /** 'debated' when the headline explanation is not settled science. */
  certainty: 'established' | 'debated';
  /** Required when certainty is 'debated': one sentence on what is uncertain. */
  caveat?: string;
  moods: Mood[];
  /** 4–8 lowercase search terms. */
  keywords: string[];
  /** 3–5 ids from the catalog. */
  relatedTopics: string[];
  /** lucide-react icon name in kebab-case, e.g. 'snowflake'. */
  icon: string;
  difficulty: 1 | 2 | 3;
  /** Seconds to read the full module, 30–90. */
  estimatedReadTime: number;
  source: { label: string; url: string };
}

export interface KnowledgeObject extends CatalogEntry, KnowledgeText {
  createdAt: string;
}

/** A complete new entry (catalog identity + editorial text), as written in src/content/more/*.ts */
export type Entry = CatalogEntry & KnowledgeText;
