"""k-means on synthetic RFM-like customer features."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def make_customers(n: int = 600, seed: int = 5):
    rng = np.random.default_rng(seed)
    # three planted blobs: whales, regulars, lapsed
    whales = np.column_stack(
        [
            rng.normal(10, 4, 150).clip(1, 40),
            rng.normal(800, 120, 150).clip(200, 2000),
            rng.normal(12, 5, 150).clip(1, 40),
        ]
    )
    regulars = np.column_stack(
        [
            rng.normal(40, 10, 250).clip(5, 90),
            rng.normal(120, 40, 250).clip(10, 400),
            rng.normal(6, 2, 250).clip(1, 20),
        ]
    )
    lapsed = np.column_stack(
        [
            rng.normal(90, 15, 200).clip(40, 180),
            rng.normal(25, 15, 200).clip(0, 80),
            rng.normal(2, 1, 200).clip(0, 8),
        ]
    )
    X = np.vstack([whales, regulars, lapsed])
    rng.shuffle(X)
    return X


def cluster(X, k: int = 3, seed: int = 5) -> dict:
    scaler = StandardScaler()
    Z = scaler.fit_transform(X)
    km = KMeans(n_clusters=k, n_init=10, random_state=seed)
    labels = km.fit_predict(Z)
    sil = float(silhouette_score(Z, labels))
    sizes = {str(i): int((labels == i).sum()) for i in range(k)}
    centers = scaler.inverse_transform(km.cluster_centers_)
    profiles = []
    for i, c in enumerate(centers):
        profiles.append(
            {
                "cluster": i,
                "recency_days": round(float(c[0]), 2),
                "monetary": round(float(c[1]), 2),
                "frequency": round(float(c[2]), 2),
            }
        )
    return {"k": k, "silhouette": round(sil, 4), "sizes": sizes, "profiles": profiles}


def main() -> None:
    OUT.mkdir(exist_ok=True)
    payload = cluster(make_customers())
    (OUT / "segments.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(payload["silhouette"], payload["sizes"])


if __name__ == "__main__":
    main()
