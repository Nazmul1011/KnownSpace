import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Canvas, Controls, DiscoverButton, flyToObject, setHomeContext } from '@/features/canvas';
import { byId } from '@/domain/knowledge';
import { KnowledgeModal } from '@/features/knowledge-view';
import { useUI } from '@/domain/ui-state';
import { useVisitor } from '@/domain/visitor';
import { dailyPicks, type HomeContext } from '@/domain/world';
import { useKeyboardShortcuts } from './use-keyboard-shortcuts';
import { Header } from './layout/header';
import { Rail } from '@/features/topics';
import { Coach } from '@/features/onboarding';
import { MobileBar } from './layout/mobile-bar';
import { RecentStrip } from './layout/recent-strip';
import { Toasts } from './layout/toasts';
import { Collection } from '@/features/collection';
import { Settings } from '@/features/settings';
import { Intro } from '@/features/intro';
import { Celebration } from '@/features/session-goal';

function dateKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

const deepLink = new URLSearchParams(window.location.search).get('k');

export function App() {
  const introOpen = useUI((s) => s.introOpen);
  const introLeaving = useUI((s) => s.introLeaving);
  const overlay = useUI((s) => s.overlay);
  const [home] = useState<HomeContext>(() => {
    const u = useVisitor.getState();
    const h = { picks: dailyPicks(dateKey(), u.affinity), firstVisit: u.history.length === 0 };
    setHomeContext(h);
    return h;
  });
  // Every load (including a browser refresh) starts on the landing page; the canvas mounts once you enter.
  const [canvasReady, setCanvasReady] = useState(false);

  // build the canvas quietly behind the landing page once it has settled, so entering is a pure cross-fade;
  // entering early mounts it straight away
  useEffect(() => {
    if (canvasReady) return;
    const go = () => setCanvasReady(true);
    const unsubscribe = useUI.subscribe((s) => {
      if (!s.introOpen) go();
    });
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const t = ric ? ric(go, { timeout: 1600 }) : window.setTimeout(go, 900);
    return () => {
      unsubscribe();
      if (!ric) window.clearTimeout(t);
    };
  }, [canvasReady]);

  // a shared ?k= link still lands on the landing page first, then flies to the object
  useEffect(() => {
    if (!canvasReady || introOpen || !deepLink || !byId[deepLink]) return;
    const t = window.setTimeout(() => flyToObject(deepLink), 700);
    return () => window.clearTimeout(t);
  }, [canvasReady, introOpen]);

  useKeyboardShortcuts();

  return (
    <>
      {canvasReady && <Canvas home={home} veiled={introOpen && !introLeaving} />}
      <Header />
      <Rail />
      <Controls />
      <DiscoverButton />
      <RecentStrip />
      <MobileBar />
      <Coach />
      <Toasts />
      <KnowledgeModal />
      <Celebration />
      <AnimatePresence>{overlay === 'collection' && <Collection key="col" />}</AnimatePresence>
      <AnimatePresence>{overlay === 'settings' && <Settings key="set" />}</AnimatePresence>
      <AnimatePresence>{introOpen && <Intro key="intro" />}</AnimatePresence>
    </>
  );
}
