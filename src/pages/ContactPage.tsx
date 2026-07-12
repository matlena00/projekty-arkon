import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, contactPageLd } from "@/lib/schema";

const contactInfo = [
  {
    icon: Phone,
    label: "Zadzwoń Do Nas",
    type: "tel",
    lines: ["+48 888 899 366", "+48 889 406 116"],
  },
  {
    icon: MapPin,
    label: "Gdzie Nas Spotkasz?",
    type: "text",
    lines: ["Żegocina 149", "32-731 Żegocina"],
  },
  {
    icon: Mail,
    label: "Napisz Do Nas Maila",
    type: "mail",
    lines: ["biuro.arkon.projekty@gmail.com"],
  },
  {
    icon: Clock,
    label: "Godziny otwarcia",
    type: "text",
    lines: ["Poniedziałek – Piątek: 8:00 – 16:00", "Sobota: 8:00 – 12:00"],
  },
];

const ContactPage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="Kontakt | Biuro Projektowe ArKon — Żegocina"
      description="Skontaktuj się z biurem ArKon: Żegocina 149, tel. +48 888 899 366, biuro@projekty-arkon.pl. Zapraszamy na bezpłatną konsultację."
      path="/kontakt"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ]),
        contactPageLd({ name: "Kontakt — Biuro Projektowe ArKon", path: "/kontakt" }),
      ]}
    />
    <Navbar />

    <PageHeader
      label="Kontakt"
      title="Skontaktuj się z nami"
      subtitle="Chętnie Ci pomożemy. Zapraszamy do naszego biura."
      dark
      accentWord="kontakt"
      sectionNumber="05"
    />

    {/* Meeting CTA */}
    <section className="py-20 bg-background">
      <div className="section-padding max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="heading-serif-italic text-accent text-xl md:text-2xl mb-3">Zapraszamy serdecznie</p>
          <h2 className="heading-display text-foreground text-2xl md:text-4xl mb-4">
            Będziemy szczęśliwi gdy się spotkamy
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Zapraszamy do naszego biura zlokalizowanego w Żegocinie. Zachęcamy do kontaktu telefonicznego, mailowego lub osobistego.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Contact Cards */}
    <section className="pb-24 bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-warm-white p-8 border border-border/50 text-center card-hover group relative overflow-hidden"
            >
              <span className="section-number text-5xl absolute top-2 right-3 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-charcoal text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-display font-700 text-foreground text-sm mb-3">{item.label}</h4>
              {item.lines.map((line, j) => {
                const href =
                  item.type === "tel" ? `tel:${line.replace(/\s+/g, "")}` : item.type === "mail" ? `mailto:${line}` : null;
                return href ? (
                  <a key={j} href={href} className="block text-muted-foreground text-sm hover:text-accent transition-colors break-words">
                    {line}
                  </a>
                ) : (
                  <p key={j} className="text-muted-foreground text-sm">{line}</p>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact Form + Map */}
    <section className="py-24 bg-warm-white">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="heading-serif-italic text-accent text-lg mb-2">Formularz</p>
            <h3 className="heading-display text-foreground text-xl md:text-2xl mb-8">Napisz do nas</h3>
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[400px] lg:h-full min-h-[400px] bg-secondary overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41200.127599912375!2d20.369511349439755!3d49.80472173912221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47161997e9316779%3A0xe7b68f881555de85!2sBiuro%20projektowe%20ArKon!5e0!3m2!1spl!2spl!4v1773442981894!5m2!1spl!2spl"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokalizacja biura ArKon"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="py-16 bg-accent">
      <div className="section-padding max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-serif-italic text-accent-foreground/80 text-lg mb-2"
        >
          Sprawdź naszą ofertę
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="heading-display text-accent-foreground text-xl md:text-3xl mb-6"
        >
          Chcesz dowiedzieć się więcej o naszych usługach?
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Link to="/uslugi" className="inline-flex items-center gap-3 bg-charcoal text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-graphite transition-colors duration-300">
            Nasze usługi
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </main>
);

export default ContactPage;
