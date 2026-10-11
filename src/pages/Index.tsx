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
        title="Biuro projektowe ArKon - projekty domów i budynków usługowych | Bochnia, Limanowa, Brzesko, Wieliczka"
        description="Projekty domów jednorodzinnych i budynków usługowych, adaptacje projektów gotowych, kierownik budowy. Bochnia, Limanowa, Brzesko, Wieliczka. Tel. 888 899 366."
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
