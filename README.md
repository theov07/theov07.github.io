# Théo Verdelhan — Quantitative Research Portfolio

Personal website published at [theov07.github.io](https://theov07.github.io).

The site is built with Jekyll and GitHub Pages. Its public content is intentionally limited to:

- professional experience;
- education;
- selected quantitative research and engineering projects;
- an HTML resume and downloadable one-page PDF.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Content structure

- `_pages/about.md`: homepage
- `_pages/experience.md`: professional experience
- `_pages/education.md`: academic background
- `_pages/projects.md`: selected projects and competitions
- `_pages/cv.md`: web resume
- `_sass/_custom.scss`: site-specific visual system
- `_config.yml`: Jekyll and SEO configuration

Deployment is handled automatically by GitHub Pages after a push to `master`.
