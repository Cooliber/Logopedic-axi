import { EngagingQuestTemplate } from "./engaging";

const WORDS: Array<{ w: string; pos: "P" | "S" | "K" }> = [
  { w: "SZKOŁA", pos: "P" }, { w: "SZAFA", pos: "P" }, { w: "ŻABA", pos: "P" }, { w: "ŻYRAFA", pos: "P" },
  { w: "CZAPKA", pos: "P" }, { w: "DŻEM", pos: "P" }, { w: "KOSZ", pos: "K" }, { w: "MYSZ", pos: "K" },
];

export function SzumiacyTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return <EngagingQuestTemplate szereg="szumiacy" words={WORDS} name={name} date={date} eko={eko} title="SZUM LASU" subtitle="sz ż cz dż — wargi w kółeczko" />;
}
