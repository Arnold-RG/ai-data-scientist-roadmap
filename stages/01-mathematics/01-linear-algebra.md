# Linear algebra for data science

A dataset with `n` rows and `p` columns is already a matrix. Everything that happens later — scaling, projection, regression, embeddings, attention — is an operation on that matrix or on vectors derived from it.

## Vectors

A vector is an ordered list of numbers with a geometric meaning: a point, or an arrow from the origin.

The **dot product** `a · b = Σ aᵢbᵢ` is the single most useful operation in this field.

- If both vectors are centered (mean zero), the dot product is proportional to **covariance**.
- If both are length 1, the dot product is **cosine similarity**.
- Linear regression prediction is a dot product: `ŷ = w · x`.
- An attention score before softmax is a dot product between a query and a key.

**Norms** measure length. The Euclidean (L2) norm is `||x||₂ = sqrt(Σ xᵢ²)`. L1 is `Σ |xᵢ|`. Regularization in machine learning is “penalize large norms of the weight vector.”

Two vectors are **linearly independent** if neither is a scaled copy of the other (in higher dimensions: no vector is a combination of the rest). The **rank** of a matrix is the number of independent rows or columns. Duplicate features, dummy-variable traps, and perfect multicollinearity are rank problems.

## Matrices

Matrix-vector multiplication `Ax` is “apply a linear map to x.” Each row of `A` is a feature detector; each column is how one input coordinate fans out.

You multiply `A` (`m×k`) by `B` (`k×n`) only when the inner dimension matches. The product mixes the `k` shared axis. In a neural net, that shared axis is the width of a layer.

**Transpose** swaps rows and columns. For real vectors, `a · b = aᵀb` if you treat them as columns.

## Eigenvalues and eigenvectors

For a square matrix `A`, `Av = λv` means “`A` stretches `v` by `λ` and does not rotate it off its line.”

The covariance matrix of centered data is symmetric and positive semidefinite. Its eigenvectors are orthogonal directions of variation. The eigenvalues say how much variance lives on each direction. **PCA** keeps the top ones.

You do not need to diagonalize matrices by hand in production. You do need to know that “the first principal component” is not a magic feature — it is the direction of largest variance, which may or may not be the direction that predicts your target.

## SVD

Any real matrix `X` factors as `X = U Σ Vᵀ`:

- `V` rotates the input space to align with independent stretching axes.
- `Σ` is diagonal: stretch (the singular values).
- `U` rotates into the output space.

Truncated SVD is how you compress a ratings matrix, a term-document matrix, or a stack of embeddings. Large singular values are structure. Tiny ones are often noise.

## Worked example: projection

To project vector `x` onto a unit vector `u`:

```text
proj = (x · u) * u
```

If `u` is “the income direction” in a two-feature plane (income, age), the projection is the part of `x` explained by income. Residuals `x - proj` are what is left. Linear regression with an intercept is a more general projection onto the column space of the design matrix.

## You should be able to

- Compute a 3-D dot product and L2 norm without a calculator.
- Multiply a 2×3 matrix by a 3×2 matrix and know the result shape.
- Explain PCA in one paragraph using covariance, eigenvectors, and variance.
- Explain why duplicate columns make `XᵀX` non-invertible.

## Practice

```bash
pytest tests/test_stage_01_math.py
python quizzes/run_quiz.py --stage 01
```

Read next: [Calculus](02-calculus.md).
