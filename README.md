# Treevolution Professional Tree Services — website

Single-page site in plain HTML, Tailwind CSS v3 (compiled and committed) and a small vanilla JS file. No frameworks, no runtime CDNs.

## Folder layout

```
index.html              ← the whole site; sections are split by big comment banners
thanks.html             ← page shown after the quote form is sent
404.html                ← "page not found" (uses <base href> so it works at any depth)
assets/css/styles.css   ← compiled Tailwind – don't edit, rebuild instead
assets/js/main.js       ← menu, reveals, header, services explorer, lightbox, form, sticky mobile bar
assets/fonts/           ← Bricolage Grotesque + Figtree (woff2) with their OFL licences
images/brand/           ← logo.svg (redrawn), mark.svg (tree for favicons), mark-orange.svg
images/illustrations/   ← defender.svg – the Land Rover graphic (also inlined in the pages)
images/work/            ← photos as WebP: name.webp (large) + name-sm.webp (small)
images/                 ← favicons, og-image.jpg, site.webmanifest
src/input.css           ← Tailwind source, @font-face, components and keyframes
tailwind.config.js      ← brand colours and fonts
package.json            ← npm run build / npm run watch
sitemap.xml, robots.txt
_fb-pack/               ← Facebook research pack (not published – see Source)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| forest-800 | `#063A1B` | Logo panel green – header logo, footer, dark accents, theme colour |
| forest-900 | `#0A2E17` | Body text, "Recent work" section, footer |
| leaf-600 | `#2E7D3A` | Livery green (Defender bodywork) – highlight word in the hero, icons, the Land Rover graphic |
| leaf-50…300 | `#EFF5E6` → `#A9CB8B` | Pale greens for trees, backgrounds and the About section |
| ember-500 | `#EC6E17` | "TREE" orange from the logo – quote buttons, underline, accents |
| amber | `#F5B335` | Pinstripe under the orange stripe on the vehicles |
| bark-100…700 | `#F4EEE2` → `#5E4430` | Logs & woodchip section, trunks, the lane under the hero |
| paper | `#F8F6EF` | Page background |

- **Fonts:** Bricolage Grotesque (headings), Figtree (body). Self-hosted from `@fontsource`.
- **Logo:** the only clean version on Facebook was ~400px inside a poster, so it was **redrawn as SVG** (`images/brand/logo.svg`) with the same lettering, layout and colours. Text is converted to outlines, so it looks the same everywhere.
- **Illustrations:** the trees, the Land Rover tipper, the stump-grinding drawing and the icon sprite are all hand-built SVG in the page.

## Editing

- **Text:** edit `index.html` directly – each section is marked with a comment banner (`HERO`, `SERVICES`, `LOGS & WOODCHIP`, `RECENT WORK`, `ABOUT`, `CONTACT`).
- **Colours / fonts:** change `tailwind.config.js`, then run `npm install` (first time) and `npm run build`.
- **Services explorer:** each service is a `<button role="tab">` (the list) plus a matching `<div role="tabpanel">` (photo, text, "What's included"). To add one, copy a tab + panel pair, give both a new id (`tab-xxx` / `panel-xxx`, `data-tab` / `data-panel`), and add the service to the `<select>` in the quote form. The "Get a quote" button in a panel pre-selects the service whose name matches its `data-quote`.
- **Logs prices:** in the `LOGS & WOODCHIP` section (`price-row` list). Also update the `Offer` prices in the JSON-LD in `<head>`.
- **Adding a work photo:** make two WebP files, e.g. `images/work/new-job.webp` (~1600px wide) and `new-job-sm.webp` (~800px). Copy one of the `<button class="work-tile">` blocks in the `RECENT WORK` gallery, update `data-src` (large file), `data-caption`, the `<img>` src/srcset, width/height and alt. The lightbox picks it up automatically. Tile size is set with `col-span-2` / `row-span-2`.
- **Before/after slider:** not used – tree work has no matching before/after pairs in the pack.
- **The Land Rover:** drives along the lane under the hero (`.drive` in `src/input.css` sets its size and speed). It parks still for visitors who prefer reduced motion.

## Before going live — checklist

- [ ] Swap the GitHub Pages URL `https://tobygregg.github.io/treevolution-professional-tree-services/` for the real domain in: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD (`url`, `@id`, `image`, `logo`), `sitemap.xml`, `robots.txt` and the form's `_next` field. Change (or remove) the `<base href>` in `404.html`.
- [ ] **When the client goes ahead, switch the form from Toby's email (`toby1@greggs.org`) to the client's email in the form `action`, then send one test enquiry and click FormSubmit's activation link.**
- [ ] Confirm the phone (07781 131605) and email (cstonebridge@cwgsy.net) are still current.
- [ ] Get Chris to sign off the services wording. Assumptions made from the photos and posts:
  - "Tree surgery" bullets (cutting back overhanging branches, removing dead wood, sectional dismantling) are standard tree-surgery work inferred from the climbing photos and the arborist job advert – not listed word for word on Facebook.
  - "Timber cut into logs or taken away" and "Drives and access cleared" are inferred.
  - Stump grinding, fallen tree removal, dangerous tree work and emergency call-outs come from their Storm Austen poster.
  - "Fully qualified & insured" is taken from the signwriting on their vehicles and site sign.
- [ ] Check the logs and woodchip prices are current (£125 mixed bag, £150 hardwood, £75 per ton bag of woodchip, tipper loads on request – from an undated price list).
- [ ] Check Chris is happy to be named in the About section and contact list, and with the GSPCA / Storm Austen story.
- [ ] Ask for more photos (finished jobs, climbing work, stump grinding) – there are only ~10 usable images, so some appear in more than one place. A higher-resolution logo file would also be good.
- [ ] Left out on purpose: the 2021 New Year message and the arborist job advert (out of date), the GSPCA's own thank-you graphic (their design) and the AI-style Storm Austen poster. There are no reviews on the page, so there is no testimonials section; no FAQ either, as the pack doesn't answer enough customer questions.

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, photos). The underscore folder isn't published by GitHub Pages, so it never appears on the live site.
