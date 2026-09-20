"""Stage 06 — splits and classification metrics."""

from __future__ import annotations

import numpy as np

from exercises.common import as_1d_float, as_float_array, require_same_length


def train_val_split(X, y, val_frac: float = 0.2, seed: int = 0):
    """Shuffle split. val_frac in (0, 1). Returns X_train, X_val, y_train, y_val."""
    if not 0 < val_frac < 1:
        raise ValueError("val_frac must be in (0, 1)")
    XX = np.asarray(X)
    yy = np.asarray(y)
    if len(XX) != len(yy):
        raise ValueError("X and y length mismatch")
    n = len(XX)
    if n < 2:
        raise ValueError("need at least 2 rows")
    rng = np.random.default_rng(seed)
    idx = rng.permutation(n)
    n_val = max(1, int(round(n * val_frac)))
    n_val = min(n_val, n - 1)
    val_idx = idx[:n_val]
    train_idx = idx[n_val:]
    return XX[train_idx], XX[val_idx], yy[train_idx], yy[val_idx]


def accuracy(y_true, y_pred) -> float:
    yt = np.asarray(y_true)
    yp = np.asarray(y_pred)
    require_same_length(yt, yp, ("y_true", "y_pred"))
    if yt.size == 0:
        raise ValueError("empty")
    return float(np.mean(yt == yp))


def precision_recall_f1(y_true, y_pred, positive=1) -> tuple[float, float, float]:
    yt = np.asarray(y_true)
    yp = np.asarray(y_pred)
    require_same_length(yt, yp, ("y_true", "y_pred"))
    tp = np.sum((yt == positive) & (yp == positive))
    fp = np.sum((yt != positive) & (yp == positive))
    fn = np.sum((yt == positive) & (yp != positive))
    precision = float(tp / (tp + fp)) if (tp + fp) else 0.0
    recall = float(tp / (tp + fn)) if (tp + fn) else 0.0
    if precision + recall == 0:
        f1 = 0.0
    else:
        f1 = 2 * precision * recall / (precision + recall)
    return precision, recall, float(f1)


def standardize(X, mean=None, std=None):
    """Z-score columns. If mean/std omitted, fit on X. Returns Z, mean, std.

    Columns with std 0 become 0.
    """
    XX = np.asarray(X, dtype=float)
    if XX.ndim == 1:
        XX = XX.reshape(-1, 1)
    if mean is None:
        mean = XX.mean(axis=0)
    if std is None:
        std = XX.std(axis=0, ddof=0)
    std_safe = np.where(std == 0, 1.0, std)
    Z = (XX - mean) / std_safe
    Z = np.where(std == 0, 0.0, Z)
    return Z, np.asarray(mean, dtype=float), np.asarray(std, dtype=float)
