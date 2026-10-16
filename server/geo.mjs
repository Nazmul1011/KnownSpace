function isLocal(ip) {
  const value = ip.replace(/^::ffff:/, '');
  if (value === '127.0.0.1' || value === '::1' || value === 'localhost') return true;
  if (value.startsWith('10.') || value.startsWith('192.168.') || value.startsWith('169.254.')) return true;
  const parts = value.split('.').map(Number);
  if (parts.length === 4 && parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe80')) return true;
  return false;
}

export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const fromForwarded = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '';
  const real = typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'].trim() : '';
  const socket = (req.socket.remoteAddress || '').replace(/^::ffff:/, '');
  return fromForwarded || real || socket || 'unknown';
}

/** Country name for a public IP. Local addresses stay "Local". Results are cached by the caller. */
export async function countryFor(ip) {
  if (!ip || ip === 'unknown' || isLocal(ip)) return 'Local';
  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, { signal: AbortSignal.timeout(2500) });
    if (!response.ok) return 'Unknown';
    const body = await response.json();
    if (body?.success && typeof body.country === 'string' && body.country) return body.country;
  } catch {
    /* the visit is still recorded */
  }
  return 'Unknown';
}
