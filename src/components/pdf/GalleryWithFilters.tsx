"use client";

import { useState } from "react";
import { templateList } from "@/lib/pdf/templates";
import { THEMES } from "@/lib/pdf/themes/catalog";
import { DoodleStar, DoodleCrown, DoodleFire, DoodleTree, DoodleCloud, DoodleBalloon, DoodleGift, DoodleTrophy, DoodleHeart, DoodleApple, DoodleRocket, DoodleCake, wordToDataUri } from "@/lib/pdf/icons";
import { BASE_WORDS } from "@/lib/pdf/themes/wordPools";
import { ZESTAWY } from "@/lib/pdf/zagadki/data";

const categories = ["wszystkie", "zagadki", "szeregi", "tematyczne", "plynnosc", "gry", "gry-nowe", "dialog", "oddech", "sklep", "nagrody"] as const;

const HERO_STYLE: Record<string, string> = {
  kosmos: "doodle", zwierzaki: "doodle", pojazdy: "doodle", ocean: "doodle", dinozaury: "doodle", las: "watercolor", jedzenie: "kawaii", sport: "flat", dom: "flat", ubrania: "kawaii", pogoda: "watercolor", muzyka: "flat", ogrod: "watercolor", miasto: "flat", hawaje: "watercolor", halloween: "kawaii", minecraft: "flat",
};

function heroPath(theme: string) {
  const style = HERO_STYLE[theme] ?? "doodle";
  return `/anim/hero/hero-${theme}__${style}__schnell.png`;
}

function DoodleForSlug({ slug }: { slug: string }) {
  const map: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    syczacy: DoodleFire,
    szumiacy: DoodleTree,
    ciszacy: DoodleCloud,
    rotacyzm: DoodleCrown,
    plynnosc: DoodleHeart,
    planszowka: DoodleGift,
    dialog: DoodleBalloon,
    oddech: DoodleFire,
    katalog: DoodleGift,
    dyplom: DoodleTrophy,
    naklejki: DoodleStar,
  };
  if (slug.startsWith("zagadki-")) return <span className="text-[16px] font-black">?</span>;
  const Comp = map[slug] ?? DoodleStar;
  return <Comp className="h-7 w-7" style={{ color: "currentColor" }} />;
}

