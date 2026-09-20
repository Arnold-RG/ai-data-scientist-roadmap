# Tools

Tools change. The categories do not.

| Category | What we use in this repo | What you will meet at work |
| --- | --- | --- |
| Language | Python 3.10+ | Python, sometimes R, Scala in big-data shops |
| Tables | pandas | pandas, polars, SQL |
| Arrays | NumPy | NumPy, PyTorch tensors |
| Classical ML | scikit-learn | sklearn, XGBoost, LightGBM |
| Stats | scipy, statsmodels | same, plus internal experiment platforms |
| Charts | matplotlib, seaborn | those, plus Plotly, Tableau, Looker |
| Notebooks | Jupyter (optional) | Jupyter, Hex, Databricks |
| Tests | pytest | pytest, great expectations / dbt tests |
| Serving | `predict.py` + pickle | FastAPI, batch jobs, Vertex/SageMaker/Azure ML |
| LLM | TF-IDF RAG-lite | vendor APIs, Hugging Face, vector DBs |
| Cloud | none required | AWS, GCP, Azure — learn after Stage 08 |

Install from `requirements.txt` inside a virtual environment. Do not sprinkle global packages.

You do not need all of TensorFlow, Spark, and Kubernetes to start. You need one stack that you can test. This is that stack.
