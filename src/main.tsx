import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

// Jeśli HTML został wcześniej prerenderowany (#root ma treść) — hydratujemy,
// w przeciwnym razie zwykły render (dev / brak prerenderu).
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
