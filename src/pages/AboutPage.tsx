import { motion } from "framer-motion";
import { Award, Heart, Handshake, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, webPageLd } from "@/lib/schema";
import PartnersSection from "@/components/PartnersSection";
import officeReal1 from "@/assets/office-real-1-thumb.webp";
import officeReal2 from "@/assets/office-real-2.webp";
import officeReal2Thumb from "@/assets/office-real-2-thumb.webp";
import officeLobby from "@/assets/office-lobby-thumb.webp";
import officeReception from "@/assets/office-reception-thumb.webp";
import officeDesk from "@/assets/office-desk-thumb.webp";
import teamGroup from "@/assets/team-group.webp";
import lukaszPhoto from "@/assets/team/lukasz-thumb.webp";
import annaPhoto from "@/assets/team/anna-thumb.webp";
import justynaPhoto from "@/assets/team/justyna-thumb.webp";
import katarzynaObierzynskaPhoto from "@/assets/team/katarzyna-obierzynska-thumb.webp";
import klaudiaPhoto from "@/assets/team/klaudia-thumb.webp";
import katarzynaJaniczekPhoto from "@/assets/team/katarzyna-janiczek-thumb.webp";
import krzysztofPhoto from "@/assets/team/krzysztof-thumb.webp";

const values = [
  { icon: Award, title: "Kompleksowo i solidnie", desc: "Zapewniamy kompleksowe podejście do każdego projektu. Projektowanie to dla nas oznacza bycie częścią projektu od A do Z. Nasze projekty są starannie opracowane i oferowane z najwyższą dbałością o każdy detal." },
  { icon: Heart, title: "Dobra atmosfera to podstawa", desc: "Praca nad wieloma projektami jednocześnie wymaga dobrego i zgranego zespołu. Nasza ekipa to młody zespół specjalistów, którzy podchodzą do każdego projektu z pasją i zaangażowaniem." },
  { icon: Handshake, title: "Gotowość do współpracy", desc: "Nie boimy się trudnych projektów. Jesteśmy w ciągłym kontakcie z naszymi partnerami, dzięki czemu możemy zaoferować kompleksowe rozwiązania dla każdej inwestycji." },
  { icon: Clock, title: "Terminowi i słowni", desc: "To cecha, która nas wyróżnia. Cenimy sobie dotrzymywanie terminów i danego słowa. Dostarczamy usługi na czas, a nasze zobowiązania traktujemy priorytetowo." },
];

const timeline = [
  { year: "Marzec 2019", text: "Powstaje „Matlęga Budownictwo”. Od domowego biurka, przez małe biuro w centrum Żegociny, aż po zatrudnienie pierwszego pracownika." },
  { year: "Lipiec 2021", text: "Zmieniamy się dla Was. Przeprowadzamy rebranding, zmieniamy nazwę i tak oficjalnie powstaje marka ArKon." },
  { year: "Lipiec 2024", text: "Stare biuro staje się dla nas za ciasne. Zmieniamy siedzibę i przenosimy się do nowego, znacznie większego lokalu." },
  { year: "Dziś", text: "Jesteśmy zespołem 12 specjalistów, którzy w nowoczesnym biurze każdego dnia realizują Wasze inwestycje." },
];

const team = [
  { name: "Łukasz Matlęga", role: "Właściciel", photo: lukaszPhoto },
  { name: "Anna Odroniec", role: "Kierownik Biura", photo: annaPhoto },
  { name: "Katarzyna Obierzyńska", role: "Główny Architekt", photo: katarzynaObierzynskaPhoto },
  { name: "Justyna Nieć", role: "Obsługa Projektowa", photo: justynaPhoto },
  { name: "Klaudia Ziaja", role: "Architekt", photo: klaudiaPhoto },
  { name: "Katarzyna Janiczek", role: "Specjalista ds. PZT", photo: katarzynaJaniczekPhoto },
  { name: "Krzysztof Grabias", role: "Geodeta", photo: krzysztofPhoto },
];

const officeGallery = [
  { src: officeReal1, alt: "Recepcja biura ArKon", span: "md:col-span-2 md:row-span-2" },
  { src: officeReal2Thumb, alt: "Przestrzeń spotkań w biurze ArKon", span: "" },
  { src: officeLobby, alt: "Strefa wejściowa biura", span: "" },
  { src: officeReception, alt: "Recepcja i punkt obsługi klienta", span: "" },
  { src: officeDesk, alt: "Stanowiska pracy zespołu projektowego", span: "" },
];

