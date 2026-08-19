import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const quickLinks = [
  { label: "Usługi", to: "/uslugi" },
  { label: "Kierownik budowy", to: "/uslugi/kierownik-budowy" },
  { label: "Adaptacja projektu", to: "/uslugi/adaptacja-projektu" },
  { label: "Realizacje", to: "/galeria" },
  { label: "Kontakt", to: "/kontakt" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="overflow-x-hidden">
      <Seo
        title="404 - nie znaleziono strony | ArKon"
        description="Strona nie istnieje lub została przeniesiona."
        path={location.pathname}
        noindex
      />
      <Navbar />

      <section className="relative flex min-h-screen items-center bg-charcoal overflow-hidden">
        {/* Duża "404" w tle - jak section-number na podstronach */}
        {/* przezroczystość w kolorze (accent/10), nie w opacity - prerender zdejmuje inline opacity */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="heading-serif-italic text-accent/10 text-[38vw] lg:text-[28vw] leading-none absolute -right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          aria-hidden
        >
          404
        </motion.p>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="gold-line-wide" />
            <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">Błąd 404</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-display text-primary-foreground text-3xl md:text-5xl lg:text-6xl mb-6 max-w-3xl"
          >
            Ta strona nie istnieje - ale Wasz dom może powstać
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary-foreground/60 text-base md:text-lg leading-relaxed max-w-xl mb-10"
          >
            Adres jest błędny albo strona została przeniesiona. Wybierzcie jedną z poniższych ścieżek -
            albo po prostu zadzwońcie.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-14"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              Wróć na stronę główną
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+48888899366"
              className="inline-flex items-center justify-center gap-3 border border-primary-foreground/25 text-primary-foreground/85 px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:border-accent hover:text-accent transition-all duration-300"
            >
              <Phone size={16} />
              888 899 366
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-primary-foreground/40 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Najczęściej szukane
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group inline-flex items-center gap-2 text-primary-foreground/70 text-sm hover:text-accent transition-colors"
                >
                  <span className="h-px w-4 bg-accent/60 group-hover:w-6 transition-all" aria-hidden />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFound;
