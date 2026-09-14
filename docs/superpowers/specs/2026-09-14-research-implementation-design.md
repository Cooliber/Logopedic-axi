# Research Implementation Design — Logopedia

**Data:** 2026-09-14  
**Status:** Zatwierdzony  
**Zakres:** `src/lib/pdf/*` + `src/lib/pdf/neuro/*`  
**Perspektywa:** Dziecko na kartce A4 — świat do zabawy, nie dokument terapeutyczny

---

## 1. Kontekst

### 1.1 Problem
Research (Mayer, Gestalt, Cognitive Load, mandala RCT) jest udokumentowany w `docs/research/`, ale wdrożenie ma luki. Jednocześnie perspektywa jest zbyt "techniczna" — kartka traktowana jak dokument terapeutyczny, nie jak świat do zabawy dla dziecka.

### 1.2 Cel
Naprawić luki researchowe JEDNOCZEŚNIE przesuwając perspektywę z "developer/terapeuta" na "dziecko patrzące na kartkę A4".

### 1.3 Filtr decyzyjny
Każda zmiana przechodzi test: **"Czy to służy dziecku, czy dorosłemu?"**
- Dziecko: obrazy, kolorowanie, ruch, narracja
- Dorosły: instrukcje, profile, wskazówki (minimalna powierzchnia)

---

## 2. Zmiany

### 2.1 Word Spacing (Sekcja 1)

**Cel:** Poprawa dokładności czytania via inter-word spacing +25% (Galliussi 2020, Perea 2012).

**Zmiany:**
- `design-system.ts:tokens.typo` — dodać `wordSpacing: "+25%"`
- `shared.tsx:InstructionCard` — dodać `style={{ wordSpacing: "0.25em" }}`
- `shared.tsx:MinimalPairs` — dodać `style={{ wordSpacing: "0.25em" }}`
- `syczacy.tsx:Historyjka` — dodać word spacing do tekstu

**Pliki:** `design-system.ts`, `shared.tsx`, `syczacy.tsx`  
**Czas:** 30min

### 2.2 Kompaktowy ParentTip (Sekcja 2)

**Cel:** Oszczędność miejsca na A4 — ParentTip jest dla dorosłego, nie dla dziecka.

**Zmiany:**
- `shared.tsx:ParentTip` — zmniejszyć padding/gap:
  - `py-2` → `py-1.5`
  - `gap-2` → `gap-1.5`
  - `text-[9px]` → `text-[7px]` (zachować `tracking-widest`)
- Bez piktogramu (oszczędność miejsca)

**Efekt:** ~8px oszczędności × 4 ParentTipy = 32px więcej na aktywności dziecka.

**Pliki:** `shared.tsx`  
**Czas:** 15min

### 2.3 Przerwa w słowa (Sekcja 3)

**Cel:** Naturalny chunking 4+4 bez terapeutycznych breakpointów.

**Projekt (perspektywa dziecka):**
```
[4 słowa w wierszu 1]
[Subtelna przerwa: tło #F9FAFB → #FFFFFF]
["Teraz lecimy dalej! Skocz 3× 🚀"]
[4 słowa w wierszu 2]
```

**Zmiany:**
- `syczacy.tsx:M5` — dodać wizualną przerwę (gap + bg change) + narracyjny bridge
- `themed.tsx:M5` — to samo dla tematycznych
- Usunąć `CuttingLine` z M5 (zastąpić przerwą narracyjną)

**Efekt:** Continuity (Gestalt) + chunking + multisensory (ruch) + fun.

**Pliki:** `syczacy.tsx`, `themed.tsx`  
**Czas:** 1h

### 2.4 HierarchyBar subtle fade (Sekcja 4)

**Cel:** Wizualny postęp bez terapeutycznych etykiet.

**Projekt:**
- `done` (i < active): lekki outline, zielony "+", `text-[7px]`
- `active` (i === active): bold, colored bg, `text-[8px]`
- `future` (i > active): kropki "● ● ●", `text-[7px]`, gray

**Zmiany:**
- `shared.tsx:HierarchyBar` — zmienić style per stan

**Pliki:** `shared.tsx`  
**Czas:** 30min

### 2.5 Coherence audit (Sekcja 5)

**Cel:** Usunięcie komentarzy technicznych z main flow.

**Co usunąć:**
- "Dashed = miejsce na pieczatkę / kropkę za poprawne powtórzenie"
- "Propriocepcja Van Ripera"
- "To trenuje uwage (Cureus 2023)"
- "Skup uwage 2 min - koloruj od srodka na zewnatrz."

**Gdzie przenieść:**
- Do `ParentTip` (dla dorosłego) — kompaktowy
- Albo usunąć całkowicie (dziecko nie czyta)

**Pliki:** `syczacy.tsx`, `szumiacy.tsx`, `ciszacy.tsx`, `rotacyzm.tsx`, `themed.tsx`, `plynnosc.tsx`  
**Czas:** 1h

### 2.6 Neuro Profile (Sekcja 6)

**Cel:** 2-minutowa próba papierowa → dostosowanie trudności.

**Nowy plik:** `src/lib/pdf/neuro/profile.ts`

```ts
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

**Integracja:**
- `themed.tsx` — przyjmuje `profile` prop → `words.slice(0, profile.wordsCount)`
- `syczacy.tsx` — warunkowe ukrycie timera
- `src/app/kreator/` — opcja wyboru profilu

**Pliki:** `neuro/profile.ts` (nowy), `themed.tsx`, `syczacy.tsx`  
**Czas:** 2h

---

## 3. Podsumowanie

| Sekcja | Zmiana | Pliki | Czas |
|---|---|---|---|
| 1. Word Spacing | `wordSpacing: "+25%"` | design-system.ts, shared.tsx, syczacy.tsx | 30min |
| 2. ParentTip | Kompaktowy: 7px, py-1.5 | shared.tsx | 15min |
| 3. Przerwa w słowa | Wizualna + narracyjna | syczacy.tsx, themed.tsx | 1h |
| 4. HierarchyBar | Subtle fade | shared.tsx | 30min |
| 5. Coherence | Usuń komentarze | 6 templates | 1h |
| 6. Neuro Profile | profileFromProbe() | neuro/profile.ts, themed.tsx | 2h |
| | **RAZEM** | ~10 plików | **~5h** |

---

## 4. Weryfikacja

### 4.1 Po każdej zmianie
- `bun run build` — musi przejść
- Sprawdź PDF rozmiar > 50KB
- Ręczny przegląd: "co widzi dziecko?"

### 4.2 Końcowa
- Porównaj przed/po: screenshot 3 kart (syczacy, kosmos, rotacyzm)
- Sprawdź: czy komentarze techniczne zniknęły z main flow?
- Sprawdź: czy ParentTip jest kompaktowy?
- Sprawdź: czy przerwa w słowa jest subtelna + narracyjna?
- Sprawdź: czy HierarchyBar pokazuje postęp?
- Sprawdź: czy profileFromProbe() działa?

---

## 5. Bibliografia

- Galliussi et al. 2020 — spacing vs letterform
- Perea et al. 2012 — inter-letter spacing preschool
- Mayer R. 12 Principles — coherence, signaling, contiguity
- Sweller J. Cognitive Load Theory — chunking 4-7
- Singh et al. Cureus 2023 — mandala ADHD RCT
- Van Riper — propriocepcja w terapii mowy
