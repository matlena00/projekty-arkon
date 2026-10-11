# 03 – Naprawa hydratacji React i LCP

**Priorytet:** 1 (krytyczne) · **Kto:** dev · **Wysiłek:** 1–2 dni · **Zależności:** brak

## Cel

Zero błędów hydratacji w konsoli i LCP na mobile poniżej 2,5 s (Lighthouse). Dziś React odrzuca prerenderowany HTML i rysuje stronę od nowa, a animacje wejścia startują od `opacity: 0`.

## Dowód (Lighthouse mobile, strona główna, 4.10.2026)

| Metryka | Wartość |
|---|---|
| Performance | 64 |
| FCP | 4,4 s |
| LCP | 9,5 s (w sierpniu 7,7 s) |
| TBT | 40 ms |
| CLS | 0 |
| TTFB | 40 ms |
| Zasoby blokujące render | ok. 2,35 s do odzyskania |
| Nieużywany JS | 445 KB |

Konsola: `Minified React error #418` (2×) i `#423`.

## Źródła niezgodności

1. **`src/components/StatsSection.tsx`** – `AnimatedNumber` trzyma `useState(0)`. Prerender (Puppeteer) zapisuje HTML po animacji, czyli z wartością końcową (600, 350…), a klient startuje od 0.
2. **Dane CMS z Supabase** – `HomeLightboxGallery`, `GalleryPage`, `BlogPage`, `BlogPostPage` używają `useQuery`. Prerender ma w HTML załadowane dane, klient zaczyna bez nich.
3. **framer-motion** – `initial={{ opacity: 0, y: 40 }}` w `HeroSection.tsx`, `PageHeader.tsx` i sekcjach. Prerender czyści atrybuty `style` (`scripts/prerender.mjs`, linie ok. 186–192), więc HTML jest widoczny, ale po ponownym renderze klienta elementy wracają do `opacity: 0` i dopiero się animują. Element LCP (tekst w hero) pojawia się po zakończeniu tej animacji.
4. **GTM w prerenderze** – w zapisanym HTML są wstrzyknięte przez GTM skrypty (`gtag/js?id=G-6GWQV8TTNG`, drugi `gtm.js`). Powinny ładować się tylko u użytkownika.

## Kroki

1. Uruchom build deweloperski (`npm run build:dev`, potem prerender i `npm run preview`), żeby zobaczyć pełne komunikaty zamiast `#418`.
2. `StatsSection`: pierwszy render pokazuje wartość docelową (`useState(value)`); animację od 0 uruchamiaj w `useEffect` po wejściu w widok. HTML z prerenderu i pierwszy render klienta będą zgodne.
3. Dane CMS: w prerenderze zapisz wyniki zapytań do `<script>window.__ARKON__ = {...}</script>` i przekaż je do React Query jako `initialData` (albo `hydrate` z `dehydrate`). Klient zaczyna z tymi samymi danymi co HTML.
4. framer-motion: elementy nad linią zgięcia (hero, `PageHeader`) renderuj z `initial={false}`, a wejście animuj w CSS z `@media (prefers-reduced-motion: no-preference)`. Sekcje niżej mogą zostać na `whileInView`.
5. Prerender: blokuj w Puppeteerze żądania do `googletagmanager.com` (request interception), żeby skrypty GTM nie trafiały do zapisanego HTML.
6. Fonty: hostuj lokalnie 2 rodziny (latin-ext, woff2, `preload` dla kroju nagłówków), usuń zewnętrzny arkusz `fonts.googleapis.com` z `index.html`.
7. Powtarzaj pomiar, aż konsola będzie czysta.

## Kryteria akceptacji

- Konsola na `/`, `/uslugi`, `/galeria`, `/blog` i dowolnym wpisie: brak błędów React.
- Lighthouse mobile na `/`: LCP ≤ 2,5 s, Performance ≥ 90.
- W `dist/index.html` nie ma skryptów `gtag/js` ani zdublowanego `gtm.js`.
- Licznik w sekcji „W liczbach” nadal animuje się po przewinięciu.

