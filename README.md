# Next Gen Title — Website

A modern, mobile-optimized rebuild of [ngtitle.com](https://www.ngtitle.com/). Static HTML/CSS/JS — no build step, no dependencies. Deploys anywhere (GitHub Pages, Netlify, Vercel, or any static host).

## Structure

```
├── index.html         # Home
├── services.html      # Services (Residential, Closing, Commercial)
├── homeowners.html    # Home Owners (Buyers, Sellers, coverage)
├── contact.html       # Contact + Order Title form
└── assets/
    ├── css/styles.css # Design system
    ├── js/script.js   # Nav, scroll reveals, form handler
    └── images/        # Optimized site imagery
```

## Design

Apple-inspired aesthetic: glassmorphism navigation, floating dynamic cards, soft depth, generous whitespace, system font stack, and scroll-reveal animations. Fully responsive with a dedicated mobile menu.

## Connecting the order form

The contact form is a **front-end placeholder** — it validates and confirms in the UI but does not yet transmit data. To go live, open `assets/js/script.js` and:

1. Set `FORM_LIVE = true`
2. Set `FORM_ENDPOINT` to your handler URL — e.g. a [Formspree](https://formspree.io) form, a GoHighLevel inbound webhook, or a serverless function.

The form posts all fields (name, email, phone, service type, state, property address, message) as standard `FormData`.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Content

All copy is preserved verbatim from the original site. Imagery is the same, re-exported and compressed for web performance.

Contact: 704-467-3031 · orders@ngtitle.com · PO Box 851, Oakboro, NC 28129
Proudly partnered with WFG National Title Insurance Company.
