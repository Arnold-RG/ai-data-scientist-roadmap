# The data science lifecycle

A lifecycle is a shared checklist so a project does not jump from “idea” to “production pickle” with no evaluation.

## A beginner sequence (use this first)

1. **Define the problem.** Decision, owner, success metric, constraints (privacy, latency, fairness).
2. **Collect and clean.** Grain, time window, leakage audit.
3. **Analyze and visualize.** EDA until you can predict what a simple model will find.
4. **Build and evaluate.** Baseline, then one serious model, on a split that mimics production.
5. **Share and, if earned, deploy.** Monitoring after.

That is enough for every project in this repository.

## CRISP-DM (industry default)

Business understanding → data understanding → data preparation → modeling → evaluation → deployment, **iterating** when evaluation fails. Retail segmentation is the textbook example: you learn the clusters are unusable, return to business understanding, and redefine “segment.”

## Other names you will hear

- **KDD:** more academic, emphasis on mining and interpretation.
- **SEMMA:** sample, explore, modify, model, assess (SAS-centric).
- **TDSP:** team-oriented, agile, Microsoft’s packaging of the same ideas.
- **MLOps lifecycle:** data engineering, training, deployment, monitoring — Stage 08 of this repo.

Pick CRISP-DM when you need to stay aligned with a business owner. Pick MLOps when the model already exists and the pain is production. Do not spend a week choosing a framework instead of defining the target.

## Model drift

After deployment the world moves. **Data drift** is P(X) changing. **Concept drift** is P(Y|X) changing. Detection: monitor inputs, outputs, and delayed labels. Response: retrain, rollback, or stop using the model.

Further reading in-repo: [Stage 08](../stages/08-mlops).
