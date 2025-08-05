// === Принудительное скрытие прелоадера через 2 секунды ===
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 500);
    }
}, 2000);

// === Основная загрузка ===
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.remove();
                }
            }, 500);
        }, 600);
    }

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
    const navWrapper = document.querySelector('.nav-wrapper');

    if (burger && navWrapper) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            navWrapper.classList.toggle('open');
            burger.classList.toggle('open');
        });

        // Закрытие при клике на пункт
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navWrapper.classList.remove('open');
                burger.classList.remove('open');
            });
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!navWrapper.contains(e.target) && !burger.contains(e.target)) {
                navWrapper.classList.remove('open');
                burger.classList.remove('open');
            }
        });
    }

    // === Кнопка "Наверх" ===
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Кнопка "Связаться" ===
    document.querySelector('.header-contact-btn')?.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
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
});
