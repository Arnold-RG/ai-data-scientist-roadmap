# Stage 08 — Deployment and CI/CD

Read this as the long form of the [stage overview](README.md).

## A minimal production path

1. Freeze the training code and data snapshot (date, query, hash).
2. Train with a seed. Write metrics on a **time-based** holdout.
3. Package `pipeline.pickle` + `model_card.md` (who, when, metric, known failure slices).
4. Serve: CLI, batch job, or HTTP.
5. Log inputs (with privacy rules) and predictions.
6. Join labels later. Chart weekly performance. Alert on population shifts.

Docker is “the same OS library versions on every machine.” You do not need to master Docker to pass this stage, but you should know why “it worked on my laptop” is not a release strategy.

GitHub Actions (see `.github/workflows/study-checks.yml`) is CI: a clean machine runs pytest. CD would additionally push an image or a pickle to a registry.

## Rollback

Keep the previous artifact. Shipping ML without rollback is shipping without a seatbelt.

## You should be able to

- Sketch the six steps above for the churn capstone.
- Explain why evaluating on a random split can be too kind for production.
- Say what a model card is for.

Continue: [AI engineering](../09-ai-engineering).
