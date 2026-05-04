---
title: "Professional Experiences"
permalink: /professional-experiences/
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
        <h2 class="company-name">MYR</h2>
        <div class="role-title">Quantitative Researcher</div>
        <div class="experience-meta">
          <span class="meta-item">Montpellier, Occitanie, France</span>
          <span class="meta-item">Jul 2024 – Aug 2025</span>
          <span class="meta-item">Apprenticeship</span>
        </div>
      </div>
    </div>
    
    <div class="experience-description">
      Contributed to quantitative research, market analysis, and trading system monitoring within an active market maker on Hyperliquid.
    </div>
    
    <div class="responsibilities-section">
      <div class="section-title">Key Responsibilities & Achievements</div>
      <ul class="responsibility-list">
        <li class="responsibility-item">
          Researched short-horizon market signals using L1/L2/L3 order book data, microprice, imbalance, and execution metrics across 12 liquid crypto markets
        </li>
        <li class="responsibility-item">
          Built internal Python tools and monitoring scripts using APIs and WebSocket feeds to track positions, hedging activity, market deviations, daily trading volume, PnL, execution quality, and competing market participant behavior in real time
        </li>
        <li class="responsibility-item">
          Analyzed multi-year tick-level datasets and high-frequency market data to study order book dynamics, fill behavior, and short-term price reactions
        </li>
        <li class="responsibility-item">
          Supported live strategy evaluation and operational monitoring on blockchain-based markets, improving risk oversight, execution follow-up, and internal trading workflows
        </li>
      </ul>
    </div>
    
    <div class="tech-stack">
      <span class="tech-label">Technical Stack:</span>
      <span class="tech-items">Python, APIs, WebSocket feeds, Market microstructure, Tick data, Monitoring tools</span>
    </div>
  </div>

  <div class="experience-card">
    <div class="experience-header">
      <div class="company-info">
        <h2 class="company-name">La Valériane</h2>
        <div class="role-title">Quantitative Developer</div>
        <div class="experience-meta">
          <span class="meta-item">Montpellier, Occitanie, France</span>
          <span class="meta-item">Sep 2023 – Jan 2024</span>
          <span class="meta-item">Internship</span>
        </div>
      </div>
    </div>
    
    <div class="experience-description">
      Built and deployed a cross-exchange arbitrage strategy between Binance (CEX) and dYdX (DeFi DEX), covering data collection, backtesting, execution logic, and live monitoring.
    </div>
    
    <div class="responsibilities-section">
      <div class="section-title">Key Responsibilities & Achievements</div>
      <ul class="responsibility-list">
        <li class="responsibility-item">
          Reconstructed tick-level and L1/L2 order book datasets over one year to analyze cross-exchange spreads, liquidity conditions, and trading frictions
        </li>
        <li class="responsibility-item">
          Developed and backtested arbitrage signals using price deviations and order book information, with slippage assumptions, execution costs, and realistic entry/exit rules
        </li>
        <li class="responsibility-item">
          Ran the strategy on a 24/7 server and developed Python monitoring and alert scripts to track bot activity, market conditions, and execution quality
        </li>
      </ul>
    </div>
    
    <div class="tech-stack">
      <span class="tech-label">Technical Stack:</span>
      <span class="tech-items">Python, Binance API, dYdX API, WebSocket, Backtesting, Monitoring scripts</span>
    </div>
  </div>

</div>
