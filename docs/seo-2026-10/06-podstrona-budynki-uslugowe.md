# 06 – Podstrona „Projekty budynków usługowych”

**Priorytet:** 2 (duży wpływ; główny cel biznesowy) · **Kto:** dev + treść i zdjęcia od ArKon · **Wysiłek:** 2 dni · **Zależności:** materiały od ArKon

## Cel

Serwis ma adres, który może rankować na „projekt budynku usługowego + miasto”. ArKon chce być wiodącym biurem także dla budynków usługowych, a dziś nie ma o nich ani jednej strony.

## Dowód

- Brak adresu w sitemapie; „usługow…” w treści strony głównej: 0 wystąpień.
- W galerii jest kategoria „Obiekty usługowe” (`src/lib/types.ts`) i realizacje do pokazania: budynek usługowo-mieszkalny w Lipnicy Murowanej, remont budynków usługowych w Żegocinie, szkoła w Bytomsku, baza piłkarska w Limanowej, osiedla w Bochni.
- Konkurenci z Bochni mają tę usługę w ofercie (audyt z 19.08.2026).

## Adres i meta

- URL: `/uslugi/projekty-budynkow-uslugowych`
- Title: `Projekty budynków usługowych – Bochnia, Limanowa, Brzesko, Wieliczka | ArKon`
- H1: `Projekty budynków usługowych i użyteczności publicznej`
- Meta description: `Projekty budynków usługowych, handlowych i biurowych: analiza MPZP, parkingi, ppoż., dostępność, pozwolenie na budowę. Powiaty bocheński, limanowski, brzeski, wielicki.`

## Pliki

- nowy `src/pages/uslugi/BudynkiUslugowePage.tsx` – wzorować na `ProjektyIndywidualnePage.tsx` (te same komponenty: `Breadcrumbs`, `LandingFaq`, `CtaBand`, `AssetPhoto`, schema `serviceLd` + `breadcrumbLd` + `webPageLd`)
- `src/App.tsx` – trasa
- `scripts/prerender.mjs` – wpis w `ROUTES`
- `src/components/Footer.tsx`, `src/pages/ServicesPage.tsx` – link do nowej strony
- `index.html` – pozycja w `hasOfferCatalog`

## Struktura treści (1 200+ słów)

1. Wstęp: dla kogo (przedsiębiorcy, gminy, inwestorzy), jakie obiekty.
2. H2 „Jakie budynki usługowe projektujemy” – handel i gastronomia, biura, gabinety i przychodnie, warsztaty i hale, obiekty sportowe i oświatowe, budynki usługowo-mieszkalne.
3. H2 „Formalności, które bierzemy na siebie” – MPZP lub warunki zabudowy, plan ogólny gminy, miejsca parkingowe, uzgodnienia ppoż. i sanepid, dostępność dla osób z niepełnosprawnościami, zjazd z drogi publicznej, decyzja środowiskowa, zmiana sposobu użytkowania.
4. H2 „Jak wygląda współpraca” – etapy od analizy działki do pozwolenia na użytkowanie, orientacyjne terminy.
5. H2 „Realizacje” – 3–5 obiektów ze zdjęciem, miejscowością, zakresem i rokiem.
6. H2 „Gdzie projektujemy” – cztery miasta z linkami do stron lokalnych.
7. FAQ (5–6 pytań): ile trwa projekt budynku usługowego, czy potrzebna jest decyzja środowiskowa, ile miejsc parkingowych, czy można przerobić dom na lokal usługowy, co z planem ogólnym.
8. CTA z telefonem i formularzem.

## Do dostarczenia przez ArKon

- Lista zrealizowanych obiektów usługowych i publicznych z rokiem, powierzchnią i zakresem prac.
- 5–8 zdjęć lub wizualizacji.
- Typowe terminy i 2–3 zdania o najtrudniejszym projekcie.

## Kryteria akceptacji

- Strona jest w `dist/uslugi/projekty-budynkow-uslugowych/index.html` i w `sitemap.xml`.
- Ma schema `Service` z `areaServed` dla czterech miast, `BreadcrumbList` i `FAQPage`.
- Linkują do niej: stopka, `/uslugi`, strona główna (po zadaniu 02) i każda strona lokalna (zadanie 07).
- Treść główna ma co najmniej 1 200 słów i minimum 3 realizacje ze zdjęciami.

## Weryfikacja

```bash
grep -c "projekty-budynkow-uslugowych" dist/sitemap.xml
```

Po deployu: prośba o indeksację w GSC (zadanie 05).
