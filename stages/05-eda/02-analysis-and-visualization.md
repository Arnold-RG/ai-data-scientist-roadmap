# Analysis and visualization

## A pandas spine that does not lie

1. Load a **sample** first if the file is huge; confirm dtypes.
2. `describe` for numbers, `value_counts(dropna=False)` for categories.
3. Time coverage: min/max timestamp vs expected calendar.
4. Duplicates on the primary key.
5. Join dimension tables; assert grain.
6. Univariate plots: histogram, bar of top categories.
7. Bivariate: target vs each promising feature (box, scatter, rate by bin).
8. Correlation for numeric features — and a reminder that 0 correlation is not independence, and high correlation is not causation.
9. Write **feature ideas** in a list: ratios, lags, “days since,” flags for missing.

The retail project automates a slice of this and writes `output/summary.json`.

## Charts that carry a sentence

Every figure needs a title that is a claim, not a variable name.

- **Bar:** comparison of categories. Sort by value unless the axis is ordered.
- **Line:** time. Mind dual axes; they invite lies.
- **Scatter:** relationship; overplotting needs alpha or hexbin.
- **Box / violin:** distribution by group.
- **Heatmap:** correlation or calendar.

Color is for meaning, not decoration. One highlight color beats ten.

Seaborn sits on matplotlib. Use pandas `.plot` for speed, then matplotlib for the last mile (labels, tight layout, saving to `output/`).

## Feature ideas from EDA

If conversion drops on mobile Safari, that is a segment feature or a bug. If revenue is lognormal, model log(y) or use a Tweedie. If two features are almost collinear, drop or combine. EDA is feature engineering with a plot as the lab notebook.

## You should be able to

- Run a missingness and duplicate audit in a few lines.
- Choose a plot type for a question (not the other way around).
- Save a figure and a JSON summary from a script, not only a notebook.
- Walk from a plot to a model feature.

Quiz: `python quizzes/run_quiz.py --stage 05`. Project: [01-eda-retail](../../projects/01-eda-retail).
