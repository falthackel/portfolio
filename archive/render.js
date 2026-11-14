// ============================================================
// RENDER LOGIC — reads SITE_CONTENT (content.js) and fills in
// the static markup in index.html. You shouldn't need to edit
// this file for ordinary text/content updates.
// ============================================================

(function render(c) {

  // ---- Hero ----
  document.getElementById("hero-eyebrow").innerHTML = c.hero.eyebrow;
  document.getElementById("hero-name").textContent = c.hero.name;
  document.getElementById("hero-role").textContent = c.hero.role;

  // ---- Bio ----
  document.getElementById("bio-body").innerHTML =
    c.bio.map(p => `<p>${p}</p>`).join("");

  // ---- Research focus ----
  document.getElementById("research-meta").textContent = c.research.meta;
  document.getElementById("research-title").textContent = c.research.title;
  document.getElementById("research-intro").innerHTML =
    c.research.intro.map(p => `<p>${p}</p>`).join("");
  document.getElementById("research-biomarkers").innerHTML =
    c.research.biomarkers.map(b => `<li><strong>${b.name}</strong> — ${b.desc}</li>`).join("");
  document.getElementById("research-collab").textContent = c.research.collaborators;
  document.getElementById("research-status").textContent = c.research.status;

  // ---- Projects (with lens filter + attachments) ----
  const LENS_LABELS = { engineer: "AI Engineer", product: "Product / PM" };
  const lensFilterEl = document.getElementById("lens-filter");
  const projectsListEl = document.getElementById("projects-list");

  function renderAttachment(a) {
    if (a.type === "image" || a.thumbnail) {
      const src = a.type === "image" ? a.href : a.thumbnail;
      return `<a class="attachment attachment-card" href="${a.href}" target="_blank" rel="noopener">
                <img src="${src}" alt="${a.label}" loading="lazy">
                <span>${a.label}</span>
              </a>`;
    }
    const icon = a.type === "pdf" ? "📄" : "🔗";
    return `<a class="attachment attachment-link" href="${a.href}" target="_blank" rel="noopener">${icon} ${a.label}</a>`;
  }

  function renderProductBrief(pb) {
    return `
      <div class="pm-brief">
        <div class="pm-block">
          <div class="pm-label">Problem</div>
          <p>${pb.problem}</p>
        </div>
        <div class="pm-block">
          <div class="pm-label">Scope</div>
          <div class="scope-columns">
            <div>
              <div class="scope-heading in">In</div>
              <ul>${pb.scope.inScope.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>
            <div>
              <div class="scope-heading out">Out</div>
              <ul>${pb.scope.outScope.map(i => `<li>${i}</li>`).join("")}</ul>
            </div>
          </div>
        </div>
        <div class="pm-block">
          <div class="pm-label">User stories</div>
          <ul class="user-stories">${pb.userStories.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
      </div>
    `;
  }

  // Supports two shapes: plain "paragraphs" (simple projects), or
  // "engineer" / "product" sub-objects (dual-lens projects). Picks
  // what to show based on which filter button is active.
  function renderProjectBody(p, activeLens) {
    if (!p.engineer && !p.product) {
      return (p.paragraphs || []).map(par => `<p>${par}</p>`).join("");
    }
    const parts = [];
    if (activeLens === "all" || activeLens === "engineer") {
      const eng = p.engineer ? p.engineer.paragraphs : p.paragraphs;
      if (eng) parts.push(eng.map(par => `<p>${par}</p>`).join(""));
    }
    if (activeLens === "all" || activeLens === "product") {
      if (p.product) parts.push(renderProductBrief(p.product));
    }
    return parts.join("");
  }

  function renderProjects(activeLens) {
    const list = activeLens === "all"
      ? c.projects
      : c.projects.filter(p => (p.lenses || []).includes(activeLens));

    projectsListEl.innerHTML = list.map(p => `
      <div class="entry${p.placeholder ? " placeholder" : ""}">
        <span class="date">${p.date}</span>
        <h3>${p.title}</h3>
        ${(p.lenses && p.lenses.length) ? `<div class="entry-tags">${p.lenses.map(l => `<span class="lens-tag lens-${l}">${LENS_LABELS[l] || l}</span>`).join("")}</div>` : ""}
        ${renderProjectBody(p, activeLens)}
        ${(p.attachments && p.attachments.length) ? `<div class="attachments">${p.attachments.map(renderAttachment).join("")}</div>` : ""}
      </div>
    `).join("") || `<p class="empty-note">No projects tagged for this view yet.</p>`;
  }

  function renderLensFilter() {
    const options = [{ key: "all", label: "All" }].concat(
      Object.keys(LENS_LABELS).map(key => ({ key, label: LENS_LABELS[key] }))
    );
    lensFilterEl.innerHTML = options.map(o =>
      `<button type="button" class="lens-btn${o.key === "all" ? " active" : ""}" data-lens="${o.key}">${o.label}</button>`
    ).join("");
    lensFilterEl.querySelectorAll(".lens-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        lensFilterEl.querySelectorAll(".lens-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProjects(btn.dataset.lens);
      });
    });
  }

  renderLensFilter();
  renderProjects("all");

  // ---- Background ----
  document.getElementById("background-text").textContent = c.background.text;
  document.getElementById("background-tags").innerHTML =
    c.background.tags.map(t => `<span>${t}</span>`).join("");

  // ---- Footer ----
  document.getElementById("footer-location").textContent = c.footer.location;
  const emailLink = document.getElementById("footer-email");
  emailLink.href = "mailto:" + c.footer.email;
  document.getElementById("footer-linkedin").href = c.footer.linkedin;
  document.getElementById("footer-github").href = c.footer.github;

})(SITE_CONTENT);