# Stage 03 — Econometrics

Econometrics is statistics with a chip on its shoulder about **causation**.

Machine learning asks “what predicts Y?” Econometrics asks “what happens to Y if we change X?” Those questions share regression as a tool and almost nothing else in interpretation.

The official roadmap node is: **prerequisites**, then **regression, time series, and fitting distributions**.

## Why data scientists still need this

- Stakeholders hear “associated with” as “causes.”
- Pricing, marketing, and policy are interventions. Predictions of the past policy world will not travel.
- Time series will fool any i.i.d. metric: leakage through time, seasonality, nonstationarity.

## Map

| File | Use |
| --- | --- |
| [Prerequisites](01-prerequisites.md) | Identification, exogeneity, omitted variables |
| [Regression and time series](02-regression-and-time-series.md) | OLS, dynamics, ARIMA intuition, distributions |

## Practice

```bash
python quizzes/run_quiz.py --stage 03
python projects/05-time-series/forecast.py
```

Next: [Stage 04 — Coding](../04-coding).
