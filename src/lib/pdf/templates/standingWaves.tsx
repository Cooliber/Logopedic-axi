import { kidPalette } from "../theme";
import {
  standingWave,
  concentricCircles,
  linearPattern,
  flowerOfLife,
  cellularPattern,
} from "../cymaticPatterns";
import {
  PageHeader,
  PersonalizationBar,
  InstructionCard,
  FooterBar,
  DottedCard,
  SelfRating,
  XPTracker,
  TraceLine,
} from "./shared";

const c = { primary: "#0891B2", secondary: "#0E7490", accent: "#06B6D4", light: "#ECFEFF", dark: "#155E75", border: "#A5F3FC", paper: "#ECFEFF" };

export function StandingWavesTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : c.light }}>
      <PageHeader title="FALE STOJACE" subtitle="Chladni — wzorce stojace" icon="~" color={c.primary} badge="2" heroLetter="~" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      {/* PAGE 1: Theory + Visual */}
      <div tw="rounded-[20px] bg-white p-5 mb-3 flex gap-5 items-start" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex flex-col gap-2 flex-1">
          <span tw="text-[13px] font-black text-[#1A1A2E] leading-tight">Czym sa fale stojace?</span>
          <span tw="text-[10px] font-semibold text-[#4B5563] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Kiedy fala spotyka sie z fala w przeciwnym kierunku, tworza sie wezly —
            miejsca w ktorych nic sie nie porusza. Piasek na platynie gromadzi sie
            w tych miejscach i rysuje piekne wzory!
          </span>
          <span tw="text-[9px] font-bold text-[#6B7280] leading-[1.4]">
            Ernst Chladni odkryl to w 1787 roku. Dzisiaj uzywamy tego do
            rozumienia, jak dzwiek ksztaltuje matter — od komorek po katedry.
          </span>
        </div>
        <div tw="shrink-0 flex flex-col items-center gap-2">
          <img src={standingWave({ nodes: 4, stroke: c.primary, strokeWidth: 1.5 })} tw="h-[90px] w-[90px]" />
          <span tw="text-[7px] font-black tracking-widest" style={{ color: c.dark }}>CHLADNI f=200Hz</span>
        </div>
      </div>

      {/* Pattern comparison grid */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">RODZAJE WZORCOW CYMATYCZNYCH</span>
        <div tw="grid grid-cols-4 gap-3">
          {[
            { name: "Koncentryczne", pattern: concentricCircles({ rings: 5, stroke: c.primary, strokeWidth: 1 }), desc: "Rippla w stawie" },
            { name: "Stojace", pattern: standingWave({ nodes: 3, stroke: c.primary, strokeWidth: 1 }), desc: "Wezly Chladni" },
            { name: "Liniowe", pattern: linearPattern({ spokes: 10, stroke: c.primary, strokeWidth: 1 }), desc: "Komunikacja" },
            { name: "Komorkowe", pattern: cellularPattern({ cellR: 10, stroke: c.primary, strokeWidth: 0.8 }), desc: "Architektura" },
          ].map((p) => (
            <div key={p.name} tw="flex flex-col items-center gap-1.5">
              <img src={p.pattern} tw="h-[84px] w-[84px] rounded-[8px]" style={{ border: `1.5px solid ${c.border}` }} />
              <span tw="text-[8px] font-black text-center" style={{ color: c.dark }}>{p.name}</span>
              <span tw="text-[6px] font-bold text-[#6B7280] text-center">{p.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 1 - przewroc kartke ---</span>
      </div>

      {/* PAGE 2: Tracing Exercises */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">SLEDZENIE WZORCOW — palec + glos</span>
        <span tw="text-[8px] font-bold text-[#6B7280] mb-3">Prowadz palcem po wzorze. Mow gloske na wydechu. Powtorz 5x.</span>
        <div tw="grid grid-cols-2 gap-4">
          {/* Chladni node tracing */}
          <div tw="flex flex-col gap-2">
            <img src={standingWave({ nodes: 5, stroke: c.primary, strokeWidth: 1.5 })} tw="h-[80px] w-full rounded-[10px]" style={{ border: `1.5px solid ${c.border}` }} />
            <TraceLine accent={c.primary} label="Sss... wezly" />
            <span tw="text-[7px] font-bold text-[#6B7280]">Sledz wezly — nie ruszaj piasku!</span>
          </div>
          {/* Concentric tracing */}
          <div tw="flex flex-col gap-2">
            <img src={concentricCircles({ rings: 6, stroke: c.primary, strokeWidth: 1.5 })} tw="h-[80px] w-full rounded-[10px]" style={{ border: `1.5px solid ${c.border}` }} />
            <TraceLine accent={c.secondary} label="Szum... kola" />
            <span tw="text-[7px] font-bold text-[#6B7280]">Od srodka na zewnatrz — szum lasu</span>
          </div>
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border={c.border} twExtra="flex-1">
          <span tw="text-[9px] font-black tracking-widest" style={{ color: c.dark }}>INTERFERENCJA — dwa zrodla</span>
          <span tw="text-[8px] font-semibold text-[#6B7280]">
            Dwa glosniki obok siebie. Fale nakladaja sie i tworza nowy wzorzec.
            Tak samo jest kiedy mowisz dwa gloski po sobie.
          </span>
          <img src={concentricCircles({ rings: 4, stroke: c.accent, strokeWidth: 1 })} tw="h-[50px] w-[50px] mt-1" />
        </DottedCard>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col items-center gap-2" style={{ border: `2px solid ${c.border}` }}>
          <span tw="text-[9px] font-black tracking-widest" style={{ color: c.dark }}>Twoje fale stojace</span>
          <div tw="h-[60px] w-full rounded-[10px] bg-white flex items-center justify-center" style={{ border: `2.5px dashed ${c.border}` }}>
            <span tw="text-[7px] font-bold text-[#D1D5DB]">Narysuj swoj wzorzec</span>
          </div>
        </div>
      </div>

      <div tw="flex gap-3 items-center">
        <XPTracker stars={5} mission="4 WZORCE" level="2" />
        <SelfRating accent={c.primary} />
      </div>

      <FooterBar text="Logopedia — fale stojace — Chladni — geometria dzwieku — A4" color={c.dark} />
    </div>
  );
}
