"""End-to-end synthetic churn: baseline vs logistic, plus a filled summary."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score, roc_auc_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def make(n: int = 1200, seed: int = 13):
    rng = np.random.default_rng(seed)
    week = np.sort(rng.integers(0, 52, size=n))
    recency = rng.normal(30, 15, n).clip(1, 90)
    sessions = rng.poisson(8, n)
    tickets = rng.poisson(0.6, n)
    logit = -1.2 + 0.03 * recency - 0.12 * sessions + 0.4 * tickets
    y = rng.binomial(1, 1 / (1 + np.exp(-logit)))
    X = np.column_stack([recency, sessions, tickets])
    return X, y, week


def main() -> None:
    OUT.mkdir(exist_ok=True)
    X, y, week = make()
    cut = np.quantile(week, 0.8)
    train = week <= cut
    test = ~train
    # baseline: high recency
    base_score = X[test, 0]
    pipe = Pipeline([("scaler", StandardScaler()), ("clf", LogisticRegression(max_iter=300))])
    pipe.fit(X[train], y[train])
    proba = pipe.predict_proba(X[test])[:, 1]
    metrics = {
        "n_train": int(train.sum()),
        "n_test": int(test.sum()),
        "churn_rate_test": round(float(y[test].mean()), 4),
        "baseline_auc": round(float(roc_auc_score(y[test], base_score)), 4),
        "model_auc": round(float(roc_auc_score(y[test], proba)), 4),
        "model_pr_auc": round(float(average_precision_score(y[test], proba)), 4),
        "target": "churn in a 28-day window (synthetic label)",
        "split": "time quantile 80/20 on synthetic week index",
    }
    (OUT / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    summary = f"""# Executive summary (synthetic churn)

**Question.** Which users should we target with a retention coupon next week?

**Target.** Binary churn in a 28-day window, predicted using only features available at scoring time
(recency, sessions, support tickets). This dataset is synthetic.

**Split.** Time-based 80/20 (week index), not a shuffled row split.

**Baseline.** Rank by recency (AUC {metrics['baseline_auc']}).

**Model.** Logistic regression on standardized features (AUC {metrics['model_auc']}, PR-AUC {metrics['model_pr_auc']}).

**Decision.** Use the model to rank users if AUC stays above the recency baseline on a later time slice.
Do not launch coupons without an experiment. Limitation: synthetic data, no fairness slice, no cost of a coupon.

**Next.** Run a randomized coupon test (Stage 02) and watch drift (Stage 08).
"""
    (OUT / "executive_summary.md").write_text(summary.strip() + "\n", encoding="utf-8")
    print(metrics)


if __name__ == "__main__":
    main()
