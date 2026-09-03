import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import AssetPhoto from "@/components/landing/AssetPhoto";
import CtaBand from "@/components/landing/CtaBand";
import LandingFaq from "@/components/landing/LandingFaq";
import { breadcrumbLd, webPageLd, serviceLd } from "@/lib/schema";
import biuroImg from "@/assets/biuro01.webp";

const scope = [
  "sporządzamy projekt zagospodarowania terenu (usytuowanie domu, zjazd, przyłącza),",
  "sprawdzamy zgodność z miejscowym planem (MPZP) lub warunkami zabudowy,",
  "dostosowujemy fundamenty i konstrukcję do warunków gruntowych oraz stref klimatycznych (śnieg, wiatr - w naszym terenie to istotne),",
  "wprowadzamy zmiany, na których Wam zależy: lustrzane odbicie, przesunięcie okien i ścianek, zmiana garażu, kąta dachu czy materiałów,",
  "kompletujemy uzgodnienia i opinie oraz przygotowujemy wniosek o pozwolenie na budowę.",
];

const steps = [
  { title: "Analiza działki", desc: "Sprawdzamy MPZP / warunki zabudowy, dostęp do drogi i mediów, ukształtowanie terenu. Bez zobowiązań, przed jakąkolwiek decyzją." },
  { title: "Wybór i weryfikacja projektu", desc: "Doradzamy, który projekt z katalogu zmieści się na działce i będzie tani w budowie. Współpracujemy z czołowymi katalogami." },
  { title: "Dokumenty wyjściowe", desc: "Zamawiamy mapę do celów projektowych (mamy własną geodezję), badania gruntu i warunki przyłączenia mediów." },
  { title: "Adaptacja i zmiany", desc: "Dostosowujemy projekt do działki i wprowadzamy Wasze zmiany. Wszystko konsultujemy na bieżąco." },
  { title: "Pozwolenie na budowę", desc: "Składamy kompletny wniosek i pilotujemy sprawę w starostwie aż do prawomocnej decyzji." },
];