export function GalleryWithFilters() {
  const [active, setActive] = useState<string>("wszystkie");
  const [themeFilter, setThemeFilter] = useState<string>("wszystkie");
  const [name, setName] = useState("");
  const [eko, setEko] = useState(false);

  const filtered = templateList.filter((t) => {
    const catOk = active === "wszystkie" || t.category === active;
    const themeOk = themeFilter === "wszystkie" || (t as unknown as { theme?: string }).theme === themeFilter;
    return catOk && themeOk;
  });

  const pdfUrl = (slug: string) => {
    const p = new URLSearchParams();
    if (name) p.set("name", name);
    if (eko) p.set("eko", "1");
    const qs = p.toString();
    return `/api/pdf/${slug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-[22px] bg-white p-5 shadow" style={{ border: "3px solid #1A1A2E" }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">Kategorie</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                  className={`rounded-full px-4 py-2.5 text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2 ${active === c ? "bg-[#1A1A2E] text-white" : "bg-[#F3F4F6] text-[#1A1A2E] hover:bg-[#E5E7EB]"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="/kreator"
              className="rounded-full bg-[#FF006E] px-5 py-2.5 text-xs font-black text-white shadow hover:brightness-110"
            >
              Kreator →
            </a>
          </div>
        </div>

        {/* Theme filter — widoczny gdy kategoria tematyczne lub wszystkie */}
        {(active === "wszystkie" || active === "tematyczne") && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">Tematy — doodle</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setThemeFilter("wszystkie")}
                aria-pressed={themeFilter === "wszystkie"}
                className={`rounded-full px-3 py-2.5 text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2 ${themeFilter === "wszystkie" ? "bg-[#1E3A8A] text-white" : "bg-[#F3F4F6] text-[#1A1A2E] hover:bg-[#E5E7EB]"}`}
              >
                Wszystkie tematy
              </button>
              {THEMES.map((th) => (
                <button
                  key={th.id}
                  onClick={() => setThemeFilter(th.id)}
                  aria-pressed={themeFilter === th.id}
                  className={`rounded-full px-3 py-2.5 text-xs font-black transition flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2 ${themeFilter === th.id ? "text-white" : "bg-[#F3F4F6] text-[#1A1A2E] hover:bg-[#E5E7EB]"}`}
                  style={themeFilter === th.id ? { backgroundColor: th.color } : {}}
                >
                  <img src={heroPath(th.id)} alt={th.label} className="h-5 w-5 rounded-full object-cover border border-black/10 bg-white" loading="lazy" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                  {th.label}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-bold text-[#6B7280]">14 tematów — pełne pokrycie 56 kart tematycznych (14×4) + HF konstelacje w generowaniu • Filtruj doodle + kategorie</span>
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">Imię dziecka (personalizacja)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="np. Ania"
              className="rounded-full border-[2px] border-[#E5E7EB] bg-[#FFFBEB] px-4 py-2.5 text-sm font-bold text-[#1A1A2E] placeholder:text-[#6B7280] focus:border-[#FACC15] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
            />
          </label>

          <label className="flex items-center gap-2 rounded-full bg-[#F3F4F6] px-4 py-2.5 text-xs font-black text-[#1A1A2E] cursor-pointer focus-within:ring-2 focus-within:ring-[#1A1A2E] focus-within:ring-offset-2" style={{ border: "2px solid #E5E7EB" }}>
            <input type="checkbox" checked={eko} onChange={(e) => setEko(e.target.checked)} className="h-5 w-5 accent-[#1A1A2E]" />
            Wersja EKO (oszczędna)
          </label>

          <span className="rounded-full bg-[#FEF9C3] px-4 py-2.5 text-center text-xs font-black text-[#713F12]" style={{ border: "2px solid #FDE68A" }}>
            {filtered.length} kart
          </span>
        </div>
      </div>

      {/* Zagadki teaser — zawsze gdy filtr zagadki lub wszystkie */}
      {(active === "wszystkie" || active === "zagadki") && (
        <div className="rounded-[18px] bg-gradient-to-r from-[#7C3AED] to-[#A855F7] p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow" style={{ border: "3px solid #1A1A2E" }}>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[18px] font-black text-[#7C3AED]">?</div>
            <div>
              <div className="text-[16px] font-black text-white leading-none">Zagadki logopedyczne — NOWOŚĆ</div>
              <div className="text-[11px] font-bold text-white/80">70 zagadek • 16 kart A4 • s / sz / c / r — zgaduj i powtarzaj głoskę 3×</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActive("zagadki")} className="rounded-full bg-white px-5 py-2.5 text-xs font-black text-[#7C3AED]">Zobacz 16 kart →</button>
            <span className="hidden md:inline-flex rounded-full bg-black/20 px-3 py-2.5 text-xs font-black text-white">Rozbudowa: co tydzień +4 karty</span>
          </div>
        </div>
      )}

      {/* Empty state R-27 */}
      {filtered.length === 0 && (
        <div className="rounded-[18px] bg-white p-8 text-center shadow" style={{ border: "2.5px dashed #E5E7EB" }}>
          <div className="text-sm font-black text-[#1A1A2E]">Brak kart dla tego filtra</div>
          <div className="mt-1 text-xs font-bold text-[#6B7280]">Zmień kategorię lub temat — spróbuj „wszystkie”.</div>
          <div className="mt-4 flex justify-center gap-2">
            <button onClick={() => { setActive("wszystkie"); setThemeFilter("wszystkie"); }} className="rounded-full bg-[#1A1A2E] px-5 py-2.5 text-xs font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2">Wyczyść filtry</button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => (
          <div
            key={t.slug}
            className="group relative flex flex-col overflow-hidden rounded-[22px] border-[2.5px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)]"
            style={{ borderColor: `${t.color}40` }}
          >
            <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: t.color }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow overflow-hidden shrink-0" style={{ color: t.color }}>
                {(t as unknown as { theme?: string }).theme ? (
                  <img src={heroPath((t as unknown as { theme: string }).theme)} alt={t.title} className="h-full w-full object-cover" loading="lazy" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                ) : (
                  <DoodleForSlug slug={t.slug} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black leading-none text-white" style={{ textShadow: "0 1px 0 rgba(0,0,0,0.15)" }}>
                  {t.title}
                </span>
                <span className="mt-1 text-[10px] font-black uppercase tracking-widest text-white/80">{t.subtitle}</span>
              </div>
              <span className="ml-auto rounded-full bg-white px-3 py-1 text-[10px] font-black text-black/60">{t.category}</span>
            </div>

            <div className="relative flex flex-1 flex-col gap-3 bg-[#FFFBEB] p-4">
              <div className="rounded-[14px] border-[2.5px] border-dashed bg-white p-3" style={{ borderColor: t.color }}>
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" style={{ color: t.color }}>
                  <span>Podgląd A4</span>
                  <span className="ml-auto rounded-full bg-black px-2 py-0.5 text-[9px] font-black text-white">PDF • {eko ? "EKO" : "KOLOR"}</span>
                </div>
                {t.category === "zagadki" ? (
                  <div className="mt-3 flex flex-col gap-2">
                    <div className="grid grid-cols-4 gap-1.5">
                      {(() => {
                        const meta = ZESTAWY.find((z) => z.slug === t.slug);
                        const answers = meta?.zagadki.map((z) => z.odpowiedz) ?? ["SOWA", "ZEBRA", "KOSZ", "RAKIETA"];
                        return answers.slice(0, 4).map((w) => {
                          const src = wordToDataUri(w);
                          return (
                            <div key={w} className="flex h-10 items-center justify-center rounded-[10px] bg-white p-1" style={{ border: `1.8px solid ${t.color}30` }}>
                              {src ? <img src={src} alt={w} className="h-7 w-7 object-contain" /> : <span className="text-[9px] font-black" style={{ color: t.color }}>{w.slice(0, 2)}</span>}
                            </div>
                          );
                        });
                      })()}
                    </div>
                    <div className="rounded-full bg-white px-2 py-1 text-center text-[9px] font-black" style={{ border: `1.5px dashed ${t.color}`, color: t.color }}>
                      {(ZESTAWY.find((z) => z.slug === t.slug)?.zagadki.length ?? 4)} zagadek • odgadnij • powtórz 3×
                    </div>
                  </div>
                ) : (t as unknown as { theme?: string }).theme ? (
                  <div className="mt-3 overflow-hidden rounded-[12px] border-[2px] border-black/10 bg-white">
                    <img
                      src={`/anim/hero/hero-${(t as unknown as { theme: string }).theme}__${{ kosmos: "doodle", zwierzaki: "doodle", pojazdy: "doodle", ocean: "doodle", dinozaury: "doodle", las: "watercolor", jedzenie: "kawaii", sport: "flat", dom: "flat", ubrania: "kawaii", pogoda: "watercolor", muzyka: "flat", ogrod: "watercolor", miasto: "flat" }[(t as unknown as { theme: string }).theme] ?? "doodle"}__schnell.png`}
                      alt={t.title}
                      className="h-[110px] w-full object-cover"
                      loading="lazy"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  </div>
                ) : (
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {(BASE_WORDS[t.slug as keyof typeof BASE_WORDS] ?? [{ w: "SOWA" }, { w: "SOK" }, { w: "SER" }, { w: "ZUPA" }, { w: "CYTRYNA" }, { w: "KOC" }, { w: "NOS" }, { w: "LAS" }])
                      .slice(0, 8)
                      .map((w: { w: string }) => {
                        const src = wordToDataUri(w.w);
                        return (
                          <div key={w.w} className="flex h-10 items-center justify-center rounded-[10px] bg-white p-1" style={{ border: `1.8px solid ${t.color}30` }}>
                            {src ? <img src={src} alt={w.w} className="h-7 w-7 object-contain" /> : <span className="text-[9px] font-black" style={{ color: t.color }}>{w.w.slice(0, 2)}</span>}
                          </div>
                        );
                      })}
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <div className="h-8 flex-1 rounded-full bg-white" style={{ border: `1.8px dashed ${t.color}60` }} />
                  <div className="h-8 flex-1 rounded-full" style={{ backgroundColor: t.color }} />
                </div>
                {name && <div className="mt-2 rounded-full bg-[#FEF9C3] px-3 py-1 text-center text-[10px] font-black text-[#713F12]">Dla: {name}</div>}
              </div>

              <div className="flex gap-2">
                <a
                  href={pdfUrl(t.slug)}
                  target="_blank"
                  aria-label={`Pobierz PDF ${t.title}${name ? ` dla ${name}` : ""}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-black text-white shadow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
                  style={{ backgroundColor: t.color }}
                >
                  ⬇ Pobierz PDF
                </a>
                <a
                  href={`/podglad/${t.slug}${name || eko ? `?${new URLSearchParams({ ...(name ? { name } : {}), ...(eko ? { eko: "1" } : {}) }).toString()}` : ""}`}
                  aria-label={`Podgląd ${t.title}`}
                  className="flex items-center justify-center rounded-full border-2 bg-white px-4 py-3 text-[13px] font-black text-[#1A1A2E] transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
                >
                  Podgląd
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between bg-zinc-900 px-4 py-2.5">
              <span className="text-[10px] font-bold tracking-widest text-white/60">A4 • 300 DPI • {eko ? "EKO" : "KOLOR"} • laminuj</span>
              <span className="text-[9px] font-black tracking-widest text-white/40">— — —</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
