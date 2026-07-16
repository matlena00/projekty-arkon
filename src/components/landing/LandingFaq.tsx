import { motion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import { faqLd } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LandingFaqProps {
  title: string;
  faqs: { q: string; a: string }[];
}

/** FAQ podstron usługowych/lokalnych — akordeon (pierwsze pytanie otwarte) + schema FAQPage. */
const LandingFaq = ({ title, faqs }: LandingFaqProps) => (
  <section className="py-20 md:py-28 bg-warm-white">
    <JsonLd data={faqLd(faqs)} />
    <div className="section-padding max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3">FAQ</p>
        <h2 className="heading-display text-foreground text-2xl md:text-4xl">{title}</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
          {faqs.map((faq, i) => (
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
    </div>
  </section>
);

export default LandingFaq;
