# Research — Populating Printable Cards for Kids: Quality, Taste, Neurocognitive Profiling & PEARL Knowledge Graphs

**Date:** 2026-09-08  
**Scope:** `src/lib/pdf/templates/*.tsx` (67 slugów), `anim/*` (HF pipeline), `docs/methodology/modular-a4-pipeline.md`  
**Sources:** arXiv 2609.02216 (PEARL), ACL Anthology, CognaCards, TeachersPayTeachers articulation cards, PMC neuroadaptive studies, KidsWorldFun typography guides

---

## 1. How to Populate Content — Printable Cards (A4, Takumi, Doodle)

### 1.1 Domain model logopedia (primary source: SKILL.md §1 + wordPools.ts)

Populate cards by **szereg × pozycja P/S/K × etap × temat** — not random words.

| Layer | Rule | Source | Example |
|---|---|---|---|
| **Szereg** | Exactly 1 szereg per card: syczący `s z c dz`, szumiący `sz ż cz dż`, ciszący `ś ź ć dź`, rotacyzm `r`. No cross-contamination (e.g. no `r` on sycząca). | `SKILL.md §1.3`, `wordPools.ts:82-83` fallback to `BASE_WORDS` | `syczacy-kosmos` → sycy words in kosmos skin |
| **Pozycja** | Mark every word P/S/K (P=nagłos, S=śródgłos, K=wygłos). Balance 5:4:3, start with P (easiest). Color code: P green, S yellow, K orange (`PositionLegend` in `shared.tsx:339`). | `SKILL.md §1.2`, `shared.tsx:289-337` | `SOK (P)`, `KOS (S)`, `LAS (K)` |
| **Poziom** | Same grid adapts: M1-M4 for wywołanie, +M5-M6 for utrwalanie, +zdania for automatyzacja. 8-12 words per card (`words.slice(0,12)` in `themed.tsx:37`). | `modular-a4-pipeline.md §2` (6 modules, 744px budget) | `HierarchyBar` UCHO→ZDANIE |
| **Dobór słów** | Known, imageable, child-semantic (zwierzęta, jedzenie, dom). Avoid abstract (`CIENIE` → `CIEŃ`) and phonetic traps (`SOBOTA` > `ŚRODA` on S card). Pool `WORD_POOLS[theme][szereg]` 8-13 words per cell, distinct 359. | `SKILL.md §1.3`, `wordPools.ts:359 distinct` | `ANANAS, SZYNKA, CYFRA` — concrete |
| **Sekwencja** | 1) rozgrzewka artykulacyjna, 2) words M5, 3) extension (trace line, minimal pairs, movement), 4) closing (misja, samoocena, naklejki). | `SKILL.md §1.4` | `InstructionCard: Słuchaj→Mów→Koloruj` |

**Population algorithm:**
```
for theme in THEMES (14):
  for szereg in [syczacy, szumiacy, ciszacy, rotacyzm]:
    pool = WORD_POOLS[theme][szereg] ?? BASE_WORDS[szereg]
    words = pool.slice(0,12)  // ensures P/S/K balance already in pool
    hero = HERO_STYLE[theme]  // kosmos doodle, las watercolor, etc.
    render ThemedTemplate({theme, szereg, words, hero})
```
*If pool <8 → show fallbackNote (themed.tsx:98) — "pula w budowie, pokazujemy sprawdzone słowa w skórce".*

### 1.2 Printable design population — lessons from market (secondary: CognaCards, TeachersPayTeachers)

