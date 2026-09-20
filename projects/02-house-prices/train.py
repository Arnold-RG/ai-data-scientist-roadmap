"""Synthetic housing regression."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def make_houses(n: int = 800, seed: int = 3) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    year_built = rng.integers(1950, 2022, size=n)
    sqft = rng.normal(1600, 450, size=n).clip(600, 4000)
    rooms = rng.integers(3, 9, size=n)
    lot = rng.normal(5000, 1500, size=n).clip(1500, 12000)
    noise = rng.normal(0, 25000, size=n)
    price = (
        40000
        + 120 * sqft
        + 8000 * rooms
        + 4 * lot
        + 1500 * (year_built - 1950)
        + noise
    )
    return pd.DataFrame(
        {
            "year_built": year_built,
            "sqft": sqft,
            "rooms": rooms,
            "lot": lot,
            "price": price,
        }
    )


def train() -> dict:
    df = make_houses()
    df["age"] = 2026 - df["year_built"]
    df["sqft_per_room"] = df["sqft"] / df["rooms"]
    df = df.sort_values("year_built").reset_index(drop=True)
    n = len(df)
    cut = int(n * 0.8)
    features = ["sqft", "rooms", "lot", "age", "sqft_per_room"]
    X_train, X_test = df.loc[: cut - 1, features], df.loc[cut:, features]
    y_train, y_test = df.loc[: cut - 1, "price"], df.loc[cut:, "price"]
    pipe = Pipeline([("scaler", StandardScaler()), ("lin", LinearRegression())])
    pipe.fit(X_train, y_train)
    pred = pipe.predict(X_test)
    rmse = float(np.sqrt(mean_squared_error(y_test, pred)))
    r2 = float(r2_score(y_test, pred))
    return {"n_train": int(len(X_train)), "n_test": int(len(X_test)), "rmse": round(rmse, 2), "r2": round(r2, 4)}


def main() -> None:
    OUT.mkdir(exist_ok=True)
    metrics = train()
    (OUT / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(metrics)


if __name__ == "__main__":
    main()
