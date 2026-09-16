export type Mascot = {
  szereg: "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm";
  name: string;
  species: string;
  sound: string;
  color: string;
  light: string;
  border: string;
  dark: string;
  emoji: string; // fallback
  quest: string; // 1 zdanie misji
  joke: string;
  verb: string; // czynność: sycz, szum, cisz, rycz
};

export const MASCOTS: Record<Mascot["szereg"], Mascot> = {
  syczacy: {
    szereg: "syczacy",
    name: "Wąż Syk",
    species: "wąż",
    sound: "s-s-s",
    color: "#FACC15",
    light: "#FEF9C3",
    border: "#FDE68A",
    dark: "#713F12",
    emoji: "🐍",
    quest: "Wąż Syk zgubił 8 skarbów w trawie — znajdź je, nazwij i zasycz s-s-s!",
    joke: "Dlaczego wąż nie gra w chowanego? Bo zawsze syczy gdzie jest!",
    verb: "zasycz",
  },
  szumiacy: {
    szereg: "szumiacy",
    name: "Sowa Szumia",
    species: "sowa",
    sound: "sz-sz-sz",
    color: "#2D6A4F",
    light: "#D8F3DC",
    border: "#95D5B2",
    dark: "#1B4332",
    emoji: "🦉",
    quest: "Sowa Szumia szuka 8 szyszek w lesie — pomóż jej, szumiąc sz-sz-sz!",
    joke: "Co mówi sowa na dobranoc? Szuu-szuu, śpij już!",
    verb: "zaszum",
  },
  ciszacy: {
    szereg: "ciszacy",
    name: "Mysia Cisza",
    species: "mysz",
    sound: "ś-ś-ś",
    color: "#7C3AED",
    light: "#F5F3FF",
    border: "#DDD6FE",
    dark: "#4C1D95",
    emoji: "🐭",
    quest: "Mysia Cisza cichutko szuka 8 okruszków — powiedz ś-ś-ś i wskaż!",
    joke: "Czemu mysz mówi cicho? Bo boi się kota, śśś!",
    verb: "wyszeptaj",
  },
  rotacyzm: {
    szereg: "rotacyzm",
    name: "Lew Rysio",
    species: "lew",
    sound: "r-r-r",
    color: "#C2410C",
    light: "#FFF7ED",
    border: "#FDBA74",
    dark: "#7C2D12",
    emoji: "🦁",
    quest: "Lew Rysio ryczy r-r-r i szuka 8 grzyw — znajdź i zarycz!",
    joke: "Jak lew myje grzywę? R-r-ręcznie!",
    verb: "zarycz",
  },
};
