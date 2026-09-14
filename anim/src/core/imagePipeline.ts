// ImagePipeline — deep module, mała fasada, dużo w środku
// Interface = test surface, 2 adaptery = realny seam (HF + FS mock)
import * as fs from "node:fs";
import * as path from "node:path";
import { generateImage } from "../hf-client";
import { promptFactory } from "./promptFactory";
import { ManifestStore, type ManifestEntry } from "./manifest";
import { RateLimiter } from "./rateLimit";
import { toFileId } from "./normalize";
import { DEFAULTS } from "../config";

export type PipelineOpts = { style?: string; width?: number; height?: number; provider?: string; model?: string };

export class ImagePipeline {
  constructor(
    private manifest = new ManifestStore(path.resolve("assets/manifest.json")),
    private limiter = new RateLimiter(),
  ) {}

  async generateWord(word: string, english: string, opts: PipelineOpts = {}): Promise<ManifestEntry> {
    const { prompt, negative_prompt, seed } = promptFactory.forWord(word, { english, style: (opts.style as any) ?? "doodle" });
    const width = opts.width ?? DEFAULTS.width;
    const height = opts.height ?? DEFAULTS.height;
    const model = opts.model ?? DEFAULTS.model;
    const provider = opts.provider as any;
    const file = `word-${toFileId(word)}__doodle__schnell.png`;
    const outPath = path.resolve(`assets/output/${file}`);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 50000) {
      const e = this.manifest.findByFile(file);
      if (e) return e;
    }
    const res = await generateImage({ prompt, negative_prompt, model, provider, width, height, num_inference_steps: 4, guidance_scale: 4.0, seed }, outPath);
    const entry: ManifestEntry = {
      id: `word-${toFileId(word)}`,
      file,
      word,
      prompt,
      negative_prompt,
      model,
      provider: res.provider,
      width,
      height,
      bytes: res.bytes,
      seed,
      latencyMs: res.latencyMs,
      error: res.error,
      status: res.ok ? "ok" : "error",
      createdAt: new Date().toISOString(),
    };
    this.manifest.upsert(entry);
    await this.limiter.wait();
    if (res.error?.includes("429")) await this.limiter.backoff();
    return entry;
  }

  async generateHero(theme: string, opts: PipelineOpts = {}): Promise<ManifestEntry> {
    const { prompt, negative_prompt, seed } = promptFactory.forHero(theme, { style: (opts.style as any) ?? "doodle" });
    const width = opts.width ?? 1536;
    const height = opts.height ?? 1024;
    const model = opts.model ?? DEFAULTS.model;
    const provider = opts.provider as any;
    const file = `hero-${theme}__${opts.style ?? "doodle"}__schnell.png`;
    const outPath = path.resolve(`assets/output/${file}`);
    const res = await generateImage({ prompt, negative_prompt, model, provider, width, height, num_inference_steps: 4, guidance_scale: 3.5, seed }, outPath);
    const entry: ManifestEntry = {
      id: `hero-${theme}`,
      file,
      theme,
      prompt,
      negative_prompt,
      model,
      provider: res.provider,
      width,
      height,
      bytes: res.bytes,
      seed,
      latencyMs: res.latencyMs,
      error: res.error,
      status: res.ok ? "ok" : "error",
      createdAt: new Date().toISOString(),
    };
    this.manifest.upsert(entry);
    await this.limiter.wait();
    return entry;
  }

  // Batch helper — WordSource injection
  async generateWords(words: Array<{ word: string; en: string }>, opts: PipelineOpts = {}) {
    const out: ManifestEntry[] = [];
    for (const w of words) out.push(await this.generateWord(w.word, w.en, opts));
    return out;
  }
}
