from exercises.common import as_1d_float


def test_as_1d_rejects_empty():
    import pytest

    with pytest.raises(ValueError):
        as_1d_float([])
