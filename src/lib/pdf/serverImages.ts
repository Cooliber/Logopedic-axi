// serverImages — serwerowe osadzanie PNG z HF do PDF (dataURI + cache)
// TYLKO route API i skrypty buna. NIE importuj z modułów w grafie klienta (themed.tsx itd.)
import { readFileSync, existsSync } from "node:fs";
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
      out = `data:image/png;base64,${readFileSync(file).toString("base64")}`;
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
