---
permalink: /
title: "Théo Verdelhan"
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
  color: #000;
}

.intro-section .subtitle {
  font-size: 1.2em;
  color: #404040;
  margin-bottom: 1rem;
}

.intro-section .tagline {
  font-size: 1em;
  color: #666;
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
  border-color: #000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-4px);
}

.nav-card h2 {
  font-size: 1.5em;
  margin-bottom: 0.8rem;
  color: #000;
}

.nav-card p {
  color: #666;
  font-size: 0.95em;
  line-height: 1.5;
  margin: 0;
}

.contact-section {
  text-align: center;
  margin: 3rem 0 2rem 0;
  padding: 2rem;
  background: #fafafa;
  border-radius: 8px;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.contact-links a {
  color: #0000ff;
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
  <h1>Théo Verdelhan</h1>
  <div class="subtitle">Quantitative Researcher</div>
  <div class="tagline">
    MSc Financial Engineering (Paris Dauphine–PSL) | Computer Science & AI (EPF, Top 3%)
    <br>
    Specialized in market microstructure, systematic trading, and derivatives pricing
  </div>
</div>

<div class="navigation-grid">
  <a href="/cv/" class="nav-card">
    <h2>Professional Profile</h2>
    <p>Education, experience, skills, and comprehensive CV</p>
  </a>
  
  <a href="#experience-section" class="nav-card">
    <h2>Experience</h2>
    <p>Quantitative research and development positions in crypto markets</p>
  </a>
  
  <a href="/projects/" class="nav-card">
    <h2>Projects</h2>
    <p>Trading systems, pricing engines, and quantitative research</p>
  </a>
  
  <a href="/portfolio/" class="nav-card">
    <h2>Portfolio</h2>
    <p>Detailed case studies and technical implementations</p>
  </a>
</div>

<div class="contact-section">
  <h3>Contact</h3>
  <div class="contact-links">
    <a href="mailto:theo.verdelhan@dauphine.eu">Email</a>
    <a href="https://www.linkedin.com/in/theoverdelhan/" target="_blank">LinkedIn</a>
    <a href="https://github.com/theov07" target="_blank">GitHub</a>
    <a href="/files/CV_VERDELHAN_THEO_DAUPHINE_PSL.pdf" target="_blank">Download CV</a>
  </div>
</div>

---

<div id="experience-section"></div>

## Professional Experience

### Quantitative Researcher — MYR (Private Investment Fund)
**Montpellier, France | Aug 2024 – Jul 2025**

Active market maker on Hyperliquid (DeFi), developing proprietary quantitative strategies in digital asset markets.

- Designed and deployed short-horizon market-making strategies using L1/L2/L3 order book data, microprice signals, order book imbalance and FIFO queue dynamics
- Developed microstructure-driven alpha signals from depth imbalance, order flow autocorrelation and spread dynamics
- Implemented inventory risk control (Avellaneda–Stoikov inspired) and low-latency execution systems (<100ms)
- Modeled limit order book event arrivals using stochastic intensity frameworks

### Quantitative Developer — La Valériane (Investment Branch)
**Montpellier, France | Sep 2023 – Jan 2024**

Designed and built an end-to-end delta-neutral statistical arbitrage strategy between Binance (CEX) and dYdX (DeFi DEX).

- Reconstructed full L2 order books and built 2-year tick-level datasets
- Developed arbitrage signals based on microprice deviations and depth-adjusted fair value estimators
- Achieved ~8% annualized returns with $800k–$1M daily volume while maintaining strict market neutrality

---

## Education

**Paris Dauphine University – PSL**  
MSc in Financial Engineering – Quantitative Finance Track (Program 272)  
Sep 2025 – Jun 2026

**EPF Graduate School of Engineering**  
Master in Computer Science – Data & AI Track | Rank: 8/157  
Sep 2020 – Jun 2025