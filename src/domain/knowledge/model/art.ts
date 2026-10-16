/** The art manifest produced by `npm run art`: size, tone and credit for every picture. */
import artManifest from '../data/art.generated.json';

export interface Art {
  w: number;
  h: number;
  aspect: number;
  tone: string;
  /** average of the brightest pixels — the light in the picture */
  glow: string;
  dark: boolean;
  /** a real photograph from an open-licence library (shown as a photo even for "object" cards) */
  real?: boolean;
  credit?: { title: string; creator: string; license: string; licenseUrl: string; page: string; provider: string };
}
export const art = artManifest as Record<string, Art>;
