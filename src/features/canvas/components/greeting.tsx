/** Typographic moments that live in the world: the daily greeting at home and constellation captions. */
import { useEffect, useState } from 'react';
import { streak, useVisitor } from '@/domain/visitor';
import { SESSION_GOAL, nextMedal, useSession } from '@/features/session-goal';
import type { Item } from '@/domain/world';

/** Late at night and very early the greeting gets a little cheekier; one line per day, so it doesn't flicker. */
const LATE = ["Someone's up late.", 'Hello, night owl.', 'Still awake? Same.', 'The owls are out.', 'Bedtime is a suggestion.'];
const EARLY = ["Someone's up early.", 'Beat the sun, did you?', 'Early bird spotted.'];

function partOfDay(d: Date) {
  const h = d.getHours();
  const pick = (list: string[]) => list[(d.getDate() + d.getMonth() * 31) % list.length];
  if (h >= 22 || h < 4) return { title: pick(LATE), sub: 'Here are a few things worth knowing before bed.' };
  if (h < 6) return { title: pick(EARLY), sub: 'Here are a few things worth knowing before everyone else.' };
  if (h < 12) return { title: 'Good morning.', sub: 'Here are a few things worth knowing today.' };
  if (h < 18) return { title: 'Good afternoon.', sub: 'Here are a few things worth knowing today.' };
  return { title: 'Good evening.', sub: 'Here are a few things worth knowing today.' };
}

export function Greeting({ item }: { item: Item }) {
  if (item.format === 'caption') {
    return (
      <div className="caption">
        <span className="caption-eyebrow">{item.tip}</span>
        <span className="caption-text">{item.text}</span>
      </div>
    );
  }
  return <DailyGreeting />;
}

/** The hello at home: time of day, today's date and where your session stands, kept live. */
function DailyGreeting() {
  const showGreeting = useVisitor((s) => s.settings.greeting);
  const count = useSession((s) => s.learned.length);
  const rounds = useSession((s) => s.rounds);
  const saved = useVisitor((s) => s.saved.length);
  const days = useVisitor((s) => s.days);
  const [now, setNow] = useState(() => new Date());
  // keep "good afternoon" honest if the tab stays open across the day
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(t);
  }, []);
  const date = now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  const st = streak(days);
  const hello = partOfDay(now);
  const nx = nextMedal(count);
  const status =
    count === 0
      ? rounds > 0
        ? `${rounds} ${rounds === 1 ? 'session' : 'sessions'} done today. Five more things earns the first medal again.`
        : 'Learn five things today to earn your first medal.'
      : `${count} of ${SESSION_GOAL} learned today${nx ? ` · ${nx.at - count} more to ${nx.name}` : ''}.`;
  const extras = [saved ? `${saved} saved` : '', st > 1 ? `${st}-day streak` : ''].filter(Boolean).join(' · ');
  return (
    <div className="greeting">
      <span className="greeting-eyebrow">{date}</span>
      <h1 className="greeting-title">{showGreeting ? hello.title : 'Knowspace'}</h1>
      <p className="greeting-sub">{hello.sub}</p>
      <p className="greeting-status">
        <span className="greeting-dot" aria-hidden />
        {status}
        {extras && <span className="greeting-extras"> {extras}</span>}
      </p>
    </div>
  );
}
