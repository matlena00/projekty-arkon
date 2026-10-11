import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, webPageLd } from "@/lib/schema";
import { openCookieSettings } from "@/lib/cookieConsent";

const LAST_UPDATED = "11 października 2026 r.";

// Dane administratora (pełna nazwa firmy, NIP i REGON potwierdzone przez właściciela).
const ADMIN = {
  legalName: "Biuro Projektowe ArKon Łukasz Matlęga",
  businessName: "Biuro Projektowe ArKon",
  address: "Żegocina 149, 32-731 Żegocina",
  nip: "8681860801",
  regon: "369736985",
  email: "biuro@projekty-arkon.pl",
  phones: [
    { label: "+48 888 899 366", href: "tel:+48888899366" },
    { label: "+48 889 406 116", href: "tel:+48889406116" },
  ],
};

const GA_ID = "G-6GWQV8TTNG";

const linkCls = "text-accent font-semibold hover:underline underline-offset-4";

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
    {children}
  </a>
);

const Mail = () => (
  <a href={`mailto:${ADMIN.email}`} className={linkCls}>
    {ADMIN.email}
  </a>
);

const Bullets = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-4">
        <span className="mt-[0.8em] h-px w-6 shrink-0 bg-accent" aria-hidden />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Section = ({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-32">
    <div className="flex items-center gap-4 mb-4">
      <span className="text-accent text-xs font-semibold tracking-[0.3em]">{n}</span>
      <div className="gold-line-wide" />
    </div>
    <h2 className="heading-display text-foreground text-2xl md:text-3xl mb-6">{title}</h2>
    <div className="space-y-5 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const SubHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="font-display font-700 text-foreground text-lg pt-2">{children}</h3>
);

const CookieSettingsButton = () => (
  <button
    type="button"
    onClick={openCookieSettings}
    className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
  >
    <Cookie size={16} />
    Ustawienia plików cookies
  </button>
);

const toc = [
  { id: "administrator", title: "Administrator danych" },
  { id: "zakres-danych", title: "Jakie dane przetwarzamy i skąd je mamy" },
  { id: "cele", title: "Cele, podstawy prawne i okres przechowywania" },
  { id: "odbiorcy", title: "Odbiorcy danych" },
  { id: "poza-eog", title: "Przekazywanie danych poza EOG" },
  { id: "prawa", title: "Twoje prawa" },
  { id: "narzedzia", title: "Narzędzia i serwisy zewnętrzne" },
  { id: "cookies", title: "Pliki cookies" },
  { id: "bezpieczenstwo", title: "Bezpieczeństwo danych" },
  { id: "zmiany", title: "Zmiany polityki prywatności" },
];

const purposes: { title: string; what?: ReactNode; basis: ReactNode; period: ReactNode }[] = [
  {
    title: "Odpowiedź na wiadomość i przygotowanie oferty",
    what: "Obsługa zapytań z formularza kontaktowego, wiadomości e-mail i rozmów telefonicznych, przygotowanie wyceny lub oferty.",
    basis: (
      <>
        art. 6 ust. 1 lit. b RODO - działania podejmowane na Twoje żądanie przed zawarciem umowy; przy pytaniach
        niezwiązanych z zawarciem umowy - art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes, czyli udzielenie
        odpowiedzi i prowadzenie korespondencji).
      </>
    ),
    period:
      "Do zakończenia korespondencji, a jeśli nie dojdzie do zawarcia umowy - nie dłużej niż 12 miesięcy od ostatniego kontaktu (na wypadek powrotu do rozmowy).",
  },
  {
    title: "Zawarcie i wykonanie umowy",
    what: "Realizacja usług: projekty indywidualne i adaptacje projektów, projekty branżowe, geodezja, pełnienie funkcji kierownika budowy i nadzoru, obsługa formalności w urzędach (również na podstawie pełnomocnictwa).",
    basis: (
      <>
        art. 6 ust. 1 lit. b RODO; gdy stroną umowy jest firma lub inna osoba, a przetwarzamy dane jej pracowników lub
        pełnomocników - art. 6 ust. 1 lit. f RODO (sprawna realizacja umowy i kontakt).
      </>
    ),
    period: "Przez czas wykonywania umowy, a następnie do upływu terminów przedawnienia roszczeń.",
  },
  {
    title: "Obowiązki podatkowe i rachunkowe",
    what: "Wystawianie faktur, prowadzenie ewidencji księgowych i przechowywanie dokumentów rozliczeniowych.",
    basis: "art. 6 ust. 1 lit. c RODO w związku z przepisami prawa podatkowego (m.in. Ordynacją podatkową i ustawą o VAT) oraz przepisami o rachunkowości.",
    period: "5 lat, licząc od końca roku kalendarzowego, w którym upłynął termin płatności podatku.",
  },
  {
    title: "Ustalenie, dochodzenie i obrona roszczeń",
    basis: "art. 6 ust. 1 lit. f RODO - nasz prawnie uzasadniony interes w ochronie praw.",
    period:
      "Do upływu terminów przedawnienia roszczeń z Kodeksu cywilnego - co do zasady 6 lat, a dla roszczeń związanych z prowadzeniem działalności gospodarczej 3 lata (koniec terminu przypada na ostatni dzień roku kalendarzowego); w razie sporu - do prawomocnego zakończenia postępowania.",
  },
  {
    title: "Statystyki odwiedzin (Google Analytics)",
    what: "Sprawdzanie, jak korzystasz ze strony (odsłony, źródła wejść, przewijanie), aby ją ulepszać.",
    basis: (
      <>
        Twoja zgoda - art. 6 ust. 1 lit. a RODO w związku z art. 399 ustawy Prawo komunikacji elektronicznej. Bez zgody
        Google Analytics nie zapisuje plików cookies, a do Google trafiają jedynie podstawowe informacje o odsłonach bez
        trwałych identyfikatorów (tzw. tryb zgody Google) - na podstawie art. 6 ust. 1 lit. f RODO, czyli naszego
        prawnie uzasadnionego interesu w prowadzeniu podstawowych statystyk strony.
      </>
    ),
    period: (
      <>
        Do czasu wycofania zgody; dane w Google Analytics - nie dłużej niż 14 miesięcy. Czas życia poszczególnych plików
        cookies podajemy w <a href="#cookies" className={linkCls}>pkt 8</a>.
      </>
    ),
  },
  {
    title: "Bezpieczeństwo i prawidłowe działanie strony",
    what: "Utrzymanie strony, logi serwera, ochrona przed spamem i nadużyciami (np. ukryte pole antyspamowe w formularzu, filtry antyspamowe dostawcy formularza).",
    basis: "art. 6 ust. 1 lit. f RODO - nasz prawnie uzasadniony interes w zapewnieniu bezpieczeństwa strony.",
    period: "Logi serwera - przez krótki okres wynikający z ustawień hostingodawcy, po którym są automatycznie usuwane.",
  },
  {
    title: "Zapamiętanie i wykazanie Twoich wyborów dotyczących cookies",
    basis: "art. 6 ust. 1 lit. c RODO w związku z art. 7 ust. 1 RODO (obowiązek wykazania, że zgoda została wyrażona).",
    period: "12 miesięcy - po tym czasie baner zgód wyświetli się ponownie.",
  },
  {
    title: "Mapy z lokalizacją biura i dojazdem",
    what: "Wyświetlanie mapy Google (strona główna, Kontakt) oraz mapy OpenStreetMap (strony lokalne i usługowe).",
    basis: "art. 6 ust. 1 lit. f RODO - nasz prawnie uzasadniony interes w wygodnym pokazaniu lokalizacji biura i dojazdu.",
    period: "Nie przechowujemy tych danych - otrzymuje je bezpośrednio dostawca mapy (szczegóły w pkt 7).",
  },
  {
    title: "Profil firmy na Facebooku",
    what: "Odpowiadanie na komentarze i wiadomości, komunikacja z obserwującymi i promocja naszych usług.",
    basis: "art. 6 ust. 1 lit. f RODO - nasz prawnie uzasadniony interes w komunikacji i promocji usług.",
    period: "Do usunięcia komentarza lub wiadomości albo do skutecznego wniesienia sprzeciwu.",
  },
];

