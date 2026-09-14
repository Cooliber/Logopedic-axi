import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { THEMES, type ThemeId, type SzeregId } from "../themes/catalog";
import { getWords, BASE_WORDS } from "../themes/wordPools";
import { vocabulary } from "../themes/vocabulary";
import { auditModules } from "../modules/types";
import {
  ColoringTile,
  CuttingLine,
  DottedCard,
  FooterBar,
  HierarchyBar,
  InstructionCard,
  MandalaCenter,
  MinimalPairs,
  MovementBox,
  OneMinuteChallenge,
  PageHeader,
  ParentTip,
  PersonalizationBar,
  PositionLegend,
  SelfRating,
  StickerStrip,
  XPTracker,
} from "./shared";

type Props = { name?: string; date?: string; eko?: boolean; theme: ThemeId; szereg: SzeregId };

const szeregMeta: Record<SzeregId, { label: string; subtitle: string; palette: (typeof kidPalette)[keyof typeof kidPalette]; badges: string[] }> = {
  syczacy: { label: "Syk Syczący", subtitle: "Szereg syczący • s z c dz", palette: kidPalette.sycy as never, badges: ["1", "2", "3"] },
  szumiacy: { label: "Szum Lasu", subtitle: "Szereg szumiący • sz ż cz dż", palette: kidPalette.szum as never, badges: ["1", "2", "3"] },
  ciszacy: { label: "Cisza", subtitle: "Szereg ciszący • ś ź ć dź", palette: kidPalette.cisz as never, badges: ["1", "2", "3"] },
  rotacyzm: { label: "Ryczący Lew", subtitle: "Rotacyzm • R", palette: kidPalette.r as never, badges: ["BOSS"] },
};

