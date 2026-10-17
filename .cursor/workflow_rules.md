# Knowspace workflow rules

Use these on every change in this repo.

## Always analyze before coding

Read the feature's `index.ts`, the domain module it uses, and `docs/architecture.md` before editing. Confirm which layer owns the behaviour:

- shared product facts and drawing → `src/domain`
- one capability's UI and commands → `src/features/<name>`
- screen wiring and chrome that composes several features → `src/app`
- product-independent primitives → `src/shared`
- admin API, auth, visit storage → `server/` (read `.cursor/backend_rules.md`)
- the admin page and its HTTP calls → `src/features/admin`

Check `eslint.config.js` if the change adds an import. An upward import or a deep import into another module will fail lint. A cycle will fail `npm run check:architecture`.

## Create an implementation plan for large features

A large feature touches more than one layer, adds persisted state, changes the canvas, or changes content shape. Before coding, write a short plan that names:

- the layer and folder
- the public exports to add on `index.ts`
- whether visitor or session storage changes, and the migration step if it does
- which existing component is reused
- the tests to add or extend (`*.test.ts` next to the code, and an e2e journey if the path is user-visible)
- for server work: the routes, the request and response shape, the `store.json` fields touched, and any new environment variable (add it to `.env.example` and to Coolify)

Do not start that work in the same step as the plan.

## Implement one stage at a time

Suggested stages, in order, skipping any that do not apply:

1. Types and pure functions, with unit tests
2. Store or navigation command
3. View, reusing `src/shared/ui` and `Visual`
4. App composition, only if the screen needs a new mount
5. Content or art, only through the existing data files and `npm run art`

Finish and check one stage before the next. Do not mix a content expansion with a canvas rewrite.

## Do not modify unrelated files

Stay inside the feature and the domain modules it is allowed to use. Do not reformat or rename neighbouring features. Do not hand-edit generated files (`art.generated.json`, `icons.generated.ts`). Do not retune tokens, storage keys, or `window.__ks` as a side effect.

Leave `COFFEE_URL`, `STUDIO_URL`, and cited source URLs unchanged unless the task is those links.

Do not commit `package-lock.json` changes that only come from a different npm version (for example removed `libc` fields). Restore it with `git checkout -- package-lock.json` unless dependencies actually changed.

Never commit `.env`, `server/data/`, or `art/raw/`. Never paste real secrets into docs, code, or `.env.example`.

## Show files to modify before coding

Before the first edit, list the files that will change and one line on why each is in the set. Include new files. If a protected file from `.cursor/project_context.md` is on the list, say why the task cannot be done outside it.

Wait for that list to be the scope. Do not expand it mid-change without saying so.

## Show changed files and testing steps after coding

When the change is done, report:

- files actually changed
- how to run the app (`npm run dev`, http://127.0.0.1:5340; admin at `/admin`)
- the narrow check for the stage (`npm run test`, `npm run typecheck`, or `npm run check`)
- any user path to click (landing → canvas → the feature)
- if the canvas or chrome moved, the visual capture pair in `tests/visual` (`before`, then `after`, then `compare.mjs`)
- if storage shape changed, what an old `knowscape-v1` save does on load

- for server changes, the `curl` checks from `.cursor/backend_rules.md`, and a production smoke test (`npm run build`, `npm run start`, then `/`, `/admin`, `/api/health`)

Do not claim a browser check you did not run. This repo's e2e scripts need the dev server and headless Chrome (`npm run test:e2e`).

## Deploying

Coolify deploys `main` from GitHub `Nazmul1011/KnownSpace` with the Dockerfile build pack.

1. Run `npm run build` locally first; Coolify runs the same `tsc --noEmit && vite build`.
2. Commit and push to `main`, then click **Redeploy** in Coolify (or rely on its webhook if one is set).
3. After deploy, check `https://knowspace.si`, `https://knowspace.si/admin`, and `https://knowspace.si/api/health`.
4. If the build fails with "Cannot find native binding", the Node version is too old: check that the build pack is still Dockerfile and the base image is `node:22-slim` or newer.
5. If the site times out in a browser but loads from `curl`, it is a stale DNS cache: clear `chrome://net-internals/#dns` and run `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.
