"""Synthetic retail EDA. Run from repo root or this folder."""

from __future__ import annotations

import json
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def make_transactions(n: int = 2500, seed: int = 7) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    start = pd.Timestamp("2024-01-01")
    days = rng.integers(0, 365, size=n)
    ts = start + pd.to_timedelta(days, unit="D")
    skus = np.array(["mug", "tee", "hoodie", "sticker", "cap"])
    prices = {"mug": 12.0, "tee": 22.0, "hoodie": 48.0, "sticker": 3.0, "cap": 18.0}
    sku = rng.choice(skus, size=n, p=[0.2, 0.3, 0.15, 0.2, 0.15])
    qty = rng.integers(1, 5, size=n).astype(float)
    qty[:40] = np.nan
    qty[40:55] = -1
    sku = sku.astype(object)
    sku[55:70] = None
    unit = np.array([prices[s] if s in prices else np.nan for s in sku])
    unit += rng.normal(0, 0.4, size=n)
    return pd.DataFrame({"ts": ts, "sku": sku, "qty": qty, "unit_price": unit})


def analyze(df: pd.DataFrame) -> tuple[dict, pd.Series]:
    missing = df.isna().mean().to_dict()
    clean = df.dropna(subset=["sku", "qty"]).copy()
    clean = clean[clean["qty"] > 0]
    clean["revenue"] = clean["qty"] * clean["unit_price"]
    clean["month"] = clean["ts"].dt.to_period("M").astype(str)
    by_month = clean.groupby("month")["revenue"].sum().sort_index()
    top = clean.groupby("sku")["revenue"].sum().sort_values(ascending=False)
    summary = {
        "rows_raw": int(len(df)),
        "rows_clean": int(len(clean)),
        "missing_fraction": {k: round(float(v), 4) for k, v in missing.items()},
        "total_revenue": round(float(clean["revenue"].sum()), 2),
        "top_sku": str(top.index[0]),
        "top_sku_revenue": round(float(top.iloc[0]), 2),
        "months": int(by_month.shape[0]),
    }
    return summary, by_month


def main() -> None:
    OUT.mkdir(exist_ok=True)
    df = make_transactions()
    summary, by_month = analyze(df)
    (OUT / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    fig, ax = plt.subplots(figsize=(8, 3.5))
    by_month.plot(kind="bar", ax=ax, color="#0f766e")
    ax.set_title("Monthly revenue (clean transactions)")
    ax.set_ylabel("Revenue")
    ax.set_xlabel("Month")
    fig.tight_layout()
    fig.savefig(OUT / "revenue_by_month.png", dpi=120)
    plt.close(fig)
    print("wrote", OUT / "summary.json")


if __name__ == "__main__":
    main()
