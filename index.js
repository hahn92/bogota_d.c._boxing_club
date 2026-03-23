document.addEventListener('DOMContentLoaded', function () {

    // ── Mobile Menu ──────────────────────────────────────────────
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // ── Smooth Scroll ────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 79, behavior: 'smooth' });
        });
    });

    // ── Header scroll state ──────────────────────────────────────
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
    }, { passive: true });

    // ── Active Nav Highlight ─────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }

    // ── Gallery Carousel ─────────────────────────────────────────
    const track = document.querySelector('.galeria-carrusel .carrusel-track');
    const slides = document.querySelectorAll('.galeria-carrusel .carrusel-slide');
    const btnPrev = document.querySelector('.galeria-carrusel .carrusel-anterior');
    const btnNext = document.querySelector('.galeria-carrusel .carrusel-siguiente');

    if (slides.length > 0 && btnPrev && btnNext) {
        let index = 0;

        function slidesPerView() {
            if (window.innerWidth >= 992) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function maxIndex() {
            return slides.length - slidesPerView();
        }

        function moveCarrusel() {
            const w = slides[0].offsetWidth;
            track.style.transform = `translateX(-${index * w}px)`;
        }

        btnPrev.addEventListener('click', () => {
            index = index > 0 ? index - 1 : maxIndex();
            moveCarrusel();
        });

        btnNext.addEventListener('click', () => {
            index = index < maxIndex() ? index + 1 : 0;
            moveCarrusel();
        });

        // Recalculate on resize
        window.addEventListener('resize', () => {
            if (index > maxIndex()) index = maxIndex();
            moveCarrusel();
        }, { passive: true });

        // Touch / swipe support
        let touchStartX = 0;
        track.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    index = index < maxIndex() ? index + 1 : 0;
                } else {
                    index = index > 0 ? index - 1 : maxIndex();
                }
                moveCarrusel();
            }
        }, { passive: true });
    }

    // ── Gallery Popup ────────────────────────────────────────────
    const popup = document.getElementById('popup-galeria');
    const popupImg = document.getElementById('popup-imagen');
    const cerrar = document.querySelector('.cerrar-popup');

    if (popup && popupImg) {
        document.querySelectorAll('.galeria-carrusel .carrusel-slide').forEach(slide => {
            slide.addEventListener('click', () => {
                const img = slide.querySelector('img');
                popupImg.src = img.src;
                popupImg.alt = img.alt;
                popup.classList.add('open');
            });
        });

        function closePopup() { popup.classList.remove('open'); }

        cerrar && cerrar.addEventListener('click', closePopup);
        popup.addEventListener('click', e => { if (e.target === popup) closePopup(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });
    }

    // ── Intersection Observer (fade-in & gallery items) ──────────
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in, .gallery-item').forEach(el => observer.observe(el));

});
