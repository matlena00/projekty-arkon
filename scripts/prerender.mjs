/**
 * Prerender (SSG) zbudowanej aplikacji.
 * Serwuje dist/ lokalnie, odwiedza każdą trasę headless Chrome (czeka na sieć,
 * więc łapie też dane z Supabase), zapisuje wyrenderowany HTML — z meta, JSON-LD i treścią
 * w ŹRÓDLE każdej podstrony (dla robotów i podglądów social).
 *
 * Uruchamiany automatycznie jako `postbuild` po `vite build`.
 * Odporny: jeśli przeglądarki nie da się uruchomić, pomija prerender (SPA dalej działa).
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
const ROUTES = ["/", "/o-nas", "/uslugi", "/galeria", "/blog", "/kontakt"];

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

  try {
    while (queue.length) {
      const route = queue.shift();
      if (done.has(route) || route.startsWith("/admin")) continue;
      done.add(route);

      const page = await browser.newPage();
      try {
        await page.goto(`${ORIGIN}${route}`, { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
        await new Promise((r) => setTimeout(r, 400)); // bufor na helmet/render

        if (route === "/blog" && !blogScanned) {
          blogScanned = true;
          const slugs = await page
            .$$eval('a[href^="/blog/"]', (as) => as.map((a) => new URL(a.href).pathname))
            .catch(() => []);
          for (const s of slugs) if (!done.has(s) && !queue.includes(s)) queue.push(s);
        }

        const html = await page.content();
        writeFileSync(outPath(route), html, "utf8");
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
  }

  console.log(`[prerender] Gotowe: ${done.size} stron.`);
}

main()
  .catch((e) => console.warn("[prerender] Błąd (pomijam, SPA działa):", e.message))
  .finally(() => process.exit(0));
