"""Run project scripts and check their output artifacts."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PY = sys.executable


def run_script(rel: str, extra: list[str] | None = None, timeout: int = 60) -> subprocess.CompletedProcess:
    cmd = [PY, str(ROOT / rel)]
    if extra:
        cmd.extend(extra)
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=timeout)


def test_retail_eda():
    result = run_script("projects/01-eda-retail/analyze.py")
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/01-eda-retail/output/summary.json").read_text(encoding="utf-8"))
    assert payload["rows_clean"] < payload["rows_raw"]
    assert payload["total_revenue"] > 0
    assert (ROOT / "projects/01-eda-retail/output/revenue_by_month.png").exists()


def test_house_prices():
    result = run_script("projects/02-house-prices/train.py")
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/02-house-prices/output/metrics.json").read_text(encoding="utf-8"))
    assert payload["r2"] > 0.5
    assert payload["n_test"] > 10


def test_ab_test():
    result = run_script("projects/03-ab-test/analyze.py")
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/03-ab-test/output/report.json").read_text(encoding="utf-8"))
    assert payload["recommendation"] in {"SHIP", "DO_NOT_SHIP"}
    assert "p_value" in payload
    assert len(payload["diff_ci_95"]) == 2


def test_segments():
    result = run_script("projects/04-customer-segments/cluster.py")
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/04-customer-segments/output/segments.json").read_text(encoding="utf-8"))
    assert payload["k"] == 3
    assert payload["silhouette"] > 0.2
    assert sum(payload["sizes"].values()) == 600


def test_time_series():
    result = run_script("projects/05-time-series/forecast.py")
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/05-time-series/output/forecast_metrics.json").read_text(encoding="utf-8"))
    assert payload["horizon_weeks"] == 12
    assert payload["linear_trend_seasonal_mae"] < payload["seasonal_naive_mae"] * 1.5


def test_sentiment():
    result = run_script("projects/06-sentiment/train.py")
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/06-sentiment/output/metrics.json").read_text(encoding="utf-8"))
    assert payload["accuracy"] >= 0.9
    assert payload["f1"] >= 0.9


def test_shapes():
    result = run_script("projects/07-image-shapes/train.py")
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/07-image-shapes/output/metrics.json").read_text(encoding="utf-8"))
    assert payload["accuracy"] >= 0.75


def test_rag():
    result = run_script("projects/08-rag-lite/rag.py", extra=["What", "does", "CUPED", "do?"])
    assert result.returncode == 0, result.stderr
    payload = json.loads((ROOT / "projects/08-rag-lite/output/answer.json").read_text(encoding="utf-8"))
    assert payload["retrieved"]
    assert payload["source"] == "cuped"
    assert "CUPED" in payload["answer"] or "variance" in payload["answer"].lower()


def test_model_api():
    train = run_script("projects/09-model-api/train.py")
    assert train.returncode == 0, train.stderr
    pred = run_script(
        "projects/09-model-api/predict.py",
        extra=["--recency", "12", "--frequency", "8", "--monetary", "400"],
    )
    assert pred.returncode == 0, pred.stderr
    payload = json.loads(pred.stdout)
    assert 0 <= payload["churn_probability"] <= 1
    metrics = json.loads((ROOT / "projects/09-model-api/output/train_metrics.json").read_text(encoding="utf-8"))
    assert metrics["auc"] > 0.6


def test_capstone():
    result = run_script("projects/10-capstone/train.py")
    assert result.returncode == 0, result.stderr
    metrics = json.loads((ROOT / "projects/10-capstone/output/metrics.json").read_text(encoding="utf-8"))
    assert metrics["model_auc"] >= metrics["baseline_auc"] - 0.02
    summary = (ROOT / "projects/10-capstone/output/executive_summary.md").read_text(encoding="utf-8")
    assert "Target" in summary and "Limitation" in summary
