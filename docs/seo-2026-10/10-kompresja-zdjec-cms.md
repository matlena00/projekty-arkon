# 10 – Kompresja zdjęć w CMS

**Priorytet:** 2 · **Kto:** dev · **Wysiłek:** 1 dzień · **Zależności:** brak (warunek dla zadania 16)

## Cel

Zdjęcia dodawane w panelu trafiają na stronę jako WebP w rozsądnym rozmiarze, z osobną miniaturą. Istniejące pliki są przekonwertowane.

## Dowód (4.10.2026)

- `/galeria`: 24 obrazy z Supabase Storage, łącznie 94,8 MB.
- 20 z 24 plików ma ponad 1 MB; największe PNG: 7,35 / 7,18 / 7,14 / 6,93 / 6,44 / 5,44 MB.
- Adresy obrazów nie mają parametrów transformacji; siatka galerii ładuje pełne pliki.
- `scripts/optimize-images.mjs` obsługuje tylko `src/assets`.

## Pliki

- `src/lib/cms.ts` – `uploadProjectImage` (linia ok. 105), `uploadBlogImage` (linia ok. 171)
- `src/components/admin/AdminDashboard.tsx` – obsługa uploadu
- `src/pages/GalleryPage.tsx`, `src/components/HomeLightboxGallery.tsx`, `src/pages/BlogPage.tsx`, `src/pages/BlogPostPage.tsx` – wyświetlanie
- nowy `scripts/migrate-cms-images.mjs`
- `supabase/` – migracja, jeśli dochodzi kolumna na miniaturę

## Kroki

1. **Upload:** przed wysłaniem do Storage skompresuj plik w przeglądarce (np. `browser-image-compression` albo `canvas.toBlob`):
   - wersja pełna: dłuższy bok maks. 1 920 px, WebP, jakość ok. 80, cel poniżej 400 KB,
   - miniatura: szerokość 640 px, WebP, cel poniżej 80 KB.
2. Zapisuj oba pliki obok siebie (`<id>.webp`, `<id>-thumb.webp`). Adres miniatury wyprowadzaj z nazwy albo dodaj kolumnę `thumb_url` w `projekt_zdjecia`.
3. **Wyświetlanie:** siatka galerii, pasek na stronie głównej i lista bloga używają miniatury; lightbox i strona wpisu używają wersji pełnej. Dodaj `width` i `height` do `<img>` (Lighthouse zgłasza `unsized-images`).
4. **Migracja:** skrypt Node pobiera istniejące pliki z bucketów realizacji i bloga, konwertuje (`sharp`), wgrywa nowe wersje, aktualizuje adresy w bazie, a oryginały usuwa dopiero po sprawdzeniu strony. Skrypt uruchamiany ręcznie z kluczem serwisowym z `.env.local`.
5. Zrób kopię listy starych adresów przed migracją, żeby dało się ją cofnąć.
6. Po migracji: build i deploy, bo adresy zdjęć są w prerenderowanym HTML.

## Alternatywa

Supabase Image Transformations (`/render/image/public/...?width=640&format=webp`) bez zmiany plików. Wymaga płatnego planu; jeśli projekt go ma, to szybsza droga dla miniatur, ale oryginały po 7 MB i tak warto zmniejszyć.

## Kryteria akceptacji

- Suma wag obrazów ładowanych przez `/galeria` przy pełnym przewinięciu: poniżej 3 MB.
- Żaden obraz z CMS na stronie nie przekracza 500 KB.
- Nowe zdjęcie dodane w panelu zapisuje się jako WebP z miniaturą bez dodatkowych kroków po stronie redaktora.
- Lightbox nadal pokazuje ostre zdjęcie na ekranie 1 920 px.

## Weryfikacja

```bash
grep -o 'https://[^"]*supabase[^"]*' dist/galeria/index.html | sort -u | while read u; do curl -sI "$u" | grep -i content-length; done
```
