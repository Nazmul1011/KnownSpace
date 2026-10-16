/**
 * The camera: one world point at the centre of the viewport plus a zoom.
 * Movement never goes through React — transforms are written straight to the layer elements each frame,
 * and React only hears about it when the visible set of cells or the level of detail changes.
 */
export interface Cam {
  x: number;
  y: number;
  z: number;
}

export const MIN_Z = 0.16;
export const MAX_Z = 2.4;
export const HOME: Cam = { x: 0, y: 30, z: 0.74 };

/** Home framing for the current screen: smaller screens zoom out a little, but never so far that card text is unreadable. */
export function homeView(): Cam {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
  return { ...HOME, z: Math.max(0.56, Math.min(HOME.z, w / 1300)) };
}

type Listener = (cam: Cam) => void;

interface Fly {
  start: number;
  dur: number;
  ease: (t: number) => number;
  at: (t: number) => Cam;
  done?: () => void;
}

const clampZ = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, z));
export const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** van Wijk & Nuij smooth zoom+pan: long trips pull back, travel, then settle in. */
function zoomPath(a: Cam, b: Cam, vw: number) {
  const rho = Math.SQRT2;
  const ux0 = a.x,
    uy0 = a.y,
    w0 = vw / a.z;
  const ux1 = b.x,
    uy1 = b.y,
    w1 = vw / b.z;
  const dx = ux1 - ux0,
    dy = uy1 - uy0;
  const d2 = dx * dx + dy * dy;
  if (d2 < 1e-6) {
    const S = Math.log(w1 / w0) / rho;
    return {
      S: Math.abs(S),
      at: (t: number) => ({ x: ux0, y: uy0, z: vw / (w0 * Math.exp(rho * t * S)) }),
    };
  }
  const d1 = Math.sqrt(d2);
  const b0 = (w1 * w1 - w0 * w0 + rho ** 4 * d2) / (2 * w0 * rho * rho * d1);
  const b1 = (w1 * w1 - w0 * w0 - rho ** 4 * d2) / (2 * w1 * rho * rho * d1);
  const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
  const r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
  const S = (r1 - r0) / rho;
  const cosh = (x: number) => (Math.exp(x) + Math.exp(-x)) / 2;
  const sinh = (x: number) => (Math.exp(x) - Math.exp(-x)) / 2;
  const tanh = (x: number) => sinh(x) / cosh(x);
  return {
    S,
    at: (t: number) => {
      const s = t * S;
      const coshr0 = cosh(r0);
      const u = (w0 / (rho * rho * d1)) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      const w = (w0 * coshr0) / cosh(rho * s + r0);
      return { x: ux0 + u * dx, y: uy0 + u * dy, z: vw / w };
    },
  };
}

interface Parallax {
  x: number;
  y: number;
  k: number;
}

class Camera {
  cam: Cam = homeView();
  vw = 1440;
  vh = 900;
  reduced = false;
  private layers: HTMLElement[] = [];
  private parallax = new Map<HTMLElement, Parallax>();
  private listeners = new Set<Listener>();
  private vel = { x: 0, y: 0 };
  private fly: Fly | null = null;
  private raf = 0;
  private last = 0;
  private root: HTMLElement | null = null;
  private idleTimer = 0;

  attach(root: HTMLElement, layers: HTMLElement[]) {
    this.root = root;
    this.layers = layers;
    this.apply();
  }

