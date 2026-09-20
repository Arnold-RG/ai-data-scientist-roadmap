# Quizzes

Twelve banks in `quizzes/bank/`.

```bash
python quizzes/run_quiz.py                 # menu
python quizzes/run_quiz.py --stage 01
python quizzes/run_quiz.py --exam          # 99-final-exam.json
python quizzes/run_quiz.py --interview
python quizzes/run_quiz.py --validate
```

Passing is 70% except the final exam (75%). Questions are multiple choice with explanations. Shuffle is on by default.

After a miss, read the `Why:` line, then the matching `stages/` lesson — do not grind the same quiz blindly.
