import numpy as np
import pytest

from exercises.stage_06_ml import accuracy, precision_recall_f1, standardize, train_val_split


def test_split_sizes_and_disjoint():
    X = np.arange(10).reshape(-1, 1)
    y = np.arange(10)
    Xt, Xv, yt, yv = train_val_split(X, y, val_frac=0.3, seed=1)
    assert len(Xt) + len(Xv) == 10
    assert set(yt).isdisjoint(set(yv))


def test_split_reproducible():
    X = np.arange(8).reshape(-1, 1)
    y = np.arange(8)
    a = train_val_split(X, y, seed=42)
    b = train_val_split(X, y, seed=42)
    np.testing.assert_array_equal(a[0], b[0])


def test_accuracy_and_f1():
    y_true = [0, 0, 1, 1]
    y_pred = [0, 1, 1, 1]
    assert accuracy(y_true, y_pred) == pytest.approx(0.75)
    p, r, f1 = precision_recall_f1(y_true, y_pred, positive=1)
    assert p == pytest.approx(2 / 3)
    assert r == pytest.approx(1.0)
    assert f1 == pytest.approx(0.8)


def test_f1_all_negative_preds():
    p, r, f1 = precision_recall_f1([1, 1, 0], [0, 0, 0], positive=1)
    assert p == 0
    assert r == 0
    assert f1 == 0


def test_standardize():
    X = np.array([[0.0, 10.0], [2.0, 10.0], [4.0, 10.0]])
    Z, mean, std = standardize(X)
    np.testing.assert_allclose(mean, [2.0, 10.0])
    assert Z[:, 0].mean() == pytest.approx(0.0)
    assert Z[:, 0].std(ddof=0) == pytest.approx(1.0)
    np.testing.assert_allclose(Z[:, 1], 0)
    Z2, _, _ = standardize(X, mean=mean, std=std)
    np.testing.assert_allclose(Z, Z2)
