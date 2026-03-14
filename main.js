// ============================================================
//  main.js – Huyen Portfolio (Vite + Bootstrap 5)
// ============================================================

import 'bootstrap';
import './style.css';

/* ---- Dark / Light Mode ---- */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
const THEME_KEY = 'huyen-theme';
const sunIcon = '<i class="bi bi-sun-fill"></i>';
const moonIcon = '<i class="bi bi-moon-stars-fill"></i>';

const applyTheme = (theme) => {
    htmlEl.setAttribute('data-bs-theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
};

const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-bs-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
});

/* ---- Navbar: add shadow on scroll ---- */
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

/* ---- Active nav link on scroll (Scrollspy) ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.id) link.classList.add('active');
            });
        }
    });
};
window.addEventListener('scroll', highlightNav);

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navContent');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

/* ---- Scroll Reveal (IntersectionObserver) ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger based on index within parent
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
            const delay = siblings.indexOf(entry.target) * 120;
            setTimeout(() => entry.target.classList.add('active'), delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
reveals.forEach(el => revealObserver.observe(el));

/* ---- Skills progress bar animation ---- */
const progressBars = document.querySelectorAll('.progress-bar[data-width]');
const skillsSection = document.getElementById('skills');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars.forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
if (skillsSection) skillObserver.observe(skillsSection);

/* ---- Back to Top button ---- */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('d-none');
        scrollTopBtn.classList.add('d-flex');
    } else {
        scrollTopBtn.classList.add('d-none');
        scrollTopBtn.classList.remove('d-flex');
    }
});

/* ---- Contact form submit ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Đã gửi thành công!';
        btn.disabled = true;
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.classList.add('btn-primary');
            btn.classList.remove('btn-success');
            contactForm.reset();
        }, 3000);
    });
}
