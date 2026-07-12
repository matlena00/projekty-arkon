import { motion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import { faqLd } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Ile trwa proces uzyskania pozwolenia na budowę?",
    a: "Proces uzyskania pozwolenia na budowę trwa zazwyczaj od 2 do 4 miesięcy, w zależności od skomplikowania projektu oraz wymagań urzędu. Pomagamy na każdym etapie, aby przyspieszyć cały proces.",
  },
  {
    q: "Pozwolenie na budowę czy zgłoszenie?",
    a: "Wybór zależy od rodzaju inwestycji. Domy do 70 m² mogą być realizowane na zgłoszenie, natomiast większe obiekty wymagają pełnego pozwolenia na budowę. Doradzimy najlepsze rozwiązanie.",
  },
  {
    q: "Projekt indywidualny czy adaptacja gotowego?",
    a: "Projekt indywidualny pozwala na pełną personalizację, ale wymaga więcej czasu i budżetu. Adaptacja gotowego projektu jest szybsza i tańsza, a jednocześnie pozwala na wprowadzenie zmian.",
  },
  {
    q: "Dom do 70 m² – co warto wiedzieć?",
    a: "Dom do 70 m² to popularne rozwiązanie, które można realizować na podstawie zgłoszenia. Oferujemy zarówno gotowe projekty, jak i indywidualne podejście do tego typu inwestycji.",
  },
  {
    q: "Dlaczego potrzebny jest kierownik budowy?",
    a: "Kierownik budowy jest wymagany prawnie i odpowiada za prawidłowy przebieg prac, bezpieczeństwo na placu budowy oraz zgodność realizacji z projektem.",
  },
  {
    q: "Jakie mamy doświadczenie?",
    a: "Działamy na rynku od 2019 roku. Nasz zespół tworzą wykwalifikowani architekci, inżynierowie i geodeci. Przez ten czas zrealizowaliśmy liczne projekty domów jednorodzinnych, adaptacji budynków oraz inwestycji komercyjnych w naszym regionie.",
  },
];

const FaqSection = () => (
  <section id="faq" className="py-24 md:py-32 bg-warm-white">
    <JsonLd data={faqLd(faqs)} />
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

export default FaqSection;
