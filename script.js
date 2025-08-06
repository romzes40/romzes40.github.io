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

    // === Кнопка "Наверх" (десктоп) ===
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

    // === Кнопка "Связаться со мной" (десктоп и мобильная) ===
    document.querySelector('.header-contact-btn')?.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.mobile-contact-btn')?.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // === Кнопка "Наверх" (мобильная) ===
    const mobileTopBtn = document.querySelector('.mobile-top-btn');
    const homeSection = document.getElementById('home');

    if (mobileTopBtn && homeSection) {
        const homeHeight = homeSection.offsetHeight;

        window.addEventListener('scroll', () => {
            if (window.scrollY > homeHeight) {
                mobileTopBtn.classList.add('show');
            } else {
                mobileTopBtn.classList.remove('show');
            }
        });

        mobileTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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

    // === Модальное окно для политики конфиденциальности ===
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    const privacyPolicyModal = document.getElementById('privacyPolicyModal');
    const closeModal = document.querySelector('.close-modal');

    if (privacyPolicyLink && privacyPolicyModal && closeModal) {
        privacyPolicyLink.addEventListener('click', () => {
            privacyPolicyModal.classList.add('show');
        });

        closeModal.addEventListener('click', () => {
            privacyPolicyModal.classList.remove('show');
        });

        // Закрытие при клике вне модального окна
        privacyPolicyModal.addEventListener('click', (e) => {
            if (e.target === privacyPolicyModal) {
                privacyPolicyModal.classList.remove('show');
            }
        });
    }

    // === Форма ===
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Проверка галочки
        const consent = document.getElementById('privacyConsent');
        if (!consent.checked) {
            if (status) status.textContent = 'Вы должны согласиться с политикой конфиденциальности';
            return;
        }

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
