// === Preloader ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 500);
    }, 500);
});

// === Тема ===
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.replace('light-theme', savedTheme + '-theme');
icon.classList.toggle('fa-moon', savedTheme === 'light');
icon.classList.toggle('fa-sun', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// === Анимации ===
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

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// === Активное меню ===
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
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Форма ===
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    status.textContent = 'Отправка...';

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            status.textContent = 'Сообщение отправлено!';
            form.reset();
            setTimeout(() => status.textContent = '', 3000);
        } else {
            throw new Error();
        }
    } catch (err) {
        status.textContent = 'Ошибка. Попробуйте позже.';
    }
});

// === PWA Install Prompt ===
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installPrompt').classList.remove('hidden');
});

document.getElementById('installBtn').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
            document.getElementById('installPrompt').classList.add('hidden');
        });
    }
});

document.getElementById('installClose').addEventListener('click', () => {
    document.getElementById('installPrompt').classList.add('hidden');
});

// === Service Worker ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW зарегистрирован'))
            .catch(err => console.log('Ошибка:', err));
    });
});