  detach() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.layers = [];
    this.root = null;
  }

  setViewport(w: number, h: number) {
    this.vw = w;
    this.vh = h;
    this.apply();
    this.emit();
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  get() {
    return this.cam;
  }

  /** Register a decorative element that drifts slower than the world (k = 1 − depth factor). */
  addParallax(el: HTMLElement, x: number, y: number, k: number) {
    this.parallax.set(el, { x, y, k });
    this.applyParallax(el, { x, y, k });
  }

  removeParallax(el: HTMLElement) {
    this.parallax.delete(el);
  }

  /** World point → screen point. */
  toScreen(x: number, y: number) {
    const { cam } = this;
    return { x: (x - cam.x) * cam.z + this.vw / 2, y: (y - cam.y) * cam.z + this.vh / 2 };
  }

  toWorld(sx: number, sy: number) {
    const { cam } = this;
    return { x: cam.x + (sx - this.vw / 2) / cam.z, y: cam.y + (sy - this.vh / 2) / cam.z };
  }

  stop() {
    this.vel.x = 0;
    this.vel.y = 0;
    this.fly = null;
  }

  isFlying() {
    return !!this.fly;
  }

  panBy(dx: number, dy: number) {
    this.fly = null;
    this.cam.x -= dx / this.cam.z;
    this.cam.y -= dy / this.cam.z;
    this.touch();
  }

  zoomAt(factor: number, sx: number, sy: number) {
    this.fly = null;
    const before = this.toWorld(sx, sy);
    this.cam.z = clampZ(this.cam.z * factor);
    this.cam.x = before.x - (sx - this.vw / 2) / this.cam.z;
    this.cam.y = before.y - (sy - this.vh / 2) / this.cam.z;
    this.touch();
  }

  /** Hand off a flick: velocity in screen px per ms. */
  release(vx: number, vy: number) {
    if (this.reduced) return;
    const max = 4.5;
    this.vel.x = Math.max(-max, Math.min(max, vx));
    this.vel.y = Math.max(-max, Math.min(max, vy));
    this.loop();
  }

  /** Animated zoom by a factor around a screen point (buttons, keys, double-click). */
  zoomBy(factor: number, sx = this.vw / 2, sy = this.vh / 2) {
    const w = this.toWorld(sx, sy);
    const z = clampZ(this.cam.z * factor);
    // keep the anchor under the same screen point
    const x = w.x - (sx - this.vw / 2) / z;
    const y = w.y - (sy - this.vh / 2) / z;
    this.flyTo({ x, y, z }, { duration: 420 });
  }

  flyTo(target: Partial<Cam>, opts: { duration?: number; done?: () => void; ease?: (t: number) => number } = {}) {
    const to: Cam = { x: target.x ?? this.cam.x, y: target.y ?? this.cam.y, z: clampZ(target.z ?? this.cam.z) };
    this.vel.x = this.vel.y = 0;
    if (this.reduced) {
      this.cam = to;
      this.touch();
      opts.done?.();
      return;
    }
    const from = { ...this.cam };
    const path = zoomPath(from, to, this.vw);
    const dur = opts.duration ?? Math.min(2200, Math.max(520, path.S * 620));
    this.fly = { start: performance.now(), dur, at: path.at, done: opts.done, ease: opts.ease ?? easeInOut };
    this.loop();
  }

  jump(to: Partial<Cam>) {
    this.stop();
    this.cam = { x: to.x ?? this.cam.x, y: to.y ?? this.cam.y, z: clampZ(to.z ?? this.cam.z) };
    this.touch();
  }

  private touch() {
    this.apply();
    this.emit();
    this.markMoving();
  }

  private markMoving() {
    if (!this.root) return;
    this.root.classList.add('is-moving');
    window.clearTimeout(this.idleTimer);
    this.idleTimer = window.setTimeout(() => this.root?.classList.remove('is-moving'), 160);
  }

  private loop() {
    if (this.raf) return;
    this.last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(48, now - this.last);
      this.last = now;
      let active = false;
      if (this.fly) {
        const f = this.fly;
        const t = Math.min(1, (now - f.start) / f.dur);
        this.cam = f.at(f.ease(t));
        if (t >= 1) {
          this.fly = null;
          f.done?.();
        } else active = true;
        this.touch();
      } else if (Math.abs(this.vel.x) > 0.01 || Math.abs(this.vel.y) > 0.01) {
        this.cam.x -= (this.vel.x * dt) / this.cam.z;
        this.cam.y -= (this.vel.y * dt) / this.cam.z;
        const decay = Math.exp(-dt / 325);
        this.vel.x *= decay;
        this.vel.y *= decay;
        active = true;
        this.touch();
      }
      if (active) this.raf = requestAnimationFrame(step);
      else this.raf = 0;
    };
    this.raf = requestAnimationFrame(step);
  }

  private apply() {
    const { x, y, z } = this.cam;
    const tx = this.vw / 2 - x * z;
    const ty = this.vh / 2 - y * z;
    const t = `translate3d(${tx}px, ${ty}px, 0) scale(${z})`;
    for (const el of this.layers) el.style.transform = t;
    for (const [el, p] of this.parallax) this.applyParallax(el, p);
  }

  private applyParallax(el: HTMLElement, p: Parallax) {
    el.style.translate = `${(this.cam.x - p.x) * p.k}px ${(this.cam.y - p.y) * p.k}px`;
  }

  private emit() {
    for (const fn of this.listeners) fn(this.cam);
  }
}

export const camera = new Camera();
