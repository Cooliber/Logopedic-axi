// PromptFactory — jeden lock stylu, jeden seed, jedno miejsce na no-text
import { STYLE_PRESETS, type KidStyle, SAFE_NEGATIVE, buildPrompt } from "../prompts";
import { THEME_STYLE_HINT } from "../config";

export type PromptOpts = { style?: KidStyle; english?: string; theme?: string; seed?: number };

function hashWord(word: string): number {
  let h = 0;
  for (let i = 0; i < word.length; i++) h = (h * 31 + word.charCodeAt(i)) >>> 0;
  return h % 4294967296;
}

export const promptFactory = {
  forWord(word: string, opts: PromptOpts = {}) {
    // Kanon słów: flashcard lock — spójny styl z SVG doodle na kartach.
    // english-only subject: model nie dostaje polskiego słowa jako tekstu (nie renderuje napisów).
    const style = opts.style ?? "flashcard";
    const en = opts.english ?? word.toLowerCase();
    const subject = `simple cute illustration of a single ${en}`;
    const extra = "single object, centered, occupies 55% of frame, front view, no other objects, isolated on pure white background";
    const seed = opts.seed ?? hashWord(word);
    const { prompt, negative_prompt } = buildPrompt({ subject, style, extra });
    return { prompt, negative_prompt, seed };
  },

  forHero(theme: string, opts: PromptOpts = {}) {
    const style = opts.style ?? "doodle";
    const subject = `wide banner cover illustration`;
    const extra = "wide banner 16:9, 3 elements, no text, no letters, no writing, no signage";
    const seed = opts.seed ?? hashWord(theme);
    return { ...buildPrompt({ subject, theme, style, extra }), seed };
  },

  // Legacy compat — deleguje do jednego miejsca
  forWordCanonical(word: string, english: string, style: KidStyle = "doodle") {
    return this.forWord(word, { english, style });
  },
};
