import p1 from "@/assets/project-1.webp";
import p2 from "@/assets/project-2.webp";
import p3 from "@/assets/project-3.webp";
import p4 from "@/assets/project-4.webp";
import p5 from "@/assets/project-5.webp";
import p1t from "@/assets/project-1-thumb.webp";
import p2t from "@/assets/project-2-thumb.webp";
import p3t from "@/assets/project-3-thumb.webp";
import p4t from "@/assets/project-4-thumb.webp";
import p5t from "@/assets/project-5-thumb.webp";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tag: string;
  tags: string[];
  image: string;
  thumb: string;
  body: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "piekna-jesienna-aura",
    title: "Piękna jesienna aura",
    excerpt:
      "Jesień rozpieszcza nas w tym roku piękną pogodą, więc nie pozostaje nam nic innego jak korzystać z pięknej aury. Kolejne budowy rozpoczęte, kilkadziesiąt kolejnych w realizacji...",
    author: "Łukasz Matlęga",
    date: "29 Październik 2021",
    tag: "Nowości",
    tags: ["Budowa", "Jesień", "Realizacje"],
    image: p1,
    thumb: p1t,
    body: [
      "Październik okazał się dla nas jednym z najbardziej intensywnych miesięcy w tym roku. Rozpoczęliśmy prace nad kilkoma nowymi projektami domów jednorodzinnych w okolicach Krakowa, a równocześnie kontynuujemy realizacje rozpoczęte wiosną.",
      "Pogoda nam sprzyjała - słoneczne dni pozwoliły ekipom pracować bez opóźnień, co w budownictwie jest rzadkością o tej porze roku. Fundamenty wylane, ściany murowane, a na kilku budowach już montujemy więźby dachowe.",
      "Nasi klienci odwiedzali budowy i cieszyli się z postępów. Nic tak nie motywuje jak widok realnych efektów pracy. Zapraszamy do śledzenia naszych realizacji - kolejne wpisy już niedługo!",
    ],
  },
  {
    slug: "poszerzamy-uslugi-o-wizualizacje",
    title: "Poszerzamy usługi o wizualizacje",
    excerpt:
      "Witajcie! Tym razem mamy dla Was prawdziwą bombę! Do naszego zespołu dołączyła kolejna osoba, a zakres naszych usług poszerza się o WIZUALIZACJE stworzone przez nas...",
    author: "Łukasz Matlęga",
    date: "28 Wrzesień 2021",
    tag: "Nowości",
    tags: ["Wizualizacje", "Zespół", "Rozwój"],
    image: p2,
    thumb: p2t,
    body: [
      "Od początku naszej działalności zależało nam na tym, żeby oferować klientom kompletną usługę - od koncepcji, przez projekt, aż po wizualizację, która pozwala wyobrazić sobie efekt końcowy jeszcze przed wbiciem pierwszej łopaty.",
      "Teraz, dzięki rozszerzeniu naszego zespołu, możemy tworzyć fotorealistyczne wizualizacje 3D całkowicie in-house. Oznacza to szybszą komunikację, spójność z projektem i pełną kontrolę nad jakością.",
      "Pierwsze efekty możecie zobaczyć w naszej zakładce Realizacje. Jesteśmy z nich niesamowicie dumni i nie możemy się doczekać, aż pokażemy Wam więcej!",
    ],
  },
  {
    slug: "nowosci",
    title: "Nowości!!!",
    excerpt:
      "Witajcie! W ostatnich postach wspominaliśmy o zmianach i nowościach u nas, a więc i one. Od lipca poszerzamy naszą działalność o kolejne usługi i co za tym idzie...",
    author: "Łukasz Matlęga",
    date: "9 Lipiec 2021",
    tag: "Nowości",
    tags: ["Firma", "Usługi", "Rozwój"],
    image: p3,
    thumb: p3t,
    body: [
      "Lipiec to dla nas miesiąc przełomowy. Oficjalnie rozszerzamy zakres usług o pełną obsługę inwestycji - od projektu budowlanego, przez nadzór autorski, aż po koordynację wykonawców na placu budowy.",
      "To naturalny krok w rozwoju ArKon. Wielokrotnie nasi klienci pytali, czy możemy pomóc im nie tylko z projektem, ale też z samą budową. Teraz odpowiedź brzmi: tak!",
      "Nowy rozdział otwieramy z entuzjazmem i dużą dozą pokory. Wiemy, że zaufanie klientów zobowiązuje, dlatego stawiamy na transparentność, terminowość i najwyższą jakość wykonania.",
    ],
  },
  {
    slug: "600-mnpm-i-widok-na-tatry",
    title: "600 m.n.p.m. i widok na Tatry",
    excerpt:
      "Właśnie rozpoczęliśmy budowę na jednej z najładniejszych działek w okolicy. Wkrótce powstanie tu piękny domek. Ostatnio trochę zaniedbaliśmy nasz fanpage, ale to przez to, że...",
    author: "Łukasz Matlęga",
    date: "7 Czerwiec 2021",
    tag: "Nowości",
    tags: ["Budowa", "Góry", "Dom jednorodzinny"],
    image: p4,
    thumb: p4t,
    body: [
      "Niektóre działki zapierają dech w piersiach. Ta, na której właśnie rozpoczęliśmy prace, leży na wysokości 600 metrów nad poziomem morza i oferuje panoramiczny widok na Tatry.",
      "Projekt domu został dopasowany do ukształtowania terenu i otaczającego krajobrazu. Duże przeszklenia od strony południowej pozwolą mieszkańcom cieszyć się widokiem przez cały rok - niezależnie od pogody.",
      "Prace fundamentowe przebiegły sprawnie pomimo stromego terenu. Kolejne etapy budowy będziemy dokumentować i dzielić się z Wami postępami. Trzymajcie kciuki!",
    ],
  },
  {
    slug: "wyruszamy-w-teren-po-zimie",
    title: "Wyruszamy w teren po zimie",
    excerpt:
      "Witajcie! Pomimo przeciągającej się w nieskończoność zimy, my już nie mogliśmy się doczekać i wyruszyliśmy w teren w poprzednich dwóch tygodniach, pomimo niesprzyjającej aury...",
    author: "Łukasz Matlęga",
    date: "9 Kwiecień 2021",
    tag: "Nowości",
    tags: ["Wiosna", "Teren", "Budowa"],
    image: p5,
    thumb: p5t,
    body: [
      "Zima w tym roku nie chciała odpuścić. Jeszcze w marcu mieliśmy opady śniegu, które utrudniały prace terenowe. Ale kwiecień przyniósł nadzieję - i słońce.",
      "Już w pierwszych cieplejszych dniach wyruszyliśmy na działki naszych klientów. Pomiary geodezyjne, badania gruntu, spotkania z wykonawcami - sezon budowlany oficjalnie się rozpoczął!",
      "W najbliższych tygodniach planujemy rozpoczęcie kilku nowych inwestycji. Projekty gotowe, pozwolenia uzyskane - czas budować. Zapraszamy do śledzenia naszych postępów tutaj i na social mediach.",
    ],
  },
];
