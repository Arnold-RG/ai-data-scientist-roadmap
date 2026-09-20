# AI coding assistants and app builders

## What they are good at

- Boilerplate: argparse, argparse, argparse.
- Translating a precise spec into pandas or SQL.
- Generating tests once you describe the invariants.
- Explaining a stack trace you paste.

## What they are bad at

- Silent leakage in ML pipelines.
- Inventing libraries and flags that do not exist.
- Security: concatenating SQL, writing secrets to disk, `pickle` from the internet.
- Product sense: they will optimize accuracy when you needed a simple rule.

## A working protocol

1. **Write the spec and the tests first** (or at least the function names and examples).
2. Ask the assistant to implement against those tests.
3. Read the diff. If you cannot explain a line, it does not ship.
4. Run pytest, the quiz, the project script.
5. Ask for a review: “what could leak the target in this code?”

That is Stage 10 skill. “Accept all” is not.

## App builders

Tools that scaffold whole apps from a prompt are useful for demos and internal tools. They still produce systems with auth, data, and failure modes. You are the owner. Check dependency lockfiles, secrets handling, and whether the generated ML code has a real split.

## Study-only ethics

This repository exists so you practice. Do not submit generated notebooks as if you understood them. Interviewers can tell in four questions (they are in `interview/questions.md`).

## You should be able to

- Describe a test-first loop with an assistant.
- Name two security failure modes of generated code.
- Use an assistant on the capstone without skipping `output/executive_summary.md`.

Final exam: `python quizzes/run_quiz.py --exam`.
