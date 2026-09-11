document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 2. Dynamic Section Tracker for Floating Monitor
  const statusElement = document.getElementById('system-status');
  const sections = document.querySelectorAll('section');

  const sectionLogs = {
    'hero': 'location: #hero — Sagar Adhikari Overview',
    'about': 'location: #about — BIM 4th Sem & Background Context',
    'projects': 'location: #projects — Expense Tracker, Snap Study & Portfolio',
    'skills': 'location: #skills — Tooling (PHP, Java, C, DBMS)',
    'academic': 'location: #academic — Tribhuvan University (TU)',
    'contact': 'location: #contact — Ready to Connect'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && statusElement) {
        const id = entry.target.id;
        if (sectionLogs[id]) {
          statusElement.textContent = sectionLogs[id];
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((section) => sectionObserver.observe(section));
});