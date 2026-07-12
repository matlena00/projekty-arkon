import { motion } from "framer-motion";
import { Star, Award, Quote } from "lucide-react";

// Ocena i liczba opinii (Google) — aktualizuj okresowo.
const RATING = "5,0";
const REVIEW_COUNT = 70;

const testimonials = [
  {
    quote:
      "Polecam! Pełen profesjonalizm od pierwszego spotkania, świetne podejście do klienta i ogromna wiedza. Współpraca z firmą ArKon była czystą przyjemnością, na każdym etapie mogliśmy liczyć na fachowe doradztwo. Biuro architektoniczne godne zaufania — polecam każdemu, kto szuka solidnego projektanta :)",
    name: "Ewelina",
  },
  {
    quote:
      "Na firmę ArKon trafiliśmy dzięki forum budowlanemu, gdzie miała bardzo dobre opinie – i w pełni zasłużenie. Zespół z ogromną cierpliwością odpowiadał na wszystkie nasze pytania i rozwiewał wątpliwości. Otrzymaliśmy również pełne wsparcie w kwestiach formalnych, co pozwoliło nam sprawnie uzyskać pozwolenie na budowę. Pomimo współpracy na odległość, cały proces przebiegał bezproblemowo i w przyjaznej atmosferze. Z pełnym przekonaniem polecamy firmę ArKon i serdecznie pozdrawiamy cały zespół!",
    name: "Piotr",
  },
  {
    quote:
      "Trafiliśmy do ArKon po przejściach z innym biurem projektowym i od pierwszych chwil wiedzieliśmy, że teraz jesteśmy w dobrych rękach. Kontakt z klientem na bardzo wysokim poziomie, a wszystkie kwestie związane z uzyskaniem pozwolenia na budowę oraz realizacji indywidualnego projektu domu przedstawione w bardzo przystępny sposób. Otrzymaliśmy wiele dobrych rad, kontaktów i finalnie projekt domu dokładnie taki, o jaki nam chodziło, oraz pozwolenie na wybudowanie go. Z czystym sumieniem będziemy gorąco polecać każdemu!",
    name: "Karol",
  },
];

const Stars = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-0.5 ${className}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16} className="fill-accent text-accent" />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section id="opinie" className="py-24 md:py-32 bg-charcoal">
    <div className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3">Opinie</p>
        <h2 className="heading-display text-primary-foreground text-3xl md:text-5xl">
          Co mówią o nas klienci
        </h2>
      </motion.div>

      {/* Pasek zaufania: ocena + wyróżnienie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-16"
      >
        <div className="flex items-center gap-3">
          <Stars />
          <span className="text-primary-foreground font-display font-700 text-lg">{RATING}</span>
          <span className="text-concrete text-sm">na podstawie {REVIEW_COUNT} opinii</span>
        </div>
        <span className="hidden sm:block w-px h-8 bg-concrete/20" />
        <div className="flex items-center gap-2.5 text-primary-foreground">
          <Award size={22} className="text-accent" strokeWidth={1.5} />
          <span className="font-display font-600 text-sm md:text-base">
            Laureat „Orły Architektury” 2026
          </span>
        </div>
      </motion.div>

      {/* Karty opinii */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative bg-graphite/40 border border-concrete/15 p-8 flex flex-col"
          >
            <Quote size={32} className="text-accent/40 mb-4" />
            <blockquote className="text-primary-foreground/85 text-sm leading-relaxed flex-1">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 pt-6 border-t border-concrete/15">
              <Stars className="mb-2" />
              <p className="font-display font-700 text-primary-foreground text-sm">{t.name}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
