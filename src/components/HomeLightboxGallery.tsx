import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPublishedProjects } from "@/lib/cms";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import p1 from "@/assets/project-1.webp";
import p2 from "@/assets/project-2.webp";
import p3 from "@/assets/project-3.webp";
import p4 from "@/assets/project-4.webp";
import p5 from "@/assets/project-5.webp";
import p6 from "@/assets/project-6.webp";
import p1t from "@/assets/project-1-thumb.webp";
import p2t from "@/assets/project-2-thumb.webp";
import p3t from "@/assets/project-3-thumb.webp";
import p4t from "@/assets/project-4-thumb.webp";
import p5t from "@/assets/project-5-thumb.webp";
import p6t from "@/assets/project-6-thumb.webp";

// Slajd używa srcSet (miniatura 900w / pełny obraz), lightbox pełnego pliku.
const fallbackImages = [
  { src: p1, thumb: p1t, title: "Wizualizacja Dębno 01" },
  { src: p2, thumb: p2t, title: "Wizualizacja Dębno 03" },
  { src: p3, thumb: p3t, title: "Wizualizacja Łazany 14" },
  { src: p4, thumb: p4t, title: "Wizualizacja Dębno 07" },
  { src: p5, thumb: p5t, title: "Wizualizacja Łazany 01" },
  { src: p6, thumb: p6t, title: "Wizualizacja Łazany 04" },
];

const HomeLightboxGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const { data: projects = [] } = useQuery({ queryKey: ["public-projects"], queryFn: fetchPublishedProjects });
  const cmsImages = useMemo(
    () => projects.flatMap((p) => p.zdjecia.map((z) => ({ src: z.url, thumb: z.url, title: p.tytul }))).slice(0, 8),
    [projects]
  );
  const images = cmsImages.length > 0 ? cmsImages : fallbackImages;

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    setCurrent(0);
  }, [images.length]);

  // Autoplay
  useEffect(() => {
    if (paused || lightbox !== null) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, lightbox, next]);

  return (
    <>
      <section
        className="py-20 md:py-28 bg-background overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="section-padding mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="gold-line-wide" />
                <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">Realizacje</p>
              </div>
              <h2 className="heading-display text-foreground text-2xl md:text-4xl">Nasze realizacje</h2>
            </div>
            <Link
              to="/galeria"
              className="hidden md:inline-flex text-accent text-sm font-semibold uppercase tracking-wider hover:underline underline-offset-4"
            >
              Zobacz wszystkie →
            </Link>
          </motion.div>
        </div>

        {/* Slider */}
        <div className="relative section-padding">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-charcoal/80 text-primary-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 backdrop-blur-sm"
            aria-label="Poprzedni slajd"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-charcoal/80 text-primary-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 backdrop-blur-sm"
            aria-label="Następny slajd"
          >
            <ChevronRight size={22} />
          </button>

          {/* Slides container */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setLightbox(current)}
              >
                <img
                  src={images[current].src}
                  srcSet={`${images[current].thumb} 900w, ${images[current].src} 1536w`}
                  sizes="100vw"
                  loading="lazy"
                  decoding="async"
                  alt={images[current].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500 flex items-center justify-center">
                  <ZoomIn size={36} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-lg" />
                </div>
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-charcoal/70 to-transparent">
                  <p className="text-primary-foreground font-display font-600 text-sm md:text-base">{images[current].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {images.map((_, i) => (
              <button
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? "bg-accent w-8" : "bg-concrete/30 w-3 hover:bg-concrete/60"
                }`}
                onClick={() => setCurrent(i)}
                aria-label={`Slajd ${i + 1}`}
              />
            ))}
            <span className="ml-3 text-muted-foreground text-xs tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="md:hidden text-center mt-6">
          <Link
            to="/galeria"
            className="text-accent text-sm font-semibold uppercase tracking-wider hover:underline underline-offset-4"
          >
            Zobacz wszystkie →
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </motion.button>
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground text-4xl font-light z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}
            >‹</button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground text-4xl font-light z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}
            >›</button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={images[lightbox].src}
              alt={images[lightbox].title}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-primary-foreground/80 text-sm font-display">{images[lightbox].title}</p>
              <p className="text-primary-foreground/40 text-xs mt-1">{lightbox + 1} / {images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeLightboxGallery;
