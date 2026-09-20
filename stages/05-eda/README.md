# Stage 05 — Exploratory Data Analysis

EDA is the job. Modeling is a later chapter that EDA either earns or forbids.

The official node is **data understanding, analysis, and visualization**. If you skip it, you will leak the target, trust duplicate rows, and present a chart that answers the wrong question.

## Map

| File | Use |
| --- | --- |
| [Data understanding](01-data-understanding.md) | Definitions, missingness, leakage |
| [Analysis and visualization](02-analysis-and-visualization.md) | Pandas spine, plots that argue |

## Practice

```bash
pytest tests/test_stage_05_eda.py
python quizzes/run_quiz.py --stage 05
python projects/01-eda-retail/analyze.py
```

Next: [Stage 06 — Machine learning](../06-machine-learning).
