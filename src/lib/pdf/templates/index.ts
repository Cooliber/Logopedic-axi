import { CiszacyTemplate } from "./ciszacy";
import { DialogTemplate } from "./dialog";
import { DyplomTemplate } from "./dyplom";
import { KatalogTemplate } from "./katalog";
import { KodowanieTemplate } from "./kodowanie";
import { LabiryntTemplate } from "./labirynt";
import { MemoryTemplate } from "./memory";
import { HistoryjkaTemplate } from "./historyjka";
import { NaklejkiTemplate } from "./naklejki";
import { OddechTemplate } from "./oddech";
import { PlanszowkaTemplate } from "./planszowka";
import { PlynnoscTemplate } from "./plynnosc";
import { RotacyzmTemplate } from "./rotacyzm";
import { SzumiacyTemplate } from "./szumiacy";
import { SyczacyTemplate } from "./syczacy";
import { WyszukiwankaTemplate } from "./wyszukiwanka";
import { CymaticFrequenciesTemplate } from "./cymaticFrequencies";
import { StandingWavesTemplate } from "./standingWaves";
import { SacredVowelsTemplate } from "./sacredVowels";
import { BreathGeometryTemplate } from "./breathGeometry";
import { HarmonicBodyTemplate } from "./harmonicBody";
import { makeThemedComponent } from "./themed";
import { THEMES, PILOT_THEMES } from "../themes/catalog";
import type { TemplateProps } from "../theme";
import { ZESTAWY } from "../zagadki/data";
import { makeZagadkiComponent } from "./zagadki";

export type BaseSlug = "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm" | "plynnosc" | "planszowka" | "dialog" | "oddech" | "katalog" | "dyplom" | "naklejki" | "labirynt" | "memory" | "wyszukiwanka" | "kodowanie" | "historyjka" | "cymatic-frequencies" | "standing-waves" | "sacred-vowels" | "breath-geometry" | "harmonic-body";
export type ZagadkiSlug = `zagadki-${string}`;
export type ThemedSlug = `${"syczacy" | "szumiacy" | "ciszacy" | "rotacyzm"}-${string}`;
export type TemplateSlug = BaseSlug | ThemedSlug | ZagadkiSlug;

const themedEntries = (() => {
  const szeregLabels: Record<string, { title: string; color: string }> = {
    syczacy: { title: "Syk", color: "#FACC15" },
    szumiacy: { title: "Szum", color: "#2D6A4F" },
    ciszacy: { title: "Cisza", color: "#8B5CF6" },
    rotacyzm: { title: "Ryczący", color: "#FF7B25" },
  };
  const szeregForPilot: Array<"syczacy" | "szumiacy" | "ciszacy" | "rotacyzm"> = ["syczacy", "szumiacy", "ciszacy", "rotacyzm"];
  const entries: Record<string, { title: string; subtitle: string; icon: string; color: string; component: (props?: TemplateProps) => React.ReactElement; category: string; theme: string; szereg: string }> = {};
  for (const themeId of PILOT_THEMES) {
    const theme = THEMES.find((t) => t.id === themeId)!;
    for (const szereg of szeregForPilot) {
      const slug = `${szereg}-${themeId}`;
      const s = szeregLabels[szereg];
      entries[slug] = {
        title: `${s.title} — ${theme.label}`,
        subtitle: `${szereg} • temat ${theme.label.toLowerCase()} ${theme.emoji}`,
        icon: theme.emoji,
        color: theme.color,
        component: makeThemedComponent(themeId, szereg),
        category: "tematyczne",
        theme: themeId,
        szereg,
      };
    }
  }
  return entries;
})();

export const templates: Record<
  string,
  { title: string; subtitle: string; icon: string; color: string; component: (props?: TemplateProps) => React.ReactElement; category: string; theme?: string; szereg?: string }
