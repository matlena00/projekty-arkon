import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 600, suffix: "+", label: "Zrealizowanych zleceń" },
  { value: 350, suffix: "+", label: "Pozwoleń na budowę" },
  { value: 8, suffix: "", label: "Lat doświadczenia" },
  { value: 250, suffix: "+", label: "Budów pod nadzorem" },
];

const AnimatedNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  // Stan początkowy = wartość docelowa: taka trafia do prerenderowanego HTML-u (roboty,
  // brak JS). Po zamontowaniu, zanim sekcja wejdzie w widok, zerujemy licznik pod animację.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span className="text-gold-gradient heading-display text-5xl md:text-6xl lg:text-7xl">
      {display}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
      {/* Decorative */}
      <span className="section-number text-[12rem] md:text-[18rem] absolute -top-16 -right-8 select-none pointer-events-none opacity-50">∞</span>

      <div ref={ref} className="section-padding max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="heading-serif-italic text-accent text-lg md:text-xl mb-2">W liczbach</p>
          <h2 className="heading-display text-primary-foreground text-2xl md:text-3xl">Nasze doświadczenie</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              <div className="gold-line-wide mx-auto mt-4 mb-3" />
              <p className="text-concrete text-sm md:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
