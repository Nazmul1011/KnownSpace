# Knowspace project context

## Project name

Knowspace (package name `knowspace`, version `0.1.0`). Formerly Knowscape. A product by Gr8r Studio.

## Project purpose

An infinite canvas of short, sourced facts. The visitor opens a landing page, enters the canvas, notices an object, opens it, and can mark it learned, save it, or follow a related topic. Every load, including a refresh or a shared link, starts on the landing page ("Start exploring"). A `?k=<id>` link still shows the landing page first, then flies to that object.

There is one public screen. There is no router and no `pages/` layer. A second, private screen at `/admin` shows the last 24 hours of visitors (count, IP address, country) behind an email and password login.

Live at https://knowspace.si (also `www.knowspace.si`), deployed on Coolify.

## Tech stack

- React 19 and React DOM
- TypeScript 5.9 (`strict`, `noUnusedLocals`, `noUnusedParameters`)
- Vite 8 (`@vitejs/plugin-react`), path alias `@` → `src`
- Zustand 5 for state, with `persist` for visitor data and the session goal
- Motion for enter/exit animation
- d3-geo, topojson-client, and world-atlas for miniature globes
- lucide-react for icons
- Geist Variable and Newsreader Variable via `@fontsource-variable`
- Vitest for unit tests
- ESLint (layer import rules) and Prettier
- Puppeteer-core and axe-core for headless browser journeys
- sharp for the art pipeline

Admin server (`server/`):

- Plain Node (`node:http`, `node:crypto`, `node:fs`), ES modules (`.mjs`), no npm dependencies
- JSON file store at `server/data/store.json`, no database or ORM
- scrypt password hashing and hand-rolled HS256 JWTs (access and refresh tokens)
- Country lookup through `https://ipwho.is`
- Node 22.12 or newer is required: Vite 8's native binding (`@rolldown/binding-*`) needs `^20.19.0 || >=22.12.0`, and older Node skips it silently

## Folder structure

```text
index.html                 mounts #root and loads src/app/main.tsx
vite.config.ts             dev server 127.0.0.1:5340, alias @, proxies /api to 127.0.0.1:5342
Dockerfile                 production image (node:22-slim), used by Coolify
.dockerignore              keeps node_modules, art/raw, .env, server/data out of the image
.env.example               admin server variables (copy to .env, which is gitignored)
server/index.mjs           admin API; in production also serves dist/
server/auth.mjs            password hashing, JWT sign/verify, refresh cookie
server/geo.mjs             client IP and country lookup
server/store.mjs           JSON file store with serialized, atomic writes
server/dev.mjs             runs the API (5342) and Vite (5340) together for npm run dev
server/data/               runtime data (store.json), gitignored
vitest.config.ts           unit tests in src/**/*.test.ts
eslint.config.js           layer boundaries
docs/architecture.md       the four-layer rules
src/app                    bootstrap, screen composition, keyboard shortcuts, chrome
src/features               one folder per product capability
src/domain                 shared product concepts
src/shared                 product-independent UI, styles, rng, hooks, links
src/test                   Vitest setup (in-memory localStorage / sessionStorage)
tests/e2e                  headless Chrome journeys
tests/visual               seeded screenshot capture and pixel compare
tests/responsive           layout audit
scripts                    content validation, source checks, icon generation, architecture graph
art                        briefs and the WebP build; art/raw (source PNGs) is local only, gitignored
public                     favicon and processed art consumed as /art/...
```

Layers may depend only downward:

```text
app  →  features  →  domain  →  shared
```

Feature folders:

- `canvas` — world view, cards, connections, greeting, zoom and discover controls, navigation commands
- `knowledge-view` — detail modal
- `search` — search and result gathering
- `topics` — subject rail and mood/subject wheel
- `collection` — saved, recent, and learned shelf
- `session-goal` — twenty things a day, medals, celebration
- `intro` — landing page and loading screen
- `onboarding` — first-visit hints
- `settings` — motion, connections, greeting, personalization, shelf loop
- `admin` — visit beacon (`recordVisit`) and the `/admin` login and visitors page (`AdminPage`); `api.ts` is the only HTTP client in the app

