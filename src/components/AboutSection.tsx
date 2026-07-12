import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Heart, Handshake, Clock } from "lucide-react";
import { useRef } from "react";
import aboutImg from "@/assets/about-terrace-thumb.webp";

const values = [
  { icon: Award, title: "Kompleksowo i solidnie", desc: "Zapewniamy kompleksowe podejście do każdego projektu od A do Z." },
  { icon: Heart, title: "Dobra atmosfera to podstawa", desc: "Młody, zgrany zespół, który kocha to co robi." },
  { icon: Handshake, title: "Gotowość do współpracy", desc: "Nie boimy się trudnych projektów i nowych wyzwań." },
  { icon: Clock, title: "Terminowi i słowni", desc: "Cenimy sobie dotrzymywanie terminów i danego słowa." },
];

const AboutSection = () => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <section id="o-nas" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden h-[400px] md:h-[550px]"
          >
            <motion.img
              src={aboutImg}
              alt="Wizualizacja domu ArKon"
              className="w-full h-full object-cover"
              style={{ y: imgY, scale: imgScale }}
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="gold-line-wide" />
              <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">O nas</p>
            </div>
            <h2 className="heading-display text-foreground text-2xl md:text-4xl mb-8">
              Za kulisami Firmy
            </h2>
            <div className="gold-line-wide mb-8" />
            <blockquote className="heading-serif-italic text-foreground/80 text-2xl md:text-3xl leading-snug mb-6">
              "Wierzymy w rzetelność, precyzję i&nbsp;dbałość o&nbsp;każdy detal."
            </blockquote>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Zajmujemy się kompleksową obsługą budowy. Prowadzimy Cię przez cały proces inwestycji
              od wyboru idealnego projektu i uzyskania pozwolenia na budowę, poprzez właściwą realizację
              i nadzór budowy, aż do uzyskania pozwolenia na użytkowanie.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center relative"
            >
              <span className="section-number text-5xl absolute -top-2 right-2 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-accent/30 text-accent">
                <v.icon size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-display font-700 text-foreground mb-2 text-sm">{v.title}</h4>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