## Weryfikacja

```bash
npx lighthouse https://projekty-arkon.pl/ --only-categories=performance --chrome-flags="--headless=new" --output=json --output-path=./lh.json
```

```bash
grep -c "googletagmanager.com/gtag" dist/index.html
```

Uwaga: GSC nie ma danych Core Web Vitals z realnych użytkowników (za mały ruch), więc Lighthouse jest jedynym miernikiem.

## Stan wdrożenia (4.10.2026)

### Faktyczna przyczyna

Błędy #418/#423 występowały na każdej trasie, także bez danych z CMS. Prerender zapisywał zrzut DOM-u (`page.content()`), a taki HTML nie ma znaczników granic Suspense ani separatorów sąsiadujących węzłów tekstowych, których React wymaga przy `hydrateRoot`. Licznik, dane CMS i style animacji były przyczynami wtórnymi.

### Co zrobiono

- **Prerender z `renderToString`:** aplikacja w trybie prerenderu wystawia `window.__arkonSnapshot()` (`src/main.tsx`), a `scripts/prerender.mjs` wstawia jego wynik do `#root`. `react-dom/server` ładuje się tylko w trakcie builda.
- **Dane CMS:** stan React Query trafia do HTML jako `window.__ARKON_STATE__` i jest wczytywany przed hydratacją (`src/lib/queryClient.ts`). Na stronach wpisów treść pozostałych wpisów jest wycinana ze stanu.
- **Animacje:** style początkowe framer-motion zostają w HTML; reguła „osłona prerenderu” w `src/index.css` trzyma treść widoczną do końca hydratacji, potem `src/lib/prerender.ts` nadaje `<html>` klasę `arkon-live`. Animacje przy przewijaniu działają jak wcześniej.
- **Licznik:** `StatsSection` renderuje wartość docelową (w HTML jest „600+”), zeruje się po zamontowaniu i animuje po wejściu w widok.
- **GTM:** żądania do GTM/GA/CookieYes są blokowane w prerenderze, a dopisany skrypt `gtm.js` wycinany z HTML.
- **Fonty:** pakiety `@fontsource` zamiast Google Fonts (importy w `src/main.tsx`).
- **Hero stron lokalnych i usługowych:** `AssetPhoto` z `eager` podaje na telefonie wariant `-thumb` i `fetchpriority="high"`.
- **Nowy skrypt:** `npm run check:hydration` – otwiera prerenderowane trasy i kończy się błędem, gdy konsola zgłosi cokolwiek.

### Wyniki (Lighthouse mobile, strona główna)

| Pomiar | Live przed | Build lokalny po |
|---|---|---|
| Błędy React w konsoli | #418 ×2, #423 | brak (10 tras) |
| LCP, throttling rzeczywisty (`--throttling-method=devtools`) | 10,1 s | 2,0 s |
| Performance, throttling rzeczywisty | 70 | 97 |
| LCP, throttling symulowany (domyślny) | 9,5 s | 3,9 s |
| Performance, throttling symulowany | 64 | 81 |
| CLS | 0,004 | 0,02 |

Build lokalny był serwowany przez Apache po HTTP/1.1; wynik symulowany na localhost jest zawyżony, bo skrypty ładują się tam przed pierwszym malowaniem. Ostateczny pomiar trzeba powtórzyć na live po deployu.

### Zostało

- [ ] Deploy i pomiar na live.
- [ ] Podstrony: LCP 2,8–4,8 s przy throttlingu rzeczywistym, bo elementem LCP jest tam zdjęcie nagłówka (88–290 KB) albo okładka wpisu z Supabase (zadanie 10).
- [ ] Strony lokalne i usługowe: CLS 0,11–0,18 przy podmianie fontu (okruszki łamią się w dwóch wierszach na foncie zastępczym). Ten sam wynik jest dziś na live, więc to nie regres; do poprawy osobno.
- [ ] `bun.lock` nie został zaktualizowany o pakiety `@fontsource` (zaktualizowany jest `package-lock.json`).
