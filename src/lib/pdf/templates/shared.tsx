import { cymaticMandalaSmall } from "../cymaticPatterns";

export function PageHeader({
  title,
  subtitle,
  icon,
  color,
  badge,
  heroLetter,
}: {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badge?: string;
  heroLetter?: string;
}) {
  const letter = heroLetter || icon || title.charAt(0);
  return (
    <div
      tw="flex items-center justify-between rounded-[22px] px-6 py-4 mb-3"
      style={{ backgroundColor: color, border: "3px solid rgba(0,0,0,0.08)" }}
    >
      <div tw="flex items-center gap-4">
        <div
          tw="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white text-[20px] font-black shrink-0"
          style={{ border: "3px solid rgba(0,0,0,0.08)", color: color }}
        >
          {letter}
        </div>
        <div tw="flex flex-col">
          <span tw="text-[20px] font-extrabold text-white leading-none tracking-tight">{title}</span>
          <span tw="text-[10px] font-bold text-white/90 tracking-widest uppercase mt-1">{subtitle}</span>
        </div>
      </div>
      {badge && (
        <div tw="flex flex-col items-center rounded-full bg-white px-4 py-2 shrink-0">
          <span tw="text-[8px] font-black tracking-widest text-black/40 uppercase">POZIOM</span>
          <span tw="text-[12px] font-extrabold text-black text-center leading-none">{badge}</span>
        </div>
      )}
    </div>
  );
}

