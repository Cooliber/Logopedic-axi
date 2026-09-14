// BatchRunner — deep facade nad ImagePipeline + WordSource injection
// Zastępuje 4× shallow klony (batch.ts, batch-v2, batch-words, batch-next30)
import { ImagePipeline } from "./core/imagePipeline";
import { vocabulary } from "../src/lib/pdf/themes/vocabulary"; // will be resolved via tsconfig path? fallback
import * as fs from "node:fs";

export type WordSource = { word: string; en: string }[];

export async function runBatch(source: WordSource, opts: { style?: string; dry?: boolean } = {}) {
  if (opts.dry) {
    console.log(`dry ${source.length} words`);
    return source.map((w) => ({ ...w, prompt: `dry ${w.word}` }));
  }
  const pipe = new ImagePipeline();
  return pipe.generateWords(source, opts);
}
