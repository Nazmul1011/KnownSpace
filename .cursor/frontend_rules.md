# Knowspace frontend rules

Follow `docs/architecture.md`. These notes describe the code that is already here.

## Existing frontend architecture

One public screen, no router, no `pages/` directory. `src/app/app.tsx` checks `window.location.pathname`: `/admin` renders `AdminPage` from `@/features/admin`; every other path renders `Site` (the canvas product). Do not add a router library for this; a second private screen would follow the same pathname check.

Four layers, dependencies only downward:

```text
app  →  features  →  domain  →  shared
```

| Layer | Path | Holds | May import |
| --- | --- | --- | --- |
| App | `src/app` | `main.tsx`, `app.tsx`, keyboard shortcuts, header, mobile bar, toasts, recent strip | features, domain, shared |
| Feature | `src/features/<name>` | `components/`, optional `model/`, `hooks/`, `utils/`, and `index.ts` | own files, other features' `index.ts` (acyclic), domain, shared |
| Domain | `src/domain/<name>` | knowledge, world, visitor, ui-state | other domain `index.ts` files (acyclic), shared |
| Shared | `src/shared/<kind>` | UI primitives, rng, hooks, config, global styles | other shared modules |

Outside a module, import from `@/features/<name>` or `@/domain/<name>`. Inside a module, use relative imports. ESLint `no-restricted-imports` blocks deep imports and upward imports. `npm run check:architecture` fails on cycles.

Styles sit beside the component (`search.tsx` imports `search.css`). Only tokens, base rules, and the floating-chrome shell are global. `main.tsx` imports those first.

Tests sit next to the code (`*.test.ts`). Browser journeys live in `tests/e2e`. Screenshot regression lives in `tests/visual`.

Navigation commands (fly to, gather, surprise, recentre, inspire) live in `src/features/canvas/model/navigation.ts`. Search, topics, and collection call them through `@/features/canvas`. They stay outside React so keys, buttons, and search share one implementation.

## Shared component reuse rule

Use the primitives in `src/shared/ui` instead of copying them:

- `icon.tsx` and generated `icons.generated.ts`
- `brand.tsx`
- `wheel.tsx` (topic picker)
- `timer-ring.tsx` and `seg-pill.tsx` (session progress)
- `external-link.tsx`

`src/shared` must not import `app`, `features`, or `domain`. If a control knows about knowledge objects, subjects, or the visitor, it belongs in a feature or in `domain/knowledge/ui`, not in `shared`.

`Visual` in `src/domain/knowledge/ui/visual.tsx` is the one way to draw a knowledge object. Card formats in the canvas compose it. Do not start a second image renderer.

Outbound URLs go through `src/shared/config/links.ts`.

## Model, controller, service, and view order

This project has no MVC controllers and no service layer. Match the existing order:

1. **Domain model** — types and pure data in `src/domain/knowledge` and pure world functions in `src/domain/world` (`layout`, `discover`, `constellation`, `camera`).
2. **Feature model** — Zustand stores and command functions in `features/<name>/model` when one feature owns the write. Visitor-wide writes stay in `domain/visitor`. Cross-screen UI writes stay in `domain/ui-state`.
3. **View** — `features/<name>/components` (and `domain/knowledge/ui` for drawing an object). Components read stores and call commands. They do not reimplement layout, search, or session rules.
4. **App composition** — `src/app/app.tsx` only mounts features and chrome, picks `AdminPage` or `Site` by pathname, and fires `recordVisit()` once in `Site`. New product rules do not go here.

Hooks and utils under a feature are for that feature's view behaviour (shelf scroll, entrance zoom). Shared product rules do not go in a component `useState` if another feature must read them.

There is nothing to name `controller` or `service`. Do not add those folders.

## UI design rules

