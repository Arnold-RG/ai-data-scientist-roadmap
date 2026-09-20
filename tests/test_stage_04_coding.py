import pandas as pd
import pytest

from exercises.stage_04_python_sql import (
    flatten,
    group_by_mean,
    inner_join,
    moving_average,
    top_k_frequent,
)


def test_flatten():
    assert flatten([[1, 2], [3], 4]) == [1, 2, 3, 4]


def test_top_k_frequent_ties():
    # b and c both appear twice; alphabetical tie-break after count
    assert top_k_frequent(["a", "b", "b", "c", "c", "a", "a"], 2) == ["a", "b"]


def test_moving_average():
    out = moving_average([1, 2, 3, 4], 2)
    assert list(out) == pytest.approx([1.5, 2.5, 3.5])


def test_moving_average_window_too_big():
    with pytest.raises(ValueError):
        moving_average([1, 2], 3)


def test_inner_join_and_groupby():
    left = pd.DataFrame({"id": [1, 2, 3], "v": [10, 20, 30]})
    right = pd.DataFrame({"id": [2, 3, 4], "g": ["x", "x", "y"]})
    joined = inner_join(left, right, on="id")
    assert set(joined["id"]) == {2, 3}
    grouped = group_by_mean(joined, by="g", value="v")
    row = grouped.set_index("g").loc["x"]
    assert row["v"] == pytest.approx(25)
