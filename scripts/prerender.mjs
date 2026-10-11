/**
 * Prerender (SSG) zbudowanej aplikacji.
 * Serwuje dist/ lokalnie, odwiedza każdą trasę headless Chrome (czeka na sieć,
 * więc łapie też dane z Supabase), zapisuje wyrenderowany HTML — z meta, JSON-LD i treścią
 * w ŹRÓDLE każdej podstrony (dla robotów i podglądów social).
 *
 * Przy okazji zapisuje dist/sitemap.xml z listy faktycznie wyrenderowanych tras —
 * dzięki temu mapa witryny nie rozjeżdża się z zawartością (wpisy bloga pochodzą z CMS-u,
 * więc ręcznie utrzymywany plik zawsze był nieaktualny).
 *
 * Uruchamiany automatycznie jako `postbuild` po `vite build`.
 * Odporny: jeśli przeglądarki nie da się uruchomić, pomija prerender (SPA dalej działa),
 * a sitemapa i tak powstaje — z samych tras statycznych.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4178;
const ORIGIN = `http://localhost:${PORT}`;

// Trasy startowe (bez /admin — to panel, nie treść). /blog/:slug dokrywane z linków.
const ROUTES = [
  "/",
  "/o-nas",
  "/uslugi",
  "/uslugi/kierownik-budowy",
  "/uslugi/adaptacja-projektu",
  "/uslugi/projekty-indywidualne",
  "/biuro-projektowe-bochnia",
  "/biuro-projektowe-limanowa",
  "/biuro-projektowe-brzesko",
  "/biuro-projektowe-wieliczka",
  "/galeria",
  "/blog",
  "/faq",
  "/kontakt",
  "/404", // trasa nie istnieje → renderuje NotFound; zapisywana jako dist/404.html (ErrorDocument)
];

const SITE = "https://projekty-arkon.pl";

/** Priorytet w sitemapie wg wzorca trasy (od najbardziej szczegółowego). */
function priorityFor(route) {
  if (route === "/") return "1.0";
  if (route.startsWith("/uslugi/")) return "0.9";
  if (route.startsWith("/blog/")) return "0.5";
  if (route === "/blog" || route === "/kontakt") return "0.6";
  if (route === "/faq") return "0.7";
  return "0.8";
}

