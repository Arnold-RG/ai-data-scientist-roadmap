"""Circles vs squares on tiny synthetic canvases."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def draw_circle(size: int = 16, rng=None) -> np.ndarray:
    img = np.zeros((size, size), dtype=float)
    cy, cx = rng.uniform(6, 10), rng.uniform(6, 10)
    r = rng.uniform(3.5, 5.5)
    yy, xx = np.ogrid[:size, :size]
    img[(yy - cy) ** 2 + (xx - cx) ** 2 <= r**2] = 1.0
    return img


def draw_square(size: int = 16, rng=None) -> np.ndarray:
    img = np.zeros((size, size), dtype=float)
    y0, x0 = int(rng.integers(2, 6)), int(rng.integers(2, 6))
    w = int(rng.integers(6, 10))
    img[y0 : y0 + w, x0 : x0 + w] = 1.0
    return img


def circularity(img: np.ndarray) -> float:
    area = img.sum()
    # perimeter ≈ pixels that have a 0-neighbor
    padded = np.pad(img, 1)
    per = 0
    for i in range(1, img.shape[0] + 1):
        for j in range(1, img.shape[1] + 1):
            if padded[i, j] == 1 and (
                padded[i - 1, j] == 0 or padded[i + 1, j] == 0 or padded[i, j - 1] == 0 or padded[i, j + 1] == 0
            ):
                per += 1
    if per == 0:
        return 0.0
    return float(4 * np.pi * area / (per**2))


def features(img: np.ndarray) -> np.ndarray:
    ys, xs = np.where(img > 0.5)
    if len(xs) == 0:
        return np.array([0, 0, 0, 0], dtype=float)
    return np.array(
        [img.mean(), xs.std() if len(xs) else 0, ys.std() if len(ys) else 0, circularity(img)],
        dtype=float,
    )


def dataset(n: int = 240, seed: int = 2):
    rng = np.random.default_rng(seed)
    X, y = [], []
    for _ in range(n // 2):
        X.append(features(draw_circle(rng=rng)))
        y.append(1)
        X.append(features(draw_square(rng=rng)))
        y.append(0)
    return np.vstack(X), np.array(y)


def train() -> dict:
    X, y = dataset()
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
    pipe = Pipeline([("scaler", StandardScaler()), ("clf", LogisticRegression(max_iter=200))])
    pipe.fit(X_tr, y_tr)
    pred = pipe.predict(X_te)
    return {"accuracy": round(float(accuracy_score(y_te, pred)), 4), "n_test": int(len(y_te))}


def main() -> None:
    OUT.mkdir(exist_ok=True)
    metrics = train()
    (OUT / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(metrics)


if __name__ == "__main__":
    main()
