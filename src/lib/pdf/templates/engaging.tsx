import { MASCOTS, type Mascot } from "../mascots";
import { wordToDataUri } from "../icons";
import { PersonalizationBar, FooterBar } from "./shared";

type Word = { w: string; pos: "P" | "S" | "K" };

function MascotHeader({ m, badge }: { m: Mascot; badge?: string }) {
  const mascotImg = wordToDataUri(m.species === "wąż" ? "WĄŻ" : m.species === "sowa" ? "SOWA" : m.species === "mysz" ? "MYSZ" : "LEW") || null;
  // fallback: use wordToDataUri for mascot name word if available, else emoji letter
  return (
    <div tw="flex items-center gap-4 rounded-[16px] bg-white px-5 py-4 mb-3" style={{ border: `1.5px solid #E5E7EB` }}>
      <div tw="h-[72px] w-[72px] rounded-[14px] bg-white flex items-center justify-center shrink-0 overflow-hidden" style={{ border: `1.5px solid ${m.border}`, backgroundColor: m.light }}>
        {mascotImg ? (
          <img src={mascotImg} tw="h-[60px] w-[60px] rounded-[10px]" style={{ objectFit: "cover" as any }} />
        ) : (
          <span tw="h-[32px] w-[32px] rounded-full bg-white flex items-center justify-center text-[14px] font-black" style={{ color: m.color, border: `1.5px solid ${m.border}` }}>
            {m.name.charAt(0)}
          </span>
        )}
      </div>
      <div tw="flex flex-col flex-1">
        <span tw="text-[11px] font-black tracking-[0.14em] uppercase" style={{ color: m.color === "#FACC15" ? "#713F12" : m.color }}>
          MISJA • {m.name.toUpperCase()} • {m.sound}
        </span>
        <span tw="text-[16px] font-black leading-tight text-[#1A1A2E] tracking-tight">{m.quest}</span>
        <span tw="text-[10px] font-bold leading-tight text-[#6B7280] mt-1">{m.joke}</span>
      </div>
      {badge && (
        <div tw="rounded-full bg-[#1A1A2E] px-3 py-1.5">
          <span tw="text-[10px] font-black text-white tracking-widest">{badge}</span>
        </div>
      )}
    </div>
  );
}

