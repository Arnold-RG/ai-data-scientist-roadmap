# Econometrics prerequisites

## Identification

A parameter is **identified** if the data-generating process, plus your assumptions, maps to one value of that parameter. If two different causal stories produce the same observed joint distribution of (X, Y), you cannot tell them apart no matter how big `n` is.

Example: ice cream sales and drowning rise together. A model Y_drown ~ X_ice_cream is statistically fine and causally empty. Heat is the confounder. No amount of gradient boosting fixes that.

## Exogeneity

In the linear model `Y = Xβ + ε`, **exogeneity** says X is not correlated with ε. That fails when:

- **Omitted variable** that drives both X and Y (ability in wage ~ education).
- **Reverse causality** (police hiring ~ crime).
- **Measurement error** in X.
- **Selection** (you only observe people who chose to click).

When exogeneity fails, OLS is a superb *predictor* of Y given the observed X in the same regime, and a terrible *estimate of the effect of changing X*.

## Omitted variable bias (direction)

If you omit Z, the bias on β_X depends on (1) how Z relates to Y and (2) how Z relates to X. Same sign correlation → bias away in that combined direction. You cannot “control for everything,” but you can write the story of the main confounders and see which way your estimate is likely wrong.

## Experiments vs observational data

Random assignment makes treatment orthogonal to confounders (in expectation). That is why A/B tests are the gold standard for product questions. When you cannot randomize, you need a research design: difference-in-differences, instrumental variables, regression discontinuity — all of them are **assumptions with a marketing name**. Write the assumption in a sentence before you fit.

## You should be able to

- Give an example where prediction works and intervention would fail.
- Define omitted variable bias without formulas.
- Explain why randomization identifies an average treatment effect.

Next: [Regression and time series](02-regression-and-time-series.md).
