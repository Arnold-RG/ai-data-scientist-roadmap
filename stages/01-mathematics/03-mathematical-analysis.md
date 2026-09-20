# Mathematical analysis (the guarantees)

Linear algebra tells you the objects. Calculus tells you how they move. Analysis tells you **whether the movement is allowed to work**.

You do not need a real-analysis course. You need a few ideas that keep showing up in papers and in debugging.

## Limits and continuity

A function is continuous if small input changes make small output changes. Losses used in practice are usually continuous, but **metrics** you report (accuracy, F1) are not always friendly: a tiny logit change can flip a class and jump the metric.

Optimization assumes you can follow a slope. If the function is discontinuous, “the gradient” may not exist. That is one reason we train with cross-entropy or squared error, then *report* accuracy.

## Convex vs non-convex

A function is **convex** if the line between any two points on the graph lies above the graph. Bowl-shaped. For convex differentiable losses (ridge regression, logistic regression with a linear model), every local minimum is global. Gradient descent, with a sensible step size, is boring in a good way.

Deep networks are **non-convex**. Many valleys. Some are similar in loss. Some are terrible. Random initialization, width, residual connections, and overparameterization change which valley you fall into. “We hit a local minimum” is sometimes true and often an excuse — on modern nets, saddles and plateaus are the more common villains.

## Lipschitz and smoothness

A function is **Lipschitz** if it cannot change faster than some constant `K`: `|f(a) − f(b)| ≤ K ||a − b||`. Gradients that are Lipschitz (smoothness) let you pick a learning rate theoretically: `η < 2 / L` for `L`-smooth convex problems.

In practice you will not compute `L`. You will still use the idea: exploding gradients mean “the map is locally too steep”; gradient clipping is a blunt Lipschitz patch.

## Norms, balls, and regularization

Constraining `||w||₂ ≤ C` is a ball in weight space. Lagrange dual of that constraint is ridge (`λ||w||₂²`). L1 balls have corners on the axes, which is why Lasso zeros coordinates. Geometry first, penalty second.

## Why local minima matter in deep nets

- Different minima can generalize differently even with similar training loss.
- Sharp minima (high curvature) often sit on noisy data; flatter regions sometimes generalize better — a heuristic, not a theorem you should worship.
- Early stopping is analysis in disguise: you leave the optimization path before it interpolates noise.

## You should be able to

- Draw a convex bowl and a non-convex landscape and mark where GD can stop.
- Explain why classification accuracy is a bad training loss.
- Connect L2 regularization to a ball constraint.
- Say what exploding/vanishing gradients mean without naming a framework.

Checkpoint: `python quizzes/run_quiz.py --stage 01`. Next stage: [Statistics](../02-statistics).
