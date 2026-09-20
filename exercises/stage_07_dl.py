"""Stage 07 — activations and scaled dot-product attention scores."""

from __future__ import annotations

import numpy as np

from exercises.common import as_float_array


def relu(z) -> np.ndarray:
    zz = as_float_array(z, "z")
    return np.maximum(0.0, zz)


def sigmoid(z) -> np.ndarray:
    zz = as_float_array(z, "z")
    return 1.0 / (1.0 + np.exp(-np.clip(zz, -60, 60)))


def softmax(z, axis: int = -1) -> np.ndarray:
    zz = as_float_array(z, "z")
    shifted = zz - np.max(zz, axis=axis, keepdims=True)
    exp = np.exp(shifted)
    return exp / np.sum(exp, axis=axis, keepdims=True)


def attention_scores(q, k) -> np.ndarray:
    """softmax(Q K^T / sqrt(d)) for 2-D Q, K with last dim d."""
    Q = np.asarray(q, dtype=float)
    K = np.asarray(k, dtype=float)
    if Q.ndim != 2 or K.ndim != 2:
        raise ValueError("q and k must be 2-D (tokens, dim)")
    if Q.shape[1] != K.shape[1]:
        raise ValueError("q and k must share the last dimension")
    d = Q.shape[1]
    logits = Q @ K.T / np.sqrt(d)
    return softmax(logits, axis=-1)