function QuestPath({ words, accent, light, images }: { words: Word[]; accent: string; light: string; images?: Record<string, string> }) {
  const imgFor = (w: string) => images?.[w] ?? wordToDataUri(w);
  return (
    <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: `1.5px solid #E5E7EB` }}>
      <div tw="flex items-center justify-between mb-3">
        <span tw="text-[11px] font-black tracking-[0.14em] uppercase text-[#1A1A2E]">8 skarbów — znajdź, nazwij, powtórz 2×</span>
        <span tw="text-[10px] font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>P = początek • S = środek • K = koniec</span>
      </div>

      <div tw="grid grid-cols-4 gap-3">
        {words.slice(0, 4).map((it, idx) => {
          const src = imgFor(it.w);
          return (
            <div key={it.w + idx} tw="rounded-[12px] bg-white flex flex-col items-center p-3 gap-2" style={{ border: `1.5px solid #E5E7EB`, backgroundColor: "#FFFFFF" }}>
              <div tw="h-[26px] w-[26px] rounded-full flex items-center justify-center text-[11px] font-black text-white mb-0" style={{ backgroundColor: accent }}>{idx + 1}</div>
              {src ? (
                <img src={src} tw="h-[84px] w-[84px] rounded-[10px] bg-white" style={{ border: `1px solid #F3F4F6`, objectFit: "cover" as any }} />
              ) : (
                <span tw="h-[84px] w-[84px] rounded-[10px] bg-[#F9FAFB] flex items-center justify-center text-[18px] font-black" style={{ border: `1px solid #F3F4F6`, color: accent }}>
                  {it.w.charAt(0)}
                </span>
              )}
              <span tw="text-[12px] font-black text-[#1A1A2E] text-center tracking-tight leading-none">{it.w}</span>
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#FACC15" : "#EF4444", color: it.pos === "S" ? "#713F12" : "white" }}>
                {it.pos}
              </span>
              <div tw="h-5 w-5 rounded-full bg-white mt-1" style={{ border: `1.5px solid ${accent}` }} />
            </div>
          );
        })}
      </div>

      <div tw="flex items-center justify-center gap-2 my-3">
        <div tw="flex-1 h-[2px] rounded-full" style={{ backgroundColor: light }} />
        <span tw="text-[10px] font-black tracking-widest px-3 py-1 rounded-full bg-white" style={{ border: `1.5px solid ${accent}`, color: accent }}>
          idź dalej — skocz 3× i powtórz!
        </span>
        <div tw="flex-1 h-[2px] rounded-full" style={{ backgroundColor: light }} />
      </div>

      <div tw="grid grid-cols-4 gap-3">
        {words.slice(4, 8).map((it, idx) => {
          const src = imgFor(it.w);
          return (
            <div key={it.w + idx} tw="rounded-[12px] bg-white flex flex-col items-center p-3 gap-2" style={{ border: `1.5px solid #E5E7EB`, backgroundColor: "#FFFFFF" }}>
              <div tw="h-[26px] w-[26px] rounded-full flex items-center justify-center text-[11px] font-black text-white" style={{ backgroundColor: accent }}>{idx + 5}</div>
              {src ? (
                <img src={src} tw="h-[84px] w-[84px] rounded-[10px] bg-white" style={{ border: `1px solid #F3F4F6`, objectFit: "cover" as any }} />
              ) : (
                <span tw="h-[84px] w-[84px] rounded-[10px] bg-[#F9FAFB] flex items-center justify-center text-[18px] font-black" style={{ border: `1px solid #F3F4F6`, color: accent }}>
                  {it.w.charAt(0)}
                </span>
              )}
              <span tw="text-[12px] font-black text-[#1A1A2E] text-center tracking-tight leading-none">{it.w}</span>
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#FACC15" : "#EF4444", color: it.pos === "S" ? "#713F12" : "white" }}>
                {it.pos}
              </span>
              <div tw="h-5 w-5 rounded-full bg-white mt-1" style={{ border: `1.5px solid ${accent}` }} />
            </div>
          );
        })}
      </div>

      <div tw="mt-3 rounded-[10px] bg-[#F9FAFB] px-3 py-2 flex items-center gap-2" style={{ border: `1px solid #F3F4F6` }}>
        <span tw="text-[10px] font-black tracking-widest" style={{ color: accent }}>
          JAK GRAĆ
        </span>
        <span tw="text-[10px] font-bold text-[#4B5563] leading-tight">Dorosly wskazuje obrazek - dziecko nazywa i zaznacza kolko. Za kazdy skarb 1 naklejka!</span>
      </div>
    </div>
  );
}

