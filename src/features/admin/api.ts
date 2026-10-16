export interface VisitorRow {
  ip: string;
  country: string;
  views: number;
  lastSeen: number;
}

export interface VisitSummary {
  people: number;
  views: number;
  visitors: VisitorRow[];
}

let accessToken: string | null = null;

/** Tells the server someone opened the public site. Failures stay quiet so the canvas still loads. */
export function recordVisit() {
  const path = window.location.pathname || '/';
  if (path === '/admin') return;
  void fetch('/api/visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
    keepalive: true,
  }).catch(() => undefined);
}

export async function restoreSession() {
  const response = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
  if (!response.ok) return false;
  const body = (await response.json()) as { accessToken?: string };
  accessToken = body.accessToken ?? null;
  return Boolean(accessToken);
}

export async function signIn(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = (await response.json().catch(() => ({}))) as { accessToken?: string; error?: string };
  if (!response.ok || !body.accessToken) return body.error || 'That email or password is not right.';
  accessToken = body.accessToken;
  return null;
}

export async function signOut() {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => undefined);
  accessToken = null;
}

export async function loadVisits(): Promise<VisitSummary | null> {
  const response = await authorized('/api/admin/visits');
  if (!response?.ok) return null;
  const body = (await response.json()) as VisitSummary;
  return body;
}

async function authorized(path: string) {
  const send = () =>
    fetch(path, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      credentials: 'include',
    });
  let response: Response;
  try {
    response = await send();
  } catch {
    return null;
  }
  if (response.status !== 401) return response;
  const renewed = await restoreSession();
  if (!renewed) return response;
  try {
    return await send();
  } catch {
    return null;
  }
}
