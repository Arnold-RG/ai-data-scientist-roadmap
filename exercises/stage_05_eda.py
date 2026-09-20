"""Stage 05 — EDA helpers."""

from __future__ import annotations

import pandas as pd


def detect_missing(df: pd.DataFrame) -> pd.Series:
    """Fraction of missing values per column, index = column name."""
    return df.isna().mean()


def iqr_outlier_mask(s: pd.Series, k: float = 1.5) -> pd.Series:
    """True where value is outside [Q1 - k*IQR, Q3 + k*IQR]. NA stays False."""
    x = pd.to_numeric(s, errors="coerce")
    q1 = x.quantile(0.25)
    q3 = x.quantile(0.75)
    iqr = q3 - q1
    lo = q1 - k * iqr
    hi = q3 + k * iqr
    return (x < lo) | (x > hi)


def correlation_filter(df: pd.DataFrame, threshold: float = 0.9) -> list[str]:
    """Names of numeric columns to drop so no remaining pair has |corr| > threshold.

    For each highly correlated pair, drop the column that appears later in the frame.
    """
    numeric = df.select_dtypes(include="number")
    if numeric.shape[1] < 2:
        return []
    corr = numeric.corr().abs()
    drop: list[str] = []
    cols = list(numeric.columns)
    for i, a in enumerate(cols):
        if a in drop:
            continue
        for b in cols[i + 1 :]:
            if b in drop:
                continue
            if corr.loc[a, b] > threshold:
                drop.append(b)
    return drop
