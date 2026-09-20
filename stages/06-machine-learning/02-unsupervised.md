# Unsupervised learning

No target. You are imposing a shape on X: groups, or a lower-dimensional plane.

## Clustering

**k-means** minimizes within-cluster squared distance to k centroids. It wants spherical blobs of similar size. Scale features first. `k` is a product decision as much as a silhouette number.

**Hierarchical clustering** builds a tree of merges. Useful when you want a dendrogram and n is small.

**GMM** (Gaussian mixture): soft clusters, ellipses. More flexible, more fragile.

When clustering fails: clusters are elongated, nested, or just a continuum. Then a segmentation from a supervised propensity model may be more honest than k-means theater.

Always report **cluster sizes**, a **silhouette** (or similar), and **profiles** (mean spend, recency) a human can name. If you cannot name them, you do not have segments. You have colors.

Project: [04-customer-segments](../../projects/04-customer-segments).

## PCA

PCA finds orthogonal directions of variance. It is not clustering. It is a compression / noise filter / visualization tool. A principal component that explains 40% of variance might be useless for your target. Supervised feature selection and PCA are different jobs.

## You should be able to

- List k-means assumptions.
- Explain why silhouette can look fine on nonsense groups.
- Use PCA for a scatter of customers without claiming the axes “are” recency and frequency without checking loadings.

Next: [Ensembles and neural nets](03-ensembles-and-nns.md).
