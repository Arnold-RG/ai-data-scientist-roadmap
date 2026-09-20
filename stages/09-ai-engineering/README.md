# Stage 09 — AI Engineering

The official node: **prompt engineering, LLMs, RAG, agents, fine-tuning**.

This is system design around a large language model. The model is a component. The product is retrieval, tools, evaluation, and guardrails.

## Map

The lesson [Prompts, LLMs, RAG, agents](01-prompt-llms-rag-agents.md) is the whole stage in one file on purpose: these pieces only make sense together.

## Practice

```bash
python quizzes/run_quiz.py --stage 09
python projects/08-rag-lite/rag.py "What does CUPED do?"
```

The RAG project uses **TF-IDF retrieval** and extractive answers. No API key. That is deliberate: you should understand retrieval quality before you wrap a vendor model around it.

Next: [Stage 10 — AI-assisted coding](../10-vibe-coding).
