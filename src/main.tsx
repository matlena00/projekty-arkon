import { createRoot, hydrateRoot } from "react-dom/client";
import { dehydrate, hydrate } from "@tanstack/react-query";
import App from "./App.tsx";
import { queryClient } from "./lib/queryClient";
import { IS_PRERENDER, beginHydration, goLiveNow } from "./lib/prerender";
// Fonty hostowane lokalnie (pakiety @fontsource) - zewnętrzny arkusz Google Fonts blokował
// pierwsze malowanie strony. Przeglądarka pobiera tylko potrzebne zakresy (latin, latin-ext).
import "@fontsource-variable/dm-sans/opsz.css";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./index.css";

const rootEl = document.getElementById("root")!;

// Dane CMS zapisane w HTML przez prerender - pierwszy render klienta musi dać to samo
// drzewo co prerenderowany HTML, inaczej React odrzuca hydratację (#418/#423).
if (window.__ARKON_STATE__) hydrate(queryClient, window.__ARKON_STATE__);

// Jeśli HTML został wcześniej prerenderowany (#root ma treść) — hydratujemy,
// w przeciwnym razie zwykły render (dev / brak prerenderu).
if (rootEl.hasChildNodes()) {
  beginHydration();
  hydrateRoot(rootEl, <App />);
} else {
  goLiveNow();
  createRoot(rootEl).render(<App />);
}

// Prerender: po załadowaniu danych i kodu trasy zwracamy HTML z renderToString
// (a nie zrzut DOM-u), bo tylko taki HTML React potrafi potem zhydratować.
if (IS_PRERENDER) {
  window.__arkonSnapshot = async () => {
    const { renderToString } = await import("react-dom/server");
    return { html: renderToString(<App />), state: dehydrate(queryClient) };
  };
}
