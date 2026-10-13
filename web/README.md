# Study web app

A local browser UI for this curriculum: roadmap, markdown lessons, quizzes, projects, interview desk, and progress (saved in `localStorage`).

```bash
python web/serve.py
```

Open http://127.0.0.1:8765/ locally, or the public site:

https://arnold-rg.github.io/ai-data-scientist-roadmap/

Search with Ctrl+K or Cmd+K. Night reading is in the header. A lesson’s own outline stays beside the text on a wide screen. Progress stays in the browser.

```bash
python web/serve.py --no-browser
```

The server reads lessons from `stages/` and quizzes from `quizzes/bank/` so the pages stay in sync with the GitHub repo.
