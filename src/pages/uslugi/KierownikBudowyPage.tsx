import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import AssetPhoto from "@/components/landing/AssetPhoto";
import RouteMap from "@/components/landing/RouteMap";
import CtaBand from "@/components/landing/CtaBand";
import LandingFaq from "@/components/landing/LandingFaq";
import { breadcrumbLd, webPageLd, serviceLd } from "@/lib/schema";
import teamImg from "@/assets/team-group.webp";

const duties = [
  "protokolarnie przejmujemy plac budowy i prowadzimy dziennik budowy,",
  "pilnujemy zgodności robót z projektem, pozwoleniem i sztuką budowlaną,",
  "odbieramy roboty zanikające (zbrojenie, izolacje, instalacje przed zakryciem) - to etapy, których po zalaniu betonem nikt już nie sprawdzi,",
  "koordynujemy ekipy i reagujemy, gdy wykonawca „idzie na skróty”,",
  "dbamy o BHP i zabezpieczenie terenu,",
  "kompletujemy dokumentację do zakończenia budowy i zawiadomienia PINB - aż do pozwolenia na użytkowanie.",
];

const steps = [
  { title: "Rozmowa i wycena", desc: "Opowiadacie o budowie, my przedstawiamy zakres i cenę. Bez zobowiązań." },
  { title: "Przejęcie obowiązków", desc: "Podpisujecie umowę i dokumenty, a my zgłaszamy rozpoczęcie robót w PINB." },
  { title: "Budowa pod kontrolą", desc: "Wizyty na każdym kluczowym etapie, wpisy w dzienniku, odbiory robót zanikających, kontakt telefoniczny na bieżąco." },
  { title: "Zakończenie budowy", desc: "Pomagamy w kompletowaniu dokumentów i zgłaszamy zawiadomienie o zakończeniu budowy w PINB." },
];

const areaCities = [
  { name: "Bochnię", rest: " i powiat bocheński,", to: "/biuro-projektowe-bochnia" },
  { name: "Limanową", rest: " i powiat limanowski,", to: "/biuro-projektowe-limanowa" },
  { name: "Wieliczkę", rest: " i powiat wielicki.", to: "/biuro-projektowe-wieliczka" },
];

