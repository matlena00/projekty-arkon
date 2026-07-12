import { motion } from "framer-motion";
import p1 from "@/assets/project-1.webp";
import p2 from "@/assets/project-2.webp";
import p3 from "@/assets/project-3.webp";
import p4 from "@/assets/project-4.webp";
import p5 from "@/assets/project-5.webp";
import p6 from "@/assets/project-6.webp";

const images = [p1, p2, p3, p4, p5, p6];

const GalleryStrip = () => (
  <section className="py-16 bg-background overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding mb-8"
    >
      <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3 text-center">Realizacje</p>
      <h2 className="heading-display text-foreground text-3xl md:text-5xl text-center">Nasze projekty</h2>
    </motion.div>
    <div className="flex gap-4 section-padding overflow-x-auto pb-4 scrollbar-hide">
      {images.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="flex-shrink-0 w-72 md:w-96 h-56 md:h-72 overflow-hidden group"
        >
          <img
            src={src}
            alt={`Realizacja ArKon ${i + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      ))}
    </div>
  </section>
);

export default GalleryStrip;
