# Contributing

This is a personal study curriculum, but improvements are welcome.

## What belongs here

- Clearer explanations of an existing stage
- Extra quiz questions with explanations
- Tighter tests for an exercise
- Bug fixes in project scripts
- Typo and clarity edits

## What does not belong here

- Scraped course notes or copyrighted textbook chapters
- Real private data
- Paid API keys or secrets
- Solutions dumped without teaching commentary

## How to add a quiz question

Edit the matching file in `quizzes/bank/`. Keep the schema:

```json
{
  "id": "s02-q21",
  "prompt": "A short, unambiguous question?",
  "choices": ["A", "B", "C", "D"],
  "answer": 2,
  "explanation": "Why the keyed choice is right, and why a tempting wrong choice fails.",
  "difficulty": "core"
}
```

Then run:

```bash
python quizzes/run_quiz.py --validate
pytest tests/test_quizzes_valid.py
```

## How to add an exercise

1. Add a function in `exercises/`.
2. Add tests in `tests/`.
3. Keep dependencies inside `requirements.txt`.