Domain folders:

- `knowledge` — catalog, editorial text, subjects, art manifest, how an object is drawn
- `world` — camera, seeded layout, constellations, discovery and search
- `visitor` — persisted visitor state and reduced-motion
- `ui-state` — overlay, open card, filter, toasts

Shared folders:

- `ui` — icon, brand, wheel, timer ring, segmented pill, external link
- `styles` — `tokens.css`, `base.css`
- `lib` — seeded `rng`
- `hooks` — `use-media`
- `config` — outbound links (`STUDIO_URL`, `COFFEE_URL`)

## Startup flow

1. `index.html` loads `/src/app/main.tsx`.
2. `main.tsx` imports fonts, design tokens, base styles, and HUD styles, then renders `<App />` in `StrictMode`.
3. `main.tsx` assigns `window.__ks` (`user`, `ui`, `session`, `camera`, `actions`) for console and headless tests.
4. `App` checks `window.location.pathname`. On `/admin` it renders `AdminPage` and nothing else. Every other path renders `Site`, which calls `recordVisit()` once on mount.
5. `Site` always starts with `introOpen: true`. The canvas does not mount on the first paint.
6. The canvas mounts after idle time (`requestIdleCallback`, timeout 1600ms, or 900ms) or immediately once the visitor leaves the landing page.
7. If `?k=<id>` matches a knowledge object, `flyToObject` runs about 700ms after the canvas is ready and the intro has closed.
8. `useKeyboardShortcuts` is always active on the public site.
9. Chrome (header, topic rail, controls, discover, recent strip, mobile bar, coach, toasts) stays mounted. Collection and settings mount only while their overlay is open. The knowledge modal and celebration stay mounted and show themselves from store state.

Dev: `npm run dev` starts both the admin API (`127.0.0.1:5342`) and Vite (`http://127.0.0.1:5340`, `strictPort`). Vite proxies `/api` to the API. `npm run dev:web` starts Vite alone; visit tracking then fails quietly. Admin page: `http://127.0.0.1:5340/admin`. Preview: `npm run preview` → port `5341` (no API).

Production: `npm run build`, then `npm run start` (`NODE_ENV=production node server/index.mjs`). One process serves `dist/` (with an `index.html` fallback) and `/api` on `PORT` (default 3000, host `0.0.0.0`).

## Main modules and features

- **Canvas.** An endless field. The 9×9 cells around home are subject neighbourhoods. Drag with inertia, pinch, scroll to pan, Command/Ctrl + scroll to zoom, double-click to zoom in. Zooming out shows subject labels; zooming in shows extra lines.
- **Knowledge objects.** Identity lives in `src/domain/knowledge/data/catalog.ts` (original 75). Editorial expansion lives in `src/domain/knowledge/data/more/*.ts` and is merged into the catalog. Original copy is in `data/text/batch-a` through `batch-d`. `objects.ts` joins catalog and text and throws if text is missing. The README still says 375 objects; the source now also includes extras and a second wave (`wave2-a` through `wave2-d`), so the live collection is larger than that README figure. Sixteen subjects. Objects marked `certainty: 'debated'` carry a one-line caveat.
- **Formats.** Studio cut-outs, editorial cards, photo tiles, polaroids, circles, type, diagrams, miniature globes, notification stacks, fact cards, questions, notes, and orbiting chips.
- **Inspire (I), Surprise (S), Discover (R), Pick a topic (T).** Inspire and Surprise drop a constellation. Discover advances the layout epoch. Undo is offered in a toast.
- **Search (Command-K or `/`).** In-memory search of objects and subjects. Enter gathers a cluster. Choosing one object flies to the nearest copy and opens it.
- **Detail view.** Grows out of the clicked object. Mark as learned, save, share (`?k=` copied to the clipboard), related objects, and a trail. On a phone it is a bottom sheet.
- **Collection.** Saved, recently discovered, and learned, as a sideways shelf.
- **Today's session.** Up to twenty learned things. Medals at 5, 10, 15, and 20 (Curious, Explorer, Scholar, Polymath).
- **Quiet progress.** Opens, recent thumbnails, day streak, and faint links between related things once five are learned.
- **Landing and first-visit coach.** Drag hint, then click hint. They do not return.
- **Admin visitors page (`/admin`).** Email and password sign-in with a show/hide eye toggle. Once signed in: stat cards for people and views in the last 24 hours, and a table of country, IP address, views, and last seen, newest first. Refreshes every 30 seconds. Styled with the site tokens (`admin-page.css`).

