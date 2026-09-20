"""Tiny sentiment classifier on synthetic reviews."""

from __future__ import annotations

import json
from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"

POS = [
    "love this product absolutely wonderful quality",
    "amazing fit and great value happy customer",
    "excellent service fast shipping highly recommend",
    "fantastic item works perfectly five stars",
    "delighted with the purchase will buy again",
    "superb craftsmanship and kind support team",
    "best I have owned so far really pleased",
    "smooth experience and outstanding results",
]
NEG = [
    "terrible quality broke on day one",
    "awful customer service never again",
    "waste of money disappointed and angry",
    "poor fit arrived damaged useless",
    "slow shipping and rude reply",
    "worst purchase this year complete junk",
    "not as described cheap materials failed",
    "frustrating bugs and no support",
]


def make_corpus(repeat: int = 12):
    texts = (POS * repeat) + (NEG * repeat)
    labels = [1] * (len(POS) * repeat) + [0] * (len(NEG) * repeat)
    return texts, labels


def train() -> dict:
    texts, labels = make_corpus()
    X_tr, X_te, y_tr, y_te = train_test_split(texts, labels, test_size=0.25, random_state=0, stratify=labels)
    pipe = Pipeline(
        [
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=1)),
            ("clf", LogisticRegression(max_iter=200)),
        ]
    )
    pipe.fit(X_tr, y_tr)
    pred = pipe.predict(X_te)
    return {
        "n_train": len(X_tr),
        "n_test": len(X_te),
        "accuracy": round(float(accuracy_score(y_te, pred)), 4),
        "f1": round(float(f1_score(y_te, pred)), 4),
    }


def main() -> None:
    OUT.mkdir(exist_ok=True)
    metrics = train()
    (OUT / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(metrics)


if __name__ == "__main__":
    main()
