window.CURRICULUM.live = "https://arnold-rg.github.io/ai-data-scientist-roadmap/";
window.CURRICULUM.stats = {
  stages: 10,
  quizzes: 12,
  questions: 226,
  projects: 10,
  interview: 40
};

window.INFO = {
  faqs: [
    {
      q: "What is a data scientist?",
      a: "Someone who turns messy evidence into a decision others can trust — using programming, statistics, machine learning, and domain knowledge. The model is optional. The question is not."
    },
    {
      q: "Do I need a PhD or a specific degree?",
      a: "No. Computer science, math, physics, economics, and self-taught paths all appear in the field. You need a portfolio of decisions (the ten projects here) more than a particular diploma."
    },
    {
      q: "How long does this curriculum take?",
      a: "About 12 weeks at 10–14 hours per week, or 24 weeks at 6–8 hours. Mathematics and statistics are where most people should slow down."
    },
    {
      q: "Python or R?",
      a: "This atlas uses Python and SQL. R is excellent for statistics in some teams; learn it later if your workplace uses it."
    },
    {
      q: "Is math really necessary?",
      a: "Yes, at the level taught in Stage 01–02. You do not need a proofs course. You do need vectors, gradients, uncertainty, and experiment design or later tools will look like magic."
    },
    {
      q: "Data scientist vs AI engineer vs analyst?",
      a: "Analysts explain what happened. Data scientists add prediction or causal design when it changes the decision. AI engineers ship systems around models, often LLMs. Overlap is normal; the interviews differ."
    },
    {
      q: "Will an LLM replace this job?",
      a: "It will replace people who only paste code they cannot explain. It will not replace people who can define a target, refuse leakage, design an experiment, and say when not to model."
    },
    {
      q: "What should I put in a portfolio?",
      a: "Three projects: one EDA, one experiment or forecast, and either NLP or the churn capstone. For each: question, data (synthetic is fine if you say so), method, result, limitation."
    }
  ],
  glossary: [
    { t: "Leakage", d: "Using information that would not be available at prediction time. The most common way a notebook looks brilliant and a product fails." },
    { t: "Grain", d: "What one row represents (user-day, order, impression). Unknown grain makes joins explode." },
    { t: "p-value", d: "Probability, under the null, of a result at least this extreme. Not P(the null is true)." },
    { t: "CUPED", d: "Variance reduction in experiments: residualize the outcome on pre-treatment covariates." },
    { t: "Identification", d: "Whether the data plus assumptions map to one causal answer. More rows cannot split two observationally equivalent stories." },
    { t: "Stationarity", d: "Mean and autocovariance depend on lag, not calendar time. Trending series often produce fake R²." },
    { t: "Holdout", d: "Data the model does not see while fitting or tuning. Time-based for anything with a clock." },
    { t: "Precision / recall", d: "Of what you flagged, how much was right / of the actual positives, how many you caught." },
    { t: "Bagging vs boosting", d: "Average noisy models in parallel vs add models sequentially to residuals." },
    { t: "Attention", d: "Weighted mix of value vectors using query–key similarities, usually softmax(QKᵀ/√d)." },
    { t: "RAG", d: "Retrieve document chunks first, then generate (or extract) using that evidence. Fix recall@k before a bigger model." },
    { t: "Data vs concept drift", d: "P(X) moved vs P(Y|X) moved. Both need monitors; the response differs." },
    { t: "Exogeneity", d: "In Y = Xβ + ε, X is uncorrelated with ε. If it fails, OLS can still predict and still not be a causal effect." },
    { t: "MDE", d: "Minimum detectable effect: the smallest lift you refuse to miss. It sizes the experiment." },
    { t: "Softmax", d: "Turns logits into a probability simplex. Pair with cross-entropy, not accuracy, when training." }
  ],
  weeks12: [
    { w: 1, focus: "Mathematics", do: "Lessons + math pytest + quiz 01" },
    { w: 2, focus: "Statistics core", do: "CLT, tests, sampling + quiz 02" },
    { w: 3, focus: "Experiments", do: "A/B lesson + project 03" },
    { w: 4, focus: "Econometrics", do: "Causal thinking + time series project" },
    { w: 5, focus: "Coding", do: "Python, DSA, SQL + quiz 04" },
    { w: 6, focus: "EDA", do: "Retail project + quiz 05" },
    { w: 7, focus: "Classical ML", do: "Houses + segments + quiz 06" },
    { w: 8, focus: "Deep learning", do: "Sentiment + shapes + quiz 07" },
    { w: 9, focus: "MLOps", do: "Model API + quiz 08" },
    { w: 10, focus: "AI engineering", do: "RAG-lite + quiz 09" },
    { w: 11, focus: "Assistants + capstone", do: "Churn report + quiz 10" },
    { w: 12, focus: "Integration", do: "Final exam + interview cases" }
  ],
  weeks24: [
    { w: "1–3", focus: "Mathematics", do: "Redo the linear algebra examples on paper." },
    { w: "4–6", focus: "Statistics and experiments", do: "A/B project. Write a one-page experiment design before you code." },
    { w: "7–8", focus: "Econometrics", do: "Causal thinking, then the time series project." },
    { w: "9–10", focus: "Python, DSA, SQL", do: "One easy or medium problem a day is enough." },
    { w: "11–12", focus: "EDA", do: "Retail project, plus a second dataset you choose (synthetic, or public and licensed)." },
    { w: "13–16", focus: "Machine learning", do: "Houses and segments, then a second model family on the same data." },
    { w: "17–19", focus: "Deep learning", do: "Sentiment and shapes. Read “Attention Is All You Need” after the transformer lesson." },
    { w: "20–21", focus: "MLOps", do: "Model API, plus the workflow already in this repository." },
    { w: "22–23", focus: "AI engineering and the capstone", do: "RAG-lite, prompts, agents, then the churn report." },
    { w: "24", focus: "Integration", do: "Final exam, interview bank, and the case studies." }
  ]
};
