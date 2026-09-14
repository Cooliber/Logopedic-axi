// ManifestStore — atomowy JSON + schema, zamiast 4× findIndex
import * as fs from "node:fs";
import * as path from "node:path";

export type ManifestEntry = {
  id: string;
  file: string;
  word?: string;
  theme?: string;
  prompt: string;
  negative_prompt: string;
  model: string;
  provider: string;
  width: number;
  height: number;
  bytes?: number;
  whiteRatio?: number;
  seed?: number;
  latencyMs?: number;
  error?: string;
  status: "ok" | "fallback" | "error";
  createdAt: string;
};

export class ManifestStore {
  constructor(private filePath: string) {}
  load(): ManifestEntry[] {
    if (!fs.existsSync(this.filePath)) return [];
    try {
      const data = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
  save(entries: ManifestEntry[]) {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    const tmp = this.filePath + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(entries, null, 2));
    fs.renameSync(tmp, this.filePath);
  }
  upsert(entry: ManifestEntry) {
    const all = this.load();
    const idx = all.findIndex((e) => e.file === entry.file);
    if (idx >= 0) all[idx] = entry;
    else all.push(entry);
    this.save(all);
    return all;
  }
  findByFile(file: string): ManifestEntry | undefined {
    return this.load().find((e) => e.file === file);
  }
}
