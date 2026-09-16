// anim/src/prompts.ts — prompt builder dla kart logopedycznych — v4 PREMIUM HQ
// Zasady: natural language dla FLUX, tag-style dla SDXL.
// Wszystkie prompty BEZ tekstu (NO TEXT strict) + pure white #FFFFFF + isolated 65% frame.
// Premium: flashcardPremium = Usborne/Montessori editorial, thick outline 3.5px, pastel flat, 300DPI-ready.

import { THEME_STYLE_HINT } from "./config.js";

export type KidStyle = "doodle" | "doodleColoring" | "kawaii" | "watercolor" | "flat" | "clay" | "flashcard" | "flashcardPremium";

// EN map dla polskich słów — v4 premium używa TYLKO english w prompt (Polish generował napisy)
export const PL_TO_EN: Record<string, string> = {
  SOWA: "owl", RAKIETA: "rocket", SZOP: "raccoon", REKIN: "shark", "SAMOCHÓD": "car", SER: "cheese wedge", RYBA: "fish", SZYSZKA: "pine cone",
  "MIŚ": "teddy bear", TOR: "train track", LAS: "forest with pine trees", "RÓG": "animal horn", "SZKŁO": "glass pane", KOSZYK: "wicker basket", "ŚCIANA": "brick wall", CZAJNIK: "kettle teapot",
  ROBOT: "cute robot", KRATER: "moon crater", KORONA: "golden crown", RYS: "lynx wild cat", "ZAJĄC": "hare bunny", "ŻUBR": "bison", SZYNSZYLA: "chinchilla", CIENIE: "shadow puppets", CYKL: "bicycle wheel", SZUM: "wind blowing leaves", "ŻYŁA": "leaf vein", CZAPLA: "heron bird",
  SŁOŃ: "elephant", ŻABA: "frog", PSZCZÓŁKA: "bee", KOT: "cat", PIES: "dog", KOŃ: "horse", KRÓWKA: "ladybug", MOTYL: "butterfly", ŚLIMAK: "snail", JEŻ: "hedgehog",
  DOM: "cozy house", AUTO: "car", ROWER: "bicycle", SAMOLOT: "airplane", STATEK: "ship", POCIĄG: "train", BALON: "balloon", PIŁKA: "ball", LALKA: "doll", KLOCKI: "building blocks",
};

export const STYLE_PRESETS: Record<KidStyle, { promptSuffix: string; negativePrompt: string }> = {
  // FLASHCARD PREMIUM — v4 HQ: Usborne/Montessori editorial, 600px isolated, 65% frame, 3.5px outline, pastel flat, 300DPI
  flashcardPremium: {
    promptSuffix:
      "premium kids flashcard icon, flat 2D vector illustration, Usborne Montessori editorial style, filled with flat soft pastel colors (warm beige, sage, dusty rose, sky blue), ultra thick clean black outline 3.5px, rounded friendly shapes, ultra minimal details, single object only, plain pure white background #FFFFFF with nothing else, no shading, no shadows, no gradient, no 3D, no photo, no realism, no texture, no frame, no border, image only, without any text, without any letters, without any words, without any captions, without any labels, without any writing, without any watermark, without any signature, centered composition occupies 65% frame, front view, high clarity, print-ready 300 DPI, isolated, crisp edges",
    negativePrompt:
      "photo, photorealistic, realistic, 3d render, gradient shading, soft shadows, drop shadow, busy background, scenery, landscape, horizon, complex details, dark colors, neon, scary, creepy, horror, watermark, signature, text, letters, words, writing, signage, label, caption, font, typography, calligraphy, deformed, extra fingers, mutated, cropped, multiple objects, two objects, group, frame, border, line art only, black and white, coloring page, sketch, pencil",
  },
  // FLASHCARD — legacy (zachowany dla kompatybilności batch)
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

// Bazowy bezpieczny negative dla FLUX (FLUX ignoruje negative_prompt, ale provider może go użyć) — v4 PREMIUM NO TEXT strict + isolated single object
export const SAFE_NEGATIVE =
  "no text, no letters, no words, no writing, no signage, no label, no font, no typography, no watermark, no calligraphy, no scary, no horror, no creepy, no blood, no violence, no multiple objects, no group, no two objects, no background scenery, no horizon, no shadows";

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
  // v4 premium: dla flashcardPremium NIE dodawaj themeHint (isolated single object na białym) — theme psuje izolację
  const useThemeHint = style !== "flashcardPremium" && style !== "flashcard";
  const themeHint = useThemeHint && theme ? THEME_STYLE_HINT[theme] ?? theme : "";
  const head = /illustration|object|icon|cover|banner|single/i.test(subject) ? subject : `a cute ${subject} for children`;
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

// v4 PREMIUM WRAPPER — najwyższa jakość dla kart przed dzieckiem (isolated 65% frame, EN only, no theme bleed)
export function premiumPromptForWord(word: string, style: KidStyle = "flashcardPremium") {
  const en = PL_TO_EN[word] ?? word.toLowerCase();
  const subject = `single ${en} — cute, friendly, simple, isolated, centered`;
  return buildPrompt({ subject, style, extra: "single object centered occupies 65% frame, isolated on pure white background #FFFFFF, front view, no other objects, no shadows, no scenery, no text, no letters, no writing, flat vector, Usborne style, print-ready" });
}
export function premiumPromptForHero(theme: string, style: KidStyle = "doodle") {
  const subject = `premium cover illustration for ${theme} theme — 2-3 cute objects max, editorial, warm`;
  return buildPrompt({ subject, theme, style, extra: "no text, no letters, no writing, no signage, white background vignette, editorial premium" });
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
export function promptForWord(word: string, theme: string, szereg: string, style: KidStyle = "flashcardPremium") {
  // v4: używaj EN map, nie Polish word (unikaj napisów w obrazku)
  const en = PL_TO_EN[word] ?? word.toLowerCase();
  const subject = `single ${en} — cute, friendly, simple, isolated`;
  return buildPrompt({ subject, theme, szereg, style, extra: "single object centered occupies 65% frame, isolated on pure white background #FFFFFF, front view, no other objects, no shadows, no scenery, no text, no letters, no writing" });
}

export function promptForWordCanonical(word: string, style: KidStyle = "flashcardPremium") {
  const en = PL_TO_EN[word] ?? word.toLowerCase();
  const subject = `single ${en} — cute, simple, child-friendly, isolated on pure white #FFFFFF`;
  return buildPrompt({ subject, style, extra: "single object centered occupies 65% frame, isolated on pure white background #FFFFFF, front view, no other objects, no shadows, no scenery, no text, no letters, no writing, flat vector" });
}

export function promptForWordCanonicalV2(word: string, english: string, style: KidStyle = "flashcardPremium") {
  const subject = `single ${english} — cute, friendly, simple, isolated`;
  return buildPrompt({ subject, style, extra: "single object centered occupies 65% frame, isolated on pure white background #FFFFFF, front view, no other objects, no shadows, no scenery, no text, no letters, no writing, flat vector" });
}

export function promptForHero(theme: string, style: KidStyle = "doodle") {
  const subject = `premium cover illustration for ${theme} theme — editorial, warm, 2-3 cute objects`;
  return buildPrompt({ subject, theme, style, extra: "no text, no letters, no writing, no signage, soft vignette, premium editorial" });
}

// Style lock — doodle vs doodleColoring per M5 (research §4.2, methodology M5 white interior)
export function styleForModule(moduleId: string): KidStyle {
  if (moduleId === "words") return "doodleColoring"; // M5 kolorowanka — white interior
  return "doodle";
}
