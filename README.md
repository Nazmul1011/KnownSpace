# Knowspace

Formerly Knowscape.

An infinite canvas of small, true things worth knowing. You open it, something catches your eye, you click, and a minute later you know something you didn't.

```
See something → become curious → click → learn something → keep exploring
```

**Every load — including a refresh or a shared link — always opens on the landing page ("Start exploring").**

## Run it

```bash
npm install
npm run dev        # http://127.0.0.1:5340
npm run build      # type-check + production bundle
```

## What's in it

- **The canvas** (`src/canvas`, `src/world`) — an endless field of cells. The 9×9 cells around home are curated as subject *neighbourhoods*: wedges fanning out from home, sized by how many things each subject has, with related subjects side by side (Space next to Science, Body next to Psychology). Every one of the 375 objects appears there exactly once; only each district's first cell carries its label ("Animals · 40 things nearby"). *Discover new things* rotates the ring so districts move but keep their neighbours. Beyond that the field keeps remixing the collection in new formats. Drag with inertia, pinch, scroll to pan, ⌘/Ctrl + scroll to zoom, double-click to zoom in. Zooming out reveals subject labels; zooming in reveals extra lines of text.
- **Knowledge objects** — 375 modules across 16 subjects (75 original + 300 from the 5× expansion in `src/content/more/*.ts`), each with a short explanation, "the interesting part", a hidden "one more thing", three tiny facts, related topics and a checked source. Eight objects whose popular story is contested are marked *Still debated* with a one-line caveat.
- **Formats** — studio cut-outs, editorial cards, photo tiles, polaroids, circles, typographic objects, diagrams (hand-built SVG), miniature globes (d3-geo), a notification stack, glossy-tile fact cards, questions, notes and orbiting idea chips. One object can appear in different formats in different places.
- **Inspire me (I)** — seven objects, about 70% weighted toward the subjects you open most and 30% from subjects you haven't touched. **Surprise me (S)** — dims the world, pulls back, and drops seven objects from seven different subjects. Both drop a constellation into the world; an area-preserving field (`src/world/constellation.ts`) pushes everything else outward to make room instead of replacing it.
- **Discover new things (R)** — re-arranges the world (a new layout epoch). A few curated cells keep their subject for continuity; objects that stay in place glide to their new spots. Undo is in the toast.
- **Search (⌘K or /)** — finds objects and subjects; Enter gathers everything about the query into a cluster (thin results are topped up with their closest related topics). Picking one object flies to its nearest copy and opens it.
- **Pick a topic (T)** — an iOS-style wheel that reads as a sentence: *Show me [strange] things about [space]*.
- **Detail view** — grows out of the object you clicked and folds back into it. One thing at a time: *Mark as learned* (the main button) counts it and folds the view back into the canvas so you keep browsing; clicking it on something already learned undoes it. Related objects at the bottom still lead onward and keep a trail. Save and Share (copies a `?k=` deep link) sit on the left. On phones it is a bottom sheet you can drag down.
- **Collection** — Saved, Recently discovered and Learned, shown as a tilted shelf of the objects themselves. The shelf scrolls sideways: mouse wheel or trackpad, drag with momentum (a drag never opens a card), or arrow keys; cards tilt a little more while it moves. A separate *Clear all* pill empties the current tab (with Undo), and each tab has its own empty state.
- **Today's session** — learn up to twenty things per session (it lives in the tab's sessionStorage and resets on a new tab or a new day). Every fifth thing marked as learned earns a medal — Curious (5), Explorer (10), Scholar (15), Polymath (20) — with a celebration card that appears once the detail view has closed (3D medal, confetti, an honest motivational line, the four-step track, *Keep exploring*). The header shows a four-segment ring ("7 of 20 today") whose popover holds the medal track. After twenty, *Mark as learned* shows "Session complete" until the next session. Logic in `src/store/session.ts`, UI in `src/ui/Session.tsx`.
- **Quiet progress** — the session popover also shows what you've opened, recent thumbnails and a day streak. Once you've learned five things, faint links appear between related things you know.
- **Landing page** — every load, including a browser refresh, opens on the landing page (one sentence over an orbit of objects, *Start exploring*). The canvas only mounts once you enter, so its entrance plays every time; a shared `?k=` link enters and then flies to that object. On a first visit two hints follow (drag, then click) and never come back.

## Keys

| Key | Does |
| --- | --- |
| Drag / arrows | Move around |
| Space (hold) | Pan from anywhere |
| + / − / 0 | Zoom in / out / back to the start |
| I · S · R · T | Inspire · Surprise · Discover new things · Pick a topic |
| ⌘K or / | Search |
| Tab | Move between objects (the view follows focus) |
| Esc | Close whatever is open |

## Structure

The code is organised by feature, in four layers that only depend downwards: **app → features → domain → shared**. See [docs/architecture.md](docs/architecture.md) for the rules and the reasoning.

