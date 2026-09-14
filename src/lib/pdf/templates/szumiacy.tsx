import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { CuttingLine, DottedCard, FooterBar, HierarchyBar, InstructionCard, PageHeader, ParentTip, PersonalizationBar, SelfRating, StickerStrip, XPTracker } from "./shared";
const c = kidPalette.szum;
export function SzumiacyTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  const words: Array<{ w: string; pos: "P" | "S" | "K" }> = [
    { w: "SZKOŁA", pos: "P" }, { w: "SZAFA", pos: "P" }, { w: "ŻABA", pos: "P" }, { w: "ŻYRAFA", pos: "P" },
    { w: "CZAPKA", pos: "P" }, { w: "DŻEM", pos: "P" }, { w: "KOSZ", pos: "K" }, { w: "MYSZ", pos: "K" },
  ];
  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#F0FDF4" }}>
      <PageHeader title="SZUM LASU" subtitle="Szereg szumiacy - sz z cz dz - wargi w koleczko" icon="SZ" color={c.primary} badge="2" heroLetter="SZ" />
      <PersonalizationBar name={name} date={date} color={c.primary} />
      <div tw="flex gap-2 mb-3">
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">CO ROBIE</span><span tw="text-[8px] font-bold text-[#1A1A2E]">Szumie: sz z cz dz</span>
        </div>
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">ILE</span><span tw="text-[8px] font-bold text-[#1A1A2E]">8 slow - 8-10 min</span>
        </div>
        <div tw="flex-1 rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: c.primary }}>
          <span tw="text-[7px] font-black tracking-widest text-white/80">PO TYM</span><span tw="text-[8px] font-black text-white">Naklejka</span>
        </div>
      </div>
      <HierarchyBar accent={c.primary} active={3} />
      <div tw="rounded-[20px] bg-white p-4 mb-3 flex gap-4 items-center" style={{ border: "2px solid #E5E7EB" }}>
        <img src={wordToDataUri("DZUNGLA")!} tw="h-[76px] w-[76px] rounded-[14px] shrink-0" style={{ border: "2px solid #E5E7EB" }} />
        <div tw="flex flex-col gap-1.5 flex-1">
          <span tw="text-[11px] font-black text-[#1A1A2E]">Las szumi</span>
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Wiatr w <span style={{ color: c.dark, fontWeight: 900 }}>szafie</span> lisci, <span style={{ color: c.dark }}>zaba</span> kumka zzz, <span style={{ color: c.dark }}>czapka</span> spada. Wargi w koleczko jak u, jezyk szeroki za walkiem.
          </span>
        </div>
        <XPTracker stars={5} mission="8 SLOW" level="2" />
      </div>
      <div tw="flex gap-3 mb-3">
        <InstructionCard title="Zasada szumu" text="Wargi w koleczko (jak u), jezyk szeroki za walkiem. Powietrze srodkiem." accent={c.secondary} steps={["Koleczko", "Szum", "Mow"]} time="8-10 min" />
        <div tw="rounded-[14px] bg-white p-3 flex flex-col items-center justify-center gap-1.5 shrink-0 w-[120px]" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">ROZNICUJ</span><span tw="text-[8px] font-black text-[#1A1A2E]">s/sz  z/zz  c/cz</span>
        </div>
      </div>
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">8 SLOW - pokoloruj kontur</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-[#1B4332]" style={{ backgroundColor: "#D8F3DC", border: "1.5px solid #95D5B2" }}>P = poczatek</span>
        </div>
        <div tw="grid grid-cols-4 gap-2.5">
          {words.map((it) => (
            <div key={it.w} tw="rounded-[14px] bg-white py-3 px-2 flex flex-col items-center gap-1" style={{ border: "1.5px solid #F3F4F6" }}>
              <img src={wordToDataUri(it.w)!} tw="h-[48px] w-[48px] rounded-[10px]" style={{ border: "1.5px solid #E5E7EB" }} />
              <span tw="text-[11px] font-black text-[#1A1A2E] text-center" style={{ letterSpacing: "0.3px" }}>{it.w}</span>
              <span tw="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : "#F59E0B", color: "white" }}>{it.pos}</span>
            </div>
          ))}
        </div>
        <div tw="mt-3 flex justify-center"><span tw="text-[7px] font-bold text-[#6B7280] tracking-widest">Biala ramka = do pokolorowania - bieli 22%</span></div>
      </div>
      <div tw="rounded-[20px] bg-white p-4 mb-3 flex flex-col items-center gap-2" style={{ border: "2px solid #E5E7EB" }}>
        <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">MANDALA - pokoloruj po slowach</span>
        <span tw="text-[7px] font-bold text-[#6B7280] text-center">Skup uwage 2 min - koloruj od srodka na zewnatrz.</span>
        <div tw="h-[96px] w-[96px] rounded-full flex items-center justify-center" style={{ border: "2.5px dashed #BBF7D0", backgroundColor: "#F0FDF4" }}>
          <div tw="h-[64px] w-[64px] rounded-full bg-white flex items-center justify-center" style={{ border: `2px solid ${c.primary}` }}>
            <span tw="text-[14px] font-black" style={{ color: c.primary }}>SZ</span>
          </div>
        </div>
        <span tw="text-[7px] font-bold text-[#6B7280]">Wybierz 2 kolory - pokoloruj SZ na zmiane</span>
      </div>
      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#BBF7D0" twExtra="flex-1">
          <span tw="text-[9px] font-black tracking-widest text-[#1B4332]">Sluchaj - ktore slowo?</span>
          <div tw="flex flex-col gap-1.5 mt-2">
            {["SOK czy SZOK?", "CENA czy CZAPKA?", "KASA czy KASZA?"].map((q) => (
              <div key={q} tw="rounded-full bg-[#F0FDF4] px-3 py-2 flex items-center" style={{ border: "1.5px solid #BBF7D0" }}>
                <span tw="text-[9px] font-bold text-[#1A1A2E] flex-1">{q}</span>
                <span tw="text-[7px] font-black text-[#1B4332]">wskaz</span>
              </div>
            ))}
          </div>
          <ParentTip text="Dzwieczne zz/dz: dlon na krtani - ma wibrowac." accent={c.primary} />
        </DottedCard>
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex flex-col gap-2" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">Ruch + glos</span>
          <span tw="text-[8px] font-semibold text-[#6B7280]">Skok + sz - rzut + cz - pilka na lyzce + zz</span>
          <div tw="flex gap-2 justify-center mt-1">
            <img src={wordToDataUri("ZABA")!} tw="h-[32px] w-[32px] rounded-[8px]" style={{ border: "1.5px solid #E5E7EB" }} />
            <img src={wordToDataUri("CZAPKA")!} tw="h-[32px] w-[32px] rounded-[8px]" style={{ border: "1.5px solid #E5E7EB" }} />
            <img src={wordToDataUri("DŻEM")!} tw="h-[32px] w-[32px] rounded-[8px]" style={{ border: "1.5px solid #E5E7EB" }} />
          </div>
        </div>
      </div>
      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <div tw="flex items-center justify-between">
          <span tw="text-[9px] font-black tracking-widest text-[#1B4332]">Historyjka - przeczytaj razem</span>
          <span tw="text-[7px] font-black bg-[#F0FDF4] px-2 py-1 rounded-full text-[#1B4332]" style={{ border: "1.5px solid #BBF7D0" }}>wolno</span>
        </div>
        <div tw="flex gap-3 mt-3 items-center">
          <img src={wordToDataUri("CZAPKA")!} tw="h-[48px] w-[48px] rounded-[10px] shrink-0" style={{ border: "1.5px solid #E5E7EB" }} />
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6] flex-1" style={{ letterSpacing: "0.2px" }}>Szymon szuka szyszek. Zaneta je dzzem. Czarek czysci czajnik. Szum cicho.</span>
          <img src={wordToDataUri("DZUNGLA")!} tw="h-[48px] w-[48px] rounded-[10px] shrink-0" style={{ border: "1.5px solid #E5E7EB" }} />
        </div>
      </div>
      <div tw="flex gap-3">
        <div tw="flex-1"><SelfRating accent={c.primary} /></div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}><CuttingLine /><StickerStrip count={4} accent={c.primary} label="NAKLEJKI - wytnij" /></div>
      </div>
      <FooterBar text="Szum Lasu - sz zz cz dz - Van Riper + ruch - A4" color={c.primary} />
    </div>
  );
}
