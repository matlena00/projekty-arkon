import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

const PHONE = "+48888899366";
const EMAIL = "biuro.arkon.projekty@gmail.com";

/**
 * Pasek kontaktowy widoczny tylko na mobile.
 * Pojawia się od dołu, gdy użytkownik scrolluje w GÓRĘ (szybki kontakt bez szukania).
 * Chowa się przy scrollu w dół oraz blisko góry strony (tam jest hero z własnym CTA).
 */
const MobileContactBar = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 120) {
        setVisible(false);
      } else if (y < lastY - 4) {
        setVisible(true); // scroll w górę
      } else if (y > lastY + 4) {
        setVisible(false); // scroll w dół
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // W panelu admina nie pokazujemy
  if (pathname.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 md:hidden shadow-2xl shadow-black/30"
        >
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-wider active:opacity-90"
            aria-label="Zadzwoń do nas"
          >
            <Phone size={18} /> Zadzwoń
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center justify-center gap-2 py-4 bg-charcoal text-primary-foreground text-sm font-semibold uppercase tracking-wider active:opacity-90"
            aria-label="Napisz do nas e-mail"
          >
            <Mail size={18} /> Napisz
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileContactBar;
