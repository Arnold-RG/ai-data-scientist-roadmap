# Stage 02 — Statistics

Statistics is decision-making under uncertainty. Machine learning borrows its models; science borrows its honesty.

The official roadmap groups this stage as: descriptive statistics and the CLT, hypothesis testing, probability and sampling, A/B testing, then the professional extras — **test sensitivity**, **CUPED-style variance reduction**, and **ratio metrics**.

If you only remember one sentence: **a point estimate without a standard error is an anecdote with extra decimal places.**

## Map

| File | Use |
| --- | --- |
| [Descriptive stats and CLT](01-descriptive-stats-and-clt.md) | What the sample is allowed to say about the population |
| [Hypothesis testing](02-hypothesis-testing.md) | When a difference is not just noise |
| [Probability and sampling](03-probability-and-sampling.md) | Bayes, bias, bootstrap |
| [A/B testing](04-ab-testing.md) | Experiments you can defend |

## Practice

```bash
pytest tests/test_stage_02_stats.py
python quizzes/run_quiz.py --stage 02
```

Project: [03-ab-test](../../projects/03-ab-test).

Next: [Stage 03 — Econometrics](../03-econometrics).
