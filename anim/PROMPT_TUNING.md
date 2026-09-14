# PROMPT TUNING — v1 → v2

## Diagnoza v1 (po 43 obrazkach)

**Hero 14:** ogólnie OK, ale:
- `hero-sport` 313K (za mały, ubogi detal vs hero-las 1.4M) — prompt "kids playing football" za ogólny, brak lock na count i styl
- `hero-pojazdy` 433K vs `hero-zwierzaki` 856K — pojazdy mają mało detali (2 obiekty), zwierzaki 3 obiekty → inconsistency
- Brak aspect lock: hero to baner A4 (szeroki), a generujemy kwadrat 1024 — w PDF header będzie crop
- Brak palety lock: `theme.color`/`light` nie wstrzyknięta do promptu (np. kosmos #1E3A8A/#DBEAFE) — kolory losowe

**Word 28 canonical:** 
- MIŚ 482K OK, ale RÓG 318K za mały (za mało detali), SZKŁO 202K prawie pusty (prompt "glass pane" za abstrakcyjny)
- CIENIE 513K, SZUM 366K — abstract words generują artefakty (cienie = 2 postacie? szum = liście + fale)
- Brak "single object 65% frame" — LAS wygenerował 3 drzewa zamiast 1 ikony, KOSZYK ma tło
- Negative za słaby: brak "no background elements, no scenery, no multiple objects, no shadows"

## v2 zmiany

### 1. STYLE_PRESETS — lock na design system logopedia
- `doodle` v2: dodaj `centered, occupies 60-70% frame, isolated on pure white background #FFFFFF, thick black outline 2.5px, rounded 12px, dashed border 2.5px, pastel palette #FEF9C3 #DBEAFE #DCFCE7 #FCE7F3, flat vector, simple shapes, no gradients, no shadows, no background`
- `doodleColoring` zostaje (outline only)
- `hero` nowy preset: `hero` — `wide banner 16:9, playful scene with 3-4 elements, pastel, white background, thick outline, rounded, storybook, no text`

### 2. WORD canonical — konkretne subject + extra lock
- Zamiast `cute teddy bear with bow tie, single centered object` → `single cute teddy bear centered, occupies 65% frame, isolated on pure white #FFFFFF, front view, simple, friendly, bow tie red, no other objects, no background`
- Dodaj English + Polish hint: `Polish word "MIŚ" = teddy bear`
- Extra lock: `single object, centered, isolated, pure white background, no shadows, no scenery, no text`
- Dla abstract (CIENIE, SZUM, CYKL) — zamień na konkretny obiekt: CIENIE → `shadow puppet bunny on wall`, SZUM → `cartoon wind swirl`, CYKL → `single bicycle`

### 3. HERO — aspect + palette lock + element count
- Prompt: `wide banner illustration for "kosmos" theme — friendly rocket with big eyes, smiling planet and 2 stars, pastel navy #1E3A8A on light #DBEAFE, doodle, thick outline, white border, playful, no text`
- Width 1536×1024 (3:2) zamiast 1024×1024 dla banera
- Negative: `no text, no letters, no dark, no photorealistic, no crowded`

### 4. Parametry
- Word: `width 1024 height 1024`, `steps 4`, `guidance 4.0` (z 3.5 → 4.0 dla lepszej zgodności), `seed` fixed dla repro
- Hero: `width 1536 height 1024`, `steps 4`, `guidance 3.5`

## Test plan v2

Wygeneruj 4 słowa v1 vs v2 side-by-side:
- MIŚ (konkretny, dobry baseline)
- SZKŁO (najgorszy v1 — pusty)
- RÓG (średni)
- CIENIE (abstract — najtrudniejszy)

Komenda:
```bash
bun run src/generate.ts --subject "single cute teddy bear centered, occupies 65% frame, isolated on pure white #FFFFFF, front view, simple, friendly, bow tie" --style doodle --out assets/output/v2test/mis-v2.png --width 1024
# vs v1: word-MIS__doodle__schnell.png
```
Porównaj: rozmiar, czytelność w 48px, pasuje do WordBubble, czy bez tła.

## Decyzja po teście

- Jeśli v2 lepszy (większy obiekt, czystsze tło) → batch Faza B/C idzie na v2
- Jeśli v2 za duży/pusty → tune `occupies 60%` vs `70%`
- Abstract words: jeśli v2 wciąż słaby, usuń CIENIE/SZUM z puli i zastąp konkretnym synonimem (CIENIE → CIEŃ, SZUM → WIATR)
