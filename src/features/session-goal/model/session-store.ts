/**
 * Today's learning session: up to twenty things, a medal every five.
 * Lives in sessionStorage — it lasts until the tab closes, starts fresh on a new day, and starts over
 * from zero as soon as all twenty are done.
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useVisitor } from '@/domain/visitor';

export const SESSION_GOAL = 20;
export const STEP = 5;

export interface Medal {
  step: number;
  at: number;
  id: string;
  name: string;
  image: string;
  /** segment colour in progress rings */
  tint: string;
  /** second line of the celebration title, under the big numeral */
  title: string;
  earned: string;
}

export const MEDALS: Medal[] = [
  { step: 1, at: 5, id: 'curious', name: 'Curious', image: 'medal-curious', tint: '#c27a4c', title: 'things learned', earned: 'You earned the Curious medal.' },
  {
    step: 2,
    at: 10,
    id: 'explorer',
    name: 'Explorer',
    image: 'medal-explorer',
    tint: '#9aa1aa',
    title: 'down. Halfway there.',
    earned: 'You earned the Explorer medal.',
  },
  {
    step: 3,
    at: 15,
    id: 'scholar',
    name: 'Scholar',
    image: 'medal-scholar',
    tint: '#dca633',
    title: 'learned. Nearly there.',
    earned: 'You earned the Scholar medal.',
  },
  {
    step: 4,
    at: 20,
    id: 'polymath',
    name: 'Polymath',
    image: 'medal-polymath',
    tint: '#1d8667',
    title: 'things today. Session complete.',
    earned: 'You earned the Polymath medal and completed the session.',
  },
];

/** Honest encouragement — no invented quotes or statistics. */
export const THOUGHTS = [
  'Curiosity compounds. Each thing you know makes the next one easier to learn.',
  'You know more now than you did ten minutes ago.',
  'Small facts add up to a bigger picture of the world.',
  'Every answer opens a better question.',
  'Coming back to an idea later is how it sticks. Spacing works.',
  'Knowing why is more fun than knowing that.',
];

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export type LearnResult = 'ok' | 'already';

interface SessionState {
  day: string;
  learned: string[];
  medals: number[];
  /** full twenty-thing sessions completed today */
  rounds: number;
  /** step whose celebration is showing */
  celebrate: number | null;
  learn: (id: string) => LearnResult;
  unlearn: (id: string) => void;
  dismiss: () => void;
}

/**
 * After twenty, the session starts over: the tracker goes back to zero, the four medal slots reset,
 * and the twenty things just learned are cleared from "Learned" so they can be learned again.
 */
function completeRound(learned: string[]) {
  const u = useVisitor.getState();
  const next = { ...u.learned };
  for (const id of learned) delete next[id];
  useVisitor.setState({ learned: next });
}

export const useSession = create<SessionState>()(
  persist(
    (set, get) => ({
      day: today(),
      learned: [],
      medals: [],
      rounds: 0,
      celebrate: null,
      learn: (id) => {
        let s = get();
        if (s.day !== today()) {
          set({ day: today(), learned: [], medals: [], rounds: 0, celebrate: null });
          s = get();
        }
        if (s.learned.includes(id)) return 'already';
        const learned = [...s.learned, id];
        const n = learned.length;
        const step = n % STEP === 0 ? n / STEP : 0;
        if (step && !s.medals.includes(step)) set({ learned, medals: [...s.medals, step], celebrate: step });
        else set({ learned });
        return 'ok';
      },
      unlearn: (id) => set((s) => ({ learned: s.learned.filter((x) => x !== id) })),
      dismiss: () => {
        const s = get();
        // the final celebration closes the session: reset to zero and clear its twenty
        if (s.learned.length >= SESSION_GOAL) {
          completeRound(s.learned);
          set({ celebrate: null, learned: [], medals: [], rounds: s.rounds + 1 });
        } else set({ celebrate: null });
      },
    }),
    {
      name: 'knowscape-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ day: s.day, learned: s.learned, medals: s.medals, rounds: s.rounds }),
      merge: (persisted, current) => {
        const p = persisted as Partial<SessionState> | undefined;
        if (!p || p.day !== today()) return current;
        // a finished session that was never dismissed (e.g. a refresh during the celebration) still resets
        if (p.learned && p.learned.length >= SESSION_GOAL) {
          completeRound(p.learned);
          return { ...current, ...p, learned: [], medals: [], rounds: (p.rounds ?? 0) + 1 };
        }
        return { ...current, ...p };
      },
    },
  ),
);

export function nextMedal(count: number) {
  return MEDALS.find((m) => m.at > count);
}
