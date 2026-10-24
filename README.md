# Glacious Fresh™ — Website

> By Gale Worldwide Movers Pvt. Ltd.

Re-themed to the **Glacious Fresh brand book** (brand blue + brand green on an off-white paper background, new wordmark logo). All page content, links, forms and behaviour are unchanged from the original site.

## Pages

Home · About Us · Services · Track Order · FAQ · Payment / Bank Details (SBI QR + UPI) · Contact (Get a Quote)

## Project structure

```
index.html        → markup only (all 7 pages)
css/style.css     → all styles + brand tokens (:root)
js/script.js      → page navigation, mobile menu, FAQ, copy-UPI, quote form
images/
  logo-on-dark.svg    → logo for blue / navy backgrounds (nav, footer)
  logo-on-light.svg   → logo for white / light backgrounds
  favicon.svg / .png
  truck.png           → hero image (same name as original)
  truck2.png          → Road Freight card image (same name as original — replace with your own)
  india-map.jpg       → "Pan India Coverage" map   (was embedded in the old index.html)
  cold-storage.jpg    → Cold Storage card photo    (was embedded in the old index.html)
  upi-qr.png          → UPI QR code                (was embedded in the old index.html)
```

> `truck2.png` was referenced by the original `index.html` but was not in the repository, so a
> lightweight placeholder is included. Drop your real `truck2.png` into `images/` to replace it.

## Brand tokens (css/style.css → `:root`)

| Token | Value | Use |
|---|---|---|
| `--primary` | `#0039B3` | Brand blue — nav, buttons, links, headings accents |
| `--secondary` | `#8BC53F` | Brand green — logo, ticker, highlights |
| `--deep` | `#001A57` | Footer / sticky call bar |
| `--paper` | `#FAFAF7` | Page background |
| `--text` | `#0B1736` | Body text |

Fonts: **Archivo** (headings) and **Inter** (body), loaded from Google Fonts.

## Run / build

```
npm install
npm run dev      # local dev server
npm run build    # production build → dist/index.html
```

The folder also works as a plain static site (no build) — `index.html` uses only relative paths.

## Contact

[rekha@galebestways.com](mailto:rekha@galebestways.com) | +91 8826175064
