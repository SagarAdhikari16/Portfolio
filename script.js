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
  const label = document.getElementById("copy-label");
  const toast = document.getElementById("toast");
  if (!btn || !label) return;

  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    label.textContent = "Copied!";
    btn.classList.add("copied");
    if (toast) {
      toast.textContent = "Email copied to clipboard";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }

    setTimeout(() => {
      label.textContent = email;
      btn.classList.remove("copied");
    }, 2000);
  });
}

/* ── Scroll reveal ── */
function revealElements() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 48) {
      el.classList.add("active");
    }
  });
}

/* ── Active nav ── */
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav a");
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

/* ── Header scroll state ── */
function initHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── Mobile nav ── */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* ── Live clock in hero ── */
function updateClock() {
  const clockEl = document.querySelector(".hero-meta span:last-child");
  if (!clockEl) return;

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const npTime = new Date(utc + 5.75 * 3600000);
  const h = String(npTime.getHours()).padStart(2, "0");
  const m = String(npTime.getMinutes()).padStart(2, "0");
  clockEl.textContent = `${h}:${m} NPT`;
}

function onScroll() {
  revealElements();
  updateActiveNav();
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initTerminal();
  initCopyEmail();
  revealElements();
  updateClock();
  setInterval(updateClock, 30000);
  setInterval(rotateTagline, 3500);
});

window.addEventListener("scroll", onScroll, { passive: true });
