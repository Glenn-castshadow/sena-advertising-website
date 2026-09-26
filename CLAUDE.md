# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for **SENA Advertising** — a San Diego-based TV/radio/digital ad agency. Content sourced from senaadvertising.com.

## Stack

Plain HTML/CSS/JS — no build tool. Open any `.html` file directly in a browser to preview.

## File Structure

```
index.html          Home page
about.html          Team and company overview
creative.html       TV/radio/video production services
branding.html       Brand strategy and campaign services
digital.html        Digital marketing services
contact.html        Contact form and info
thank-you.html      Form confirmation (noindex)
qr-generator.html   Internal Sunroad Auto QR tool (noindex, not linked)
css/styles.css      All styles — single shared file
js/main.js          Nav, hamburger, fade-in, bio modal, lightbox, form handler
images/             Web-ready photos, thumbnails, og-image.jpg
graphics/           Logos (SVG/WebP)
favicon.*, apple-touch-icon.png, robots.txt, sitemap.xml
```

## Page `<head>` Boilerplate

Every public page carries the same head block: canonical URL (`https://www.senaadvertising.com/...`), Open Graph/Twitter tags pointing at `images/og-image.jpg`, favicons, Google Fonts `<link>` with preconnect, `css/styles.css`, and an inline `document.documentElement.classList.add('js')`. `index.html` and `contact.html` also hold the `ProfessionalService` JSON-LD. Nav and footer are duplicated in every page, so edit all of them together. When adding a page, copy an existing head and add the URL to `sitemap.xml`.

## Design System

- **Fonts**: Oswald (headlines, nav, labels) + Inter (body) — Google Fonts `<link>` in each page head
- **Accent**: `--accent` `#c44c19` for fills and large text (hover `#b04413`); `--accent-text` `#f07a4a` for small accent text on dark backgrounds (hover `#f5895c`). Keeps WCAG AA contrast both ways.
- **Background**: `#1e1e1e` base, `#252525` surface, `#2a2a2a` cards
- **Images**: export web copies at ≤2400px long side as JPG (~80 quality); keep full-res sources out of `images/`
- **CSS variables**: defined in `:root` at top of `styles.css`

## Key CSS Patterns

- `.fade-in` + `.fade-in-d1/d2/d3` — scroll-triggered animation via IntersectionObserver in `main.js`. Content is only hidden under `html.js`, so it stays visible without JS; disabled for `prefers-reduced-motion`
- `.section-alt` — surface-colored section band; alternate it with plain sections rather than stacking two
- Focus: global `:focus-visible` ring; interactive things must be real `<a>`/`<button>` (e.g. `.team-card-cta`)
- `.nav.scrolled` — applied by JS when `scrollY > 20`; adds blur backdrop + border
- `.services-grid`, `.team-grid`, `.service-items-grid` — CSS Grid, `1.5px` gaps with `var(--border)` background for divider effect
- `.cta-band` — full-width accent-color strip used as a section CTA on every inner page
- `.page-hero` — inner page header pattern (vs `.hero` which is home-only full-screen)

## Active Nav Link

`main.js` sets `.active` on the matching `<a>` by comparing `window.location.pathname.split('/').pop()` to each link's `href`.

## Contact Form

Posts to Formspree (`action` on the form) via `fetch` in `main.js`, then redirects to `thank-you.html`. `_gotcha` is the honeypot field.

## Content Reference

- Phone: 760-845-1304
- Email: contact@senaadvertising.com
- Address: 5111 Santa Fe St. Unit 219, San Diego, CA 92109
- Hours: Mon–Fri, 10a–5p PT
