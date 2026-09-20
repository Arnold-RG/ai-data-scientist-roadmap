"""Weekly sales: seasonal naive vs a linear model with week-of-year dummies."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def make_series(weeks: int = 208, seed: int = 9) -> pd.Series:
    rng = np.random.default_rng(seed)
    t = np.arange(weeks)
    season = 40 * np.sin(2 * np.pi * t / 52.0)
    trend = 0.35 * t
    y = 200 + trend + season + rng.normal(0, 8, size=weeks)
    idx = pd.date_range("2022-01-03", periods=weeks, freq="W-MON")
    return pd.Series(y, index=idx, name="sales")


def mape(y_true, y_pred) -> float:
    y_true = np.asarray(y_true, dtype=float)
    y_pred = np.asarray(y_pred, dtype=float)
    return float(np.mean(np.abs((y_true - y_pred) / np.clip(np.abs(y_true), 1e-6, None))))


def seasonal_naive(train: pd.Series, horizon: int) -> np.ndarray:
    vals = train.to_numpy()
    return np.array([vals[-52 + i] if len(vals) >= 52 else vals[-1] for i in range(horizon)])


def linear_seasonal(train: pd.Series, test_index) -> np.ndarray:
    df = pd.DataFrame({"y": train.values, "t": np.arange(len(train))})
    df["woy"] = train.index.isocalendar().week.astype(int).to_numpy()
    X = pd.get_dummies(df[["t", "woy"]], columns=["woy"], drop_first=True)
    model = LinearRegression().fit(X, df["y"])
    future_t = np.arange(len(train), len(train) + len(test_index))
    woy = test_index.isocalendar().week.astype(int).to_numpy()
    fut = pd.DataFrame({"t": future_t, "woy": woy})
    Xf = pd.get_dummies(fut, columns=["woy"], drop_first=True)
    Xf = Xf.reindex(columns=X.columns, fill_value=0)
    return model.predict(Xf)


def evaluate() -> dict:
    y = make_series()
    horizon = 12
    train, test = y.iloc[:-horizon], y.iloc[-horizon:]
    naive = seasonal_naive(train, horizon)
    lin = linear_seasonal(train, test.index)
    return {
        "horizon_weeks": horizon,
        "seasonal_naive_mae": round(float(np.mean(np.abs(test.values - naive))), 3),
        "seasonal_naive_mape": round(mape(test.values, naive), 4),
        "linear_trend_seasonal_mae": round(float(np.mean(np.abs(test.values - lin))), 3),
        "linear_trend_seasonal_mape": round(mape(test.values, lin), 4),
    }


def main() -> None:
    OUT.mkdir(exist_ok=True)
    metrics = evaluate()
    (OUT / "forecast_metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(metrics)


if __name__ == "__main__":
    main()