type CookieRow = { name: string; provider: string; purpose: string; duration: string; kind: string };

const cookies: CookieRow[] = [
  {
    name: "cookieyes-consent",
    provider: "CookieYes (projekty-arkon.pl)",
    purpose: "Zapamiętuje Twoje wybory w banerze zgód, aby nie wyświetlał się przy każdej wizycie.",
    duration: "1 rok",
    kind: "Niezbędny",
  },
  {
    name: "__cf_bm",
    provider: "Cloudflare (infrastruktura dostawców zewnętrznych)",
    purpose: "Odróżnia ruch ludzi od automatów (botów) i chroni przed atakami.",
    duration: "1 godzina",
    kind: "Niezbędny",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Nadaje losowy identyfikator, który pozwala rozróżniać użytkowników w statystykach.",
    duration: "400 dni",
    kind: "Analityczny - tylko po zgodzie",
  },
  {
    name: `_ga_${GA_ID.slice(2)}`,
    provider: "Google Analytics",
    purpose: "Przechowuje stan sesji i zlicza odsłony.",
    duration: "400 dni",
    kind: "Analityczny - tylko po zgodzie",
  },
];

const browsers: { name: string; path: string; href: string }[] = [
  {
    name: "Google Chrome (komputer i Android)",
    path: "Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie innych firm / Usuń dane przeglądania",
    href: "https://support.google.com/chrome/answer/95647?hl=pl",
  },
  {
    name: "Mozilla Firefox",
    path: "Ustawienia → Prywatność i bezpieczeństwo → Ciasteczka i dane stron",
    href: "https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox",
  },
  {
    name: "Safari (Mac)",
    path: "Safari → Ustawienia → Prywatność → Zarządzaj danymi witryn",
    href: "https://support.apple.com/pl-pl/guide/safari/sfri11471/mac",
  },
  {
    name: "Safari (iPhone, iPad)",
    path: "Ustawienia → (Aplikacje →) Safari → Zaawansowane → Dane witryn",
    href: "https://support.apple.com/pl-pl/105082",
  },
  {
    name: "Microsoft Edge",
    path: "Ustawienia → Prywatność, wyszukiwanie i usługi / Pliki cookie i uprawnienia witryny",
    href: "https://support.microsoft.com/pl-pl/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use",
  },
  {
    name: "Opera",
    path: "Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie i inne dane witryn",
    href: "https://help.opera.com/pl/latest/web-preferences/",
  },
];

