"""Stage 02 — descriptive stats, effect sizes, CUPED."""

from __future__ import annotations

import numpy as np

from exercises.common import as_1d_float, require_same_length


def mean(x) -> float:
    xx = as_1d_float(x)
    return float(np.mean(xx))


def sample_variance(x) -> float:
    xx = as_1d_float(x)
    if xx.size < 2:
        raise ValueError("need at least 2 observations")
    return float(np.var(xx, ddof=1))


def z_score(x) -> np.ndarray:
    xx = as_1d_float(x)
    s = np.std(xx, ddof=1)
    if s == 0:
        raise ValueError("standard deviation is 0")
    return (xx - np.mean(xx)) / s


def welch_t_statistic(a, b) -> float:
    """Welch's t for two independent samples (unequal variance)."""
    aa = as_1d_float(a, "a")
    bb = as_1d_float(b, "b")
    if aa.size < 2 or bb.size < 2:
        raise ValueError("each group needs at least 2 observations")
    va = np.var(aa, ddof=1)
    vb = np.var(bb, ddof=1)
    se = np.sqrt(va / aa.size + vb / bb.size)
    if se == 0:
        raise ValueError("standard error is 0")
    return float((np.mean(aa) - np.mean(bb)) / se)


def cohens_d(a, b) -> float:
    """Pooled-SD Cohen's d (Hedges-style pooled variance, n-1)."""
    aa = as_1d_float(a, "a")
    bb = as_1d_float(b, "b")
    if aa.size < 2 or bb.size < 2:
        raise ValueError("each group needs at least 2 observations")
    va = np.var(aa, ddof=1)
    vb = np.var(bb, ddof=1)
    pooled = np.sqrt(((aa.size - 1) * va + (bb.size - 1) * vb) / (aa.size + bb.size - 2))
    if pooled == 0:
        raise ValueError("pooled sd is 0")
    return float((np.mean(aa) - np.mean(bb)) / pooled)


def cuped_adjust(y, x) -> np.ndarray:
    """Y - theta * (X - mean(X)) with theta = Cov(Y,X)/Var(X)."""
    yy = as_1d_float(y, "y")
    xx = as_1d_float(x, "x")
    require_same_length(yy, xx, ("y", "x"))
    var_x = np.var(xx, ddof=1)
    if var_x == 0:
        return yy.copy()
    cov = np.cov(yy, xx, ddof=1)[0, 1]
    theta = cov / var_x
    return yy - theta * (xx - np.mean(xx))
