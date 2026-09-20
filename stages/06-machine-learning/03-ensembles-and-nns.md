# Ensembles and shallow neural nets

## Bias and variance, again

A single deep tree memorizes (high variance). A stump underfits (high bias). Ensembles are how you move along that curve.

## Bagging

Bootstrap samples, fit trees, average (regression) or vote (classification). **Random forests** also hide features at each split so trees decorrelate. Strong default on tabular data. Harder to interpret than one tree; feature importances are still not effects.

## Boosting

Fit a small tree to the **residual** (or negative gradient of the loss), add it, repeat. Gradient boosting machines, XGBoost, LightGBM, CatBoost — same idea, different engineering. They win a large fraction of tabular benchmarks. They also overfit if you do not use shrinkage, subsampling, and early stopping on a validation set.

## Stacking

Train diverse models, then a meta-model on their out-of-fold predictions. Easy to leak if the meta-model sees in-fold predictions. Skip stacking until a single booster is beaten cleanly.

## Shallow neural nets

A fully connected net with one hidden layer and a nonlinear activation can approximate a wide class of functions (universal approximation as a slogan, not as a license to ignore data). On small tabular problems, a well-tuned GBM usually wins. Neural nets start to pull ahead with huge data, messy unstructured inputs, or when you need representation learning.

The next stage develops that. Here, treat a net as: linear maps stacked with nonlinearities, trained by SGD on a loss.

## You should be able to

- Contrast bagging (variance down) vs boosting (bias down, sequentially).
- Name three overfitting controls for gradient boosting.
- Explain why stacking needs out-of-fold predictions.
- Say when not to start with a neural net.

Quiz: `python quizzes/run_quiz.py --stage 06`. Next: [Deep learning](../07-deep-learning).
