---
title: "Selected Projects"
permalink: /projects/
author_profile: false
---

<div class="page-intro">
  <p class="eyebrow">Research · Trading systems · Numerical finance</p>
</div>

<section class="project-section">
  <header class="section-heading">
    <p class="eyebrow">01</p>
    <div>
      <h2>Trading &amp; Market Microstructure</h2>
      <p>Order books, execution constraints, competitive research and real-time market systems.</p>
    </div>
  </header>

  <div class="project-grid">
    <article class="project-card project-card--featured">
      <div class="project-card__meta">Competition · Apr–May 2026</div>
      <h3>IMC Prosperity 4</h3>
      <p>Built a shared Python framework with a three-person team for backtesting, diagnostics and multi-round research across market making, relative value and volatility strategies.</p>
      <ul class="compact-list">
        <li>Round 1 algorithmic ranking: #77 worldwide and #1 in France</li>
        <li>Final algorithmic ranking: #514 worldwide and #17 in France among about 20,000 teams</li>
        <li>Explored microstructure, volatility, game theory, Bayesian mixtures and Monte Carlo models under tight iteration cycles</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>Python</span><span>Market Making</span><span>Relative Value</span><span>Game Theory</span></div>
        <a href="https://github.com/theov07/IMC_PROSPERITY_4_COMPETITION" target="_blank" rel="noopener noreferrer">Repository ↗</a>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">Public project · Apr 2026</div>
      <h3>Real-Time Market Data &amp; Market Making</h3>
      <p>Python and Streamlit simulator using Binance WebSocket data to study quoting, queue position, fill quality and short-horizon risk.</p>
      <ul class="compact-list">
        <li>Live order-book and trade visualization with configurable depth</li>
        <li>Microprice and queue-aware quoting with 1s/5s/10s markouts</li>
        <li>Inventory, notional, volatility and max-loss controls</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>Python</span><span>WebSocket</span><span>Streamlit</span><span>Order Book</span></div>
        <div class="link-row">
          <a href="https://github.com/theov07/Real_Time_Market_Data_And_MM_Logic" target="_blank" rel="noopener noreferrer">Repository ↗</a>
          <a href="https://mm-dashboard-microstructure.streamlit.app/" target="_blank" rel="noopener noreferrer">Live demo ↗</a>
        </div>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">Public project · Apr–Jun 2026</div>
      <h3>C++17 Simulated Trading Platform</h3>
      <p>Event-driven trading simulator covering order-book reconstruction, strategy execution, portfolio accounting and post-trade analysis.</p>
      <ul class="compact-list">
        <li>Limit-order book and matching engine with market and limit orders</li>
        <li>Position limits, all-or-nothing execution and P&amp;L tracking</li>
        <li>Momentum, mean-reversion and moving-average strategies with CSV reporting and a Streamlit dashboard</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>C++17</span><span>Matching Engine</span><span>Risk Controls</span><span>Backtesting</span></div>
        <a href="https://github.com/theov07/CPP_Simulated_Trading_Platform" target="_blank" rel="noopener noreferrer">Repository ↗</a>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">Academic project · Jan–Mar 2026</div>
      <h3>Market Data Aggregation &amp; Paper Trading API</h3>
      <p>Normalized Binance Futures and OKX perpetual feeds behind FastAPI REST and WebSocket endpoints, with a secured paper-trading layer.</p>
      <ul class="compact-list">
        <li>Asynchronous ingestion with heartbeat monitoring and exponential-backoff reconnection</li>
        <li>JWT authentication, balances, reserved funds and SQLite persistence</li>
        <li>Market, limit and IOC orders with modification and cancellation workflows</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>FastAPI</span><span>WebSocket</span><span>JWT</span><span>SQLite</span></div>
        <div class="link-row">
          <a href="https://github.com/theov07/Market_Data_Aggregation_And_Paper_Trading_API" target="_blank" rel="noopener noreferrer">Repository ↗</a>
          <a href="https://market-data-aggregation-and-paper-trading-api.streamlit.app/" target="_blank" rel="noopener noreferrer">Live demo ↗</a>
        </div>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">EPF capstone · Feb–Jun 2024</div>
      <h3>Algorithmic Trading Systems</h3>
      <p>Led a six-person team developing an Avellaneda–Stoikov market-making framework with volatility-adaptive spreads and inventory controls.</p>
      <ul class="compact-list">
        <li>Backtested more than 10 million trades on Hyperliquid</li>
        <li>Reduced adverse selection by about 9% in the tested framework</li>
        <li>Stabilized P&amp;L variance by 7% in backtesting</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>Market Making</span><span>Avellaneda–Stoikov</span><span>Leadership</span><span>Backtesting</span></div>
      </div>
    </article>
  </div>
</section>

