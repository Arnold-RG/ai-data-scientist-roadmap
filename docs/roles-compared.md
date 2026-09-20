# How the roles differ

Titles overlap. Interviews do not.

| Role | Optimizes for | Typical artifacts |
| --- | --- | --- |
| **Data scientist** | Decisions under uncertainty | Experiments, models, narratives |
| **Data analyst** | Descriptive and diagnostic insight | Dashboards, SQL, slides |
| **Data engineer** | Reliable data movement | Pipelines, tables, SLAs |
| **ML engineer** | Models as production software | Services, feature stores, latency |
| **AI engineer** | LLM-centered products | RAG, tools, eval harnesses |
| **Statistician** | Estimators, design, proofs of error | Inferential studies, surveys |
| **Research scientist** | New methods | Papers, prototypes |

## Data scientist vs analyst

Analysts explain what happened. Data scientists are expected to add prediction or causal design when it changes the decision. Many people do both before lunch.

## Data scientist vs AI engineer

AI engineers ship systems around models they often did not train from scratch. Data scientists still need to know when a GBM beats an LLM for a tabular problem (almost always).

## Data scientist vs ML engineer

MLEs own serving, orchestration, and reliability. DS owns the question, the split, the metric, and whether the model deserves to exist. On small teams, one person wears both hats — then Stage 08 is not optional.

## Data scientist vs statistician

Statistics is the core of Stage 02–03. Data science adds software, unstructured data, and product constraints. A statistician may refuse a neural net; a data scientist must still know when that refusal is wisdom.

## Data scientist vs data engineer

Engineers build the roads. Scientists drive on them and complain about potholes. Learn enough engineering to write a decent incremental table; do not pretend that a notebook is a pipeline.

## Data science vs “just ML”

Machine learning is Stage 06–07. Data science is the whole map, including “we should not model this; we should run an experiment” and “we should not experiment; we should fix the logging.”
