# 05 — Time series

**Goal.** Forecast the last 12 weeks of synthetic weekly sales. Beat a seasonal-naive baseline or explain why you cannot.

**Skills.** Trend + seasonality, MAE, MAPE, humility.

## Run

```bash
python projects/05-time-series/forecast.py
```

`output/forecast_metrics.json` compares `seasonal_naive` vs `linear_trend_seasonal`.
