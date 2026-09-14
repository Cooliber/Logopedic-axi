# Logopedia — Karty Pracy (dodlewizual, pdfcn / Takumi)

Kolorowe karty logopedyczne dla dzieci do druku (A4, 300 DPI). Zamiast surowych tabel — **dodlewizual**: rounded 22px, dashed 2.5px, pastel+vivid palette, naklejki, tory, XP, gry.

## Slugi / kategorie

- **Szeregi syczacy/szumiacy/ciszacy + rotacyzm** — `syczacy`, `szumiacy`, `ciszacy`, `rotacyzm`
- **Plynnosc** — `plynnosc` (Plynna Rzeka Slow, zolw vs zajac, oddech 4 kroki)
- **Gra** — `planszowka` (36 pol spiral, kostka, zetony do wyciecia)
- **Dialog** — `dialog` (Moc Rozmowy, 6 powodow, 4 startery, mini-komiks, role)
- **Oddech** — `oddech` (Oddech Smoka, swieczka/piorko/slomka/balon, tor 7 dni)
- **Sklep** — `katalog` (8 pakietow + QR `qrcode` dataURL)
- **Nagrody** — `dyplom` (personalizacja imie+data), `naklejki` (48 szt do wyciecia)

Kazda karta: instrukcja + WordBubble grid + sortowanie/labirynt/sylaby + zdania x3 + samoocena + FooterBar. Props `name`/`date`/`eko` → `PersonalizationBar` + biale tlo w EKO.

## Stack

- Next.js 16 (App Router, Turbopack) + Tailwind 4 + TypeScript
- PDF: `takumi-pdf/next` (WASM, bez Chrome) + `@takumi-rs/helpers` (googleFonts: Nunito, Baloo 2, Inter)
- Filosofia pdfcn (shadcn-labs/pdfcn) — `tw` prop w PDF, `className` w web

## Install & dev

```bash
bun install          # wazne: bun, nie npm (npm cache corrupt na /mnt/f)
bun run dev          # http://localhost:3000
bun run build
```

> `next.config.ts` ma `turbopack.root = __dirname` bo parent `/mnt/f/code` ma wlasny package-lock (monorepo). Bez tego Turbopack nie znajduje `next/package.json`.

## PDF API

```
GET /api/pdf/{slug}?name=Ania&date=2026-09-07&eko=1&qr=https://sklep.pl  -> application/pdf (inline)
GET /podglad/{slug}?name=Ania&eko=1                                          -> iframe preview + download
GET /kreator                                                                -> batch personalizacja + podglad
```

Przyklad:

```bash
curl -o /tmp/syczacy.pdf "http://localhost:3000/api/pdf/syczacy?name=Ania&eko=1"
curl -o /tmp/dyplom.pdf "http://localhost:3000/api/pdf/dyplom?name=Jan%20Kowalski&date=2026-09-07"
```

Render test bez serwera:

```bash
bun --bun -e "
import { render } from 'takumi-pdf';
import { googleFonts } from '@takumi-rs/helpers';
import { SyczacyTemplate } from './src/lib/pdf/templates/syczacy.tsx';
const fonts = await googleFonts(['Nunito','Baloo 2']);
const pdf = await render(SyczacyTemplate(), {size:'a4', margin:0, fonts});
require('fs').writeFileSync('/tmp/test.pdf', pdf);
"
```

Uwaga: PDF **nie uzywa emoji** (font coverage) — kolory + litery w kolkach zamiast emoji. Web gallery emoji zostaje.

## Dodawanie szablonu

1. `src/lib/pdf/templates/nowy.tsx` -> eksport `export function NowyTemplate() { return <div tw="..."> }`
2. Zarejestruj w `src/lib/pdf/templates/index.ts` w `templates`
3. Uzyj `kidPalette` + komponentow z `shared.tsx` (PageHeader, DottedCard, WordBubble...)
4. Test: `bun --bun -e ...` + `bun run build`

## Struktura

```
src/app/page.tsx                 # gallery (GalleryWithFilters)
src/app/kreator/page.tsx         # personalizacja batch + podglad
src/app/podglad/[slug]/page.tsx  # iframe preview (forwarduje ?name&eko)
src/app/api/pdf/[slug]/route.ts  # takumi render + qrcode + eko + name
src/lib/pdf/theme.ts             # kidPalette + TemplateProps
src/lib/pdf/templates/*.tsx      # 11 szablonow + shared.tsx (+ PersonalizationBar)
src/components/pdf/GalleryWithFilters.tsx
src/components/pdf/TemplateCard.tsx # legacy
```

## TODO / next

- Emoji w PDF via Twemoji images (extractEmojis + prepareImages) — partial (kolorowe kulki z litera zamiast emoji)
- Paginacja 2-stronna dla niektorych kart
- Testy visual regression (pdf snapshot)
- ZIP batch download (obecnie multi-tab)

