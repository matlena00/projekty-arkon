import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => (
  <footer className="bg-charcoal py-16">
    <div className="section-padding max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <Link to="/">
            <img src={logoWhite} alt="ArKon Logo" className="h-10 mb-4" />
          </Link>
          <p className="text-concrete text-sm leading-relaxed">
            Zajmujemy się kompleksową obsługą budowy. Poprowadzimy Cię przez cały proces inwestycji —
            od wyboru idealnego projektu i uzyskania pozwolenia na budowę, poprzez realizację
            i nadzór budowy, aż po uzyskanie pozwolenia na użytkowanie.
            Wszyscy specjaliści w jednym miejscu, a Twoja inwestycja w dobrych rękach.
          </p>
        </div>

        <div>
          <h5 className="font-display font-700 text-primary-foreground mb-4 text-sm uppercase tracking-wider">Nawigacja</h5>
          <div className="space-y-2 text-concrete text-sm">
            <Link to="/" className="block hover:text-accent transition-colors">Home</Link>
            <Link to="/o-nas" className="block hover:text-accent transition-colors">O nas</Link>
            <Link to="/uslugi" className="block hover:text-accent transition-colors">Usługi</Link>
            <Link to="/galeria" className="block hover:text-accent transition-colors">Galeria</Link>
            <Link to="/blog" className="block hover:text-accent transition-colors">Blog</Link>
            <Link to="/kontakt" className="block hover:text-accent transition-colors">Kontakt</Link>
          </div>
        </div>

        <div>
          <h5 className="font-display font-700 text-primary-foreground mb-4 text-sm uppercase tracking-wider">Kontakt</h5>
          <div className="space-y-2 text-concrete text-sm">
            <a href="tel:+48888899366" className="block hover:text-accent transition-colors">+48 888 899 366</a>
            <a href="tel:+48889406116" className="block hover:text-accent transition-colors">+48 889 406 116</a>
            <a href="mailto:biuro@projekty-arkon.pl" className="block hover:text-accent transition-colors break-words">biuro@projekty-arkon.pl</a>
            <p>Pon – Pt: 8:00 – 16:00</p>
            <p>Sb: 8:00 – 12:00</p>
          </div>
        </div>

        <div>
          <h5 className="font-display font-700 text-primary-foreground mb-4 text-sm uppercase tracking-wider">Usługi</h5>
          <div className="space-y-2 text-concrete text-sm">
            <p>Projekty indywidualne</p>
            <p>Adaptacje projektów</p>
            <p>Projekty branżowe</p>
            <p>Geodezja</p>
            <p>Nadzór budowy</p>
            <p>Obsługa inwestycji</p>
            <p>Projekty wnętrz</p>
            <p>Ekspertyzy i opinie</p>
          </div>
        </div>
      </div>

      <div className="border-t border-concrete/20 pt-8 text-center">
        <p className="text-concrete/60 text-xs tracking-wider">
          Wszelkie prawa zastrzeżone © Biuro Projektowe ArKon
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
