# Prompty do Claude Design — nowe podstrony projekty-arkon.pl

Jak używać: do każdego promptu **załącz odpowiedni plik makiety HTML** (zawiera całą docelową treść PL). Prompt nr 0 to wspólny opis identyfikacji wizualnej — wklej go na początku każdej rozmowy z Claude Design, a potem prompt konkretnej strony.

---

## 0. MASTER PROMPT — identyfikacja wizualna (wklejać zawsze jako pierwszy)

```
You are designing a new subpage for projekty-arkon.pl — a Polish architecture & construction design office (Biuro Projektowe ArKon). The new page must look like it was always part of the existing site. Follow this design system exactly (extracted from the live site):

BRAND & VISUAL IDENTITY
- Fonts: headings "DM Sans" (weight 700), body text "Manrope" (400/500/600). Google Fonts.
- Colors:
  - Ink (primary dark): #17191C — headings, dark sections, footer
  - Brass/gold (accent): #B49764 — buttons, links, accents, hover states; also used at 25% and 40% opacity for subtle backgrounds/borders
  - Off-white: #FAFAFA — text on dark backgrounds, light section backgrounds
  - Warm paper: #F9F8F6 — alternate light section background
  - Gray (secondary text): #797D86; light gray (borders/dividers): #BCBEC2
- Buttons: solid #B49764 background, white text, UPPERCASE labels, sharp corners (border-radius: 0), generous padding. Secondary button: transparent with 1px #B49764 or #FAFAFA border, same sharp corners.
- Headline scale is large and confident: H1 ~72px desktop / ~40px mobile, H2 ~48px, both weight 700. Body ~16-18px, line-height ~1.6.
- Overall mood: premium, architectural, calm. Lots of whitespace, strong typographic hierarchy, thin lines, no rounded cards, no drop-shadow overload. Dark hero sections with light text are part of the site's language.
- Sections alternate: dark (#17191C) hero and CTA bands, light (#FAFAFA / #F9F8F6) content sections.

HARD RULES
1. All copy is provided in the attached HTML wireframe — use it VERBATIM (Polish, including diacritics). Do not rewrite, translate, shorten or "improve" the texts. Text in [square brackets] stays as-is (client will fill it in).
2. IMAGES: keep every image as a PLACEHOLDER. Render each one as a neutral block (e.g. #ECECEC with a subtle diagonal-stripe pattern or a thin #BCBEC2 border) containing the placeholder description text from the wireframe (e.g. "ZDJĘCIE: kierownik budowy w kasku..."). You may optionally generate a tasteful architectural image as a stand-in, but the placeholder description must remain visible as a caption so the client knows what to shoot/replace.
3. The wireframe's section ORDER and section TYPES (hero, trust bar, photo+text, step cards, FAQ accordion, CTA band) are fixed. You design the visual execution, not the information architecture.
4. Ignore the wireframe's own gray "wireframe" styling (dashed borders, section tags, blue SEO box, yellow notes) — those are annotations for developers, not part of the design. Do NOT include the SEO info box, breadcrumb note or yellow notes in the visual design; DO include a real breadcrumb element where indicated.
5. Fully responsive: desktop 1440px, tablet, mobile 390px. Single-file HTML/CSS output preferred.
6. Sticky top navigation and footer: reuse the pattern of projekty-arkon.pl (logo left, menu right: O nas, Usługi, Galeria, Blog, Kontakt + phone number as gold button; footer: dark, with NAP data — Żegocina 149, 32-731 Żegocina, tel. 888 899 366, biuro@projekty-arkon.pl).
7. Phone CTAs must be tel: links (+48888899366), email CTAs mailto: links.
8. FAQ sections: accessible accordion (details/summary or ARIA), one item open by default.
```

---

## 1. /uslugi/kierownik-budowy — załącz `uslugi-kierownik-budowy.html`

