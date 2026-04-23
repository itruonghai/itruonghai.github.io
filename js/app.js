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
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

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

        applyTheme(savedTheme || root.dataset.theme || (prefersDark ? 'dark' : 'light'));

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
            const title = section.querySelector('h1, h2, h3')?.textContent?.trim() || section.id;
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

    // 5. Hero Particle System
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let numParticles = window.innerWidth < 768 ? 80 : 150;

        const mouse = {
            x: null,
            y: null,
            radius: 150
        };

        // Capture mouse over the parent section
        const heroSection = document.getElementById('about');
        heroSection.addEventListener('mousemove', function (event) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        heroSection.addEventListener('mouseleave', function () {
            mouse.x = null;
            mouse.y = null;
        });

        // Resize Canvas
        function resize() {
            const parent = canvas.parentElement;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }
        window.addEventListener('resize', () => {
            resize();
            numParticles = window.innerWidth < 768 ? 40 : 80;
            init();
        });
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 1;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }

            draw() {
                ctx.fillStyle = root.dataset.theme === 'dark'
                    ? 'rgba(45, 212, 191, 0.45)'
                    : 'rgba(14, 165, 233, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Natural movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Return to natural position slowly
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 20;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 20;
                        }
                    }
                }

                // Keep base coords updated so they drift
                this.baseX += this.vx;
                this.baseY += this.vy;
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw lines between particles
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 80) {
                        ctx.beginPath();
                        const lineAlpha = 0.12 - distance / 760;
                        ctx.strokeStyle = root.dataset.theme === 'dark'
                            ? `rgba(251, 191, 36, ${lineAlpha})`
                            : `rgba(14, 165, 233, ${lineAlpha})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }

        init();
        animateCanvas();
    }

    // 6. 3D Tilt Effect on Profile Image
    const profileContainer = document.querySelector('.profile-image-container');
    if (profileContainer) {
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

    // 8. Looping Typewriter Effect
    const typeWriterElement = document.querySelector('.typewriter-text');
    if (typeWriterElement) {
        const phrases = [
            "Incoming PhD student @ Northeastern",
            "Computer Vision Researcher",
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Delete characters
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Type characters
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // Determine typing speed
            let typeSpeed = isDeleting ? 40 : 80;

            // If word is completely typed
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                // Pause before typing next word
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start the effect
        setTimeout(typeWriter, 1000);
    }

});
