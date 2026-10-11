# 13 – FAQPage bez duplikatów i porządek w nagłówkach

**Priorytet:** 3 (szybka wygrana) · **Kto:** dev · **Wysiłek:** 2–3 h · **Zależności:** brak

## Cel

Każdy zestaw pytań ma schemę `FAQPage` tylko na jednej stronie, a nagłówki H1–H3 oddają strukturę treści.

## Dowód

**FAQ.** `src/components/FaqSection.tsx` (linia 20) zawsze renderuje `<JsonLd data={faqLd(homeFaqItems)} />`. Komponent jest użyty na `/` (`Index.tsx`) i na `/uslugi` (`ServicesPage.tsx`, linia 274), a te same pytania są też w schemie `/faq` (`FaqPage.tsx`). Trzy strony deklarują identyczne `FAQPage`.

**Nagłówki** (z crawla live):

| Strona | Struktura |
|---|---|
| `/uslugi` | H1, 2×H2, 16×H3, 46×H4 |
| `/galeria` | H1 i 4×H5 (stopka), brak H2 |
| `/blog/<wpis>` | H1 i 4×H5 (stopka), brak H2 |
| `/blog` | H1, 1×H2, 37×H3 |
| wszystkie | stopka: 4×H5 (`Footer.tsx`, linie 21, 34, 45, 61) |

Lighthouse: audyt `heading-order` nie przechodzi. Dodatkowo nie przechodzą `button-name` (przycisk menu mobilnego) i `color-contrast`.

## Pliki

- `src/components/FaqSection.tsx`, `src/pages/Index.tsx`, `src/pages/ServicesPage.tsx`
- `src/components/Footer.tsx`
- `src/pages/ServicesPage.tsx` (linie ok. 156 i 190)
- `src/pages/GalleryPage.tsx`
- `src/pages/BlogPage.tsx`
- `src/components/Navbar.tsx`

## Kroki

1. `FaqSection`: dodaj prop `withSchema?: boolean` (domyślnie `false`) i renderuj `JsonLd` tylko gdy `true`. Na `/` i `/uslugi` zostaje sam widżet. `/faq` zachowuje schemę z `FaqPage.tsx`. Strony usług i miast (`LandingFaq`) mają własne, unikalne pytania i zostają bez zmian.
2. Stopka: zamień cztery `<h5>` na `<p>` z tymi samymi klasami.
3. `/uslugi`: tytuł każdej usługi jako H2 (dziś H3), nazwy pozycji szczegółowych jako H3 lub zwykły pogrubiony tekst (dziś 46×H4).
4. `/galeria`: nagłówek H2 dla każdej kategorii filtrów albo jeden H2 „Wybrane realizacje” nad siatką; tytuły realizacji w kaflach jako H3.
5. `/blog`: H2 „Wyróżniony wpis” i H2 „Wszystkie wpisy”; tytuły kart zostają H3.
6. Wpisy bloga: obsługa śródtytułów przyjdzie z edytorem (zadanie 15).
7. `Navbar`: `aria-label="Otwórz menu"` / „Zamknij menu” na przycisku hamburgera.
8. Kontrast: tekst pomocniczy w hero i stopce (`/60`, `/70`) podnieś do współczynnika co najmniej 4,5:1.

## Kryteria akceptacji

- `FAQPage` z pytaniami ogólnymi występuje tylko w `dist/faq/index.html`.
- Żadna strona nie przeskakuje poziomów nagłówków (H1 → H2 → H3).
- Lighthouse: `heading-order`, `button-name` i `color-contrast` przechodzą; Accessibility ≥ 95.

## Weryfikacja

```bash
grep -c '"FAQPage"' dist/index.html dist/uslugi/index.html dist/faq/index.html
```

```bash
grep -o '<h[1-6]' dist/uslugi/index.html | sort | uniq -c
```
