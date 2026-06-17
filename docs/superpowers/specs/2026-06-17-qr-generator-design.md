# QR Code Generator — Design Spec

**Date:** 2026-06-17  
**Project:** SENA Advertising — Sunroad Auto QR Generator (Proof of Concept)  
**Status:** Approved

---

## Overview

A standalone, client-facing QR code generator page built for Sunroad Auto dealership staff. Users paste a vehicle detail page URL, see a live QR code preview, and export it as a print-ready PNG or scalable SVG for use on vehicle addendum stickers.

This is a proof of concept intended for packaging and delivery to the client if accepted.

---

## File Structure

Single self-contained file: `qr-generator.html` at the project root.

- No dependency on `css/styles.css` or `js/main.js`
- No SENA site navigation
- All styles and logic inline in the one file
- One external dependency: `qr-code-styling` library loaded from CDN

This structure allows the file to be zipped and handed off without any surrounding project context.

---

## Layout

**Centered card on a light gray background (`#f0f0f0`).**

### Page header (full-width dark strip, `#1a1a1a`)
- Sunroad Auto logo (`<img>` pointing to `https://www.sunroadauto.com/wp-content/themes/DealerInspireDealerTheme/images/logo.png`)
- "QR CODE GENERATOR" subtitle label below the logo in small uppercase tracking
- Dark background makes the white logo visible

### Card (white, max-width 420px, centered, rounded corners, subtle shadow)
1. **Vehicle URL field** — labeled input (`type="url"`, full width)
2. **QR preview** — 160×160px display box, centered; shows placeholder before URL is entered
3. **Spec line** — "3" × 3" · Print-ready · Error correction: High" in small muted text
4. **Horizontal rule divider**
5. **Export row** — two equal-width buttons side by side:
   - **Export PNG** (dark background) — "900 × 900 px" sub-label
   - **Export SVG** (light background) — "Scalable vector" sub-label
6. **Footer note** — "QR code updates live as you type" in small muted text

---

## Library

**qr-code-styling** loaded from CDN (single `<script>` tag).

- Renders natively as both SVG and Canvas
- Error correction: level H (High — ~30% damage tolerance, standard for print)
- If offline use is ever required, the CDN script can be downloaded into the project folder and the `src` path swapped

---

## Behavior & Data Flow

1. User types or pastes a URL into the input
2. A 300ms debounce fires after the user stops typing
3. URL is validated (must be a non-empty, well-formed URL)
4. If valid: `qr-code-styling` re-renders the QR code into the preview `<div>`
5. If invalid: input gets a red border + inline error message; QR is not generated

**Export PNG:**
- Library renders QR to an offscreen `<canvas>` at 900×900px (3 inches at 300 DPI)
- `canvas.toDataURL('image/png')` → programmatic `<a download="qr-code.png">` click
- Browser saves `qr-code.png`

**Export SVG:**
- Library outputs raw SVG markup string
- SVG string → `Blob` → object URL → programmatic `<a download="qr-code.svg">` click
- Browser saves `qr-code.svg`

Both export buttons are disabled (visually grayed) until a valid URL has been entered.

---

## Error Handling

| Condition | Behavior |
|---|---|
| Empty input | Placeholder state in QR box; export buttons disabled |
| Invalid URL | Red border on input + "Please enter a valid URL" inline message; no QR rendered |
| Library render failure | "Could not generate QR code" message below preview |
| Logo fails to load | `<img>` hides gracefully via `onerror`; header subtitle label remains |

---

## Output Spec

| Format | Dimensions | Resolution | Use |
|---|---|---|---|
| PNG | 900 × 900 px | 300 DPI equivalent* | Print — vehicle addendum stickers |
| SVG | Scalable | Vector | Digital / large-format print |

*Browser canvas export does not embed DPI metadata — the file will read as 72 DPI in Photoshop/Illustrator. When placing in print design software, set the image size to 3" × 3" manually. Pixel dimensions (900×900) are correct for 300 DPI output at that size.

---

## Out of Scope

- Multiple QR codes in a batch
- Custom colors or logo embedded in the QR code
- Backend / server-side generation
- SENA site navigation or shared styles
- Authentication or access control
