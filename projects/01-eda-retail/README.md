# 01 — Retail EDA

**Goal.** Audit a messy transactions table, summarize revenue, and save a chart.

**Skills.** Missingness, outliers, groupby time, matplotlib.

## Run

```bash
python projects/01-eda-retail/analyze.py
```

Writes `output/summary.json` and `output/revenue_by_month.png`.

## Done when

- You can explain every key in `summary.json`.
- You know why some rows were dropped (negative qty, missing SKU).
- The monthly revenue plot matches the JSON totals.

Data is generated inside `analyze.py` (seed 7). No external file required.
