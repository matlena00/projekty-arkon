import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/assets/hero-night.webp";
import heroImgMobile from "@/assets/hero-night-mobile.webp";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToServices = () => {
    document.querySelector("#uslugi")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Media query identyczne jak preloady w index.html — pobierany jest dokładnie preloadowany wariant. */}
        <picture className="block w-full h-full">
          <source media="(max-width: 640px)" srcSet={heroImgMobile} />
          <img
            src={heroImg}
            width={1536}
            height={1022}
            decoding="async"
            alt="Nowoczesny dom zaprojektowany przez ArKon"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
      <motion.div className="absolute inset-0 overlay-gradient" style={{ opacity: overlayOpacity }} />

      <motion.div className="relative z-10 section-padding max-w-5xl mx-auto text-center" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-accent text-xs md:text-sm font-medium tracking-[0.35em] uppercase mb-6 flex items-center justify-center gap-4">
            <span className="gold-line-wide" />
            Architektura i Konstrukcja
            <span className="gold-line-wide scale-x-[-1]" />
          </p>
          <h1 className="heading-display text-primary-foreground text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-4">
            Biuro Projektowe{" "}
            <span className="text-gold-gradient">ArKon</span>
          </h1>
          <p className="heading-serif-italic text-primary-foreground/50 text-2xl md:text-4xl mb-2">
            Zrealizujemy Twoje projekty
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-primary-foreground/60 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed mb-10 font-light"
        >
          Poprowadzimy Cię przez cały proces inwestycji od wyboru idealnego projektu
          i uzyskania pozwolenia na budowę, poprzez właściwą realizację i nadzór budowy,
          aż po uzyskanie pozwolenia na użytkowanie.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToServices}
          className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
        >
          Poznaj nasze usługi
          <ChevronDown size={18} />
        </motion.button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-primary-foreground/40" size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
