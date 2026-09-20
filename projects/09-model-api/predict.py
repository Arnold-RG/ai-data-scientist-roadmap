"""Score one record with the pickled pipeline."""

from __future__ import annotations

import argparse
import json
import pickle
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent
MODEL = ROOT / "output" / "model.pkl"


def load():
    with MODEL.open("rb") as f:
        return pickle.load(f)


def predict(recency: float, frequency: float, monetary: float) -> dict:
    blob = load()
    x = np.array([[recency, frequency, monetary]], dtype=float)
    pipe = blob["pipeline"]
    proba = float(pipe.predict_proba(x)[0, 1])
    label = int(proba >= 0.5)
    return {
        "features": {"recency": recency, "frequency": frequency, "monetary": monetary},
        "churn_probability": round(proba, 4),
        "label": label,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--recency", type=float, required=True)
    parser.add_argument("--frequency", type=float, required=True)
    parser.add_argument("--monetary", type=float, required=True)
    args = parser.parse_args()
    payload = predict(args.recency, args.frequency, args.monetary)
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
