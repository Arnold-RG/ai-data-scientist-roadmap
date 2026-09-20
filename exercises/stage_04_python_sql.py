"""Stage 04 — Python patterns that stand in for SQL thinking."""

from __future__ import annotations

from collections import Counter

import numpy as np
import pandas as pd

from exercises.common import as_1d_float


def flatten(nested: list) -> list:
    """Flatten one level of lists: [[1,2],[3]] -> [1,2,3]. Non-lists are kept."""
    out = []
    for item in nested:
        if isinstance(item, list):
            out.extend(item)
        else:
            out.append(item)
    return out


def top_k_frequent(items, k: int) -> list:
    """Return up to k values sorted by frequency desc, then value asc for ties."""
    if k < 0:
        raise ValueError("k must be >= 0")
    counts = Counter(items)
    ranked = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    return [value for value, _ in ranked[:k]]


def moving_average(x, window: int) -> np.ndarray:
    """Simple moving average; output length is n - window + 1."""
    xx = as_1d_float(x)
    if window < 1:
        raise ValueError("window must be >= 1")
    if window > xx.size:
        raise ValueError("window longer than series")
    kernel = np.ones(window) / window
    return np.convolve(xx, kernel, mode="valid")


def inner_join(left: pd.DataFrame, right: pd.DataFrame, on: str) -> pd.DataFrame:
    """INNER JOIN on a single key column."""
    return left.merge(right, on=on, how="inner")


def group_by_mean(df: pd.DataFrame, by: str, value: str) -> pd.DataFrame:
    """SELECT by, AVG(value) GROUP BY by. Drops NA group keys."""
    out = df.groupby(by, dropna=True)[value].mean().reset_index()
    out.columns = [by, value]
    return out
