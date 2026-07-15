# Audyt SEO — projekty-arkon.pl

Data: 14.07.2026 | Cel: TOP wyniki na frazy „biuro projektowe / projekt domu / adaptacja / kierownik budowy" + Bochnia, Limanowa, Brzesko, Wieliczka, Gdów

---

## 1. Diagnoza główna

**Strona jest technicznie dobra, ale nie ma szans rankować na frazy lokalne, bo docelowe miejscowości praktycznie nie występują w treści.**

Zliczenie wystąpień w kodzie wszystkich podstron:

| Fraza | / | /o-nas | /uslugi | /galeria | /kontakt | /blog |
|---|---|---|---|---|---|---|
| Bochnia | 0 | 0 | 0 | 6 (tylko alt) | 0 | 0 |
| Limanowa | 0 | 0 | 0 | 0 | 0 | 0 |
| Brzesko | 0 | 0 | 0 | 0 | 0 | 0 |
| Wieliczka | 0 | 0 | 0 | 0 | 0 | 0 |
| Gdów | 0 | 0 | 0 | 0 | 0 | 0 |
| kierownik budowy | 4 | 0 | 4 | 0 | 0 | 0 |

Google nie wyświetli strony na „kierownik budowy Bochnia", jeśli te słowa nie padają razem nigdzie w serwisie. Konkurencja (projektybochniabrzesko.pl, kierownikbudowy.biz.pl, archtech.eu) ma dedykowane podstrony pod każde miasto — i dlatego jest w TOP10.

---

## 2. Co działa dobrze (nie ruszać)

- Unikalne title, meta description i canonical na każdej podstronie (renderowane serwerowo — Google je widzi bez JS)
- Dane strukturalne: LocalBusiness/ProfessionalService (adres, geo, godziny, założyciel) + FAQPage + WebSite
- robots.txt poprawny, sitemap podpięta, lang="pl", og-tagi kompletne
- Obrazy WebP, strona ładuje się szybko (LCP < 1 s przy powtórnej wizycie, bundle ~1,9 MB)
- Alty obrazków w galerii zawierają miejscowości (Bochnia, Sobolów, Lipnica Murowana…) — dobry fundament
- FAQ na stronie głównej i /uslugi trafia w intencje („kierownik budowy — dlaczego potrzebny", „adaptacja czy projekt indywidualny")

---

## 3. Problemy — wg priorytetu

### P1 — Krytyczne (blokują pozycjonowanie lokalne)

**3.1. Brak stron usługowych i lokalnych.** Cała oferta (9 usług) siedzi na jednej stronie /uslugi. Jedna strona = jedna główna fraza. Obecnie serwis może rankować na ~2 frazy, a potrzebujecie ~15.

**3.2. Miejscowości docelowe nieobecne w treści** (tabela wyżej). areaServed w schema to tylko ogólna „Małopolska".

**3.3. Nagłówki H1 bez słów kluczowych:**

| Strona | Obecny H1 | Problem |
|---|---|---|
| /o-nas | „Za kulisami Firmy" | zero wartości SEO |
| /uslugi | „Co możemy Wam zaoferować?" | zero wartości SEO |
| /kontakt | „Skontaktuj się z nami" | akceptowalne, ale można lepiej |

### P2 — Ważne (techniczne)

