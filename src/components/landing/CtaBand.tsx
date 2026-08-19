import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

interface CtaBandProps {
  title: string;
  text?: string;
  /** Drobna linia pod przyciskami, np. godziny otwarcia / odległość od miasta */
  note?: string;
  phoneLabel?: string;
  id?: string;
}

/** Ciemny pas CTA kończący podstronę — telefon (gold) + e-mail (outline). */
const CtaBand = ({ title, text, note, phoneLabel = "888 899 366", id }: CtaBandProps) => (
  <section id={id} className="py-20 md:py-28 bg-charcoal">
    <div className="section-padding max-w-3xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="heading-display text-primary-foreground text-2xl md:text-4xl mb-5"
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-primary-foreground/60 leading-relaxed mb-10"
        >
          {text}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4"
      >
        <a
          href="tel:+48888899366"
          className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
        >
          <Phone size={16} />
          {phoneLabel}
        </a>
        <a
          href="mailto:biuro@projekty-arkon.pl"
          className="inline-flex items-center gap-3 border border-primary-foreground/25 text-primary-foreground/85 px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:border-accent hover:text-accent transition-all duration-300"
        >
          <Mail size={16} />
          biuro@projekty-arkon.pl
        </a>
      </motion.div>
      {note && <p className="mt-8 text-sm text-primary-foreground/40">{note}</p>}
    </div>
  </section>
);

export default CtaBand;
