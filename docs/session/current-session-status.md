# Current Session — 2026-09-07 (rozbudowa)

## Goal
Rozbudowac srodowisko logopedia: personalizacja, EKO, QR, nowe szablony nagrod, kreator, filtry.

## Acceptance
- [x] 11 szablonow (9 -> 11): +dyplom, +naklejki
- [x] Props TemplateProps {name,date,eko,qr} + PersonalizationBar w kazdym szablonie
- [x] EKO tryb: biale tlo via ?eko=1 (style backgroundColor)
- [x] QR real w katalog via qrcode@1.5.4 dataURL + <img src={qr}>
- [x] Route GET /api/pdf/[slug]?name=&date=&eko=&qr= -> render z props + fonts
- [x] GalleryWithFilters: kategorie, imie input, EKO toggle, personalizowany PDF link + podglad
- [x] Kreator /kreator: name/date/eko, select 11, batch download (multi-tab), iframe preview pierwszego
- [x] Podglad forwarduje searchParams do API
- [x] Symbol/font fix: usunięto ✂→★→♪→✓ etc, zastapiono "-" / "*" / litera w kolku; wszystkie PDF renderuja bez "No registered font covers"
- [x] Build OK 12.7s, 11 templates OK kolor+eko (49-105KB)

## Evidence
- bun --bun render 11 kolor+eko: syczacy 86835/86557 ... dyplom 49068, naklejki 80523 (wszystkie OK)
- katalog QR test: qr len 1754, pdf 105068 z img dataURL
- bun run build: compiled 12.7s, TS 8.6s, routes: /, /kreator, /api/pdf/[slug], /podglad/[slug]

## Blind spots
- Emoji nadal usuwane (litera zamiast emoji) — Twemoji image pipeline nie wdrozone (wymaga prepareImages + CDN)
- Batch to multi-tab, nie ZIP — brak zip endpoint
- Brak testow E2E (playwright) i visual regression
- Google Fonts network required — offline fail nadal mozliwy

## Resume
Next: wdrozyc Twemoji CDN image w PDF (zamien litery na Twemoji png), dodac ZIP batch endpoint /api/pdf/zip, dodac playwright e2e.
