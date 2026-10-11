# 18 – Comiesięczny przegląd GSC i GA4

**Priorytet:** 4 (stałe) · **Kto:** dev / marketing · **Wysiłek:** 30 min miesięcznie · **Zależności:** 04 (pomiar leadów)

## Cel

Raz w miesiącu sprawdzamy te same liczby, żeby wiedzieć, czy wdrożenia działają, i wcześnie wyłapać regres.

## Gdzie

- Search Console: usługa domenowa `projekty-arkon.pl`.
- GA4: usługa `projekty-arkon.pl` (identyfikator pomiaru G-6GWQV8TTNG).

## Tabela przeglądu

Dopisuj kolumnę co miesiąc (pierwszy tydzień miesiąca, dane za poprzednie 28 dni; pozycje z GSC za ostatnie 28 dni).

| Miernik | Źródło | 4.10.2026 | 11/2026 | 12/2026 | Cel 31.12 |
|---|---|---|---|---|---|
| Kliknięcia łącznie (28 dni) | GSC Skuteczność | ok. 150 | | | – |
| Kliknięcia z zapytań bez „arkon” | GSC, filtr zapytania: nie zawiera „arkon” | ok. 5 | | | 40+ |
| „biuro projektowe bochnia” – pozycja | GSC | 15,3* | | | ≤ 7 |
| „biuro projektowe brzesko” – pozycja | GSC | 8,8* | | | ≤ 3 |
| „biuro projektowe wieliczka” – pozycja | GSC | 13,0* | | | ≤ 10 |
| „biuro projektowe limanowa” – pozycja | GSC | 11,5* (2 wyśw.) | | | ≤ 10 |
| „kierownik budowy bochnia” – pozycja | GSC | 8,2* | | | ≤ 5 |
| Strony zindeksowane | GSC Indeksowanie → Strony | 18 | | | wszystkie z sitemapy |
| „Wykryta – niezindeksowana” | GSC | 34 | | | 0 |
| Domeny linkujące | GSC Linki | 2 | | | 15+ |
| Żądania Googlebota (90 dni) | GSC Ustawienia → Statystyki indeksowania | 557 | | | rośnie |
| Sesje z Google organic (28 dni) | GA4 Pozyskiwanie ruchu | 128 | | | 250+ |
| Leady: formularz + telefon + e-mail | GA4 kluczowe zdarzenia | brak pomiaru | | | mierzone |
| Leady z Google organic | GA4 | brak pomiaru | | | rośnie |
| LCP mobile, strona główna | Lighthouse | 9,5 s | | | ≤ 2,5 s |
| Liczba opinii Google | Profil Firmy | 71 na stronie | | | rośnie |

\* wartości z okresu 15.07–29.09.2026.

## Kroki przeglądu

1. GSC → Skuteczność, 28 dni, porównanie z poprzednim okresem: zapytania i strony z największą zmianą.
2. Zapytania na pozycjach 8–20 z rosnącą liczbą wyświetleń: sprawdź, czy strona docelowa ma tę frazę w H2 i treści; jeśli nie, dopisz.
3. Nowe zapytania bez pasującej strony: kandydaci na poradnik (zadanie 15) albo podstronę (zadanie 17).
4. GSC → Indeksowanie → Strony: nowe błędy 404 / 5xx / przekierowania; kod 429 w statystykach indeksowania zgłoś do SEOHOST.
5. GA4 → Pozyskiwanie ruchu: sesje i kluczowe zdarzenia według źródła.
6. Lighthouse dla strony głównej i jednej strony miasta.
7. Zaktualizuj statusy w [README.md](README.md) i tabelę wyżej.

## Sygnały alarmowe

- Spadek liczby zindeksowanych stron głównych (z 14).
- Kody 429 lub 5xx w statystykach indeksowania.
- Błędy React w konsoli po deployu (regres zadania 03).
- Usunięte trasy nadal odpowiadają 200 na serwerze (stare katalogi po deployu).

## Kryteria akceptacji

- Tabela ma uzupełnioną kolumnę za każdy miesiąc.
- Każdy przegląd kończy się najwyżej trzema konkretnymi działaniami na kolejny miesiąc, dopisanymi do README.
