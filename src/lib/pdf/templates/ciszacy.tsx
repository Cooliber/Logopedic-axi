import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { CuttingLine, DottedCard, FooterBar, HierarchyBar, InstructionCard, PageHeader, ParentTip, PersonalizationBar, SelfRating, StickerStrip, XPTracker } from "./shared";
const c = kidPalette.cisz;
export function CiszacyTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  const words: Array<{ w: string; pos: "P" | "S" | "K" }> = [
    { w: "ŚLIMAK", pos: "P" }, { w: "ŚNIEG", pos: "P" }, { w: "ŚWIECA", pos: "P" }, { w: "ŹREBIĘ", pos: "P" },
    { w: "ĆMA", pos: "P" }, { w: "CIAPKI", pos: "P" }, { w: "DŹWIĘK", pos: "P" }, { w: "LIŚĆ", pos: "K" },
  ];
  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#F5F3FF" }}>
      <PageHeader title="CISZA SWISTAKA" subtitle="Szereg ciszacy - s z c dz / si zi ci dzi - cicho" icon="S" color={c.primary} badge="3" heroLetter="S" />
      <PersonalizationBar name={name} date={date} color={c.primary} />
      <div tw="flex gap-2 mb-3">
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">CO ROBIE</span><span tw="text-[8px] font-bold text-[#1A1A2E]">Sycze cicho</span>
        </div>
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">ILE</span><span tw="text-[8px] font-bold text-[#1A1A2E]">8 slow - 8 min</span>
        </div>
        <div tw="flex-1 rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: c.primary }}>
          <span tw="text-[7px] font-black tracking-widest text-white/80">PO TYM</span><span tw="text-[8px] font-black text-white">Naklejka</span>
        </div>
      </div>
      <HierarchyBar accent={c.primary} active={3} />
      <div tw="rounded-[20px] bg-white p-4 mb-3 flex gap-4 items-center" style={{ border: "2px solid #E5E7EB" }}>
        <img src={wordToDataUri("ŚLIMAK")!} tw="h-[76px] w-[76px] rounded-[14px] shrink-0" style={{ border: "2px solid #E5E7EB" }} />
        <div tw="flex flex-col gap-1.5 flex-1">
          <span tw="text-[11px] font-black text-[#1A1A2E]">Swistak Cichus</span>
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Cichus szepta <span style={{ color: c.dark, fontWeight: 900 }}>ss...</span> Jezyk wysoko, usmiech szeroko. <span style={{ color: c.dark }}>slimak</span> pelznie, <span style={{ color: c.dark }}>snieg</span> prosi.
          </span>
        </div>
        <XPTracker stars={5} mission="8 SLOW" level="3" />
      </div>
      <div tw="flex gap-3 mb-3">
        <InstructionCard title="Jak mowimy cicho?" text="Usmiech szeroko, jezyk wysoko, delikatny powiew: ss - zz - cc - ddz." accent={c.secondary} steps={["Usmiech", "Wysoko", "Cicho"]} time="8 min" />
        <div tw="rounded-[14px] bg-white p-3 flex flex-col items-center justify-center gap-1.5 shrink-0 w-[120px]" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">PISOWNIA</span><span tw="text-[8px] font-black text-[#1A1A2E]">s/si  c/ci</span>
        </div>
      </div>
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">8 SLOW - pokoloruj kontur</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-[#4C1D95]" style={{ backgroundColor: "#F5F3FF", border: "1.5px solid #DDD6FE" }}>P = poczatek</span>
        </div>
        <div tw="grid grid-cols-4 gap-3">
          {words.map((it) => (
            <div key={it.w} tw="rounded-[16px] bg-white py-3 px-2 flex flex-col items-center gap-1.5" style={{ border: "2px solid #E5E7EB", minHeight: "128px" }}>
              <img src={wordToDataUri(it.w)!} tw="h-[64px] w-[64px] rounded-[12px]" style={{ border: "1.5px solid #E5E7EB" }} />
              <span tw="text-[11px] font-black text-[#1A1A2E] text-center" style={{ letterSpacing: "0.3px" }}>{it.w}</span>
              <span tw="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black" style={{ backgroundColor: "#22C55E", color: "white" }}>{it.pos}</span>
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
        <div tw="h-[96px] w-[96px] rounded-full flex items-center justify-center" style={{ border: "2.5px dashed #DDD6FE", backgroundColor: "#F5F3FF" }}>
          <div tw="h-[64px] w-[64px] rounded-full bg-white flex items-center justify-center" style={{ border: `2px solid ${c.primary}` }}>
            <span tw="text-[14px] font-black" style={{ color: c.primary }}>S</span>
          </div>
        </div>
        <span tw="text-[7px] font-bold text-[#6B7280]">Wybierz 2 kolory - spkojnie</span>
      </div>
      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#DDD6FE" twExtra="flex-1">
          <span tw="text-[9px] font-black tracking-widest text-[#4C1D95]">Pisownia - s vs si</span>
          <div tw="flex flex-col gap-1.5 mt-2">
            {["S - slimak vs SI - sianko", "C - cma vs CI - cisza"].map((t) => (
              <div key={t} tw="rounded-full bg-[#F5F3FF] px-3 py-2 flex items-center" style={{ border: "1.5px solid #DDD6FE" }}>
                <span tw="text-[8px] font-bold text-[#1A1A2E] flex-1">{t}</span>
              </div>
            ))}
          </div>
          <ParentTip text="Wskaz roznice s/si przed samogloska." accent={c.primary} />
        </DottedCard>
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex flex-col gap-2" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">Labirynt</span>
          <div tw="flex items-center gap-2 mt-1">
            <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: c.primary }}>A</span>
            <div tw="flex-1 h-[10px] rounded-full" style={{ border: `2px dashed ${c.primary}`, backgroundColor: "#F5F3FF" }} />
            <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: c.primary }}>B</span>
          </div>
          <span tw="text-[7px] font-bold text-[#6B7280] text-center">Prowadz palcem - ss.. cc..</span>
        </div>
      </div>
      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <span tw="text-[9px] font-black tracking-widest text-[#4C1D95]">Zdania szeptem</span>
        <div tw="flex gap-3 mt-3 items-center">
          <img src={wordToDataUri("ŚNIEG")!} tw="h-[48px] w-[48px] rounded-[10px] shrink-0" style={{ border: "1.5px solid #E5E7EB" }} />
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6] flex-1" style={{ letterSpacing: "0.2px" }}>Swistak spi w sniegu. Cma leci cicho.</span>
          <img src={wordToDataUri("ŚLIMAK")!} tw="h-[48px] w-[48px] rounded-[10px] shrink-0" style={{ border: "1.5px solid #E5E7EB" }} />
        </div>
      </div>
      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">- - - KONIEC STRONY 2 - przewroc kartke - - -</span>
      </div>

      <div tw="rounded-[20px] bg-white p-5 mb-3 flex flex-col items-center gap-3" style={{ border: "2.5px dashed #E5E7EB" }}>
        <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E]">MANDALA - skupienie po pracy</span>
        <span tw="text-[9px] font-semibold text-[#4B5563] text-center leading-[1.5]">Wybierz 2 kolory. Koloruj od srodka na zewnatrz. Oddychaj spokojnie.</span>
        <div tw="h-[180px] w-[180px] rounded-full flex items-center justify-center" style={{ border: "3px dashed #E5E7EB", backgroundColor: "#FFFBEB" }}>
          <div tw="h-[120px] w-[120px] rounded-full bg-white flex items-center justify-center" style={{ border: "3px solid #1A1A2E" }}>
            <span tw="text-[28px] font-black" style={{ color: "#1A1A2E" }}>S</span>
          </div>
        </div>
        <span tw="text-[7px] font-bold text-[#9CA3AF]">Po mandali: zamknij oczy, powiedz 3 slowa ktore pamietasz najlepiej.</span>
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1"><SelfRating accent={c.primary} /></div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}><CuttingLine /><StickerStrip count={4} accent={c.primary} label="NAKLEJKI - wytnij" /></div>
      </div>
      <FooterBar text="Cisza Swistaka - s zz cc ddz - A4" color={c.primary} />
    </div>
  );
}
