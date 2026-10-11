# 14 – Alty zdjęć w galerii

**Priorytet:** 3 (szybka wygrana) · **Kto:** dev + uzupełnienie danych przez ArKon · **Wysiłek:** 1–2 h · **Zależności:** brak

## Cel

Każde zdjęcie realizacji ma opis alternatywny mówiący, co przedstawia i gdzie, zamiast samej nazwy miejscowości.

## Dowód

- `src/pages/GalleryPage.tsx`, linia 251: `alt={item.title}`; linia 333: ``alt={`${openItem.title} ${imgIndex + 1}`}``.
- Tytuły realizacji w CMS to nazwy miejscowości, więc alty brzmią: „Brzezie”, „Żegocina”, „Sobolów”, „Lipnica Murowana”, „Kraków”.
- Typ `ProjectImage` ma pole `alt` (`src/lib/types.ts`), ale galeria go nie używa.
- Cała strona `/galeria` ma 241 słów na 24 realizacje.

## Pliki

- `src/pages/GalleryPage.tsx`
- `src/components/HomeLightboxGallery.tsx`
- `src/lib/types.ts` – `CATEGORY_LABELS`
- `src/lib/schema.ts` – `imageGalleryLd`

## Kroki

1. Dodaj funkcję budującą alt z danych, które już są:

   ```ts
   const projectAlt = (p: { tytul: string; kategoria: ProjectCategory }, img?: { alt: string | null }, n?: number) =>
     img?.alt?.trim() ||
     `${CATEGORY_LABELS[p.kategoria]} – ${p.tytul}, projekt biura ArKon${n ? ` (zdjęcie ${n})` : ""}`;
   ```

   Wynik: „Dom jednorodzinny – Sobolów, projekt biura ArKon”.
2. Użyj jej w siatce, w lightboxie i w pasku na stronie głównej. Jeśli redaktor wpisał własny alt przy zdjęciu, ma pierwszeństwo.
3. Podpis pod kaflem: dodaj typ obiektu obok miejscowości („Dom jednorodzinny · Sobolów”).
4. ArKon uzupełnia w panelu krótkie opisy (pole `opis`) dla realizacji, zaczynając od 10 najważniejszych: typ, miejscowość i gmina, zakres prac, rok. Pełne opisy to zadanie 16.
5. Sprawdź, czy pole alt przy zdjęciu jest edytowalne w `AdminDashboard.tsx`; jeśli nie, dodaj je.

## Kryteria akceptacji

- W `dist/galeria/index.html` żaden alt zdjęcia realizacji nie jest samą nazwą miejscowości.
- Każdy alt zawiera typ obiektu i miejscowość, ma do ok. 125 znaków.
- Miniatury w pasku lightboxa (dekoracyjne) zostają z `alt=""`.

## Weryfikacja

```bash
grep -o '<img[^>]*alt="[^"]*"' dist/galeria/index.html | grep -o 'alt="[^"]*"' | sort | uniq -c | sort -rn | head
```
