"use client";

import { useMemo, useState } from "react";
import { templateList } from "@/lib/pdf/templates";

const cats = ["wszystkie", "szeregi", "gry-nowe", "tematyczne", "plynnosc", "gry", "dialog", "oddech", "nagrody", "sklep"] as const;

export default function KreatorPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [eko, setEko] = useState(false);
  const [cat, setCat] = useState<string>("wszystkie");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set(templateList.slice(0, 8).map((t) => t.slug)));

  const filtered = useMemo(() => {
    return templateList.filter((t) => {
      const catOk = cat === "wszystkie" || t.category === cat;
      const qOk = !q || `${t.title} ${t.subtitle} ${t.slug}`.toLowerCase().includes(q.toLowerCase());
      return catOk && qOk;
    });
  }, [cat, q]);

  const toggle = (slug: string) => {
    const n = new Set(selected);
    if (n.has(slug)) n.delete(slug);
    else n.add(slug);
    setSelected(n);
  };

  const qs = new URLSearchParams({
    ...(name ? { name } : {}),
    ...(date ? { date } : {}),
    ...(eko ? { eko: "1" } : {}),
  }).toString();

  const pdfUrl = (slug: string) => `/api/pdf/${slug}${qs ? `?${qs}` : ""}`;

  const first = Array.from(selected)[0];

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <header className="sticky top-0 z-20 border-b-[3px] border-black bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A2E] text-sm font-black text-white">K</div>
            <div>
              <h1 className="text-[18px] font-black leading-none tracking-tight text-[#1A1A2E]">KREATOR KART</h1>
              <p className="text-[11px] font-bold tracking-widest text-[#6B7280]">Personalizacja • EKO • Batch • 84 szablony</p>
            </div>
          </a>
          <a href="/" className="rounded-full border-2 bg-white px-4 py-2 text-xs font-black">← Galeria</a>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Lewy panel — sticky */}
          <div className="flex h-fit flex-col gap-4 lg:sticky lg:top-[80px]">
            <div className="rounded-[22px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]" style={{ border: "3px solid #1A1A2E" }}>
              <h2 className="text-xs font-black uppercase tracking-[0.18em] text-[#6B7280]">Personalizacja</h2>
              <label className="mt-4 flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">Imię dziecka</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="np. Ania Nowak"
                  className="rounded-full border-[2px] border-[#E5E7EB] bg-[#FFFBEB] px-4 py-3 text-sm font-bold focus:border-[#1A1A2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
                />
              </label>
              <label className="mt-3 flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">Data</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-full border-[2px] border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold focus:border-[#1A1A2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
                />
              </label>
              <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-full bg-[#F9FAFB] px-4 py-3 text-xs font-black" style={{ border: "2px solid #E5E7EB" }}>
                <input type="checkbox" checked={eko} onChange={(e) => setEko(e.target.checked)} className="h-5 w-5 accent-[#1A1A2E]" />
                Wersja EKO — białe tło
              </label>

              <div className="mt-5 rounded-[16px] bg-[#1A1A2E] p-4 text-white">
                <div className="text-xs font-black uppercase tracking-widest text-white/60">Wybrano</div>
                <div className="mt-1 text-3xl font-black leading-none">{selected.size} <span className="text-base font-bold text-white/60">/ {templateList.length}</span></div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button onClick={() => setSelected(new Set(filtered.map((t) => t.slug)))} className="rounded-full bg-white px-3 py-2.5 text-xs font-black text-black">Zaznacz widoczne</button>
                  <button onClick={() => setSelected(new Set())} className="rounded-full bg-white/15 px-3 py-2.5 text-xs font-black text-white">Wyczyść</button>
                </div>
              </div>

              <button
                onClick={() => selected.forEach((slug) => window.open(pdfUrl(slug), "_blank"))}
                disabled={selected.size === 0}
                className="mt-4 w-full rounded-full bg-[#FF006E] px-6 py-3 text-sm font-black text-white shadow hover:brightness-110 disabled:opacity-50"
              >
                Pobierz zaznaczone ({selected.size})
              </button>
              <p className="mt-2 text-center text-xs font-bold text-[#6B7280]">Otworzy {selected.size} kart w nowych kartach • A4 • 300 DPI</p>
              <div className="mt-3 rounded-[12px] bg-[#FEF9C3] p-3" style={{ border: "1.5px dashed #FDE68A" }}>
                <span className="text-xs font-black uppercase tracking-widest text-[#713F12]">Tip</span>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[#713F12]">EKO usuwa kolorowe tła — idealne do masowego druku. Personalizacja trafia na pasek „Dla:” i dyplom.</p>
              </div>
            </div>

            {first && (
              <div className="overflow-hidden rounded-[18px] border-[3px] border-black bg-white shadow-xl">
                <div className="flex items-center justify-between bg-black px-4 py-2">
                  <span className="text-xs font-black tracking-widest text-white/80">PODGLĄD — {first}</span>
                  <span className="text-xs font-bold text-white/60">{eko ? "EKO" : "KOLOR"}</span>
                </div>
                <iframe src={pdfUrl(first)} className="h-[640px] w-full border-0" title="preview" />
              </div>
            )}
          </div>

          {/* Prawy panel — lista */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[22px] bg-white p-4 shadow" style={{ border: "3px solid #1A1A2E" }}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCat(c)}
                      aria-pressed={cat === c}
                      className={`rounded-full px-4 py-2.5 text-xs font-black transition ${cat === c ? "bg-[#1A1A2E] text-white" : "bg-[#F3F4F6] text-[#1A1A2E] hover:bg-[#E5E7EB]"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Szukaj: labirynt, memory, hawaje..." className="flex-1 rounded-full border-[2px] border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2.5 text-sm font-bold focus:border-[#1A1A2E] focus:outline-none" />
                  <span className="rounded-full bg-[#FEF9C3] px-4 py-2.5 text-xs font-black text-[#713F12]" style={{ border: "2px solid #FDE68A" }}>{filtered.length} kart</span>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-[16px] bg-white p-8 text-center" style={{ border: "2.5px dashed #E5E7EB" }}>
                <div className="text-sm font-black text-[#1A1A2E]">Brak wyników</div>
                <div className="mt-1 text-xs font-bold text-[#6B7280]">Zmień filtr lub wyszukiwanie</div>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {filtered.map((t) => (
                  <label
                    key={t.slug}
                    className={`flex cursor-pointer items-start gap-3 rounded-[16px] bg-white p-4 shadow transition ${selected.has(t.slug) ? "ring-[3px] ring-[#1A1A2E]" : "opacity-90 hover:opacity-100"}`}
                    style={{ border: `2.5px solid ${t.color}` }}
                  >
                    <input type="checkbox" checked={selected.has(t.slug)} onChange={() => toggle(t.slug)} className="mt-1 h-5 w-5 shrink-0 accent-[#1A1A2E]" />
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-black text-white" style={{ backgroundColor: t.color }}>
                      {t.icon}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-black leading-none text-[#1A1A2E]">{t.title}</span>
                      <span className="truncate text-xs font-bold text-[#6B7280]">{t.subtitle}</span>
                      <span className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{t.category} • {t.slug}</span>
                    </div>
                    <a href={pdfUrl(t.slug)} target="_blank" onClick={(e) => e.stopPropagation()} className="shrink-0 rounded-full bg-[#1A1A2E] px-3 py-2 text-xs font-black text-white">PDF</a>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