const PrivacyPolicyPage = () => (
  <main className="overflow-x-hidden">
    <Seo
      title="Polityka prywatności i plików cookies - Biuro Projektowe ArKon"
      description="Kto przetwarza Twoje dane w Biurze Projektowym ArKon, w jakim celu i jak długo, jakie masz prawa (RODO) oraz jakich plików cookies używa strona."
      path="/polityka-prywatnosci"
    />
    <JsonLd
      data={[
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Polityka prywatności", path: "/polityka-prywatnosci" },
        ]),
        webPageLd({ name: "Polityka prywatności - Biuro Projektowe ArKon", path: "/polityka-prywatnosci" }),
      ]}
    />
    <Navbar />

    <PageHeader
      label="RODO i cookies"
      title="Polityka prywatności"
      subtitle="Jak przetwarzamy dane osobowe klientów i osób odwiedzających stronę projekty-arkon.pl oraz jakich plików cookies używamy."
      accentWord="prywatność"
    />

    <section className="py-20 md:py-28 bg-background">
      <div className="section-padding max-w-3xl mx-auto space-y-16 md:space-y-20">
        <div className="space-y-8">
          <p className="text-muted-foreground text-sm">Data ostatniej aktualizacji: {LAST_UPDATED}</p>
          <nav aria-label="Spis treści" className="bg-warm-white border border-border/50 p-6 md:p-8">
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-5">Spis treści</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {toc.map((item, i) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-accent font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${item.id}`} className="text-foreground hover:text-accent transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <Section id="administrator" n="01" title="Administrator danych">
          <p>
            Administratorem Twoich danych osobowych jest{" "}
            <strong className="text-foreground">{ADMIN.legalName}</strong>, {ADMIN.address}, NIP: {ADMIN.nip}, REGON:{" "}
            {ADMIN.regon} (dalej: „ArKon”, „my”).
          </p>
          <p>Możesz się z nami skontaktować:</p>
          <Bullets
            items={[
              <>
                e-mailem: <Mail />
              </>,
              <>
                telefonicznie:{" "}
                {ADMIN.phones.map((p, i) => (
                  <span key={p.href}>
                    {i > 0 && ", "}
                    <a href={p.href} className={linkCls}>
                      {p.label}
                    </a>
                  </span>
                ))}{" "}
                (pon.-pt. 8:00-16:00, sob. 8:00-12:00),
              </>,
              <>listownie: {ADMIN.businessName}, {ADMIN.address}.</>,
            ]}
          />
          <p>
            Nie wyznaczyliśmy inspektora ochrony danych, ponieważ nie mamy takiego obowiązku (art. 37 RODO). We wszystkich
            sprawach dotyczących danych osobowych napisz do nas na adres <Mail />, najlepiej z dopiskiem „Dane osobowe” w
            temacie wiadomości.
          </p>
          <p>
            Polityka dotyczy osób odwiedzających stronę projekty-arkon.pl, osób, które kontaktują się z nami (przez
            formularz, e-mail, telefon lub Facebook), a także naszych klientów i ich pełnomocników. Stosujemy przepisy
            rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z 27 kwietnia 2016 r. (RODO), ustawy z 10 maja
            2018 r. o ochronie danych osobowych, ustawy z 12 lipca 2024 r. - Prawo komunikacji elektronicznej oraz ustawy
            z 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
          </p>
        </Section>

        <Section id="zakres-danych" n="02" title="Jakie dane przetwarzamy i skąd je mamy">
          <Bullets
            items={[
              <>
                <strong className="text-foreground">Formularz kontaktowy</strong> - imię i nazwisko, adres e-mail, temat
                i treść wiadomości oraz dane, które sam(a) w niej podasz (np. numer telefonu, lokalizację lub numer
                działki).
              </>,
              <>
                <strong className="text-foreground">Kontakt e-mailowy i telefoniczny</strong> - adres e-mail lub numer
                telefonu, imię i nazwisko, treść korespondencji i informacje przekazane w rozmowie.
              </>,
              <>
                <strong className="text-foreground">Realizacja zlecenia</strong> - dane identyfikacyjne i adresowe
                inwestora lub jego pełnomocnika, dane kontaktowe, dane nieruchomości (adres, numer działki ewidencyjnej,
                numer księgi wieczystej), dane do faktury (w tym NIP) oraz inne informacje potrzebne do sporządzenia
                projektu, uzyskania decyzji administracyjnych (np. pozwolenia na budowę) i prowadzenia budowy.
              </>,
              <>
                <strong className="text-foreground">Korzystanie ze strony</strong> - adres IP, informacje o przeglądarce
                i urządzeniu, data i godzina wizyty, odwiedzane podstrony, adres strony, z której trafiłeś(-aś) do nas,
                oraz identyfikatory zapisane w plikach cookies (te ostatnie - wyłącznie po wyrażeniu zgody).
              </>,
            ]}
          />
          <p>
            Dane otrzymujemy przede wszystkim bezpośrednio od Ciebie. W związku z realizacją zlecenia możemy je także
            pozyskać z publicznych rejestrów (np. ewidencji gruntów i budynków lub ksiąg wieczystych) albo od osoby, która
            zleciła nam usługę - w zakresie potrzebnym do wykonania umowy.
          </p>
          <p>
            Podanie danych jest dobrowolne, ale bez nich nie odpowiemy na wiadomość ani nie przygotujemy oferty. Podanie
            danych potrzebnych do zawarcia i wykonania umowy jest warunkiem jej zawarcia, a podanie danych do faktury -
            wymogiem ustawowym. Prosimy, nie przekazuj nam danych o zdrowiu ani innych danych szczególnych kategorii, jeśli
            nie jest to konieczne.
          </p>
        </Section>

        <Section id="cele" n="03" title="Cele, podstawy prawne i okres przechowywania">
          <div className="space-y-4">
            {purposes.map((p) => (
              <div key={p.title} className="bg-warm-white border border-border/50 p-6">
                <h3 className="font-display font-700 text-foreground text-lg mb-3">{p.title}</h3>
                {p.what && <p className="mb-4">{p.what}</p>}
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-1">Podstawa prawna</dt>
                    <dd>{p.basis}</dd>
                  </div>
                  <div>
                    <dt className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-1">
                      Okres przechowywania
                    </dt>
                    <dd>{p.period}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p>
            Po upływie wskazanych okresów dane usuwamy lub anonimizujemy. Gdy te same dane przetwarzamy w kilku celach,
            przechowujemy je do upływu najdłuższego z okresów.
          </p>
          <p>
            Nie podejmujemy decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu, które
            wywoływałyby wobec Ciebie skutki prawne lub w podobny sposób istotnie na Ciebie wpływały. Nie sprzedajemy
            danych i nie wysyłamy informacji handlowych bez Twojej zgody.
          </p>
        </Section>

        <Section id="odbiorcy" n="04" title="Odbiorcy danych">
          <p>
            Dostęp do danych mają wyłącznie upoważnieni pracownicy i współpracownicy ArKon, zobowiązani do zachowania ich
            w poufności. Dane możemy przekazywać:
          </p>
          <Bullets
            items={[
              <>
                <strong className="text-foreground">dostawcom usług informatycznych</strong>, którzy przetwarzają je w
                naszym imieniu na podstawie umów powierzenia przetwarzania (art. 28 RODO):
                <span className="block mt-3 space-y-2 pl-4 border-l border-accent/30">
                  <span className="block">SEOHOST.pl (Poznań) - hosting strony, serwery w Polsce;</span>
                  <span className="block">
                    Google Ireland Limited - poczta e-mail i narzędzia biurowe (Google Workspace), Google Tag Manager,
                    Google Analytics;
                  </span>
                  <span className="block">
                    Web3Forms (Web3Creative, Indie) - przekazywanie wiadomości z formularza na naszą skrzynkę e-mail;
                  </span>
                  <span className="block">CookieYes Limited (Wielka Brytania) - zarządzanie zgodami na pliki cookies;</span>
                  <span className="block">
                    Supabase, Inc. (USA) - baza danych, z której strona pobiera treści (realizacje, blog);
                  </span>
                </span>
              </>,
              <>
                <strong className="text-foreground">dostawcom map</strong> - Google (Mapy Google) i OpenStreetMap
                Foundation, którzy wyświetlają mapę bezpośrednio w Twojej przeglądarce i otrzymują Twój adres IP;
              </>,
              <>
                <strong className="text-foreground">podmiotom świadczącym nam usługi</strong> księgowe, prawne i doradcze;
              </>,
              <>
                <strong className="text-foreground">partnerom i podwykonawcom</strong> uczestniczącym w realizacji
                zlecenia (np. projektantom branżowym, geodetom, rzeczoznawcom) - w zakresie potrzebnym do wykonania umowy;
              </>,
              <>
                <strong className="text-foreground">organom administracji i gestorom sieci</strong> (np. starostwu,
                urzędowi gminy, powiatowemu inspektorowi nadzoru budowlanego, dostawcom energii, wody i gazu) - gdy na
                Twoje zlecenie występujemy w Twoim imieniu;
              </>,
              <>
                <strong className="text-foreground">operatorom pocztowym, firmom kurierskim i bankom</strong> - w zakresie
                potrzebnym do doręczenia dokumentów i rozliczeń;
              </>,
              <>
                <strong className="text-foreground">organom uprawnionym</strong> do otrzymania danych na podstawie
                przepisów prawa.
              </>,
            ]}
          />
        </Section>

        <Section id="poza-eog" n="05" title="Przekazywanie danych poza EOG">
          <p>
            Część naszych dostawców ma siedzibę lub serwery poza Europejskim Obszarem Gospodarczym (m.in. w USA, Wielkiej
            Brytanii i Indiach). W takich przypadkach dane przekazujemy wyłącznie przy zapewnieniu odpowiednich
            zabezpieczeń:
          </p>
          <Bullets
            items={[
              "na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony (art. 45 RODO) - dotyczy to Wielkiej Brytanii oraz firm z USA certyfikowanych w programie EU-US Data Privacy Framework (np. Google LLC);",
              "na podstawie standardowych klauzul umownych przyjętych przez Komisję Europejską (art. 46 ust. 2 lit. c RODO) - w pozostałych przypadkach, w tym przy usłudze Web3Forms.",
            ]}
          />
          <p>
            Kopię zastosowanych zabezpieczeń możesz otrzymać, pisząc na adres <Mail />.
          </p>
        </Section>

        <Section id="prawa" n="06" title="Twoje prawa">
          <p>W związku z przetwarzaniem danych masz prawo do:</p>
          <Bullets
            items={[
              <>
                <strong className="text-foreground">dostępu do danych</strong> i otrzymania ich kopii (art. 15 RODO);
              </>,
              <>
                <strong className="text-foreground">sprostowania</strong> danych nieprawidłowych i uzupełnienia
                niekompletnych (art. 16 RODO);
              </>,
              <>
                <strong className="text-foreground">usunięcia danych</strong> („prawo do bycia zapomnianym”) - gdy nie ma
                już podstawy do ich przetwarzania (art. 17 RODO);
              </>,
              <>
                <strong className="text-foreground">ograniczenia przetwarzania</strong> - np. na czas wyjaśnienia, czy
                dane są prawidłowe (art. 18 RODO);
              </>,
              <>
                <strong className="text-foreground">przenoszenia danych</strong> - otrzymania ich w ustrukturyzowanym,
                powszechnie używanym formacie lub przesłania innemu administratorowi; dotyczy danych przetwarzanych
                automatycznie na podstawie zgody lub umowy (art. 20 RODO);
              </>,
              <>
                <strong className="text-foreground">sprzeciwu</strong> wobec przetwarzania opartego na naszym prawnie
                uzasadnionym interesie (art. 6 ust. 1 lit. f RODO) - z przyczyn związanych z Twoją szczególną sytuacją
                (art. 21 RODO);
              </>,
              <>
                <strong className="text-foreground">wycofania zgody</strong> w dowolnym momencie, bez wpływu na zgodność z
                prawem przetwarzania dokonanego przed jej wycofaniem (art. 7 ust. 3 RODO) - zgodę na pliki cookies
                wycofasz przyciskiem „Ustawienia plików cookies” w <a href="#cookies" className={linkCls}>pkt 8</a> lub w
                stopce strony;
              </>,
              <>
                <strong className="text-foreground">wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych</strong>{" "}
                (ul. Stawki 2, 00-193 Warszawa, <ExtLink href="https://uodo.gov.pl">uodo.gov.pl</ExtLink>), jeśli
                uważasz, że przetwarzamy Twoje dane niezgodnie z prawem (art. 77 RODO).
              </>,
            ]}
          />
          <p>
            Aby skorzystać z praw, napisz na adres <Mail /> lub wyślij list na adres biura. Odpowiemy bez zbędnej zwłoki,
            nie później niż w ciągu miesiąca od otrzymania żądania. Przy żądaniach skomplikowanych lub licznych termin ten
            możemy przedłużyć o kolejne dwa miesiące - poinformujemy Cię o tym w ciągu miesiąca. Możemy poprosić o
            informacje potrzebne do potwierdzenia Twojej tożsamości. Realizacja praw jest bezpłatna.
          </p>
        </Section>

        <Section id="narzedzia" n="07" title="Narzędzia i serwisy zewnętrzne">
          <SubHeading>Google Tag Manager i Google Analytics 4</SubHeading>
          <p>
            Google Tag Manager służy do zarządzania skryptami na stronie i sam nie zapisuje analitycznych plików cookies.
            Za jego pomocą uruchamiamy Google Analytics 4 (usługa {GA_ID}) w trybie zgody Google (Consent Mode): dopóki
            nie wyrazisz zgody, przechowywanie danych analitycznych i reklamowych jest zablokowane. Na stronie nie działają
            skrypty reklamowe ani remarketingowe. Dostawcą usług jest Google Ireland Limited, Gordon House, Barrow Street,
            Dublin 4, Irlandia.
          </p>
          <p>
            Więcej informacji: <ExtLink href="https://policies.google.com/privacy?hl=pl">polityka prywatności Google</ExtLink>
            ,{" "}
            <ExtLink href="https://policies.google.com/technologies/partner-sites?hl=pl">
              jak Google wykorzystuje dane z witryn partnerów
            </ExtLink>
            . Możesz też zainstalować{" "}
            <ExtLink href="https://tools.google.com/dlpage/gaoptout?hl=pl">
              dodatek do przeglądarki blokujący Google Analytics
            </ExtLink>
            .
          </p>

          <SubHeading>CookieYes - baner zgód</SubHeading>
          <p>
            Baner i panel ustawień plików cookies obsługuje CookieYes Limited (Wielka Brytania). Narzędzie zapisuje Twoje
            wybory w pliku cookie i prowadzi rejestr zgód (losowy identyfikator zgody, data oraz wybrane kategorie), który
            pozwala nam wykazać, że zgoda została wyrażona.{" "}
            <ExtLink href="https://www.cookieyes.com/privacy-policy/">Polityka prywatności CookieYes</ExtLink>.
          </p>

          <SubHeading>Formularz kontaktowy - Web3Forms</SubHeading>
          <p>
            Wiadomości z formularza przekazuje na naszą skrzynkę e-mail usługa Web3Forms (Web3Creative, Indie), działająca
            jako podmiot przetwarzający na podstawie umowy powierzenia i standardowych klauzul umownych. Dostawca korzysta
            z infrastruktury Amazon Web Services, Cloudflare i Hetzner, a w celu ochrony przed spamem przekazuje adres IP i
            adres e-mail nadawcy do usług CleanTalk i Akismet. Kopie wiadomości przechowywane u dostawcy usuwamy zgodnie z
            okresami wskazanymi w <a href="#cele" className={linkCls}>pkt 3</a>.{" "}
            <ExtLink href="https://web3forms.com/privacy">Polityka prywatności Web3Forms</ExtLink>.
          </p>

          <SubHeading>Mapy Google i OpenStreetMap</SubHeading>
          <p>
            Na stronie głównej i w zakładce <Link to="/kontakt" className={linkCls}>Kontakt</Link> osadzamy mapę Google,
            która wczytuje się razem z podstroną. Google otrzymuje wtedy Twój adres IP i informacje o przeglądarce, a może
            też odczytać lub zapisać własne pliki cookies (np. NID) - szczególnie gdy jesteś zalogowany(-a) na konto Google.
            Na stronach lokalnych i usługowych mapę dojazdu wyświetlamy z serwerów OpenStreetMap Foundation (Wielka
            Brytania), która otrzymuje Twój adres IP, ale nie zapisuje plików cookies. Przycisk wyznaczania trasy otwiera
            Mapy Google dopiero po kliknięciu.
          </p>
          <p>
            Więcej informacji:{" "}
            <ExtLink href="https://policies.google.com/technologies/cookies?hl=pl">pliki cookies Google</ExtLink>,{" "}
            <ExtLink href="https://osmfoundation.org/wiki/Privacy_Policy">polityka prywatności OpenStreetMap Foundation</ExtLink>
            .
          </p>

          <SubHeading>Treści strony - Supabase</SubHeading>
          <p>
            Opisy realizacji, zdjęcia i wpisy na blogu przechowujemy w bazie danych Supabase, Inc. (USA). Przy wczytywaniu
            tych treści Twoja przeglądarka łączy się z serwerami Supabase, które otrzymują adres IP i dane techniczne
            przeglądarki. Do Supabase nie trafiają dane z formularza kontaktowego.{" "}
            <ExtLink href="https://supabase.com/privacy">Polityka prywatności Supabase</ExtLink>.
          </p>

          <SubHeading>Czcionki</SubHeading>
          <p>
            Kroje pisma (fonty) udostępniamy z naszego serwera - nie korzystamy z Google Fonts, więc wyświetlenie strony nie
            przekazuje w tym celu Twojego adresu IP do Google.
          </p>

          <SubHeading>Profil na Facebooku</SubHeading>
          <p>
            Prowadzimy profil{" "}
            <ExtLink href="https://www.facebook.com/BiuroProjektoweArKon">Biuro Projektowe ArKon na Facebooku</ExtLink>.
            Dane osób, które obserwują profil, komentują, reagują lub piszą do nas, przetwarzamy w celach opisanych w{" "}
            <a href="#cele" className={linkCls}>pkt 3</a>. W zakresie statystyk profilu (Page Insights) jesteśmy
            współadministratorem danych razem z Meta Platforms Ireland Limited (art. 26 RODO) - zasady określa{" "}
            <ExtLink href="https://www.facebook.com/legal/terms/page_controller_addendum">
              dodatek dotyczący administratora danych w statystykach strony
            </ExtLink>
            . Pozostałe dane Meta przetwarza jako odrębny administrator zgodnie ze swoją{" "}
            <ExtLink href="https://www.facebook.com/privacy/policy/">polityką prywatności</ExtLink>. Na stronie
            projekty-arkon.pl nie używamy piksela Meta ani wtyczek społecznościowych Facebooka.
          </p>
        </Section>

        <Section id="cookies" n="08" title="Pliki cookies">
          <p>
            Pliki cookies (ciasteczka) to niewielkie pliki tekstowe, które przeglądarka zapisuje na Twoim urządzeniu
            podczas korzystania ze strony. Pozwalają m.in. zapamiętać Twoje ustawienia i zbierać statystyki odwiedzin.
            Mogą być własne (zapisywane przez naszą stronę) lub podmiotów trzecich, a także sesyjne (usuwane po zamknięciu
            przeglądarki) lub stałe (przechowywane przez określony czas).
          </p>
          <p>
            Zgodnie z art. 399 ustawy Prawo komunikacji elektronicznej pliki niezbędne do działania strony stosujemy bez
            Twojej zgody, a pozostałe - wyłącznie po jej wyrażeniu w banerze, który wyświetla się przy pierwszej wizycie.
            Do czasu podjęcia decyzji pliki analityczne są zablokowane. Swoją decyzję możesz w każdej chwili zmienić:
          </p>
          <div>
            <CookieSettingsButton />
          </div>

          <SubHeading>Rodzaje plików cookies</SubHeading>
          <Bullets
            items={[
              <>
                <strong className="text-foreground">Niezbędne</strong> - zapewniają podstawowe działanie i bezpieczeństwo
                strony oraz zapamiętują Twoje wybory dotyczące zgód. Nie wymagają zgody.
              </>,
              <>
                <strong className="text-foreground">Analityczne</strong> - pozwalają nam sprawdzać, jak korzystasz ze
                strony (Google Analytics). Zapisujemy je tylko po wyrażeniu zgody.
              </>,
              <>
                <strong className="text-foreground">Funkcjonalne, wydajnościowe i reklamowe</strong> - kategorie widoczne
                w banerze zgód; obecnie nie używamy plików z tych kategorii.
              </>,
            ]}
          />

          <SubHeading>Pliki cookies używane na stronie</SubHeading>
          {/* Telefon: karty; od md: tabela */}
          <div className="space-y-3 md:hidden">
            {cookies.map((c) => (
              <dl key={c.name} className="bg-warm-white border border-border/50 p-5 text-sm space-y-2">
                <dt className="font-mono text-foreground font-semibold break-all">{c.name}</dt>
                <dd>{c.purpose}</dd>
                <dd className="text-xs">
                  {c.provider} · {c.duration} · <span className="text-foreground">{c.kind}</span>
                </dd>
              </dl>
            ))}
          </div>
          <div className="hidden md:block border border-border/50">
            <table className="w-full text-sm text-left">
              <thead className="bg-warm-white text-foreground">
                <tr>
                  <th scope="col" className="p-4 font-semibold w-[32%]">Plik i rodzaj</th>
                  <th scope="col" className="p-4 font-semibold">Dostawca i cel</th>
                  <th scope="col" className="p-4 font-semibold w-[16%]">Czas</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((c) => (
                  <tr key={c.name} className="border-t border-border/50 align-top">
                    <td className="p-4">
                      <span className="block font-mono text-foreground font-semibold break-all">{c.name}</span>
                      <span className="block text-xs mt-1">{c.kind}</span>
                    </td>
                    <td className="p-4">
                      <span className="block text-foreground">{c.provider}</span>
                      <span className="block mt-1">{c.purpose}</span>
                    </td>
                    <td className="p-4">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Osadzona mapa Google może dodatkowo zapisać pliki cookies Google (np. NID, AEC, SOCS) w domenie google.com.
            Są to pliki podmiotu trzeciego, na które nie mamy wpływu - ich opis znajdziesz w{" "}
            <ExtLink href="https://policies.google.com/technologies/cookies?hl=pl">informacjach Google o plikach cookies</ExtLink>
            . Strona nie zapisuje danych odwiedzających w pamięci lokalnej przeglądarki (localStorage); korzysta z niej
            tylko panel administracyjny, do którego logują się upoważnieni pracownicy.
          </p>

          <SubHeading>Jak zmienić ustawienia cookies w przeglądarce</SubHeading>
          <p>
            Zapisane pliki cookies możesz w każdej chwili usunąć, a ich zapisywanie - ograniczyć lub zablokować w
            ustawieniach przeglądarki. Zablokowanie plików niezbędnych nie uniemożliwi korzystania ze strony, ale baner zgód
            będzie wyświetlał się przy każdej wizycie. Instrukcje dla popularnych przeglądarek:
          </p>
          <Bullets
            items={browsers.map((b) => (
              <>
                <ExtLink href={b.href}>{b.name}</ExtLink>
                <span className="block text-sm">{b.path}</span>
              </>
            ))}
          />
          <p>
            W innych przeglądarkach szukaj ustawień w sekcji „Prywatność” lub „Pliki cookies”, a w razie wątpliwości
            skorzystaj z pomocy producenta przeglądarki.
          </p>
        </Section>

        <Section id="bezpieczenstwo" n="09" title="Bezpieczeństwo danych">
          <p>
            Stosujemy środki techniczne i organizacyjne odpowiednie do ryzyka (art. 32 RODO): szyfrowane połączenie HTTPS
            na całej stronie, dostęp do danych wyłącznie dla upoważnionych osób, zabezpieczenie panelu administracyjnego
            logowaniem, zabezpieczenia antyspamowe formularza oraz umowy powierzenia z dostawcami usług, którzy
            gwarantują ochronę danych.
          </p>
          <p>
            Strona zawiera linki do innych serwisów (np. Map Google i Facebooka). Po przejściu do nich obowiązują zasady
            prywatności ich operatorów.
          </p>
        </Section>

        <Section id="zmiany" n="10" title="Zmiany polityki prywatności">
          <p>
            Politykę aktualizujemy, gdy zmieniają się przepisy, zakres naszych usług lub narzędzia używane na stronie.
            Aktualna wersja jest zawsze dostępna pod adresem projekty-arkon.pl/polityka-prywatnosci, a data ostatniej
            zmiany widnieje na początku dokumentu. W razie pytań napisz do nas: <Mail />.
          </p>
        </Section>
      </div>
    </section>

    <Footer />
  </main>
);

export default PrivacyPolicyPage;