> = {
  syczacy: {
    title: "Syk Sycylii",
    subtitle: "Szereg syczący • s z c dz",
    icon: "🐍",
    color: "#FACC15",
    component: SyczacyTemplate,
    category: "szeregi",
  },
  szumiacy: {
    title: "Szum Lasu",
    subtitle: "Szereg szumiący • sz ż cz dż",
    icon: "🦉",
    color: "#2D6A4F",
    component: SzumiacyTemplate,
    category: "szeregi",
  },
  ciszacy: {
    title: "Cisza Świstaka",
    subtitle: "Szereg ciszący • ś ź ć dź",
    icon: "🐹",
    color: "#8B5CF6",
    component: CiszacyTemplate,
    category: "szeregi",
  },
  rotacyzm: {
    title: "Ryczący Lew Rysio",
    subtitle: "Rotacyzm • R",
    icon: "🦁",
    color: "#FF7B25",
    component: RotacyzmTemplate,
    category: "szeregi",
  },
  plynnosc: {
    title: "Płynna Rzeka Słów",
    subtitle: "Płynność wypowiedzi",
    icon: "🐢",
    color: "#00B4D8",
    component: PlynnoscTemplate,
    category: "plynnosc",
  },
  planszowka: {
    title: "Planszówka Głosek",
    subtitle: "Gra do druku • 36 pól",
    icon: "🎲",
    color: "#FF006E",
    component: PlanszowkaTemplate,
    category: "gry",
  },
  dialog: {
    title: "Moc Rozmowy",
    subtitle: "Dlaczego warto rozmawiać + dialog",
    icon: "💬",
    color: "#7B2CBF",
    component: DialogTemplate,
    category: "dialog",
  },
  oddech: {
    title: "Oddech Smoka",
    subtitle: "Ćwiczenia oddechowo-fonacyjne",
    icon: "🐉",
    color: "#E63946",
    component: OddechTemplate,
    category: "oddech",
  },
  katalog: {
    title: "Sklep Logopedy",
    subtitle: "Materiały do kupienia",
    icon: "🛒",
    color: "#1A1A2E",
    component: KatalogTemplate,
    category: "sklep",
  },
  dyplom: {
    title: "Dyplom Super Logopedy",
    subtitle: "Nagroda + personalizacja",
    icon: "🏆",
    color: "#F59E0B",
    component: DyplomTemplate,
    category: "nagrody",
  },
  naklejki: {
    title: "Naklejki i Żetony",
    subtitle: "Do wycięcia — 48 szt",
    icon: "⭐",
    color: "#06D6A0",
    component: NaklejkiTemplate,
    category: "nagrody",
  },
  labirynt: {
    title: "Labirynt Głoski",
    subtitle: "Prowadź palcem — s z c dz vs sz/cz",
    icon: "🧭",
    color: "#2D6A4F",
    component: LabiryntTemplate,
    category: "gry-nowe",
  },
  memory: {
    title: "Memory Głoski",
    subtitle: "Dopasuj parę — 12 kart do wycięcia",
    icon: "🃏",
    color: "#C2410C",
    component: MemoryTemplate,
    category: "gry-nowe",
  },
  wyszukiwanka: {
    title: "Wyszukiwanka Słów",
    subtitle: "Znajdź 8 słów — 10×10 siatka",
    icon: "🔍",
    color: "#FACC15",
    component: WyszukiwankaTemplate,
    category: "gry-nowe",
  },
  kodowanie: {
    title: "Kodowanie Kolorem",
    subtitle: "P/S/K — zielony / żółty / czerwony",
    icon: "🎨",
    color: "#7C3AED",
    component: KodowanieTemplate,
    category: "gry-nowe",
  },
  historyjka: {
    title: "Historyjka Obrazkowa",
    subtitle: "4 kadry — ułóż i opowiedz",
    icon: "📖",
    color: "#FACC15",
    component: HistoryjkaTemplate,
    category: "gry-nowe",
  },
  "cymatic-frequencies": {
    title: "Cymatyczne Czestotliwosci",
    subtitle: "Dzwiek tworzy geometrie — 3 strony",
    icon: "~",
    color: "#6366F1",
    component: CymaticFrequenciesTemplate,
    category: "cymatics",
  },
  "standing-waves": {
    title: "Fale Stojace",
    subtitle: "Chladni — wzorce stojace — 2 strony",
    icon: "~",
    color: "#0891B2",
    component: StandingWavesTemplate,
    category: "cymatics",
  },
  "sacred-vowels": {
    title: "Swiete Samogloski",
    subtitle: "Cymatyka samoglosek — geometria glosu — 3 strony",
    icon: "O",
    color: "#A855F7",
    component: SacredVowelsTemplate,
    category: "cymatics",
  },
  "breath-geometry": {
    title: "Geometria Oddechu",
    subtitle: "Oddech = fala stojaca — 2 strony",
    icon: "D",
    color: "#DC2626",
    component: BreathGeometryTemplate,
    category: "cymatics",
  },
  "harmonic-body": {
    title: "Harmonijne Cialo",
    subtitle: "Dzwiek rezonuje z komorkami — 3 strony",
    icon: "C",
    color: "#059669",
    component: HarmonicBodyTemplate,
    category: "cymatics",
  },
  ...themedEntries,
  ...Object.fromEntries(
    ZESTAWY.map((z) => [
      z.slug,
      {
        title: z.title,
        subtitle: z.subtitle,
        icon: "?",
        color: z.color,
        component: makeZagadkiComponent(z.slug),
        category: "zagadki",
        level: z.level,
      },
    ])
  ),
};

export const templateList = Object.entries(templates).map(([slug, v]) => ({ slug: slug as TemplateSlug, ...v }));
