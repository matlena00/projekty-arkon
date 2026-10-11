import { toast } from "sonner";

// CookieYes ładuje się przez GTM i wystawia globalną funkcję otwierającą panel zgód.
// Pływający przycisk CookieYes jest wyłączony, więc to jedyna droga do zmiany lub
// wycofania zgody (art. 7 ust. 3 RODO - wycofanie ma być równie łatwe jak jej wyrażenie).
type CookieYesWindow = Window & { revisitCkyConsent?: () => void };

/** Otwiera panel ustawień CookieYes; gdy skrypt jest zablokowany (np. przez adblock), wyjaśnia alternatywę. */
export function openCookieSettings() {
  const revisit = (window as CookieYesWindow).revisitCkyConsent;
  if (typeof revisit === "function") {
    revisit();
    return;
  }
  toast.info(
    "Panel ustawień cookies nie wczytał się - mogła go zablokować wtyczka w przeglądarce. " +
      "Pliki cookies możesz usunąć lub zablokować w ustawieniach przeglądarki."
  );
}
