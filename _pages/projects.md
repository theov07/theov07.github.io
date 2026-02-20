---
title: "Projects"
permalink: /projects/
author_profile: true
---

## Production Trading Systems

### DeFi Market Making — Hyperliquid (MYR)
*Aug 2024 – Jul 2025 | Python*

Active market maker on Hyperliquid (DeFi LBO), developing proprietary quantitative strategies in digital asset markets.

**Key Features:**
- Built **short-horizon market-making strategies** using L1/L2/L3 order book data, microprice signals, order book imbalance and FIFO queue dynamics
- Developed **microstructure-driven alpha signals** from depth imbalance, order flow autocorrelation and spread dynamics
- Implemented **inventory risk control** (Avellaneda–Stoikov inspired) with <100ms latency
- Modeled **limit order book event arrivals** using stochastic intensity frameworks (Poisson-type flows)
- Event-time backtesting on **5+ years of tick-level data** across **12 crypto assets**

**Technologies:** Python, WebSocket APIs, REST APIs, NumPy, Pandas

**GitHub:** [View Repository](https://github.com/theov07)

---

### CEX–DEX Delta-Neutral Statistical Arbitrage (La Valériane)
*Sep 2023 – Jan 2024 | Python*

Designed and built an end-to-end delta-neutral statistical arbitrage strategy between Binance (CEX) and dYdX (DeFi DEX), targeting cross-venue microstructure inefficiencies.

**Key Features:**
- Reconstructed **full L2 order books** and built **2-year tick-level datasets**
- Developed **arbitrage signals** based on microprice deviations and depth-adjusted fair value estimators
- Implemented slippage modeling and execution constraints
- Achieved **~8% annualized returns** with **$800k–$1M daily volume**
- Maintained strict market neutrality throughout operations

**Technologies:** Python, Binance API, dYdX API, NumPy, Pandas

**GitHub:** [Cross_EMA_Crypto_Trading_Bot](https://github.com/theov07/Cross_EMA_Crypto_Trading_Bot)

---

## Academic & Research Projects

### Multi-Asset Basket Option Pricing Engine
*Personal Project | C#*

Production-grade pricing engine for multi-asset derivatives combining analytical methods and Monte Carlo simulation.

**Key Features:**
- Analytical moment-matching (Brigo et al.) combined with **Monte Carlo simulation**
- **Control variate variance reduction** techniques for improved accuracy
- Term structure modeling with full correlation matrices
- Real market data integration (ECB €STR, Bloomberg volatility surfaces)
- Supports European and exotic multi-asset options

**Technologies:** C#, Monte Carlo methods, numerical optimization

**GitHub:** [Basket_Option_Pricing_Engine_CSharp](https://github.com/theov07/Basket_Option_Pricing_Engine_CSharp)

---

### GDP Forecasting with MIDAS Regressions
*Nov 2025 – Jan 2026 | Paris Dauphine University | Python*

Replicated and extended MIDAS (Mixed Data Sampling) regressions for GDP nowcasting using mixed-frequency financial data.

**Key Features:**
- Implemented MIDAS models with **separate lag/lead dynamics**
- Used **daily financial data** to forecast quarterly GDP
- Research-grade Python implementation
- **Out-of-sample evaluation** and performance benchmarking
- Lag/lead structure optimization

**Technologies:** Python, Statsmodels, NumPy, Pandas, Time Series Analysis

**GitHub:** [GDP_Forecasting_With_MIDAS_Regressions](https://github.com/theov07/GDP_Forecasting_With_MIDAS_Regress...)

---

### Trinomial Tree Option Pricer
*Sep 2025 – Dec 2025 | Paris Dauphine University | Python*

Implemented a trinomial-tree pricing engine for European and American options with comprehensive features.

**Key Features:**
- **Trinomial tree** construction for option pricing
- Support for **European and American options**
- **Early-exercise handling** for American options
- **Greeks computation** (Delta, Gamma, Theta, Vega, Rho)
- Validated against **Black–Scholes convergence benchmarks**
- Lightweight API for pricing and diagnostics

**Technologies:** Python, NumPy, SciPy, Financial Mathematics

---

### Algorithmic Trading Systems — Avellaneda–Stoikov Framework
*Jan 2024 – Jun 2024 | EPF Capstone Project | Python*

Led a team of 6 to develop a comprehensive market-making framework based on the Avellaneda–Stoikov model.

**Key Features:**
- Implemented **Avellaneda–Stoikov market-making framework**
- **Volatility-adaptive spreads** and dynamic inventory management
- **Risk controls** to limit exposure and adverse selection
- Backtested **10M+ trades** on Hyperliquid (DeFi DEXC) order book data
- Reduced **adverse selection by ~9%**
- Stabilized **PnL variance by 7%**

**Technologies:** Python, NumPy, Pandas, Event-time backtesting

**GitHub:** [TRADING_COMPETITION_XTREM_BOT](https://github.com/theov07/TRADING_COMPETITION_XTREM_BOT)

---

## Machine Learning Projects

### LSTM Stock Price Forecaster
*Personal Project | Python*

Built a deep learning model for short-horizon financial time-series forecasting.

**Key Features:**
- **LSTM architecture** for sequential data modeling
- **Feature engineering** from historical price and volume data
- Technical indicators integration
- Short-horizon forecasting (intraday to daily)
- Performance evaluation on out-of-sample data

**Technologies:** Python, PyTorch, NumPy, Pandas, Time Series Analysis

---

### StackOverflow Tag Prediction — ML Pipeline
*Personal Project | Python*

End-to-end machine learning pipeline for multi-label text classification.

**Key Features:**
- Natural language processing for text data
- Multi-label classification
- Feature extraction and engineering
- Model comparison and evaluation
- Production-ready pipeline design

**Technologies:** Python, Scikit-learn, NLP, Machine Learning

**GitHub:** [Stackoverflow_Tag_Prediction_ML_Pipeline](https://github.com/theov07/Stackoverflow_Tag_Prediction_ML_Pipeline)

---

## Data Engineering & Infrastructure

### Market Data Aggregation and Paper Trading System
*Personal Project | Python*

Built a comprehensive market data aggregation system with paper trading capabilities.

**Key Features:**
- Real-time **market data aggregation** from multiple sources
- **Paper trading engine** for strategy testing
- Data storage and retrieval infrastructure
- WebSocket and REST API integration

**Technologies:** Python, APIs, Data Engineering

**GitHub:** [Market_Data_Aggregation_And_Paper_Trading](https://github.com/theov07/Market_Data_Aggregation_And_Paper_...)

---

### DevOps Fullstack Deployment Project
*Personal Project | DevOps*

Full-stack application deployment with modern DevOps practices.

**Key Features:**
- **Docker containerization**
- CI/CD pipeline implementation
- Infrastructure as Code
- Cloud deployment

**Technologies:** Docker, Git, Linux, DevOps

**GitHub:** [DevOps_Fullstack_Deployment_Project](https://github.com/theov07/DevOps_Fullstack_Deployment_Project)

---

## Contact

Interested in discussing any of these projects or potential collaborations?

**Email:** theo.verdelhan@dauphine.eu  
**LinkedIn:** [linkedin.com/in/theoverdelhan](https://www.linkedin.com/in/theoverdelhan)  
**GitHub:** [github.com/theov07](https://github.com/theov07)