/**
 * Portfolio Client Script
 * Hardened against client-side editing & unauthorized DOM manipulation.
 * Enhanced with interactive CLI, Command Palette, Spotlight FX, and Project Drawer.
 */
(() => {
  "use strict";

  const TAGLINES = Object.freeze([
    "scalable digital products",
    "intelligent user experiences",
    "AI-powered workflows",
    "clean system architecture"
  ]);

  const STATUS_LINES = Object.freeze([
    "Building Snap Study platform node...",
    "Learning UI/UX design frameworks",
    "Exploring AI-assisted development",
    "Open to new project collaborations",
    "Crafting responsive web layouts"
  ]);

  const PROJECT_DATA = Object.freeze({
    "snap-study": {
      id: "node_01",
      pill: "Building",
      pillClass: "pill-amber",
      title: "Snap Study Platform",
      desc: "A centralized, high-performance study workstation for student notes, flashcard repetition systems, and deadline tracking.",
      highlights: [
        "Architected modular state management for interactive flashcards",
        "Built instant search & category filtering for rapid notes retrieval",
        "Designed dark-mode UI with high contrast readability metrics"
      ],
      tags: ["React", "Product Design", "Node.js", "Local Storage", "Tailwind Concept"],
      repo: "https://github.com/SagarAdhikari16",
      live: "#"
    },
    "portfolio": {
      id: "node_02",
      pill: "Live",
      pillClass: "pill-green",
      title: "Personal Portfolio Workspace",
      desc: "Single-page personal site showcasing strategic projects, tech arsenal, and live status shell running on custom .np domain.",
      highlights: [
        "Zero-framework vanilla implementation for sub-100ms load times",
        "Custom interactive terminal CLI & Linear-inspired Command Palette",
        "Responsive accessibility layout with CSS spotlight micro-interactions"
      ],
      tags: ["HTML5", "CSS Variables", "Vanilla JS", "GitHub Pages", "JSON-LD"],
      repo: "https://github.com/SagarAdhikari16",
      live: "https://sagaradhikari016.com.np"
    }
  });

  const COMMANDS = Object.freeze([
    { id: "nav-about", title: "Go to About & Vision", icon: "👤", group: "Navigation", action: () => scrollToSection("about") },
    { id: "nav-projects", title: "View Featured Projects", icon: "🚀", group: "Navigation", action: () => scrollToSection("projects") },
    { id: "nav-skills", title: "View Skills & Arsenal", icon: "⚡", group: "Navigation", action: () => scrollToSection("skills") },
    { id: "nav-awards", title: "View Awards & Recognition", icon: "🏆", group: "Navigation", action: () => scrollToSection("awards") },
    { id: "nav-contact", title: "Get in Touch / Contact", icon: "✉️", group: "Navigation", action: () => scrollToSection("contact") },
    { id: "action-theme", title: "Toggle Light / Dark Theme", icon: "🌓", group: "Actions", action: () => toggleTheme() },
    { id: "action-email", title: "Copy Email Address", icon: "📋", group: "Actions", action: () => copyEmailAddress() },
    { id: "action-github", title: "Open GitHub Profile", icon: "🔗", group: "Actions", action: () => window.open("https://github.com/SagarAdhikari16", "_blank") },
    { id: "action-linkedin", title: "Open LinkedIn Profile", icon: "💼", group: "Actions", action: () => window.open("https://www.linkedin.com/in/sagar-adhikari-7069b5402", "_blank") }
  ]);

  let taglineIndex = 0;
  let statusIndex = 0;
  let cmdSelectedIndex = 0;
  let filteredCommands = [...COMMANDS];

  /* ── Security & Observer Hardening ── */
  function enforceNonEditable() {
    document.querySelectorAll('[contenteditable], [contenteditable="true"]').forEach(el => {
      el.removeAttribute("contenteditable");
    });
  }

  function initSecurityObservers() {
    enforceNonEditable();
    document.addEventListener("dragstart", e => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === "attributes" && mutation.attributeName === "contenteditable") {
          const target = mutation.target;
          if (target && target.hasAttribute("contenteditable")) {
            target.removeAttribute("contenteditable");
          }
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["contenteditable"], subtree: true });
  }

  /* ── Helpers ── */
  function safeSetText(el, text) {
    if (el) el.textContent = String(text ?? "");
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  /* ── Theme Switcher (Bright / Dark Mode) ── */
  function toggleTheme(forcedMode) {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme") || "dark";
    let nextTheme = currentTheme === "dark" ? "light" : "dark";

    if (forcedMode === "light" || forcedMode === "dark") {
      nextTheme = forcedMode;
    }

    root.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // LocalStorage fallback ignore
    }
    return nextTheme;
  }

  function initThemeToggle() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const active = toggleTheme();
        const toast = document.getElementById("toast");
        if (toast) {
          safeSetText(toast, `Switched to ${active.toUpperCase()} mode`);
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2000);
        }
      });
    }
  }

  /* ── Rotating Tagline ── */
  function rotateTagline() {
    const el = document.getElementById("tagline-rotate");
    if (!el) return;
    el.classList.add("fade");
    setTimeout(() => {
      taglineIndex = (taglineIndex + 1) % TAGLINES.length;
      safeSetText(el, TAGLINES[taglineIndex]);
      el.classList.remove("fade");
    }, 300);
  }

  /* ── Spotlight Mouse Tracking ── */
  function initSpotlight() {
    document.addEventListener("mousemove", e => {
      const cards = document.querySelectorAll(".spotlight-card");
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  /* ── Interactive Terminal CLI ── */
  function updateTerminalOutput(text) {
    const output = document.getElementById("terminal-output");
    if (output) safeSetText(output, text);
  }

  function appendTerminalLine(cmd, responseHtml) {
    const history = document.getElementById("terminal-history");
    if (!history) return;

    const cmdLine = document.createElement("p");
    cmdLine.innerHTML = `<span class="t-prompt">→</span> <span class="t-dim">user@sagar</span>:<span class="t-accent">~</span>$ ${escapeHtml(cmd)}`;
    history.appendChild(cmdLine);

    if (responseHtml) {
      const respLine = document.createElement("p");
      respLine.className = "t-output";
      respLine.innerHTML = responseHtml;
      history.appendChild(respLine);
    }
    history.scrollTop = history.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, match => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[match]));
  }

  function handleTerminalCommand(inputStr) {
    const cmd = inputStr.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    if (cmd === "theme" || cmd === "theme toggle") {
      const newTheme = toggleTheme();
      response = `Switched theme to <span class="t-accent">${newTheme.toUpperCase()}</span> mode.`;
    } else if (cmd === "theme light") {
      toggleTheme("light");
      response = 'Switched theme to <span class="t-accent">LIGHT</span> mode.';
    } else if (cmd === "theme dark") {
      toggleTheme("dark");
      response = 'Switched theme to <span class="t-accent">DARK</span> mode.';
    } else {
      switch (cmd) {
        case "help":
          response = `Available commands: <span class="t-accent">whoami</span>, <span class="t-accent">skills</span>, <span class="t-accent">projects</span>, <span class="t-accent">awards</span>, <span class="t-accent">contact</span>, <span class="t-accent">theme</span>, <span class="t-accent">time</span>, <span class="t-accent">status</span>, <span class="t-accent">clear</span>`;
          break;
        case "whoami":
          response = "Sagar Adhikari — Tech Strategist, Developer & AI Builder based in Pokhara, Nepal.";
          break;
        case "skills":
          response = "Domains: UI/UX Design, AI Development, Systems Thinking, Cloud Deployment (GitHub Pages, CI/CD).";
          break;
        case "projects":
          response = "Active Nodes: [1] Snap Study Platform (Building) | [2] Personal Portfolio (Live). Type 'help' for options.";
          break;
        case "awards":
          response = "Awards: [1] Tech Architecture Cert | [2] UI/UX Recognition | [3] Rapid Prototyping Honor.";
          break;
        case "contact":
          response = 'Email: <a href="mailto:contact@sagaradhikari016.com.np" class="t-accent">contact@sagaradhikari016.com.np</a> | GitHub: SagarAdhikari16';
          break;
        case "time":
          const now = new Date();
          const utc = now.getTime() + now.getTimezoneOffset() * 60000;
          const npTime = new Date(utc + 5.75 * 3600000);
          response = `Current Pokhara Time: ${npTime.toLocaleTimeString()} (UTC+5:45)`;
          break;
        case "status":
          statusIndex = (statusIndex + 1) % STATUS_LINES.length;
          response = STATUS_LINES[statusIndex];
          break;
        case "clear":
          const history = document.getElementById("terminal-history");
          if (history) history.innerHTML = '<p><span class="t-prompt">→</span> <span class="t-dim">user@sagar</span>:<span class="t-accent">~</span>$ status --now</p><p class="t-output" id="terminal-output">Terminal reset. Type "help" for commands.</p>';
          return;
        default:
          response = `Command not recognized: '<span class="t-dim">${escapeHtml(cmd)}</span>'. Type '<span class="t-accent">help</span>' for available options.`;
      }
    }

    appendTerminalLine(cmd, response);
  }

  function initTerminal() {
    updateTerminalOutput(STATUS_LINES[0]);
    setInterval(() => {
      statusIndex = (statusIndex + 1) % STATUS_LINES.length;
      updateTerminalOutput(STATUS_LINES[statusIndex]);
    }, 6000);

    const toggle = document.getElementById("terminal-toggle");
    const widget = document.getElementById("terminal");
    if (toggle && widget) {
      toggle.addEventListener("click", () => {
        widget.classList.toggle("minimized");
        safeSetText(toggle, widget.classList.contains("minimized") ? "+" : "—");
      });
    }

    const form = document.getElementById("terminal-form");
    const input = document.getElementById("terminal-input");
    if (form && input) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const val = input.value;
        input.value = "";
        handleTerminalCommand(val);
      });
    }
  }

  /* ── Command Palette (Cmd+K) ── */
  function openCommandPalette() {
    const overlay = document.getElementById("cmd-overlay");
    const input = document.getElementById("cmd-input");
    if (!overlay || !input) return;

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    input.value = "";
    filterCommandPalette("");
    setTimeout(() => input.focus(), 50);
  }

  function closeCommandPalette() {
    const overlay = document.getElementById("cmd-overlay");
    if (!overlay) return;
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
  }

  function renderCommandPalette() {
    const resultsContainer = document.getElementById("cmd-results");
    if (!resultsContainer) return;

    if (filteredCommands.length === 0) {
      resultsContainer.innerHTML = '<div class="cmd-item"><span class="cmd-item-left"><span class="t-dim">No matching commands found.</span></span></div>';
      return;
    }

    let html = "";
    let currentGroup = "";

    filteredCommands.forEach((cmd, idx) => {
      if (cmd.group !== currentGroup) {
        currentGroup = cmd.group;
        html += `<div class="cmd-group-title">${escapeHtml(currentGroup)}</div>`;
      }
      const isSelected = idx === cmdSelectedIndex ? "selected" : "";
      html += `
        <div class="cmd-item ${isSelected}" data-index="${idx}" role="option">
          <div class="cmd-item-left">
            <span class="cmd-item-icon">${cmd.icon}</span>
            <span>${escapeHtml(cmd.title)}</span>
          </div>
          <kbd>↵</kbd>
        </div>
      `;
    });

    resultsContainer.innerHTML = html;

    resultsContainer.querySelectorAll(".cmd-item").forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.dataset.index, 10);
        if (!isNaN(idx) && filteredCommands[idx]) {
          closeCommandPalette();
          filteredCommands[idx].action();
        }
      });
    });
  }

  function filterCommandPalette(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      filteredCommands = [...COMMANDS];
    } else {
      filteredCommands = COMMANDS.filter(c => c.title.toLowerCase().includes(q) || c.group.toLowerCase().includes(q));
    }
    cmdSelectedIndex = 0;
    renderCommandPalette();
  }

  function initCommandPalette() {
    const trigger = document.getElementById("cmd-k-trigger");
    const overlay = document.getElementById("cmd-overlay");
    const input = document.getElementById("cmd-input");

    if (trigger) trigger.addEventListener("click", openCommandPalette);
    if (overlay) {
      overlay.addEventListener("click", e => {
        if (e.target === overlay) closeCommandPalette();
      });
    }

    if (input) {
      input.addEventListener("input", e => filterCommandPalette(e.target.value));
      input.addEventListener("keydown", e => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          cmdSelectedIndex = (cmdSelectedIndex + 1) % Math.max(1, filteredCommands.length);
          renderCommandPalette();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          cmdSelectedIndex = (cmdSelectedIndex - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length);
          renderCommandPalette();
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredCommands[cmdSelectedIndex]) {
            closeCommandPalette();
            filteredCommands[cmdSelectedIndex].action();
          }
        }
      });
    }

    document.addEventListener("keydown", e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const isShown = overlay && overlay.classList.contains("show");
        if (isShown) closeCommandPalette(); else openCommandPalette();
      } else if (e.key === "Escape") {
        closeCommandPalette();
        closeProjectModal();
      }
    });
  }

  /* ── Project Detail Modal ── */
  function openProjectModal(projectId) {
    const data = PROJECT_DATA[projectId];
    if (!data) return;

    const modal = document.getElementById("project-modal");
    if (!modal) return;

    safeSetText(document.getElementById("modal-id"), data.id);
    safeSetText(document.getElementById("modal-title"), data.title);
    safeSetText(document.getElementById("modal-desc"), data.desc);

    const pill = document.getElementById("modal-pill");
    if (pill) {
      safeSetText(pill, data.pill);
      pill.className = `pill ${data.pillClass}`;
    }

    const bulletsList = document.getElementById("modal-highlights");
    if (bulletsList) {
      bulletsList.innerHTML = data.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("");
    }

    const tagsContainer = document.getElementById("modal-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = data.tags.map(t => `<span>${escapeHtml(t)}</span>`).join("");
    }

    const liveLink = document.getElementById("modal-live-link");
    if (liveLink) liveLink.href = data.live;

    const repoLink = document.getElementById("modal-repo-link");
    if (repoLink) repoLink.href = data.repo;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initProjectModal() {
    const modal = document.getElementById("project-modal");
    const closeBtn = document.getElementById("modal-close");

    if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
    if (modal) {
      modal.addEventListener("click", e => {
        if (e.target === modal) closeProjectModal();
      });
    }

    document.querySelectorAll("[data-project]").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest("a") && !e.target.closest(".link-arrow")) return;
        const key = card.dataset.project;
        if (key) openProjectModal(key);
      });
    });
  }

  /* ── Copy Email ── */
  function copyEmailAddress() {
    const btn = document.getElementById("copy-email");
    const label = document.getElementById("copy-label");
    const toast = document.getElementById("toast");
    const email = (btn && btn.dataset.email) || "contact@sagaradhikari016.com.np";

    navigator.clipboard.writeText(email).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });

    if (label) safeSetText(label, "Copied!");
    if (btn) btn.classList.add("copied");
    if (toast) {
      safeSetText(toast, "Email copied to clipboard");
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }

    setTimeout(() => {
      if (label) safeSetText(label, email);
      if (btn) btn.classList.remove("copied");
    }, 2000);
  }

  function initCopyEmail() {
    const btn = document.getElementById("copy-email");
    if (btn) btn.addEventListener("click", copyEmailAddress);
  }

  /* ── Scroll Reveal & Active Nav ── */
  function revealElements() {
    document.querySelectorAll(".reveal").forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 48) {
        el.classList.add("active");
      }
    });
  }

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

  function initHeader() {
    const header = document.getElementById("header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
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

  function updateClock() {
    const clockEl = document.querySelector(".clock-live, .hero-meta span:last-child");
    if (!clockEl) return;
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const npTime = new Date(utc + 5.75 * 3600000);
    const h = String(npTime.getHours()).padStart(2, "0");
    const m = String(npTime.getMinutes()).padStart(2, "0");
    safeSetText(clockEl, `${h}:${m} NPT`);
  }

  function onScroll() {
    revealElements();
    updateActiveNav();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSecurityObservers();
    initThemeToggle();
    initHeader();
    initMobileNav();
    initSpotlight();
    initTerminal();
    initCommandPalette();
    initProjectModal();
    initCopyEmail();
    revealElements();
    updateClock();
    setInterval(updateClock, 30000);
    setInterval(rotateTagline, 3500);
  });

  window.addEventListener("scroll", onScroll, { passive: true });
})();


