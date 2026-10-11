# 15 – Edytor treści w CMS, poradniki, los krótkich wpisów

**Priorytet:** 4 (długofalowo, start po zadaniach 1–2) · **Kto:** dev (edytor) + ArKon (treść) · **Wysiłek:** 2 dni dev, potem 2–3 h tygodniowo po stronie biura · **Zależności:** brak

## Cel

Blog przestaje być kroniką z Facebooka i zaczyna odpowiadać na pytania inwestorów z regionu. Google indeksuje wpisy, a te przynoszą ruch niebrandowy.

## Dowód

- 38 wpisów, średnio ok. 170 słów na stronie (34–345); tylko jeden ma ponad 300 słów.
- GSC: 34 wpisy mają status „Strona wykryta – obecnie niezindeksowana”. Cały blog: 0 kliknięć i 66 wyświetleń w 2,5 miesiąca.
- `BlogPostPage.tsx` (linia ok. 47) dzieli `tresc` na akapity po pustych liniach. Nie ma śródtytułów, linków, list ani zdjęć w treści.
- GA4: lista bloga ma 53 odsłony na 28 dni.

## Część A – edytor (dev)

### Pliki

- `src/components/admin/AdminDashboard.tsx` – pole treści wpisu
- `src/pages/BlogPostPage.tsx` – render treści
- `src/lib/types.ts`, `src/lib/cms.ts`

### Kroki

1. Wybierz format: Markdown w polu `tresc` (najprostsze, zgodne wstecz, bo stare wpisy to zwykłe akapity).
2. Panel: pole tekstowe z podglądem i krótką ściągą (`## Śródtytuł`, `[tekst](adres)`, listy, `![opis](adres)`), przycisk wstawiania zdjęcia korzystający z `uploadBlogImage` (po zadaniu 10 z kompresją).
3. Render: `react-markdown` z ograniczonym zestawem elementów (h2, h3, p, ul, ol, a, img, strong, blockquote); linki wewnętrzne przez `Link`; obrazy z `loading="lazy"`.
4. Dodaj pola `seo_description` (zadanie 11) i `updated_at` → `dateModified` w `blogPostingLd`.
5. Pod wpisem: autor z imieniem, rolą i linkiem do `/o-nas` (sygnał eksperckości).

## Część B – decyzja o krótkich wpisach (ArKon + dev)

Rekomendacja:

- **Zostają i są rozbudowywane** (mają temat, który da się rozwinąć): wpis o planie ogólnym, wpisy o osiedlach w Bochni, bazie piłkarskiej w Limanowej, szkole w Bytomsku, domu na stromej działce, adaptacji i wizualizacjach.
- **Łączone:** wpisy sezonowe („wiosna na budowie”, „jesień sprzyja budowom”, „nowy sezon budowlany”) w jeden poradnik „Kiedy zacząć budowę domu”, z przekierowaniami 301 ze starych adresów w `public/.htaccess`.
- **`noindex` i poza sitemapą:** czysto kronikarskie („Biuro”, „Start”, urodziny, spotkania). Wymaga flagi `noindex` w tabeli `wpisy`, obsługi w `<Seo noindex>` i pominięcia w `writeSitemap` w `scripts/prerender.mjs`.

## Część C – poradniki (ArKon, redakcja z pomocą dev)

Po 800–1 200 słów, ze śródtytułami, linkami do usług i stron miast, jednym własnym zdjęciem lub rysunkiem:

1. Plan ogólny gminy a warunki zabudowy w 2026 r. – co się zmienia w gminach powiatu bocheńskiego i limanowskiego (rozbudowa istniejącego wpisu).
2. Adaptacja projektu gotowego: koszt, czas, co można zmienić (z odniesieniem do projektów Archon+; GSC pokazuje ok. 900 wyświetleń na zapytania z „archon”).
3. Budowa domu na działce ze spadkiem i na terenach osuwiskowych – powiat limanowski.
4. Kierownik budowy: obowiązki, ile kosztuje, kiedy go zatrudnić.
5. Pozwolenie na budowę czy zgłoszenie – dom do 70 m² i powyżej.
6. Ile trwa projekt domu i formalności w starostwie w Bochni, Brzesku, Wieliczce, Limanowej.
7. Projekt budynku usługowego: parkingi, ppoż., dostępność (wspiera zadanie 06).
8. Projekt elewacji i termomodernizacja istniejącego domu (GSC: 138 wyświetleń na frazy o elewacjach w Bochni; wspiera zadanie 17).

Tempo: 2 poradniki miesięcznie.

## Kryteria akceptacji

- W panelu da się dodać wpis ze śródtytułami, linkami i zdjęciami w treści; stare wpisy wyświetlają się bez zmian.
- Wpisy oznaczone `noindex` nie występują w `sitemap.xml`.
- Do 31.12.2026: 4 opublikowane poradniki po 800+ słów, każdy z co najmniej 3 linkami wewnętrznymi.
- GSC: liczba adresów „wykryta, niezindeksowana” spada, poradniki są w indeksie.

## Weryfikacja

GSC → Indeksowanie → Strony oraz Skuteczność z filtrem strony `/blog/` (zadanie 18).
