import "dotenv/config";
import { generateImage } from "./hf-client.ts";
import { promptForWordCanonicalV2 } from "./prompts.ts";
import * as fs from "node:fs";
import * as path from "node:path";

const DELAY=1200;
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
const LIST: Array<{word:string,en:string}> = [
  {word:"CENNIK", en:"price list board"},
  {word:"ŻÓŁW", en:"turtle with shell"},
  {word:"GARAŻ", en:"garage building with door"},
  {word:"ŚLIWKA", en:"plum fruit"},
  {word:"RAK", en:"crayfish"},
  {word:"MROWA", en:"pile of ants? actually mrówa? use ant hill"},
  {word:"SYGNAŁ", en:"signal light"},
  {word:"OSADNIK", en:"settler person cute"},
  {word:"ROVER", en:"mars rover vehicle"},
  {word:"DRON", en:"quadcopter drone"},
  {word:"TORY", en:"railway tracks"},
  {word:"MARS", en:"planet mars"},
  {word:"SOKÓŁ", en:"falcon bird"},
  {word:"SUSEŁ", en:"ground squirrel"},
  {word:"SARNINA", en:"deer meat? use roe deer"},
  {word:"CYRANECZKA", en:"teal duck"},
  {word:"LIS", en:"fox"},
  {word:"ŁOS", en:"elk moose"},
  {word:"SZCZENIAK", en:"puppy"},
  {word:"JESZCZURKA", en:"lizard"},
  {word:"JARZĄBEK", en:"hazel grouse bird"},
  {word:"DŻUNGLE", en:"jungle foliage"},
  {word:"JEŻ", en:"hedgehog"},
  {word:"ŚWINKA", en:"piglet"},
  {word:"CIELAK", en:"calf"},
  {word:"KRÓLIK", en:"rabbit with long ears"},
  {word:"KROKODYL", en:"crocodile"},
  {word:"TCHÓRZ", en:"polecat weasel"},
  {word:"ZDERZAK", en:"car bumper"},
  {word:"ZAPORA", en:"dam wall"},
];

const manifestPath=path.resolve("assets/manifest.json");
const existing = fs.existsSync(manifestPath)? JSON.parse(fs.readFileSync(manifestPath,"utf-8")): [];

for(let i=0;i<LIST.length;i++){
  const {word,en}=LIST[i];
  const id=`word-${word.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Z]/g,'')}`;
  const fileName=`${id}__doodle__schnell.png`;
  const outPath=path.resolve(`assets/output/${fileName}`);
  if(fs.existsSync(outPath) && fs.statSync(outPath).size>50_000){
    console.log(`[${i+1}/${LIST.length}] ${word} SKIP`);
    continue;
  }
  const {prompt, negative_prompt}=promptForWordCanonicalV2(word,en,"doodle");
  console.log(`[${i+1}/${LIST.length}] ${word} -> ${fileName}`);
  const res=await generateImage({prompt, negative_prompt, model:"black-forest-labs/FLUX.1-schnell", width:1024, height:1024, num_inference_steps:4, guidance_scale:4.0}, outPath);
  console.log(`  ${res.ok?`OK ${res.bytes}`:`FAIL ${res.error?.slice(0,100)}`}`);
  const entry={id, prompt, negative_prompt, model:"black-forest-labs/FLUX.1-schnell", provider:res.provider, width:1024, height:1024, file:fileName, bytes:res.bytes, latencyMs:res.latencyMs, error:res.error, createdAt:new Date().toISOString()};
  const idx=existing.findIndex((e:any)=>e.file===fileName);
  if(idx>=0) existing[idx]=entry; else existing.push(entry);
  fs.writeFileSync(manifestPath, JSON.stringify(existing,null,2));
  if(res.error?.includes("429")) await sleep(10000);
  else if(i<LIST.length-1) await sleep(DELAY);
}
console.log("done next30");
