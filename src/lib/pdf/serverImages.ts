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
  const file = join(process.cwd(), "public", "anim", "words", `${normalizeFileName(word)}.png`);
  let out: string | null = null;
  if (existsSync(file)) {
    try {
      // F3 hard limit 90KB — większe PNG (1024 200-700KB) skip → SVG fallback, PDF <200KB
      // Docelowo thumbnail 256px via sharp (todo F3), teraz SVG keeps 110k.
      const st = statSync(file);
      if (st.size > 90 * 1024) {
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
