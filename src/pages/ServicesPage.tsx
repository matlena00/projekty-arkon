import { motion } from "framer-motion";
import { Compass, FileCheck, Route, MapPin, HardHat, Building2, Sofa, FileSearch, LandPlot, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FaqSection from "@/components/FaqSection";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, webPageLd } from "@/lib/schema";
import heroImg from "@/assets/hero-night.webp";

const services = [
  {
    icon: Compass,
    title: "Projekty indywidualne",
    href: "/uslugi/projekty-indywidualne",
    short: "Tworzymy unikalne projekty od podstaw, dopasowane do Twoich potrzeb, charakteru działki i otoczenia. Od pierwszej koncepcji po fotorealistyczną wizualizację - każdy detal jest przemyślany.",
    details: [
      { name: "Koncepcja", desc: "Opracowujemy wstępną koncepcję projektu, uwzględniając Twoje potrzeby, budżet i możliwości działki. Analizujemy warunki zabudowy i plan miejscowy, aby zaproponować optymalne rozwiązanie." },
      { name: "Projekt zagospodarowania działki", desc: "Dostosowujemy budynek do działki Inwestorów - ustalamy lokalizację, poziom posadowienia, dojazd i dojście, zgodnie z MPZP lub Warunkami Zabudowy. Projektujemy przyłącza mediów oraz teren wokół budynku." },
      { name: "Projekty architektoniczne", desc: "Pełna dokumentacja architektoniczna budynku wraz z detalami wykończeniowymi, rzutami kondygnacji, przekrojami i elewacjami." },
      { name: "Projekty techniczne", desc: "Kompletna dokumentacja techniczna obejmująca kilka branż. Obliczamy konstrukcję budynku zgodnie z Europejskimi Normami. Projektujemy wewnętrzne instalacje sanitarne i elektryczne w konsultacji z Inwestorem, dzięki czemu dom jest zaprojektowany pod Was." },
      { name: "Projekty wykonawcze", desc: "Przygotowujemy szczegółowe projekty wykonawcze dla każdej z branż - wszystko, czego potrzebuje wykonawca na budowie. Projekty wykonawcze zawierają zestawienia materiałów i szczegółowe rozwiązania techniczne." },
      { name: "Wizualizacja", desc: "Fotorealistyczne wizualizacje 3D, które pozwolą Ci zobaczyć przyszły dom jeszcze przed wbiciem pierwszej łopaty. Pomagamy w podejmowaniu decyzji materiałowych i kolorystycznych." },
    ],
  },
  {
    icon: FileCheck,
    title: "Adaptacje projektów",
    href: "/uslugi/adaptacja-projektu",
    short: "Posiadasz już projekt gotowy? Dostosujemy go do Twojej działki, przepisów lokalnych i indywidualnych preferencji. Oferujemy również sprzedaż sprawdzonych projektów katalogowych.",
    details: [
      { name: "Adaptacja projektów gotowych", desc: "Dostosowujemy projekty typowe do warunków lokalnych, stref śniegowych i wiatrowych, warunków gruntowo-wodnych i przepisów planu miejscowego. Dbamy o zgodność z obowiązującymi normami." },
      { name: "Zmiany w projektach typowych", desc: "Wprowadzamy modyfikacje do gotowych projektów - zmiana układu pomieszczeń, materiałów wykończeniowych, kąta nachylenia dachu czy rodzaju ogrzewania." },
      { name: "Sprzedaż projektów gotowych", desc: "Oferujemy szeroki wybór sprawdzonych projektów gotowych od wiodących pracowni - od domów jednorodzinnych po obiekty usługowe." },
      { name: "Projekt zagospodarowania działki", desc: "Dostosowujemy budynek do działki Inwestorów - ustalamy lokalizację, poziom posadowienia, dojazd i dojście, zgodnie z MPZP lub Warunkami Zabudowy. Projektujemy przyłącza mediów oraz teren wokół budynku." },
    ],
  },
  {
    icon: Route,
    title: "Projekty branżowe",
    short: "Kompleksowa dokumentacja branżowa: drogi i zjazdy, przyłącza mediów, rozbudowy i przebudowy sieci, przydomowe oczyszczalnie. Załatwiamy wszystkie formalności z zarządcami dróg i gestorami sieci.",
    details: [
      { name: "Projekty drogowe", desc: "Projekty dróg i zjazdów z każdej klasy drogi - gminnych, powiatowych, wojewódzkich i krajowych. Projekty organizacji ruchu, zabezpieczamy formalności z zarządcami dróg." },
      { name: "Projekty przyłączy wod-kan", desc: "Kompletna dokumentacja projektowa przyłączy wodociągowych i kanalizacyjnych wraz z uzgodnieniami z gestorami sieci. Projekty są wykonywane w różnych zakresach w zależności od gminy - dzięki naszemu doświadczeniu masz pewność, że będą wykonane prawidłowo." },
      { name: "Projekty rozbudowy sieci", desc: "Przygotowujemy projekty rozbudowy sieci wodociągowych i kanalizacyjnych. Kompletujemy dokumentację, uzgadniamy projekty z zarządcami sieci, zapewniamy pełną obsługę w starostwie włącznie z Zespołem Uzgadniania Dokumentacji Projektowej." },
      { name: "Projekty przebudowy kolizji sieci", desc: "Przez Twoją działkę przechodzi sieć, która koliduje z planowaną budową? Nic nie szkodzi - przygotujemy dokumentację projektową przebudowy każdej sieci: wodociągowej, kanalizacyjnej, gazowej, energii elektrycznej oraz teletechnicznej." },
      { name: "Projekty przyłączy gazowych", desc: "Zaprojektujemy dla Ciebie wewnętrzną instalację gazową i uzyskamy pozwolenie na budowę. Projektujemy również zewnętrzne odcinki przyłączy na działce, a także przebudowy przyłączy." },
      { name: "Projekty przydomowej oczyszczalni", desc: "Przygotowujemy kompletną dokumentację potrzebną do zgłoszenia przydomowych oczyszczalni ścieków. Uzgadniamy inwestycję z Wodami Polskimi oraz obsługujemy wniosek w starostwie." },
    ],
  },
  {
    icon: LandPlot,
    title: "Analizy działek",
    short: "Weryfikujemy potencjał działek przed ich zakupem. Dokładnie sprawdzamy lokalne przepisy i analizujemy możliwości zabudowy, pomagając Ci podjąć w pełni świadomą i bezpieczną decyzję.",
    details: [
      { name: "Badanie chłonności działki", desc: "Sprawdzamy, jaka zabudowa zmieści się na działce - powierzchnia, liczba budynków i układ zagospodarowania terenu." },
      { name: "Przedzakupowa analiza terenu", desc: "Analizujemy działkę przed zakupem - dostęp do drogi, media, ukształtowanie terenu i potencjalne ograniczenia." },
      { name: "Ocena możliwości zabudowy", desc: "Oceniamy, co i w jakich parametrach można wybudować - wysokość, geometria dachu, linie zabudowy, wskaźniki intensywności." },
      { name: "Weryfikacja przepisów lokalnych", desc: "Sprawdzamy zapisy Miejscowego Planu Zagospodarowania Przestrzennego lub warunki zabudowy oraz inne ograniczenia formalno-prawne." },
    ],
  },
  {
    icon: Sofa,
    title: "Projekty wnętrz",
    short: "Projektujemy wnętrza, które łączą funkcjonalność z estetyką - od układu pomieszczeń, przez dobór materiałów i kolorystyki, po pełną wizualizację 3D. Tworzymy przestrzenie dopasowane do Twojego stylu życia.",
    details: [
      { name: "Projekt funkcjonalny", desc: "Optymalny układ pomieszczeń i stref - projektujemy przestrzeń pod Twoje codzienne potrzeby i przyzwyczajenia." },
      { name: "Dobór materiałów i kolorystyki", desc: "Pomagamy dobrać materiały wykończeniowe, kolory i faktury tak, aby tworzyły spójną i ponadczasową całość." },
      { name: "Wizualizacja 3D wnętrz", desc: "Fotorealistyczne wizualizacje pozwalają zobaczyć efekt końcowy jeszcze przed rozpoczęciem prac wykończeniowych." },
      { name: "Meble na wymiar", desc: "Projektujemy zabudowy i meble na wymiar, idealnie dopasowane do bryły wnętrza i Twoich potrzeb." },
    ],
  },
  {
    icon: MapPin,
    title: "Geodezja",
    short: "Profesjonalne usługi geodezyjne - od map do celów projektowych przez podziały nieruchomości po wytyczenia i inwentaryzacje powykonawcze.",
    details: [
      { name: "Mapy do celów projektowych", desc: "Mapa do celów projektowych stanowi podstawowe opracowanie geodezyjne na potrzeby projektu budowlanego. Wykonujemy je sprawnie, z zachowaniem najwyższej dokładności." },
      { name: "Podziały działek", desc: "Geodezyjne podziały nieruchomości gruntowych - przygotowujemy dokumentację i prowadzimy przez cały proces administracyjny." },
      { name: "Ustalenie granic", desc: "Precyzyjne ustalenie granic działki w oparciu o dane geodezyjne i dokumenty archiwalne." },
      { name: "Wytyczenie budynków", desc: "Geodezyjne wytyczenie budynku na działce zgodnie z projektem zagospodarowania terenu." },
      { name: "Inwentaryzacja", desc: "Inwentaryzacja geodezyjna powykonawcza - niezbędna do uzyskania pozwolenia na użytkowanie budynku." },
    ],
  },
  {
    icon: HardHat,
    title: "Nadzór budowy",
    href: "/uslugi/kierownik-budowy",
    short: "Wieloletnie doświadczenie na placach budowy pozwala nam skutecznie nadzorować realizację inwestycji. Zapewniamy kierownika budowy, inspektora nadzoru oraz profesjonalne doradztwo.",
    details: [
      { name: "Kierownik budowy", desc: "Dzięki wieloletniemu doświadczeniu potrafimy zaplanować prawidłową realizację inwestycji i pilnować harmonogramu. Sprawdzamy jakość robót i zgodność z projektem." },
      { name: "Kontrola i dobór firm budowlanych", desc: "Weryfikujemy jakość wykonywanych prac budowlanych, kontrolujemy zgodność z projektem i obowiązującymi normami. Pomagamy też w wyborze ekip na poszczególne etapy." },
      { name: "Doradztwo techniczne i materiałowe", desc: "Profesjonalne doradztwo w doborze materiałów budowlanych i rozwiązań technicznych - pomagamy wybrać optymalne rozwiązania cenowo i jakościowo." },
      { name: "Inspektor nadzoru inwestorskiego", desc: "Reprezentujemy interesy inwestora na placu budowy - kontrolujemy jakość, terminy i koszty realizacji." },
      { name: "Odbiory budynków", desc: "Przeprowadzamy odbiory budynków z należytą starannością, sporządzamy protokoły i wskazujemy ewentualne usterki." },
    ],
  },
  {
    icon: Building2,
    title: "Obsługa inwestycji",
    short: "Usługa, która wymaga od nas największego zaangażowania, ale przynosi największą satysfakcję. Zajmujemy się kompleksowym prowadzeniem inwestycji - od organizacji po oddanie do użytkowania.",
    details: [
      { name: "Prowadzenie budowy", desc: "Kompleksowe prowadzenie inwestycji na wszystkich etapach realizacji. Idealne rozwiązanie gdy nie masz czasu lub nie chcesz osobiście uczestniczyć w procesie budowy." },
      { name: "Organizacja budowy", desc: "Planowanie i organizacja wszystkich etapów realizacji - harmonogram, logistyka, zamówienia materiałów." },
      { name: "Koordynacja ekip budowlanych", desc: "Koordynacja wszystkich ekip i podwykonawców pracujących na budowie, aby prace przebiegały sprawnie i terminowo." },
      { name: "Kontrola rzeczowo-finansowa", desc: "Bieżąca kontrola kosztów i postępu prac - raportowanie, rozliczenia z wykonawcami, optymalizacja budżetu." },
      { name: "Oddanie do użytkowania", desc: "Kompleksowe załatwienie formalności związanych z oddaniem budynku do użytkowania - od kompletacji dokumentów po uzyskanie decyzji." },
    ],
  },
  {
    icon: FileSearch,
    title: "Inne usługi",
    short: "Wszystko, co nie mieści się w standardowej ścieżce projektowej: inwentaryzacje, świadectwa energetyczne, opinie i ekspertyzy, zmiany sposobu użytkowania, rozbiórki oraz legalizacje samowoli.",
    details: [
      { name: "Inwentaryzacja budowlana", desc: "Wykonujemy inwentaryzacje istniejących obiektów - podstawa do projektów przebudowy i adaptacji czy zmian sposobów użytkowania. Tworzymy rysunki 2D lub 3D z wizualizacjami." },
      { name: "Świadectwa charakterystyki energetycznej", desc: "Dokumentacja wymagana przy odbiorze budynku, sprzedaży i wynajmie nieruchomości lub przy dofinansowaniach w programie „Moje Ciepło”." },
      { name: "Opinie techniczne", desc: "Sporządzamy opinie niezbędne w procesach administracyjnych, przy zgłoszeniach robót i w sytuacjach spornych. Oceniamy stan techniczny budynku lub jego elementów i wskazujemy zakres niezbędnych prac. Przeprowadzamy analizy możliwości działalności inwestycyjnych w istniejących obiektach." },
      { name: "Ekspertyzy konstruktorskie", desc: "Analizujemy konstrukcję obiektu - przydatne przy przebudowach, zmianach sposobu użytkowania i zakupie nieruchomości. Wykonujemy pełną dokumentację potrzebną w procesach administracyjnych." },
      { name: "Zmiany sposobu użytkowania", desc: "Dokumentacja niezbędna do zmiany sposobu użytkowania obiektu budowlanego - od analizy przepisów po uzyskanie stosownych pozwoleń." },
      { name: "Projekty rozbiórki", desc: "Dokumentacja projektowa dla prac rozbiórkowych - od inwentaryzacji obiektu poprzez plan organizacji rozbiórki i zgłoszenie w starostwie. Ponadto oferujemy usługę usunięcia budynków z rejestrów." },
      { name: "Legalizacja samowoli budowlanych", desc: "Pomagamy w procesie legalizacji samowoli budowlanych - przygotowujemy wymaganą dokumentację i prowadzimy przez procedurę administracyjną w Nadzorze Budowlanym." },
    ],
  },
];

