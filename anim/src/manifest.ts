// anim/src/manifest.ts — podgląd manifestu
import * as fs from "node:fs";
const p = "assets/manifest.json";
if (!fs.existsSync(p)) { console.log("brak manifestu"); process.exit(0); }
const m = JSON.parse(fs.readFileSync(p, "utf-8"));
console.table(m.map((e: any) => ({ id: e.id, file: e.file, bytes: e.bytes ?? "—", error: e.error ? e.error.slice(0,40) : "OK", model: e.model.split("/").pop() })));
console.log(`Razem: ${m.length}`);
