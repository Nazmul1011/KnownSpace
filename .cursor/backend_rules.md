# Knowspace backend rules

The backend is the small admin server in `server/`. It records page views and serves the `/admin` visitors page. The public product (canvas, content, search, visitor progress) does not depend on it and must keep working if it is down.

## Existing backend architecture

Plain Node ES modules, no framework, no npm dependencies:

| File | Owns |
| --- | --- |
| `server/index.mjs` | `.env` loading, startup checks, `ensureAdmin`, HTTP routing, request handlers, JSON body reading, static `dist/` serving in production |
| `server/auth.mjs` | `mustEnv`, scrypt `hashPassword` / `verifyPassword`, HS256 `signAccess` / `signRefresh` / `verifyJwt`, `refreshCookie`, `readCookie`, `bearer` |
| `server/geo.mjs` | `clientIp` (x-forwarded-for, then x-real-ip, then socket) and `countryFor` (private → `Local`, else `ipwho.is`, failure → `Unknown`) |
| `server/store.mjs` | `loadStore`, `readStore`, `updateStore` over `server/data/store.json` |
| `server/dev.mjs` | dev runner: API on 5342 and Vite on 5340, stops both together |

Run modes:

- Dev: `npm run dev` (API at `127.0.0.1:5342`, Vite proxies `/api`)
- Production: `npm run build && npm run start`, or the `Dockerfile` (`node server/index.mjs`, `NODE_ENV=production`, port 3000, host `0.0.0.0`)

## Dependency rule

Keep the server dependency-free. Use `node:` built-ins (`http`, `crypto`, `fs`, `path`). The runtime Docker image copies only `server/`, `dist/`, and `package.json`, with no `node_modules`; an npm import in `server/` will crash in production. If a dependency becomes unavoidable, the `Dockerfile` must install production dependencies in the runtime stage, and that is a deliberate change.

Server code must not import from `src/`, and `src/` must not import from `server/`. They share only the HTTP contract.

## Routing and handlers

- All API paths start with `/api/`. Anything else is static (production) or 404 (dev).
- Add a route as one `if (req.method === ... && url.pathname === ...)` branch in `route()` and one named async handler below it. Keep the handler order matching the route order.
- Read bodies only through `readBody` (16 KB limit, JSON only). Validate every field's type before use; default rather than trust.
- Reply only through `send(res, status, body)`. JSON responses carry `Cache-Control: no-store`. Shape: `{ ok: true, ... }` or `{ ok: false, error: '<sentence for a person>' }`. Use 204 with no body for beacons.
- Thrown errors become 500 with a generic message; log the real error with `console.error`. Do not send stack traces or internal messages.

## Data and storage rules

- The only persistence is `server/data/store.json` with fields `admin`, `refreshTokens`, `visits`, `geo`.
- Read with `readStore()`. Write only with `await updateStore((state) => { ... })`, which serializes writes and replaces the file atomically. Never write the file directly or hold a copy across an `await`.
- Adding a field: give it a default in `empty()` in `store.mjs`. `loadStore` spreads the saved file over `empty()`, so an older `store.json` still loads. An unreadable file starts empty, and the admin is recreated from the environment variables.
- Visits are pruned to 7 days on every write. The admin view reads the last 24 hours.
- `server/data/` is gitignored and must be a persistent volume in Coolify (`/app/server/data`).
- Do not add a database for this feature without an explicit decision.

## Auth and security rules

- Exactly one admin, from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. `ensureAdmin` re-hashes and revokes all refresh tokens when either changes. Do not add sign-up or a second user table.
- Required environment variables are checked at start with `mustEnv`; the server exits if any is missing or too short (passwords at least 8, JWT secrets at least 32 characters). Access and refresh secrets must differ.
- Passwords: scrypt with a random salt, stored as `scrypt$salt$hash`, compared with `timingSafeEqual`. Unknown emails still run a hash against `dummyHash` so timing does not reveal the email.
- Access token: 15 minutes, `typ: 'access'`, sent as `Authorization: Bearer`. Protected handlers must check `typ === 'access'` and `sub === adminEmail`.
- Refresh token: 7 days, `typ: 'refresh'`, unique `jti`, stored server-side only as a sha256 hash. It is rotated on every refresh and deleted on logout. It travels only in the `ks_refresh` cookie (`HttpOnly`, `Path=/api/auth`, `SameSite=Lax`, `Secure` in production). Never return it in a JSON body.
- Login is rate-limited to 8 failures per IP per 10 minutes (in memory). Keep the same error message for a wrong email and a wrong password.
- Never log passwords, tokens, or secrets. Never commit `.env`. `.env.example` holds placeholders only.
- `clientIp` trusts the first `x-forwarded-for` value because Traefik sits in front in production. Keep that assumption in mind before exposing the server without a proxy.

## Static serving rules

- Production serves `dist/` from `process.cwd()`. Unknown paths, directories, and anything trying to leave `dist/` fall back to `index.html`, which is how `/admin` loads.
- Keep the MIME map in `index.mjs` in step with the file types Vite emits.

## Deploy rules

- Node must be 22.12 or newer (or 20.19 or newer). Vite 8's native binding is silently skipped on older Node and the build fails. Keep `FROM node:22-slim` or newer in the `Dockerfile`.
- Coolify uses the **Dockerfile** build pack on port 3000. Do not switch back to Nixpacks.
- After changing environment variables in Coolify, redeploy.
- `.dockerignore` must keep `node_modules`, `art/raw`, `.env`, and `server/data` out of the build context.

## Protected backend areas

- `server/auth.mjs` — token lifetimes, cookie name, path and flags, hash format
- `server/store.mjs` — file path, field defaults, write queue
- `ensureAdmin`, `dummyHash`, and the rate limit in `server/index.mjs`
- `Dockerfile` and `.dockerignore`
- `package.json` `dev` and `start` scripts, `vite.config.ts` `/api` proxy
- `.env`, `server/data/` — never edit in a code change, never commit

## Testing a backend change

There are no automated server tests yet. After a change, run `npm run dev` and check with `curl`:

```bash
curl -s http://127.0.0.1:5342/api/health
curl -s -X POST http://127.0.0.1:5342/api/visits -H 'content-type: application/json' -d '{"path":"/"}'
curl -s -c /tmp/c -X POST http://127.0.0.1:5342/api/auth/login -H 'content-type: application/json' -d '{"email":"admin@gr8r.com","password":"<password>"}'
curl -s -b /tmp/c -c /tmp/c -X POST http://127.0.0.1:5342/api/auth/refresh
curl -s http://127.0.0.1:5342/api/admin/visits -H 'authorization: Bearer <accessToken>'
```

For a production check, run `npm run build`, then `npm run start` with the four environment variables, and load `/`, `/admin`, and `/api/health`.
