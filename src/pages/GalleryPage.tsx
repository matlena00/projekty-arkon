import { useState, useMemo, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Home, Building2, Building, Store, Sofa, LayoutGrid, Images } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import { useQuery } from "@tanstack/react-query";
import { fetchPublishedProjects } from "@/lib/cms";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, imageGalleryLd } from "@/lib/schema";
import { PROJECT_CATEGORIES, CATEGORY_LABELS, type ProjectCategory } from "@/lib/types";

// Grafiki fallbacku ładowane globem: miniatury (-thumb) do kafelków,
// pełne rozmiary do lightboxa. Vite podmienia ścieżki na zhashowane URL-e.
const projectFiles = import.meta.glob("../assets/projects/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const rootFiles = import.meta.glob("../assets/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const pImg = (name: string) => projectFiles[`../assets/projects/${name}.webp`];
const pThumb = (name: string) =>
  projectFiles[`../assets/projects/${name}-thumb.webp`] ?? pImg(name);
const rImg = (name: string) => rootFiles[`../assets/${name}.webp`];
const rThumb = (name: string) =>
  rootFiles[`../assets/${name}-thumb.webp`] ?? rImg(name);

type FilterCategory = ProjectCategory | "all";

const categoryIcons: Record<FilterCategory, ReactNode> = {
  all: <LayoutGrid size={16} />,
  domy: <Home size={16} />,
  osiedla: <Building size={16} />,
  publiczne: <Building2 size={16} />,
  uslugowe: <Store size={16} />,
  wnetrza: <Sofa size={16} />,
};

const categories: { id: FilterCategory; label: string; icon: ReactNode }[] = [
  { id: "all", label: "Wszystkie", icon: categoryIcons.all },
  ...PROJECT_CATEGORIES.map((c) => ({ id: c.id as FilterCategory, label: c.label, icon: categoryIcons[c.id] })),
];

// Jeden kafelek = jedna realizacja (grupa zdjęć)
interface GalleryImage {
  src: string;
  thumb: string;
}
interface GalleryItem {
  id: string;
  title: string;
  category: ProjectCategory;
  images: GalleryImage[];
}

/** Fallback statyczny — używany, dopóki CMS (Supabase) nie zwróci realizacji. */
const fb = (
  title: string,
  category: ProjectCategory,
  images: GalleryImage[]
): GalleryItem => ({ id: `fb-${title}`, title, category, images });

const pi = (name: string): GalleryImage => ({ src: pImg(name), thumb: pThumb(name) });
const ri = (name: string): GalleryImage => ({ src: rImg(name), thumb: rThumb(name) });

const fallbackItems: GalleryItem[] = [
  // Domy jednorodzinne — projekty indywidualne (lokalizacje do uzupełnienia)
  fb("Dom jednorodzinny 01", "domy", [pi("dom-01"), pi("dom-02")]),
  fb("Dom jednorodzinny 02", "domy", [pi("dom-03"), pi("dom-04")]),
  fb("Dom jednorodzinny 03", "domy", [pi("dom-05"), pi("dom-06"), pi("dom-07"), pi("dom-08")]),
  fb("Dom jednorodzinny 04", "domy", [pi("dom-09"), pi("dom-10")]),
  fb("Dom w Dębnie", "domy", [ri("project-1"), ri("project-2"), ri("project-4")]),
  fb("Dom w Łazanach", "domy", [ri("project-3"), ri("project-5"), ri("project-6"), ri("about-terrace")]),
  fb("Dom w Pietrzejowicach", "domy", [ri("hero-night"), ri("project-aerial")]),

  // Osiedla domów
  fb("Osiedle Pietrzejowice", "osiedla", [pi("osiedle-1"), pi("osiedle-2"), pi("osiedle-3"), pi("osiedle-4")]),
  fb("Osiedle Nowoczesne", "osiedla", [
    pi("osiedle-5"), pi("osiedle-6"), pi("osiedle-7"), pi("osiedle-8"), pi("osiedle-9"), pi("osiedle-10"),
  ]),

  // Obiekty publiczne (w tym dawne "sportowe")
  fb("Kompleks edukacyjny", "publiczne", [
    pi("publiczne-1"), pi("publiczne-2"), pi("publiczne-3"), pi("publiczne-4"), pi("publiczne-5"), pi("publiczne-6"),
  ]),
  fb("Centrum sportowe", "publiczne", [
    pi("sportowe-1"), pi("sportowe-2"), pi("sportowe-3"), pi("sportowe-4"),
  ]),

  // Obiekty usługowe
  fb("Lipnica Murowana", "uslugowe", [
    pi("uslugowe-1"), pi("uslugowe-2"), pi("uslugowe-3"), pi("uslugowe-5"), pi("uslugowe-8"),
    pi("uslugowe-9"), pi("uslugowe-10"), pi("uslugowe-13"), pi("uslugowe-14"), pi("uslugowe-15"),
  ]),

  // Wizualizacje wnętrz
  fb("Biuro ArKon", "wnetrza", [ri("office-lobby"), ri("office-reception"), ri("office-desk")]),
];

/** Wiersze z bazy mogą mieć historyczną kategorię "sportowe" — pokazujemy je jako publiczne. */
const normalizeCategory = (kat: string): ProjectCategory =>
  kat === "sportowe" ? "publiczne" : (kat as ProjectCategory);

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const { data: projects = [] } = useQuery({ queryKey: ["public-projects"], queryFn: fetchPublishedProjects });
  const cmsItems = useMemo<GalleryItem[]>(
    () =>
      projects
        .map((p) => ({
          id: p.id,
          title: p.tytul,
          category: normalizeCategory(p.kategoria),
          images: p.zdjecia.map((z) => ({ src: z.url, thumb: z.url })),
        }))
        .filter((it) => it.images.length > 0),
    [projects]
  );
  const items = cmsItems.length > 0 ? cmsItems : fallbackItems;

  const filtered = useMemo(
    () => (activeCategory === "all" ? items : items.filter((it) => it.category === activeCategory)),
    [activeCategory, items]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length };
    items.forEach((it) => {
      counts[it.category] = (counts[it.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  const openGallery = (item: GalleryItem) => {
    setOpenItem(item);
    setImgIndex(0);
  };
  const closeGallery = () => setOpenItem(null);
  const nextImg = () => { if (openItem) setImgIndex((i) => (i + 1) % openItem.images.length); };
  const prevImg = () => { if (openItem) setImgIndex((i) => (i - 1 + openItem.images.length) % openItem.images.length); };

  useEffect(() => {
    if (!openItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openItem]);

  return (
    <main className="overflow-x-hidden">
      <Seo
        title="Realizacje i wizualizacje 3D | Biuro Projektowe ArKon"
        description="Zobacz nasze realizacje i wizualizacje — domy jednorodzinne, osiedla domów, obiekty publiczne, usługowe i wizualizacje wnętrz zaprojektowane przez biuro ArKon."
        path="/galeria"
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Strona główna", path: "/" },
            { name: "Realizacje", path: "/galeria" },
          ]),
          imageGalleryLd({
            name: "Realizacje — Biuro Projektowe ArKon",
            path: "/galeria",
            images: items.flatMap((it) => it.images.map((im) => im.src)),
          }),
        ]}
      />
      <Navbar />

      <PageHeader
        label="Realizacje"
        title="Nasze realizacje"
        subtitle="Wizualizacje architektoniczne i zrealizowane projekty — zobacz, jak zamieniamy marzenia w rzeczywistość."
        dark
        accentWord="realizacje"
        sectionNumber="03"
      />

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-20 lg:top-24 z-30">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 py-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenItem(null);
                  }}
                  className={`group relative flex items-center justify-center gap-2 px-3 py-3 text-[11px] text-center leading-tight font-semibold uppercase tracking-[0.08em] transition-all duration-300 border min-h-[52px] ${
                    isActive
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                  <span
                    className={`ml-1 text-[10px] tabular-nums ${
                      isActive ? "text-accent-foreground/70" : "text-muted-foreground/50"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid — kafelki realizacji */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-padding max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">Brak realizacji w tej kategorii — wkrótce dodamy nowe projekty.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <motion.button
                  key={`${activeCategory}-${item.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                  onClick={() => openGallery(item)}
                  className="group relative overflow-hidden aspect-[4/3] cursor-pointer text-left"
                >
                  <img
                    src={item.images[0]?.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-500 flex items-center justify-center">
                    <span className="flex items-center gap-2 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm font-semibold uppercase tracking-wider">
                      <ZoomIn size={20} /> Zobacz galerię
                    </span>
                  </div>
                  {/* Tytuł + kategoria */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/90 to-transparent">
                    <p className="text-primary-foreground text-sm font-display font-semibold">{item.title}</p>
                    <p className="text-primary-foreground/60 text-xs mt-0.5">{CATEGORY_LABELS[item.category]}</p>
                  </div>
                  {/* Licznik zdjęć */}
                  {item.images.length > 1 && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-charcoal/70 backdrop-blur-sm text-primary-foreground/90 text-[11px] font-semibold">
                        <Images size={12} /> {item.images.length}
                      </span>
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-charcoal/70 backdrop-blur-sm text-primary-foreground/90 text-[10px] font-semibold uppercase tracking-[0.1em]">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox — galeria pojedynczej realizacji */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-4 md:p-8"
            onClick={closeGallery}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground z-10"
              onClick={closeGallery}
            >
              <X size={28} />
            </motion.button>

            {openItem.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground text-4xl font-light z-10"
                  onClick={(e) => { e.stopPropagation(); prevImg(); }}
                  aria-label="Poprzednie zdjęcie"
                >
                  ‹
                </button>
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground text-4xl font-light z-10"
                  onClick={(e) => { e.stopPropagation(); nextImg(); }}
                  aria-label="Następne zdjęcie"
                >
                  ›
                </button>
              </>
            )}

            <motion.img
              key={imgIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={openItem.images[imgIndex]?.src}
              alt={`${openItem.title} ${imgIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-primary-foreground/80 text-sm font-display">{openItem.title}</p>
              <p className="text-primary-foreground/40 text-xs mt-1">
                {imgIndex + 1} / {openItem.images.length}
              </p>
            </div>

            {/* Miniatury */}
            {openItem.images.length > 1 && (
              <div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex gap-2 max-w-[80vw] overflow-x-auto px-4"
                onClick={(e) => e.stopPropagation()}
              >
                {openItem.images.map((im, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImgIndex(idx)}
                    className={`w-14 h-14 shrink-0 overflow-hidden border-2 transition-colors ${
                      idx === imgIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={im.thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default GalleryPage;
