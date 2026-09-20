# 02 — House prices

**Goal.** Predict synthetic sale prices with a linear model and a time-respecting holdout.

**Skills.** Feature engineering, `LinearRegression`, RMSE, R².

## Run

```bash
python projects/02-house-prices/train.py
```

Expect `output/metrics.json` with `r2` typically above 0.5 on this designed data.

## Done when

- You can name which features were constructed (`age`, `sqft_per_room`).
- You know why we split by row order after sorting year (stand-in for time).
