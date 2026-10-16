import { useEffect, useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Mark } from '@/shared/ui/brand';
import { loadVisits, restoreSession, signIn, signOut, type VisitSummary } from '../api';
import './admin-page.css';

type Phase = 'checking' | 'login' | 'ready';

export function AdminPage() {
  const [phase, setPhase] = useState<Phase>('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState<VisitSummary | null>(null);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Admin · Knowspace';
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    let gone = false;
    restoreSession()
      .then(async (ok) => {
        if (gone) return;
        if (!ok) {
          setPhase('login');
          return;
        }
        const data = await loadVisits();
        if (gone) return;
        if (!data) {
          setPhase('login');
          return;
        }
        setSummary(data);
        setPhase('ready');
      })
      .catch(() => {
        if (!gone) setPhase('login');
      });
    return () => {
      gone = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'ready') return;
    const timer = window.setInterval(() => {
      loadVisits().then((data) => {
        if (data) setSummary(data);
      });
    }, 30_000);
    return () => window.clearInterval(timer);
  }, [phase]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const message = await signIn(email, password);
      if (message) {
        setError(message);
        return;
      }
      const data = await loadVisits();
      if (!data) {
        setError('Signed in, but the visitor list did not load.');
        setPhase('login');
        return;
      }
      setSummary(data);
      setPhase('ready');
    } catch {
      setError('The admin server is not running.');
    } finally {
      setBusy(false);
    }
  }

  async function onSignOut() {
    await signOut();
    setSummary(null);
    setPassword('');
    setShowPassword(false);
    setPhase('login');
  }

  return (
    <main className="admin">
      <div className={`admin-card${phase === 'ready' ? ' admin-card--wide' : ''}`}>
        <a className="admin-brand" href="/">
          <Mark size={28} />
          <span>Knowspace</span>
        </a>

        {phase === 'checking' && <p className="admin-muted">Checking your session…</p>}

        {phase === 'login' && (
          <form className="admin-form" onSubmit={onSubmit}>
            <div className="admin-intro">
              <p className="admin-kicker">Admin</p>
              <h1 className="admin-title">Sign in</h1>
              <p className="admin-lead">The last day of visits, with each address and country.</p>
            </div>
            <label className="admin-field">
              <span>Email</span>
              <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label className="admin-field">
              <span>Password</span>
              <span className="admin-secret">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  className="admin-eye"
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((shown) => !shown)}
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.8} aria-hidden /> : <Eye size={18} strokeWidth={1.8} aria-hidden />}
                </button>
              </span>
            </label>
            {error && <p className="admin-error">{error}</p>}
            <button className="pill pill--ink admin-submit" type="submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}

        {phase === 'ready' && summary && (
          <section className="admin-board" aria-label="Visitors in the last 24 hours">
            <div className="admin-head">
              <div className="admin-intro">
                <p className="admin-kicker">Last 24 hours</p>
                <h1 className="admin-title">Visitors</h1>
                <p className="admin-lead">Each person is one address. Views count every time that address opened the site.</p>
              </div>
              <button className="pill pill--quiet" type="button" onClick={onSignOut}>
                Sign out
              </button>
            </div>
            <div className="admin-stats">
              <p>
                <strong>{summary.people}</strong>
                <span>{summary.people === 1 ? 'person' : 'people'}</span>
              </p>
              <p>
                <strong>{summary.views}</strong>
                <span>{summary.views === 1 ? 'view' : 'views'}</span>
              </p>
            </div>
            {summary.visitors.length === 0 ? (
              <p className="admin-empty">No one has opened the site in the last 24 hours.</p>
            ) : (
              <div className="admin-table">
                <div className="admin-row admin-row--head">
                  <span>Country</span>
                  <span>IP address</span>
                  <span>Views</span>
                  <span>Last seen</span>
                </div>
                {summary.visitors.map((visitor) => (
                  <div className="admin-row" key={visitor.ip}>
                    <span className="admin-country">{visitor.country}</span>
                    <span className="admin-ip">{visitor.ip}</span>
                    <span>{visitor.views}</span>
                    <span className="admin-meta">{when(visitor.lastSeen)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function when(at: number) {
  const minutes = Math.max(0, Math.round((Date.now() - at) / 60000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(at).toLocaleString();
}
