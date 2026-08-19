import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

import biuro01 from "@/assets/biuro01.webp";
import biuro01Thumb from "@/assets/biuro01-thumb.webp";
import biuro02 from "@/assets/biuro02.webp";
import biuro02Thumb from "@/assets/biuro02-thumb.webp";

const OfficeSection = () => {
  // Parallax: dwa przesunięte względem siebie zdjęcia płyną w przeciwnych kierunkach.
  const galleryRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
  <>
    {/* Office Gallery */}
    <section className="py-24 md:py-32 bg-warm-white overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Nasze biuro
          </p>
          <h2 className="heading-display text-foreground text-3xl md:text-5xl lg:text-6xl mb-4">
            Miejsce, gdzie powstają projekty
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nowoczesne biuro zaprojektowane z myślą o komforcie naszych klientów i zespołu.
          </p>
        </motion.div>

        <div ref={galleryRef} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            style={{ y: y1 }}
            className="md:w-[62%]"
          >
            <img
              src={biuro01}
              srcSet={`${biuro01Thumb} 900w, ${biuro01} 1920w`}
              sizes="(min-width: 768px) 62vw, 100vw"
              alt="Recepcja biura ArKon"
              className="w-full aspect-[4/3] object-cover shadow-xl"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ y: y2 }}
            className="mt-6 md:w-[55%] md:ml-auto md:-mt-[23%] relative z-10"
          >
            <img
              src={biuro02}
              srcSet={`${biuro02Thumb} 900w, ${biuro02} 1920w`}
              sizes="(min-width: 768px) 55vw, 100vw"
              alt="Zespół ArKon przy pracy w biurze"
              className="w-full aspect-[4/3] object-cover shadow-2xl"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Consultation CTA */}
    <section className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/20 to-transparent" />
      </div>

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="heading-serif-italic text-accent text-xl md:text-2xl mb-3">
              Zacznijmy od rozmowy
            </p>
            <h2 className="heading-display text-primary-foreground text-3xl md:text-5xl mb-6">
              Umów się na rozmowę bez zobowiązań
            </h2>
            <p className="text-concrete text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Pierwsze spotkanie jest zawsze bez zobowiązań. Porozmawiamy o Twoich potrzebach,
              przedstawimy możliwości i zaproponujemy najlepsze rozwiązanie dla Twojego projektu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              >
                <CalendarDays size={18} />
                Umów spotkanie
              </Link>
              <a
                href="tel:+48888899366"
                className="inline-flex items-center gap-3 border border-concrete/30 text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:border-accent/50 hover:text-accent transition-all duration-300"
              >
                <MessageCircle size={18} />
                Zadzwoń teraz
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                step: "01",
                title: "Kontakt",
                desc: "Zadzwoń lub napisz – umówimy się na spotkanie w dogodnym terminie.",
              },
              {
                step: "02",
                title: "Konsultacja",
                desc: "Spotkamy się w naszym biurze, omówimy Twoje potrzeby i oczekiwania.",
              },
              {
                step: "03",
                title: "Oferta",
                desc: "Przygotujemy indywidualną wycenę i harmonogram realizacji projektu.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="flex gap-6 items-start group"
              >
                <span className="section-number text-4xl md:text-5xl shrink-0 group-hover:text-accent/50 transition-colors duration-500">
                  {item.step}
                </span>
                <div className="pt-2">
                  <h4 className="font-display font-700 text-primary-foreground text-lg mb-1">
                    {item.title}
                  </h4>
                  <p className="text-concrete text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  </>
  );
};

export default OfficeSection;
