import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import teamGroupPhoto from "@/assets/team-group.webp";
import lukaszPhoto from "@/assets/team/lukasz-thumb.webp";
import annaPhoto from "@/assets/team/anna-thumb.webp";
import paulinaPhoto from "@/assets/team/paulina-thumb.webp";
import katarzynaObierzynskaPhoto from "@/assets/team/katarzyna-obierzynska-thumb.webp";

// Strona główna pokazuje tylko pierwsze 4 osoby — pełna lista jest na /o-nas (AboutPage).
const team = [
  { name: "Łukasz Matlęga", role: "Właściciel", photo: lukaszPhoto },
  { name: "Anna Odroniec", role: "Kierownik Biura", photo: annaPhoto },
  { name: "Katarzyna Obierzyńska", role: "Główny Architekt", photo: katarzynaObierzynskaPhoto },
  { name: "Paulina Matlęga", role: "Młodszy Architekt", photo: paulinaPhoto },
];

const TeamSection = () => (
  <section id="zespol" className="py-24 md:py-32 bg-charcoal">
    <div className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3">Zespół</p>
        <h2 className="heading-display text-primary-foreground text-3xl md:text-5xl lg:text-6xl">
          #TEAMArKon
        </h2>
      </motion.div>

      {/* Group Photo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 overflow-hidden"
      >
        <img
          src={teamGroupPhoto}
          alt="Zespół ArKon - zdjęcie grupowe"
          className="w-full h-[300px] md:h-[450px] lg:h-[520px] object-cover object-top"
        />
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {team.slice(0, 4).map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group text-center"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-full lg:h-auto lg:aspect-square mx-auto mb-4 overflow-hidden border border-concrete/20 group-hover:border-accent/50 transition-all duration-500">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <h4 className="font-display font-600 text-primary-foreground text-sm md:text-base lg:text-lg">
              {member.name}
            </h4>
            <p className="text-concrete text-xs md:text-sm lg:text-base mt-1">{member.role}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mt-12 md:mt-14"
      >
        <Link
          to="/o-nas"
          className="inline-flex items-center gap-3 border border-concrete/30 text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
        >
          Poznaj cały zespół
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default TeamSection;
