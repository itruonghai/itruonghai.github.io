// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');
    const root = document.documentElement;

    const atmosphere = document.createElement('div');
    atmosphere.className = 'site-atmosphere';
    atmosphere.setAttribute('aria-hidden', 'true');
    atmosphere.innerHTML = '<span class="depth-slab"></span><span class="depth-slab"></span><span class="depth-slab"></span>';
    document.body.prepend(atmosphere);

    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(scrollProgress);

    function updateScrollProgress() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
        root.style.setProperty('--scroll-progress', progress.toFixed(4));
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateScrollProgress();
    });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');

    if (navContainer && mobileBtn) {
        const navActions = document.createElement('div');
        const themeToggle = document.createElement('button');
        const savedTheme = localStorage.getItem('theme');

        navActions.className = 'nav-actions';
        themeToggle.className = 'theme-toggle';
        themeToggle.type = 'button';

        function applyTheme(theme) {
            root.dataset.theme = theme;
            themeToggle.innerHTML = theme === 'dark'
                ? '<i class="fas fa-sun" aria-hidden="true"></i>'
                : '<i class="fas fa-moon" aria-hidden="true"></i>';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggle.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
        }

        applyTheme(savedTheme || root.dataset.theme || 'light');

        themeToggle.addEventListener('click', () => {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', nextTheme);
            applyTheme(nextTheme);
        });

        navContainer.insertBefore(navActions, mobileBtn);
        navActions.appendChild(themeToggle);
        navActions.appendChild(mobileBtn);
    }

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Highlight Active Nav Link
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        // Handle root / index.html
        if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/') {
                link.classList.add('active');
            }
        }
        // Handle other pages
        else if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace('./', ''))) {
            link.classList.add('active');
        }
    });

    // 4. Scroll Reveal with IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    const railSections = [...document.querySelectorAll('section[id]')].filter(section => {
        const id = section.getAttribute('id');
        return id && section.offsetHeight > 120;
    });

    if (railSections.length > 1) {
        const sectionRail = document.createElement('nav');
        sectionRail.className = 'section-rail';
        sectionRail.setAttribute('aria-label', 'Section navigation');

        railSections.forEach(section => {
            const link = document.createElement('a');
            const title = section.dataset.railLabel || section.querySelector('h1, h2, h3')?.textContent?.trim() || section.id;
            link.href = `#${section.id}`;
            link.setAttribute('aria-label', title.replace(/[^\w\s&-]/g, '').trim());
            sectionRail.appendChild(link);
        });

        document.body.appendChild(sectionRail);

        const railLinks = [...sectionRail.querySelectorAll('a')];
        const railObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                railLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, {
            rootMargin: '-42% 0px -42% 0px',
            threshold: 0
        });

        railSections.forEach(section => railObserver.observe(section));
    }


    // Subtle portrait tilt on pointer devices; leave reduced-motion layouts static.
    const profileContainer = document.querySelector('.profile-image-container');
    if (profileContainer && window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15; // Max tilt 15deg
            const rotateY = ((x - centerX) / centerX) * 15;

            profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            profileContainer.style.transition = 'transform 0.1s ease';
        });

        profileContainer.addEventListener('mouseleave', () => {
            profileContainer.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            profileContainer.style.transition = 'transform 0.5s ease';
        });
    }

    // 7. Shared 3D tilt for cards and page panels
    const canUseTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (canUseTilt) {
        const tiltTargets = document.querySelectorAll(
            '.glass-card, .paper-card, .education-card, .timeline-logo, .education-hero, .theme-toggle'
        );

        window.addEventListener('pointermove', (event) => {
            const shift = ((event.clientX / window.innerWidth) - 0.5) * 42;
            document.documentElement.style.setProperty('--atmosphere-shift', `${shift}px`);
        });

        tiltTargets.forEach(target => {
            target.addEventListener('pointermove', (event) => {
                const rect = target.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) - 0.5;
                const y = ((event.clientY - rect.top) / rect.height) - 0.5;
                const maxTilt = target.classList.contains('timeline-logo') ? 8 : 5;

                target.style.setProperty('--tilt-x', `${y * -maxTilt}deg`);
                target.style.setProperty('--tilt-y', `${x * maxTilt}deg`);
            });

            target.addEventListener('pointerleave', () => {
                target.style.setProperty('--tilt-x', '0deg');
                target.style.setProperty('--tilt-y', '0deg');
            });
        });
    }


    const typewriter = document.querySelector('.typewriter-text');
    if (typewriter && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const phrases = [
            'PhD student · Northeastern',
            'World models · Planning & Anticipation',
            'Action understanding · Ego & Exo video'
        ];
        let phrase = 0;
        let length = phrases[0].length;
        let deleting = true;

        function typeNext() {
            const text = phrases[phrase];
            length += deleting ? -1 : 1;
            typewriter.textContent = text.slice(0, length);
            let delay = deleting ? 45 : 80;
            if (length === 0) {
                phrase = (phrase + 1) % phrases.length;
                deleting = false;
                delay = 250;
            } else if (length === text.length) {
                deleting = true;
                delay = 2200;
            }
            window.setTimeout(typeNext, delay);
        }

        window.setTimeout(typeNext, 2200);
    }
});
