// Treści stron lokalnych /biuro-projektowe-<miasto> — jeden szablon (LocalOfficePage),
// tu tylko unikalna treść per miasto (przeniesiona 1:1 z makiet w /makiety).

export interface LocalService {
  title: string;
  desc: string;
  to: string;
}

export interface LocalRealization {
  caption: string;
  /** Typ obiektu + lokalizacja — bez opisu, zgodnie z uwagami klienta */
  title: string;
  href?: string;
}

export interface LocalPageData {
  slug: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  breadcrumbName: string;
  h1: string;
  lead: string;
  heroCaption: string;
  knowledgeTitle: string;
  knowledgeParagraphs: string[];
  servicesTitle: string;
  services: LocalService[];
  realizationsTitle: string;
  realizations: LocalRealization[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaNote: string;
  /** Miasta/gminy do areaServed w schema */
  areaServed: string[];
}

const SERVICE_PATHS = {
  indywidualne: "/uslugi/projekty-indywidualne",
  adaptacje: "/uslugi/adaptacja-projektu",
  kierownik: "/uslugi/kierownik-budowy",
  uslugi: "/uslugi",
};

export const localPages: Record<string, LocalPageData> = {
  bochnia: {
    slug: "bochnia",
    path: "/biuro-projektowe-bochnia",
    seoTitle: "Biuro projektowe Bochnia — projekty domów i adaptacje | ArKon",
    seoDescription:
      "Architekt i kierownik budowy dla Bochni i okolic — 25 min od centrum. Projekty indywidualne, adaptacje, nadzór budowy. Bezpłatna konsultacja: 888 899 366.",
    breadcrumbName: "Biuro projektowe Bochnia",
    h1: "Biuro projektowe dla Bochni i powiatu bocheńskiego",
    lead: "Projekty domów, adaptacje projektów gotowych i kierownik budowy z uprawnieniami — 25 minut od centrum Bochni. Projektowaliśmy tu zarówno domy jednorodzinne, jak i całe osiedla mieszkaniowe, kompleksowo prowadząc inwestycje od projektu aż po realizację.",
    heroCaption: "ZDJĘCIE: osiedle domów w Bochni (jest w galerii)",
    knowledgeTitle: "Znamy Bochnię od strony, której nie widać na mapie",
    knowledgeParagraphs: [
      "Nasze biuro leży w Żegocinie — 20 km od Bochni, w granicach powiatu bocheńskiego. Sprawy urzędowe naszych klientów załatwiamy w Starostwie Powiatowym w Bochni od lat, więc wiemy, jak przygotować wniosek, żeby przeszedł bez wezwań do uzupełnień.",
      "Pracowaliśmy na planach miejscowych Bochni i okolicznych gmin — Rzezawy, Łapanowa, Nowego Wiśnicza, Lipnicy Murowanej czy Trzciany. Wiemy, gdzie plan dopuszcza dach dwuspadowy o niskim kącie, a gdzie konserwator ma coś do powiedzenia.",
      "Na budowę w Bochni i okolicach dojeżdżamy w ok. 25 minut — to ważne, gdy kierownik budowy ma być na odbiorze zbrojenia „na jutro rano”.",
    ],
    servicesTitle: "W czym pomagamy inwestorom z Bochni",
    services: [
      { title: "Projekty indywidualne", desc: "Dom zaprojektowany pod Waszą działkę — od koncepcji z wizualizacjami po pozwolenie na budowę.", to: SERVICE_PATHS.indywidualne },
      { title: "Adaptacje projektów", desc: "Dostosujemy projekt z katalogu do działki i planu miejscowego. Komplet formalności po naszej stronie.", to: SERVICE_PATHS.adaptacje },
      { title: "Kierownik budowy", desc: "Uprawnienia konstrukcyjno-budowlane, dziennik budowy, odbiory — aż do pozwolenia na użytkowanie.", to: SERVICE_PATHS.kierownik },
      { title: "Geodezja i formalności", desc: "Mapy do celów projektowych, analizy działek, warunki zabudowy, legalizacje samowoli.", to: SERVICE_PATHS.uslugi },
    ],
    realizationsTitle: "Nasze projekty w Bochni i okolicach",
    realizations: [
      { caption: "FOTO: osiedle domów, Bochnia", title: "Osiedle domów, Bochnia" },
      { caption: "FOTO: Sobolów", title: "Dom jednorodzinny, Sobolów" },
      { caption: "FOTO: Olchawa", title: "Dom jednorodzinny, Olchawa" },
    ],
    faqTitle: "Budowa domu w Bochni — pytania, które słyszymy najczęściej",
    faqs: [
      {
        q: "Gdzie w Bochni załatwia się pozwolenie na budowę?",
        a: "W Wydziale Architektury i Budownictwa Starostwa Powiatowego w Bochni. Jeśli prowadzimy Waszą sprawę, wniosek składamy i pilotujemy my — Wy podpisujecie tylko pełnomocnictwo.",
      },
      {
        q: "Czy moja działka w Bochni jest objęta planem miejscowym?",
        a: "Duża część miasta i gmin powiatu ma obowiązujące plany miejscowe, ale nie wszystkie tereny. Tam, gdzie planu nie ma, potrzebna jest decyzja o warunkach zabudowy — sprawdzimy to bezpłatnie po numerze działki.",
      },
      {
        q: "Ile kosztuje adaptacja projektu w powiecie bocheńskim?",
        a: "Tyle samo co wszędzie u nas — cena zależy od zakresu zmian i dokumentów, nie od gminy. Po analizie działki podajemy jedną kwotę za całość: mapa, badania gruntu, adaptacja, wniosek.",
      },
      {
        q: "Czy dojeżdżacie na budowy w Bochni jako kierownik budowy?",
        a: "Tak — Bochnia i cały powiat bocheński to nasz podstawowy teren działania. Na budowie jesteśmy w ok. 25 minut od telefonu.",
      },
    ],
    ctaTitle: "Budujecie w Bochni lub okolicy?",
    ctaText: "Zadzwońcie z numerem działki — bezpłatnie sprawdzimy, co można na niej wybudować.",
    ctaNote: "ArKon · Żegocina 149 · 20 km od Bochni",
    areaServed: ["Bochnia", "Rzezawa", "Łapanów", "Nowy Wiśnicz", "Lipnica Murowana", "Trzciana"],
  },

  limanowa: {
    slug: "limanowa",
    path: "/biuro-projektowe-limanowa",
    seoTitle: "Biuro projektowe Limanowa — projekty domów w górach | ArKon",
    seoDescription:
      "Projekty domów na działkach ze spadkiem, adaptacje i kierownik budowy — 20 min od Limanowej. Znamy teren górski i osuwiska. Bezpłatna konsultacja: 888 899 366.",
    breadcrumbName: "Biuro projektowe Limanowa",
    h1: "Biuro projektowe dla Limanowej i Beskidu Wyspowego",
    lead: "Projektujemy domy tam, gdzie katalogowe projekty się poddają: działki ze spadkiem, tereny osuwiskowe, widoki na góry. Biuro mamy w Żegocinie — 20 minut od Limanowej, po tej samej, górskiej stronie świata.",
    heroCaption: "ZDJĘCIE: dom na 600 m n.p.m. z widokiem na Tatry — Wasza realizacja, idealna tutaj",
    knowledgeTitle: "Budowa w powiecie limanowskim to inna dyscyplina",
    knowledgeParagraphs: [
      "Kto projektował tylko „na płaskim”, tego teren limanowski potrafi zaskoczyć: spadki kilkunastu procent, strefy osuwiskowe wpisane do rejestrów, wyższe obciążenie śniegiem, dojazdy, które zimą weryfikują każdy plan budowy. My w takim terenie pracujemy na co dzień — Żegocina leży na granicy Beskidu Wyspowego.",
      "Zanim powstanie projekt, sprawdzamy działkę pod kątem osuwisk (rejestr SOPO), nachylenia i warunków gruntowych. Fundamenty projektujemy pod konkretny stok, nie pod katalogowy przekrój. Dzięki temu dom stoi spokojnie — a Wy nie dopłacacie na budowie za „niespodzianki”.",
      "Sprawy urzędowe prowadzimy w Starostwie Powiatowym w Limanowej i okolicznych gminach: Laskowa, Tymbark, Dobra, Kamienica, Łukowica.",
    ],
    servicesTitle: "W czym pomagamy inwestorom z Limanowej",
    services: [
      { title: "Projekty indywidualne", desc: "Domy projektowane pod stok, widok i nasłonecznienie — nasza specjalność w terenie górskim.", to: SERVICE_PATHS.indywidualne },
      { title: "Adaptacje projektów", desc: "Sprawdzimy, czy projekt z katalogu przetrwa spotkanie z Waszą działką — i dostosujemy go do spadku oraz strefy śniegowej.", to: SERVICE_PATHS.adaptacje },
      { title: "Kierownik budowy", desc: "Prowadzimy budowy w całym powiecie limanowskim — z dojazdem, który nie kończy się na asfalcie.", to: SERVICE_PATHS.kierownik },
      { title: "Analizy działek", desc: "Osuwiska, spadki, dojazd, media — sprawdzimy działkę PRZED zakupem. To najtańsze ubezpieczenie budowy.", to: SERVICE_PATHS.uslugi },
    ],
    realizationsTitle: "Nasze projekty w górskim terenie",
    realizations: [
      { caption: "FOTO: baza piłkarska, Limanowa", title: "Baza piłkarska, Limanowa" },
      { caption: "FOTO: dom jednorodzinny — zdjęcie do przesłania", title: "Dom jednorodzinny" },
      { caption: "FOTO: dom jednorodzinny, Limanowa — wizualizacja do przesłania", title: "Dom jednorodzinny, Limanowa" },
    ],
    faqTitle: "Budowa domu koło Limanowej — najczęstsze pytania",
    faqs: [
      {
        q: "Jak sprawdzić, czy działka jest na terenie osuwiskowym?",
        a: "Podstawą jest rejestr SOPO (System Osłony Przeciwosuwiskowej) i zapisy planu miejscowego. Na terenach zagrożonych starostwo może wymagać dokumentacji geologiczno-inżynierskiej. Sprawdzimy Waszą działkę bezpłatnie — wystarczy numer ewidencyjny.",
      },
      {
        q: "Czy na działce ze spadkiem budowa musi być droższa?",
        a: "Nie, jeśli dom jest zaprojektowany pod stok — z częściowym podpiwniczeniem lub przesunięciem poziomów zamiast kosztownej niwelacji. Drogo robi się wtedy, gdy na stok trafia projekt katalogowy z płaskiego terenu.",
      },
      {
        q: "Czy załatwiacie formalności w urzędzie w Limanowej?",
        a: "Tak. Działamy na podstawie pełnomocnictwa i w pełni reprezentujemy naszych klientów w Starostwie Powiatowym w Limanowej. Przejmujemy na siebie cały proces biurokratyczny — od złożenia wniosku po zgłoszenie zakończenia budowy.",
      },
      {
        q: "Gdzie załatwia się formalności budowlane dla gmin powiatu limanowskiego?",
        a: "Formalności związane z pozwoleniem na budowę i zgłoszeniem robót załatwia się przede wszystkim w Starostwie Powiatowym w Limanowej — w Wydziale Architektury i Budownictwa. W zależności od inwestycji potrzebne mogą być również dokumenty z właściwego urzędu gminy. W naszym biurze pomagamy kompleksowo przejść przez cały proces formalny.",
      },
    ],
    ctaTitle: "Macie działkę z widokiem? Nie zmarnujcie go katalogowym projektem",
    ctaText: "Przyjedziemy na działkę, ocenimy teren i powiemy, co naprawdę da się na niej postawić.",
    ctaNote: "ArKon · Żegocina 149 · 17 km od Limanowej",
    areaServed: ["Limanowa", "Laskowa", "Tymbark", "Dobra", "Kamienica", "Łukowica"],
  },

  brzesko: {
    slug: "brzesko",
    path: "/biuro-projektowe-brzesko",
    seoTitle: "Biuro projektowe Brzesko — projekty domów, adaptacje | ArKon",
    seoDescription:
      "Projekty indywidualne, adaptacje projektów gotowych i kierownik budowy dla Brzeska i powiatu brzeskiego. Realizacje m.in. w Dębnie. Tel. 888 899 366.",
    breadcrumbName: "Biuro projektowe Brzesko",
    h1: "Biuro projektowe dla Brzeska i powiatu brzeskiego",
    lead: "Projekty domów, adaptacje projektów gotowych i kierownik budowy z uprawnieniami. Projektowaliśmy m.in. w Dębnie i Jasieniu — do Brzeska mamy pół godzinki drogi.",
    heroCaption: "ZDJĘCIE: realizacja Dębno (macie w galerii)",
    knowledgeTitle: "Od Brzeska dzieli nas pół godziny — i żadnych niespodzianek w urzędzie",
    knowledgeParagraphs: [
      "Powiat brzeski znamy z praktyki: prowadziliśmy projekty między innymi w Dębnie i w samej gminie Brzesko, a sprawy urzędowe naszych klientów załatwiamy w Starostwie Powiatowym w Brzesku. Wiemy, jak wygląda praktyka wydawania pozwoleń w gminach Brzesko, Dębno, Czchów, Gnojnik, Iwkowa czy Szczurowa.",
      "To teren przejściowy — od płaskich działek nad Uszwicą po pofałdowane tereny na południu powiatu. Dobieramy projekt (albo projektujemy od zera) pod konkretną działkę, a nie odwrotnie. Jeśli działka leży przy trasie A4 lub DK94, pomagamy też z formalnościami dotyczącymi hałasu i zjazdów.",
    ],
    servicesTitle: "W czym pomagamy inwestorom z Brzeska",
    services: [
      { title: "Projekty indywidualne", desc: "Dom zaprojektowany pod Waszą działkę i budżet — od koncepcji po pozwolenie.", to: SERVICE_PATHS.indywidualne },
      { title: "Adaptacje projektów", desc: "Projekt z katalogu dostosowany do działki i planu miejscowego, z kompletem formalności.", to: SERVICE_PATHS.adaptacje },
      { title: "Kierownik budowy", desc: "Dziennik budowy, odbiory robót, nadzór — na terenie całego powiatu brzeskiego.", to: SERVICE_PATHS.kierownik },
      { title: "Geodezja i formalności", desc: "Mapy do celów projektowych, warunki zabudowy, legalizacje, zmiany sposobu użytkowania.", to: SERVICE_PATHS.uslugi },
    ],
    realizationsTitle: "Nasze projekty w Brzesku i okolicach",
    realizations: [
      { caption: "FOTO: Dębno", title: "Dom jednorodzinny, Dębno" },
      { caption: "FOTO: Poręba Spytkowska — wizualizacja do przesłania", title: "Dom jednorodzinny, Poręba Spytkowska" },
      { caption: "FOTO: Sufczyn — wizualizacja do przesłania", title: "Dom jednorodzinny, Sufczyn" },
    ],
    faqTitle: "Budowa domu w Brzesku — najczęstsze pytania",
    faqs: [
      {
        q: "Gdzie składa się wniosek o pozwolenie na budowę w powiecie brzeskim?",
        a: "Wniosek należy złożyć w Wydziale Architektury i Budownictwa Starostwa Powiatowego w Brzesku. Nie musicie jednak robić tego osobiście — działając na podstawie pełnomocnictwa, bierzemy na siebie wszystkie formalności. Składamy komplet dokumentów i na bieżąco monitorujemy proces, aż do uzyskania decyzji.",
      },
      {
        q: "Kupiłem projekt z katalogu — czy zaadaptujecie go dla działki w gminie Brzesko?",
        a: "Tak, to nasza codzienna praca. Sprawdzimy zgodność projektu z planem miejscowym lub warunkami zabudowy, wykonamy projekt zagospodarowania i skompletujemy dokumenty do pozwolenia.",
      },
      {
        q: "Czy pomagacie w uzyskaniu decyzji o Warunkach Zabudowy (WZ) w gminie Brzesko?",
        a: "Tak, wspieramy naszych klientów na każdym etapie biurokracji. Jeśli Wasza działka nie jest objęta Miejscowym Planem Zagospodarowania Przestrzennego, przygotujemy kompletny wniosek wraz z niezbędnymi załącznikami i złożymy go w Urzędzie Miejskim, odciążając Was z urzędowych formalności.",
      },
      {
        q: "Działka blisko autostrady A4 — czy są dodatkowe wymagania?",
        a: "W pasie oddziaływania dróg krajowych i autostrady mogą pojawić się wymagania dotyczące hałasu i lokalizacji budynku oraz uzgodnienia zjazdu. Sprawdzamy to na etapie analizy działki, zanim cokolwiek zaprojektujemy.",
      },
    ],
    ctaTitle: "Budujecie w Brzesku lub okolicy?",
    ctaText: "Zadzwońcie z numerem działki — bezpłatnie sprawdzimy plan miejscowy i powiemy, od czego zacząć.",
    ctaNote: "ArKon · Żegocina 149 · ok. 31 km od Brzeska",
    areaServed: ["Brzesko", "Dębno", "Czchów", "Gnojnik", "Iwkowa", "Szczurowa"],
  },

  wieliczka: {
    slug: "wieliczka",
    path: "/biuro-projektowe-wieliczka",
    seoTitle: "Biuro projektowe Wieliczka — projekty domów, adaptacje | ArKon",
    seoDescription:
      "Projekty indywidualne, adaptacje projektów gotowych i kierownik budowy dla Wieliczki i okolic. Znamy lokalne plany miejscowe. Bezpłatna konsultacja: 888 899 366.",
    breadcrumbName: "Biuro projektowe Wieliczka",
    h1: "Biuro projektowe dla Wieliczki i powiatu wielickiego",
    lead: "Uciekacie z Krakowa na swoje? Pomagamy od wyboru działki po odbiór domu: projekty indywidualne, adaptacje projektów gotowych i kierownik budowy z uprawnieniami. Bez krakowskich stawek i bez krakowskich kolejek.",
    heroCaption: "ZDJĘCIE: dom jednorodzinny — realizacja lub najlepsza wizualizacja podmiejska",
    knowledgeTitle: "Wieliczka buduje najszybciej w Małopolsce — my pomagamy budować mądrze",
    knowledgeParagraphs: [
      "Powiat wielicki od lat jest jednym z najszybciej zabudowywanych terenów w regionie. Efekt: coraz mniejsze i trudniejsze działki, gęste plany miejscowe i sąsiedzi za płotem z każdej strony. Dobrze dobrany projekt musi to wszystko uwzględnić — od zacieniania po odległości od granic.",
      "W Wieliczce i okolicach trzeba też wiedzieć, gdzie sprawdzić tereny dawnej eksploatacji górniczej oraz strefy ochrony konserwatorskiej. To standardowy punkt naszej analizy działki, zanim powstanie projekt lub adaptacja.",
      "Sprawy urzędowe prowadzimy w Starostwie Powiatowym w Wieliczce; pracujemy w gminach Wieliczka, Niepołomice, Biskupice, Kłaj i Gdów — w Brzeziu (gm. Kłaj) mamy zrealizowany projekt.",
    ],
    servicesTitle: "W czym pomagamy inwestorom z Wieliczki",
    services: [
      { title: "Projekty indywidualne", desc: "Dom skrojony pod małą lub nietypową działkę — specjalność terenów podmiejskich.", to: SERVICE_PATHS.indywidualne },
      { title: "Adaptacje projektów", desc: "Sprawdzimy przed zakupem, czy projekt z katalogu zmieści się na działce — i zaadaptujemy go do planu.", to: SERVICE_PATHS.adaptacje },
      { title: "Kierownik budowy", desc: "Uprawnienia konstrukcyjno-budowlane, odbiory, dziennik budowy — cały powiat wielicki.", to: SERVICE_PATHS.kierownik },
      { title: "Analizy działek", desc: "MPZP, tereny pogórnicze, strefy konserwatorskie, media — sprawdzimy działkę przed zakupem.", to: SERVICE_PATHS.uslugi },
    ],
    realizationsTitle: "Nasze projekty w powiecie wielickim i okolicach",
    realizations: [
      { caption: "FOTO: Tomaszkowice — wizualizacja do przesłania", title: "Dom jednorodzinny, Tomaszkowice" },
      { caption: "FOTO: Łazany — wizualizacja do przesłania", title: "Dom jednorodzinny, Łazany" },
      { caption: "FOTO: Gorzków — wizualizacja do przesłania", title: "Dom jednorodzinny, Gorzków" },
    ],
    faqTitle: "Budowa domu w Wieliczce — najczęstsze pytania",
    faqs: [
      {
        q: "Jak sprawdzić, czy działka w Wieliczce leży na terenach pogórniczych?",
        a: "Informacje o dawnej eksploatacji i jej wpływie na zabudowę weryfikuje się w dokumentach planistycznych oraz — w razie potrzeby — w opiniach geologicznych. Przy analizie działki sprawdzamy to za Was i mówimy wprost, czy temat Was dotyczy.",
      },
      {
        q: "Mała działka blisko Krakowa — czy da się na niej postawić wygodny dom?",
        a: "Zwykle tak, ale rzadko projektem z katalogu. Na wąskich działkach decydują centymetry: odległości od granic, usytuowanie garażu, doświetlenie. To typowa sytuacja, w której projekt indywidualny wygrywa z adaptacją.",
      },
      {
        q: "Czy obsługujecie też gminy Niepołomice i Kłaj?",
        a: "Tak — pracujemy w całym powiecie wielickim. W Brzeziu w gminie Kłaj mamy zrealizowany projekt.",
      },
      {
        q: "Ile trwa uzyskanie pozwolenia na budowę w powiecie wielickim?",
        a: "Ustawowo urząd ma 65 dni na wydanie decyzji. W praktyce, doliczając czas niezbędny na przygotowanie adaptacji lub projektu, cały proces zajmuje zazwyczaj od 2 do 4 miesięcy. Powiat wielicki charakteryzuje się dużym ruchem budowlanym, dlatego kluczowe jest złożenie bezbłędnej i kompletnej dokumentacji już za pierwszym razem. Dbamy o to, aby maksymalnie skrócić Wasz czas oczekiwania.",
      },
    ],
    ctaTitle: "Planujecie dom pod Wieliczką?",
    ctaText: "Wyślijcie numer działki — sprawdzimy plan miejscowy i powiemy, co realnie można na niej wybudować.",
    ctaNote: "ArKon · Żegocina 149 · ok. 45 min od Wieliczki",
    areaServed: ["Wieliczka", "Niepołomice", "Biskupice", "Kłaj", "Gdów"],
  },

  gdow: {
    slug: "gdow",
    path: "/biuro-projektowe-gdow",
    seoTitle: "Biuro projektowe Gdów — projekty domów i adaptacje | ArKon",
    seoDescription:
      "Architekt, adaptacje projektów i kierownik budowy dla Gdowa i doliny Raby — 25 min od Gdowa. Sprawdzimy działkę bezpłatnie. Tel. 888 899 366.",
    breadcrumbName: "Biuro projektowe Gdów",
    h1: "Biuro projektowe dla Gdowa i doliny Raby",
    lead: "Projekty domów, adaptacje projektów gotowych i kierownik budowy z uprawnieniami — ok. 30 minut od Gdowa. Obsługujemy całą gminę: od Marszowic po Zręczyce, od pierwszego szkicu po odbiór domu.",
    heroCaption: "ZDJĘCIE: dom jednorodzinny w otwartym krajobrazie (realizacja lub wizualizacja)",
    knowledgeTitle: "Gdów to dobre miejsce na dom — jeśli dobrze wybierzecie działkę",
    knowledgeParagraphs: [
      "Gmina Gdów przyciąga budujących: blisko Krakowa i Wieliczki, a działki wciąż większe i tańsze niż bliżej miasta. Ale dolina Raby ma swoją specyfikę — część terenów leży w zasięgu wód powodziowych, a część gminy nie jest objęta planem miejscowym, więc potrzebna bywa decyzja o warunkach zabudowy.",
      "Zanim kupicie działkę albo projekt, sprawdzimy za Was: plan miejscowy lub możliwość uzyskania WZ, zagrożenie powodziowe, dostęp do drogi i mediów. Bezpłatnie, po numerze działki.",
      "Formalności dla gminy Gdów prowadzimy w Starostwie Powiatowym w Wieliczce — robimy to na pełnomocnictwo, więc Wy nie stoicie w żadnej kolejce.",
    ],
    servicesTitle: "W czym pomagamy inwestorom z gminy Gdów",
    services: [
      { title: "Projekty indywidualne", desc: "Dom pod Waszą działkę i budżet — z wizualizacjami, zanim zdecydujecie.", to: SERVICE_PATHS.indywidualne },
      { title: "Adaptacje projektów", desc: "Projekt z katalogu dostosowany do działki, WZ lub planu — z kompletem dokumentów.", to: SERVICE_PATHS.adaptacje },
      { title: "Kierownik budowy", desc: "Gdów mamy „po drodze” — na budowie jesteśmy w ok. 30 minut od telefonu.", to: SERVICE_PATHS.kierownik },
      { title: "Analizy działek", desc: "WZ czy MPZP, tereny zalewowe, media, zjazd — sprawdzimy przed zakupem działki.", to: SERVICE_PATHS.uslugi },
    ],
    realizationsTitle: "Nasze projekty w okolicy",
    realizations: [
      { caption: "FOTO: Sobolów", title: "Dom jednorodzinny, Sobolów (gm. Łapanów)" },
      { caption: "FOTO: realizacja do ustalenia", title: "[Realizacja 2]" },
      { caption: "FOTO: realizacja do ustalenia", title: "[Realizacja 3]" },
    ],
    faqTitle: "Budowa domu w gminie Gdów — najczęstsze pytania",
    faqs: [
      {
        q: "Moja działka w gminie Gdów nie ma planu miejscowego — co teraz?",
        a: "Potrzebna będzie decyzja o warunkach zabudowy (WZ). Przygotowujemy wnioski o WZ i prowadzimy je do decyzji — to zwykle najdłuższy etap, dlatego warto zacząć od niego, jeszcze przed wyborem projektu.",
      },
      {
        q: "Jak sprawdzić, czy działka leży na terenie zalewowym Raby?",
        a: "Zasięgi wód powodziowych sprawdza się na mapach zagrożenia powodziowego; bywają też ujęte w planie miejscowym. Robimy to standardowo przy każdej analizie działki w dolinie Raby — bezpłatnie.",
      },
      {
        q: "Gdzie załatwia się pozwolenie na budowę dla Gdowa?",
        a: "Gmina Gdów należy do powiatu wielickiego — wnioski składa się w Starostwie Powiatowym w Wieliczce. Na pełnomocnictwo prowadzimy całą sprawę za Was.",
      },
      {
        q: "Czy poprowadzicie budowę w Gdowie jako kierownik budowy?",
        a: "Tak — z naszego biura do Gdowa jedziemy około pół godziny, więc jesteśmy na każdym kluczowym etapie budowy bez wyczekiwania na „okienko w kalendarzu”.",
      },
    ],
    ctaTitle: "Kupujecie działkę lub budujecie w Gdowie?",
    ctaText: "Wyślijcie numer działki — bezpłatnie sprawdzimy, czy i co można na niej wybudować.",
    ctaNote: "ArKon · Żegocina 149 · ok. 25 km od Gdowa",
    areaServed: ["Gdów", "Marszowice", "Zręczyce", "Wieliczka"],
  },
};