```
Design the service page "Kierownik budowy" using the attached wireframe (uslugi-kierownik-budowy.html) and the ArKon design system from my previous message.

Page-specific art direction:
- This is the flagship service page — the most conversion-focused page on the site. Dark, full-width hero (#17191C or a darkened photo placeholder) with the H1, lead paragraph and two CTAs (gold solid + outline). Keep the phone number visually dominant.
- Trust bar directly under the hero: 4 stat tiles on a light background; numbers in DM Sans 700 with gold accents. These contain [placeholders] — style them anyway.
- "Za co odpowiada kierownik budowy?" — split section, text left, tall image placeholder right; checklist items with thin gold check/line markers (no emoji).
- "Kierownik z biura projektowego" — inverted split (image left). Consider a subtle warm-paper (#F9F8F6) background to break rhythm.
- 4 process steps: numbered cards in one row (stack on mobile), large gold step numerals, sharp corners, thin borders.
- Pricing section: two columns — explanation text + a highlighted price card ("od [X XXX] zł") with gold border and a strong CTA. Make the price card feel premium, not salesy.
- Coverage area: map placeholder left, linked city list right (links styled in gold). 
- FAQ accordion, then a dark full-width CTA band with phone + email buttons and office hours line.
- Sprinkle a very subtle architectural motif if desired (thin grid lines / blueprint feel), but keep it restrained.
```

---

## 2. /uslugi/adaptacja-projektu — załącz `uslugi-adaptacja-projektu.html`

```
Design the service page "Adaptacja projektu gotowego" using the attached wireframe (uslugi-adaptacja-projektu.html) and the ArKon design system.

Page-specific art direction:
- Hero: split layout — headline + CTAs left, tall image placeholder right (catalog project on a desk). Light hero works here (#FAFAFA) with ink text, to differentiate from the kierownik-budowy page; keep one gold CTA.
- "Czym jest adaptacja..." — text + image split with a 5-item list; style list markers as thin gold dashes.
- KEY SECTION — "Zanim kupicie projekt — sprawdzimy go bezpłatnie": design this as the visual centerpiece. Full-width band in #17191C or gold-tinted (#B49764 at 25% on warm paper) with centered text and a single strong CTA. It must stand out when scrolling.
- 5 process steps: since 5 don't fit one row, use a horizontal timeline on desktop (numbered nodes connected by a thin line) collapsing to vertical on mobile.
- "Adaptacja, geodezja i kierownik budowy — w jednym biurze": split with image left; include the internal link to the kierownik budowy page styled as a gold arrow-link.
- FAQ accordion + final CTA band (dark) as in the wireframe.
```

---

## 3. /uslugi/projekty-indywidualne — załącz `uslugi-projekty-indywidualne.html`

```
Design the service page "Projekty indywidualne" using the attached wireframe (uslugi-projekty-indywidualne.html) and the ArKon design system.

Page-specific art direction:
- This page sells creativity — make it the most visual of the three service pages. Hero: large visualization placeholder as full-bleed background with dark overlay, H1 in off-white, two CTAs.
- "Projekt indywidualny czy adaptacja gotowego?" — two comparison cards side by side; give the "indywidualny" card a gold top border and the "gotowy" card a neutral one; below them the honest-advice paragraph as a full-width italic or highlighted note.
- 5 process steps: vertical timeline with generous spacing (this is a storytelling page, slower rhythm than the kierownik page).
- Portfolio "Zaprojektowaliśmy je od zera": 3x2 grid of project cards — image placeholder on top, project name, one-line description placeholder. Hover: subtle gold underline / image zoom. Link "Zobacz wszystkie realizacje" as outline button centered below.
- "Co dokładnie dostajecie" — checklist left, consultation card right (gold border, centered, phone CTA).
- FAQ accordion + final CTA band. The final CTA copy mentions coffee and visiting the office — you may pair it with a warm office photo placeholder.
```

---

## 4. /biuro-projektowe-bochnia — załącz `biuro-projektowe-bochnia.html`

