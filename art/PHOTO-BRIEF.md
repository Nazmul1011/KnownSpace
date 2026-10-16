# Finding real photos for Knowspace cards

Some knowledge cards have no picture yet and show a placeholder icon. Your job: find a real, openly licensed photo for each card in your batch file, so that the card shows a picture instead.

Project root: `/Users/sayttomdas/Claude test/knowscape` — run commands from there.

## Your batch
`art/pending-part-NN` (tab-separated: `id`, `kind`, `width`, `height`, `prompt`). The `prompt` describes what the picture should show — use it to understand the subject, then search for a real photo of that subject. The card's title and text are in `src/content/more/*.ts` (search for `id: '<id>'`).

## Where to search
Openverse (no key needed):
```
curl -s -A "Knowspace/1.0" "https://api.openverse.org/v1/images/?q=<url-encoded query>&license=cc0,pdm,by,by-sa&page_size=12&mature=false"
```
Each result has `url` (full image), `thumbnail`, `title`, `creator`, `license`, `license_version`, `license_url`, `foreign_landing_url` (source page), `source`/`provider`, `width`, `height`.
- Only licenses cc0, pdm, by, by-sa.
- Prefer width ≥ 1000. Never below 700.
- Try 2–4 phrasings if the first search is weak (common name, scientific name, object name).

## How to choose (look before you pick)
Download candidates to your scratch space and **view them** with the Read tool before deciding:
```
curl -sL -A "Mozilla/5.0" -o /tmp/<something>.jpg "<url>"
```
A photo is acceptable only if:
- It clearly shows the subject of the card (the thing itself, not a vaguely related scene).
- It looks like a good editorial photograph: sharp, well exposed, not a screenshot, scan of a page, diagram, logo, meme or clip-art.
- No visible watermark, burned-in caption or large text.
- No identifiable person as the main subject (hands or distant figures are fine). No gore or distressing content.
- Not mostly black/blank.

If nothing acceptable exists after a few searches, **skip that card** — leaving its icon is fine. Quality over coverage. Aim to find photos for roughly 3 out of 4 cards.

## Save
Convert and save as PNG at most 1600 px wide:
```
node -e "require('sharp')(process.argv[1]).rotate().resize({width:1600,withoutEnlargement:true}).png().toFile(process.argv[2]).then(()=>console.log('ok'))" /tmp/<file>.jpg "art/raw/<id>.png"
```
Then append one credit line to `art/credits.tsv` (tab-separated, no tabs inside fields):
```
<id>\t<photo title>\t<creator>\t<license e.g. CC BY-SA 2.0>\t<license_url>\t<foreign_landing_url>\t<provider>
```
Use a short `printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\n' ... >> art/credits.tsv`. Every saved image must have exactly one credit line.

Do not edit any other files. Do not touch ids outside your batch.

## Report
Count found vs skipped, the list of skipped ids, and any image you are unsure about.
