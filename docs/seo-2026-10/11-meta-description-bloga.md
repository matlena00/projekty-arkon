# 11 – Meta description wpisów bloga

**Priorytet:** 3 (szybka wygrana) · **Kto:** dev · **Wysiłek:** 1 h · **Zależności:** brak

## Cel

Każdy wpis ma meta description o długości 120–160 znaków i title, który opisuje temat.

## Dowód

- 36 z 38 wpisów ma description o długości 250–604 znaków: `BlogPostPage.tsx` przekazuje do `<Seo>` cały `post.excerpt` (linia ok. 94), a zajawki w CMS są długie.
- Trzy wpisy mają title krótszy niż 30 znaków: „Biuro | Blog ArKon” (18), „Start | Blog ArKon” (21), „Dom z widokiem | Blog ArKon” (27).

## Pliki

- `src/pages/BlogPostPage.tsx`
- `src/lib/schema.ts` – `blogPostingLd` (pole `description`)
- opcjonalnie `src/lib/types.ts`, `src/lib/cms.ts`, `AdminDashboard.tsx`, `supabase/` – pole `seo_description`

## Kroki

1. Dodaj funkcję przycinającą:

   ```ts
   const metaDescription = (text: string, max = 155) => {
     const clean = text.replace(/\s+/g, " ").trim();
     if (clean.length <= max) return clean;
     const cut = clean.slice(0, max);
     const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
     return end > 80 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(" ")) + "…";
   };
   ```

2. Użyj jej w `<Seo description>` i w `blogPostingLd`. Widoczna zajawka na stronie zostaje bez zmian.
3. Opcjonalnie: kolumna `seo_description` w tabeli `wpisy` i pole w panelu z licznikiem znaków; gdy puste, działa przycinanie.
4. Trzem wpisom z krótkim tytułem zmień tytuły w CMS na opisowe (np. „Start” → „Początek działalności biura ArKon”), albo obejmij je decyzją z zadania 15.

## Kryteria akceptacji

- W `dist/blog/*/index.html` żaden `meta name="description"` nie przekracza 160 znaków i żaden nie kończy się w pół słowa.
- `og:description` ma tę samą treść.

## Weryfikacja

```bash
for f in dist/blog/*/index.html; do grep -o 'name="description" content="[^"]*"' "$f" | awk '{print length($0)-28}'; done | sort -n | tail -3
```
