import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { THEMES, type ThemeId, type SzeregId } from "../themes/catalog";
import { vocabulary } from "../themes/vocabulary";
import { auditModules } from "../modules/types";
import { cymaticMandalaFull } from "../cymaticPatterns";
import {
  CuttingLine,
  FooterBar,
  HierarchyBar,
  PageHeader,
  PersonalizationBar,
  SelfRating,
  StickerStrip,
} from "./shared";

type Props = { name?: string; date?: string; eko?: boolean; theme: ThemeId; szereg: SzeregId; images?: Record<string, string> };

const szeregMeta: Record<SzeregId, { label: string; subtitle: string; palette: (typeof kidPalette)[keyof typeof kidPalette]; badges: string[] }> = {
  syczacy: { label: "Syk Syczący", subtitle: "Szereg syczący • s z c dz", palette: kidPalette.sycy as never, badges: ["1", "2", "3"] },
  szumiacy: { label: "Szum Lasu", subtitle: "Szereg szumiący • sz ż cz dż", palette: kidPalette.szum as never, badges: ["1", "2", "3"] },
  ciszacy: { label: "Cisza", subtitle: "Szereg ciszący • ś ź ć dź", palette: kidPalette.cisz as never, badges: ["1", "2", "3"] },
  rotacyzm: { label: "Ryczący Lew", subtitle: "Rotacyzm • R", palette: kidPalette.r as never, badges: ["BOSS"] },
};

