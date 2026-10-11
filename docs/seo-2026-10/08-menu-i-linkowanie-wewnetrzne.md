# 08 – Usługi i miasta w menu, linki kontekstowe

**Priorytet:** 2 · **Kto:** dev · **Wysiłek:** 0,5 dnia · **Zależności:** 06 (nowa podstrona w menu)

## Cel

Strony usług i miast są osiągalne z głównego menu i podlinkowane z treści anchorami zawierającymi frazę. Dziś prowadzą do nich tylko linki w stopce.

## Dowód

- `src/components/Navbar.tsx`: 5 linków + Kontakt (Home, O nas, Usługi, Realizacje, Blog).
- `src/components/Footer.tsx`: miasta z anchorami „Bochnia”, „Limanowa”, „Brzesko”, „Wieliczka”.
- GA4 (28 dni): żadna strona miasta nie mieści się w pierwszej siódemce odsłon; `/uslugi/projekty-indywidualne` ma 19 odsłon.
- W treści stron nie ma linków między miastami, usługami i wpisami bloga.

## Pliki

- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/pages/LocalOfficePage.tsx`, `src/data/localPages.ts`
- `src/pages/uslugi/*.tsx`
- `src/pages/ServicesPage.tsx`
- `src/pages/BlogPostPage.tsx`

## Kroki

1. **Menu desktop:** „Usługi” jako rozwijana lista (Projekty indywidualne, Adaptacje projektów, Projekty budynków usługowych, Kierownik budowy, Wszystkie usługi). Nowa pozycja „Gdzie działamy” z czterema miastami. Użyj istniejącego `@radix-ui/react-navigation-menu` albo `dropdown-menu`; linki muszą być w prerenderowanym HTML jako zwykłe `<a href>`.
2. **Menu mobilne:** te same pozycje jako rozwijane grupy. Przyciskowi hamburgera dodaj `aria-label="Otwórz menu"` (Lighthouse zgłasza `button-name`).
3. **Stopka:** anchory „Biuro projektowe Bochnia”, „Biuro projektowe Limanowa” itd. Dodaj nową podstronę usług.
4. **Strony lokalne:** sekcja „Działamy też w…” z linkami do pozostałych trzech miast; w kartach usług linki do konkretnych podstron zamiast ogólnego `/uslugi` tam, gdzie podstrona istnieje.
5. **Strony usług:** akapit „Gdzie pracujemy” z linkami do stron miast (anchor „kierownik budowy w Bochni” → strona Bochni).
6. **Wpisy bloga:** pod treścią blok „Powiązane usługi” wybierany po tagu wpisu (np. tag „adaptacja” → `/uslugi/adaptacja-projektu`).
7. **`/uslugi`:** każda karta usługi, która ma podstronę, linkuje do niej tytułem, nie tylko przyciskiem.

## Kryteria akceptacji

- W `dist/index.html` w `<nav>` są linki do 4 podstron usług i 4 stron miast.
- Każda strona miasta ma co najmniej 3 linki w treści głównej do stron usług i 3 do pozostałych miast.
- Każda strona usługi linkuje w treści do 4 stron miast.
- Menu działa z klawiatury (Tab, Enter, Esc) i na telefonie.

## Weryfikacja

```bash
grep -o '<nav[^>]*>.*</nav>' dist/index.html | grep -o 'href="[^"]*"' | sort -u
```

GSC → Linki → Linki wewnętrzne: po kilku tygodniach strony miast i usług powinny mieć więcej linków niż dziś (16–17).
