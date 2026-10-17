# Knowspace project tasks

Read from the current tree and the deploy work done on 17 October 2026. This is not a product roadmap the repo does not contain.

## What seems completed

The client app is a working single-screen product:

- Landing page on every load, then the infinite canvas
- Knowledge catalog joined to editorial text, with integrity tests (unique ids, real related ids, known subjects, required card fields, https sources)
- Canvas navigation: pan, zoom, fly-to, gather, inspire, surprise, discover, topic filter
- Search, topic rail, topic wheel
- Detail modal with learned, save, share, and a related trail
- Collection shelf (saved, recent, learned), including loop behaviour and tests
- Session goal of 20, medals every 5, celebration UI, session store tests
- Visitor persistence, migration to version 3, streak helper, visitor store tests
- Settings (motion, connections, greeting, personalize, shelf loop)
- First-visit coach
- Seeded world layout tests and discovery tests
- Architecture enforcement (ESLint import rules plus `scripts/check-architecture.mjs`)
- Unit, e2e, accessibility, responsive, and visual-regression harnesses
- Art pipeline (`art/build.mjs`) that writes WebP sizes and the art manifest
- Content checks (`content:validate`, `check-sources.mjs`, icon generation)

Added since the first analysis:

- **Admin visitors page** at `/admin` (`src/features/admin`): email and password sign-in with a show/hide eye toggle; stat cards and a table of the last 24 hours of visitors with IP and country; refresh every 30 seconds; enlarged layout (760px login card, 1120px dashboard).
- **Admin server** (`server/`): visit recording, login with rate limit, access and refresh tokens with rotation, logout, visitors summary, static hosting of `dist/` in production. No npm dependencies.
- **Deploy**: `Dockerfile` and `.dockerignore`; Coolify builds with the Dockerfile build pack on port 3000.
- **Domain**: `knowspace.si` and `www.knowspace.si` point to the Coolify server and have Let's Encrypt certificates. Verified: home page, `/admin`, `/api/health`, login, and real visitors being recorded with country.
- **Repo size**: `art/raw/` source PNGs (about 890 MB) are gitignored so pushes to GitHub succeed.

## What seems incomplete

- **Persistent storage.** Confirm Coolify has a volume at `/app/server/data`. Without it, visitor records reset on every redeploy. The admin account is rebuilt from environment variables, so login keeps working either way.
- **Secrets were exposed.** The admin password and both JWT secrets were shown in chat and screenshots. Set a stronger `ADMIN_PASSWORD` and new 32+ character `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` in Coolify, then redeploy.
- **www redirect.** `www.knowspace.si` serves the site directly. Optional: set Coolify's Direction to "Redirect to non-www".
- **Pictures.** `art/pending-images.tsv` still lists objects whose photo or cut-out is not in `art/raw` yet. Those cards render `ArtPending` in `src/domain/knowledge/ui/visual.tsx`. The README still says 201; the TSV is the current queue.
- **Docs drift.** `README.md` still points at old paths (`src/canvas`, `src/world`, `src/store/session.ts`, `src/ui/Session.tsx`, `src/content/more`) and says nothing about the admin server or deploy. The README object count (375) does not mention the later extras and `wave2-*` files. `art/PHOTO-BRIEF.md` still says `src/content/more/*.ts`.
- **No CI.** Nothing runs `npm run check` before Coolify deploys.
- **No tests for the admin server or page.** It was checked by hand (login, refresh, logout, visit recording, browser screenshots).
- **Uncommitted context docs.** `.cursor/*.md` are not in git.
- **No accounts on the public site.** Progress cannot move between browsers. That is the current design, not a half-built auth flow.

## What should be built next

1. Add the Coolify persistent volume at `/app/server/data` and rotate the admin password and JWT secrets.
2. Finish the pending art queue: generate each prompt, save `art/raw/<id>.png`, run `npm run art`, and confirm the card leaves the placeholder. Validate with `npm run content:validate`. Commit only `public/art` and the manifest; `art/raw` stays local.
3. Update the README and photo brief so they name the real folders, the live collection size, the admin server, and the deploy. Do that as a docs-only change.
4. Add a CI workflow that runs `npm run check` and `npm run build` on Node 22.12 or newer.
5. Add small tests for `server/auth.mjs` (hash, verify, sign, expired token) and an e2e journey for `/admin` sign-in.
6. Leave public accounts and sync alone until there is an explicit product decision.

## Bugs and risk areas

- **Node version.** Vite 8 needs Node `^20.19.0 || >=22.12.0`. On older Node, npm skips `@rolldown/binding-linux-x64-gnu` without an error and the build fails later. Do not switch Coolify back to Nixpacks or lower the `Dockerfile` base image.
- **Lockfile churn.** An older npm once stripped the `libc` fields from `package-lock.json`. Do not commit lockfile changes that come only from a different npm version.
- **Admin data loss.** `server/data/store.json` lives inside the container unless a volume is mounted.
- **Single JSON file.** Fine for one admin and a modest visit count; visits are kept 7 days. Heavy traffic would make every write rewrite the whole file.
- **Client IP.** `clientIp` trusts `x-forwarded-for` (first value), which Traefik sets in production. Without a proxy in front, that header could be spoofed.
- **Country lookup.** Depends on `ipwho.is`, with a 2.5 second timeout. Failures record `Unknown`; private addresses record `Local`.
- **Login rate limit** is in memory and resets when the server restarts.
- **Save format.** Changing `knowscape-v1` or adding visitor fields without a `migrateVisitor` step and a `VISITOR_VERSION` bump can drop or corrupt existing saves. Version 3 already exists (constellations compacted at v2, shelf loop defaulted off at v3).
- **Session reset rules.** `knowscape-session` is tab-scoped, day-scoped, and restarts after 20. Tests cover this; UI changes around "Mark as learned" can break the medal sequence.
- **`window.__ks`.** E2E scripts drive the stores through this object. Renaming those fields breaks `tests/e2e` without a TypeScript error.
- **Layer cycles.** Knowledge drawing must not import the world layout. The art manifest was split into `domain/knowledge/model/art.ts` to avoid a knowledge ↔ world cycle. A new cross-import can fail `npm run check:architecture`.
- **Generated files.** Hand-editing `art.generated.json` or `icons.generated.ts` will be overwritten and can disagree with `public/art`.
- **Placeholders.** Shipping with the pending queue leaves a large set of cards on the designed fallback. That is visible, not a crash.
- **Content accuracy.** A few figures are noted in the README as coming from a source other than the cited one. Debated objects must keep `certainty: 'debated'` and a caveat.
- **Strict Mode.** Effects in `App` (idle canvas mount, deep-link fly-to, visit beacon) run twice in development. The server ignores a repeat visit from the same IP within 3 seconds.
- **Deep link.** `?k=` is read once at module load in `app.tsx`. It only works for ids present in `byId`.
- **Payment link.** `COFFEE_URL` is a live Polar checkout. Do not replace it while editing nearby chrome.
- **Stale path comments.** Following the README's old paths will create a second tree beside the real one.

## Priority order

1. Persistent volume and secret rotation in Coolify.
2. Pending images, then content validation.
3. Correct the README and briefs so the next change lands in the real folders.
4. CI around `npm run check` and `npm run build`.
5. Tests for the admin server and page.
6. Any new product behaviour, one feature at a time, inside the existing layer rules.
7. Public accounts or sync only after an explicit decision.
