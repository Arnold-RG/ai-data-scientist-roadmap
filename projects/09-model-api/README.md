# 09 — Model API (CLI)

**Goal.** Train a tiny churn-like classifier, pickle the pipeline, score new rows from the command line.

## Run

```bash
python projects/09-model-api/train.py
python projects/09-model-api/predict.py --recency 12 --frequency 8 --monetary 400
```

Artifacts: `output/model.pkl`, `output/train_metrics.json`, printed JSON prediction.
