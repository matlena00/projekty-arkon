// Najczęściej zadawane pytania — jedno źródło prawdy (treść z materiału klienta,
// lipiec 2026). Strona główna i /uslugi pokazują pierwsze HOME_FAQ_COUNT pytań,
// pełna lista jest na /faq. Schema FAQPage budowane per strona z widocznych pytań.

export interface FaqItem {
  q: string;
  a: string;
}

/** Liczba pytań widocznych na stronie głównej (reszta tylko na /faq). */
export const HOME_FAQ_COUNT = 7;

export const faqItems: FaqItem[] = [
  {
    q: "Ile trwa proces uzyskania pozwolenia na budowę?",
    a: "Przygotowanie projektu wraz z kompletem niezbędnej dokumentacji zajmuje zazwyczaj około 2 miesięcy. Ustawowy czas dla urzędu od złożenia wniosku do momentu wydania decyzji o pozwolenie na budowę to 65 dni, choć czas ten może się wydłużyć, jeśli konieczne są dodatkowe uzgodnienia lub w postępowaniu zawiadamiane są strony postępowania (właściciele działek sąsiednich). Po wydaniu decyzji należy odczekać 14 dni na jej uprawomocnienie liczone od momentu odbioru decyzji przez wszystkie strony, o ile żadna ze stron nie wniesie odwołania. Jeśli inwestor jest jedyną stroną postępowania, może zrzec się prawa do odwołania, dzięki czemu jest możliwość uprawomocnienia decyzji w dzień jej odbioru.",
  },
  {
    q: "Pozwolenie na budowę czy zgłoszenie?",
    a: "Wybór zależy od rodzaju planowanej inwestycji. Domy o powierzchni zabudowy do 70 m² mogą być realizowane na zgłoszenie, natomiast większe obiekty wymagają uzyskania pozwolenia na budowę. Pomożemy ustalić, która forma będzie właściwa dla Państwa inwestycji.",
  },
  {
    q: "Projekt indywidualny czy adaptacja gotowego?",
    a: "Projekt indywidualny pozwala na pełne dopasowanie domu do potrzeb inwestora oraz warunków działki, jednak wymaga więcej czasu i większego budżetu. Adaptacja projektu gotowego jest szybszym i bardziej ekonomicznym rozwiązaniem, które również umożliwia wprowadzenie wielu zmian dostosowujących projekt do Państwa oczekiwań.",
  },
  {
    q: "Czy współpraca może odbywać się całkowicie zdalnie?",
    a: "Tak, współpraca może odbywać się w pełni zdalnie. Po otrzymaniu pełnomocnictwa reprezentujemy Państwa przed urzędami, a wszystkie etapy realizacji projektu konsultujemy telefonicznie i mailowo. Taki model współpracy pozwala sprawnie przeprowadzić cały proces bez względu na miejsce zamieszkania inwestora.",
  },
  {
    q: "Jakie mamy doświadczenie?",
    a: "Działamy na rynku od 2018 roku, a od 2021 roku pod nazwą ArKon. Nasz zespół tworzą specjaliści, którzy jeszcze przed dołączeniem do biura zdobywali wieloletnie doświadczenie przy różnorodnych projektach i inwestycjach. Łączymy wiedzę i doświadczenie całego zespołu, dzięki czemu możemy kompleksowo prowadzić projekty na każdym etapie ich realizacji.",
  },
  {
    q: "Jakie dokumenty warto przygotować przed pierwszym spotkaniem?",
    a: "Przed pierwszym spotkaniem warto przygotować informacje o planowanej inwestycji oraz lokalizacji działki. Jeśli posiadają Państwo mapę do celów projektowych, miejscowy plan zagospodarowania przestrzennego lub decyzję o warunkach zabudowy, również warto je ze sobą zabrać. Dzięki temu będziemy mogli sprawniej omówić możliwości i zaproponować najlepsze rozwiązania.",
  },
  {
    q: "Czy jeśli moja działka jest budowlana, to mogę postawić na niej dowolny budynek?",
    a: "Nie zawsze. Mimo że działka ma przeznaczenie budowlane, często obowiązują ograniczenia dotyczące rodzaju budynku, jego wielkości, wysokości, kształtu dachu czy sposobu usytuowania na działce. Zakres dopuszczalnej zabudowy określają zapisy MPZP lub decyzji o warunkach zabudowy.",
  },
  {
    q: "Czym różnią się miejscowy plan, studium i plan ogólny?",
    a: "MPZP określa szczegółowe zasady zabudowy dla konkretnego terenu i to jego zapisy są najważniejsze przy projektowaniu inwestycji. Studium uwarunkowań zostało zastąpione planem ogólnym gminy, który wyznacza kierunki rozwoju przestrzennego, jednak nie określa szczegółowych zasad zabudowy dla poszczególnych działek.",
  },
  {
    q: "MPZP czy warunki zabudowy - co obowiązuje na mojej działce?",
    a: "Nie wszystkie działki są objęte miejscowym planem zagospodarowania przestrzennego. Jeśli dla danej działki obowiązuje MPZP, to jego zapisy określają możliwości i zasady zabudowy. W przypadku braku planu konieczne jest uzyskanie decyzji o warunkach zabudowy, która określa parametry planowanej inwestycji.",
  },
  {
    q: "Czy można zmienić zapisy MPZP, jeśli uniemożliwiają realizację planowanej inwestycji?",
    a: "Zapisów obowiązującego miejscowego planu nie można po prostu pominąć ani się od nich „odwołać”. Można jednak złożyć do gminy wniosek o zmianę miejscowego planu zagospodarowania przestrzennego. Należy pamiętać, że jest to proces długotrwały, a złożenie wniosku nie gwarantuje zmiany zapisów planu.",
  },
  {
    q: "Czym jest powierzchnia biologicznie czynna i dlaczego ma znaczenie?",
    a: "Powierzchnia biologicznie czynna to część działki, która pozostaje niezabudowana i umożliwia naturalną wegetację roślin oraz retencję wody opadowej. Jej minimalna wielkość jest określona w MPZP lub decyzji o warunkach zabudowy i ma bezpośredni wpływ na możliwości zagospodarowania działki. Zbyt mała powierzchnia biologicznie czynna może uniemożliwić realizację planowanej inwestycji w zakładanej wielkości.",
  },
  {
    q: "Czym jest wyłączenie gruntu z produkcji rolnej i czy wiąże się z opłatami?",
    a: "Wyłączenie gruntu z produkcji rolnej oznacza uzyskanie zgody na wykorzystanie gruntu rolnego pod planowaną inwestycję, np. budowę domu lub innego obiektu. Stanowi jeden z niezbędnych etapów do uzyskania pozwolenia na budowę. To, czy wiąże się z opłatami, zależy przede wszystkim od klasy gruntu i powierzchni wyłączanej z produkcji oraz występowania melioracji - ustawowo budownictwo mieszkaniowe jest zwolnione z opłaty, jednak w przypadku gruntów dobrej jakości opłaty mogą pojawić się po przekroczeniu 500 m² wyłączanej powierzchni.",
  },
  {
    q: "Czy badania geotechniczne są obowiązkowe przed budową?",
    a: "Badania geotechniczne nie zawsze są obowiązkowe, jednak zdecydowanie warto je wykonać. Pozwalają dokładnie określić warunki gruntowe i odpowiednio zaprojektować fundamenty, co jest szczególnie ważne w przypadku budynków z piwnicą. Jeśli badania nie zostaną wykonane, niezbędną opinię przygotowuje konstruktor na podstawie dostępnych informacji, jednak nie jest ona tak dokładna jak opracowanie oparte na badaniach gruntu.",
  },
  {
    q: "Jakie są rodzaje przydomowych oczyszczalni ścieków?",
    a: "Przydomowe oczyszczalnie ścieków mogą odprowadzać oczyszczone ścieki do drenażu rozsączającego, studni chłonnej lub szczelnego zbiornika. Wybór odpowiedniego rozwiązania zależy od warunków gruntowo-wodnych, wielkości działki oraz obowiązujących przepisów. Dobieramy je indywidualnie do każdej inwestycji.",
  },
  {
    q: "Jak przebiega projektowanie przyłącza wodociągowego lub kanalizacji sanitarnej?",
    a: "Projektowanie przyłącza rozpoczyna się od uzyskania warunków technicznych od właściciela sieci. Na ich podstawie opracowujemy projekt, dokonujemy niezbędnych uzgodnień i przygotowujemy dokumentację potrzebną do realizacji przyłącza. Zakres formalności może różnić się w zależności od lokalizacji inwestycji i wymagań właściciela sieci.",
  },
  {
    q: "Czym są warunki przyłączeniowe i kiedy należy je uzyskać?",
    a: "Warunki przyłączeniowe określają możliwości oraz sposób podłączenia budynku do poszczególnych sieci: wodociągowej, kanalizacji sanitarnej, gazowej i energetycznej. Wydawane są przez właściwych właścicieli sieci i stanowią podstawę do dalszego projektowania przyłączy oraz instalacji. Pomagamy w przygotowaniu i złożeniu niezbędnych wniosków o ich wydanie.",
  },
  {
    q: "Czym różni się projekt koncepcyjny od projektu budowlanego?",
    a: "Projekt koncepcyjny to pierwsza faza procesu projektowego, w której określamy główne założenia, formę, układ funkcjonalny oraz charakter budynku. Na podstawie zaakceptowanej koncepcji opracowywany jest następnie projekt budowlany, zawierający szczegółowe rozwiązania i dokumentację niezbędną do uzyskania wymaganych zgód oraz realizacji inwestycji. Projekt koncepcyjny pokazuje więc wizję i kierunek projektu, a projekt budowlany przekłada tę wizję na konkretne rozwiązania techniczne i formalne.",
  },
  {
    q: "Czym różnią się schematyczne rysunki konstrukcyjne od rysunków wykonawczych?",
    a: "Rysunki schematyczne przedstawiają ogólny układ i podstawowe założenia konstrukcji. Rysunki wykonawcze są znacznie bardziej szczegółowe - nie są niezbędnym elementem podstawowej dokumentacji, ale znacząco ułatwiają prawidłową realizację prac na budowie. Na życzenie inwestora możemy przygotować je jako dodatkowy zakres opracowania.",
  },
  {
    q: "Jaką wysokość pomieszczeń warto zaplanować w domu jednorodzinnym?",
    a: "W domach jednorodzinnych najczęściej projektuje się pomieszczenia o wysokości około 2,6-2,8 m, choć ostateczny wymiar zależy od charakteru wnętrza i indywidualnych preferencji inwestora. Wyższe pomieszczenia dają większe poczucie przestrzeni, ale mogą również wpływać na koszty budowy i ogrzewania. Odpowiednią wysokość dobieramy indywidualnie, uwzględniając proporcje pomieszczeń oraz charakter całego budynku.",
  },
];

export const homeFaqItems = faqItems.slice(0, HOME_FAQ_COUNT);
