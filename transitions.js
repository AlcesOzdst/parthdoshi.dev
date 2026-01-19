/**
 * Page Transition System
 * Handles smooth animations between pages
 */

// Initialize theme on page load
(function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Update theme toggle icon after DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
        }
    });
})();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.querySelector('.page-wrapper');
    const pageOverlay = document.getElementById('pageOverlay');
    const pageLoader = document.getElementById('pageLoader');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Theme Toggle Functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (themeIcon) {
                themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
            }
        });
    }

    // Page name mapping for transitions
    const pageNames = {
        'index.html': 'Work',
        'about.html': 'About',
        'skills.html': 'Skills',
        'certs.html': 'Certs',
        'contact.html': 'Contact'
    };

    // Page Transition Handler - Slide Up with Arrow
    function navigateWithTransition(url) {
        if (!pageWrapper || !pageOverlay) {
            window.location.href = url;
            return;
        }

        // Don't transition if same page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const targetPath = url.split('/').pop() || 'index.html';
        if (currentPath === targetPath) {
            return;
        }

        // Get page name for display
        const pageName = pageNames[targetPath] || 'Page';
        const pageNameEl = document.getElementById('pageName');
        if (pageNameEl) {
            pageNameEl.textContent = pageName;
        }

        // Start slide-up animation
        pageOverlay.classList.remove('exit');
        pageOverlay.classList.add('active');

        // Navigate after overlay is fully visible and text is shown
        setTimeout(() => {
            window.location.href = url;
        }, 900);
    }

    // Intercept navigation link clicks
    document.querySelectorAll('a[data-nav-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's an anchor link, external link, or mailto
            if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
                return;
            }

            e.preventDefault();
            navigateWithTransition(href);
        });
    });

    // Handle browser back/forward with transitions
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            // Page was loaded from cache (back/forward navigation)
            if (pageOverlay) pageOverlay.classList.remove('active');
            if (pageLoader) pageLoader.classList.remove('active');
            if (pageWrapper) {
                pageWrapper.classList.remove('page-exit');
                pageWrapper.classList.add('page-enter');
            }
        }
    });

    // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
        if (pageOverlay) pageOverlay.classList.remove('active');
        if (pageLoader) pageLoader.classList.remove('active');
    });
});

// Utility: Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '');
}

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getCurrentPage();
    const pageMap = {
        'index': 'index.html',
        'work': 'index.html',
        'about': 'about.html',
        'skills': 'skills.html',
        'certs': 'certs.html',
        'contact': 'contact.html'
    };

    document.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        if (href === pageMap[currentPage] ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Premium Scroll Animation System
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Observer options for smooth reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px', // Trigger slightly before fully in view
        threshold: 0.15
    };

    // Create intersection observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with a micro-delay for smoothness
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableSelectors = [
        '.animate-on-scroll',
        '.project-card',
        '.skill-category',
        '.cert-card',
        '.cta__box',
        '.footer',
        '.about__content',
        '.contact__content',
        '.contact__visual'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            revealObserver.observe(el);
        });
    });

    // Trigger visible class for elements already in viewport on load
    setTimeout(() => {
        document.querySelectorAll('.project-card, .skill-category, .cert-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
});
