# Stage 07 — Deep Learning

The official node: **fully connected, CNN, RNN, LSTM, transformers, transfer learning**.

Deep learning is gradient descent on compositions of linear maps and simple nonlinearities, at a scale where features are learned instead of typed into a spreadsheet.

You can complete this stage’s exercises with NumPy only. Production work uses PyTorch (or JAX/TensorFlow). The ideas transfer.

## Map

| File | Use |
| --- | --- |
| [Fully connected](01-fully-connected.md) | Layers, activations, backprop, optimizers |
| [CNNs](02-cnn.md) | Grid structure in images |
| [RNNs and LSTMs](03-rnn-lstm.md) | Sequences before attention |
| [Transformers and transfer](04-transformers-and-transfer.md) | Attention, BERT vs GPT, reuse |

## Practice

```bash
pytest tests/test_stage_07_dl.py
python quizzes/run_quiz.py --stage 07
python projects/06-sentiment/train.py
python projects/07-image-shapes/train.py
```

Next: [Stage 08 — MLOps](../08-mlops).
