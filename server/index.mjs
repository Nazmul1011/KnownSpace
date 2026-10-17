import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { createHash, timingSafeEqual } from 'node:crypto';
import { brotliCompressSync, constants as zlib, gzipSync } from 'node:zlib';
import { bearer, hashPassword, mustEnv, readCookie, refreshCookie, signAccess, signRefresh, verifyJwt, verifyPassword } from './auth.mjs';
import { clientIp, countryFor } from './geo.mjs';
import { loadStore, readStore, updateStore } from './store.mjs';

loadEnv();
loadStore();

const accessSecret = mustEnv('JWT_ACCESS_SECRET');
const refreshSecret = mustEnv('JWT_REFRESH_SECRET');
const adminEmail = mustEnv('ADMIN_EMAIL').toLowerCase();
const adminPassword = mustEnv('ADMIN_PASSWORD');

if (accessSecret.length < 32 || refreshSecret.length < 32) {
  console.error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must each be at least 32 characters.');
  process.exit(1);
}
if (adminPassword.length < 8) {
  console.error('ADMIN_PASSWORD must be at least 8 characters.');
  process.exit(1);
}

await ensureAdmin();
const dummyHash = await hashPassword('not-the-admin-password');

const DAY = 24 * 60 * 60 * 1000;
const loginAttempts = new Map();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

const port = Number(process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 5342));
const host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');
const serveSite = process.env.NODE_ENV === 'production';

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      await route(req, res, url);
      return;
    }
    if (serveSite) serveStatic(req, res, url.pathname);
    else send(res, 404, { ok: false, error: 'Not found' });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message === 'bad json' || message === 'too large') send(res, 400, { ok: false, error: 'Send a small JSON body.' });
    else {
      console.error(error);
      send(res, 500, { ok: false, error: 'Something went wrong.' });
    }
  }
}).listen(port, host, () => {
  console.log(`Knowspace server on http://${host}:${port}`);
});

async function route(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/health') {
    send(res, 200, { ok: true });
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/visits') {
    await recordVisit(req, res);
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/auth/login') {
    await login(req, res);
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/auth/refresh') {
    await refresh(req, res);
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/auth/logout') {
    await logout(req, res);
    return;
  }
  if (req.method === 'GET' && url.pathname === '/api/admin/visits') {
    visits(req, res);
    return;
  }
  send(res, 404, { ok: false, error: 'Not found' });
}

async function recordVisit(req, res) {
  const body = await readBody(req);
  const path = typeof body.path === 'string' && body.path.startsWith('/') ? body.path.slice(0, 200) : '/';
  if (path === '/admin' || path.startsWith('/api/')) {
    send(res, 204, null);
    return;
  }
  const ip = clientIp(req);
  const known = readStore().geo[ip];
  const country = known || (await countryFor(ip));
  await updateStore((state) => {
    const now = Date.now();
    state.geo[ip] = country;
    const recent = state.visits.some((visit) => visit.ip === ip && now - visit.seenAt < 3000);
    if (recent) return;
    state.visits.push({ ip, country, path, seenAt: now });
    const keep = now - 7 * DAY;
    state.visits = state.visits.filter((visit) => visit.seenAt >= keep);
  });
  send(res, 204, null);
}

async function login(req, res) {
  const ip = clientIp(req);
  if (limited(ip)) {
    send(res, 429, { ok: false, error: 'Too many attempts. Wait a few minutes.' });
    return;
  }
  const body = await readBody(req);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const admin = readStore().admin;
  const passwordOk = await verifyPassword(password, admin?.passwordHash || dummyHash);
  const matches = Boolean(admin && email === admin.email && passwordOk);
  if (!matches) {
    noteAttempt(ip);
    send(res, 401, { ok: false, error: 'That email or password is not right.' });
    return;
  }
  loginAttempts.delete(ip);
  const accessToken = signAccess(admin.email, accessSecret);
  const refresh = signRefresh(admin.email, refreshSecret);
  await updateStore((state) => {
    state.refreshTokens = state.refreshTokens.filter((row) => row.expiresAt > Date.now());
    state.refreshTokens.push({ jti: refresh.jti, tokenHash: sha(refresh.token), expiresAt: refresh.expiresAt });
  });
  res.setHeader('Set-Cookie', refreshCookie(refresh.token));
  send(res, 200, { ok: true, accessToken });
}

async function refresh(req, res) {
  const token = readCookie(req, 'ks_refresh');
  const payload = verifyJwt(token, refreshSecret);
  const row = payload?.typ === 'refresh' ? readStore().refreshTokens.find((item) => item.jti === payload.jti) : null;
  if (!payload || !row || !sameHash(row.tokenHash, sha(token)) || row.expiresAt <= Date.now()) {
    res.setHeader('Set-Cookie', refreshCookie(''));
    send(res, 401, { ok: false, error: 'Sign in again.' });
    return;
  }
  const accessToken = signAccess(payload.sub, accessSecret);
  const next = signRefresh(payload.sub, refreshSecret);
  await updateStore((state) => {
    state.refreshTokens = state.refreshTokens.filter((item) => item.jti !== payload.jti && item.expiresAt > Date.now());
    state.refreshTokens.push({ jti: next.jti, tokenHash: sha(next.token), expiresAt: next.expiresAt });
  });
  res.setHeader('Set-Cookie', refreshCookie(next.token));
  send(res, 200, { ok: true, accessToken });
}

