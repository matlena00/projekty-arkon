import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { faqLd } from "@/lib/schema";
import { homeFaqItems } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Sekcja FAQ na stronie głównej i /uslugi — pierwsze 7 pytań z src/data/faq.ts.
 * Pełna lista pytań jest na podstronie /faq. Schema FAQPage tylko z widocznych pytań.
 */
const FaqSection = () => (
  <section id="faq" className="py-24 md:py-32 bg-warm-white">
    <JsonLd data={faqLd(homeFaqItems)} />
    <div className="section-padding max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3">FAQ</p>
        <h2 className="heading-display text-foreground text-3xl md:text-5xl">Najczęstsze pytania</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {homeFaqItems.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-background border border-border/50 px-6 data-[state=open]:shadow-lg data-[state=open]:shadow-accent/5 transition-shadow duration-300"
            >
              <AccordionTrigger className="font-display font-600 text-left text-foreground hover:text-accent transition-colors py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mt-10"
      >
        <Link
          to="/faq"
          className="inline-flex items-center gap-3 border border-accent text-accent px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:bg-accent hover:text-accent-foreground transition-all duration-300"
        >
          Zobacz wszystkie pytania
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
