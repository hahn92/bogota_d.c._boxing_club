# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run minify:js    # Minify index.js → index.min.js
npm run minify:css   # Minify styles.css → styles.min.css
./minifica.sh        # Run both minification steps
```

After editing `index.js` or `styles.css`, always run the corresponding minify command so the `.min` files stay in sync. `index.html` loads the minified files in production.

## Architecture

Single-page static website for Bogotá DC Boxing Club, deployed via GitHub Pages at `bogotadcboxingclub.hahndev.com`.

**Three source files:**
- `index.html` — Full page structure with inline Schema.org/JSON-LD, Open Graph meta tags, and section anchors
- `styles.css` — All styles using CSS custom properties (`--primary`, `--secondary`, etc.) with responsive breakpoints at 480px, 768px, and 992px
- `index.js` — Vanilla JS for: mobile menu toggle, gallery carousel with popup modal, smooth scroll (90px header offset), scroll-triggered fade-in animations via Intersection Observer, and header shadow on scroll

**Page sections** (one-page scroll layout):
- `#hero` → `#clases` → `#social-feed` → `#galeria` → `#ubicacion` → footer

No build pipeline beyond minification — no bundler, no transpilation, no test suite. Deployment is automatic on push to `main`.