const AboutPage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="O nas — zespół #TEAMArKon | Biuro Projektowe ArKon"
      description="Poznaj zespół Biura Projektowego ArKon z Żegociny — architekci, projektanci i geodeci. Kompleksowa obsługa inwestycji budowlanych od A do Z."
      path="/o-nas"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "O nas", path: "/o-nas" },
        ]),
        webPageLd({
          type: "AboutPage",
          name: "O nas — Biuro Projektowe ArKon",
          path: "/o-nas",
          description: "Poznaj zespół i biuro ArKon z Żegociny — kompleksowa obsługa inwestycji od A do Z.",
        }),
      ]}
    />
    <Navbar />

    <PageHeader
      label="O nas"
      title="Za kulisami Firmy"
      bgImage={officeReception}
      accentWord="zespół"
      sectionNumber="01"
    />

    {/* Story + Quote */}
    <section className="py-24 md:py-32 bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <img src={teamGroup} alt="Zespół ArKon" className="w-full h-[500px] object-cover" loading="lazy" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent/30 hidden lg:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="heading-serif-italic text-accent text-xl md:text-2xl mb-2">Jak pracujemy na co dzień</p>
            <h2 className="heading-display text-foreground text-2xl md:text-3xl mb-8">Biuro, które naprawdę znasz</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ta strona to nasze realne miejsce pracy i nasz realny zespół. Spotkania, konsultacje i przygotowanie projektów
              odbywają się u nas codziennie — dlatego chcemy pokazać ArKon takim, jakim jest naprawdę.
            </p>
            <div className="gold-line-wide mb-8" />
            <blockquote className="heading-serif-italic text-foreground/80 text-2xl md:text-3xl leading-snug">
              "Twoje Marzenia – Nasza Misja.<br />
              Od pierwszej rozmowy do gotowego projektu."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Real office gallery */}
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase mb-3">Nasze biuro</p>
          <h3 className="heading-display text-foreground text-2xl md:text-4xl mb-3">Realne miejsce, realni ludzie</h3>
          <p className="text-muted-foreground max-w-3xl">Zobacz przestrzeń, w której prowadzimy konsultacje, przygotowujemy dokumentację i rozwijamy projekty dla naszych klientów.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[210px] gap-4">
          {officeGallery.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`overflow-hidden ${img.span}`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 bg-warm-white">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="heading-serif-italic text-accent text-lg mb-2">Krok po kroku</p>
          <h3 className="heading-display text-foreground text-2xl md:text-3xl">Nasza droga</h3>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20 hidden md:block" />
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex flex-col md:flex-row items-center gap-6 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="md:w-1/2 text-right md:pr-12">
                {i % 2 === 0 && (
                  <div>
                    <span className="text-accent font-display font-800 text-lg">{item.year}</span>
                    <p className="text-muted-foreground mt-2 text-sm">{item.text}</p>
                  </div>
                )}
              </div>
              <div className="w-4 h-4 bg-accent rounded-full z-10 shrink-0 hidden md:block" />
              <div className="md:w-1/2 md:pl-12">
                {i % 2 !== 0 && (
                  <div>
                    <span className="text-accent font-display font-800 text-lg">{item.year}</span>
                    <p className="text-muted-foreground mt-2 text-sm">{item.text}</p>
                  </div>
                )}
                {i % 2 === 0 && <div className="hidden md:block" />}
              </div>
              <div className="md:hidden text-center">
                {i % 2 !== 0 && (
                  <>
                    <span className="text-accent font-display font-800 text-lg">{item.year}</span>
                    <p className="text-muted-foreground mt-2 text-sm">{item.text}</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 md:py-32 bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="gold-line-wide" />
            <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">Wartości</p>
            <div className="gold-line-wide scale-x-[-1]" />
          </div>
          <h2 className="heading-display text-foreground text-2xl md:text-4xl">Co nas wyróżnia</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex gap-6 p-8 bg-warm-white border border-border/50 card-hover relative overflow-hidden"
            >
              <span className="section-number text-6xl absolute -top-2 right-4 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-14 h-14 shrink-0 flex items-center justify-center border border-accent/30 text-accent">
                <v.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="relative">
                <h4 className="font-display font-700 text-foreground text-base mb-2">{v.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="heading-serif-italic text-accent text-lg mb-2">Poznaj nas</p>
          <h2 className="heading-display text-primary-foreground text-2xl md:text-4xl">#TEAMArKon</h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
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
              <h4 className="font-display font-600 text-primary-foreground text-sm md:text-base lg:text-lg">{member.name}</h4>
              <p className="text-concrete text-xs md:text-sm lg:text-base mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <PartnersSection />

    {/* CTA */}
    <section className="py-20 bg-accent">
      <div className="section-padding max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-serif-italic text-accent-foreground/80 text-xl mb-3"
        >
          Możemy zrobić to razem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="heading-display text-accent-foreground text-2xl md:text-4xl mb-8"
        >
          Szukasz biura od A do Z?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 bg-charcoal text-primary-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-graphite transition-colors duration-300"
          >
            Kontakt
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </main>
);

export default AboutPage;
