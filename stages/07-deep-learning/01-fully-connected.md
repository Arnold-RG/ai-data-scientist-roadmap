# Fully connected networks

A dense layer: `h = σ(Wx + b)`. Stack them. The last layer matches the task: linear for regression, sigmoid for binary, softmax for multiclass.

## Activations

- **ReLU:** max(0, z). Simple, sparse, can die if a unit always gets negative input.
- **Sigmoid / tanh:** saturates; gradients vanish. Still used at outputs (sigmoid for Bernoulli).
- **Softmax:** turns logits into a probability simplex. Always pair with cross-entropy, not with squared error, for classification.

## Backprop, in one paragraph

Each layer stores its forward inputs. The loss sends a gradient backward. Each layer multiplies by local derivatives (chain rule) and by `Wᵀ` to send the message to the previous layer, and by the outer product with its input to update `W`. Frameworks do this with autograd. You still debug by asking “is this gradient flowing?”

## Optimizers

SGD with minibatch noise. Momentum remembers direction. Adam adapts per-parameter scales. For this curriculum, Adam is a reasonable default; learning rate still matters.

## Regularization

- **Weight decay** (L2).
- **Dropout:** randomly zero units at train time; a committee of subnetworks.
- **Batch normalization:** normalize activations using batch stats; often lets you train faster. Train vs eval mode differs — a famous production bug if you forget `model.eval()`.
- **Data augmentation** (more of a CNN tool).
- **Early stopping.**

## You should be able to

- Write ReLU, sigmoid, and softmax in NumPy (exercises).
- Explain vanishing gradients.
- Know why we use cross-entropy with softmax.

Next: [CNNs](02-cnn.md).
