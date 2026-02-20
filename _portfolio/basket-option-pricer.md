---
title: "Multi-Asset Basket Option Pricing Engine"
excerpt: "Production-grade C# pricing engine combining analytical methods and Monte Carlo simulation with variance reduction techniques<br/><img src='/images/portfolio/option-pricing.png' style='max-width: 500px;'>"
collection: portfolio
---

## Overview

Production-grade pricing engine for multi-asset derivatives combining analytical moment-matching techniques (Brigo et al.) and Monte Carlo simulation with sophisticated variance reduction methods.

**Type:** Personal Project  
**Language:** C#  
**Focus:** Quantitative Finance, Derivatives Pricing, Numerical Methods

## Project Goals

Develop a comprehensive, production-ready pricing engine for multi-asset basket options that:
- Combines analytical and numerical pricing methods
- Implements state-of-the-art variance reduction techniques
- Supports realistic term structure modeling
- Integrates with real market data sources

## Key Features

### Pricing Methodologies

#### Analytical Approach
- **Moment-matching techniques** based on Brigo et al. (2004)
- Efficient for European-style basket options
- Provides fast approximate pricing for calibration and risk management

#### Monte Carlo Simulation
- Full path simulation for complex payoffs
- Support for path-dependent features
- Flexible framework for exotic option structures

### Variance Reduction
- **Control variates** for improved convergence
- Reduced standard errors in Monte Carlo estimates
- Significantly improved computational efficiency
- Antithetic variates and importance sampling options

### Market Data Integration
- **ECB €STR** (Euro Short-Term Rate) curve integration
- **Bloomberg volatility surfaces** for realistic vol modeling
- Term structure modeling with:
  - Zero curves
  - Forward curves
  - Volatility term structures
- Full **correlation matrices** for multi-asset modeling

### Advanced Features
- Support for multiple underlying assets
- Flexible correlation structure
- Time-dependent parameters
- Real-time market data updates
- Greeks computation (Delta, Gamma, Vega, etc.)

## Technical Implementation

### Architecture
```csharp
// Core components:
- PricingEngine: Main orchestrator
- MonteCarloSimulator: Path generation and pricing
- AnalyticalPricer: Moment-matching approximations
- VarianceReducer: Control variate implementation
- MarketDataProvider: Real-time data integration
- TermStructureModel: Curve and surface modeling
```

### Key Classes
- `BasketOption`: Multi-asset option representation
- `UnderlyingAsset`: Individual asset modeling
- `CorrelationMatrix`: Asset correlation handling
- `VolatilitySurface`: Implied volatility interpolation
- `RateCurve`: Interest rate term structure

## Mathematical Foundation

### Basket Option Pricing
The basket option payoff depends on a weighted combination of underlying assets:

$$
\text{Payoff} = \max\left(\sum_{i=1}^{n} w_i S_i(T) - K, 0\right)
$$

Where:
- $w_i$ = weight of asset $i$
- $S_i(T)$ = price of asset $i$ at maturity
- $K$ = strike price
- $n$ = number of assets

### Control Variate Variance Reduction
Using a control variate $Y$ with known expectation $\mathbb{E}[Y]$:

$$
\hat{\theta}_{\text{CV}} = \hat{\theta}_{\text{MC}} + \beta(\mathbb{E}[Y] - \hat{Y})
$$

This reduces variance when $Y$ is correlated with the target payoff.

## Technical Stack

- **Language:** C# (.NET Framework/Core)
- **Numerical Libraries:** Math.NET Numerics
- **Data Sources:** ECB API, Bloomberg API
- **Testing:** Unit tests, integration tests, convergence validation
- **Performance:** Parallelized Monte Carlo paths

## Validation & Testing

- **Black-Scholes Convergence:** Validated against analytical solutions for single-asset options
- **Multi-asset Benchmarks:** Compared with industry-standard pricing libraries
- **Greeks Accuracy:** Numerical differentiation vs. analytical Greeks
- **Variance Reduction Efficiency:** Measured improvement in standard errors

## Results

- Successfully prices complex multi-asset derivatives
- Variance reduction achieves **50-70% reduction** in Monte Carlo standard errors
- Real-time market data integration for production use
- Comprehensive Greeks calculation for risk management
- Production-ready code quality with extensive testing

## Applications

1. **Portfolio Hedging:** Basket options on equity portfolios
2. **Index Options:** Pricing custom index derivatives
3. **Risk Management:** Greeks for multi-asset exposure analysis
4. **Trading Strategies:** Structured products and exotic derivatives

## Key Learnings

- **Variance Reduction is Critical:** Control variates dramatically improve Monte Carlo efficiency
- **Market Data Integration:** Real-world pricing requires robust data pipelines
- **Correlation Modeling:** Accurate correlation estimation is essential for multi-asset pricing
- **Numerical Stability:** Careful implementation needed for robust production systems

## Future Enhancements

- Local volatility models
- Stochastic volatility (Heston, SABR)
- Jump-diffusion models
- GPU acceleration for Monte Carlo
- Machine learning for calibration

## Links

- **GitHub:** [Basket_Option_Pricing_Engine_CSharp](https://github.com/theov07/Basket_Option_Pricing_Engine_CSharp)
- **LinkedIn:** [Théo Verdelhan](https://www.linkedin.com/in/theoverdelhan/)

## References

- Brigo, D., Mercurio, F., Rapisarda, F., & Scotti, R. (2004). "Approximated moment-matching dynamics for basket-options pricing"
- Glasserman, P. (2003). "Monte Carlo Methods in Financial Engineering"
- Hull, J. C. (2018). "Options, Futures, and Other Derivatives"
