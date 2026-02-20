---
title: "Trinomial Tree Option Pricer"
excerpt: "Python implementation of trinomial tree for European and American options with Greeks and Black-Scholes validation<br/><img src='/images/portfolio/trinomial-tree.png' style='max-width: 500px;'>"
collection: portfolio
---

## Overview

Implemented a comprehensive trinomial-tree pricing engine for European and American options with early-exercise handling, Greeks computation, and Black–Scholes convergence validation.

**Period:** Sep 2025 – Dec 2025  
**Organization:** Paris Dauphine University – PSL  
**Type:** Academic Project  
**Language:** Python

## Project Goals

Develop a production-quality option pricing engine that:
- Prices European and American vanilla options
- Handles early exercise optimally for American options
- Computes option Greeks for risk management
- Provides convergence validation against analytical solutions
- Offers a clean API for integration

## Trinomial Tree Methodology

### Why Trinomial Trees?

Trinomial trees offer advantages over binomial trees:
- **Better convergence properties**
- **More flexibility** in parameter choices
- **Smoother Greeks** computation
- **Reduced oscillation** at barriers

### Tree Construction

At each node, the stock price can move to three possible states:

$$
S_u = S \cdot e^{\lambda \sigma \sqrt{\Delta t}}
$$

$$
S_m = S
$$

$$
S_d = S \cdot e^{-\lambda \sigma \sqrt{\Delta t}}
$$

Where $\lambda$ is typically set to $\sqrt{3}$ for optimal stability.

### Risk-Neutral Probabilities

The transition probabilities are chosen to match the mean and variance:

$$
p_u = \frac{1}{2\lambda^2} + \frac{r - q - \frac{1}{2}\sigma^2}{2\lambda\sigma}\sqrt{\Delta t}
$$

$$
p_d = \frac{1}{2\lambda^2} - \frac{r - q - \frac{1}{2}\sigma^2}{2\lambda\sigma}\sqrt{\Delta t}
$$

$$
p_m = 1 - p_u - p_d
$$

## Key Features

### Option Pricing

#### European Options
- **Call and Put options**
- Pure backward induction from terminal payoffs
- Discounting at risk-free rate
- No early exercise considerations

#### American Options
- **Early exercise optimization** at each node
- Comparison of continuation value vs. intrinsic value
- Optimal exercise boundary identification
- Put-call parity validation

### Greeks Computation

Calculated using finite differences from the tree:

- **Delta ($\Delta$):** $\frac{\partial V}{\partial S}$ - First derivative w.r.t. spot
- **Gamma ($\Gamma$):** $\frac{\partial^2 V}{\partial S^2}$ - Second derivative w.r.t. spot
- **Theta ($\Theta$):** $\frac{\partial V}{\partial t}$ - Time decay
- **Vega ($\mathcal{V}$):** $\frac{\partial V}{\partial \sigma}$ - Sensitivity to volatility
- **Rho ($\rho$):** $\frac{\partial V}{\partial r}$ - Sensitivity to interest rate

### Validation Framework

#### Black-Scholes Convergence
For European options, the trinomial tree should converge to Black-Scholes:

$$
\lim_{N \to \infty} V_{\text{tree}}(N) = V_{\text{BS}}
$$

Validation includes:
- Convergence plots (price vs. number of steps)
- Error analysis
- Convergence rate estimation

#### Known Analytical Results
- Put-call parity verification
- Early exercise premium for American options
- Boundary conditions at extreme strikes

## Technical Implementation

### Code Structure

```python
class TrinomialTree:
    """
    Trinomial tree pricer for European and American options.
    """
    def __init__(self, S0, K, T, r, sigma, q=0, N=100):
        # Initialize parameters
        
    def build_tree(self):
        # Construct price tree
        
    def price_european(self, option_type='call'):
        # European option pricing
        
    def price_american(self, option_type='call'):
        # American option with early exercise
        
    def compute_greeks(self):
        # Calculate all Greeks
        
    def validate_convergence(self):
        # Compare with Black-Scholes
```

### Key Algorithms