- **One card = one therapeutic goal + one playful scene.** CognaCards model: 36 front (letters/logic) +36 back (story/hidden objects), each card has picture + word + phrase + sentence + sound-loaded sentence — 5 levels on one card for 50+ trials/session (thedabblingspeechie P flashcards 48 words ×3 positions). [CognaCards](https://cognabilities.com/cognacards/educators-and-therapists/), [Articulation Cards Multi-Level](https://www.teacherspayteachers.com/Product/Articulation-Cards-Multi-Level-W-FV-TD-SZ-PB-MN-KG-SH-CH-DJ-L-12777070)
- **Image slots:** M4 hero 88px 1× cover, M5 8× 36-42px word, M6 4× mini pair, M7 4× sticker. Large slots justify HF generation (1024→36px), small slots use SVG (`wordSvg` 48 viewBox). [modular pipeline §4.4]
- **Bundle by routine:** Not 67 isolated PDFs but 1 A4 with 6 modules (header + personalization + hierarchy + hero + words + exercises + closing) = 8-10 min session. Bundling by theme/buyer increases value (SenseCentral: bundle by theme/goal/event, not generic). [SenseCentral printable guide](https://sensecentral.com/how-to-create-printable-worksheets-for-kids/)

---

## 2. Declare Quality & Taste

### 2.1 Quality — measurable

| Criterion | Spec | Verification | Source |
|---|---|---|---|
| **Print** | 300 DPI, CMYK, 0.125" bleed, embedded fonts, 1/4" safe margin | `takumi-pdf render({size:"a4",margin:0})` + `auditDesignSystem` + visual regression vs `public/__snapshots__` | [Children's Book Illustration Guide](https://madegooddesigns.com/childrens-book-illustration/) |
| **Typography** | Body 11-12pt, heading 18-20pt, leading 1.4-1.6, Andika/Sassoon/Baloo2 infant variants (single-story a/g), left-aligned, short lines | `typo` tokens in `theme.ts:80-88`, BDA 12-14pt | [KidsWorldFun typography](https://www.kidsworldfun.com/blog/how-to-choose-fonts-for-childrens-books-learning-apps/), [Layout Guide](https://madegooddesigns.com/childrens-book-layout/) |
| **Color** | WCAG 4.5:1, pastel + vivid palette (`kidPalette`), max 4 colors per card (`auditDesignSystem` warn), `ekoBg` white for ink saving | `design-system.ts:colorsUsed.length>4` | [Meal Planning Posters palette](https://kidnutri.basalt.cc/blog/designing-simple-meal-planning-posters-picky-eaters-1342) |
| **Visual hierarchy** | Grid 2pt, dashed 2.5px, rounded 22px, 6 modules ≤744px (+40 p-5 +60 gap =844 <940 usable), gutter dead space | `layout.moduleBudget` + Mermaid mass diagram | `modular-a4-pipeline.md §2` |
| **Image** | `bytes>50KB` (1024), `whiteRatio>0.55` (4 corners pipette), `no text` in prompt+negative, `seed=hash(word)` deterministic | `anim/src/batch.ts` + `public/anim` HEAD check | `anim/src/config.ts` |
| **Language** | Polish, no emoji in PDF (`stripEmoji` regex U+2700-27BF, but should be lint not runtime), Latin-1 + ąęół | `route.ts:9-15` | `SKILL.md §2` |

**Taste — declared:**
- **Doodle system:** `react-doodle-icons` + `wordSvg` hand-drawn minimal (48 viewBox, stroke 1.8, rounded 12px, `dasharray 5 4`). Matches dodle 22px + dashed 2.5px. [icons.tsx:31-33]
- **Presets:** `doodle` (v4 detailed, vibrant pastel, 60% frame, soft shading, distinctive silhouette), `doodleColoring` (white interior for coloring M5), `kawaii` (big eyes, sticker), `watercolor` (las/ogród), `flat` (miasto/pojazdy), `clay` (kosmos). [anim/src/prompts.ts:9-47]
- **No-text lock:** `no text/no letters/no writing/no signage` in prompt suffix + negative + `SAFE_NEGATIVE` — v3 after PEARL-style feedback (was `no text` duplicated). [prompts.ts:51-52, PROMPT_TUNING.md]
- **Cohesion:** One trim size (A4), one palette per szereg (`sycy #FACC15`, `szum #2D6A4F`, `cisz #8B5CF6`, `r #FF7B25`), consistent `PageHeader` 56px circle, `CuttingLine` with scissors gap.

---

## 3. Neurocognitive Profiling for Kid Adjustments

### 3.1 Why profiling, not one-size-fits-all

Verbal working memory (WM) and inhibitory control (IC) modulate time-pressure effects — higher IC predicts better arithmetic only when time pressure hidden, especially for younger (8-11y) (de Mooij, BBK). Hiding time pressure reduces operant confusion saccades. [de Mooij BBK study](https://eprints.bbk.ac.uk/id/eprint/56418/1/Shouldonlinemaths_deMooij.pdf)

Adaptive e-learning should model **cognitive profile per child** and adjust context (visibility of timer, difficulty, modality) — Park & Lee (2003) adaptive systems, Math Garden example. [de Mooij review]

### 3.2 Signals & models

| Signal | How to capture on A4 (no sensors) | Sensor-rich counterpart (for future digital) |
|---|---|---|
| **IC / inhibition** | `MinimalPairs` VS task (SOK vs SZOK) — error rate on minimal pairs, self-rating `SAMOOCENA` (Super/OK/Jeszcze) as metacognitive proxy | Wearable EEG frontal theta/beta, eye-tracking fixation duration (Zhang et al. 2025, 115 children ASD/ADHD/SLD: frontal theta p<0.001, HRV LF/HF, 89.3% disorder classification) |
| **WM / attention** | `XPTracker` 5 stars + `OneMinuteChallenge` count — sustained attention (hits, reaction time) | NeuroBloom Random Forest (High/Medium/Low/Distracted, 87.5% accuracy) predicting engagement → runtime difficulty/hint frequency/reward pacing [NeuroBloom 2026] |
| **Engagement** | `SelfRating` + `StickerStrip` cut-out — behavioral trace (parent logs) | Bayesian Immediate Feedback Learning (BIFL) — Bayesian MAB over visual/auditory/textual stimuli, uncertainty-aware weighting EEG+face+performance → +22.4% concentration, +24.8% emotional engagement, +32.1% performance (n=40 ASD/ADHD, p<0.001, d>1.4) [BIFL 2025] |
| **Cognitive load** | `HierarchyBar` UCHO→ZDANIE + `InstructionCard` 3 steps + gap 12px — chunk limit 4-7 (Cognitive Load Theory) | AR multimodal fusion: theta power + HRV + fixation → 27% load reduction vs traditional, RL every 30s adjusts difficulty ±20% or modality switch → +31.2% task completion, d=0.92 attention [Zhang et al. 2025] |

**A4 proxy without sensors:** Use **paper profiling** — pre-card 2-min probe:
- `IC probe:` 4 minimal pairs, count correct vs operant confusion (e.g. picks SZOK for SOK) → IC low ⇒ hide timer, show mouth visual (`icons: mouth position visuals for s/z, ś/ź` per TeachersPayTeachers mouth cues), add `ParentTip`.
- `WM probe:` `OneMinuteChallenge` count → WM low ⇒ reduce `words.slice(0,8)` not 12, increase gap, add `TraceLine` proprioception (Van Riper).
- `Profile → template variant:` `themed.tsx` already has `eko` + `fallbackNote` — extend to `level` prop (easy vs standard) driven by probe score. No new template, same modules.

**Adaptive rules (paper, fuzzy):** Mamdani FIS like Cognitia (RCPM puzzle, MID children, 92% completion, 84% acceptance) — inputs: normalized completion time, error frequency, assistance level → output difficulty (Mamdani FIS handles uncertainty). [Cognitia 2026] For logopedia: inputs: `P correct rate`, `S/K confusion`, `time to finish M5` → output: next card `poziom` (isolacja vs sylaba vs słowo vs zdanie).

### 3.3 Talent for taste

Taste is not decoration — it **reduces load and signals profile:**
- Young (3-5): large type, simple letterforms, generous spacing, bright bold palette, vignette layout (Keboto). → `typo.bodyLarge 12px 1.5` + `doodleColoring` white interior to color (active). [Keboto layout](https://keboto.org/how-to-design-a-cohesive-layout-for-childrens-books-across-formats)
- 6-8: high readability, clear b/d/p/q distinction, grid system, bold headings. → `Baloo2` + `HierarchyBar`.
- Neurodiverse: inclusive by design — no screens, tactile cut/play, visual discrimination via `Color Shapes & Grids` (CognaCards), hidden items for scanning. [CognaCards](https://cognabilities.com/cognacards/educators-and-therapists/)

---

## 4. Sidequest PEARL — Cracks Unseen Knowledge Graphs

### 4.1 Problem: Unseen nodes, missing links

Inductive Knowledge Graph Completion (IKGC) predicts missing links `(h,r,t)` where `h` or `t` unseen at training — transferable patterns, not memorized embeddings (TransE/DistMult fail, need retraining). 61% triples have no connecting path, only 47% have exactly one (CATS analysis) — path-only reasoning fails. [CATS 2024]

Classic GNNs (GraIL, R-GCN) initialize unseen nodes randomly → poor generalization. [MGIL 2026]

### 4.2 PEARL in one paragraph (arXiv 2609.02216, 2026-09-02)

**PEARL: Path-Entity Aligned Relational Learning with Contextual Subgraphs for Inductive KG Completion** — SOTA Hits@10 on WN18RR, FB15k-237, NELL-995.

> Existing path+subgraph methods encode paths independent of query subgraph — but same path means different things in different contexts. PEARL models paths as **context-conditioned reasoning signals**.

**5 components:**

1. **Contextual Subgraph Neural Network (CSNN):** For query `(h,r,t)` build union neighborhood `G_cs = N(h) ∪ N(t)` (not just enclosing) → richer evidence, GNN encodes entity reps `h_cs` + global `g`.
2. **LLM-based Path Retrieval and Alignment (LPRA):** LLM (Qwen3-4B-Instruct) scores candidate paths `P_cand` for semantic compatibility with query triple → keep top informative paths `P_q`. Builds **bipartite graph** `B_q = (V_cs ∪ {g} ∪ P_q, E_B)` — paths ↔ contextual entities + global node.
3. **Bipartite GNN (BGNN):** Message passing over `B_q` → path embeddings adapt to local + global context. Same relation path interpreted differently per structure.
4. **Relation-Aware Path Attention Fusion (RAPF):** Attention aggregates refined paths per query relation → score.
5. **Subgraph Contrastive Learning (SCL):** Dual-view InfoNCE on two stochastic augmentations of `G_cs` → consistency, suppress noise from enlarged union. Loss `L = L_task + λ L_contrast`.

**Math sketch:**
- Context: `G_cs = ∪_{v∈{h,t}} N_k(v)`
- LLM scorer: `score(p, (h,r,t)) = LLM(p, r_q)` (prompt in supplement A)
- Bipartite: `U_q = V_cs ∪ {g} ∪ P_q`, edges `(p, v)` if `v ∈ p` plus `(p, g)`
- BGNN: `m_p^{(l+1)} = AGG( {h_v^{(l)} | v∈N(p)} ∪ {g^{(l)}} )`
- Contrast: `L_SCL = -log exp(sim(m_cs1, m_cs2)/τ) / Σ exp(...)` (one-directional InfoNCE)
- Fusion: `α_p = softmax( q_r^T W h_p )`, `h_q = Σ α_p h_p` → sigmoid → link prob.

### 4.3 Why PEARL matters for logopedia cards

**Analogy mapping:**

| KG concept | Card concept | Insight |
|---|---|---|
| Unseen entity | New child / new word unseen in training pool | Need inductive, not transductive — can't retrain per child |
| Missing link | Missing word-image link (282 words without SVG, 61% no path) | Like IKGC, 61% triples no path — our `wordSvg` coverage 87/359 ≈24% missing, similar sparsity |
| Contextual subgraph `G_cs` | Module context M1-M7 + theme + szereg | Path relevance depends on context (same `sz` path different in `kosmos` vs `las`) — PEARL's context-conditioned paths |
| LLM retriever | HF prompt `promptForWordCanonicalV2` | LLM distills semantically relevant paths (prompts) from candidate pool — we use LLM to rank phrasing for `RÓG` vs `SZKŁO` |
| Bipartite graph | `themed.tsx` bipartite: paths (words) ↔ entities (M5 tiles) + global (hero) | BGNN idea: adapt word embedding to card context — same word `KORONA` in `królestwo` vs `dentysta` different |
| Contrastive | EKO vs color, P/S/K variants | Dual-view consistency under perturbations (eko white bg vs pastel) — invariant semantics |

**Transferable trick:** **Union neighborhood, not enclosing.** For a new word `ŻUBR` (unseen), don't just look at its 1-hop wordSvg; build union of its szereg `syczacy` + theme `zwierzaki` neighborhood → richer evidence, then LLM-filter to top paths. Exactly our `WORD_POOLS[theme][szereg]` union logic.

**Efficiency note:** PEARL's `auto` provider failover + whiteRatio filter is the card equivalent of SCL noise suppression — enlarged context helps but needs contrastive regularization.

---

## 5. Population checklist (quality + taste + neuro)

- [ ] `wordPools` validate: 5:4:3, no forbidden cross-series, imageable, ortho correct (`auditDesignSystem` + `missingOgonki`)
- [ ] `icons` check: 87→359 coverage via HF PNG `whiteRatio>0.55` + `no text` lock
- [ ] `design-system` budget: 744px check per template (`ModuleContract`)
- [ ] `fonts` local woff fallback for offline Polish diacritics
- [ ] **Profiling probe** (2 min, paper): 4 minimal pairs + 1-min challenge → choose `easy (8 words)` vs `standard (12 words)`, hide/show timer, mouth visual on/off
- [ ] **PEARL-inspired retrieval:** For each missing link (word without image), construct `G_cs = BASE_WORDS[szereg] ∪ WORD_POOLS[theme][szereg]`, LLM-rank prompts (doodle vs kawaii vs watercolor) → keep top 1 → BGNN-style adapt to card palette

---

**Files to create:** `src/lib/pdf/themes/vocabulary.ts` (deep Vocabulary module §2), `anim/src/core/promptFactory.ts` (single style lock), `src/lib/pdf/modules/types.ts` (ModuleContract), `src/lib/pdf/neuro/profile.ts` (paper probe → level).

**Next experiment:** A/B 30 cards: v4 detailed doodle vs coloring outline — measure `whiteRatio`, `time to finish`, `self-rating` correlation with IC probe (like de Mooij eye-tracking: visible timer → more operant confusion for low IC).

---

*Primary sources cited inline; full bibliography in `PROMPT_TUNING.md` + `docs/research/neurokognitywne-wzorce-templates.md`.*
