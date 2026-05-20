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
css/styles.css      All styles — single shared file
js/main.js          Nav scroll, hamburger menu, fade-in observer, form handler
graphics/           Design assets (source files)
```

## Design System

- **Fonts**: Oswald (headlines, nav, labels) + Inter (body) — loaded from Google Fonts CDN
- **Accent**: `#e84b2a` (orange-red), hover `#ff6040`
- **Background**: `#0d0d0d` base, `#111111` surface, `#161616` cards
- **CSS variables**: defined in `:root` at top of `styles.css`

## Key CSS Patterns

- `.fade-in` + `.fade-in-d1/d2/d3` — scroll-triggered animation via IntersectionObserver in `main.js`
- `.nav.scrolled` — applied by JS when `scrollY > 20`; adds blur backdrop + border
- `.services-grid`, `.team-grid`, `.service-items-grid` — CSS Grid, `1.5px` gaps with `var(--border)` background for divider effect
- `.cta-band` — full-width accent-color strip used as a section CTA on every inner page
- `.page-hero` — inner page header pattern (vs `.hero` which is home-only full-screen)

## Active Nav Link

`main.js` sets `.active` on the matching `<a>` by comparing `window.location.pathname.split('/').pop()` to each link's `href`.

## Contact Form

Client-side only — submission shows a "Message Sent!" confirmation and resets after 4 seconds. Wire up a backend (e.g., Formspree, Netlify Forms) to make it functional.

## Content Reference

- Phone: 760-845-1304
- Email: scott@senaadvertising.com
- Address: 5111 Santa Fe St. Unit 219, San Diego, CA 92109
- Hours: Mon–Fri, 10a–5p PT
