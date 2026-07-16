import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/landing/CtaBand";
import { breadcrumbLd, faqLd } from "@/lib/schema";
import { faqItems } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Pełna lista najczęściej zadawanych pytań (strona główna pokazuje tylko pierwsze 7). */
const FaqPage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="Najczęstsze pytania (FAQ) — Biuro Projektowe ArKon"
      description="Odpowiedzi na najczęstsze pytania: pozwolenie na budowę, MPZP i warunki zabudowy, badania gruntu, przyłącza, projekt koncepcyjny i budowlany. Biuro ArKon."
      path="/faq"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Najczęstsze pytania", path: "/faq" },
        ]),
        faqLd(faqItems),
      ]}
    />
    <Navbar />

    <PageHeader
      label="FAQ"
      title="Najczęstsze pytania"
      subtitle="Zebraliśmy pytania, które słyszymy od inwestorów najczęściej — o formalności, działki, grunt, przyłącza i sam proces projektowania. Nie znajdziecie odpowiedzi? Zadzwońcie."
      accentWord="pytania"
    />

    <section className="py-20 md:py-28 bg-warm-white">
      <div className="section-padding max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
            {faqItems.map((faq, i) => (
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

    <CtaBand
      title="Nie znaleźliście odpowiedzi na swoje pytanie?"
      text="Zadzwońcie lub napiszcie — doradzimy bezpłatnie i bez zobowiązań."
      note="Pn–Pt 8:00–16:00 · Żegocina 149"
    />

    <Footer />
  </main>
);

export default FaqPage;
