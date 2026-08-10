const TAGLINES = [
  "building clean web interfaces",
  "exploring PHP backends",
  "leveraging AI tools",
  "analyzing DBMS architectures"
];

const SECTION_LOGS = {
  hero: "location: #hero — Viewing Sagar Adhikari Overview",
  about: "location: #about — Reading background & BIM context",
  projects: "location: #projects — Inspecting active builds & Snap Study",
  skills: "location: #skills — Analyzing technical stack (PHP, C, Java)",
  awards: "location: #awards — Reviewing academic credentials",
  contact: "location: #contact — Ready to collaborate"
};

let taglineIndex = 0;

/* ── Rotating hero tagline ── */
function rotateTagline() {
  const el = document.getElementById("tagline-rotate");
  if (!el) return;

  el.classList.add("fade");
  setTimeout(() => {
    taglineIndex = (taglineIndex + 1) % TAGLINES.length;
    el.textContent = TAGLINES[taglineIndex];
    el.classList.remove("fade");
  }, 300);
}

/* ── Dynamic Section Monitor (activity.log) ── */
function initSectionMonitor() {
  const output = document.getElementById("terminal-output");
  if (!output) return;

  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (SECTION_LOGS[id]) {
            output.textContent = SECTION_LOGS[id];
          }
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((sec) => observer.observe(sec));

  const toggle = document.getElementById("terminal-toggle");
  const widget = document.getElementById("terminal");
  if (!toggle || !widget) return;

  toggle.addEventListener("click", () => {
    widget.classList.toggle("minimized");
    toggle.textContent = widget.classList.contains("minimized") ? "+" : "—";
  });
}

/* ── Copy email ── */
function initCopyEmail() {
  const btn = document.getElementById("copy-email");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard!");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("Email copied to clipboard!");
    }
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ── Scroll Reveal Observer ── */
function initReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ── Navigation Toggle ── */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    nav.classList.toggle("open");
  });
}

/* ── Initialize All ── */
document.addEventListener("DOMContentLoaded", () => {
  setInterval(rotateTagline, 3500);
  initSectionMonitor();
  initCopyEmail();
  initReveal();
  initNav();
});