## Database and ORM

None. Persistence is browser storage through Zustand:

| Store | Module | Storage | Key |
| --- | --- | --- | --- |
| Visitor | `src/domain/visitor/visitor-store.ts` | `localStorage` | `knowscape-v1` (version `VISITOR_VERSION` = 3) |
| Today's session | `src/features/session-goal/model/session-store.ts` | `sessionStorage` | `knowscape-session` |
| Interface | `src/domain/ui-state/ui-store.ts` | memory only | none |
| Camera | `src/domain/world/camera.ts` | memory only | always starts at home after the landing page |

The storage key keeps the old product name so existing saves are not dropped. `migrateVisitor` upgrades older saves. Unreadable saves start fresh.

Server side, there is no database. `server/store.mjs` keeps one JSON file, `server/data/store.json`:

| Field | Holds |
| --- | --- |
| `admin` | `{ email, passwordHash }` (scrypt, `scrypt$salt$hash`) |
| `refreshTokens` | `{ jti, tokenHash (sha256), expiresAt }` for each live refresh token |
| `visits` | `{ ip, country, path, seenAt }`, pruned to the last 7 days |
| `geo` | IP → country cache |

Writes go through `updateStore`, which serializes them and replaces the file atomically. In Coolify, `/app/server/data` must be a persistent volume or the file is lost on every redeploy.

## API structure

The public site has no content API. Knowledge content is compiled into the bundle. Search and daily picks are pure functions in `src/domain/world/discover.ts`. Images are static files: `imageUrl()` returns `/art/<name>-s.webp` or `/art/<name>-l.webp`.

The only network use in the product UI is outbound links:

- Studio credit: `STUDIO_URL` in `src/shared/config/links.ts`
- Polar checkout: `COFFEE_URL` in the same file
- Each object's cited `source.url`

`scripts/check-sources.mjs` fetches those source URLs during content review. It is a maintainer script, not a runtime client.

The share link is a query string on the same origin: `?k=<object id>`.

Admin API (`server/index.mjs`, same origin, JSON):

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | none | `{ ok: true }` |
| POST | `/api/visits` | none | record a page view `{ path }`; skips `/admin`; ignores the same IP within 3 seconds |
| POST | `/api/auth/login` | none | `{ email, password }` → `{ accessToken }` and sets the refresh cookie; 8 failed tries per IP per 10 minutes |
| POST | `/api/auth/refresh` | refresh cookie | rotates the refresh token, returns a new `{ accessToken }` |
| POST | `/api/auth/logout` | refresh cookie | revokes the refresh token and clears the cookie |
| GET | `/api/admin/visits` | `Authorization: Bearer <access>` | `{ people, views, visitors: [{ ip, country, views, lastSeen }] }` for the last 24 hours |

The client side lives in `src/features/admin/api.ts`.

## Auth flow

The public site has no accounts. "Visitor" means the anonymous person in this browser. Saved, learned, history, affinity, settings, onboarding flags, world epoch, and constellations stay on the device.

The admin page has one admin account, defined by environment variables:

