import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    let subscription: { unsubscribe: () => void } | null = null;
    getSupabase().then((client) => {
      if (!client || cancelled) {
        setLoading(false);
        return;
      }
      client.auth.getSession().then(({ data }) => {
        if (cancelled) return;
        setSession(data.session);
        setLoading(false);
      });
      const { data: sub } = client.auth.onAuthStateChange((_event, newSession) => {
        if (!cancelled) setSession(newSession);
      });
      subscription = sub.subscription;
    });
    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, []);

  const signIn: AuthContextValue["signIn"] = async (email, password) => {
    const client = await getSupabase();
    if (!client) return { error: "Supabase nie jest skonfigurowany (.env.local)." };
    const { error } = await client.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    const client = await getSupabase();
    if (client) await client.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, loading, configured: isSupabaseConfigured, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth musi być użyty wewnątrz <AuthProvider>");
  return ctx;
};