/** Data publikacji wpisu bloga z JSON-LD w wyrenderowanym HTML-u. */
function publishedDate(html) {
  const m = html.match(/"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

function writeSitemap(pages) {
  const urls = [...pages.entries()]
    .filter(([route]) => route !== "/404")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([route, lastmod]) => {
      const loc = `${SITE}${route === "/" ? "/" : route}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <priority>${priorityFor(route)}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
  writeFileSync(join(DIST, "sitemap.xml"), xml, "utf8");
  console.log(`[prerender] sitemap.xml: ${urls.length} adresów.`);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function outPath(route) {
  if (route === "/") return join(DIST, "index.html");
  // Strona błędu dla Apache ErrorDocument (SEOHOST) — plik 404.html w katalogu głównym
  if (route === "/404") return join(DIST, "404.html");
  const dir = join(DIST, route);
  mkdirSync(dir, { recursive: true });
  return join(dir, "index.html");
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.warn("[prerender] Brak dist/index.html — najpierw `vite build`. Pomijam.");
    return;
  }

  // Pierwotny shell (pusty #root) serwujemy dla tras SPA — niezależnie od nadpisań.
  const SHELL = readFileSync(join(DIST, "index.html"));

  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const ext = extname(urlPath);
    if (ext) {
      try {
        const data = await readFile(join(DIST, urlPath));
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(SHELL);
  });

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  } catch (e) {
    console.warn("[prerender] Nie można uruchomić przeglądarki — pomijam prerender (SPA działa normalnie):", e.message);
    return;
  }

  await new Promise((resolve) => server.listen(PORT, resolve));

  const queue = [...ROUTES];
  const done = new Set();
  let blogScanned = false;

  // route -> lastmod. Wpisy bloga dostają datę publikacji z JSON-LD, strony statyczne
  // datę wdrożenia (ich HTML powstaje na nowo przy każdym buildzie).
  const buildDate = new Date().toISOString().slice(0, 10);
  const sitemapPages = new Map();

  try {
    while (queue.length) {
      const route = queue.shift();
      if (done.has(route) || route.startsWith("/admin")) continue;
      done.add(route);

      const page = await browser.newPage();
      try {
        // Aplikacja wystawia window.__arkonSnapshot tylko w trybie prerenderu.
        await page.evaluateOnNewDocument(() => {
          window.__PRERENDER__ = true;
        });
        // Analityka nie może działać w trakcie builda: GTM wstrzykiwał do <head> kolejne
        // skrypty (gtag, CookieYes), które trafiały do zapisanego HTML-u i ładowały się podwójnie.
        await page.setRequestInterception(true);
        page.on("request", (req) =>
          /googletagmanager\.com|google-analytics\.com|cookieyes\.com/.test(req.url()) ? req.abort() : req.continue()
        );
        await page.goto(`${ORIGIN}${route}`, { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
        await new Promise((r) => setTimeout(r, 400)); // bufor na helmet/render

        if (route === "/blog" && !blogScanned) {
          blogScanned = true;
          const slugs = await page
            .$$eval('a[href^="/blog/"]', (as) => as.map((a) => new URL(a.href).pathname))
            .catch(() => []);
          for (const s of slugs) if (!done.has(s) && !queue.includes(s)) queue.push(s);
        }

        // Treść #root pochodzi z renderToString (window.__arkonSnapshot w src/main.tsx),
        // a nie ze zrzutu DOM-u: zrzut nie ma znaczników Suspense ani separatorów tekstu,
        // więc React odrzucał hydratację (błędy #418/#423) i rysował stronę od nowa.
        // Style początkowe animacji zostają w HTML-u; widoczność treści przed hydratacją
        // zapewnia reguła CSS "osłona prerenderu" w src/index.css.
        const state = await page.evaluate(async () => {
          const snap = await window.__arkonSnapshot();
          document.getElementById("root").innerHTML = snap.html;
          return snap.state;
        });

        let html = await page.content();

        // Skrypt GTM dopisany do <head> przez snippet w trakcie renderu - u użytkownika
        // snippet wstawi go sam; zostawiony w HTML-u ładowałby GTM dwa razy.
        html = html.replace(/<script[^>]*src="https:\/\/www\.googletagmanager\.com\/[^"]*"[^>]*><\/script>/g, "");

        // renderToString jest potrzebny tylko w prerenderze - bez tego preloadu użytkownik
        // pobierałby ~23 KB nieużywanego kodu (link dopisał loader Vite przy imporcie).
        html = html.replace(/<link rel="modulepreload"[^>]*server\.browser[^>]*>/g, "");

        // Stan zapytań CMS dla hydratacji (pierwszy render klienta = ten sam HTML).
        if (state && state.queries && state.queries.length) {
          // Strona wpisu renderuje treść tylko własnego wpisu - z pozostałych zostawiamy
          // metadane (nawigacja poprzedni/następny), bez treści, żeby nie doklejać całego
          // bloga do każdej podstrony. Pełne dane dociąga zapytanie po hydratacji.
          if (route.startsWith("/blog/")) {
            const slug = route.slice("/blog/".length);
            for (const q of state.queries) {
              if (q.queryKey[0] === "public-posts" && Array.isArray(q.state.data)) {
                q.state.data = q.state.data.map((p) => (p.slug === slug ? p : { ...p, tresc: null }));
              }
            }
          }
          const json = JSON.stringify(state).replace(/</g, "\\u003c");
          html = html.replace("</body>", `<script>window.__ARKON_STATE__=${json}</script></body>`);
        }

        // Preload hero (hero-home*) dotyczy tylko strony głównej — na pozostałych trasach
        // usuwamy, żeby nie pobierać ~180KB nieużywanego obrazu. Nagłówek /uslugi używa
        // innego zdjęcia (hero-night), więc nie ma czego tam preloadować.
        const heroPreloadRe = /\s*<link rel="preload" as="image"[^>]*hero-home[^>]*>/g;
        if (route !== "/") html = html.replace(heroPreloadRe, "");

        writeFileSync(outPath(route), html, "utf8");
        sitemapPages.set(route, route.startsWith("/blog/") ? publishedDate(html) : buildDate);
        console.log(`[prerender] ✓ ${route}`);
      } catch (e) {
        console.warn(`[prerender] pominięto ${route}: ${e.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
    // Gdy któraś trasa padła, i tak wypuszczamy sitemapę z tym, co się udało;
    // brakujące trasy statyczne dokładamy, żeby mapa nigdy nie była uboższa od ROUTES.
    for (const r of ROUTES) if (!sitemapPages.has(r)) sitemapPages.set(r, buildDate);
    writeSitemap(sitemapPages);
  }

  console.log(`[prerender] Gotowe: ${done.size} stron.`);
}

main()
  .catch((e) => console.warn("[prerender] Błąd (pomijam, SPA działa):", e.message))
  .finally(() => process.exit(0));
