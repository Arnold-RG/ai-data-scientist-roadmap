# Python for data science

Python is the default because the libraries are the job: NumPy for arrays, pandas for tables, scikit-learn for classical ML, plotting for argument.

## Language pieces that matter

- **Types:** `int`, `float`, `bool`, `str`, `None`. Know that `NaN != NaN`.
- **Containers:** `list` (ordered, mutable), `tuple` (immutable), `dict` (hash map), `set` (unique, unordered).
- **Functions:** defaults evaluated once (never use a mutable default). Return clearly. Type hints help readers, not the CPU.
- **Comprehensions** for simple maps/filters. Nested comprehensions that need a comment should be loops.
- **Virtual environments.** This repo expects `.venv` + `requirements.txt`. Global `pip install` is how machines rot.

## NumPy mental model

Homogeneous arrays, vectorized ops, broadcasting. A Python `for` over rows is a bug if NumPy can do it. Axes: `axis=0` is “down the rows” in 2-D.

## pandas mental model

A `DataFrame` is labeled columns. A `Series` is one column. Alignment is on **index**, which surprises people coming from SQL. Explicit `merge` and `reset_index` prevent silent misalignment.

Typical analysis spine:

1. `read_csv` / `read_parquet`
2. inspect `shape`, `dtypes`, `head`, `isna().mean()`
3. parse dates, categories
4. groupby aggregations
5. joins to dimension tables
6. plot, then model

Write functions that take a DataFrame and return a DataFrame. Notebooks that only exist as a pile of cells are hard to test. The exercises in this repo are functions for that reason.

## Clean analysis code

- Seeds for anything random.
- Paths from `pathlib`, not concatenated strings.
- No hidden edits of global `df`.
- Assertions on row counts after joins (`how='left'` should not explode).

## You should be able to

- Create a venv and install this repo’s requirements.
- Use groupby + agg without a loop.
- Explain index alignment in one example.
- Write a small pure function and a pytest for it.

Next: [DSA](02-dsa-python.md).
