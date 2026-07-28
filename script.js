const TAGLINES = [
  "scalable digital products",
  "intelligent user experiences",
  "AI-powered workflows",
  "clean system architecture"
];

const STATUS_LINES = [
  "Building Snap Study platform node...",
  "Learning UI/UX design frameworks",
  "Exploring AI-assisted development",
  "Open to new project collaborations",
  "Crafting responsive web layouts"
];

let taglineIndex = 0;
let statusIndex = 0;

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

/* ── Terminal status widget ── */
function updateTerminal() {
  const output = document.getElementById("terminal-output");
  if (!output) return;
  output.textContent = STATUS_LINES[statusIndex];
  statusIndex = (statusIndex + 1) % STATUS_LINES.length;
}

function initTerminal() {
  updateTerminal();
  setInterval(updateTerminal, 5000);

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
  initTerminal();
  initCopyEmail();
  initReveal();
  initNav();
});