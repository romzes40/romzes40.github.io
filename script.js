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

// === Анимация шапки и логотипа ===
const header = document.querySelector('header');
const logo = document.getElementById('logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// === Тема ===
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle?.querySelector('i');
    const body = document.body;

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme + '-theme');

    if (icon) {
        if (savedTheme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
            if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
});

// === Бургер-меню ===
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const headerRight = document.querySelector('.header-right');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    headerRight.classList.toggle('open');
    burger.classList.toggle('open');
});

// Скрытие меню после клика
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        headerRight.classList.remove('open');
        burger.classList.remove('open');
    });
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

// === Кнопка "Наверх" ===
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});
scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Форма ===
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (status) status.textContent = 'Отправка...';

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            if (status) status.textContent = 'Сообщение отправлено!';
            form.reset();
            setTimeout(() => { if (status) status.textContent = ''; }, 3000);
        } else {
            throw new Error();
        }
    } catch (err) {
        if (status) status.textContent = 'Ошибка. Попробуйте позже.';
    }
});

// === PWA: подсказка об установке ===
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const prompt = document.getElementById('installPrompt');
    if (prompt) {
        prompt.classList.remove('hidden');
    }
});

document.getElementById('installBtn')?.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
            document.getElementById('installPrompt')?.classList.add('hidden');
        });
    }
});

document.getElementById('installClose')?.addEventListener('click', () => {
    document.getElementById('installPrompt')?.classList.add('hidden');
});

// === Service Worker ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW зарегистрирован'))
            .catch(err => console.log('Ошибка:', err));
    });
}
