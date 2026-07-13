import { motion } from "framer-motion";

const partners = [
  { name: "ARCHETON", style: "font-display font-800 tracking-[0.15em] text-xl md:text-2xl" },
  { name: "archon+", style: "font-serif italic font-light text-2xl md:text-3xl" },
  { name: "dom.pl", style: "font-display font-700 text-xl md:text-2xl lowercase" },
  { name: "homekoncept", style: "font-body font-300 tracking-[0.2em] text-lg md:text-xl uppercase" },
  { name: "murator.pl", style: "font-display font-800 text-xl md:text-2xl" },
];

const PartnersSection = () => (
  <section className="py-20 md:py-28 bg-warm-white overflow-hidden">
    <div className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="gold-line-wide" />
          <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">Projekty gotowe</p>
          <div className="gold-line-wide scale-x-[-1]" />
        </div>
        <p className="heading-serif-italic text-accent text-lg md:text-xl mb-2">Adaptujemy i sprzedajemy</p>
        <h2 className="heading-display text-foreground text-2xl md:text-3xl mb-4">
          Projekty z czołowych katalogów
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Jesteśmy punktem sprzedaży i adaptujemy projekty wiodących polskich pracowni. Wybierz gotowy projekt, a my dopasujemy go do Twojej działki i przepisów lokalnych.
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative"
          >
            <span
              className={`${partner.style} text-muted-foreground/40 group-hover:text-accent transition-colors duration-500 cursor-default select-none`}
            >
              {partner.name}
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