const faqs = [
  {
    q: "Ile kosztuje adaptacja projektu gotowego?",
    a: "Cena zależy od zakresu zmian i dokumentów, które trzeba zgromadzić. Adaptacja „czysta” (bez zmian w projekcie) jest najtańsza; każda ingerencja w konstrukcję zwiększa nakład pracy. Po analizie działki i projektu podajemy jedną, konkretną cenę za całość - z mapą, badaniami gruntu i złożeniem wniosku.",
  },
  {
    q: "Ile trwa adaptacja i uzyskanie pozwolenia?",
    a: "Sama adaptacja to zwykle około dwóch miesięcy. Do czasu oczekiwania należy doliczyć czas potrzebny na wykonanie mapy czy uzyskanie warunków przyłączy - również około dwa miesiące. Urząd ma kolejne 65 dni na wydanie decyzji o pozwoleniu na budowę. Tak więc realnie należy zakładać około 6 miesięcy.",
  },
  {
    q: "Czy można zakupić projekt w Waszym biurze?",
    a: "Można, a nawet warto. Nasze biuro współpracuje z większością pracowni w Polsce, dlatego kupując projekt za naszym pośrednictwem możecie liczyć na dodatkowe rabaty.",
  },
  {
    q: "Jakie zmiany można wprowadzić w projekcie gotowym?",
    a: "W zasadzie każdą zmianę jesteśmy w stanie wprowadzić: lustrzane odbicie, układ ścianek działowych, okna i drzwi, kąt dachu, podpiwniczenie, garaż, materiały. Przy dużych zmianach należy się jednak zastanowić, czy nie warto wybrać projektu indywidualnego.",
  },
  {
    q: "Czy każdy projekt z katalogu da się zaadaptować na mojej działce?",
    a: "Nie - i to najczęstsza pułapka. Plan miejscowy potrafi narzucić kąt dachu, szerokość elewacji, wysokość czy poziom posadowienia. Dlatego sprawdzamy projekt względem zapisów planu, zanim wydacie na niego pieniądze.",
  },
  {
    q: "Mam już projekt kupiony - co musicie ode mnie dostać?",
    a: "Komplet dokumentacji z katalogu (4 egzemplarze lub wersję elektroniczną ze zgodą na zmiany) i numer działki. Resztę - mapę, badania, warunki, uzgodnienia - załatwiamy my.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const AdaptacjaProjektuPage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="Adaptacja projektu gotowego - Bochnia, Wieliczka | ArKon"
      description="Adaptujemy projekty typowe (Archon+, Murator i inne) do działki i MPZP. Komplet formalności do pozwolenia na budowę. Powiaty: bocheński, wielicki, limanowski."
      path="/uslugi/adaptacja-projektu"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Usługi", path: "/uslugi" },
          { name: "Adaptacja projektu", path: "/uslugi/adaptacja-projektu" },
        ]),
        webPageLd({
          name: "Adaptacja projektu gotowego - Biuro Projektowe ArKon",
          path: "/uslugi/adaptacja-projektu",
          description: "Adaptacja projektów typowych do działki, planu miejscowego i warunków gruntowych - z kompletem formalności do pozwolenia na budowę.",
        }),
        serviceLd({
          name: "Adaptacja projektu gotowego",
          description: "Dostosowanie projektu katalogowego do działki, MPZP lub warunków zabudowy i warunków gruntowych, wraz z kompletem dokumentów i wnioskiem o pozwolenie na budowę.",
          path: "/uslugi/adaptacja-projektu",
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
              { name: "Adaptacja projektu" },
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
              Adaptacja projektu gotowego - od katalogu do pozwolenia na budowę
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-10"
            >
              Kupiliście (albo dopiero wybieracie) projekt z katalogu? Dostosujemy go do Waszej działki,
              miejscowego planu i warunków gruntowych, skompletujemy dokumenty i złożymy wniosek o pozwolenie
              na budowę. Wy wybieracie dom - formalności są po naszej stronie.
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
                href="#przed-zakupem"
                className="inline-flex items-center justify-center gap-3 border border-primary-foreground/25 text-primary-foreground/85 px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:border-accent hover:text-accent transition-all duration-300"
              >
                Sprawdź projekt przed zakupem
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <AssetPhoto
              folder="uslugi"
              name="adaptacje"
              alt="Biuro projektowe ArKon w Żegocinie - katalogi projektów gotowych Archon przygotowane do adaptacji"
              caption="ZDJĘCIE: projekt katalogowy rozłożony na biurku + notatki adaptacyjne / ekran z rzutem"
              className="aspect-[4/5] max-h-[520px] w-full"
              dark
              eager
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Czym jest adaptacja */}
    <section className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div {...fadeUp}>
          <h2 className="heading-display text-foreground text-2xl md:text-4xl mb-6">
            Czym jest adaptacja i dlaczego jest obowiązkowa?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Projekt kupiony z katalogu (Archon+, Murator, MG Projekt i inne) to dopiero połowa drogi. Zanim urząd
            wyda pozwolenie na budowę, projekt musi zostać dostosowany do konkretnej działki przez uprawnionego
            projektanta - i to właśnie jest adaptacja. W jej ramach:
          </p>
          <ul className="space-y-4">
            {scope.map((item) => (
              <li key={item} className="flex gap-4 text-muted-foreground leading-relaxed">
                <span className="mt-[0.8em] h-px w-6 shrink-0 bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
          <AssetPhoto
            folder="uslugi"
            name="czym-jest-adaptacja"
            alt="Adaptacja projektu gotowego Archon - dokumentacja projektowa i rzuty na ekranie w biurze ArKon"
            caption="ZDJĘCIE: dom w budowie zrealizowany z projektu katalogowego (Wasza realizacja)"
            className="aspect-[4/3] w-full"
            thumb
          />
        </motion.div>
      </div>
    </section>

    {/* Sprawdzenie przed zakupem - centralny hook */}
    <section id="przed-zakupem" className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <div className="relative section-padding max-w-3xl mx-auto text-center">
        <motion.p {...fadeUp} className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          Wstępna analiza
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="heading-display text-primary-foreground text-2xl md:text-4xl mb-6"
        >
          Zanim kupicie projekt - sprawdzimy go za Was
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-10"
        >
          Najdroższy błąd to kupno projektu, który nie zmieści się na działce albo jest sprzeczny z planem
          miejscowym. Wyślijcie nam numer działki i link do projektu, który Wam się podoba - sprawdzimy,
          czy da się go u Was postawić i co trzeba będzie zmienić, zanim wydacie na niego pieniądze.
        </motion.p>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.3 }}>
          <a
            href="mailto:biuro@projekty-arkon.pl"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest whitespace-nowrap hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            <Mail size={16} />
            Wyślij projekt do sprawdzenia
          </a>
        </motion.div>
      </div>
    </section>

    {/* Adaptacja krok po kroku - timeline */}
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-14 text-center">
          Adaptacja krok po kroku
        </motion.h2>
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
          {/* linia łącząca (desktop) */}
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-accent/30" aria-hidden />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex md:flex-col gap-5 md:gap-0 md:text-center"
            >
              <div className="relative z-10 shrink-0 w-12 h-12 md:mx-auto flex items-center justify-center border border-accent bg-warm-white text-accent font-display font-700">
                {i + 1}
              </div>
              <div className="md:mt-6">
                <h3 className="font-display font-700 text-foreground text-base mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Wszystko w jednym biurze */}
    <section className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div {...fadeUp}>
          <img
            src={biuroImg}
            alt="Biuro ArKon - rozmowa z klientem przy stole"
            className="w-full object-cover aspect-[4/3]"
            loading="lazy"
          />
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
          <h2 className="heading-display text-foreground text-2xl md:text-4xl mb-6">
            Adaptacja, geodezja i kierownik budowy - w jednym biurze
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            W ArKon nie kończymy pracy na pieczątce. Mapę do celów projektowych robi nasz geodeta, adaptację nasz
            projektant, a budowę może poprowadzić{" "}
            <Link
              to="/uslugi/kierownik-budowy"
              className="text-accent font-semibold hover:underline underline-offset-4"
            >
              nasz kierownik budowy z uprawnieniami
            </Link>
            . Jeden telefon zamiast czterech firm - i nikt nie rozkłada rąk, że „to nie jego etap”.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Działamy w powiatach bocheńskim, limanowskim, brzeskim i wielickim - znamy lokalne plany miejscowe
            i praktykę tutejszych urzędów, więc wnioski składamy dobrze za pierwszym razem.
          </p>
        </motion.div>
      </div>
    </section>

    <LandingFaq title="Najczęstsze pytania o adaptację" faqs={faqs} />

    <CtaBand
      title="Macie działkę i marzenie o domu? To wystarczy na start"
      text="Zadzwońcie - w 15 minut powiemy, co można wybudować na Waszej działce i od czego zacząć."
    />

    <Footer />
  </main>
);

export default AdaptacjaProjektuPage;
