/**
 * Jednorazowa migracja istniejących realizacji (zdjęcia z src/assets) do Supabase.
 *
 * Uruchomienie (PowerShell):
 *   $env:VITE_SUPABASE_URL="https://yaqynrfayvnnsncmxsbp.supabase.co"
 *   $env:VITE_SUPABASE_ANON_KEY="<anon key>"
 *   $env:ADMIN_EMAIL="<e-mail admina>"
 *   $env:ADMIN_PASSWORD="<hasło admina>"
 *   node scripts/seed-cms.mjs
 *
 * Skrypt:
 *   - loguje się jako admin (RLS przepuszcza zapisy tylko dla zalogowanych),
 *   - jest idempotentny: jeśli w tabeli `projekty` są już rekordy, pomija migrację,
 *   - wgrywa pliki do bucketa `realizacje` i tworzy wpisy w `projekty` + `projekt_zdjecia`.
 *
 * Uwaga: hasło podajesz tylko lokalnie w trakcie uruchomienia — nigdzie nie jest zapisywane.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, "..", "src", "assets");

const URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const ANON = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!URL || !ANON || !EMAIL || !PASSWORD) {
  console.error("Brak zmiennych. Ustaw: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, ADMIN_EMAIL, ADMIN_PASSWORD");
  process.exit(1);
}

const supabase = createClient(URL, ANON);

// Mapowanie istniejących realizacji (ścieżki względem src/assets)
const PROJECTS = [
  { tytul: "Dom jednorodzinny 01", kategoria: "domy", files: ["projects/dom-01.webp", "projects/dom-02.webp"] },
  { tytul: "Dom jednorodzinny 02", kategoria: "domy", files: ["projects/dom-03.webp", "projects/dom-04.webp"] },
  { tytul: "Dom jednorodzinny 03", kategoria: "domy", files: ["projects/dom-05.webp", "projects/dom-06.webp", "projects/dom-07.webp", "projects/dom-08.webp"] },
  { tytul: "Dom jednorodzinny 04", kategoria: "domy", files: ["projects/dom-09.webp", "projects/dom-10.webp"] },
  { tytul: "Dębno", kategoria: "domy", files: ["project-1.webp", "project-2.webp", "project-4.webp"] },
  { tytul: "Łazany", kategoria: "domy", files: ["project-3.webp", "project-5.webp", "project-6.webp", "about-terrace.webp"] },
  { tytul: "Pietrzejowice", kategoria: "domy", files: ["hero-night.webp", "project-aerial.webp"] },
  { tytul: "Kompleks edukacyjny", kategoria: "publiczne", files: ["projects/publiczne-1.webp", "projects/publiczne-2.webp", "projects/publiczne-3.webp", "projects/publiczne-4.webp", "projects/publiczne-5.webp", "projects/publiczne-6.webp"] },
  { tytul: "Centrum sportowe", kategoria: "publiczne", files: ["projects/sportowe-1.webp", "projects/sportowe-2.webp", "projects/sportowe-3.webp", "projects/sportowe-4.webp"] },
  { tytul: "Lipnica Murowana", kategoria: "uslugowe", files: ["projects/uslugowe-1.webp", "projects/uslugowe-2.webp", "projects/uslugowe-3.webp", "projects/uslugowe-5.webp", "projects/uslugowe-8.webp", "projects/uslugowe-9.webp", "projects/uslugowe-10.webp", "projects/uslugowe-13.webp", "projects/uslugowe-14.webp", "projects/uslugowe-15.webp"] },
  { tytul: "Biuro ArKon", kategoria: "wnetrza", files: ["office-lobby.webp", "office-reception.webp", "office-desk.webp"] },
  { tytul: "Osiedle Pietrzejowice", kategoria: "osiedla", files: ["projects/osiedle-1.webp", "projects/osiedle-2.webp", "projects/osiedle-3.webp", "projects/osiedle-4.webp"] },
  { tytul: "Osiedle Nowoczesne", kategoria: "osiedla", files: ["projects/osiedle-5.webp", "projects/osiedle-6.webp", "projects/osiedle-7.webp", "projects/osiedle-8.webp", "projects/osiedle-9.webp", "projects/osiedle-10.webp"] },
];

const TYPES = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const contentType = (f) => TYPES[extname(f).toLowerCase()] || "application/octet-stream";

async function main() {
  const { error: authErr } = await supabase.auth.signInWithPassword({ email: EMAIL, password: PASSWORD });
  if (authErr) {
    console.error("Logowanie nieudane:", authErr.message);
    process.exit(1);
  }

  const { count } = await supabase.from("projekty").select("*", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`W bazie jest już ${count} realizacji — przerywam (idempotencja).`);
    process.exit(0);
  }

  let total = 0;
  for (const [i, p] of PROJECTS.entries()) {
    const { data: proj, error } = await supabase
      .from("projekty")
      .insert({ tytul: p.tytul, kategoria: p.kategoria, opis: null, sort_order: i, published: true })
      .select()
      .single();
    if (error) {
      console.error("Błąd tworzenia realizacji", p.tytul, "—", error.message);
      continue;
    }

    for (const [j, rel] of p.files.entries()) {
      const fname = basename(rel);
      const path = `${proj.id}/${Date.now()}-${fname}`;
      try {
        const buf = readFileSync(join(ASSETS, rel));
        const { error: upErr } = await supabase.storage.from("realizacje").upload(path, buf, { contentType: contentType(fname) });
        if (upErr) throw upErr;
        const url = supabase.storage.from("realizacje").getPublicUrl(path).data.publicUrl;
        await supabase.from("projekt_zdjecia").insert({ projekt_id: proj.id, url, alt: p.tytul, sort_order: j, is_cover: j === 0 });
        total++;
      } catch (e) {
        console.error("  Błąd zdjęcia", rel, "—", e.message);
      }
    }
    console.log(`✓ ${p.tytul} (${p.files.length} zdj., ${p.kategoria})`);
  }

  console.log(`\nGotowe. Dodano ${PROJECTS.length} realizacji, ${total} zdjęć.`);
  process.exit(0);
}

main();
