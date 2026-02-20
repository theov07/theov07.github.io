---
title: "DeFi Market Making — Hyperliquid"
excerpt: "Production market-making system on DeFi derivatives using L1/L2/L3 order book data, microprice signals, and inventory risk control<br/><img src='/images/portfolio/market-making.png' style='max-width: 500px;'>"
collection: portfolio
---

## Overview

Active market maker on Hyperliquid (DeFi LBO), developing proprietary quantitative strategies in digital asset markets. This project represents a full production trading system with research, backtesting, and live execution components.

**Period:** Aug 2024 – Jul 2025  
**Organization:** MYR - Private Investment Fund  
**Role:** Quantitative Researcher

## Key Features

### Market Microstructure Analysis
- Designed and deployed **short-horizon market-making strategies** using L1/L2/L3 order book data
- Implemented **microprice signals** and order book imbalance indicators
- Modeled **FIFO queue dynamics** to optimize execution probability and spread capture
- Covered **12 liquid crypto order books** simultaneously

### Alpha Generation
- Developed **microstructure-driven alpha signals** from:
  - Depth imbalance
  - Order flow autocorrelation
  - Spread dynamics
- Event-time backtesting on **5+ years of tick-level data**
- Continuous signal robustness monitoring and improvement

### Risk Management & Execution
- Implemented **inventory risk control** inspired by the Avellaneda–Stoikov framework
- Built **low-latency execution systems** with <100ms response time
- Optimized quote refresh logic and queue positioning
- Mitigated adverse selection through intelligent order placement

### Stochastic Modeling
- Modeled **limit order book event arrivals** using stochastic intensity frameworks
- Poisson-type modeling for limit/market/cancel order flows
- Estimated short-term price pressure and fill probabilities
- Analyzed competing algorithmic trader behavior

## Technical Stack

- **Programming:** Python
- **Data Processing:** NumPy, Pandas
- **APIs:** REST and WebSocket for real-time market data
- **Infrastructure:** Linux-based execution environment
- **Backtesting:** Custom event-time backtesting framework

## Results

- Successfully deployed and maintained market-making strategies in production
- Processed and analyzed 5+ years of tick-level data across multiple assets
- Achieved <100ms execution latency for optimal market responsiveness
- Developed robust alpha signals validated through extensive backtesting

## Key Learnings

- **Microstructure matters:** Deep understanding of order book dynamics is essential for high-frequency strategies
- **Latency optimization:** Every millisecond counts in competitive market-making environments
- **Risk management:** Inventory control and adverse selection mitigation are critical for profitability
- **Robustness:** Strategies must be validated across different market regimes and conditions

## Links

- **GitHub:** [View related repositories](https://github.com/theov07)
- **LinkedIn:** [Théo Verdelhan](https://www.linkedin.com/in/theoverdelhan/)
