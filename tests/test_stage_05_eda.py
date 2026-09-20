import pandas as pd
import pytest

from exercises.stage_05_eda import correlation_filter, detect_missing, iqr_outlier_mask


def test_detect_missing():
    df = pd.DataFrame({"a": [1.0, None, 3.0], "b": [1, 2, 3]})
    miss = detect_missing(df)
    assert miss["a"] == pytest.approx(1 / 3)
    assert miss["b"] == 0


def test_iqr_outlier_mask():
    s = pd.Series([1, 2, 3, 4, 5, 100])
    mask = iqr_outlier_mask(s)
    assert bool(mask.iloc[-1]) is True
    assert int(mask.sum()) == 1


def test_correlation_filter_drops_later_column():
    df = pd.DataFrame(
        {
            "x": [1, 2, 3, 4, 5],
            "y": [2, 4, 6, 8, 10],  # 2x
            "z": [5, 4, 3, 2, 1],
        }
    )
    drop = correlation_filter(df, threshold=0.99)
    assert "y" in drop
    assert "x" not in drop
