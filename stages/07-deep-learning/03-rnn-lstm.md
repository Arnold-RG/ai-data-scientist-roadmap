# RNNs and LSTMs

Sequences: language, clicks, sensors. Order matters.

A **recurrent** net feeds the previous hidden state into the next step: `h_t = σ(W_x x_t + W_h h_{t-1} + b)`. The same weights process every time step. In theory it can remember the whole past. In practice, vanilla RNNs forget or explode because the gradient is a product of many `W_h` factors (**vanishing / exploding gradients** through time).

## LSTM / GRU

Gated architectures add learned valves:

- **Forget** (LSTM): what to drop from the cell.
- **Input:** what new content to write.
- **Output:** what to expose as `h_t`.

The cell state is a highway that gradients can travel. GRUs simplify the gates. For a decade this was the default for NLP and many time series.

## Status in 2026

Transformers displaced RNNs for most language and many sequence tasks because they mix any pair of tokens in one layer (with a cost) and train in parallel. You still learn LSTMs so that:

- you can read older papers and production systems,
- you understand gating (it reappears in other architectures),
- you have a fallback on very small streaming devices.

## You should be able to

- Draw one RNN step.
- Explain vanishing gradients as a product along time.
- Say what a gate is for, without reciting six equations.

Next: [Transformers](04-transformers-and-transfer.md).
