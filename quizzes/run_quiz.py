"""Interactive study quizzes for the AI & Data Scientist roadmap.

Usage:
    python quizzes/run_quiz.py                 # menu
    python quizzes/run_quiz.py --stage 01
    python quizzes/run_quiz.py --exam
    python quizzes/run_quiz.py --interview
    python quizzes/run_quiz.py --all
    python quizzes/run_quiz.py --validate
"""

from __future__ import annotations

import argparse
import json
import random
import sys
from pathlib import Path

BANK_DIR = Path(__file__).resolve().parent / "bank"
PASSING = 70


def load_quiz(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    if "questions" not in data or not data["questions"]:
        raise ValueError(f"{path.name} has no questions")
    for i, q in enumerate(data["questions"], start=1):
        for key in ("id", "prompt", "choices", "answer", "explanation"):
            if key not in q:
                raise ValueError(f"{path.name} question {i} missing '{key}'")
        if not isinstance(q["choices"], list) or len(q["choices"]) < 2:
            raise ValueError(f"{path.name} question {i} needs 2+ choices")
        if not 0 <= int(q["answer"]) < len(q["choices"]):
            raise ValueError(f"{path.name} question {i} has a bad answer index")
    return data


def list_quizzes() -> list[Path]:
    return sorted(BANK_DIR.glob("*.json"))


def ask(question: dict, number: int, total: int) -> bool:
    print()
    print("=" * 72)
    print(f"Question {number}/{total}  [{question.get('difficulty', 'core').upper()}]  ({question['id']})")
    print(question["prompt"].strip())
    print()
    letters = "ABCDEFGH"
    for i, choice in enumerate(question["choices"]):
        print(f"  {letters[i]}. {choice}")
    print()
    while True:
        raw = input("Your answer (letter or number, or q to quit): ").strip().lower()
        if raw in {"q", "quit", "exit"}:
            raise KeyboardInterrupt
        if raw.isdigit():
            idx = int(raw) - 1
        elif raw and raw[0] in letters.lower():
            idx = letters.lower().index(raw[0])
        else:
            print("Please enter a letter like A, or a number like 1.")
            continue
        if 0 <= idx < len(question["choices"]):
            break
        print("That choice is out of range.")
    correct = idx == int(question["answer"])
    if correct:
        print("Correct.")
    else:
        right = letters[int(question["answer"])]
        print(f"Not quite. Correct answer: {right}. {question['choices'][int(question['answer'])]}")
    print(f"Why: {question['explanation'].strip()}")
    return correct


def run_quiz(data: dict, shuffle: bool = True) -> tuple[int, int]:
    questions = list(data["questions"])
    if shuffle:
        random.shuffle(questions)
    correct = 0
    total = len(questions)
    print()
    print(data.get("title", "Quiz"))
    print(data.get("description", ""))
    print(f"{total} questions. Passing score: {data.get('passing_score', PASSING)}%.")
    try:
        for i, q in enumerate(questions, start=1):
            if ask(q, i, total):
                correct += 1
    except KeyboardInterrupt:
        print("\nQuiz paused.")
        return correct, i - 1 if total else 0
    return correct, total


def report(title: str, correct: int, total: int, passing: int = PASSING) -> bool:
    if total <= 0:
        print("No questions answered.")
        return False
    score = round(100 * correct / total)
    print()
    print("-" * 72)
    print(f"{title}")
    print(f"Score: {correct}/{total}  ({score}%)")
    passed = score >= passing
    print("Result: PASS" if passed else "Result: KEEP STUDYING — review the explanations and retry.")
    return passed


def validate() -> int:
    files = list_quizzes()
    if not files:
        print("No quiz files found.")
        return 1
    errors = 0
    for path in files:
        try:
            data = load_quiz(path)
            print(f"OK  {path.name:28}  {len(data['questions']):3} questions")
        except Exception as exc:
            errors += 1
            print(f"FAIL {path.name}: {exc}")
    return 1 if errors else 0


def choose_from_menu() -> Path | None:
    files = list_quizzes()
    print("AI & Data Scientist Study Quizzes")
    print()
    for i, path in enumerate(files, start=1):
        data = json.loads(path.read_text(encoding="utf-8"))
        print(f"  {i:2}. {data.get('title', path.stem)} ({len(data.get('questions', []))} questions)")
    print()
    raw = input("Pick a quiz number: ").strip()
    if not raw.isdigit() or not (1 <= int(raw) <= len(files)):
        print("Invalid choice.")
        return None
    return files[int(raw) - 1]


def resolve_target(args: argparse.Namespace) -> list[Path]:
    files = list_quizzes()
    if args.validate:
        return []
    if args.all:
        return files
    if args.exam:
        return [p for p in files if p.stem.startswith("99-")]
    if args.interview:
        return [p for p in files if "interview" in p.stem]
    if args.stage:
        key = str(args.stage).zfill(2)
        matches = [p for p in files if p.stem.startswith(key)]
        if not matches:
            raise SystemExit(f"No quiz found for stage {args.stage}")
        return matches
    chosen = choose_from_menu()
    return [chosen] if chosen else []


def main() -> int:
    parser = argparse.ArgumentParser(description="Study quizzes for the AI & Data Scientist roadmap.")
    parser.add_argument("--stage", help="Stage number, e.g. 01 or 7")
    parser.add_argument("--exam", action="store_true", help="Run the final mixed exam")
    parser.add_argument("--interview", action="store_true", help="Run interview-style questions")
    parser.add_argument("--all", action="store_true", help="Run every quiz in sequence")
    parser.add_argument("--validate", action="store_true", help="Validate quiz JSON files")
    parser.add_argument("--no-shuffle", action="store_true")
    args = parser.parse_args()

    if args.validate:
        return validate()

    targets = resolve_target(args)
    if not targets:
        return 1

    grand_correct = 0
    grand_total = 0
    for path in targets:
        data = load_quiz(path)
        correct, total = run_quiz(data, shuffle=not args.no_shuffle)
        report(data.get("title", path.stem), correct, total, data.get("passing_score", PASSING))
        grand_correct += correct
        grand_total += total
    if len(targets) > 1:
        report("Combined score", grand_correct, grand_total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
