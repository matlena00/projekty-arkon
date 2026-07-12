import { motion } from "framer-motion";
import { Compass, FileCheck, Route, MapPin, HardHat, Building2, Sofa, FileSearch, LandPlot } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Projekty indywidualne",
    description: "Koncepcja, Projekt zagospodarowania działki, Projekty architektoniczne i techniczne, Wizualizacja.",
  },
  {
    icon: FileCheck,
    title: "Adaptacje projektów",
    description: "Adaptacja projektów gotowych i typowych, zmiany w projektach, sprzedaż projektów gotowych.",
  },
  {
    icon: Route,
    title: "Projekty branżowe",
    description: "Projekty drogowe, przyłącza wod-kan i gaz, zmiany sposobu użytkowania, legalizacja samowoli.",
  },
  {
    icon: MapPin,
    title: "Geodezja",
    description: "Mapy do celów projektowych, podziały działek, ustalenie granic, wytyczenia budynków.",
  },
  {
    icon: HardHat,
    title: "Nadzór budowy",
    description: "Kierownik budowy, Inspektor nadzoru inwestorskiego, odbiory budynków, doradztwo techniczne.",
  },
  {
    icon: Building2,
    title: "Obsługa inwestycji",
    description: "Kompleksowe prowadzenie budowy, koordynacja ekip budowlanych, kontrola rzeczowo-finansowa.",
  },
  {
    icon: Sofa,
    title: "Projekty wnętrz",
    description: "Projekt funkcjonalny, dobór materiałów i kolorystyki, wizualizacje 3D wnętrz, meble na wymiar.",
  },
  {
    icon: FileSearch,
    title: "Ekspertyzy i opinie",
    description: "Ocena stanu technicznego, ekspertyzy konstrukcyjne, opinie techniczne, inwentaryzacje budowlane.",
  },
  {
    icon: LandPlot,
    title: "Analizy działek",
    description: "Badanie chłonności działek, przedzakupowa analiza terenu, ocena możliwości zabudowy, weryfikacja przepisów lokalnych.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const ServicesSection = () => (
  <section id="uslugi" className="py-24 md:py-32 bg-warm-white">
    <div className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="gold-line-wide" />
          <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">Usługi</p>
          <div className="gold-line-wide scale-x-[-1]" />
        </div>
        <p className="heading-serif-italic text-accent text-xl md:text-2xl mb-2">Nasza oferta</p>
        <h2 className="heading-display text-foreground text-2xl md:text-4xl lg:text-5xl">
          Co możemy Wam zaoferować?
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            variants={item}
            className="group card-hover bg-background p-8 md:p-10 border border-border/50 cursor-pointer relative overflow-hidden"
          >
            <span className="section-number text-5xl absolute top-3 right-4 select-none pointer-events-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-12 flex items-center justify-center mb-6 border border-accent/30 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
              <service.icon size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-700 text-base md:text-lg text-foreground mb-3">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
