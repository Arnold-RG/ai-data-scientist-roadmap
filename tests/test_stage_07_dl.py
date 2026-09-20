import numpy as np
import pytest

from exercises.stage_07_dl import attention_scores, relu, sigmoid, softmax


def test_relu():
    np.testing.assert_allclose(relu([-1.0, 0.0, 2.5]), [0.0, 0.0, 2.5])


def test_sigmoid_bounds():
    s = sigmoid([-100.0, 0.0, 100.0])
    assert s[0] == pytest.approx(0.0, abs=1e-6)
    assert s[1] == pytest.approx(0.5)
    assert s[2] == pytest.approx(1.0, abs=1e-6)


def test_softmax_2d():
    p = softmax([[1.0, 1.0], [0.0, 10.0]], axis=1)
    np.testing.assert_allclose(p.sum(axis=1), [1.0, 1.0])
    assert p[1, 1] > 0.99


def test_attention_rows_sum_to_one():
    rng = np.random.default_rng(0)
    q = rng.normal(size=(4, 8))
    k = rng.normal(size=(4, 8))
    w = attention_scores(q, k)
    assert w.shape == (4, 4)
    np.testing.assert_allclose(w.sum(axis=1), np.ones(4), atol=1e-6)


def test_attention_identical_keys_uniform_when_q_zero():
    k = np.eye(3)
    q = np.zeros((3, 3))
    w = attention_scores(q, k)
    np.testing.assert_allclose(w, np.full((3, 3), 1 / 3), atol=1e-6)
