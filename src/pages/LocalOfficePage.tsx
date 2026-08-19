import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import PhotoPlaceholder from "@/components/landing/PhotoPlaceholder";
import RouteMap from "@/components/landing/RouteMap";
import CtaBand from "@/components/landing/CtaBand";
import LandingFaq from "@/components/landing/LandingFaq";
import { breadcrumbLd, webPageLd, serviceLd } from "@/lib/schema";
import { localPages } from "@/data/localPages";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

/**
 * Wspólny szablon stron lokalnych /biuro-projektowe-<miasto>.
 * Cała unikalna treść siedzi w src/data/localPages.ts — tu tylko layout.
 */
const LocalOfficePage = ({ city }: { city: keyof typeof localPages }) => {
  const data = localPages[city];
  const servicesAnchor = `uslugi-${data.slug}`;

  return (
    <main className="overflow-x-hidden">
      <Seo title={data.seoTitle} description={data.seoDescription} path={data.path} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Strona główna", path: "/" },
            { name: data.breadcrumbName, path: data.path },
          ]),
          webPageLd({
            name: data.seoTitle,
            path: data.path,
            description: data.seoDescription,
          }),
          serviceLd({
            name: data.breadcrumbName,
            description: data.lead,
            path: data.path,
            areaServed: data.areaServed,
          }),
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-charcoal pt-32 lg:pt-44 pb-16 md:pb-24">
        <div className="section-padding max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumbs
              items={[{ name: "Strona główna", path: "/" }, { name: data.breadcrumbName }]}
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
                {data.h1}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-10"
              >
                {data.lead}
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
                  Zadzwoń: 888 899 366
                </a>
                <a
                  href={`#${servicesAnchor}`}
                  className="inline-flex items-center justify-center gap-3 border border-primary-foreground/25 text-primary-foreground/85 px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Zobacz, w czym pomagamy
                </a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
              <PhotoPlaceholder dark className="aspect-[4/5] max-h-[520px] w-full" caption={data.heroCaption} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro lokalne */}
      <section className="py-20 md:py-28 bg-background">
        <div className="section-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <h2 className="heading-display text-foreground text-2xl md:text-4xl mb-6">{data.knowledgeTitle}</h2>
            <div className="space-y-5">
              {data.knowledgeParagraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="border border-accent/40 p-2">
              <RouteMap city={data.slug} className="aspect-[4/3] w-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Usługi */}
      <section id={servicesAnchor} className="py-20 md:py-28 bg-warm-white scroll-mt-24">
        <div className="section-padding max-w-7xl mx-auto">
          <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12 text-center">
            {data.servicesTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col border border-concrete/60 bg-background p-8 hover:border-accent/60 transition-colors duration-500"
              >
                <h3 className="font-display font-700 text-foreground text-lg mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                <Link
                  to={service.to}
                  className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all"
                >
                  Więcej
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Realizacje lokalne */}
      <section className="py-20 md:py-28 bg-background">
        <div className="section-padding max-w-7xl mx-auto">
          <motion.h2 {...fadeUp} className="heading-display text-foreground text-2xl md:text-4xl mb-12 text-center">
            {data.realizationsTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.realizations.map((r, i) => {
              const card = (
                <>
                  <PhotoPlaceholder className="aspect-[4/3] w-full" caption={r.caption} />
                  <div className="p-6">
                    <h3 className="font-display font-700 text-foreground text-lg group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </>
              );
              const cls =
                "group block border border-border/60 bg-background hover:border-accent/50 transition-colors duration-500";
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {r.href ? (
                    <Link to={r.href} className={cls}>
                      {card}
                    </Link>
                  ) : (
                    <div className={cls}>{card}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <LandingFaq title={data.faqTitle} faqs={data.faqs} />

      <CtaBand title={data.ctaTitle} text={data.ctaText} note={data.ctaNote} />

      <Footer />
    </main>
  );
};

export default LocalOfficePage;
