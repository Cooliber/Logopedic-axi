// batch-v2 — generuje next TOP missing words na v2 prompt
import "dotenv/config";
import { generateImage } from "./hf-client.ts";
import { promptForWordCanonicalV2 } from "./prompts.ts";
import * as fs from "node:fs";
import * as path from "node:path";

const DELAY = 1200;
const sleep = (ms:number)=>new Promise(r=>setTimeout(r,ms));

// Faza B — next 30 missing (freq 2) — concrete, imageable
const FAZA_B: Array<{word:string, en:string}> = [
  {word:"CZAPLA", en:"heron bird with long legs"},
  {word:"JARZĄBEK", en:"hazel grouse bird"},
  {word:"JASKINIA", en:"small cave entrance with rocks"},
  {word:"CZOŁG", en:"cute tank with treads"},
  {word:"JEŻ", en:"cute hedgehog with spines"},
  {word:"ŚCIEŻKA", en:"forest path trail"},
  {word:"CIEŃ", en:"single shadow silhouette"},
  {word:"RANA", en:"small wound with bandage, cute, not scary"},
  {word:"BUS", en:"small minibus van"},
  {word:"SZOSA", en:"asphalt road straight"},
  {word:"ŻÓŁTY", en:"yellow color splash, cute"},
  {word:"GARAŻ", en:"garage door building"},
  {word:"TRAKTOR", en:"cute tractor"},
  {word:"SÓL", en:"salt shaker"},
  {word:"ŚLEDŹ", en:"herring fish"},
  {word:"CISZA", en:"quiet finger on lips gesture, cute"},
  {word:"OSIKA", en:"aspen tree"},
  {word:"ŻUK", en:"cute beetle"},
  {word:"ŚCIÓŁKA", en:"forest floor litter with leaves"},
  {word:"ŚWIT", en:"sunrise over hills, simple"},
  {word:"CZARNY", en:"black color swatch, cute"},
  {word:"BURZA", en:"storm cloud with lightning, cute not scary"},
  {word:"BRAMA", en:"gate with arch"},
  {word:"CEGŁA", en:"single brick"},
  {word:"CEL", en:"target bullseye"},
  {word:"CHÓR", en:"choir of three kids singing, simple"},
  {word:"CIASTO", en:"slice of cake"},
  {word:"SŁOŃCE", en:"smiling sun"},
  {word:"MOST", en:"small bridge over river"},
  {word:"DRZWI", en:"wooden door"},
];

const manifestPath = path.resolve("assets/manifest.json");
const existing = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath,"utf-8")) : [];

for(let i=0;i<FAZA_B.length;i++){
  const {word,en} = FAZA_B[i];
  const id = `word-${word.replace(/[^A-Z]/g,"")}`;
  const fileName = `${id}__doodle__schnell.png`;
  const outPath = path.resolve(`assets/output/${fileName}`);
  if(fs.existsSync(outPath) && fs.statSync(outPath).size>50_000){
    console.log(`[${i+1}/${FAZA_B.length}] ${word} SKIP`);
    continue;
  }
  const {prompt, negative_prompt} = promptForWordCanonicalV2(word,en,"doodle");
  console.log(`[${i+1}/${FAZA_B.length}] ${word} -> ${fileName}`);
  console.log(`  ${prompt.slice(0,110)}...`);
  const res = await generateImage({prompt, negative_prompt, model:"black-forest-labs/FLUX.1-schnell", width:1024, height:1024, num_inference_steps:4, guidance_scale:4.0}, outPath);
  console.log(`  ${res.ok ? `OK ${res.bytes} ${res.latencyMs}ms` : `FAIL ${res.error?.slice(0,120)}`}`);
  // update manifest
  const entry = {id, prompt, negative_prompt, model:"black-forest-labs/FLUX.1-schnell", provider:res.provider, width:1024, height:1024, file:fileName, bytes:res.bytes, latencyMs:res.latencyMs, error:res.error, createdAt:new Date().toISOString()};
  const idx = existing.findIndex((e:any)=>e.file===fileName);
  if(idx>=0) existing[idx]=entry; else existing.push(entry);
  fs.writeFileSync(manifestPath, JSON.stringify(existing,null,2));
  if(res.error?.includes("429")) await sleep(10000);
  else if(i<FAZA_B.length-1) await sleep(DELAY);
}
console.log("Faza B done");
