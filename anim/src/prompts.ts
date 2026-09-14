// anim/src/prompts.ts — prompt builder dla kart logopedycznych
// Zasady: natural language dla FLUX, tag-style dla SDXL.
// Wszystkie prompty generują obrazy BEZ tekstu w środku (tekst psuje PDF), z białym tłem.

import { THEME_STYLE_HINT } from "./config.js";

export type KidStyle = "doodle" | "doodleColoring" | "kawaii" | "watercolor" | "flat" | "clay" | "flashcard";

export const STYLE_PRESETS: Record<KidStyle, { promptSuffix: string; negativePrompt: string }> = {
  // FLASHCARD — kanon dla ikon słów na kartach pracy (lock stylu z audytu koherencji).
  // Zawsze ten sam szablon, zmienia się tylko obiekt. Flat 2D + gruby kontur = spójne z SVG doodle.
  flashcard: {
    promptSuffix:
      "kids speech therapy flashcard icon, flat 2D vector illustration, filled with flat soft pastel colors, thick clean black outline, rounded friendly shapes, very minimal details, plain pure white background with nothing else on it, no shading, no shadows, no gradient, no 3D, no photo, no realism, no texture, no frame, no border around the image, image only, without any text, without any letters, without any words, without any captions, without any labels, without any writing, without any watermark, without any signature, children's picture dictionary style, centered composition, high clarity",
    negativePrompt:
      "photo, photorealistic, realistic, 3d render, gradient shading, soft shadows, busy background, scenery, complex details, dark colors, scary, creepy, watermark, signature, text, letters, words, writing, signage, label, caption, font, typography, deformed, extra fingers, cropped, multiple objects, frame, border, line art, coloring page, black and white",
  },
  doodle: {
    promptSuffix:
      "doodle style, hand-drawn, thick black outline 2.5px, vibrant pastel colors, pure white background #FFFFFF, isolated centered object occupies 60% frame, detailed illustration, expressive features, soft pastel shading, children's book illustration, rounded 12px, dashed border, kawaii, friendly, distinctive, recognizable silhouette at small size, no text, no letters, no words, no writing, no signage",
    negativePrompt:
      "photorealistic, 3d render, dark, scary, horror, blurry, low quality, watermark, signature, text, letters, words, writing, signage, label, font, typography, deformed, extra fingers, cropped, background scenery, multiple objects",
  },
  // Wariant kolorowanki — mandala/kolorowanka: biały środek, gruby kontur 2.5px, dziecko koloruje (metodyka modularna M5)
  // Używaj dla M5 WordsMandala (canonical words) — outline + white interior
  doodleColoring: {
    promptSuffix:
      "doodle coloring book style, thick black outline 2.5px, white interior for coloring, minimal pastel border only, white background, simple shapes, children's coloring page, outline illustration, no shading, no shadows, clean line art, no text, no letters, no writing",
    negativePrompt:
      "photorealistic, 3d render, gradient shading, colored fill, dark background, crowded details, text, letters, words, writing, signage, watermark, blurry, deformed, extra fingers, cropped, shadows",
  } as unknown as { promptSuffix: string; negativePrompt: string },
  kawaii: {
    promptSuffix:
      "kawaii chibi style, big eyes, pastel palette, white background, cute, soft shading, children's sticker, minimal detail, no text, no letters, no writing",
    negativePrompt:
      "photorealistic, realistic, horror, creepy, dark, nsfw, blurry, text, letters, words, writing, signage, watermark, deformed",
  },
  watercolor: {
    promptSuffix:
      "soft watercolor illustration, light washes, white paper background, gentle brush strokes, children's picture book, warm and cozy, no text, no letters, no writing",
    negativePrompt:
      "photorealistic, 3d, plastic, glossy, dark, scary, text, letters, words, writing, signage, watermark, blurry, deformed",
  },
  flat: {
    promptSuffix:
      "flat vector illustration, minimal, geometric shapes, pastel, white background, clean, modern children's design, no text, no letters, no writing",
    negativePrompt:
      "photorealistic, gradients heavy, shadows, 3d, scary, blurry, text, letters, words, writing, signage, watermark, deformed, photo",
  },
  clay: {
    promptSuffix:
      "claymation style, soft plasticine, rounded, toy-like, pastel, white background, cute 3d but soft, children's toy photo, no text, no letters, no writing",
    negativePrompt:
      "scary, horror, photorealistic human, blurry, text, letters, words, writing, signage, watermark, deformed, extra limbs",
  },
};

// Bazowy bezpieczny negative dla FLUX (FLUX ignoruje negative_prompt, ale provider może go użyć) — v3 NO TEXT strict
export const SAFE_NEGATIVE =
  "no text, no letters, no words, no writing, no signage, no label, no font, no typography, no watermark, no scary, no horror, no creepy, no blood, no violence";

export type PromptInput = {
  subject: string; // np. "smiling owl" | "red rocket"
  theme?: string; // kosmos, zwierzaki...
  szereg?: string;
  style?: KidStyle;
  extra?: string; // dodatkowe wskazówki np. "wearing scarf"
};