```
Design the local landing page "Biuro projektowe Bochnia" using the attached wireframe (biuro-projektowe-bochnia.html) and the ArKon design system.

Page-specific art direction (this layout becomes the TEMPLATE for all 5 local pages — design it so only content changes):
- Hero: split — H1 + lead + CTAs left, tall image placeholder right (local realization photo). Include a small breadcrumb above the H1.
- "Znamy Bochnię..." local-knowledge section: text left, map/route placeholder right. The map placeholder should be styled as a framed panel with a thin gold border — it will later hold a custom route graphic (Żegocina → Bochnia).
- Services for local investors: 4 equal cards in a row, each with title, 2-line description and a gold arrow-link "Więcej →". Sharp corners, thin #BCBEC2 borders, gold hover.
- Local realizations: 3 project cards (image placeholder + title + short description placeholder), same card language as the portfolio grid on the projekty-indywidualne page — consistency matters.
- Local FAQ accordion.
- Final CTA band (dark) with phone/email and the distance line ("Żegocina 149 · 20 km od Bochni") in small gray text.
- Keep the page compact — local pages are shorter than service pages; no extra sections.
```

---

## 5. /biuro-projektowe-limanowa — załącz `biuro-projektowe-limanowa.html`

```
Design the local landing page "Biuro projektowe Limanowa" reusing EXACTLY the local-page template from the Bochnia page (same sections, spacing, card styles), with the attached wireframe content (biuro-projektowe-limanowa.html).

Page-specific differences only:
- Hero image placeholder: mountain-terrain house ("dom na 600 m n.p.m. z widokiem na Tatry") — if you generate a stand-in image, make it a modern house on a slope with mountain backdrop.
- The local-knowledge section here is about mountain terrain, slopes and landslide zones — you may add a very subtle topographic-contour-lines motif in the section background (max 5% opacity, ink color).
- The 4th service card is "Analizy działek" (not Geodezja) — content comes from the wireframe.
```

---

## 6. /biuro-projektowe-brzesko — załącz `biuro-projektowe-brzesko.html`

```
Design the local landing page "Biuro projektowe Brzesko" reusing EXACTLY the local-page template from the Bochnia page, with the attached wireframe content (biuro-projektowe-brzesko.html). No layout changes — content swap only. Hero image placeholder: realization in Dębno. Distance line in footer CTA: "ok. 27 km od Brzeska".
```

---

## 7. /biuro-projektowe-wieliczka — załącz `biuro-projektowe-wieliczka.html`

```
Design the local landing page "Biuro projektowe Wieliczka" reusing EXACTLY the local-page template from the Bochnia page, with the attached wireframe content (biuro-projektowe-wieliczka.html).

Page-specific differences only:
- Hero targets people moving out of Kraków — if you generate a stand-in hero image, show a modern suburban single-family house on a smaller plot.
- The 4th service card is "Analizy działek".
- This is the most competitive location — make sure the hero headline and phone CTA are immediately visible above the fold on mobile (390px).
```

---

## 8. /biuro-projektowe-gdow — załącz `biuro-projektowe-gdow.html`

```
Design the local landing page "Biuro projektowe Gdów" reusing EXACTLY the local-page template from the Bochnia page, with the attached wireframe content (biuro-projektowe-gdow.html).

Page-specific differences only:
- Hero image placeholder: house in an open river-valley landscape (dolina Raby).
- The 4th service card is "Analizy działek".
- The local-knowledge section mentions flood zones and WZ decisions — keep the tone reassuring, not alarming, in the visual hierarchy (no warning colors; gold/ink only).
```

---

## Wskazówki praktyczne

- Kolejność pracy: najpierw prompt 0 + 1 (kierownik budowy), potem 0 + 4 (Bochnia jako szablon lokalny), potem pozostałe lokalne (5–8) w tej samej rozmowie co Bochnia — Claude Design będzie miał szablon w kontekście i zachowa spójność.
- Jeśli Claude Design zmieni teksty PL — odpowiedz: "Restore the exact Polish copy from the attached wireframe, verbatim."
- Jeśli wygeneruje zdjęcia zamiast placeholderów bez podpisów — odpowiedz: "Keep the placeholder captions visible under each image so I know what to replace."
