"""Train a tiny pipeline and pickle it."""

from __future__ import annotations

import json
import pickle
from pathlib import Path

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def make_xy(n: int = 500, seed: int = 4):
    rng = np.random.default_rng(seed)
    recency = rng.normal(40, 20, n).clip(1, 120)
    frequency = rng.normal(6, 3, n).clip(0, 30)
    monetary = rng.normal(200, 120, n).clip(5, 2000)
    logit = -2.0 + 0.04 * recency - 0.25 * frequency - 0.002 * monetary
    p = 1 / (1 + np.exp(-logit))
    y = rng.binomial(1, p)
    X = np.column_stack([recency, frequency, monetary])
    return X, y


def main() -> None:
    OUT.mkdir(exist_ok=True)
    X, y = make_xy()
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
    pipe = Pipeline([("scaler", StandardScaler()), ("clf", LogisticRegression(max_iter=200))])
    pipe.fit(X_tr, y_tr)
    proba = pipe.predict_proba(X_te)[:, 1]
    metrics = {"auc": round(float(roc_auc_score(y_te, proba)), 4), "n_test": int(len(y_te))}
    with (OUT / "model.pkl").open("wb") as f:
        pickle.dump({"pipeline": pipe, "features": ["recency", "frequency", "monetary"]}, f)
    (OUT / "train_metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(metrics)


if __name__ == "__main__":
    main()
