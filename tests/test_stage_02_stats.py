import numpy as np
import pytest

from exercises.stage_02_stats import (
    cohens_d,
    cuped_adjust,
    mean,
    sample_variance,
    welch_t_statistic,
    z_score,
)


def test_mean_and_variance():
    x = [1.0, 2.0, 3.0, 4.0]
    assert mean(x) == pytest.approx(2.5)
    assert sample_variance(x) == pytest.approx(5 / 3)


def test_variance_needs_two():
    with pytest.raises(ValueError):
        sample_variance([1.0])


def test_z_score_mean_zero():
    z = z_score([2.0, 4.0, 6.0, 8.0])
    assert z.mean() == pytest.approx(0.0)
    assert np.std(z, ddof=1) == pytest.approx(1.0)


def test_welch_sign():
    t = welch_t_statistic([10, 11, 12, 13], [1, 2, 3, 4])
    assert t > 0


def test_cohens_d_positive():
    d = cohens_d([5, 6, 7, 8], [1, 2, 3, 4])
    assert d > 1


def test_cuped_preserves_mean():
    rng = np.random.default_rng(0)
    x = rng.normal(size=200)
    y = 0.8 * x + rng.normal(scale=0.3, size=200)
    adj = cuped_adjust(y, x)
    assert adj.mean() == pytest.approx(y.mean(), abs=1e-10)
    assert adj.var() < y.var()
