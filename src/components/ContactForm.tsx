import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Podaj imię i nazwisko"),
  email: z.string().email("Podaj poprawny adres e-mail"),
  subject: z.string().min(2, "Podaj temat wiadomości"),
  message: z.string().min(10, "Wiadomość jest zbyt krótka (min. 10 znaków)"),
  botcheck: z.string().optional(), // honeypot — ukryte pole antyspamowe
});

type FormValues = z.infer<typeof schema>;

// Klucz Web3Forms (publiczny — jak klucz anon trafia do front-endu).
// Domyślny powiązany z biuro@projekty-arkon.pl; można nadpisać przez .env.local.
// Uwaga: `||` zamiast `??` — pusta wartość w .env.local też ma użyć domyślnego klucza.
const ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim() ||
  "ca8a3741-28e6-4f0b-9da3-344fbe11d5ae";

const inputBase =
  "w-full bg-background border border-border/50 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (data.botcheck) return; // bot wykryty — cicho przerywamy
    if (!ACCESS_KEY) {
      toast.error("Formularz nie jest jeszcze skonfigurowany (brak VITE_WEB3FORMS_ACCESS_KEY).");
      return;
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `[projekty-arkon.pl] ${data.subject}`,
          from_name: data.name,
          name: data.name,
          email: data.email,
          replyto: data.email,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Dziękujemy! Twoja wiadomość została wysłana.");
        reset();
      } else {
        toast.error("Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na biuro@projekty-arkon.pl.");
      }
    } catch {
      toast.error("Wystąpił błąd połączenia. Spróbuj ponownie później.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* honeypot — niewidoczne dla ludzi */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("botcheck")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <input type="text" placeholder="Imię i nazwisko" className={inputBase} {...register("name")} />
          {errors.name && <p className="text-destructive text-xs mt-1.5">{errors.name.message}</p>}
        </div>
        <div>
          <input type="email" placeholder="Email" className={inputBase} {...register("email")} />
          {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <input type="text" placeholder="Temat" className={inputBase} {...register("subject")} />
        {errors.subject && <p className="text-destructive text-xs mt-1.5">{errors.subject.message}</p>}
      </div>

      <div>
        <textarea placeholder="Wiadomość" rows={5} className={`${inputBase} resize-none`} {...register("message")} />
        {errors.message && <p className="text-destructive text-xs mt-1.5">{errors.message.message}</p>}
      </div>

      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Wysyłanie…" : "Wyślij wiadomość"}
        <Send size={16} />
      </motion.button>
    </form>
  );
};

export default ContactForm;
