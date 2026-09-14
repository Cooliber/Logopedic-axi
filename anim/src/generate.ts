// anim/src/generate.ts — jednorazowe generowanie z CLI
// użycie: bun run src/generate.ts --prompt "cute owl" --out assets/output/owl.png [--model schnell] [--width 1024]

import "dotenv/config";
import { generateImage } from "./hf-client.js";
import { buildPrompt, type KidStyle } from "./prompts.js";
import { MODELS, DEFAULTS } from "./config.js";

const getArg = (name: string) => {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
};

const promptArg = getArg("prompt");
const subjectArg = getArg("subject");
const themeArg = getArg("theme");
const styleArg = (getArg("style") as KidStyle) ?? "doodle";
const outArg = getArg("out") ?? `assets/output/single_${Date.now()}.png`;
const modelKey = (getArg("model") as keyof typeof MODELS) ?? "schnell";
const providerArg = getArg("provider");
const widthArg = getArg("width");
const heightArg = getArg("height");

if (!promptArg && !subjectArg) {
  console.log(`Użycie:
  bun run src/generate.ts --prompt "cute doodle owl, pastel" --out assets/output/owl.png
  bun run src/generate.ts --subject "smiling shark" --theme ocean --style doodle --model schnell
  bun run src/generate.ts --subject "red car" --theme pojazdy --model dev --provider fal-ai --width 1024
`);
  process.exit(0);
}

let prompt = promptArg ?? "";
let negative_prompt: string | undefined;

if (subjectArg) {
  const built = buildPrompt({ subject: subjectArg, theme: themeArg, style: styleArg });
  prompt = built.prompt;
  negative_prompt = built.negative_prompt;
  console.log("Built prompt:", prompt);
}

const modelCfg = MODELS[modelKey] ?? MODELS.schnell;
const modelId = (modelCfg as any).id ?? DEFAULTS.model;

const res = await generateImage(
  {
    prompt,
    negative_prompt,
    model: modelId,
    provider: (providerArg as any) ?? undefined,
    width: widthArg ? parseInt(widthArg, 10) : DEFAULTS.width,
    height: heightArg ? parseInt(heightArg, 10) : DEFAULTS.height,
    num_inference_steps: modelKey === "schnell" ? 4 : (modelCfg as any).steps ?? 28,
  },
  outArg,
);

console.log(res);
if (!res.ok) process.exit(1);
