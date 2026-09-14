// anim/src/batch-words.ts — generowanie WORD canonical (white bg, bez theme) dla logopedia
// Użycie: bun run src/batch-words.ts [--dry] [--top 20] [--all] [--limit 50]

import * as fs from "node:fs";
import * as path from "node:path";
import "dotenv/config";
import { generateImage } from "./hf-client.js";
import { buildPrompt, type KidStyle } from "./prompts.js";
import { MODELS, DEFAULTS } from "./config.js";

const args = process.argv.slice(2);
const isDry = args.includes("--dry");
const isAll = args.includes("--all");
const topIdx = args.indexOf("--top");
const topN = topIdx !== -1 ? parseInt(args[topIdx+1] ?? "20",10) : 0;
const limitIdx = args.indexOf("--limit");
const limit = limitIdx !== -1 ? parseInt(args[limitIdx+1] ?? "0",10) : 0;

const modelKey = "schnell" as const;
const modelCfg = MODELS[modelKey];
const modelId = (modelCfg as any).id;

// TOP list z REALNE_POTRZEBY.md §2 — najczęstsze missing (wartość)
const TOP_MISSING_CANONICAL = [
  "KOSZ","LIŚĆ","ĆMA","DŹWIĘK","KOŚĆ","MUR","MIŚ","ŚLIMAK","ŚNIEG","TOR","SOK","KOS","LAS","CIENIE","CEBULA","CZEKOLADA","RÓŻA","SOWA","ŻABA","DŻUNGLA",
  "BRAMA","RYBA","ROWER","GRZYB","RÓŻA","SZYSZKA","ANANAS","CZOSNEK","ŚLIWKA","SANKI","REX","SMOK","SKAŁA","SOSNA","SARNA","GRZYB","RYŚ","SALON","SOFA","ZASŁONA",
  "SUKIENKA","SANDAŁ","SŁOŃCE","SZRON","SAKSOFON","CYMBAŁ","SKLEP","RATUSZ","ZĄB","STADO","SZKIELET","MYSZ","ŻÓŁW","ŻELKI","ŻUREK","KORZEŃ","ZASŁONA","TORNADO","WIATR","ORKIESTRA"
];
// deduplicate keep order
const TOP_DEDUP = [...new Set(TOP_MISSING_CANONICAL)];

// Jeśli --all, czytaj wszystkie distinct z wordPools via dynamic import (logopedia src)
async function getAllDistinctWords(): Promise<string[]> {
  // import z logopedia src (ts) — użyj ścieżki względnej
  const mod = await import("../../src/lib/pdf/themes/wordPools.ts" as any);
  const pools = mod.WORD_POOLS as Record<string, Record<string, Array<{w:string}>>>;
  const base = mod.BASE_WORDS as Record<string, Array<{w:string}>>;
  const set = new Set<string>();
  for (const theme of Object.keys(pools)) {
    for (const szereg of Object.keys(pools[theme] ?? {})) {
      for (const e of pools[theme][szereg] ?? []) set.add(e.w);
    }
  }
  for (const szereg of Object.keys(base)) for (const e of base[szereg]) set.add(e.w);
  return [...set].sort();
}

function wordToCanonicalPrompt(word:string): {prompt:string, negative_prompt:string} {
  // canonical: single object, white bg, no theme
  const subject = `single centered object for Polish word "${word}" — cute doodle icon, child-friendly, white background`;
  return buildPrompt({ subject, style: "doodle" as KidStyle, extra: "single object, centered, white background, no theme background, no text" });
}

async function main(){
  let words: string[];
  if (isAll) {
    words = await getAllDistinctWords();
    console.log(`batch-words | mode=all distinct=${words.length}`);
  } else if (topN > 0) {
    words = TOP_DEDUP.slice(0, topN);
    console.log(`batch-words | mode=top${topN} model=${modelId} dry=${isDry} count=${words.length}`);
  } else if (limit > 0) {
    words = TOP_DEDUP.slice(0, limit);
    console.log(`batch-words | mode=limit${limit} dry=${isDry}`);
  } else {
    words = TOP_DEDUP.slice(0, 20);
    console.log(`batch-words | mode=default20 dry=${isDry}`);
  }

  const outDir = path.resolve("assets/output/words");
  fs.mkdirSync(outDir, { recursive:true });
  const publicDir = path.resolve("../public/anim/words");
  fs.mkdirSync(publicDir, {recursive:true});

  const manifestPath = path.resolve("assets/manifest-words.json");
  const existing: any[] = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath,"utf-8")) : [];

  const DELAY_MS = 1200;
  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));
  const results: any[]=[];

  for(let i=0;i<words.length;i++){
    const word = words[i];
    const normalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l").replace(/Ł/g,"L").toLowerCase();
    const fileName = `${normalized}.png`;
    const outPath = path.join(outDir, fileName);
    const publicPath = path.join(publicDir, fileName);
    const {prompt, negative_prompt} = wordToCanonicalPrompt(word);

    console.log(`\n[${i+1}/${words.length}] ${word} -> ${fileName}`);
    if(isDry){
      console.log(`  prompt: ${prompt.slice(0,110)}...`);
      results.push({word, file:fileName, prompt, negative_prompt, model:modelId, dry:true, createdAt:new Date().toISOString()});
      continue;
    }

    if(fs.existsSync(outPath) && fs.statSync(outPath).size > 20_000){
      console.log("  SKIP — już istnieje", fs.statSync(outPath).size);
      // ensure public copy
      if(!fs.existsSync(publicPath) || fs.statSync(publicPath).size !== fs.statSync(outPath).size){
        fs.copyFileSync(outPath, publicPath);
      }
      results.push({word, file:fileName, bytes: fs.statSync(outPath).size, skip:true});
      continue;
    }

    const res = await generateImage({prompt, negative_prompt, model: modelId, width:1024, height:1024, num_inference_steps:4, guidance_scale:3.5}, outPath);
    if(res.ok){
      console.log(`  OK ${res.bytes} bytes ${res.latencyMs}ms`);
      fs.copyFileSync(outPath, publicPath);
      results.push({word, file:fileName, bytes:res.bytes, latencyMs:res.latencyMs, ok:true});
    } else {
      console.log(`  FAIL ${res.error?.slice(0,200)}`);
      results.push({word, file:fileName, error:res.error, ok:false});
      if(res.error?.includes("429") || res.error?.includes("Too Many")){
        console.log("  Rate limited 10s");
        await sleep(10000);
      }
    }
    if(i < words.length-1) await sleep(DELAY_MS);
  }

  // merge manifest
  const merged = [...existing];
  for(const r of results){
    const idx = merged.findIndex((m:any)=>m.word===r.word);
    if(idx>=0) merged[idx]= {...merged[idx], ...r};
    else merged.push(r);
  }
  fs.writeFileSync(manifestPath, JSON.stringify(merged,null,2));
  console.log(`\nManifest words: ${manifestPath} (${merged.length})`);
  const ok = results.filter(r=>r.bytes && r.bytes>10000).length;
  console.log(`OK ${ok}/${results.length} dry=${isDry} cost ~$${(results.length*0.003).toFixed(3)}`);
}

main().catch(e=>{console.error(e); process.exit(1)});
