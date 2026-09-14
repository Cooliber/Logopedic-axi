import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { CuttingLine, DottedCard, FooterBar, InstructionCard, PageHeader, ParentTip, PersonalizationBar, SelfRating, StickerStrip, XPTracker } from "./shared";

const c = kidPalette.plynnosc;

export function PlynnoscTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#F0F9FF" }}>
      <PageHeader title="PŁYNNA RZEKA SŁÓW" subtitle="Płynność wypowiedzi • oddech • tempo • pauza" icon="~" color={c.primary} badge="FLOW" heroLetter="~" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex gap-3 mb-3">
        <InstructionCard
          title="Złota zasada"
          text="Mów jak żółwinka — wolno, miękko, na wydechu. Zatrzymaj się na kropce, nabierz powietrza nosem. Spokój = płynność."
          accent={c.primary}
          steps={["Wdech", "Pauza", "Mów"]}
          time="10 min"
        />
        <XPTracker stars={5} mission="PŁYNIE 5 zdań" level="FLOW" />
      </div>

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex gap-3 items-center" style={{ border: "2.5px solid #90E0EF" }}>
          <img src={wordToDataUri("ŻÓŁW")!} tw="h-[52px] w-[52px] rounded-[10px] shrink-0" style={{ border: "2px solid #90E0EF" }} />
          <div tw="flex flex-col flex-1">
            <span tw="text-[11px] font-black text-[#023E8A]">ŻÓŁW — tak mówimy</span>
            <span tw="text-[9px] font-bold text-[#0077B6]">Wolno • spokojnie • wyraźnie</span>
            <div tw="flex gap-1 mt-2">
              <span tw="h-2 w-[48px] rounded-full" style={{ backgroundColor: c.primary }} />
              <span tw="h-2 w-[12px] rounded-full bg-[#CAF0F8]" />
            </div>
          </div>
          <span tw="text-[10px] font-black text-[#00B4D8]">OK</span>
        </div>
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex gap-3 items-center" style={{ border: "2.5px dashed #FECACA" }}>
          <img src={wordToDataUri("ZAJĄC")!} tw="h-[52px] w-[52px] rounded-[10px] shrink-0" style={{ border: "2px solid #FECACA" }} />
          <div tw="flex flex-col flex-1">
            <span tw="text-[11px] font-black text-[#6B7280]">ZAJĄC — za szybko</span>
            <span tw="text-[9px] font-bold text-[#6B7280]">Pędzi, gubi słowa</span>
            <div tw="flex gap-1 mt-2">
              <span tw="h-2 w-[12px] rounded-full bg-[#FECACA]" />
              <span tw="h-2 w-[48px] rounded-full bg-[#E63946]" />
            </div>
          </div>
          <span tw="text-[10px] font-black text-[#6B7280]">STOP</span>
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#90E0EF" twExtra="flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest text-[#023E8A]">Oddychanie — 4 kroki</span>
          <div tw="flex gap-2 mt-3">
            {[
              { n: "1", t: "Nos\nWDECH", bg: "#CAF0F8", icon: "ODDECH" },
              { n: "2", t: "Brzuch\nbalon", bg: "#E0F2FE", icon: "BALON" },
              { n: "3", t: "Usta\nWYDECH", bg: "#DBEAFE", icon: "SŁOMKA" },
              { n: "4", t: "Mów\nspokojnie", bg: "#BFDBFE", icon: "ŻÓŁW" },
            ].map((k) => (
              <div key={k.n} tw="flex-1 rounded-[14px] p-2.5 flex flex-col items-center gap-1.5" style={{ backgroundColor: k.bg, border: "1.5px solid #90E0EF" }}>
                <span tw="h-5 w-5 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#023E8A]">{k.n}</span>
                <img src={wordToDataUri(k.icon)!} tw="h-8 w-8 rounded-[6px]" style={{ border: "1px solid #90E0EF" }} />
                <span tw="text-[8px] font-black text-center leading-tight text-[#023E8A]">{k.t}</span>
              </div>
            ))}
          </div>
          <div tw="mt-3 flex items-center gap-2">
            <img src={wordToDataUri("ŻÓŁW")!} tw="h-6 w-6 rounded-[5px]" style={{ border: "1px solid #90E0EF" }} />
            <span tw="flex-1 text-[8px] font-black text-[#0077B6] text-center">SPRÓBUJ: Wdech 2s - pauza 1s - wydech 3s + „aaa…”</span>
            <img src={wordToDataUri("PIÓRKO")!} tw="h-6 w-6 rounded-[5px]" style={{ border: "1px solid #90E0EF" }} />
          </div>
          <ParentTip text="Połóż dłoń na brzuchu dziecka — ma się unieść jak balon. Ramiona spokojne." accent={c.primary} />
        </DottedCard>

        <DottedCard bg="#FFFBEB" border="#FDE68A" twExtra="flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest text-[#713F12]">Tempo — wystukaj rytm</span>
          <div tw="flex flex-col gap-2 mt-3">
            {[
              { label: "WOLNO", dots: "*   *   *", color: "#00B4D8", icon: "ŻÓŁW" },
              { label: "ŚREDNIO", dots: "*  *  *  *", color: "#F59E0B", icon: "ZAJĄC" },
              { label: "SZYBKO", dots: "******", color: "#E63946", icon: "ZAJĄC" },
            ].map((r) => (
              <div key={r.label} tw="flex items-center gap-2 rounded-full bg-white px-2 py-1.5" style={{ border: "1.5px solid #FDE68A" }}>
                <img src={wordToDataUri(r.icon)!} tw="h-6 w-6 rounded-[5px]" style={{ border: "1px solid #FDE68A" }} />
                <span tw="text-[8px] font-black" style={{ color: r.color }}>{r.label}</span>
                <span tw="text-[8px] font-black tracking-widest flex-1 text-center" style={{ color: r.color }}>{r.dots}</span>
                <span tw="text-[7px] font-bold text-[#6B7280]">stukaj</span>
              </div>
            ))}
          </div>
          <span tw="text-[7px] font-bold text-[#92400E] mt-2">Wybierz WOLNO. Stukaj o stół przy każdej sylabie.</span>
          <div tw="mt-2 flex gap-2 justify-center">
            <img src={wordToDataUri("ŻÓŁW")!} tw="h-7 w-7 rounded-[6px]" style={{ border: "1.5px solid #06D6A0" }} />
            <span tw="text-[7px] font-black text-[#065F46] self-center">Żółw wygrywa wyścig</span>
            <img src={wordToDataUri("ZAJĄC")!} tw="h-7 w-7 rounded-[6px]" style={{ border: "1.5px solid #FECACA" }} />
          </div>
        </DottedCard>
      </div>

      <DottedCard bg="#FFFFFF" border={c.primary} twExtra="mb-3">
        <div tw="flex items-center justify-between">
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.primary }}>Rzeka słów — przedłużamy</span>
          <span tw="text-[7px] font-black bg-[#CAF0F8] px-2 py-1 rounded-full text-[#023E8A]">mów na wydechu</span>
        </div>
        <div tw="flex flex-col gap-2 mt-3">
          {[
            "Mooo-ja na iii-mię Aaan-tek.",
            "Luuu-bię pii-zzę z see-rem.",
            "Po-wooo-liii po-wiem swooo-je zdaaa-nie.",
          ].map((s, i) => (
            <div key={s} tw="flex gap-2 items-center rounded-[12px] bg-[#F0F9FF] px-3 py-2.5" style={{ border: "1.5px solid #90E0EF" }}>
              <span tw="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[9px] font-black text-[#023E8A]" style={{ border: "2px solid #00B4D8" }}>{i + 1}</span>
              <img src={wordToDataUri(i === 0 ? "ŻÓŁW" : i === 1 ? "BALON" : "ODDECH")!} tw="h-6 w-6 rounded-[5px]" style={{ border: "1px solid #90E0EF" }} />
              <span tw="text-[10px] font-bold text-[#1A1A2E] flex-1 leading-tight">{s}</span>
              <span tw="text-[8px] font-black text-[#00B4D8]">~~</span>
            </div>
          ))}
        </div>
        <div tw="mt-3 rounded-[10px] bg-[#ECFDF5] px-3 py-2 flex items-center gap-2" style={{ border: "1.5px solid #6EE7B7" }}>
          <img src={wordToDataUri("ŻÓŁW")!} tw="h-6 w-6 rounded-[5px]" />
          <span tw="flex-1 text-[8px] font-bold text-[#065F46] text-center">Udało się bez pośpiechu? Pokoloruj kropeczkę.</span>
          <span tw="text-[8px] font-black text-[#065F46]">*</span>
        </div>
      </DottedCard>

      <div tw="flex gap-3">
        <div tw="flex-1">
          <SelfRating accent={c.primary} />
        </div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "2px solid #90E0EF" }}>
          <CuttingLine />
          <StickerStrip count={3} accent={c.primary} label="FALKI — naklejka za płynność" />
        </div>
      </div>

      <FooterBar text="Płynna Rzeka Słów • oddech • tempo • przedłużanie • A4 • codziennie 5 min" color={c.dark} />
    </div>
  );
}
