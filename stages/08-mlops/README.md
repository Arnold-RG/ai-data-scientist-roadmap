# Stage 08 — MLOps

The official node is **deploying models and CI/CD**.

A notebook accuracy is not a product. MLOps is the set of habits that keep a model **reproducible, shippable, and watched**.

## What “deployed” can mean

- **Batch:** score a table every night, write predictions to a warehouse.
- **Online:** an API that scores one record under a latency budget.
- **Streaming:** scores on events.
- **Edge:** the model sits on a device.

Start with batch unless you have a real latency need. Many “we need an API” requests are really “we need a scheduled job.”

## Serialization

Save the **pipeline** (imputer + scaler + model), not a lone classifier that expects already-scaled inputs. `pickle` is fine for this study repo. Joblib is common. ONNX appears when runtimes differ. Version the artifact: `model-2026-04-01.pickle` plus a metrics JSON.

## CI/CD for models

Continuous integration: every change runs tests (this repository’s GitHub Actions workflow is a miniature). For models, tests include:

- schema of input records,
- range of predictions (probabilities in [0,1]),
- golden examples that must not flip without review,
- training script still runs on a small fixture.

Continuous delivery: promoting an artifact from staging to production with an approval, not `scp` from a laptop.

## Monitoring

**Data drift:** input distribution moved (new app version, new country). **Concept drift:** the X→y relationship moved (season, competitor). Watch input stats, prediction stats, and delayed labels. Retrain on a schedule or on an alert, not on vibes.

## Project

[09-model-api](../../projects/09-model-api) trains a tiny model and exposes `predict.py`. Treat it as the smallest honest deployment.

## You should be able to

- Choose batch vs online for a use case.
- List what to serialize besides weights.
- Name one test that should run in CI for a model change.
- Define data drift vs concept drift.

Quiz: `python quizzes/run_quiz.py --stage 08`. Next: [AI engineering](../09-ai-engineering).
