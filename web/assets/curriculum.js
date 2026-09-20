window.CURRICULUM = {
  source: "https://roadmap.sh/ai-data-scientist",
  github: "https://github.com/Arnold-RG/ai-data-scientist-roadmap",
  live: "https://arnold-rg.github.io/ai-data-scientist-roadmap/",
  stats: { stages: 10, quizzes: 12, questions: 226, projects: 10, interview: 40 },
  stages: [
    {
      id: "01",
      slug: "01-mathematics",
      title: "Mathematics",
      plate: "01",
      weeks: "1–2",
      quiz: "01-mathematics.json",
      blurb: "Models are linear algebra moved by calculus.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-linear-algebra", title: "Linear algebra" },
        { slug: "02-calculus", title: "Calculus" },
        { slug: "03-mathematical-analysis", title: "Mathematical analysis" }
      ]
    },
    {
      id: "02",
      slug: "02-statistics",
      title: "Statistics",
      plate: "02",
      weeks: "2–3",
      quiz: "02-statistics.json",
      blurb: "Every number from data needs an uncertainty story.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-descriptive-stats-and-clt", title: "Descriptive stats and CLT" },
        { slug: "02-hypothesis-testing", title: "Hypothesis testing" },
        { slug: "03-probability-and-sampling", title: "Probability and sampling" },
        { slug: "04-ab-testing", title: "A/B testing" }
      ]
    },
    {
      id: "03",
      slug: "03-econometrics",
      title: "Econometrics",
      plate: "03",
      weeks: "4",
      quiz: "03-econometrics.json",
      blurb: "Prediction is not causation. Identification is the gap.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-prerequisites", title: "Prerequisites" },
        { slug: "02-regression-and-time-series", title: "Regression and time series" }
      ]
    },
    {
      id: "04",
      slug: "04-coding",
      title: "Coding",
      plate: "04",
      weeks: "5",
      quiz: "04-coding.json",
      blurb: "Python, SQL, and enough algorithms to not get stuck.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-python", title: "Python" },
        { slug: "02-dsa-python", title: "DSA in Python" },
        { slug: "03-sql", title: "SQL" }
      ]
    },
    {
      id: "05",
      slug: "05-eda",
      title: "Exploratory Data Analysis",
      plate: "05",
      weeks: "6",
      quiz: "05-eda.json",
      blurb: "Most of the job is understanding the table in front of you.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-data-understanding", title: "Data understanding" },
        { slug: "02-analysis-and-visualization", title: "Analysis and visualization" }
      ]
    },
    {
      id: "06",
      slug: "06-machine-learning",
      title: "Machine Learning",
      plate: "06",
      weeks: "7",
      quiz: "06-machine-learning.json",
      blurb: "A target, an honest split, a metric that matches the decision.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-supervised", title: "Supervised learning" },
        { slug: "02-unsupervised", title: "Unsupervised learning" },
        { slug: "03-ensembles-and-nns", title: "Ensembles and neural nets" }
      ]
    },
    {
      id: "07",
      slug: "07-deep-learning",
      title: "Deep Learning",
      plate: "07",
      weeks: "8",
      quiz: "07-deep-learning.json",
      blurb: "From dense layers to CNNs, sequences, and transformers.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-fully-connected", title: "Fully connected nets" },
        { slug: "02-cnn", title: "Convolutional nets" },
        { slug: "03-rnn-lstm", title: "RNNs and LSTMs" },
        { slug: "04-transformers-and-transfer", title: "Transformers" }
      ]
    },
    {
      id: "08",
      slug: "08-mlops",
      title: "MLOps",
      plate: "08",
      weeks: "9",
      quiz: "08-mlops.json",
      blurb: "A model that cannot be deployed and watched is a demo.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-deployment-and-cicd", title: "Deployment and CI/CD" }
      ]
    },
    {
      id: "09",
      slug: "09-ai-engineering",
      title: "AI Engineering",
      plate: "09",
      weeks: "10",
      quiz: "09-ai-engineering.json",
      blurb: "Prompts, RAG, agents, and fine-tuning as system design.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-prompt-llms-rag-agents", title: "LLMs, RAG, and agents" }
      ]
    },
    {
      id: "10",
      slug: "10-vibe-coding",
      title: "AI-assisted coding",
      plate: "10",
      weeks: "11",
      quiz: "10-vibe-coding.json",
      blurb: "Assistants used with tests and judgment.",
      lessons: [
        { slug: "README", title: "Stage overview" },
        { slug: "01-ai-coding-assistants", title: "Coding assistants" }
      ]
    }
  ],
  extraQuizzes: [
    { file: "99-final-exam.json", title: "Final exam", passing: 75 },
    { file: "interview-warmups.json", title: "Interview warmups", passing: 70 }
  ],
  projects: [
    { id: "01", slug: "01-eda-retail", title: "Retail EDA", level: "Beginner", stage: "05", run: "python projects/01-eda-retail/analyze.py" },
    { id: "02", slug: "02-house-prices", title: "House prices", level: "Beginner", stage: "06", run: "python projects/02-house-prices/train.py" },
    { id: "03", slug: "03-ab-test", title: "A/B test", level: "Intermediate", stage: "02", run: "python projects/03-ab-test/analyze.py" },
    { id: "04", slug: "04-customer-segments", title: "Customer segments", level: "Intermediate", stage: "06", run: "python projects/04-customer-segments/cluster.py" },
    { id: "05", slug: "05-time-series", title: "Time series", level: "Intermediate", stage: "03", run: "python projects/05-time-series/forecast.py" },
    { id: "06", slug: "06-sentiment", title: "Sentiment", level: "Intermediate", stage: "07", run: "python projects/06-sentiment/train.py" },
    { id: "07", slug: "07-image-shapes", title: "Image shapes", level: "Intermediate", stage: "07", run: "python projects/07-image-shapes/train.py" },
    { id: "08", slug: "08-rag-lite", title: "RAG-lite", level: "Advanced", stage: "09", run: "python projects/08-rag-lite/rag.py \"What does CUPED do?\"" },
    { id: "09", slug: "09-model-api", title: "Model API", level: "Advanced", stage: "08", run: "python projects/09-model-api/train.py" },
    { id: "10", slug: "10-capstone", title: "Churn capstone", level: "Advanced", stage: "10", run: "python projects/10-capstone/train.py" }
  ],
  docs: [
    { slug: "00-what-is-a-data-scientist", title: "What is a data scientist?" },
    { slug: "lifecycle", title: "Lifecycle" },
    { slug: "skills", title: "Skills map" },
    { slug: "roles-compared", title: "Roles compared" },
    { slug: "career", title: "Career notes" },
    { slug: "tools", title: "Tools" }
  ]
};
