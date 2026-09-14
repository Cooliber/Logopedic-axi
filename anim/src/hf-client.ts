// anim/src/hf-client.ts — klient Hugging Face Inference Providers (text-to-image)
// Docs: https://huggingface.co/docs/inference-providers/en/tasks/text-to-image
// JS SDK: @huggingface/inference — InferenceClient.textToImage()

import { InferenceClient } from "@huggingface/inference";
import * as fs from "node:fs";
import * as path from "node:path";
import { DEFAULTS, type ProviderId } from "./config.js";

export type GenerateOptions = {
  prompt: string;
  negative_prompt?: string;
  model?: string;
  provider?: ProviderId;
  width?: number;
  height?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  seed?: number;
};

export type GenerateResult = {
  ok: boolean;
  bytes?: number;
  filePath?: string;
  model: string;
  provider: string;
  error?: string;
  latencyMs: number;
};

function getClient(): InferenceClient {
  const token = process.env.HF_TOKEN;
  if (!token) throw new Error("Brak HF_TOKEN w env. Ustaw .env lub export HF_TOKEN=hf_...");
  return new InferenceClient(token);
}

export async function generateImage(
  opts: GenerateOptions,
  outPath: string,
): Promise<GenerateResult> {
  const model = opts.model ?? DEFAULTS.model;
  const provider = (opts.provider ?? DEFAULTS.provider) as ProviderId;
  const width = opts.width ?? DEFAULTS.width;
  const height = opts.height ?? DEFAULTS.height;
  const guidance_scale = opts.guidance_scale ?? DEFAULTS.guidanceScale;
  const num_inference_steps = opts.num_inference_steps ?? DEFAULTS.numInferenceSteps;

  const client = getClient();
  const t0 = Date.now();

  try {
    // @huggingface/inference textToImage zwraca Blob (SDK typy luźne)
    const blob = (await client.textToImage({
      model,
      provider: provider === "auto" ? undefined : provider, // auto = nie podawaj providera
      inputs: opts.prompt,
      parameters: {
        negative_prompt: opts.negative_prompt,
        width,
        height,
        guidance_scale,
        num_inference_steps,
        ...(opts.seed !== undefined ? { seed: opts.seed } : {}),
      },
    } as any)) as unknown as Blob;

    const buf = Buffer.from(await blob.arrayBuffer());
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, buf);

    return {
      ok: true,
      bytes: buf.length,
      filePath: outPath,
      model,
      provider,
      latencyMs: Date.now() - t0,
    };
  } catch (e: any) {
    const msg = e?.message ?? String(e);
    // provider może zwrócić JSON error w body
    return {
      ok: false,
      model,
      provider,
      error: msg.slice(0, 800),
      latencyMs: Date.now() - t0,
    };
  }
}

// CLI test: bun run src/hf-client.ts --test
if (process.argv.includes("--test")) {
  const token = process.env.HF_TOKEN;
  console.log("HF_TOKEN:", token ? token.slice(0, 6) + "..." + token.slice(-4) : "BRAK");
  if (!token) process.exit(1);

  // quick whoami
  const r = await fetch("https://huggingface.co/api/whoami-v2", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("whoami status:", r.status);
  console.log("whoami body:", (await r.text()).slice(0, 500));

  // quick generation test (1 image, schnell)
  console.log("\nTest generation (FLUX.1-schnell, 512x512)...");
  const out = "assets/output/_test_owl.png";
  const res = await generateImage(
    {
      prompt: "cute doodle owl with big eyes, pastel colors, white background, thick black outline, children's book illustration",
      negative_prompt: "photorealistic, scary, text, watermark, blurry",
      model: "black-forest-labs/FLUX.1-schnell",
      provider: "auto",
      width: 512,
      height: 512,
      num_inference_steps: 4,
    },
    out,
  );
  console.log(res);
}
