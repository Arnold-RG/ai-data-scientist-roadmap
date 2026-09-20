# Descriptive statistics and the Central Limit Theorem

## Location and spread

- **Mean** is the balance point. One wild value moves it.
- **Median** is the 50th percentile. Robust to tails, blind to the shape of the tails.
- **Variance** (sample, with `n−1`) is average squared distance from the mean. **Standard deviation** is that in the original units.
- **Percentiles and IQR** describe skew and outliers without pretending the data is Gaussian.

Always plot a histogram or ECDF before you trust any of these. Two datasets can share a mean and variance and still be different stories (same moment, different mixture).

## Sampling distributions

Your dataset is one draw. Tomorrow you could have drawn another. The **sampling distribution** of an estimator (say, the sample mean) is the histogram of that estimator across imaginary repeats.

You almost never get those repeats. You infer the spread instead: the **standard error**.

For the mean of i.i.d. data with finite variance, `SE = s / sqrt(n)`. Four times more data halves the error — not four times. That is why “we will just get a bigger dump” is a slow strategy.

## Central Limit Theorem

Add (or average) many independent pieces with finite variance, and the sum looks more and more **normal**, regardless of the original shape (within reason).

Intuition: every extra independent error is a small shove. Lots of independent shoves make a bell.

Consequences:

- Confidence intervals for means use a normal or t approximation once `n` is not tiny.
- A/B tests on conversion *counts* become z-tests because a binomial is a sum of Bernoulli trials.
- The CLT does **not** say your raw data is normal. It says the **mean** is approximately normal.

When it fails: heavy tails with infinite variance, strong dependence, tiny `n`, or estimators that are not sums (medians, quantiles, max). Then use bootstrap or an exact test.

## Confidence intervals

A 95% CI is a procedure that, in repeated samples, covers the true parameter 95% of the time. It is not “the probability that the true value is in this interval” after you have this one interval — that is a Bayesian sentence.

Practical form for a mean: `x̄ ± 1.96 · SE` (or the t critical value). If someone reports a lift of +3% with a CI of [−4%, +10%], you do not have a launch decision. You have a too-small experiment.

## You should be able to

- Compute mean, sample variance, and SE from a tiny list by hand.
- Explain CLT without saying “all data is normal.”
- Interpret a confidence interval without magical language.
- Know when bootstrap is the safer default.

Next: [Hypothesis testing](02-hypothesis-testing.md).
