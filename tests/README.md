# Checkpoint tests

```bash
pytest
pytest tests/test_stage_01_math.py
pytest tests/test_projects.py
```

Stage tests import working solutions in `exercises/`. To quiz yourself, move a file aside and reimplement it.

Project tests run the scripts with a timeout and check `output/*.json` keys. They should finish in well under 30 seconds.