const faqs = [
  {
    q: "Czy kierownik budowy jest obowiązkowy?",
    a: "Tak - przy każdej budowie na pozwolenie na budowę oraz przy większości budów na zgłoszenie z projektem (w tym domów do 70 m² kierownik nie jest formalnie wymagany, ale wtedy całą odpowiedzialność za budowę przejmuje inwestor - odradzamy). Bez ustanowionego kierownika nie można legalnie rozpocząć robót.",
  },
  {
    q: "Czym różni się kierownik budowy od inspektora nadzoru inwestorskiego?",
    a: "Kierownik budowy odpowiada za prowadzenie budowy i formalnie działa „przy wykonawcy”. Inspektor nadzoru reprezentuje wyłącznie interes inwestora i kontroluje jakość oraz rozliczenia. Przy domu jednorodzinnym zazwyczaj wystarczy kierownik budowy; inspektora warto rozważyć, gdy budujecie systemem zleconym z generalnym wykonawcą.",
  },
  {
    q: "Jak często kierownik pojawia się na budowie?",
    a: "Zawsze na etapach kluczowych: rozpoczęcie robót, odbiór zbrojenia fundamentów i stropów, ściany, więźba, instalacje przed zakryciem, odbiór końcowy. W praktyce to regularne wizyty w okresie intensywnych robót, a dodatkowo przyjeżdżamy na każde wezwanie, gdy dzieje się coś niepokojącego. Przy podpisywaniu umowy określamy szacunkową ilość wizyt.",
  },
  {
    q: "Czy mogę zmienić kierownika budowy w trakcie budowy?",
    a: "Tak. Sporządza się protokół przekazania obowiązków i odnotowuje zmianę w dokumentacji budowy. Zdarza się, że przejmujemy budowy „w trakcie” - również te z problemami.",
  },
  {
    q: "Co jeśli budowa jest już zaawansowana albo była prowadzona bez kierownika?",
    a: "Pomagamy również w legalizacji samowoli budowlanych i w formalnym uporządkowaniu budów prowadzonych z przerwami. To jedna z naszych usług - zadzwońcie, ocenimy sytuację.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const KierownikBudowyPage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="Kierownik budowy z uprawnieniami - Bochnia, Limanowa, Wieliczka"
      description="Kierownik budowy z uprawnieniami konstrukcyjno-budowlanymi. Dziennik budowy, odbiory, nadzór. Powiat bocheński, limanowski i wielicki. Tel. 888 899 366."
      path="/uslugi/kierownik-budowy"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Usługi", path: "/uslugi" },
          { name: "Kierownik budowy", path: "/uslugi/kierownik-budowy" },
        ]),
        webPageLd({
          name: "Kierownik budowy - Biuro Projektowe ArKon",
          path: "/uslugi/kierownik-budowy",
          description: "Kierownik budowy z uprawnieniami konstrukcyjno-budowlanymi - dziennik budowy, odbiory robót, nadzór aż do pozwolenia na użytkowanie.",
        }),
        serviceLd({
          name: "Kierownik budowy",
          description: "Prowadzenie budowy przez kierownika z uprawnieniami konstrukcyjno-budowlanymi: dziennik budowy, odbiory robót zanikających, zgodność z projektem, zawiadomienie PINB.",
          path: "/uslugi/kierownik-budowy",
        }),
      ]}
    />
    <Navbar />

    {/* Hero */}
    <section className="bg-charcoal pt-32 lg:pt-44 pb-16 md:pb-24">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Breadcrumbs
            items={[
              { name: "Strona główna", path: "/" },
              { name: "Usługi", path: "/uslugi" },
              { name: "Kierownik budowy" },
            ]}
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="heading-display text-primary-foreground text-3xl md:text-5xl lg:text-[3.4rem] mb-6"
            >
              Kierownik budowy - Bochnia, Limanowa, Wieliczka i&nbsp;okolice
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-10"
            >
              Przejmujemy odpowiedzialność za Waszą budowę: dziennik budowy, odbiory robót, zgodność z projektem
              i przepisami. Kierownik z uprawnieniami konstrukcyjno-budowlanymi, który dojedzie na budowę,
              zanim problem stanie się kosztowny.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-4"
            >
              <a
                href="tel:+48888899366"
                className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              >
                <Phone size={16} />
                Zadzwoń: 888 899 366
              </a>
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-3 border border-primary-foreground/25 text-primary-foreground/85 px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:border-accent hover:text-accent transition-all duration-300"
              >
                Wycena bez zobowiązań
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <AssetPhoto
              folder="uslugi"
              name="kierownik-budowy"
              alt="Kierownik budowy ArKon z dziennikiem budowy na tle domu jednorodzinnego w stanie surowym"
              caption="ZDJĘCIE: kierownik budowy w kasku z dziennikiem budowy na tle budowanego domu (autentyczne, nie stock)"
              className="aspect-[4/5] max-h-[520px] w-full"
              dark
              eager
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Pasek zaufania */}
    <section className="bg-background border-b border-border/50">
      <div className="section-padding max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
        {[
          { big: "100+", small: "prowadzonych budów" },
          { big: "Uprawnienia", small: "konstrukcyjno-budowlane bez ograniczeń, nr MAP/0453/WBKb/17" },
          { big: "Członek MOIIB", small: "numer członkowski MAP/BO/0087/18" },
          { big: "≤ 30 min", small: "dojazd na budowę w obszarze działania" },
        ].map((item, i) => (
          <motion.div
            key={item.big}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="py-10 px-6 text-center border-border/50 [&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l"
          >
            <p className="font-display font-700 text-xl md:text-2xl text-foreground mb-2">
              <span className="text-accent">{item.big}</span>
            </p>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.small}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Za co odpowiada kierownik */}
    <section className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div {...fadeUp}>
          <h2 className="heading-display text-foreground text-2xl md:text-4xl mb-6">
            Za co odpowiada kierownik budowy?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Kierownik budowy to funkcja wymagana przez prawo budowlane - bez niego nie rozpoczniecie legalnie
            żadnej budowy na pozwolenie. Ale dobry kierownik to nie podpis „na papierze”. W ramach usługi:
          </p>
          <ul className="space-y-4">
            {duties.map((duty) => (
              <li key={duty} className="flex gap-4 text-muted-foreground leading-relaxed">
                <span className="mt-[0.8em] h-px w-6 shrink-0 bg-accent" aria-hidden />
                <span>{duty}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
          <AssetPhoto
            folder="uslugi"
            name="nadzor"
            alt="Odbiór zbrojenia stropu przed betonowaniem - nadzór kierownika budowy ArKon"
            caption="ZDJĘCIE: odbiór zbrojenia / kontrola na budowie (detal, ręce + plan)"
            className="aspect-[4/3] w-full"
            thumb
          />
        </motion.div>
      </div>
    </section>

    {/* Kierownik z biura projektowego */}
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="section-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div {...fadeUp} className="order-2 lg:order-1">
          <img
            src={teamImg}
            alt="Zespół biura projektowego ArKon nad projektem"
            className="w-full object-cover aspect-[4/3]"
            loading="lazy"
          />
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }} className="order-1 lg:order-2">
          <h2 className="heading-display text-foreground text-2xl md:text-4xl mb-6">
            Kierownik z biura projektowego - to robi różnicę
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Jesteśmy biurem projektowym, więc kierownik budowy od ArKon czyta projekt „od środka” - wie, co
            projektant miał na myśli, i widzi, kiedy wykonawca odchodzi od dokumentacji. Jeśli na budowie
            potrzebna jest zmiana, projektant i kierownik siedzą w jednym biurze: decyzja zapada w dni, nie w tygodnie.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Działamy lokalnie - z Żegociny na większość budów w powiatach bocheńskim, limanowskim, brzeskim
            i wielickim dojeżdżamy w pół godziny. Znamy miejscowych wykonawców, urzędy i inspektoraty.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Jak przebiega współpraca */}
    <section className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12 text-center">
          Jak przebiega współpraca
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-border/60 p-8 bg-background hover:border-accent/50 transition-colors duration-500"
            >
              <span className="section-number text-5xl block mb-4">{i + 1}</span>
              <h3 className="font-display font-700 text-foreground text-lg mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Cena */}
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12">
          Ile kosztuje kierownik budowy?
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Cena zależy od pięciu rzeczy: rodzaju budynku, wielkości (powierzchnia i liczba kondygnacji), etapu
              budowy (prowadzenie od fundamentów czy przejęcie w trakcie), technologii budowy oraz odległości od
              naszego biura.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Po krótkiej rozmowie telefonicznej podajemy konkretną cenę za całość - bez stawek godzinowych
              i niespodzianek.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="border border-accent bg-background p-10 md:p-12 text-center"
          >
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">Dom jednorodzinny</p>
            <p className="font-display font-700 text-4xl md:text-5xl text-foreground mb-2">od 3&nbsp;000 zł</p>
            <p className="text-muted-foreground mb-8">za poprowadzenie całej budowy</p>
            <a
              href="tel:+48888899366"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              <Phone size={16} />
              Zapytaj o wycenę
            </a>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Obszar działania */}
    <section className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12">
          Gdzie prowadzimy budowy
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <div className="border border-accent/40 p-2">
              <RouteMap area className="aspect-[4/3] w-full" />
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Biuro mamy w Żegocinie, na granicy powiatów bocheńskiego i limanowskiego. Jako kierownik budowy
              obsługujemy przede wszystkim:
            </p>
            <ul className="space-y-3 mb-6">
              {areaCities.map((city) => (
                <li key={city.to} className="flex gap-4 text-muted-foreground leading-relaxed">
                  <span className="mt-[0.8em] h-px w-6 shrink-0 bg-accent" aria-hidden />
                  <span>
                    <Link to={city.to} className="text-accent font-semibold hover:underline underline-offset-4">
                      {city.name}
                    </Link>
                    {city.rest}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Budowa poza tym obszarem? Zadzwońcie - przy większych inwestycjach dojeżdżamy dalej.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <LandingFaq title="Najczęstsze pytania o kierownika budowy" faqs={faqs} />

    <CtaBand
      id="kontakt"
      title="Ruszacie z budową? Porozmawiajmy, zanim wbijecie pierwszą łopatę"
      text="Doradzimy, jakie dokumenty musicie mieć gotowe przed rozpoczęciem robót."
      note="Pn-Pt 8:00-16:00 · Żegocina 149"
    />

    <Footer />
  </main>
);

export default KierownikBudowyPage;