const ServiceCard = ({ service, index }: { service: (typeof services)[number]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="bg-background border border-border/50 overflow-hidden"
    >
      <div
        className="p-8 md:p-10 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-5">
            <div className="flex flex-col items-center gap-2">
              <span className="section-number text-3xl">{num}</span>
              <div className="w-12 h-12 shrink-0 flex items-center justify-center border border-accent/30 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                <service.icon size={20} strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h3 className="font-display font-700 text-lg md:text-xl text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.short}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 mt-1 text-accent"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-0 border-t border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            {service.details.map((d) => (
              <div key={d.name} className="p-4 bg-warm-white">
                <h4 className="font-display font-600 text-foreground text-sm mb-1">{d.name}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesPage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="Usługi - projekty, nadzór, obsługa inwestycji | ArKon"
      description="Projekty indywidualne, adaptacje, projekty branżowe, analizy działek, projekty wnętrz, geodezja oraz nadzór i kompleksowa obsługa inwestycji. Poznaj ofertę ArKon."
      path="/uslugi"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Usługi", path: "/uslugi" },
        ]),
        webPageLd({
          type: "CollectionPage",
          name: "Usługi - Biuro Projektowe ArKon",
          path: "/uslugi",
          description: "Pełna oferta biura projektowego ArKon: projekty, adaptacje, projekty branżowe, analizy działek, wnętrza, geodezja, nadzór i obsługa inwestycji.",
        }),
      ]}
    />
    <Navbar />

    <PageHeader
      label="Usługi"
      title="Co możemy Wam zaoferować?"
      subtitle="Powiedz nam czego potrzebujesz, a my zrobimy całą resztę za Ciebie. Oferujemy kompleksową obsługę - od projektu, przez nadzór, aż po oddanie budynku."
      bgImage={heroImg}
      accentWord="usługi"
      sectionNumber="06"
    />

    {/* Intro */}
    <section className="py-16 bg-background">
      <div className="section-padding max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-serif-italic text-accent text-2xl md:text-3xl mb-4"
        >
          Od koncepcji po klucze
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground leading-relaxed space-y-4"
        >
          <p>
            Biuro projektowe ArKon zajmuje się przygotowaniem dokumentacji projektowej dla każdego
            rodzaju budynku. Pomagamy zaprojektować inwestycję w każdym detalu w zależności od potrzeb.
            Wszystko zaczyna się od koncepcji, przez kompletny projekt i obsługę w urzędzie aż po
            uzyskanie pozwolenia na budowę. Oferujemy również nadzór inwestycyjny aż po oddanie obiektu.
          </p>
          <p>
            Współpracujemy z wieloma podmiotami branżowymi i biurami projektowymi, a w szczególności
            urzędami - dzięki czemu zapewniamy kompleksową i sprawną obsługę każdej inwestycji.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Services List */}
    <section className="py-16 md:py-24 bg-warm-white">
      <div className="section-padding max-w-5xl mx-auto space-y-6">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>

    <FaqSection />

    {/* CTA */}
    <section className="py-20 bg-charcoal">
      <div className="section-padding max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-serif-italic text-accent text-xl md:text-2xl mb-3"
        >
          Staramy się, aby nasi klienci byli zadowoleni
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="heading-display text-primary-foreground text-2xl md:text-4xl mb-8"
        >
          Więc bądźmy szczęśliwi razem
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            Skontaktuj się z nami
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </main>
);

export default ServicesPage;
