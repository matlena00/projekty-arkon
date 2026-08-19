import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin = () => {
  const { signIn, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    setSubmitting(false);
    if (err) setError("Błędny e-mail lub hasło.");
  };

  return (
    <main className="min-h-screen bg-charcoal flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-background p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center border border-accent/40 text-accent">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="font-display font-700 text-foreground text-lg leading-tight">Panel ArKon</h1>
            <p className="text-muted-foreground text-xs">Zaloguj się, aby zarządzać treścią</p>
          </div>
        </div>

        {!configured && (
          <p className="mb-6 text-sm text-destructive">
            Supabase nie jest skonfigurowany - uzupełnij VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY w .env.local.
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              E-mail
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Hasło
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={submitting || !configured}
            className="w-full bg-accent text-accent-foreground py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 disabled:opacity-50"
          >
            {submitting ? "Logowanie…" : "Zaloguj"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
