# Premium Katalog HQ — Design Doc (logopedia)

Data: 2026-09-16 · Owner: logopedia · Status: approved sections 1-2, 3-4 condensed per user "działaj z reszta"

## 1. Problem
Programatyczne A4 (Takumi + wordSvg doodle) słabe przed dzieckiem: małe obrazki 132px, dashed chaos, brak kuracji, 111 kafelków = niepoważny produkt. Potrzeba premium A4 drukowalnego + paczki najwyższej jakości. Ezoteryka (cymatics) do osobnego packa.

## 2. Cel
Kartka A4 przed dzieckiem 4-7 lat: duża ilustracja 5cm, ciepła, czytelna z 40cm, biała, bez rozproszeń. Druk domowy EKO + laminowanie logopedy. 300 DPI, Baloo 2 18-20px, spacing +25%.

## 3. IA Katalogu (premium)
- **20 hero HQ** (core): 4 szeregi ×3 poziomy (UCHO/SŁOWO/ZDANIE) =12 + 5 gier (labirynt/memory/wyszukiwanka/kodowanie/tor) +3 narracja (historyjka/dialog/planszówka)
- **56 tematycznych jako skórki** — 14 tematów ×4 szeregi = 56 PDF, sprzedawane jako 14 paczek (Kosmos, Zwierzaki...), nie 56 solo. Ten sam layout HQ + vocabulary swap.
- **Galeria /**: hero 20 + paczki, filtry szereg/poziom/temat. Nie 111 kafelków.
- **Pack ezoteryczny** osobno: 5 kart cymatics (cymatic-frequencies, standing-waves, sacred-vowels, breath-geometry, harmonic-body) → bundle "Oddech i Wibracja" 39 PLN, landing osobna.

## 4. Spec Print A4 (layout.module 744px)
- A4 210×297mm, margin 0, padding 18mm, 2×2 grid =4 karty 5.5×5.5cm max. 8 słów =2 strony (4+4).
- Typo: Baloo 2 18-20px, 14px instrukcje, wordSpacing +25%, letterSpacing +0.3px, offline kidFonts() cache (bez Google Fonts network).
- Kolor: kidPalette pastels, vivid tylko badge P/S/K 8px od obrazka, EKO białe tło +1.8px dashed #E5E7EB, AA contrast, kolor nie sam (kształt+tekst).
- Obraz PNG 600×600 <90KB, prefer thumb.png, litera w kółku fallback, obraz nad słowem.

## 5. Pipeline Ilustracji + QA Gate (premiuj paczki najwyższej jakości)
- **PromptFactory** style lock doodleColoring/flashcard, English only NO TEXT, thick outline 3px, pastel flat, pure white #FFFFFF 65% frame, no shadows/scenery.
- **Batch HF**: FLUX.1-schnell draft $0.003 → FLUX.1-dev final $0.025, providers fal-ai/replicate/together, 1200ms delay, 429→10s backoff, assets/output + manifest.json id/hashWordToSeed deterministyczny.
- **Gate**: hero 20 =100% manual approve, paczki tematyczne auto CLIP>0.28 +1 revision round przed publikacją. Brak approved = nie w katalogu. Zamrożenie 200 hero PNG wyselekcjonowanych.
- **Embed**: serverImages.ts resolveWordImages() <90KB, dataURI, Vercel Blob cache.

## 6. Paczki Premium (pricing)
- STARTER free 4 karty (lead magnet)
- PACK A-D: 14 paczek tematycznych ×29 PLN (4 PDF each), bundle 4 =79 PLN
- PRO 76 PDF HQ =149 PLN ZIP + EKO + bonus naklejki/dyplom + 12 mies updates
- EZOTERYCZNY 39 PLN
- Każda paczka ZIP + okładka hero 600px + tytuł Baloo 2.

## 7. PDF Engine
- Takumi zostaje (WASM, zero browser), ale HQ PNG zamiast SVG doodle, 90KB limit, fonts offline, bleed 3mm.
- Themed + Tor via images prop już działa, rozszerzyć na wszystkie hero.
- Print-test każdej hero karty (HP laser+atrament).

## 8. Landing Redesign
- Hero: "Kolorowe dodle zamiast nudnych tabel" → premium editorial, mniej chaosu, więcej whitespace, 1 CTA "Zobacz 20 kart HQ"
- Sekcja paczek: 4 paczki kosmos/zwierzaki/pojazdy/ocean jako hero, reszta w "Wszystkie paczki" accordion.
- Pricing table + FAQ druk/laminowanie + testimonials logopedów.
- SEO: sitemap + robots już, dodać schema Product + FAQ.

## 9. Sklep/Stripe
- LemonSqueezy/Stripe Checkout, ZIP download via signed URL (Vercel Blob), auth opcjonalnie (email gate dla free). RODO + regulamin.
- Katalog PDF HQ generowany z previews JPEG 400KB cap (route.ts już ma).

## 10. HF Wrapper Prompts (high quality)
- Patrz anim/src/prompts.ts v4 premium (flashcardPremium preset) — EN only, 65% frame, isolated, no text strict, per-word english mapping, deterministic seed.

## 11. Verification
- `bun run build` OK (turbopack.root)
- `bun --bun -e "render"` pdf >50KB, no font error
- `bun run anim/src/batch.ts --dry --limit 2` prompty OK
- Print-test 1 hero na A4 300DPI
- Vercel deploy fra1, function maxDuration 30s

## 12. Next Steps
→ writing-plans → implement: prompts → landing → deploy
