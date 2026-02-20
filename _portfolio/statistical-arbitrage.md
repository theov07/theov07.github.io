---
title: "CEX–DEX Statistical Arbitrage"
excerpt: "Delta-neutral statistical arbitrage between Binance and dYdX, achieving ~8% annualized returns with $800k–$1M daily volume<br/><img src='/images/portfolio/stat-arb.png' style='max-width: 500px;'>"
collection: portfolio
---

## Overview

Designed and built an end-to-end delta-neutral statistical arbitrage strategy between Binance (centralized exchange) and dYdX (DeFi decentralized exchange), targeting cross-venue microstructure inefficiencies.

**Period:** Sep 2023 – Jan 2024  
**Organization:** La Valériane - Investment Branch  
**Role:** Quantitative Developer

## Motivation

The crypto derivatives market exhibits significant pricing inefficiencies between centralized and decentralized exchanges due to:
- Different market microstructure mechanisms
- Latency asymmetries
- Varying liquidity distributions
- Information flow differences

This project exploited these inefficiencies through a systematic, delta-neutral arbitrage strategy.

## Key Components

### Data Infrastructure
- Reconstructed **full L2 order books** from both exchanges
- Built **2-year tick-level datasets** for comprehensive analysis
- Analyzed cross-exchange price formation patterns
- Studied latency asymmetries and liquidity distribution

### Signal Development
- Developed **arbitrage signals** based on:
  - Microprice deviations between venues
  - Depth-adjusted fair value estimators
  - Order flow imbalances
- Incorporated **slippage modeling** for realistic execution assumptions
- Designed execution constraints to manage risk

### Execution System
- Implemented automated trading bot with dual-exchange connectivity
- Built under realistic latency assumptions
- Handled partial fills and order management
- Maintained strict **delta neutrality** throughout operations

### Backtesting & Validation
- Comprehensive backtesting on 2 years of historical data
- Optimized execution logic, spreads, and slippage controls
- Validated strategy robustness across different market conditions
- Risk management and position sizing optimization

## Technical Stack

- **Programming:** Python, Ruby
- **Data Processing:** NumPy, Pandas
- **APIs:** Binance API, dYdX API
- **Infrastructure:** Automated execution bot, order management system
- **Analysis:** Statistical modeling, backtesting framework

## Results

- **Annualized Returns:** ~8%
- **Daily Trading Volume:** $800,000 – $1,000,000
- **Market Neutrality:** Strict delta-neutral positioning maintained
- **Strategy Duration:** Sep 2023 – Jan 2024

The strategy successfully exploited cross-venue inefficiencies while maintaining market neutrality, demonstrating the viability of systematic arbitrage in crypto derivatives markets.

## Key Insights

1. **Microstructure Differences:** CEX and DEX have fundamentally different market structures that create exploitable inefficiencies
2. **Execution Matters:** Realistic modeling of slippage and latency is critical for accurate strategy evaluation
3. **Risk Management:** Delta-neutral positioning and strict risk controls are essential for stable returns
4. **Market Dynamics:** Cross-venue arbitrage opportunities are time-varying and require adaptive strategies

## Challenges Overcome

- **Data Quality:** Reconstructing reliable order book data from multiple sources
- **Latency Management:** Handling asymmetric latencies between CEX and DEX
- **Execution Complexity:** Managing simultaneous orders across different exchange infrastructures
- **Risk Control:** Maintaining delta neutrality in dynamic market conditions

## Links

- **GitHub:** [Cross_EMA_Crypto_Trading_Bot](https://github.com/theov07/Cross_EMA_Crypto_Trading_Bot)
- **LinkedIn:** [Théo Verdelhan](https://www.linkedin.com/in/theoverdelhan/)
