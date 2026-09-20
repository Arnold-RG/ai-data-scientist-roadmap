# 04 — Customer segments

**Goal.** Cluster synthetic RFM-like features and name the groups.

**Skills.** Scaling, k-means, silhouette, cluster sizes.

## Run

```bash
python projects/04-customer-segments/cluster.py
```

`output/segments.json` includes `k`, `silhouette`, `sizes`, and `profiles`.

## Done when

- You can give each cluster a one-line marketing name from the profiles.
- You know why features were standardized.
