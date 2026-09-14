/**
 * DESIGN SYSTEM — system dla systemów spójności wizualnej
 * Single source of truth dla wszystkich kart PDF.
 * 
 * Po co system-dla-systemów?
 * - Każda karta ma własną paletę (szereg), ale musi wyglądać jak z jednej rodziny
 * - Tokeny → Komponenty → Layout → Treść → Audyt = zamknięta pętla
 * - Zmiana tokena propaguje na 11+ szablonów bez dryfu wizualnego
 */

// ═══════════════════════════════════════════
// 1. TOKENS — atomy
// ═══════════════════════════════════════════

export const tokens = {
  color: {
    ink: "#1A1A2E",
    muted: "#6B7280",
    mutedLight: "#9CA3AF",
    border: "#E5E7EB",
    borderLight: "#F3F4F6",
    white: "#FFFFFF",
    paper: {
      cream: "#FFFBEB",      // BDA: warm vs stark white
      mint: "#F0FDF4",
      lavender: "#F5F3FF",
      peach: "#FFF7ED",
      sky: "#F0F9FF",
    },
    xp: "#FACC15",
    xpBorder: "#EAB308",
    success: "#22C55E",
    successBg: "#ECFDF5",
  },
  radius: {
    card: "16px",      // DottedCard
    cardLg: "22px",    // PageHeader
    hero: "28px",      // Dyplom outer
    pill: "9999px",    // rounded-full
    bubble: "14px",    // WordBubble
    image: "10px",     // word img
  },
  border: {
    card: "2.5px dashed",
    cardSolid: "2.5px solid",
    pill: "1.5px solid",
    image: "1.8px solid",
    focus: "3px solid rgba(0,0,0,0.08)",
  },
  shadow: {
    card: "0 2px 0 rgba(0,0,0,0.08)",
    header: "0 4px 0 rgba(0,0,0,0.08)",
  },
  spacing: {
    page: 24,   // p-6 = 24px = 9mm, research §4.2 safe 12mm outer (ISO 216 A4 210x297 @300dpi)
    cardGap: 12, // gap-3
    inner: 16,   // p-4
    sectionMb: 12,
    bleed: 3,    // 3mm bleed gdy tlo do krawedzi (takumi margin:0 + bleed style)
    safeZone: 12, // 12mm safe dla laminowania — nic waznego blizej krawedzi
  },
  typo: {
    // Research 2026-09-14 §4.2: infant font 14-18pt print ~11-12px PDF, LH 1.6, tracking 0.3px, left-align
    hero: "text-[20px] font-extrabold leading-none tracking-tight",
    subtitle: "text-[10px] font-bold tracking-widest uppercase",
    label: "text-[9px] font-black tracking-widest uppercase",
    labelSm: "text-[8px] font-black tracking-widest uppercase",
    body: "text-[11px] font-bold leading-[1.6] tracking-[0.3px]",
    bodyLg: "text-[12px] font-extrabold leading-tight tracking-[0.3px]",
    small: "text-[8px] font-bold leading-[1.4] tracking-[0.3px]",
    caption: "text-[8px] font-bold leading-tight tracking-[0.3px]",
  },
  a11y: {
    minContrast: 4.5,
    minBodyPt: 11,
    lineHeight: 1.6,
    letterSpacing: "0.3px",
  },
} as const;

// ═══════════════════════════════════════════
// 2. SERIES — palety per szereg (max 3 kolory + 1 akcent per karta, §3.2)
// ═══════════════════════════════════════════

export type SeriesId = "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm" | "plynnosc" | "dialog" | "oddech" | "planszowka";

