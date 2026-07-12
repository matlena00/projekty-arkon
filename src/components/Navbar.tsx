import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";

const links = [
  { label: "Home", href: "/" },
  { label: "O nas", href: "/o-nas" },
  { label: "Usługi", href: "/uslugi" },
  { label: "Realizacje", href: "/galeria" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "glass-nav bg-charcoal/90 shadow-2xl shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="section-padding flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="relative z-10 group">
            <img
              src={logoWhite}
              alt="ArKon Logo"
              className="h-9 lg:h-12 xl:h-14 w-auto transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-5 py-2 group"
                >
                  <span
                    className={`text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-accent"
                        : "text-primary-foreground/70 group-hover:text-primary-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Active / hover indicator */}
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-accent"
                    initial={false}
                    animate={{
                      width: isActive || hoveredLink === link.href ? "60%" : "0%",
                      opacity: isActive || hoveredLink === link.href ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              );
            })}

            {/* CTA separator + button */}
            <div className="ml-6 pl-6 border-l border-primary-foreground/10">
              <Link
                to="/kontakt"
                className={`group inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-medium tracking-[0.12em] uppercase transition-all duration-500 border ${
                  location.pathname === "/kontakt"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-primary-foreground/20 text-primary-foreground/80 hover:border-accent hover:text-accent"
                }`}
              >
                Kontakt
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 text-primary-foreground w-10 h-10 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col"
          >
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-graphite/30" />
            <div className="absolute bottom-12 left-8 section-number text-[120px] leading-none select-none">
              menu
            </div>

            <div className="relative flex flex-col justify-center flex-1 px-8 md:px-16">
              <div className="space-y-1">
                {[...links, { label: "Kontakt", href: "/kontakt" }].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      to={link.href}
                      className={`group flex items-center gap-4 py-3 transition-colors duration-300 ${
                        location.pathname === link.href
                          ? "text-accent"
                          : "text-primary-foreground/60 hover:text-primary-foreground"
                      }`}
                    >
                      <span className="heading-serif-italic text-sm text-accent/40 w-8">
                        0{i + 1}
                      </span>
                      <span className="font-display text-3xl md:text-4xl font-800 uppercase tracking-wide">
                        {link.label}
                      </span>
                      <ArrowRight
                        size={20}
                        className="ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0"
                      />
                    </Link>
                    <div className="h-px bg-primary-foreground/5 ml-12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
