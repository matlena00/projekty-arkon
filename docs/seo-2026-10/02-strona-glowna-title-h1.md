# 02 – Title, H1 i wstęp strony głównej; H1 na /o-nas i /uslugi

**Priorytet:** 1 (krytyczne) · **Kto:** dev, teksty do akceptacji ArKon · **Wysiłek:** 2 h · **Zależności:** brak (link do budynków usługowych dodać po zadaniu 06)

## Cel

Strona główna mówi Google i użytkownikowi, co biuro projektuje i gdzie. Dziś zbiera 81% kliknięć z wyszukiwarki, ale wyłącznie na nazwę firmy.

## Dowód

- Title: „ArKon - Biuro Projektowe | Architektura i Konstrukcja | Żegocina”.
- H1: „Biuro Projektowe ArKon”.
- W treści (bez menu i stopki): „projekty domów” 0×, „projekt domu” 1×, Bochnia / Limanowa / Brzesko / Wieliczka 0×, „usługow…” 0×.
- H1 `/o-nas`: „Za kulisami Firmy”. H1 `/uslugi`: „Co możemy Wam zaoferować?”.
- GSC: „biuro projektowe bochnia” 179 wyświetleń, pozycja 15,3; „architekt bochnia” pozycja 39.

## Pliki

- `src/pages/Index.tsx` – `<Seo title description>`
- `src/components/HeroSection.tsx` – H1 (linia ok. 56) i akapit pod nim
- `src/pages/AboutPage.tsx` – `<Seo>` i `title` w `PageHeader` (linia ok. 101)
- `src/pages/ServicesPage.tsx` – `title` w `PageHeader` (linia ok. 226)
- `index.html` – domyślny `<title>` i `description` w JSON-LD organizacji

## Proponowane teksty

**Strona główna**

- Title (do ok. 60 znaków widocznych, reszta może się uciąć):
  `Biuro projektowe ArKon – projekty domów i budynków usługowych | Bochnia, Limanowa, Brzesko, Wieliczka`
- Meta description:
  `Projekty domów jednorodzinnych i budynków usługowych, adaptacje projektów gotowych, kierownik budowy. Bochnia, Limanowa, Brzesko, Wieliczka. Tel. 888 899 366.`
- Nadtytuł (zostaje): `Architektura i Konstrukcja`
- H1: `Biuro projektowe ArKon – projekty domów i budynków usługowych`
  (nazwa „ArKon” może zachować złoty gradient)
- Akapit pod H1, z linkami:
  `Projektujemy domy jednorodzinne i budynki usługowe w Bochni, Limanowej, Brzesku, Wieliczce i okolicach. Prowadzimy inwestycję od analizy działki i pozwolenia na budowę, przez nadzór kierownika budowy, po odbiór.`
  Nazwy miast linkują do `/biuro-projektowe-…`.

**/o-nas**

- H1: `O biurze projektowym ArKon`; dotychczasowe „Za kulisami Firmy” jako nadtytuł.

**/uslugi**

- H1: `Usługi biura projektowego – projekty, adaptacje, nadzór`; dotychczasowe pytanie jako podtytuł.

## Kroki

1. Podmień teksty w plikach z listy.
2. W `HeroSection.tsx` dodaj linki do stron lokalnych (komponent `Link`), w kolorze czytelnym na zdjęciu.
3. Zaktualizuj `<title>` w `index.html`, żeby wersja przed hydratacją nie różniła się od docelowej.
4. `npm run build` i kontrola `dist/index.html`.

## Kryteria akceptacji

- `dist/index.html` zawiera jeden H1 z frazą „projekty domów” i „budynków usługowych”.
- W treści głównej strony (poza stopką) są nazwy czterech miast jako linki do stron lokalnych.
- `/o-nas` i `/uslugi` mają H1 ze słowami „biuro projektowe” / „usługi biura projektowego”.
- Hero na telefonie (375 px) mieści H1 bez łamania układu.

## Weryfikacja

```bash
grep -o '<title>[^<]*' dist/index.html
```

```bash
grep -o '<h1[^>]*>.*</h1>' dist/index.html | sed 's/<[^>]*>//g'
```

## Stan wdrożenia (4.10.2026)

Zrobione w repo, do akceptacji przez ArKon:

- Title i meta description strony głównej jak w propozycji (z łącznikiem zamiast półpauzy, zgodnie z resztą serwisu).
- H1 strony głównej w dwóch wierszach: „Biuro Projektowe ArKon” + „Projekty domów i budynków usługowych”. Drugi wiersz zastąpił hasło „Zrealizujemy Twoje projekty”.
- Akapit w hero z linkami do czterech stron lokalnych.
- `/o-nas`: H1 „O biurze projektowym ArKon”, nadtytuł „Za kulisami firmy”.
- `/uslugi`: H1 „Usługi biura projektowego - projekty, adaptacje, nadzór”; pytanie „Co możemy Wam zaoferować?” przeniesione na początek podtytułu.
- Domyślny `<title>` i opis organizacji w JSON-LD w `index.html`.

Zostało: link do podstrony budynków usługowych w hero (po zadaniu 06), deploy.
