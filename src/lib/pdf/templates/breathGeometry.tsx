// Template 4: Breath Geometry — how breath creates standing waves
// 2 pages A4: breath-wave theory + breathing exercises
import { kidPalette } from "../theme";
import {
  standingWave,
  concentricCircles,
  spiralPattern,
  linearPattern,
} from "../cymaticPatterns";
import {
  PageHeader,
  PersonalizationBar,
  InstructionCard,
  FooterBar,
  DottedCard,
  SelfRating,
  XPTracker,
  OneMinuteChallenge,
  TraceLine,
} from "./shared";

const c = { primary: "#DC2626", secondary: "#B91C1C", accent: "#EF4444", light: "#FEF2F2", dark: "#7F1D1D", border: "#FECACA", paper: "#FEF2F2" };

export function BreathGeometryTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : c.light }}>
      <PageHeader title="GEOMETRIA ODDECHU" subtitle="Oddech = fala stojaca" icon="D" color={c.primary} badge="2" heroLetter="D" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      {/* PAGE 1: Theory */}
      <div tw="rounded-[20px] bg-white p-5 mb-3 flex gap-5 items-start" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex flex-col gap-2 flex-1">
          <span tw="text-[13px] font-black text-[#1A1A2E] leading-tight">Oddech to fala</span>
          <span tw="text-[10px] font-semibold text-[#4B5563] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Kiedy wydychasz powietrze, tworzy sie fala dzwiekowa. Ta fala
            spotyka sie z fala wracajaca i powstaje fala stojaca — dokladnie
            jak w cymatyce!
          </span>
          <span tw="text-[9px] font-bold text-[#6B7280] leading-[1.4]">
            Serce bije — to niskoczestotliwy puls dzwiekowy. Kazde uderzenie
            to mechaniczne cisnienie zwiazujace tlen z hemoglobina. Oddech
            laczy sie z sercem jak fala z fala.
          </span>
        </div>
        <div tw="shrink-0 flex flex-col items-center gap-2">
          <img src={standingWave({ nodes: 3, stroke: c.primary, strokeWidth: 1.5 })} tw="h-[80px] w-[80px]" />
          <span tw="text-[7px] font-black tracking-widest text-center" style={{ color: c.dark }}>Fala oddechu</span>
        </div>
      </div>

      {/* Breath wave visualization */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">KOLEJNOSC ODDECHU — WZORZEC</span>
        <div tw="flex gap-3 items-center justify-center">
          {[
            { label: "WDECH", sub: "4 sek", pattern: concentricCircles({ rings: 3, cx: 30, cy: 30, maxR: 26, stroke: c.primary, strokeWidth: 1.5 }), desc: "Fala wraca" },
            { label: "ZATRZYMANIE", sub: "2 sek", pattern: linearPattern({ cx: 30, cy: 30, spokes: 8, maxR: 26, stroke: c.primary, strokeWidth: 1 }), desc: "Wezel" },
            { label: "WYDECH", sub: "8 sek", pattern: spiralPattern({ cx: 30, cy: 30, turns: 3, maxR: 26, stroke: c.primary, strokeWidth: 1.5 }), desc: "Fala leci" },
            { label: "PAUZA", sub: "2 sek", pattern: concentricCircles({ rings: 2, cx: 30, cy: 30, maxR: 26, stroke: c.accent, strokeWidth: 1 }), desc: "Cisza" },
          ].map((step, i) => (
            <div key={i} tw="flex flex-col items-center gap-1.5">
              <img src={step.pattern} tw="h-[60px] w-[60px] rounded-[10px]" style={{ border: `1.5px solid ${c.border}` }} />
              <span tw="text-[8px] font-black" style={{ color: c.dark }}>{step.label}</span>
              <span tw="text-[7px] font-bold text-[#6B7280]">{step.sub}</span>
              <span tw="text-[6px] font-bold text-[#9CA3AF]">{step.desc}</span>
              {i < 3 && <span tw="text-[10px] font-black text-[#D1D5DB]">-</span>}
            </div>
          ))}
        </div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 1 - przewroc kartke ---</span>
      </div>

      {/* PAGE 2: Exercises */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">CWICZENIA ODDECHOWE — WZORZEC GEOMETRYCZNY</span>
        <div tw="grid grid-cols-2 gap-3">
          {[
            { title: "Fala dluga", desc: "Wdech 4s. Wydech ssssss 8s. Wyobraź sobie fale lecaca.", steps: ["Wdech nosem", "Usta w tube", "Ssssss 8s"], time: "5 min" },
            { title: "Wezly Chladni", desc: "Wdech 4s. Zatrzymaj 4s. Wydech 4s. Zatrzymaj 4s. Rowne czesci.", steps: ["Wdech", "Stoj", "Wydech"], time: "5 min" },
            { title: "Spirala oddechu", desc: "Wdech krotki. Wydech dluzszy. Kazdy wydech dluzszy o 1s.", steps: ["4s wdech", "5s wydech", "6s wydech"], time: "5 min" },
            { title: "Promienie", desc: "Wdech nosem. Wydech ustami razem z gloska: sss, szzz, fff.", steps: ["Wdech", "Sss 5s", "Szzz 5s"], time: "5 min" },
          ].map((ex, i) => (
            <div key={i} tw="rounded-[14px] bg-[#FEF2F2] p-3 flex flex-col gap-1.5" style={{ border: `1.5px solid ${c.border}` }}>
              <span tw="text-[9px] font-black tracking-widest" style={{ color: c.dark }}>{ex.title}</span>
              <span tw="text-[8px] font-semibold text-[#6B7280] leading-[1.4]">{ex.desc}</span>
              <div tw="flex gap-1 mt-1">
                {ex.steps.map((s, j) => (
                  <span key={j} tw="flex-1 rounded-full px-2 py-1 text-center text-[7px] font-black text-white" style={{ backgroundColor: c.primary }}>
                    {j + 1}. {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border={c.border} twExtra="flex-1">
          <span tw="text-[9px] font-black tracking-widest" style={{ color: c.dark }}>NARYSUJ SWOJ ODDECH</span>
          <span tw="text-[8px] font-semibold text-[#6B7280]">
            Polcz temperature pod nosem. Czujesz cieplo? To fala oddechu.
            Narysuj ja — spirala? Kolo? Linia?
          </span>
          <div tw="h-[50px] w-full rounded-[10px] bg-white mt-2 flex items-center justify-center" style={{ border: `2.5px dashed ${c.border}` }}>
            <span tw="text-[7px] font-bold text-[#D1D5DB]">Twoj wzorzec oddechu</span>
          </div>
        </DottedCard>
        <div tw="flex flex-col gap-2 shrink-0 w-[140px]">
          <XPTracker stars={5} mission="4 CWICZENIA" level="2" />
          <SelfRating accent={c.primary} />
        </div>
      </div>

      <FooterBar text="Logopedia — geometria oddechu — fale stojace — A4" color={c.dark} />
    </div>
  );
}
