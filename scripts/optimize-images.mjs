/**
 * Jednorazowa optymalizacja obrazów: PNG/JPG -> WebP (+ miniatury dla siatek).
 * Uruchomienie: node scripts/optimize-images.mjs
 *
 * - Pełne obrazy: max 1920px szerokości, WebP q78 (hero/lightbox/slidery).
 * - Miniatury (-thumb): dla zdjęć wyświetlanych w siatkach (galeria, biuro) 900px,
 *   dla portretów zespołu 480px.
 * - Oryginały .png/.jpg są usuwane po udanej konwersji (zostają w historii gita).
 */
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const ASSETS = new URL("../src/assets", import.meta.url).pathname;

const FULL_MAX_WIDTH = 1920;
const FULL_QUALITY = 78;
const THUMB_QUALITY = 72;

// Które pliki dostają dodatkową miniaturę i o jakiej szerokości
function thumbWidthFor(relPath) {
  if (relPath.startsWith("projects/")) return 900; // siatka galerii realizacji
  if (relPath.startsWith("team/")) return 480; // awatary zespołu (128-160px CSS)
  if (relPath.startsWith("lokalne/")) return 900; // karty realizacji na stronach lokalnych
  if (relPath.startsWith("uslugi/")) return 900; // karty portfolio na podstronach usług
  if (/^office-(real-[12]|lobby|reception|desk)\./.test(relPath)) return 900; // siatka biura
  return null;
}

const SKIP = new Set(["logo-white.png"]); // 4KB, zostaje bez zmian

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let before = 0;
let after = 0;
const report = [];

for await (const file of walk(ASSETS)) {
  const rel = path.relative(ASSETS, file);
  if (!/\.(png|jpe?g)$/i.test(rel) || SKIP.has(rel)) continue;

  const src = sharp(file);
  const meta = await src.metadata();
  const origSize = (await stat(file)).size;
  before += origSize;

  const base = file.replace(/\.(png|jpe?g)$/i, "");
  const fullOut = `${base}.webp`;
  await src
    .clone()
    .resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: FULL_QUALITY })
    .toFile(fullOut);
  let newSize = (await stat(fullOut)).size;

  const tw = thumbWidthFor(rel);
  if (tw && (meta.width ?? 0) > tw) {
    const thumbOut = `${base}-thumb.webp`;
    await src
      .clone()
      .resize({ width: tw, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbOut);
    newSize += (await stat(thumbOut)).size;
  }

  after += newSize;
  report.push(
    `${rel}: ${(origSize / 1048576).toFixed(2)}MB -> ${(newSize / 1024).toFixed(0)}KB (${meta.width}x${meta.height})`
  );
  await unlink(file);
}

report.sort();
console.log(report.join("\n"));
console.log(
  `\nRAZEM: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`
);
