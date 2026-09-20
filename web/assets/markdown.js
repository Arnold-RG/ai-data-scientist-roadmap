window.renderMarkdown = function renderMarkdown(src) {
  const escaped = String(src ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const fences = [];
  let text = escaped.replace(/```([\w-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const i = fences.length;
    fences.push(`<pre><code class="lang-${lang}">${code.replace(/\n$/, "")}</code></pre>`);
    return `\u0000FENCE${i}\u0000`;
  });

  const lines = text.split("\n");
  const out = [];
  let i = 0;
  let para = [];

  const flushPara = () => {
    if (!para.length) return;
    const joined = para.join(" ").trim();
    if (joined) out.push(`<p>${inline(joined)}</p>`);
    para = [];
  };

  const inline = (s) =>
    s
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

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
        out.push(html);
      }
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara();
      const n = h[1].length;
      out.push(`<h${n}>${inline(h[2])}</h${n}>`);
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
      out.push(`<blockquote><p>${inline(line.slice(5))}</p></blockquote>`);
      i += 1;
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
  return out.join("\n");
};
