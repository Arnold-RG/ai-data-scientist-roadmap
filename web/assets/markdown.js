window.markdownOutline = function markdownOutline(src, options) {
  const prefix = options && options.prefix ? String(options.prefix) : "";
  const escaped = String(src ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const fences = [];
  const text = escaped.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const i = fences.length;
    const klass = lang ? ` class="lang-${lang}"` : "";
    fences.push(`<pre><code${klass}>${code.replace(/\n$/, "")}</code></pre>`);
    return `\u0000FENCE${i}\u0000`;
  });

  const used = Object.create(null);
  const toc = [];
  const lines = text.split("\n");
  const out = [];
  let i = 0;
  let para = [];

  const plainHeading = (raw) =>
    String(raw)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const slugHeading = (raw) => {
    const plain = plainHeading(raw)
      .toLowerCase()
      .replace(/&amp;/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return plain || "section";
  };

  const uniqueId = (raw) => {
    let base = slugHeading(raw);
    if (/^[0-9]/.test(base)) base = `s-${base}`;
    if (prefix) base = `${prefix}-${base}`;
    let id = base;
    let n = 2;
    while (used[id]) {
      id = `${base}-${n}`;
      n += 1;
    }
    used[id] = true;
    return id;
  };

  const safeHref = (href) => {
    const h = String(href).trim();
    if (!h || /[\u0000-\u0020"<>]/.test(h)) return "#";
    const lower = h.toLowerCase();
    if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) return "#";
    if (/^(https?:\/\/|mailto:)/i.test(h)) return h;
    if (h.startsWith("#") || h.startsWith("/") || h.startsWith("./") || h.startsWith("../")) return h;
    if (/^[\w.+~#?&=%@!;:,/[\]-]+$/.test(h)) return h;
    return "#";
  };

  const inline = (s) =>
    s
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
        const safe = safeHref(href);
        if (safe === "#") return label;
        const ext = /^https?:\/\//i.test(safe);
        const attrs = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
        const note = ext ? '<span class="sr-only"> (opens in a new tab)</span>' : "";
        return `<a href="${safe}"${attrs}>${label}${note}</a>`;
      });

  const flushPara = () => {
    if (!para.length) return;
    const joined = para.join(" ").trim();
    if (joined) out.push(`<p>${inline(joined)}</p>`);
    para = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("\u0000FENCE")) {
      flushPara();
      const idx = Number(line.replace(/\u0000FENCE(\d+)\u0000/, "$1"));
      out.push(fences[idx]);
      i += 1;
      continue;
    }
    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-/.test(lines[i + 1])) {
      flushPara();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        const cells = lines[i]
          .replace(/^\s*\|/, "")
          .replace(/\|\s*$/, "")
          .split("|")
          .map((c) => c.trim());
        rows.push(cells);
        i += 1;
      }
      if (rows.length >= 2) {
        const head = rows[0];
        const body = rows.slice(2).length ? rows.slice(2) : rows.slice(1).filter((r) => !r.every((c) => /^:?-+:?$/.test(c)));
        let html = "<table><thead><tr>" + head.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead><tbody>";
        for (const r of body) html += "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
        html += "</tbody></table>";
        out.push(`<div class="table-scroll">${html}</div>`);
      }
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara();
      const level = h[1].length;
      const id = uniqueId(h[2]);
      toc.push({ level, id, title: plainHeading(h[2]) });
      out.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);
      i += 1;
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      flushPara();
      out.push("<hr />");
      i += 1;
      continue;
    }
    if (line.startsWith("&gt; ")) {
      flushPara();
      const quote = [inline(line.slice(5))];
      i += 1;
      while (i < lines.length && lines[i].startsWith("&gt; ")) {
        quote.push(inline(lines[i].slice(5)));
        i += 1;
      }
      out.push(`<blockquote><p>${quote.join(" ")}</p></blockquote>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara();
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`);
        i += 1;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      flushPara();
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`);
        i += 1;
      }
      out.push(`<ol>${items.join("")}</ol>`);
      continue;
    }
    if (!line.trim()) {
      flushPara();
      i += 1;
      continue;
    }
    para.push(line);
    i += 1;
  }
  flushPara();
  return { html: out.join("\n"), toc };
};

window.renderMarkdown = function renderMarkdown(src) {
  return window.markdownOutline(src).html;
};
