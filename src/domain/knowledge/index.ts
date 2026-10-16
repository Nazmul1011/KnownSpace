/** The knowledge objects: content, subjects, the art manifest and how each object is drawn. */
export { catalog } from './data/catalog';
export { art } from './model/art';
export { categories, categoryById, moods } from './model/categories';
export type { Category } from './model/categories';
export { byCategory, byId, imageUrl, objects } from './model/objects';
export type { CatalogEntry, CategoryId, KnowledgeObject, Mood } from './model/types';
export { Visual, displayKind } from './ui/visual';
