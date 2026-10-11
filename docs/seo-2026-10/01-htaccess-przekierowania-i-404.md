# 01 – Przekierowania 301 i prawdziwe 404 w .htaccess

**Priorytet:** 1 (krytyczne) · **Kto:** dev · **Wysiłek:** 1–2 h · **Zależności:** brak

## Cel

Stare adresy przekierowują 301 na aktualne odpowiedniki, a nieistniejące adresy pod `/blog/` zwracają 404. Na serwerze nie zostają strony z poprzednich deployów.

## Dowód (4.10.2026, wersja live)

| Adres | Dziś | Powinno być |
|---|---|---|
| `/blog/piekna-jesienna-aura` | 200, stara kopia wpisu z canonicalem na siebie | 301 → `/blog/jesien-sprzyja-budowom` |
| `/blog/nowosci` | 200, stara kopia wpisu | 301 → `/blog` |
| `/blog/600-mnpm-i-widok-na-tatry` | 200, stara kopia wpisu | 301 → `/blog/budowa-z-widokiem-na-tatry` |
| `/blog/nie-ma-takiego-wpisu` | 200, HTML strony głównej | 404 |
| `/biuro-projektowe-gdow` | 404 | 301 → `/biuro-projektowe-wieliczka` |
| `/category/nowosci/` (GSC) | 404 | 301 → `/blog` |
| `/600-m-n-p-m-i-widok-na-tatry/` (GSC) | 404 | 301 → `/blog/budowa-z-widokiem-na-tatry` |
| `/wyruszamy-w-teren-po-zimie/` (GSC) | 5xx przy skanie 6.07 | 301 → `/blog/wiosna-start-sezonu-budowlanego` |
| `/index.html`, `/uslugi/index.html` | 200 | 301 → `/`, `/uslugi` |

Przekierowania zapisane w `vercel.json` nigdy nie działały, bo produkcja stoi na SEOHOST.

## Pliki

- `public/.htaccess`
- `vercel.json` (do usunięcia)
- `src/lib/schema.ts` – w `AREA_CITIES` wciąż jest „Gdów”

## Kroki

1. W `public/.htaccess`, zaraz po bloku „stare adresy z poprzedniej wersji strony”, dodaj:

   ```apache
   # --- 301: strona Gdowa zdjęta w 08/2026 ---
   RewriteRule ^biuro-projektowe-gdow/?$ /biuro-projektowe-wieliczka [R=301,L]

   # --- 301: stare slugi bloga ---
   RewriteRule ^blog/piekna-jesienna-aura/?$ /blog/jesien-sprzyja-budowom [R=301,L]
   RewriteRule ^blog/poszerzamy-uslugi-o-wizualizacje/?$ /blog/nowosc-w-naszej-ofercie-wizualizacje-projektow [R=301,L]
   RewriteRule ^blog/600-mnpm-i-widok-na-tatry/?$ /blog/budowa-z-widokiem-na-tatry [R=301,L]
   RewriteRule ^blog/wyruszamy-w-teren-po-zimie/?$ /blog/wiosna-start-sezonu-budowlanego [R=301,L]
   RewriteRule ^blog/nowosci/?$ /blog [R=301,L]

   # --- 301: adresy ze starego WordPressa (wiszą w GSC jako 404/5xx) ---
   RewriteRule ^category/ /blog [R=301,L]
   RewriteRule ^600-m-n-p-m-i-widok-na-tatry/?$ /blog/budowa-z-widokiem-na-tatry [R=301,L]
   RewriteRule ^wyruszamy-w-teren-po-zimie/?$ /blog/wiosna-start-sezonu-budowlanego [R=301,L]

   # --- 301: jawne /index.html -> adres kanoniczny ---
   # Warunek na THE_REQUEST jest konieczny: reguła (b) niżej przepisuje wewnętrznie
   # na $1/index.html i bez niego powstałaby pętla.
   RewriteCond %{THE_REQUEST} \s/index\.html[\s?]
   RewriteRule ^index\.html$ / [R=301,L]
   RewriteCond %{THE_REQUEST} \s/.+/index\.html[\s?]
   RewriteRule ^(.+)/index\.html$ /$1 [R=301,L]
   ```

2. Usuń linię `RewriteRule ^blog/.+$ index.html [L]`. Fallback dla `/admin` zostaje.
3. Usuń `vercel.json`.
4. Usuń „Gdów” z `AREA_CITIES` w `src/lib/schema.ts`, jeśli strona Gdowa nie wraca.
5. Na serwerze usuń stare katalogi `blog/piekna-jesienna-aura`, `blog/nowosci`, `blog/600-mnpm-i-widok-na-tatry`, `blog/poszerzamy-uslugi-o-wizualizacje`, `blog/wyruszamy-w-teren-po-zimie`. Porównaj listę katalogów `blog/` na hoście z `dist/blog/` i usuń wszystko, czego nie ma w buildzie.
6. Zmień sposób deployu tak, żeby czyścił serwer (np. `rsync --delete` albo wgrywanie do pustego katalogu).

## Decyzja do podjęcia

Usunięcie fallbacku `/blog/*` oznacza, że wpis dodany w CMS zwróci 404 do czasu kolejnego builda i deployu. Rekomendacja: usunąć fallback i przyjąć zasadę „po publikacji wpisu robimy build”. Dziś taki wpis i tak nie trafia do sitemapy ani nie ma prerenderu, więc dla Google nie istnieje.

## Kryteria akceptacji

- Każdy adres z tabeli zwraca kod z kolumny „Powinno być”, jednym skokiem.
- `/kontakt/` nadal daje 301 → `/kontakt`, a `/kontakt` nadal 200 (bez regresji).
- `/admin` nadal ładuje panel.
- `vercel.json` nie istnieje w repo.

## Weryfikacja

Po deployu, pojedynczo z kilkusekundową przerwą:

```bash
curl -sI https://projekty-arkon.pl/blog/nowosci | head -3
```

```bash
curl -sI https://projekty-arkon.pl/blog/nie-ma-takiego-wpisu | head -1
```

```bash
curl -sI https://projekty-arkon.pl/uslugi/index.html | head -3
```

## Stan wdrożenia (4.10.2026)

Zrobione w repo:

- reguły 301 i usunięcie fallbacku `/blog/*` w `public/.htaccess`,
- usunięty `vercel.json`,
- „Gdów” usunięty z `AREA_CITIES`.

Sprawdzone na lokalnym Apache 2.4 z plikiem `.htaccess` z builda (bez bloku wymuszającego https): wszystkie adresy z tabeli zwracają oczekiwany kod jednym skokiem, `/blog/nie-ma-takiego-wpisu` → 404 ze stroną błędu, `/admin` → 200, `/kontakt/` → 301.

Zostało (poza repo):

- [ ] deploy,
- [ ] usunięcie starych katalogów wpisów na serwerze (krok 5) – bez tego reguły 301 i tak zadziałają, bo są przed regułą serwującą pliki, ale katalogi warto usunąć,
- [ ] deploy czyszczący serwer (krok 6),
- [ ] weryfikacja `curl` na live.