export function ThemedTemplate({ name, date, eko, theme, szereg, images }: Props) {
  const t = THEMES.find((x) => x.id === theme)!;
  const s = szeregMeta[szereg];
  const c = s.palette as never as { primary: string; secondary: string; accent: string; light: string; dark: string; border: string };
  const words = vocabulary.wordsFor(theme, szereg).slice(0, 8);
  const fallbackNote = words.length < 8;
  const imgFor = (w: string) => images?.[w] ?? wordToDataUri(w);
  const layoutCheck = auditModules(["header", "personalization", "hierarchy", "hero", "words", "exercises", "closing"]);
  if (!layoutCheck.ok && typeof console !== "undefined") console.warn(`[LayoutEngine] ${theme}-${szereg} budget overflow ${layoutCheck.sum}>744`);

  const minimalPairs: Record<SzeregId, Array<[string, string]>> = {
    syczacy: [["SOK", "SZOK"], ["CENA", "CZAPKA"], ["KASA", "KASZA"], ["SUM", "SZUM"]],
    szumiacy: [["SOK", "SZOK"], ["CENA", "CZENA"], ["KASA", "KASZA"], ["ZUPA", "ŻUPA"]],
    ciszacy: [["SOK", "ŚOK"], ["CENA", "ĆENA"], ["KASA", "KASIA"], ["DŹWIĘK", "DŹWIĘK"]],
    rotacyzm: [["RAK", "LAK"], ["RYBA", "LYBA"], ["KROWA", "KLOWA"], ["TORT", "TOLT"]] as unknown as Array<[string, string]>,
  };

  const sentences: Record<SzeregId, string[]> = {
    syczacy: ["Sok z cytryny stoi na stole.", "Zuzia zaszywa zamek w kurtce.", "Dzwon dudni, dzik tupie w lesie."],
    szumiacy: ["Szymon szuka szyszek w lesie.", "Żaneta je żurawinowy dżem.", "Czarek czyści czajnik szczotką."],
    ciszacy: ["Świstak śpi w śniegu.", "Ćma leci cichutko nad łąką.", "Dźwięk dzwonka - dzyń, dzyń!"],
    rotacyzm: ["Rysio rysuje różową rakietę.", "Krowa ryczy na ranczo rankiem.", "Tramwaj skręca w prawo. Trakcja trwa."],
  };

  const ruchItems: string[] =
    theme === "hawaje"
      ? ["Fala ręką + SŁOŃCE (sss-sss)", "Skok przez falę + REKIN", "Kółka ramion + SARDYNKA"]
      : theme === "kosmos"
        ? ["Skok jak astronauta + SOWA", "Rzut piłką + RAKIETA", "Klaśnij 3× + SATELITA"]
        : theme === "ocean"
          ? ["Fala ręką + REKIN", "Skok przez kałużę + SZCZUPAK", "Kółka ramion + SARDYNKA"]
          : theme === "pojazdy"
            ? ["Jedź jak auto + SAMOCHÓD", "Leć jak samolot + SAMOLOT", "Hamuj + STOP"]
            : theme === "dinozaury"
              ? ["Tup jak dinozaur + REX", "Ryk + SMOK", "Szukaj skamielin + SKAŁA"]
              : theme === "las"
                ? ["Szum jak drzewa + SOSNA", "Zbieraj szyszki + SZYSZKA", "Skok przez korzeń + GRZYB"]
                : theme === "halloween"
                  ? ["Cichy krok + SOWA", "Zbieraj cukierki + CYTRYNA", "Skok jak duch + KOŚĆ"]
                  : theme === "minecraft"
                    ? ["Kop jak w grze + SKAŁA", "Buduj zamek + ZAMEK", "Skok przez blok + KOSZ"]
                    : ["Skok obunóż + SOWA", "Rzut woreczkiem + ZUPA", "Klask + CYTRYNA x3"];

  const zasada =
    szereg === "syczacy"
      ? "Język za zębami, syczy cicho s-s-s. Mów na wydechu."
      : szereg === "szumiacy"
        ? "Wargi w kółeczko (jak u), język szeroki za wałkiem."
        : szereg === "ciszacy"
          ? "Uśmiech szeroki, język wysoko za wałkiem. Szept ś-ś-ś."
          : "Język do wałka, dmuchaj trrr, potem rrr. Najpierw TRA/DRA.";

  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : (c.light as string) }}>
      <PageHeader title={`${s.label.toUpperCase()} - ${t.label.toUpperCase()}`} subtitle={`${s.subtitle} • Temat: ${t.label}`} icon={t.doodle} color={c.primary} badge={t.label} heroLetter={t.doodle} />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex items-center gap-2 rounded-[12px] bg-white px-3 py-1.5 mb-2" style={{ border: `1.5px solid ${t.color}30` }}>
        <span tw="text-[7px] font-black tracking-widest uppercase" style={{ color: t.color }}>TEMAT</span>
        <span tw="text-[10px] font-black" style={{ color: t.color }}>{t.label}</span>
        <span tw="text-[7px] font-bold text-[#6B7280] flex-1">{t.blurb}</span>
      </div>

      <HierarchyBar accent={c.primary} active={3} />

      <div tw="rounded-[16px] bg-white p-3 mb-3 flex gap-3 items-center" style={{ border: `2.5px dashed ${c.secondary}` }}>
        <div tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[14px] font-black shrink-0" style={{ backgroundColor: c.secondary }}>!</div>
        <div tw="flex flex-col flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.secondary }}>Zasada</span>
          <span tw="text-[10px] font-bold text-[#1A1A2E] leading-tight">{zasada}</span>
        </div>
        <div tw="flex gap-1.5 shrink-0">
          {["Słuchaj", "Mów", "Pokoloruj"].map((s2, i) => (
            <span key={s2} tw="rounded-full px-3 py-1 text-center text-[8px] font-black text-white" style={{ backgroundColor: i === 0 ? c.primary : i === 1 ? c.secondary : "#22C55E" }}>{i + 1}. {s2}</span>
          ))}
        </div>
      </div>

      {fallbackNote && (
        <div tw="rounded-[10px] bg-[#FFFBEB] px-3 py-1.5 mb-2 text-center text-[7px] font-bold text-[#92400E]" style={{ border: "1.5px dashed #FDE68A" }}>
          Pula tematyczna w budowie — pokazujemy sprawdzone słowa szeregowe w skórce {t.label}.
        </div>
      )}

      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px dashed ${c.border}` }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E]">8 SŁÓW — pokoloruj gruby kontur</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: t.color }}>{szereg.toUpperCase()}</span>
        </div>
        <div tw="grid grid-cols-2 gap-8">
          {words.map((it) => (
            <div key={it.w + it.pos} tw="rounded-[18px] bg-white py-4 px-3 flex flex-col items-center gap-2" style={{ border: `2.5px solid #1A1A2E`, boxShadow: "0 3px 0 rgba(0,0,0,0.08)", minHeight: "192px" }}>
              {imgFor(it.w) ? (
                <img src={imgFor(it.w)!} tw="h-[118px] w-[118px] rounded-[14px] bg-white shrink-0" style={{ border: `2.5px solid ${c.primary}` }} />
              ) : (
                <span tw="h-[118px] w-[118px] rounded-[14px] bg-white flex items-center justify-center text-[16px] font-black shrink-0" style={{ border: `2.5px solid #1A1A2E`, color: c.primary }}>{it.w.charAt(0)}</span>
              )}
              <span tw="text-[12px] font-black text-[#1A1A2E] text-center leading-none tracking-tight">{it.w}</span>
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#F59E0B" : "#EF4444" }}>{it.pos}</span>
              <div tw="flex gap-1.5 mt-1">
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
              </div>
              <div tw="w-[56px] h-[1px] mt-1" style={{ borderTop: "1.8px dashed #E5E7EB" }} />
            </div>
          ))}
        </div>
      </div>

      <div tw="rounded-[16px] bg-white p-3 flex items-center gap-3 mb-2" style={{ border: `2px solid ${c.primary}` }}>
        <span tw="h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: c.primary }}>*</span>
        <span tw="text-[10px] font-black text-[#1A1A2E] flex-1">Misja: 8 słów — Zdobądź naklejkę</span>
        <div tw="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} tw="h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-black" style={{ backgroundColor: i === 0 ? "#22C55E" : "#E5E7EB", color: i === 0 ? "white" : "#9CA3AF" }}>{i + 1}</span>
          ))}
        </div>
        <span tw="text-[8px] font-black px-3 py-2 rounded-full text-white" style={{ backgroundColor: c.primary }}>+10 XP</span>
      </div>

      <div tw="flex items-center justify-center gap-2 my-1" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">— KONIEC STRONY 1 — przewróć kartkę —</span>
      </div>

      <div tw="rounded-[20px] bg-white p-4 mb-3 flex flex-col items-center gap-2" style={{ border: `2.5px dashed ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E]">MANDALA — skup uwagę 2 min</span>
        <span tw="text-[8px] font-bold text-[#6B7280] text-center">Koloruj od środka na zewnątrz — wybierz 2 kolory</span>
        <img src={cymaticMandalaFull({ letter: t.doodle, accent: c.primary, series: szereg as any })} tw="h-[220px] w-[220px] mt-1" />
      </div>

      <div tw="flex gap-4 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-4 flex flex-col gap-2" style={{ border: `2.5px dashed ${c.border}` }}>
          <span tw="text-[10px] font-black tracking-widest" style={{ color: c.dark }}>{szereg === "rotacyzm" ? "Sylaby — stukaj 3×" : "Pary minimalne — słuchaj różnicy"}</span>
          {szereg === "rotacyzm" ? (
            <div tw="grid grid-cols-3 gap-2 mt-1">
              {["RA", "RE", "RI", "RO", "RU", "RY"].map((syl) => (
                <div key={syl} tw="rounded-[12px] p-3 text-center" style={{ backgroundColor: c.light, border: `1.5px dashed ${c.border}` }}>
                  <span tw="text-[14px] font-black" style={{ color: c.dark }}>{syl}</span>
                </div>
              ))}
            </div>
          ) : (
            <div tw="flex flex-col gap-2 mt-1">
              {minimalPairs[szereg].slice(0, 3).map(([a, b]) => {
                const aSrc = imgFor(a);
                const bSrc = imgFor(b);
                return (
                  <div key={a + b} tw="rounded-[14px] bg-white p-3 flex items-center gap-2" style={{ border: `2px solid ${c.border}` }}>
                    <span tw="flex-1 text-center text-[11px] font-black text-[#1A1A2E]">{a}</span>
                    <span tw="text-[8px] font-black text-[#9CA3AF]">VS</span>
                    <span tw="flex-1 text-center text-[11px] font-black" style={{ color: c.dark }}>{b}</span>
                    <span tw="h-6 w-6 rounded-full bg-white shrink-0" style={{ border: `2px solid ${c.primary}` }} />
                  </div>
                );
              })}
            </div>
          )}
          <span tw="text-[7px] font-bold text-[#6B7280]">Dorosły mówi — dziecko wskazuje i kropkuje</span>
        </div>
        <div tw="flex-1 rounded-[16px] bg-white p-4 flex flex-col gap-2" style={{ border: `2.5px dashed ${c.secondary}` }}>
          <span tw="text-[10px] font-black tracking-widest" style={{ color: c.secondary }}>Ruch + głos</span>
          {ruchItems.slice(0, 3).map((t2, i) => (
            <div key={t2} tw="rounded-[14px] bg-white px-3 py-3 flex items-center gap-2" style={{ border: "1.5px solid #E5E7EB" }}>
              <span tw="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: c.primary }}>{i + 1}</span>
              <span tw="text-[9px] font-bold text-[#1A1A2E] flex-1">{t2}</span>
            </div>
          ))}
        </div>
      </div>

      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: `2px solid ${c.border}` }}>
        <div tw="flex items-center gap-2 mb-2">
          <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.secondary }}>5</span>
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.secondary }}>Zdania — powiedz 3×, stukaj rytm</span>
        </div>
        <div tw="flex flex-col gap-2">
          {sentences[szereg].slice(0, 3).map((s2, i) => (
            <div key={s2} tw="flex gap-2 items-start rounded-[12px] px-3 py-2.5" style={{ backgroundColor: c.light, border: `1.5px solid ${c.border}` }}>
              <span tw="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black shrink-0" style={{ border: `1.5px solid ${c.primary}`, color: c.primary }}>{i + 1}</span>
              <span tw="text-[10px] font-bold text-[#1A1A2E] flex-1 leading-tight">{s2}</span>
              <span tw="h-5 w-5 rounded-full bg-white shrink-0" style={{ border: `1.5px solid ${c.border}` }} />
            </div>
          ))}
        </div>
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1"><SelfRating accent={c.primary} /></div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}><CuttingLine /><StickerStrip count={4} accent={c.primary} label={`NAKLEJKI ${t.label.toUpperCase()} — wytnij`} /></div>
      </div>
      <FooterBar text={`${s.label} • Temat ${t.label} • ${szereg} • 2 strony A4 — laminuj`} color={c.dark} />
    </div>
  );
}

export function makeThemedComponent(theme: ThemeId, szereg: SzeregId) {
  return (props?: { name?: string; date?: string; eko?: boolean }) => (
    <ThemedTemplate theme={theme} szereg={szereg} {...props} />
  );
}
