# Wdrożenie audytu SEO 10/2026

Zadania wynikające z audytu z 4 października 2026 ([AUDYT-SEO-2026-10.html](../../AUDYT-SEO-2026-10.html)). Każdy plik to jedno zadanie: cel, dowód, pliki do zmiany, kroki, kryteria akceptacji i sposób weryfikacji.

## Stan wyjściowy (4.10.2026)

| Miernik | Wartość | Cel 31.12.2026 |
|---|---|---|
| Kliknięcia z fraz niebrandowych / mies. | ok. 5 | 40+ |
| „biuro projektowe bochnia” – pozycja | 15,3 | ≤ 7 |
| „biuro projektowe brzesko” – pozycja | 8,8 | ≤ 3 |
| Strony w indeksie Google | 18 z 52 | wszystkie z sitemapy |
| Domeny linkujące | 2 | 15+ |
| LCP mobile (Lighthouse) | 9,5 s | ≤ 2,5 s |
| Leady mierzone w GA4 | 0 (brak pomiaru) | pomiar działa |

## Zadania

Status: `[ ]` do zrobienia, `[~]` zrobione w repo, czeka na deploy lub krok poza repo, `[x]` zrobione i potwierdzone na live.

### 1. Krytyczne – ten tydzień

| Status | Zadanie | Kto | Wysiłek |
|---|---|---|---|
| [~] | [01 – Przekierowania 301 i prawdziwe 404 w .htaccess](01-htaccess-przekierowania-i-404.md) | dev | 1–2 h |
| [~] | [02 – Title, H1 i wstęp strony głównej; H1 na /o-nas i /uslugi](02-strona-glowna-title-h1.md) | dev + akceptacja ArKon | 2 h |
| [~] | [03 – Naprawa hydratacji React i LCP](03-hydratacja-i-lcp.md) | dev | 1–2 dni |
| [ ] | [04 – Pomiar leadów w GA4](04-pomiar-leadow-ga4.md) | dev | 2–3 h |
| [ ] | [05 – Weryfikacja w GSC po wdrożeniu](05-gsc-po-wdrozeniu.md) | dev | 30 min |

### 2. Duży wpływ – 2 do 4 tygodni

| Status | Zadanie | Kto | Wysiłek |
|---|---|---|---|
| [ ] | [06 – Podstrona „Projekty budynków usługowych”](06-podstrona-budynki-uslugowe.md) | dev + treść ArKon | 2 dni |
| [ ] | [07 – Rozbudowa stron lokalnych](07-rozbudowa-stron-lokalnych.md) | dev + treść ArKon | 0,5 dnia / miasto |
| [ ] | [08 – Usługi i miasta w menu, linki kontekstowe](08-menu-i-linkowanie-wewnetrzne.md) | dev | 0,5 dnia |
| [ ] | [09 – Katalogi, NAP i linki zewnętrzne](09-katalogi-nap-linki.md) | ArKon / marketing | 1 dzień + stale |
| [ ] | [10 – Kompresja zdjęć w CMS](10-kompresja-zdjec-cms.md) | dev | 1 dzień |

### 3. Szybkie wygrane – po 1–2 godziny

| Status | Zadanie | Kto | Wysiłek |
|---|---|---|---|
| [ ] | [11 – Meta description wpisów bloga](11-meta-description-bloga.md) | dev | 1 h |
| [ ] | [12 – Liczba opinii i sameAs](12-opinie-i-sameas.md) | dev | 1–2 h |
| [ ] | [13 – FAQPage bez duplikatów i porządek w nagłówkach](13-faq-schema-i-naglowki.md) | dev | 2–3 h |
| [ ] | [14 – Alty zdjęć w galerii](14-alty-w-galerii.md) | dev + ArKon | 1–2 h |

### 4. Długofalowo

| Status | Zadanie | Kto | Wysiłek |
|---|---|---|---|
| [ ] | [15 – Edytor treści w CMS, poradniki, los krótkich wpisów](15-blog-edytor-i-poradniki.md) | dev + treść ArKon | 2 dni + 2–3 h / tydz. |
| [ ] | [16 – Podstrony realizacji](16-podstrony-realizacji.md) | dev + treść ArKon | 2–3 dni |
| [ ] | [17 – Podstrony elewacji i projektów branżowych](17-nowe-podstrony-uslug.md) | decyzja ArKon, potem dev | 1 dzień / stronę |
| [ ] | [18 – Comiesięczny przegląd GSC i GA4](18-miesieczny-przeglad.md) | dev / marketing | 30 min / mies. |

## Kolejność i zależności

- 01, 02, 03 i 04 są niezależne i mogą iść jednym deployem. 05 wykonuje się po tym deployu.
- 06 przed 07 i 08: strony lokalne i menu linkują do nowej podstrony.
- 10 przed 16: podstrony realizacji nie powinny ładować zdjęć po 7 MB.
- 15 (edytor) przed pisaniem poradników.
- 12 wymaga aktualnej liczby opinii i adresu profilu Google od ArKon.

## Zasady wspólne dla wszystkich zadań

- Hosting to SEOHOST (LiteSpeed). Przekierowania i kody odpowiedzi ustawia się w `public/.htaccess`, nie w `vercel.json`.
- Deploy nie czyści serwera. Po każdym wdrożeniu sprawdź, czy usunięte trasy nie zostały na hoście jako stare katalogi.
- Każda nowa trasa: wpis w `src/App.tsx` i w `ROUTES` w `scripts/prerender.mjs` (sitemapa powstaje z prerenderu).
- Weryfikację na live rób pojedynczymi żądaniami z odstępem kilku sekund; seria żądań HTML z jednego IP potrafi skończyć się kodem 429.
- Po `npm run build` uruchom `npm run check:hydration` (zero błędów konsoli na prerenderowanych trasach).
- Po `npm run build` sprawdź w `dist/` wynikowy HTML zmienianej strony (title, H1, canonical, JSON-LD), zanim trafi na serwer.
