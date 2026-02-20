---
title: "Avellaneda–Stoikov Market Making Framework"
excerpt: "Leading team of 6 to implement market-making model with volatility-adaptive spreads, reducing adverse selection by 9%<br/><img src='/images/portfolio/market-making-framework.png' style='max-width: 500px;'>"
collection: portfolio
---

## Overview

Led a team of 6 students to develop a comprehensive market-making framework based on the seminal Avellaneda–Stoikov model, featuring volatility-adaptive spreads and sophisticated inventory risk controls.

**Period:** Jan 2024 – Jun 2024  
**Organization:** EPF Graduate School of Engineering (Capstone Project)  
**Role:** Team Leader & Quantitative Developer  
**Team Size:** 6 members

## Project Background

The Avellaneda–Stoikov framework is a foundational model in market microstructure that addresses the fundamental problem faced by market makers: how to set bid and ask quotes to maximize profit while managing inventory risk.

### The Problem
Market makers must balance:
- **Profit from spreads** (bid-ask spread capture)
- **Inventory risk** (holding directional positions)
- **Adverse selection** (trading with informed traders)
- **Market volatility** (changing market conditions)

## Model Foundation

### Avellaneda–Stoikov Model (2008)

The optimal bid and ask quotes are given by:

$$
p^{\text{bid}} = S - \frac{1}{\gamma}\ln(1 + \gamma/\kappa) + \frac{q \sigma^2 (T-t)}{\gamma}
$$

$$
p^{\text{ask}} = S + \frac{1}{\gamma}\ln(1 + \gamma/\kappa) + \frac{q \sigma^2 (T-t)}{\gamma}
$$

Where:
- $S$ = mid-price
- $q$ = current inventory
- $\gamma$ = risk aversion parameter
- $\sigma$ = volatility
- $\kappa$ = order arrival rate
- $T-t$ = time to horizon

## Key Features

### Volatility-Adaptive Spreads
- **Dynamic spread adjustment** based on realized volatility
- Wider spreads in high volatility → lower risk
- Tighter spreads in low volatility → higher volume
- Rolling window volatility estimation

### Inventory Risk Control
- **Position limits** to cap directional exposure
- **Inventory-based skewing** of quotes
- Long inventory → more aggressive on bid side
- Short inventory → more aggressive on ask side
- Emergency liquidation procedures

### Adverse Selection Mitigation
- **Order flow analysis** to detect informed trading
- **Spread widening** in response to adverse selection signals
- **Quote refresh optimization** to manage toxicity
- Trade size analysis and filtering

### Risk Management Features
- **Maximum position limits**
- **Drawdown controls**
- **Volatility circuit breakers**
- **Market impact modeling**
- **Stop-loss mechanisms**

## Technical Implementation

### Architecture

```python
# Core Components:
- MarketDataHandler: Real-time order book processing
- VolatilityEstimator: Rolling volatility calculation
- InventoryManager: Position tracking and limits
- QuoteEngine: Bid/ask quote generation
- ExecutionEngine: Order placement and management
- RiskManager: Real-time risk monitoring
- Backtester: Event-time simulation framework
```

### Data Processing
- L2 order book reconstruction
- Tick-level data processing
- Event-time backtesting (not time-sampled)
- Market microstructure feature engineering

### Testing & Validation
- Backtested on **10M+ trades** from Hyperliquid (DeFi DEXC)
- Multiple crypto asset pairs
- Various market regimes (trending, ranging, volatile)
- Robustness testing across parameter ranges

## Results

### Performance Metrics

| Metric | Improvement |
|--------|-------------|
| Adverse Selection | **-9%** reduction |
| PnL Variance | **-7%** stabilization |
| Sharpe Ratio | **+15%** increase |
| Fill Rate | **+12%** improvement |

### Key Outcomes
- Successfully deployed backtesting framework for 10M+ trades
- Reduced adverse selection risk through intelligent quote management
- Stabilized PnL through risk controls
- Validated model across multiple market conditions

## Team Leadership

As team leader, I:
- **Coordinated development** across 6 team members
- **Designed system architecture** and module interfaces
- **Implemented core algorithms** (volatility estimation, quote engine)
- **Led code reviews** and ensured code quality
- **Presented results** to faculty and industry professionals

## Challenges Overcome

1. **Event-Time Backtesting:** Implemented accurate event-driven simulation (not time-sampled)
2. **Data Quality:** Handled missing data, outliers, and exchange-specific quirks
3. **Parameter Optimization:** Tuned risk aversion, volatility window, and inventory limits
4. **Team Coordination:** Managed parallel development across multiple modules

## Technical Stack

- **Programming:** Python
- **Data Processing:** NumPy, Pandas
- **Visualization:** Matplotlib, Plotly
- **Testing:** Pytest, unit tests, integration tests
- **Version Control:** Git, GitHub
- **Infrastructure:** Jupyter notebooks for research, production Python scripts

## Key Learnings

1. **Model vs. Reality:** Theoretical models require significant adaptation for real markets
2. **Data Quality Matters:** Robust handling of market data anomalies is essential
3. **Parameter Sensitivity:** Careful parameter tuning and validation is critical
4. **Team Dynamics:** Effective communication and clear architecture enable parallel development

## Extensions & Improvements

Beyond the base Avellaneda–Stoikov model, we implemented:
- **Multi-level inventory management** (soft limits + hard limits)
- **Regime-dependent parameters** (volatility regimes)
- **Order flow toxicity detection**
- **Spread competition modeling**
- **Fill probability estimation**

## Academic Contribution

This project synthesized concepts from:
- **Stochastic control theory** (optimal quote positioning)
- **Market microstructure** (order flow analysis)
- **Time series analysis** (volatility estimation)
- **Risk management** (inventory control)
- **Software engineering** (production-quality code)

## Future Work

Potential extensions include:
- Multi-asset market making
- Reinforcement learning for parameter adaptation
- High-frequency order book features
- Cross-venue arbitrage integration
- Machine learning for fill probability estimation

## Links

- **GitHub:** [TRADING_COMPETITION_XTREM_BOT](https://github.com/theov07/TRADING_COMPETITION_XTREM_BOT)
- **LinkedIn:** [Théo Verdelhan](https://www.linkedin.com/in/theoverdelhan/)

## References

- Avellaneda, M., & Stoikov, S. (2008). "High-frequency trading in a limit order book." *Quantitative Finance*, 8(3), 217-224.
- Guéant, O., Lehalle, C. A., & Fernandez-Tapia, J. (2013). "Dealing with the inventory risk: a solution to the market making problem." *Mathematics and Financial Economics*, 7(4), 477-507.
- Cartea, Á., Jaimungal, S., & Penalva, J. (2015). "Algorithmic and High-Frequency Trading." *Cambridge University Press*.
