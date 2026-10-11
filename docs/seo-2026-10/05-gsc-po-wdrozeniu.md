# 05 – Weryfikacja w GSC po wdrożeniu

**Priorytet:** 1 · **Kto:** dev (konto z dostępem do usługi `projekty-arkon.pl` w Search Console) · **Wysiłek:** 30 min · **Zależności:** po deployu zadań 01–03

## Cel

Google szybciej zauważa poprawki: zamyka zgłoszone błędy i ponownie skanuje najważniejsze strony.

## Stan w GSC (4.10.2026)

| Raport „Strony” | Adresy |
|---|---|
| Zindeksowano | 18 |
| Strona wykryta – obecnie niezindeksowana | 34 (wpisy bloga) |
| Strona zawiera przekierowanie | 3 (poprawne) |
| Nie znaleziono (404) | 2 |
| Błąd serwera (5xx) | 1 |

## Kroki

1. Indeksowanie → Strony → „Nie znaleziono (404)” → **Sprawdź poprawkę**. To samo dla „Błąd serwera (5xx)”. Po zadaniu 01 te adresy dają 301.
2. Indeksowanie → Mapy witryn: prześlij ponownie `https://projekty-arkon.pl/sitemap.xml` i sprawdź, czy status to „Udało się”, a liczba adresów zgadza się z buildem.
3. Sprawdzenie adresu URL → **Poproś o zindeksowanie** dla (limit to kilkanaście dziennie):
   - `/`
   - `/biuro-projektowe-bochnia`, `/biuro-projektowe-brzesko`, `/biuro-projektowe-wieliczka`, `/biuro-projektowe-limanowa`
   - `/uslugi`, `/o-nas`
   - nowych podstron po zadaniach 06 i 17
4. Dla strony głównej użyj „Przetestuj URL w wersji opublikowanej” → „Wyświetl przetestowaną stronę” i sprawdź, czy w HTML jest nowy H1 oraz czy w zakładce „Więcej informacji” nie ma błędów JavaScript.
5. Ustawienia → Statystyki indeksowania: zanotuj liczbę żądań (dziś 557 / 90 dni) i udział kodów 200/301/404. Kod 429 nie powinien się pojawiać.
6. Nie proś o indeksację 34 krótkich wpisów bloga. O ich losie decyduje zadanie 15.

## Kryteria akceptacji

- Weryfikacja poprawek dla 404 i 5xx ma status „Rozpoczęto”, a po 1–2 tygodniach „Zaliczono”.
- Sitemapa przetworzona bez błędów.
- Po 7–14 dniach GSC pokazuje nowy title strony głównej w wynikach (Skuteczność → Strony → `/` → podgląd w Google).

## Kiedy wrócić

Po 14 dniach od deployu i potem w ramach zadania 18.
