# Valiant Title — Website (v2)

Modern, Apple-inspired multi-page site for **Valiant Title**. Static HTML/CSS/JS,
no build step. Deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

Design language: near-black ink + electric blue (from the logo), big type,
deep whitespace, floating/tilting cards, bento service grid, dark glass panels.
Built ground-up — not derived from any other title site.

## Pages
- `index.html` — Home (hero with floating cards, bento services, dark "why" panel, stats, CTA)
- `services.html` — Services (alternating feature splits + "who we serve" bento)
- `home-owners.html` — Home Owners (buyer/seller cards + title-insurance FAQ)
- `order-title.html` — Order Title form
- `contact.html` — Contact (form + direct-line cards)

## Files
```
*.html   styles.css   main.js
assets/  valiant-logo.png (dark, header)  valiant-logo-light.png (light, footer)
         favicon.svg  + photos
robots.txt  sitemap.xml  _headers
```

## ⚠️ Before launch — replace placeholders
- **Logo:** `assets/valiant-logo.png` (dark, for the light header) and
  `assets/valiant-logo-light.png` (white, for the dark footer) are placeholders.
  Drop in the real black-and-blue logo at both paths (a white/knockout version
  for the footer keeps it visible on the dark background).
- **Phone:** `704-555-0100` (and `tel:+17045550100`) — search/replace across all pages.
- **Emails:** confirm `info@ / orders@ / finals@valianttitle.com` mailboxes exist.
- **Domain:** update `valianttitle.com` in canonical/OG tags and `sitemap.xml` if different.
- **Forms:** currently use a `mailto:` fallback — wire to a backend (Formspree, Basin, or a GHL webhook).
- **OG images:** add `assets/og-*.jpg` (1200×630) for link previews.

## Brand tokens
Edit the `:root` block at the top of `styles.css`. Primary blue `#1e57f0`, ink `#0a0e17`.
