// Template 1: Cymatic Frequencies — maps speech sounds to cymatic geometry
// 3 pages A4: cover + phoneme map + exercises
import { kidPalette } from "../theme";
import {
  concentricCircles,
  standingWave,
  interferencePattern,
  flowerOfLife,
  spiralPattern,
  linearPattern,
  cellularPattern,
  dodecahedronProjection,
} from "../cymaticPatterns";
import {
  PageHeader,
  PersonalizationBar,
  InstructionCard,
  FooterBar,
  DottedCard,
  SelfRating,
  XPTracker,
  StickerStrip,
  CuttingLine,
} from "./shared";

const c = { primary: "#6366F1", secondary: "#4F46E5", accent: "#7C3AED", light: "#EEF2FF", dark: "#3730A3", border: "#C7D2FE", paper: "#EEF2FF" };

const phonemeMap = [
  { sound: "S", series: "syczacy", pattern: concentricCircles({ rings: 8, stroke: c.primary, strokeWidth: 1.2 }), desc: "Wysoka czestotliwosc", color: "#FACC15", shape: "kola" },
  { sound: "SZ", series: "szumiacy", pattern: spiralPattern({ turns: 4, stroke: c.primary, strokeWidth: 1.2 }), desc: "Srednia — spirala", color: "#2D6A4F", shape: "spirala" },
  { sound: "S Cron.", series: "ciszacy", pattern: standingWave({ nodes: 5, stroke: c.primary, strokeWidth: 1.2 }), desc: "Subtelne wezly", color: "#7C3AED", shape: "wezly" },
  { sound: "R", series: "rotacyzm", pattern: linearPattern({ spokes: 14, stroke: c.primary, strokeWidth: 1.2 }), desc: "Mocne promienie", color: "#C2410C", shape: "promienie" },
  { sound: "SZUM", series: "fruktywne", pattern: interferencePattern({ cx1: 35, cy1: 60, cx2: 85, cy2: 60, rings: 5, stroke: c.primary }), desc: "Interferencja", color: "#0077B6", shape: "interferencja" },
  { sound: "DZWIECZNE", series: "dzwieczne", pattern: cellularPattern({ cellR: 12, stroke: c.primary, strokeWidth: 1 }), desc: "Komorki zywicielskie", color: "#BE123C", shape: "komorki" },
];

