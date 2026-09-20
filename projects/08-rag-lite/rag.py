"""Tiny local RAG: TF-IDF retrieval + extractive sentence pick."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

ROOT = Path(__file__).resolve().parent
DOCS = ROOT / "data" / "docs"
OUT = ROOT / "output"


def load_docs():
    items = []
    for path in sorted(DOCS.glob("*.txt")):
        text = path.read_text(encoding="utf-8").strip()
        items.append({"title": path.stem, "path": str(path.name), "text": text})
    return items


def sentences(text: str) -> list[str]:
    parts = [s.strip() for s in text.replace("\n", " ").split(".")]
    return [p + "." for p in parts if len(p.split()) > 3]


def answer(question: str, top_k: int = 2) -> dict:
    docs = load_docs()
    corpus = [d["text"] for d in docs]
    vec = TfidfVectorizer(stop_words="english")
    X = vec.fit_transform(corpus)
    q = vec.transform([question])
    sims = cosine_similarity(q, X).ravel()
    order = sims.argsort()[::-1][:top_k]
    retrieved = [{"title": docs[i]["title"], "score": round(float(sims[i]), 4)} for i in order]
    best = docs[int(order[0])]
    sents = sentences(best["text"])
    if not sents:
        span = best["text"][:240]
    else:
        S = vec.transform(sents)
        span = sents[int(cosine_similarity(q, S).ravel().argmax())]
    return {"question": question, "retrieved": retrieved, "answer": span, "source": best["title"]}


def main() -> None:
    OUT.mkdir(exist_ok=True)
    question = " ".join(sys.argv[1:]).strip() or "What does CUPED do?"
    payload = answer(question)
    (OUT / "answer.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(payload["source"], "->", payload["answer"])


if __name__ == "__main__":
    main()
