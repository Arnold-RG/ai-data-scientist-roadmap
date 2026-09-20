import json
from pathlib import Path

BANK = Path(__file__).resolve().parents[1] / "quizzes" / "bank"

REQUIRED = {"id", "prompt", "choices", "answer", "explanation"}


def test_bank_not_empty():
    files = list(BANK.glob("*.json"))
    assert len(files) >= 12, f"expected 12 quiz files, found {len(files)}"


def test_each_quiz_schema():
    ids = set()
    for path in sorted(BANK.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        assert data.get("title")
        assert data.get("questions")
        passing = data.get("passing_score", 70)
        assert 50 <= passing <= 100
        for q in data["questions"]:
            missing = REQUIRED - set(q)
            assert not missing, f"{path.name} missing {missing}"
            assert len(q["choices"]) >= 2
            assert 0 <= int(q["answer"]) < len(q["choices"])
            assert q["id"] not in ids, f"duplicate id {q['id']}"
            ids.add(q["id"])
            assert len(q["prompt"].strip()) >= 4
            assert len(q["explanation"].strip()) >= 4