- Tokens live in `src/shared/styles/tokens.css`: canvas `#f8f8f6`, ink scale, hairlines, jade links, Gr8r red only for the studio credit, glass only on floating chrome, the spacing scale, soft shadows, Geist for UI, Newsreader for editorial type.
- Use the token variables. Do not introduce a second palette in a feature stylesheet.
- Accents (`--blue`, `--violet`, `--green`, `--warm`, category hues) are for state and small marks, not large fills.
- Body copy is British English, matching the content.
- Respect reduced motion through `useReducedMotion` and the visitor `settings.motion` preference (`system`, `reduce`, `full`).
- One overlay at a time (`overlay` on `useUI`). The knowledge modal closes other overlays when an object opens.
- The admin page uses the same tokens and the `.pill pill--ink` button. Its styles stay in `src/features/admin/components/admin-page.css` with `admin-` class names. It switches to one column under 720px.
- Phone detail is a bottom sheet. Check `use-media` before adding a desktop-only control.
- Floating chrome stays in `src/app/layout` when it composes several features. A control that belongs to one capability stays in that feature (canvas controls, topic rail, collection).

## State management rules

- **Visitor** (`useVisitor`): saved, learned, history, affinity, days, settings, onboarding, epoch, constellations. Persisted as `knowscape-v1`. New fields need a version bump and a branch in `migrateVisitor`.
- **Session** (`useSession`): today's twenty, medals. Persisted as `knowscape-session`. Only `session-goal` writes it.
- **UI** (`useUI`): modal trail, overlay, collection tab, filter, hover, pulse, surprising, intro, toasts. Not persisted. Every load starts with the intro open.
- **Camera**: `domain/world/camera.ts`. Starts at home. Do not persist camera position.
- **Local UI** (open menu animation, drag offsets) stays in the component.
- Read with selectors (`useUI((s) => s.overlay)`). Call `getState()` from commands and tests, not from render to invent a second source of truth.
- `window.__ks` may expose the existing stores. Do not put secrets or new mutable globals beside it.
- **Admin**: the access token is a module variable in `src/features/admin/api.ts`. Never put it in Zustand, `localStorage`, `sessionStorage`, or `window.__ks`. The refresh token is an `HttpOnly` cookie the page cannot read. The page phase (`checking`, `login`, `ready`) and form fields are local component state.

## API service rules

Do not add an API client, React Query cache, or `services/` folder for knowledge content. The data is the TypeScript modules under `src/domain/knowledge/data`, joined in `objects.ts`.

- Search and picks: `src/domain/world/discover.ts`
- Images: `imageUrl(name, 's' | 'l')` → `/art/<name>-s.webp` or `-l.webp`
- Share target: `?k=<id>` on the current origin
- External pages: `links.ts` or the object's `source.url`

A new remote call is a product change, not a refactor. It needs an explicit decision and a place in the layer rules. `scripts/check-sources.mjs` stays a maintainer script.

The one HTTP client is `src/features/admin/api.ts`, which talks to the same-origin admin server:

- `recordVisit()` — fire-and-forget `POST /api/visits` with `keepalive`. It must never throw or block the canvas; failures are swallowed. It skips `/admin`.
- `signIn`, `signOut`, `restoreSession` — `/api/auth/*` with `credentials: 'include'`
- `loadVisits()` — `GET /api/admin/visits` through `authorized()`, which refreshes once on a 401 and retries

Use relative `/api/...` URLs only. In dev, Vite proxies them to `127.0.0.1:5342`; in production the same server answers. Add new admin calls to `api.ts`, not to components.

## Protected frontend areas

- `eslint.config.js`, `scripts/check-architecture.mjs`, every `index.ts` barrel
- `src/shared/styles/tokens.css` and `src/shared/styles/base.css`
- `src/shared/ui/icons.generated.ts`
- `src/domain/knowledge/data/**` and `art.generated.json`
- `src/domain/knowledge/ui/visual.tsx` (including `ArtPending`)
- `src/domain/visitor/visitor-store.ts` (`knowscape-v1`, version, migrate, merge)
- `src/features/session-goal/model/session-store.ts` (`knowscape-session`, goal of 20, medal steps)
- `src/domain/ui-state/ui-store.ts` (intro always starts open)
- `src/features/canvas/model/navigation.ts`
- `src/app/main.tsx` (`window.__ks`) and the deep-link effect in `src/app/app.tsx`
- The `/admin` pathname switch and the `recordVisit()` effect in `src/app/app.tsx`
- `src/features/admin/api.ts` (in-memory access token, refresh-and-retry)
- `src/shared/config/links.ts`
- `vite.config.ts` `/api` proxy
