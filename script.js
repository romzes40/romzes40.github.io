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

    // === Кнопка "Связаться со мной" (десктоп и мобильная) ===
    document.querySelector('.header-contact-btn')?.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.mobile-contact-btn')?.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // === Кнопка "Наверх" (мобильная) ===
    document.querySelector('.mobile-top-btn')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Бургер-меню ===
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-dropdown-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
            burger.classList.toggle('open');
        });

        // Закрытие при клике на пункт
        document.querySelectorAll('.mobile-dropdown-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                burger.classList.remove('open');
            });
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
                mobileMenu.classList.remove('open');
                burger.classList.remove('open');
            }
        });
    }
});