export function buildPrompt({ subject, theme, style = "doodle", extra }: PromptInput): {
  prompt: string;
  negative_prompt: string;
} {
  const preset = STYLE_PRESETS[style];
  const themeHint = theme ? THEME_STYLE_HINT[theme] ?? theme : "";
  // FLUX = natural language, zdania. SDXL = tag list — tu generujemy natural language (uniwersalny)
  // Gdy subject już jest opisem ilustracji (flashcard/hero/canonical), nie wrapuj w "a cute ... for children" — unika duplikatów typu "a cute simple cute illustration"
  const head = /illustration|object|icon|cover|banner/i.test(subject) ? subject : `a cute ${subject} for children`;
  const parts = [
    head,
    themeHint ? `in a ${themeHint} setting` : "",
    extra ?? "",
    preset.promptSuffix,
  ].filter(Boolean);

  const prompt = parts.join(", ");
  const negative_prompt = [preset.negativePrompt, SAFE_NEGATIVE].join(", ");
  return { prompt, negative_prompt };
}

// Gotowe prompty dla pilot batch (mapuje na wordPools + catalog)
export const PILOT_PROMPTS: Array<PromptInput & { id: string; word?: string }> = [
  // tematy — hero images (1 na temat, do nagłówka karty)
  { id: "hero-kosmos", subject: "friendly rocket with big eyes flying among smiling planets and stars", theme: "kosmos", style: "doodle" },
  { id: "hero-zwierzaki", subject: "group of cute zoo animals — lion, zebra and owl smiling together", theme: "zwierzaki", style: "doodle" },
  { id: "hero-pojazdy", subject: "happy red car and yellow bus on a road", theme: "pojazdy", style: "doodle" },
  { id: "hero-ocean", subject: "smiling shark and turtle swimming over coral reef", theme: "ocean", style: "doodle" },
  { id: "hero-dinozaury", subject: "friendly baby T-Rex and triceratops playing", theme: "dinozaury", style: "doodle" },
  { id: "hero-las", subject: "cozy forest with owl on pine tree and mushrooms", theme: "las", style: "watercolor" },
  { id: "hero-jedzenie", subject: "cute fruits and vegetables with smiling faces on a kitchen table", theme: "jedzenie", style: "kawaii" },
  { id: "hero-sport", subject: "kids playing football on a field, joyful", theme: "sport", style: "flat" },
  // Faza A — 6 brakujących hero (REALNE_POTRZEBY §3) — dom, ubrania, pogoda, muzyka, ogrod, miasto
  { id: "hero-dom", subject: "cozy living room with sofa and curtains and lamp, warm and friendly", theme: "dom", style: "flat" },
  { id: "hero-ubrania", subject: "cute wardrobe with dresses and jackets and hats, colorful and organized", theme: "ubrania", style: "kawaii" },
  { id: "hero-pogoda", subject: "cheerful sun and clouds and rainbow over hills", theme: "pogoda", style: "watercolor" },
  { id: "hero-muzyka", subject: "happy kids playing instruments — guitar and drum and trumpet", theme: "muzyka", style: "flat" },
  { id: "hero-ogrod", subject: "beautiful garden with flowers and vegetables and ladybug", theme: "ogrod", style: "watercolor" },
  { id: "hero-miasto", subject: "friendly city street with shops and tram and houses", theme: "miasto", style: "flat" },
  { id: "hero-hawaje", subject: "tropical Hawaii beach with palm tree, hibiscus flower, smiling sun and gentle waves", theme: "hawaje", style: "watercolor" },
  { id: "hero-halloween", subject: "cute friendly Halloween pumpkins and smiling ghost with candy, not scary", theme: "halloween", style: "kawaii" },
  { id: "hero-minecraft", subject: "friendly blocky minecraft grass block and pickaxe, cute pixel style, not scary", theme: "minecraft", style: "flat" },
  // słowa — ikonki do Kart Pracy (zastępują / uzupełniają wordSvg)
  { id: "word-SOWA", word: "SOWA", subject: "cute fluffy owl with big round eyes", theme: "las", style: "doodle" },
  { id: "word-RAKIETA", word: "RAKIETA", subject: "cartoon rocket with window and fins, smiling", theme: "kosmos", style: "doodle" },
  { id: "word-SZOP", word: "SZOP", subject: "cute raccoon washing its hands", theme: "zwierzaki", style: "doodle" },
  { id: "word-REKIN", word: "REKIN", subject: "friendly smiling shark, not scary", theme: "ocean", style: "kawaii" },
  { id: "word-SAMOCHOD", word: "SAMOCHÓD", subject: "happy red car with eyes on wheels", theme: "pojazdy", style: "doodle" },
  { id: "word-SER", word: "SER", subject: "cute wedge of cheese with holes smiling", theme: "jedzenie", style: "kawaii" },
  { id: "word-RYBA", word: "RYBA", subject: "smiling orange fish with big fins", theme: "ocean", style: "doodle" },
  { id: "word-SZYSZKA", word: "SZYSZKA", subject: "cute pine cone with face", theme: "las", style: "doodle" },
  // FAZA A — TOP20 missing canonical (REALNE_POTRZEBY §3, audyt freq) — canonical white bg, bez theme
  { id: "word-MIS", word: "MIŚ", subject: "cute teddy bear with bow tie, single centered object", style: "doodle" },
  { id: "word-TOR", word: "TOR", subject: "straight train track with wooden sleepers, single object", style: "doodle" },
  { id: "word-LAS", word: "LAS", subject: "cute small forest with three pine trees, simple", style: "doodle" },
  { id: "word-ROG", word: "RÓG", subject: "cute animal horn, curved, single object", style: "doodle" },
  { id: "word-SZKLO", word: "SZKŁO", subject: "shiny glass pane square, simple, cute", style: "doodle" },
  { id: "word-KOSZYK", word: "KOSZYK", subject: "cute wicker basket with handle, single object", style: "doodle" },
  { id: "word-SCIANA", word: "ŚCIANA", subject: "cute brick wall section, simple, friendly", style: "doodle" },
  { id: "word-CZAJNIK", word: "CZAJNIK", subject: "cute kettle teapot with spout and handle, smiling", style: "doodle" },
  { id: "word-ROBOT", word: "ROBOT", subject: "friendly cute robot with antenna, single object", style: "doodle" },
  { id: "word-KRATER", word: "KRATER", subject: "moon crater round, cute, simple", style: "doodle" },
  { id: "word-KORONA", word: "KORONA", subject: "golden crown with jewels, cute, single centered", style: "doodle" },
  { id: "word-RYS", word: "RYS", subject: "cute lynx wild cat with pointy ears, friendly", style: "doodle" },
  { id: "word-ZAJAC", word: "ZAJĄC", subject: "cute hare bunny with long ears, friendly", style: "doodle" },
  { id: "word-ZUBR", word: "ŻUBR", subject: "cute bison with horns, friendly, simple", style: "doodle" },
  { id: "word-SZYNSZYLA", word: "SZYNSZYLA", subject: "cute chinchilla small rodent with fluffy tail", style: "doodle" },
  { id: "word-CIENIE", word: "CIENIE", subject: "cute soft shadows puppet shapes on wall, friendly, not scary", style: "doodle" },
  { id: "word-CYKL", word: "CYKL", subject: "cute bicycle wheel cycle, simple", style: "doodle" },
  { id: "word-SZUM", word: "SZUM", subject: "cute wind blowing through leaves, sound waves, friendly", style: "doodle" },
  { id: "word-ZYLA", word: "ŻYŁA", subject: "cute leaf vein pattern close-up, simple", style: "doodle" },
  { id: "word-CZAPLA", word: "CZAPLA", subject: "cute heron bird with long legs, friendly", style: "doodle" },
];

