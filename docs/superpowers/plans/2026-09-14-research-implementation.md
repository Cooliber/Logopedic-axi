# Research Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Naprawić luki researchowe (word spacing, parent tip, chunking, hierarchy fade, coherence, neuro profile) z perspektywą dziecka na kartce A4.

**Architecture:** 6 sekwencyjnych zmian w `src/lib/pdf/*` + nowy `src/lib/pdf/neuro/profile.ts`. Każda zmiana niezależna, ale sekwencja chroni przed konfliktami.

**Tech Stack:** Next.js 16, Takumi PDF (JSX→PDF), Tailwind 4, TypeScript

---

## Chunk 1: Word Spacing + ParentTip

### Task 1.1: Dodaj wordSpacing do tokens

**Files:**
- Modify: `src/lib/pdf/design-system.ts:62-79`

- [ ] **Step 1: Dodaj wordSpacing do tokens.typo**

```typescript
// W design-system.ts, po letterSpacing w tokens.typo (linia 78)
wordSpacing: "+25%", // Galliussi 2020, Perea 2021
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS (brak zmian w output)

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/design-system.ts
git commit -m "feat(design): add wordSpacing token for reading accuracy"
```

### Task 1.2: Zastosuj wordSpacing w InstructionCard

**Files:**
- Modify: `src/lib/pdf/templates/shared.tsx:119`

- [ ] **Step 1: Dodaj wordSpacing do InstructionCard text**

```tsx
// W shared.tsx, InstructionCard, linia ~119
// Zmień:
<span tw="text-[11px] leading-[1.6] text-[#1A1A2E] font-semibold" style={{ letterSpacing: "0.3px" }}>{text}</span>
// Na:
<span tw="text-[11px] leading-[1.6] text-[#1A1A2E] font-semibold" style={{ letterSpacing: "0.3px", wordSpacing: "0.25em" }}>{text}</span>
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/shared.tsx
git commit -m "feat(shared): add wordSpacing to InstructionCard"
```

### Task 1.3: Zastosuj wordSpacing w MinimalPairs

**Files:**
- Modify: `src/lib/pdf/templates/shared.tsx:498-512`

- [ ] **Step 1: Dodaj wordSpacing do MinimalPairs text**

```tsx
// W shared.tsx, MinimalPairs, linia ~498-512
// Zmień:
<span tw="text-[10px] font-black text-[#1A1A2E]">{a}</span>
// Na:
<span tw="text-[10px] font-black text-[#1A1A2E]" style={{ wordSpacing: "0.25em" }}>{a}</span>

// Zmień:
<span tw="text-[10px] font-black" style={{ color: accent }}>{b}</span>
// Na:
<span tw="text-[10px] font-black" style={{ color: accent, wordSpacing: "0.25em" }}>{b}</span>
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/shared.tsx
git commit -m "feat(shared): add wordSpacing to MinimalPairs"
```

### Task 1.4: Kompaktowy ParentTip

**Files:**
- Modify: `src/lib/pdf/templates/shared.tsx:138-147`

- [ ] **Step 1: Zmniejsz ParentTip**

```tsx
// W shared.tsx, ParentTip, linia ~138-147
// Zmień:
<div tw="rounded-[12px] px-3 py-2 flex gap-2 items-start" style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
  <span tw="text-[9px] font-black uppercase tracking-widest shrink-0" style={{ color: accent }}>
    DLA DOROSLEGO
  </span>
  <span tw="text-[9px] leading-[1.4] font-semibold text-[#6B7280] flex-1">{text}</span>
</div>
// Na:
<div tw="rounded-[12px] px-3 py-1.5 flex gap-1.5 items-start" style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
  <span tw="text-[7px] font-black uppercase tracking-widest shrink-0" style={{ color: accent }}>
    DLA DOROSLEGO
  </span>
  <span tw="text-[7px] leading-[1.4] font-semibold text-[#6B7280] flex-1">{text}</span>
</div>
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/shared.tsx
git commit -m "feat(shared): compact ParentTip for child-centric layout"
```

---

## Chunk 2: Przerwa w słowa + HierarchyBar

### Task 2.1: Przerwa narracyjna w syczacy.tsx

**Files:**
- Modify: `src/lib/pdf/templates/syczacy.tsx:89-115`

- [ ] **Step 1: Dodaj przerwę między wierszami słów**

