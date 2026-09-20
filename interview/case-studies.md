# Case studies (take-homes)

Outline on paper first. Then code if you want. Each case is the kind of prompt used in interviews.

## 1) Churn

**Prompt.** Weekly user activity and a flag “churned in the next 28 days.” Build a model to target retention coupons.

**Structure.**

- Target definition and prediction time (no future activity in X).
- Split by time, not random rows.
- Baseline: users with zero sessions last 7 days.
- Metric: precision at the coupon budget, not accuracy.
- Leakage hunt: `last_seen_at` after the label window.
- Fairness: do we starve a region of coupons because of logging gaps?
- Rollout: experiment, not a silent launch.

This repo’s capstone is a synthetic version: `projects/10-capstone`.

## 2) A/B test for a checkout button

**Prompt.** Variant B ran for nine days. p = 0.04 on conversion. Ship?

**Structure.**

- Primary metric pre-registered? Other metrics peeked?
- Unit of randomization vs analysis (user vs session).
- Sample size vs MDE: is 0.04 a huge n tiny lift or a small n accident?
- Ratio metrics (revenue per visitor) SEs.
- Guardrails: error rate, latency.
- Decision: CI, not a star on a dashboard.

Practice: `projects/03-ab-test`.

## 3) Forecast next 12 weeks of demand

**Prompt.** Weekly sales, 3 years, promotions flagged.

**Structure.**

- Seasonal naive baseline first.
- Train on past, test on the most recent 12 weeks (rolling).
- Promotions as known-in-advance features only if the calendar is known.
- MAPE vs MAE (MAPE explodes near zero).
- Communicate intervals, not a single line for inventory.

Practice: `projects/05-time-series`.

## 4) Support-ticket tagging (NLP)

**Prompt.** Tag tickets as billing / bug / how-to. 8k labeled rows.

**Structure.**

- Label quality: double annotation on a sample.
- Split by time; products change.
- Baseline: TF-IDF + logistic (see `projects/06-sentiment`).
- Error analysis by product and language.
- LLM classifier: needs eval set and cost; not automatic winner.
- Human fallback on low confidence.

Score yourself by whether a skeptical tech lead would approve the next step, not by whether you named BERT.
