// ModuleContract — budżet A4 per moduł (z docs/methodology/modular-a4-pipeline.md §2)
export type ModuleId = "header" | "personalization" | "hierarchy" | "hero" | "words" | "exercises" | "closing";
export type ModuleContract = {
  id: ModuleId;
  heightBudgetPx: number;
  imageSlots: number;
  textSlots: { maxWords: number; maxChars: number };
  palette: "series" | "neutral";
  fallback: "wordSvg" | "letter" | "none";
};

export const MODULE_BUDGET: Record<ModuleId, ModuleContract> = {
  header: { id: "header", heightBudgetPx: 64, imageSlots: 1, textSlots: { maxWords: 12, maxChars: 80 }, palette: "series", fallback: "letter" },
  personalization: { id: "personalization", heightBudgetPx: 32, imageSlots: 0, textSlots: { maxWords: 6, maxChars: 40 }, palette: "neutral", fallback: "none" },
  hierarchy: { id: "hierarchy", heightBudgetPx: 28, imageSlots: 0, textSlots: { maxWords: 5, maxChars: 30 }, palette: "neutral", fallback: "none" },
  hero: { id: "hero", heightBudgetPx: 108, imageSlots: 1, textSlots: { maxWords: 45, maxChars: 280 }, palette: "series", fallback: "wordSvg" },
  words: { id: "words", heightBudgetPx: 260, imageSlots: 8, textSlots: { maxWords: 12, maxChars: 60 }, palette: "series", fallback: "wordSvg" },
  exercises: { id: "exercises", heightBudgetPx: 180, imageSlots: 4, textSlots: { maxWords: 20, maxChars: 120 }, palette: "series", fallback: "wordSvg" },
  closing: { id: "closing", heightBudgetPx: 72, imageSlots: 4, textSlots: { maxWords: 8, maxChars: 50 }, palette: "neutral", fallback: "letter" },
};

export const TOTAL_BUDGET_PX = 744;
export const TOTAL_WITH_GAPS_PX = 844; // +40 p-5 +60 gap
export const A4_USABLE_PX = 940;

export function auditModules(modules: ModuleId[]) {
  const sum = modules.reduce((s, id) => s + MODULE_BUDGET[id].heightBudgetPx, 0);
  return { sum, ok: sum <= TOTAL_BUDGET_PX, available: A4_USABLE_PX - (sum + 100) };
}
