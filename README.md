# Théo Verdelhan — Quantitative Research Portfolio

Personal website published at [theov07.github.io](https://theov07.github.io).

The site is built with Jekyll and GitHub Pages. Its public content is intentionally limited to:

- experience;
- education;
- detailed quantitative research case studies;
- selected quantitative research and engineering projects;
- an HTML resume and downloadable one-page PDF.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Content structure

- `_pages/home.html`: live-market homepage and portfolio navigation
- `_pages/experience.md`: experience
- `_pages/education.md`: academic background
- `_pages/research-preview*.html`: public research hub and detailed case studies
- `_pages/projects.md`: selected projects and competitions
- `_pages/cv.md`: web resume
- `assets/css/orderbook-preview.css`: homepage visual system
- `assets/js/orderbook-preview.js`: live order book and paper-execution dashboard
- `_sass/_custom.scss`: site-specific visual system
- `_config.yml`: Jekyll and SEO configuration

Deployment is handled automatically by GitHub Pages after a push to `master`.
