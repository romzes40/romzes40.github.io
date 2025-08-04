// === Preloader ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.remove();
                }
            }, 500);
        }, 500);
    }
});

// === Тема ===
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle?.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.replace('light-theme', savedTheme + '-theme');
if (icon && savedTheme === 'dark') {
    icon.classList.replace('fa-moon', 'fa-sun');
} else if (icon) {
    icon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle?.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark');
        icon?.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light');
        icon?.classList.replace('fa-sun', 'fa-moon');
    }
});

// === Анимации при прокрутке ===
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// === Бургер-меню ===
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
});

// === Подсветка активного пункта меню ===
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

const makeActive = () => {
    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    navLinksAll.forEach(link => link.classList.remove('active'));
    navLinksAll[index]?.classList.add('active');
};

window.addEventListener('scroll', makeActive);
window.addEventListener('load', makeActive);

// === Кнопка "Наверх" ===
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
});
scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Форма обратной связи ===
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form?.addEventListener
