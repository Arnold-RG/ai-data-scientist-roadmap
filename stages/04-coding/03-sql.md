# SQL for data scientists

SQL is how structured data actually lives. If you cannot join, window, and aggregate, you are waiting on someone else for every question.

## The grammar

```sql
SELECT ...
FROM table
JOIN other ON ...
WHERE   -- row filter before grouping
GROUP BY ...
HAVING  -- filter after aggregation
ORDER BY ...
LIMIT ...
```

Execution is not left-to-right in the file. Mentally: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.

## Joins

- **INNER**: keep matches.
- **LEFT**: keep all left rows; right side may be NULL.
- **FULL**: both sides, padded.
- **CROSS**: every pair — usually a bug.

Joins duplicate rows if the key is not unique. After every join, check grain: “is this still one row per order?”

NULL is not a value. `= NULL` is never true. Use `IS NULL`. Outer joins manufacture NULLs.

## Aggregations

`COUNT(*)` counts rows. `COUNT(col)` skips NULL. `SUM` of an empty set is NULL, not 0 — `COALESCE`.

## Window functions

Windows compute without collapsing rows:

```sql
SUM(amount) OVER (PARTITION BY user_id ORDER BY ts
                  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
```

`ROW_NUMBER`, `RANK`, `LAG`/`LEAD`, running totals, z-scores per group — this is how you build features in the warehouse.

## CTEs

`WITH recent AS (...)` is a named subquery. Readability first. Some engines optimize them; some inline them. Correctness first anyway.

## Analytics thinking

Translate the English: “for each customer, the last 90 days GMV, excluding refunds, compared to the previous 90.” That is filters, date math, two aggregations, a join to the customer dimension, and a window or self-join. Write the grain on paper before the SELECT list.

The coding exercises use pandas as a stand-in so you can pytest without a database: `inner_join` and `group_by_mean`. The logic is the same.

## You should be able to

- Write an inner and left join and predict NULL behavior.
- Use `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` to take latest row per entity.
- Explain grain after a join.
- Replace a correlated subquery with a join or window when it reads better.

Quiz: `python quizzes/run_quiz.py --stage 04`. Next: [EDA](../05-eda).
