"""Stage 01 — linear algebra and gradient helpers."""

from __future__ import annotations

import numpy as np

from exercises.common import as_1d_float, as_float_array, require_same_length, require_same_shape


def vector_dot(a, b) -> float:
    """Dot product of two 1-D sequences."""
    aa = as_1d_float(a, "a")
    bb = as_1d_float(b, "b")
    require_same_length(aa, bb)
    return float(np.dot(aa, bb))


def matrix_multiply(A, B) -> np.ndarray:
    """Matrix product A @ B for 2-D arrays."""
    AA = np.asarray(A, dtype=float)
    BB = np.asarray(B, dtype=float)
    if AA.ndim != 2 or BB.ndim != 2:
        raise ValueError("A and B must be 2-D")
    if AA.shape[1] != BB.shape[0]:
        raise ValueError(f"inner dimensions do not match: {AA.shape} @ {BB.shape}")
    return AA @ BB


def softmax(z) -> np.ndarray:
    """Numerically stable softmax along the last axis for 1-D input."""
    zz = as_1d_float(z, "z")
    shifted = zz - np.max(zz)
    exp = np.exp(shifted)
    return exp / exp.sum()


def gradient_descent_step(w, grad, lr: float) -> np.ndarray:
    """One descent step: w - lr * grad."""
    if lr < 0:
        raise ValueError("lr must be >= 0")
    ww = as_1d_float(w, "w")
    gg = as_1d_float(grad, "grad")
    require_same_shape(ww, gg, ("w", "grad"))
    return ww - lr * gg