export function ThemedTemplate({ name, date, eko, theme, szereg }: Props) {
  const t = THEMES.find((x) => x.id === theme)!;
  const s = szeregMeta[szereg];
  const c = s.palette as never as { primary: string; secondary: string; accent: string; light: string; dark: string; border: string };
  const words = vocabulary.wordsFor(theme, szereg).slice(0, 12);
  const fallbackNote = words.length < 8;
  // Deep Vocabulary + LayoutEngine — audyt budżetu 744px (locality: fix raz w MODULE_BUDGET)
  const layoutCheck = auditModules(["header", "personalization", "hierarchy", "hero", "words", "exercises", "closing"]);
  if (!layoutCheck.ok && typeof console !== "undefined") console.warn(`[LayoutEngine] ${theme}-${szereg} budget overflow ${layoutCheck.sum}>744`);

  // Theme doodle strip — dekoracyjne doodle icons per temat
  const themeDoodleHints: Record<ThemeId, string[]> = {
    kosmos: ["RAKIETA", "SATELITA", "KOSMOS", "SONDA"],
    zwierzaki: ["SOWA", "ZEBRA", "KROWA", "RYBA"],
    pojazdy: ["SAMOCHÓD", "SAMOLOT", "ROWER", "TRAMWAJ"],
    ocean: ["REKIN", "SARDYNKA", "SZCZUPAK", "SYRENA"],
    dinozaury: ["REX", "SMOK", "SKAŁA", "ZĄB"],
    las: ["SOSNA", "SZYSZKA", "GRZYB", "RYŚ"],
    jedzenie: ["ANANAS", "SZYNKA", "CZOSNEK", "ŚLIWKA"],
    sport: ["SKOK", "SANKI", "ROWER", "TORT"],
    dom: ["SALON", "SOFA", "ZASŁONA", "ZLEW"],
    ubrania: ["SUKIENKA", "SANDAŁ", "CZAPKA", "SZALIK"],
    pogoda: ["SŁOŃCE", "SZRON", "ŚNIEG", "KOŚĆ"],
    muzyka: ["SAKSOFON", "CYMBAŁ", "DŹWIĘK", "TRĄBKA"],
    ogrod: ["SAD", "CEBULA", "SZCZAW", "RÓŻA"],
    miasto: ["SKLEP", "RATUSZ", "SZKOŁA", "TRAMWAJ"],
  };

  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : (c.light as string) }}>
      {/* Header: szereg color + theme badge + personalization */}
      <PageHeader title={`${s.label.toUpperCase()} — ${t.label.toUpperCase()}`} subtitle={`${s.subtitle} • Temat: ${t.label}`} icon={t.doodle} color={c.primary} badge={t.label} heroLetter={t.doodle} />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      {/* Theme banner — doodle icons row */}
      <div tw="flex items-center gap-2 rounded-[14px] bg-white px-3 py-2 mb-3" style={{ border: `2px solid ${t.color}40` }}>
        <span tw="text-[8px] font-black tracking-widest uppercase" style={{ color: t.color }}>TEMAT</span>
        <span tw="text-[11px] font-black" style={{ color: t.color }}>{t.label}</span>
        <span tw="text-[8px] font-bold text-[#6B7280] flex-1">{t.blurb}</span>
        <span tw="text-[7px] font-black rounded-full px-2 py-1 text-white" style={{ backgroundColor: t.color }}>{szereg.toUpperCase()}</span>
        <div tw="flex gap-1">
          {themeDoodleHints[theme].slice(0, 4).map((w) => {
            const src = wordToDataUri(w);
            return src ? <img key={w} src={src} tw="h-6 w-6 rounded-[6px]" style={{ border: `1.5px solid ${t.color}30` }} /> : null;
          })}
        </div>
      </div>

      <HierarchyBar accent={c.primary} active={3} />

      <div tw="flex gap-3 mb-2">
        <InstructionCard
          title="Jak się bawimy?"
          text={szereg === "syczacy" ? "Syczy jak wąż: s-s-s. Język za zębami, nie między zębami. Najpierw słuchaj, potem mów w izolacji, sylabach, słowach P/S/K." : szereg === "szumiacy" ? "Wargi w kółeczko, język szeroki za wałkiem. Szumimy długo: sz-sz-sz. Różnicuj s/sz, c/cz." : szereg === "ciszacy" ? "Uśmiech szeroki, język wysoko blisko podniebienia. Cichutko i miękko: ś-ś-ś, ć-ć-ć." : "Język w górę do wałka, dmuchaj trrr, rycz rra! Najpierw TR/DR, potem R."}
          accent={c.secondary}
          steps={["Słuchaj", "Mów", "Koloruj"]}
          time="8-10 min"
        />
        <XPTracker stars={5} mission={`MISJA: ${words.length} słów`} level={t.label.slice(0, 4).toUpperCase()} />
      </div>

      <div tw="flex gap-2 mb-2">
        <PositionLegend accent={c.primary} />
        <span tw="flex-1 rounded-full bg-white px-3 py-1 text-center text-[7px] font-black text-[#6B7280]" style={{ border: `1.5px solid ${c.border}` }}>
          TIP: zacznij od P (początek) — najłatwiejsza • lustro: czy język nie między zębami?
        </span>
      </div>

      {fallbackNote && (
        <div tw="rounded-[10px] bg-[#FFFBEB] px-3 py-1.5 mb-2 text-center text-[7px] font-bold text-[#92400E]" style={{ border: "1.5px dashed #FDE68A" }}>
          Pula tematyczna w budowie — pokazujemy sprawdzone słowa szeregowe w skórce {t.label}. Kolejna sesja doda pełne słowa tematyczne.
        </div>
      )}

      {/* SŁOWA — 4x2 clean grid + mandala osobno (research: 20% bieli, Gestalt, mandala executive) */}
      {(() => {
        const w8 = words.slice(0, 8);
        const extra = words.slice(8);
        return (
          <>
            <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
              <div tw="flex items-center justify-between mb-3">
                <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">8 SLOW - {t.label.toUpperCase()} - pokoloruj kontur</span>
                <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: t.color }}>{szereg.toUpperCase()}</span>
              </div>
              <div tw="grid grid-cols-4 gap-2.5">
                {w8.map((it) => (
                  <div key={it.w + it.pos} tw="rounded-[14px] bg-white py-3 px-2 flex flex-col items-center gap-1" style={{ border: "1.5px solid #F3F4F6" }}>
                    {wordToDataUri(it.w) ? <img src={wordToDataUri(it.w)!} tw="h-[48px] w-[48px] rounded-[10px]" style={{ border: "1.5px solid #E5E7EB" }} /> : <span tw="h-[48px] w-[48px] rounded-[10px] bg-white flex items-center justify-center text-[12px] font-black" style={{ border: "1.5px solid #E5E7EB", color: c.primary }}>{it.w.charAt(0)}</span>}
                    <span tw="text-[11px] font-black text-[#1A1A2E] text-center" style={{ letterSpacing: "0.3px" }}>{it.w}</span>
                    <span tw="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#F59E0B" : "#EF4444", color: "white" }}>{it.pos}</span>
                  </div>
                ))}
              </div>
              {extra.length > 0 && (
                <div tw="mt-2 flex gap-1.5 justify-center">
                  {extra.map((it) => (
                    <span key={it.w + it.pos} tw="rounded-full bg-white px-2 py-1 text-[7px] font-black" style={{ border: `1.5px solid ${c.border}`, color: c.dark }}>{it.w}</span>
                  ))}
                </div>
              )}
            </div>
            <div tw="rounded-[20px] bg-white p-4 mb-3 flex flex-col items-center gap-2" style={{ border: "2px solid #E5E7EB" }}>
              <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">MANDALA - {t.label} - pokoloruj po slowach</span>
              <span tw="text-[7px] font-bold text-[#6B7280] text-center">Skup uwage 2 min - koloruj od srodka na zewnatrz.</span>
              <div tw="h-[96px] w-[96px] rounded-full flex items-center justify-center" style={{ border: `2.5px dashed ${t.color}60`, backgroundColor: "#FFFBEB" }}>
                <div tw="h-[64px] w-[64px] rounded-full bg-white flex items-center justify-center" style={{ border: `2px solid ${c.primary}` }}>
                  <span tw="text-[14px] font-black" style={{ color: c.primary }}>{t.doodle}</span>
                </div>
              </div>
            </div>
          </>
        );
      })()}

      <div tw="flex gap-3 mb-2">
        <DottedCard bg="#FFFFFF" border={c.border} twExtra="flex-1">
          <span tw="text-[9px] font-black uppercase tracking-widest" style={{ color: c.dark }}>
            {szereg === "rotacyzm" ? "Sylaby — stukaj 3×" : "Pary minimalne — słuchaj różnicy"}
          </span>
          {szereg === "rotacyzm" ? (
            <div tw="grid grid-cols-3 gap-1.5 mt-2">
              {["RA", "RE", "RI", "RO", "RU", "RY", "AR", "ER", "OR"].map((syl) => (
                <div key={syl} tw="rounded-[10px] p-2 text-center" style={{ backgroundColor: c.light, border: `1.5px dashed ${c.border}` }}>
                  <span tw="text-[11px] font-black" style={{ color: c.dark }}>{syl}</span>
                </div>
              ))}
            </div>
          ) : (
            <div tw="mt-2">
              <MinimalPairs
                accent={c.primary}
                pairs={szereg === "syczacy" ? [["SOK", "SZOK"], ["CENA", "CZAPKA"], ["KASA", "KASZA"], ["SUM", "SZUM"]] : szereg === "szumiacy" ? [["SOK", "SZOK"], ["CENA", "CZENA"], ["KASA", "KASZA"], ["ZUPA", "ŻUPA"]] : [["SOK", "SIOK"], ["CENA", "CIENIA"], ["KASA", "KASIA"], ["DŹWIĘK", "DŹWIĘK"]] }
              />
            </div>
          )}
          <div tw="mt-2">
            <ParentTip text={szereg === "syczacy" ? "Wskazuj minimal pairs: s/sz, c/cz. Najpierw dorosły — dziecko, potem zamiana ról." : szereg === "szumiacy" ? "Dźwięczne ż/dż: dłoń na krtani — ma wibrować. Cz/dż: krótkie zwarcie + szum." : szereg === "ciszacy" ? "Różnicuj s/ś, c/ć przed samogłoską. Dyktando: dorosły mówi, dziecko wskazuje." : "Jeśli R nie drga — wróć do TRA/DRA (most). Mów z samogłoskami a-o-u."} accent={c.secondary} />
          </div>
        </DottedCard>

        <div tw="flex flex-col gap-2 flex-1">
          <DottedCard bg={c.light} border={c.border} twExtra="">
            <span tw="text-[9px] font-black uppercase tracking-widest" style={{ color: c.dark }}>
              Ruch + głos — kotwiczy pamięć
            </span>
            <div tw="mt-2 flex flex-col gap-1">
              {(theme === "kosmos" ? ["Skok jak astronauta + SOWA", "Rzut piłką + RAKIETA", "Klaśnij 3× + SATELITA"] : theme === "ocean" ? ["Fala ręką + REKIN", "Skok przez kałużę + SZCZUPAK", "Kółka ramion + SARDYNKA"] : theme === "pojazdy" ? ["Jedź jak auto + SAMOCHÓD", "Leć jak samolot + SAMOLOT", "Hamuj + STOP"] : theme === "dinozaury" ? ["Tup jak dinozaur + REX", "Ryk + SMOK", "Szukaj skamielin + SKAŁA"] : theme === "las" ? ["Szum jak drzewa + SOSNA", "Zbieraj szyszki + SZYSZKA", "Skok przez korzeń + GRZYB"] : theme === "jedzenie" ? ["Mieszaj zupę + ZUPA", "Krój + ANANAS", "Wąchaj + CZOSNEK"] : theme === "sport" ? ["Skok w dal + SKOK", "Jazda + ROWER", "Rzut + TRENING"] : theme === "dom" ? ["Posprzątaj + SALON", "Usiądź + SOFA", "Zasłoń + ZASŁONA"] : theme === "ubrania" ? ["Ubierz + SUKIENKA", "Zapnij + ZAMEK", "Włóż + SANDAŁ"] : theme === "pogoda" ? ["Spójrz + SŁOŃCE", "Zamarznij + SZRON", "Pada + ŚNIEG"] : theme === "muzyka" ? ["Zagraj + SAKSOFON", "Uderz + CYMBAŁ", "Posłuchaj + DŹWIĘK"] : theme === "ogrod" ? ["Podlej + SAD", "Piel + ZIOŁA", "Zbieraj + RÓŻA"] : theme === "miasto" ? ["Kup + SKLEP", "Idź + RATUSZ", "Jedź + TRAMWAJ"] : ["Skok obunóż + SOWA", "Rzut woreczkiem + ZUPA", "Klask + CYTRYNA x3"]).map((t2, i) => (
                <div key={i} tw="flex gap-2 items-center rounded-full bg-white px-3 py-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
                  <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: c.primary }}>{i + 1}</span>
                  <span tw="text-[8px] font-bold text-[#1A1A2E] flex-1">{t2}</span>
                </div>
              ))}
            </div>
            <span tw="text-[7px] font-bold text-[#6B7280] mt-1">Powtórz 5× — ruch kotwiczy pamięć motoryczną</span>
          </DottedCard>
        </div>
      </div>

      <DottedCard bg="#FFFFFF" border={c.primary} twExtra="mb-2">
        <div tw="flex items-center justify-between">
          <span tw="text-[9px] font-black uppercase tracking-widest" style={{ color: c.secondary }}>Zdania — powiedz 3×, stukaj rytm</span>
          <span tw="text-[7px] font-black bg-[#ECFDF5] px-2 py-1 rounded-full" style={{ border: "1.5px solid #6EE7B7" }}>wolno + wyraźnie</span>
        </div>
        <div tw="flex flex-col gap-1.5 mt-2">
          {(szereg === "syczacy" ? ["Sok z cytryny stoi na stole.", "Zuzia zaszywa zamek w kurtce.", "Dzwon dudni, dzik tupie w lesie."] : szereg === "szumiacy" ? ["Szymon szuka szyszek w lesie.", "Żaneta je żurawinowy dżem.", "Czarek czyści czajnik szczotką."] : szereg === "ciszacy" ? ["Świstak śpi w śniegu.", "Ćma leci cichutko nad łąką.", "Dźwięk dzwonka — dzyń, dzyń!"] : ["Rysio rysuje różową rakietę.", "Krowa ryczy na ranczo rankiem.", "Tramwaj skręca w prawo. Trakcja trwa."]).map((s, i) => (
            <div key={s} tw="flex gap-2 items-center rounded-[10px] px-3 py-2" style={{ backgroundColor: c.light, border: `1.5px solid ${c.border}` }}>
              <span tw="h-5 w-5 rounded-full bg-white flex items-center justify-center text-[9px] font-black" style={{ border: `1.5px solid ${c.primary}` }}>{i + 1}</span>
              <span tw="text-[9px] font-bold text-[#1A1A2E] flex-1 leading-tight">{s}</span>
              <span tw="text-[7px] font-black px-2 py-1 rounded-full bg-white" style={{ border: `1.5px solid ${c.border}` }}>x3</span>
            </div>
          ))}
        </div>
        <div tw="mt-2">
          <OneMinuteChallenge accent={c.primary} />
        </div>
      </DottedCard>

      <div tw="flex gap-3">
        <div tw="flex-1">
          <SelfRating accent={c.primary} />
        </div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: `1.5px solid ${c.border}` }}>
          <CuttingLine />
          <StickerStrip count={4} accent={c.primary} label={`NAKLEJKI ${t.label.toUpperCase()} — wytnij`} />
        </div>
      </div>

      <FooterBar text={`${s.label} • Temat ${t.label} • ${szereg} • A4 laminuj`} color={c.dark} />
    </div>
  );
}

// Helper do rejestracji slugów — używany w templates/index.ts
export function makeThemedComponent(theme: ThemeId, szereg: SzeregId) {
  return (props?: { name?: string; date?: string; eko?: boolean }) => (
    <ThemedTemplate theme={theme} szereg={szereg} {...props} />
  );
}
