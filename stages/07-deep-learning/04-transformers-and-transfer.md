# Transformers and transfer learning

The 2017 paper “Attention is all you need” replaced recurrence with **self-attention**: every token looks at every token (in the basic form) and builds a weighted mix of value vectors.

## Attention, mechanically

For queries Q, keys K, values V (rows are tokens):

```text
scores = Q Kᵀ / sqrt(d)
weights = softmax(scores)
output = weights V
```

The `sqrt(d)` scaling keeps dot products from saturating softmax. Multi-head attention does this several times with smaller projections and concatenates.

**Positional encodings** inject order, because attention itself is a bag of pairwise scores.

## Encoder vs decoder

- **Encoder** (BERT family): bidirectional context. Good for classification, span labeling, embeddings.
- **Decoder** (GPT family): causal mask so token t cannot see the future. Good for generation.
- **Encoder–decoder** (T5, original transformer): sequence-to-sequence.

## Transfer and fine-tuning

Pretrain on a huge corpus (masked language modeling, next-token prediction). Fine-tune on your small labeled set, or don’t: prompt a frozen model, or attach a retrieval system (Stage 09).

Fine-tuning updates weights. RAG updates the documents. Prompting updates neither. Cost, freshness, and privacy decide.

The exercise `attention_scores` in `exercises/stage_07_dl.py` is the scaled-dot-product piece without V. Implement it until it matches NumPy softmax.

## You should be able to

- Write the attention formula and why we scale.
- Contrast BERT-style vs GPT-style masks.
- Choose fine-tune vs freeze vs RAG at a high level.

Quiz: `python quizzes/run_quiz.py --stage 07`. Next: [MLOps](../08-mlops).
