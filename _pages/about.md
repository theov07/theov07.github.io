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
  margin-left: 15%;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 3rem auto;
  max-width: 800px;
  margin-left: 25%;
}

.nav-card {
  background: #1a1a1a;
  border-left: 4px solid #ff6c60;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #ffffff !important;
  display: block;
  box-shadow: 0 4px 12px rgba(255, 108, 96, 0.1);
}

.nav-card:hover {
  transform: translateX(8px);
  box-shadow: 0 6px 16px rgba(255, 108, 96, 0.2);
  border-left-width: 6px;
}

.nav-card h2 {
  font-size: 1.5em;
  margin-bottom: 0;
  color: #ffffff !important;
  border-bottom: none !important;
  padding-bottom: 0 !important;
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
    Computer Science & AI Graduate from EPF
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

