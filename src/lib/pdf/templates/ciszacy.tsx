import { EngagingQuestTemplate } from "./engaging";

const WORDS: Array<{ w: string; pos: "P" | "S" | "K" }> = [
  { w: "ŚLIMAK", pos: "P" }, { w: "ŚNIEG", pos: "P" }, { w: "ŚWIECA", pos: "P" }, { w: "MIŚ", pos: "K" },
  { w: "ĆMA", pos: "P" }, { w: "CIASTO", pos: "P" }, { w: "DŹWIĘK", pos: "P" }, { w: "KOŚĆ", pos: "K" },
];

export function CiszacyTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return <EngagingQuestTemplate szereg="ciszacy" words={WORDS} name={name} date={date} eko={eko} title="CISZA" subtitle="ś ź ć dź — język wysoko" />;
}
