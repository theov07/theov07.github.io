# Théo Verdelhan — Quantitative Research Portfolio

Personal website published at [theov07.github.io](https://theov07.github.io).

The site is built with Jekyll and GitHub Pages. Its public content is intentionally limited to:

- experience;
- education;
- detailed quantitative research case studies;
- selected quantitative research and engineering projects;
- a downloadable one-page resume.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Content structure

- `_pages/home.html`: live-market homepage and portfolio navigation
- `_pages/experience.html`: experience
- `_pages/education.html`: academic background
- `_pages/research*.html`: public research hub and detailed case studies
- `_pages/projects.html`: selected projects and competitions
- `files/Resume_Theo_Verdelhan.pdf`: downloadable one-page resume
- `assets/css/orderbook-preview.css`: homepage visual system
- `assets/js/orderbook-preview.js`: live order book and paper-execution dashboard
- `assets/css/quant-site.css`: interior-page visual system
- `assets/js/quant-site.js`: shared interior-page market-data display
- `_archive/legacy-site-2026-08-07/`: recoverable copy of the previous interior pages
- `_config.yml`: Jekyll and SEO configuration

Deployment is handled automatically by GitHub Pages after a push to `master`.
