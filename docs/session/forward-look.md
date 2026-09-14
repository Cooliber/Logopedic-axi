# Forward Look (po rozbudowie)

## Ranked Next

1. **Twemoji images** (high) — zamienic litery w kolkach na prawdziwe Twemoji PNG via CDN (`https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/{code}.png`) + `<img>` w WordBubble. Wymaga testu Takumi image fetch dla remote URL vs dataURL.
2. **ZIP batch** (med) — `GET /api/pdf/zip?name=&slugs=...` -> archiwa via `jszip` lub `archiver`, zwraca application/zip. Kreator wtedy 1 plik zamiast multi-tab.
3. **E2E + visual** (med) — Playwright: / + /kreator + kazdy /api/pdf/{slug} -> 200 + content-type pdf, pdf size >40KB. Snapshot img dla regresji.
4. **Local font fallback** (low) — bundles WOFF2 Nunito/Baloo lokalnie, by offline tez dzialalo (obecnie googleFonts fail -> polskie znaki fail). Dodać `src/lib/pdf/localFonts.ts` z `fontFromUrl` file://.
5. **Paginacja** (low) — niektore karty (planszowka A3) przydalby sie 2-stronicowy layout.

## Architecture bets
- Keep `takumi-pdf/next` — stabilny, WASM OK. Nie wracac do vite bundler.
- Keep `bun` — npm corrupt na /mnt/f. Dodac `bun.lockb` do repo.
- Keep `tw` vs `className` split — jasne rozdzielenie PDF vs web.

## Blocked
- Brak blokad.

Next: Twemoji image proof-of-concept w jednym szablonie (np. syczacy) + ZIP endpoint.
