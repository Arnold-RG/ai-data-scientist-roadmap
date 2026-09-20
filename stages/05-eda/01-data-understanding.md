# Data understanding

## Start with the question and the grain

Write, in one sentence, the decision this analysis supports. Then write the **grain**: one row per what? User-day? Order? Impression? If you do not know the grain, every join is a landmine.

Define the **target** as a future event relative to a prediction time. “Churn” without a window is not a target. “Will this user have zero sessions in the next 28 days, predicted on Sunday night” is.

## Types of data

- **Structured:** tables with types.
- **Semi-structured:** JSON logs.
- **Unstructured:** text, images, audio.

Inside tables: numeric, categorical, ordinal, datetime, identifiers (do not average IDs), text.

## Missingness

- **MCAR:** missing completely at random. Rare. Dropping rows is least harmful here.
- **MAR:** missingness depends on observed columns (income missing more for a certain job title you do have). Imputation using those columns can be valid.
- **MNAR:** missingness depends on the missing value itself (people skip the “salary” field when it is extreme). The missingness **is** the signal; a missing flag often beats a fancy imputer.

Never fill first and think later. Count, condition, then decide.

## Leakage

Leakage is using information that would not be available at prediction time.

Examples: using the “closed_at” timestamp to predict whether a ticket is still open; normalizing with the test set; using a feature that is a restatement of the target (“refund_flag” to predict “had_refund”).

Time-based splits for anything with a clock. Grouped splits when the same entity appears twice.

## Outliers

An outlier is either a bug (unit is milliseconds, you thought seconds) or the story (enterprise whale). Plot, then decide. Winsorize for models that hate tails; keep a separate “whale” analysis for the business.

## You should be able to

- State grain and target for a project before touching pandas.
- Classify missingness with a plausible story.
- Give two leakage examples from product data.
- Distinguish bug outliers from structural outliers.

Next: [Analysis and visualization](02-analysis-and-visualization.md).
