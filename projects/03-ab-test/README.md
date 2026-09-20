# 03 — A/B test

**Goal.** Analyze a synthetic conversion experiment and write a ship / do-not-ship recommendation.

**Skills.** Two-proportion z-test, confidence interval, peeking humility.

## Run

```bash
python projects/03-ab-test/analyze.py
```

Read `output/report.json`. Argue with it: would you still ship if the CI crossed zero?

## Done when

- You can explain `p_value` vs `lift`.
- You state the primary metric in one sentence (conversion per user).
