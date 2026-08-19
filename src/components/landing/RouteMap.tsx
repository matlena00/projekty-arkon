// Interaktywna mapa na stronach lokalnych i na /uslugi/kierownik-budowy.
// Leaflet + kafelki OpenStreetMap: bez klucza API i bez ciasteczek, więc nie wymaga
// zgód marketingowych. Biblioteka ładuje się dopiero, gdy sekcja wjedzie w ekran.

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AREA_POINTS, OFFICE, localMaps, type MapPoint } from "@/data/localMaps";

interface RouteMapProps {
  /** Strona lokalna — rysuje trasę z biura do miasta i pinezki realizacji */
  city?: keyof typeof localMaps;
  /** Mapa obszaru działania — same miasta, bez trasy */
  area?: boolean;
  /** Klasy proporcji/rozmiaru kontenera mapy */
  className?: string;
}

const GOLD = "hsl(38 35% 55%)";
const CHARCOAL = "hsl(220 10% 12%)";

/** Pinezka biura — wypełnione kółko z obwódką */
const officeMarker = `
  <span style="display:block;width:18px;height:18px;border-radius:50%;
    background:${GOLD};box-shadow:0 0 0 4px hsl(38 35% 55% / .28), 0 1px 4px hsl(220 10% 12% / .45);"></span>`;

/** Pinezka miasta docelowego — ciemna kropla */
const cityMarker = `
  <span style="display:block;width:14px;height:14px;border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);background:${CHARCOAL};
    box-shadow:0 1px 4px hsl(220 10% 12% / .5);"></span>`;

/** Pinezka realizacji — mniejsza, pusta w środku */
const projectMarker = `
  <span style="display:block;width:11px;height:11px;border-radius:50%;
    background:hsl(0 0% 100%);border:3px solid ${GOLD};
    box-shadow:0 1px 3px hsl(220 10% 12% / .4);"></span>`;

const RouteMap = ({ city, area = false, className = "aspect-[4/3] w-full" }: RouteMapProps) => {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  const data = city ? localMaps[city] : undefined;

  // Doładowanie dopiero przy zbliżeniu do widoku — mapa nie obciąża pierwszego renderu.
  useEffect(() => {
    const node = holder.current;
    if (!node || visible) return;

    // Pomiar wprost: obserwator nie zawsze dostarcza pierwszej informacji, gdy sekcja
    // jest widoczna już przy wejściu na stronę (albo karta startuje w tle).
    const nearViewport = () => {
      const r = node.getBoundingClientRect();
      return r.bottom > -300 && r.top < (window.innerHeight || 0) + 300;
    };
    if (nearViewport()) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true);
      },
      { rootMargin: "300px" },
    );
    io.observe(node);

    // Zapasowe sprawdzenie przy przewijaniu i zmianie rozmiaru okna.
    const check = () => nearViewport() && setVisible(true);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const node = holder.current;
    if (!node) return;

    let cancelled = false;
    let map: import("leaflet").Map | undefined;

    (async () => {
      try {
        const [L] = await Promise.all([import("leaflet"), import("leaflet/dist/leaflet.css")]);
        if (cancelled || !holder.current) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        map = L.map(holder.current, {
          zoomControl: true,
          // Kółko myszy zostawiamy stronie — inaczej mapa łapie scroll przy przewijaniu.
          scrollWheelZoom: false,
          // Na dotyku przeciąganie mapy blokowałoby przewijanie strony jednym palcem.
          dragging: !L.Browser.mobile,
          attributionControl: true,
          fadeAnimation: !reduceMotion,
          zoomAnimation: !reduceMotion,
        });

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const icon = (html: string, size: number) =>
          L.divIcon({ html, className: "", iconSize: [size, size], iconAnchor: [size / 2, size / 2] });

        const pin = (p: MapPoint, html: string, size: number) =>
          L.marker([p.lat, p.lng], { icon: icon(html, size), title: p.name })
            .bindTooltip(p.name, { direction: "top", offset: [0, -size / 2 - 2] })
            .addTo(map!);

        pin(OFFICE, officeMarker, 18);

        if (data) {
          L.polyline(data.route, {
            color: GOLD,
            weight: 4,
            opacity: 0.9,
            lineJoin: "round",
            lineCap: "round",
          }).addTo(map);

          pin(data.city, cityMarker, 14);
          data.pins.forEach((p) => pin(p, projectMarker, 11));

          map.fitBounds(L.latLngBounds(data.route), { padding: [28, 28] });
        } else if (area) {
          AREA_POINTS.forEach((p) => pin(p, cityMarker, 14));
          map.fitBounds(
            L.latLngBounds([OFFICE, ...AREA_POINTS].map((p) => [p.lat, p.lng] as [number, number])),
            { padding: [36, 36] },
          );
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [visible, data, area]);

  const directionsUrl = data
    ? `https://www.google.com/maps/dir/?api=1&origin=${OFFICE.lat},${OFFICE.lng}&destination=${encodeURIComponent(
        `${data.city.name}, Polska`,
      )}&travelmode=driving`
    : `https://www.google.com/maps/search/?api=1&query=${OFFICE.lat},${OFFICE.lng}`;

  const described = data
    ? `Mapa trasy z biura w Żegocinie do miejscowości ${data.city.name} — ${data.km} km, ok. ${
        data.minutes
      } min. Zaznaczone realizacje: ${data.pins.map((p) => p.name).join(", ")}.`
    : `Mapa obszaru działania biura projektowego ArKon: ${AREA_POINTS.map((p) => p.name).join(", ")}.`;

  return (
    <figure className="m-0">
      <p className="sr-only">{described}</p>
      {/* isolate = własny kontekst nakładania; bez tego panele Leafletu (z-index 400+)
          przykrywają przyklejony navbar i pasek kontaktowy (z-50). */}
      <div ref={holder} className={`relative isolate bg-secondary/50 ${className}`}>
        {failed && (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <p className="text-muted-foreground/80 text-xs leading-relaxed">
              Nie udało się załadować mapy.{" "}
              <a href={directionsUrl} className="text-accent underline underline-offset-4" target="_blank" rel="noreferrer">
                Otwórz w Google Maps
              </a>
            </p>
          </div>
        )}
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>
          {data
            ? `Żegocina → ${data.city.name} · ${data.km} km · ok. ${data.minutes} min`
            : "Żegocina — biuro projektowe ArKon"}
        </span>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-accent font-semibold uppercase tracking-wider hover:underline underline-offset-4"
        >
          Wyznacz trasę
          <ArrowUpRight size={13} />
        </a>
      </figcaption>
    </figure>
  );
};

export default RouteMap;
