import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import HomeLightboxGallery from "@/components/HomeLightboxGallery";
import StatsSection from "@/components/StatsSection";
import OfficeSection from "@/components/OfficeSection";
import PartnersSection from "@/components/PartnersSection";
import TeamSection from "@/components/TeamSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Seo
        title="ArKon — Biuro Projektowe | Architektura i Konstrukcja | Żegocina"
        description="Biuro Projektowe ArKon z Żegociny — projekty indywidualne, adaptacje, projekty wnętrz, nadzór budowy i kompleksowa obsługa inwestycji. Od projektu po klucze."
        path="/"
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <HomeLightboxGallery />
      <StatsSection />
      <OfficeSection />
      <PartnersSection />
      <TeamSection />
      <FaqSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
