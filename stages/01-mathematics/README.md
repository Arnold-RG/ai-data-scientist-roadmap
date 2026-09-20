# Stage 01 — Mathematics

Mathematics is not a hazing ritual for data scientists. It is the language models already speak.

A linear model is a dot product. Principal component analysis is an eigendecomposition of a covariance matrix. Gradient descent is calculus on a loss surface. Attention in a transformer is a scaled matrix of dot products followed by softmax. If you skip this stage, later tools still “work” — you just cannot tell when they are lying.

This stage follows the first node on [roadmap.sh/ai-data-scientist](https://roadmap.sh/ai-data-scientist): **Linear algebra, calculus, and mathematical analysis**.

## What you will be able to do

- Translate a model formula into vectors and matrices, and back.
- Compute a gradient for a tiny squared-error problem by hand.
- Explain convex vs non-convex loss and why random initialization matters.
- Connect SVD to dimensionality reduction and to “directions of variation” in data.

## How the three topics fit

| Topic | Job in machine learning |
| --- | --- |
| [Linear algebra](01-linear-algebra.md) | Represent data, weights, and similarities |
| [Calculus](02-calculus.md) | Move weights to reduce error |
| [Mathematical analysis](03-mathematical-analysis.md) | Know when those moves are guaranteed, fragile, or meaningless |

## Two-week plan

**Week A — Linear algebra.** Vectors, matrices, multiplication, norms, rank, eigenvalues, SVD. After each idea, write one sentence: “In a model this is used for ___.”

**Week B — Calculus and analysis.** Partials, chain rule, gradient descent, convexity. Finish with `pytest tests/test_stage_01_math.py` and `python quizzes/run_quiz.py --stage 01`.

## Setup for the exercises

The file `exercises/stage_01_math.py` contains working implementations of dot products, matrix multiplication, softmax, and a gradient step. To actually study:

1. Rename the file to `stage_01_math.solutions.py`.
2. Recreate the functions with empty bodies.
3. Run pytest until green.

## Common traps

- Mixing row-vector and column-vector conventions. Pick one and stay with it. This repo uses 1-D numpy arrays for vectors and 2-D arrays for matrices, with the last index as the column.
- Treating “the derivative is zero” as “we found the global minimum.” That is true for convex smooth losses, not for deep nets.
- Memorizing SVD as three mysterious letters. It is “rotate, stretch, rotate back.”

## Checkpoint

```bash
pytest tests/test_stage_01_math.py
python quizzes/run_quiz.py --stage 01
```

Next: [Stage 02 — Statistics](../02-statistics).
