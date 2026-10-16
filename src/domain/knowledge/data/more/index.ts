import type { Entry } from '../../model/types';
import { entries as animals } from './animals';
import { entries as science } from './science';
import { entries as psychology } from './psychology';
import { entries as food } from './food';
import { entries as spaceDesign } from './space-design';
import { entries as natureCulture } from './nature-culture';
import { entries as historyInventions } from './history-inventions';
import { entries as technologyBusiness } from './technology-business';
import { entries as bodyGeography } from './body-geography';
import { entries as everydayArchitecture } from './everyday-architecture';
import { entries as extras } from './extras';
import { entries as wave2a } from './wave2-a';
import { entries as wave2b } from './wave2-b';
import { entries as wave2c } from './wave2-c';
import { entries as wave2d } from './wave2-d';

/** Entries beyond the original 75: the 5× expansion, the user's own 3D pieces, and the second wave (5 per subject). */
export const moreEntries: Entry[] = [
  ...animals,
  ...science,
  ...psychology,
  ...food,
  ...spaceDesign,
  ...natureCulture,
  ...historyInventions,
  ...technologyBusiness,
  ...bodyGeography,
  ...everydayArchitecture,
  ...extras,
  ...wave2a,
  ...wave2b,
  ...wave2c,
  ...wave2d,
];
