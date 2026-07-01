// ========================================
// BADRI MISHRA - PORTFOLIO
// Merged: New Hero + Original Sections
// ========================================

gsap.registerPlugin(ScrollTrigger);

// ========================================
// LOADER
// ========================================
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');
    const loaderLine = document.querySelector('.loader-line');

    if (!loader) return;

    const tl = gsap.timeline({
        onComplete: () => {
            loader.style.pointerEvents = 'none';
            initHeroAnimations();
        }
    });

    tl.to(loaderText, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    })
    .to(loaderLine, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
    })
    .set(loaderLine, {
        background: 'var(--white)'
    })
    .to([loaderText, loaderLine], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in'
    })
    .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
    });
}

// ========================================
// SCROLL PROGRESS
// ========================================
function initScrollProgress() {
    const progressText = document.querySelector('.progress-text');
    if (!progressText) return;

    ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            progressText.textContent = self.progress.toFixed(2);
        }
    });
}

// ========================================
// HERO ANIMATIONS
// ========================================
function initHeroAnimations() {
    const heroLabel = document.querySelector('.hero-label');
    const heroLines = document.querySelectorAll('.hero-title .line-inner');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroScroll = document.querySelector('.hero-scroll');

    let textRevealed = false;

    function revealText() {
        if (textRevealed) return;
        textRevealed = true;

        const tl = gsap.timeline();

        if (heroLabel) {
            tl.to(heroLabel, { opacity: 1, duration: 0.8, ease: 'power3.out' });
        }
        if (heroLines.length) {
            tl.to(heroLines, { y: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }, '-=0.5');
        }
        if (heroTagline) {
            tl.to(heroTagline, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');
        }
        if (heroScroll) {
            tl.to(heroScroll, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2');
        }
    }

    // Reveal text after user scrolls 80px
    window.addEventListener('scroll', function onScroll() {
        if (window.scrollY > 80) {
            revealText();
            window.removeEventListener('scroll', onScroll);
        }
    });
}

// ========================================
// WELCOME SECTION ANIMATIONS
// ========================================
function initWelcomeAnimations() {
    const welcomeLines = document.querySelectorAll('.welcome-line');

    welcomeLines.forEach((line, i) => {
        gsap.to(line, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
        });
    });
}

// ========================================
// ABOUT SECTION ANIMATIONS
// ========================================
function initAboutAnimations() {
    const contentBlocks = document.querySelectorAll('.content-block');

    contentBlocks.forEach((block, i) => {
        gsap.to(block, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
        });
    });

    // Award rows
    const awardRows = document.querySelectorAll('.award-row');
    awardRows.forEach((row, i) => {
        gsap.fromTo(row,
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
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

    // Awards section reveal
    const awardsSection = document.querySelector('.awards-section');
    if (awardsSection) {
        gsap.fromTo(awardsSection,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: awardsSection,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// ========================================
// SKILLS SECTION
// ========================================
function initSkillsAnimations() {
    const skillsLines = document.querySelectorAll('.skills-line');
    const skillsCols = document.querySelectorAll('.skills-col');

    skillsLines.forEach((line, i) => {
        gsap.fromTo(line,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.skills-text',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.1
            }
        );
    });

    skillsCols.forEach((col, i) => {
        gsap.fromTo(col,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.15
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
        const currentWord = words[current];

        gsap.to(currentWord, {
            y: '-100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                currentWord.classList.remove('active');
                gsap.set(currentWord, { y: '100%' });
            }
        });

        current = (current + 1) % words.length;
        const nextWord = words[current];
        nextWord.classList.add('active');

        gsap.fromTo(nextWord,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
        );
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
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.num === num) {
                tab.classList.add('active');
            }
        });

        details.forEach(detail => {
            if (detail.classList.contains('active')) {
                gsap.to(detail, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        detail.classList.remove('active');
                        const newDetail = document.getElementById(`detail-${num}`);
                        if (newDetail) {
                            newDetail.classList.add('active');
                            gsap.fromTo(newDetail,
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
                            );
                        }
                    }
                });
            } else if (detail.id === `detail-${num}` && !document.querySelector('.work-detail.active')) {
                detail.classList.add('active');
            }
        });

        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.target === num) {
                btn.classList.add('active');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => showDetail(tab.dataset.num));
    });

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => showDetail(btn.dataset.target));
    });

    // Work section reveal
    gsap.fromTo('.work-tabs',
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.work-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// ========================================
// BEYOND SECTION
// ========================================
function initBeyondAnimations() {
    const beyondCards = document.querySelectorAll('.beyond-card');

    beyondCards.forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.beyond-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.15
            }
        );
    });
}

// ========================================
// PROJECTS SECTION
// ========================================
function initProjectsAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.1
            }
        );
    });
}

// ========================================
// QUOTE SECTION
// ========================================
function initQuoteAnimations() {
    const quote = document.querySelector('.quote-section blockquote');

    if (quote) {
        gsap.fromTo(quote,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.quote-section',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// ========================================
// CONTACT SECTION - jopecuro style
// ========================================
function initContactAnimations() {
    const contactLines = document.querySelectorAll('.contact-title .line-inner');
    const contactLinks = document.querySelectorAll('.contact-link');

    // Text reveal animation for title
    contactLines.forEach((line, i) => {
        gsap.to(line, {
            y: 0,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            delay: i * 0.15
        });
    });

    // Links stagger animation
    contactLinks.forEach((link, i) => {
        gsap.fromTo(link,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-links',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                delay: 0.4 + (i * 0.15)
            }
        );
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.contains('active');

        if (!isActive) {
            menu.classList.add('active');
            toggle.classList.add('active');

            gsap.fromTo(menu.querySelectorAll('a'),
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            );
        } else {
            gsap.to(menu.querySelectorAll('a'), {
                opacity: 0,
                y: -20,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: () => {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                }
            });
        }
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// ========================================
// BACK TO TOP
// ========================================
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    ScrollTrigger.create({
        trigger: document.body,
        start: '600px top',
        onEnter: () => btn.classList.add('visible'),
        onLeaveBack: () => btn.classList.remove('visible')
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
}

// ========================================
// PARALLAX
// ========================================
function initParallax() {
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

// ========================================
// INITIALIZE ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initScrollProgress();
    initWelcomeAnimations();
    initAboutAnimations();
    initSkillsAnimations();
    initRotatingWords();
    initWorkTabs();
    initBeyondAnimations();
    initProjectsAnimations();
    initQuoteAnimations();
    initContactAnimations();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initParallax();
});
