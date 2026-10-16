/** Session-only interface state. */
import { create } from 'zustand';
import type { CategoryId } from '@/domain/knowledge';

export type Overlay = null | 'collection' | 'settings' | 'topics' | 'menu' | 'progress' | 'search';
export type CollectionTab = 'saved' | 'recent' | 'learned';

export interface Toast {
  id: number;
  text: string;
  action?: { label: string; run: () => void };
}

export interface ModalState {
  trail: string[];
  index: number;
  /** key of the canvas item it opened from, so closing can fly back into it */
  originKey?: string;
  originRect?: { x: number; y: number; w: number; h: number };
}

interface UIState {
  modal: ModalState | null;
  overlay: Overlay;
  collectionTab: CollectionTab;
  filter: CategoryId | null;
  hoverKey: string | null;
  pulseKey: string | null;
  surprising: boolean;
  introOpen: boolean;
  /** the landing page has started its exit; the canvas fades in underneath */
  introLeaving: boolean;
  toasts: Toast[];

  openObject: (id: string, origin?: { key: string; rect: DOMRect | null }) => void;
  pushObject: (id: string) => void;
  goTrail: (index: number) => void;
  closeModal: () => void;
  setOverlay: (o: Overlay) => void;
  openCollection: (tab: CollectionTab) => void;
  setFilter: (f: CategoryId | null) => void;
  setHover: (key: string | null) => void;
  pulse: (key: string) => void;
  setSurprising: (v: boolean) => void;
  setIntro: (v: boolean) => void;
  toast: (text: string, action?: Toast['action']) => void;
  dismissToast: (id: number) => void;
}

let toastId = 0;

export const useUI = create<UIState>()((set, get) => ({
  modal: null,
  overlay: null,
  collectionTab: 'saved',
  filter: null,
  hoverKey: null,
  pulseKey: null,
  surprising: false,
  // every load opens on the landing page
  introOpen: true,
  introLeaving: false,
  toasts: [],

  openObject: (id, origin) =>
    set({
      overlay: null,
      modal: {
        trail: [id],
        index: 0,
        originKey: origin?.key,
        originRect: origin?.rect ? { x: origin.rect.x, y: origin.rect.y, w: origin.rect.width, h: origin.rect.height } : undefined,
      },
    }),
  pushObject: (id) => {
    const m = get().modal;
    if (!m) return get().openObject(id);
    const trail = [...m.trail.slice(0, m.index + 1), id].slice(-8);
    set({ modal: { ...m, trail, index: trail.length - 1, originKey: undefined } });
  },
  goTrail: (index) => {
    const m = get().modal;
    if (m) set({ modal: { ...m, index } });
  },
  closeModal: () => set({ modal: null }),
  setOverlay: (overlay) => set({ overlay }),
  openCollection: (collectionTab) => set({ overlay: 'collection', collectionTab }),
  setFilter: (filter) => set({ filter }),
  setHover: (hoverKey) => set({ hoverKey }),
  pulse: (pulseKey) => {
    set({ pulseKey });
    window.setTimeout(() => get().pulseKey === pulseKey && set({ pulseKey: null }), 2400);
  },
  setSurprising: (surprising) => set({ surprising }),
  setIntro: (introOpen) => set({ introOpen, introLeaving: false }),
  toast: (text, action) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, text, action }] }));
    // toasts with an action show a 3-second ring that dismisses them; this is the fallback
    window.setTimeout(() => get().dismissToast(id), action ? 3600 : 3200);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
