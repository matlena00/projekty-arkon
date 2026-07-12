import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
