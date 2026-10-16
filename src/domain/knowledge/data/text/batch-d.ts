import type { KnowledgeText } from '../../model/types';

export const batchD: KnowledgeText[] = [
  {
    id: 'doorway-effect',
    description:
      "Walking into another room can make you lose track of why you went. Psychologist Gabriel Radvansky's experiments suggest the brain divides experience into episodes, and a doorway marks the end of one. On this account, your intention is filed with the room you left, and becomes harder to retrieve.",
    shortFact: 'Passing through a doorway may prompt the brain to close one mental episode and open another.',
    interestingFact:
      "In Radvansky's studies, walking back into the original room did not restore the lost memory. The boundary itself, not the change of scenery, seemed to cause the forgetting.",
    oneMoreThing:
      'The effect is fragile. A 2021 series of experiments found no reliable doorway effect, except when people were also juggling a demanding mental task as they moved.',
    facts: [
      'People forgot more after crossing a doorway than after walking the same distance within one room.',
      'The effect has been reported in virtual rooms on a screen and in real ones.',
      'Psychologists call these mental dividing lines event boundaries.',
    ],
    stat: { value: '2006', label: 'First lab study' },
    certainty: 'debated',
    caveat: 'Some experiments find clear forgetting after doorways, but others find the effect small or absent, so how robust it is remains unsettled.',
    moods: ['surprising', 'strange'],
    keywords: ['doorway effect', 'forgetting', 'memory', 'event boundaries', 'walking into a room', 'why did i come in here', 'radvansky'],
    relatedTopics: ['memory-rebuilt', 'spacing-effect', 'frequency-illusion', 'moon-illusion'],
    icon: 'door-open',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'University of Notre Dame: Walking through doorways causes forgetting',
      url: 'https://news.nd.edu/news/walking-through-doorways-causes-forgetting-new-research-shows/',
    },
  },
  {
    id: 'frequency-illusion',
    description:
      'Learn a new word and it seems to turn up everywhere. It was there all along: your attention now flags each appearance, and memory counts the hits while ignoring the times it was absent. Stanford linguist Arnold Zwicky named this the frequency illusion in 2005.',
    shortFact: 'The word was always there; your brain has simply started keeping count.',
    interestingFact:
      'Zwicky coined the term while writing about language critics, who notice a usage once and then hear it everywhere. When linguists actually count, such usages often prove far less common.',
    oneMoreThing:
      'Its popular name, the Baader-Meinhof phenomenon, comes from a Minnesota newspaper reader who, in 1994, came across the West German militant group twice within a day and wrote in about it.',
    facts: [
      'Zwicky also named the recency illusion: assuming something is new because you only just noticed it.',
      "The Oxford English Dictionary added 'frequency illusion' in 2019.",
      'It is not limited to words: a newly bought car model can suddenly seem everywhere.',
    ],
    stat: { value: '2005', label: 'Term coined' },
    certainty: 'established',
    moods: ['mind-bending', 'surprising'],
    keywords: [
      'frequency illusion',
      'baader-meinhof phenomenon',
      'baader meinhof',
      'selective attention',
      'confirmation bias',
      'seeing it everywhere',
      'arnold zwicky',
    ],
    relatedTopics: ['memory-rebuilt', 'doorway-effect', 'telephone-words', 'moon-illusion'],
    icon: 'scan-eye',
    difficulty: 1,
    estimatedReadTime: 40,
    source: {
      label: "Language Log (University of Pennsylvania): 'Frequency illusion' in the OED",
      url: 'https://languagelog.ldc.upenn.edu/nll/?p=42180',
    },
  },
  {
    id: 'music-chills',
    description:
      'A soaring entry or a sudden change of harmony can send a shiver down the spine. In 2011, Valorie Salimpoor and colleagues at McGill University showed that the brain releases dopamine, a chemical tied to food and other rewards, at these peak moments. Not everyone feels musical chills.',
    shortFact: 'At the peak of a favourite piece of music, your brain can release dopamine, a reward signal.',
    interestingFact:
      'The response came in two phases: the caudate was more involved during the build-up, the nucleus accumbens at the peak itself. Anticipation is part of the reward.',
    oneMoreThing:
      'In 2019, a drug that raises dopamine made volunteers enjoy music more, and one that blocks its action dulled both pleasure and chills. Dopamine seems to be a cause, not just a companion.',
    facts: [
      "Researchers often call musical chills 'frisson', from the French for shiver.",
      'Chills often follow surprises: a new harmony, a sudden entry, a jump in loudness.',
      'A few healthy people get little pleasure from music, a condition called musical anhedonia.',
    ],
    stat: { value: '2011', label: 'Dopamine study' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['music chills', 'frisson', 'goosebumps', 'dopamine', 'music and emotion', 'shivers down the spine', 'musical pleasure'],
    relatedTopics: ['whale-song', 'color-vision', 'voice-recording', 'memory-rebuilt'],
    icon: 'music',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Salimpoor et al., Nature Neuroscience (2011)',
      url: 'https://doi.org/10.1038/nn.2726',
    },
  },
  {
    id: 'spacing-effect',
    description:
      'Material studied in several sessions spread over time is remembered far longer than the same study time crammed into one. Hermann Ebbinghaus measured this on himself in 1885, and the spacing effect is now one of the best-replicated findings in learning research. Cramming can get you through tomorrow; spacing lasts.',
    shortFact: 'Ebbinghaus found 38 repetitions spread over three days worked as well as 68 crammed into one day.',
    interestingFact:
      'A gap allows a little forgetting. Pulling a half-faded memory back appears to strengthen it more than rereading something that still feels fresh.',
    oneMoreThing:
      'The effect is not only human. Sea slugs and fruit flies also form longer-lasting memories when their training is spaced out rather than massed together.',
    facts: [
      'The best gap between reviews grows with how long you need to remember.',
      'To remember for a year, reviews roughly three to five weeks apart worked best.',
      'A 2013 review of ten study techniques rated spacing one of only two with high utility.',
    ],
    stat: { value: '38 vs 68', label: 'Spaced vs crammed' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['spacing effect', 'spaced repetition', 'cramming', 'forgetting curve', 'ebbinghaus', 'study tips', 'learning', 'memory'],
    relatedTopics: ['memory-rebuilt', 'doorway-effect', 'music-chills', 'frequency-illusion'],
    icon: 'calendar-clock',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'Ebbinghaus, Memory (1885), chapter 8, Classics in the History of Psychology',
      url: 'https://psychclassics.yorku.ca/Ebbinghaus/memory8.htm',
    },
  },
  {
    id: 'moon-illusion',
    description:
      'A rising full Moon can look enormous, yet it is no bigger in the sky than when it rides high. It spans about half a degree wherever it is. Measured precisely, the horizon Moon is slightly smaller, because you are about 6,400 kilometres farther from it than when it is overhead.',
    shortFact: 'A camera shows the rising Moon is no bigger; if anything, it is slightly smaller.',
    interestingFact:
      'The leading explanations agree that the landscape matters. Trees, buildings and the horizon seem to make the low Moon look farther away, and the brain may then inflate its size.',
    oneMoreThing:
      'The puzzle is ancient. Ptolemy discussed it in the second century AD, and astronomers and psychologists have argued over its cause ever since.',
    facts: [
      "A thumb held at arm's length covers the Moon, whether it is low or high.",
      'The Sun and the constellations also look larger near the horizon.',
      'Giant-Moon photos rely on long telephoto lenses, which enlarge the Moon against distant landmarks.',
    ],
    stat: { value: '~0.5°', label: 'Angular size' },
    certainty: 'debated',
    caveat: 'That the horizon Moon is an illusion is certain; why the brain enlarges it is still disputed among several competing explanations.',
    moods: ['mind-bending', 'beautiful'],
    keywords: ['moon illusion', 'big moon', 'horizon moon', 'moonrise', 'optical illusion', 'perception', 'harvest moon'],
    relatedTopics: ['moon-same-side', 'color-vision', 'mirror-reverse', 'sunset-colors'],
    icon: 'moon',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'NASA Astronomy Picture of the Day: Moonrise Over Seattle',
      url: 'https://science.nasa.gov/image-article/apod-2002-january-30-moonrise-over-seattle',
    },
  },
  {
    id: 'memory-rebuilt',
    description:
      'Remembering is not like replaying a recording. Each recall reassembles a memory from fragments, filling gaps with expectation and later knowledge, and the rebuilt version can be stored again with changes. Researchers call this re-storing reconsolidation; it helps explain how vivid, confident memories can still be wrong.',
    shortFact: 'Each time you recall a memory, your brain rebuilds it and may store an edited copy.',
    interestingFact:
      "Words alone can reshape a memory. In 1974, people who watched film of a car crash estimated higher speeds when asked how fast the cars 'smashed' rather than 'hit' each other.",
    oneMoreThing:
      'In 2000, rats given a protein-synthesis blocker in the amygdala just after recalling a learned fear lost that memory. The same drug, given without the recall, left it intact.',
    facts: [
      "A week later, 32 per cent of the 'smashed' group recalled broken glass that never existed.",
      "In 1932 Frederic Bartlett showed retold stories drift towards the teller's cultural expectations.",
      'Memories of shocking public events change over time, even as confidence in them stays high.',
    ],
    stat: { value: '32% vs 14%', label: 'False glass recalled' },
    certainty: 'established',
    moods: ['mind-bending', 'strange'],
    keywords: ['memory', 'reconsolidation', 'false memory', 'eyewitness testimony', 'loftus', 'recall', 'reconstructive memory'],
    relatedTopics: ['spacing-effect', 'doorway-effect', 'color-vision', 'frequency-illusion'],
    icon: 'brain',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Nader, Schafe & LeDoux, Nature (2000)',
      url: 'https://doi.org/10.1038/35021052',
    },
  },
  {
    id: 'popcorn-pops',
    description:
      'Each kernel holds a little water inside a hard, nearly airtight hull. Heated to about 180 °C, that water builds steam pressure until the hull bursts, and the softened starch inside puffs into a white foam that sets almost instantly.',
    shortFact: 'A popcorn kernel is a tiny pressure vessel that bursts at around 180 °C.',
    interestingFact: 'High-speed filming in 2015 suggested the familiar pop is not the hull cracking. It seems to come from trapped water vapour rushing out.',
    oneMoreThing:
      'Popcorn jumps on a leg. Expanding starch presses against the pan and rebounds, launching the kernel from a few millimetres to several centimetres high, often in a somersault.',
    facts: [
      'Just before bursting, pressure inside reaches roughly ten times normal air pressure.',
      'At 170 °C about a third of kernels popped; at 180 °C, nearly all did.',
      'The burst, the jump and the pop all happen within a few hundredths of a second.',
    ],
    stat: { value: '~180 °C', label: 'Popping point' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['popcorn', 'why popcorn pops', 'kernel', 'steam pressure', 'maize', 'kitchen science', 'corn'],
    relatedTopics: ['microwave', 'honey-spoil', 'onions-cry', 'chili-heat'],
    icon: 'popcorn',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'Virot & Ponomarenko, Journal of the Royal Society Interface (2015)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4345489/',
    },
  },
  {
    id: 'honey-spoil',
    description:
      'Honey is mostly sugar with only about 17 per cent water, so microbes that land in it lose water to it instead of growing. It is also acidic, and a bee enzyme releases small amounts of hydrogen peroxide when honey is diluted. Sealed and kept dry, it keeps for years.',
    shortFact: 'Microbes landing in honey are drained of water before they can grow.',
    interestingFact:
      'Bees add an enzyme, glucose oxidase, that turns some glucose into gluconic acid and hydrogen peroxide. It works mainly once honey is diluted, which partly explains its use in wound dressings.',
    oneMoreThing:
      'Honey can spoil if it gets wet. It draws moisture from humid air, and once its water content rises far enough, sugar-tolerant yeasts can make it ferment.',
    facts: [
      'Crystallised honey has not gone off; gentle warming turns it back to liquid.',
      'Honey is acidic, with a pH typically between about 3.2 and 4.5.',
      "Most bacteria need a water activity above about 0.9; honey's is usually around 0.6.",
    ],
    stat: { value: '~17%', label: 'Water content' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['honey', 'shelf life', 'does honey go off', 'crystallised honey', 'food preservation', 'hydrogen peroxide', 'water activity', 'bees'],
    relatedTopics: ['dead-sea', 'tardigrade', 'popcorn-pops', 'black-pepper'],
    icon: 'hexagon',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Mandal & Mandal, Asian Pacific Journal of Tropical Biomedicine (2011)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3609166/',
    },
  },
  {
    id: 'coffee-cherry',
    description:
      'A coffee bean is the seed of a small fruit called a coffee cherry, which ripens from green to yellow and red. Most cherries hold two seeds, pressed flat against each other. Processing strips away the fruit to leave pale green seeds, and roasting turns them brown.',
    shortFact: 'Roughly one coffee cherry in twenty holds a single round seed instead of two.',
    interestingFact:
      "Arabica, the source of about 60 per cent of the world's coffee, is itself a hybrid of two wild species, robusta and Coffea eugenioides, that crossed hundreds of thousands of years ago.",
    oneMoreThing:
      "Coffee flowers lace their nectar with caffeine. In a 2013 study, bees rewarded with it were three times as likely to remember a flower's scent, which keeps pollinators coming back.",
    facts: [
      'Unroasted coffee seeds are pale green and smell grassy rather than like coffee.',
      'A typical tree yields roughly 4.5 kg of cherries a year: 0.9 kg of green coffee.',
      'Dried coffee cherry skins, called cascara, are brewed as a tea.',
    ],
    stat: { value: '2', label: 'Seeds per cherry' },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['coffee', 'coffee bean', 'coffee cherry', 'peaberry', 'arabica', 'robusta', 'green coffee', 'roasting'],
    relatedTopics: ['black-pepper', 'chili-heat', 'bananas-curve', 'honey-spoil'],
    icon: 'coffee',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'National Coffee Association USA: What is coffee?',
      url: 'https://www.aboutcoffee.org/origins/what-is-coffee/',
    },
  },
  {
    id: 'chili-heat',
    description:
      "Chilli heat is not a taste but a pain signal. Capsaicin binds to TRPV1, a receptor on nerve endings that normally responds to painful heat above about 43 °C, so the brain reads a chemical as a burn. Birds' version of the receptor is insensitive to capsaicin.",
    shortFact: 'Capsaicin fools a heat sensor in your nerves, so your mouth reports a burn that is not there.',
    interestingFact:
      'Tewksbury and Nabhan found the burn is selective: rodents that eat chillies destroy the seeds, while birds, unbothered by capsaicin, swallow them whole and scatter them intact.',
    oneMoreThing:
      'Capsaicin helped reveal how we sense heat. David Julius used it to identify TRPV1 in 1997, work that earned him a share of the 2021 Nobel Prize in Physiology or Medicine.',
    facts: [
      'Most capsaicin sits in the pale pith holding the seeds, not in the seeds themselves.',
      'Wilbur Scoville devised his heat scale in 1912, using diluted extracts and human tasters.',
      'Capsaicin works on skin too, which is why chopping chillies can make eyes sting.',
    ],
    stat: { value: '~43 °C', label: 'TRPV1 heat threshold' },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['chilli', 'chili pepper', 'capsaicin', 'spicy food', 'trpv1', 'scoville', 'birds', 'why is chilli hot'],
    relatedTopics: ['onions-cry', 'black-pepper', 'coffee-cherry', 'bird-migration'],
    icon: 'flame',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Tewksbury & Nabhan, Nature (2001)',
      url: 'https://doi.org/10.1038/35086653',
    },
  },
  {
    id: 'onions-cry',
    description:
      'An onion keeps its sulphur compounds and the enzymes that act on them in separate compartments of its cells. Cutting breaks those cells, the two mix, and the onion releases a volatile irritant, syn-propanethial S-oxide. It drifts up to your eyes, stimulates nerves in the cornea, and tears flush it away.',
    shortFact: 'A cut onion makes its own mild tear gas, a defence against being eaten.',
    interestingFact:
      'For decades one enzyme was blamed. In 2002, researchers at the Japanese firm House Foods found a second, lachrymatory factor synthase, that specifically makes the tear compound.',
    oneMoreThing:
      'When scientists silenced that enzyme in 2008, the onions made far less tear compound, and the chemistry flowed into other sulphur compounds instead.',
    facts: [
      'Chilling an onion before cutting slows the reaction and keeps more irritant out of the air.',
      'A sharp knife crushes fewer cells, so it releases less of the irritant.',
      'Garlic makes little of the tear compound, so it rarely makes eyes water.',
    ],
    stat: { value: '2002', label: 'Tear enzyme found' },
    certainty: 'established',
    moods: ['useful', 'surprising'],
    keywords: ['onions', 'crying', 'tears', 'cutting onions', 'syn-propanethial s-oxide', 'kitchen tips', 'why onions make you cry'],
    relatedTopics: ['chili-heat', 'black-pepper', 'popcorn-pops', 'honey-spoil'],
    icon: 'droplets',
    difficulty: 2,
    estimatedReadTime: 50,
    source: {
      label: 'Imai et al., Nature (2002)',
      url: 'https://doi.org/10.1038/419685a',
    },
  },
  {
    id: 'black-pepper',
    description:
      "Black pepper is the dried fruit of Piper nigrum, a climbing vine native to the Malabar Coast of south-west India, in today's Kerala. For centuries it was among the most valuable goods in long-distance trade: compact, durable and always in demand. At times it was used as payment in place of money.",
    shortFact: "Medieval English rents were sometimes paid in pepper, and 'peppercorn rent' survives in law today.",
    interestingFact:
      "When Alaric's Goths besieged Rome in 408 CE, the ransom reportedly included 3,000 pounds of pepper, alongside 5,000 pounds of gold and 30,000 of silver.",
    oneMoreThing:
      'Real peppercorns still change hands in Bermuda, where Freemasons pay one each year as rent for the Old State House, a ceremony about two centuries old.',
    facts: [
      'Black, white and green pepper all come from the same vine, processed differently.',
      'Laws of King Æthelred set a toll in pepper on ships trading at Billingsgate.',
      'Vasco da Gama reached Calicut in 1498, opening a sea route to the pepper coast.',
    ],
    stat: { value: '3,000 lb', label: "Rome's pepper ransom" },
    certainty: 'established',
    moods: ['surprising', 'strange'],
    keywords: ['black pepper', 'peppercorn', 'peppercorn rent', 'spice trade', 'malabar coast', 'kerala', 'piper nigrum', 'spices'],
    relatedTopics: ['chili-heat', 'cuneiform', 'coffee-cherry', 'roman-concrete'],
    icon: 'coins',
    difficulty: 1,
    estimatedReadTime: 50,
    source: {
      label: 'Tarlton Law Library, University of Texas at Austin: Peppercorn rent',
      url: 'https://tarlton.law.utexas.edu/peppercorn-rent',
    },
  },
  {
    id: 'tall-ceilings',
    description:
      "Before electric light and air conditioning, a room's height did real work. Tall windows pushed daylight deeper inside, and heat and smoke from fires, candles and lamps could rise above people's heads. Height also signalled status, so the grandest rooms got the most of it.",
    shortFact: 'A tall ceiling was a lighting and cooling system before electricity took over both jobs.',
    interestingFact:
      'In many Georgian town houses, height ranked the floors: the first-floor drawing room was usually the loftiest, and servants slept in low attic rooms.',
    oneMoreThing:
      'Many new homes have ceilings of about 2.4 metres, the length of a standard sheet of plasterboard. Electric light and air conditioning removed most of the old reasons to build higher.',
    facts: [
      'As a rule of thumb, useful daylight reaches about twice the window-head height into a room.',
      'In hot climates, high ceilings let warm air collect above head height.',
      'Victorian health reformers prized airy rooms, believing disease spread through foul air.',
    ],
    stat: { value: '~2.4 m', label: 'Typical modern ceiling' },
    certainty: 'established',
    moods: ['useful', 'beautiful'],
    keywords: ['high ceilings', 'tall ceilings', 'old houses', 'georgian architecture', 'victorian homes', 'ventilation', 'daylight', 'ceiling height'],
    relatedTopics: ['flying-buttress', 'roman-concrete', 'pisa', 'bridges-weight'],
    icon: 'lamp-ceiling',
    difficulty: 1,
    estimatedReadTime: 45,
    source: {
      label: 'US National Park Service, Preservation Brief 24: Heating, Ventilating, and Cooling Historic Buildings',
      url: 'https://www.nps.gov/orgs/1739/upload/preservation-brief-24-heating-cooling.pdf',
    },
  },
  {
    id: 'flying-buttress',
    description:
      'A tall stone vault pushes outwards as well as down. Gothic builders caught that sideways thrust with flying buttresses: stone half-arches that leap from the upper walls, over the aisles, to heavy piers outside. With the push handled outside, walls could be thinner and filled with large stained-glass windows.',
    shortFact: "By moving the vault's outward push outside, flying buttresses freed Gothic walls for glass.",
    interestingFact:
      'The system keeps stone in compression, like a prop leaning on a wall. Masonry is strong when squeezed but weak when pulled, so Gothic builders kept every force pushing.',
    oneMoreThing:
      'Beauvais Cathedral pushed the idea to its limit, with a choir vault nearly 47 metres high. In 1284, probably during a storm, some of its flying buttresses broke and part of the vault fell.',
    facts: [
      'The heavy pinnacles on buttress piers add weight that helps steer the thrust downwards.',
      'An upper tier of flyers often braces the high walls against wind.',
      'Notre-Dame de Paris, begun in 1163, was among the first great churches to use them.',
    ],
    stat: { value: '~47 m', label: 'Beauvais choir vault' },
    certainty: 'established',
    moods: ['beautiful', 'surprising'],
    keywords: ['flying buttress', 'gothic architecture', 'cathedral', 'notre-dame', 'stained glass', 'vault', 'thrust', 'medieval engineering'],
    relatedTopics: ['bridges-weight', 'roman-concrete', 'pisa', 'tall-ceilings'],
    icon: 'church',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Fuentes, Journal of Mechanics of Materials and Structures (2018)',
      url: 'https://msp.org/jomms/2018/13-5/p03.xhtml',
    },
  },
  {
    id: 'bridges-weight',
    description:
      'Every bridge must hold itself up before it carries anything else, and on long spans its own weight is the biggest load. Engineers choose shapes that send forces along paths materials handle well: arches squeeze, cables pull, and beams do both, compressed along the top and stretched along the bottom.',
    shortFact: 'On the longest bridges, most of the strength goes into holding up the bridge itself.',
    interestingFact:
      'Steel wire is at its best in tension, so the longest spans hang from cables. These pass over the towers to massive anchorages, which resist the pull.',
    oneMoreThing:
      'Robert Hooke described the ideal shape for a stone arch in the 1670s: a hanging chain, turned upside down. He hid the idea in a Latin anagram, solved only after his death.',
    facts: [
      'Each Golden Gate main cable holds 27,572 steel wires, bundled into 61 strands.',
      "The Golden Gate's anchorages weigh about 54,000 tonnes each, to resist the cables' pull.",
      "Turkey's 1915 Çanakkale Bridge, opened in 2022, set a record with 2,023 metres between towers.",
    ],
    stat: { value: '27,572', label: 'Wires per cable' },
    certainty: 'established',
    moods: ['beautiful', 'useful'],
    keywords: ['bridges', 'bridge engineering', 'suspension bridge', 'arch', 'tension', 'compression', 'golden gate', 'structures'],
    relatedTopics: ['flying-buttress', 'roman-concrete', 'pisa', 'airplane-windows'],
    icon: 'bridge',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Golden Gate Bridge, Highway and Transportation District: design and construction statistics',
      url: 'https://www.goldengate.org/bridge/history-research/statistics-data/design-construction-stats/',
    },
  },
  {
    id: 'pisa',
    description:
      'The tower stands on soft silt and clay, which compressed unevenly while it was built between 1173 and the 1370s. By 1990 it leaned about 5.5 degrees and was closed as unsafe. From 1999 to 2001, engineers drew small amounts of soil from beneath its north side, letting it settle back.',
    shortFact: 'Engineers straightened the tower slightly by drilling soil out from under its high side.',
    interestingFact:
      'The danger was not weak ground but soft ground. Above a critical height, any small tilt feeds on itself, and Pisa was very close to toppling.',
    oneMoreThing:
      'The correction was about half a degree, moving the top back roughly 45 centimetres, to where it stood in the early 19th century. It was deliberately too small to see.',
    facts: [
      'About 38 cubic metres of soil were removed, roughly 70 tonnes.',
      'In 1993, 600 tonnes of lead were placed on the north side as a stopgap.',
      'Later masons built the upper floors slightly taller on one side, giving the tower a curve.',
    ],
    stat: { value: '~45 cm', label: 'Lean reduced' },
    certainty: 'established',
    moods: ['surprising', 'useful'],
    keywords: ['leaning tower of pisa', 'pisa', 'soil extraction', 'foundations', 'geotechnical engineering', 'tower', 'italy', 'lean'],
    relatedTopics: ['flying-buttress', 'bridges-weight', 'roman-concrete', 'tall-ceilings'],
    icon: 'landmark',
    difficulty: 2,
    estimatedReadTime: 55,
    source: {
      label: 'Burland, Jamiolkowski & Viggiani, Soils and Foundations (2003)',
      url: 'https://www.jstage.jst.go.jp/article/sandf1995/43/5/43_5_63/_article',
    },
  },
];
