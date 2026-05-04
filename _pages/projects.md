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

.projects-intro {
  background: #111111;
  border-left: 4px solid #ff6c60;
  border-radius: 8px;
  padding: 1.4rem 1.6rem;
  margin-bottom: 3rem;
  color: #d0d0d0;
  line-height: 1.7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.category-section {
  margin-bottom: 4rem;
}

.category-header {
  font-size: 1.6em;
  font-weight: 700;
  color: #ff6c60;
  margin-bottom: 0.7rem;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid #ff6c60;
}

.category-description {
  color: #9f9f9f;
  line-height: 1.6;
  margin-bottom: 1.8rem;
  max-width: 900px;
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
  display: flex;
  flex-direction: column;
  height: 100%;
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
  color: #7a7a7a;
  font-size: 0.9em;
  margin-bottom: 1rem;
  font-style: italic;
  line-height: 1.5;
}

.project-description {
  color: #cccccc;
  line-height: 1.7;
  margin-bottom: 1.4rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.2rem 0;
}

.feature-item {
  padding: 0.55rem 0 0.55rem 1.2rem;
  margin-bottom: 0.45rem;
  border-left: 2px solid #333333;
  color: #b0b0b0;
  font-size: 0.95em;
  line-height: 1.6;
  transition: all 0.2s ease;
}

.feature-item:hover {
  border-left-color: #ff6c60;
  padding-left: 1.5rem;
  color: #ffffff;
}

.project-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #222222;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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

  <div class="projects-intro">
    Selected public repositories grouped by the type of problem they solve. This page is curated for quantitative research and trading roles: the emphasis is on market microstructure, pricing, forecasting, and production-minded engineering. Repositories with missing or placeholder documentation are intentionally omitted to keep the portfolio focused and high-signal.
  </div>

  <div class="category-section">
    <h2 class="category-header">Quant Trading &amp; Market Microstructure</h2>
    <div class="category-description">
      Execution-aware systems built around live crypto market data, order book analytics, and simulated trading logic.
    </div>

    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">Real-Time Market Data &amp; Market Making</div>
        <div class="project-meta">Personal project | Binance WebSocket streams | Streamlit dashboard + console engine</div>
        <div class="project-description">
          Built a live market microstructure dashboard and simulated market-making engine to study quoting logic, queue position, fill quality, and short-horizon risk on crypto order books.
        </div>
        <ul class="features-list">
          <li class="feature-item">Streams live order book and trade data, with spread statistics and configurable depth views</li>
          <li class="feature-item">Implements <code>mid</code>, <code>top</code>, <code>level</code>, <code>microprice</code>, and <code>queue_aware</code> quote placement modes</li>
          <li class="feature-item">Tracks adverse selection through 1s/5s/10s markout, queue diagnostics, and fill analytics</li>
          <li class="feature-item">Adds risk controls on inventory, notional exposure, volatility gating, and max loss</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Streamlit</span>
            <span class="tech-tag">WebSocket</span>
            <span class="tech-tag">Order Book</span>
            <span class="tech-tag">Queue Analytics</span>
            <span class="tech-tag">PnL Tracking</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Real_Time_Market_Data_And_MM_Logic" class="github-link">GitHub</a>
            <a href="https://mm-dashboard-microstructure.streamlit.app/" class="github-link">Live Demo</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Market Data Aggregation &amp; Paper Trading API</div>
        <div class="project-meta">Academic project | Paris Dauphine-PSL | Multi-exchange routing + paper trading</div>
        <div class="project-description">
          Built a multi-exchange crypto data router and paper-trading API that normalizes live feeds from Binance and OKX into a unified execution and monitoring layer.
        </div>
        <ul class="features-list">
          <li class="feature-item">Maintains persistent WebSocket connections to Binance Futures and OKX perpetual swaps</li>
          <li class="feature-item">Serves best touch, trades, klines, and EWMA streams through FastAPI and authenticated WebSocket endpoints</li>
          <li class="feature-item">Supports JWT auth, multi-asset balances, limit/market/IOC orders, and SQLite-backed persistence</li>
          <li class="feature-item">Detects cross-exchange negative spreads and surfaces simple arbitrage opportunities in the dashboard</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">FastAPI</span>
            <span class="tech-tag">WebSocket</span>
            <span class="tech-tag">JWT</span>
            <span class="tech-tag">SQLite</span>
            <span class="tech-tag">Paper Trading</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Market_Data_Aggregation_And_Paper_Trading_API" class="github-link">GitHub</a>
            <a href="https://market-data-aggregation-and-paper-trading-api.streamlit.app/" class="github-link">Live Demo</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="category-section">
    <h2 class="category-header">Derivatives Pricing &amp; Numerical Methods</h2>
    <div class="category-description">
      Pricing engines focused on model validation, numerical stability, Greeks, and interactive diagnostics.
    </div>

    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">Basket Option Pricing Engine</div>
        <div class="project-meta">Academic project | Paris Dauphine-PSL | C# / .NET 9</div>
        <div class="project-description">
          Designed a multi-asset basket option pricer combining analytical moment-matching and Monte Carlo reference pricing with real market data integration.
        </div>
        <ul class="features-list">
          <li class="feature-item">Implements Brigo-style moment matching plus a correlated Monte Carlo engine with control variates</li>
          <li class="feature-item">Supports both flat-parameter and term-structure frameworks, with ECB EURSTR and Bloomberg volatility inputs</li>
          <li class="feature-item">Achieves about 98.6% variance reduction in the reference Monte Carlo configuration</li>
          <li class="feature-item">Includes 15 automated tests covering pricing consistency, convergence, and economic properties</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">C#</span>
            <span class="tech-tag">.NET</span>
            <span class="tech-tag">Basket Options</span>
            <span class="tech-tag">Monte Carlo</span>
            <span class="tech-tag">Term Structure</span>
            <span class="tech-tag">Variance Reduction</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Basket_Option_Pricing_Engine_CSharp" class="github-link">GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Monte Carlo Option Pricing Engine</div>
        <div class="project-meta">Academic project | Paris Dauphine-PSL | Streamlit application</div>
        <div class="project-description">
          Built an interactive options pricer centered on Monte Carlo simulation, Longstaff-Schwartz for American exercise, and research-style diagnostics.
        </div>
        <ul class="features-list">
          <li class="feature-item">Prices European, binary, and American options with vectorized Monte Carlo and least-squares regression</li>
          <li class="feature-item">Computes Delta, Gamma, Vega, Theta, and Rho with Common Random Numbers and confidence intervals</li>
          <li class="feature-item">Benchmarks against Black-Scholes and a trinomial tree reference implementation</li>
          <li class="feature-item">Visualizes GBM paths, convergence rates, strike profiles, and payoff sensitivity in real time</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Monte Carlo</span>
            <span class="tech-tag">Longstaff-Schwartz</span>
            <span class="tech-tag">Greeks</span>
            <span class="tech-tag">Streamlit</span>
            <span class="tech-tag">Black-Scholes</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Monte_Carlo_Option_Pricing_Engine" class="github-link">GitHub</a>
            <a href="https://monte-carlo-option-pricing-engine.streamlit.app/" class="github-link">Live Demo</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Trinomial Tree Options Pricer</div>
        <div class="project-meta">Academic project | Paris Dauphine-PSL | Interactive pricing app</div>
        <div class="project-description">
          Implemented a trinomial tree pricer for European and American options with dividends, Greeks, and full tree visualization.
        </div>
        <ul class="features-list">
          <li class="feature-item">Recombining tree engine with discrete dividend handling and Black-Scholes comparison</li>
          <li class="feature-item">Computes Greeks numerically and exposes convergence, precision, and execution-time studies</li>
          <li class="feature-item">Adds pruning logic to manage node explosion and improve runtime on deep trees</li>
          <li class="feature-item">Ships as a Streamlit app with Plotly-based node inspection and CSV export</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Trinomial Tree</span>
            <span class="tech-tag">Greeks</span>
            <span class="tech-tag">Plotly</span>
            <span class="tech-tag">Dividends</span>
            <span class="tech-tag">Streamlit</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Trinomial_Tree_Options_Pricer_Engine" class="github-link">GitHub</a>
            <a href="https://trinomial-tree-options-pricer-verdelhan-lenet.streamlit.app/" class="github-link">Live Demo</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Trinomial Option Pricer in C#</div>
        <div class="project-meta">Academic project | Paris Dauphine-PSL | C# implementation</div>
        <div class="project-description">
          Translated and validated a Python trinomial pricer into C#, with a focus on numerical fidelity, speed, and cleaner object-oriented structure.
        </div>
        <ul class="features-list">
          <li class="feature-item">Prices European and American calls/puts with discrete dividends and full Greeks</li>
          <li class="feature-item">Converges to within 1 cent of Black-Scholes at 400 steps</li>
          <li class="feature-item">Runs large trees of roughly 80,000 nodes in under 2 seconds</li>
          <li class="feature-item">Uses a modular architecture around market, option, tree, node, Black-Scholes, and Greeks classes</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">C#</span>
            <span class="tech-tag">.NET</span>
            <span class="tech-tag">Trinomial Tree</span>
            <span class="tech-tag">Greeks</span>
            <span class="tech-tag">Numerical Validation</span>
            <span class="tech-tag">OOP</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Trinomial_Tree_Options_Pricer_Engine_CSharp" class="github-link">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="category-section">
    <h2 class="category-header">Econometrics, Forecasting &amp; Applied ML</h2>
    <div class="category-description">
      Mixed-frequency forecasting, financial machine learning, and time-series model comparison with an emphasis on methodology and validation.
    </div>

    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">GDP Forecasting with MIDAS Regressions</div>
        <div class="project-meta">Academic project | Paris Dauphine-PSL | Econometrics and macro forecasting</div>
        <div class="project-description">
          Replicated and extended ADL-MIDAS models to forecast quarterly US GDP using daily financial variables and mixed-frequency econometrics.
        </div>
        <ul class="features-list">
          <li class="feature-item">Reproduces the Andreou-Ghysels-Kourtellos framework with Exponential Almon weights and recursive out-of-sample forecasts</li>
          <li class="feature-item">Uses Bloomberg data across equities, rates, commodities, FX, and macro indicators</li>
          <li class="feature-item">Adds a two-beta lag/lead extension to separate past information from nowcast information</li>
          <li class="feature-item">Compares specifications with RMSFE-based evaluation and forecast-combination logic</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">MIDAS</span>
            <span class="tech-tag">Econometrics</span>
            <span class="tech-tag">Bloomberg</span>
            <span class="tech-tag">Macro Forecasting</span>
            <span class="tech-tag">Time Series</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/GDP_Forecasting_With_MIDAS_Regressions" class="github-link">GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Financial Allocation Performance Prediction</div>
        <div class="project-meta">Academic project | Paris Dauphine-PSL | ENS ChallengeData workflow</div>
        <div class="project-description">
          Built a notebook-based machine learning workflow to predict the sign of short-horizon allocation returns on anonymized panel data.
        </div>
        <ul class="features-list">
          <li class="feature-item">Uses leakage-safe chronological validation instead of random splits on time-dependent financial data</li>
          <li class="feature-item">Engineers features from 20-day return and signed-volume histories across 527k+ observations</li>
          <li class="feature-item">Compares Logistic Regression, dense nets, Random Forest, and LightGBM, with interpretability support</li>
          <li class="feature-item">Best rerun accuracy reaches 0.5246, while the final exported model favors LightGBM for a better generalization tradeoff</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">LightGBM</span>
            <span class="tech-tag">Random Forest</span>
            <span class="tech-tag">Panel Data</span>
            <span class="tech-tag">Feature Engineering</span>
            <span class="tech-tag">Time-Series ML</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Financial_Allocation_Performance_Prediction_ML" class="github-link">GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">Quantitative Time Series Modeling</div>
        <div class="project-meta">Academic project | EPF | Time-series workflow and diagnostics</div>
        <div class="project-description">
          Exploratory time-series project focused on data quality, feature engineering, model comparison, and quantitative evaluation rather than a single black-box model.
        </div>
        <ul class="features-list">
          <li class="feature-item">Studies trend, seasonality, anomalies, and residual structure on transactional sales data</li>
          <li class="feature-item">Compares naive baselines, ARIMA/SARIMA, and regression-style forecasting approaches</li>
          <li class="feature-item">Builds lag, rolling-statistic, and decomposition-based features</li>
          <li class="feature-item">Reports RMSE, MAE, and MAPE with attention to overfitting and robustness</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">ARIMA</span>
            <span class="tech-tag">Statsmodels</span>
            <span class="tech-tag">Forecasting</span>
            <span class="tech-tag">Feature Engineering</span>
            <span class="tech-tag">Diagnostics</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Quantitative_Time_Series_Modeling" class="github-link">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="category-section">
    <h2 class="category-header">Software Engineering &amp; Production Systems</h2>
    <div class="category-description">
      Supporting engineering projects that show API design, MLOps workflow thinking, deployment basics, and lower-level implementation discipline.
    </div>

    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">StackOverflow Tag Prediction - MLOps Pipeline</div>
        <div class="project-meta">Academic project | EPF | Production-oriented ML system</div>
        <div class="project-description">
          Turned a text classification problem into a small production-style ML platform with serving, orchestration, testing, and containerization.
        </div>
        <ul class="features-list">
          <li class="feature-item">Generates BERT embeddings and trains a neural classifier for multi-label tag prediction</li>
          <li class="feature-item">Serves inference through a FastAPI endpoint with typed request/response validation</li>
          <li class="feature-item">Orchestrates training and inference jobs with Airflow and Docker Compose</li>
          <li class="feature-item">Includes modular code, automated tests, and artifact versioning for repeatable runs</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">BERT</span>
            <span class="tech-tag">FastAPI</span>
            <span class="tech-tag">Airflow</span>
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">MLOps</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Stackoverflow_Tag_Prediction_ML_Pipeline" class="github-link">GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">C++ Matrix Library Project</div>
        <div class="project-meta">Personal project | C++17 | Numerical programming foundations</div>
        <div class="project-description">
          Implemented a compact matrix library in C++ to reinforce low-level numerical programming, testing discipline, and linear algebra fundamentals.
        </div>
        <ul class="features-list">
          <li class="feature-item">Supports matrix addition, multiplication, transpose, determinant, and matrix-vector products</li>
          <li class="feature-item">Uses row-major storage, dimension checks, and exception-safe APIs</li>
          <li class="feature-item">Compiles cleanly under strict flags with zero warnings</li>
          <li class="feature-item">Ships with basic and extended test suites plus small performance benchmarks</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">C++17</span>
            <span class="tech-tag">Linear Algebra</span>
            <span class="tech-tag">Testing</span>
            <span class="tech-tag">Numerical Methods</span>
            <span class="tech-tag">Makefile</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/Cpp_Matrix_Library_Project" class="github-link">GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card">
        <div class="project-title">DevOps Fullstack Deployment Project</div>
        <div class="project-meta">Academic project | Deployment and infrastructure workflow</div>
        <div class="project-description">
          Built and deployed a small full-stack environment to practice containerized backend delivery and service orchestration.
        </div>
        <ul class="features-list">
          <li class="feature-item">Containerizes PostgreSQL, a Java backend API, and an HTTP server acting as reverse proxy</li>
          <li class="feature-item">Manages services, networking, and startup flow with Docker Compose</li>
          <li class="feature-item">Covers persistence, environment variables, and container-to-container communication</li>
          <li class="feature-item">Demonstrates a foundation for shipping data or trading tools beyond local notebooks</li>
        </ul>
        <div class="project-footer">
          <div class="tech-tags">
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">Java</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">Docker Compose</span>
            <span class="tech-tag">Reverse Proxy</span>
            <span class="tech-tag">Deployment</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/theov07/DevOps_Fullstack_Deployment_Project" class="github-link">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
