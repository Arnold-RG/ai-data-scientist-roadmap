# Study plans

Two calendars. Same material. Different speed.

Commands assume you already created `.venv` and installed `requirements.txt` (see the root README).

## 12-week plan

Ten stages plus two integration weeks.

| Week | Focus | Read | Check | Quiz | Project |
| --- | --- | --- | --- | --- | --- |
| 1 | Mathematics | `stages/01-mathematics` | `pytest tests/test_stage_01_math.py` | `--stage 01` | Derive gradient descent by hand in your notes |
| 2 | Statistics core | `stages/02-statistics` (files 01–03) | `pytest tests/test_stage_02_stats.py` | `--stage 02` | — |
| 3 | Experiments | A/B testing lesson | — | retry `--stage 02` | [03-ab-test](projects/03-ab-test) |
| 4 | Econometrics | `stages/03-econometrics` | — | `--stage 03` | [05-time-series](projects/05-time-series) |
| 5 | Python, DSA, SQL | `stages/04-coding` | `pytest tests/test_stage_04_coding.py` | `--stage 04` | 8 SQL problems from the lesson |
| 6 | EDA | `stages/05-eda` | `pytest tests/test_stage_05_eda.py` | `--stage 05` | [01-eda-retail](projects/01-eda-retail) |
| 7 | Classical ML | `stages/06-machine-learning` | `pytest tests/test_stage_06_ml.py` | `--stage 06` | [02-house-prices](projects/02-house-prices) and [04-customer-segments](projects/04-customer-segments) |
| 8 | Deep learning | `stages/07-deep-learning` | `pytest tests/test_stage_07_dl.py` | `--stage 07` | [06-sentiment](projects/06-sentiment) and [07-image-shapes](projects/07-image-shapes) |
| 9 | MLOps | `stages/08-mlops` | — | `--stage 08` | [09-model-api](projects/09-model-api) |
| 10 | AI engineering | `stages/09-ai-engineering` | — | `--stage 09` | [08-rag-lite](projects/08-rag-lite) |
| 11 | Assistants + capstone | `stages/10-vibe-coding` | — | `--stage 10` | [10-capstone](projects/10-capstone) |
| 12 | Integration | `docs/` + `interview/` | `pytest` | `--exam` and `--interview` | Rewrite the capstone REPORT from scratch |

## 24-week plan

Double the time on math, stats, and ML. That is where most careers stall.

| Weeks | Focus |
| --- | --- |
| 1–3 | Mathematics. Redo linear algebra examples with paper. |
| 4–6 | Statistics + A/B project. Write a one-page experiment design before you code. |
| 7–8 | Econometrics and time series. |
| 9–10 | Python, DSA, SQL. One LeetCode easy/medium per day is enough. |
| 11–12 | EDA. Retail project plus a dataset you choose (still synthetic or public and licensed). |
| 13–16 | Machine learning. Houses + segments, then a second model family on the same data. |
| 17–19 | Deep learning. Sentiment + shapes. Read “Attention is all you need” *after* the transformer lesson. |
| 20–21 | MLOps. Model API plus a tiny GitHub Actions mental model (this repo already has one). |
| 22–23 | RAG-lite, prompts, agents. Capstone. |
| 24 | Final exam, interview bank, case studies. |

## Weekly checkpoint

At the end of each week, you should be able to answer **no** to none of these:

- Did I read the lesson, or only skim headings?
- Did pytest pass without editing the tests to be weaker?
- Did I score at least 70% on the quiz?
- Can I explain one mistake I made?

## After the plan

Keep going with related maps: [Python](https://roadmap.sh/python), [Data Analyst](https://roadmap.sh/data-analyst), [AI Engineer](https://roadmap.sh/ai-engineer).
