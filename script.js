const roles = [
  "Unique Blend: Tech + Business",
  "Information Management Architect",
  "Systems Operations Planner",
  "Building Scalable Solutions..."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const display = document.getElementById("type");
  if (!display) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    display.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    display.textContent = current.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 35 : 65);
}

function revealElements() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 60) {
      el.classList.add("active");
    }
  });
}

function updateScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : "0%";
}

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
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

function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".cert-visual-box").forEach(box => {
    box.addEventListener("click", () => {
      const src = box.querySelector("img")?.src;
      if (!src) return;
      img.src = src;
      img.alt = box.querySelector("img")?.alt || "Certificate";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) close();
  });
}

function onScroll() {
  revealElements();
  updateScrollProgress();
  updateActiveNav();
}

document.addEventListener("DOMContentLoaded", () => {
  type();
  initMobileNav();
  initHeaderScroll();
  initLightbox();
  revealElements();
  updateScrollProgress();
});

window.addEventListener("scroll", onScroll, { passive: true });
