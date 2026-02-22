---
permalink: /
title: ""
author_profile: true
---

<style>
.intro-section {
  text-align: center;
  padding: 2rem 0 3rem 0;
  max-width: 800px;
  margin: 0 auto;
}

.intro-section h1 {
  font-size: 2.5em;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.intro-section .subtitle {
  font-size: 1.2em;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 600;
}

.intro-section .tagline {
  font-size: 1em;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.navigation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  max-width: 1000px;
}

.nav-card {
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.nav-card:hover {
  border-color: #000000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-4px);
}

.nav-card h2 {
  font-size: 1.5em;
  margin-bottom: 0.8rem;
  color: #000000;
}

.nav-card p {
  color: #cccccc;
  font-size: 0.95em;
  line-height: 1.5;
  margin: 0;
}

.contact-section {
  text-align: center;
  margin: 3rem 0 2rem 0;
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 8px;
}

.contact-section h3 {
  color: #ffffff;
  margin-bottom: 1rem;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.contact-links a {
  color: #6699ff;
  text-decoration: none;
  font-weight: 500;
}

.contact-links a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .navigation-grid {
    grid-template-columns: 1fr;
  }
  
  .intro-section h1 {
    font-size: 2em;
  }
}
</style>

<div class="intro-section">
  <div class="subtitle">Aspiring Quantitative Researcher</div>
  <div class="tagline">
    MSc Financial Engineering Student at Paris Dauphine–PSL
    <br>
    Computer Science & AI Graduate from EPF (Top 3%)
    <br>
    Specialized in market microstructure, systematic trading, and derivatives pricing
  </div>
</div>

<div class="navigation-grid">
  <a href="/education/" class="nav-card">
    <h2>Education</h2>
  </a>
  
  <a href="/experience/" class="nav-card">
    <h2>Experience</h2>
  </a>
  
  <a href="/projects/" class="nav-card">
    <h2>Projects</h2>
  </a>
  
  <a href="/portfolio/" class="nav-card">
    <h2>Portfolio</h2>
  </a>
</div>

