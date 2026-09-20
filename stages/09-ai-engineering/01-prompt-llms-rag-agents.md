# Prompts, LLMs, RAG, agents, fine-tuning

## Language models

An LLM is a next-token (or masked-token) model trained at scale. It is not a database. It will invent citations. Treat fluency as a risk.

**Context window:** how many tokens of prompt+history it can see. Long windows are not a memory architecture; they are a bigger bag. Put the important evidence near the question anyway.

## Prompting

A prompt is a spec: role, constraints, output schema, evidence. Good prompts are boring.

- Ask for a format you can parse (JSON with a schema you validate).
- Provide examples (few-shot) when the task is stylistic or fiddly.
- Do not “jailbreak yourself” with 40 adjectives. Be precise.
- For analysis tasks, force **citations to provided snippets** so you can audit.

## RAG (retrieval-augmented generation)

Classic paper idea: for knowledge-heavy tasks, **retrieve first**, then generate conditioned on those chunks.

Pipeline:

1. Chunk documents with overlap.
2. Embed or TF-IDF vectorize.
3. Retrieve top-k for the query.
4. Generate an answer **only from those chunks**, or extract spans (this repo’s lite version).
5. Evaluate: did we retrieve the right doc? Is the answer grounded? Did we refuse when missing?

If retrieval is wrong, a smarter generator writes a more eloquent wrong answer. Fix recall@k before you fine-tune.

When to RAG vs fine-tune:

- **RAG:** facts change, you need citations, many private docs.
- **Fine-tune:** style, format, domain jargon, or behavior that prompting cannot stabilize. Still not the first tool for “our wiki should be the source of truth.”

## Agents

An **agent** is an LLM allowed to choose tools in a loop (search, SQL, calculator, ticket API) until it stops. A **workflow** is a fixed graph you designed.

Start with workflows. Agents are for when the path cannot be enumerated. They fail by looping, by calling tools with garbage, by never stopping. Hard timeouts, tool allowlists, and traces are mandatory.

## Evaluation

Human spot checks do not scale. Build a tiny labeled set:

- faithfulness / groundedness,
- answer relevance,
- retrieval hit rate,
- toxicity / PII leaks.

Hallucination is a default. Measurement is the product.

## You should be able to

- Explain why an LLM is not a knowledge base.
- Draw a RAG pipeline and name a metric for each stage.
- Argue RAG vs fine-tune for a given spec.
- Contrast an agent loop with a DAG workflow.

Quiz: `python quizzes/run_quiz.py --stage 09`. Project: [08-rag-lite](../../projects/08-rag-lite).
