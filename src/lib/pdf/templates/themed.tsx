import { THEMES, type ThemeId, type SzeregId } from "../themes/catalog";
import { vocabulary } from "../themes/vocabulary";
import { EngagingQuestTemplate } from "./engaging";

type Props = { name?: string; date?: string; eko?: boolean; theme: ThemeId; szereg: SzeregId; images?: Record<string, string> };

const minimalPairs: Record<SzeregId, Array<[string, string]>> = {
  syczacy: [["SOK", "SZOK"], ["CENA", "CZAPKA"], ["KASA", "KASZA"]],
  szumiacy: [["SOK", "SZOK"], ["CENA", "CZENA"], ["KASA", "KASZA"]],
  ciszacy: [["SOK", "ŚOK"], ["CENA", "ĆENA"], ["KASA", "KASIA"]],
  rotacyzm: [["RAK", "LAK"], ["RYBA", "LYBA"], ["KROWA", "KLOWA"]],
};

const ruchByTheme: Record<string, string[]> = {
  kosmos: ["Skok jak astronauta", "Rzut piłką na orbitę", "Klaśnij 3×"],
  zwierzaki: ["Tup jak słoń", "Skok jak żaba", "Klask jak foka"],
  pojazdy: ["Jedź jak auto — brum!", "Leć jak samolot", "Hamuj — stop!"],
  ocean: ["Fala ręką", "Skok przez kałużę", "Kółka ramion"],
  las: ["Szum jak drzewa", "Zbieraj szyszki", "Skok przez korzeń"],
};

export function ThemedTemplate({ name, date, eko, theme, szereg, images }: Props) {
  const t = THEMES.find((x) => x.id === theme)!;
  const words = vocabulary.wordsFor(theme, szereg).slice(0, 8);
  const pairs = minimalPairs[szereg];
  const ruch = ruchByTheme[theme] || ruchByTheme["kosmos"];
  const ruchItems = ruch.map((r, i) => `${r} + ${words[i]?.w || words[0].w}`);

  return (
    <EngagingQuestTemplate
      szereg={szereg}
      words={words}
      name={name}
      date={date}
      eko={eko}
      title={`${szereg.toUpperCase()} — ${t.label.toUpperCase()}`}
      subtitle={`${szereg} • ${t.label}`}
      pairs={pairs}
      movement={ruchItems}
      images={images}
      themeLabel={t.label}
    />
  );
}

export function makeThemedComponent(theme: ThemeId, szereg: SzeregId) {
  return (props?: { name?: string; date?: string; eko?: boolean; images?: Record<string, string> }) => (
    <ThemedTemplate theme={theme} szereg={szereg} {...props} />
  );
}
