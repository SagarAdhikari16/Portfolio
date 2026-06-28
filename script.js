// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);
updateThemeIcon(initialTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax effect on hero image
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    const heroRect = heroSection.getBoundingClientRect();
    
    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
        const offset = scrollPosition * 0.5;
        heroImage.style.transform = `translateY(${offset * 0.1}px)`;
    }
});

// ==================== SMART NAVIGATION ====================
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== EXPANDABLE SKILLS ====================
function toggleSkill(card) {
    const wasExpanded = card.classList.contains('expanded');
    document.querySelectorAll('.skill-card').forEach(c => {
        c.classList.remove('expanded');
    });
    if (!wasExpanded) {
        card.classList.add('expanded');
    }
}

// ==================== COPY EMAIL ====================
function copyEmail(e) {
    e.preventDefault();
    const email = 'contact@sagaradhikari016.com.np';
    navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
    });
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInToast 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ==================== CERTIFICATE MODAL ====================
function showCertificate(element, title) {
    showToast(`${title} - Replace with your actual certificate image!`);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});