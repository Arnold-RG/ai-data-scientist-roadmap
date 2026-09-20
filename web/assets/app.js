(() => {
  const C = window.CURRICULUM;
  const INFO = window.INFO;
  const BASE = window.REPO_BASE || "/";
  const STORE = "adsr-web-progress-v1";
  const view = document.getElementById("view");
  const plates = document.getElementById("spine-plates");
  const spine = document.getElementById("spine");

  const loadState = () => {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "{}");
    } catch {
      return {};
    }
  };
  const saveState = (s) => localStorage.setItem(STORE, JSON.stringify(s));
  const state = Object.assign({ lessons: {}, quizzes: {}, projects: {}, misses: {} }, loadState());

  const stageBySlug = (slug) => C.stages.find((s) => s.slug === slug);
  const stageById = (id) => C.stages.find((s) => s.id === id);
  const url = (path) => BASE + String(path).replace(/^\//, "");

  function markLesson(stageSlug, lessonSlug) {
    state.lessons[`${stageSlug}/${lessonSlug}`] = true;
    saveState(state);
    renderPlates();
  }
  function saveQuiz(file, score, total, misses) {
    state.quizzes[file] = { score, total, pct: Math.round((100 * score) / Math.max(total, 1)), at: Date.now() };
    state.misses[file] = misses || [];
    saveState(state);
    renderPlates();
  }
  function toggleProject(slug) {
    state.projects[slug] = !state.projects[slug];
    saveState(state);
  }
  function stageDone(st) {
    const quiz = state.quizzes[st.quiz];
    const passed = quiz && quiz.pct >= 70;
    const lessons = st.lessons.filter((l) => l.slug !== "README");
    const read = lessons.filter((l) => state.lessons[`${st.slug}/${l.slug}`]).length;
    return passed && read >= Math.min(1, lessons.length);
  }
  function overall() {
    const lessonKeys = C.stages.flatMap((s) =>
      s.lessons.filter((l) => l.slug !== "README").map((l) => `${s.slug}/${l.slug}`)
    );
    const read = lessonKeys.filter((k) => state.lessons[k]).length;
    const quizzes = C.stages.map((s) => s.quiz);
    const qdone = quizzes.filter((q) => state.quizzes[q] && state.quizzes[q].pct >= 70).length;
    const pdone = C.projects.filter((p) => state.projects[p.slug]).length;
    return { read, lessonTotal: lessonKeys.length, qdone, qTotal: quizzes.length, pdone, pTotal: C.projects.length };
  }

  function renderPlates() {
    plates.innerHTML = C.stages
      .map(
        (s) => `<li><a href="#/stage/${s.id}" data-link class="${stageDone(s) ? "done" : ""}">
          <span class="dot"></span><span>${s.plate} ${s.title}</span></a></li>`
      )
      .join("");
  }

  function setActiveNav() {
    const hash = location.hash || "#/";
    document.querySelectorAll(".nav a").forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === "#/" ? hash === "#/" || hash === "" : hash.startsWith(href));
    });
  }

  function el(html) {
    view.innerHTML = html;
    view.focus();
    setActiveNav();
    renderPlates();
    if (window.matchMedia("(max-width: 900px)").matches) spine.classList.remove("open");
  }

  function crumbs(parts) {
    return `<nav class="crumbs">${parts
      .map((p, i) => (i < parts.length - 1 ? `<a href="${p.href}" data-link>${p.label}</a> / ` : p.label))
      .join("")}</nav>`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function readingMinutes(text) {
    const words = String(text).trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  }

  async function fetchText(path) {
    const res = await fetch(url(path));
    if (!res.ok) throw new Error(`Could not load ${path} (${res.status})`);
    return res.text();
  }

  function home() {
    const o = overall();
    const pct = Math.round((100 * (o.read + o.qdone + o.pdone)) / (o.lessonTotal + o.qTotal + o.pTotal));
    const st = C.stats || {};
    el(`
      <p class="kicker">Professional study atlas</p>
      <h1>A complete path to AI and data science, built for deliberate practice.</h1>
      <p class="lede">Ten stages from the official <a href="${C.source}">roadmap.sh</a> map, expanded into lessons, ${st.questions || 226} quiz questions, ten projects, and interview drills. Open it on GitHub Pages or run it locally. Progress is stored only in this browser.</p>
      <div class="metrics">
        <div class="metric"><b>${st.stages}</b><span>stages</span></div>
        <div class="metric"><b>${st.questions}</b><span>quiz questions</span></div>
        <div class="metric"><b>${st.projects}</b><span>projects</span></div>
        <div class="metric"><b>${pct}%</b><span>your progress</span></div>
      </div>
      <div class="progress-bar" aria-label="Overall progress ${pct}%"><span style="width:${pct}%"></span></div>
      <p class="quiz-meta" style="margin-top:8px">${o.read}/${o.lessonTotal} lessons · ${o.qdone}/${o.qTotal} stage quizzes passed · ${o.pdone}/${o.pTotal} projects</p>
      <div class="actions">
        <a class="btn" href="#/roadmap" data-link>Enter the roadmap</a>
        <a class="btn ghost" href="#/plan" data-link>12-week plan</a>
        <a class="btn ghost" href="#/library" data-link>Role &amp; career library</a>
      </div>
      <h2>Start here</h2>
      <div class="grid">
        ${C.stages
          .slice(0, 6)
          .map(
            (s) => `<a class="card" href="#/stage/${s.id}" data-link>
              <span class="n">Stage ${s.plate}</span>
              <h3>${s.title}</h3>
              <p>${s.blurb}</p>
            </a>`
          )
          .join("")}
      </div>
      <p class="lede" style="margin-top:28px">Live site: <a href="${C.live}">${C.live}</a><br />Repository: <a href="${C.github}">${C.github}</a></p>
    `);
  }

  function roadmap() {
    el(`
      <p class="kicker">Curriculum sequence</p>
      <h1>The ten-stage path</h1>
      <p class="lede">Order is the point. Mathematics and statistics make later models inspectable instead of ornamental.</p>
      <div class="metro">
        ${C.stages
          .map((s) => {
            const q = state.quizzes[s.quiz];
            return `<a class="metro-row" href="#/stage/${s.id}" data-link>
              <div class="metro-num">${s.plate}</div>
              <div>
                <h3>${s.title}</h3>
                <p>${s.blurb}</p>
              </div>
              <span class="chip">${q ? q.pct + "%" : "quiz open"} · ${s.lessons.length - 1} lessons</span>
            </a>`;
          })
          .join("")}
      </div>
    `);
  }

  function stagePage(id) {
    const s = stageById(id);
    if (!s) return notFound();
    const quiz = state.quizzes[s.quiz];
    const related = C.projects.filter((p) => p.stage === s.id);
    el(`
      ${crumbs([{ href: "#/roadmap", label: "Roadmap" }, { label: s.title }])}
      <p class="kicker">Stage ${s.plate} · suggested weeks ${s.weeks}</p>
      <h1>${s.title}</h1>
      <p class="lede">${s.blurb}</p>
      <div class="actions">
        <a class="btn" href="#/quiz/${s.quiz}" data-link>Stage quiz</a>
        ${related[0] ? `<a class="btn ghost" href="#/project/${related[0].slug}" data-link>Related project</a>` : ""}
        <a class="btn ghost" href="#/glossary" data-link>Glossary</a>
      </div>
      ${quiz ? `<p class="quiz-meta">Last quiz score: ${quiz.pct}% (${quiz.score}/${quiz.total})</p>` : ""}
      <h2>Lessons</h2>
      <div class="grid">
        ${s.lessons
          .map((l) => {
            const done = state.lessons[`${s.slug}/${l.slug}`] ? " · read" : "";
            return `<a class="card" href="#/lesson/${s.slug}/${l.slug}" data-link>
              <span class="n">${l.slug === "README" ? "Overview" : "Lesson"}${done}</span>
              <h3>${l.title}</h3>
              <p>Open in the reader.</p>
            </a>`;
          })
          .join("")}
      </div>
    `);
  }

  function tocFromMarkdown(md) {
    return (md.match(/^## .+$/gm) || []).map((line) => line.replace(/^## /, "").trim());
  }

  async function lessonPage(stageSlug, lessonSlug) {
    const s = stageBySlug(stageSlug);
    if (!s) return notFound();
    el(`${crumbs([{ href: "#/roadmap", label: "Roadmap" }, { href: `#/stage/${s.id}`, label: s.title }, { label: "Loading" }])}<p>Loading lesson…</p>`);
    try {
      const md = await fetchText(`stages/${stageSlug}/${lessonSlug}.md`);
      const lesson = s.lessons.find((l) => l.slug === lessonSlug);
      markLesson(stageSlug, lessonSlug);
      const idx = s.lessons.findIndex((l) => l.slug === lessonSlug);
      const next = s.lessons[idx + 1];
      const toc = tocFromMarkdown(md);
      el(`
        ${crumbs([{ href: "#/roadmap", label: "Roadmap" }, { href: `#/stage/${s.id}`, label: s.title }, { label: lesson ? lesson.title : lessonSlug }])}
        <p class="quiz-meta">${readingMinutes(md)} min read · Stage ${s.plate}</p>
        ${toc.length ? `<nav class="toc"><strong>In this lesson</strong><br />${toc.map((t) => escapeHtml(t)).join(" · ")}</nav>` : ""}
        <article class="lesson">${window.renderMarkdown(md)}</article>
        <div class="actions">
          ${next ? `<a class="btn" href="#/lesson/${stageSlug}/${next.slug}" data-link>Next: ${next.title}</a>` : `<a class="btn" href="#/quiz/${s.quiz}" data-link>Stage quiz</a>`}
          <a class="btn ghost" href="#/stage/${s.id}" data-link>Back to stage ${s.plate}</a>
        </div>
      `);
      view.querySelectorAll("article.lesson a").forEach((a) => {
        const href = a.getAttribute("href") || "";
        if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
        if (href.endsWith(".md")) {
          const name = href.split("/").pop().replace(/\.md$/, "");
          a.setAttribute("href", `#/lesson/${stageSlug}/${name}`);
          a.setAttribute("data-link", "");
        }
      });
    } catch (err) {
      el(`<p class="err">${err.message}</p>`);
    }
  }

  async function docPage(slug) {
    el(`<p>Loading…</p>`);
    try {
      const md = await fetchText(`docs/${slug}.md`);
      const doc = C.docs.find((d) => d.slug === slug);
      el(`
        ${crumbs([{ href: "#/library", label: "Library" }, { label: doc ? doc.title : slug }])}
        <p class="quiz-meta">${readingMinutes(md)} min read</p>
        <article class="lesson">${window.renderMarkdown(md)}</article>
      `);
    } catch (err) {
      el(`<p class="err">${err.message}</p>`);
    }
  }

  function libraryPage() {
    el(`
      <p class="kicker">Reference</p>
      <h1>Library</h1>
      <p class="lede">Role definitions, career notes, tools, and the project lifecycle — the context around the ten stages.</p>
      <div class="grid">
        ${C.docs
          .map(
            (d) => `<a class="card" href="#/doc/${d.slug}" data-link>
              <span class="n">Guide</span>
              <h3>${d.title}</h3>
              <p>Open the full note.</p>
            </a>`
          )
          .join("")}
        <a class="card" href="#/faq" data-link><span class="n">FAQ</span><h3>Common questions</h3><p>Degree, timeline, Python vs R, portfolio.</p></a>
        <a class="card" href="#/glossary" data-link><span class="n">Terms</span><h3>Glossary</h3><p>Leakage, CUPED, RAG, drift, and more.</p></a>
      </div>
    `);
  }

  function quizzesIndex() {
    el(`
      <p class="kicker">Assessment</p>
      <h1>Quizzes</h1>
      <p class="lede">${C.stats.questions} questions across ten stages, a final exam (75% to pass), and interview warmups. Explanations appear after every item.</p>
      <div class="grid">
        ${C.stages
          .map((s) => {
            const q = state.quizzes[s.quiz];
            return `<a class="card" href="#/quiz/${s.quiz}" data-link>
              <span class="n">Stage ${s.plate}${q ? ` · ${q.pct}%` : ""}</span>
              <h3>${s.title}</h3>
              <p>${s.blurb}</p>
            </a>`;
          })
          .join("")}
        ${C.extraQuizzes
          .map((x) => {
            const q = state.quizzes[x.file];
            return `<a class="card" href="#/quiz/${x.file}" data-link>
              <span class="n">${x.title}${q ? ` · ${q.pct}%` : ""}</span>
              <h3>${x.title}</h3>
              <p>Passing score ${x.passing}%.</p>
            </a>`;
          })
          .join("")}
      </div>
    `);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  async function quizPage(file) {
    el(`<p>Loading quiz…</p>`);
    try {
      const data = await (await fetch(url(`quizzes/bank/${file}`))).json();
      runQuiz(file, data);
    } catch (err) {
      el(`<p class="err">Could not load quiz ${file}. ${err.message}</p>`);
    }
  }

  function runQuiz(file, data) {
    const questions = shuffle(data.questions);
    const passing = data.passing_score || 70;
    const misses = [];
    let i = 0;
    let correct = 0;
    let locked = false;
    const letters = "ABCDEFGH";

    const draw = () => {
      if (i >= questions.length) {
        const pct = Math.round((100 * correct) / questions.length);
        const ok = pct >= passing;
        saveQuiz(file, correct, questions.length, misses);
        el(`
          <p class="kicker">${escapeHtml(data.title)}</p>
          <h1>Result</h1>
          <div class="score-hero ${ok ? "pass" : "fail"}">${pct}%</div>
          <p>${correct}/${questions.length} correct · passing ${passing}% · ${ok ? "Pass" : "Keep studying the missed items below"}</p>
          ${
            misses.length
              ? `<h2>Missed</h2>${misses
                  .map(
                    (m) =>
                      `<div class="explain"><strong>${escapeHtml(m.prompt)}</strong><br />Correct: ${escapeHtml(
                        m.right
                      )}<br />${escapeHtml(m.explanation)}</div>`
                  )
                  .join("")}`
              : ""
          }
          <div class="actions">
            <a class="btn" href="#/quiz/${file}" data-link>Retry</a>
            <a class="btn ghost" href="#/quizzes" data-link>All quizzes</a>
          </div>
        `);
        return;
      }
      const q = questions[i];
      locked = false;
      el(`
        <p class="kicker">${escapeHtml(data.title)}</p>
        <div class="quiz-meta"><span>Question ${i + 1} / ${questions.length}</span><span>${(q.difficulty || "core").toUpperCase()}</span><span>${q.id}</span></div>
        <div class="progress-bar"><span style="width:${(100 * i) / questions.length}%"></span></div>
        <h1 style="font-size:1.55rem;margin-top:18px">${escapeHtml(q.prompt)}</h1>
        <div id="choices"></div>
        <div id="explain"></div>
        <div class="actions"><button class="btn" id="next-q" disabled>Continue</button></div>
      `);
      const box = document.getElementById("choices");
      q.choices.forEach((choice, idx) => {
        const b = document.createElement("button");
        b.className = "choice";
        b.type = "button";
        b.innerHTML = `<span class="letter">${letters[idx]}</span><span>${escapeHtml(choice)}</span>`;
        b.addEventListener("click", () => pick(idx, q, box));
        box.appendChild(b);
      });
      document.getElementById("next-q").addEventListener("click", () => {
        i += 1;
        draw();
      });
    };

    function pick(idx, q, box) {
      if (locked) return;
      locked = true;
      const right = Number(q.answer);
      if (idx === right) correct += 1;
      else misses.push({ prompt: q.prompt, right: q.choices[right], explanation: q.explanation });
      [...box.children].forEach((elBtn, j) => {
        if (j === right) elBtn.classList.add("correct");
        if (j === idx && j !== right) elBtn.classList.add("wrong");
      });
      document.getElementById("explain").innerHTML = `<div class="explain"><strong>${
        idx === right ? "Correct." : "Not quite."
      }</strong> ${escapeHtml(q.explanation)}</div>`;
      document.getElementById("next-q").disabled = false;
    }

    draw();
  }

  function projectsPage() {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    el(`
      <p class="kicker">Portfolio practice</p>
      <h1>Projects</h1>
      <p class="lede">Synthetic data only. Run commands from the repository root after installing <code>requirements.txt</code>. Tick a project when its “done when” list is true.</p>
      ${levels
        .map((level) => {
          const items = C.projects.filter((p) => p.level === level);
          return `<h2>${level}</h2><div class="grid">${items
            .map((p) => {
              const on = state.projects[p.slug];
              return `<a class="card" href="#/project/${p.slug}" data-link>
                <span class="n">Stage ${p.stage}${on ? " · done" : ""}</span>
                <h3>${p.title}</h3>
                <p>${escapeHtml(p.run)}</p>
              </a>`;
            })
            .join("")}</div>`;
        })
        .join("")}
    `);
  }

  async function projectPage(slug) {
    const p = C.projects.find((x) => x.slug === slug);
    if (!p) return notFound();
    el(`<p>Loading project brief…</p>`);
    try {
      const md = await fetchText(`projects/${slug}/README.md`);
      const on = state.projects[slug];
      el(`
        ${crumbs([{ href: "#/projects", label: "Projects" }, { label: p.title }])}
        <article class="lesson">${window.renderMarkdown(md)}</article>
        <p class="quiz-meta">Run from the repo root</p>
        <pre><code>${escapeHtml(p.run)}</code></pre>
        <div class="actions">
          <button class="btn" id="tick">${on ? "Mark not done" : "Mark done"}</button>
          <a class="btn ghost" href="#/projects" data-link>All projects</a>
        </div>
      `);
      document.getElementById("tick").addEventListener("click", () => {
        toggleProject(slug);
        projectPage(slug);
      });
    } catch (err) {
      el(`<p class="err">${err.message}</p>`);
    }
  }

  async function interviewPage() {
    el(`<p>Loading interview bank…</p>`);
    try {
      const [q, c] = await Promise.all([fetchText("interview/questions.md"), fetchText("interview/case-studies.md")]);
      el(`
        <p class="kicker">Hiring desk</p>
        <h1>Interview preparation</h1>
        <p class="lede">${C.stats.interview} short answers plus four take-home cases. Pair with the warmup quiz.</p>
        <div class="actions"><a class="btn" href="#/quiz/interview-warmups.json" data-link>Interview warmup quiz</a></div>
        <article class="lesson">${window.renderMarkdown(q)}</article>
        <article class="lesson">${window.renderMarkdown(c)}</article>
      `);
    } catch (err) {
      el(`<p class="err">${err.message}</p>`);
    }
  }

  function planPage() {
    el(`
      <p class="kicker">Calendar</p>
      <h1>12-week study plan</h1>
      <p class="lede">Ten stages plus two integration weeks. A 24-week version simply doubles time on mathematics, statistics, and classical ML. Full detail lives in the repository file STUDY_PLAN.md.</p>
      ${INFO.weeks12
        .map(
          (row) =>
            `<div class="week-row"><strong>Week ${row.w}</strong><span>${escapeHtml(row.focus)}</span><span>${escapeHtml(
              row.do
            )}</span></div>`
        )
        .join("")}
      <div class="actions"><a class="btn" href="#/roadmap" data-link>Start week 1</a></div>
    `);
  }

  function faqPage() {
    el(`
      <p class="kicker">Orientation</p>
      <h1>Frequently asked questions</h1>
      <div class="faq">
        ${INFO.faqs
          .map((item) => `<details><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`)
          .join("")}
      </div>
    `);
  }

  function glossaryPage() {
    el(`
      <p class="kicker">Language of the field</p>
      <h1>Glossary</h1>
      <p class="lede">Short definitions you should be able to say out loud before an interview.</p>
      ${INFO.glossary
        .map((item) => `<div class="term"><b>${escapeHtml(item.t)}</b><span>${escapeHtml(item.d)}</span></div>`)
        .join("")}
    `);
  }

  function progressPage() {
    const o = overall();
    el(`
      <p class="kicker">Ledger</p>
      <h1>Progress</h1>
      <p class="lede">Stored in localStorage on this device. Clearing site data resets it. This is not synced to GitHub.</p>
      <h2>Stages</h2>
      <ul>
        ${C.stages
          .map((s) => {
            const q = state.quizzes[s.quiz];
            return `<li>Stage ${s.plate} ${s.title} — quiz ${q ? q.pct + "%" : "not taken"}${
              stageDone(s) ? " · complete" : ""
            }</li>`;
          })
          .join("")}
      </ul>
      <h2>Projects</h2>
      <ul>${C.projects.map((p) => `<li>${p.title} — ${state.projects[p.slug] ? "done" : "open"}</li>`).join("")}</ul>
      <p>${o.read}/${o.lessonTotal} lessons · ${o.qdone} stage quizzes passed · ${o.pdone} projects ticked</p>
      <div class="actions"><button class="btn ghost" id="wipe">Reset local progress</button></div>
    `);
    document.getElementById("wipe").addEventListener("click", () => {
      if (confirm("Reset all local progress?")) {
        localStorage.removeItem(STORE);
        location.reload();
      }
    });
  }

  function notFound() {
    el(`<h1>Not found</h1><p>That route is not in this atlas.</p><a class="btn" href="#/" data-link>Overview</a>`);
  }

  function searchItems() {
    const items = [];
    C.stages.forEach((s) => {
      items.push({ title: s.title, sub: "Stage", href: `#/stage/${s.id}` });
      s.lessons.forEach((l) => items.push({ title: l.title, sub: s.title, href: `#/lesson/${s.slug}/${l.slug}` }));
    });
    C.projects.forEach((p) => items.push({ title: p.title, sub: "Project", href: `#/project/${p.slug}` }));
    C.docs.forEach((d) => items.push({ title: d.title, sub: "Library", href: `#/doc/${d.slug}` }));
    INFO.glossary.forEach((g) => items.push({ title: g.t, sub: g.d, href: "#/glossary" }));
    INFO.faqs.forEach((f) => items.push({ title: f.q, sub: "FAQ", href: "#/faq" }));
    items.push({ title: "12-week study plan", sub: "Plan", href: "#/plan" });
    items.push({ title: "Final exam", sub: "Quiz", href: "#/quiz/99-final-exam.json" });
    return items;
  }

  const scrim = document.getElementById("search-scrim");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  function openSearch() {
    scrim.hidden = false;
    searchInput.value = "";
    renderSearch("");
    searchInput.focus();
  }
  function closeSearch() {
    scrim.hidden = true;
  }
  function renderSearch(q) {
    const needle = q.trim().toLowerCase();
    const hits = searchItems()
      .filter((it) => !needle || (it.title + " " + it.sub).toLowerCase().includes(needle))
      .slice(0, 12);
    searchResults.innerHTML = hits
      .map(
        (it) =>
          `<a class="search-hit" href="${it.href}" data-link><strong>${escapeHtml(it.title)}</strong><small>${escapeHtml(
            it.sub
          )}</small></a>`
      )
      .join("");
  }

  document.getElementById("search-btn").addEventListener("click", openSearch);
  document.getElementById("menu-btn").addEventListener("click", () => spine.classList.toggle("open"));
  scrim.addEventListener("click", (e) => {
    if (e.target === scrim) closeSearch();
  });
  searchInput.addEventListener("input", () => renderSearch(searchInput.value));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const first = searchResults.querySelector("a");
      if (first) {
        e.preventDefault();
        closeSearch();
        location.hash = first.getAttribute("href");
      }
    }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (scrim.hidden) openSearch();
      else closeSearch();
    }
    if (e.key === "Escape") closeSearch();
  });

  async function route() {
    const raw = (location.hash || "#/").replace(/^#/, "");
    const parts = raw.split("/").filter(Boolean);
    if (parts.length === 0) return home();
    if (parts[0] === "roadmap") return roadmap();
    if (parts[0] === "stage") return stagePage(parts[1]);
    if (parts[0] === "lesson") return lessonPage(parts[1], parts[2]);
    if (parts[0] === "doc") return docPage(parts[1]);
    if (parts[0] === "library") return libraryPage();
    if (parts[0] === "quizzes") return quizzesIndex();
    if (parts[0] === "quiz") return quizPage(parts.slice(1).join("/"));
    if (parts[0] === "projects") return projectsPage();
    if (parts[0] === "project") return projectPage(parts[1]);
    if (parts[0] === "interview") return interviewPage();
    if (parts[0] === "plan") return planPage();
    if (parts[0] === "faq") return faqPage();
    if (parts[0] === "glossary") return glossaryPage();
    if (parts[0] === "progress") return progressPage();
    return notFound();
  }

  document.body.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) {
      e.preventDefault();
      closeSearch();
      if (location.hash !== href) location.hash = href;
      else route();
    }
  });

  window.addEventListener("hashchange", route);
  renderPlates();
  route();
})();
