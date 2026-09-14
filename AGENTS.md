# Purpose
- Karty pracy logopedyczne dla dzieci w PDF do druku — dodle visual, grywalizacja, gotowe do laminowania.
- Stack: Next.js 16 + Takumi (pdfcn philosophy, bez shadcn registry) + Tailwind 4. Zero headless browser, WASM PDF.

# Ownership
- Owner: logopedia
- Scope: src/lib/pdf/templates/*.tsx (11 szablonow), src/app/api/pdf/[slug]/route.ts, src/app/page.tsx gallery, src/app/kreator, src/components/pdf

# Local Contracts
- PDF generowane serwerowo via `takumi-pdf/next` + `@takumi-rs/helpers` googleFonts. Wymaga network do Google Fonts; fallback bez fontow gdy offline (polskie znaki moga fail).
- API: GET /api/pdf/{slug}?name=Ania&date=2026-09-07&eko=1&qr=https://... -> PDF A4, margin 0 (padding w szablonie), Content-Disposition inline. `katalog` generuje QR via `qrcode` dataURL + `<img src={qr}>`.
- Slugi: 67 (11 bazowych + 56 tematycznych: 14 tematow × 4 szeregi: kosmos/zwierzaki/pojazdy/ocean + dinozaury/las/jedzenie/sport + dom/ubrania/pogoda/muzyka + ogrod/miasto); pelne pokrycie
- Kategorie: szeregi, tematyczne, plynnosc, gry, dialog, oddech, sklep, nagrody
- Tematy: katalog w src/lib/pdf/themes/catalog.ts (14 tematow, wszystkie aktywne). Slugi tematyczne: `{szereg}-{temat}` via themed.tsx + wordPools.ts.
- Konstelacje: src/lib/pdf/themes/constellations.ts — helpery `wordToHfPrompt` / `buildConstellation` / `hfManifest` dla agenta HF text-to-image (doodle prompt per slowo, cover prompt per temat, status pending/generated)
- Doodle icons: react-doodle-icons (439 icon) re-export w src/lib/pdf/icons.tsx + custom wordSvg (svgWrap → dataURI <img src>) dla kazdego slowa. W PDF zakaz emoji — doodle jako <img src={dataUri}> lub litera w kolku. Web galeria uzywa emoji + doodle.
- Props: kazdy template przyjmuje `TemplateProps { name?, date?, eko? }` + `PersonalizationBar`. ThemedTemplate dodatkowo `theme` + `szereg`.
- Styl wizualny: dodle — rounded 22px, dashed 2.5px, pastel+vivid palette, brak surowych tabel, kazda karta ma XP tracker, instrukcje, misje, naklejki.
- PDF templates uzywaja `tw` prop (Takumi Tailwind). Zakaz `fontFamily` z przecinkami i emoji/symboli typu ✂ → ★ (font coverage — zastapione "-" / "*" / litera w kolku). Web gallery uzywa normalnego Tailwind className + emoji.
- Build wymaga turbopack.root = __dirname (monorepo parent lockfile). Instalacja via `bun install` (npm na /mnt/f ma corrupted cache).

# Work Guidance
- Dodaj nowy szablon bazowy: stworz plik w src/lib/pdf/templates/{nazwa}.tsx, eksportuj komponent, zarejestruj w src/lib/pdf/templates/index.ts, przetestuj via `bun --bun -e "import {render}..."` + `bun run build`.
- Dodaj nowy temat: 1) dopisz Theme do src/lib/pdf/themes/catalog.ts, 2) dodaj pule slow do src/lib/pdf/themes/wordPools.ts (min 12 slow P/S/K per szereg), 3) dodaj wordSvg do src/lib/pdf/icons.tsx jesli brak, 4) dopisz temat do PILOT/NEXT i zweryfikuj ze themed slug generuje PDF >50KB. Pelny coverage: sesja 1 pilot 4×4, sesja 2 dinozaury/las/jedzenie/sport, sesja 3 dom/ubrania/pogoda/muzyka, sesja 4 ogrod/miasto + poziomy.
- Test PDF: `bun --bun -e` z googleFonts + render, zapisz do /tmp/*.pdf, sprawdz rozmiar >0. Albo curl na dev server.
- Styl: kolory z src/lib/pdf/theme.ts kidPalette, DottedCard/PageHeader/InstructionCard/WordBubble/XPTracker/FooterBar z shared.tsx.
- Grywalizacja obowiazkowa: XP, misje, tory, naklejki, samoocena, rzut kostka.
- Materialy do kupienia: katalog.tsx generuje PDF z QR placeholder (do podpiecia prawdziwego QR).
- Personalizacja: kreator `/kreator` + query `?name=&date=&eko=` — kazdy template ma `PersonalizationBar`.
- EKO: `eko=true` ustawia biale tlo (`style={{backgroundColor: eko ? "#FFFFFF" : bg}}`), oszczedny tusz.
- Symbole: w PDF zakaz emoji i symboli spoza Latin-1 + polskie znaki (U+0100-017F). Uzywaj liter w kolkach zamiast emoji, `"-"` zamiast `→`.

# Verification
- `bun run build` — musi przejsc TS + Turbopack (ostrzezenie o wasm szerokim pattern to norm).
- `bun --bun` render test dla kazdego slugu — pdf bytes > 50KB, brak "No registered font covers".
- Manual: `bun run dev` + GET http://localhost:3000/api/pdf/syczacy -> Content-Type application/pdf.

# Child DOX Index
- `src/lib/pdf/templates/` — 11 szablonow bazowych + themed.tsx (factory tematyczna, używa Vocabulary)
- `src/lib/pdf/themes/` — catalog.ts (14 tematow) + wordPools.ts (pule P/S/K) + vocabulary.ts (deep Vocabulary: wordsFor/imageSrc/heroSrc/validate)
- `src/lib/pdf/icons.tsx` — doodle icons + wordSvg (custom SVG → dataURI) + wordToImageSrc (HF PNG priority)
- `src/lib/pdf/design-system.ts` — tokeny + series + layout.module (budżet 744px A4 modułowy) + audit
- `src/lib/pdf/modules/types.ts` — ModuleContract M1-M7 + auditModules() (deep LayoutEngine)
- `src/lib/pdf/neuro/profile.ts` — profileFromProbe() IC/WM → easy/standard, hideTimer, mouthVisual (fuzzy)
- `src/app/api/pdf/[slug]/` — endpoint generujacy PDF (obsluguje tez slugi tematyczne)
- `src/app/kreator/` — personalizacja batch + podglad
- `src/components/pdf/` — galeria webowa kart (GalleryWithFilters + filtr tematyczny)
- `anim/` — generator obrazków dla dzieci via HF Inference Providers (FLUX/SDXL, batch, manifest) — style `doodle` + `doodleColoring` dla M5 + core/{promptFactory,manifest,normalize,rateLimit,imagePipeline}
- `docs/methodology/modular-a4-pipeline.md` — metodyka modułowa A4 + pipeline HF (canonical vs themed, style lock, manifest gate)
- `docs/research/neurokognitywne-wzorce-templates.md` — deep research 10 wzorców (Cognitive Load, Mayer, Gestalt, mandala RCT)
- `docs/research/cards-population-quality-taste-neuro-pearl.md` — research populacji treści, quality/taste, neuro-profiling, PEARL math
