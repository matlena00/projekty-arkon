import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => (
  <section id="kontakt" className="py-24 md:py-32 bg-background">
    <div className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3">Kontakt</p>
        <h2 className="heading-display text-foreground text-3xl md:text-5xl lg:text-6xl mb-4">
          Skontaktuj się z nami
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Będziemy szczęśliwi gdy się spotkamy. Zapraszamy do naszego biura.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          {
            icon: Phone,
            label: "Zadzwoń",
            type: "tel",
            lines: ["+48 888 899 366", "+48 889 406 116"],
          },
          {
            icon: Mail,
            label: "Napisz do nas",
            type: "mail",
            lines: ["biuro@projekty-arkon.pl"],
          },
          {
            icon: MapPin,
            label: "Gdzie nas spotkasz",
            type: "text",
            lines: ["Żegocina 149", "32-731 Żegocina"],
          },
          {
            icon: Clock,
            label: "Godziny otwarcia",
            type: "text",
            lines: ["Pon - Pt: 8:00 - 16:00", "Sb: 8:00 - 12:00"],
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-warm-white p-8 border border-border/50 text-center card-hover"
          >
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-accent/30 text-accent">
              <item.icon size={20} strokeWidth={1.5} />
            </div>
            <h4 className="font-display font-700 text-foreground mb-2">{item.label}</h4>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full h-80 md:h-[400px] bg-secondary overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41200.127599912375!2d20.369511349439755!3d49.80472173912221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47161997e9316779%3A0xe7b68f881555de85!2sBiuro%20projektowe%20ArKon!5e0!3m2!1spl!2spl!4v1773442981894!5m2!1spl!2spl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokalizacja biura ArKon"
        />
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