export function CymaticFrequenciesTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : c.light }}>
      <PageHeader title="CYMATYCZNE CZESTOTLIWOSCI" subtitle="Dzwiek tworzy geometrie" icon="~" color={c.primary} badge="3" heroLetter="~" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      {/* PAGE 1: Cover + Concept */}
      <div tw="rounded-[20px] bg-white p-5 mb-3 flex gap-5 items-start" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex flex-col gap-2 flex-1">
          <span tw="text-[14px] font-black text-[#1A1A2E] leading-tight">Dzwiek rysuje ksztalty</span>
          <span tw="text-[11px] font-semibold text-[#4B5563] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Kiedy dzwiek przechodzi przez wode, tworzy sie geometryczny wzorzec.
            Kazdy glos ma swoj unikalny wzor — to cymatyka!
          </span>
          <span tw="text-[10px] font-bold text-[#6B7280] leading-[1.5]">
            Dzieki temu mozesz zobaczyc swoj glos. Wysoki glos = ciasne kola.
            Niski glos = szerokie pierscienie. Syczacy = spirala. Szumiacy = interferencja.
          </span>
        </div>
        <div tw="shrink-0">
          <img src={flowerOfLife({ stroke: c.primary, strokeWidth: 1 })} tw="h-[100px] w-[100px]" />
        </div>
      </div>

      {/* Phoneme → Cymatic Map */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E]">MAPA GLOSOW — KSZTALT CZESTOTLIWOSCI</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: c.primary }}>Cymatyka</span>
        </div>
        <div tw="grid grid-cols-3 gap-3">
          {phonemeMap.map((p) => (
            <div key={p.sound} tw="rounded-[14px] bg-[#F9FAFB] p-3 flex flex-col items-center gap-2" style={{ border: `2px solid ${c.border}` }}>
              <img src={p.pattern} tw="h-[64px] w-[64px] rounded-[10px]" style={{ border: `1.5px solid ${c.border}` }} />
              <span tw="text-[11px] font-black" style={{ color: c.dark }}>{p.sound}</span>
              <span tw="text-[7px] font-bold text-[#6B7280] text-center">{p.desc}</span>
              <span tw="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
            </div>
          ))}
        </div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 1 - przewroc kartke ---</span>
      </div>

      {/* PAGE 2: Exercise — Draw Your Sound */}
      <div tw="rounded-[20px] bg-white p-5 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E] mb-2">NARYSUJ SWOJ DZWIEK</span>
        <span tw="text-[9px] font-semibold text-[#6B7280] mb-3">Zamknij oczy. Powiedz glos. Otworz i narysuj co widzisz.</span>
        <div tw="grid grid-cols-2 gap-4">
          {["S — ciche sss", "SZ — szum lasu", "S Cron. — delikatne sss", "R — ryczace R"].map((label, i) => (
            <div key={i} tw="flex flex-col gap-2">
              <span tw="text-[9px] font-black tracking-widest" style={{ color: c.dark }}>{label}</span>
              <div tw="h-[100px] w-full rounded-[14px] bg-white flex items-center justify-center" style={{ border: `2.5px dashed ${c.border}` }}>
                <span tw="text-[8px] font-bold text-[#D1D5DB]">Tutaj narysuj</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DottedCard bg="#FFFFFF" border={c.border}>
        <span tw="text-[10px] font-black tracking-widest" style={{ color: c.dark }}>EXPERYMENT: WODA I DZWIEK</span>
        <span tw="text-[9px] font-semibold text-[#6B7280] leading-[1.5]">
          Nalej wode do miski. Postaw na glosniku. Pusc sinusoida 100-400 Hz.
          Patrz — woda tworzy wzory! To sa fale stojace. Taki sam wzor powstaje
          kiedy mowisz gloski syczace. Twoje usta sa jak miska na glosniku.
        </span>
      </DottedCard>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 2 - przewroc kartke ---</span>
      </div>

      {/* PAGE 3: Geometry + Sacred + Rating */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">SACRALNA GEOMETRIA — METATRONA KEANEK</span>
        <div tw="flex gap-4 items-start">
          <img src={dodecahedronProjection({ stroke: c.primary, strokeWidth: 1 })} tw="h-[100px] w-[100px] shrink-0" />
          <div tw="flex flex-col gap-1.5 flex-1">
            <span tw="text-[10px] font-bold text-[#4B5563] leading-[1.5]">
              Metatrona Kostka zawiera 5 sposobow na idealne podzielenie kuli.
              To sa pierwsze trojwymiarowe harmoniczne ksztalty. Atom wegla
              pakuje neutrony i protony w ten sposob — zyycie nie mogloby
              istniec bez wegla!
            </span>
            <span tw="text-[9px] font-bold text-[#6B7280] leading-[1.4]">
              DNA od gory tworzy mandale — promieniste wzorce harmoniczne.
              Kiedy glos rezonuje z komorkami, organizm odpowiada geometria.
            </span>
          </div>
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <InstructionCard
          title="Jak uzywac tej karty?"
          text="Porownaj wzory glosow. Syczace = ciasne kola. Szumiace = spirala. Cisza = wezly. Rotacyzm = promienie."
          accent={c.primary}
          steps={["Sluchaj", "Porownuj", "Narysuj"]}
          time="10-15 min"
        />
        <div tw="flex flex-col gap-2 shrink-0 w-[130px]">
          <XPTracker stars={5} mission="6 WZOROW" level="3" />
          <SelfRating accent={c.primary} />
        </div>
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}>
          <CuttingLine />
          <StickerStrip count={4} accent={c.primary} label="NAKLEJKI — wytnij" />
        </div>
      </div>

      <FooterBar text="Logopedia — cymatyka — geometria dzwieku — A4" color={c.dark} />
    </div>
  );
}
