# Convolutional networks

Images are not bags of pixels. Nearby pixels mean more to each other than random pairs. Convolution **ties weights spatially**: the same small filter slides across the image.

## Pieces

- **Filter / kernel:** a tiny weight tensor (e.g. 3×3). Output is a feature map: “where did this pattern fire?”
- **Stride and padding** control size.
- **Pooling** (max/average) downsamples, adding a bit of invariance to tiny shifts.
- **Receptive field** grows with depth: later layers see larger regions of the original image.

A stack of convolutions learns edges, then textures, then parts, then objects — as a cartoon. Reality is messier, but the cartoon is useful.

## Why not flatten into a dense net?

A 224×224 RGB image is 150k inputs. A dense first layer would be enormous and would ignore locality. Convolution reuses weights and respects the grid.

## Transfer learning

Take a net trained on a large image dataset. Replace the last classifier. Freeze early layers or fine-tune with a small learning rate. You steal generic visual features. This is how small projects get good CNNs without a datacenter.

This repo’s [image shapes project](../../projects/07-image-shapes) stays CPU-light: synthetic circles vs squares and classical features. After you pass it, the next homework (on your own GPU) is a tiny CNN in PyTorch.

## You should be able to

- Explain weight sharing in one sentence.
- Relate depth to receptive field.
- Describe transfer learning without naming a specific architecture as magic.

Next: [RNNs and LSTMs](03-rnn-lstm.md).
