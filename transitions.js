/**
 * Page Transition System
 * Handles smooth animations between pages
 */

// Initialize theme on page load
// Initialize theme on page load
(function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Update theme toggle icon after DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            updateThemeIcon(themeIcon, savedTheme);
        }
    });
})();

// Helper to update theme icon
function updateThemeIcon(element, theme) {
    const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // If current theme is light, we show the moon (to switch to dark)
    // If current theme is dark, we show the sun (to switch to light)
    element.innerHTML = theme === 'light' ? moonIcon : sunIcon;
}

// Page Transition Handler - Slide Up with WASD Keys (Exposed globally)
function navigateWithTransition(url) {
    const pageWrapper = document.querySelector('.page-wrapper');
    const pageOverlay = document.getElementById('pageOverlay');

    // Page name mapping for transitions
    const pageNames = {
        'index.html': 'Work',
        'about.html': 'About',
        'skills.html': 'Skills',
        'certs.html': 'Certs',
        'contact.html': 'Contact',
        'blogs.html': 'Blogs'
    };

    // WASD key mapping based on destination
    const wasdKeyMapping = {
        'index.html': 'w',
        'about.html': 'a',
        'skills.html': 's',
        'certs.html': 'd',
        'contact.html': 'd',
        'blogs.html': 'd'
    };

    if (!pageWrapper || !pageOverlay) {
        window.location.href = url;
        return;
    }

    // Don't transition if same page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const targetPath = url.split('/').pop() || 'index.html';
    // Remove query params for comparison
    const targetFile = targetPath.split('?')[0];

    if (currentPath === targetFile && !url.includes('?')) {
        return;
    }

    // Get page name for display
    const pageName = pageNames[targetFile] || 'Project';
    const pageNameEl = document.getElementById('pageName');
    if (pageNameEl) {
        pageNameEl.textContent = pageName;
    }

    // Get which WASD key to highlight
    const activeKey = wasdKeyMapping[targetFile] || 'w';

    // Reset all WASD keys to default state
    const allKeys = pageOverlay.querySelectorAll('.wasd-key');
    allKeys.forEach(key => {
        key.classList.remove('wasd-key--active');
    });

    // Highlight the correct key based on destination
    const keyElements = {
        'w': pageOverlay.querySelector('.wasd-key--w'),
        'a': pageOverlay.querySelector('.wasd-row--bottom .wasd-key:nth-child(1)'),
        's': pageOverlay.querySelector('.wasd-row--bottom .wasd-key:nth-child(2)'),
        'd': pageOverlay.querySelector('.wasd-row--bottom .wasd-key:nth-child(3)')
    };

    // Remove active class from W key (it's active by default in CSS)
    const wKey = pageOverlay.querySelector('.wasd-key--w');
    if (wKey && activeKey !== 'w') {
        wKey.classList.add('wasd-key--inactive');
    } else if (wKey) {
        wKey.classList.remove('wasd-key--inactive');
    }

    // Add active class to the target key
    const targetKeyEl = keyElements[activeKey];
    if (targetKeyEl && activeKey !== 'w') {
        targetKeyEl.classList.add('wasd-key--active');
    }

    // Start slide-up animation
    pageOverlay.classList.remove('exit');
    pageOverlay.classList.add('active');

    // Navigate after overlay is fully visible and text is shown
    setTimeout(() => {
        window.location.href = url;
    }, 900);
}

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
                updateThemeIcon(themeIcon, newTheme);
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';

            if (isOpen) {
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                mobileMenu.setAttribute('aria-hidden', 'false');
                mobileMenuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
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
        'contact': 'contact.html',
        'blogs': 'blogs.html'
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
