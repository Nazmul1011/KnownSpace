import type { KnowledgeText } from '../../model/types';

export const batchB: KnowledgeText[] = [
  {
    id: 'hummingbird-hover',
    description:
      'A hovering hummingbird sweeps its wings forward and back in a flat figure-of-eight, around 50 times a second in many species. On each backstroke it flips the wing upside down, so both strokes push air downward and hold it in place.',
    shortFact: 'Hummingbirds turn their wings upside down on every backstroke to stay in one spot.',
    interestingFact:
      'They hover much like insects, but not quite. Measurements of the air behind them show the downstroke gives about 75 per cent of the lift; in similar-sized insects the strokes share it equally.',
    oneMoreThing:
      'Hovering burns energy so fast that hummingbirds often slip into torpor on cold nights. One black metaltail in the Andes cooled to 3.3°C, the lowest yet recorded for any bird or non-hibernating mammal.',
    facts: [
      "A hummingbird's wing is mostly hand: short arm bones, long finger bones.",
      'In flight their hearts can beat more than 1,000 times a minute.',
      'They are among the very few birds that can fly backwards.',
    ],
    stat: { value: '~50/s', label: 'Wingbeats' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['hummingbird', 'hovering', 'bird flight', 'wingbeats', 'aerodynamics', 'torpor'],
    relatedTopics: ['bird-migration', 'cats-land', 'chili-heat', 'ant-traffic'],
    icon: 'bird',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Warrick, Tobalske & Powers (2005), Nature: Aerodynamics of the hovering hummingbird',
      url: 'https://doi.org/10.1038/nature03647',
    },
  },
  {
    id: 'octopus-color',
    description:
      'Octopus skin is packed with chromatophores: elastic sacs of yellow, red or brown pigment, each ringed by tiny muscles wired to the brain. When the muscles pull, a sac stretches into a visible spot of colour. Reflective cells beneath add whites and iridescent sheens.',
    shortFact: 'An octopus can repaint its skin in under a second, yet its eyes appear colour-blind.',
    interestingFact:
      'Because nerves and muscles, not slow hormones, work each pigment sac, the brain can redraw the whole body pattern almost at once. The same skin can raise bumps to mimic texture.',
    oneMoreThing:
      'The skin may sense light on its own. In the California two-spot octopus, skin cut off from the brain still expanded its chromatophores when lit, using light-sensitive proteins also found in eyes.',
    facts: [
      'Most cephalopods tested have just one type of light-sensitive pigment in their eyes.',
      'White cells called leucophores reflect whatever light falls on them.',
      'Cuttlefish and squid change colour with the same chromatophore system.',
    ],
    stat: { value: '<1 s', label: 'Pattern change' },
    certainty: 'established',
    moods: ['surprising', 'beautiful', 'strange'],
    keywords: ['octopus', 'camouflage', 'chromatophores', 'colour change', 'cephalopod', 'skin'],
    relatedTopics: ['color-vision', 'blue-eyes', 'bioluminescence', 'ocean-blue'],
    icon: 'palette',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Hanlon (2007), Current Biology: Cephalopod dynamic camouflage',
      url: 'https://doi.org/10.1016/j.cub.2007.03.034',
    },
  },
  {
    id: 'cats-purr',
    description:
      'Cats purr while breathing both in and out, at roughly 25 to 30 vibrations a second. They purr when content, but also when hungry, stressed, injured or giving birth. So a purr is better read as a social signal, and perhaps a way of self-soothing, than as simple happiness.',
    shortFact: 'Cats purr when hurt, hungry or giving birth, not only when they are content.',
    interestingFact:
      'In 2023, researchers showed that cat larynxes removed from the body still vibrate at purring rates when air is blown through, with no nerve signals. Tissue pads in the vocal folds allow the low pitch.',
    oneMoreThing:
      'Some cats hide a high, cry-like tone inside the purr when asking for food, and people rate it as more urgent. The popular idea that purring helps heal bones remains an unproven hypothesis.',
    facts: [
      'Kittens can purr within days of birth, often while nursing.',
      'Cheetahs and pumas purr; lions and tigers generally do not.',
      "Pads of tissue up to 4 mm across sit inside cats' vocal folds.",
    ],
    stat: { value: '25–30 Hz', label: 'Purr frequency' },
    certainty: 'debated',
    caveat: 'Researchers still disagree over whether purring is driven mainly by rhythmic nerve signals or by self-sustaining vibration of the vocal folds.',
    moods: ['surprising', 'strange'],
    keywords: ['cat', 'purring', 'why cats purr', 'larynx', 'vocal folds', 'pets'],
    relatedTopics: ['cats-land', 'whale-song', 'voice-recording', 'music-chills'],
    icon: 'cat',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Herbst et al. (2023), Current Biology: Domestic cat larynges can produce purring frequencies without neural input',
      url: 'https://doi.org/10.1016/j.cub.2023.09.014',
    },
  },
  {
    id: 'cats-land',
    description:
      'A falling cat senses which way is down with its inner ear and eyes, then turns in stages. It bends at the middle and rotates its front half, then its back half, tucking and extending legs so each half twists against the other. Its overall spin stays zero throughout.',
    shortFact: 'A cat can turn over in mid-air with nothing to push against.',
    interestingFact:
      "When Étienne-Jules Marey's 1894 photographs showed this, some scientists thought it broke physics. It doesn't: by changing shape, a body can change orientation without any net spin, as astronauts do in orbit.",
    oneMoreThing:
      'A famous 1987 New York study of 132 cats found injuries seemed to drop for falls above seven storeys. But cats killed outright were rarely taken to vets, so the pattern may be skewed.',
    facts: [
      'Kittens show the righting reflex at three to four weeks, refining it by about seven.',
      'Tailless cats, such as Manx cats, can still right themselves.',
      'Engineers in the 1960s modelled the falling cat to help astronauts turn in space.',
    ],
    stat: { value: '1894', label: "Marey's photos" },
    certainty: 'established',
    moods: ['surprising', 'mind-bending'],
    keywords: ['cat', 'righting reflex', 'falling cat', 'angular momentum', 'physics', 'cats land on feet'],
    relatedTopics: ['cats-purr', 'hummingbird-hover', 'moon-same-side', 'tardigrade'],
    icon: 'rotate-3d',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Nature (1894): Photographs of a tumbling cat',
      url: 'https://doi.org/10.1038/051080a0',
    },
  },
  {
    id: 'whale-song',
    description:
      'Blue and fin whales make some of the lowest calls of any animal, roughly 10 to 40 hertz, near or below the floor of human hearing. Low sound fades slowly in seawater, so hydrophones can pick up their calls hundreds of kilometres away.',
    shortFact: "A fin whale's pulse is so low it sits at the bottom edge of human hearing.",
    interestingFact:
      'Roughly 1,000 metres down in many oceans lies the SOFAR channel, a layer that traps sound so it can travel thousands of kilometres. Whether whales use it to keep in touch is unknown.',
    oneMoreThing:
      'A 2024 study found baleen whales call using a U-shaped structure in the larynx pressed against a cushion of fat. That anatomy limits how deep they can call and keeps their songs within the range of ship noise.',
    facts: [
      "Only male humpbacks sing, and a population's shared song changes over time.",
      'New humpback songs have spread eastward across the South Pacific, population to population.',
      'Sound moves about 1,500 metres per second in seawater, over four times faster than in air.',
    ],
    stat: { value: '~20 Hz', label: 'Fin whale pulse' },
    certainty: 'debated',
    caveat: 'Whale calls can be detected hundreds of kilometres away, but whether whales actually exchange information over such distances is unproven.',
    moods: ['beautiful', 'mind-bending'],
    keywords: ['whale song', 'blue whale', 'fin whale', 'humpback', 'underwater sound', 'sofar channel', 'hydrophone'],
    relatedTopics: ['silbo-gomero', 'thunder-lightning', 'undersea-cables', 'noise-cancelling'],
    icon: 'audio-waveform',
    difficulty: 2,
    estimatedReadTime: 60,
    source: {
      label: 'Elemans et al. (2024), Nature: Evolutionary novelties underlie sound production in baleen whales',
      url: 'https://doi.org/10.1038/s41586-024-07080-1',
    },
  },
  {
    id: 'bird-migration',
    description:
      "Migrating birds carry several compasses. They read the Sun's position against an internal clock, learn the stars that wheel around the celestial pole, and sense Earth's magnetic field. Landmarks, coastlines and possibly smell help them refine the route.",
    shortFact: 'A bar-tailed godwit once flew 13,560 kilometres from Alaska to Tasmania without landing.',
    interestingFact:
      "The magnetic sense may rely on quantum chemistry. A leading idea is that light hitting cryptochrome proteins in the eye creates short-lived 'radical pairs' whose chemistry is sensitive to the field's direction.",
    oneMoreThing:
      'In the 1950s, starlings caught in the Netherlands were released in Switzerland. Young birds kept their usual heading and flew on towards Spain, while adults corrected course towards their usual wintering grounds, as if using a learned map.',
    facts: [
      "European robins' magnetic compass reads the tilt of field lines, not their polarity.",
      "Indigo buntings learn the night sky's centre of rotation while they are young.",
      'Arctic terns average roughly 70,000 km a year on their pole-to-pole migration.',
    ],
    stat: { value: '13,560 km', label: 'Non-stop flight' },
    certainty: 'established',
    moods: ['surprising', 'mind-bending'],
    keywords: ['bird migration', 'navigation', 'magnetic sense', 'cryptochrome', 'godwit', 'compass', 'magnetoreception'],
    relatedTopics: ['gps', 'hummingbird-hover', 'aurora', 'here-be-dragons'],
    icon: 'compass',
    difficulty: 3,
    estimatedReadTime: 65,
    source: {
      label: 'Xu et al. (2021), Nature: Magnetic sensitivity of cryptochrome 4 from a migratory songbird',
      url: 'https://doi.org/10.1038/s41586-021-03618-9',
    },
  },
  {
    id: 'ant-traffic',
    description:
      'On busy foraging trails, ants keep moving where cars would jam. In lab experiments with Argentine ants, traffic flow rose with density and then held steady, with no congestion even when ants covered 80 per cent of the trail.',
    shortFact: 'On a trail 80 per cent full, ants still kept traffic flowing smoothly.',
    interestingFact:
      'The ants adjust as crowding rises. They speed up at moderate densities, avoid time-wasting collisions, and hold back from joining a trail that is already full.',
    oneMoreThing:
      'For pedestrians and cars, flow falls once occupancy passes about 40 per cent. One suggested reason ants do better: they share a single goal, feeding the colony, while drivers each pursue their own.',
    facts: [
      'The study ran 170 experiments with colonies of 400 to 25,600 ants.',
      'Their European supercolony stretches roughly 6,000 km along Mediterranean and Atlantic coasts.',
      'Ants on a trail manage two-way traffic with little overtaking.',
    ],
    stat: { value: '80%', label: 'Jam-free occupancy' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['ants', 'traffic', 'argentine ants', 'congestion', 'collective behaviour', 'traffic jam'],
    relatedTopics: ['trees-communicate', 'bird-migration', 'elevator-floors', 'mushrooms-mycelium'],
    icon: 'bug',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Poissonnier et al. (2019), eLife: Experimental investigation of ant traffic under crowded conditions',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6805160/',
    },
  },
  {
    id: 'tardigrade',
    description:
      "Tardigrades, or water bears, are eight-legged micro-animals usually under a millimetre long, found from garden moss to deep-sea mud. When they dry out, they curl into a dormant 'tun', shut down almost all metabolism, and can then endure conditions that would kill them when active.",
    shortFact: 'Dried-out tardigrades spent ten days exposed to open space, and many revived afterwards.',
    interestingFact:
      'In 2007, dried tardigrades rode outside a Russian FOTON-M3 capsule about 270 km up. Vacuum alone barely harmed them; with full solar ultraviolet added, only a few survived.',
    oneMoreThing:
      'They are tough, not indestructible. Active, hydrated tardigrades are fragile: in one study, half of a hardy species died after a day at about 37°C, roughly human body temperature.',
    facts: [
      'Some species survive radiation doses roughly a thousand times what would kill a person.',
      'A tardigrade protein, Dsup, cut X-ray damage in cultured human cells by about 40%.',
      'More than 1,300 tardigrade species have been described, on every continent.',
    ],
    stat: { value: '10 days', label: 'In open space' },
    certainty: 'established',
    moods: ['strange', 'surprising'],
    keywords: ['tardigrade', 'water bear', 'extremophile', 'space', 'cryptobiosis', 'micro-animal'],
    relatedTopics: ['honey-spoil', 'mushrooms-mycelium', 'saturn-rings', 'octopus-color'],
    icon: 'microscope',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Jönsson et al. (2008), Current Biology: Tardigrades survive exposure to space in low Earth orbit',
      url: 'https://doi.org/10.1016/j.cub.2008.06.048',
    },
  },
  {
    id: 'roman-concrete',
    description:
      'Roman builders mixed lime with volcanic ash, called pozzolana, which reacts to form a tough mineral glue. In harbour walls, seawater seeping through the concrete grew new interlocking crystals, including rare aluminous tobermorite, that strengthened it over centuries.',
    shortFact: 'Seawater made some Roman harbour concrete stronger by growing new crystals inside it.',
    interestingFact:
      "A 2023 study found Romans likely 'hot mixed' with quicklime, leaving tiny white lime lumps. When cracks form, water dissolves calcium from these clasts and redeposits it, sealing the gap.",
    oneMoreThing:
      'Roman concrete is not stronger than ours; modern concrete bears far heavier loads. But Romans used no steel, and in modern concrete the steel reinforcement eventually rusts, swells and cracks it from within.',
    facts: [
      "The Pantheon's dome, 43.3 metres across, is still the largest unreinforced concrete dome.",
      'Builders shipped volcanic ash from around Pozzuoli, near Naples, across the empire.',
      'In tests, cracks in lime-clast concrete sealed themselves within about two weeks.',
    ],
    stat: { value: '43.3 m', label: 'Pantheon dome' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['roman concrete', 'pozzolana', 'volcanic ash', 'pantheon', 'self-healing concrete', 'lime clasts', 'ancient rome'],
    relatedTopics: ['rust', 'volcano-eruption', 'pyramid-builders', 'flying-buttress'],
    icon: 'landmark',
    difficulty: 3,
    estimatedReadTime: 65,
    source: {
      label: 'MIT News (2023): Riddle solved: Why was Roman concrete so durable?',
      url: 'https://news.mit.edu/2023/roman-concrete-durability-lime-casts-0106',
    },
  },
  {
    id: 'cuneiform',
    description:
      'Writing in Mesopotamia began in the city of Uruk around 3300 BCE, marked on damp clay with a reed. About 85 per cent of the earliest tablets are accounts of grain, beer rations, livestock and labour. Most of the rest are word lists for training scribes.',
    shortFact: 'Most of the oldest known writing records barley, beer rations and sheep, not poems or laws.',
    interestingFact:
      'Early signs recorded things and numbers, not spoken sentences. Only later did scribes use signs for sounds, letting cuneiform write names, grammar and eventually literature such as Gilgamesh.',
    oneMoreThing:
      'In 1857 the Royal Asiatic Society sent the same newly found inscription to four scholars to translate separately. Their versions largely agreed, convincing sceptics that cuneiform had been deciphered.',
    facts: [
      'Cuneiform stayed in use for about 3,000 years, for around a dozen languages.',
      'The latest datable cuneiform tablet, an astronomical almanac, was written around AD 79.',
      'Fires that destroyed ancient libraries often baked their clay tablets harder.',
    ],
    stat: { value: '~85%', label: 'Administrative' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['cuneiform', 'writing', 'mesopotamia', 'uruk', 'clay tablets', 'sumerian', 'accounting'],
    relatedTopics: ['printing-press', 'pyramid-builders', 'black-pepper', 'price-99'],
    icon: 'receipt',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Woods (ed.), Visible Language: Inventions of Writing in the Ancient Middle East and Beyond, University of Chicago ISAC',
      url: 'https://isac.uchicago.edu/publications/visible-language-inventions-writing-ancient-middle-east-and-beyond',
    },
  },
  {
    id: 'here-be-dragons',
    description:
      "Old maps did fill unknown seas with monsters, but the Latin phrase 'hic sunt dracones', here are dragons, almost never appears. Its only well-established use is on the Hunt–Lenox Globe, a small copper globe from about 1510, near the coast of East Asia.",
    shortFact: 'The famous warning survives on just one well-attested object: a copper globe the size of a grapefruit.',
    interestingFact:
      "Medieval mapmakers more often wrote about lions. An eleventh-century Anglo-Saxon world map marks one region 'hic abundant leones', here lions abound.",
    oneMoreThing:
      'Many Renaissance sea monsters were not idle doodles. Historian Chet Van Duzer found mapmakers often copied them from illustrated encyclopedias of the time, which presented them as real animals.',
    facts: [
      'A disputed ostrich-egg globe, dated to about 1504, may carry the same phrase.',
      "Olaus Magnus's 1539 Carta Marina fills northern seas with whales and serpents.",
      "No medieval map is known to say 'here be dragons' in English.",
    ],
    stat: { value: '~1510', label: 'Hunt–Lenox Globe' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['here be dragons', 'old maps', 'hic sunt dracones', 'sea monsters', 'cartography', 'hunt-lenox globe', 'medieval maps'],
    relatedTopics: ['golden-ratio', 'gps', 'bird-migration', 'black-pepper'],
    icon: 'map',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'National Geographic Education: Here Be Dragons',
      url: 'https://education.nationalgeographic.org/resource/here-be-dragons/',
    },
  },
  {
    id: 'antikythera',
    description:
      'In 1901 sponge divers raised corroded bronze lumps from a shipwreck off the Greek island of Antikythera. X-ray scans have revealed a hand-cranked gear train that modelled the sky: the positions of Sun and Moon, lunar phases and the timing of eclipses.',
    shortFact: 'A Greek device of bronze gears predicted eclipses more than 2,000 years ago.',
    interestingFact:
      "One pair of gears, linked by a pin in a slot, made the Moon pointer speed up and slow down, copying the Moon's real, uneven motion across the sky.",
    oneMoreThing:
      'A dial on the back tracked the four-year cycle of Greek games, including the Olympics. Nothing of comparable mechanical complexity is known to survive from the next thousand years.',
    facts: [
      'About 30 bronze gears survive among 82 corroded fragments.',
      'The ship sank around 70–60 BCE; the device itself may be older.',
      'Its eclipse dial follows the Saros cycle of 223 lunar months.',
    ],
    stat: { value: '30', label: 'Surviving gears' },
    certainty: 'established',
    moods: ['mind-bending', 'surprising'],
    keywords: ['antikythera mechanism', 'ancient computer', 'greek astronomy', 'gears', 'shipwreck', 'eclipse prediction'],
    relatedTopics: ['moon-same-side', 'cuneiform', 'gps', 'pyramid-builders'],
    icon: 'cog',
    difficulty: 3,
    estimatedReadTime: 60,
    source: {
      label: 'Freeth et al. (2006), Nature: Decoding the ancient Greek astronomical calculator known as the Antikythera Mechanism',
      url: 'https://doi.org/10.1038/nature05357',
    },
  },
  {
    id: 'pyramid-builders',
    description:
      "The Giza pyramids were built by Egyptian workers, not slaves. Mark Lehner's excavations found their town beside the plateau, with bakeries and long barracks, and Zahi Hawass uncovered their tombs nearby. A skilled permanent crew worked alongside rotating teams of labourers, many likely conscripted as a form of tax.",
    shortFact: "Pyramid work gangs left graffiti naming themselves, including 'Friends of Khufu' and 'Drunkards of Menkaure'.",
    interestingFact:
      "Workers who died were buried in tombs near the king's pyramid, with bread and beer for the afterlife. Their skeletons show set fractures and healed amputations, evidence of medical care.",
    oneMoreThing:
      'In 2013, archaeologists at Wadi al-Jarf on the Red Sea found the logbook of an official named Merer. It records his crew shipping limestone to Giza for the Great Pyramid, and is among the oldest inscribed papyri known.',
    facts: [
      'Herodotus, writing two millennia later, put the workforce at 100,000 men.',
      'The slave image owes more to later tradition and Hollywood than to evidence.',
      "The Great Pyramid was the world's tallest building for roughly 3,800 years.",
    ],
    stat: { value: '~4,500 yrs', label: "Merer's logbook" },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['pyramids', 'giza', 'pyramid builders', 'ancient egypt', 'slaves myth', 'khufu', 'workers village'],
    relatedTopics: ['roman-concrete', 'cuneiform', 'antikythera', 'here-be-dragons'],
    icon: 'pyramid',
    difficulty: 2,
    estimatedReadTime: 60,
    source: {
      label: 'Harvard Magazine (2003): Who Built the Pyramids?',
      url: 'https://www.harvardmagazine.com/2003/07/who-built-the-pyramids-html',
    },
  },
  {
    id: 'printing-press',
    description:
      "Movable type first appeared in China in the 1040s, when a commoner named Bi Sheng made characters from fired clay. Korean printers later cast type in metal. By the 1450s Johannes Gutenberg had built Europe's system of cast metal type, oil-based ink and a screw press, with no clear evidence he knew of Asian work.",
    shortFact: "Movable type was invented in China four centuries before Gutenberg's press.",
    interestingFact:
      'Chinese printers kept carving whole woodblocks for centuries: a script with thousands of characters made setting type slow and costly. An alphabet of a few dozen letters suited movable type far better.',
    oneMoreThing:
      'The oldest surviving book printed with movable metal type is Korean: the Jikji, printed at a temple in Cheongju in 1377, 78 years before the Gutenberg Bible. Its one surviving volume is in Paris.',
    facts: [
      "Our account of Bi Sheng comes from Shen Kuo's Dream Pool Essays, written around 1088.",
      'Around 1300, the official Wang Zhen had more than 60,000 wooden characters carved.',
      "Gutenberg's Bible, finished around 1455, survives in about 49 copies, some incomplete.",
    ],
    stat: { value: '1040s', label: 'Clay type, China' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['printing press', 'movable type', 'gutenberg', 'bi sheng', 'jikji', 'printing history', 'korea'],
    relatedTopics: ['helvetica', 'cuneiform', 'qwerty', 'telephone-words'],
    icon: 'type',
    difficulty: 2,
    estimatedReadTime: 60,
    source: {
      label: 'Bibliothèque nationale de France: Jikji, a treasure of the world of printing',
      url: 'https://www.bnf.fr/en/jikji-treasure-world-printing',
    },
  },
  {
    id: 'velcro',
    description:
      'After a hike that left burrs clinging to his dog and his trousers, Swiss engineer George de Mestral put one under a microscope. It was covered in tiny hooks that caught on loops of fabric and fur. He spent years copying the idea in woven nylon, and patented the result in 1955.',
    shortFact: 'The hooks on a burr gave one engineer the idea for a fastener used from shoes to spacecraft.',
    interestingFact:
      'Early hooks and loops were the wrong size and did not grip well. Working with a weaver in France, de Mestral found that nylon, not cotton, made the best hooks.',
    oneMoreThing:
      "The burr's hooks exist to travel: they snag passing animals so the plant's seeds are carried far from the parent. Velcro turns that seed-dispersal trick into a product.",
    facts: [
      "The name joins French 'velours' (velvet) and 'crochet' (hook).",
      'The burrs are generally identified as burdock, a common weed of field edges.',
      'NASA used hook-and-loop fasteners to keep objects in place aboard spacecraft.',
    ],
    stat: { value: '1955', label: 'Patented' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['velcro', 'hook and loop', 'biomimicry', 'burdock', 'george de mestral', 'burrs', 'fastener'],
    relatedTopics: ['zipper', 'post-it', 'chili-heat', 'lego-1958'],
    icon: 'sprout',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Lemelson-MIT: George de Mestral',
      url: 'https://lemelson.mit.edu/resources/george-de-mestral',
    },
  },
  {
    id: 'post-it',
    description:
      'In 1968 Spencer Silver, a chemist at 3M, was trying to make a strong adhesive and produced a weak one instead. It stuck lightly, peeled off cleanly and could be reused. For years nobody at the company could find a use for it.',
    shortFact: "A choir singer's falling bookmarks turned a useless glue into one of 3M's most successful products.",
    interestingFact:
      'The use came from Art Fry, a 3M colleague whose scrap-paper bookmarks kept falling out of his church choir hymnal. A lightly sticky bookmark soon became a sticky note.',
    oneMoreThing:
      "Early test sales, as 'Press 'n Peel', had mixed results. Then 3M gave out free samples in Boise, Idaho, where about 90 per cent of people who tried them said they would buy; the national launch came in 1980.",
    facts: [
      'The canary yellow was chance: a neighbouring lab had only yellow scrap paper.',
      'Silver spent about five years trying to interest colleagues in his adhesive.',
      'Two colleagues reworked the glue so it stayed on the note, not the surface.',
    ],
    stat: { value: '12 years', label: 'Glue to shelves' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['post-it', 'sticky notes', '3m', 'spencer silver', 'art fry', 'adhesive', 'happy accident'],
    relatedTopics: ['velcro', 'microwave', 'lego-1958', 'price-99'],
    icon: 'sticky-note',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'MNopedia, Minnesota Historical Society: Post-it Notes',
      url: 'https://www.mnhs.org/mnopedia/search/index/thing/post-it-notes',
    },
  },
  {
    id: 'languages-endangered',
    description:
      'Ethnologue, the language catalogue run by SIL International, counts just over 7,100 living languages and classes roughly two in five as endangered. Many have fewer than 1,000 users left. Most decline quietly, as parents raise children in a more dominant language.',
    shortFact: "Roughly two in five of the world's 7,100-plus languages are endangered, Ethnologue estimates.",
    interestingFact:
      'Endangerment is about children, not headcounts. A language with thousands of elderly speakers can be in more danger than a small one that children still learn at home.',
    oneMoreThing:
      'A 2021 study of 6,511 languages found that contact with other languages was not, by itself, a driver of loss. Denser road networks and more years of schooling were both linked to greater endangerment.',
    facts: [
      "Just 23 languages account for more than half the world's population, says Ethnologue.",
      'Papua New Guinea alone has around 840 living languages.',
      'Without intervention, one study projects language loss could triple within 40 years.',
    ],
    stat: { value: '~40%', label: 'Endangered' },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['endangered languages', 'language extinction', 'ethnologue', 'linguistic diversity', 'minority languages', 'language revival'],
    relatedTopics: ['silbo-gomero', 'cuneiform', 'telephone-words', 'printing-press'],
    icon: 'languages',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Bromham et al. (2021), Nature Ecology & Evolution: Global predictors of language endangerment and the future of linguistic diversity',
      url: 'https://doi.org/10.1038/s41559-021-01604-y',
    },
  },
  {
    id: 'silbo-gomero',
    description:
      "On La Gomera in the Canary Islands, people can hold conversations by whistling Spanish. Silbo Gomero turns speech into rising and falling whistles that can carry for kilometres across the island's steep ravines. Since 1999 it has been taught in the island's schools.",
    shortFact: 'Whistlers on La Gomera can send a full Spanish sentence across a valley without speaking.',
    interestingFact:
      'A whistle cannot copy every speech sound, so Silbo carries vowels mainly as pitch and consonants as glides and breaks. Listeners fill the gaps from context, as readers decode text with missing letters.',
    oneMoreThing:
      'Brain scans show that trained whistlers process Silbo in the same left-hemisphere language areas used for speech. People who do not know Silbo show no such response; to them it is just whistling.',
    facts: [
      'UNESCO added Silbo Gomero to its list of intangible heritage in 2009.',
      'Whistled forms of other languages exist in dozens of communities, from Turkey to Mexico.',
      'Whistling on La Gomera predates the Castilian conquest of the fifteenth century.',
    ],
    stat: { value: '2009', label: 'UNESCO-listed' },
    certainty: 'established',
    moods: ['beautiful', 'surprising', 'strange'],
    keywords: ['silbo gomero', 'whistled language', 'la gomera', 'canary islands', 'whistling', 'spanish', 'unesco'],
    relatedTopics: ['languages-endangered', 'whale-song', 'voice-recording', 'music-chills'],
    icon: 'audio-lines',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'Carreiras et al. (2005), Nature: Neural processing of a whistled language',
      url: 'https://doi.org/10.1038/433031a',
    },
  },
  {
    id: 'telephone-words',
    description:
      "Language often outlives the machines it describes. We still 'dial' numbers on phones with no dial and 'hang up' phones with no hook. In Britain people 'ring off', a phrase that likely comes from early phones, where callers cranked a handle to tell the operator they were done.",
    shortFact: "We 'hang up' phones with nothing to hang and 'dial' numbers on flat glass.",
    interestingFact:
      "'Dial' first meant a timekeeper, from Latin dies, 'day'. Phones borrowed it around 1900 for the rotating finger wheel, and 'to dial' a call is recorded by 1918.",
    oneMoreThing:
      "It has happened before. A 'dashboard' was once a board that stopped horses' hooves flinging mud at carriage passengers; the word simply moved into the car.",
    facts: [
      "Bell's push-button Touch-Tone phones arrived in 1963, yet 'dial' survived the switch.",
      "The Oxford English Dictionary's earliest telephone 'hang up' dates from 1912.",
      "'Ringtone' grew out of the older telephone term 'ringing tone'.",
    ],
    stat: { value: '1912', label: "First 'hang up'" },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['dial', 'hang up', 'ring off', 'telephone', 'etymology', 'language change', 'obsolete words'],
    relatedTopics: ['qwerty', 'frequency-illusion', 'languages-endangered', 'undersea-cables'],
    icon: 'phone-off',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'The Grammarphobia Blog (2016): Dial A for anachronism',
      url: 'https://grammarphobia.com/blog/2016/11/dial.html',
    },
  },
];
