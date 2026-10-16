import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCb);
const ACCESS_TTL = 15 * 60;
const REFRESH_TTL = 7 * 24 * 60 * 60;

export function mustEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Set ${name} before starting the server.`);
    process.exit(1);
  }
  return value;
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('base64url');
  const key = await scrypt(password, salt, 32);
  return `scrypt$${salt}$${key.toString('base64url')}`;
}

export async function verifyPassword(password, stored) {
  const [algo, salt, hash] = String(stored).split('$');
  if (algo !== 'scrypt' || !salt || !hash) return false;
  const key = await scrypt(password, salt, 32);
  const expected = Buffer.from(hash, 'base64url');
  if (key.length !== expected.length) return false;
  return timingSafeEqual(key, expected);
}

function sign(payload, secret, ttl) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const body = Buffer.from(JSON.stringify({ ...payload, iat: now, exp: now + ttl })).toString('base64url');
  const data = `${header}.${body}`;
  const sig = createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyJwt(token, secret) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  const data = `${header}.${body}`;
  const expected = createHmac('sha256', secret).update(data).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!payload || typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function signAccess(email, secret) {
  return sign({ sub: email, typ: 'access' }, secret, ACCESS_TTL);
}

export function signRefresh(email, secret) {
  const jti = randomBytes(18).toString('base64url');
  const token = sign({ sub: email, typ: 'refresh', jti }, secret, REFRESH_TTL);
  return { token, jti, expiresAt: Date.now() + REFRESH_TTL * 1000 };
}

export function refreshCookie(token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const maxAge = token ? REFRESH_TTL : 0;
  const value = token ?? '';
  return `ks_refresh=${value}; HttpOnly; Path=/api/auth; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return '';
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return '';
}

export function bearer(req) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return '';
  return header.slice(7).trim();
}
