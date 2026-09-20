# Probability and sampling

## Probability you actually use

- **Independence**: P(A and B) = P(A)P(B). Most “i.i.d.” assumptions in ML are this wish in a trench coat.
- **Conditional probability**: P(A|B) = P(A and B) / P(B).
- **Bayes**: P(H|D) ∝ P(D|H) P(H). The posterior is the prior reweighted by how well each hypothesis explains the data.

A classic data-science Bayes: a rare disease, a 99% accurate test, a positive result. Base rate still dominates. Calibration of classifiers is the same plot: P(Y=1 | score=0.8) should be about 0.8, not “the model is 80% sure” as poetry.

## Sampling

**Bias** is being systematically wrong. **Variance** is being noisy. A convenience sample of app power-users is biased for “all customers.” A random sample of 30 is unbiased but high variance.

Random sampling (or randomized assignment in experiments) is the cheapest honesty you can buy.

**Stratification** samples inside groups (country, platform) so each group is represented. In experiments it also reduces variance of the estimator.

**Bootstrap**: resample your dataset with replacement, recompute the statistic, look at that histogram. It estimates sampling variability without a formula. It cannot fix a biased sample. Garbage in, nicely bootstrapped garbage out.

## Likelihood vs loss

Maximum likelihood for a Gaussian mean is the sample mean. Cross-entropy loss for a Bernoulli is negative log-likelihood. When people say “we trained with log loss,” they are doing probability, whether they like the word or not.

## You should be able to

- Compute a simple Bayes update with a 2×2 table.
- Explain bias vs variance of an *estimator*, not only of an ML model.
- Know what bootstrap can and cannot repair.
- Spot dependent samples (users appearing in both experiment arms via multiple devices).

Next: [A/B testing](04-ab-testing.md).