async function logout(req, res) {
  const token = readCookie(req, 'ks_refresh');
  const payload = verifyJwt(token, refreshSecret);
  await updateStore((state) => {
    if (payload?.jti) state.refreshTokens = state.refreshTokens.filter((item) => item.jti !== payload.jti);
  });
  res.setHeader('Set-Cookie', refreshCookie(''));
  send(res, 200, { ok: true });
}

function visits(req, res) {
  const payload = verifyJwt(bearer(req), accessSecret);
  if (!payload || payload.typ !== 'access' || payload.sub !== adminEmail) {
    send(res, 401, { ok: false, error: 'Sign in again.' });
    return;
  }
  const since = Date.now() - DAY;
  const grouped = new Map();
  for (const visit of readStore().visits) {
    if (visit.seenAt < since) continue;
    const current = grouped.get(visit.ip) || { ip: visit.ip, country: visit.country, views: 0, lastSeen: 0 };
    current.views += 1;
    current.country = visit.country || current.country;
    current.lastSeen = Math.max(current.lastSeen, visit.seenAt);
    grouped.set(visit.ip, current);
  }
  const visitors = [...grouped.values()].sort((a, b) => b.lastSeen - a.lastSeen);
  const views = visitors.reduce((sum, visitor) => sum + visitor.views, 0);
  send(res, 200, { ok: true, people: visitors.length, views, visitors });
}

function limited(ip) {
  const row = loginAttempts.get(ip);
  if (!row || row.reset < Date.now()) return false;
  return row.count >= 8;
}

function noteAttempt(ip) {
  const row = loginAttempts.get(ip);
  if (!row || row.reset < Date.now()) loginAttempts.set(ip, { count: 1, reset: Date.now() + 10 * 60 * 1000 });
  else row.count += 1;
}

async function ensureAdmin() {
  const admin = readStore().admin;
  if (admin?.email === adminEmail && (await verifyPassword(adminPassword, admin.passwordHash))) return;
  const passwordHash = await hashPassword(adminPassword);
  await updateStore((state) => {
    state.admin = { email: adminEmail, passwordHash };
    state.refreshTokens = [];
  });
}

function sha(value) {
  return createHash('sha256').update(value).digest('base64url');
}

function sameHash(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 16_000) {
        reject(new Error('too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!chunks.length) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      } catch {
        reject(new Error('bad json'));
      }
    });
    req.on('error', reject);
  });
}

function send(res, status, body) {
  if (body == null) {
    res.writeHead(status);
    res.end();
    return;
  }
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

function serveStatic(req, res, pathname) {
  const dist = join(process.cwd(), 'dist');
  if (!existsSync(dist)) {
    send(res, 503, { ok: false, error: 'Run npm run build before starting the server.' });
    return;
  }
  const relative = pathname.replace(/^\/+/, '');
  let file = join(dist, relative);
  const inside = file === dist || file.startsWith(dist + '/');
  if (!inside || relative.includes('..') || !existsSync(file) || statSync(file).isDirectory()) file = join(dist, 'index.html');
  const stat = statSync(file);
  const encoding = compressible.has(extname(file)) ? pickEncoding(req.headers['accept-encoding']) : '';
  const etag = encoding ? etagFor(file, stat).replace(/"$/, `-${encoding}"`) : etagFor(file, stat);
  const headers = {
    'Content-Type': types[extname(file)] || 'application/octet-stream',
    'Cache-Control': cacheControl(file, dist),
    ETag: etag,
    'Last-Modified': stat.mtime.toUTCString(),
    ...(compressible.has(extname(file)) ? { Vary: 'Accept-Encoding' } : {}),
  };
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, headers);
    res.end();
    return;
  }
  if (encoding) {
    const body = compressed(file, stat, encoding);
    res.writeHead(200, { ...headers, 'Content-Encoding': encoding, 'Content-Length': body.length });
    res.end(body);
    return;
  }
  res.writeHead(200, { ...headers, 'Content-Length': stat.size });
  createReadStream(file).pipe(res);
}

// Images and woff2 fonts are already compressed; only text formats gain from it.
const compressible = new Set(['.html', '.js', '.css', '.json', '.svg']);
const compressedFiles = new Map();

function pickEncoding(accept = '') {
  if (/\bbr\b/.test(accept)) return 'br';
  if (/\bgzip\b/.test(accept)) return 'gzip';
  return '';
}

function compressed(file, stat, encoding) {
  const key = `${file}:${stat.size}:${stat.mtimeMs}:${encoding}`;
  let body = compressedFiles.get(key);
  if (!body) {
    const raw = readFileSync(file);
    body =
      encoding === 'br'
        ? brotliCompressSync(raw, { params: { [zlib.BROTLI_PARAM_QUALITY]: 9, [zlib.BROTLI_PARAM_SIZE_HINT]: raw.length } })
        : gzipSync(raw, { level: 9 });
    compressedFiles.set(key, body);
  }
  return body;
}

// Vite content-hashes everything in assets/; art files keep fixed names and can be regenerated in place.
function cacheControl(file, dist) {
  if (file.startsWith(join(dist, 'assets') + '/')) return 'public, max-age=31536000, immutable';
  if (file.startsWith(join(dist, 'art') + '/')) return 'public, max-age=604800';
  return 'no-cache';
}

const etags = new Map();

function etagFor(file, stat) {
  const key = `${file}:${stat.size}:${stat.mtimeMs}`;
  let etag = etags.get(key);
  if (!etag) {
    etag = `"${createHash('sha1').update(readFileSync(file)).digest('base64url')}"`;
    etags.set(key, etag);
  }
  return etag;
}

function loadEnv() {
  if (!existsSync('.env')) return;
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}
