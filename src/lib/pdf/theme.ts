// Re-export z design-system — single source of truth (§3)
export { tokens, series as kidPalette, doddle, layout, componentSpec, contentRules, auditDesignSystem } from "./design-system";
export { tokens as typoTokens } from "./design-system";
// Backward compat: typo/a11y jako aliasy do tokens
import { tokens } from "./design-system";
export const typo = {
  label: "text-[9px] font-black tracking-widest uppercase",
  body: "text-[11px] font-bold leading-[1.5]",
  bodyLarge: "text-[12px] font-bold leading-[1.5]",
  small: "text-[8px] font-bold leading-[1.4]",
  heading: "text-[11px] font-black uppercase tracking-widest",
} as const;
export const a11y = {
  paperCream: tokens.color.paper.cream,
  paperMint: tokens.color.paper.mint,
  paperLavender: tokens.color.paper.lavender,
  focusBorder: "2.5px dashed",
  minContrast: 4.5,
} as const;

export type TemplateProps = {
  name?: string;
  date?: string;
  level?: string;
  eko?: boolean;
  withEmoji?: boolean;
};

export const ekoBg = (color: string, eko?: boolean) => (eko ? "#FFFFFF" : color);

export type Szereg = "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm";
