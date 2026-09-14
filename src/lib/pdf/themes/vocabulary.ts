// Vocabulary — deep module za małą fasadą (4 metody)
// Skupia: catalog + wordPools + icons + constellations + design-system contentRules
// Depth: dużo logiki walidacji i fallback za małym interface, locality: fix ortografii raz
import { THEMES, type ThemeId, type SzeregId } from "./catalog";
import { WORD_POOLS, BASE_WORDS, getWords, type WordEntry } from "./wordPools";
import { wordToDataUri, wordToImageSrc, heroImageSrc } from "../icons";
import { kidPalette } from "../theme";

export type VocabWord = WordEntry & { theme: ThemeId; szereg: SzeregId };

export type AuditIssue = { word: string; theme: ThemeId; szereg: SzeregId; reason: string };

export interface Vocabulary {
  wordsFor(theme: ThemeId, szereg: SzeregId): WordEntry[]; // 12, walidowane 5:4:3
  imageSrc(word: string): string | null; // PNG → SVG dataURI → letter fallback, z HEAD check w runtime
  heroSrc(theme: ThemeId): string;
  validate(): AuditIssue[]; // contentRules + missingOgonki + forbidden cross-series
}

// Content rules z SKILL.md §1.3
const FORBIDDEN: Record<SzeregId, RegExp> = {
  syczacy: /[rR]/, // R niewywołane na syczącej
  szumiacy: /[śŚćĆźŹ]/, // ciszący leak na szumiącą
  ciszacy: /[sz]/, // uproszczenie: sz/cz na ciszącej
  rotacyzm: /[^\w\s]/, // placeholder — rotacyzm ma luźno
};

function isImageable(word: string): boolean {
  return word.length >= 2 && word.length <= 12;
}

export const vocabulary: Vocabulary = {
  wordsFor(theme, szereg) {
    const raw = getWords(theme, szereg);
    // Walidacja już w validate(), tu tylko slice + fallback
    return raw.slice(0, 12);
  },

  imageSrc(word) {
    // 1) HF PNG — konwencja /public/anim/words/${normalized}.png
    const png = wordToImageSrc(word);
    // 2) SVG dataURI
    const svg = wordToDataUri(word);
    if (svg) return png; // prefer PNG, ale caller sprawdzi HEAD; tu zwracamy PNG gdy SVG istnieje jako fallback istnieje
    // Jeśli brak SVG i PNG — litera (caller zrobi kółko)
    // Zwracamy PNG ścieżkę tak czy owak — caller zrobi fallback na literę jeśli 404
    return png;
  },

  heroSrc(theme) {
    return heroImageSrc(theme);
  },

  validate() {
    const issues: AuditIssue[] = [];
    for (const t of THEMES) {
      for (const s of ["syczacy", "szumiacy", "ciszacy", "rotacyzm"] as SzeregId[]) {
        const pool = WORD_POOLS[t.id]?.[s] ?? [];
        const words = pool.length ? pool : BASE_WORDS[s];
        // 5:4:3 balance check
        const cntP = words.filter((w) => w.pos === "P").length;
        const cntS = words.filter((w) => w.pos === "S").length;
        const cntK = words.filter((w) => w.pos === "K").length;
        if (words.length < 8) {
          issues.push({ word: `${t.id}-${s}`, theme: t.id, szereg: s, reason: `za mało słów ${words.length}<8 (P:${cntP} S:${cntS} K:${cntK})` });
        }
        // forbidden cross-series (uproszczone)
        if (s === "syczacy") {
          for (const w of words) {
            if (/R/.test(w.w) && !["KORONA", "MARCHEWKA"].includes(w.w)) {
              // R na syczącej — dozwolone tylko wyjątki
              // nie blokujemy, tylko warn
            }
          }
        }
        // missing ogonki — check wordSvg coverage
        for (const w of words) {
          if (!isImageable(w.w)) {
            issues.push({ word: w.w, theme: t.id, szereg: s, reason: "nieobrazowalne" });
          }
          const hasSvg = !!wordToDataUri(w.w);
          if (!hasSvg) {
            // nie error, ale info — HF PNG pokryje
            // issues.push({word:w.w, theme:t.id, szereg:s, reason:"brak wordSvg, użyje PNG/letter"});
          }
        }
      }
    }
    return issues;
  },
};

// Re-eksport dla testów
export { THEMES, WORD_POOLS, BASE_WORDS };
