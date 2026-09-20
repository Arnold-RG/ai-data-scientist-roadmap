# Calculus for data science

Training a model is almost always: **pick a loss, compute how the loss changes when weights move, step downhill.**

That is calculus.

## Derivatives

For `f(w)`, the derivative `f'(w)` is the slope: if you bump `w` by a tiny `ε`, `f` changes by about `f'(w)·ε`.

In machine learning `w` is a vector, so you need **partial derivatives**. The **gradient** `∇f(w)` stacks every partial. It points to the direction of steepest increase. Gradient descent therefore does:

```text
w ← w − η ∇L(w)
```

`η` (eta) is the **learning rate**. Too large: you jump over the valley. Too small: you crawl.

## Chain rule

Almost every modern model is nested functions: `L(y, ŷ(W₂ · σ(W₁x)))`. The chain rule says derivatives multiply along the path.

Backpropagation is the chain rule applied to a computation graph, with intermediate results cached so you do not recompute them. You do not need to derive every layer from scratch, but you must believe that **if a path from a weight to the loss is blocked (dead ReLU, vanishing product of small derivatives), that weight stops learning**.

The **Jacobian** is the matrix of all first partials of a vector-valued function. The **Hessian** is the matrix of second partials of a scalar function. Convexity is “Hessian positive semidefinite.” Newton methods use the Hessian; deep learning usually does not, because it is huge.

## Worked example: two weights, squared error

Data: one point `x = 2`, target `y = 5`. Model: `ŷ = w₁ x + w₀`. Loss: `L = (y − ŷ)²`.

```text
ŷ = 2 w₁ + w₀
L = (5 − 2 w₁ − w₀)²

∂L/∂w₀ = −2 (5 − 2 w₁ − w₀)
∂L/∂w₁ = −4 (5 − 2 w₁ − w₀)
```

Start at `w₀ = 0`, `w₁ = 0`, `η = 0.05`:

```text
∇L = (−10, −20)
w₀ ← 0 − 0.05(−10) = 0.5
w₁ ← 0 − 0.05(−20) = 1.0
ŷ becomes 2.5, error dropped from 5 to 2.5
```

One more step still moves toward `w₁ = 2.5`, `w₀ = 0` (any pair with `2w₁ + w₀ = 5` fits this single point — two parameters, one observation: underdetermined). This is why you need more data, or regularization.

## Learning rates and curvature

If the loss is a long ravine (very different curvatures in different directions), a single `η` is a compromise. Adaptive methods (Adam and friends) keep a per-parameter scale. They do not remove the need to think: they mainly stop you from picking one terrible global step size.

## You should be able to

- Write the gradient descent update from memory.
- Expand the chain rule for `σ(w·x)` with sigmoid `σ`.
- Explain vanishing gradients as a product of numbers smaller than 1.
- Hand-compute one step of the two-weight example above.

Read next: [Mathematical analysis](03-mathematical-analysis.md).