<section class="project-section">
  <header class="section-heading">
    <p class="eyebrow">02</p>
    <div>
      <h2>Quantitative Research</h2>
      <p>Signal validation, asynchronous data, volatility modeling, econometrics and financial machine learning.</p>
    </div>
  </header>

  <div class="project-grid">
    <article class="project-card project-card--featured">
      <div class="project-card__meta">Research project · Mar–May 2026</div>
      <h3>Multi-Scale Lead–Lag in High-Frequency Markets</h3>
      <p>Implemented the Hayashi–Koike multi-scale lead–lag estimator for asynchronous cryptocurrency tick data.</p>
      <ul class="compact-list">
        <li>Combined Hayashi–Yoshida covariance with Daubechies wavelet filtering</li>
        <li>Built validation tests and reproducible experimental artifacts</li>
        <li>Applied the pipeline to Binance, Kraken and Bybit BTC/ETH data to study scale-dependent price discovery</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>High-Frequency Data</span><span>Lead–Lag</span><span>Wavelets</span><span>Python</span></div>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">Research project · Mar–May 2026</div>
      <h3>Realized Volatility Timing for Short-Volatility Carry</h3>
      <p>Estimated latent realized volatility with a Heston state-space model and Unscented Kalman Filter, then tested dynamic short-volatility allocations.</p>
      <ul class="compact-list">
        <li>Rolling calibration on daily returns</li>
        <li>Signal based on the ATM implied-versus-estimated-realized volatility spread</li>
        <li>SPY and AAPL one-week strangle backtests against static and 21-day realized-volatility rules</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>Heston</span><span>UKF</span><span>Volatility</span><span>Options</span></div>
        <a href="https://github.com/theov07/Volatility_Timing_Short_Volatility_Carry" target="_blank" rel="noopener noreferrer">Repository ↗</a>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">Academic project · Nov 2025–Jan 2026</div>
      <h3>GDP Forecasting with MIDAS Regressions</h3>
      <p>Forecasted US real GDP growth from 47 daily multi-asset series over 1986–2025 using mixed-frequency econometrics.</p>
      <ul class="compact-list">
        <li>ADL-MIDAS with exponential Almon weights and PCA factor extraction</li>
        <li>Expanding-window pseudo out-of-sample evaluation using RMSFE and MAE</li>
        <li>Two-parameter extension separating lag and lead dynamics</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>MIDAS</span><span>Econometrics</span><span>PCA</span><span>Forecasting</span></div>
        <a href="https://github.com/theov07/GDP_Forecasting_With_MIDAS_Regressions" target="_blank" rel="noopener noreferrer">Repository ↗</a>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">QRT competition project · Mar–Apr 2026</div>
      <h3>Financial Allocation Performance Prediction</h3>
      <p>Built a leakage-safe panel time-series workflow on returns, signed volumes and liquidity variables.</p>
      <ul class="compact-list">
        <li>Chronological validation across more than 527,000 observations</li>
        <li>Compared Logistic Regression, Random Forest, LightGBM and MLP models</li>
        <li>Reached about 52.5% validation accuracy and added feature-importance and SHAP analysis</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>LightGBM</span><span>Panel Data</span><span>SHAP</span><span>Validation</span></div>
        <a href="https://github.com/theov07/Financial_Allocation_Performance_Prediction_ML" target="_blank" rel="noopener noreferrer">Repository ↗</a>
      </div>
    </article>
  </div>
</section>

<section class="project-section">
  <header class="section-heading">
    <p class="eyebrow">03</p>
    <div>
      <h2>Derivatives Pricing</h2>
      <p>Model calibration, Monte Carlo methods, numerical validation and portfolio-level risk aggregation.</p>
    </div>
  </header>

  <div class="project-grid">
    <article class="project-card project-card--featured">
      <div class="project-card__meta">Research &amp; engineering project · Mar–May 2026</div>
      <h3>Structured Products Pricing Engine</h3>
      <p>Built a Python pricing and risk engine covering fixed income, vanilla and exotic derivatives, and structured products.</p>
      <ul class="compact-list">
        <li>Bonds, swaps, barriers, autocalls, reverse convertibles and capital-protected notes</li>
        <li>Nelson–Siegel USD/EUR zero curves and Black–Scholes, Heston and SABR volatility models</li>
        <li>Portfolio aggregation of market value, P&amp;L, Greeks and maturity-by-strike risk in Streamlit</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>Python</span><span>Heston</span><span>SABR</span><span>Structured Products</span></div>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">Public project · Jan–Mar 2026</div>
      <h3>Monte Carlo Option Pricing Engine</h3>
      <p>Modular pricer for European and American vanilla options with research-style numerical diagnostics.</p>
      <ul class="compact-list">
        <li>Vectorized Monte Carlo and Longstaff–Schwartz regression</li>
        <li>Antithetic variates and Common-Random-Number finite-difference Greeks</li>
        <li>Confidence intervals and convergence against Black–Scholes and trinomial trees</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>Monte Carlo</span><span>Longstaff–Schwartz</span><span>Greeks</span><span>Streamlit</span></div>
        <div class="link-row">
          <a href="https://github.com/theov07/Monte_Carlo_Option_Pricing_Engine" target="_blank" rel="noopener noreferrer">Repository ↗</a>
          <a href="https://monte-carlo-option-pricing-engine.streamlit.app/" target="_blank" rel="noopener noreferrer">Live demo ↗</a>
        </div>
      </div>
    </article>

    <article class="project-card">
      <div class="project-card__meta">C# project · Oct–Dec 2025</div>
      <h3>Multi-Asset Basket Option Pricing Engine</h3>
      <p>Combined analytical moment matching and correlated Monte Carlo simulation for multi-asset basket options.</p>
      <ul class="compact-list">
        <li>Full correlation support with Cholesky path generation and Greeks</li>
        <li>Control variates producing about 98.6% variance reduction in the reference configuration</li>
        <li>ECB €STR and Bloomberg volatility inputs with automated convergence tests</li>
      </ul>
      <div class="project-card__footer">
        <div class="tag-list"><span>C#</span><span>Basket Options</span><span>Monte Carlo</span><span>Control Variates</span></div>
        <a href="https://github.com/theov07/Basket_Option_Pricing_Engine_CSharp" target="_blank" rel="noopener noreferrer">Repository ↗</a>
      </div>
    </article>
  </div>
</section>