1. **Tree Building:** Forward pass to construct price lattice
2. **Backward Induction:** Value propagation from maturity to present
3. **Early Exercise Check:** American option comparison
4. **Greeks via Perturbation:** Finite difference approximation

## Technical Stack

- **Language:** Python 3.9+
- **Numerical Computing:** NumPy, SciPy
- **Validation:** Comparison with `scipy.stats.norm` (Black-Scholes)
- **Visualization:** Matplotlib for convergence plots
- **API:** Clean interface for pricing and Greeks

## Results

### Convergence Analysis

| Steps (N) | Tree Price | Black-Scholes | Error |
|-----------|------------|---------------|-------|
| 50 | 10.452 | 10.451 | 0.001 |
| 100 | 10.451 | 10.451 | <0.001 |
| 200 | 10.451 | 10.451 | <0.001 |

### Greeks Accuracy

Greeks computed via finite differences show good agreement with analytical Greeks from Black-Scholes model.

### American Option Early Exercise

Successfully identifies optimal exercise boundary:
- **Deep in-the-money:** Early exercise optimal (for puts at low interest rates)
- **At-the-money:** Hold option (time value)
- **Out-of-the-money:** Never exercise

## Key Features of Implementation

### Numerical Stability
- Careful probability calculations to ensure $0 \leq p_i \leq 1$
- Handling edge cases (very short/long maturities)
- Overflow prevention in exponential calculations

### Performance Optimization
- Vectorized NumPy operations
- Memory-efficient tree storage
- Optional sparse representation for deep trees

### API Design
```python
# Simple pricing API
pricer = TrinomialTree(S0=100, K=100, T=1.0, r=0.05, sigma=0.2)
european_call = pricer.price_european('call')
american_put = pricer.price_american('put')
greeks = pricer.compute_greeks()
```

## Educational Value

This project demonstrates:
- **Numerical methods** in finance
- **Dynamic programming** (backward induction)
- **Finite difference methods** (Greeks)
- **Convergence analysis** (validation)
- **Software engineering** (clean API design)

## Extensions Implemented

Beyond basic trinomial trees:
- **Dividend handling** (continuous dividend yield)
- **Multiple validation metrics**
- **Convergence diagnostics**
- **Performance benchmarking**

## Challenges Overcome

1. **Probability Constraints:** Ensuring valid probabilities across all parameter ranges
2. **Early Exercise Logic:** Correct implementation of American option early exercise
3. **Greeks Accuracy:** Choosing appropriate perturbation sizes for finite differences
4. **Convergence Validation:** Statistical testing of convergence behavior

## Future Enhancements

- **Barrier options** (up-and-out, down-and-in, etc.)
- **Asian options** (path-dependent)
- **Exotic payoffs** (digital, spread)
- **Implied volatility calibration**
- **GPU acceleration** for large trees
- **Adaptive mesh refinement**

## Applications

- **Option pricing** for trading and risk management
- **Greeks computation** for hedging
- **Educational tool** for understanding option pricing
- **Benchmark** for more sophisticated models

## Key Learnings

1. **Trees vs. Closed-Form:** Trees are flexible but require convergence analysis
2. **American vs. European:** Early exercise adds complexity but also value
3. **Greeks from Trees:** Finite differences work well with sufficient steps
4. **Validation is Critical:** Always compare numerical methods to known benchmarks

## Academic Foundation

This implementation is based on:
- Hull, J. C. (2018). "Options, Futures, and Other Derivatives" - Trinomial tree chapter
- Boyle, P. P. (1988). "A lattice framework for option pricing with two state variables"
- Kamrad, B., & Ritchken, P. (1991). "Multinomial approximating models for options with k state variables"

## Links

- **LinkedIn:** [Théo Verdelhan](https://www.linkedin.com/in/theoverdelhan/)
- **GitHub:** [theov07](https://github.com/theov07)

---

*This project exemplifies the bridge between financial mathematics theory and practical implementation, providing a robust foundation for understanding derivative pricing and numerical methods in quantitative finance.*
