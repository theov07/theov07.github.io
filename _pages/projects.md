---
title: "Projects"
permalink: /projects/
author_profile: false
---

<style>
.projects-container {
  max-width: 100%;
  margin: 2rem auto;
  padding: 2rem 0;
}

.category-section {
  margin-bottom: 4rem;
}

.category-header {
  font-size: 1.6em;
  font-weight: 700;
  color: #ff6c60;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid #ff6c60;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.project-card {
  background: #0a0a0a;
  border-right: 5px solid #ff6c60;
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.project-card:hover {
  transform: translateX(-8px);
  box-shadow: 0 8px 20px rgba(255, 108, 96, 0.25);
  border-right-width: 8px;
  background: #111111;
}

.project-title {
  font-size: 1.4em;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.project-meta {
  color: #666666;
  font-size: 0.9em;
  margin-bottom: 1rem;
  font-style: italic;
}

.project-description {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.feature-item {
  padding: 0.5rem 0 0.5rem 1.2rem;
  margin-bottom: 0.5rem;
  border-left: 2px solid #333333;
  color: #b0b0b0;
  font-size: 0.95em;
  transition: all 0.2s ease;
}

.feature-item:hover {
  border-left-color: #ff6c60;
  padding-left: 1.5rem;
  color: #ffffff;
}

.project-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #222222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #1a1a1a;
  color: #999999;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85em;
  border: 1px solid #333333;
}

.github-link {
  color: #ff6c60;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9em;
  transition: color 0.2s ease;
}

.github-link:hover {
  color: #ff8a80;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-card {
    padding: 1.5rem;
  }
  
  .category-header {
    font-size: 1.3em;
  }
}
</style>

<div class="projects-container">

  <!-- Trading Systems & Market Microstructure -->
  <div class="category-section">
    <h2 class="category-header">Trading Systems & Market Microstructure</h2>
    
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">DeFi Market Making — Hyperliquid</div>
        <div class="project-meta">Aug 2024 – Jul 2025</div>
        <div class="project-description">
          Built short-horizon market-making strategies driven by order-book microstructure, dynamic spreads, and inventory risk control.
        </div>
        <ul class="features-list">
          <li class="feature-item">L1/L2/L3 order book data analysis</li>
          <li class="feature-item">Microprice signals and order flow indicators</li>
          <li class="feature-item">Event-time backtesting on 5+ years of tick-level data</li>
          <li class="feature-item">Low-latency execution infrastructure (&lt;100ms)</li>
          <li class="feature-item">Stochastic intensity modeling for limit order book events</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">WebSocket APIs</span>
            <span class="tech-tag">NumPy</span>
            <span class="tech-tag">Pandas</span>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">CEX–DEX Statistical Arbitrage</div>
        <div class="project-meta">Sep 2023 – Jan 2024</div>
        <div class="project-description">
          Developed a delta-neutral stat-arb system between a centralized exchange and a decentralized derivatives venue.
        </div>
        <ul class="features-list">
          <li class="feature-item">Full L2 order book reconstruction</li>
          <li class="feature-item">2-year tick-level dataset construction</li>
          <li class="feature-item">Microprice deviation signals</li>
          <li class="feature-item">~8% annualized returns with $800k–$1M daily volume</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Binance API</span>
            <span class="tech-tag">dYdX API</span>
          </div>
          <a href="https://github.com/theov07/Cross_EMA_Crypto_Trading_Bot" class="github-link">View on GitHub →</a>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Avellaneda–Stoikov Market Making</div>
        <div class="project-meta">Jan 2024 – Jun 2024</div>
        <div class="project-description">
          Implemented an Avellaneda–Stoikov-style framework with volatility-adaptive spreads and risk controls.
        </div>
        <ul class="features-list">
          <li class="feature-item">Volatility-adaptive spread adjustment</li>
          <li class="feature-item">Inventory-based quote skewing</li>
          <li class="feature-item">Backtested 10M+ trades on DeFi order-book data</li>
          <li class="feature-item">Reduced adverse selection by ~9%</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">NumPy</span>
            <span class="tech-tag">Pandas</span>
          </div>
          <a href="https://github.com/theov07/TRADING_COMPETITION_XTREM_BOT" class="github-link">View on GitHub →</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Derivatives Pricing & Quantitative Finance -->
  <div class="category-section">
    <h2 class="category-header">Derivatives Pricing & Quantitative Finance</h2>
    
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">Multi-Asset Basket Option Pricing</div>
        <div class="project-meta">Personal Project</div>
        <div class="project-description">
          Production-grade pricing engine for multi-asset derivatives combining analytical methods and Monte Carlo simulation.
        </div>
        <ul class="features-list">
          <li class="feature-item">Analytical moment-matching (Brigo et al.)</li>
          <li class="feature-item">Monte Carlo with control variate variance reduction</li>
          <li class="feature-item">Term structure modeling with full correlation matrices</li>
          <li class="feature-item">Real market data integration (ECB €STR, Bloomberg)</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">C#</span>
            <span class="tech-tag">Monte Carlo</span>
            <span class="tech-tag">Numerical Methods</span>
          </div>
          <a href="https://github.com/theov07/Basket_Option_Pricing_Engine_CSharp" class="github-link">View on GitHub →</a>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Trinomial Tree Option Pricer</div>
        <div class="project-meta">Sep 2025 – Dec 2025</div>
        <div class="project-description">
          Built a trinomial tree engine for European & American options with early exercise logic and Greeks.
        </div>
        <ul class="features-list">
          <li class="feature-item">European and American option pricing</li>
          <li class="feature-item">Greeks computation (Delta, Gamma, Theta, Vega, Rho)</li>
          <li class="feature-item">Black–Scholes convergence validation</li>
          <li class="feature-item">Lightweight API for pricing and diagnostics</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">NumPy</span>
            <span class="tech-tag">SciPy</span>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">GDP Forecasting with MIDAS</div>
        <div class="project-meta">Nov 2025 – Jan 2026</div>
        <div class="project-description">
          Replicated and extended MIDAS regressions for GDP nowcasting using mixed-frequency financial data.
        </div>
        <ul class="features-list">
          <li class="feature-item">MIDAS models with separate lag/lead dynamics</li>
          <li class="feature-item">Daily financial data to forecast quarterly GDP</li>
          <li class="feature-item">Out-of-sample evaluation</li>
          <li class="feature-item">Research-grade implementation</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Statsmodels</span>
            <span class="tech-tag">Pandas</span>
          </div>
          <a href="https://github.com/theov07/GDP_Forecasting_With_MIDAS_Regressions" class="github-link">View on GitHub →</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Machine Learning & Data Science -->
  <div class="category-section">
    <h2 class="category-header">Machine Learning & Data Science</h2>
    
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">LSTM Stock Price Forecaster</div>
        <div class="project-meta">Personal Project</div>
        <div class="project-description">
          Built a deep learning model for short-horizon financial time-series forecasting.
        </div>
        <ul class="features-list">
          <li class="feature-item">LSTM architecture for sequential data</li>
          <li class="feature-item">Feature engineering from historical price and volume</li>
          <li class="feature-item">Technical indicators integration</li>
          <li class="feature-item">Out-of-sample performance evaluation</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">PyTorch</span>
            <span class="tech-tag">NumPy</span>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">StackOverflow Tag Prediction</div>
        <div class="project-meta">Personal Project</div>
        <div class="project-description">
          End-to-end machine learning pipeline for multi-label text classification.
        </div>
        <ul class="features-list">
          <li class="feature-item">Natural language processing</li>
          <li class="feature-item">Multi-label classification</li>
          <li class="feature-item">Feature extraction and engineering</li>
          <li class="feature-item">Production-ready pipeline design</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Scikit-learn</span>
            <span class="tech-tag">NLP</span>
          </div>
          <a href="https://github.com/theov07/Stackoverflow_Tag_Prediction_ML_Pipeline" class="github-link">View on GitHub →</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Infrastructure & Data Engineering -->
  <div class="category-section">
    <h2 class="category-header">Infrastructure & Data Engineering</h2>
    
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">Market Data Aggregation System</div>
        <div class="project-meta">Personal Project</div>
        <div class="project-description">
          Built a comprehensive market data aggregation system with paper trading capabilities.
        </div>
        <ul class="features-list">
          <li class="feature-item">Real-time data aggregation from multiple sources</li>
          <li class="feature-item">Paper trading engine for strategy testing</li>
          <li class="feature-item">Data storage and retrieval infrastructure</li>
          <li class="feature-item">WebSocket and REST API integration</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">APIs</span>
            <span class="tech-tag">Data Engineering</span>
          </div>
          <a href="https://github.com/theov07/Market_Data_Aggregation_And_Paper_Trading" class="github-link">View on GitHub →</a>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">DevOps Fullstack Deployment</div>
        <div class="project-meta">Personal Project</div>
        <div class="project-description">
          Full-stack application deployment with modern DevOps practices.
        </div>
        <ul class="features-list">
          <li class="feature-item">Docker containerization</li>
          <li class="feature-item">CI/CD pipeline implementation</li>
          <li class="feature-item">Infrastructure as Code</li>
          <li class="feature-item">Cloud deployment</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">Git</span>
            <span class="tech-tag">Linux</span>
          </div>
          <a href="https://github.com/theov07/DevOps_Fullstack_Deployment_Project" class="github-link">View on GitHub →</a>
        </div>
      </div>
    </div>
  </div>

</div>