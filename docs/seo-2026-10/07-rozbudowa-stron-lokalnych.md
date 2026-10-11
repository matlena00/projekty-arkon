# 07 – Rozbudowa stron lokalnych

**Priorytet:** 2 (duży wpływ) · **Kto:** dev + treść od ArKon · **Wysiłek:** ok. 0,5 dnia na miasto · **Zależności:** 06 (link do budynków usługowych)

## Cel

Strony czterech miast wchodzą do TOP 10 na „biuro projektowe + miasto”. Kolejność prac: Bochnia, Brzesko, Wieliczka, Limanowa.

## Dowód (GSC 15.07–29.09.2026)

| Strona | Słowa | Wyświetlenia | Pozycja |
|---|---|---|---|
| `/biuro-projektowe-bochnia` | 374 | 823 | 17,2 |
| `/biuro-projektowe-brzesko` | 382 | 349 | 8,9 |
| `/biuro-projektowe-wieliczka` | 393 | 131 | 25,5 |
| `/biuro-projektowe-limanowa` | 383 | 38 | 24,4 |

Zapytania, na które te strony się wyświetlają, a których słów w treści brakuje:

- Bochnia: „usługi projektowe bochnia” (53 wyśw., poz. 24), „pracownia projektowa bochnia” (39, poz. 35), „firma projektowa bochnia” (34, poz. 32), „budowa domów bochnia” (26, poz. 17), „architekt bochnia” (10, poz. 39).
- Brzesko: „budowa domów jednorodzinnych brzesko” (49, poz. 12), „architekt brzesko” (poz. 21).
- Wieliczka: „projekty budowlane wieliczka” (38, poz. 14), „kierownik budowy wieliczka” (38, poz. 15,5), „architekt wieliczka” (16, poz. 49).
- Limanowa: „kierownik budowy limanowa” (poz. 4,7), „architekt limanowa” (poz. 35).

## Pliki

- `src/data/localPages.ts` – dane czterech miast (interfejs `LocalPageData`)
- `src/pages/LocalOfficePage.tsx` – szablon; nowe sekcje wymagają nowych pól w interfejsie
- `src/data/localMaps.ts` – bez zmian

## Kroki

1. Rozszerz `LocalPageData` o pola: `commercial` (tytuł + akapity o budynkach usługowych w danym powiecie, link do strony z zadania 06), `process` (kroki współpracy z lokalnymi terminami urzędów), `reviews` (2–3 opinie klientów z okolicy), `nearbyPlaces` (lista gmin i miejscowości).
2. Dodaj odpowiednie sekcje w `LocalOfficePage.tsx`, każda z nagłówkiem H2.
3. Dla każdego miasta dopisz treść do 900–1 200 słów:
   - realizacje z powiatu: minimum 4, z miejscowością, typem obiektu i zakresem (dziś są krótkie podpisy),
   - lokalne procedury: starostwo i wydział architektury, stan planu ogólnego i MPZP w gminach powiatu, typowe terminy,
   - budynki usługowe w danym mieście,
   - synonimy z GSC w nagłówkach i tekście: „pracownia projektowa”, „architekt”, „usługi projektowe”, „projekty budowlane”, „budowa domu”,
   - lista obsługiwanych gmin (np. dla Bochni: Nowy Wiśnicz, Rzezawa, Łapanów, Żegocina, Lipnica Murowana, Trzciana, Drwinia, Bochnia gmina).
4. FAQ: z 4 do 6–7 pytań na miasto, w tym jedno o kosztach i jedno o czasie uzyskania pozwolenia w danym starostwie.
5. Zadbaj, żeby dopisane akapity były różne dla każdego miasta. Kopiowanie tego samego tekstu z podmianą nazwy szkodzi.

## Do dostarczenia przez ArKon

- Po 4–6 realizacji na powiat (miejscowość, typ, zakres, rok, zdjęcie).
- Po 2–3 opinie klientów z danego powiatu (z Google, za zgodą).
- Krótki komentarz architekta o specyfice każdego powiatu.

## Kryteria akceptacji

- Każda strona ma 900+ słów treści głównej i 6+ nagłówków H2.
- Każda zawiera słowa „architekt”, „pracownia projektowa” i „budynki usługowe” oraz link do `/uslugi/projekty-budynkow-uslugowych`.
- Porównanie dwóch dowolnych stron miast: mniej niż 30% wspólnych zdań.
- `FAQPage` w schemie odpowiada pytaniom widocznym na stronie.

## Weryfikacja

Po 4 tygodniach od deployu: GSC → Skuteczność → filtr strony → pozycja i wyświetlenia względem tabeli wyżej.
