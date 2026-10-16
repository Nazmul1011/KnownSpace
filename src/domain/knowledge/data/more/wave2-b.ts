import type { Entry } from '../../model/types';

export const entries: Entry[] = [
  // ── Psychology ────────────────────────────────────────────────
  {
    id: 'stroop-effect',
    title: 'Saying the colour of a word is harder than reading it',
    category: 'psychology',
    subcategory: 'Attention',
    visual: { kind: 'object', image: 'stroop-effect' },
    description:
      'Print the word "red" in blue ink and ask someone to name the ink, and they slow down and stumble. Reading is so practised that the word arrives first and competes with the colour. J. Ridley Stroop measured the clash in 1935, and it remains one of the most reliable results in psychology.',
    shortFact: 'In 1935, naming ink colours of clashing words took about 74% longer than naming plain patches.',
    interestingFact:
      "The interference only runs one way. Reading the words aloud while ignoring the ink barely slowed Stroop's volunteers, because reading is far more automatic than naming colours.",
    oneMoreThing:
      'Stroop gave students eight days of practice at naming the ink. The delay shrank but never disappeared, which is why versions of his test are still used to measure attention and self-control.',
    facts: [
      'Stroop published the experiments in the Journal of Experimental Psychology in 1935.',
      'Naming 100 clashing ink colours took about 110 seconds, against 63 for patches.',
      'Children who are only beginning to read show a much weaker effect.',
    ],
    stat: { value: '74%', label: 'Slower naming' },
    certainty: 'established',
    moods: ['surprising', 'mind-bending'],
    keywords: ['stroop effect', 'stroop test', 'colour words', 'attention', 'interference', 'reading', 'automaticity'],
    relatedTopics: ['mcgurk-effect', 'working-memory-limit', 'invisible-gorilla', 'tip-of-the-tongue'],
    icon: 'palette',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Stroop (1935), Studies of interference in serial verbal reactions — York University Classics',
      url: 'https://psychclassics.yorku.ca/Stroop/',
    },
  },
  {
    id: 'testing-effect',
    title: 'A practice test beats another read-through',
    category: 'psychology',
    subcategory: 'Learning',
    visual: { kind: 'object', image: 'testing-effect' },
    description:
      'Pulling an answer out of memory strengthens it more than looking at it again. In a 2006 study, students who read a passage once and then tried to recall it remembered more a week later than students who simply read it twice. The effect is called retrieval practice, or the testing effect.',
    shortFact: 'Rereading feels productive, yet recalling from memory keeps far more for the following week.',
    interestingFact:
      'Five minutes after studying, the rereaders were slightly ahead, 81% to 75%. A week later the order flipped: the tested group recalled 56%, the rereaders 42%.',
    oneMoreThing:
      'Rereading made students more confident they would remember, even as it helped them less. The tested group recalled as much after a week as the rereaders did after only two days.',
    facts: [
      'The study was run by Henry Roediger and Jeffrey Karpicke at Washington University.',
      'The practice tests in the first experiment gave no feedback at all.',
      'Flashcards work because they force recall rather than recognition.',
    ],
    stat: { value: '56% vs 42%', label: 'One-week recall' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['testing effect', 'retrieval practice', 'studying', 'revision', 'flashcards', 'memory', 'learning'],
    relatedTopics: ['spacing-effect', 'memory-rebuilt', 'memory-palace', 'working-memory-limit'],
    icon: 'notebook-pen',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'Roediger & Karpicke (2006), Test-enhanced learning, Psychological Science',
      url: 'https://learninglab.psych.purdue.edu/downloads/2006/2006_Roediger_Karpicke_PsychSci.pdf',
    },
  },
  {
    id: 'zeigarnik-effect',
    title: 'Unfinished tasks may not stick in memory after all',
    category: 'psychology',
    subcategory: 'Memory',
    visual: { kind: 'object', image: 'zeigarnik-effect' },
    description:
      'In the 1920s Bluma Zeigarnik reported that people recall interrupted tasks better than finished ones, an idea now repeated in countless productivity tips. A 2025 meta-analysis found no reliable memory advantage for unfinished tasks. What did hold up was a related pull: people tend to go back and finish what was interrupted.',
    shortFact: 'The famous memory boost for unfinished tasks largely vanished when studies were pooled.',
    interestingFact:
      'The urge to resume an interrupted task has its own name, the Ovsiankina effect, after another student in the same Berlin circle. That tendency, not better recall, is what the evidence supports.',
    oneMoreThing:
      'The researchers suggest the original effect may have depended on its setting: authoritative experimenters, demanding tasks and very involved volunteers. Those conditions were common in early studies and rarer since, which could explain the failed repeats.',
    facts: [
      'Zeigarnik published her study in 1927 while working with Kurt Lewin in Berlin.',
      'The story goes that waiters remembered unpaid orders, then forgot them once paid.',
      'The 2025 meta-analysis came from psychologists at the University of Bern.',
    ],
    certainty: 'debated',
    caveat: 'A small effect may still appear in particular settings, so researchers describe it as conditional rather than disproved.',
    moods: ['surprising'],
    keywords: ['zeigarnik effect', 'ovsiankina effect', 'unfinished tasks', 'interruption', 'memory', 'replication', 'productivity'],
    relatedTopics: ['replication-crisis', 'choice-overload', 'habit-formation-time', 'doorway-effect'],
    icon: 'puzzle',
    difficulty: 2,
    estimatedReadTime: 55,
    source: { label: 'Ghibellini & Meier (2025), Humanities and Social Sciences Communications', url: 'https://doi.org/10.1057/s41599-025-05000-w' },
  },
  {
    id: 'tip-of-the-tongue',
    title: 'You often know the first letter of a word you cannot recall',
    category: 'psychology',
    subcategory: 'Memory',
    visual: { kind: 'object', image: 'tip-of-the-tongue' },
    description:
      'In a tip-of-the-tongue state you are sure you know a word but cannot produce it. In 1966 Roger Brown and David McNeill read out definitions of rare words and caught volunteers in this state. Even while stuck, people could often guess the first letter and the number of syllables.',
    shortFact: 'Stuck for a word, people still guess its first letter and syllable count better than chance.',
    interestingFact:
      'The memory is not missing; the link from meaning to sound is partly blocked. Volunteers also offered near misses with similar sounds, such as "secant" and "sextet" while hunting for "sextant".',
    oneMoreThing:
      'Later studies found these moments happen roughly once a week, grow more common with age, and are especially likely with names of people. Most resolve on their own, often minutes later.',
    facts: [
      'Brown and McNeill worked at Harvard and published in 1966.',
      'Their prompts included definitions of words such as "sampan" and "sextant".',
      'Many languages describe the feeling with the same tongue image.',
    ],
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['tip of the tongue', 'word finding', 'memory', 'recall', 'language', 'names', 'brown and mcneill'],
    relatedTopics: ['doorway-effect', 'memory-rebuilt', 'testing-effect', 'frequency-illusion'],
    icon: 'message-circle-question',
    difficulty: 1,
    estimatedReadTime: 45,
    source: { label: 'Brown & McNeill (1966), The "tip of the tongue" phenomenon', url: 'https://doi.org/10.1016/S0022-5371(66)80040-3' },
  },
  {
    id: 'troxler-fading',
    title: 'Stare at one spot and the edges of the world dissolve',
    category: 'psychology',
    subcategory: 'Perception',
    visual: { kind: 'photo', image: 'troxler-fading' },
    description:
      'Fix your gaze on one point and soft, blurry shapes at the edge of your vision soon fade into the background. The visual system responds to change, and an image that stays still on the retina stops being reported. The effect was described by the Swiss physician Ignaz Troxler in 1804.',
    shortFact: 'Hold your gaze perfectly still and faint shapes in the corner of your eye vanish.',
    interestingFact:
      'Your eyes are never truly still. Tiny jerks called microsaccades refresh the image, and studies show fading follows a lull in these movements while visibility returns just after them.',
    oneMoreThing:
      'Fading is strongest for blurry, low-contrast shapes with no hard edges. Sharp outlines resist it, which is why online versions use soft coloured blobs that seem to melt away.',
    facts: [
      'A blink or a small glance brings the faded shapes straight back.',
      'In the 1950s, images fixed to the eye faded within seconds.',
      'The brain fills the faded area with the surrounding colour and texture.',
    ],
    stat: { value: '1804', label: 'First described' },
    certainty: 'established',
    moods: ['mind-bending', 'strange'],
    keywords: ['troxler fading', 'troxler effect', 'peripheral vision', 'microsaccades', 'fixation', 'optical illusion', 'perception'],
    relatedTopics: ['blind-spot', 'checker-shadow-illusion', 'cafe-wall-illusion', 'invisible-gorilla'],
    icon: 'eye',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Costela et al. (2013), Microsaccades restore the visibility of minute foveal targets',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3740150/',
    },
  },

  // ── Space ─────────────────────────────────────────────────────
  {
    id: 'lunar-retroreflectors',
    title: 'Mirrors left on the Moon in 1969 still answer lasers',
    category: 'space',
    subcategory: 'The Moon',
    visual: { kind: 'object', image: 'lunar-retroreflectors' },
    description:
      'Apollo 11 left a panel of 100 glass corner cubes on the Moon, and observatories still fire lasers at it. Each cube sends light straight back towards where it came from. Timing the round trip measures the distance to the Moon to within a few centimetres or better.',
    shortFact: 'Lasers fired at Apollo-era reflectors show the Moon drifting away about 3.8 cm a year.',
    interestingFact:
      'Almost all the light is lost. By the time the beam reaches the Moon it is several kilometres wide, and only about one photon returns every few seconds.',
    oneMoreThing:
      "The measurements have done far more than track distance. They hint that the Moon has a liquid core, show Earth's tides tugging on its orbit, and pick up the slow drift of continents carrying the observatories.",
    facts: [
      "Apollo 14 and 15 left further arrays; Apollo 15's is the largest.",
      'The reflectors need no power and have no moving parts.',
      'Each Apollo 11 cube is 3.8 cm across, mounted on a 46 cm panel.',
    ],
    stat: { value: '3.8 cm', label: 'Yearly drift' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['lunar laser ranging', 'retroreflector', 'apollo 11', 'moon distance', 'corner cube', 'laser', 'moon receding'],
    relatedTopics: ['eclipse-coincidence', 'moon-same-side', 'moon-shrinking', 'moon-dust-smell'],
    icon: 'crosshair',
    difficulty: 2,
    estimatedReadTime: 50,
    source: { label: "NASA Goddard: Measuring the Moon's distance", url: 'https://eclipse.gsfc.nasa.gov/help/ApolloLaser.html' },
  },
  {
    id: 'moon-dust-smell',
    title: 'Moon dust smelled like spent gunpowder',
    category: 'space',
    subcategory: 'The Moon',
    visual: { kind: 'object', image: 'moon-dust-smell' },
    description:
      'Apollo astronauts carried dust back into the lunar module on their suits, and once they took their helmets off, they smelled it. Crews compared it to burnt gunpowder. Samples back on Earth have no such smell, probably because years in moist, oxygen-rich air have long since used up the reactive surfaces.',
    shortFact: 'Apollo crews noticed a burnt-gunpowder smell from the dust they tracked inside.',
    interestingFact:
      'Lunar dust is fine as powder but sharp as glass. With no wind or water to round them off, the grains stay jagged, cling through static charge and scour whatever they touch.',
    oneMoreThing:
      'Harrison Schmitt of Apollo 17 described his symptoms as "lunar hay fever". Sneezing and stuffy noses were reported by all twelve moonwalkers, and the dust wore through boot layers and wrecked sample-box seals.',
    facts: [
      'Lunar dust is not gunpowder; it has none of the ingredients.',
      'Static charge from sunlight can lift Moon dust off the ground.',
      'Dust control is a design problem for every planned lunar base.',
    ],
    certainty: 'established',
    moods: ['strange', 'surprising'],
    keywords: ['moon dust', 'lunar regolith', 'apollo', 'smell', 'gunpowder', 'lunar hay fever', 'astronauts'],
    relatedTopics: ['lunar-retroreflectors', 'moon-shrinking', 'moon-same-side', 'iss-free-fall'],
    icon: 'moon',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'ESA: The toxic side of the Moon',
      url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/The_toxic_side_of_the_Moon',
    },
  },
  {
    id: 'martian-meteorites',
    title: 'Pieces of Mars have landed on Earth',
    category: 'space',
    subcategory: 'Meteorites',
    visual: { kind: 'object', image: 'martian-meteorites' },
    description:
      'Asteroid impacts on Mars can blast rocks off fast enough to escape its gravity, and a few eventually fall on Earth. Just under 400 Martian meteorites are known. They were identified by tiny pockets of gas inside them that match the Martian air measured by the Viking landers in the 1970s.',
    shortFact: 'About one meteorite in 200 found on Earth came from Mars.',
    interestingFact:
      'One Antarctic find, ALH84001, crystallised from lava more than four billion years ago. It is older than any known Earth rock and left Mars about 16 million years ago.',
    oneMoreThing:
      "One Martian meteorite has gone home. A slice of the Omani find SaU 008 travelled to Mars aboard NASA's Perseverance rover in 2020, to help calibrate one of its instruments.",
    facts: [
      'The Nakhla meteorite fell in Egypt in 1911 and contains water-formed clay.',
      "Mars's thin atmosphere makes it easier for impact debris to escape.",
      'Claims of fossil microbes in ALH84001 are now largely rejected.',
    ],
    stat: { value: '~400', label: 'Known pieces' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['martian meteorite', 'mars', 'alh84001', 'nakhla', 'viking', 'meteorite', 'impact'],
    relatedTopics: ['olympus-mons', 'mars-blue-sunset', 'meteors-dust', 'pumice-rafts'],
    icon: 'orbit',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Natural History Museum: Martian meteorites, rare visitors from the red planet',
      url: 'https://www.nhm.ac.uk/discover/martian-meteorites-rare-visitors-from-the-red-planet.html',
    },
  },
  {
    id: 'olympus-mons',
    title: 'Why Mars could grow a volcano 22 km high',
    category: 'space',
    subcategory: 'Mars',
    visual: { kind: 'photo', image: 'olympus-mons' },
    description:
      'Olympus Mons, the tallest volcano in the solar system, stands about 22 km high, roughly two and a half times the height of Everest. Mars has no moving tectonic plates, so a volcano can sit over the same hot spot for ages, piling lava on lava. Lower gravity helps it stand.',
    shortFact: 'The tallest volcano in the solar system is two and a half Everests high.',
    interestingFact:
      'On Earth, plate movement drags volcanoes off their hot spots, which is why Hawaii is a chain of islands. On Mars, the crust stays put and one volcano just keeps growing.',
    oneMoreThing:
      'Its summit holds a nest of overlapping collapse craters about 3 km deep. Each formed when a magma chamber emptied and the ground above sank into it.',
    facts: [
      'Its base covers an area roughly the size of Poland.',
      'Its slopes are so gentle that a climber would barely notice the incline.',
      'Cliffs several kilometres high ring much of its base.',
    ],
    stat: { value: '22 km', label: 'Average elevation' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['olympus mons', 'mars', 'volcano', 'shield volcano', 'caldera', 'tallest volcano', 'hotspot'],
    relatedTopics: ['hawaii-hotspot', 'volcano-eruption', 'martian-meteorites', 'mars-blue-sunset'],
    icon: 'mountain',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'ESA Mars Express: Olympus Mons, the caldera in close-up',
      url: 'https://www.esa.int/Science_Exploration/Space_Science/Mars_Express/Olympus_Mons_-_the_caldera_in_close-up',
    },
  },
  {
    id: 'mercury-polar-ice',
    title: 'The planet closest to the Sun has ice',
    category: 'space',
    subcategory: 'Planets',
    visual: { kind: 'photo', image: 'mercury-polar-ice' },
    description:
      "Mercury's axis is barely tilted, so the floors of deep craters near its poles never see sunlight. NASA's MESSENGER spacecraft confirmed that these permanently shadowed craters hold water ice. In 2014 it even photographed the ice, using faint sunlight scattered off the crater walls.",
    shortFact: "Mercury's daytime surface can bake, yet ice survives in its polar crater shadows.",
    interestingFact:
      'In many places the ice is buried under a thin, dark layer thought to be frozen organic-rich material. The sharp edges of these deposits suggest they are geologically young.',
    oneMoreThing:
      'Radar from Earth first hinted at the ice in the early 1990s, when certain polar craters echoed back unusually brightly. MESSENGER later measured the hydrogen and mapped the shadows that matched.',
    facts: [
      'The ice was probably delivered by impacting comets and water-rich asteroids.',
      'Prokofiev, the largest north polar crater with ice, is named after the composer.',
      'MESSENGER orbited Mercury from 2011 until it crashed into it in 2015.',
    ],
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['mercury', 'water ice', 'messenger', 'polar craters', 'permanent shadow', 'prokofiev', 'planet'],
    relatedTopics: ['europa-ocean', 'venus-day-year', 'antarctica-desert', 'comet-tails'],
    icon: 'snowflake',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: "Johns Hopkins APL: MESSENGER provides first optical images of ice near Mercury's north pole",
      url: 'https://www.jhuapl.edu/news/news-releases/141015-messenger-provides-first-optical-images-ice-near-mercurys-north-pole',
    },
  },

  // ── Geography ─────────────────────────────────────────────────
  {
    id: 'magnetic-pole-drift',
    title: 'Magnetic north is on the move towards Siberia',
    category: 'geography',
    subcategory: "Earth's magnetism",
    visual: { kind: 'object', image: 'magnetic-pole-drift' },
    description:
      "A compass points to magnetic north, which is not fixed. It was first located in northern Canada in 1831 and has since wandered across the Arctic towards Siberia, driven by changing flows of molten iron in Earth's outer core. Surveys in the 2000s clocked it at around 55 km a year.",
    shortFact: 'The spot your compass points to has crossed the Arctic since 1831.',
    interestingFact:
      'The World Magnetic Model, used by phones, aircraft and ships, is normally updated every five years. It needed an early fix in 2019 because the pole moved unexpectedly fast.',
    oneMoreThing: 'Airports feel it too. Runways are numbered by magnetic heading, so as the field shifts some are repainted with new numbers.',
    facts: [
      'The British explorer James Clark Ross first reached the north magnetic pole in 1831.',
      'The current World Magnetic Model, WMM2025, runs until 2030.',
      'The south magnetic pole wanders as well, off the coast of Antarctica.',
    ],
    stat: { value: '55 km', label: 'Yearly drift' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['magnetic north', 'north magnetic pole', 'compass', 'world magnetic model', 'geomagnetism', 'navigation', 'outer core'],
    relatedTopics: ['bird-migration', 'aurora', 'gps', 'tectonic-plates'],
    icon: 'compass',
    difficulty: 2,
    estimatedReadTime: 50,
    source: { label: 'NOAA NCEI: Wandering of the geomagnetic poles', url: 'https://www.ncei.noaa.gov/products/wandering-geomagnetic-poles' },
  },
  {
    id: 'pumice-rafts',
    title: 'Some volcanoes make floating islands of stone',
    category: 'geography',
    subcategory: 'Volcanoes',
    visual: { kind: 'object', image: 'pumice-rafts' },
    description:
      'Pumice is lava frothed full of gas bubbles, so riddled with holes that it floats. When an undersea volcano erupts it can release enough to cover the sea in a raft of rock. In August 2019 sailors near Tonga sailed through one so dense that the water was hidden.',
    shortFact: 'A 2019 eruption near Tonga covered the sea with floating rock.',
    interestingFact:
      'The crew described a rubble slick of stones from marble to basketball size, with a smell of sulphur. Satellites tracked the raft as it drifted and slowly spread out.',
    oneMoreThing:
      'Pumice rafts can drift for weeks to years. Along the way, barnacles, corals and other sea life settle on them, so the rock becomes a slow ferry carrying living things across an ocean.',
    facts: [
      'The 2019 raft came from an unnamed seamount about 40 metres below the surface.',
      'Pumice forms from silica-rich magma that traps lots of gas.',
      'Once its holes fill with water, pumice eventually sinks.',
    ],
    certainty: 'established',
    moods: ['strange', 'surprising'],
    keywords: ['pumice', 'pumice raft', 'tonga', 'submarine volcano', 'floating rock', 'eruption', 'ocean'],
    relatedTopics: ['surtsey', 'volcano-eruption', 'hawaii-hotspot', 'basalt-columns'],
    icon: 'waves',
    difficulty: 1,
    estimatedReadTime: 45,
    source: { label: 'NASA Earth Observatory: A raft of rock', url: 'https://science.nasa.gov/earth/earth-observatory/a-raft-of-rock-145490/' },
  },
  {
    id: 'basalt-columns',
    title: 'Why cooling lava cracks into giant hexagons',
    category: 'geography',
    subcategory: 'Rocks and landforms',
    visual: { kind: 'object', image: 'basalt-columns' },
    description:
      "Thick lava flows shrink as they cool, and the stress splits them into long columns, mostly with five, six or seven sides. The cracks grow inwards as the cooling front advances. Slower cooling makes wider columns, which is why sites like the Giant's Causeway and Fingal's Cave differ in scale.",
    shortFact: 'Lava shrinks as it cools, and the cracks settle into near-hexagonal columns.',
    interestingFact:
      'You can grow the same pattern in a kitchen. Physicists dried a slurry of cornflour and water under lamps and got tiny columns, scaled by drying speed just as lava columns are by cooling speed.',
    oneMoreThing:
      'Sideways stripes on the columns record each step of the crack. Each band is one fracture advance, letting geologists work out how fast the lava cooled long after it set.',
    facts: [
      'Cracks that meet at about 120 degrees release stress most evenly.',
      'Devils Postpile in California is another famous columnar basalt.',
      'Lava columns are roughly 10 to 100 times wider than cornflour ones.',
    ],
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['basalt columns', 'columnar jointing', 'giants causeway', 'fingals cave', 'lava', 'hexagon', 'cooling'],
    relatedTopics: ['volcano-eruption', 'pumice-rafts', 'hawaii-hotspot', 'surtsey'],
    icon: 'hexagon',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Goehring, Mahadevan & Morris (2009), PNAS: Nonequilibrium scale selection for columnar jointing',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2615021/',
    },
  },
  {
    id: 'singing-sand-dunes',
    title: 'Some sand dunes boom like a low organ note',
    category: 'geography',
    subcategory: 'Deserts',
    visual: { kind: 'photo', image: 'singing-sand-dunes' },
    description:
      'When sand avalanches down the steep face of certain dunes, the whole dune can hum with a deep, steady tone that carries a long way. Booming dunes are found in deserts from California to China and the Sahara. Researchers at Caltech recorded tones between about 70 and 105 hertz.',
    shortFact: 'Avalanching sand on certain dunes sets off a deep hum heard far away.',
    interestingFact:
      'The Caltech team found two kinds of sound: a short "burp" that travels along the surface, and a sustained boom from waves bouncing between layers inside the dune.',
    oneMoreThing:
      'Only certain dry, well-sorted grains seem to boom, and the same sand pushed along in a laboratory can roar briefly. That is part of why the source of the tone is still argued over.',
    facts: [
      'Marco Polo wrote of desert sands that seemed to fill the air with music.',
      'Booming usually needs dry weather; damp sand stays quiet.',
      'Field teams trigger booms by sliding down the dune face.',
    ],
    stat: { value: '70–105 Hz', label: 'Booming tone' },
    certainty: 'debated',
    caveat: 'Researchers still disagree on whether layers inside the dune or the synchronised motion of the grains themselves sets the pitch.',
    moods: ['strange', 'beautiful'],
    keywords: ['singing sand', 'booming dunes', 'sand dune', 'desert', 'sound', 'avalanche', 'acoustics'],
    relatedTopics: ['sahara-dust', 'antarctica-desert', 'whale-song', 'whip-crack'],
    icon: 'audio-lines',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'AIP Publishing: Physics of booming and burping sand dunes revealed (Physics of Fluids, 2015)',
      url: 'https://publishing.aip.org/publications/latest-content/physics-of-booming-and-burping-sand-dunes-revealed/',
    },
  },
  {
    id: 'catatumbo-lightning',
    title: 'The lake with more lightning than anywhere on Earth',
    category: 'geography',
    subcategory: 'Weather',
    visual: { kind: 'photo', image: 'catatumbo-lightning' },
    description:
      'Lake Maracaibo in Venezuela has the highest lightning rate on the planet, about 233 flashes per square kilometre each year. At night, cool breezes slide down the surrounding mountains and meet warm, humid air over the lake, building thunderstorms almost every night.',
    shortFact: 'Storms flicker over this Venezuelan lake on about 297 nights a year.',
    interestingFact:
      "The title was settled from space. Sixteen years of data from a lightning sensor aboard a NASA satellite ranked the world's hotspots, and the lake narrowly beat Africa's Congo Basin, the previous favourite.",
    oneMoreThing:
      'The storms peak in September and are most intense where the Catatumbo river meets the lake. Sailors have long used the near-constant flashes as a natural lighthouse.',
    facts: [
      'Six of the top ten lightning hotspots are in Africa.',
      "Most of the lake's storms build at night, not in the afternoon.",
      'The phenomenon is known locally as the Catatumbo lightning.',
    ],
    stat: { value: '233 per km²', label: 'Flashes a year' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['catatumbo lightning', 'lake maracaibo', 'venezuela', 'lightning capital', 'thunderstorms', 'weather', 'nasa'],
    relatedTopics: ['thunder-lightning', 'volcanic-lightning', 'carrington-event', 'aurora'],
    icon: 'cloud-lightning',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: "NASA: Earth's new lightning capital revealed",
      url: 'https://www.nasa.gov/centers-and-facilities/marshall/earths-new-lightning-capital-revealed/',
    },
  },

  // ── Design ────────────────────────────────────────────────────
  {
    id: 'swiss-railway-clock',
    title: 'The station clock whose second hand waits at twelve',
    category: 'design',
    subcategory: 'Wayfinding',
    visual: { kind: 'object', image: 'swiss-railway-clock' },
    description:
      'Swiss station clocks, designed by the railway engineer Hans Hilfiker and first used in 1944, swap numbers for plain bars. Their red second hand completes its circuit in a little under a minute, then pauses at twelve until a pulse from a master clock moves the minute hand and releases it.',
    shortFact: 'Swiss station clocks briefly stop the second hand at the top of every minute.',
    interestingFact: 'The red second hand with its round tip copies the signalling disc a station master raised to send a train on its way.',
    oneMoreThing:
      "The design proved valuable. When a clock closely based on it appeared on Apple's iPads in 2012, the company agreed to pay the Swiss railways 20 million francs for the rights.",
    facts: [
      'Hilfiker drew on the Bauhaus taste for clean, functional forms.',
      'The clocks hang at stations across the whole Swiss network.',
      'The pause kept every platform clock locked to one central time.',
    ],
    certainty: 'established',
    moods: ['useful', 'beautiful'],
    keywords: ['swiss railway clock', 'station clock', 'hans hilfiker', 'sbb', 'second hand', 'clock design', 'wayfinding'],
    relatedTopics: ['tube-map-diagram', 'helvetica', 'quartz-watch-crystal', 'road-sign-shapes'],
    icon: 'clock',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'swissinfo.ch: Time flies, iconic Swiss railway clock turns 75',
      url: 'https://www.swissinfo.ch/eng/banking-fintech/design-anniversary_time-flies-iconic-swiss-railway-clock-turns-75/44690592',
    },
  },
  {
    id: 'pen-cap-hole',
    title: 'The hole in a pen cap is there to let you breathe',
    category: 'design',
    subcategory: 'Safety',
    visual: { kind: 'object', image: 'pen-cap-hole' },
    description:
      'Many pen caps have a small hole at the top or open vents along the clip. If a child inhales a cap, the gap lets some air pass, buying time for help. An international standard, ISO 11540, first published in 1993, sets rules for caps on pens likely to be used by children.',
    shortFact: 'A swallowed pen cap with a vent can still let air through.',
    interestingFact:
      'The standard measures the airflow a ventilated cap must allow. Caps too big to lodge in an airway are exempt, and the safest option it suggests is no cap at all.',
    oneMoreThing:
      'Many pens also have a tiny hole in the barrel. That one has a different job: it lets air replace the ink as it is used, so the flow does not stall.',
    facts: [
      'The standard covers writing instruments for children up to 14.',
      'Costly fountain pens and other adult-only pens are excluded.',
      'Caps that fail the test must carry a choking warning.',
    ],
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['pen cap', 'pen lid hole', 'choking', 'iso 11540', 'safety design', 'ballpoint', 'airway'],
    relatedTopics: ['crown-cap', 'tactile-paving', 'good-grips-peeler', 'pencil-graphite'],
    icon: 'pen-line',
    difficulty: 1,
    estimatedReadTime: 40,
    source: { label: 'ISO 11540: Caps for writing and marking instruments for children', url: 'https://committee.iso.org/standard/19494.html' },
  },
  {
    id: 'anglepoise-lamp',
    title: 'A car suspension engineer designed the classic desk lamp',
    category: 'design',
    subcategory: 'Product design',
    visual: { kind: 'object', image: 'anglepoise-lamp' },
    description:
      'George Carwardine, an automotive engineer who specialised in vehicle suspension, patented a system of springs and levers in 1932. It let a weighted arm be moved in any direction and stay put. Fitted with a shade and bulb, it became the Anglepoise lamp.',
    shortFact: 'The springs that hold a desk lamp in place came from car-suspension thinking.',
    interestingFact:
      'The lamp was licensed to Herbert Terry & Sons, a Worcestershire spring maker. The first model of 1934 used four springs; the domestic three-spring 1227 followed in 1935.',
    oneMoreThing:
      "Terry's wanted to call it the Equipoise but could not register the name, so it became the Anglepoise. The basic balancing idea is still used in task lamps today.",
    facts: [
      'Carwardine developed the mechanism in a workshop in Bath.',
      'The heavy base keeps the balanced arm from tipping over.',
      'The shade focuses light onto the desk without glare.',
    ],
    stat: { value: '1932', label: 'Spring patent' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['anglepoise', 'desk lamp', 'george carwardine', 'springs', 'task lamp', 'product design', 'herbert terry'],
    relatedTopics: ['good-grips-peeler', 'monobloc-chair', 'swiss-railway-clock', 'memory-foam'],
    icon: 'lamp-desk',
    difficulty: 1,
    estimatedReadTime: 45,
    source: { label: 'Design Museum: The Anglepoise lamp', url: 'https://designmuseum.org/design/anglepoise' },
  },
  {
    id: 'good-grips-peeler',
    title: 'A peeler made for arthritic hands became a design icon',
    category: 'design',
    subcategory: 'Inclusive design',
    visual: { kind: 'object', image: 'good-grips-peeler' },
    description:
      'Sam Farber noticed his wife Betsey struggling to hold a thin metal peeler because of arthritis. The result, launched in 1990 as OXO Good Grips, had a fat, oval, soft rubber handle that was easy to grip whatever the strength or size of your hand.',
    shortFact: 'A wide rubber handle designed for arthritis turned out to suit almost everyone.',
    interestingFact:
      'The flexible fins on the handle sides were partly an invitation. Shoppers squeezed them out of curiosity, which put the tool in their hands in the shop.',
    oneMoreThing:
      "It became a textbook case of inclusive design: solve the problem for people who struggle most, and the result is better for everyone. The peeler is now in the Museum of Modern Art's collection.",
    facts: [
      'The handle is thermoplastic rubber, which stays grippy when wet.',
      'The peeler launched alongside 14 other Good Grips kitchen tools.',
      'The tools were developed with the New York firm Smart Design.',
    ],
    certainty: 'established',
    moods: ['useful'],
    keywords: ['oxo good grips', 'peeler', 'inclusive design', 'universal design', 'arthritis', 'kitchen tools', 'sam farber'],
    relatedTopics: ['anglepoise-lamp', 'tactile-paving', 'fitts-law-edges', 'pen-cap-hole'],
    icon: 'utensils',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'OXO: Behind the design of the Good Grips handles',
      url: 'https://www.oxo.com/blog/behind-the-scenes/behind-design-oxos-iconic-good-grips-handles',
    },
  },
  {
    id: 'monobloc-chair',
    title: 'The plastic garden chair may be the most common chair on Earth',
    category: 'design',
    subcategory: 'Furniture',
    visual: { kind: 'object', image: 'monobloc-chair' },
    description:
      'The white plastic Monobloc chair is moulded in one piece from polypropylene. The French engineer Henry Massonnet produced the archetype, the Fauteuil 300, in 1972, and cut the whole production cycle to under two minutes. Copies followed worldwide, and the Vitra Design Museum calls it the most widely used piece of furniture in the world.',
    shortFact: 'One quick moulding shot makes an entire chair, legs, seat and arms.',
    interestingFact:
      "Designers chased a one-piece chair for decades before it became cheap. Attempts in pressed metal and bent plywood date to the 1920s, and Verner Panton's sculpted plastic chair came in the 1960s.",
    oneMoreThing:
      'Its success is also its problem. The museum notes that the Monobloc is a symbol of affordable seating for everyone and of uniform mass consumption that fails sustainability tests.',
    facts: [
      '"Monobloc" refers to moulding the chair from a single block of material.',
      'From the 1980s, many manufacturers released near-identical copies.',
      'The Vitra Design Museum gave it its own exhibition in 2017.',
    ],
    stat: { value: '<2 min', label: 'Production cycle' },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['monobloc chair', 'plastic chair', 'garden chair', 'polypropylene', 'injection moulding', 'henry massonnet', 'furniture'],
    relatedTopics: ['lego-1958', 'anglepoise-lamp', 'bakelite-shellac', 'shopping-trolley'],
    icon: 'armchair',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Vitra Design Museum: Monobloc, a chair for the world',
      url: 'https://www.design-museum.de/en/exhibitions/detailpages/monobloc-a-chair-for-the-world.html',
    },
  },
];
