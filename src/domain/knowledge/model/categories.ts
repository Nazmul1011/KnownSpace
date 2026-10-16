import type { CategoryId, Mood } from './types';

export interface Category {
  id: CategoryId;
  label: string;
  /** Accent used sparingly: rail dots and glossy icon tiles. */
  hue: string;
}

export const categories: Category[] = [
  { id: 'science', label: 'Science', hue: '#3B6FE0' },
  { id: 'nature', label: 'Nature', hue: '#3F9A5B' },
  { id: 'history', label: 'History', hue: '#B0793A' },
  { id: 'technology', label: 'Technology', hue: '#5B6BF0' },
  { id: 'psychology', label: 'Psychology', hue: '#9B5DE5' },
  { id: 'space', label: 'Space', hue: '#4A55C7' },
  { id: 'geography', label: 'Geography', hue: '#D0683A' },
  { id: 'design', label: 'Design', hue: '#E0533D' },
  { id: 'architecture', label: 'Architecture', hue: '#8A8178' },
  { id: 'food', label: 'Food', hue: '#E39A2D' },
  { id: 'culture', label: 'Culture', hue: '#C2547E' },
  { id: 'business', label: 'Business', hue: '#2F8F86' },
  { id: 'animals', label: 'Animals', hue: '#6E9F3A' },
  { id: 'everyday', label: 'Everyday things', hue: '#6D7A8A' },
  { id: 'body', label: 'Human body', hue: '#E06A6A' },
  { id: 'inventions', label: 'Inventions', hue: '#C8902E' },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>;

export const moods: { id: Mood | 'any'; label: string }[] = [
  { id: 'any', label: 'anything' },
  { id: 'surprising', label: 'surprising' },
  { id: 'strange', label: 'strange' },
  { id: 'useful', label: 'useful' },
  { id: 'beautiful', label: 'beautiful' },
  { id: 'mind-bending', label: 'mind-bending' },
];
