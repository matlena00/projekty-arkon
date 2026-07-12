export type ProjectCategory = "domy" | "osiedla" | "publiczne" | "uslugowe" | "wnetrza";

/** Kategorie używane w filtrach galerii i w panelu admina */
export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "domy", label: "Domy jednorodzinne" },
  { id: "osiedla", label: "Osiedla domów" },
  { id: "publiczne", label: "Obiekty publiczne" },
  { id: "uslugowe", label: "Obiekty usługowe" },
  { id: "wnetrza", label: "Wizualizacje wnętrz" },
];

/** Etykieta pojedynczego obiektu (badge w galerii) */
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  domy: "Dom jednorodzinny",
  osiedla: "Osiedle domów",
  publiczne: "Obiekt publiczny",
  uslugowe: "Obiekt usługowy",
  wnetrza: "Wizualizacja wnętrz",
};

export interface ProjectImage {
  id: string;
  projekt_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
  is_cover: boolean;
}

export interface Project {
  id: string;
  created_at: string;
  tytul: string;
  kategoria: ProjectCategory;
  opis: string | null;
  sort_order: number;
  published: boolean;
  zdjecia: ProjectImage[];
}

export interface Post {
  id: string;
  created_at: string;
  slug: string;
  tytul: string;
  excerpt: string | null;
  autor: string;
  data_publikacji: string; // YYYY-MM-DD
  tag: string | null;
  tagi: string[];
  cover_url: string | null;
  tresc: string | null;
  published: boolean;
}