// Deterministyczny seed per slowo — research pipeline HF manifest gate §4, seed = hash(word) % 2^31
export function hashWordToSeed(word: string): number {
  let h = 0;
  for (let i = 0; i < word.length; i++) h = (Math.imul(31, h) + word.charCodeAt(i)) | 0;
  return Math.abs(h) % 2147483647;
}

// Helper: prompt dla dowolnego słowa — CANONICAL white bg (bez theme) vs THEMED z theme
export function promptForWord(word: string, theme: string, szereg: string, style: KidStyle = "doodle") {
  const subject = `object representing the Polish word "${word}" — simple, recognizable, child-friendly`;
  return buildPrompt({ subject, theme, szereg, style });
}

export function promptForWordCanonical(word: string, style: KidStyle = "doodle") {
  // REALNE_POTRZEBY §4 + TUNING v3: NO TEXT — nie wstrzykuj polskiego słowa jako tekstu, tylko English
  const subject = `single centered object — cute, simple, child-friendly, isolated on pure white #FFFFFF`;
  return buildPrompt({ subject, style, extra: "single object centered occupies 65% frame, isolated on pure white background #FFFFFF, front view, no other objects, no shadows, no scenery, no text, no letters, no writing" });
}

export function promptForWordCanonicalV2(word: string, english: string, style: KidStyle = "doodle") {
  // v3 NO TEXT: english only, bez Polish word w prompt — model generował napisy, seed deterministyczny
  const subject = `single ${english} — cute, friendly, simple, isolated`;
  return buildPrompt({ subject, style, extra: "single object centered occupies 65% frame, isolated on pure white background #FFFFFF, front view, no other objects, no shadows, no scenery, no text, no letters, no writing, flat vector" });
}

export function promptForHero(theme: string, style: KidStyle = "doodle") {
  const subject = `cover illustration for theme`;
  return buildPrompt({ subject, theme, style, extra: "no text, no letters, no writing, no signage" });
}

// Style lock — doodle vs doodleColoring per M5 (research §4.2, methodology M5 white interior)
export function styleForModule(moduleId: string): KidStyle {
  if (moduleId === "words") return "doodleColoring"; // M5 kolorowanka — white interior
  return "doodle";
}
