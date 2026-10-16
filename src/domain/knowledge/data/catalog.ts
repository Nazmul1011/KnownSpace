import type { CatalogEntry } from '../model/types';
import { moreEntries } from './more/index';

/** Every knowledge object on the canvas: identity, category and how it is drawn. Text lives in ./text. */
const base: CatalogEntry[] = [
  // Space
  { id: 'black-holes', title: 'What actually is a black hole?', category: 'space', subcategory: 'Astrophysics', visual: { kind: 'type' } },
  {
    id: 'saturn-rings',
    title: "What are Saturn's rings made of?",
    category: 'space',
    subcategory: 'Planets',
    visual: { kind: 'object', image: 'saturn-rings' },
  },
  {
    id: 'moon-same-side',
    title: 'Why we only ever see one side of the Moon',
    category: 'space',
    subcategory: 'The Moon',
    visual: { kind: 'object', image: 'moon-same-side' },
  },
  { id: 'aurora', title: 'What paints the northern lights?', category: 'space', subcategory: 'Space weather', visual: { kind: 'photo', image: 'aurora' } },
  {
    id: 'stars-twinkle',
    title: "Why stars twinkle and planets mostly don't",
    category: 'space',
    subcategory: 'Observing',
    visual: { kind: 'photo', image: 'stars-twinkle' },
  },

  // Science
  { id: 'ice-floats', title: 'Why does ice float?', category: 'science', subcategory: 'Chemistry', visual: { kind: 'object', image: 'ice-floats' } },
  { id: 'ocean-blue', title: 'Why does the ocean look blue?', category: 'science', subcategory: 'Light', visual: { kind: 'photo', image: 'ocean-blue' } },
  {
    id: 'sunset-colors',
    title: 'Why the sky turns red at sunset',
    category: 'science',
    subcategory: 'Light',
    visual: { kind: 'photo', image: 'sunset-colors' },
  },
  { id: 'rust', title: "Why iron rusts but gold doesn't", category: 'science', subcategory: 'Chemistry', visual: { kind: 'object', image: 'rust' } },
  {
    id: 'thunder-lightning',
    title: 'Why thunder arrives after lightning',
    category: 'science',
    subcategory: 'Sound',
    visual: { kind: 'diagram', diagram: 'thunder' },
  },
  {
    id: 'mirror-reverse',
    title: 'Do mirrors really flip left and right?',
    category: 'science',
    subcategory: 'Optics',
    visual: { kind: 'diagram', diagram: 'mirror' },
  },

  // Nature
  {
    id: 'trees-water',
    title: 'How a tree lifts water 100 metres without a pump',
    category: 'nature',
    subcategory: 'Plants',
    visual: { kind: 'photo', image: 'trees-water' },
  },
  {
    id: 'trees-communicate',
    title: 'Do trees really talk to each other?',
    category: 'nature',
    subcategory: 'Forests',
    visual: { kind: 'photo', image: 'trees-communicate' },
  },
  {
    id: 'mushrooms-mycelium',
    title: 'A mushroom is only the tip of the organism',
    category: 'nature',
    subcategory: 'Fungi',
    visual: { kind: 'object', image: 'mushrooms-mycelium' },
  },
  {
    id: 'bioluminescence',
    title: 'Why so much of the deep sea glows',
    category: 'nature',
    subcategory: 'Oceans',
    visual: { kind: 'photo', image: 'bioluminescence' },
  },
  { id: 'bananas-curve', title: 'Why are bananas curved?', category: 'nature', subcategory: 'Plants', visual: { kind: 'object', image: 'bananas-curve' } },

  // Animals
  {
    id: 'hummingbird-hover',
    title: 'How a hummingbird hovers',
    category: 'animals',
    subcategory: 'Birds',
    visual: { kind: 'object', image: 'hummingbird-hover' },
  },
  {
    id: 'octopus-color',
    title: 'How an octopus changes colour in a blink',
    category: 'animals',
    subcategory: 'Cephalopods',
    visual: { kind: 'photo', image: 'octopus-color' },
  },
  { id: 'cats-purr', title: 'Why do cats purr?', category: 'animals', subcategory: 'Cats', visual: { kind: 'photo', image: 'cats-purr' } },
  { id: 'cats-land', title: 'Why cats land on their feet', category: 'animals', subcategory: 'Cats', visual: { kind: 'photo', image: 'cats-land' } },
  { id: 'whale-song', title: 'How whales talk across an ocean', category: 'animals', subcategory: 'Whales', visual: { kind: 'photo', image: 'whale-song' } },
  {
    id: 'bird-migration',
    title: 'How birds find their way across continents',
    category: 'animals',
    subcategory: 'Birds',
    visual: { kind: 'photo', image: 'bird-migration' },
  },
  {
    id: 'ant-traffic',
    title: 'Why ants never get stuck in traffic',
    category: 'animals',
    subcategory: 'Insects',
    visual: { kind: 'photo', image: 'ant-traffic' },
  },
  {
    id: 'tardigrade',
    title: 'The tiny animal that survived open space',
    category: 'animals',
    subcategory: 'Micro-animals',
    visual: { kind: 'object', image: 'tardigrade' },
  },

  // History
  {
    id: 'roman-concrete',
    title: 'Why Roman concrete outlasts ours',
    category: 'history',
    subcategory: 'Ancient Rome',
    visual: { kind: 'photo', image: 'roman-concrete' },
  },
  {
    id: 'cuneiform',
    title: 'The first writing was mostly receipts',
    category: 'history',
    subcategory: 'Writing',
    visual: { kind: 'object', image: 'cuneiform' },
  },
  {
    id: 'here-be-dragons',
    title: "Old maps almost never said 'here be dragons'",
    category: 'history',
    subcategory: 'Maps',
    visual: { kind: 'photo', image: 'here-be-dragons' },
  },
  {
    id: 'antikythera',
    title: 'A 2,000-year-old computer from a shipwreck',
    category: 'history',
    subcategory: 'Artifacts',
    visual: { kind: 'object', image: 'antikythera' },
  },
  {
    id: 'pyramid-builders',
    title: 'Who really built the pyramids',
    category: 'history',
    subcategory: 'Ancient Egypt',
    visual: { kind: 'photo', image: 'pyramid-builders' },
  },

  // Inventions
  {
    id: 'printing-press',
    title: 'Movable type was invented twice',
    category: 'inventions',
    subcategory: 'Printing',
    visual: { kind: 'object', image: 'printing-press' },
  },
  { id: 'velcro', title: 'Velcro was copied from a weed', category: 'inventions', subcategory: 'Biomimicry', visual: { kind: 'object', image: 'velcro' } },
  {
    id: 'post-it',
    title: 'The Post-it began as a failed glue',
    category: 'inventions',
    subcategory: 'Happy accidents',
    visual: { kind: 'object', image: 'post-it' },
  },

  // Everyday things
  { id: 'zipper', title: 'How a zipper actually zips', category: 'everyday', subcategory: 'Mechanisms', visual: { kind: 'object', image: 'zipper' } },
  {
    id: 'elevator-floors',
    title: 'How an elevator knows which floor it is on',
    category: 'everyday',
    subcategory: 'Machines',
    visual: { kind: 'photo', image: 'elevator-floors' },
  },
  { id: 'microwave', title: 'How a microwave really heats food', category: 'everyday', subcategory: 'Kitchen', visual: { kind: 'object', image: 'microwave' } },
  {
    id: 'airplane-windows',
    title: 'Why airplane windows are rounded',
    category: 'everyday',
    subcategory: 'Travel',
    visual: { kind: 'photo', image: 'airplane-windows' },
  },

  // Technology
  { id: 'qr-codes', title: 'How a QR code survives a coffee stain', category: 'technology', subcategory: 'Codes', visual: { kind: 'diagram', diagram: 'qr' } },
  {
    id: 'noise-cancelling',
    title: 'How noise-cancelling headphones erase sound',
    category: 'technology',
    subcategory: 'Audio',
    visual: { kind: 'object', image: 'noise-cancelling' },
  },
  { id: 'gps', title: 'How your phone knows where you are', category: 'technology', subcategory: 'Navigation', visual: { kind: 'diagram', diagram: 'gps' } },
  {
    id: 'undersea-cables',
    title: 'The internet mostly runs under the sea',
    category: 'technology',
    subcategory: 'Infrastructure',
    visual: { kind: 'object', image: 'undersea-cables' },
  },
  { id: 'qwerty', title: 'Why keyboards are QWERTY', category: 'technology', subcategory: 'Interfaces', visual: { kind: 'photo', image: 'qwerty' } },

  // Human body
  { id: 'fingerprints', title: 'Why no two fingerprints match', category: 'body', subcategory: 'Skin', visual: { kind: 'photo', image: 'fingerprints' } },
  {
    id: 'vaccines',
    title: 'How a vaccine teaches your immune system',
    category: 'body',
    subcategory: 'Immunity',
    visual: { kind: 'object', image: 'vaccines' },
  },
  {
    id: 'voice-recording',
    title: 'Why your recorded voice sounds strange',
    category: 'body',
    subcategory: 'Hearing',
    visual: { kind: 'object', image: 'voice-recording' },
  },
  { id: 'blue-eyes', title: 'Blue eyes contain no blue pigment', category: 'body', subcategory: 'Eyes', visual: { kind: 'photo', image: 'blue-eyes' } },
  { id: 'color-vision', title: 'Colour is something your brain makes', category: 'body', subcategory: 'Vision', visual: { kind: 'diagram', diagram: 'cones' } },

  // Psychology
  { id: 'doorway-effect', title: 'Why you forget why you walked into a room', category: 'psychology', subcategory: 'Memory', visual: { kind: 'notif' } },
  { id: 'frequency-illusion', title: 'Why a new word suddenly appears everywhere', category: 'psychology', subcategory: 'Attention', visual: { kind: 'type' } },
  {
    id: 'music-chills',
    title: 'Why music can give you chills',
    category: 'psychology',
    subcategory: 'Emotion',
    visual: { kind: 'object', image: 'music-chills' },
  },
  {
    id: 'spacing-effect',
    title: 'Why cramming fails and spacing works',
    category: 'psychology',
    subcategory: 'Learning',
    visual: { kind: 'diagram', diagram: 'forgetting' },
  },
  {
    id: 'moon-illusion',
    title: 'Why the Moon looks huge near the horizon',
    category: 'psychology',
    subcategory: 'Perception',
    visual: { kind: 'photo', image: 'moon-illusion' },
  },
  { id: 'memory-rebuilt', title: 'Every memory is rebuilt when you recall it', category: 'psychology', subcategory: 'Memory', visual: { kind: 'type' } },

  // Geography
  {
    id: 'volcano-eruption',
    title: 'Why volcanoes erupt',
    category: 'geography',
    subcategory: 'Volcanoes',
    visual: { kind: 'photo', image: 'volcano-eruption' },
  },
  {
    id: 'volcanic-lightning',
    title: "Lightning born inside a volcano's ash cloud",
    category: 'geography',
    subcategory: 'Volcanoes',
    visual: { kind: 'photo', image: 'volcanic-lightning' },
  },
  {
    id: 'tectonic-plates',
    title: 'Continents drift about as fast as fingernails grow',
    category: 'geography',
    subcategory: 'Plate tectonics',
    visual: { kind: 'map', lat: 64.26, lon: -21.12, place: 'Þingvellir, Iceland' },
  },
  { id: 'dead-sea', title: "Why you can't sink in the Dead Sea", category: 'geography', subcategory: 'Water', visual: { kind: 'photo', image: 'dead-sea' } },

  // Food
  { id: 'popcorn-pops', title: 'Why does popcorn pop?', category: 'food', subcategory: 'Kitchen science', visual: { kind: 'object', image: 'popcorn-pops' } },
  { id: 'honey-spoil', title: 'Why honey almost never spoils', category: 'food', subcategory: 'Pantry', visual: { kind: 'object', image: 'honey-spoil' } },
  {
    id: 'coffee-cherry',
    title: 'A coffee bean is the seed of a fruit',
    category: 'food',
    subcategory: 'Origins',
    visual: { kind: 'photo', image: 'coffee-cherry' },
  },
  {
    id: 'chili-heat',
    title: "Why chilli burns (and birds don't care)",
    category: 'food',
    subcategory: 'Taste',
    visual: { kind: 'object', image: 'chili-heat' },
  },
  { id: 'onions-cry', title: 'Why onions make you cry', category: 'food', subcategory: 'Kitchen science', visual: { kind: 'object', image: 'onions-cry' } },
  {
    id: 'black-pepper',
    title: 'Black pepper was once traded like money',
    category: 'food',
    subcategory: 'Spices',
    visual: { kind: 'map', lat: 10.0, lon: 76.3, place: 'Malabar Coast, India' },
  },

  // Design
  { id: 'stop-sign', title: 'Why stop signs are octagons', category: 'design', subcategory: 'Signage', visual: { kind: 'object', image: 'stop-sign' } },
  { id: 'helvetica', title: 'Helvetica was first called Neue Haas Grotesk', category: 'design', subcategory: 'Typography', visual: { kind: 'type' } },
  {
    id: 'golden-ratio',
    title: 'The golden ratio is mostly a design myth',
    category: 'design',
    subcategory: 'Proportion',
    visual: { kind: 'diagram', diagram: 'golden' },
  },

  // Architecture
  {
    id: 'tall-ceilings',
    title: 'Why old buildings have such tall ceilings',
    category: 'architecture',
    subcategory: 'Interiors',
    visual: { kind: 'photo', image: 'tall-ceilings' },
  },
  {
    id: 'flying-buttress',
    title: 'Why Gothic cathedrals wear their bones outside',
    category: 'architecture',
    subcategory: 'Structure',
    visual: { kind: 'photo', image: 'flying-buttress' },
  },
  {
    id: 'bridges-weight',
    title: 'How a bridge carries its own weight',
    category: 'architecture',
    subcategory: 'Structure',
    visual: { kind: 'diagram', diagram: 'bridge' },
  },
  {
    id: 'pisa',
    title: 'The Leaning Tower was saved by removing soil',
    category: 'architecture',
    subcategory: 'Landmarks',
    visual: { kind: 'object', image: 'pisa' },
  },

  // Culture
  { id: 'languages-endangered', title: "Many of the world's languages are endangered", category: 'culture', subcategory: 'Language', visual: { kind: 'type' } },
  {
    id: 'silbo-gomero',
    title: 'An island where people talk in whistles',
    category: 'culture',
    subcategory: 'Language',
    visual: { kind: 'map', lat: 28.1, lon: -17.2, place: 'La Gomera, Canary Islands' },
  },
  {
    id: 'telephone-words',
    title: "Why we still 'dial' and 'hang up'",
    category: 'culture',
    subcategory: 'Language',
    visual: { kind: 'object', image: 'telephone-words' },
  },

  // Business
  { id: 'price-99', title: 'Why so many prices end in .99', category: 'business', subcategory: 'Pricing', visual: { kind: 'type' } },
  {
    id: 'milk-at-back',
    title: 'Why the milk is at the back of the shop',
    category: 'business',
    subcategory: 'Retail',
    visual: { kind: 'photo', image: 'milk-at-back' },
  },
  {
    id: 'lego-1958',
    title: 'A 1958 LEGO brick still fits one made today',
    category: 'business',
    subcategory: 'Products',
    visual: { kind: 'object', image: 'lego-1958' },
  },
];

/** Base collection plus the expansion (identity fields only; text is merged in ./index). */
export const catalog: CatalogEntry[] = [
  ...base,
  ...moreEntries.map(({ id, title, category, subcategory, visual }) => ({ id, title, category, subcategory, visual })),
];
