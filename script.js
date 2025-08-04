// Анимации при прокрутке
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Тема
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.remove('light-theme', 'dark-theme');
body.classList.add(savedTheme + '-theme');
icon.classList.toggle('fa-moon', savedTheme === 'light');
icon.classList.toggle('fa-sun', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});
