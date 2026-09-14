// serverImages — serwerowe osadzanie PNG z HF do PDF (dataURI + cache)
// TYLKO route API i skrypty buna. NIE importuj z modułów w grafie klienta (themed.tsx itd.)
// Research 2026-09-14 §4.4: 1024 PNG 500KB ×8 = 4MB → 2.2M PDF za duży (target 110-115k).
// F3 pipeline: thumbnail 256 lub fallback SVG do czasu pipeline 256px. Tu hard limit 90KB.
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const cache = new Map<string, string | null>();

export function normalizeFileName(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .toLowerCase();
}

export function wordPngDataUri(word: string): string | null {
  if (cache.has(word)) return cache.get(word) ?? null;
  const base = join(process.cwd(), "public", "anim", "words", normalizeFileName(word));
  const thumb = `${base}.thumb.png`;
  const orig = `${base}.png`;
  // Prefer 256 thumb (12-44KB) — 1024 skip >90KB, thumb pass → PDF 150K z HF
  const file = existsSync(thumb) ? thumb : orig;
  let out: string | null = null;
  if (existsSync(file)) {
    try {
      const st = statSync(file);
      if (st.size > 90 * 1024 && file === orig) {
        out = null;
      } else {
        out = `data:image/png;base64,${readFileSync(file).toString("base64")}`;
      }
    } catch {
      out = null;
    }
  }
  cache.set(word, out);
  return out;
}

export function resolveWordImages(words: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const w of words) {
    const uri = wordPngDataUri(w);
    if (uri) out[w] = uri;
  }
  return out;
}
