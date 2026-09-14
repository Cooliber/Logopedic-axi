"use client";

import { useState } from "react";
import { templateList } from "@/lib/pdf/templates";

export default function KreatorPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [eko, setEko] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(templateList.map((t) => t.slug)));

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

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <header className="sticky top-0 z-10 border-b-[3px] border-black bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF006E] text-xl">🦁</div>
            <div>
              <h1 className="text-[18px] font-black leading-none tracking-tight text-[#1A1A2E]">KREATOR KART</h1>
              <p className="text-[11px] font-bold tracking-widest text-[#6B7280]">Personalizacja • EKO • Batch</p>
            </div>
          </a>
          <a href="/" className="rounded-full border-2 bg-white px-4 py-2 text-xs font-black">← Galeria</a>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid gap-6 md:grid-cols-[380px_1fr]">
          {/* Form */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[22px] bg-white p-6 shadow" style={{ border: "3px solid #1A1A2E" }}>
              <h2 className="text-sm font-black uppercase tracking-widest text-[#1A1A2E]">Ustawienia</h2>

              <label className="mt-4 flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">Imię dziecka</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="np. Ania Nowak"
                  className="rounded-full border-[2px] border-[#E5E7EB] bg-[#FFFBEB] px-4 py-3 text-sm font-bold focus:border-[#FACC15] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
                />
              </label>

              <label className="mt-3 flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">Data</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-full border-[2px] border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold focus:border-[#FACC15] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
                />
              </label>

              <label className="mt-3 flex items-center gap-2 rounded-full bg-[#F3F4F6] px-4 py-3 text-xs font-black cursor-pointer focus-within:ring-2 focus-within:ring-[#1A1A2E] focus-within:ring-offset-2" style={{ border: "2px solid #E5E7EB" }}>
                <input type="checkbox" checked={eko} onChange={(e) => setEko(e.target.checked)} className="h-5 w-5 accent-[#1A1A2E]" />
                Wersja EKO (białe tło, oszczędna)
              </label>

              <div className="mt-4 rounded-[14px] bg-[#1A1A2E] p-4 text-white">
                <div className="text-xs font-black uppercase tracking-widest text-white/60">Wybrano</div>
                <div className="mt-1 text-2xl font-black">{selected.size} / {templateList.length}</div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setSelected(new Set(templateList.map((t) => t.slug)))}
                    className="flex-1 rounded-full bg-white px-3 py-2.5 text-xs font-black text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E]"
                  >
                    Wszystkie
                  </button>
                  <button onClick={() => setSelected(new Set())} className="flex-1 rounded-full bg-white/20 px-3 py-2.5 text-xs font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E]">
                    Wyczyść
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    selected.forEach((slug) => window.open(pdfUrl(slug), "_blank"));
                  }}
                  aria-label={`Pobierz ${selected.size} zaznaczonych kart PDF`}
                  className="w-full rounded-full bg-[#FF006E] px-6 py-3 text-sm font-black text-white shadow hover:brightness-110 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF006E] focus-visible:ring-offset-2"
                  disabled={selected.size === 0}
                >
                  Pobierz zaznaczone ({selected.size})
                </button>
                <span className="text-center text-xs font-bold text-[#6B7280]">Otworzy {selected.size} kart w nowych kartach</span>
              </div>
            </div>

            <div className="rounded-[16px] bg-[#FEF9C3] p-4" style={{ border: "2.5px dashed #FDE68A" }}>
              <span className="text-xs font-black uppercase tracking-widest text-[#713F12]">Tip</span>
              <p className="mt-1 text-xs font-bold leading-relaxed text-[#713F12]">
                Personalizacja pojawia się na dyplomie i pasku „Dla:” w każdej karcie. EKO usuwa kolorowe tła — idealne do masowego druku.
              </p>
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              {templateList.map((t) => (
                <label
                  key={t.slug}
                  className={`flex cursor-pointer items-center gap-3 rounded-[16px] bg-white p-4 shadow transition ${selected.has(t.slug) ? "ring-[3px] ring-[#1A1A2E]" : "opacity-70"}`}
                  style={{ border: `2.5px solid ${t.color}` }}
                >
                  <input type="checkbox" checked={selected.has(t.slug)} onChange={() => toggle(t.slug)} className="h-5 w-5 accent-[#1A1A2E]" aria-label={`Zaznacz ${t.title}`} />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ backgroundColor: t.color, color: "white" }}>
                    {t.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-[#1A1A2E] leading-none">{t.title}</span>
                    <span className="text-[11px] font-bold text-[#6B7280]">{t.subtitle}</span>
                  </div>
                  <a
                    href={pdfUrl(t.slug)}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Pobierz PDF ${t.title}`}
                    className="ml-auto rounded-full bg-[#1A1A2E] px-3 py-2 text-xs font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A2E] focus-visible:ring-offset-2"
                  >
                    PDF
                  </a>
                </label>
              ))}
            </div>

            {/* Preview iframe for first selected */}
            {selected.size > 0 && (
              <div className="overflow-hidden rounded-[18px] border-[3px] border-black bg-white shadow-xl">
                <div className="flex items-center justify-between bg-black px-4 py-2">
                  <span className="text-xs font-black tracking-widest text-white/80">PODGLĄD — {Array.from(selected)[0]}</span>
                  <span className="text-xs text-white/60">{name || "bez personalizacji"} • {eko ? "EKO" : "KOLOR"}</span>
                </div>
                <iframe src={pdfUrl(Array.from(selected)[0])} className="h-[760px] w-full border-0" title="preview" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
