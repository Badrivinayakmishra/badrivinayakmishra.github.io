// ========================================
// BADRI MISHRA - PORTFOLIO
// Advanced GSAP Animations
// ========================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize Lenis smooth scroll
let lenis;

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initLoader();
    initCursor();
    initScrollProgress();
    initHeroAnimations();
    initScrollAnimations();
    initRotatingWords();
    initWorkTabs();
    initFullscreenMenu();
    initHorizontalProjects();
    initBackToTop();
    initSmoothScroll();
});

// ========================================
// LENIS SMOOTH SCROLL
// ========================================
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// ========================================
// LOADING SCREEN
// ========================================
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    const tl = gsap.timeline();

    tl.to('.loader-text', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    })
    .to('.loader', {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 1.5
    })
    .set('.loader', { display: 'none' });
}

// ========================================
// CUSTOM CURSOR
// ========================================
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    const hoverables = document.querySelectorAll('a, button, .work-tab, .award-row, .collab-item, .edu-highlights span, .skill-tags span, .video-link, .h-project-content, .menu-link');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function initScrollProgress() {
    const progressText = document.querySelector('.progress-text');
    if (!progressText) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight).toFixed(2);
        progressText.textContent = scrollPercent;
    });
}

// ========================================
// HERO ANIMATIONS
// ========================================
function initHeroAnimations() {
    const heroTl = gsap.timeline({ delay: 2 });

    // Animate hero name lines
    heroTl.to('.hero-name .line', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
    })
    .to('.hero-tagline', {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
    .to('.hero-sub', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .to('.hero-image-container', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.scroll-hint', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3');

    // Parallax effect on hero background text
    gsap.to('.hero-bg-text', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Fade out hero on scroll
    gsap.to('.hero-content', {
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'center center',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    // Welcome section lines reveal
    gsap.utils.toArray('.welcome-line').forEach((line, i) => {
        gsap.to(line, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
        });
    });

    // Generic reveal lines
    gsap.utils.toArray('.reveal-line').forEach((line, i) => {
        gsap.to(line, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Content blocks
    gsap.utils.toArray('.content-block').forEach((block) => {
        gsap.fromTo(block,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: block,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Skills section
    gsap.utils.toArray('.skills-line').forEach((line, i) => {
        gsap.to(line, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.skills-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            delay: i * 0.15
        });
    });

    // Skills grid columns
    gsap.utils.toArray('.skills-col').forEach((col, i) => {
        gsap.fromTo(col,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.1
            }
        );
    });

    // Awards section
    const awardsSection = document.querySelector('.awards-section');
    if (awardsSection) {
        gsap.fromTo(awardsSection,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: awardsSection,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // Award rows stagger
    gsap.utils.toArray('.award-row').forEach((row, i) => {
        gsap.fromTo(row,
            { x: -30, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.05
            }
        );
    });

    // About image parallax
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        gsap.to(aboutImage, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Quote section
    const quoteSection = document.querySelector('.quote-section');
    if (quoteSection) {
        gsap.fromTo(quoteSection.querySelector('blockquote'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: quoteSection,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // Contact section
    gsap.utils.toArray('.contact-title span').forEach((span, i) => {
        gsap.fromTo(span,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.1
            }
        );
    });

    // Collaborators logos
    gsap.utils.toArray('.logo-item').forEach((item, i) => {
        gsap.fromTo(item,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 0.6,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.collab-logos',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.1
            }
        );
    });
}

// ========================================
// ROTATING WORDS
// ========================================
function initRotatingWords() {
    const words = document.querySelectorAll('.rotate-word');
    if (words.length === 0) return;

    let current = 0;

    setInterval(() => {
        words[current].classList.remove('active');
        words[current].classList.add('exit');

        setTimeout(() => {
            words[current].classList.remove('exit');
        }, 600);

        current = (current + 1) % words.length;
        words[current].classList.add('active');
    }, 2500);
}

// ========================================
// WORK TABS
// ========================================
function initWorkTabs() {
    const tabs = document.querySelectorAll('.work-tab');
    const details = document.querySelectorAll('.work-detail');
    const navBtns = document.querySelectorAll('.work-nav-btn');

    function showDetail(num) {
        // Update tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.num === num) {
                tab.classList.add('active');
            }
        });

        // Update details with animation
        details.forEach(detail => {
            if (detail.classList.contains('active')) {
                gsap.to(detail, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    onComplete: () => {
                        detail.classList.remove('active');
                    }
                });
            }
            if (detail.id === `detail-${num}`) {
                setTimeout(() => {
                    detail.classList.add('active');
                    gsap.fromTo(detail,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                }, 300);
            }
        });

        // Update nav buttons
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.target === num) {
                btn.classList.add('active');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showDetail(tab.dataset.num);
        });
    });

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showDetail(btn.dataset.target);
        });
    });
}

// ========================================
// FULLSCREEN MENU
// ========================================
function initFullscreenMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.fullscreen-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');

        // Toggle body scroll
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        }
    });

    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        });
    });
}

// ========================================
// HORIZONTAL PROJECTS SLIDER
// ========================================
function initHorizontalProjects() {
    const track = document.querySelector('.horizontal-track');
    const projects = document.querySelectorAll('.h-project');
    const prevBtn = document.querySelector('.h-nav-btn.prev');
    const nextBtn = document.querySelector('.h-nav-btn.next');
    const counter = document.querySelector('.h-nav-counter .current');

    if (!track || projects.length === 0) return;

    let currentIndex = 0;
    const totalProjects = projects.length;

    function updateSlider() {
        const projectWidth = projects[0].offsetWidth;
        const gap = 64; // 4rem gap
        const offset = currentIndex * (projectWidth + gap);

        gsap.to(track, {
            x: -offset,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Update counter
        if (counter) {
            counter.textContent = String(currentIndex + 1).padStart(2, '0');
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
            updateSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalProjects;
            updateSlider();
        });
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (diff > swipeThreshold) {
            // Swipe left - next
            currentIndex = (currentIndex + 1) % totalProjects;
            updateSlider();
        } else if (diff < -swipeThreshold) {
            // Swipe right - prev
            currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
            updateSlider();
        }
    }

    // Animate projects on scroll into view
    gsap.fromTo('.h-project',
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.horizontal-projects',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// ========================================
// BACK TO TOP
// ========================================
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                if (lenis) {
                    lenis.scrollTo(target, { offset: -80, duration: 1.5 });
                } else {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }
        });
    });
}
