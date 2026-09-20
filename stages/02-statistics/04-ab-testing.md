# A/B testing

An A/B test is a randomized experiment. Randomization is what lets you say the **assignment** caused the metric change, not a lurking seasonal wave.

This is the statistics node on the official roadmap that most data scientists use every quarter.

## Design before code

1. **Primary metric.** One. Pre-registered. Extra metrics are supporting actors.
2. **Unit of randomization.** User, session, shop, server. If you randomize sessions but users span both arms, you leak.
3. **Hypothesis and MDE.** Minimum detectable effect: the smallest lift you refuse to miss. Sample size comes from MDE, baseline rate, α, and power — not from “we have two sprints.”
4. **Guardrails.** Latency, crash rate, refunds. A winning conversion with exploding returns is not a win.

## Peeking

Looking every day and stopping when p < 0.05 inflates Type I error. The p-value is calibrated for **one** look. Sequential tests and always-valid p-values exist; “I’ll just glance” is not one of them.

## Sensitivity (power) is a product

More users help. So does a **less noisy metric**. Variance reduction is how mature experimentation teams get power without waiting a year.

**CUPED** (Controlled-experiment Using Pre-Experiment Data): adjust the outcome `Y` with a pre-period covariate `X` that correlates with `Y`:

```text
Y_adj = Y − θ (X − mean(X))
θ = Cov(Y, X) / Var(X)
```

You subtract the part of the outcome you could already predict from last week’s behavior. The treatment effect on `Y_adj` matches the effect on `Y` if `X` is pre-treatment, but the variance drops. CUPAC and other variants replace the linear `X` with a model prediction. Stratification is the design cousin of the same idea.

## Ratio metrics

Many business metrics are ratios: revenue per user, clicks per session, average order value. The numerator and denominator are both random. Naive standard errors that treat the ratio like a simple mean are wrong.

The **delta method** linearizes `f = A/B` so you can get an SE from the variances and covariance of A and B. If you remember one warning: **do not average ratios inside users incorrectly, then treat that as the global ratio** — Simpson and aggregation bugs live here.

## Decision

Ship if: primary metric wins with a CI that excludes 0 (or excludes your practical threshold), guardrails are fine, and the experiment ran its planned horizon. Otherwise iterate. “Directionally positive” is not a result.

## Project

Build [projects/03-ab-test](../../projects/03-ab-test). Write the recommendation as if a PM will read only `output/report.json`.

## You should be able to

- Size an experiment from baseline, MDE, α, power (conceptually).
- Explain peeking in one sentence.
- Write CUPED’s formula and its assumption on X.
- Know why ratio metrics need extra care.

Next: [Stage 03 — Econometrics](../03-econometrics).