```tsx
// W syczacy.tsx, sekcja M5 (linie ~89-115)
// Po pierwszych 4 słowach, dodaj:
<div tw="flex items-center justify-center gap-2 my-2">
  <span tw="text-[8px] font-black tracking-widest text-[#713F12]">Teraz lecimy dalej! Skocz 3× 🚀</span>
</div>

// Zmień grid grid-cols-4 na grid grid-cols-4 gap-3 (zachować)
// Ale dodaj wizualną przerwę: bg change na drugim wierszu
// Opcja: użyć flex-col zamiast grid, z przerwą między wierszami
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Sprawdź PDF**

Run: `bun --bun -e "import {render} from 'takumi-pdf/next'; import {SyczacyTemplate} from './src/lib/pdf/templates/syczacy'; const pdf = await render(SyczacyTemplate({name:'Ania', date:'2026-09-14'})); require('fs').writeFileSync('/tmp/syczacy-test.pdf', Buffer.from(pdf)); console.log('OK', pdf.byteLength)"`
Expected: PDF > 50KB, przerwa widoczna

- [ ] **Step 4: Commit**

```bash
git add src/lib/pdf/templates/syczacy.tsx
git commit -m "feat(syczacy): narrative break between word rows"
```

### Task 2.2: Przerwa narracyjna w themed.tsx

**Files:**
- Modify: `src/lib/pdf/templates/themed.tsx:176-217`

- [ ] **Step 1: Dodaj przerwę w themed.tsx**

```tsx
// W themed.tsx, sekcja M5 (linie ~176-217)
// Po pierwszych 4 słowach, dodaj:
<div tw="flex items-center justify-center gap-2 my-2">
  <span tw="text-[8px] font-black tracking-widest" style={{ color: c.primary }}>
    Teraz lecimy dalej! Skocz 3× 🚀
  </span>
</div>
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/themed.tsx
git commit -m "feat(themed): narrative break between word rows"
```

### Task 2.3: HierarchyBar subtle fade

**Files:**
- Modify: `src/lib/pdf/templates/shared.tsx:452-485`

- [ ] **Step 1: Zmień HierarchyBar na subtle fade**

```tsx
// W shared.tsx, HierarchyBar, linie ~452-485
// Zmień logikę renderowania:
{steps.map((s, i) => {
  const done = i < active;
  const cur = i === active;
  const future = i > active;
  return (
    <div
      key={s}
      tw="flex-1 rounded-full px-2 py-1.5 flex items-center justify-center gap-1"
      style={{
        backgroundColor: cur ? accent : done ? "#ECFDF5" : "#F9FAFB",
        border: `1.5px solid ${cur ? accent : done ? "#6EE7B7" : "#E5E7EB"}`,
        opacity: future ? 0.5 : 1,
      }}
    >
      <span
        tw="h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-black"
        style={{
          backgroundColor: cur ? "#FFFFFF" : done ? "#10B981" : "#E5E7EB",
          color: cur ? accent : done ? "#FFFFFF" : "#6B7280",
        }}
      >
        {done ? "+" : cur ? "★" : "●"}
      </span>
      <span tw="text-[7px] font-black tracking-widest" style={{ color: cur ? "#FFFFFF" : done ? "#065F46" : "#9CA3AF" }}>
        {s}
      </span>
    </div>
  );
})}
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/shared.tsx
git commit -m "feat(shared): subtle HierarchyBar fade for progress visibility"
```

---

## Chunk 3: Coherence Audit

### Task 3.1: Usuń komentarze techniczne z syczacy.tsx

**Files:**
- Modify: `src/lib/pdf/templates/syczacy.tsx:89-115`

- [ ] **Step 1: Usuń zbędne komentarze**

```tsx
// W syczacy.tsx, usuń:
// - "Dashed = miejsce na pieczatkę / kropkę za poprawne powtórzenie"
// - "Propriocepcja Van Ripera"
// - "Skup uwage 2 min - koloruj od srodka na zewnatrz. To trenuje uwage (Cureus 2023)."
// Zostaw: krótką instrukcję dla dziecka
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/syczacy.tsx
git commit -m "feat(syczacy): remove technical comments from child view"
```

### Task 3.2: Usuń komentarze z pozostałych templates

**Files:**
- Modify: `src/lib/pdf/templates/szumiacy.tsx`
- Modify: `src/lib/pdf/templates/ciszacy.tsx`
- Modify: `src/lib/pdf/templates/rotacyzm.tsx`
- Modify: `src/lib/pdf/templates/themed.tsx`
- Modify: `src/lib/pdf/templates/plynnosc.tsx`

- [ ] **Step 1: Usuń komentarze techniczne z każdego pliku**

Usuń:
- "Propriocepcja Van Ripera"
- "To trenuje uwage (Cureus 2023)"
- "Skup uwage 2 min..."
- Inne komentarze naukowe w main flow

Zostaw:
- Krótkie instrukcje dla dziecka
- ParentTip (kompaktowy)

- [ ] **Step 2: Sprawdź build dla każdego**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/szumiacy.tsx src/lib/pdf/templates/ciszacy.tsx src/lib/pdf/templates/rotacyzm.tsx src/lib/pdf/templates/themed.tsx src/lib/pdf/templates/plynnosc.tsx
git commit -m "feat(templates): remove technical comments from child view"
```

---

## Chunk 4: Neuro Profile

### Task 4.1: Stwórz profile.ts

**Files:**
- Create: `src/lib/pdf/neuro/profile.ts`

- [ ] **Step 1: Stwórz plik profile.ts**

