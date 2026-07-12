import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLocation } from "react-router-dom";

const PHONE = "+48888899366";
const PHONE_LABEL = "+48 888 899 366";

/**
 * Pływający przycisk „Zadzwoń" w prawym dolnym rogu — tylko na desktopie (md+).
 * Na mobile rolę kontaktu pełni MobileContactBar (dolny pasek), więc tu chowamy (hidden md:flex).
 */
const DesktopCallButton = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.a
      href={`tel:${PHONE}`}
      aria-label="Zadzwoń do nas"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="hidden md:flex fixed bottom-6 right-6 z-50 group items-center"
    >
      {/* subtelny puls */}
      <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />

      {/* etykieta po najechaniu */}
      <span className="absolute right-full mr-3 whitespace-nowrap bg-charcoal text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Zadzwoń: {PHONE_LABEL}
      </span>

      {/* właściwy przycisk */}
      <span className="relative w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg shadow-accent/30">
        <Phone size={22} />
      </span>
    </motion.a>
  );
};

export default DesktopCallButton;