1. On start, the server requires `ADMIN_EMAIL`, `ADMIN_PASSWORD` (at least 8 characters), `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET` (each at least 32 characters). It reads `.env` if present; real environment variables win.
2. `ensureAdmin` hashes the password into the store. If the email or password changed, it re-hashes and revokes every refresh token.
3. Login returns a 15-minute access token (kept in memory in `api.ts`, never in storage) and sets a 7-day refresh token in the `ks_refresh` cookie (`HttpOnly`, `Path=/api/auth`, `SameSite=Lax`, `Secure` in production).
4. On load, `/admin` calls refresh to restore the session. A 401 from an admin call triggers one refresh and one retry.
5. Each refresh rotates the token; the old `jti` is removed. Logout removes the current one.

Current admin login: `admin@gr8r.com`. The password lives only in `.env` locally and in Coolify's environment variables.

## Deployment notes

Hosted on a Coolify server (`161.97.154.203`) from GitHub `Nazmul1011/KnownSpace`, branch `main`. There is no CI workflow.

Coolify settings:

- Build pack: **Dockerfile** (not Nixpacks; Nixpacks only offered Node 22.11 or 20.18, which skip Vite's native binding and fail the build with "Cannot find native binding")
- Port: 3000
- Domains: `https://knowspace.si,https://www.knowspace.si` (Let's Encrypt via Traefik)
- Environment variables: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
- Persistent storage: `/app/server/data`

The `Dockerfile` builds in `node:22-slim` (`npm ci`, `npm run build`) and copies only `dist/`, `server/`, and `package.json` into the runtime image, which runs `node server/index.mjs`.

DNS is at Namecheap (Advanced DNS): A record `@` → `161.97.154.203` and A record `www` → `161.97.154.203`. Do not add a CNAME with an IP value or a URL Redirect record.

```bash
npm install
npm run build    # tsc --noEmit && vite build
npm run start    # production server on PORT (default 3000)
```

`npm run check` runs typecheck, lint, format check, the architecture cycle check, and unit tests. `npm run test:e2e` expects the dev server. Visual capture can target a preview with `BASE_URL`.

Current navigation uses query strings on `/`. `/admin` is a real path; the production server falls back to `index.html` for it. `art/raw` is the lasting image source but is gitignored (it was about 890 MB) and lives only on the maintainer's machine; the deployed site uses the WebP files in `public/art`. Generator URLs in `art/sources.txt` expire. `npm run art` writes WebP files to `public/art` and regenerates `src/domain/knowledge/data/art.generated.json`.

## Protected files and areas

Do not edit these unless the task is specifically about them:

- `eslint.config.js` and `scripts/check-architecture.mjs` — layer direction and cycle checks
- `docs/architecture.md` — the written contract for those checks
- Each module's `index.ts` — the only legal import surface from outside that module
- `src/domain/knowledge/data/**` — the content corpus (catalog, batches, expansion)
- `src/domain/knowledge/data/art.generated.json` — generated by `npm run art`
- `src/shared/ui/icons.generated.ts` — generated by `npm run content:icons`
- `src/shared/styles/tokens.css` — the design tokens
- `src/domain/visitor/visitor-store.ts` — key `knowscape-v1`, `VISITOR_VERSION`, and `migrateVisitor`
- `src/features/session-goal/model/session-store.ts` — key `knowscape-session` and the medal thresholds
- `src/app/main.tsx` `window.__ks` — the debug surface the headless tests use
- `src/shared/config/links.ts` — live studio and Polar URLs
- `art/raw/**` and `public/art/**` — source and processed images
- `art/pending-images.tsv` — the queue of pictures that are not generated yet
- `server/auth.mjs` — token lifetimes, cookie name and flags, password hash format
- `server/store.mjs` — store file shape and the write queue
- `Dockerfile` — Node version (must stay at 22.12 or newer) and what is copied into the image
- `.env` and `server/data/` — secrets and live data; never commit them
- `vite.config.ts` `/api` proxy and `package.json` `dev` / `start` scripts — the dev and production wiring
