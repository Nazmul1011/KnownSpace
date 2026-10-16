/** Timing and feel of the landing → canvas entrance (see hooks/use-entrance-zoom.ts). */

/** Start this fraction of the home zoom out, hold, then zoom in over ENTRANCE_MS. */
export const ENTRANCE_ZOOM = 0.27;
export const ENTRANCE_HOLD_MS = 180;
export const ENTRANCE_MS = 1500;
const BLUR_MAX_PX = 7;
const BLUR_PER_SPEED = 3;

const smootherstep = (x: number) => x * x * x * (x * (6 * x - 15) + 10);

/** Smootherstep on warped time: picks up speed quickly, peaks about a third of the way, then a long soft landing. */
export const easeEntrance = (t: number) => smootherstep(t ** 0.7);

/** How fast the zoom is changing, in natural-log units per second (scale-independent). */
export function zoomSpeed(fromZ: number, toZ: number, ms: number) {
  return Math.abs(Math.log(toZ / fromZ)) / (Math.max(8, ms) / 1000);
}

/** Blur in pixels for a zoom speed: none when still, capped while the zoom is fastest. */
export function entranceBlur(speed: number) {
  return Math.min(BLUR_MAX_PX, speed * BLUR_PER_SPEED);
}
