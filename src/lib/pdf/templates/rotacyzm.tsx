import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { cymaticMandalaSmall, cymaticMandalaFull } from "../cymaticPatterns";
import { CuttingLine, DottedCard, FooterBar, HierarchyBar, InstructionCard, PageHeader, ParentTip, PersonalizationBar, SelfRating, StickerStrip, XPTracker } from "./shared";
const c = kidPalette.r;
export function RotacyzmTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  const words: Array<{ w: string; pos: "P" | "S" | "K" }> = [
    { w: "RAKIETA", pos: "P" }, { w: "ROWER", pos: "P" }, { w: "RYBA", pos: "P" }, { w: "RÓŻA", pos: "P" },
    { w: "KROWA", pos: "S" }, { w: "DRZEWO", pos: "S" }, { w: "TORT", pos: "K" }, { w: "LUSTRO", pos: "K" },
  ];
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFF7ED" }}>
      <PageHeader title="RYCZACY LEW RYSIO" subtitle="Rotacyzm - R - od TR do R" icon="R" color={c.primary} badge="BOSS" heroLetter="R" />
      <PersonalizationBar name={name} date={date} color={c.primary} />
      <div tw="flex gap-2 mb-3">
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">CO ROBIE</span><span tw="text-[8px] font-bold text-[#1A1A2E]">Rycze: rrr</span>
        </div>
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">ILE</span><span tw="text-[8px] font-bold text-[#1A1A2E]">8 slow - 5 min</span>
        </div>
        <div tw="flex-1 rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: c.primary }}>
          <span tw="text-[7px] font-black tracking-widest text-white/80">PO TYM</span><span tw="text-[8px] font-black text-white">Naklejka</span>
        </div>
      </div>
      <HierarchyBar accent={c.primary} active={2} />
      <div tw="rounded-[20px] bg-white p-4 mb-3 flex gap-4 items-center" style={{ border: "2px solid #E5E7EB" }}>
        <img src={wordToDataUri("RYSIO")!} tw="h-[112px] w-[112px] rounded-[16px] shrink-0" style={{ border: "2px solid #E5E7EB" }} />
        <div tw="flex flex-col gap-1.5 flex-1">
          <span tw="text-[11px] font-black text-[#1A1A2E]">Lew Rysio uczy ryczec</span>
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Czubek jezyka do <span style={{ color: c.dark, fontWeight: 900 }}>walka</span>. Dmuchaj <span style={{ color: c.dark }}>trrr...</span> Potem <span style={{ color: c.dark }}>rrr...</span> Najpierw TR/DR, potem R.
          </span>
        </div>
        <XPTracker stars={5} mission="4 KROKI" level="BOSS" />
      </div>
      <div tw="flex gap-3 mb-3">
        <InstructionCard title="Kolejnosc" text="TR/DR - PR/BR - KR/GR - R naglos - R srodglos - R wyglos. Nie pomijaj." accent={c.secondary} steps={["Walek", "Dmuchaj", "Rycz"]} time="5 min" />
        <div tw="rounded-[14px] bg-white p-3 flex flex-col items-center justify-center gap-1.5 shrink-0 w-[120px]" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">MOST</span><span tw="text-[8px] font-black text-[#1A1A2E]">TR - R</span>
        </div>
      </div>
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">8 SLOW - pokoloruj kontur</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-[#7C2D12]" style={{ backgroundColor: "#FFF7ED", border: "1.5px solid #FDBA74" }}>P/S/K</span>
        </div>
        <div tw="grid grid-cols-4 gap-3">
          {words.map((it) => (
            <div key={it.w} tw="rounded-[16px] bg-white py-3 px-2 flex flex-col items-center gap-1.5" style={{ border: "2px solid #E5E7EB", minHeight: "172px" }}>
              <img src={wordToDataUri(it.w)!} tw="h-[112px] w-[112px] rounded-[14px] bg-white" />
              <span tw="text-[11px] font-black text-[#1A1A2E] text-center" style={{ letterSpacing: "0.3px" }}>{it.w}</span>
              <span tw="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#F59E0B" : "#EF4444", color: "white" }}>{it.pos}</span>
              <div tw="flex gap-1 mt-0.5">
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
              </div>
              <div tw="w-[48px] h-[1px] mt-1" style={{ borderTop: "1.5px dashed #E5E7EB" }} />
            </div>
          ))}
        </div>
        <div tw="mt-3 flex justify-center"><span tw="text-[7px] font-bold text-[#6B7280] tracking-widest">Biala ramka = do pokolorowania</span></div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">- - - KONIEC STRONY 1 - przewroc kartke - - -</span>
      </div>

      <div tw="rounded-[20px] bg-white p-4 mb-3 flex flex-col items-center gap-2" style={{ border: "2px solid #E5E7EB" }}>
        <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">MANDALA - pokoloruj po slowach</span>
        <div tw="flex items-center justify-center mt-1">
          <img src={cymaticMandalaSmall({ letter: "R", accent: c.primary, series: "rotacyzm" })} tw="h-[112px] w-[112px]" />
        </div>
        <span tw="text-[7px] font-bold text-[#6B7280]">Wybierz 2 kolory - rrr na zmiane</span>
      </div>
      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#FDBA74" twExtra="flex-1">
          <span tw="text-[9px] font-black tracking-widest text-[#7C2D12]">Sylaby - stukaj 3x</span>
          <div tw="grid grid-cols-3 gap-1.5 mt-2">
            {["RA", "RE", "RI", "RO", "RU", "RY", "AR", "ER", "OR"].map((syl) => (
              <div key={syl} tw="rounded-[10px] bg-white p-2 flex items-center justify-center" style={{ border: "1.5px solid #FDE68A" }}>
                <span tw="text-[10px] font-black text-[#7C2D12]">{syl}</span>
              </div>
            ))}
          </div>
          <ParentTip text="Jesli R nie drga - wroc do TRA/DRA." accent={c.primary} />
        </DottedCard>
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex flex-col gap-2" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">Sciezka Lwa</span>
          <div tw="flex flex-col gap-1.5 mt-1">
            {["START RA RA", "KROWA na hali", "META RYCZ"].map((p, i) => (
              <div key={p} tw="rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #FDE68A" }}>
                <span tw="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black text-white" style={{ backgroundColor: i === 2 ? c.primary : "#FDE68A", color: i === 2 ? "white" : "#7C2D12" }}>{i + 1}</span>
                <span tw="text-[8px] font-bold text-[#1A1A2E]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <span tw="text-[9px] font-black tracking-widest text-[#7C2D12]">Zdania Krola Lwa</span>
        <div tw="flex gap-3 mt-3 items-center">
          <img src={wordToDataUri("RAKIETA")!} tw="h-[80px] w-[80px] rounded-[12px] shrink-0 bg-white" />
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6] flex-1" style={{ letterSpacing: "0.2px" }}>Rysio rysuje rakiete. Krowa ryczy. Tramwaj skreca.</span>
          <img src={wordToDataUri("RYSIO")!} tw="h-[80px] w-[80px] rounded-[12px] shrink-0 bg-white" />
        </div>
      </div>
      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">- - - KONIEC STRONY 2 - przewroc kartke - - -</span>
      </div>

      <div tw="rounded-[20px] bg-white p-5 mb-3 flex flex-col items-center gap-3" style={{ border: "2.5px dashed #E5E7EB" }}>
        <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E]">MANDALA - skupienie po pracy</span>
        <span tw="text-[9px] font-semibold text-[#4B5563] text-center leading-[1.5]">Wybierz 2 kolory. Koloruj od srodka na zewnatrz. Oddychaj spokojnie.</span>
        <div tw="flex items-center justify-center">
          <img src={cymaticMandalaFull({ letter: "R", accent: "#C2410C", series: "rotacyzm" })} tw="h-[180px] w-[180px]" />
        </div>
        <span tw="text-[7px] font-bold text-[#9CA3AF]">Po mandali: zamknij oczy, powiedz 3 slowa ktore pamietasz najlepiej.</span>
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1"><SelfRating accent={c.primary} /></div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}><CuttingLine /><StickerStrip count={4} accent={c.primary} label="TROFEA - wytnij" /></div>
      </div>
      <FooterBar text="Ryczacy Lew - R - Van Riper - A4" color="#9A3412" />
    </div>
  );
}
