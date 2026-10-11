# 17 – Podstrony elewacji i projektów branżowych

**Priorytet:** 4 (długofalowo) · **Kto:** decyzja ArKon, potem dev + treść · **Wysiłek:** ok. 1 dzień na stronę · **Zależności:** po 06 (ten sam szablon)

## Cel

Serwis odpowiada osobnymi stronami na usługi, o które ludzie pytają Google, a które dziś obsługuje ogólna strona `/uslugi` z dalekich pozycji.

## Dowód (GSC 15.07–29.09.2026)

| Zapytania | Wyświetlenia | Pozycja |
|---|---|---|
| projektowanie elewacji domu bochnia / projekty elewacji bochnia / projekt elewacji bochnia / projektowanie elewacji bochnia | 138 | 29–31 |
| projekty instalacji elektrycznych / sanitarnych – Wieliczka, Limanowa (5 wariantów) | 5 | 24–48 |
| projekty wnętrz prywatnych, aranżacja wnętrz wieliczka | kilka | 40–69 |
| adaptacja projektu (ogólne) | 1 | 4,0 |

Elewacje to jedyna grupa z wyraźnym popytem. Instalacje i wnętrza mają na razie śladowe liczby.

## Decyzja po stronie ArKon

Dla każdej usługi: czy biuro chce takich zleceń i czy ma realizacje do pokazania?

| Kandydat | Rekomendacja |
|---|---|
| Projekty elewacji i termomodernizacji | Zrobić, jeśli biuro przyjmuje takie zlecenia; popyt widać w danych |
| Projekty branżowe (przyłącza, instalacje, drogi, zmiana sposobu użytkowania, legalizacje) | Jedna zbiorcza podstrona; rozbić później, jeśli pojawi się ruch |
| Projekty wnętrz i wizualizacje 3D | Podstrona warta zrobienia ze względu na ofertę i 2 istniejące wpisy bloga; popyt lokalny mały |
| Geodezja, analizy działek | Na razie zostają na `/uslugi`; analizę działki opisać poradnikiem (zadanie 15) |

## Adresy i meta (propozycja)

- `/uslugi/projekty-elewacji`
  - Title: `Projekt elewacji domu i termomodernizacja – Bochnia i okolice | ArKon`
  - H1: `Projekty elewacji i termomodernizacji domów`
- `/uslugi/projekty-branzowe`
  - Title: `Projekty branżowe: przyłącza, instalacje, zmiana sposobu użytkowania | ArKon`
  - H1: `Projekty branżowe i formalności budowlane`
- `/uslugi/projekty-wnetrz`
  - Title: `Projekty wnętrz i wizualizacje 3D – Małopolska | ArKon`
  - H1: `Projekty wnętrz z wizualizacjami 3D`

## Pliki

Jak w zadaniu 06: nowy plik w `src/pages/uslugi/`, trasa w `src/App.tsx`, wpis w `ROUTES` w `scripts/prerender.mjs`, linki w `Footer.tsx`, `Navbar.tsx` (po zadaniu 08), `ServicesPage.tsx`, pozycja w `hasOfferCatalog` w `index.html`.

## Struktura każdej strony (700+ słów)

1. Dla kogo i kiedy usługa jest potrzebna.
2. Zakres: co dokładnie obejmuje, co dostaje klient.
3. Formalności (zgłoszenie czy pozwolenie, audyt energetyczny i dofinansowania przy termomodernizacji).
4. Przebieg i orientacyjny czas.
5. 2–3 realizacje ze zdjęciami „przed i po” lub wizualizacjami.
6. Miasta z linkami do stron lokalnych.
7. FAQ (4–5 pytań) ze schemą `FAQPage`.
8. CTA.

## Kryteria akceptacji

- Decyzja ArKon zapisana w tym pliku (tabela wyżej uzupełniona o „tak / nie”).
- Każda zatwierdzona strona: w sitemapie, ze schemą `Service`, podlinkowana z menu, stopki i `/uslugi`, z minimum 2 realizacjami.
- Na `/uslugi` karta danej usługi linkuje do podstrony.

## Weryfikacja

GSC po 6–8 tygodniach: pozycja na „projekt elewacji bochnia” (dziś ok. 30) i wyświetlenia nowych adresów.