export const series = {
  syczacy:   { primary: "#FACC15", secondary: "#047857", accent: "#BE185D", light: "#FEF9C3", dark: "#713F12", border: "#FDE68A", paper: tokens.color.paper.cream },
  szumiacy:  { primary: "#2D6A4F", secondary: "#065F46", accent: "#B45309", light: "#D8F3DC", dark: "#1B4332", border: "#95D5B2", paper: tokens.color.paper.mint },
  ciszacy:   { primary: "#7C3AED", secondary: "#6D28D9", accent: "#9D174D", light: "#F5F3FF", dark: "#4C1D95", border: "#DDD6FE", paper: tokens.color.paper.lavender },
  rotacyzm:  { primary: "#C2410C", secondary: "#78350F", accent: "#B91C1C", light: "#FFF7ED", dark: "#7C2D12", border: "#FDBA74", paper: tokens.color.paper.peach },
  plynnosc:  { primary: "#0077B6", secondary: "#0369A1", accent: "#92400E", light: "#CAF0F8", dark: "#023E8A", border: "#7DD3E8", paper: tokens.color.paper.sky },
  dialog:    { primary: "#7B2CBF", secondary: "#9D174D", accent: "#92400E", light: "#F3E8FF", dark: "#3A0CA3", border: "#E9D5FF", paper: "#FDF4FF" },
  oddech:    { primary: "#BE123C", secondary: "#047857", accent: "#92400E", light: "#FFEBEE", dark: "#660708", border: "#FECACA", paper: "#FFF1F2" },
  planszowka:{ primary: "#BE123C", secondary: "#1D4ED8", accent: "#92400E", light: "#FFF0F5", dark: "#1A1A2E", border: "#FFB5D8", paper: "#FFF8F0" },
  // Aliasy dla backward compat (stare klucze w template)
  sycy:      { primary: "#FACC15", secondary: "#047857", accent: "#BE185D", light: "#FEF9C3", dark: "#713F12", border: "#FDE68A", paper: tokens.color.paper.cream },
  szum:      { primary: "#2D6A4F", secondary: "#065F46", accent: "#B45309", light: "#D8F3DC", dark: "#1B4332", border: "#95D5B2", paper: tokens.color.paper.mint },
  cisz:      { primary: "#7C3AED", secondary: "#6D28D9", accent: "#9D174D", light: "#F5F3FF", dark: "#4C1D95", border: "#DDD6FE", paper: tokens.color.paper.lavender },
  r:         { primary: "#C2410C", secondary: "#78350F", accent: "#B91C1C", light: "#FFF7ED", dark: "#7C2D12", border: "#FDBA74", paper: tokens.color.paper.peach },
} as const;

// ═══════════════════════════════════════════
// 3. LAYOUT — A4 constraints + moduły (§3.4 / metodyka modularna)
// ═══════════════════════════════════════════

export const layout = {
  page: {
    size: "A4" as const,
    margin: 0, // padding w szablonie
    padding: 24, // 9mm = 24px @~72dpi Takumi (research bleed 3mm + safe 12mm)
    safeZone: 12, // 12mm min od krawędzi dla laminowania (research §4.2)
    bleed: 3, // 3mm bleed gdy eko=false i tło kolorowe
    usablePx: 932, // 794 Takumi px - 2*24 - safeZone mapping
  },
  grid: {
    wordsPerRow: 4,
    wordsTotal: { min: 8, max: 12, ideal: 8 },
    gap: 10,
  },
  sections: {
    order: ["personalization", "header", "hierarchy", "hero", "words", "exercises", "closing"] as const,
    maxSections: 6,
  },
  // Metodyka modułowa A4 — budżet wysokości per moduł (suma 744px + padding/gap = 844px < 932px, 3 strony = 3×744)
  module: {
    header: 64,
    personalization: 32,
    hierarchy: 28,
    hero: 112, // 108→112 (F1 hero 100→112)
    words: 264,      // mandala 8 kafelków + centrum, +4 na 112px word
    exercises: 176,  // pairs / movement / historyjka
    closing: 68,
  } as const,
  totalBudgetPx: 744,
  totalBudget3p: 2232, // 3×744 dla 3p karty (research 2-5 A4)
  pages: { single: 744, triple: 2232 } as const,
} as const;

export type ModuleId = keyof typeof layout.module;

// ═══════════════════════════════════════════
// 4. COMPONENT CONTRACTS — co każdy komponent MUSI i MOŻE
// ═══════════════════════════════════════════

export const componentSpec = {
  PageHeader: { required: ["title", "subtitle", "color"], optional: ["icon", "badge", "heroLetter"], rules: ["rounded 22px", "border 3px rgba(0,0,0,0.08)", "max 1 badge"] },
  PersonalizationBar: { required: ["color"], rules: ["IMIE + DATA + ZROBIONE 3 kropki", "dashed 1.5px #D1D5DB"] },
  HierarchyBar: { required: ["accent"], steps: ["UCHO", "IZOLACJA", "SYLABA", "SŁOWO", "ZDANIE"], rules: ["active = biezący etap"] },
  WordBubble: { required: ["word", "bg"], optional: ["iconSrc", "pos"], rules: ["h-52 w-52 img + 11px word + P/S/K badge", "fallback litera w kółku gdy brak SVG"] },
  DottedCard: { required: ["children"], rules: ["rounded 16px", "2.5px dashed border", "max 3 kolory per karta"] },
  InstructionCard: { required: ["title", "text", "accent"], rules: ["max 3 kroki", "czas 8–10 min", "! w kółku"] },
  SelfRating: { rules: ["3 stany SUPER/OK/JESZCZE", "S/O/J w kółku"] },
  StickerStrip: { rules: ["2px dashed accent", "4 szt per pasek"] },
  CuttingLine: { rules: ["-- WY T N I J -- + dashed #D1D5DB"] },
} as const;