export function PersonalizationBar({
  name,
  date,
  color,
  badge,
}: {
  name?: string;
  date?: string;
  color: string;
  badge?: string;
}) {
  return (
    <div tw="flex items-center gap-3 rounded-[14px] bg-white px-4 py-2.5 mb-3" style={{ border: "2px solid #E5E7EB" }}>
      <div tw="flex items-center gap-2 flex-1">
        <span tw="text-[9px] font-black tracking-widest text-[#6B7280] uppercase">IMIE</span>
        <div tw="flex-1 h-[22px] rounded-full bg-[#F9FAFB] flex items-center px-3" style={{ border: "1.5px dashed #D1D5DB" }}>
          <span tw="text-[10px] font-bold text-[#6B7280]">{name || "........................................"}</span>
        </div>
      </div>
      <div tw="flex items-center gap-2">
        <span tw="text-[9px] font-black tracking-widest text-[#6B7280] uppercase">DATA</span>
        <div tw="w-[90px] h-[22px] rounded-full bg-[#F9FAFB] flex items-center justify-center" style={{ border: "1.5px dashed #D1D5DB" }}>
          <span tw="text-[10px] font-bold text-[#6B7280]">{date || "..../...."}</span>
        </div>
      </div>
      <div tw="h-6 w-[1px] bg-[#E5E7EB]" />
      <div tw="flex items-center gap-1.5">
        <span tw="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span tw="text-[9px] font-black text-[#6B7280]">ZROBIONE</span>
        <div tw="flex gap-1 ml-1">
          <span tw="h-3 w-3 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
          <span tw="h-3 w-3 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
          <span tw="h-3 w-3 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
        </div>
      </div>
    </div>
  );
}

export function InstructionCard({
  title,
  text,
  accent,
  steps,
  time,
}: {
  title: string;
  text: string;
  accent: string;
  steps?: string[];
  time?: string;
}) {
  return (
    <div tw="rounded-[18px] bg-white px-5 py-4 mb-3 flex gap-3 items-start" style={{ border: `2.5px dashed ${accent}` }}>
      <div
        tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[14px] font-black shrink-0"
        style={{ backgroundColor: accent }}
      >
        !
      </div>
      <div tw="flex flex-col gap-1 flex-1">
        <div tw="flex items-center gap-2">
          <span tw="text-[11px] font-black uppercase tracking-widest" style={{ color: accent }}>
            {title}
          </span>
          {time && (
            <span tw="text-[8px] font-black bg-[#F3F4F6] px-2 py-0.5 rounded-full text-[#6B7280]">{time}</span>
          )}
        </div>
        <span tw="text-[11px] leading-[1.6] text-[#1A1A2E] font-semibold" style={{ letterSpacing: "0.3px", wordSpacing: "0.25em" }}>{text}</span>
        {steps && steps.length > 0 && (
          <div tw="flex gap-1.5 mt-1">
            {steps.map((s, i) => (
              <span
                key={i}
                tw="flex-1 rounded-full px-2 py-1 text-center text-[8px] font-black text-white"
                style={{ backgroundColor: accent }}
              >
                {i + 1}. {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ParentTip({ text, accent }: { text: string; accent: string }) {
  return (
    <div tw="rounded-[12px] px-3 py-1.5 flex gap-1.5 items-start" style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
      <span tw="text-[7px] font-black uppercase tracking-widest shrink-0" style={{ color: accent }}>
        DLA DOROSLEGO
      </span>
      <span tw="text-[7px] leading-[1.4] font-semibold text-[#6B7280] flex-1">{text}</span>
    </div>
  );
}

export function XPTracker({ stars = 5, mission, level }: { stars?: number; mission?: string; level?: string }) {
  return (
    <div tw="flex flex-col gap-1.5 shrink-0">
      <div tw="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5" style={{ border: "2px solid #E5E7EB" }}>
        <span tw="text-[9px] font-black tracking-widest text-[#6B7280]">XP</span>
        <div tw="flex gap-1">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i} tw="h-3.5 w-3.5 rounded-[5px] flex items-center justify-center" style={{ backgroundColor: "#FACC15", border: "1.5px solid #EAB308" }}>
              <span tw="text-[8px] font-black text-[#713F12]">*</span>
            </span>
          ))}
        </div>
        {level && <span tw="text-[8px] font-black text-[#6B7280] ml-1">LVL {level}</span>}
      </div>
      {mission && (
        <div tw="rounded-full bg-white px-3 py-1 flex items-center justify-center" style={{ border: "2px solid #FDE68A", backgroundColor: "#FFFBEB" }}>
          <span tw="text-[8px] font-black tracking-widest text-[#92400E]">{mission}</span>
        </div>
      )}
    </div>
  );
}

export function LevelProgress({ current, total, accent }: { current: number; total: number; accent: string }) {
  return (
    <div tw="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          tw="h-2 flex-1 rounded-full"
          style={{ backgroundColor: i < current ? accent : "#E5E7EB" }}
        />
      ))}
      <span tw="text-[8px] font-black text-[#6B7280] ml-1">
        {current}/{total}
      </span>
    </div>
  );
}

export function FooterBar({ text, color }: { text: string; color: string }) {
  const isWhite = color === "#FFFFFF" || color.toLowerCase() === "#ffffff";
  return (
    <div
      tw="flex items-center justify-between rounded-full px-4 py-2 mt-3"
      style={{ backgroundColor: color, border: `2px solid ${isWhite ? "#E5E7EB" : "rgba(0,0,0,0.08)"}` }}
    >
      <span tw="text-[8px] font-black tracking-widest uppercase" style={{ color: isWhite ? "#1A1A2E" : "rgba(255,255,255,0.9)" }}>{text}</span>
      <span tw="text-[9px] font-bold" style={{ color: isWhite ? "#6B7280" : "rgba(255,255,255,0.9)" }}>Drukuj - Wytnij - Pokoloruj - Powtórz</span>
    </div>
  );
}

export function DottedCard({
  children,
  bg = "#FFFFFF",
  border = "#E5E7EB",
  twExtra = "",
}: {
  children: React.ReactNode;
  bg?: string;
  border?: string;
  twExtra?: string;
}) {
  return (
    <div tw={`rounded-[16px] p-4 ${twExtra}`} style={{ backgroundColor: bg, border: `2.5px dashed ${border}` }}>
      {children}
    </div>
  );
}

export function CuttingLine() {
  return (
    <div tw="flex items-center gap-2 my-1">
      <span tw="text-[8px] font-black tracking-widest text-[#6B7280]">-- WY T N I J --</span>
      <div tw="flex-1 h-[1px]" style={{ borderTop: "1.5px dashed #D1D5DB" }} />
      <span tw="text-[10px] text-[#6B7280]"></span>
    </div>
  );
}

export function RuledLines({ lines = 2, accent = "#9CA3AF" }: { lines?: number; accent?: string }) {
  return (
    <div tw="flex flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} tw="flex flex-col rounded-[6px] bg-white px-2 py-2 gap-0" style={{ border: `1.5px solid #E5E7EB` }}>
          <div tw="h-[1px] w-full" style={{ backgroundColor: accent }} />
          <div tw="h-[10px] w-full" />
          <div tw="h-[1px] w-full" style={{ borderTop: `1px dashed ${accent}` }} />
          <div tw="h-[10px] w-full" />
          <div tw="h-[1px] w-full" style={{ backgroundColor: accent }} />
        </div>
      ))}
      <span tw="text-[6px] font-bold text-[#9CA3AF]">Linia trzyliniowa 14mm — pisz między liniami, ogonki poniżej dolnej</span>
    </div>
  );
}

