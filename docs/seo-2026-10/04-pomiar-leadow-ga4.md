# 04 – Pomiar leadów w GA4

**Priorytet:** 1 (krytyczne) · **Kto:** dev · **Wysiłek:** 2–3 h · **Zależności:** dostęp do kontenera GTM-TCSHD868 i usługi GA4 projekty-arkon.pl (G-6GWQV8TTNG)

## Cel

GA4 pokazuje, ile zapytań (formularz, telefon, e-mail) przynosi każde źródło ruchu. Bez tego nie da się ocenić, czy prace SEO przekładają się na klientów.

## Dowód (GA4, 6.09–3.10.2026)

- Karta „Najważniejsze wydarzenia”: brak danych.
- Zdarzenia w usłudze: `page_view` 1,3 tys., `user_engagement` 704, `session_start` 546, `first_visit` 404, `scroll` 274, `form_start` 6. Brak zdarzenia wysłania formularza i kliknięcia w telefon.
- W kodzie nie ma żadnego `dataLayer.push`.
- Źródła sesji: Facebook 311 (57%), Google organic 128 (24%), direct 96 (18%).

## Pliki

- `src/components/ContactForm.tsx` – sukces wysyłki (linia ok. 57, `if (json.success)`)
- nowy `src/lib/analytics.ts`
- linki `tel:` w: `MobileContactBar.tsx`, `DesktopCallButton.tsx`, `OfficeSection.tsx`, `Footer.tsx`, `landing/CtaBand.tsx`, `LocalOfficePage.tsx`, `NotFound.tsx`, `uslugi/KierownikBudowyPage.tsx`, `uslugi/ProjektyIndywidualnePage.tsx`
- link `mailto:` w `Footer.tsx` i na `/kontakt`

## Kroki

1. Dodaj helper:

   ```ts
   // src/lib/analytics.ts
   export const track = (event: string, params: Record<string, unknown> = {}) => {
     if (typeof window === "undefined") return;
     ((window as any).dataLayer ||= []).push({ event, ...params });
   };
   ```

2. W `ContactForm.tsx` po `json.success` wywołaj `track("generate_lead", { method: "form", page: location.pathname })`.
3. Kliknięcia `tel:` i `mailto:` obsłuż jednym nasłuchem na `document` (np. w `App.tsx`), żeby nie edytować każdego linku: jeśli kliknięty `a[href^="tel:"]` → `track("phone_click", { page })`, jeśli `a[href^="mailto:"]` → `track("email_click", { page })`.
4. W GTM: trzy reguły typu „zdarzenie niestandardowe” i trzy tagi „Zdarzenie GA4” (`generate_lead`, `phone_click`, `email_click`), odpalane po zgodzie analitycznej z CookieYes.
5. W GA4 (Administracja → Zdarzenia) oznacz wszystkie trzy jako kluczowe zdarzenia.
6. Przy okazji sprawdź w trybie podglądu GTM, czy baner CookieYes blokuje tagi przed zgodą i czy działa Consent Mode v2 (audyt tego nie weryfikował).

## Kryteria akceptacji

- Wysłanie formularza testowego pojawia się w GA4 → Czas rzeczywisty jako `generate_lead`.
- Kliknięcie numeru telefonu na telefonie i na komputerze wysyła `phone_click`.
- Po 48 h raport „Pozyskiwanie ruchu” pokazuje kolumnę kluczowych zdarzeń w podziale na źródła.
- Bez zgody na cookies analityczne tagi GA4 się nie odpalają.

## Weryfikacja

Podgląd GTM (Tag Assistant) na wersji live, potem GA4 → Raporty → Czas rzeczywisty. Wiadomość testową z formularza oznacz w treści jako test, żeby biuro jej nie obsługiwało.
