"""Synthetic A/B conversion experiment."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from statsmodels.stats.proportion import proportions_ztest

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output"


def simulate(n_a: int = 4000, n_b: int = 4000, p_a: float = 0.08, p_b: float = 0.093, seed: int = 11):
    rng = np.random.default_rng(seed)
    conv_a = rng.binomial(1, p_a, size=n_a)
    conv_b = rng.binomial(1, p_b, size=n_b)
    return conv_a, conv_b


def analyze(conv_a, conv_b) -> dict:
    n_a, n_b = len(conv_a), len(conv_b)
    s_a, s_b = int(conv_a.sum()), int(conv_b.sum())
    rate_a = s_a / n_a
    rate_b = s_b / n_b
    lift = (rate_b - rate_a) / rate_a if rate_a else None
    z, p = proportions_ztest([s_b, s_a], [n_b, n_a], alternative="two-sided")
    # Wald CI for difference B - A
    se = np.sqrt(rate_a * (1 - rate_a) / n_a + rate_b * (1 - rate_b) / n_b)
    diff = rate_b - rate_a
    ci = (diff - 1.96 * se, diff + 1.96 * se)
    ship = bool(p < 0.05 and ci[0] > 0)
    return {
        "n_a": n_a,
        "n_b": n_b,
        "conversion_a": round(rate_a, 5),
        "conversion_b": round(rate_b, 5),
        "lift": round(float(lift), 4) if lift is not None else None,
        "z_stat": round(float(z), 4),
        "p_value": round(float(p), 5),
        "diff_ci_95": [round(float(ci[0]), 5), round(float(ci[1]), 5)],
        "recommendation": "SHIP" if ship else "DO_NOT_SHIP",
        "rationale": (
            "Primary metric conversion; two-sided z-test; ship only if p<0.05 and CI excludes 0."
        ),
    }


def main() -> None:
    OUT.mkdir(exist_ok=True)
    report = analyze(*simulate())
    (OUT / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(report["recommendation"], "p=", report["p_value"])


if __name__ == "__main__":
    main()
