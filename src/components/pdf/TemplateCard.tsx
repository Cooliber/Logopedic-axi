"use client";

import { templateList } from "@/lib/pdf/templates";

export function TemplateGallery() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {templateList.map((t) => (
        <div
          key={t.slug}
          className="group relative flex flex-col overflow-hidden rounded-[22px] border-[2.5px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)]"
          style={{ borderColor: `${t.color}40` }}
        >
          {/* Top bar */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: t.color }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow">{t.icon}</div>
            <div className="flex flex-col">
              <span className="text-[15px] font-black leading-none text-white" style={{ textShadow: "0 1px 0 rgba(0,0,0,0.15)" }}>
                {t.title}
              </span>
              <span className="mt-1 text-[10px] font-black uppercase tracking-widest text-white/80">{t.subtitle}</span>
            </div>
            <span className="ml-auto rounded-full bg-white px-3 py-1 text-[10px] font-black text-black/60">{t.category}</span>
          </div>

          {/* Preview area - doddle placeholder */}
          <div className="relative flex flex-1 flex-col gap-3 bg-[#FFFBEB] p-4">
            <div className="rounded-[14px] border-[2.5px] border-dashed bg-white p-3" style={{ borderColor: t.color }}>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" style={{ color: t.color }}>
                <span>Podgląd A4</span>
                <span className="ml-auto rounded-full bg-black px-2 py-0.5 text-[9px] font-black text-white">PDF • gotowy do druku</span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5 opacity-70">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-10 rounded-[10px] bg-white" style={{ border: `1.8px solid ${t.color}40` }} />
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <div className="h-8 flex-1 rounded-full bg-white" style={{ border: `1.8px dashed ${t.color}60` }} />
                <div className="h-8 flex-1 rounded-full" style={{ backgroundColor: t.color }} />
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`/api/pdf/${t.slug}`}
                target="_blank"
                className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-black text-white shadow transition hover:brightness-110"
                style={{ backgroundColor: t.color }}
              >
                <span>⬇️</span> Pobierz PDF
              </a>
              <a
                href={`/podglad/${t.slug}`}
                className="flex items-center justify-center rounded-full border-2 bg-white px-4 py-3 text-[13px] font-black text-[#1A1A2E] transition hover:bg-zinc-50"
              >
                Podgląd
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between bg-zinc-900 px-4 py-2.5">
            <span className="text-[10px] font-bold tracking-widest text-white/60">A4 • 300 DPI • KOLOR + EKO</span>
            <span className="text-[10px]">✂️</span>
          </div>
        </div>
      ))}
    </div>
  );
}
