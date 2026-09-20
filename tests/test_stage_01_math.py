import numpy as np
import pytest

from exercises.stage_01_math import gradient_descent_step, matrix_multiply, softmax, vector_dot


def test_vector_dot():
    assert vector_dot([1, 2, 3], [4, 5, 6]) == pytest.approx(32)


def test_vector_dot_length_mismatch():
    with pytest.raises(ValueError):
        vector_dot([1, 2], [1])


def test_matrix_multiply():
    A = [[1, 2, 3], [4, 5, 6]]
    B = [[7, 8], [9, 10], [11, 12]]
    out = matrix_multiply(A, B)
    expected = np.array([[58, 64], [139, 154]], dtype=float)
    np.testing.assert_allclose(out, expected)


def test_matrix_multiply_bad_shape():
    with pytest.raises(ValueError):
        matrix_multiply([[1, 2]], [[1, 2]])


def test_softmax_sums_to_one():
    p = softmax([1.0, 2.0, 3.0])
    assert p.sum() == pytest.approx(1.0)
    assert np.all(p > 0)
    assert p.argmax() == 2


def test_softmax_stability():
    p = softmax([1000.0, 1000.0, 1001.0])
    assert np.isfinite(p).all()
    assert p.sum() == pytest.approx(1.0)


def test_gd_step():
    w = gradient_descent_step([0.0, 0.0], [-10.0, -20.0], 0.05)
    np.testing.assert_allclose(w, [0.5, 1.0])


def test_gd_rejects_negative_lr():
    with pytest.raises(ValueError):
        gradient_descent_step([0.0], [1.0], -0.1)