```
src/app             bootstrap (main.tsx), screen composition (app.tsx), keyboard shortcuts, layout chrome (header, toasts, bottom bars)
src/features        one folder per product capability, each with components/, model/ and an index.ts public entry
  canvas            the world view, cards, connections, greeting, zoom/discover controls, navigation commands
  knowledge-view    the detail view       search          search + "Try" ideas      topics      rail + mood/subject wheels
  collection        saved / recent / learned               session-goal    20 a day, medals, celebration
  intro             landing page          onboarding      first-visit hint          settings    settings panel
src/domain          product concepts shared by several features
  knowledge         content (data/), types, subjects, art manifest, and how an object is drawn (ui/visual.tsx)
  world             camera, seeded layout, constellations, discovery and search
  visitor           persisted visitor state (saved, learned, history, settings, world) and reduced-motion
  ui-state          interface state shared across screens (overlay, open card, filter, toasts)
src/shared          product-independent pieces: ui/ (icon, brand, wheel, timer ring), lib/ (rng), hooks/, config/ (links), styles/ (tokens, base)
src/test            test setup
tests/e2e           headless-Chrome journeys (flow, session, rack, axe) and support/ helpers
tests/visual        deterministic screenshot capture + pixel compare
scripts/            content tools (validate, check sources, icons) and the architecture check
art/                generated source images (raw/), the processing script (build.mjs) and their source URLs
```

State lives in `localStorage` under `knowscape-v1` (the storage keys keep the old name so nobody loses their saved things); today's session in `sessionStorage` under `knowscape-session`. The camera always starts at home after the landing page. `window.__ks` exposes the stores, camera and actions for debugging.

## Expanding the collection

`art/WRITER-BRIEF.md` is the brief used for the 5× expansion (format, accuracy rules, image prompts); `art/existing-topics.txt` lists every topic so new writers can avoid duplicates. Check new entries with `npm run content:validate -- [file] --expect cat:n --allow-missing-images` and `node scripts/check-sources.mjs` (fetches every source and flags soft 404s; journal sites behind bot checks show as reCAPTCHA and are fine).

**Pending images:** the Figma AI quota ran out mid-expansion. 201 entries keep their intended photo/object visual but have no picture yet; `art/pending-images.tsv` holds one line per image (`id, kind, width, height, prompt`). Until generated, those cards show a designed placeholder (glossy subject icon on a tinted field, `ArtPending` in `src/domain/knowledge/ui/visual.tsx`). Generate each prompt, save it as `art/raw/<id>.png`, run `npm run art` (incremental) and the card switches to the picture automatically.

## Images

The original 57 images were generated for this project (Figma MCP, `gemini-3.1-flash-image`) and live in `art/raw`. `npm run art` processes them: studio-object shots get their backdrop modelled and removed (colour-to-alpha, so soft shadows stay translucent), everything is cropped and written as two WebP sizes to `public/art`, and `src/domain/knowledge/data/art.generated.json` records sizes and average tones. The generator URLs in `art/sources.txt` expire after seven days; `art/raw` is the only lasting copy.

## Content and sources

Every module was written for accuracy first and checked against one cited source (NASA, NOAA, USGS, BGS, ESA, WHO, FDA, peer-reviewed papers via doi.org and others). All source links returned 200 when written. A few figures come from sources other than the one cited (noted in review): the ±10 mm lift stopping accuracy (EN 81-20) and some details in *tall ceilings*, *Post-it* and *telephone words*. Content is in British English.

## Checks

```bash
npm run check          # typecheck, lint (incl. layer boundaries), format, architecture graph, unit tests
npm run test:e2e       # headless-Chrome journeys against the dev server (npm run dev)
```

- **Unit tests** (Vitest, next to the code they cover): rng, knowledge content integrity, world layout (determinism, every object placed, no overlapping cards), search and daily picks, the session goal.
- **Architecture**: ESLint blocks upward imports and reaching into another module's internals; `scripts/check-architecture.mjs` fails on cycles between modules.
- **End-to-end** (headless Chrome, since the desktop app's hidden browser pane pauses animation frames):

```bash
node tests/e2e/flow.e2e.mjs --shots     # interaction checks, fails on any console error
node tests/e2e/session.e2e.mjs --shots  # session goal: medals at 5/10/15/20, the reset after 20
node tests/e2e/axe.e2e.mjs              # accessibility scan of the canvas and the detail view
node tests/e2e/rack.e2e.mjs             # collection shelf: wheel, drag, momentum, click
node tests/e2e/support/shot.mjs qa-shots/x.png [--path '/?k=gps'] [--w 390 --h 844] [--fresh --intro]
node scripts/contact.mjs                # contact sheet of all cut-outs, to catch backdrop edges
```

- **Visual regression**: `node tests/visual/capture.mjs qa-shots/visual/before`, make the change, capture `after`, then `node tests/visual/compare.mjs qa-shots/visual/before qa-shots/visual/after` (13 screens, seeded and clock-frozen, so unchanged screens compare at 0%). Set `BASE_URL` to capture a production preview.

# KnownSpace
