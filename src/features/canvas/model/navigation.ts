/** Everything the chrome can ask the world to do. Kept outside React so keys, buttons and search share it. */
import { byId, categoryById, type CategoryId, type Mood } from '@/domain/knowledge';
import { useUI } from '@/domain/ui-state';
import { useVisitor } from '@/domain/visitor';
import {
  camera,
  homeView,
  buildConstellation,
  type ConstKind,
  findCategory,
  findNearest,
  inspirePicks,
  numberWord,
  searchObjects,
  topCategories,
  topicPicks,
  type HomeContext,
} from '@/domain/world';
import { rng } from '@/shared/lib/rng';

let home: HomeContext = { picks: [], firstVisit: false };
export function setHomeContext(h: HomeContext) {
  home = h;
}
export function getHomeContext() {
  return home;
}

function recentIds(n = 30) {
  return new Set(
    useVisitor
      .getState()
      .history.slice(0, n)
      .map((v) => v.id),
  );
}

/** Drops a constellation into the world a little off the current view centre and frames it. */
function place(kind: ConstKind, ids: string[], label: string, eyebrow: string) {
  if (!ids.length) return null;
  const cam = camera.get();
  const r = rng(Date.now() >>> 0);
  const id = `${kind}-${Date.now().toString(36)}`;
  const off = 160 / cam.z;
  const c = buildConstellation({ id, kind, ids, cx: cam.x + r.range(-off, off), cy: cam.y + r.range(-off * 0.6, off * 0.6), label, eyebrow });
  useVisitor.getState().addConstellation(c);
  const fit = Math.min(camera.vw / (2 * (c.r - 60)), camera.vh / (2 * (c.r - 120)));
  camera.flyTo({ x: c.cx, y: c.cy, z: Math.max(0.28, Math.min(0.92, fit)) }, { duration: 1100 });
  return c;
}

/**
 * "Show me something": one button for both old ideas. The world pulls back, then seven things arrive —
 * about 70% leaning toward what you open most, 30% from subjects you haven't touched.
 */
export function showMeSomething() {
  const ui = useUI.getState();
  if (ui.surprising) return;
  ui.setOverlay(null);
  ui.setSurprising(true);
  const u = useVisitor.getState();
  const { filter } = ui;
  const cam = camera.get();
  const reduced = camera.reduced;
  camera.flyTo({ z: Math.max(0.24, cam.z * 0.8) }, { duration: 650 });
  window.setTimeout(
    () => {
      const ids = inspirePicks(u.affinity, u.settings.personalize, recentIds(), filter, 7);
      const favs = u.settings.personalize ? topCategories(u.affinity, 2).map((c) => categoryById[c].label) : [];
      const eyebrow = filter
        ? `Surprise me · mostly ${categoryById[filter].label.toLowerCase()}`
        : favs.length
          ? `Surprise me · a little ${favs.join(' and ').toLowerCase()}, a lot of the unexpected`
          : 'Surprise me · seven subjects, no pattern';
      place('surprise', ids, "You didn't ask for this. That's the point.", eyebrow);
    },
    reduced ? 0 : 620,
  );
  window.setTimeout(() => useUI.getState().setSurprising(false), reduced ? 300 : 2600);
}

/** kept for the keyboard shortcuts and older call sites */
export const inspire = showMeSomething;
export const surprise = showMeSomething;

export function refreshWorld() {
  const u = useVisitor.getState();
  const prev = u.epoch;
  u.refreshWorld();
  useUI.getState().toast('A new arrangement of things to discover.', { label: 'Undo', run: () => useVisitor.setState({ epoch: prev }) });
}

export function resetCanvas() {
  const snap = useVisitor.getState().resetCanvas();
  useUI.getState().setFilter(null);
  camera.flyTo(homeView(), { duration: 1200 });
  if (snap.epoch || snap.constellations.length)
    useUI.getState().toast('Back to where you started.', { label: 'Undo', run: () => useVisitor.getState().restoreCanvas(snap) });
}

/** The logo: a fresh start. Clears every Surprise group and filter and glides back to the greeting. */
export function freshStart() {
  const ui = useUI.getState();
  ui.closeModal();
  ui.setOverlay(null);
  ui.setFilter(null);
  useVisitor.setState({ epoch: 0, constellations: [] });
  camera.flyTo(homeView(), { duration: 1100 });
}

/** Back to the greeting at the centre of the world, from anywhere (the location button). */
export function recenter() {
  const ui = useUI.getState();
  ui.closeModal();
  ui.setOverlay(null);
  ui.setFilter(null);
  camera.flyTo(homeView(), { duration: 1100 });
}

export function gather(query: string) {
  const q = query.trim();
  if (!q) return;
  const hits = searchObjects(q).slice(0, 8);
  if (!hits.length) {
    useUI.getState().toast(`Nothing about “${q}” here yet. Try something nearby, like a place, an animal or an everyday object.`);
    return;
  }
  // thin results get their closest neighbours, so a search always lands on a small cluster
  const ids = hits.map((h) => h.obj.id);
  for (const h of hits) {
    if (ids.length >= 6) break;
    for (const r of h.obj.relatedTopics) if (ids.length < 6 && !ids.includes(r)) ids.push(r);
  }
  const label = q.charAt(0).toUpperCase() + q.slice(1);
  const extra = ids.length - hits.length;
  place(
    'search',
    ids,
    label,
    extra > 0 ? `Gathered for you · ${hits.length} about it, ${extra} nearby` : `Gathered for you · ${numberWord(ids.length).toLowerCase()} things`,
  );
}

export function goToTopic(cat: CategoryId | null, mood: Mood | null) {
  const ids = topicPicks(cat, mood, 8);
  const what = cat ? categoryById[cat].label.toLowerCase() : 'everything';
  const label = mood ? `${mood.charAt(0).toUpperCase() + mood.slice(1).replace('-', ' ')} things about ${what}.` : `Things about ${what}.`;
  place('topic', ids, label, 'Picked from the wheel');
}

export function goToCategory(cat: CategoryId | null) {
  const ui = useUI.getState();
  ui.setFilter(cat);
  if (!cat) return;
  const spot = findCategory(cat, camera.get(), useVisitor.getState().epoch, home);
  if (spot) camera.flyTo({ x: spot.x, y: spot.y, z: 0.5 }, { duration: 1300 });
}

/** Flies to the nearest copy of an object and optionally opens it once there. */
export function flyToObject(id: string, open = true) {
  const u = useVisitor.getState();
  const hit = findNearest(id, camera.get(), u.epoch, home, u.constellations);
  if (!hit) {
    place('search', [id, ...(byId[id]?.relatedTopics.slice(0, 3) ?? [])], byId[id]?.title ?? 'Found it', 'Found it');
    return;
  }
  const z = Math.max(camera.get().z, 0.85);
  camera.flyTo(
    { x: hit.x, y: hit.y, z },
    {
      done: () => {
        useUI.getState().pulse(hit.key);
        if (!open) return;
        window.setTimeout(() => {
          const el = document.querySelector(`[data-key="${CSS.escape(hit.key)}"]`);
          const target = (el?.querySelector('[data-visual]') as HTMLElement | null) ?? (el as HTMLElement | null);
          useUI.getState().openObject(id, target ? { key: hit.key, rect: target.getBoundingClientRect() } : undefined);
        }, 120);
      },
    },
  );
}

export function zoomIn() {
  camera.zoomBy(1.35);
}
export function zoomOut() {
  camera.zoomBy(1 / 1.35);
}
