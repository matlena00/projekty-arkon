import { MotionGlobalConfig } from "framer-motion";

/**
 * Współpraca aplikacji z prerenderem (scripts/prerender.mjs).
 *
 * HTML każdej trasy powstaje z renderToString (window.__arkonSnapshot), więc jest dokładnie
 * tym, co React wyrenderuje przy hydratacji: te same znaczniki Suspense, separatory tekstu
 * i style początkowe framer-motion (opacity:0 + transform). Żeby treść była widoczna od
 * pierwszej klatki (LCP, brak JS), CSS w index.css neutralizuje te style, dopóki <html>
 * nie dostanie klasy "arkon-live". Klasę nadaje goLive() po zakończeniu hydratacji.
 */
declare global {
  interface Window {
    /** Ustawiane przez prerender przed startem aplikacji. */
    __PRERENDER__?: boolean;
    /** Stan React Query zapisany w HTML przez prerender. */
    __ARKON_STATE__?: unknown;
    /** Zwraca HTML #root z renderToString i stan zapytań - wołane przez prerender. */
    __arkonSnapshot?: () => Promise<{ html: string; state: unknown }>;
  }
}

export const IS_PRERENDER = typeof window !== "undefined" && window.__PRERENDER__ === true;

const HIDDEN_BY_MOTION = '[style*="opacity:0;"], [style$="opacity:0"], [style*="opacity: 0;"]';

let live = false;

const markLive = () => {
  live = true;
  // W prerenderze klasa nie może trafić do zapisanego HTML-u.
  if (!IS_PRERENDER) document.documentElement.classList.add("arkon-live");
};

/** Zwykły start SPA (dev, /admin, brak prerenderu) - nie ma czego osłaniać. */
export const goLiveNow = () => {
  if (!live) markLive();
};

/**
 * Start po hydratacji prerenderowanego HTML-u.
 * 1) Na czas hydratacji animacje są natychmiastowe: elementy animowane przy montowaniu
 *    (hero, nagłówki) i te już widoczne w oknie przechodzą od razu w stan końcowy,
 *    bez mignięcia "widoczne -> 0 -> pojawianie się".
 * 2) Po chwili zdejmujemy osłonę CSS: elementy poniżej ekranu wracają do stanu początkowego
 *    i animują się normalnie przy przewijaniu.
 */
export const beginHydration = () => {
  MotionGlobalConfig.skipAnimations = true;
};

export const goLiveAfterHydration = () => {
  if (live) return;
  window.setTimeout(() => {
    if (live) return;
    // Element wciąż w stanie początkowym, ale już w oknie (np. viewport margin jeszcze
    // niespełniony) - zostaje widoczny, żeby nie zniknął użytkownikowi sprzed oczu.
    document.querySelectorAll<HTMLElement>(HIDDEN_BY_MOTION).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight && r.width > 0) el.setAttribute("data-arkon-shown", "");
    });
    markLive();
    MotionGlobalConfig.skipAnimations = false;
  }, 600);
};
