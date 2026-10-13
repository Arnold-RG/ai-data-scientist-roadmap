(() => {
  const C = window.CURRICULUM;
  const INFO = window.INFO;
  const BASE = window.REPO_BASE || "/";
  const STORE = "adsr-web-progress-v1";
  const view = document.getElementById("view");
  const plates = document.getElementById("spine-plates");
  const spine = document.getElementById("spine");
  const menuBtn = document.getElementById("menu-btn");
  const navScrim = document.getElementById("nav-scrim");
  const scrim = document.getElementById("search-scrim");
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const themeBtn = document.getElementById("theme-btn");
  const mast = document.querySelector(".mast");

  const loadState = () => {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "{}");
    } catch {
      return {};
    }
  };
  const saveState = (s) => localStorage.setItem(STORE, JSON.stringify(s));
  const state = Object.assign(
    { lessons: {}, quizzes: {}, projects: {}, misses: {}, last: null },
    loadState()
  );

  const stageBySlug = (slug) => C.stages.find((s) => s.slug === slug);
  const stageById = (id) => C.stages.find((s) => s.id === id);
  const url = (path) => BASE + String(path).replace(/^\//, "");
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

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
    const hash = location.hash || "#/";
    plates.innerHTML = C.stages
      .map((s) => {
        const done = stageDone(s);
        const active = hash.startsWith(`#/stage/${s.id}`) || hash.startsWith(`#/lesson/${s.slug}`);
        return `<li><a href="#/stage/${s.id}" data-link class="${done ? "done" : ""} ${active ? "active" : ""}"${
          active ? ' aria-current="page"' : ""
        }><span class="plate-no">${s.plate}</span><span class="plate-name">${escapeHtml(s.title)}${
          done ? '<span class="sr-only">, complete</span>' : ""
        }</span></a></li>`;
      })
      .join("");
  }

  function navActive(href, hash) {
    if (href === "#/") return hash === "#/" || hash === "";
    if (href === "#/roadmap") return hash.startsWith("#/roadmap") || hash.startsWith("#/stage") || hash.startsWith("#/lesson");
    if (href === "#/quizzes") return hash.startsWith("#/quizzes") || hash.startsWith("#/quiz");
    if (href === "#/projects") return hash.startsWith("#/projects") || hash.startsWith("#/project");
    if (href === "#/library") return hash.startsWith("#/library") || hash.startsWith("#/doc");
    if (href === "#/plan") return hash === "#/plan" || hash.startsWith("#/plan/");
    return hash === href;
  }

  function setActiveNav() {
    const hash = location.hash || "#/";
    document.querySelectorAll(".nav a").forEach((a) => {
      const href = a.getAttribute("href");
      const on = navActive(href, hash);
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function setMenu(open, focusReturn) {
    const mobile = window.matchMedia("(max-width: 839px)").matches;
    const show = Boolean(open) && mobile;
    spine.classList.toggle("open", show);
    menuBtn.setAttribute("aria-expanded", show ? "true" : "false");
    navScrim.hidden = !show;
    if (mobile) spine.toggleAttribute("inert", !show);
    else spine.removeAttribute("inert");
    document.body.classList.toggle("lock", show || !scrim.hidden);
    if (show) {
      const first = spine.querySelector("a");
      if (first) first.focus();
    } else if (focusReturn) {
      menuBtn.focus();
    }
  }

  function decorateCode(root) {
    root.querySelectorAll("pre").forEach((pre) => {
      if (pre.parentElement && pre.parentElement.classList.contains("codeblock")) return;
      const wrap = document.createElement("div");
      wrap.className = "codeblock";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-code";
      btn.textContent = "Copy";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.append(btn, pre);
      btn.addEventListener("click", async () => {
        const text = pre.innerText;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "Copied";
        } catch {
          const range = document.createRange();
          range.selectNodeContents(pre);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          btn.textContent = "Selected";
        }
        window.setTimeout(() => {
          btn.textContent = "Copy";
        }, 1400);
      });
    });
  }

  function el(html, pageTitle, opts) {
    const remember = !opts || opts.remember !== false;
    const motion = (!opts || opts.motion !== false) && !reduceMotion();
    view.innerHTML = html;
    view.classList.remove("is-entering");
    if (motion) {
      void view.offsetWidth;
      view.classList.add("is-entering");
    }
    document.title = pageTitle ? `${pageTitle} · Study Atlas` : "AI & Data Scientist Study Atlas";
    if (pageTitle && remember) {
      const href = location.hash || "#/";
      if (href !== "#/" && href !== "#") {
        state.last = { href, title: pageTitle };
        saveState(state);
      }
    }
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
    setActiveNav();
    renderPlates();
    if (window.matchMedia("(max-width: 839px)").matches) setMenu(false);
    decorateCode(view);
  }

  function crumbs(parts) {
    return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${parts
      .map((p, i) => {
        const label = escapeHtml(p.label);
        if (i < parts.length - 1) return `<li><a href="${p.href}" data-link>${label}</a></li>`;
        return `<li aria-current="page">${label}</li>`;
      })
      .join("")}</ol></nav>`;
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

  function routeForHref(href, context) {
    const clean = String(href || "").split("#")[0].split("?")[0].trim();
    if (!clean || /^(https?:|mailto:)/i.test(clean)) return null;
    const proj = clean.match(/(?:^|\/)projects\/(\d{2}-[a-z0-9-]+)/i);
    if (proj) return `#/project/${proj[1]}`;
    const docPath = clean.match(/(?:^|\/)docs\/([^/]+)\.md$/i);
    if (docPath) return `#/doc/${docPath[1]}`;
    const lesson = clean.match(/(?:^|\/)(\d{2}-[a-z0-9-]+)\/([^/]+)\.md$/i);
    if (lesson) return `#/lesson/${lesson[1]}/${lesson[2]}`;
    const stageDir = clean.match(/(?:^|\/)(\d{2}-[a-z0-9-]+)\/?$/i);
    if (stageDir) return `#/stage/${stageDir[1].slice(0, 2)}`;
    if (context && context.kind === "doc" && /^[^/]+\.md$/i.test(clean)) {
      return `#/doc/${clean.replace(/\.md$/i, "")}`;
    }
    if (context && context.kind === "lesson" && /^[^/]+\.md$/i.test(clean)) {
      return `#/lesson/${context.stageSlug}/${clean.replace(/\.md$/i, "")}`;
    }
    return null;
  }

  function localizeLinks(root, context) {
    if (!root) return;
    root.querySelectorAll("a").forEach((a) => {
      const route = routeForHref(a.getAttribute("href") || "", context);
      if (!route) return;
      a.setAttribute("href", route);
      a.setAttribute("data-link", "");
      a.removeAttribute("target");
      a.removeAttribute("rel");
      const note = a.querySelector(".sr-only");
      if (note) note.remove();
    });
  }

  function pathRow(s, withQuiz) {
    const done = stageDone(s);
    const q = state.quizzes[s.quiz];
    const meta = withQuiz
      ? `${q ? `${q.pct}% quiz` : "Quiz open"} · ${Math.max(s.lessons.length - 1, 0)} lessons`
      : `Weeks ${escapeHtml(s.weeks)}`;
    return `<li><a class="${done ? "done" : ""}" href="#/stage/${s.id}" data-link>
      <span class="path-num">${s.plate}</span>
      <span class="path-body"><strong>${escapeHtml(s.title)}</strong><em>${escapeHtml(s.blurb)}</em></span>
      <span class="path-meta">${meta}</span>
    </a></li>`;
  }

  function home() {
    const o = overall();
    const denom = o.lessonTotal + o.qTotal + o.pTotal;
    const pct = denom ? Math.round((100 * (o.read + o.qdone + o.pdone)) / denom) : 0;
    const st = C.stats || {};
    const last = state.last;
    const resume =
      last && last.href && last.href !== "#/"
        ? `<a class="resume" href="${escapeHtml(last.href)}" data-link><span>Continue</span><strong>${escapeHtml(
            last.title
          )}</strong></a>`
        : "";
    const next = C.stages.find((s) => !stageDone(s));
    const started = o.read + o.qdone + o.pdone > 0;
    let nudge = "";
    if (!next) {
      nudge = `Stage quizzes are in good shape. The <a href="#/quiz/99-final-exam.json" data-link>final exam</a> is the remaining check.`;
    } else if (!started) {
      nudge = `Begin with <a href="#/stage/${next.id}" data-link>${escapeHtml(next.title)}</a>.`;
    } else {
      nudge = `Still open: <a href="#/stage/${next.id}" data-link>${escapeHtml(next.title)}</a>.`;
    }
    el(`
      <section class="cover">
        <p class="kicker">Study atlas</p>
        <h1>Ten stages, in the order the work depends on them.</h1>
        <p class="lede">Lessons, ${st.questions || 226} questions, and ten projects whose data is generated in this repository. The sequence follows <a href="${
          C.source
        }">roadmap.sh</a>. Nothing here is a certificate. Progress stays in this browser.</p>
        ${resume}
        <dl class="tally">
          <div><dd>${st.stages}</dd><dt>Stages</dt></div>
          <div><dd>${st.questions}</dd><dt>Questions</dt></div>
          <div><dd>${st.projects}</dd><dt>Projects</dt></div>
          <div><dd>${pct}%</dd><dt>In this browser</dt></div>
        </dl>
        <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Overall progress"><span style="width:${pct}%"></span></div>
        <p class="quiet">${o.read} of ${o.lessonTotal} lessons · ${o.qdone} of ${o.qTotal} stage quizzes passed · ${o.pdone} of ${o.pTotal} projects</p>
        <div class="actions">
          <a class="btn" href="#/roadmap" data-link>Enter the path</a>
          <a class="btn ghost" href="#/plan" data-link>12-week plan</a>
          <a class="btn ghost" href="#/library" data-link>Library</a>
        </div>
        <p class="quiet">${nudge}</p>
      </section>
      <section>
        <h2>The path</h2>
        <ol class="path">${C.stages.map((s) => pathRow(s, false)).join("")}</ol>
      </section>
      <footer class="colophon">
        <p>Arnold Rurangwa, ARNOVA Group. Topic order follows the community map. Lessons, quizzes, and projects in this repository are original study material.</p>
        <p><a href="${C.live}">${C.live}</a></p>
      </footer>
    `);
  }

  function roadmap() {
    el(
      `
      <p class="kicker">Sequence</p>
      <h1>The ten-stage path</h1>
      <p class="lede">Mathematics and statistics come first so later models can be inspected, not merely admired.</p>
      <ol class="path">${C.stages.map((s) => pathRow(s, true)).join("")}</ol>
    `,
      "The ten-stage path"
    );
  }

  function stagePage(id) {
    const s = stageById(id);
    if (!s) return notFound();
    const quiz = state.quizzes[s.quiz];
    const related = C.projects.filter((p) => p.stage === s.id);
    el(
      `
      ${crumbs([{ href: "#/roadmap", label: "Roadmap" }, { label: s.title }])}
      <p class="kicker">Stage ${s.plate} · weeks ${escapeHtml(s.weeks)}</p>
      <h1>${escapeHtml(s.title)}</h1>
      <p class="lede">${escapeHtml(s.blurb)}</p>
      <div class="actions">
        <a class="btn" href="#/quiz/${s.quiz}" data-link>Stage quiz</a>
        ${related[0] ? `<a class="btn ghost" href="#/project/${related[0].slug}" data-link>${escapeHtml(related[0].title)}</a>` : ""}
      </div>
      ${quiz ? `<p class="quiz-meta"><span>Last quiz ${quiz.pct}% (${quiz.score}/${quiz.total})</span></p>` : ""}
      <h2>Lessons</h2>
      <ul class="index-list">
        ${s.lessons
          .map((l) => {
            const done = state.lessons[`${s.slug}/${l.slug}`];
            return `<li><a href="#/lesson/${s.slug}/${l.slug}" data-link>
              <span class="n">${l.slug === "README" ? "Overview" : "Lesson"}${done ? " · read" : ""}</span>
              <strong>${escapeHtml(l.title)}</strong>
            </a></li>`;
          })
          .join("")}
      </ul>
    `,
      s.title
    );
  }

  function tocNav(items) {
    if (!items.length) return "";
    const here = location.hash || "#/";
    return `<nav class="toc" aria-label="In this lesson"><p class="toc-title">In this lesson</p><ol>${items
      .map((t) => `<li><a href="${here}" data-anchor="${t.id}">${escapeHtml(t.title)}</a></li>`)
      .join("")}</ol></nav>`;
  }

  async function lessonPage(stageSlug, lessonSlug) {
    const s = stageBySlug(stageSlug);
    if (!s) return notFound();
    el(`<p class="loading">Opening the lesson…</p>`);
    try {
      const md = await fetchText(`stages/${stageSlug}/${lessonSlug}.md`);
      const lesson = s.lessons.find((l) => l.slug === lessonSlug);
      const title = lesson ? lesson.title : lessonSlug;
      markLesson(stageSlug, lessonSlug);
      const idx = s.lessons.findIndex((l) => l.slug === lessonSlug);
      const next = s.lessons[idx + 1];
      const outline = window.markdownOutline(md);
      const toc = outline.toc.filter((t) => t.level === 2);
      el(
        `
        ${crumbs([
          { href: "#/roadmap", label: "Roadmap" },
          { href: `#/stage/${s.id}`, label: s.title },
          { label: title },
        ])}
        <div class="reader">
          ${tocNav(toc)}
          <div class="reader-main">
            <p class="quiz-meta"><span>${readingMinutes(md)} min read</span><span>Stage ${s.plate}</span></p>
            <article class="lesson">${outline.html}</article>
            <div class="actions">
              ${
                next
                  ? `<a class="btn" href="#/lesson/${stageSlug}/${next.slug}" data-link>Next · ${escapeHtml(next.title)}</a>`
                  : `<a class="btn" href="#/quiz/${s.quiz}" data-link>Stage quiz</a>`
              }
              <a class="btn ghost" href="#/stage/${s.id}" data-link>Stage ${s.plate}</a>
            </div>
          </div>
        </div>
      `,
        title
      );
      localizeLinks(view.querySelector("article"), { kind: "lesson", stageSlug });
    } catch (err) {
      el(`<p class="err">${escapeHtml(err.message)}</p>`, "Could not open the lesson", { remember: false });
    }
  }

  async function docPage(slug) {
    el(`<p class="loading">Opening the note…</p>`);
    try {
      const md = await fetchText(`docs/${slug}.md`);
      const doc = C.docs.find((d) => d.slug === slug);
      const title = doc ? doc.title : slug;
      const outline = window.markdownOutline(md);
      const toc = outline.toc.filter((t) => t.level === 2);
      el(
        `
        ${crumbs([{ href: "#/library", label: "Library" }, { label: title }])}
        <div class="reader">
          ${tocNav(toc)}
          <div class="reader-main">
            <p class="quiz-meta"><span>${readingMinutes(md)} min read</span></p>
            <article class="lesson">${outline.html}</article>
          </div>
        </div>
      `,
        title
      );
      localizeLinks(view.querySelector("article"), { kind: "doc" });
    } catch (err) {
      el(`<p class="err">${escapeHtml(err.message)}</p>`, "Could not open the note", { remember: false });
    }
  }

  function libraryPage() {
    el(
      `
      <p class="kicker">Reference</p>
      <h1>Library</h1>
      <p class="lede">Role, career, tools, and the shape of the work around the ten stages.</p>
      <ul class="index-list">
        ${C.docs
          .map(
            (d) => `<li><a href="#/doc/${d.slug}" data-link><span class="n">Guide</span><strong>${escapeHtml(
              d.title
            )}</strong></a></li>`
          )
          .join("")}
        <li><a href="#/faq" data-link><span class="n">FAQ</span><strong>Common questions</strong><em>Degree, timeline, Python or R, portfolio.</em></a></li>
        <li><a href="#/glossary" data-link><span class="n">Terms</span><strong>Glossary</strong><em>Leakage, CUPED, RAG, drift.</em></a></li>
      </ul>
    `,
      "Library"
    );
  }

  function quizzesIndex() {
    el(
      `
      <p class="kicker">Assessment</p>
      <h1>Quizzes</h1>
      <p class="lede">${C.stats.questions} questions across ten stages, a final exam at 75%, and interview warmups. An explanation follows every item.</p>
      <ul class="index-list">
        ${C.stages
          .map((s) => {
            const q = state.quizzes[s.quiz];
            return `<li><a href="#/quiz/${s.quiz}" data-link>
              <span class="n">Stage ${s.plate}</span>
              <strong>${escapeHtml(s.title)}</strong>
              <em>${escapeHtml(s.blurb)}</em>
              <span class="side">${q ? `${q.pct}%` : "Open"}</span>
            </a></li>`;
          })
          .join("")}
        ${C.extraQuizzes
          .map((x) => {
            const q = state.quizzes[x.file];
            return `<li><a href="#/quiz/${x.file}" data-link>
              <span class="n">Pass ${x.passing}%</span>
              <strong>${escapeHtml(x.title)}</strong>
              <span class="side">${q ? `${q.pct}%` : "Open"}</span>
            </a></li>`;
          })
          .join("")}
      </ul>
    `,
      "Quizzes"
    );
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
    if (!/^[\w.-]+\.json$/.test(file || "")) return notFound();
    el(`<p class="loading">Opening the quiz…</p>`);
    try {
      const res = await fetch(url(`quizzes/bank/${file}`));
      if (!res.ok) throw new Error(String(res.status));
      runQuiz(file, await res.json());
    } catch (err) {
      el(`<p class="err">Could not load this quiz. ${escapeHtml(err.message)}</p>`, "Quiz", { remember: false });
    }
  }

  function runQuiz(file, data) {
    const questions = shuffle(data.questions || []);
    const passing = data.passing_score || 70;
    const misses = [];
    let i = 0;
    let correct = 0;
    let locked = false;
    const letters = "ABCDEFGH";

    const draw = (motion) => {
      if (!questions.length) {
        el(`<h1>This quiz has no questions.</h1>`, data.title, { remember: false });
        return;
      }
      if (i >= questions.length) {
        const pct = Math.round((100 * correct) / questions.length);
        const ok = pct >= passing;
        saveQuiz(file, correct, questions.length, misses);
        el(
          `
          <p class="kicker">${escapeHtml(data.title)}</p>
          <h1>Result</h1>
          <p class="score-hero ${ok ? "pass" : "fail"}" role="status">${pct}%</p>
          <p>${correct} of ${questions.length} correct. Passing is ${passing}%. ${
            ok ? "That is a pass." : "Read the misses, then try the stage again."
          }</p>
          ${
            misses.length
              ? `<h2>Missed</h2>${misses
                  .map(
                    (m) =>
                      `<div class="explain"><strong>${escapeHtml(m.prompt)}</strong><p>Correct: ${escapeHtml(
                        m.right
                      )}</p><p>${escapeHtml(m.explanation)}</p></div>`
                  )
                  .join("")}`
              : ""
          }
          <div class="actions">
            <a class="btn" href="#/quiz/${file}" data-link>Retry</a>
            <a class="btn ghost" href="#/quizzes" data-link>All quizzes</a>
          </div>
        `,
          data.title
        );
        return;
      }
      const q = questions[i];
      locked = false;
      const lastLetter = letters[Math.max(q.choices.length - 1, 0)] || "A";
      const progress = Math.round((100 * i) / questions.length);
      el(
        `
        <p class="kicker">${escapeHtml(data.title)}</p>
        <div class="quiz-meta"><span>Question ${i + 1} of ${questions.length}</span><span>${escapeHtml(
          (q.difficulty || "core").toUpperCase()
        )}</span><span>${escapeHtml(q.id || "")}</span></div>
        <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" aria-label="Quiz progress"><span style="width:${progress}%"></span></div>
        <h1 class="quiz-prompt">${escapeHtml(q.prompt)}</h1>
        <p class="quiz-keys">Keys A–${lastLetter} answer.</p>
        <div id="choices" role="group" aria-label="Choices"></div>
        <div id="explain" aria-live="polite"></div>
        <div class="actions"><button class="btn" id="next-q" type="button" disabled>${
          i === questions.length - 1 ? "See result" : "Continue"
        }</button></div>
      `,
        data.title,
        { motion: motion !== false }
      );
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
        draw(false);
      });
    };

    function pick(idx, q, box) {
      if (locked) return;
      locked = true;
      const right = Number(q.answer);
      const good = idx === right;
      if (good) correct += 1;
      else misses.push({ prompt: q.prompt, right: q.choices[right], explanation: q.explanation });
      [...box.children].forEach((elBtn, j) => {
        elBtn.disabled = true;
        if (j === right) elBtn.classList.add("correct");
        if (j === idx && j !== right) elBtn.classList.add("wrong");
      });
      document.getElementById("explain").innerHTML = `<div class="explain"><strong>${
        good ? "Correct." : "Not quite."
      }</strong> ${escapeHtml(q.explanation)}</div>`;
      const next = document.getElementById("next-q");
      next.disabled = false;
      next.focus();
    }

    draw(true);
  }

  function projectsPage() {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    el(
      `
      <p class="kicker">Portfolio</p>
      <h1>Projects</h1>
      <p class="lede">Every dataset is synthetic and generated in this repository. Run the commands from the repo root after installing requirements.txt. Mark a project done when its own list says the work is finished.</p>
      ${levels
        .map((level) => {
          const items = C.projects.filter((p) => p.level === level);
          return `<h2>${level}</h2><ul class="index-list">${items
            .map((p) => {
              const on = state.projects[p.slug];
              return `<li><a href="#/project/${p.slug}" data-link>
                <span class="n">Stage ${p.stage}${on ? " · done" : ""}</span>
                <strong>${escapeHtml(p.title)}</strong>
                <em>${escapeHtml(p.run)}</em>
              </a></li>`;
            })
            .join("")}</ul>`;
        })
        .join("")}
    `,
      "Projects"
    );
  }

  async function projectPage(slug) {
    const p = C.projects.find((x) => x.slug === slug);
    if (!p) return notFound();
    el(`<p class="loading">Opening the brief…</p>`);
    try {
      const md = await fetchText(`projects/${slug}/README.md`);
      const on = state.projects[slug];
      const outline = window.markdownOutline(md);
      el(
        `
        ${crumbs([{ href: "#/projects", label: "Projects" }, { label: p.title }])}
        <article class="lesson">${outline.html}</article>
        <p class="quiz-meta"><span>Run from the repo root</span></p>
        <pre><code>${escapeHtml(p.run)}</code></pre>
        <div class="actions">
          <button class="btn" id="tick" type="button">${on ? "Mark not done" : "Mark done"}</button>
          <a class="btn ghost" href="#/projects" data-link>All projects</a>
        </div>
      `,
        p.title
      );
      localizeLinks(view.querySelector("article"), { kind: "project" });
      document.getElementById("tick").addEventListener("click", () => {
        toggleProject(slug);
        projectPage(slug);
      });
    } catch (err) {
      el(`<p class="err">${escapeHtml(err.message)}</p>`, "Project", { remember: false });
    }
  }

  async function interviewPage() {
    el(`<p class="loading">Opening the interview desk…</p>`);
    try {
      const [q, c] = await Promise.all([fetchText("interview/questions.md"), fetchText("interview/case-studies.md")]);
      const oq = window.markdownOutline(q, { prefix: "questions" });
      const oc = window.markdownOutline(c, { prefix: "cases" });
      const toc = oq.toc.concat(oc.toc).filter((t) => t.level === 2);
      el(
        `
        <p class="kicker">Hiring desk</p>
        <h1>Interview preparation</h1>
        <p class="lede">${C.stats.interview} short answers and four take-home cases. Pair them with the warmup quiz.</p>
        <div class="actions"><a class="btn" href="#/quiz/interview-warmups.json" data-link>Interview warmup</a></div>
        <div class="reader">
          ${tocNav(toc)}
          <div class="reader-main">
            <article class="lesson">${oq.html}</article>
            <article class="lesson">${oc.html}</article>
          </div>
        </div>
      `,
        "Interview preparation"
      );
    } catch (err) {
      el(`<p class="err">${escapeHtml(err.message)}</p>`, "Interview", { remember: false });
    }
  }

  function planRows(rows) {
    return rows
      .map(
        (row) => `<div class="week-row"><strong>Week ${escapeHtml(row.w)}</strong><span><b>${escapeHtml(
          row.focus
        )}</b><em class="do">${escapeHtml(row.do)}</em></span></div>`
      )
      .join("");
  }

  function planPage(mode) {
    const long = mode === "24";
    const rows = long ? INFO.weeks24 : INFO.weeks12;
    el(
      `
      <p class="kicker">Calendar</p>
      <h1>${long ? "24-week study plan" : "12-week study plan"}</h1>
      <p class="lede">${
        long
          ? "The same material, with more time on mathematics, statistics, and classical machine learning. That is where most people stall."
          : "Ten stages and two weeks to pull the work together. The longer calendar simply doubles the early subjects."
      }</p>
      <div class="segmented" role="group" aria-label="Plan length">
        <button type="button" id="plan-12" aria-pressed="${long ? "false" : "true"}">12 weeks</button>
        <button type="button" id="plan-24" aria-pressed="${long ? "true" : "false"}">24 weeks</button>
      </div>
      ${planRows(rows)}
      <div class="actions"><a class="btn" href="#/roadmap" data-link>Open the path</a></div>
    `,
      long ? "24-week plan" : "12-week plan"
    );
    document.getElementById("plan-12").addEventListener("click", () => {
      if ((location.hash || "#/plan") !== "#/plan") location.hash = "#/plan";
    });
    document.getElementById("plan-24").addEventListener("click", () => {
      if (location.hash !== "#/plan/24") location.hash = "#/plan/24";
    });
  }

  function faqPage() {
    el(
      `
      <p class="kicker">Orientation</p>
      <h1>Frequently asked questions</h1>
      <div class="faq">
        ${INFO.faqs
          .map(
            (item) =>
              `<details><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`
          )
          .join("")}
      </div>
    `,
      "Frequently asked questions"
    );
  }

  function glossaryPage() {
    el(
      `
      <p class="kicker">Language of the field</p>
      <h1>Glossary</h1>
      <p class="lede">Short definitions you should be able to say aloud before an interview.</p>
      <label class="filter"><span>Filter</span><input id="gloss-q" type="search" placeholder="Leakage, CUPED, drift" autocomplete="off" /></label>
      <div id="gloss-list">
        ${INFO.glossary
          .map((item) => `<div class="term"><b>${escapeHtml(item.t)}</b><span>${escapeHtml(item.d)}</span></div>`)
          .join("")}
      </div>
    `,
      "Glossary"
    );
    document.getElementById("gloss-q").addEventListener("input", (e) => {
      const n = e.target.value.trim().toLowerCase();
      view.querySelectorAll(".term").forEach((row) => {
        row.hidden = Boolean(n) && !row.textContent.toLowerCase().includes(n);
      });
    });
  }

  function progressPage() {
    const o = overall();
    el(
      `
      <p class="kicker">Ledger</p>
      <h1>Progress</h1>
      <p class="lede">Stored in this browser only. Clearing site data resets it. It is not sent to GitHub.</p>
      <h2>Stages</h2>
      <table class="ledger">
        <thead><tr><th scope="col">Stage</th><th scope="col">Quiz</th><th scope="col">Status</th></tr></thead>
        <tbody>
          ${C.stages
            .map((s) => {
              const q = state.quizzes[s.quiz];
              const done = stageDone(s);
              return `<tr><th scope="row">${s.plate} ${escapeHtml(s.title)}</th><td>${
                q ? `${q.pct}%` : "Not taken"
              }</td><td>${done ? "Complete" : "Open"}</td></tr>`;
            })
            .join("")}
        </tbody>
      </table>
      <h2>Projects</h2>
      <table class="ledger">
        <thead><tr><th scope="col">Project</th><th scope="col">Status</th></tr></thead>
        <tbody>
          ${C.projects
            .map(
              (p) =>
                `<tr><th scope="row">${escapeHtml(p.title)}</th><td>${state.projects[p.slug] ? "Done" : "Open"}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p class="quiet">${o.read} of ${o.lessonTotal} lessons · ${o.qdone} stage quizzes passed · ${o.pdone} projects marked done</p>
      <div class="actions"><button class="btn ghost" id="wipe" type="button">Reset local progress</button></div>
    `,
      "Progress"
    );
    const wipe = document.getElementById("wipe");
    let armed = false;
    wipe.addEventListener("click", () => {
      if (!armed) {
        armed = true;
        wipe.textContent = "Confirm reset";
        return;
      }
      localStorage.removeItem(STORE);
      location.reload();
    });
  }

  function notFound() {
    el(
      `<p class="kicker">Missing</p><h1>Not in this atlas</h1><p class="lede">That address does not match a stage, lesson, or quiz.</p><div class="actions"><a class="btn" href="#/" data-link>Overview</a></div>`,
      "Not found",
      { remember: false }
    );
  }

  function searchItems() {
    const items = [];
    C.stages.forEach((s) => {
      items.push({ title: s.title, sub: `Stage ${s.plate}`, href: `#/stage/${s.id}` });
      s.lessons.forEach((l) => items.push({ title: l.title, sub: s.title, href: `#/lesson/${s.slug}/${l.slug}` }));
    });
    C.projects.forEach((p) => items.push({ title: p.title, sub: "Project", href: `#/project/${p.slug}` }));
    C.docs.forEach((d) => items.push({ title: d.title, sub: "Library", href: `#/doc/${d.slug}` }));
    INFO.glossary.forEach((g) => items.push({ title: g.t, sub: g.d, href: "#/glossary" }));
    INFO.faqs.forEach((f) => items.push({ title: f.q, sub: "FAQ", href: "#/faq" }));
    items.push({ title: "12-week study plan", sub: "Plan", href: "#/plan" });
    items.push({ title: "24-week study plan", sub: "Plan", href: "#/plan/24" });
    items.push({ title: "Final exam", sub: "Quiz", href: "#/quiz/99-final-exam.json" });
    items.push({ title: "Interview warmups", sub: "Quiz", href: "#/quiz/interview-warmups.json" });
    return items;
  }

  let searchHits = [];
  let searchActive = 0;
  let searchReturn = null;

  function openSearch() {
    searchReturn = document.activeElement;
    scrim.hidden = false;
    searchBtn.setAttribute("aria-expanded", "true");
    searchInput.setAttribute("aria-expanded", "true");
    searchInput.value = "";
    searchActive = 0;
    renderSearch("");
    searchInput.focus();
    document.body.classList.add("lock");
  }
  function closeSearch() {
    if (scrim.hidden) return;
    scrim.hidden = true;
    searchBtn.setAttribute("aria-expanded", "false");
    searchInput.setAttribute("aria-expanded", "false");
    document.body.classList.toggle("lock", spine.classList.contains("open"));
    if (searchReturn && typeof searchReturn.focus === "function") searchReturn.focus();
  }
  function renderSearch(q) {
    const needle = q.trim().toLowerCase();
    searchHits = searchItems()
      .filter((it) => !needle || `${it.title} ${it.sub}`.toLowerCase().includes(needle))
      .slice(0, 12);
    if (searchActive >= searchHits.length) searchActive = 0;
    searchResults.innerHTML = searchHits.length
      ? searchHits
          .map(
            (it, idx) =>
              `<a class="search-hit" role="option" id="hit-${idx}" aria-selected="${
                idx === searchActive ? "true" : "false"
              }" href="${it.href}" data-link><strong>${escapeHtml(it.title)}</strong><small>${escapeHtml(
                it.sub
              )}</small></a>`
          )
          .join("")
      : `<p class="search-empty">Nothing in the atlas matches that.</p>`;
    searchInput.setAttribute("aria-activedescendant", searchHits.length ? `hit-${searchActive}` : "");
  }

  searchBtn.addEventListener("click", () => {
    if (scrim.hidden) openSearch();
    else closeSearch();
  });
  menuBtn.addEventListener("click", () => setMenu(!spine.classList.contains("open")));
  navScrim.addEventListener("click", () => setMenu(false, true));
  scrim.addEventListener("click", (e) => {
    if (e.target === scrim) closeSearch();
  });
  searchInput.addEventListener("input", () => {
    searchActive = 0;
    renderSearch(searchInput.value);
  });
  scrim.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!searchHits.length) return;
      e.preventDefault();
      searchActive = e.key === "ArrowDown"
        ? (searchActive + 1) % searchHits.length
        : (searchActive - 1 + searchHits.length) % searchHits.length;
      renderSearch(searchInput.value);
      return;
    }
    if (e.key === "Enter") {
      const hit = searchHits[searchActive];
      if (!hit) return;
      e.preventDefault();
      closeSearch();
      if (location.hash !== hit.href) location.hash = hit.href;
      else route();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = [...scrim.querySelectorAll("input, a, button")];
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (scrim.hidden) openSearch();
      else closeSearch();
      return;
    }
    if (e.key === "Escape") {
      if (!scrim.hidden) {
        closeSearch();
        return;
      }
      if (spine.classList.contains("open")) setMenu(false, true);
      return;
    }
    if (tag === "INPUT" || tag === "TEXTAREA" || !scrim.hidden) return;
    if (spine.classList.contains("open") && window.matchMedia("(max-width: 839px)").matches) return;
    const box = document.getElementById("choices");
    if (!box) return;
    const k = e.key.toLowerCase();
    let idx = -1;
    if (k >= "a" && k <= "h") idx = k.charCodeAt(0) - 97;
    if (k >= "1" && k <= "8") idx = Number(k) - 1;
    const btn = idx >= 0 ? box.children[idx] : null;
    if (btn && !btn.disabled) {
      e.preventDefault();
      btn.click();
    }
  });

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) localStorage.setItem("adsr-theme", theme);
    const night = theme === "night";
    themeBtn.setAttribute("aria-pressed", night ? "true" : "false");
    themeBtn.textContent = night ? "Day" : "Night";
    const meta = document.getElementById("theme-color");
    if (meta) meta.setAttribute("content", night ? "#0b0e13" : "#10141c");
  }
  applyTheme(document.documentElement.getAttribute("data-theme") === "night" ? "night" : "day", false);
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "night" ? "day" : "night";
    applyTheme(next, true);
  });
  if (!localStorage.getItem("adsr-theme")) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("adsr-theme")) applyTheme(e.matches ? "night" : "day", false);
    });
  }

  const syncMast = () => {
    if (mast) document.documentElement.style.setProperty("--mast-h", `${mast.offsetHeight}px`);
  };
  syncMast();
  if (window.ResizeObserver && mast) new ResizeObserver(syncMast).observe(mast);
  window.matchMedia("(max-width: 839px)").addEventListener("change", () => setMenu(false));

  const mac = /\bMac|iPhone|iPad/.test(navigator.userAgent);
  document.querySelectorAll(".mod-key").forEach((elKey) => {
    elKey.textContent = mac ? "⌘K" : "Ctrl K";
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
    if (parts[0] === "plan") return planPage(parts[1]);
    if (parts[0] === "faq") return faqPage();
    if (parts[0] === "glossary") return glossaryPage();
    if (parts[0] === "progress") return progressPage();
    return notFound();
  }

  document.body.addEventListener("click", (e) => {
    const anchor = e.target.closest("[data-anchor]");
    if (anchor) {
      e.preventDefault();
      const target = document.getElementById(anchor.getAttribute("data-anchor"));
      if (!target) return;
      target.setAttribute("tabindex", "-1");
      target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
      target.focus({ preventScroll: true });
      return;
    }
    const a = e.target.closest("a[data-link]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    e.preventDefault();
    closeSearch();
    if (location.hash !== href) location.hash = href;
    else route();
  });

  window.addEventListener("hashchange", route);
  setMenu(false);
  renderPlates();
  route();
})();