**3.4. Soft-404 / stare adresy w indeksie Google.** Każdy nieistniejący URL (np. /losowa-strona-xyz) zwraca status 200 z treścią strony głównej. W indeksie Google wiszą stare adresy z poprzedniej wersji strony: `/projekty/` i `/kolejne-uslugi-dostepne/` (ze starymi tytułami „Projekty – Biuro Projektowe ArKon"). Rozwiązanie: przekierowania 301 starych adresów na odpowiedniki (np. /projekty/ → /uslugi) i konfiguracja hostingu tak, by nieznane ścieżki zwracały 404.

**3.5. Sitemap niekompletna.** Zawiera tylko 6 stron — brak 5 wpisów blogowych (/blog/piekna-jesienna-aura itd.). Dodać wszystkie indeksowalne URL-e + aktualizować przy publikacji.

**3.6. Niespójny NAP w katalogach.** Panorama Firm podaje e-mail biuro.arkon.projekty@gmail.com, strona: biuro@projekty-arkon.pl. Ujednolicić dane (nazwa, adres, telefon, e-mail) we wszystkich katalogach: Google Business Profile, Panorama Firm, Aleo, oferteo, daibau.

### P3 — Do rozwoju

**3.7. Blog to kronika firmowa, nie magnes SEO.** Wpisy typu „Piękna jesienna aura" nie odpowiadają na żadne zapytanie. Brak treści poradnikowych z potencjałem lokalnym.

**3.8. Galeria bez treści.** 235 słów przy 13 realizacjach. Każda realizacja z miejscowością to potencjalna strona case study („Dom jednorodzinny w Bochni — projekt i nadzór").

---

## 4. Rekomendowana architektura serwisu

```
/                              → fraza brandowa + „biuro projektowe Małopolska"
/uslugi                        → hub linkujący do podstron
  /uslugi/projekty-indywidualne
  /uslugi/adaptacja-projektu       ← „adaptacja projektu gotowego/typowego"
  /uslugi/kierownik-budowy         ← osobna, mocna strona (macie uprawnienia!)
  /uslugi/nadzor-budowy
  /uslugi/geodezja  (itd. dla pozostałych)
/biuro-projektowe-bochnia      ← strony lokalne (landing per miasto)
/biuro-projektowe-limanowa
/biuro-projektowe-brzesko
/biuro-projektowe-wieliczka
/biuro-projektowe-gdow
/realizacje                    → galeria + podstrony case study
/blog                          → treści poradnikowe
```

Zasada stron lokalnych: każda musi być UNIKALNA (nie kopiuj-wklej z podmianą miasta): dojazd/odległość od biura, realizacje z tej gminy (zdjęcia z galerii już są!), specyfika lokalna (MPZP, tereny osuwiskowe, otulina parku), opinie klientów z okolicy.

---

## 5. Propozycje title + meta description

### Strony istniejące

| Strona | Propozycja title (≤60 zn.) | Propozycja meta description (≤155 zn.) |
|---|---|---|
| / | Biuro Projektowe ArKon — projekty domów i adaptacje, Małopolska | Projekty indywidualne, adaptacje projektów typowych i kierownik budowy z uprawnieniami. Obsługujemy Bochnię, Limanową, Brzesko, Wieliczkę i Gdów. |
| /o-nas | Zespół ArKon — architekci i kierownik budowy | Poznaj zespół ArKon z Żegociny: architekci, konstruktorzy, geodeci i kierownik budowy z uprawnieniami. Kompleksowa obsługa inwestycji w Małopolsce. |
| /uslugi | Usługi: projekty domów, adaptacje, kierownik budowy — ArKon | Projekty indywidualne, adaptacja projektów gotowych, nadzór i kierownik budowy, geodezja. Działamy w powiatach bocheńskim, limanowskim, brzeskim i wielickim. |
| /galeria | Realizacje — domy i obiekty | Bochnia, Limanowa i okolice | Zobacz nasze projekty zrealizowane w Bochni, Sobolowie, Lipnicy Murowanej, Żegocinie i okolicach. Domy jednorodzinne, osiedla, obiekty publiczne. |
| /kontakt | Kontakt — Biuro Projektowe ArKon, Żegocina k. Bochni | (obecna jest OK — ew. dodać „k. Bochni i Limanowej") |

### Nowe strony (najważniejsze)

**`/uslugi/kierownik-budowy`** — to Wasza najmocniejsza przewaga (konkurencja projektowa rzadko ją ma):
- Title: `Kierownik budowy z uprawnieniami — Bochnia, Limanowa, Brzesko`
- Meta: `Kierownik budowy z uprawnieniami konstrukcyjno-budowlanymi. Dziennik budowy, odbiory, nadzór. Bochnia, Limanowa, Brzesko, Wieliczka, Gdów. Tel. 888 899 366.`
- H1: `Kierownik budowy — Bochnia, Limanowa, Brzesko i okolice`
- Treść: zakres obowiązków, ile kosztuje, kiedy wymagany, nr uprawnień, FAQ, mapa obszaru działania

**`/uslugi/adaptacja-projektu`**
- Title: `Adaptacja projektu gotowego — Bochnia, Wieliczka | ArKon`
- Meta: `Adaptujemy projekty typowe (Archon, Murator i inne) do działki i MPZP. Komplet formalności do pozwolenia na budowę. Powiaty: bocheński, wielicki, limanowski.`

**`/biuro-projektowe-bochnia`** (wzór dla pozostałych miast)
- Title: `Biuro projektowe Bochnia — projekty domów i adaptacje | ArKon`
- Meta: `Architekt i kierownik budowy dla Bochni i okolic — 20 min od centrum. Projekty indywidualne, adaptacje, nadzór budowy. Bezpłatna konsultacja: 888 899 366.`
- H1: `Biuro projektowe dla Bochni i powiatu bocheńskiego`

---

## 6. Mapa słów kluczowych

| Fraza | Strona docelowa | Konkurencja w TOP |
|---|---|---|
| biuro projektowe Bochnia | /biuro-projektowe-bochnia | j2sbiuroprojektowe.pl, archtech.eu, projektybochniabrzesko.pl |
| kierownik budowy Bochnia / Brzesko / Limanowa | /uslugi/kierownik-budowy | kierownikbudowy.biz.pl, projektybochniabrzesko.pl + portale (oferteo, daibau) |
| adaptacja projektu Bochnia / Wieliczka | /uslugi/adaptacja-projektu | archtech.eu, archital.eu |
| projekt domu indywidualny Limanowa | /uslugi/projekty-indywidualne | głównie portale — realna szansa na TOP3 |
| architekt Gdów / Żegocina | strona główna + lokalne | mało konkurencji bezpośredniej |
| geodeta Żegocina / Limanowa | /uslugi/geodezja | osobna nisza, warto |

Frazy z portalami ogłoszeniowymi w TOP (oferteo, daibau, muratordom) są łatwiejsze do przebicia niż te z mocnymi stronami firmowymi — Google chętnie pokazuje lokalną firmę z dobrą stroną nad katalogiem.

---

## 7. Local SEO poza stroną (duża dźwignia)

1. **Google Business Profile** — kategoria główna „Biuro projektów budowlanych", dodatkowe: „Usługi nadzoru budowlanego", „Geodeta". Obszar działania: wszystkie 5 miejscowości. Regularne posty + zdjęcia realizacji. Systematycznie zbierać opinie (link QR dla klientów po odbiorze).
2. **NAP** — ujednolicić e-mail i dane we wszystkich katalogach (pkt 3.6).
3. **Schema** — rozszerzyć `areaServed` na listę: Bochnia, Limanowa, Brzesko, Wieliczka, Gdów, Żegocina (typ City); dodać `Person` z `hasCredential` dla kierownika budowy; na stronach usług dodać typ `Service`.
4. Wizytówki w: oferteo, daibau, muratordom (tam szukają klienci na kierownika budowy — to też źródło zleceń, nie tylko link).

---

## 8. Plan treści na blog (frazy poradnikowe z lokalnym potencjałem)

1. Ile kosztuje kierownik budowy w Małopolsce (2026)?
2. Adaptacja projektu gotowego — krok po kroku i ceny (powiat bocheński)
3. Budowa domu w terenie górskim/osuwiskowym — Limanowa, Żegocina
4. MPZP czy warunki zabudowy — jak sprawdzić działkę w gminie Gdów / Bochnia
5. Dom do 70 m² bez pozwolenia — czy warto? (rozwinięcie FAQ, które już macie)
6. Case study każdej realizacji z galerii (13 gotowych tematów ze zdjęciami)

Każdy wpis: 800–1500 słów, H2 z pytaniami, link do strony usługi + strony lokalnej.

---

## 9. Kolejność wdrożenia

| # | Zadanie | Efekt | Wysiłek |
|---|---|---|---|
| 1 | Strona /uslugi/kierownik-budowy | wysoki (unikalna przewaga) | 1 dzień |
| 2 | 5 stron lokalnych | wysoki | 3–5 dni |
| 3 | Podział /uslugi na podstrony | wysoki | 2–3 dni |
| 4 | 301 dla starych URL + fix soft-404 | średni | godziny |
| 5 | Sitemap z wpisami bloga | niski/średni | godziny |
| 6 | GBP + NAP + opinie | wysoki (mapy!) | ciągłe |
| 7 | Nowe title/meta (pkt 5) | średni | godziny |
| 8 | Blog poradnikowy 1–2 wpisy/mies. | rośnie w czasie | ciągłe |

Realistycznie: efekty na frazy lokalne przy tej konkurencji — 2–4 miesiące od wdrożenia punktów 1–4.
