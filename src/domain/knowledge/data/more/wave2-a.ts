import type { Entry } from '../../model/types';

export const entries: Entry[] = [
  // ── Science ──────────────────────────────────────────────
  {
    id: 'prince-ruperts-drop',
    title: 'A glass drop that survives a hammer but not a snip',
    category: 'science',
    subcategory: 'Materials',
    visual: { kind: 'object', image: 'prince-ruperts-drop' },
    description:
      'Drip molten glass into cold water and it sets into a tadpole-shaped drop. The outside cools first and squeezes the still-hot core, locking the surface in strong compression. A hammer blow on the head barely marks it, yet nicking the thin tail releases the stored stress and the whole drop bursts into powder.',
    shortFact: 'Its head shrugs off a hammer, but snapping the tail makes the whole drop burst into dust.',
    interestingFact:
      'High-speed photography showed cracks racing from the tail to the head at more than 4,000 miles per hour, branching as they go until little more than grit is left.',
    oneMoreThing:
      'The drops reached England in the 1600s, when Prince Rupert of the Rhine presented some to King Charles II. The stresses inside were only fully mapped in 2017, using polarised light shone through a drop.',
    facts: [
      'The drops are made by quenching soda-lime or flint glass in water.',
      'Stress locked into the head reaches about 50 tons per square inch.',
      'Toughened glass relies on the same idea of a squeezed outer surface.',
    ],
    stat: { value: '4,000+ mph', label: 'Crack speed' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['prince rupert', 'glass', 'tempered glass', 'compression', 'stress', 'quenching', 'cracks'],
    relatedTopics: ['old-glass-flow', 'spaghetti-snap', 'lycurgus-cup', 'gallium-melts-in-hand'],
    icon: 'droplet',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Purdue University: A hammer can’t break this tadpole-shaped glass',
      url: 'https://www.purdue.edu/research/features/stories/a-hammer-cant-break-this-tadpole-shaped-glass',
    },
  },
  {
    id: 'gallium-melts-in-hand',
    title: 'The metal that melts in your hand',
    category: 'science',
    subcategory: 'Elements',
    visual: { kind: 'object', image: 'gallium-melts-in-hand' },
    description:
      'Gallium is a soft, silvery metal that melts at about 29.8°C, below the temperature of the human body. A solid lump held in a palm slowly slumps into a liquid puddle. Once molten it stays liquid over a huge range and does not boil until it passes 2,400°C.',
    shortFact: 'A spoon made of gallium would sag and melt in a cup of hot tea.',
    interestingFact:
      'Mendeleev predicted the element in 1871 from a gap in his periodic table. It was found four years later, in 1875, by the French chemist Paul-Émile Lecoq de Boisbaudran.',
    oneMoreThing:
      'Like water, gallium grows as it freezes, by about 3% in volume. That is why it is usually kept in flexible plastic rather than glass, which a freezing sample could crack.',
    facts: [
      'Around 98% of the gallium supply goes to the semiconductor industry.',
      'Gallium alloys replace toxic mercury in some thermometers.',
      'Gallium nitride is the material that makes blue LEDs shine.',
    ],
    stat: { value: '29.8°C', label: 'Melting point' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['gallium', 'metal', 'melting point', 'liquid metal', 'mendeleev', 'periodic table', 'semiconductor'],
    relatedTopics: ['white-led-blue', 'metal-feels-cold', 'bismuth-hopper-crystals', 'absolute-zero'],
    icon: 'thermometer-sun',
    difficulty: 1,
    estimatedReadTime: 40,
    source: {
      label: 'Los Alamos National Laboratory: Gallium',
      url: 'https://www.lanl.gov/science-engineering/periodic-table/element/gallium',
    },
  },
  {
    id: 'bismuth-hopper-crystals',
    title: 'Why bismuth crystals grow like rainbow staircases',
    category: 'science',
    subcategory: 'Elements',
    visual: { kind: 'object', image: 'bismuth-hopper-crystals' },
    description:
      'As molten bismuth cools, its crystals grow faster along their edges than across their faces, leaving hollow, stepped squares called hopper crystals. At the same time a very thin skin of oxide forms on the surface. Light reflecting from the top and bottom of that film interferes, painting the grey metal gold, blue and pink.',
    shortFact: 'The colours are not pigment: a thin film of oxide splits light, as on a soap bubble.',
    interestingFact: 'Of all metals, bismuth is the most strongly repelled by a magnetic field. With powerful magnets, thin pieces of it can be made to float.',
    oneMoreThing:
      'Bismuth was long counted as the heaviest stable element. In 2003 researchers found it is radioactive after all, with a half-life of about 19 billion billion years, over a billion times the age of the universe.',
    facts: [
      'Like water, bismuth expands slightly as it solidifies.',
      'Its low melting point suits it to plugs in fire sprinklers.',
      'A bismuth compound is the active ingredient in some stomach remedies.',
    ],
    stat: { value: '1.9 × 10¹⁹ yrs', label: 'Half-life' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['bismuth', 'crystal', 'hopper crystal', 'iridescence', 'oxide', 'thin film', 'diamagnetism'],
    relatedTopics: ['soap-bubble-colours', 'gallium-melts-in-hand', 'snowflake-shapes', 'geode-hollow-crystals'],
    icon: 'sparkles',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Los Alamos National Laboratory: Bismuth',
      url: 'https://www.lanl.gov/science-engineering/periodic-table/element/bismuth',
    },
  },
  {
    id: 'cherenkov-blue-glow',
    title: 'The blue glow of a reactor pool is a boom made of light',
    category: 'science',
    subcategory: 'Physics',
    visual: { kind: 'photo', image: 'cherenkov-blue-glow' },
    description:
      'In the water around nuclear fuel, light travels at only about 75% of its speed in a vacuum. Electrons thrown out by the fuel can move faster than that. As they outrun light in the water they disturb its molecules, which give off a blue glow, a little like a sonic boom.',
    shortFact: 'Nothing beats light in a vacuum, but in water, fast electrons can outrun it.',
    interestingFact:
      'The glow looks blue because the light it gives off is weighted towards high frequencies and short wavelengths, at the blue and violet end of the spectrum.',
    oneMoreThing:
      'Pavel Cherenkov first observed the effect in 1934. He shared the 1958 Nobel Prize in Physics with Ilya Frank and Igor Tamm, who explained it. Today the glow helps inspectors account for nuclear material.',
    facts: [
      'Physics experiments use the glow to track the paths of subatomic particles.',
      'Telescopes detect cosmic-ray showers by their faint Cherenkov light.',
      'Film radiation glows green; real reactor pools glow blue.',
    ],
    stat: { value: '~75%', label: 'Light speed, water' },
    certainty: 'established',
    moods: ['beautiful', 'mind-bending'],
    keywords: ['cherenkov radiation', 'nuclear reactor', 'blue glow', 'speed of light', 'electrons', 'physics'],
    relatedTopics: ['whip-crack', 'ocean-blue', 'glow-stick', 'bioluminescence'],
    icon: 'radiation',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'US Department of Energy: Cherenkov radiation explained',
      url: 'https://www.energy.gov/ne/articles/cherenkov-radiation-explained',
    },
  },
  {
    id: 'mpemba-effect',
    title: 'Does hot water really freeze faster than cold?',
    category: 'science',
    subcategory: 'Heat',
    visual: { kind: 'object', image: 'mpemba-effect' },
    description:
      'The claim that hot water can freeze before cold is called the Mpemba effect, after a Tanzanian student who reported it in 1969. Aristotle, Francis Bacon and Descartes all described something similar. Yet careful modern experiments disagree, and small differences in containers, thermometers and freezers can create or erase the effect.',
    shortFact: 'An idea as old as Aristotle still has no agreed answer.',
    interestingFact:
      'Erasto Mpemba noticed that a hot ice-cream mix froze before a cooler one. With the physicist Denis Osborne he later reported 90°C water reaching freezing far sooner than water at 20°C.',
    oneMoreThing:
      'In 2016 Henry Burridge and Paul Linden at Cambridge found that small errors in where a thermometer sits in the water could be enough to fake the effect. Nobody has reproduced the dramatic 1969 results.',
    facts: [
      'Evaporation, dissolved gases and convection have all been offered as causes.',
      'Water can supercool well below 0°C before ice starts to form.',
      'Results depend on whether "frozen" means 0°C, first ice or solid.',
    ],
    stat: { value: '1969', label: 'First paper' },
    certainty: 'debated',
    caveat: 'A 2016 study found no meaningful effect under controlled conditions, while other researchers still report it in particular set-ups.',
    moods: ['surprising', 'mind-bending'],
    keywords: ['mpemba effect', 'hot water', 'freezing', 'ice', 'cooling', 'experiment'],
    relatedTopics: ['ice-floats', 'replication-crisis', 'metal-feels-cold', 'absolute-zero'],
    icon: 'snowflake',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Burridge & Linden, Scientific Reports (2016)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5121640',
    },
  },

  // ── Nature ───────────────────────────────────────────────
  {
    id: 'fulgurite-lightning-glass',
    title: 'Lightning can turn sand into tubes of glass',
    category: 'nature',
    subcategory: 'Weather',
    visual: { kind: 'object', image: 'fulgurite-lightning-glass' },
    description:
      'When lightning strikes dry sand, the heat along its path vaporises some grains and melts those around them. The molten sand cools into a hollow, branching tube of glass called a fulgurite, glassy inside and crusted with stuck sand outside. It is a rough cast of the route the electricity took into the ground.',
    shortFact: 'A fulgurite is a lightning bolt’s path, preserved in fused sand.',
    interestingFact:
      'The name comes from fulgur, Latin for lightning. A phrase used by Cicero, about digging up thunderbolts, suggests Romans may already have been finding them in sandy ground.',
    oneMoreThing:
      'A lightning channel can reach about 50,000°F, around 27,000°C, which is hotter than the surface of the Sun. That is enough to turn quartz sand into glass in a fraction of a second.',
    facts: [
      'Fulgurites can also form in soil and rock, not only sand.',
      'Their walls are thin and brittle, so long ones rarely come out whole.',
      'They turn up in the dunefield of Great Sand Dunes National Park, Colorado.',
    ],
    stat: { value: '~27,000°C', label: 'Lightning channel' },
    certainty: 'established',
    moods: ['strange', 'surprising'],
    keywords: ['fulgurite', 'lightning', 'sand', 'glass', 'petrified lightning', 'dunes'],
    relatedTopics: ['thunder-lightning', 'volcanic-lightning', 'old-glass-flow', 'sun-dogs'],
    icon: 'zap',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'US National Park Service: Fulgurites',
      url: 'https://www.nps.gov/articles/grsa-fulgurites.htm',
    },
  },
  {
    id: 'geode-hollow-crystals',
    title: 'How a plain rock ends up full of crystals',
    category: 'nature',
    subcategory: 'Rocks',
    visual: { kind: 'object', image: 'geode-hollow-crystals' },
    description:
      'A geode starts as a hole: a gas bubble in cooling lava, or a pocket in sediment where something decayed or dissolved. Mineral-rich water seeps in again and again, laying down a lining of silica and then crystals that grow inwards. From outside, it looks like an ordinary lumpy stone.',
    shortFact: 'Geodes often feel light for their size, because their middles are partly empty.',
    interestingFact:
      'The purple amethyst common in volcanic geodes is quartz coloured by traces of iron. Geodes that fill up completely with silica are called thunder eggs.',
    oneMoreThing:
      'The Pulpí Geode in Spain, found in an old silver mine, is about 8 metres long and large enough to stand inside. Its clear gypsum crystals reach about 1.8 metres.',
    facts: [
      'Brazil, Uruguay and Namibia are major sources of amethyst geodes.',
      'Loose crystals inside some geodes make them rattle when shaken.',
      'Sedimentary geodes are usually between 2.5 and 30 centimetres across.',
    ],
    stat: { value: '8 m', label: 'Pulpí Geode' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['geode', 'crystals', 'amethyst', 'quartz', 'thunder egg', 'rocks', 'minerals'],
    relatedTopics: ['bismuth-hopper-crystals', 'hawaii-hotspot', 'tectonic-plates', 'fulgurite-lightning-glass'],
    icon: 'gem',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'EarthDate: Potato stones and thunder eggs',
      url: 'https://www.earthdate.org/episodes/potato-stones-and-thunder-eggs',
    },
  },
  {
    id: 'lithops-living-stones',
    title: 'Plants that pass for pebbles',
    category: 'nature',
    subcategory: 'Plants',
    visual: { kind: 'object', image: 'lithops-living-stones' },
    description:
      'Lithops, or living stones, are succulents from southern Africa that look almost exactly like the pebbles around them. Each plant is little more than a pair of fat leaves, mostly buried in the soil. Only their flat tops show, which helps them hide from animals that would eat them.',
    shortFact: 'A living stone is mostly underground, with only its flat leaf tips showing.',
    interestingFact:
      'The flat tops have translucent patches called windows. Light passes through them deep into the buried leaf, where photosynthesis takes place.',
    oneMoreThing:
      'A lithops usually grows just one new pair of leaves a year. The new pair forms inside the old one and draws on its stored water until the old leaves shrivel to a papery husk.',
    facts: [
      'The name Lithops comes from Greek words meaning stone-like.',
      'Daisy-like flowers emerge from the slit between the two leaves.',
      'They store water in their thick leaves through long dry spells.',
    ],
    stat: { value: '2', label: 'Leaves per plant' },
    certainty: 'established',
    moods: ['strange', 'beautiful'],
    keywords: ['lithops', 'living stones', 'succulent', 'camouflage', 'desert plants', 'southern africa'],
    relatedTopics: ['welwitschia', 'venus-flytrap', 'cuttlefish-colour', 'pando'],
    icon: 'sprout',
    difficulty: 1,
    estimatedReadTime: 40,
    source: {
      label: 'Science Museums, Aarhus University: Living stone',
      url: 'https://sciencemuseerne.dk/en/botanisk-have/plantehistorier/show/artikel/living-stone',
    },
  },
  {
    id: 'sun-dogs',
    title: 'Two false suns that sit beside the real one',
    category: 'nature',
    subcategory: 'Weather',
    visual: { kind: 'photo', image: 'sun-dogs' },
    description:
      'Sun dogs are bright patches of light that appear on either side of a low sun, about 22 degrees away. They form when sunlight passes through flat, six-sided ice crystals drifting in thin, high cloud. Each crystal acts as a tiny prism, bending the light and splitting it into faint colours.',
    shortFact: 'Flat ice crystals in high cloud can make two extra suns, one on each side.',
    interestingFact:
      'The light passes through two sides of the hexagon that meet at 60 degrees, like a glass prism. That geometry bends it by at least about 22 degrees, which fixes where the sun dogs appear.',
    oneMoreThing:
      'If the crystals tumble at random, they spread the light into a full ring, the 22-degree halo. Sun dogs need the crystals to drift down lying nearly flat, which concentrates the light into two bright spots.',
    facts: [
      'The side of a sun dog nearest the sun is usually reddish.',
      'They are most vivid when the sun is close to the horizon.',
      'The same crystals can make faint moon dogs beside a bright moon.',
    ],
    stat: { value: '22°', label: 'From the sun' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['sun dogs', 'parhelia', 'halo', 'ice crystals', 'optics', 'clouds', 'weather'],
    relatedTopics: ['snowflake-shapes', 'newton-seven-colours', 'noctilucent-clouds', 'sunset-colors'],
    icon: 'sun',
    difficulty: 2,
    estimatedReadTime: 45,
    source: {
      label: 'HyperPhysics, Georgia State University: The 22° halo',
      url: 'https://hyperphysics.gsu.edu/hbase/atmos/halo22.html',
    },
  },
  {
    id: 'sea-heart-drift-seed',
    title: 'A rainforest seed that crosses the Atlantic',
    category: 'nature',
    subcategory: 'Plants',
    visual: { kind: 'object', image: 'sea-heart-drift-seed' },
    description:
      'The sea heart is the seed of Entada gigas, a tropical vine with the longest bean pods in the world. Its seeds float, and the Gulf Stream can carry them from the Caribbean and Central America to the beaches of north-west Europe. Some survive the voyage and can still sprout.',
    shortFact: 'Seeds from a Caribbean vine wash up on British beaches, sometimes still alive.',
    interestingFact:
      'The pods can reach two metres long. Each holds roughly 10 to 15 heart-shaped seeds, about 6 centimetres across, which can drift at sea for up to a year.',
    oneMoreThing:
      'A teenager who found one on a beach in Wales germinated it at home. The young vine, nicknamed Cliff, was given to the Eden Project in Cornwall to grow in its rainforest biome.',
    facts: [
      'More than 40 kinds of sea bean have been found around the British Isles.',
      'The vine grows wild in the Americas, the Caribbean and Africa.',
      'Seeds and fruits that travel by ocean are known as sea beans.',
    ],
    stat: { value: '2 m', label: 'Pod length' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['sea heart', 'sea bean', 'entada gigas', 'drift seed', 'gulf stream', 'seeds'],
    relatedTopics: ['coco-de-mer', 'ancient-date-seed', 'sargasso-sea', 'dandelion-flight'],
    icon: 'heart',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Eden Project: Teenager finds seed from world’s largest bean pod',
      url: 'https://edenproject.com/media-relations/teenager-finds-seed-from-worlds-largest-bean-pod-on-beach',
    },
  },

  // ── History ──────────────────────────────────────────────
  {
    id: 'lewis-chessmen',
    title: 'Chessmen carved from Arctic walrus tusks',
    category: 'history',
    subcategory: 'Medieval',
    visual: { kind: 'object', image: 'lewis-chessmen' },
    description:
      'In 1831 a hoard of small carved figures turned up on the Isle of Lewis in Scotland: kings, queens, bishops, knights and warders. Made in the late 1100s, most were carved from walrus ivory, with a few from whale teeth. They were probably made in Norway, possibly in Trondheim.',
    shortFact: 'Medieval Europe’s finest chessmen were carved from walrus tusks, traded from Greenland.',
    interestingFact: 'Ancient DNA suggests that from the 1100s, nearly all of Europe’s walrus ivory came from walruses hunted by Norse settlers in Greenland.',
    oneMoreThing:
      'Some warders, the pieces that play as rooks, are berserkers biting the tops of their shields in battle fury. Old Norse sagas describe warriors working themselves into exactly this state.',
    facts: [
      'The hoard held 93 objects, including 78 chess pieces.',
      'Most are at the British Museum; 11 are in Edinburgh.',
      'Greenlanders reportedly paid in walrus ivory to secure their own bishop.',
    ],
    stat: { value: '78', label: 'Chess pieces' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['lewis chessmen', 'chess', 'walrus ivory', 'vikings', 'norse', 'greenland', 'scotland'],
    relatedTopics: ['chess-queen', 'narwhal-tusk', 'royal-game-of-ur', 'viking-sunstone'],
    icon: 'crown',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'University of Cambridge: Lost Norse of Greenland fuelled the medieval ivory trade',
      url: 'https://www.cam.ac.uk/research/news/lost-norse-of-greenland-fuelled-the-medieval-ivory-trade-ancient-walrus-dna-suggests',
    },
  },
  {
    id: 'roman-dodecahedron',
    title: 'A Roman object no one can explain',
    category: 'history',
    subcategory: 'Roman',
    visual: { kind: 'object', image: 'roman-dodecahedron' },
    description:
      'Around 120 hollow bronze dodecahedra have been found across north-west Europe, each with twelve pentagonal faces, a round hole in every face and a knob at every corner. They date from Roman times, yet no surviving Roman text mentions them. What they were for is still unknown.',
    shortFact: 'About 120 have been found, and no Roman text ever mentions them.',
    interestingFact:
      'They turn up in graves, theatres, houses and baths, but none have been found in southern Italy or Greece, the heartland of the classical world.',
    oneMoreThing:
      'Suggested uses include candle holders, surveying tools, glove-knitting aids, calendars and sceptre heads. A curator at the Gallo-Roman Museum in Tongeren suspects fortune-telling, which Romans often practised in secret.',
    facts: [
      'The holes in each object come in different sizes.',
      'Most were found in lands once home to Celtic peoples.',
      'A fragment found in a Belgian field was announced in 2023.',
    ],
    stat: { value: '~120', label: 'Found so far' },
    certainty: 'established',
    moods: ['strange', 'mind-bending'],
    keywords: ['roman dodecahedron', 'romans', 'archaeology', 'bronze', 'mystery object', 'tongeren'],
    relatedTopics: ['antikythera', 'roman-multitool', 'nebra-sky-disc', 'roman-hours'],
    icon: 'hexagon',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'VRT NWS: Dodecahedron linked to the occult, the underground and the Celts',
      url: 'https://www.vrt.be/vrtnws/en/2023/01/11/dodecahedron-linked-to-the-occult-the-underground-and-the-celts/',
    },
  },
  {
    id: 'exchequer-tally-sticks',
    title: 'The wooden receipts that burned down Parliament',
    category: 'history',
    subcategory: 'Money',
    visual: { kind: 'object', image: 'exchequer-tally-sticks' },
    description:
      'For centuries the English Exchequer recorded payments on wooden sticks. Notches of different widths marked the sum, then the stick was split lengthways so each party kept a matching half. A forged half would not tally when the two pieces were put back together.',
    shortFact: 'Burning a pile of old wooden receipts set off the fire that destroyed Westminster in 1834.',
    interestingFact:
      'The Exchequer stopped using tallies in 1826. In October 1834 the leftover sticks were burned in two furnaces beneath the House of Lords, which overheated and set the palace alight.',
    oneMoreThing:
      'Most of the medieval Palace of Westminster was lost, though Westminster Hall survived. The Houses of Parliament standing today, clock tower and all, were built to replace what burned.',
    facts: [
      'The larger half was called the stock, a word finance still uses.',
      'The smaller half, kept by the Exchequer, was called the foil.',
      'Wider notches stood for larger sums, so amounts could be read at a glance.',
    ],
    stat: { value: '1834', label: 'Westminster fire' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['tally sticks', 'exchequer', 'parliament', 'fire', 'westminster', 'accounting', 'money'],
    relatedTopics: ['inca-khipu', 'banks-create-money', 'window-tax', 'cuneiform'],
    icon: 'flame',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'The National Archives (History blog): The Exchequer, a chequered history?',
      url: 'https://history.blog.gov.uk/2013/08/14/the-exchequer-a-chequered-history/',
    },
  },
  {
    id: 'sutton-hoo-helmet',
    title: 'The Sutton Hoo helmet was rebuilt from hundreds of pieces',
    category: 'history',
    subcategory: 'Anglo-Saxon',
    visual: { kind: 'object', image: 'sutton-hoo-helmet' },
    description:
      'In 1939 excavators in Suffolk uncovered the imprint of a 27-metre Anglo-Saxon ship, its timbers rotted away but its iron rivets still in rows. Inside the burial chamber lay an iron helmet that had rusted and broken into hundreds of fragments. It has been reassembled twice, like a jigsaw with no picture.',
    shortFact: 'The ship’s wood had vanished, but its rivets and outline survived in the sand.',
    interestingFact:
      'The first reconstruction, in the 1940s, was later judged wrong. In the early 1970s conservators took it apart and rebuilt it, giving the face mask and neck guard their present shape.',
    oneMoreThing:
      'The burial dates to the early 600s and may be that of Rædwald, a king of East Anglia. No body was found, probably because the acidic sandy soil dissolved it.',
    facts: [
      'The dig was led by the self-taught archaeologist Basil Brown.',
      'The landowner, Edith Pretty, gave the treasure to the British Museum.',
      'The helmet’s nose and eyebrows form a bird with outstretched wings.',
    ],
    stat: { value: '27 m', label: 'Ship length' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['sutton hoo', 'anglo-saxon', 'helmet', 'ship burial', 'archaeology', 'suffolk', 'raedwald'],
    relatedTopics: ['viking-horned-helmets', 'otzi-iceman-kit', 'lewis-chessmen', 'greek-statues-painted'],
    icon: 'shield',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'National Trust: History of Sutton Hoo',
      url: 'https://www.nationaltrust.org.uk/visit/suffolk/sutton-hoo/history-of-sutton-hoo',
    },
  },
  {
    id: 'terracotta-army-colour',
    title: 'The Terracotta Army was once brightly painted',
    category: 'history',
    subcategory: 'Ancient China',
    visual: { kind: 'photo', image: 'terracotta-army-colour' },
    description:
      'The clay soldiers buried with China’s first emperor were originally coated in lacquer and painted in strong colours. More than two thousand years in damp soil altered that lacquer. When a figure is exposed to dry air, the coating can crack and peel away, sometimes within minutes.',
    shortFact: 'Their grey look is a loss: the paint can peel off minutes after excavation.',
    interestingFact:
      'The coating was a base layer of lacquer topped with pigment. Water-saturated soil kept it in place for centuries, but as it dries the lacquer cracks and lifts.',
    oneMoreThing:
      'Chemists have tested ways to fix the flaking paint, including soaking it with a small molecule that is then hardened in place by electron beams.',
    facts: [
      'The pits near Xi’an were discovered in 1974.',
      'More than 1,500 figures have been unearthed; thousands more remain buried.',
      'Each figure was built from moulded parts and finished by hand.',
    ],
    stat: { value: '1974', label: 'Discovered' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['terracotta army', 'qin', 'china', 'paint', 'lacquer', 'archaeology', 'conservation'],
    relatedTopics: ['greek-statues-painted', 'pyramid-builders', 'sphinx-carved', 'pompeii-street-food'],
    icon: 'swords',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Science News: Terra-cotta warriors show their true colors',
      url: 'https://www.sciencenews.org/article/march-history-terra-cotta-warriors-show-their-true-colors',
    },
  },

  // ── Technology ───────────────────────────────────────────
  {
    id: 'enigma-never-itself',
    title: 'Enigma’s flaw: no letter could ever stand for itself',
    category: 'technology',
    subcategory: 'Cryptography',
    visual: { kind: 'object', image: 'enigma-never-itself' },
    description:
      'The Enigma machine sent each keystroke through three rotors, bounced it off a reflector and returned it by a different route. The reflector made the machine convenient, because the same settings both encrypted and decrypted. It also meant a letter could never be encrypted as itself.',
    shortFact: 'An A could become any letter except A, a gap that codebreakers learned to exploit.',
    interestingFact:
      'Codebreakers guessed likely phrases, such as words from weather reports, and slid them along an intercepted message. Any position where a letter would match itself could be ruled out at once.',
    oneMoreThing:
      'Polish mathematicians led by Marian Rejewski first broke Enigma in 1932 and shared their methods with Britain and France in 1939. Bletchley Park built on that work with machines called bombes.',
    facts: [
      'The rotors stepped forward with every key press, changing the scramble.',
      'A plugboard on the front could swap up to 13 pairs of letters.',
      'Each key press lit a lamp showing the encrypted letter.',
    ],
    stat: { value: '1932', label: 'First broken' },
    certainty: 'established',
    moods: ['surprising', 'mind-bending'],
    keywords: ['enigma', 'cipher', 'codebreaking', 'bletchley park', 'encryption', 'rotors', 'cryptography'],
    relatedTopics: ['password-hashing', 'authenticator-codes', 'https-padlock', 'computer-bug-moth'],
    icon: 'lock-keyhole',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Crypto Museum: How Enigma works',
      url: 'https://www.cryptomuseum.com/crypto/enigma/working.htm',
    },
  },
  {
    id: 'vinyl-one-groove',
    title: 'A record holds its music in one long wiggling groove',
    category: 'technology',
    subcategory: 'Sound',
    visual: { kind: 'object', image: 'vinyl-one-groove' },
    description:
      'Each side of a record carries a single spiral groove. Sound is cut into it as tiny side-to-side movements: faster wiggles make higher pitches and wider swings make louder sounds. A stylus riding the groove copies those movements, which are then turned back into sound.',
    shortFact: 'Each side is one continuous spiral, cut in the shape of the sound itself.',
    interestingFact:
      'Pitch depends on how fast the groove wiggles past the stylus, not on where the stylus sits. Play a record at the wrong speed and every note shifts.',
    oneMoreThing:
      'Some old recordings are too fragile to play. A system called IRENE, developed at Lawrence Berkeley National Laboratory with the Library of Congress, photographs the groove instead and calculates the sound a stylus would make.',
    facts: [
      'IRENE is named after "Goodnight, Irene", the first disc it imaged.',
      'Sound was also cut into wax cylinders and shellac 78s.',
      'The phonautograph of 1857 drew sound waves but could not play them back.',
    ],
    stat: { value: '1', label: 'Groove per side' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['vinyl', 'record', 'groove', 'stylus', 'phonograph', 'audio', 'sound'],
    relatedTopics: ['voice-recording', 'concert-pitch', 'noise-cancelling', 'whale-song'],
    icon: 'disc-3',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Library of Congress: Introducing IRENE',
      url: 'https://blogs.loc.gov/preservation/2021/12/introducing-irene/',
    },
  },
  {
    id: 'jacquard-loom-cards',
    title: 'Computer punch cards began on a silk loom',
    category: 'technology',
    subcategory: 'Computing',
    visual: { kind: 'photo', image: 'jacquard-loom-cards' },
    description:
      'In 1804 Joseph-Marie Jacquard built a loom controlled by a chain of punched cards. Each card decided which threads lifted for one pass of the shuttle, so intricate patterns could be woven automatically. Change the cards and the same loom wove a different design.',
    shortFact: 'Weavers in Lyon stored patterns on punched cards long before computers existed.',
    interestingFact:
      'Charles Babbage borrowed the idea for his Analytical Engine in the 1830s. Ada Lovelace wrote that it would weave algebraic patterns as the Jacquard loom weaves flowers and leaves.',
    oneMoreThing:
      'A famous silk portrait of Jacquard was woven on one of his looms using about 24,000 punched cards. From a distance it passes for an engraving.',
    facts: [
      'Jacquard built on earlier card-controlled looms by Bouchon, Falcon and Vaucanson.',
      'Punched cards later processed the 1890 United States census.',
      'Cards remained a main way to store data and programs into the 1970s.',
    ],
    stat: { value: '24,000', label: 'Cards, one portrait' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['jacquard loom', 'punched cards', 'weaving', 'babbage', 'ada lovelace', 'computing history'],
    relatedTopics: ['apollo-rope-memory', 'first-microprocessor', 'printing-press', 'qwerty'],
    icon: 'grid-3x3',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'Computer History Museum: Preserving the legend of J. M. Jacquard',
      url: 'https://www.computerhistory.org/blog/artifact-adopted-preserving-the-legend-of-j-m-jacquard/',
    },
  },
  {
    id: 'apollo-rope-memory',
    title: 'Apollo’s software was woven by hand',
    category: 'technology',
    subcategory: 'Computing',
    visual: { kind: 'object', image: 'apollo-rope-memory' },
    description:
      'The Apollo guidance computer stored its programs in core rope memory. Workers at Raytheon threaded fine wires through or around tiny magnetic rings, and each path stood for a one or a zero. Once woven, the software was physically fixed and could not be erased.',
    shortFact: 'Programs for the Moon landings were sewn into memory with a needle and wire.',
    interestingFact:
      'The weavers were women, often sitting on either side of a panel and passing a needle back and forth. Engineers called it the LOL method, for “little old ladies”.',
    oneMoreThing:
      'People overseeing each program were nicknamed rope mothers. In the same era, Navajo women assembled integrated circuits under microscopes at a Fairchild Semiconductor plant in Shiprock, New Mexico.',
    facts: [
      'The computer was designed at MIT’s Instrumentation Laboratory.',
      'The tiny rings, called cores, were made of ferrite.',
      'Unlike today’s memory, woven programs survived a total loss of power.',
    ],
    stat: { value: '1969', label: 'First Moon landing' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['apollo', 'core rope memory', 'guidance computer', 'nasa', 'software', 'weaving', 'raytheon'],
    relatedTopics: ['jacquard-loom-cards', 'first-microprocessor', 'flash-memory-electrons', 'computer-bug-moth'],
    icon: 'cpu',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Science News: Core memory weavers and Navajo women made the Apollo missions possible',
      url: 'https://www.sciencenews.org/article/core-memory-weavers-navajo-apollo-raytheon-computer-nasa',
    },
  },
  {
    id: 'fresnel-lighthouse-lens',
    title: 'The lens that let lighthouses reach the horizon',
    category: 'technology',
    subcategory: 'Optics',
    visual: { kind: 'object', image: 'fresnel-lighthouse-lens' },
    description:
      'In 1822 Augustin Fresnel introduced a lens built from rings of glass prisms instead of one thick curve. The prisms gather light that would scatter in all directions and bend it into a single beam. Lights once seen from 8 to 12 miles could now reach the horizon, more than 20 miles away.',
    shortFact: 'An open flame wastes nearly 97% of its light; a Fresnel lens loses at most 20%.',
    interestingFact:
      'A lens focuses light through the curve of its surface. Fresnel kept the curves in narrow rings and cut away the bulk, so the lens could be far thinner than a solid one.',
    oneMoreThing:
      'The largest, first-order lenses stand about 12 feet tall and more than 6 feet across. The same ridged principle lives on in flat plastic page magnifiers and overhead projectors.',
    facts: [
      'Lighthouse lenses came in six sizes, called orders.',
      'Prisms near the edge bend light more than those near the centre.',
      'Rotating lenses gave each lighthouse its own pattern of flashes.',
    ],
    stat: { value: '≤20%', label: 'Light lost' },
    certainty: 'established',
    moods: ['useful', 'beautiful'],
    keywords: ['fresnel lens', 'lighthouse', 'optics', 'prisms', 'refraction', 'navigation'],
    relatedTopics: ['newton-seven-colours', 'camera-sensor-colour', 'stars-twinkle', 'solar-cell-light'],
    icon: 'lamp',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'US National Park Service: The Fresnel lens',
      url: 'https://www.nps.gov/caha/learn/historyculture/fresnellens.htm',
    },
  },
];
