import type { Entry } from '../../model/types';

export const entries: Entry[] = [
  // ── Architecture ──────────────────────────────────────────────
  {
    id: 'brick-frog',
    title: 'The dent in a brick is there on purpose',
    category: 'architecture',
    subcategory: 'Building materials',
    visual: { kind: 'object', image: 'brick-frog' },
    description:
      'Many clay bricks have a shallow hollow pressed into one face, called a frog. It saves clay, makes the brick lighter and easier to release from its mould, and may help heat reach the middle in the kiln. Laid frog-up and filled with mortar, it also gives the wall better resistance to shearing.',
    shortFact: 'The hollow in a brick is called a frog, and it is meant to face up.',
    interestingFact:
      'An empty frog is a weak spot. If the hollows are not filled with mortar, the wall loses strength and performs worse at blocking heat and sound.',
    oneMoreThing:
      "The name may come from the Dutch word kikker, meaning frog, which sounds like 'kicker': the raised block in a wooden brick mould that pushed the soft clay out towards the corners.",
    facts: [
      'Some bricks have a frog on two faces; the larger one should face up.',
      'Concrete kerbstones can have frogs too, filled with concrete as they are laid.',
      'Frogged bricks may be specified for walls that need to block sound.',
    ],
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['brick', 'frog', 'mortar', 'masonry', 'kiln', 'bricklaying'],
    relatedTopics: ['reinforced-concrete', 'sticky-rice-mortar', 'roman-concrete', 'brunelleschi-dome'],
    icon: 'brick-wall',
    difficulty: 1,
    estimatedReadTime: 40,
    source: { label: 'Designing Buildings Wiki: Frog', url: 'https://www.designingbuildings.co.uk/wiki/Frog' },
  },
  {
    id: 'brunelleschi-dome',
    title: "Florence's great dome went up without a wooden frame",
    category: 'architecture',
    subcategory: 'Engineering',
    visual: { kind: 'object', image: 'brunelleschi-dome' },
    description:
      "Masonry domes were normally built over a timber frame, called centring, that held the bricks until the mortar set. Brunelleschi built Florence Cathedral's dome without one. He laid the bricks in a herringbone pattern, and each finished ring tightened the structure and held itself in balance.",
    shortFact: 'Perhaps four million bricks went up with no wooden frame to hold them while they set.',
    interestingFact:
      'The courses lean ever further inwards as the dome rises towards its closing ring. The herringbone bond kept each fresh course stable before its mortar had hardened.',
    oneMoreThing:
      "The dome is not a hemisphere. Its ribs follow a 'pointed fifth' curve, with a radius four-fifths of the base's width, which makes it far taller than a round dome on the same base.",
    facts: [
      'The dome is estimated to weigh about 37,000 tonnes.',
      'Its octagonal base measures about 54 metres between opposite sides.',
      'The marble lantern on top is about 22 metres tall.',
    ],
    stat: { value: '37,000 t', label: 'Estimated weight' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['florence', 'brunelleschi', 'dome', 'herringbone', 'brick', 'renaissance', 'centring'],
    relatedTopics: ['pantheon-dome', 'flying-buttress', 'brick-frog', 'gateway-arch-catenary'],
    icon: 'landmark',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Museo Galileo, Florence: The dome structure',
      url: 'https://brunelleschi.imss.fi.it/itineraries/multimedia/TheDomeStructure.html',
    },
  },
  {
    id: 'windcatcher-badgir',
    title: "Yazd's towers cooled homes long before electricity",
    category: 'architecture',
    subcategory: 'Climate design',
    visual: { kind: 'object', image: 'windcatcher-badgir' },
    description:
      'In the Iranian desert city of Yazd, tall towers called badgirs rise from old mud-brick houses. They pull passing breezes down into the rooms below, while warm air escapes through large vertical slots. The city has around 700 of them, and they need no power at all.',
    shortFact: 'A tower with slots at the top can draw a breeze down into a desert house.',
    interestingFact: 'Summer temperatures in Yazd climb well above 40 °C. Windcatchers helped the city prosper as a caravan stop on the ancient Silk Road.',
    oneMoreThing:
      'The idea is being borrowed again. Buildings at Masdar City in the United Arab Emirates were designed for natural ventilation like that of badgirs, and architects compare them to termite-inspired cooling in Harare.',
    facts: [
      "The oldest of Yazd's windcatchers dates from the 14th century.",
      'The windcatcher in Dowlatabad garden is about 33 metres tall.',
      'UNESCO listed the historic city of Yazd as World Heritage in 2017.',
    ],
    stat: { value: '700', label: 'Windcatchers in Yazd' },
    certainty: 'established',
    moods: ['useful', 'beautiful'],
    keywords: ['windcatcher', 'badgir', 'yazd', 'iran', 'ventilation', 'cooling', 'desert'],
    relatedTopics: ['termite-eastgate', 'igloo-warmth', 'tall-ceilings', 'rani-ki-vav-stepwell'],
    icon: 'wind',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: "Al-Monitor (AFP): Iran's ancient wind catchers beat the heat naturally",
      url: 'https://www.al-monitor.com/originals/2023/07/irans-ancient-wind-catchers-beat-heat-naturally',
    },
  },
  {
    id: 'dougong-brackets',
    title: 'Chinese temple roofs rest on stacks of wooden brackets',
    category: 'architecture',
    subcategory: 'Structure',
    visual: { kind: 'object', image: 'dougong-brackets' },
    description:
      'Traditional Chinese timber halls carry their heavy roofs on dougong: clusters of wooden blocks and arms stacked between column and beam. The pieces are held by joinery, wooden dowels and the weight above rather than metal fasteners. When the ground shakes, the blocks can slide and rub against each other.',
    shortFact: 'Stacked wooden brackets under a temple roof can behave like a shock absorber.',
    interestingFact:
      'Japanese researchers testing models of multi-layered bracket sets found they acted like a wooden damper, with much of their resistance coming from friction between the bearing blocks and beams.',
    oneMoreThing:
      'Each tier of arms reaches a little further out than the one below. That is how the deep, curving eaves of East Asian temples can project so far beyond the walls they sit on.',
    facts: [
      "In Chinese, 'dou' means block and 'gong' means bracket arm.",
      'A typical set begins with a block seated on top of a column.',
      'Similar bracket systems appear in old temples in Japan and Korea.',
    ],
    certainty: 'debated',
    caveat: 'Laboratory results vary, and how much bracket sets alone protect a whole building in an earthquake is still being studied.',
    moods: ['surprising', 'beautiful'],
    keywords: ['dougong', 'bracket', 'timber', 'china', 'temple', 'earthquake', 'joinery'],
    relatedTopics: ['pagoda-shinbashira', 'taipei-101-damper', 'kongo-gumi-578', 'brunelleschi-dome'],
    icon: 'layers',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'JSPS KAKEN: multi-layered bracket complexes as wood dampers',
      url: 'https://kaken.nii.ac.jp/grant/KAKENHI-PROJECT-21K04352',
    },
  },
  {
    id: 'rani-ki-vav-stepwell',
    title: 'An Indian stepwell was saved by being buried in silt',
    category: 'architecture',
    subcategory: 'Water',
    visual: { kind: 'photo', image: 'rani-ki-vav-stepwell' },
    description:
      'Rani ki Vav in Patan, Gujarat, is a stepwell: a stone stairway descending seven storeys to groundwater, lined with carved pavilions like an upside-down temple. Built in the 11th century, it was later flooded by the Saraswati river and filled with silt, which protected its carvings for centuries.',
    shortFact: 'A thousand-year-old well that steps down seven storeys like an inverted temple.',
    interestingFact:
      'Outside the summer monsoon, western India can go months without rain. Stepwells let people walk down to water that lay far below the surface in the dry season.',
    oneMoreThing:
      'Around 3,000 stepwells were built in India between about 600 CE and the 1850s. Many have been destroyed or left to decay, which makes the buried and well-preserved Rani ki Vav unusual.',
    facts: [
      'It is traditionally linked to a queen named Udayamati.',
      'The Archaeological Survey of India began excavating it in the 1960s.',
      'Its walls are crowded with carved figures of Hindu deities.',
    ],
    stat: { value: '7', label: 'Storeys deep' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['stepwell', 'rani ki vav', 'gujarat', 'india', 'water', 'silt', 'patan'],
    relatedTopics: ['windcatcher-badgir', 'djenne-mosque', 'pompeii-street-food', 'roman-concrete'],
    icon: 'droplets',
    difficulty: 1,
    estimatedReadTime: 45,
    source: { label: 'CyArk: Rani ki Vav', url: 'https://www.cyark.org/projects/rani-ki-vav' },
  },

  // ── Food ──────────────────────────────────────────────────────
  {
    id: 'pomegranate-sarcotesta',
    title: "A pomegranate's juicy jewels are not arils",
    category: 'food',
    subcategory: 'Botany',
    visual: { kind: 'object', image: 'pomegranate-sarcotesta' },
    description:
      "The red jewels inside a pomegranate are often called arils, but botanists say that is a mistake. Each one is a whole seed, and its juicy outside is the seed coat itself, swollen into a fleshy layer called the sarcotesta. A true aril grows from the seed's stalk instead.",
    shortFact: 'Each juicy red jewel is a whole seed wearing its own swollen seed coat.',
    interestingFact:
      "Researchers in Spain followed the seeds through ripening and watched the outer coat's cells swell into the sweet, sharp pulp. Botanically, the pomegranate has no arils at all.",
    oneMoreThing:
      "The mix-up has spread well beyond kitchens. The researchers found 'aril' used for pomegranate seeds in medicine, pharmacy and cosmetics papers, which can blur which part of the fruit a study actually tested.",
    facts: [
      'A real aril is the lacy red mace wrapped around a nutmeg seed.',
      'Inside the pulp sits a crunchy seed holding the embryo.',
      "Much of the fruit's polyphenols are concentrated in the sarcotesta.",
    ],
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['pomegranate', 'aril', 'sarcotesta', 'seed', 'botany', 'fruit'],
    relatedTopics: ['nutmeg-banda', 'strawberry-not-berry', 'cashew-apple', 'brazil-nut-agouti'],
    icon: 'cherry',
    difficulty: 2,
    estimatedReadTime: 45,
    source: {
      label: "Melgarejo et al., Foods (2024): Pomegranate and the 'aril' misconception",
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10814753/',
    },
  },
  {
    id: 'peanut-underground',
    title: 'Peanuts flower in the air and fruit underground',
    category: 'food',
    subcategory: 'Botany',
    visual: { kind: 'object', image: 'peanut-underground' },
    description:
      'A peanut plant flowers above ground. After fertilisation, a stalk called a peg grows from beneath the flower and bends down into the soil, carrying the tiny developing pod with it. Only once it is buried in the dark does the pod begin to swell into the familiar shell.',
    shortFact: 'After flowering, a peanut plant pushes its own young fruit into the soil to ripen.',
    interestingFact:
      'The peg needs both darkness and the touch of soil to switch the pod on. Pegs that never reach the ground usually abort, which is why soil penetration matters so much for yield.',
    oneMoreThing:
      "Peanuts are not nuts but legumes, in the pea and bean family. Their flowers pollinate themselves before opening, and the plant's scientific name, Arachis hypogaea, means it develops below the earth.",
    facts: [
      'Botanists call fruiting below ground geocarpy.',
      'The peg is also known as a gynophore.',
      'The embryo pauses growing while the peg grows, then restarts underground.',
    ],
    certainty: 'established',
    moods: ['strange', 'surprising'],
    keywords: ['peanut', 'groundnut', 'legume', 'peg', 'geocarpy', 'botany'],
    relatedTopics: ['cashew-apple', 'pistachio-split', 'brazil-nut-agouti', 'strawberry-not-berry'],
    icon: 'sprout',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Kumar et al., Frontiers in Plant Science (2019): peanut peg development',
      url: 'https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2019.01289/full',
    },
  },
  {
    id: 'pistachio-split',
    title: 'Pistachios split their own shells as they ripen',
    category: 'food',
    subcategory: 'Botany',
    visual: { kind: 'object', image: 'pistachio-split' },
    description:
      "A pistachio's shell opens on the tree, not in a factory. As the kernel grows it presses outwards until the hard shell cracks along its seam. In California about 65% of harvested nuts split naturally, and closed ones are graded lower because they are harder to sell.",
    shortFact: 'A growing pistachio kernel pushes so hard on its shell that the shell cracks open.',
    interestingFact:
      'Because splitting depends on kernel size, anything that affects how well the kernel fills changes how many nuts open. Split nuts tend to hold bigger kernels than closed ones.',
    oneMoreThing:
      'The shell is not the outermost layer. On the tree each nut wears a soft, fleshy hull that is removed during processing, much like the flesh around the stone of a peach.',
    facts: [
      'Pistachios are relatives of the cashew and the mango.',
      'Pistachio trees tend to alternate heavy and light crops from year to year.',
      "Botanically, the shell is the fruit's endocarp and the kernel is its seed.",
    ],
    stat: { value: '65%', label: 'Split naturally' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['pistachio', 'nut', 'shell', 'kernel', 'dehiscence', 'california'],
    relatedTopics: ['cashew-apple', 'peanut-underground', 'coffee-cherry', 'popcorn-pops'],
    icon: 'nut',
    difficulty: 1,
    estimatedReadTime: 40,
    source: {
      label: 'Spann, Beede and DeJong, Scientia Horticulturae (2009), UC Davis',
      url: 'https://dejong.ucdavis.edu/sites/g/files/dgvnsk8456/files/inline-files/162-Spann-et-al-2009-Pist-long-and-short-shootsHORTI3249.pdf',
    },
  },
  {
    id: 'artichoke-flower-bud',
    title: 'An artichoke is a thistle picked before it blooms',
    category: 'food',
    subcategory: 'Botany',
    visual: { kind: 'object', image: 'artichoke-flower-bud' },
    description:
      'A globe artichoke is a flower head harvested while it is still a bud. Its tough scales are bracts that wrap the flower, the tender heart is the fleshy base it grows from, and the fuzzy choke is a mass of immature florets. Left on the plant, the bud opens into a purple thistle flower.',
    shortFact: 'Leave an artichoke on the plant and it opens into a large purple thistle.',
    interestingFact:
      'The choke is the part that would have become the bloom. Each of its fine hairs is an undeveloped floret, part of what would have been a purple crown.',
    oneMoreThing:
      'Artichokes belong to the daisy and sunflower family. As with a sunflower, what looks like one flower is really a crowded head of many tiny ones.',
    facts: [
      'Plants are usually grown from shoots of an older plant rather than seed.',
      'Buds take roughly 150 to 180 days from sowing to mature.',
      'Italy is the largest producer of artichokes in the world.',
    ],
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['artichoke', 'thistle', 'flower', 'bud', 'choke', 'vegetable'],
    relatedTopics: ['saffron-crocus', 'brassica-one-species', 'vanilla-orchid', 'pomegranate-sarcotesta'],
    icon: 'flower-2',
    difficulty: 1,
    estimatedReadTime: 40,
    source: { label: 'Penn State PlantVillage: Artichoke', url: 'https://plantvillage.psu.edu/topics/artichoke/infos' },
  },
  {
    id: 'brazil-nut-agouti',
    title: 'Brazil nuts depend on big bees and a forgetful rodent',
    category: 'food',
    subcategory: 'Ecology',
    visual: { kind: 'object', image: 'brazil-nut-agouti' },
    description:
      'Brazil nuts grow packed inside a round, woody fruit that can weigh 2.5 kilograms. The flowers open only to bees strong enough to prise up a tight hood, and the fallen fruit is so hard that few animals besides agoutis can gnaw into it. Agoutis eat some seeds and bury others.',
    shortFact: 'New Brazil nut trees often sprout from seeds an agouti buried and then forgot.',
    interestingFact:
      'A forgotten cache may germinate 12 to 18 months later. Agoutis and squirrels may be the only animals that can chew efficiently through the woody fruit wall.',
    oneMoreThing:
      'Nearly the whole harvest still comes from wild trees. The flowers need cross-pollination by large, solitary bees that cannot be moved between orchards in hives, one reason plantations have struggled.',
    facts: [
      'Each fruit holds roughly 10 to 25 nuts, packed like segments.',
      'Collectors gather the fruit soon after it falls, before insects and animals do.',
      'Each nut is a seed with its own hard, bony coat.',
    ],
    stat: { value: '2.5 kg', label: 'Heaviest fruits' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['brazil nut', 'agouti', 'amazon', 'bees', 'pollination', 'seed dispersal'],
    relatedTopics: ['avocado-megafauna', 'cashew-apple', 'vanilla-orchid', 'pomegranate-sarcotesta'],
    icon: 'trees',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'New York Botanical Garden, S. A. Mori: The Brazil nut industry',
      url: 'https://sweetgum.nybg.org/science/vh/narratives-details/?irn=18',
    },
  },

  // ── Culture ───────────────────────────────────────────────────
  {
    id: 'card-suits-france',
    title: 'Hearts, spades, clubs and diamonds were a French shortcut',
    category: 'culture',
    subcategory: 'Games',
    visual: { kind: 'object', image: 'card-suits-france' },
    description:
      'The familiar suits were invented by French cardmakers around 1470. Earlier European cards used detailed suit signs cut into woodblocks. The French reduced them to flat red and black shapes that could be printed quickly and cheaply with stencils, an efficiency that helped their design spread worldwide.',
    shortFact: 'Simple red and black suits let 15th-century French cardmakers print with stencils.',
    interestingFact:
      'Three of the four were probably adapted from German suits of leaves, hearts and hawk bells. The French names translate as spearheads, hearts, trefoils and squares.',
    oneMoreThing:
      'The English imported their cards largely from Rouen, a major French printing centre. From England the French suits reached the American colonies and, in time, most of the world.',
    facts: [
      'The first European cards were hand-painted, so only the wealthy could afford them.',
      'Woodcut printing later allowed whole sheets of cards to be mass-produced.',
      "In French, the club suit is 'trèfle', meaning trefoil or clover.",
    ],
    stat: { value: 'c. 1470', label: 'Suits invented' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['playing cards', 'suits', 'hearts', 'spades', 'france', 'stencil', 'card games'],
    relatedTopics: ['tarot-card-game', 'chess-queen', 'nintendo-hanafuda', 'printing-press'],
    icon: 'spade',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'International Playing-Card Society: French cards',
      url: 'https://i-p-c-s.org/faq/history_6.php',
    },
  },
  {
    id: 'happy-birthday-tune',
    title: 'The birthday song began as a classroom good morning',
    category: 'culture',
    subcategory: 'Music',
    visual: { kind: 'photo', image: 'happy-birthday-tune' },
    description:
      "The tune of 'Happy Birthday to You' first appeared as 'Good Morning to All', a greeting for young children. Mildred Hill wrote the melody and her sister Patty the words, and it was published in their book Song Stories for the Kindergarten. The birthday words came later.",
    shortFact: 'Before it was sung over cakes, the tune greeted kindergarten pupils each morning.',
    interestingFact:
      'The sisters wanted a song that was very simple to sing yet musically interesting. Patty was running a kindergarten training school in Louisville, Kentucky, when she wrote the words.',
    oneMoreThing:
      'As birthday parties grew more popular, songbooks printed the melody with new words. In 1935 a publisher copyrighted an arrangement pairing them, and that claim underpinned decades of licensing fees.',
    facts: [
      'The melody was first copyrighted in 1893, under its original title.',
      'Guinness World Records has listed it among the most often sung English songs.',
      'Patty Hill later became a professor at Teachers College, Columbia University.',
    ],
    stat: { value: '1893', label: 'Melody copyrighted' },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['happy birthday', 'song', 'melody', 'kindergarten', 'hill sisters', 'copyright'],
    relatedTopics: ['concert-pitch', 'music-chills', 'piano-soft-loud', 'bone-flutes'],
    icon: 'cake',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'US Copyright Office: Happy Birthday to a famous song (2010)',
      url: 'https://www.copyright.gov/history/lore/pdfs/201004%20CLore_April2010.pdf',
    },
  },
  {
    id: 'piano-soft-loud',
    title: 'The piano is named for playing soft and loud',
    category: 'culture',
    subcategory: 'Music',
    visual: { kind: 'object', image: 'piano-soft-loud' },
    description:
      "Around 1700 Bartolomeo Cristofori, a harpsichord maker at the Medici court in Florence, built a keyboard whose strings were struck by small hammers instead of plucked. Unlike a harpsichord, it played softly or loudly depending on the player's touch. That gave it its name: piano e forte, soon pianoforte.",
    shortFact: 'A harpsichord sounds the same however hard you press its keys; a piano does not.',
    interestingFact:
      "Cristofori's key invention was the escapement. The hammer is released just before it reaches the string, so it strikes and falls straight back, leaving the string free to ring.",
    oneMoreThing:
      "Only three of Cristofori's pianos survive, in New York, Rome and Leipzig. With wooden frames and thin strings, they sounded closer to a harpsichord than to a modern concert grand.",
    facts: [
      'Cristofori came from Padua and was recruited by Prince Ferdinando de’ Medici.',
      'Metal frames arrived in the early 19th century, allowing heavier strings.',
      "Today's piano actions still descend directly from his design.",
    ],
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['piano', 'pianoforte', 'cristofori', 'harpsichord', 'keyboard', 'hammer'],
    relatedTopics: ['concert-pitch', 'stradivarius-test', 'happy-birthday-tune', 'bone-flutes'],
    icon: 'piano',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Linda Hall Library: Bartolomeo Cristofori',
      url: 'https://www.lindahall.org/about/news/scientist-of-the-day/bartolomeo-cristofori/',
    },
  },
  {
    id: 'kintsugi-gold-repair',
    title: "Kintsugi's gold is dusted onto a glue made from tree sap",
    category: 'culture',
    subcategory: 'Craft',
    visual: { kind: 'object', image: 'kintsugi-gold-repair' },
    description:
      'Kintsugi repairs broken ceramics so the cracks shine. The real work is done by urushi, a lacquer made from tree sap, which traditionally bonds the pieces and coats the join lines. Fine gold powder is tapped onto the urushi before it has fully set, then burnished once hard.',
    shortFact: 'The glittering seams are mostly lacquer; the gold is a fine dusting on top.',
    interestingFact: 'Urushi hardens best in moist air, so restorers cure it in a sealed, humid box. A single stage can take a week to set completely.',
    oneMoreThing:
      'The urushi tree belongs to the same family as poison ivy, and its sap can irritate the skin and throat. Conservators handle it with care even when practising the technique.',
    facts: [
      'In 16th-century Japan, kintsugi let people keep using a broken pot.',
      'Traditionally, urushi mixed with rice glue bonds the fragments together.',
      'Cheaper brass powder can stand in for gold when practising.',
    ],
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['kintsugi', 'urushi', 'lacquer', 'ceramics', 'repair', 'japan', 'gold'],
    relatedTopics: ['iron-gall-ink', 'ultramarine-gold', 'willow-pattern-legend', 'sticky-rice-mortar'],
    icon: 'sparkles',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'LACMA Unframed: practising kintsugi in the conservation lab',
      url: 'https://unframed.lacma.org/node/3089',
    },
  },
  {
    id: 'willow-pattern-legend',
    title: 'The willow pattern came first; its love story came later',
    category: 'culture',
    subcategory: 'Design history',
    visual: { kind: 'object', image: 'willow-pattern-legend' },
    description:
      'Blue-and-white willow pattern plates look like illustrations of an old Chinese legend. In fact the design was created in England around 1780, based on Chinese export porcelain. The familiar tale of the lovers Koong-se and Chang was set out in a magazine article in 1849.',
    shortFact: 'The story told about willow pattern plates was published decades after the design.',
    interestingFact:
      'The design has fixed ingredients: a pagoda, three figures on a bridge, a figure in a boat, two flying birds and a weeping willow. The story gives each one a part to play.',
    oneMoreThing:
      'The pattern is usually credited to Thomas Minton, working for the Caughley factory in Shropshire. He moved to Spode in Staffordshire in 1784, and factories across Britain went on to print their own versions.',
    facts: [
      'In the story, the two birds are the lovers turned into doves.',
      'The 1849 version appeared in a magazine called The Family Friend.',
      'Willow pattern was printed onto pottery from engraved designs, not painted by hand.',
    ],
    stat: { value: 'c. 1780', label: 'Design created' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['willow pattern', 'ceramics', 'blue and white', 'china', 'spode', 'legend', 'plate'],
    relatedTopics: ['kintsugi-gold-repair', 'card-suits-france', 'greek-statues-painted', 'ultramarine-gold'],
    icon: 'utensils',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Victoria Gallery & Museum, University of Liverpool: Story of the Willow Pattern',
      url: 'https://vgm.liverpool.ac.uk/blog/2021/willow-pattern/',
    },
  },

  // ── Business ──────────────────────────────────────────────────
  {
    id: 'parmesan-bank-vault',
    title: 'An Italian bank lends money against wheels of Parmesan',
    category: 'business',
    subcategory: 'Banking',
    visual: { kind: 'object', image: 'parmesan-bank-vault' },
    description:
      "Parmigiano Reggiano must age for at least a year before it can be sold, yet dairies pay farmers every month. For more than a century, Credem bank has bridged that gap by taking wheels as collateral. The cheese ages in the bank's climate-controlled warehouses while the loan runs.",
    shortFact: 'Italian cheesemakers can borrow money by lodging their maturing cheese with a bank.',
    interestingFact:
      "Producers typically receive 60 to 80% of a wheel's value up front. The warehouse doubles as a vault, assuring the bank that pledged wheels exist and are in good condition.",
    oneMoreThing:
      "The bank's warehouses hold about 500,000 wheels, worth around €325 million. Staff walk the aisles daily checking for cracks and swelling, because this collateral is still changing as it ages.",
    facts: [
      'Parmigiano Reggiano is made only from milk, salt and rennet.',
      'At 12 months, inspectors tap each wheel with a hammer to listen for flaws.',
      'Many wheels are aged for 24 months or longer.',
    ],
    stat: { value: '500,000', label: 'Wheels in storage' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['parmesan', 'parmigiano reggiano', 'bank', 'collateral', 'loan', 'cheese', 'italy'],
    relatedTopics: ['banks-create-money', 'cheese-holes', 'lloyds-coffee-house', 'tulip-mania'],
    icon: 'vault',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: "CNN via CP24: Inside Italy's 'Cheese Bank' (2026)",
      url: 'https://www.cp24.com/news/world/2026/05/02/inside-italys-secret-cheese-bank-where-parmigiano-reggiano-becomes-financial-gold/',
    },
  },
  {
    id: 'nintendo-hanafuda',
    title: 'Nintendo began in 1889 as a maker of flower cards',
    category: 'business',
    subcategory: 'Company history',
    visual: { kind: 'object', image: 'nintendo-hanafuda' },
    description:
      'Nintendo was founded in Kyoto in 1889 to make and sell hanafuda, Japanese playing cards decorated with plants and flowers of the twelve months. In 1902 it made the first Western-style playing cards in Japan. Its first home video game machines did not arrive until 1977.',
    shortFact: "Long before video games, Nintendo's business was printing cards for a traditional Japanese game.",
    interestingFact:
      'Cards stayed central for decades. In 1953 it became the first company in Japan to mass-produce plastic playing cards, and in 1959 it began selling cards with Disney characters.',
    oneMoreThing:
      'The company was called Nintendo Playing Card Co. until 1963, when it dropped the cards from its name. It was still automating hanafuda production in 1968, nine years before its first home console.',
    facts: [
      'A standard hanafuda deck has 48 cards in twelve monthly suits.',
      "Nintendo's shares were first listed on stock exchanges in 1962.",
      'In 1973 it built a laser clay-shooting game for leisure venues.',
    ],
    stat: { value: '1889', label: 'Founded' },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['nintendo', 'hanafuda', 'playing cards', 'kyoto', 'company history', 'video games'],
    relatedTopics: ['card-suits-france', 'tarot-card-game', 'lego-1958', 'kongo-gumi-578'],
    icon: 'flower',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Nintendo: Company history',
      url: 'https://www.nintendo.co.jp/corporate/en/history/index.html',
    },
  },
  {
    id: 'michelin-guide-tyres',
    title: 'The Michelin Guide was made to wear out tyres',
    category: 'business',
    subcategory: 'Marketing',
    visual: { kind: 'object', image: 'michelin-guide-tyres' },
    description:
      'In 1900 France had fewer than 3,000 cars, and the Michelin brothers made tyres. Their pocket-sized red guide told drivers where to fill up, repair a car, sleep and eat. The idea was simple: the more people drove, the more tyres they would wear out and replace.',
    shortFact: 'A tyre company invented a famous restaurant guide to get people driving further.',
    interestingFact:
      'For a while the guide was given away free. According to the company, that changed after André Michelin saw a copy propping up a bench in a garage.',
    oneMoreThing:
      "Restaurants became the guide's fame only later. By the late 1920s its recommendations were influential enough that Michelin hired undercover diners, now called inspectors, to award stars.",
    facts: [
      'The Michelin brothers founded their tyre company in Clermont-Ferrand in 1888.',
      'More than 30 million Michelin guides have been sold.',
      'A restaurant can lose its stars if inspectors find standards slipping.',
    ],
    stat: { value: 'Under 3,000', label: 'Cars in France' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['michelin', 'guide', 'tyres', 'restaurants', 'stars', 'marketing', 'france'],
    relatedTopics: ['milk-at-back', 'razor-blades-myth', 'new-coke', 'parmesan-bank-vault'],
    icon: 'book-marked',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'CNN: How did a tyre company become a restaurant rating guide? (2024)',
      url: 'https://amp.cnn.com/cnn/2024/02/10/business/michelin-guide-history',
    },
  },
  {
    id: 'bubble-wrap-wallpaper',
    title: 'Bubble Wrap was first meant to be textured wallpaper',
    category: 'business',
    subcategory: 'Product history',
    visual: { kind: 'object', image: 'bubble-wrap-wallpaper' },
    description:
      'In the late 1950s a New York designer asked two inventors in New Jersey to make a textured wallpaper. The bubbly plastic they created never caught on as decoration. It found its real job as cushioning, and their company, Sealed Air, has sold it as Bubble Wrap since 1960.',
    shortFact: 'A favourite packing material began as a failed idea for decorating walls.',
    interestingFact:
      'Its growth was driven by electronics. The transistor, and later the personal computer, turned the shipping of delicate components into a vast business that needed light, protective packing.',
    oneMoreThing:
      'Air is not injected into each bubble. It is trapped between two plastic sheets as they pass over rollers, one of which presses in the hollows that become the bubbles.',
    facts: [
      'Company lore says clouds seen from a plane suggested its use as cushioning.',
      'The Museum of Modern Art featured Bubble Wrap in a 2009 exhibition.',
      'It was made in a small lab in New Jersey.',
    ],
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['bubble wrap', 'packaging', 'sealed air', 'wallpaper', 'invention', 'plastic'],
    relatedTopics: ['play-doh-wallpaper-cleaner', 'post-it', 'memory-foam', 'shopping-trolley'],
    icon: 'package',
    difficulty: 1,
    estimatedReadTime: 40,
    source: {
      label: 'NBC News (AP): Bubble Wrap celebrating its 50th birthday',
      url: 'https://www.nbcnews.com/id/wbna35046691',
    },
  },
  {
    id: 'kongo-gumi-578',
    title: 'A temple builder founded in 578 is still in business',
    category: 'business',
    subcategory: 'Company history',
    visual: { kind: 'photo', image: 'kongo-gumi-578' },
    description:
      'Kongō Gumi, a Japanese firm of temple carpenters, dates its founding to 578. Its first master, Kongō Shigemitsu, was one of three craftsmen invited from the Korean kingdom of Baekje to build Shitennō-ji in Osaka. His family went on to look after that temple for more than a thousand years.',
    shortFact: 'One Japanese construction firm traces more than 1,400 years of building temples.',
    interestingFact:
      'A later head of the family left sixteen rules for his successors. They include practising reading and the abacus, treating apprentices kindly and always submitting honest estimates.',
    oneMoreThing:
      'Its hardest century was the 20th. After the temple lost its lands in the Meiji era, the firm took on other work, including making wooden crates during the war. It is now part of the Takamatsu Construction Group.',
    facts: [
      "In 1934 a typhoon toppled Shitennō-ji's five-storey pagoda, and the firm rebuilt it.",
      'In the 1930s Yoshie Kongō became its first woman master builder.',
      'It became a limited company only in 1955.',
    ],
    stat: { value: '578', label: 'Year founded' },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['kongo gumi', 'oldest company', 'temple', 'carpentry', 'japan', 'shitennoji', 'family business'],
    relatedTopics: ['pagoda-shinbashira', 'dougong-brackets', 'nintendo-hanafuda', 'lloyds-coffee-house'],
    icon: 'hammer',
    difficulty: 1,
    estimatedReadTime: 50,
    source: { label: 'Kongō Gumi: Company history (Japanese)', url: 'https://www.kongogumi.co.jp/about_history.html' },
  },
];
