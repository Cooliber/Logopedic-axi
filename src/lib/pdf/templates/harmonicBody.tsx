// Template 5: Harmonic Body — sound frequencies and the body
// 3 pages A4: frequency-body map + cell resonance + sound healing
import { kidPalette } from "../theme";
import {
  standingWave,
  concentricCircles,
  flowerOfLife,
  dodecahedronProjection,
  cellularPattern,
  interferencePattern,
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

const c = { primary: "#059669", secondary: "#047857", accent: "#10B981", light: "#ECFDF5", dark: "#064E3B", border: "#A7F3D0", paper: "#ECFDF5" };

const bodyFrequencies = [
  { zone: "Glowa", freq: "432 Hz", desc: "Uspokaja umysl", pattern: concentricCircles({ rings: 5, stroke: c.primary, strokeWidth: 1.2 }), color: "#A855F7" },
  { zone: "Gardlo", freq: "384 Hz", desc: "Otwiera glos", pattern: standingWave({ nodes: 4, stroke: c.primary, strokeWidth: 1.2 }), color: "#0891B2" },
  { zone: "Serce", freq: "528 Hz", desc: "Kocha i leczy", pattern: flowerOfLife({ stroke: c.primary, strokeWidth: 0.8 }), color: "#DC2626" },
  { zone: "Brzuch", freq: "396 Hz", desc: "Uwalnia lek", pattern: dodecahedronProjection({ stroke: c.primary, strokeWidth: 1 }), color: "#F59E0B" },
  { zone: "Nogi", freq: "174 Hz", desc: "Uziemia", pattern: cellularPattern({ cellR: 10, stroke: c.primary, strokeWidth: 1 }), color: "#22C55E" },
];

export function HarmonicBodyTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : c.light }}>
      <PageHeader title="HARMONIJNE CIALO" subtitle="Dzwiek rezonuje z komorkami" icon="C" color={c.primary} badge="3" heroLetter="C" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      {/* PAGE 1: Frequency-Body Map */}
      <div tw="rounded-[20px] bg-white p-5 mb-3 flex gap-5 items-start" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex flex-col gap-2 flex-1">
          <span tw="text-[13px] font-black text-[#1A1A2E] leading-tight">Cialo jak instrument</span>
          <span tw="text-[10px] font-semibold text-[#4B5563] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Kazdy organizm ma swoja czestotliwosc. Komorki rezonuja
            z dzwiekiem — zdrowe komorki maja idealna symetrie,
            chore — asymetrie.
          </span>
          <span tw="text-[9px] font-bold text-[#6B7280] leading-[1.4]">
            Cymaskop moze zmierzyc czestotliwosc komorki. Badania sonogenetyki
            pozwalaja wlaczyc i wylaczyc glosy za pomoca dzwieku.
          </span>
        </div>
        <img src={interferencePattern({ cx1: 30, cy1: 60, cx2: 90, cy2: 60, rings: 4, stroke: c.primary })} tw="h-[80px] w-[80px] shrink-0" />
      </div>

      {/* Body frequency grid */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">STREFY CZESTOTLIWOSCI CIAŁA</span>
        <div tw="grid grid-cols-5 gap-2">
          {bodyFrequencies.map((bf) => (
            <div key={bf.zone} tw="rounded-[12px] bg-[#F0FDF4] p-2 flex flex-col items-center gap-1" style={{ border: `1.5px solid ${c.border}` }}>
              <img src={bf.pattern} tw="h-[44px] w-[44px] rounded-[8px]" style={{ border: `1px solid ${c.border}` }} />
              <span tw="text-[9px] font-black" style={{ color: c.dark }}>{bf.zone}</span>
              <span tw="text-[7px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: bf.color }}>{bf.freq}</span>
              <span tw="text-[6px] font-bold text-[#6B7280] text-center">{bf.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 1 - przewroc kartke ---</span>
      </div>

      {/* PAGE 2: Cell Resonance */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">REZONANS KOMOREK — ZDROWIE I KSZTALT</span>
        <div tw="flex gap-4 items-start">
          <img src={cellularPattern({ cellR: 11, stroke: c.primary, strokeWidth: 1 })} tw="h-[90px] w-[90px] shrink-0" />
          <div tw="flex flex-col gap-1.5 flex-1">
            <span tw="text-[9px] font-bold text-[#4B5563] leading-[1.5]">
              Zdrowa komorka ma idealna symetrie — jak cymatyk na glosniku.
              Choroba zmienia wzorzec. Cymaskop moze to zobaczyc!
            </span>
            <span tw="text-[8px] font-bold text-[#6B7280] leading-[1.4]">
              DNA od gory tworzy mandale — promieniste wzorce harmoniczne.
              Kiedy komorka sie dzieli, wysyla czestotliwosc sygnalna.
              To tak jak falowanie na wodzie — sygnal dociera do wszystkich
              komorek.
            </span>
            <span tw="text-[8px] font-bold text-[#6B7280] leading-[1.4]">
              Ferrofluid — zelazny proszek w plynie — organize sie
              pod wplywem pola magnetycznego. Twoja krew robi to samo!
              Czestotliwosc serca organizuje przeplyw.
            </span>
          </div>
        </div>
      </div>

      <DottedCard bg="#FFFFFF" border={c.border}>
        <span tw="text-[10px] font-black tracking-widest" style={{ color: c.dark }}>SONOGENETYKA — DZWIEK LECZY</span>
        <span tw="text-[9px] font-semibold text-[#6B7280] leading-[1.5]">
          Uczcy ultradzwiekowe moga rozbijac komorki rakowe — tak jak operowy
          spiewak rozbija szklo. Fala przechodzi przez komorke i ja niszczy.
          Badania sonogenetyki pozwalaja tez wlaczyc i wylaczyc glosy
          odpowiednia czestotliwoscia.
        </span>
      </DottedCard>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 2 - przewroc kartke ---</span>
      </div>

      {/* PAGE 3: Sound Healing + Closing */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">DZWIEK I ARCHITEKTURA — KATEDRY</span>
        <div tw="flex gap-4 items-start">
          <img src={flowerOfLife({ stroke: c.primary, strokeWidth: 0.8 })} tw="h-[80px] w-[80px] shrink-0" />
          <div tw="flex flex-col gap-1.5 flex-1">
            <span tw="text-[9px] font-bold text-[#4B5563] leading-[1.5]">
              W kazdej katedrze jest ambulatorium — rezonator jamowy.
              W centrum tego rezonatora jest wzorzec interferencyjny —
              ten sam co w cymatyce.
            </span>
            <span tw="text-[8px] font-bold text-[#6B7280] leading-[1.4]">
              Aby znalezc rezonans budynku, nagrywasz cisze, potem ja wzmacniasz.
              Te wzorce pasuja do wzorcow na calym budynku. To nie przypadek —
              DNA tez tworzy takie wzorce!
            </span>
          </div>
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <InstructionCard
          title="Zadanie: Twój rezonans"
          text="Stoj w ciszy. Zamknij oczy. Sluchaj — co slyszysz? To rezonans twojego ciala. Narysuj wzorzec."
          accent={c.primary}
          steps={["Sluchaj", "Czuj", "Rysuj"]}
          time="5 min"
        />
        <div tw="flex flex-col gap-2 shrink-0 w-[130px]">
          <XPTracker stars={5} mission="5 STREF" level="3" />
          <SelfRating accent={c.primary} />
        </div>
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}>
          <CuttingLine />
          <StickerStrip count={4} accent={c.primary} label="NAKLEJKI — wytnij" />
        </div>
      </div>

      <FooterBar text="Logopedia — harmonijne cialo — sonogenetyka — rezonans — A4" color={c.dark} />
    </div>
  );
}
