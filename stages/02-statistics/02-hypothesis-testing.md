# Hypothesis testing

A test answers: **if the boring explanation were true, how unsurprising is this data?**

## The cast

- **Null hypothesis H₀**: the default. Often “no difference,” “no effect,” “this coin is fair.”
- **Alternative H₁**: what you hope or fear.
- **Test statistic**: one number that is extreme when H₁ is true (z, t, χ², F).
- **p-value**: probability, **under H₀**, of a statistic at least as extreme as yours. It is not P(H₀ is true).
- **Type I error (α)**: rejecting a true null. Usually 0.05 by habit, not by physics.
- **Type II error (β)**: missing a real effect. **Power** is `1 − β`.

## Worked intuition

You test whether a new checkout button changes conversion. H₀: p_new = p_old. You observe +0.2 percentage points on 800 users. That swing happens all the time under H₀. Large p-value: do not claim a win.

Same swing on 800,000 users can be “significant” and still worthless. **Statistical significance is not practical significance.** Always report the effect size (difference, lift, Cohen's d) and a CI.

## Common tests

| Question | Typical test |
| --- | --- |
| Mean vs a number, Gaussian-ish, unknown variance | one-sample t |
| Two means, unpaired | two-sample t (Welch if variances differ) |
| Two proportions | z-test or χ² on a 2×2 table |
| Counts vs expected categories | χ² goodness of fit |
| Paired before/after | paired t or Wilcoxon |

Assumptions matter. t-tests care about roughly symmetric means (CLT) more than about perfect normality of raw data when `n` is large. χ² cares about expected cell counts not being tiny.

## Multiple testing

Run 20 independent tests at α = 0.05 and you expect one false win. Dashboards that “star” every metric are p-hacking machines. Fixes: pre-register a **primary metric**, Bonferroni or FDR for extras, holdout confirmation.

## You should be able to

- Define a p-value in one correct sentence.
- Distinguish Type I from Type II.
- Name a case where accuracy-like thinking fails (rare events, peeking, multiple metrics).
- Pair every significant result with an effect size.

Next: [Probability and sampling](03-probability-and-sampling.md).
