/* Shared rendering + interactions. Depends on projects.js. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const projectUrl = (p) => `project.html?id=${p.id}`;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------------- Header + footer (shared by every page) ---------------- */

function renderChrome() {
  const page = document.body.dataset.page;
  const nav = [["home", "Home", "index.html"], ...GROUPS.map((g) => [g.id, g.title, g.page]), ["about", "About", "about.html"]];
  const header = $(".site-header");
  if (header)
    header.innerHTML = `<div class="wrap"><a class="logo" href="index.html">${SITE.short}</a><nav class="nav">${nav
      .map(([id, label, href]) => `<a href="${href}"${id === page ? ' class="is-active" aria-current="page"' : ""}>${label}</a>`)
      .join("")}</nav></div>`;
  const footer = $(".site-footer");
  if (footer)
    footer.innerHTML = `<div class="wrap"><nav>${GROUPS.map((g) => `<a href="${g.page}">${g.title}</a>`).join("")}<a href="about.html#contact">Contact</a></nav><small>© ${new Date().getFullYear()} ${SITE.name}</small><a href="#">Back to top ↑</a></div>`;
}

/* ---------------- Cards ---------------- */

function cardHTML(p) {
  const tags = [...p.tags, p.engine].filter(Boolean).map((t) => `<span class="chip">${esc(t)}</span>`).join("");
  const video = p.preview ? `<video muted loop playsinline preload="none" data-src="${p.preview}"></video>` : "";
  const previewBadge = p.preview ? `<div class="badges"><span class="badge"><span class="dot"></span>Preview</span></div>` : "";

  return `
  <a class="card" href="${projectUrl(p)}">
    <div class="card-media">
      <img src="${p.cover}" alt="" loading="lazy">
      ${video}
      ${previewBadge}
    </div>
    <h3 class="card-title">${esc(p.title)}</h3>
    <p class="card-sub">${esc(p.subtitle)}</p>
    <div class="card-tags">${tags}</div>
  </a>`;
}

/* Hover-to-play on desktop; play-when-visible on touch. */
function wireCardVideos(root = document) {
  const start = (card) => {
    const v = $("video", card);
    if (!v) return;
    if (!v.src) v.src = v.dataset.src;
    v.play().then(() => card.classList.add("is-playing")).catch(() => {});
  };
  const stop = (card) => {
    const v = $("video", card);
    if (!v) return;
    v.pause();
    card.classList.remove("is-playing");
  };

  const cards = $$(".card", root).filter((c) => $("video", c));
  if (finePointer) {
    cards.forEach((c) => {
      c.addEventListener("mouseenter", () => start(c));
      c.addEventListener("mouseleave", () => stop(c));
    });
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.intersectionRatio > 0.75 ? start(e.target) : stop(e.target))),
      { threshold: [0, 0.75] }
    );
    cards.forEach((c) => io.observe(c));
  }
}

/* "Or browse everything by Games, Tech Art and Prototypes." */
const browseLinks = (groups) =>
  groups.map((g, i) => `${i === 0 ? "" : i === groups.length - 1 ? " and " : ", "}<a href="${g.page}">${g.title}</a>`).join("");

/* ---------------- Home: intro + reel + highlights ---------------- */

function renderHome() {
  const host = $("#highlights");
  if (!host) return;
  host.innerHTML = HIGHLIGHTS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean).map(cardHTML).join("");
  $("#browse").innerHTML = `Or browse everything by ${browseLinks(GROUPS)}.`;
  wireCardVideos(host);
}

/* ---------------- Category page (games.html, tech-art.html, prototypes.html) ---------------- */

function renderCategory() {
  const host = $("#category");
  if (!host) return;
  const g = GROUPS.find((x) => x.id === host.dataset.group);
  document.title = `${g.title} — ${SITE.name}`;
  host.innerHTML = `
    <header class="cat-head">
      <h1 class="page-title">${g.title}</h1>
      <p>${g.blurb}</p>
    </header>
    <div class="grid">${PROJECTS.filter((p) => p.group === g.id).map(cardHTML).join("")}</div>
    <p class="browse">Also see ${browseLinks(GROUPS.filter((x) => x !== g))}.</p>`;
  wireCardVideos(host);
}

/* ---------------- Project page ---------------- */

