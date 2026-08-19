import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import AssetPhoto from "@/components/landing/AssetPhoto";
import CtaBand from "@/components/landing/CtaBand";
import LandingFaq from "@/components/landing/LandingFaq";
import { breadcrumbLd, webPageLd, serviceLd } from "@/lib/schema";

const individualWhen = [
  "działka jest trudna: wąska, ze spadkiem, o nietypowym kształcie (u nas, na Pogórzu, to codzienność),",
  "plan miejscowy stawia wymagania, których katalog nie spełnia,",
  "chcecie wykorzystać widok, nasłonecznienie i ukształtowanie terenu,",
  "macie sprecyzowane potrzeby — warsztat, gabinet, dwupokoleniowość.",
];

const catalogWhen = [
  "działka jest płaska i typowa, a plan miejscowy liberalny,",
  "znaleźliście w katalogu dom, który pasuje niemal w 100%,",
  "zależy Wam na czasie — projekt jest „od ręki”,",
  "budżet na etap projektowy jest mniejszy.",
];

const steps = [
  {
    title: "Poznajemy Was i działkę",
    desc: "Spotkanie, ankieta i rozmowa o potrzebach i stylu życia + analiza działki: MPZP, media, nasłonecznienie, ukształtowanie terenu.",
  },
  {
    title: "Koncepcja",
    desc: "Rzuty i bryła w 2–3 wariantach, wizualizacje 3D. Pracujemy, aż powiecie „to jest to” — koncepcję zatwierdzacie przed dalszymi etapami.",
  },
  {
    title: "Projekt budowlany",
    desc: "Projekt zagospodarowania + architektura — tworzymy kompletną i szczegółową dokumentację potrzebną do złożenia w starostwie.",
  },
  {
    title: "Projekt techniczny",
    desc: "Konstrukcja + projekty branżowe w jednym biurze. Bez podwykonawców, których trzeba organizować. Powstaje w trakcie uzyskiwania pozwolenia na budowę.",
  },
  {
    title: "Formalności",
    desc: "Wniosek o pozwolenie na budowę i pilotowanie sprawy w starostwie, wyłączenie gruntów z produkcji rolnej, uzgodnienia czy warunki techniczne przyłączy — wszystko załatwimy za Was.",
  },
  {
    title: "Budowa",
    desc: (
      <>
        Na życzenie prowadzimy też budowę —{" "}
        <Link to="/uslugi/kierownik-budowy" className="text-accent font-semibold hover:underline underline-offset-4">
          kierownik budowy z uprawnieniami
        </Link>{" "}
        z naszego zespołu. Autor projektu jest wtedy zawsze pod ręką i dba o każdy szczegół.
      </>
    ),
  },
];

const portfolio = [
  { image: "indywidualne-kocmyrzow", caption: "FOTO: Kocmyrzów", title: "Dom jednorodzinny, Kocmyrzów", desc: "Wymagający projekt na działce z dużym spadkiem. Inwestor chciał ponadto wykorzystać piękny widok z działki na Kraków." },
  { image: "indywidualne-lazany", caption: "FOTO: Łazany", title: "Dom jednorodzinny, Łazany", desc: "Jeden z największych i najciekawszych projektów. Trzy kondygnacje idealnie wkomponowane w działkę ze spadkiem." },
  { image: "indywidualne-brzezie", caption: "FOTO: Brzezie", title: "Dom jednorodzinny, Brzezie", desc: "Piękna parterówka z unikalnym układem pomieszczeń — możemy śmiało powiedzieć, że to projekt uszyty pod wymagania Inwestorów." },
  { image: "indywidualne-olchawa", caption: "FOTO: Olchawa", title: "Dom jednorodzinny, Olchawa", desc: "Miało być nowocześnie, ale nie zrujnować portfela — i z całą pewnością się udało! Projekt, któremu poświęciliśmy bardzo dużo czasu, ale ostatecznie wyszła piękna i unikalna bryła." },
  { image: "indywidualne-bochnia", caption: "FOTO: Bochnia", title: "Osiedle domów, Bochnia", desc: "Osiedle budynków w zabudowie szeregowej — wymagający projekt, który udało się nam zrealizować w ekspresowym czasie." },
  { image: "indywidualne-sobolow", caption: "FOTO: Sobolów", title: "Dom jednorodzinny, Sobolów", desc: "Nietypowy budynek pod nietypowe wymagania Inwestorów. Koncepcje zmienialiśmy kilkanaście razy, ale w efekcie powstał budynek, który w pełni będzie odpowiadał potrzebom Klientów." },
];

