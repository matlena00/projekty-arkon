# 12 – Liczba opinii i sameAs

**Priorytet:** 3 (szybka wygrana) · **Kto:** dev · **Wysiłek:** 1–2 h · **Zależności:** aktualna liczba opinii i adres profilu Google od ArKon

## Cel

Opinie Google, największy atut biura, są aktualne i widoczne na stronach, które mają rankować. Schema organizacji wskazuje profil Google.

## Dowód

- `src/components/TestimonialsSection.tsx`: `const REVIEW_COUNT = 71;`. W sierpniu w Google były 74 opinie; aktualnej liczby audyt nie sprawdzał.
- Sekcja opinii jest tylko na stronie głównej.
- `index.html`: `"sameAs": ["https://www.facebook.com/BiuroProjektoweArKon"]`.
- GSC: „biuro projektowe arkon opinie” – 46 wyświetleń, pozycja 3,9, CTR 6,5%.

## Pliki

- `src/components/TestimonialsSection.tsx`
- `index.html` (JSON-LD organizacji)
- `src/pages/LocalOfficePage.tsx`, `src/pages/uslugi/*.tsx`
- opcjonalnie nowy `src/pages/OpiniePage.tsx`, `src/App.tsx`, `scripts/prerender.mjs`

## Kroki

1. Ustal aktualną liczbę i średnią opinii w Profilu Firmy. Przenieś `REVIEW_COUNT` do jednego pliku stałych (np. `src/data/reviews.ts`) razem z treścią opinii, żeby aktualizować w jednym miejscu.
2. Zaktualizuj liczbę. Rozważ zapis „ponad 70 opinii”, który nie dezaktualizuje się po każdej nowej.
3. W `index.html` rozszerz `sameAs` o adres Profilu Firmy w Google (link `https://www.google.com/maps?cid=…` albo `https://g.page/…`) i inne istniejące profile (Instagram, Oferteo po zadaniu 09).
4. Dodaj kompaktowy blok opinii (ocena, liczba, 2–3 cytaty, link „Zobacz wszystkie opinie w Google”) na stronach lokalnych i usługowych. Na stronach miast pokazuj opinie klientów z danej okolicy (zadanie 07).
5. Opcjonalnie: podstrona `/opinie` z pełną listą cytatów, title „Opinie o biurze projektowym ArKon”.
6. Nie dodawaj `aggregateRating` do schemy `LocalBusiness` na własnej stronie. Google nie pokazuje gwiazdek dla opinii o własnej firmie i traktuje to jako naruszenie wytycznych.

## Kryteria akceptacji

- Liczba opinii na stronie zgadza się z Profilem Firmy w dniu wdrożenia.
- `sameAs` zawiera adres profilu Google; test wyników rozszerzonych nie zgłasza błędów w JSON-LD.
- Blok opinii jest na 4 stronach miast i 3 (po zadaniu 06: 4) stronach usług.

## Weryfikacja

```bash
grep -o '"sameAs":[^]]*]' dist/index.html
```

Rich Results Test dla strony głównej.