export function EngagingQuestTemplate({
  szereg,
  words,
  name,
  date,
  eko,
  title,
  subtitle,
  pairs,
  movement,
  images,
  themeLabel,
}: {
  szereg: Mascot["szereg"];
  words: Word[];
  name?: string;
  date?: string;
  eko?: boolean;
  title?: string;
  subtitle?: string;
  pairs?: Array<[string, string]>;
  movement?: string[];
  images?: Record<string, string>;
  themeLabel?: string;
}) {
  const m = MASCOTS[szereg];
  const c = { primary: m.color, secondary: m.border, light: m.light, dark: m.dark, border: m.border };
  // Theme-aware quest if provided
  const questText = themeLabel ? `${m.name} w świecie ${themeLabel} szuka 8 skarbów — ${m.sound}!` : m.quest;

  // inject theme quest into MascotHeader by temporarily overriding
  const mWithTheme = themeLabel ? { ...m, quest: questText } : m;
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: "#FFFFFF" }}>
      <PersonalizationBar name={name} date={date} color={c.primary} />
      <MascotHeader m={mWithTheme} badge={subtitle || `${szereg.toUpperCase()}`} />

      <QuestPath words={words} accent={c.primary} light={c.light} images={images} />

      {/* Story + pairs + movement on page 2 */}
      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[12px] bg-white p-4 flex flex-col gap-2" style={{ border: `1.5px solid #E5E7EB` }}>
          <span tw="text-[11px] font-black tracking-[0.14em] uppercase" style={{ color: c.primary }}>
            Słuchaj — które słowo?
          </span>
          <div tw="flex flex-col gap-2 mt-1">
            {(pairs || [
              ["SOK", "SZOK"],
              ["CENA", "CZAPKA"],
              ["SUM", "SZUM"],
            ]).map(([a, b]) => (
              <div key={a + b} tw="rounded-[10px] bg-[#F9FAFB] p-3 flex items-center gap-2" style={{ border: `1px solid #F3F4F6` }}>
                <span tw="flex-1 text-center text-[12px] font-black text-[#1A1A2E]">{a}</span>
                <span tw="text-[10px] font-black text-[#9CA3AF]">VS</span>
                <span tw="flex-1 text-center text-[12px] font-black" style={{ color: c.primary }}>
                  {b}
                </span>
                <span tw="h-5 w-5 rounded-full bg-white shrink-0" style={{ border: `1.5px solid ${c.primary}` }} />
              </div>
            ))}
          </div>
          <span tw="text-[9px] font-bold text-[#6B7280]">Dorosły mówi — dziecko wskazuje. Zamieńcie role!</span>
        </div>

        <div tw="flex-1 rounded-[12px] bg-white p-4 flex flex-col gap-2" style={{ border: `1.5px solid #E5E7EB` }}>
          <span tw="text-[11px] font-black tracking-[0.14em] uppercase" style={{ color: c.primary }}>
            Ruch + głos
          </span>
          {(movement || [`Skok + ${words[0]?.w || "SOWA"} — klaśnij`, `Rzut + ${words[1]?.w || "SOK"} — celuj`, `Kółka + ${words[2]?.w || "SER"} — kręć`]).map((t, i) => (
            <div key={t} tw="rounded-[10px] bg-[#F9FAFB] px-3 py-2.5 flex items-center gap-2" style={{ border: `1px solid #F3F4F6` }}>
              <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: c.primary }}>
                {i + 1}
              </span>
              <span tw="text-[11px] font-bold text-[#1A1A2E] flex-1">{t}</span>
            </div>
          ))}
          <span tw="text-[9px] font-bold text-[#6B7280]">Powtórz 5× — ruch kotwiczy pamięć!</span>
        </div>
      </div>

      {/* Reward strip engaging */}
      <div tw="rounded-[12px] bg-white p-3 flex items-center gap-3 mb-2" style={{ border: `1.5px solid #E5E7EB` }}>
        <span tw="h-8 w-8 rounded-full flex items-center justify-center text-[14px] font-black text-white" style={{ backgroundColor: c.primary }}>
          *
        </span>
        <span tw="text-[12px] font-black text-[#1A1A2E] flex-1">Misja: 8 skarbów {m.name} — zdobądź naklejkę!</span>
        <div tw="flex gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} tw="h-6 w-6 rounded-[8px] bg-white flex items-center justify-center text-[10px] font-black" style={{ border: `1.5px solid ${c.primary}`, color: c.primary }}>
              {i + 1}
            </span>
          ))}
        </div>
        <span tw="text-[10px] font-black px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: c.primary }}>
          +10 XP
        </span>
      </div>

      <div tw="rounded-[12px] bg-[#FFFBEB] p-3 flex items-center gap-2 mb-2" style={{ border: `1px solid #FDE68A` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#713F12]">NAGRODA</span>
        <span tw="text-[11px] font-bold text-[#1A1A2E] flex-1">Wytnij 4 naklejki i przyklej na torze - meta czeka!</span>
        <div tw="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => {
            const src = wordToDataUri(m.species === "wąż" ? "WĄŻ" : m.species === "sowa" ? "SOWA" : m.species === "mysz" ? "MYSZ" : "LEW");
            return src ? (
              <img key={i} src={src} tw="h-7 w-7 rounded-[8px] bg-white" style={{ border: `1.5px solid ${c.primary}` }} />
            ) : (
              <span key={i} tw="h-7 w-7 rounded-[8px] bg-white flex items-center justify-center text-[10px] font-black" style={{ border: `1.5px solid ${c.primary}`, color: c.primary }}>
                {m.name.charAt(0)}
              </span>
            );
          })}
        </div>
      </div>

      <FooterBar text={`${title || m.name} — ${m.sound} — A4 premium HQ — laminuj`} color={c.primary} />
    </div>
  );
}
