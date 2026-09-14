import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { FooterBar, PageHeader, PersonalizationBar, SelfRating, CuttingLine, StickerStrip, XPTracker } from "./shared";
import { ZAGADKI, ZESTAWY, zagadkiBySlug, type ZestawMeta } from "../zagadki/data";

const ACCENT = "#7C3AED";

function clampEko(e: boolean | undefined, col: string) {
  return e ? "#FFFFFF" : col;
}

export function ZagadkiTemplate({
  name,
  date,
  eko,
  slug,
}: { name?: string; date?: string; eko?: boolean; slug?: string } = {}) {
  const meta: ZestawMeta | undefined = slug ? zagadkiBySlug(slug) : undefined;
  const zestaw = meta?.zagadki ?? ZAGADKI.slice(0, 5);
  const title = meta ? meta.title.toUpperCase() : "ZAGADKI LOGOPEDYCZNE";
  const subtitle = meta ? meta.subtitle : "70 zagadek — mow, zgaduj, powtarzaj gloske";
  const color = meta?.color ?? ACCENT;
  const levelLabel = meta?.level ?? "mix";
  const isWhite = color === "#FFFFFF";

  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#F5F3FF" }}>
      <PageHeader title={title} subtitle={subtitle} icon="?" color={color} badge={slug ? slug.split("-")[1] : "?"} heroLetter="?" />
      <PersonalizationBar name={name} date={date} color={color} />

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex gap-3 items-center" style={{ border: `2px solid ${color}` }}>
          <span tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[12px] font-black shrink-0" style={{ backgroundColor: color }}>!</span>
          <div tw="flex flex-col flex-1">
            <span tw="text-[11px] font-black" style={{ color: color }}>Jak pracujemy z zagadką?</span>
            <span tw="text-[9px] font-semibold text-[#4B5563] leading-[1.4]">1. Dorosły czyta zagadkę wolno. 2. Dziecko zgaduje i MÓWI odpowiedź głośno 3× z dobrą głoską. 3. Odkryj rysunek i pokoloruj.</span>
          </div>
        </div>
        <XPTracker stars={5} mission={`${zestaw.length} ZAGADEK`} level={levelLabel} />
      </div>

      <div tw="flex items-center gap-2 mb-2">
        <span tw="text-[8px] font-black tracking-widest text-[#6B7280] uppercase">ZESTAW {slug ?? "—"} • {zestaw.length} zagadek • poziom {levelLabel}</span>
        <span tw="flex-1 h-[1px]" style={{ borderTop: "1.5px dashed #E5E7EB" }} />
        <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: color }}>CZYTAJ — ZGADNIJ — POWTORZ</span>
      </div>

      <div tw="flex flex-col gap-3 mb-3">
        {zestaw.map((z, idx) => {
          const src = wordToDataUri(z.odpowiedz);
          const szeregLabel = z.szereg === "mix" ? "MIX" : z.szereg.toUpperCase();
          const szeregColor =
            z.szereg === "syczacy" ? "#FACC15" : z.szereg === "szumiacy" ? "#2D6A4F" : z.szereg === "ciszacy" ? "#7C3AED" : z.szereg === "rotacyzm" ? "#C2410C" : color;
          return (
            <div key={z.id} tw="rounded-[18px] bg-white p-3 flex gap-3 items-stretch" style={{ border: `2.5px solid ${color}30` }}>
              {/* Numer + ikona */}
              <div tw="flex flex-col items-center gap-1.5 shrink-0" style={{ width: "78px" }}>
                <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: color }}>{idx + 1}</span>
                {src ? (
                  <img src={src} tw="h-[64px] w-[64px] rounded-[12px] bg-white" style={{ border: `2px solid ${szeregColor}` }} />
                ) : (
                  <span tw="h-[64px] w-[64px] rounded-[12px] bg-white flex items-center justify-center text-[16px] font-black" style={{ border: `2px solid ${szeregColor}`, color: color }}>{z.odpowiedz.charAt(0)}</span>
                )}
                <span tw="text-[7px] font-black tracking-widest px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: szeregColor }}>{szeregLabel}</span>
                <span tw="text-[6px] font-bold text-[#9CA3AF]">poz. {z.poziom}</span>
              </div>

              {/* Tresc zagadki + odpowiedz zakryta */}
              <div tw="flex-1 flex flex-col gap-2">
                <div tw="rounded-[12px] bg-[#FFFBEB] p-3 flex flex-col gap-1" style={{ border: "1.8px dashed #FDE68A" }}>
                  <span tw="text-[7px] font-black tracking-widest text-[#92400E]">ZAGADKA {idx + 1}</span>
                  <span tw="text-[11px] font-bold text-[#1A1A2E] leading-[1.5]">“{z.tresc}”</span>
                  {z.podpowiedz && <span tw="text-[7px] font-bold text-[#6B7280]">Podpowiedz: {z.podpowiedz}</span>}
                  <span tw="text-[8px] font-black text-[#1A1A2E]">Co to?</span>
                  <div tw="flex items-center gap-2">
                    <span tw="text-[8px] font-bold text-[#6B7280]">Odpowiedz:</span>
                    <span tw="flex-1 h-[1px]" style={{ borderTop: "1.5px dashed #D1D5DB" }} />
                  </div>
                </div>

                {/* Reveal flap — dashed box "odkryj" */}
                <div tw="flex gap-2 items-center">
                  <div tw="flex-1 rounded-[12px] bg-white p-2 flex items-center gap-2" style={{ border: `2px dashed ${color}` }}>
                    <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white shrink-0" style={{ backgroundColor: color }}>*</span>
                    <span tw="text-[9px] font-black text-[#1A1A2E] flex-1">ODKRYJ — {z.odpowiedz}</span>
                    <span tw="text-[7px] font-bold text-[#6B7280]">powtorz 3×</span>
                  </div>
                  <div tw="flex gap-1 shrink-0">
                    <span tw="h-6 w-6 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                    <span tw="h-6 w-6 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                    <span tw="h-6 w-6 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                  </div>
                </div>

                <div tw="flex gap-1.5">
                  {["Poprawnie", "Z pomoca", "Jeszcze raz"].map((l, i) => (
                    <span key={l} tw="flex-1 rounded-full text-center text-[7px] font-black py-1" style={{ backgroundColor: i === 0 ? "#ECFDF5" : i === 1 ? "#FFFBEB" : "#F3F4F6", border: `1.2px solid ${i === 0 ? "#86EFAC" : i === 1 ? "#FDE68A" : "#E5E7EB"}`, color: "#1A1A2E" }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div tw="rounded-[14px] bg-white p-3 flex gap-3 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <div tw="flex-1 flex flex-col gap-1">
          <span tw="text-[8px] font-black tracking-widest text-[#1A1A2E]">DLA TERAPEUTY — wskazowki</span>
          <span tw="text-[7px] font-semibold text-[#6B7280] leading-[1.4]">• Podkresl gloske treningowa w odpowiedzi kolorowo. • Popros o zdanie: „Widze ...”. • 3 powtorzenia = 1 naklejka. • Wersja trudna: dziecko uklada wlasną zagadkę z tym slowem.</span>
        </div>
        <div tw="flex flex-col gap-1 shrink-0 items-center justify-center rounded-[12px] bg-[#F5F3FF] px-3 py-2" style={{ border: `1.5px solid ${color}` }}>
          <span tw="text-[8px] font-black" style={{ color: color }}>+{zestaw.length * 2} XP</span>
          <span tw="text-[7px] font-bold text-[#6B7280]">za zestaw</span>
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1"><SelfRating accent={color} /></div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}>
          <CuttingLine />
          <StickerStrip count={4} accent={color} label="NAKLEJKI — wytnij po ukonczeniu" />
        </div>
      </div>

      <FooterBar text={`Zagadki logopedyczne ${slug ?? ""} — ${zestaw.length} zagadek — A4 • laminuj`} color={color} />
    </div>
  );
}

// Helper for 16 slugs — closure per slug for templates/index.ts
export function makeZagadkiComponent(slug: string) {
  return (props?: { name?: string; date?: string; eko?: boolean }) => ZagadkiTemplate({ ...props, slug });
}

export const ZAGADKI_SLUGS = ZESTAWY.map((z) => z.slug);