const deliverables = [
  "koncepcję + na życzenie wizualizacje 3D (warianty do wyboru),",
  "projekt zagospodarowania działki,",
  "kompletny projekt architektoniczno-budowlany,",
  "projekt techniczny: konstrukcja, instalacje i elektryka,",
  "charakterystykę energetyczną, projekty przyłączy zewnętrznych,",
  "komplet uzgodnień i złożony wniosek o pozwolenie na budowę,",
  "nadzór autorski w trakcie budowy.",
];

const faqs = [
  {
    q: "Ile trwa wykonanie projektu indywidualnego?",
    a: "Koncepcja to zwykle 3–6 tygodni (zależnie od liczby iteracji), projekt architektoniczno-budowlany wraz z projektem zagospodarowania to kolejne 4–6 tygodni. Projekt techniczny to kolejnych 4–6 tygodni pracy, jednak projektujemy to równolegle z innymi procedurami. Prace rozpoczynamy około 2–3 miesiące przed umówionym terminem złożenia wniosku o pozwolenie na budowę.",
  },
  {
    q: "Ile kosztuje projekt indywidualny w porównaniu z gotowym?",
    a: "Projekt indywidualny jest droższy na etapie dokumentacji, ale projektujemy pod Wasz budżet budowy — dobrze zaprojektowany dom potrafi odrobić tę różnicę na etapie budowy (prostsza konstrukcja, brak przeróbek, tańsze fundamenty dopasowane do terenu). Zazwyczaj projekt indywidualny jest około 3–5 tys. droższy niż adaptacja typówki.",
  },
  {
    q: "Czy projektujecie domy na działkach ze spadkiem?",
    a: "Tak — to nasza specjalność. Pracujemy na Pogórzu, gdzie płaska działka to rzadkość. Dom dopasowany do działki ze spadkiem często wychodzi taniej niż niwelacja terenu pod projekt katalogowy.",
  },
  {
    q: "Czy zajmiecie się też wnętrzami?",
    a: "Tak, wykonujemy projekty wnętrz — najlepiej równolegle z projektem domu, wtedy instalacje od razu trafiają tam, gdzie staną meble.",
  },
  {
    q: "Czy wykonujecie też wizualizacje 3D?",
    a: "Oczywiście, bardzo często już na etapie koncepcji proponujemy wykonanie modelu 3D — tak aby Inwestorom łatwiej było wyobrazić sobie, jak będzie wyglądała bryła ich wymarzonego domu. Mając wykonany model, bardzo łatwo później dobierać kolorystykę czy materiały na elewację.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const ProjektyIndywidualnePage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="Projekty indywidualne domów — Małopolska | Biuro ArKon"
      description="Projekt domu zaprojektowany pod Waszą działkę i budżet — od koncepcji po pozwolenie na budowę. Bochnia, Limanowa, Brzesko, Wieliczka. Pierwsza rozmowa bez zobowiązań."
      path="/uslugi/projekty-indywidualne"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Usługi", path: "/uslugi" },
          { name: "Projekty indywidualne", path: "/uslugi/projekty-indywidualne" },
        ]),
        webPageLd({
          name: "Projekty indywidualne domów — Biuro Projektowe ArKon",
          path: "/uslugi/projekty-indywidualne",
          description: "Indywidualne projekty domów dopasowane do działki i budżetu — od koncepcji z wizualizacjami 3D po pozwolenie na budowę.",
        }),
        serviceLd({
          name: "Projekty indywidualne domów",
          description: "Indywidualny projekt domu od pierwszej kreski: koncepcja z wizualizacjami 3D, projekt budowlany z branżami, formalności aż do pozwolenia na budowę.",
          path: "/uslugi/projekty-indywidualne",
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
              { name: "Projekty indywidualne" },
            ]}
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="heading-display text-primary-foreground text-3xl md:text-5xl lg:text-[3.2rem] mb-6"
            >
              Projekty indywidualne — dom zaprojektowany pod Waszą działkę, nie pod katalog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-10"
            >
              Wąska działka ze spadkiem? Widok, którego szkoda zasłonić garażem? Nietypowe potrzeby rodziny?
              Projekt indywidualny powstaje od pierwszej kreski dla Was — i często buduje się go taniej niż źle
              dobrany projekt gotowy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:+48888899366"
                className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              >
                <Phone size={16} />
                Umów rozmowę o projekcie
              </a>
              <a
                href="#realizacje"
                className="inline-flex items-center justify-center gap-3 border border-primary-foreground/25 text-primary-foreground/85 px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
              >
                Zobacz nasze projekty
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <AssetPhoto
              folder="uslugi"
              name="indywidualne-hero"
              alt="Wizualizacja domu jednorodzinnego zaprojektowanego przez ArKon"
              caption="WIZUALIZACJA: projekt indywidualny ArKon"
              className="aspect-[4/3] max-h-[520px] w-full"
              dark
              eager
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Indywidualny czy gotowy */}
    <section className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12 text-center">
          Projekt indywidualny czy adaptacja gotowego?
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
          <motion.div {...fadeUp} className="border border-border/60 border-t-2 border-t-accent p-8 md:p-10 bg-background h-full">
            <h3 className="font-display font-700 text-foreground text-xl mb-6">Projekt indywidualny — gdy:</h3>
            <ul className="space-y-4">
              {individualWhen.map((item) => (
                <li key={item} className="flex gap-4 text-muted-foreground leading-relaxed">
                  <span className="mt-[0.8em] h-px w-6 shrink-0 bg-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="border border-border/60 border-t-2 border-t-concrete p-8 md:p-10 bg-background h-full"
          >
            <h3 className="font-display font-700 text-foreground text-xl mb-6">Adaptacja gotowego — gdy:</h3>
            <ul className="space-y-4 mb-6">
              {catalogWhen.map((item) => (
                <li key={item} className="flex gap-4 text-muted-foreground leading-relaxed">
                  <span className="mt-[0.8em] h-px w-6 shrink-0 bg-concrete" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/uslugi/adaptacja-projektu"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline underline-offset-4"
            >
              Zobacz naszą usługę adaptacji projektów
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
        <motion.p
          {...fadeUp}
          className="heading-serif-italic text-foreground/80 text-lg md:text-xl text-center max-w-3xl mx-auto"
        >
          Nie wiecie, która droga jest dla Was? Przyjdźcie z numerem działki — doradzimy uczciwie, również wtedy,
          gdy tańszym i lepszym wyborem będzie projekt z katalogu.
        </motion.p>
      </div>
    </section>

    {/* Proces — pionowa oś czasu */}
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="section-padding max-w-3xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-16 text-center">
          Od pierwszej rozmowy do pozwolenia na budowę
        </motion.h2>
        <div className="relative">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-accent/30" aria-hidden />
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="relative flex gap-8"
              >
                <div className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border border-accent bg-warm-white text-accent font-display font-700">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <h3 className="font-display font-700 text-foreground text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Portfolio */}
    <section id="realizacje" className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12 text-center">
          Zaprojektowaliśmy je od zera
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project, i) => {
            const cls = "group block border border-border/60 bg-background transition-colors duration-500";
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <div className={cls}>
                  <AssetPhoto
                    folder="uslugi"
                    name={project.image}
                    alt={project.title}
                    caption={project.caption}
                    className="aspect-[4/3] w-full"
                    thumb
                  />
                  <div className="p-6">
                    <h3 className="font-display font-700 text-foreground text-lg mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div {...fadeUp} className="text-center mt-12">
          <Link
            to="/galeria"
            className="inline-flex items-center gap-3 border border-accent text-accent px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Zobacz wszystkie realizacje
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Co dokładnie dostajecie */}
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12">
          Co dokładnie dostajecie
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <ul className="space-y-4 mb-8">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-4 text-muted-foreground leading-relaxed">
                  <span className="mt-[0.8em] h-px w-6 shrink-0 bg-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Cena projektu indywidualnego zależy od powierzchni, liczby kondygnacji i stopnia
              skomplikowania, a także instalacji wewnętrznych — konkretną kwotę podajemy po pierwszej
              rozmowie o koncepcji.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="border border-accent bg-background p-10 md:p-12 text-center"
          >
            <h3 className="font-display font-700 text-foreground text-2xl mb-4">Zacznijcie od rozmowy</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Godzina z projektantem, bez zobowiązań. Przyjdźcie z działką — wyjdziecie z planem działania.
            </p>
            <a
              href="tel:+48888899366"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              <Phone size={16} />
              888 899 366
            </a>
          </motion.div>
        </div>
      </div>
    </section>

    <LandingFaq title="Najczęstsze pytania" faqs={faqs} />

    <CtaBand
      title="Wasz dom zaczyna się od rozmowy przy kawie"
      text="Zapraszamy do biura w Żegocinie — pokażemy zrealizowane projekty i sprawdzimy Waszą działkę na miejscu."
    />

    <Footer />
  </main>
);

export default ProjektyIndywidualnePage;
