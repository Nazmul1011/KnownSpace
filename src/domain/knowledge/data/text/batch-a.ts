import type { KnowledgeText } from '../../model/types';

export const batchA: KnowledgeText[] = [
  {
    id: 'black-holes',
    description:
      "A black hole is a region where so much mass is packed into so little space that nothing can escape its gravity, not even light. Its boundary is called the event horizon. Most form when a massive star's core collapses; giants of millions or billions of solar masses sit at the centres of galaxies.",
    shortFact: 'Squeezed into a black hole, the Sun would be only about 6 kilometres across.',
    interestingFact:
      "Black holes are not cosmic vacuum cleaners. Far from the horizon, their gravity is like any other object's: swap the Sun for a black hole of equal mass and Earth's orbit would not change.",
    oneMoreThing:
      "In 2019 the Event Horizon Telescope, a planet-wide network of radio dishes, produced the first image of a black hole's shadow, in the galaxy M87, about 55 million light-years away.",
    facts: [
      'Nothing that crosses the event horizon, not even light, can get back out.',
      "The Milky Way's central black hole, Sagittarius A*, is about 26,000 light-years away.",
      'Gravitational waves from two colliding black holes were first detected in 2015.',
    ],
    stat: { value: '4 million Suns', label: 'Milky Way centre' },
    certainty: 'established',
    moods: ['mind-bending', 'strange'],
    keywords: ['black hole', 'black holes', 'event horizon', 'gravity', 'singularity', 'space', 'einstein', 'sagittarius a*'],
    relatedTopics: ['gps', 'stars-twinkle', 'moon-same-side', 'saturn-rings'],
    icon: 'circle-dot',
    difficulty: 3,
    estimatedReadTime: 60,
    source: { label: 'NASA Science: Black Holes', url: 'https://science.nasa.gov/universe/black-holes/' },
  },
  {
    id: 'saturn-rings',
    description:
      "Saturn's rings are countless separate pieces of water ice, with traces of rock and dust, each orbiting the planet like a tiny moon. Most range from dust-sized grains to chunks as big as a house; a few are the size of mountains. Clean ice reflects sunlight well, which is why the rings shine so brightly.",
    shortFact: "Saturn's main rings span about 270,000 kilometres, yet are often only about 10 metres thick.",
    interestingFact:
      'Each particle follows its own orbit, and the inner ones move faster than the outer ones. Small moons embedded in the rings clear gaps and sharpen their edges.',
    oneMoreThing:
      "Nobody is sure how old the rings are. Cassini's measurements suggested no more than a few hundred million years, far younger than Saturn, but some researchers argue that older rings could simply stay clean.",
    facts: [
      "Ice from the rings is slowly raining down into Saturn's atmosphere.",
      'Seen edge-on from Earth, as in March 2025, the rings almost disappear.',
      'Jupiter, Uranus and Neptune also have rings, but far fainter ones.',
    ],
    stat: { value: '~10 m', label: 'Typical thickness' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['saturn', 'rings', 'saturn rings', 'ice', 'planets', 'cassini', 'solar system'],
    relatedTopics: ['ice-floats', 'moon-same-side', 'black-holes', 'aurora'],
    icon: 'orbit',
    difficulty: 1,
    estimatedReadTime: 50,
    source: { label: 'NASA Science: Saturn Facts', url: 'https://science.nasa.gov/saturn/facts/' },
  },
  {
    id: 'moon-same-side',
    description:
      "The Moon does spin, but exactly once per orbit, about every 27.3 days, so the same face always points at Earth. This is called tidal locking. Earth's gravity stretched the young Moon slightly, and friction from that distortion slowed its spin until rotation and orbit matched.",
    shortFact: 'The Moon does spin: it turns exactly once for every trip around Earth.',
    interestingFact: 'The far side is not dark. It gets as much sunlight as the side we see; it simply always faces away from us.',
    oneMoreThing: "Thanks to a slight rocking motion called libration, we can see about 59 per cent of the Moon's surface from Earth over time, not just half.",
    facts: [
      'The Soviet probe Luna 3 photographed the far side for the first time in 1959.',
      "China's Chang'e 4 made the first soft landing on the far side in 2019.",
      'The Moon drifts about 3.8 centimetres further from Earth every year.',
    ],
    stat: { value: '27.3 days', label: 'One rotation' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['moon', 'far side', 'dark side of the moon', 'tidal locking', 'lunar', 'orbit', 'libration'],
    relatedTopics: ['moon-illusion', 'saturn-rings', 'black-holes', 'stars-twinkle'],
    icon: 'moon',
    difficulty: 2,
    estimatedReadTime: 50,
    source: { label: 'NASA Science: Tidal Locking', url: 'https://science.nasa.gov/moon/tidal-locking/' },
  },
  {
    id: 'aurora',
    description:
      "Aurorae appear when energetic electrons, ultimately powered by the solar wind, pour down Earth's magnetic field lines into the upper atmosphere. They strike oxygen and nitrogen, which give off the energy as light. Because the field steers the particles towards the poles, displays usually form rings around the Arctic and Antarctic.",
    shortFact: "The aurora's familiar green glow comes from oxygen atoms roughly 100 to 300 kilometres up.",
    interestingFact:
      'The colour depends on the gas and the height. Oxygen glows green lower down and deep red higher up, while nitrogen adds blues, purples and pinks.',
    oneMoreThing:
      'A phone camera often sees more colour than you do. In dim light the eye relies on rod cells, which cannot register colour, so faint aurorae can look grey-white.',
    facts: [
      'Its southern counterpart is the aurora australis, the southern lights.',
      'In May 2024 a severe solar storm pushed aurorae as far south as Mexico.',
      'Jupiter and Saturn have aurorae too, glowing brightest in ultraviolet light.',
    ],
    stat: { value: '80–500 km', label: 'Aurora altitude' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['aurora', 'northern lights', 'southern lights', 'aurora borealis', 'aurora australis', 'solar wind', 'space weather', 'magnetic field'],
    relatedTopics: ['color-vision', 'bird-migration', 'bioluminescence', 'sunset-colors', 'saturn-rings'],
    icon: 'sparkles',
    difficulty: 2,
    estimatedReadTime: 60,
    source: { label: 'NOAA Space Weather Prediction Center: Aurora', url: 'https://www.spaceweather.gov/phenomena/aurora' },
  },
  {
    id: 'stars-twinkle',
    description:
      "Starlight crosses pockets of air at slightly different temperatures and densities, and each bends the light a little differently. As the air moves, a star's single point of light is nudged about and flickers. Planets are close enough to show a tiny disc, and the flicker across its many points averages out.",
    shortFact: "Twinkling has nothing to do with the star itself: it is Earth's moving air bending the light.",
    interestingFact:
      'Stars near the horizon twinkle most, because their light passes through far more air. Bright ones such as Sirius can flash red and blue as the air splits their light into colours.',
    oneMoreThing:
      'Big observatories cancel the effect with adaptive optics. A thin, flexible mirror, pushed by hundreds of tiny actuators, reshapes itself up to about a thousand times a second to undo the blur.',
    facts: [
      "Astronomers call twinkling 'scintillation'; the wider blurring of star images is called 'seeing'.",
      'From above the atmosphere, space telescopes such as Hubble see stars without any twinkle.',
      'Low on the horizon, even bright planets can twinkle.',
    ],
    stat: { value: '1,000/s', label: 'Mirror reshapes' },
    certainty: 'established',
    moods: ['beautiful', 'useful'],
    keywords: ['stars', 'twinkle', 'twinkling', 'planets', 'atmosphere', 'scintillation', 'night sky', 'telescope'],
    relatedTopics: ['sunset-colors', 'moon-illusion', 'black-holes', 'mirror-reverse'],
    icon: 'star',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Hong Kong Observatory: Why do stars twinkle?',
      url: 'https://www.hko.gov.hk/en/education/earth-science/optical-phenomena/00356-why-do-stars-twinkle.html',
    },
  },
  {
    id: 'ice-floats',
    description:
      'When water freezes, hydrogen bonds lock its molecules into an open, hexagonal lattice that takes up more room than the jostling liquid. The same mass spread over a larger volume means lower density. Ice occupies about 9 per cent more space than the water it came from, so it floats.',
    shortFact: 'Most solids sink in their own liquid; frozen water is one of the rare exceptions.',
    interestingFact:
      'Fresh water is densest at about 4 °C, so the coldest water stays on top and lakes freeze from the surface down. The ice then insulates the water beneath, where fish survive.',
    oneMoreThing: 'Water has unusual company. Silicon, gallium, germanium and bismuth also expand as they solidify, so their solids float on their own melts.',
    facts: [
      "Roughly 90 per cent of an iceberg's volume sits below the waterline.",
      'Freezing water expands with enough force to split rock and burst pipes.',
      'Sea ice is far less salty than seawater, because freezing pushes most salt out.',
    ],
    stat: { value: '~9%', label: 'Expansion on freezing' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['ice', 'water', 'float', 'density', 'freezing', 'hydrogen bonds', 'iceberg'],
    relatedTopics: ['dead-sea', 'ocean-blue', 'trees-water', 'saturn-rings'],
    icon: 'snowflake',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Penn State, MATSE 81: Water and its expansion on freezing',
      url: 'https://courses.ems.psu.edu/matse81/node/2119',
    },
  },
  {
    id: 'ocean-blue',
    description:
      'Water absorbs colours towards the red end of the spectrum more strongly than blue light. The remaining blue light is scattered back towards our eyes, giving large bodies of water their characteristic colour.',
    shortFact: 'Water itself is faintly blue, but you need several metres of it to notice.',
    interestingFact:
      'The deeper the water, the more noticeable this effect becomes. By about 10 metres down, most of the red in sunlight has already been absorbed.',
    oneMoreThing: 'Under certain conditions, microscopic organisms and particles can change the colour of the water completely.',
    facts: [
      "Water isn't naturally 'blue' in the same way paint is.",
      'The ocean can appear turquoise in shallow water.',
      'Different particles can create green, brown or red water.',
    ],
    stat: { value: '~10 m', label: 'Most red absorbed' },
    certainty: 'established',
    moods: ['beautiful', 'useful'],
    keywords: ['ocean', 'sea', 'blue', 'water', 'colour', 'color', 'light absorption', 'why is the ocean blue'],
    relatedTopics: ['sunset-colors', 'color-vision', 'blue-eyes', 'bioluminescence', 'ice-floats'],
    icon: 'waves',
    difficulty: 1,
    estimatedReadTime: 40,
    source: { label: 'NOAA Ocean Service: Why is the ocean blue?', url: 'https://oceanservice.noaa.gov/facts/oceanblue.html' },
  },
  {
    id: 'sunset-colors',
    description:
      'Air molecules scatter short, blue wavelengths of sunlight far more strongly than long, red ones. When the Sun is low, its light crosses many times more atmosphere to reach you, so most of the blue is scattered out of the beam along the way. What survives is orange and red.',
    shortFact: "Sunsets on Mars glow blue, because its fine dust scatters light differently from Earth's air.",
    interestingFact:
      'Smoke, dust and volcanic haze can make sunsets more vivid. After Krakatoa erupted in 1883, unusually red skies were reported around the world for months.',
    oneMoreThing:
      'If shorter wavelengths scatter most, why is the daytime sky not violet? The Sun emits less violet than blue, some is absorbed high in the atmosphere, and our eyes are less sensitive to it.',
    facts: [
      'The same scattering that reddens sunsets makes the daytime sky blue.',
      'Air scatters violet light roughly ten times more strongly than deep red.',
      'The setting Sun often looks squashed because air bends light from its lower edge more.',
    ],
    stat: { value: '~38×', label: 'Sunset air path' },
    certainty: 'established',
    moods: ['beautiful', 'useful'],
    keywords: ['sunset', 'sunrise', 'red sky', 'sky colour', 'blue sky', 'rayleigh scattering', 'light', 'why is the sky blue'],
    relatedTopics: ['color-vision', 'ocean-blue', 'stars-twinkle', 'volcano-eruption', 'aurora'],
    icon: 'sunset',
    difficulty: 2,
    estimatedReadTime: 50,
    source: { label: 'NASA Space Place: Why is the sky blue?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
  },
  {
    id: 'rust',
    description:
      'Rusting is a slow electrochemical reaction: iron gives up electrons to oxygen, with water acting as a go-between, forming hydrated iron oxide. Gold barely reacts because it holds on to its electrons unusually tightly and its oxide is unstable. In ordinary air and water, it is among the least reactive metals there is.',
    shortFact: 'Rust takes up several times more space than the iron it replaces, enough to crack concrete.',
    interestingFact:
      'Rust is flaky and porous, so it falls away and exposes fresh iron beneath. Aluminium and stainless steel oxidise too, but form a thin, tight film that protects the metal underneath.',
    oneMoreThing:
      'Without relativity, gold would look silvery. Electrons near its heavy nucleus move at a sizeable fraction of light speed, shifting its energy levels so that gold absorbs blue light and reflects yellow.',
    facts: [
      'Salt speeds up rusting by helping electric charge flow through the film of water.',
      'Stainless steel contains at least 10.5 per cent chromium, which forms a protective oxide film.',
      'Gold is often found in nature as pure metal; iron almost never is.',
    ],
    stat: { value: '10.5%', label: 'Chromium in stainless' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['rust', 'iron', 'gold', 'corrosion', 'oxidation', 'metal', 'stainless steel', 'chemistry'],
    relatedTopics: ['roman-concrete', 'antikythera', 'bridges-weight', 'volcano-eruption'],
    icon: 'anvil',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Hammer & Nørskov, "Why gold is the noblest of all the metals", Nature (1995)',
      url: 'https://doi.org/10.1038/376238a0',
    },
  },
  {
    id: 'thunder-lightning',
    description:
      'Lightning heats the air in its channel to as much as 28,000 °C in a fraction of a second. The air expands violently, and that pressure wave is the thunder. You see the flash almost instantly, but sound covers only about 340 metres a second, so the bang arrives later.',
    shortFact: 'Count the seconds between flash and bang: every three seconds is roughly one kilometre.',
    interestingFact:
      'Thunder rumbles because a lightning channel can be kilometres long. Sound from its nearest part reaches you first and from the farthest parts last, stretching one crack into a long roll.',
    oneMoreThing:
      'Thunder is rarely heard more than about 16 kilometres away, yet lightning can strike that far from a storm. If you can hear thunder, you are close enough to be struck.',
    facts: [
      'A lightning channel is typically only a few centimetres wide.',
      'Sound travels slightly faster in warm air than in cold air.',
      "'Heat lightning' is ordinary lightning too far away for its thunder to be heard.",
    ],
    stat: { value: '343 m/s', label: 'Speed of sound' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['thunder', 'lightning', 'storm', 'thunderstorm', 'speed of sound', 'flash to bang', 'weather'],
    relatedTopics: ['volcanic-lightning', 'noise-cancelling', 'whale-song', 'voice-recording'],
    icon: 'cloud-lightning',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'NOAA National Weather Service: Understanding Lightning: Thunder',
      url: 'https://www.weather.gov/safety/lightning-science-thunder',
    },
  },
  {
    id: 'mirror-reverse',
    description:
      'A mirror does not swap left and right. It reverses front and back: each point is reflected straight across the glass, so your raised right hand stays on the right of the image. We call it a left-right flip only because we imagine walking round to stand where the reflection is.',
    shortFact: 'A mirror reverses front and back, not left and right.',
    interestingFact:
      'Writing looks backwards because you turned the page round to face the glass. Write on a transparent sheet, hold it up facing you, and its reflection reads normally.',
    oneMoreThing:
      'Two mirrors joined at a right angle reflect you twice, so you see yourself as others do. Raise your right hand, and the reflection raises the hand on its right.',
    facts: [
      'Many ambulances carry mirror-written lettering so drivers ahead can read it.',
      'A mirror on the floor shows you upside down, because it flips the up-down axis.',
      'Everyday mirrors are glass backed with a thin layer of silver or aluminium.',
    ],
    stat: { value: '90°', label: 'True-mirror angle' },
    certainty: 'established',
    moods: ['mind-bending', 'surprising'],
    keywords: ['mirror', 'mirrors', 'reflection', 'left and right', 'mirror image', 'optics', 'reversed'],
    relatedTopics: ['voice-recording', 'moon-illusion', 'color-vision', 'stars-twinkle'],
    icon: 'flip-horizontal-2',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Purdue University Physics Demonstrations: Mirror reversal',
      url: 'https://www.physics.purdue.edu/demos/display_page.php?item=7A-03',
    },
  },
  {
    id: 'trees-water',
    description:
      'Water evaporates from tiny pores in the leaves, and each departing molecule tugs on the next. Because water molecules cling to one another and to the walls of narrow xylem tubes, an unbroken column is pulled up from the roots. Sunlight drives the evaporation, so no pump is needed.',
    shortFact: 'A tree pulls water up rather than pushing it: the column hangs under tension, like a rope.',
    interestingFact:
      'The tallest known tree, a coast redwood named Hyperion, is about 116 metres tall. Physiologists estimate that gravity and friction cap tree height at roughly 120 to 130 metres.',
    oneMoreThing:
      'When tension gets too high, a water column can snap and an air bubble forms. Sensitive microphones pick up these breaks as faint ultrasonic clicks inside the wood.',
    facts: [
      'A large oak can give off around 150,000 litres of water a year.',
      'Most of the water a tree draws up evaporates; only a small share builds new tissue.',
      'Xylem vessels are dead cells, hollowed out to form continuous pipes.',
    ],
    stat: { value: '~116 m', label: 'Tallest known tree' },
    certainty: 'established',
    moods: ['surprising', 'mind-bending'],
    keywords: ['tree', 'trees', 'water', 'xylem', 'transpiration', 'redwood', 'plants', 'sap'],
    relatedTopics: ['trees-communicate', 'mushrooms-mycelium', 'ice-floats', 'bananas-curve'],
    icon: 'tree-pine',
    difficulty: 2,
    estimatedReadTime: 60,
    source: { label: 'Koch et al., "The limits to tree height", Nature (2004)', url: 'https://doi.org/10.1038/nature02417' },
  },
  {
    id: 'trees-communicate',
    description:
      "Most trees partner with fungi whose threads wrap their roots, trading sugar for water and nutrients. One fungus can link several trees at once, and trees also release airborne chemicals when attacked. But the popular picture of forests talking through an underground web, with 'mother trees' feeding seedlings, goes well beyond the evidence.",
    shortFact: "Fungi really do connect tree roots underground, but whether trees 'talk' through them is unsettled.",
    interestingFact:
      'A 2023 review of field studies found that claims about forest fungal networks are often overstated, and that studies reporting positive effects are cited more than cautious ones.',
    oneMoreThing:
      'The firmer evidence for plant signalling is above ground. Damaged leaves release airborne chemicals, and in experiments some neighbouring plants respond by strengthening their own defences.',
    facts: [
      'The great majority of land plants form partnerships with mycorrhizal fungi.',
      "The phrase 'wood wide web' was popularised by a 1997 cover of Nature.",
      'Fungal threads are far thinner than roots, so they explore tiny pores in soil.',
    ],
    stat: { value: '2–10 µm', label: 'Fungal thread width' },
    certainty: 'debated',
    caveat:
      'Fungal links between trees are real, but field evidence that they carry meaningful food or warning signals from tree to tree is limited and contested.',
    moods: ['surprising', 'strange'],
    keywords: ['trees', 'forest', 'wood wide web', 'mycorrhiza', 'fungi', 'mother trees', 'plant communication', 'roots'],
    relatedTopics: ['mushrooms-mycelium', 'trees-water', 'golden-ratio', 'here-be-dragons'],
    icon: 'trees',
    difficulty: 2,
    estimatedReadTime: 70,
    source: {
      label: 'Karst et al., "Positive citation bias and overinterpreted results...", Nature Ecology & Evolution (2023)',
      url: 'https://doi.org/10.1038/s41559-023-01986-1',
    },
  },
  {
    id: 'mushrooms-mycelium',
    description:
      'The mushroom you pick is a fruiting body, built to scatter spores. The fungus itself lives out of sight as mycelium: a branching mesh of threads, each a few thousandths of a millimetre wide, running through soil, wood or leaf litter. It can persist for years, fruiting only when conditions suit.',
    shortFact: 'A single honey fungus in Oregon spreads beneath nearly 10 square kilometres of forest.',
    interestingFact:
      'Fungi are more closely related to animals than to plants. Their cell walls are built from chitin, the same tough material found in insect shells.',
    oneMoreThing:
      'That Oregon honey fungus, Armillaria ostoyae, is thought to be between about 2,400 and 8,650 years old. It is also a parasite, slowly rotting the roots of the trees it lives among.',
    facts: [
      'A single mushroom can release billions of microscopic spores.',
      'Mycelium digests food outside its body, then absorbs the dissolved nutrients.',
      'Honey fungus mycelium glows faintly in the dark, a light once called foxfire.',
    ],
    stat: { value: '~965 ha', label: 'Largest honey fungus' },
    certainty: 'established',
    moods: ['strange', 'surprising'],
    keywords: ['mushroom', 'mushrooms', 'fungi', 'fungus', 'mycelium', 'spores', 'honey fungus', 'largest organism'],
    relatedTopics: ['trees-communicate', 'bioluminescence', 'trees-water', 'tardigrade'],
    icon: 'network',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Scientific American: Strange but true, the largest organism on Earth is a fungus',
      url: 'https://www.scientificamerican.com/article/strange-but-true-largest-organism-is-fungus/',
    },
  },
  {
    id: 'bioluminescence',
    description:
      'Below about 1,000 metres no sunlight reaches the sea, and making your own light becomes one of the few ways to see or be seen. Deep-sea animals use it to hide, hunt, startle predators and find mates. The glow usually comes from a molecule called luciferin reacting with oxygen, helped by an enzyme.',
    shortFact: 'In one long deep-sea video survey, about three quarters of the animals seen could make light.',
    interestingFact:
      'Most of that light is blue or blue-green, the colours that travel furthest through seawater. Some dragonfish break the rule, shining red light that most of their prey cannot see.',
    oneMoreThing:
      'Some animals glow on their undersides to match the faint light from above, erasing their silhouette from predators below. It is camouflage made of light, called counter-illumination.',
    facts: [
      'Many anglerfish lures glow thanks to bacteria living inside them.',
      'Bioluminescence has evolved independently dozens of times across the tree of life.',
      'Glowing waves on some beaches come from tiny plankton called dinoflagellates.',
    ],
    stat: { value: '76%', label: 'Observed animals glowing' },
    certainty: 'established',
    moods: ['beautiful', 'strange'],
    keywords: ['bioluminescence', 'glow', 'deep sea', 'ocean', 'anglerfish', 'luciferin', 'plankton', 'glowing animals'],
    relatedTopics: ['octopus-color', 'ocean-blue', 'mushrooms-mycelium', 'whale-song', 'aurora'],
    icon: 'fish',
    difficulty: 2,
    estimatedReadTime: 60,
    source: {
      label: 'Martini & Haddock, "Quantification of bioluminescence from the surface to the deep sea", Scientific Reports (2017)',
      url: 'https://doi.org/10.1038/srep45750',
    },
  },
  {
    id: 'bananas-curve',
    description:
      'Bananas grow in rows, called hands, on a heavy bunch that hangs down from the plant. Each fruit starts out pointing towards the ground, then bends upward as it grows, a habit botanists call negative geotropism: growing away from gravity. Uneven growth on its upper and lower sides produces the curve.',
    shortFact: 'Young bananas point at the ground, then slowly turn to grow upwards.',
    interestingFact:
      "The banana plant is not a tree. Its 'trunk' is a pseudostem of tightly wrapped leaf sheaths, making it one of the largest herbaceous plants in the world.",
    oneMoreThing:
      "Cavendish, just under half the world's banana crop, is seedless and grown from shoots, so plants are near-identical clones. That leaves it exposed to Tropical Race 4, a soil fungus now confirmed in more than 20 countries.",
    facts: [
      'Botanically, a banana is a berry.',
      'Wild bananas can be packed with hard, black seeds.',
      'Cavendish replaced the Gros Michel banana after a fungal disease devastated it last century.',
    ],
    stat: { value: '~50%', label: 'Cavendish share' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['banana', 'bananas', 'curved', 'curve', 'geotropism', 'fruit', 'plants', 'cavendish'],
    relatedTopics: ['coffee-cherry', 'trees-water', 'chili-heat', 'honey-spoil'],
    icon: 'banana',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'Purdue University, Center for New Crops: Banana (J. Morton, Fruits of Warm Climates)',
      url: 'https://hort.purdue.edu/newcrop/morton/banana.html',
    },
  },
  {
    id: 'volcano-eruption',
    description:
      'Deep underground, rock melts into magma that is lighter than its surroundings, so it rises and collects in chambers beneath volcanoes. Magma carries dissolved gases, mostly water vapour and carbon dioxide. As it nears the surface and pressure falls, those gases form bubbles and expand, driving the magma up and out.',
    shortFact: 'Whether a volcano oozes lava or explodes depends largely on how sticky its magma is.',
    interestingFact:
      'Runny basalt lets gas escape gently, feeding lava flows like those in Hawaii and Iceland. Thick, silica-rich magma traps gas until it bursts apart, as at Mount St Helens in 1980.',
    oneMoreThing:
      'Big eruptions can cool the planet. Sulphur gas from Mount Pinatubo in 1991 formed a haze high in the stratosphere that lowered average global temperatures by about 0.5 °C for roughly two years.',
    facts: [
      'About 1,350 volcanoes are potentially active, not counting those along mid-ocean ridges.',
      'Roughly 50 to 70 volcanoes erupt in a typical year.',
      "Tambora's eruption in 1815 led to the 'year without a summer' in 1816.",
    ],
    stat: { value: '~1,350', label: 'Potentially active volcanoes' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['volcano', 'volcanoes', 'lava', 'magma', 'eruption', 'erupt', 'geology', 'mount st helens'],
    relatedTopics: ['volcanic-lightning', 'tectonic-plates', 'roman-concrete', 'sunset-colors', 'popcorn-pops'],
    icon: 'mountain',
    difficulty: 2,
    estimatedReadTime: 60,
    source: {
      label: 'British Geological Survey: How volcanoes form',
      url: 'https://www.bgs.ac.uk/discovering-geology/earth-hazards/volcanoes/how-volcanoes-form/',
    },
  },
  {
    id: 'volcanic-lightning',
    description:
      'In an eruption column, fragments of ash and rock collide and rub together, swapping electric charge. Particles of different sizes tend to gain opposite charges and drift apart, building huge voltages; in tall plumes, ice adds charge much as in a thunderstorm. When the imbalance grows large enough, lightning flashes.',
    shortFact: 'Erupting volcanoes can make their own lightning, with no thunderstorm required.',
    interestingFact:
      'Near the vent, sparks only metres long can crackle almost continuously. Larger bolts, kilometres long, tend to develop higher in the plume as charges separate further.',
    oneMoreThing:
      'The 2022 eruption of Hunga volcano in Tonga produced the most intense lightning ever recorded: more than 2,600 flashes a minute at its peak, some of them 20 to 30 kilometres up.',
    facts: [
      'Lightning can melt volcanic ash into tiny glassy spheres.',
      'Pliny the Younger described lightning-like flashes in the cloud from Vesuvius in AD 79.',
      'Lightning detectors help scientists spot eruptions at remote volcanoes.',
    ],
    stat: { value: '2,600+/min', label: 'Hunga Tonga peak' },
    certainty: 'established',
    moods: ['beautiful', 'strange'],
    keywords: ['volcanic lightning', 'volcano', 'volcanoes', 'lava', 'magma', 'eruption', 'lightning', 'dirty thunderstorm'],
    relatedTopics: ['thunder-lightning', 'volcano-eruption', 'tectonic-plates', 'aurora'],
    icon: 'zap',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: "USGS Publications: Van Eaton et al., Lightning rings and gravity waves, Tonga's Hunga Volcano (2023)",
      url: 'https://pubs.usgs.gov/publication/70245422',
    },
  },
  {
    id: 'tectonic-plates',
    description:
      "Earth's rigid outer shell is broken into plates that creep over hotter, softer rock beneath. Most move a few centimetres a year, roughly as fast as fingernails grow. At Þingvellir in Iceland, the North American and Eurasian plates are pulling apart, opening a rift valley you can walk through.",
    shortFact: 'Iceland is being stretched apart by about 2 centimetres a year as two plates diverge.',
    interestingFact:
      'Earthquakes, mountain ranges and most volcanoes cluster along plate edges. The Himalayas are still rising because India keeps pushing north into Asia.',
    oneMoreThing:
      'Alfred Wegener proposed continental drift in 1912 but could not explain what moved the continents. The idea won wide acceptance only in the 1960s, after surveys showed new seafloor spreading from mid-ocean ridges.',
    facts: [
      'Earth has seven or eight major plates and many smaller ones.',
      'Pangaea, the last supercontinent, began breaking apart about 200 million years ago.',
      'At Silfra, in Þingvellir, divers swim through a water-filled fissure in the rift.',
    ],
    stat: { value: '~2 cm/yr', label: 'Iceland spreading rate' },
    certainty: 'established',
    moods: ['mind-bending', 'surprising'],
    keywords: ['tectonic plates', 'plate tectonics', 'continental drift', 'earthquakes', 'iceland', 'mid-atlantic ridge', 'pangaea', 'geology'],
    relatedTopics: ['volcano-eruption', 'dead-sea', 'undersea-cables', 'here-be-dragons'],
    icon: 'earth',
    difficulty: 2,
    estimatedReadTime: 60,
    source: {
      label: 'USGS, This Dynamic Earth: Understanding plate motions',
      url: 'https://pubs.usgs.gov/gip/dynamic/understanding.html',
    },
  },
  {
    id: 'dead-sea',
    description:
      'The Dead Sea is about 34 per cent salt, nearly ten times saltier than the ocean. The salt makes its water about a quarter denser than fresh water, while your body is close to fresh water in density. You need to sink only part of yourself to displace your weight, so you float high.',
    shortFact: 'Its shores are the lowest dry land on Earth, more than 430 metres below sea level.',
    interestingFact:
      'Its salts are unusual. Seawater is mostly sodium chloride, but the Dead Sea is rich in magnesium and calcium chlorides, which taste bitter and make the water feel oily.',
    oneMoreThing:
      'It is not quite dead. Salt-loving microbes live in it, and after exceptionally wet winters its surface has turned red with blooms of algae and archaea.',
    facts: [
      'Its level is dropping by about a metre a year, mainly because river water is diverted.',
      'Thousands of sinkholes have opened along its shores as the water retreats.',
      'Strictly speaking it is a lake, fed mainly by the Jordan River, with no outlet.',
    ],
    stat: { value: '~34%', label: 'Salt content' },
    certainty: 'established',
    moods: ['strange', 'surprising'],
    keywords: ['dead sea', 'salt', 'salt water', 'float', 'floating', 'density', 'salinity', 'jordan'],
    relatedTopics: ['ice-floats', 'tectonic-plates', 'honey-spoil', 'ocean-blue'],
    icon: 'droplets',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'European Space Agency: Dead Sea, Middle East',
      url: 'https://www.esa.int/ESA_Multimedia/Images/2014/11/Dead_Sea_Middle_East',
    },
  },
];
