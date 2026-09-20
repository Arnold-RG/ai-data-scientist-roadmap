# Interview questions

Forty questions. Short model answers follow each. Cover the paper and say the limitation.

## Mathematics

1. **What is a dot product used for in ML?** Similarity, linear prediction, attention scores, covariance when centered.
2. **Why can `XᵀX` be non-invertible?** Duplicate or linearly dependent columns; too many features vs rows.
3. **PCA in one paragraph.** Eigenvectors of the covariance of centered data; keep directions of largest variance. Not necessarily predictive.
4. **What does the gradient of the loss point to?** Steepest *increase*. We step the opposite way.
5. **Why scale by `sqrt(d)` in attention?** Dot products grow with dimension and saturate softmax.

## Statistics

6. **Define a p-value.** Probability, under H₀, of a statistic as extreme as observed. Not P(H₀|data).
7. **CLT does not say raw data are normal.** It says averages of i.i.d. finite-variance variables become approximately normal.
8. **Type I vs II.** False positive vs missed detection. Power = 1 − Type II.
9. **Why is peeking bad?** The p-value assumes a single look; optional stopping inflates false wins.
10. **CUPED in one line.** Residualize the outcome on pre-experiment covariates to cut variance without biasing the effect if X is pre-treatment.

## Econometrics

11. **Prediction vs causal effect.** Association in the observed regime vs what happens if we intervene on X.
12. **Omitted variable bias.** An excluded Z related to X and Y soaks into β_X.
13. **Why is trending time series R² often fake?** Nonstationarity and shared trends, not a stable relationship.
14. **What is stationarity (weak)?** Mean and autocovariance depend on lag, not on time.

## Coding & SQL

15. **Why virtualenv?** Reproducible dependencies; no global rot.
16. **Dict vs list lookup.** Average O(1) vs O(n).
17. **INNER vs LEFT join.** Matches only vs keep all left rows with NULLs.
18. **What does a window function not do?** It does not collapse rows the way GROUP BY does.
19. **Grain after a join.** If the right key is not unique, rows explode.

## EDA

20. **MCAR vs MNAR.** Missingness independent of everything vs depending on the missing value itself.
21. **Give a leakage example.** Using post-outcome information (close date, refund flag) as a feature.
22. **Why plot before modeling?** Mixtures, bugs, and segments hide in moments.

## Machine learning

23. **Why not accuracy on 1% fraud?** Majority classifier looks brilliant.
24. **Fit scalers on train only.** Test statistics leaking into train distorts evaluation.
25. **Bagging vs boosting.** Parallel variance reduction vs sequential residual fitting.
26. **k-means assumptions.** Spherical, similar size, scaled space, k chosen.
27. **Calibration vs discrimination.** Reliability of probabilities vs ranking quality (AUC).

## Deep learning

28. **Why ReLU over sigmoid in hidden layers?** Less saturation, cheaper, better gradient flow.
29. **Why convolution?** Locality and weight sharing on grids.
30. **LSTM vs vanilla RNN.** Gates / cell state mitigate vanishing gradients through time.
31. **BERT vs GPT mask.** Bidirectional vs causal (no future tokens).

## MLOps

32. **Batch vs online scoring.** Table job vs latency-sensitive API.
33. **Serialize the pipeline.** Imputer and scaler belong with the model.
34. **Data vs concept drift.** P(X) vs P(Y|X).

## AI engineering

35. **Why is an LLM not a knowledge base?** It predicts tokens; it is not a consistent store of facts.
36. **RAG vs fine-tune.** Fresh private facts + citations vs style/behavior.
37. **Agent vs workflow.** Model-chosen tool loop vs a designed DAG.
38. **What if retrieval is wrong?** Generation will fluently lie; fix recall@k first.

## Assistants

39. **How do you use a coding assistant safely?** Tests and spec first, read the diff, never accept unseen SQL/secrets.
40. **Name a silent ML bug an assistant might add.** Scaling on full data; shuffled k-fold on time series; leaking the target through a feature.

Warmup quiz: `python quizzes/run_quiz.py --interview`.