// ═══════════════════════════════════════════
// 5. CONTENT RULES — §1.3 / §4 SKILL
// ═══════════════════════════════════════════

export const contentRules = {
  words: {
    maxPerCard: 12,
    idealPerCard: 8,
    positions: { P: "początek", S: "środek", K: "koniec" },
    balance: "5:4:3 lub 4:2:2 (P/S/K)",
    order: "najpierw P (łatwe), potem S, na końcu K",
    voiceOrder: "bezdźwięczne (S/SZ/Ś) → dźwięczne (Z/Ż/Ź) → afrykaty (C/CZ/Ć)",
    forbidden: "głoski spoza szeregu w dominacji (TRĄBKA na karcie S)",
    orthography: "ortograficznie poprawne, ogonki ąćęłńóśźż obowiązkowo",
  },
  instruction: {
    maxSteps: 3,
    voice: "2. os. lp. tryb rozkazujący: Pokoloruj, Powiedz, Wskaż",
    tone: "zachęta, nie ocena: Spróbuj, nie Musisz",
    time: "8–10 min",
    quotes: "polskie „”",
    negation: "nie + czasownik osobno: nie mów",
  },
  images: {
    minPerCard: 8, // po fix “więcej obrazków”: hero 88 + 8×52 + 3× galeria + historyjka 2×
    maxPerCard: 18,
    style: "hand-drawn SVG via icons.tsx wordSvg → dataURI, 1.8px stroke, rx 12 dashed",
    fallbacks: "litera w kółku gdy brak SVG",
  },
} as const;

// ═══════════════════════════════════════════
// 6. GOVERNANCE — audyt spójności
// ═══════════════════════════════════════════

export type AuditLevel = "error" | "warn" | "info";

export interface AuditIssue {
  level: AuditLevel;
  rule: string;
  message: string;
  file?: string;
}

export function auditDesignSystem(input: {
  seriesId?: SeriesId;
  colorsUsed?: string[];
  wordsCount?: number;
  imagesCount?: number;
  hasPersonalization?: boolean;
  hasHierarchy?: boolean;
  hasXP?: boolean;
  hasSelfRating?: boolean;
  hasCuttingLine?: boolean;
  missingOgonki?: string[];
}): AuditIssue[] {
  const issues: AuditIssue[] = [];
  if (input.colorsUsed && input.colorsUsed.length > 4) {
    issues.push({ level: "warn", rule: "§3.2 max 3+1 kolory", message: `Użyto ${input.colorsUsed.length} kolorów, max 3+1 akcent. Zmniejsz.` });
  }
  if (input.wordsCount !== undefined && (input.wordsCount < layout.grid.wordsTotal.min || input.wordsCount > layout.grid.wordsTotal.max)) {
    issues.push({ level: "error", rule: "§1.3 słowa", message: `Liczba słów ${input.wordsCount} poza ${layout.grid.wordsTotal.min}–${layout.grid.wordsTotal.max}. Idealnie 8.` });
  }
  if (input.imagesCount !== undefined && input.imagesCount < contentRules.images.minPerCard) {
    issues.push({ level: "warn", rule: "więcej obrazków", message: `Tylko ${input.imagesCount} obrazków, min ${contentRules.images.minPerCard}. Dodaj hero/zdania.` });
  }
  if (!input.hasPersonalization) issues.push({ level: "error", rule: "§1.6", message: "Brak PersonalizationBar (IMIE/DATA)." });
  if (!input.hasHierarchy) issues.push({ level: "warn", rule: "§3.4", message: "Brak HierarchyBar (UCHO→ZDANIE)." });
  if (!input.hasXP) issues.push({ level: "warn", rule: "§1.5", message: "Brak XPTracker." });
  if (!input.hasSelfRating) issues.push({ level: "warn", rule: "§1.5", message: "Brak SelfRating." });
  if (input.missingOgonki && input.missingOgonki.length > 0) {
    issues.push({ level: "error", rule: "§4.1", message: `Braki ogonków: ${input.missingOgonki.join(", ")}` });
  }
  return issues;
}

// ═══════════════════════════════════════════
// 7. EXPORT — backward compat dla theme.ts
// ═══════════════════════════════════════════

export const kidPalette = series; // alias
export const doddle = {
  cardShadow: tokens.shadow.card,
  radiusLg: tokens.radius.cardLg,
  radiusMd: tokens.radius.card,
  borderDashed: tokens.border.card,
} as const;