function sectionHTML(s, i, p) {
  const head = `<header class="s-head"><span class="num">${pad(i + 1)}</span><h2>${esc(s.title)}</h2>${s.intro ? `<p>${esc(s.intro)}</p>` : ""}</header>`;
  const shot = (file, caption, group, extra = "") =>
    `<figure><div class="shot" data-lb="${group}" data-full="${img(file, 2400)}">${extra}<img src="${img(file, 1400)}" alt="${esc(caption || p.title)}" loading="lazy"></div>${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}</figure>`;
  const group = `${p.id}-${i}`;

  let body = "";
  if (s.kind === "gallery") {
    const cls = { feature: "g-feature", grid: "g-grid", stack: "g-stack", row: "g-row" }[s.layout] || "g-grid";
    body = `<div class="${cls}" style="--n:${s.items.length}${s.ratio ? `;--shot-ratio:${s.ratio}` : ""}">${s.items.map((it) => shot(it.src, it.caption, group)).join("")}</div>`;
  } else if (s.kind === "clips") {
    // Looping clips (converted GIFs) or stills, each with an optional title + line of text.
    body = `<div class="clips${(s.ratio || "16 / 9") === "16 / 9" ? " is-wide" : ""}" style="--cols:${s.cols || s.items.length};--ratio:${s.ratio || "16 / 9"}">${s.items
      .map(
        (it) => `<figure class="clip">
          <div class="clip-media">${
            it.video
              ? `<video muted loop playsinline preload="metadata" data-autoplay src="${it.video}"></video>`
              : `<div class="shot" data-lb="${group}" data-full="${img(it.image, 2400)}"><img src="${img(it.image, 1400)}" alt="${esc(it.title || p.title)}" loading="lazy"></div>`
          }</div>
          ${it.title ? `<h3 class="clip-title">${esc(it.title)}</h3>` : ""}
          ${it.text ? `<p class="clip-text">${esc(it.text)}</p>` : ""}
        </figure>`
      )
      .join("")}</div>`;
  } else if (s.kind === "explain") {
    body = `<div class="explain">
      <div>
        ${s.lead ? `<p class="label">${esc(s.lead)}</p>` : ""}
        <ul class="contrib">${s.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        ${s.note ? `<p class="explain-note">${esc(s.note)}</p>` : ""}
      </div>
      ${s.src ? shot(s.src, s.caption, group) : ""}
    </div>`;
  } else if (s.kind === "pairs") {
    body = `<div class="pairs">${s.items
      .map(
        (it) => `<div class="pair">
          <div class="pair-cap">${esc(it.caption)}</div>
          ${shot(it.a, "", group, `<span class="badge tag">Wireframe</span>`)}
          ${shot(it.b, "", group, `<span class="badge tag is-accent">Textured</span>`)}
        </div>`
      )
      .join("")}</div>`;
  } else if (s.kind === "video") {
    body = `<div class="player"><video controls playsinline preload="none" poster="${s.poster || p.cover}" src="${s.src}"></video></div>`;
  } else if (s.kind === "figure") {
    body = `<div class="g-stack">${shot(s.src, s.caption, group)}</div>`;
  } else if (s.kind === "compare") {
    body = `
      <div class="compare" data-compare>
        <img src="${img(s.b, 1800)}" alt="${esc(s.lb)}">
        <img class="is-before${s.demo ? " demo-unlit" : ""}" src="${img(s.a, 1800)}" alt="${esc(s.la)}">
        <span class="badge tag l">${esc(s.la)}</span><span class="badge tag r is-accent">${esc(s.lb)}</span>
        <div class="handle"></div>
        <input type="range" min="0" max="100" value="50" aria-label="Before / after">
      </div>
      ${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}`;
  }
  return `<section class="p-section">${head}${body}</section>`;
}

function renderProject() {
  const host = $("#project");
  if (!host) return;
  const id = new URLSearchParams(location.search).get("id") || PROJECTS[0].id;
  const idx = Math.max(0, PROJECTS.findIndex((p) => p.id === id));
  const p = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const group = GROUPS.find((g) => g.id === p.group);
  document.title = `${p.title} — ${SITE.name}`;
  document.body.dataset.page = p.group; // highlights the project's category in the nav

  const metaItems = [
    ["Role", p.role],
    ["Year", p.year],
    ["Type", p.type],
    ["Team", p.team],
    ["Tools", p.tools],
  ].filter(([, v]) => v);

  // Main video: the full gameplay / film (autoplays muted, with controls); else a short muted loop; else the cover.
  // `mediaRatio` crops baked-in letterbox bars (e.g. "2 / 1" for a 2:1 film inside a 16:9 file).
  const ratio = `style="--ratio:${p.mediaRatio || "16 / 9"}"`;
  const media = p.gameplay
    ? `<div class="player" ${ratio}>
         <video data-main autoplay muted controls playsinline preload="auto" poster="${p.gameplayPoster || p.cover}" src="${p.gameplay}"></video>
         <button class="pill sound-pill" type="button"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M14 7.5v9a4.5 4.5 0 0 0 0-9z"/><path d="M14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>Sound on</button>
       </div>`
    : p.loop
    ? `<div class="player" ${ratio}>
         <video autoplay muted loop playsinline poster="${p.cover}" src="${p.loop}"></video>
         <div class="player-ui">
           <div class="group-l"><button class="pill" data-act="play">Pause</button><button class="pill" data-act="mute">Sound on</button></div>
           <button class="pill" data-act="fs">Fullscreen</button>
         </div>
       </div>`
    : `<div class="player" ${ratio}><img src="${p.cover}" alt="" style="width:100%;height:100%;object-fit:cover"></div>`;

  // First screen: video + facts on the left, overview + contributions on the right.
  host.innerHTML = `
    <div class="wrap">
      <nav class="crumbs"><a href="index.html">Home</a><span>/</span><a href="${group.page}">${group.title}</a></nav>
      <header class="p-head">
        <div>
          <h1 class="page-title">${esc(p.title)}</h1>
          <p class="p-sub">${esc(p.subtitle)}</p>
        </div>
        <div class="card-tags"><span class="chip" style="border-color:var(--accent);color:var(--accent)">${esc(p.platform)}</span>${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </header>
      <div class="p-top">
        <div class="p-media">
          ${media}
          <div class="meta-row">${metaItems.map(([k, v]) => `<div><p class="label">${k}</p><p>${esc(v)}</p></div>`).join("")}</div>
        </div>
        <aside class="p-info">
          <p class="label">Overview</p>
          ${p.prompt ? `<p class="prompt">Prompt — <b>${esc(p.prompt)}</b></p>` : ""}
          <p class="lead">${esc(p.summary)}</p>
          <p class="label">My contributions</p>
          <ul class="contrib">${p.contributions.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        </aside>
      </div>
      ${(p.sections || []).map((s, i) => sectionHTML(s, i, p)).join("")}
      <a class="next" href="${projectUrl(next)}">
        <div><p class="eyebrow">Next project</p><h3>${esc(next.title)}</h3><span class="cta-line" style="display:inline-flex;gap:10px;margin-top:18px;font-weight:700;font-style:italic;align-items:center">${esc(next.subtitle)} <span class="circ">→</span></span></div>
        <div class="card-media"><img src="${next.cover}" alt="" loading="lazy"></div>
      </a>
    </div>`;

  wirePlayer($(".player", host));
  wireMainVideo($(".player", host));
  $$("[data-compare]", host).forEach(wireCompare);
  wireClips(host);
}

