# Knowspace expansion — writer brief

Knowspace is an infinite canvas of small, true things worth knowing. People pan around, see a picture, get curious, click, and read a one-minute explanation. You are adding new knowledge objects. Quality of the facts is the whole product.

Project root: `/Users/sayttomdas/Claude test/knowscape` (run every command from there).

## Read first
- `src/domain/knowledge/model/types.ts` — `Entry` = `CatalogEntry & KnowledgeText`. Field docs give limits.
- `src/domain/knowledge/data/text/batch-a.ts` — two or three entries, to match tone and density.
- `art/existing-topics.txt` — the 75 existing topics (`category | id | title`). Do not repeat them or near-duplicates.

## Write
Your file is `src/domain/knowledge/data/more/<group>.ts` (already exists, empty; it is already wired into the app). Keep exactly this shape — only a type import, then the array:

```ts
import type { Entry } from '../types';

export const entries: Entry[] = [
  {
    id: 'kebab-case-id',
    title: 'Why the sky turns red at sunset',
    category: 'science',
    subcategory: 'Light',
    visual: { kind: 'photo', image: 'kebab-case-id' },
    description: '...',
    shortFact: '...',
    interestingFact: '...',
    oneMoreThing: '...',
    facts: ['...', '...', '...'],
    stat: { value: '...', label: '...' },
    certainty: 'established',
    moods: ['surprising'],
    keywords: ['...', '...', '...', '...'],
    relatedTopics: ['...', '...', '...'],
    icon: 'lucide-name',
    difficulty: 1,
    estimatedReadTime: 45,
    source: { label: '...', url: 'https://...' },
  },
];
```

## Choosing topics
- Aim for "I didn't know that": a common thing with a surprising mechanism or history, a strange creature, a counter-intuitive fact. Mix quick wins (difficulty 1) with a few deeper ones.
- Titles: sentence case, ≤ 64 characters, a question or a statement that makes someone want to click. Vary the form (not all "Why…").
- Stay inside your categories' scope (below). Never duplicate an existing topic.
- No topics centred on living or recently dead individual people, politics, religion as belief, medical advice, or anything grim/graphic.

## Facts and voice (critical)
- Accurate. No myths, no fake "fun facts", no invented numbers. If a popular claim is overstated or unsettled, explain what's established, set `certainty: 'debated'` and add a one-sentence `caveat`. Use 'debated' only for real disagreement.
- Calm, intelligent, editorial. Short sentences. No exclamation marks, no "Did you know", no "fascinating"/"amazing"/"mind-blowing". British spelling (colour, metre, centre, behaviour, grey).
- Limits: description ≤ 55 words in 2–3 sentences; shortFact ≤ 18 words (the hook shown on the card, not a repeat of the title); interestingFact ≤ 35; oneMoreThing ≤ 40 (a genuinely surprising extra); facts = 3 different items ≤ 16 words each; stat label 1–3 words.
- `relatedTopics`: 3–5 ids, strongest link first, never itself. Use ids from `art/existing-topics.txt` and your own new ids.
- `icon`: a lucide-react name that exists (`ls node_modules/lucide-react/dist/esm/icons/<name>.mjs`).
- `source`: one reputable source per entry (NASA, NOAA, USGS, Met Office, NHS, WHO, Smithsonian, museums, universities, national science bodies, peer-reviewed papers via doi.org, company history pages for company facts). Verify every URL: `curl -sIL -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0' '<url>'` must end in 200. Britannica/Smithsonian Magazine often 403 to curl — use another source rather than guessing.

## Visuals — how each card is drawn
Use only these kinds:
- `{ kind: 'object', image: '<id>' }` — a single physical thing as a studio cut-out (an object, food, tool, fossil, shell, instrument, model). About 40% of your entries.
- `{ kind: 'photo', image: '<id>' }` — an editorial photograph (animals in habitat, landscapes, architecture, weather, scenes). About 45%.
- `{ kind: 'map', lat, lon, place: 'Place, Country' }` — when the story is about a specific place. A few at most.
- `{ kind: 'type' }` — a typographic card that shows the `stat` big. Requires a strong `stat`. A few at most (good for abstract ideas like economics or psychology).

The image name must equal the entry id.

### Generating images
Load the tool once: `ToolSearch` with query `select:mcp__6474eeb9-ebce-4573-86e4-15c7694a9d24__generate_image`.
Call it with `planKey: "team::1571005357460170020"` (the Host OS team plan, which the user chose; do not use any other plan), `model: "gemini-3.1-flash-image"`.

Object prompt (1024×1024), fill in the subject:
> `<one specific subject, materials, colour, angle>`. High-end studio product photograph on a seamless pure warm off-white background (#F7F6F3), soft diffuse daylight from the upper left, soft natural contact shadow, crisp detail, calm minimal composition, centered with generous empty space. No text, no logo.

Photo prompt (768×1024 portrait, 1024×768 landscape, or 1024×1024):
> `<specific scene>`, editorial `<nature | architecture | travel | food | macro>` photography, natural light, calm and minimal, `<portrait | landscape | square>` framing. No text, no logos, no recognisable real people.

Then download immediately (URLs expire):
```
curl -sL -o "art/raw/<id>.png" "<image.url>" && echo "<id> <image.url>" >> art/sources.txt
```
Look at the thumbnail you get back. Regenerate once if it's wrong (wrong subject, garbled text or letters, extra limbs, cluttered background for an object). Never depict real identifiable people.

If image generation keeps failing or is rate-limited: carry on writing text and retry later; if it still fails at the end, switch that entry to `type` (with a stat) or `map` and say so in your report.

## Check before you finish
```
node scripts/validate-content.mjs src/domain/knowledge/data/more/<group>.ts --expect <category>:<n>[,<category>:<n>]
npx tsc --noEmit
```
Both must pass (warnings about spelling are advisory — fix real US spellings, ignore false positives in proper nouns). Do not edit any file other than your own `src/domain/knowledge/data/more/<group>.ts`, `art/raw/*.png` and appending to `art/sources.txt`.

## Report back
Count written per category, how many object/photo/map/type, entries marked 'debated', any URL or image you could not get, and any image you had to regenerate.
