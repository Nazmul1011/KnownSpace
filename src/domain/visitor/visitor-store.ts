/** Everything that should survive a reload: what you saved, learned and opened, your settings and your world. */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CategoryId } from '@/domain/knowledge';
import { footprint, type Constellation } from '@/domain/world';

export type MotionPref = 'system' | 'reduce' | 'full';

export interface Settings {
  motion: MotionPref;
  connections: boolean;
  greeting: boolean;
  personalize: boolean;
  /** the collection shelf loops endlessly instead of stopping at its ends */
  loopShelf: boolean;
}

export interface Visit {
  id: string;
  at: number;
}

interface CanvasSnapshot {
  epoch: number;
  constellations: Constellation[];
}

export interface VisitorState {
  saved: Visit[];
  learned: Record<string, number>;
  history: Visit[];
  affinity: Partial<Record<CategoryId, number>>;
  days: string[];
  settings: Settings;
  onboarding: { intro: boolean; dragged: boolean; opened: boolean };
  epoch: number;
  /** search hides recents opened before this moment (history itself is kept) */
  recentClearedAt: number;
  constellations: Constellation[];

  toggleSave: (id: string) => boolean;
  toggleLearned: (id: string) => boolean;
  recordOpen: (id: string, category: CategoryId) => void;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  onboard: (step: keyof VisitorState['onboarding']) => void;
  refreshWorld: () => void;
  addConstellation: (c: Constellation) => void;
  resetCanvas: () => CanvasSnapshot;
  restoreCanvas: (s: CanvasSnapshot) => void;
  clearHistory: () => void;
  clearSearchRecents: () => void;
  /** forget what you've opened (saved and learned stay); returns the old list for undo */
  clearRecent: () => Visit[];
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const MAX_CONSTELLATIONS = 4;

/** Version of what's stored under `knowscape-v1`; bump it with a step in migrateVisitor. */
export const VISITOR_VERSION = 3;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Brings state saved by an older version up to date. Anything unreadable starts fresh.
 * - v2: constellations became compact clusters; old wide rings are dropped.
 * - v3: the looping collection shelf became opt-in, so anyone who had it on by default starts with it off.
 */
export function migrateVisitor(stored: unknown, version: number): Partial<VisitorState> {
  if (!isRecord(stored)) return {};
  const s: Record<string, unknown> = { ...stored };
  if (version < 2) s.constellations = [];
  if (version < 3 && isRecord(s.settings)) s.settings = { ...s.settings, loopShelf: false };
  return s as Partial<VisitorState>;
}

/** Restores saved state over the defaults; settings added later keep their default when the save predates them. */
export function mergeVisitor(stored: unknown, defaults: Settings): Partial<VisitorState> {
  if (!isRecord(stored)) return {};
  const settings = isRecord(stored.settings) ? { ...defaults, ...(stored.settings as Partial<Settings>) } : defaults;
  return { ...(stored as Partial<VisitorState>), settings };
}

export const useVisitor = create<VisitorState>()(
  persist(
    (set, get) => ({
      saved: [],
      learned: {},
      history: [],
      affinity: {},
      days: [],
      settings: { motion: 'system', connections: true, greeting: true, personalize: true, loopShelf: false },
      onboarding: { intro: false, dragged: false, opened: false },
      epoch: 0,
      recentClearedAt: 0,
      constellations: [],

      toggleSave: (id) => {
        const has = get().saved.some((v) => v.id === id);
        set((s) => ({ saved: has ? s.saved.filter((v) => v.id !== id) : [{ id, at: Date.now() }, ...s.saved] }));
        return !has;
      },
      toggleLearned: (id) => {
        const has = !!get().learned[id];
        set((s) => {
          const learned = { ...s.learned };
          if (has) delete learned[id];
          else learned[id] = Date.now();
          return { learned };
        });
        return !has;
      },
      recordOpen: (id, category) =>
        set((s) => {
          const day = today();
          return {
            history: [{ id, at: Date.now() }, ...s.history.filter((v) => v.id !== id)].slice(0, 200),
            affinity: { ...s.affinity, [category]: (s.affinity[category] ?? 0) + 1 },
            days: s.days.includes(day) ? s.days : [...s.days, day].slice(-60),
            onboarding: { ...s.onboarding, opened: true },
          };
        }),
      setSetting: (key, value) => set((s) => ({ settings: { ...s.settings, [key]: value } })),
      onboard: (step) => set((s) => ({ onboarding: { ...s.onboarding, [step]: true } })),
      refreshWorld: () => set((s) => ({ epoch: s.epoch + 1 })),
      addConstellation: (c) =>
        set((s) => {
          // an older group that the new one lands on is cleared away, so groups never pile up
          const f = footprint(c, 0);
          const keep = s.constellations.filter((o) => {
            const g = footprint(o, 0);
            return g.x1 < f.x0 || g.x0 > f.x1 || g.y1 < f.y0 || g.y0 > f.y1;
          });
          return { constellations: [...keep, c].slice(-MAX_CONSTELLATIONS) };
        }),
      resetCanvas: () => {
        const snap = { epoch: get().epoch, constellations: get().constellations };
        set({ epoch: 0, constellations: [] });
        return snap;
      },
      restoreCanvas: (snap) => set(snap),
      clearHistory: () => set({ saved: [], learned: {}, history: [], affinity: {}, days: [] }),
      clearSearchRecents: () => set({ recentClearedAt: Date.now() }),
      clearRecent: () => {
        const prev = get().history;
        set({ history: [] });
        return prev;
      },
    }),
    {
      name: 'knowscape-v1',
      version: VISITOR_VERSION,
      migrate: (state, version) => migrateVisitor(state, version) as VisitorState,
      merge: (persisted, current) => ({ ...current, ...mergeVisitor(persisted, current.settings) }),
    },
  ),
);

/** Consecutive days with at least one opened object, ending today or yesterday. */
export function streak(days: string[]) {
  if (!days.length) return 0;
  const set = new Set(days);
  const d = new Date();
  const key = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  if (!set.has(key(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(key(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
