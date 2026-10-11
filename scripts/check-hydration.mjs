/**
 * Kontrola hydratacji prerenderowanych stron.
 * Serwuje dist/ tak jak produkcja (trasa -> <trasa>/index.html), otwiera wskazane trasy
 * w headless Chrome i wypisuje błędy konsoli. Kod wyjścia 1, gdy pojawi się jakikolwiek błąd.
 *
 *   node scripts/check-hydration.mjs            # domyślny zestaw tras
 *   node scripts/check-hydration.mjs / /blog    # wybrane trasy
 *
 * Pełne komunikaty Reacta (zamiast "Minified React error #418") daje build deweloperski:
 *   npm run build:dev && node scripts/prerender.mjs && node scripts/check-hydration.mjs
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = 4179;
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".ico": "image/x-icon" };

const firstPost = existsSync(join(DIST, "blog")) ? readdirSync(join(DIST, "blog")).find((d) => !d.includes(".")) : null;
const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/o-nas", "/uslugi", "/uslugi/projekty-indywidualne", "/biuro-projektowe-bochnia", "/galeria", "/blog", firstPost && `/blog/${firstPost}`, "/faq", "/kontakt"].filter(Boolean);

const server = createServer(async (req, res) => {
  const p = decodeURIComponent((req.url || "/").split("?")[0]);
  const file = extname(p) ? join(DIST, p) : join(DIST, p, "index.html");
  try {
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
let failed = 0;
for (const route of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  // Analityka i fonty zewnętrzne nie mają wpływu na hydratację, a spowalniają test.
  await page.setRequestInterception(true);
  page.on("request", (r) => (/googletagmanager|google-analytics|cookieyes/.test(r.url()) ? r.abort() : r.continue()));
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e.message || e)));
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 500));
  if (errors.length) {
    failed++;
    console.log(`✗ ${route}`);
    for (const e of errors) console.log("    " + e.slice(0, 1200).replace(/\n/g, "\n    "));
  } else {
    console.log(`✓ ${route}`);
  }
  await page.close();
}
await browser.close();
server.close();
process.exit(failed ? 1 : 0);
