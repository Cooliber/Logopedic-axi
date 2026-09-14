// Konstelacje — mapping temat×szereg → słowa → prompt HF + doodle + pozycja
// Uzupełniane równolegle przez agenta HF text-to-image.
// Póki co — struktura + helpery do generowania promptów, placeholdery na URL-e.

import type { ThemeId, SzeregId } from "./catalog";
import { WORD_POOLS, BASE_WORDS } from "./wordPools";
import { THEMES } from "./catalog";

export type ConstellationNode = {
  word: string;
  theme: ThemeId;
  szereg: SzeregId;
  pos: "P" | "S" | "K";
  hfPrompt: string;
  hfImageUrl?: string; // uzupełni agent HF gdy wygeneruje
  doodleDataUri?: string; // fallback lokalny z icons.tsx
  status: "pending" | "generated" | "fallback";
};

// Generator promptu HF — split canonical WORD vs HERO (REALNE_POTRZEBY §4)
// WORD canonical: white bg, bez tła tematycznego — reużywalny na wszystkich kartach (opcja A)
// HERO: z tłem tematycznym, do PageHeader / Gallery
export function wordToHfPrompt(word: string, theme?: ThemeId, szereg?: SzeregId): string {
  // canonical WORD — theme ignorowany celowo (282 distinct words, 1 generacja pokrywa wiele kart)
  // Jeśli potrzebny themed wariant, wywołaj wordToHfPromptThemed()
  return `cute doodle icon of single object "${word.toLowerCase()}" for children, hand-drawn thick black outline 2.5px, pastel colors, white background centered, no theme background, no text, no letters, no watermark, children's book illustration, kawaii, friendly, 1024x1024`;
}

export function wordToHfPromptThemed(word: string, theme: ThemeId, szereg: SzeregId): string {
  const t = THEMES.find((x) => x.id === theme)!;
  const szeregLabel = { syczacy: "s z c dz", szumiacy: "sz ż cz dż", ciszacy: "ś ź ć dź", rotacyzm: "r" }[szereg];
  return `doodle icon hand-drawn minimal flat vector of "${word.toLowerCase()}" for kids, theme ${t.label} (${t.blurb}), color pastel ${t.light}, szereg ${szeregLabel}, thick black outline 2.5px dashed border, rounded 12px, white background, 48x48, no text, no emoji, child-friendly logopedia card`;
}

export function themeToCoverPrompt(theme: ThemeId): string {
  const t = THEMES.find((x) => x.id === theme)!;
  // hero style per temat z anim/src/config.ts THEME_STYLE_HINT (doodle/watercolor/kawaii/flat/clay)
  return `cover illustration for kids logopedia theme "${t.label}" — ${t.blurb}, doodle style, pastel palette ${t.color} on ${t.light}, hand-drawn, rounded, dashed border, A4 header banner, playful, no text, 1024x1024`;
}

export function buildWordPromptCanonical(word: string): { prompt: string; negative_prompt: string } {
  return {
    prompt: wordToHfPrompt(word),
    negative_prompt: "photorealistic, 3d render, dark, scary, horror, blurry, low quality, watermark, signature, text, letters, words, deformed, extra fingers, cropped, no text, no letters",
  };
}

export function buildHeroPrompt(theme: ThemeId): { prompt: string; negative_prompt: string } {
  return {
    prompt: themeToCoverPrompt(theme),
    negative_prompt: "photorealistic, 3d render, dark, scary, horror, blurry, low quality, watermark, signature, text, letters, words, deformed",
  };
}

// Buduje konstelację dla danego tematu+szeregu (lista słów → nody)
export function buildConstellation(theme: ThemeId, szereg: SzeregId): ConstellationNode[] {
  const pool = WORD_POOLS[theme]?.[szereg] ?? BASE_WORDS[szereg];
  return pool.map((e) => ({
    word: e.w,
    theme,
    szereg,
    pos: e.pos,
    hfPrompt: wordToHfPrompt(e.w, theme, szereg),
    status: "pending" as const,
  }));
}

// Wszystkie konstelacje (14 tematów × 4 szeregi) — do batch generowania HF
export function allConstellations(): Record<string, ConstellationNode[]> {
  const out: Record<string, ConstellationNode[]> = {};
  for (const t of THEMES) {
    for (const s of ["syczacy", "szumiacy", "ciszacy", "rotacyzm"] as SzeregId[]) {
      const key = `${s}-${t.id}`;
      out[key] = buildConstellation(t.id, s);
    }
  }
  return out;
}

// Stats — ile słów do wygenerowania per temat
export function constellationStats() {
  const all = allConstellations();
  const totalNodes = Object.values(all).flat().length;
  const totalThemes = THEMES.length;
  const totalSlugs = Object.keys(all).length;
  return { totalThemes, totalSlugs, totalNodes, perSlug: Math.round(totalNodes / totalSlugs) };
}

// Placeholder manifest dla agenta HF — zapis do /tmp/hf-manifest.json gdy potrzebny
export function hfManifest() {
  const all = allConstellations();
  return Object.entries(all).map(([slug, nodes]) => ({
    slug,
    theme: slug.split("-").slice(-1)[0],
    szereg: slug.split("-").slice(0, -1).join("-"),
    count: nodes.length,
    prompts: nodes.map((n) => ({ word: n.word, pos: n.pos, prompt: n.hfPrompt })),
  }));
}
