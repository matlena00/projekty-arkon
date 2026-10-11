# 16 – Podstrony realizacji

**Priorytet:** 4 (długofalowo) · **Kto:** dev + opisy od ArKon · **Wysiłek:** 2–3 dni dev + ok. 30 min na opis realizacji · **Zależności:** 10 (kompresja zdjęć), 14 (alty)

## Cel

Każda realizacja ma własny adres z opisem. Powstaje ok. 24 stron pod zapytania w rodzaju „projekt domu Sobolów”, „osiedle domów Bochnia”, a strony miast i usług dostają treść, do której mogą linkować.

## Dowód

- `/galeria` to jedna strona: 24 realizacje, 241 słów, lightbox bez adresów.
- Tabela `projekty` ma tylko `tytul`, `kategoria`, `opis` (`src/lib/types.ts`); większość opisów jest pusta.
- GA4: „Realizacje” to trzecia najczęściej oglądana strona (159 odsłon, 117 użytkowników na 28 dni). Użytkownicy chcą oglądać projekty.

## Pliki

- `supabase/` – migracja tabeli `projekty`
- `src/lib/types.ts`, `src/lib/cms.ts`
- `src/components/admin/AdminDashboard.tsx` – nowe pola
- nowy `src/pages/RealizacjaPage.tsx`
- `src/pages/GalleryPage.tsx` – kafle linkują do podstron
- `src/App.tsx` – trasa `/realizacje/:slug`
- `scripts/prerender.mjs` – wykrywanie tras `/realizacje/*` z linków na `/galeria` (tak jak dziś `/blog/*`), priorytet w sitemapie
- `src/lib/schema.ts` – schema dla realizacji
- `public/.htaccess` – bez fallbacku 200 dla `/realizacje/*`

## Kroki

1. **Model danych:** dodaj do `projekty` kolumny `slug` (unikalny), `miejscowosc`, `gmina`, `powiat`, `zakres` (lista: projekt indywidualny / adaptacja / kierownik budowy / wizualizacje / wnętrza), `powierzchnia_m2`, `rok`, `seo_description`. Slug generuj funkcją `slugify` z `cms.ts`: `dom-jednorodzinny-sobolow`.
2. **Panel:** pola formularza i walidacja (slug wymagany przy publikacji).
3. **Strona realizacji:**
   - H1: „Dom jednorodzinny w Sobolowie – projekt indywidualny”,
   - tabela danych (lokalizacja, powierzchnia, zakres, rok),
   - opis 150–400 słów,
   - galeria zdjęć z altami z zadania 14,
   - linki: usługa, której dotyczy realizacja, i strona miasta dla danego powiatu,
   - „Podobne realizacje” (ta sama kategoria lub powiat),
   - CTA.
4. **Schema:** `CreativeWork` (albo `Article`) z `image`, `locationCreated`, `creator` → organizacja; `BreadcrumbList`: Start → Realizacje → nazwa.
5. **Galeria:** kafel otwiera podstronę; szybki podgląd w lightboxie może zostać pod ikoną.
6. **Adres listy:** rozważ zmianę `/galeria` na `/realizacje` z 301 w `.htaccess`. `/galeria` ma dziś 205 wyświetleń i pozycję 4,6 w GSC, więc zmiana tylko razem z przekierowaniem i aktualizacją wszystkich linków.
7. **Strony miast** (`src/data/localPages.ts`): pole `href` w `LocalRealization` wskazuje podstrony realizacji z danego powiatu.
8. Realizacje bez opisu (poniżej 100 słów) nie dostają podstrony ani wpisu w sitemapie, dopóki opis nie powstanie. Cienkie podstrony powtórzyłyby problem bloga.

## Do dostarczenia przez ArKon

Dla każdej realizacji: typ, miejscowość i gmina, powierzchnia, rok, zakres prac, 3–5 zdań o założeniach i trudnościach (działka, MPZP, życzenia inwestora), zgoda inwestora na publikację lokalizacji.

Start od 10 najmocniejszych: osiedla w Bochni, baza piłkarska w Limanowej, szkoła w Bytomsku, budynek usługowo-mieszkalny w Lipnicy Murowanej, dom na stromej działce pod Krakowem i 5 domów z różnych powiatów.

## Kryteria akceptacji

- Minimum 10 podstron realizacji w `dist/realizacje/` i w `sitemap.xml`, każda z opisem 150+ słów.
- Nieistniejący slug zwraca 404.
- Każda strona miasta linkuje do co najmniej 3 realizacji ze swojego powiatu.
- Żadne zdjęcie na podstronie nie przekracza 500 KB.

## Weryfikacja

```bash
grep -c "/realizacje/" dist/sitemap.xml
```

GSC po 6–8 tygodniach: wyświetlenia stron `/realizacje/*`.