```typescript
// src/lib/pdf/neuro/profile.ts
export type Profile = {
  wordsCount: 8 | 12;
  hideTimer: boolean;
  mouthVisual: boolean;
  difficulty: "easy" | "standard";
};

export function profileFromProbe(input: {
  minimalPairsCorrect: number; // 0-4
  oneMinuteCount: number;      // ile słów w 1 min
  age: number;                 // 3-8
}): Profile {
  const ic = input.minimalPairsCorrect / 4;
  const wm = Math.min(input.oneMinuteCount / 8, 1);
  
  if (ic < 0.5 || wm < 0.5 || input.age < 5) {
    return { wordsCount: 8, hideTimer: true, mouthVisual: true, difficulty: "easy" };
  }
  return { wordsCount: 12, hideTimer: false, mouthVisual: false, difficulty: "standard" };
}
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/neuro/profile.ts
git commit -m "feat(neuro): add profileFromProbe for adaptive difficulty"
```

### Task 4.2: Integracja profile z themed.tsx

**Files:**
- Modify: `src/lib/pdf/templates/themed.tsx`

- [ ] **Step 1: Dodaj profile prop do themed.tsx**

```tsx
// W themed.tsx, na górze pliku
import type { Profile } from "../neuro/profile";

// W MakeThemedComponent, dodaj profile prop:
export function makeThemedComponent(themeId: ThemeId, szereg: SzeregId) {
  return function ThemedTemplate(props?: TemplateProps & { profile?: Profile }) {
    const { name, date, eko, profile } = props || {};
    const words = getWords(themeId, szereg).slice(0, profile?.wordsCount || 12);
    // ... reszta kodu
  };
}
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/themed.tsx
git commit -m "feat(themed): integrate profile for adaptive word count"
```

### Task 4.3: Integracja profile z syczacy.tsx

**Files:**
- Modify: `src/lib/pdf/templates/syczacy.tsx`

- [ ] **Step 1: Dodaj profile prop do SyczacyTemplate**

```tsx
// W syczacy.tsx
import type { Profile } from "../neuro/profile";

export function SyczacyTemplate({ name, date, eko, profile }: { 
  name?: string; 
  date?: string; 
  eko?: boolean;
  profile?: Profile;
} = {}) {
  const words = [
    // ... istniejące słowa
  ].slice(0, profile?.wordsCount || 8);
  
  // Warunkowe ukrycie timera
  const showTimer = !profile?.hideTimer;
  // ... reszta kodu z warunkowym renderowaniem timera
}
```

- [ ] **Step 2: Sprawdź build**

Run: `bun run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/pdf/templates/syczacy.tsx
git commit -m "feat(syczacy): integrate profile for adaptive difficulty"
```

---

## Chunk 5: Weryfikacja końcowa

### Task 5.1: Test builds

- [ ] **Step 1: Build entire project**

Run: `bun run build`
Expected: PASS (brak błędów TypeScript/Turbopack)

- [ ] **Step 2: Test PDF generation dla 3 szablonów**

Run:
```bash
bun --bun -e "
import {render} from 'takumi-pdf/next';
import {SyczacyTemplate} from './src/lib/pdf/templates/syczacy';
import {SzumiacTemplate} from './src/lib/pdf/templates/szumiacy';
import {RotacyzmTemplate} from './src/lib/pdf/templates/rotacyzm';
const fs = require('fs');

const syczacy = await render(SyczacyTemplate({name:'Ania', date:'2026-09-14'}));
fs.writeFileSync('/tmp/syczacy-final.pdf', Buffer.from(syczacy));
console.log('syczacy:', syczacy.byteLength, 'bytes');

const szumiacy = await render(SzumiacTemplate({name:'Ania', date:'2026-09-14'}));
fs.writeFileSync('/tmp/szumiacy-final.pdf', Buffer.from(szumiacy));
console.log('szumiacy:', szumiacy.byteLength, 'bytes');

const rotacyzm = await render(RotacyzmTemplate({name:'Ania', date:'2026-09-14'}));
fs.writeFileSync('/tmp/rotacyzm-final.pdf', Buffer.from(rotacyzm));
console.log('rotacyzm:', rotacyzm.byteLength, 'bytes');
"
```
Expected: 3 PDFs > 50KB

- [ ] **Step 3: Sprawdź visual regression**

Porównaj z `public/__snapshots__/` — czy przerwy w słowa są subtelne? Czy HierarchyBar pokazuje postep?

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete research implementation - word spacing, compact parent tip, narrative breaks, hierarchy fade, coherence audit, neuro profile"
```

---

## Podsumowanie

| Chunk | Zadania | Pliki | Czas |
|---|---|---|---|
| 1. Word Spacing + ParentTip | 4 | design-system.ts, shared.tsx | 1h |
| 2. Przerwa + HierarchyBar | 3 | syczacy.tsx, themed.tsx, shared.tsx | 2h |
| 3. Coherence Audit | 2 | 6 templates | 1.5h |
| 4. Neuro Profile | 3 | neuro/profile.ts, themed.tsx, syczacy.tsx | 1.5h |
| 5. Weryfikacja | 1 | - | 30min |
| | **RAZEM** | ~10 plików | **~6h** |
