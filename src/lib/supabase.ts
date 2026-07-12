import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True, gdy oba klucze Supabase są ustawione w .env.local */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  // Nie przerywamy działania strony — publiczne sekcje mają fallback,
  // a panel /admin pokaże komunikat o konieczności konfiguracji.
  console.warn(
    "[supabase] Brak VITE_SUPABASE_URL lub VITE_SUPABASE_ANON_KEY — uzupełnij .env.local, aby włączyć CMS i panel /admin."
  );
}

// Klient ładowany dynamicznie, żeby ~55KB gz biblioteki nie blokowało
// pierwszego renderu — chunk supabase pobiera się dopiero przy pierwszym
// zapytaniu CMS (albo wcale, gdy klucze nie są skonfigurowane).
let clientPromise: Promise<SupabaseClient | null> | null = null;

export function getSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(url as string, anonKey as string)
    );
  }
  return clientPromise;
}
