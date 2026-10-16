import type { KnowledgeText } from '../../model/types';

export const batchC: KnowledgeText[] = [
  {
    id: 'zipper',
    description:
      'A zip is two rows of teeth, each tooth with a small bump on top and a hollow underneath. The slider’s Y-shaped channel bends the rows to an angle and presses them together, so each tooth nests between two on the opposite side. Pulling the slider back wedges them apart again.',
    shortFact: 'A closed zip resists a straight pull; its teeth only let go when bent apart at an angle.',
    interestingFact:
      'The slider does the clever work. Its tapered channel holds the teeth at exactly the angle where bump can slip into hollow, then straightens the rows so they lock.',
    oneMoreThing:
      'The name came from a boot: in 1923 the Goodrich rubber company called its zip-fastened galoshes Zippers, after the sound they made. The word outlived the boots.',
    facts: [
      'Gideon Sundback’s ‘separable fastener’ patent was granted in 1917.',
      'Sundback raised the number of fastening elements from four to ten per inch.',
      'Whitcomb Judson’s earlier hook-and-eye ‘clasp locker’ of the 1890s proved unreliable.',
    ],
    stat: { value: '1917', label: 'Sundback patent' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['zipper', 'zip', 'fastener', 'sundback', 'slider', 'zip teeth', 'how zips work'],
    relatedTopics: ['velcro', 'lego-1958', 'post-it', 'qwerty'],
    icon: 'fold-vertical',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'National Inventors Hall of Fame: Gideon Sundback',
      url: 'https://www.invent.org/inductees/gideon-sundback',
    },
  },
  {
    id: 'elevator-floors',
    description:
      'Most modern lifts count. An encoder driven by the motor or the car ticks off distance as the car moves. Because ropes stretch and buildings settle, sensors on the car also read magnets or metal vanes fixed at each landing, correcting the count so the car stops level with the floor.',
    shortFact: 'Many lifts lose track of where they are in a power cut and have to go looking.',
    interestingFact:
      'Some systems skip counting altogether. A coded tape runs the height of the shaft, and a reader on the car decodes its exact position at every moment, like scanning a very long barcode.',
    oneMoreThing:
      'After a power cut, a lift that relies on counting can lose its place. It creeps slowly until it finds a known marker, sometimes at the top or bottom of the shaft, before resuming normal service.',
    facts: [
      'Before electronics, a ‘floor selector’ in the machine room mimicked the car’s journey in miniature.',
      'Long steel ropes stretch measurably under load, so counting alone slowly drifts.',
      'Hall-effect sensors on the car detect magnets at each landing without touching them.',
    ],
    stat: { value: '±10 mm', label: 'Stopping accuracy' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['elevator', 'lift', 'floor sensor', 'encoder', 'lift shaft', 'levelling', 'how lifts work'],
    relatedTopics: ['gps', 'qr-codes', 'bridges-weight', 'tall-ceilings'],
    icon: 'arrow-up-down',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Otis Elevator Co. patent US6526368: elevator car position sensing system',
      url: 'https://patents.google.com/patent/US6526368B1/en',
    },
  },
  {
    id: 'microwave',
    description:
      'A microwave oven fills its metal box with radio waves at about 2.45 GHz. Water molecules in the food try to swing into line with the field as it flips billions of times a second, and that jostling becomes heat. The waves are absorbed in the outer few centimetres; the centre warms mainly by conduction.',
    shortFact: 'Microwave ovens do not cook from the inside out; the waves reach only a few centimetres in.',
    interestingFact:
      '2.45 GHz is not water’s resonant frequency. It sits in a band reserved for industrial, scientific and medical use, and penetrates deeper than higher frequencies, which water soaks up near the surface.',
    oneMoreThing:
      'In 1945 Raytheon engineer Percy Spencer, working beside a radar magnetron, found the chocolate bar in his pocket had melted, by the usual account. The first commercial oven, the 1947 Radarange, stood about 1.8 metres tall.',
    facts: [
      'Standing waves create fixed hot and cold spots; the turntable moves food through them.',
      'Ice absorbs microwaves far less than liquid water, so defrost settings pause to let heat spread.',
      'The mesh in the door has holes far smaller than the wavelength, so waves stay inside.',
    ],
    stat: { value: '2.45 GHz', label: 'Oven frequency' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['microwave', 'microwave oven', 'heating food', 'dielectric heating', 'percy spencer', 'radarange', '2.45 ghz'],
    relatedTopics: ['popcorn-pops', 'ice-floats', 'noise-cancelling', 'post-it'],
    icon: 'microwave',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'US Food and Drug Administration: Microwave ovens',
      url: 'https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens',
    },
  },
  {
    id: 'airplane-windows',
    description:
      'A pressurised cabin swells slightly on every flight and relaxes on landing. Around any opening in that skin, stress gathers most sharply at tight corners, so rounded windows spread the load. The lesson was learned through the de Havilland Comet, the first jet airliner, after fatal break-ups in 1954.',
    shortFact: 'Squarish window corners helped tear the world’s first jet airliner apart in flight.',
    interestingFact:
      'Stress flows around a hole rather like water around a rock. At a tight corner it bunches up, and each flight’s swelling flexes that spot until a fatigue crack begins.',
    oneMoreThing:
      'De Havilland’s test fuselage had survived 16,000 cycles. But it had first been overpressurised, which cold-worked the metal at the corners and improved its fatigue life, masking a weakness production aircraft reached after roughly 1,000 flights.',
    facts: [
      'Investigators pressurised a whole Comet fuselage in a water tank, again and again, until it cracked.',
      'The tiny hole in the middle pane leaves the outer pane to carry the pressure.',
      'Underwater television cameras were used for the first time to recover the Comet wreckage.',
    ],
    stat: { value: '3,060', label: 'Cycles to failure' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['airplane windows', 'aircraft windows', 'de havilland comet', 'metal fatigue', 'stress concentration', 'round windows', 'aviation safety'],
    relatedTopics: ['bridges-weight', 'flying-buttress', 'pisa', 'roman-concrete'],
    icon: 'plane',
    difficulty: 2,
    estimatedReadTime: 60,
    source: {
      label: 'Federal Aviation Administration, Lessons Learned: de Havilland Comet 1',
      url: 'https://www.faa.gov/lessons_learned/transport_airplane/accidents/G-ALYV',
    },
  },
  {
    id: 'qr-codes',
    description:
      'A QR code stores its data with Reed–Solomon error correction, the same family of maths used on music CDs and in signals from space probes. Extra codewords let a scanner rebuild what is missing. At the highest setting, roughly 30 percent of the data can be smudged or torn away and the code still reads.',
    shortFact: 'A QR code can lose roughly 30 percent of its data and still scan correctly.',
    interestingFact:
      'The three corner squares use black-and-white proportions of 1:1:3:1:1. Denso Wave chose that ratio after surveying flyers, magazines and boxes for the pattern least likely to appear in ordinary print.',
    oneMoreThing:
      'Denso Wave, part of the Toyota group, released the code in 1994 to track car parts in factories. It kept the patent but declared it would not enforce it, which helped the code spread everywhere.',
    facts: [
      'There are four correction levels, restoring roughly 7, 15, 25 and 30 percent.',
      'The largest version is a grid of 177 by 177 modules.',
      'A full-size code can hold about 7,000 numerals.',
    ],
    stat: { value: '30%', label: 'Recoverable damage' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['qr code', 'error correction', 'reed-solomon', 'barcode', 'denso wave', 'scanning'],
    relatedTopics: ['undersea-cables', 'cuneiform', 'gps', 'helvetica'],
    icon: 'qr-code',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Denso Wave (inventor of the QR code): Error correction feature',
      url: 'https://www.qrcode.com/en/about/error_correction.html',
    },
  },
  {
    id: 'noise-cancelling',
    description:
      'Microphones on the headphones sample incoming sound, and a processor generates a copy with its waveform flipped. Played through the speaker, the inverted wave meets the original and the two largely cancel. It works best on steady, low-pitched noise such as engine drone; ear cups and seals block higher frequencies passively.',
    shortFact: 'Noise-cancelling headphones fight sound by adding more sound, precisely out of step with the noise.',
    interestingFact:
      'Low notes have long wavelengths, so a small timing error barely matters. High notes have short ones, where the anti-noise quickly slips out of step and can even add to the sound.',
    oneMoreThing:
      'The idea is far older than the gadget. The German inventor Paul Lueg first filed a patent for cancelling sound with inverted waves in 1933; electronics fast enough for headphones came decades later.',
    facts: [
      'Feedforward microphones listen outside the ear cup; feedback microphones listen inside, near the ear.',
      'Sudden or changing sounds, such as voices or a slammed door, are much harder to cancel.',
      'Bose began researching noise-cancelling headphones in 1978, aiming at aircraft engine noise.',
    ],
    stat: { value: '180°', label: 'Phase inversion' },
    certainty: 'established',
    moods: ['mind-bending', 'useful'],
    keywords: ['noise cancelling', 'anc', 'headphones', 'anti-noise', 'destructive interference', 'sound waves', 'phase'],
    relatedTopics: ['voice-recording', 'whale-song', 'thunder-lightning', 'music-chills'],
    icon: 'headphones',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Paul Lueg, US patent 2,043,416: Process of silencing sound oscillations (1936)',
      url: 'https://patents.google.com/patent/US2043416A/en',
    },
  },
  {
    id: 'gps',
    description:
      'Each GPS satellite broadcasts its position and the exact time from an onboard atomic clock. Your phone measures how long each signal took to arrive, which gives its distance from each satellite. Three distances fix a point; a fourth satellite is needed because the phone’s own clock is far less precise.',
    shortFact: 'GPS only works because engineers correct satellite clocks for Einstein’s relativity, about 38 microseconds a day.',
    interestingFact:
      'Up there, weaker gravity makes clocks tick faster, by about 45 microseconds a day, while orbital speed slows them by about 7. The net 38 microseconds is built into the satellites’ clock rate.',
    oneMoreThing:
      'Most phones do not rely on GPS alone. They also listen to Europe’s Galileo, Russia’s GLONASS and China’s BeiDou, and use Wi-Fi and mobile networks to get a fix faster.',
    facts: [
      'GPS satellites orbit about 20,200 km up, circling Earth twice a day.',
      'A one-microsecond timing error equals about 300 metres of distance error.',
      'Under open sky, a smartphone is typically accurate to within about five metres.',
    ],
    stat: { value: '38 µs', label: 'Daily clock correction' },
    certainty: 'established',
    moods: ['mind-bending', 'useful'],
    keywords: ['gps', 'satellite navigation', 'relativity', 'einstein', 'atomic clock', 'trilateration', 'location'],
    relatedTopics: ['black-holes', 'bird-migration', 'here-be-dragons', 'undersea-cables'],
    icon: 'satellite',
    difficulty: 3,
    estimatedReadTime: 60,
    source: {
      label: 'The Ohio State University: Real-world relativity, the GPS navigation system',
      url: 'https://www.astronomy.ohio-state.edu/pogge.1/Ast162/Unit5/gps.html',
    },
  },
  {
    id: 'undersea-cables',
    description:
      'Almost all data crossing oceans travels through fibre-optic cables on the seabed, not via satellites. Pulses of light carry it along glass strands about as thin as a hair, boosted by repeaters spaced tens of kilometres apart. More than 600 cable systems are active or planned, with about 1.5 million kilometres in service.',
    shortFact: 'Satellites supply less than half a percent of America’s international data capacity; seabed cables carry most.',
    interestingFact:
      'For most of its length a cable is about as thick as a garden hose. Only near shore, where anchors and trawlers threaten, is it wrapped in heavy steel armour.',
    oneMoreThing:
      'Shark bites make good headlines but cause almost no faults. Of roughly 200 cable faults a year, about two-thirds come from fishing gear and ships’ anchors.',
    facts: [
      'The first transatlantic telegraph cable, laid in 1858, failed within weeks.',
      'Repair ships grapple broken cables up from the seabed and splice them on deck.',
      'Modern cables are designed to last at least 25 years.',
    ],
    stat: { value: '1.5 million km', label: 'Cable in service' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['undersea cables', 'submarine cables', 'internet', 'fibre optic', 'seabed', 'data'],
    relatedTopics: ['whale-song', 'telephone-words', 'bioluminescence', 'gps'],
    icon: 'cable',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'TeleGeography: Submarine cable frequently asked questions',
      url: 'https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions',
    },
  },
  {
    id: 'qwerty',
    description:
      'QWERTY comes from the Sholes and Glidden typewriter, sold by Remington from 1874. Christopher Latham Sholes reshuffled the keys over several years, and the arrangement spread with Remington’s machines. Why the letters landed where they did is still argued over, but the popular claim that it was meant to slow typists down is a myth.',
    shortFact: 'QWERTY was never designed to slow typists down; that story is a myth.',
    interestingFact:
      'One account says Sholes split common letter pairs so neighbouring typebars would not clash and jam. Another, from Kyoto University researchers, argues that telegraph operators transcribing Morse code shaped the layout.',
    oneMoreThing:
      'Early layouts put a full stop where R now sits. A popular story says R moved so salesmen could type TYPE WRITER from one row; nobody has found evidence for it.',
    facts: [
      'The first Remington typewriters printed only capital letters.',
      'A shift key for lower case arrived with the Remington No. 2 in 1878.',
      'Dvorak’s 1936 layout never displaced QWERTY, and its claimed speed advantage is disputed.',
    ],
    stat: { value: '1874', label: 'First sold' },
    certainty: 'debated',
    caveat: 'Historians disagree on whether typebar jamming, telegraph transcription or plain trial and error best explains the letter order.',
    moods: ['surprising', 'strange'],
    keywords: ['qwerty', 'keyboard layout', 'typewriter', 'sholes', 'dvorak', 'typing'],
    relatedTopics: ['telephone-words', 'printing-press', 'helvetica', 'cuneiform'],
    icon: 'keyboard',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Yasuoka & Yasuoka, “On the Prehistory of QWERTY”, Zinbun (Kyoto University, 2011)',
      url: 'https://doi.org/10.14989/139379',
    },
  },
  {
    id: 'fingerprints',
    description:
      'Fingerprint ridges form before birth, starting around ten weeks into pregnancy. They spread across each fingertip in waves from a few starting points, and where those waves meet decides the pattern. Genes set the rules, but tiny local differences in timing, growth and pressure make every print different.',
    shortFact: 'Identical twins share their DNA, but not their fingerprints.',
    interestingFact:
      'A 2023 study found the ridges are laid out by a Turing pattern: chemical signals that switch each other on and off, the same kind of process thought to paint some animal stripes.',
    oneMoreThing:
      'Koalas have fingerprints remarkably like ours, even under a microscope. They evolved them independently of primates, a striking case of convergent evolution.',
    facts: [
      'Ridges grow from a hair-follicle programme that switches off before making hairs.',
      'Loops are the most common pattern, then whorls; arches are the rarest.',
      'Ridges may aid grip and touch, but their main purpose is still debated.',
    ],
    stat: { value: '~10 weeks', label: 'Ridges start forming' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['fingerprints', 'identical twins', 'ridges', 'turing pattern', 'skin', 'identity', 'forensics'],
    relatedTopics: ['blue-eyes', 'golden-ratio', 'octopus-color', 'vaccines'],
    icon: 'fingerprint-pattern',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Glover et al., “The developmental basis of fingerprint pattern formation and variation”, Cell (2023)',
      url: 'https://doi.org/10.1016/j.cell.2023.01.015',
    },
  },
  {
    id: 'vaccines',
    description:
      'A vaccine shows the immune system a harmless version of a germ’s antigens: a weakened or inactivated germ, a piece of one, or genetic instructions for making that piece. B cells learn to make matching antibodies, T cells learn the target too, and long-lived memory cells remain afterwards.',
    shortFact: 'Vaccines leave behind memory cells that can recognise a germ for years, sometimes decades.',
    interestingFact:
      'A first response takes days: the rare B and T cells that fit the antigen must be found and multiplied. Memory cells skip that search, so later responses come faster and stronger.',
    oneMoreThing:
      '‘Vaccine’ comes from vacca, Latin for cow. Edward Jenner used cowpox to protect against smallpox in 1796, and Louis Pasteur later extended the word to all such preparations in his honour.',
    facts: [
      'B cells make antibodies; helper T cells coordinate, and killer T cells destroy infected cells.',
      'Some vaccines need several doses to build long-lasting antibodies and memory cells.',
      'Adjuvants are ingredients added to some vaccines to strengthen the immune response.',
    ],
    stat: { value: '1980', label: 'Smallpox eradicated' },
    certainty: 'established',
    moods: ['useful', 'mind-bending'],
    keywords: ['vaccine', 'vaccination', 'immune system', 'antibodies', 'memory cells', 'jenner', 'smallpox'],
    relatedTopics: ['spacing-effect', 'memory-rebuilt', 'honey-spoil', 'fingerprints'],
    icon: 'syringe',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'World Health Organization: How do vaccines work?',
      url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work',
    },
  },
  {
    id: 'voice-recording',
    description:
      'When you speak, you hear your voice two ways: through the air into your ears, and as vibration carried through the bones of your skull. Bone conduction favours lower frequencies, so your voice sounds deeper and fuller to you. A recording captures only the airborne sound, which is closer to what everyone else hears.',
    shortFact: 'The voice you hear when you speak is partly carried to your ears through your skull.',
    interestingFact:
      'Put in earplugs and talk, and you get the reverse: mostly bone-conducted sound, boomy and muffled. Your everyday voice is a blend that nobody else ever hears.',
    oneMoreThing:
      'The dislike is not the whole story. In a 2013 study, 80 people rated voice clips without being told theirs were included, and tended to rate their own as more attractive than other listeners did.',
    facts: [
      'Bone conduction boosts low frequencies, so recordings sound higher and thinner to you.',
      'Unfamiliarity matters: you have heard your skull-filtered voice all your life.',
      'Some inner-ear conditions make bone-conducted sounds, even breathing, overwhelmingly loud.',
    ],
    stat: { value: '2', label: 'Sound pathways' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['recorded voice', 'own voice', 'voice sounds different', 'bone conduction', 'hearing', 'recording'],
    relatedTopics: ['mirror-reverse', 'noise-cancelling', 'music-chills', 'memory-rebuilt'],
    icon: 'mic',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Scientific American: Why does my voice sound so different when it is recorded?',
      url: 'https://www.scientificamerican.com/article/why-does-my-voice-sound-different/',
    },
  },
  {
    id: 'blue-eyes',
    description:
      'The iris has two layers. The back layer is packed with dark melanin in almost everyone. Blue eyes have very little melanin in the front layer, the stroma, so light scatters off its fibres, and shorter blue wavelengths scatter most, much as they do in the sky.',
    shortFact: 'Blue eyes get their colour in much the same way the sky does: by scattering light.',
    interestingFact:
      'Because the colour comes from structure, it shifts with the lighting. Brown eyes have more melanin in the stroma; green and hazel eyes mix a little pigment with the scattered blue.',
    oneMoreThing:
      'A 2008 study found blue-eyed people in Denmark, Turkey and Jordan shared the same small genetic switch near the OCA2 gene, suggesting the trait traces back to a single common ancestor.',
    facts: [
      'Many babies of European descent are born with blue-grey eyes that may later darken.',
      'Eye colour depends on many genes, not one simple dominant–recessive pair.',
      'Many blue bird feathers are also coloured by structure, not pigment.',
    ],
    stat: { value: '0', label: 'Blue pigments' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['blue eyes', 'eye colour', 'eye color', 'iris', 'melanin', 'structural colour', 'oca2', 'herc2'],
    relatedTopics: ['ocean-blue', 'color-vision', 'sunset-colors', 'fingerprints'],
    icon: 'eye',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Eiberg et al., “Blue eye color in humans may be caused by a perfectly associated founder mutation…”, Human Genetics (2008)',
      url: 'https://doi.org/10.1007/s00439-007-0460-x',
    },
  },
  {
    id: 'color-vision',
    description:
      'Light has wavelengths, not colours. Your retina has three kinds of cone cell, tuned roughly to short, medium and long wavelengths, and your brain compares their signals to build the sensation of colour. It also corrects for the lighting it assumes, which is why one object can look different to two people.',
    shortFact: 'Magenta has no wavelength of its own; your brain invents it from red and blue light.',
    interestingFact:
      'In 2015 a photo of a dress split the internet: blue and black, or white and gold. A study of 1,401 people suggested viewers’ brains were assuming different lighting.',
    oneMoreThing: 'Mantis shrimp have twelve types of colour receptor to our three, yet tests suggest they are worse than us at telling similar colours apart.',
    facts: [
      'In Britain, about 1 in 12 men and 1 in 200 women are colour-blind.',
      'The dress’s actual pixels are blue and brown.',
      'Most mammals, including dogs, have only two kinds of cone.',
    ],
    stat: { value: '3', label: 'Cone types' },
    certainty: 'established',
    moods: ['mind-bending', 'beautiful'],
    keywords: ['colour vision', 'color vision', 'cones', 'the dress', 'colour blindness', 'perception', 'magenta'],
    relatedTopics: ['octopus-color', 'moon-illusion', 'blue-eyes', 'sunset-colors'],
    icon: 'palette',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Lafer-Sousa, Hermann & Conway, “Striking individual differences in color perception uncovered by ‘the dress’ photograph”, Current Biology (2015)',
      url: 'https://doi.org/10.1016/j.cub.2015.04.053',
    },
  },
  {
    id: 'stop-sign',
    description:
      'The octagon dates from 1923, when highway officials in the American Mississippi Valley ranked hazards by shape: the more sides, the greater the danger. Circles marked railway crossings, octagons meant stop, diamonds warned. An eight-sided sign is also easy to recognise when faded, snow-covered or seen from behind.',
    shortFact: 'American stop signs were yellow for about three decades before turning red in 1954.',
    interestingFact:
      'Red was the obvious choice, but durable reflective red was not practical in the 1920s and 1930s. Yellow showed up better at night, so it stayed until materials caught up.',
    oneMoreThing:
      'Blue stop signs exist, notably in Hawaii, on private property where public-style signs are restricted. The octagon still says stop; the colour marks the sign as unofficial.',
    facts: [
      'Detroit’s early stop signs were small, square, and black on white.',
      'The 1968 Vienna Convention on road signs adopted the red octagon for stop.',
      'Japan uses a red downward-pointing triangle instead.',
    ],
    stat: { value: '1923', label: 'Octagon adopted' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['stop sign', 'octagon', 'road signs', 'traffic signs', 'signage', 'red'],
    relatedTopics: ['helvetica', 'color-vision', 'golden-ratio', 'telephone-words'],
    icon: 'octagon',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: '99% Invisible: How safety shaped the octagonal stop sign',
      url: 'https://99percentinvisible.org/article/red-white-sometimes-blue-how-safety-shaped-the-octagonal-stop-sign/',
    },
  },
  {
    id: 'helvetica',
    description:
      'Helvetica was drawn in 1956–57 by Max Miedinger with Eduard Hoffmann, director of the Haas type foundry in Münchenstein, near Basel. They wanted a neutral, highly legible sans serif, building on the older Akzidenz-Grotesk. It launched in 1957 as Neue Haas Grotesk and took its famous name around 1960.',
    shortFact: 'Helvetica’s name was a sales decision: Latin for ‘Swiss’, chosen to sell the typeface abroad.',
    interestingFact:
      'The rename came from Stempel, Haas’s German parent company, which wanted an international seller. Swiss design was fashionable, and a name meaning ‘Swiss’ traded on that reputation.',
    oneMoreThing:
      'Stempel’s sales manager first proposed Helvetia, the Latin name for Switzerland. Hoffmann objected, since a sewing-machine maker and an insurance company already used it, and suggested Helvetica instead.',
    facts: [
      'Linotype released a more systematic redesign, Neue Helvetica, in the early 1980s.',
      'Monotype’s 2019 revision, Helvetica Now, has three versions tuned for different sizes.',
      'A feature-length documentary, Helvetica, was released in 2007.',
    ],
    stat: { value: '1957', label: 'First shown' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['helvetica', 'typeface', 'font', 'neue haas grotesk', 'swiss design', 'typography', 'sans serif'],
    relatedTopics: ['printing-press', 'stop-sign', 'golden-ratio', 'qwerty'],
    icon: 'type',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Fonts In Use: Helvetica',
      url: 'https://fontsinuse.com/typefaces/44/helvetica',
    },
  },
  {
    id: 'golden-ratio',
    description:
      'The golden ratio, about 1.618, is a real and elegant number: split a line so the whole relates to the longer part as the longer part does to the shorter. Claims that it governs the Parthenon, the Mona Lisa, the nautilus or human faces are mostly later inventions resting on selective measurement.',
    shortFact: 'The golden ratio was first linked to the Parthenon in the 1850s, over 2,000 years after its construction.',
    interestingFact:
      'With enough measurements, some pair of lengths will land near 1.618 by chance. Golden-ratio enthusiasts tend to pick the points that fit and ignore the ones that do not.',
    oneMoreThing:
      'Some of it is real. Sunflower seeds and many leaf arrangements follow Fibonacci numbers and a golden angle of about 137.5 degrees, and Le Corbusier deliberately built his Modulor system on the ratio.',
    facts: [
      'Measured nautilus shells spiral at ratios nearer 1.3 than 1.618.',
      'Euclid described the ratio around 300 BC as the ‘extreme and mean ratio’.',
      'Experiments on whether people prefer golden rectangles have produced inconsistent results.',
    ],
    stat: { value: '≈ 1.618', label: 'Phi' },
    certainty: 'established',
    moods: ['surprising', 'beautiful'],
    keywords: ['golden ratio', 'phi', 'fibonacci', 'parthenon', 'divine proportion', 'design myth', 'nautilus'],
    relatedTopics: ['here-be-dragons', 'pyramid-builders', 'stop-sign', 'helvetica'],
    icon: 'ratio',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Plus Magazine, University of Cambridge: Myths of maths, the golden ratio',
      url: 'https://plus.maths.org/content/myths-maths-golden-ratio',
    },
  },
  {
    id: 'price-99',
    description:
      'Prices ending in 9 work largely through the left-digit effect. We read numbers from the left and anchor on the first digit, so £2.99 registers as ‘two-something’ rather than nearly three. Field experiments show such endings can lift sales, though the effect varies by product and shopper.',
    shortFact: 'In a catalogue test, a dress sold better at $39 than at $34.',
    interestingFact:
      'The trick needs a change of leading digit. $2.99 feels much cheaper than $3.00, but $3.59 and $3.60 feel almost identical, because the first digit is the same.',
    oneMoreThing:
      'A popular origin story says odd prices forced cashiers to open the till and give change, making theft harder. It is often repeated but poorly documented.',
    facts: [
      'Used cars sell for noticeably less just past each 10,000-mile odometer mark.',
      'Luxury brands often avoid .99, using round prices to signal quality instead.',
      'Anderson and Simester found 9-endings raised demand in all three of their experiments.',
    ],
    stat: { value: '$39', label: 'Outsold $34' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['charm pricing', '99p', '.99 prices', 'left-digit effect', 'psychological pricing', 'retail'],
    relatedTopics: ['milk-at-back', 'frequency-illusion', 'black-pepper', 'lego-1958'],
    icon: 'tag',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Anderson & Simester, “Effects of $9 price endings on retail sales”, Quantitative Marketing and Economics (2003)',
      url: 'https://doi.org/10.1023/A:1023581927405',
    },
  },
  {
    id: 'milk-at-back',
    description:
      'Two explanations exist, and both have support. Milk arrives at the loading dock and must stay cold, so the dairy case often backs onto a walk-in chiller that staff restock from behind. Putting it far from the door also walks shoppers past everything else on the way.',
    shortFact: 'In the trade, getting shoppers to pick up extras on the way is called ‘building the basket’.',
    interestingFact:
      'When NPR’s Planet Money asked chains and consultants, most cited the cold chain, yet several admitted they like customers walking the length of the store. The reporter called it a draw.',
    oneMoreThing: 'Some supermarkets now add small milk fridges near the entrance for shoppers in a hurry, while keeping the main dairy aisle at the back.',
    facts: [
      'Milk is one of the most frequently bought items in a supermarket.',
      'Keeping milk cold from dairy to shelf is known as the ‘cold chain’.',
      'One consultant said US supermarkets have kept milk at the back for 70 to 80 years.',
    ],
    certainty: 'debated',
    caveat: 'Retailers cite both reasons and rarely publish evidence, so how much each matters is unclear and probably varies by store.',
    moods: ['useful', 'surprising'],
    keywords: ['milk', 'supermarket layout', 'grocery store', 'cold chain', 'impulse buying', 'store design', 'retail psychology'],
    relatedTopics: ['price-99', 'frequency-illusion', 'doorway-effect', 'honey-spoil'],
    icon: 'milk',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'NPR Planet Money, Episode 555: Why is the milk in the back of the store?',
      url: 'https://www.npr.org/sections/money/2016/09/21/494927147/episode-555-why-is-the-milk-in-the-back-of-the-store',
    },
  },
  {
    id: 'lego-1958',
    description:
      'On 28 January 1958 LEGO filed a Danish patent for its stud-and-tube brick. Earlier LEGO bricks were hollow and came apart too easily; tubes inside gave the studs something to grip. LEGO says the design has not changed significantly since, so a 1958 brick still fits one made today.',
    shortFact: 'LEGO’s brick patent application went in at 1.58pm, in 1958.',
    interestingFact:
      'The grip LEGO calls clutch power comes from interference: each stud is squeezed between the brick’s walls and its inner tubes, and the plastic flexes slightly to hold it.',
    oneMoreThing: 'LEGO says six of its standard 2×4 bricks can be combined in 915,103,765 different ways.',
    facts: [
      'LEGO’s name comes from the Danish ‘leg godt’, meaning ‘play well’.',
      'LEGO says its moulds are accurate to within 0.004 mm.',
      'LEGO began making plastic bricks in 1949, nine years before the modern design.',
    ],
    stat: { value: '915,103,765', label: 'Six-brick combinations' },
    certainty: 'established',
    moods: ['surprising', 'mind-bending'],
    keywords: ['lego', 'lego brick', 'toy', 'patent', 'stud and tube', 'clutch power', 'denmark'],
    relatedTopics: ['zipper', 'velcro', 'post-it', 'printing-press'],
    icon: 'toy-brick',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'The LEGO Group: 60 years of the LEGO brick',
      url: 'https://www.lego.com/en-us/aboutus/news/2019/october/lego-60th-anniversary',
    },
  },
];
