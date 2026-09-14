// Tematy — katalog tematyczny dla kart logopedycznych
// Każdy temat to osobny świat narracyjny dla dziecka.
// Rozbudowa sesja za sesją → docelowo pełny coverage (temat × szereg).

export type ThemeId =
  | "kosmos"
  | "zwierzaki"
  | "dinozaury"
  | "pojazdy"
  | "ocean"
  | "las"
  | "jedzenie"
  | "sport"
  | "dom"
  | "ubrania"
  | "pogoda"
  | "muzyka"
  | "ogrod"
  | "miasto";

export type Theme = {
  id: ThemeId;
  label: string; // pojedyncza forma, np. "Kosmos"
  labelPlural: string; // "Kosmos" — do filtrów
  emoji: string; // dla galerii web (emoji ok)
  doodle: string; // litera/cyfra dla PDF PageHeader heroLetter (fallback gdy brak SVG)
  color: string; // akcent tematu
  light: string; // tło
  blurb: string; // krótki opis dla dziecka
  ageHint: string; // np. "3-6"
};

export const THEMES: Theme[] = [
  { id: "kosmos", label: "Kosmos", labelPlural: "Kosmos", emoji: "🚀", doodle: "K", color: "#1E3A8A", light: "#DBEAFE", blurb: "Rakiety, planety i gwiazdy", ageHint: "4-8" },
  { id: "zwierzaki", label: "Zwierzaki", labelPlural: "Zwierzaki", emoji: "🦁", doodle: "Z", color: "#15803D", light: "#DCFCE7", blurb: "Zoo, farma i pupile", ageHint: "3-6" },
  { id: "dinozaury", label: "Dinozaury", labelPlural: "Dinozaury", emoji: "🦕", doodle: "D", color: "#65A30D", light: "#ECFCCB", blurb: "Jurajski park głosek", ageHint: "4-7" },
  { id: "pojazdy", label: "Pojazdy", labelPlural: "Pojazdy", emoji: "🚗", doodle: "P", color: "#BE123C", light: "#FFE4E6", blurb: "Auta, pociągi, statki", ageHint: "3-7" },
  { id: "ocean", label: "Ocean", labelPlural: "Ocean", emoji: "🌊", doodle: "O", color: "#0369A1", light: "#E0F2FE", blurb: "Morze, plaża i rafa", ageHint: "4-8" },
  { id: "las", label: "Las", labelPlural: "Las", emoji: "🌲", doodle: "L", color: "#14532D", light: "#D8F3DC", blurb: "Leśne ścieżki i grzyby", ageHint: "3-7" },
  { id: "jedzenie", label: "Jedzenie", labelPlural: "Jedzenie", emoji: "🍎", doodle: "J", color: "#EA580C", light: "#FFEDD5", blurb: "Kuchnia i targ", ageHint: "3-6" },
  { id: "sport", label: "Sport", labelPlural: "Sport", emoji: "⚽", doodle: "S", color: "#6D28D9", light: "#EDE9FE", blurb: "Boisko i ruch", ageHint: "5-9" },
  { id: "dom", label: "Dom", labelPlural: "Dom", emoji: "🏠", doodle: "D", color: "#92400E", light: "#FEF3C7", blurb: "Pokój, kuchnia, ogródek", ageHint: "3-6" },
  { id: "ubrania", label: "Ubrania", labelPlural: "Ubrania", emoji: "👕", doodle: "U", color: "#DB2777", light: "#FCE7F3", blurb: "Szafa i garderoba", ageHint: "3-6" },
  { id: "pogoda", label: "Pogoda", labelPlural: "Pogoda", emoji: "⛅", doodle: "P", color: "#0284C7", light: "#E0F2FE", blurb: "Słońce, deszcz, śnieg", ageHint: "4-7" },
  { id: "muzyka", label: "Muzyka", labelPlural: "Muzyka", emoji: "🎵", doodle: "M", color: "#7C3AED", light: "#EDE9FE", blurb: "Instrumenty i rytm", ageHint: "4-8" },
  { id: "ogrod", label: "Ogród", labelPlural: "Ogród", emoji: "🌷", doodle: "O", color: "#15803D", light: "#DCFCE7", blurb: "Kwiaty, warzywa, owady", ageHint: "3-6" },
  { id: "miasto", label: "Miasto", labelPlural: "Miasto", emoji: "🏙️", doodle: "M", color: "#334155", light: "#F1F5F9", blurb: "Ulice, sklepy, park", ageHint: "4-8" },
];

export const themeById = (id: string) => THEMES.find((t) => t.id === id);

export const THEME_IDS = THEMES.map((t) => t.id);

// Kolejność sesji — które tematy robimy najpierw.
// Sesja 1: kosmos, zwierzaki, pojazdy, ocean — 16 kart
// Sesja 2: dinozaury, las, jedzenie, sport — kolejne 16 (razem 32)
// Sesja 3: dom, ubrania, pogoda, muzyka — kolejne 16 (razem 48)
// Sesja 4: ogrod, miasto — final 8 (razem 56 tematycznych = pełne pokrycie 14×4)
// Inny agent generuje images via HuggingFace text-to-image — konstelacje uzupełniamy równolegle.
export const PILOT_THEMES: ThemeId[] = ["kosmos", "zwierzaki", "pojazdy", "ocean", "dinozaury", "las", "jedzenie", "sport", "dom", "ubrania", "pogoda", "muzyka", "ogrod", "miasto"];
export const NEXT_THEMES: ThemeId[] = [];

export type SzeregId = "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm";

// Slug tematyczny: {szereg}-{temat}, np. syczacy-kosmos
export const themedSlug = (szereg: SzeregId, theme: ThemeId) => `${szereg}-${theme}` as const;
export const parseThemedSlug = (slug: string): { szereg: SzeregId; theme: ThemeId } | null => {
  const parts = slug.split("-");
  if (parts.length < 2) return null;
  const theme = parts.pop() as ThemeId;
  const szereg = parts.join("-") as SzeregId;
  if (!THEME_IDS.includes(theme)) return null;
  if (!["syczacy", "szumiacy", "ciszacy", "rotacyzm"].includes(szereg)) return null;
  return { szereg, theme };
};
