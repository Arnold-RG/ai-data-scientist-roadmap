# How to study with this repository

This is a **practice curriculum**, not a video course. You learn by reading a short lesson, writing a little code, failing a quiz, and fixing the gap.

The topic order follows [roadmap.sh/ai-data-scientist](https://roadmap.sh/ai-data-scientist). Do not skip Mathematics and Statistics because they feel slow. Later stages only make sense if those two are solid.

## The loop

For every stage:

1. **Read** the stage `README.md`, then each topic file in order.
2. **Write** the matching functions in `exercises/` from memory (the files currently contain worked solutions — copy them aside first if you want a real test).
3. **Check** with pytest: `pytest tests/test_stage_0N_....py`.
4. **Quiz** with `python quizzes/run_quiz.py --stage 0N`. Passing is 70%.
5. **Build** the linked project in `projects/` until its README “done when” list is true.
6. **Tick** the boxes in [progress/tracker.md](progress/tracker.md).

If a quiz score is under 70%, reread only the explanations you missed. Do not restart the whole stage.

## Time

| Pace | Calendar | Hours / week |
| --- | --- | --- |
| Focused | [12 weeks](STUDY_PLAN.md#12-week-plan) | 10–14 |
| Thorough | [24 weeks](STUDY_PLAN.md#24-week-plan) | 6–8 |

A stage is done when you can explain the checklist items out loud without the notes.

## What “good” looks like

- You can say **what a method assumes**, not only how to call it in scikit-learn.
- You can name a **metric** that would lie in a given situation (accuracy on rare fraud, R² on a random walk, p-values after peeking).
- You can tell a stakeholder **what you would do next**, not only what the model scored.

## Honest rules

- Do not paste secrets or real customer data into the projects.
- Treat AI coding assistants as Stage 10 skill, not as a substitute for Stages 1–9.
- When an assistant writes code, you still have to run the tests and explain the result.
