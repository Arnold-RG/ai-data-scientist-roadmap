# Regression, time series, and distributions

## OLS

Ordinary least squares chooses `β` to minimize `||Y − Xβ||²`. With an intercept and one slope, the slope is `Cov(X,Y)/Var(X)` — the same θ that appears in CUPED.

**Gauss–Markov** (intuition): among linear unbiased estimators, OLS is the lowest variance one if errors are uncorrelated with equal variance. Real data violates this constantly. You still start with OLS because it is a clear baseline.

Assumptions people mix up:

| Name | If it fails |
| --- | --- |
| Linearity in parameters | You are fitting the wrong object (fix: transform or change model) |
| No perfect collinearity | Coefficients are not uniquely defined |
| Exogeneity | Causal reading dies; prediction may live |
| Homoskedasticity | SEs are wrong; use robust SEs |
| No serial correlation | SEs wrong in time series; HAC or cluster |

**Interpretation:** `β_j` is the associated change in Y if X_j increases by 1 **holding the other included columns fixed**. That “holding fixed” is a statement about the design matrix, not about a lab.

## Time series

A series has **trend** (slow drift), **seasonality** (calendar cycles), and **noise**. Many series are **nonstationary**: the mean or variance wanders. Modeling nonstationary data as i.i.d. produces fake R² and dangerous forecasts.

**Stationarity** (weak): mean and autocovariance depend on lag, not on calendar time. Differencing `y_t − y_{t−1}` is the first aid kit.

**ARIMA** intuition:

- **AR(p)**: today is a linear mix of recent y’s. Momentum.
- **I(d)**: difference d times until it looks stationary.
- **MA(q)**: today is a mix of recent shocks.

You do not need to become a Box–Jenkins priest. You do need a **naive seasonal baseline** before any fancy model. If ARIMA cannot beat “last week’s value” or “this weekday last year,” you have not earned complexity.

Project [05-time-series](../../projects/05-time-series) forces that comparison.

## Fitting distributions

Before a parametric test or a simulation, ask what family the noise looks like: Gaussian, lognormal (money, sizes), Poisson/negative binomial (counts), Bernoulli (clicks). QQ plots beat guessing. Misspecifying tails makes “95% intervals” that are neither.

Maximum likelihood fits the family. Method of moments matches means and variances. Neither repairs a wrong family.

## You should be able to

- Interpret an OLS coefficient including the ceteris paribus clause.
- Explain why high R² on a trending series is suspicious.
- Name AR, I, and MA in one line each.
- Pick a distribution family for revenue vs click vs time-to-event.

Quiz: `python quizzes/run_quiz.py --stage 03`. Next: [Coding](../04-coding).
