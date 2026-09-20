"""Tiny numeric helpers shared by the stage exercises.

These are convenience wrappers, not a public API you need to memorize.
Each stage module is still readable on its own.
"""

from __future__ import annotations

from typing import Sequence

import numpy as np


def as_float_array(x, name: str = "x") -> np.ndarray:
    """Convert ``x`` to a float ndarray and reject empty input."""
    arr = np.asarray(x, dtype=float)
    if arr.size == 0:
        raise ValueError(f"{name} must be non-empty")
    return arr


def as_1d_float(x, name: str = "x") -> np.ndarray:
    """Convert ``x`` to a 1-D float vector."""
    return np.ravel(as_float_array(x, name=name))


def require_same_length(a: Sequence | np.ndarray, b: Sequence | np.ndarray, names=("a", "b")) -> None:
    if len(a) != len(b):
        raise ValueError(f"{names[0]} and {names[1]} must have the same length")


def require_same_shape(a: np.ndarray, b: np.ndarray, names=("a", "b")) -> None:
    if a.shape != b.shape:
        raise ValueError(f"{names[0]} and {names[1]} must have the same shape, got {a.shape} vs {b.shape}")
