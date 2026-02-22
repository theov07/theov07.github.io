---
title: "Projects"
permalink: /projects/
author_profile: false
---

## Trading Systems & Market Microstructure

### DeFi Market Making — Hyperliquid
*Aug 2024 – Jul 2025 | Python*

Built short-horizon market-making strategies driven by order-book microstructure, dynamic spreads, and inventory risk control.

**Key Features:**
- L1/L2/L3 order book data analysis
- Microprice signals and order flow indicators
- Event-time backtesting on 5+ years of tick-level data across 12 crypto assets
- Low-latency execution infrastructure (<100ms)
- Stochastic intensity modeling for limit order book events

**Technologies:** Python, WebSocket APIs, REST APIs, NumPy, Pandas

---

### CEX–DEX Delta-Neutral Statistical Arbitrage
*Sep 2023 – Jan 2024 | Python*

Developed a delta-neutral stat-arb system between a centralized exchange and a decentralized derivatives venue.

**Key Features:**
- Full L2 order book reconstruction
- 2-year tick-level dataset construction
- Microprice deviation signals
- Slippage modeling and execution constraints
- Achieved ~8% annualized returns with $800k–$1M daily volume

**Technologies:** Python, Binance API, dYdX API, NumPy, Pandas

**GitHub:** [Cross_EMA_Crypto_Trading_Bot](https://github.com/theov07/Cross_EMA_Crypto_Trading_Bot)

---

### Avellaneda–Stoikov Market Making Framework
*Jan 2024 – Jun 2024 | Python*

Implemented an Avellaneda–Stoikov-style framework with volatility-adaptive spreads and risk controls.

**Key Features:**
- Volatility-adaptive spread adjustment
- Inventory-based quote skewing
- Adverse selection mitigation
- Backtested 10M+ trades on DeFi order-book data
- Reduced adverse selection by ~9%, stabilized PnL variance by 7%

**Technologies:** Python, NumPy, Pandas, Event-time backtesting

**GitHub:** [TRADING_COMPETITION_XTREM_BOT](https://github.com/theov07/TRADING_COMPETITION_XTREM_BOT)

---

## Derivatives Pricing & Quantitative Finance

### Multi-Asset Basket Option Pricing Engine
*Personal Project | C#*

Production-grade pricing engine for multi-asset derivatives combining analytical methods and Monte Carlo simulation.

**Key Features:**
- Analytical moment-matching (Brigo et al.)
- Monte Carlo simulation with control variate variance reduction
- Term structure modeling with full correlation matrices
- Real market data integration (ECB €STR, Bloomberg volatility surfaces)
- Greeks computation

**Technologies:** C#, Monte Carlo methods, numerical optimization

**GitHub:** [Basket_Option_Pricing_Engine_CSharp](https://github.com/theov07/Basket_Option_Pricing_Engine_CSharp)

---

### Trinomial Tree Option Pricer
*Sep 2025 – Dec 2025 | Python*

Built a trinomial tree engine for European & American options with early exercise logic and Greeks.

**Key Features:**
- Trinomial tree construction
- European and American option pricing
- Early-exercise handling for American options
- Greeks computation (Delta, Gamma, Theta, Vega, Rho)
- Black–Scholes convergence validation
- Lightweight API for pricing and diagnostics

**Technologies:** Python, NumPy, SciPy

---

### GDP Forecasting with MIDAS Regressions
*Nov 2025 – Jan 2026 | Python*

Replicated and extended MIDAS regressions for GDP nowcasting using mixed-frequency financial data.

**Key Features:**
- MIDAS models with separate lag/lead dynamics
- Daily financial data to forecast quarterly GDP
- Out-of-sample evaluation
- Lag/lead structure optimization
- Research-grade implementation

**Technologies:** Python, Statsmodels, NumPy, Pandas

**GitHub:** [GDP_Forecasting_With_MIDAS_Regressions](https://github.com/theov07/GDP_Forecasting_With_MIDAS_Regress...)

---

## Machine Learning & Data Science

### LSTM Stock Price Forecaster
*Personal Project | Python*

Built a deep learning model for short-horizon financial time-series forecasting.

**Key Features:**
- LSTM architecture for sequential data
- Feature engineering from historical price and volume
- Technical indicators integration
- Out-of-sample performance evaluation

**Technologies:** Python, PyTorch, NumPy, Pandas

---

### StackOverflow Tag Prediction — ML Pipeline
*Personal Project | Python*

End-to-end machine learning pipeline for multi-label text classification.

**Key Features:**
- Natural language processing
- Multi-label classification
- Feature extraction and engineering
- Production-ready pipeline design

**Technologies:** Python, Scikit-learn, NLP

**GitHub:** [Stackoverflow_Tag_Prediction_ML_Pipeline](https://github.com/theov07/Stackoverflow_Tag_Prediction_ML_Pipeline)

---

## Infrastructure & Data Engineering

### Market Data Aggregation and Paper Trading System
*Personal Project | Python*

Built a comprehensive market data aggregation system with paper trading capabilities.

**Key Features:**
- Real-time market data aggregation from multiple sources
- Paper trading engine for strategy testing
- Data storage and retrieval infrastructure
- WebSocket and REST API integration

**Technologies:** Python, APIs, Data Engineering

**GitHub:** [Market_Data_Aggregation_And_Paper_Trading](https://github.com/theov07/Market_Data_Aggregation_And_Paper_...)

---

### DevOps Fullstack Deployment Project
*Personal Project | DevOps*

Full-stack application deployment with modern DevOps practices.

**Key Features:**
- Docker containerization
- CI/CD pipeline implementation
- Infrastructure as Code
- Cloud deployment

**Technologies:** Docker, Git, Linux

**GitHub:** [DevOps_Fullstack_Deployment_Project](https://github.com/theov07/DevOps_Fullstack_Deployment_Project)

---

## Contact

For detailed case studies and technical implementations, visit the [Portfolio](/portfolio/) page.

**Email:** theo.verdelhan@dauphine.eu  
**GitHub:** [github.com/theov07](https://github.com/theov07)