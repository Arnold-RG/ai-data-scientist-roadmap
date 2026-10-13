from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_public_entry_and_base_path():
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    assert 'id="view"' in index
    assert 'id="search-btn"' in index
    assert 'id="theme-btn"' in index
    assert "REPO_BASE" in index
    assert "web/assets/app.js" in index
    assert "og:image" in index
    assert "https://arnold-rg.github.io/ai-data-scientist-roadmap/" in index
    web = (ROOT / "web" / "index.html").read_text(encoding="utf-8")
    assert "../index.html" in web
    missing = (ROOT / "404.html").read_text(encoding="utf-8")
    assert "./index.html" in missing


def test_progress_key_routes_and_motion():
    app = (ROOT / "web" / "assets" / "app.js").read_text(encoding="utf-8")
    assert "adsr-web-progress-v1" in app
    for route in ("roadmap", "lesson", "quiz", "projects", "glossary", "progress", "plan"):
        assert route in app
    css = (ROOT / "web" / "assets" / "styles.css").read_text(encoding="utf-8")
    assert "prefers-reduced-motion" in css
    assert 'data-theme="night"' in css or "[data-theme=\"night\"]" in css


def test_pages_workflow_keeps_personal_files_off_the_site():
    workflow = (ROOT / ".github" / "workflows" / "pages.yml").read_text(encoding="utf-8")
    assert "actions/deploy-pages" in workflow
    assert "progress/my-progress.json" in workflow
    assert "quizzes/.last-session.json" in workflow
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    assert "sitemap.xml" in robots
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    assert "https://arnold-rg.github.io/ai-data-scientist-roadmap/" in sitemap