export function StickerStrip({ count = 5, accent, label, icons }: { count?: number; accent: string; label?: string; icons?: string[] }) {
  const doodleMarks = ["*", "+", "#", "*", "◆"];
  return (
    <div tw="flex flex-col gap-1">
      {label && <span tw="text-[8px] font-black tracking-widest text-[#6B7280] uppercase">{label}</span>}
      <div tw="flex gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            tw="flex-1 h-[32px] rounded-[10px] bg-white flex flex-col items-center justify-center gap-0.5"
            style={{ border: `2px dashed ${accent}` }}
          >
            {icons && icons[i] ? (
              <img src={icons[i]} tw="h-5 w-5" />
            ) : (
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: accent }}>
                {doodleMarks[i % doodleMarks.length]}
              </span>
            )}
            <span tw="text-[6px] font-black text-[#6B7280]">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SelfRating({ accent }: { accent: string }) {
  return (
    <div tw="rounded-[14px] bg-white p-3 flex items-center gap-3" style={{ border: "2px solid #E5E7EB" }}>
      <span tw="text-[9px] font-black uppercase tracking-widest text-[#6B7280]">SAMOOCENA</span>
      <div tw="flex gap-2 flex-1">
        {[
          { label: "SUPER", sub: "sam!", bg: "#22C55E" },
          { label: "OK", sub: "prawie", bg: "#FACC15" },
          { label: "JESZCZE", sub: "raz", bg: "#E5E7EB" },
        ].map((f) => (
          <div
            key={f.label}
            tw="flex-1 rounded-[10px] p-2 flex flex-col items-center"
            style={{ backgroundColor: f.bg, border: "1.5px solid rgba(0,0,0,0.08)" }}
          >
            <span tw="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#1A1A2E]">{f.label.charAt(0)}</span>
            <span tw="text-[8px] font-black text-center mt-1 text-[#1A1A2E]">{f.label}</span>
            <span tw="text-[7px] font-bold text-[#4B5563]">{f.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColoringTile({
  word,
  iconSrc,
  accent,
  pos,
  rotation = 0,
  featured = false,
}: {
  word: string;
  iconSrc?: string | null;
  accent: string;
  pos?: "P" | "S" | "K";
  rotation?: number;
  featured?: boolean;
}) {
  const positions = ["P", "S", "K"] as const;
  return (
    <div
      tw={`flex flex-col items-center justify-center bg-white px-2 py-2.5 gap-1 ${featured ? "rounded-[20px] p-3" : "rounded-[18px]"}`}
      style={{
        border: `3px solid #1A1A2E`,
        boxShadow: "0 3px 0 rgba(0,0,0,0.08)",
        transform: `rotate(${rotation}deg)`,
        minHeight: featured ? "92px" : "82px",
      }}
    >
      {iconSrc ? (
        <img src={iconSrc} tw={`${featured ? "h-[42px] w-[42px]" : "h-9 w-9"} rounded-[10px] shrink-0`} style={{ border: `2px solid ${accent}` }} />
      ) : (
        <span tw="h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-black text-white shrink-0" style={{ backgroundColor: accent }}>
          {word.charAt(0)}
        </span>
      )}
      <span tw={`${featured ? "text-[12px]" : "text-[11px]"} font-black text-[#1A1A2E] text-center leading-none tracking-tight`} style={{ letterSpacing: "0.3px" }}>{word}</span>
      {pos && (
        <div tw="flex gap-1 mt-0.5">
          {positions.map((p) => (
            <span key={p} tw="h-3.5 w-3.5 rounded-full flex items-center justify-center text-[6px] font-black" style={{ backgroundColor: p === pos ? accent : "#FFFFFF", color: p === pos ? "#FFFFFF" : accent, border: `1.5px solid ${accent}` }}>{p}</span>
          ))}
        </div>
      )}
      <span tw="text-[6px] font-black tracking-widest text-[#6B7280] uppercase">pokoloruj</span>
    </div>
  );
}

export function MandalaCenter({
  accent,
  icon,
  series = "syczacy",
}: {
  accent: string;
  icon?: string;
  series?: "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm";
}) {
  const mandalaSvg = cymaticMandalaSmall({ letter: icon || "*", accent, series });
  return (
    <div tw="flex flex-col items-center justify-center rounded-full bg-white p-3 gap-1" style={{ border: `3px solid #1A1A2E`, boxShadow: "0 4px 0 rgba(0,0,0,0.08)", minHeight: "96px", minWidth: "96px" }}>
      <img src={mandalaSvg} tw="h-[64px] w-[64px]" />
      <span tw="text-[8px] font-black tracking-widest text-[#1A1A2E] uppercase">mandala</span>
      <span tw="text-[6px] font-bold text-[#6B7280] text-center leading-tight">pokoloruj wzor<br/>od srodka</span>
      <div tw="flex gap-1 mt-1">
        <span tw="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
        <span tw="h-1.5 w-1.5 rounded-full bg-white" style={{ border: `1.2px solid ${accent}` }} />
        <span tw="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}

export function WordBubble({
  word,
  icon,
  bg,
  pos,
  posActive,
  iconSrc,
}: {
  word: string;
  icon?: string;
  bg: string;
  pos?: "P" | "S" | "K";
  posActive?: number;
  iconSrc?: string | null;
}) {
  const displayIcon = icon && icon.trim() ? icon : word.charAt(0);
  const positions = ["P", "S", "K"] as const;
  return (
    <div tw="flex flex-col items-center justify-center rounded-[14px] bg-white px-2 py-3 gap-1" style={{ border: `2px solid ${bg}` }}>
      {iconSrc ? (
        <img src={iconSrc} tw="h-8 w-8 rounded-[8px] shrink-0" style={{ border: `1.5px solid ${bg}` }} />
      ) : (
        <span
          tw="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0"
          style={{ backgroundColor: bg }}
        >
          {displayIcon}
        </span>
      )}
      <span tw="text-[12px] font-extrabold text-[#1A1A2E] text-center leading-tight" style={{ letterSpacing: "0.3px" }}>{word}</span>
      {pos ? (
        <div tw="flex gap-1 mt-1 items-center">
          {positions.map((p) => (
            <span
              key={p}
              tw="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black"
              style={{
                backgroundColor: p === pos ? bg : "#FFFFFF",
                color: p === pos ? "#FFFFFF" : bg,
                border: `1.5px solid ${bg}`,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      ) : (
        <div tw="flex gap-1 mt-1">
          <span tw="h-2 w-2 rounded-full" style={{ backgroundColor: bg }} />
          <span tw="h-2 w-2 rounded-full bg-white" style={{ border: `1.5px solid ${bg}` }} />
          <span tw="h-2 w-2 rounded-full bg-white" style={{ border: `1.5px solid ${bg}` }} />
        </div>
      )}
      {posActive !== undefined && (
        <span tw="text-[7px] font-bold text-[#6B7280]">{posActive === 0 ? "poczatek" : posActive === 1 ? "srodek" : "koniec"}</span>
      )}
    </div>
  );
}

export function PositionLegend({ accent }: { accent: string }) {
  return (
    <div tw="flex items-center gap-2 rounded-full bg-white px-3 py-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
      <span tw="text-[8px] font-black tracking-widest text-[#6B7280]">POZYCJA GLOSKI:</span>
      <div tw="flex gap-1 items-center">
        <span tw="h-3 w-3 rounded-full flex items-center justify-center text-[6px] font-black text-white" style={{ backgroundColor: accent }}>
          P
        </span>
        <span tw="text-[7px] font-bold text-[#6B7280]">poczatek</span>
      </div>
      <div tw="flex gap-1 items-center">
        <span tw="h-3 w-3 rounded-full bg-white flex items-center justify-center text-[6px] font-black" style={{ border: `1.5px solid ${accent}`, color: accent }}>
          S
        </span>
        <span tw="text-[7px] font-bold text-[#6B7280]">srodek</span>
      </div>
      <div tw="flex gap-1 items-center">
        <span tw="h-3 w-3 rounded-full bg-white flex items-center justify-center text-[6px] font-black" style={{ border: `1.5px solid ${accent}`, color: accent }}>
          K
        </span>
        <span tw="text-[7px] font-bold text-[#6B7280]">koniec</span>
      </div>
    </div>
  );
}

export function TraceLine({ accent, label }: { accent: string; label?: string }) {
  return (
    <div tw="flex flex-col gap-1">
      {label && <span tw="text-[8px] font-black tracking-widest uppercase" style={{ color: accent }}>{label}</span>}
      <div tw="flex items-center gap-2">
        <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: accent }}>A</span>
        <div tw="flex-1 h-[14px] rounded-full" style={{ border: `2.5px dashed ${accent}`, backgroundColor: "#FFFBEB" }} />
        <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: accent }}>B</span>
      </div>
      <span tw="text-[8px] font-bold text-[#6B7280]">Prowadz palcem lub kredka - mow gloske na wydechu</span>
    </div>
  );
}

export function HierarchyBar({ accent, active = 3 }: { accent: string; active?: number }) {
  const steps = ["UCHO", "IZOLACJA", "SYLABA", "SLOWO", "ZDANIE"];
  return (
    <div tw="flex gap-1.5 mb-3">
      {steps.map((s, i) => {
        const done = i < active;
        const cur = i === active;
        const future = i > active;
        return (
          <div
            key={s}
            tw="flex-1 rounded-full px-2 py-1.5 flex items-center justify-center gap-1"
            style={{
              backgroundColor: cur ? accent : done ? "#ECFDF5" : "#F9FAFB",
              border: `1.5px solid ${cur ? accent : done ? "#6EE7B7" : "#E5E7EB"}`,
              opacity: future ? 0.5 : 1,
            }}
          >
            <span
              tw="h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-black"
              style={{
                backgroundColor: cur ? "#FFFFFF" : done ? "#10B981" : "#E5E7EB",
                color: cur ? accent : done ? "#FFFFFF" : "#6B7280",
              }}
            >
              {done ? "+" : cur ? "*" : "-"}
            </span>
            <span tw="text-[7px] font-black tracking-widest" style={{ color: cur ? "#FFFFFF" : done ? "#065F46" : "#9CA3AF" }}>
              {s}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function MinimalPairs({ pairs, accent }: { pairs: Array<[string, string]>; accent: string }) {
  return (
    <div tw="flex flex-col gap-2">
      <div tw="flex items-center gap-2">
        <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
          Pary minimalne — słuchaj różnicy
        </span>
        <span tw="text-[7px] font-black bg-[#FEF9C3] px-2 py-0.5 rounded-full text-[#713F12]">1 gloska zmienia sens</span>
      </div>
      <div tw="grid grid-cols-2 gap-2">
        {pairs.map(([a, b]) => (
          <div key={a + b} tw="rounded-[12px] bg-white p-2.5 flex items-center gap-2" style={{ border: `1.8px solid ${accent}30` }}>
            <div tw="flex-1 rounded-[10px] px-2 py-2 text-center" style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
              <span tw="text-[10px] font-black text-[#1A1A2E]" style={{ wordSpacing: "0.25em" }}>{a}</span>
            </div>
            <span tw="text-[8px] font-black text-[#6B7280]">VS</span>
            <div tw="flex-1 rounded-[10px] px-2 py-2 text-center" style={{ backgroundColor: "#FFFBEB", border: `1.5px solid ${accent}` }}>
              <span tw="text-[10px] font-black" style={{ color: accent, wordSpacing: "0.25em" }}>
                {b}
              </span>
            </div>
            <span tw="h-4 w-4 rounded-full bg-white" style={{ border: `1.5px solid ${accent}` }} />
          </div>
        ))}
      </div>
      <span tw="text-[7px] font-bold text-[#6B7280]">Dorosly mowi jedno slowo — dziecko wskazuje obrazek / kropkuje. Potem zamiana rol.</span>
    </div>
  );
}

export function MovementBox({ accent, items }: { accent: string; items: string[] }) {
  return (
    <div tw="rounded-[12px] bg-white px-3 py-2.5 flex flex-col gap-1.5" style={{ border: `1.8px dashed ${accent}` }}>
      <span tw="text-[8px] font-black uppercase tracking-widest" style={{ color: accent }}>
        RUCH + GLOS (logopedia w ruchu)
      </span>
      {items.map((t, i) => (
        <div key={i} tw="flex gap-2 items-center rounded-full bg-[#F9FAFB] px-3 py-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: accent }}>
            {i + 1}
          </span>
          <span tw="text-[8px] font-bold text-[#1A1A2E] leading-tight flex-1">{t}</span>
        </div>
      ))}
      <span tw="text-[7px] font-bold text-[#6B7280]">Powtorz 5x — ruch kotwiczy pamiec motoryczna (Van Riper: propriocepcja)</span>
    </div>
  );
}

export function OneMinuteChallenge({ accent }: { accent: string }) {
  return (
    <div tw="rounded-[12px] bg-[#1A1A2E] px-3 py-2.5 flex items-center gap-3">
      <span tw="text-[9px] font-black text-white tracking-widest uppercase">WYZWANIE 1 MIN</span>
      <div tw="flex-1 h-2 rounded-full bg-white/20 flex">
        <div tw="w-[70%] h-2 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <span tw="text-[8px] font-black text-white/80">Policz poprawne — pobij swoj rekord!</span>
    </div>
  );
}
