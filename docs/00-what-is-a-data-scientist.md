# What is a data scientist?

A data scientist extracts **actionable insight** from data using programming, statistics, machine learning, and knowledge of the domain. That sentence is true and too smooth. The job is more specific: **turn a messy pile of evidence into a decision someone else can trust, under a deadline.**

## A picture, not a slogan

Look at a photo of a face. You can say the person is laughing, tired, or putting on a smile. A computer sees a grid of numbers. Getting from the grid to “this customer is furious in the support video” is a data problem: labels, lighting, bias in who gets recorded, a model, a threshold, and a policy for when the model is wrong.

The same pattern shows up in less cinematic work. A table of orders is also a pile of numbers until someone defines *repeat purchase in 30 days*, cleans refunds, and refuses to treat a chart as a launch decision.

## Four moves, in a loop

1. **Collect.** Warehouses, product logs, surveys, third-party feeds, text, images. If you do not know how a field was produced, you do not know what it means.
2. **Clean.** Missingness, duplicates, units, time zones, leakage, outliers that are bugs vs outliers that are whales. This is most of the calendar time.
3. **Analyze.** Exploratory plots, statistical tests, models. A model is optional. A question is not.
4. **Share.** A number, a plot, a recommendation, and the conditions that would make it false. If stakeholders cannot act, you wrote a diary.

## What the role is not

- Not “the person who knows Python.” Analysts and engineers know Python.
- Not “the person who trains neural nets.” Many excellent data scientists ship SQL + a well-designed experiment.
- Not a fortune teller. Forecasting is a product with error bars.

See also: [roles compared](roles-compared.md), [lifecycle](lifecycle.md), [skills](skills.md).

This curriculum follows [roadmap.sh/ai-data-scientist](https://roadmap.sh/ai-data-scientist): math → stats → econometrics → code → EDA → ML → deep learning → MLOps → LLM systems → AI-assisted engineering.