/* Browsers only autoplay muted video, so the main video starts muted with a "Sound on" pill.
   While still muted it pauses off-screen and resumes when scrolled back. */
function wireMainVideo(player) {
  const v = player && $("video[data-main]", player);
  if (!v) return;
  const pill = $(".sound-pill", player);
  const sync = () => (pill.hidden = !v.muted);
  pill.addEventListener("click", () => {
    v.muted = false;
    v.play().catch(() => {});
  });
  v.addEventListener("volumechange", sync);
  sync();

  let autoPaused = false;
  new IntersectionObserver(
    ([e]) => {
      if (!v.muted) return;
      if (!e.isIntersecting && !v.paused) { v.pause(); autoPaused = true; }
      else if (e.isIntersecting && autoPaused) { v.play().catch(() => {}); autoPaused = false; }
    },
    { threshold: 0.25 }
  ).observe(v);
}

/* Clips play only while on screen, so a page of GIF-style loops stays light. */
function wireClips(root) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())),
    { threshold: 0.25 }
  );
  $$("video[data-autoplay]", root).forEach((v) => io.observe(v));
}

function wirePlayer(player) {
  const v = player && $("video", player);
  if (!v || !$(".player-ui", player)) return;
  player.addEventListener("click", (e) => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (!act) return;
    if (act === "play") v.paused ? v.play() : v.pause();
    if (act === "mute") v.muted = !v.muted;
    if (act === "fs") (v.requestFullscreen || v.webkitEnterFullscreen)?.call(v);
    sync();
  });
  const sync = () => {
    $('[data-act="play"]', player).textContent = v.paused ? "Play" : "Pause";
    $('[data-act="mute"]', player).textContent = v.muted ? "Sound on" : "Mute";
    player.classList.toggle("is-paused", v.paused);
  };
  v.addEventListener("play", sync);
  v.addEventListener("pause", sync);
}

function wireCompare(el) {
  const input = $("input", el);
  const set = () => el.style.setProperty("--pos", input.value + "%");
  input.addEventListener("input", set);
  set();
}

/* ---------------- Lightbox ---------------- */

function wireLightbox() {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `<img alt=""><button class="lb-btn lb-close" aria-label="Close">✕</button><button class="lb-btn lb-prev" aria-label="Previous">←</button><button class="lb-btn lb-next" aria-label="Next">→</button><span class="lb-count"></span>`;
  document.body.append(lb);
  let list = [], at = 0;

  // Show the already-loaded thumbnail instantly, then swap in the full-res file.
  const show = () => {
    const shot = list[at], view = $("img", lb), thumbImg = $("img", shot);
    view.src = thumbImg.currentSrc || thumbImg.src;
    const full = new Image();
    full.onload = () => { if (list[at] === shot) view.src = full.src; };
    full.src = shot.dataset.full;
    $(".lb-count", lb).textContent = `${at + 1} / ${list.length}`;
  };
  const close = () => lb.classList.remove("is-open");
  const step = (d) => { at = (at + d + list.length) % list.length; show(); };

  document.addEventListener("click", (e) => {
    const s = e.target.closest(".shot[data-lb]");
    if (!s) return;
    list = $$(`.shot[data-lb="${s.dataset.lb}"]`);
    at = list.indexOf(s);
    show();
    lb.classList.add("is-open");
  });
  lb.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) return step(-1);
    if (e.target.closest(".lb-next")) return step(1);
    if (e.target === lb || e.target.closest(".lb-close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* ---------------- Boot ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderCategory();
  renderProject(); // before renderChrome: it sets the active nav item
  renderChrome();
  wireLightbox();
});
