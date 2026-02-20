---
title: "GDP Forecasting with MIDAS Regressions"
excerpt: "Research-grade implementation of MIDAS models for GDP nowcasting using mixed-frequency financial data<br/><img src='/images/portfolio/gdp-forecasting.png' style='max-width: 500px;'>"
collection: portfolio
---

## Overview

Replicated and extended MIDAS (Mixed Data Sampling) regressions for GDP nowcasting using mixed-frequency financial data. This research project implements state-of-the-art econometric techniques for macroeconomic forecasting.

**Period:** Nov 2025 – Jan 2026  
**Organization:** Paris Dauphine University – PSL  
**Type:** Academic Research Project  
**Language:** Python

## Project Motivation

GDP is reported quarterly, but many financial and economic indicators are available at higher frequencies (daily, weekly, monthly). MIDAS regressions allow us to:
- **Exploit high-frequency information** for low-frequency forecasting
- **Nowcast GDP** before official statistics are released
- **Capture lead and lag dynamics** between financial variables and GDP

## MIDAS Methodology

### The MIDAS Framework

MIDAS (Mixed Data Sampling) regressions allow estimation of models with variables sampled at different frequencies:

$$
y_t^{(q)} = \beta_0 + \beta_1 B(L^{1/m}; \theta) x_t^{(m)} + \epsilon_t
$$

Where:
- $y_t^{(q)}$ = quarterly GDP
- $x_t^{(m)}$ = daily/monthly financial indicator
- $B(L^{1/m}; \theta)$ = distributed lag polynomial (MIDAS weighting scheme)
- $m$ = frequency ratio (e.g., 90 for quarterly-to-daily)

### Key Innovation: Separate Lag/Lead Dynamics

This project extends the basic MIDAS framework to include:
- **Separate lag dynamics:** Past values predicting current GDP
- **Separate lead dynamics:** Current values predicting future GDP
- **Asymmetric weighting schemes:** Different decay rates for lags vs. leads

## Implementation Features

### Data Integration
- **Daily financial data:**
  - Stock market indices
  - Interest rate spreads
  - Volatility indices (VIX-type indicators)
  - Credit spreads
- **Quarterly GDP data:**
  - Real GDP growth
  - Nominal GDP
  - GDP components

### MIDAS Weighting Schemes

Implemented multiple parameterizations:

1. **Exponential Almon:**
   $$w_k(\theta) = \frac{\exp(\theta_1 k + \theta_2 k^2)}{\sum_j \exp(\theta_1 j + \theta_2 j^2)}$$

2. **Beta weighting:**
   $$w_k(\theta) = \frac{f(k/K; \theta_1, \theta_2)}{\sum_j f(j/K; \theta_1, \theta_2)}$$

3. **Step weighting:**
   Equal weights within sub-periods

### Estimation Methodology
- **Non-linear least squares** for parameter estimation
- **Maximum likelihood estimation** for optimal weighting parameters
- **Cross-validation** for hyperparameter tuning
- **Rolling window estimation** for robust parameter stability

## Technical Implementation

### Code Architecture

```python
# Core modules:
- DataLoader: Multi-frequency data handling
- MIDASRegression: Core MIDAS estimator
- WeightingSchemes: Lag polynomial implementations
- Forecaster: Out-of-sample prediction
- Evaluator: Performance metrics and diagnostics
```

### Key Features
- **Flexible frequency mixing:** Daily, weekly, monthly → quarterly
- **Multiple weighting schemes:** Exponential Almon, Beta, normalized weights
- **Lag/lead separation:** Distinct dynamics for past vs. future
- **OOS evaluation:** Proper out-of-sample testing framework

### Statistical Tools
- Newey-West HAC standard errors
- Information criteria (AIC, BIC)
- Diebold-Mariano test for forecast comparison
- Residual diagnostics

## Evaluation Framework

### Out-of-Sample Testing
- **Expanding window:** Growing sample for parameter re-estimation
- **Rolling window:** Fixed sample length
- **Real-time evaluation:** Mimicking actual forecasting scenario

### Performance Metrics
- **RMSE** (Root Mean Squared Error)
- **MAE** (Mean Absolute Error)
- **MAPE** (Mean Absolute Percentage Error)
- **Direction accuracy**
- **Forecast encompassing tests**

## Results

### Forecasting Performance

| Model | RMSE | MAE | Direction Accuracy |
|-------|------|-----|-------------------|
| MIDAS (Lag only) | 0.42 | 0.33 | 68% |
| MIDAS (Lag + Lead) | 0.38 | 0.29 | 72% |
| AR(4) Benchmark | 0.51 | 0.41 | 61% |

### Key Findings
- **MIDAS outperforms** traditional autoregressive models
- **Lag/lead separation** improves forecasting accuracy by ~10%
- **Financial spreads** are particularly informative for GDP nowcasting
- **Recent data** (higher weights on recent lags) performs best

## Research Contributions

1. **Extended MIDAS framework** with separate lag/lead dynamics
2. **Comprehensive comparison** of weighting schemes
3. **Robust OOS evaluation** methodology
4. **Research-grade code** with full documentation

## Technical Stack

- **Programming:** Python 3.9+
- **Numerical Computing:** NumPy, SciPy
- **Econometrics:** Statsmodels, linearmodels
- **Data Handling:** Pandas
- **Optimization:** scipy.optimize (non-linear least squares)
- **Visualization:** Matplotlib, Seaborn

## Key Insights

1. **High-frequency data matters:** Daily financial indicators contain valuable information for quarterly GDP forecasts
2. **Weighting matters:** Proper lag polynomial specification significantly impacts performance
3. **Leads and lags:** Separating forward-looking and backward-looking dynamics improves accuracy
4. **Real-time applicability:** MIDAS is particularly useful for nowcasting before official data release

## Challenges Overcome

- **Frequency alignment:** Handling mixed-frequency data with irregular release schedules
- **Optimization:** Non-linear parameter estimation can be sensitive to initial values
- **Data availability:** Limited GDP observations (quarterly) vs. abundant financial data (daily)
- **Overfitting:** Balancing model complexity with limited sample size

## Future Extensions

- **Multivariate MIDAS:** Multiple high-frequency predictors
- **State-space representation:** Kalman filtering for time-varying parameters
- **Machine learning:** Combining MIDAS with ML for non-linear relationships
- **Real-time data flow:** Automated pipeline for continuous nowcasting

## Academic References

This project builds on:
- Ghysels, E., Santa-Clara, P., & Valkanov, R. (2004). "The MIDAS touch: Mixed data sampling regression models."
- Andreou, E., Ghysels, E., & Kourtellos, A. (2013). "Should macroeconomic forecasters use daily financial data and how?"
- Foroni, C., & Marcellino, M. (2014). "A comparison of mixed frequency approaches for nowcasting Euro area macroeconomic aggregates."

## Links

- **GitHub:** [GDP_Forecasting_With_MIDAS_Regressions](https://github.com/theov07/GDP_Forecasting_With_MIDAS_Regress...)
- **LinkedIn:** [Théo Verdelhan](https://www.linkedin.com/in/theoverdelhan/)
