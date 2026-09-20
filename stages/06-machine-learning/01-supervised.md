# Supervised learning

You have `X` and a target `y`. The model learns a function that will be used on **new** rows.

## Regression vs classification

- Regression: numeric y (price, demand). Metrics: RMSE, MAE, R² (careful with trends).
- Classification: labels. Binary vs multiclass. Metrics depend on class balance and cost of errors.

## Core models (what they assume)

**Linear regression.** ŷ = w·x + b. Interpretable, fast, needs features that are already the story. Regularize with ridge (L2) or lasso (L1).

**Logistic regression.** Linear model + sigmoid; loss is log loss. Outputs a probability if calibrated. Still the correct baseline for tabular classification.

**k-NN.** Predict from nearby training points. Needs scaling. Slow at inference. Good sanity check.

**Decision trees.** Partition space with axis-aligned splits. No scaling needed. High variance alone. Feature importances are greedy, not causal.

## Regularization and validation

Without a penalty, many models interpolate noise. Ridge shrinks; lasso zeros. The penalty strength is a hyperparameter: choose it on **validation**, not test.

**Cross-validation:** rotate which slice is validation so the hyperparameter is not tied to one unlucky split. For time data, use a rolling origin, not shuffled k-fold.

## Imbalance

If 2% of rows are fraud, a model that always says “not fraud” is 98% accurate. Report the confusion matrix, precision, recall, F1, and the policy threshold. Resampling is optional; a correct metric and threshold are not.

## You should be able to

- Choose RMSE vs MAE vs R² for a regression product question.
- Explain why we split before fitting scalers.
- Fit a mental logistic baseline before any tree ensemble.
- Compute precision and recall from a 2×2 table.

Next: [Unsupervised learning](02-unsupervised.md).
