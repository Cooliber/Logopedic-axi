import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { THEMES, type ThemeId, type SzeregId } from "../themes/catalog";
import { vocabulary } from "../themes/vocabulary";
import { auditModules } from "../modules/types";
import {
  CuttingLine,
  DottedCard,
  FooterBar,
  HierarchyBar,
  InstructionCard,
  PageHeader,
  PersonalizationBar,
  PositionLegend,
  SelfRating,
  StickerStrip,
  XPTracker,
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
  // HF PNG (dataURI z route) → SVG doodle → litera
  const imgFor = (w: string) => images?.[w] ?? wordToDataUri(w);
  const layoutCheck = auditModules(["header", "personalization", "hierarchy", "hero", "words", "exercises", "closing"]);
  if (!layoutCheck.ok && typeof console !== "undefined") console.warn(`[LayoutEngine] ${theme}-${szereg} budget overflow ${layoutCheck.sum}>744`);

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
    hawaje: ["SŁOŃCE", "SARDYNKA", "ZATOKA", "ANANAS"],
    halloween: ["SOWA", "CYTRYNA", "KOŚĆ", "ŚWIECA"],
    minecraft: ["SKAŁA", "ZAMEK", "KOSZ", "MYSZ"],
  };

  // Pary minimalne per szereg - z obrazkami
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

  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : (c.light as string) }}>
      {/* HEADER */}
      <PageHeader title={`${s.label.toUpperCase()} - ${t.label.toUpperCase()}`} subtitle={`${s.subtitle} • Temat: ${t.label}`} icon={t.doodle} color={c.primary} badge={t.label} heroLetter={t.doodle} />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      {/* TEMAT STRIP - lżejszy, mniej konkuruje z głównym zadaniem */}
      <div tw="flex items-center gap-2 rounded-[12px] bg-white px-3 py-1.5 mb-2" style={{ border: `1.5px solid ${t.color}30` }}>
        <span tw="text-[7px] font-black tracking-widest uppercase" style={{ color: t.color }}>TEMAT</span>
        <span tw="text-[10px] font-black" style={{ color: t.color }}>{t.label}</span>
        <span tw="text-[7px] font-bold text-[#6B7280] flex-1">{t.blurb}</span>
        <div tw="flex gap-1">
          {themeDoodleHints[theme].slice(0, 4).map((w) => {
            const src = imgFor(w);
            return src ? <img key={w} src={src} tw="h-5 w-5 rounded-[5px]" style={{ border: `1px solid ${t.color}20` }} /> : null;
          })}
        </div>
      </div>

      <HierarchyBar accent={c.primary} active={3} />

      {/* STREFA 1 - SŁUCH + IZOLACJA (jedyna instrukcja dla dziecka na górze, adult osobno) */}
      <div tw="rounded-[16px] bg-white p-3 mb-3 flex gap-3" style={{ border: `2px solid ${c.border}` }}>
        <div tw="flex flex-col gap-1 flex-1">
          <div tw="flex items-center gap-2">
            <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.primary }}>1</span>
            <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.dark }}>Jak sie bawimy? - tylko 3 kroki</span>
            <span tw="text-[7px] font-black bg-[#F3F4F6] px-2 py-0.5 rounded-full text-[#6B7280]">8-10 min</span>
          </div>
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.5]">
            {szereg === "syczacy" ? "Sycz jak wąż: s-s-s. Język za zębami." : szereg === "szumiacy" ? "Wargi w kółeczko, język za wałkiem: sz-sz-sz." : szereg === "ciszacy" ? "Uśmiech szeroki, język wysoko: ś-ś-ś." : "Język do wałka, dmuchaj trrr, potem rrr."}
            {" "}Najpierw słuchaj, potem mów.
          </span>
          <div tw="flex gap-1.5 mt-1">
            {["Słuchaj", "Mów", "Pokoloruj"].map((s2, i) => (
              <span key={s2} tw="flex-1 rounded-full px-2 py-1 text-center text-[7px] font-black text-white" style={{ backgroundColor: i === 0 ? c.primary : i === 1 ? c.secondary : "#22C55E" }}>
                {i + 1}. {s2}
              </span>
            ))}
          </div>
        </div>
        {/* XP - minimalistyczny, nie konkuruje */}
        <div tw="flex flex-col items-center justify-center gap-1 shrink-0 w-[92px] rounded-[12px] bg-[#FFFBEB] p-2" style={{ border: `1.5px dashed ${c.border}` }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">NAGRODA</span>
          <div tw="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} tw="h-3 w-3 rounded-[4px] flex items-center justify-center" style={{ backgroundColor: "#FACC15", border: "1px solid #EAB308" }}>
                <span tw="text-[7px] font-black text-[#713F12]">*</span>
              </span>
            ))}
          </div>
          <span tw="text-[7px] font-black text-[#92400E] text-center">8 słów = XP</span>
        </div>
      </div>

      {/* Pozycja głoski - zredukowana, nie osobny pasek już */}
      <div tw="flex items-center gap-2 rounded-full bg-white px-3 py-1 mb-3" style={{ border: "1.5px solid #E5E7EB" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">POZYCJA:</span>
        <span tw="h-3 w-3 rounded-full flex items-center justify-center text-[6px] font-black text-white" style={{ backgroundColor: "#22C55E" }}>P</span>
        <span tw="text-[7px] font-bold text-[#6B7280]">początek - najłatwiej</span>
        <span tw="text-[#D1D5DB]">•</span>
        <span tw="text-[7px] font-bold text-[#6B7280]">S środek</span>
        <span tw="text-[#D1D5DB]">•</span>
        <span tw="text-[7px] font-bold text-[#6B7280]">K koniec</span>
        <span tw="flex-1" />
        <span tw="text-[7px] font-bold text-[#6B7280]">Lustro: język nie między zębami</span>
      </div>

      {fallbackNote && (
        <div tw="rounded-[10px] bg-[#FFFBEB] px-3 py-1.5 mb-2 text-center text-[7px] font-bold text-[#92400E]" style={{ border: "1.5px dashed #FDE68A" }}>
          Pula tematyczna w budowie - pokazujemy sprawdzone słowa szeregowe w skórce {t.label}.
        </div>
      )}

      {/* STREFA 2 - SŁOWA - POWIĘKSZONE KARTY (4×2 → większe, miejsce na pracę) */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2px solid ${c.border}` }}>
        <div tw="flex items-center justify-between mb-3">
          <div tw="flex items-center gap-2">
            <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.primary }}>2</span>
            <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E]">8 SŁÓW - pokoloruj gruby kontur</span>
          </div>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: t.color }}>{szereg.toUpperCase()}</span>
        </div>
        <div tw="grid grid-cols-4 gap-3">
          {words.map((it) => (
            <div
              key={it.w + it.pos}
              tw="rounded-[16px] bg-white py-3 px-2 flex flex-col items-center gap-1.5"
              style={{ border: `2px solid #E5E7EB`, minHeight: "128px" }}
            >
              {imgFor(it.w) ? (
                <img src={imgFor(it.w)!} tw="h-[64px] w-[64px] rounded-[12px]" style={{ border: `2px solid #E5E7EB`, backgroundColor: "white" }} />
              ) : (
                <span tw="h-[64px] w-[64px] rounded-[12px] bg-white flex items-center justify-center text-[16px] font-black" style={{ border: `2px solid #E5E7EB`, color: c.primary }}>
                  {it.w.charAt(0)}
                </span>
              )}
              <span tw="text-[12px] font-black text-[#1A1A2E] text-center leading-none tracking-tight">{it.w}</span>
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#F59E0B" : "#EF4444", color: "white" }}>
                {it.pos}
              </span>
              {/* Miejsce na aktywne zaznaczanie prób */}
              <div tw="flex gap-1 mt-0.5">
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
              </div>
              <div tw="w-[48px] h-[1px] mt-1" style={{ borderTop: "1.5px dashed #E5E7EB" }} />
            </div>
          ))}
        </div>
        <div tw="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#F9FAFB] px-3 py-1.5" style={{ border: "1.5px dashed #E5E7EB" }}>
          <span tw="text-[7px] font-bold text-[#6B7280]">Dashed = miejsce na pieczątkę / kropkę za poprawne powtórzenie</span>
          <span tw="h-2 w-2 rounded-full" style={{ backgroundColor: c.primary }} />
          <span tw="h-2 w-2 rounded-full bg-white" style={{ border: `1.5px solid ${c.primary}` }} />
        </div>
      </div>

      {/* MANDALA - POMINIĘTA w wersji do druku (zbyt mała, rozprasza). 
          Jeśli potrzebna - osobna karta A5. Tu zostawiamy tylko informację. */}
      {/* <MandalaCenter /> removed for print clarity */}

      {/* STREFA 3A - PARY MINIMALNE - PEŁNA SZEROKOŚĆ, DUŻE OBRAZKI */}
      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: `2px solid ${c.border}` }}>
        <div tw="flex items-center gap-2 mb-3">
          <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.primary }}>3</span>
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.dark }}>
            {szereg === "rotacyzm" ? "Sylaby - stukaj 3×" : "Pary minimalne - słuchaj różnicy"}
          </span>
          <span tw="text-[7px] font-black bg-[#FEF9C3] px-2 py-0.5 rounded-full text-[#713F12]">1 głoska zmienia sens</span>
        </div>

        {szereg === "rotacyzm" ? (
          <div tw="grid grid-cols-3 gap-2">
            {["RA", "RE", "RI", "RO", "RU", "RY", "AR", "ER", "OR"].map((syl) => (
              <div key={syl} tw="rounded-[12px] p-3 text-center" style={{ backgroundColor: c.light, border: `1.5px dashed ${c.border}` }}>
                <span tw="text-[14px] font-black" style={{ color: c.dark }}>{syl}</span>
              </div>
            ))}
          </div>
        ) : (
          <div tw="grid grid-cols-2 gap-2.5">
            {minimalPairs[szereg].map(([a, b]) => {
              const aSrc = imgFor(a);
              const bSrc = imgFor(b);
              return (
                <div key={a + b} tw="rounded-[14px] bg-white p-3 flex items-center gap-2" style={{ border: `2px solid ${c.border}30` }}>
                  <div tw="flex flex-col items-center gap-1 flex-1">
                    {aSrc ? <img src={aSrc} tw="h-[48px] w-[48px] rounded-[10px]" style={{ border: `1.5px solid #E5E7EB` }} /> : <span tw="h-[48px] w-[48px] rounded-[10px] bg-[#F9FAFB] flex items-center justify-center text-[14px] font-black" style={{ border: "1.5px solid #E5E7EB", color: c.primary }}>{a.charAt(0)}</span>}
                    <span tw="text-[10px] font-black text-[#1A1A2E] text-center">{a}</span>
                  </div>
                  <span tw="text-[8px] font-black text-[#9CA3AF]">VS</span>
                  <div tw="flex flex-col items-center gap-1 flex-1">
                    {bSrc ? <img src={bSrc} tw="h-[48px] w-[48px] rounded-[10px]" style={{ border: `1.5px solid #E5E7EB` }} /> : <span tw="h-[48px] w-[48px] rounded-[10px] bg-[#FFFBEB] flex items-center justify-center text-[14px] font-black" style={{ border: `1.5px solid ${c.border}`, color: c.dark }}>{b.charAt(0)}</span>}
                    <span tw="text-[10px] font-black text-center" style={{ color: c.dark }}>{b}</span>
                  </div>
                  <div tw="flex flex-col gap-1 shrink-0">
                    <span tw="h-3.5 w-3.5 rounded-full bg-white" style={{ border: `1.5px solid ${c.primary}` }} />
                    <span tw="h-3.5 w-3.5 rounded-full bg-white" style={{ border: `1.5px solid #E5E7EB` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <span tw="text-[7px] font-bold text-[#6B7280] mt-2 text-center">Dorosły mówi jedno słowo - dziecko wskazuje obrazek i kropkuje. Potem zamiana ról.</span>
      </div>

      {/* STREFA 3B - RUCH + GŁOS - PEŁNA SZEROKOŚĆ, WIĘKSZE POLA */}
      <div tw="rounded-[16px] p-4 mb-3" style={{ backgroundColor: c.light, border: `2px dashed ${c.border}` }}>
        <div tw="flex items-center gap-2 mb-2">
          <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.primary }}>4</span>
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.dark }}>Ruch + głos - kotwiczy pamięć</span>
          <span tw="text-[7px] font-black bg-white px-2 py-0.5 rounded-full text-[#6B7280]" style={{ border: "1.5px solid #E5E7EB" }}>powtórz 5×</span>
        </div>
        <div tw="flex gap-2">
          {ruchItems.slice(0, 3).map((t2, i) => (
            <div key={i} tw="flex-1 flex gap-2 items-center rounded-[14px] bg-white px-3 py-3" style={{ border: "1.5px solid #E5E7EB" }}>
              <span tw="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: c.primary }}>{i + 1}</span>
              <span tw="text-[9px] font-bold text-[#1A1A2E] leading-tight flex-1">{t2}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STREFA 4 - ZDANIA - WIĘCEJ PRZESTRZENI, LINIE DO PISANIA/RYSUNKU */}
      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: `2px solid ${c.border}` }}>
        <div tw="flex items-center gap-2 mb-2">
          <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.secondary }}>5</span>
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.secondary }}>Zdania - powiedz 3×, stukaj rytm</span>
          <span tw="text-[7px] font-black bg-[#ECFDF5] px-2 py-0.5 rounded-full text-[#065F46]" style={{ border: "1.5px solid #6EE7B7" }}>wolno + wyraźnie</span>
        </div>
        <div tw="flex flex-col gap-2">
          {sentences[szereg].map((s2, i) => (
            <div key={s2} tw="flex gap-2 items-start rounded-[12px] px-3 py-2.5" style={{ backgroundColor: c.light, border: `1.5px solid ${c.border}` }}>
              <span tw="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black shrink-0" style={{ border: `1.5px solid ${c.primary}`, color: c.primary }}>{i + 1}</span>
              <div tw="flex flex-col gap-1 flex-1">
                <span tw="text-[10px] font-bold text-[#1A1A2E] leading-tight">{s2}</span>
                <div tw="flex gap-1 mt-1">
                  <span tw="flex-1 h-[1px]" style={{ borderTop: "1.5px dashed #E5E7EB" }} />
                  <span tw="text-[7px] font-bold text-[#9CA3AF]">x3</span>
                </div>
              </div>
              <span tw="h-5 w-5 rounded-full bg-white shrink-0" style={{ border: `1.5px solid ${c.border}` }} />
            </div>
          ))}
        </div>
        {/* Miejsce na pracę dziecka - linie + rysunek */}
        <div tw="mt-3 rounded-[12px] bg-[#F9FAFB] p-3" style={{ border: "1.5px dashed #D1D5DB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">MOJE ZDANIE / RYSUNEK</span>
          <div tw="mt-2 flex flex-col gap-2">
            <div tw="h-[18px] rounded-[6px] bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
            <div tw="h-[18px] rounded-[6px] bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
          </div>
          <span tw="text-[6px] font-bold text-[#9CA3AF] mt-1">Napisz jedno zdanie z słów powyżej lub narysuj</span>
        </div>
        {/* Dla dorosłego - osobna mała ramka, nie konkuruje */}
        <div tw="mt-2 rounded-[10px] bg-[#F9FAFB] px-3 py-2 flex gap-2" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black uppercase tracking-widest shrink-0" style={{ color: c.secondary }}>DLA DOROSŁEGO</span>
          <span tw="text-[7px] leading-[1.4] font-semibold text-[#6B7280] flex-1">
            {szereg === "syczacy" ? "Wskazuj minimal pairs: s/sz, c/cz. Najpierw dorosły - dziecko wskazuje, potem zamiana ról. Tempo wolne." : szereg === "szumiacy" ? "Dźwięczne ż/dż: dłoń na krtani - ma wibrować. Cz/dż: krótkie zwarcie + szum." : szereg === "ciszacy" ? "Różnicuj s/ś, c/ć przed samogłoską. Dyktando: dorosły mówi, dziecko wskazuje." : "Jeśli R nie drga - wróć do TRA/DRA (most). Mów z samogłoskami a-o-u."}
          </span>
        </div>
      </div>

      {/* STREFA 5 - NAGRODA - JEDNA SPÓJNA PĘTLA: 8 słów → XP → naklejka → samoocena */}
      <div tw="rounded-[16px] bg-white p-3 flex items-center gap-3" style={{ border: `2px solid ${c.primary}` }}>
        <div tw="flex items-center gap-2 flex-1">
          <span tw="h-7 w-7 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: c.primary }}>*</span>
          <div tw="flex flex-col">
            <span tw="text-[8px] font-black tracking-widest text-[#6B7280]">PETLA NAGRODY</span>
            <span tw="text-[9px] font-black text-[#1A1A2E]">Zrob 8 slow - Zdobadz XP - Wez naklejke</span>
          </div>
        </div>
        <div tw="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} tw="h-4 w-4 rounded-full flex items-center justify-center" style={{ backgroundColor: i === 0 ? "#22C55E" : "#E5E7EB" }}>
              <span tw="text-[7px] font-black" style={{ color: i === 0 ? "white" : "#9CA3AF" }}>{i + 1}</span>
            </span>
          ))}
        </div>
        <div tw="flex gap-2">
          <span tw="text-[7px] font-black px-3 py-2 rounded-full text-white" style={{ backgroundColor: c.primary }}>+10 XP</span>
        </div>
      </div>

      <div tw="flex gap-3 mt-3">
        <div tw="flex-1 rounded-[14px] bg-white p-3" style={{ border: `1.5px solid ${c.border}` }}>
          <span tw="text-[8px] font-black uppercase tracking-widest text-[#6B7280]">SAMOOCENA - na końcu!</span>
          <div tw="flex gap-2 mt-2">
            {[
              { label: "SUPER", sub: "sam!", bg: "#22C55E" },
              { label: "OK", sub: "prawie", bg: "#FACC15" },
              { label: "JESZCZE", sub: "raz", bg: "#E5E7EB" },
            ].map((f) => (
              <div key={f.label} tw="flex-1 rounded-[12px] p-2 flex flex-col items-center" style={{ backgroundColor: f.bg, border: "1.5px solid rgba(0,0,0,0.06)" }}>
                <span tw="h-7 w-7 rounded-full bg-white flex items-center justify-center text-[11px] font-black text-[#1A1A2E]">{f.label.charAt(0)}</span>
                <span tw="text-[8px] font-black text-center mt-1 text-[#1A1A2E]">{f.label}</span>
                <span tw="text-[7px] font-bold text-[#4B5563]">{f.sub}</span>
              </div>
            ))}
          </div>
        </div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1.5" style={{ border: `1.5px solid ${c.border}` }}>
          <CuttingLine />
          <StickerStrip count={4} accent={c.primary} label={`NAKLEJKI ${t.label.toUpperCase()} - wytnij i naklej`} />
          <span tw="text-[6px] font-bold text-[#9CA3AF] text-center">Większe - naklej po ćwiczeniu na kartę lub zeszyt</span>
        </div>
      </div>

      <FooterBar text={`${s.label} • Temat ${t.label} • ${szereg} • A4 laminuj • Wersja do druku v2`} color={c.dark} />
    </div>
  );
}

// Helper do rejestracji slugów - używany w templates/index.ts
export function makeThemedComponent(theme: ThemeId, szereg: SzeregId) {
  return (props?: { name?: string; date?: string; eko?: boolean }) => (
    <ThemedTemplate theme={theme} szereg={szereg} {...props} />
  );
}
