// anim/src/batch-package.ts — generacja obrazków dla nowych tematów (hawaje, halloween, minecraft)
// Kanon: flashcard 512x512 dla słów + hero per temat (style wg PILOT_PROMPTS).
// Użycie: bun run src/batch-package.ts [--dry]
import * as fs from "node:fs";
import * as path from "node:path";
import "dotenv/config";
import { generateImage } from "./hf-client.js";
import { MODELS } from "./config.js";
import { promptFactory } from "./core/promptFactory.js";
import type { KidStyle } from "./prompts.js";

const NEW_THEMES = ["hawaje", "halloween", "minecraft"];

const EN_DICT: Record<string, string> = {
  SŁOŃCE: "sun", SALSA: "salsa dip", SÓL: "salt", ZATOKA: "bay", ZABAWA: "children playing",
  CYKADY: "cicada insect", CYKL: "bicycle wheel", OSADA: "small village huts", BASEN: "swimming pool",
  PIASEK: "sand", KOKOS: "coconut", SZUM: "sound waves", SZORTY: "shorts", SZALUPA: "lifeboat",
  ŻÓŁW: "turtle", PLAŻA: "beach", DŻUNGLE: "jungle", ŚCIEŻKA: "forest path", RAFA: "coral reef",
  KORAL: "coral", TRAWNIK: "lawn grass", SŁOIK: "glass jar", ZAGADKA: "puzzle", ZIELONY: "green color splash",
  CEGŁA: "brick", CEL: "target", GŁOS: "sound waves", CZAR: "magic wand sparkles", JEŻ: "hedgehog",
  ŚWIECE: "candles", RYCERZ: "knight", TRUMNIA: "coffin", ŻELAZO: "iron ingot",
  RÓWNOWAGA: "balance scale", KRYSZTAŁ: "crystal", TRAWA: "grass",
  ANANAS: "pineapple", CZAPKA: "cap", REKIN: "shark", RYBA: "fish", SMOK: "dragon",
  SZAFA: "wardrobe", SZKIELET: "skeleton", ŚWIECA: "candle", KORONA: "crown", TORT: "cake",
  SKAŁA: "rock", ZAMEK: "castle", SZKŁO: "glass", SZOP: "raccoon", MYSZ: "mouse",
  GARAŻ: "garage", RURA: "pipe", KRATER: "crater", SOWA: "owl", SOK: "juice glass",
  KOSZ: "basket", KOS: "blackbird", LAS: "pine forest", CIENIE: "soft shadows",
  MIŚ: "teddy bear", ŚLIMAK: "snail", ĆMA: "moth", LIŚĆ: "leaf", KOŚĆ: "bone",
  DŹWIĘK: "sound waves", MUR: "brick wall", TOR: "train track", RÓŻA: "rose flower",
  ŻABA: "frog", ŚNIEG: "snowflake",
};

const HEROES: Array<{ theme: string; style: KidStyle }> = [
  { theme: "hawaje", style: "watercolor" },
  { theme: "halloween", style: "kawaii" },
  { theme: "minecraft", style: "flat" },
];

const isDry = process.argv.includes("--dry");
const isForce = process.argv.includes("--force");
const modelId = (MODELS.schnell as any).id;
const DELAY_MS = 1200;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function normalize(word: string): string {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L").toLowerCase();
}

async function getWords(): Promise<string[]> {
  const mod = await import("../../src/lib/pdf/themes/wordPools.ts" as any);
  const pools = mod.WORD_POOLS as Record<string, Record<string, Array<{ w: string }>>>;
  const set = new Set<string>();
  for (const theme of NEW_THEMES) {
    for (const szereg of Object.keys(pools[theme] ?? {})) {
      for (const e of pools[theme][szereg] ?? []) set.add(e.w);
    }
  }
  return [...set];
}

async function main() {
  const words = await getWords();
  console.log(`batch-package | themes=${NEW_THEMES.join(",")} words=${words.length} model=${modelId} dry=${isDry}`);

  const outDir = path.resolve("assets/output/words");
  const publicWords = path.resolve("../public/anim/words");
  const publicHero = path.resolve("../public/anim/hero");
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(publicWords, { recursive: true });
  fs.mkdirSync(publicHero, { recursive: true });

  // --force: usuń stare pliki (regeneracja z nowym promptem/seedem — spójny styl)
  if (isForce) {
    for (const word of words) {
      const f = `${normalize(word)}.png`;
      for (const dir of [outDir, publicWords]) {
        const p = path.join(dir, f);
        if (fs.existsSync(p)) fs.rmSync(p);
      }
    }
    for (const h of HEROES) {
      const f = `hero-${h.theme}__${h.style}__schnell.png`;
      for (const dir of [path.resolve("assets/output"), publicHero]) {
        const p = path.join(dir, f);
        if (fs.existsSync(p)) fs.rmSync(p);
      }
    }
    console.log("--force: stare pliki usunięte, pełna regeneracja");
  }

  let ok = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const fileName = `${normalize(word)}.png`;
    const outPath = path.join(outDir, fileName);
    const publicPath = path.join(publicWords, fileName);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 20_000) {
      if (!fs.existsSync(publicPath) || fs.statSync(publicPath).size !== fs.statSync(outPath).size) {
        fs.copyFileSync(outPath, publicPath);
      }
      console.log(`[${i + 1}/${words.length}] ${word} SKIP (exists)`);
      ok++;
      continue;
    }

    const en = EN_DICT[word] ?? word.toLowerCase();
    const { prompt, negative_prompt, seed } = promptFactory.forWord(word, { english: en });
    console.log(`[${i + 1}/${words.length}] ${word} -> ${fileName}\n  ${prompt.slice(0, 100)}...`);
    if (isDry) continue;

    const res = await generateImage({ prompt, negative_prompt, model: modelId, width: 512, height: 512, num_inference_steps: 4, guidance_scale: 3.5, seed }, outPath);
    if (res.ok) {
      fs.copyFileSync(outPath, publicPath);
      console.log(`  OK ${res.bytes}B ${res.latencyMs}ms`);
      ok++;
    } else {
      console.log(`  FAIL ${res.error?.slice(0, 160)}`);
      if (res.error?.includes("429") || res.error?.includes("Too Many")) await sleep(10_000);
    }
    await sleep(DELAY_MS);
  }

  // Hero images
  for (const h of HEROES) {
    const file = `hero-${h.theme}__${h.style}__schnell.png`;
    const outPath = path.resolve(`assets/output/${file}`);
    const publicPath = path.join(publicHero, file);
    const { prompt, negative_prompt, seed } = promptFactory.forHero(h.theme, { style: h.style });
    console.log(`\nHERO ${h.theme} (${h.style})\n  ${prompt.slice(0, 100)}...`);
    if (isDry) continue;
    const res = await generateImage({ prompt, negative_prompt, model: modelId, width: 1024, height: 1024, num_inference_steps: 4, guidance_scale: 3.5, seed }, outPath);
    if (res.ok) {
      fs.copyFileSync(outPath, publicPath);
      console.log(`  OK ${res.bytes}B`);
    } else {
      console.log(`  FAIL ${res.error?.slice(0, 160)}`);
    }
    await sleep(DELAY_MS);
  }

  console.log(`\nDONE words=${ok}/${words.length} dry=${isDry} cost ~$${(words.length * 0.003).toFixed(2)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
