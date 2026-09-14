// anim/src/config.ts — modele, providerzy, style presets dla logopedia
import type { KidStyle } from "./prompts.js";
export const HF_TOKEN_ENV = "HF_TOKEN";

// Modele zweryfikowane 2026-09-07 via websearch + inference-providers docs
// Źródło: https://huggingface.co/docs/inference-providers + cenniki fal/replicate
export type ModelId = string;

export const MODELS = {
  // FAST — do iteracji, draftów, batch 100+ dziennie
  schnell: {
    id: "black-forest-labs/FLUX.1-schnell" as ModelId,
    license: "Apache-2.0 (komercyjny OK)",
    steps: 4,
    note: "4 kroki, 1-2s na fal-ai, idealny do szybkiego prototypowania",
    costPerImageUSD: 0.003,
    maxResolution: "1024x1024",
  },
  // QUALITY — do finalnych assetów / hero images
  dev: {
    id: "black-forest-labs/FLUX.1-dev" as ModelId,
    license: "FLUX.1-dev Non-Commercial (via API komercyjny OK — płacisz providerowi)",
    steps: 28,
    note: "28 kroków, najlepsza jakość + tekst w obrazku",
    costPerImageUSD: 0.025,
  },
  // BUDGET STYLIZED — do kreskówki / anime / doodle z LoRA
  sdxl: {
    id: "stabilityai/stable-diffusion-xl-base-1.0" as ModelId,
    license: "CreativeML Open RAIL++M (komercyjny OK)",
    steps: 30,
    note: "Największy ekosystem LoRA, keyword prompting + negative_prompt",
    costPerImageUSD: 0.003,
  },
  // ALTERNATYWY przetestowane (opcjonalne, wymagają provider hf-inference lub together)
  sdxlTurbo: { id: "stabilityai/sdxl-turbo" as ModelId, steps: 4, costPerImageUSD: 0.003 },
  fluxKlein: { id: "black-forest-labs/FLUX.1-Krea-dev" as ModelId, steps: 28, costPerImageUSD: 0.025 },
} as const;

// Providerzy oficjalni dla text-to-image (2026-09)
export const PROVIDERS = {
  "fal-ai":   { task: "text-to-image", latency: "1-3s cold", billing: "per image", bestFor: "FLUX szybko i tanio" },
  "replicate": { task: "text-to-image", latency: "8-15s cold", billing: "per GPU-second", bestFor: "dokumentacja, niezawodność" },
  "together": { task: "text-to-image", latency: "2-4s", billing: "per image", bestFor: "SDXL najtaniej" },
  "hf-inference": { task: "text-to-image", latency: "zmienna", billing: "compute seconds", bestFor: "CPU tasks, free tier" },
  "auto":     { task: "text-to-image", latency: "auto failover", billing: "w zależności od wyboru", bestFor: "start, nie przejmuj się" },
} as const;

// DoodleColoring — alias dla pipeline M5 (words mandala), seed deterministyczny per word
export const COLORING_STYLE: KidStyle = "doodleColoring" as KidStyle;

export type ProviderId = keyof typeof PROVIDERS;

// Domyślna konfiguracja dla logopedia (dzieci 3-9 lat)
export const DEFAULTS = {
  model: MODELS.schnell.id, // start: szybko i tanio
  provider: "auto" as ProviderId, // auto → fal-ai dla FLUX
  width: 1024,
  height: 1024,
  guidanceScale: 3.5,      // FLUX lubi niskie 3-4, SDXL 7-8
  numInferenceSteps: 4,    // dla schnell; dla dev nadpisz na 28
  seed: undefined as number | undefined,
} as const;

// Mapowanie temat → kolorystyka (spójne z src/lib/pdf/themes/catalog.ts)
export const THEME_STYLE_HINT: Record<string, string> = {
  kosmos: "space, rockets, planets, stars, deep navy and purple",
  zwierzaki: "cute animals, zoo, farm, soft greens",
  dinozaury: "jurassic, friendly dinosaurs, jungle greens",
  pojazdy: "cars, trains, planes, bright red and yellow",
  ocean: "sea, beach, coral, turquoise and blue",
  las: "forest, trees, mushrooms, earthy greens",
  jedzenie: "fruits, vegetables, kitchen, warm orange",
  sport: "ball, field, playground, energetic purple",
  dom: "cozy home, room, kitchen, warm beige",
  ubrania: "clothes, wardrobe, pink and soft pastels",
  pogoda: "sun, rain, snow, sky blues",
  muzyka: "instruments, notes, violet stage",
  ogrod: "flowers, garden, spring greens",
  miasto: "street, shops, city, neutral greys",
};

// Szereg → wskazówka terapeutyczna do prompta (nie wymusza słowa, tylko klimat)
export const SZEREG_HINT: Record<string, string> = {
  syczacy: "clear sibilants, smiling mouth",
  szumiacy: "warm shushing sounds",
  ciszacy: "soft whispering sounds",
  rotacyzm: "strong R vibration",
};
