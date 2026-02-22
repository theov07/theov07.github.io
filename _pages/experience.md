---
title: "Professional Experience"
permalink: /experience/
author_profile: false
---

<style>
.experience-container {
  max-width: 100%;
  margin: 2rem auto;
  padding: 2rem 0;
}

.experience-card {
  background: #1a1a1a;
  border-top: 5px solid #ff6c60;
  border-radius: 8px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(255, 108, 96, 0.2);
  border-top-width: 8px;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.company-info {
  flex: 1;
}

.company-name {
  font-size: 1.9em;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.3rem;
}

.role-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #ff6c60;
  margin-bottom: 0.5rem;
}

.experience-meta {
  color: #999999;
  font-size: 0.95em;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.experience-description {
  color: #cccccc;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05em;
}

.responsibilities-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.1em;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #333333;
}

.responsibility-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibility-item {
  padding: 1rem 0 1rem 1.5rem;
  margin-bottom: 0.8rem;
  border-left: 3px solid #444444;
  color: #e0e0e0;
  line-height: 1.6;
  transition: all 0.2s ease;
}

.responsibility-item:hover {
  border-left-color: #ff6c60;
  padding-left: 2rem;
  color: #ffffff;
}

.tech-stack {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333333;
}

.tech-label {
  font-weight: 600;
  color: #ffffff;
  margin-right: 1rem;
}

.tech-items {
  display: inline;
  color: #999999;
  font-size: 0.95em;
}

@media (max-width: 768px) {
  .experience-card {
    padding: 1.5rem;
  }
  
  .company-name {
    font-size: 1.5em;
  }
  
  .role-title {
    font-size: 1.1em;
  }
  
  .experience-header {
    flex-direction: column;
  }
}
</style>

<div class="experience-container">

  <div class="experience-card">
    <div class="experience-header">
      <div class="company-info">
        <h2 class="company-name">MYR - Private Investment Fund</h2>
        <div class="role-title">Quantitative Researcher</div>
        <div class="experience-meta">
          <span class="meta-item">Montpellier, France</span>
          <span class="meta-item">Aug 2024 – Jul 2025</span>
        </div>
      </div>
    </div>
    
    <div class="experience-description">
      Active market maker on Hyperliquid (DeFi LBO), developing proprietary quantitative strategies in digital asset markets.
    </div>
    
    <div class="responsibilities-section">
      <div class="section-title">Key Responsibilities & Achievements</div>
      <ul class="responsibility-list">
        <li class="responsibility-item">
          Designed and deployed short-horizon market-making strategies using L1/L2/L3 order book data, microprice signals, order book imbalance and FIFO queue dynamics to optimize execution probability and spread capture across 12 liquid crypto order books
        </li>
        <li class="responsibility-item">
          Developed microstructure-driven alpha signals from depth imbalance, order flow autocorrelation and spread dynamics, supported by event-time backtesting on 5+ years of tick-level data
        </li>
        <li class="responsibility-item">
          Implemented inventory risk control (Avellaneda–Stoikov inspired) and low-latency execution systems (&lt;100ms), optimizing quote refresh, queue positioning and mitigating adverse selection
        </li>
        <li class="responsibility-item">
          Modeled limit order book event arrivals using stochastic intensity frameworks (Poisson-type limit/market/cancel flows) to estimate short-term price pressure and fill probabilities while analyzing competing algorithmic trader behavior
        </li>
      </ul>
    </div>
    
    <div class="tech-stack">
      <span class="tech-label">Technical Stack:</span>
      <span class="tech-items">Python, NumPy, Pandas, WebSocket APIs, REST APIs, Linux</span>
    </div>
  </div>

  <div class="experience-card">
    <div class="experience-header">
      <div class="company-info">
        <h2 class="company-name">La Valériane - Investment Branch</h2>
        <div class="role-title">Quantitative Developer</div>
        <div class="experience-meta">
          <span class="meta-item">Montpellier, France</span>
          <span class="meta-item">Sep 2023 – Jan 2024</span>
        </div>
      </div>
    </div>
    
    <div class="experience-description">
      Designed and built an end-to-end delta-neutral statistical arbitrage strategy between Binance (CEX) and dYdX (DeFi DEX), targeting cross-venue microstructure inefficiencies.
    </div>
    
    <div class="responsibilities-section">
      <div class="section-title">Key Responsibilities & Achievements</div>
      <ul class="responsibility-list">
        <li class="responsibility-item">
          Reconstructed full L2 order books and built 2-year tick-level datasets to analyze cross-exchange price formation, latency asymmetries and liquidity distribution
        </li>
        <li class="responsibility-item">
          Developed arbitrage signals based on microprice deviations and depth-adjusted fair value estimators, incorporating slippage modeling and execution constraints
        </li>
        <li class="responsibility-item">
          Implemented, backtested and deployed the trading bot under realistic latency and partial-fill assumptions, achieving ~8% annualized returns with $800k–$1M daily volume while maintaining strict market neutrality
        </li>
      </ul>
    </div>
    
    <div class="tech-stack">
      <span class="tech-label">Technical Stack:</span>
      <span class="tech-items">Python, Binance API, dYdX API, NumPy, Pandas</span>
    </div>
  </div>

</div>
