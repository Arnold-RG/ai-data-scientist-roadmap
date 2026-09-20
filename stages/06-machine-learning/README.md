# Stage 06 — Machine Learning

Machine learning is the official roadmap node **classic ML (supervised, unsupervised) plus advanced ML (ensembles, neural nets)**.

The craft is not “fit a model.” It is **a target, a split that mimics production, a metric that matches the decision, a baseline, then complexity if the baseline loses**.

## Map

| File | Use |
| --- | --- |
| [Supervised learning](01-supervised.md) | Labels, regularization, metrics |
| [Unsupervised learning](02-unsupervised.md) | Clusters and PCA, and their failure modes |
| [Ensembles and shallow nets](03-ensembles-and-nns.md) | Bagging, boosting, a first neural view |

## Non-negotiables

- **Train / validation / test.** Test once. Validation may be k-fold.
- **No leakage** through scaling, encoding, or target-derived features.
- **Baseline:** mean predictor, majority class, or a single feature rule.
- **Metric:** accuracy on 1% fraud is a con. Use precision/recall, ROC-AUC, PR-AUC, log loss, calibration.

## Practice

```bash
pytest tests/test_stage_06_ml.py
python quizzes/run_quiz.py --stage 06
python projects/02-house-prices/train.py
python projects/04-customer-segments/cluster.py
```

Next: [Stage 07 — Deep learning](../07-deep-learning).
