import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  accentWord?: string;
  bgImage?: string;
  dark?: boolean;
  sectionNumber?: string;
}

const PageHeader = ({
  label,
  title,
  subtitle,
  accentWord,
  bgImage,
  dark = true,
  sectionNumber,
}: PageHeaderProps) => {
  const hasBg = !!bgImage;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden ${
        hasBg ? "h-[55vh] min-h-[380px]" : "pt-32 pb-20"
      } ${dark || hasBg ? "bg-charcoal" : "bg-background"}`}
    >
      {hasBg && (
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <img src={bgImage} alt="" className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
        </motion.div>
      )}

      <div className="relative z-10 section-padding pb-16 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="gold-line-wide" />
          <p className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">{label}</p>
        </motion.div>

        {accentWord && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.12, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-serif-italic text-accent text-5xl md:text-7xl lg:text-8xl absolute -mt-8 md:-mt-12 select-none pointer-events-none"
          >
            {accentWord}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className={`heading-display text-3xl md:text-5xl lg:text-6xl mb-4 relative ${
            dark || hasBg ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${
              dark || hasBg ? "text-primary-foreground/60" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
