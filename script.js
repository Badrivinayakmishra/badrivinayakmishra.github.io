// ========================================
// BADRI MISHRA - PORTFOLIO
// Clean Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollAnimations();
    initRotatingWords();
    initWorkTabs();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
});

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
    const hoverables = document.querySelectorAll('a, button, .work-tab, .award-row, .collab-item, .edu-highlights span, .skill-tags span, .video-link');
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
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Welcome lines with stagger
    document.querySelectorAll('.welcome-line').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });

    // Content blocks with stagger
    document.querySelectorAll('.content-block').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });

    // Awards section
    const awardsSection = document.querySelector('.awards-section');
    if (awardsSection) {
        awardsSection.classList.add('content-block');
        observer.observe(awardsSection);
    }
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

        // Update details
        details.forEach(detail => {
            detail.classList.remove('active');
            if (detail.id === `detail-${num}`) {
                detail.classList.add('active');
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
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
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
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}
