/**
 * Blog System - Markdown-based Blog Engine
 * Reads blog posts from blogs-data.json and renders them
 */

class BlogEngine {
    constructor() {
        this.posts = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        await this.loadPosts();
        this.renderPosts();
        this.setupFilters();
    }

    // Load posts from JSON file
    async loadPosts() {
        try {
            const response = await fetch('blogs/blogs-data.json');
            if (response.ok) {
                const data = await response.json();
                this.posts = data.posts || [];
            }
        } catch (error) {
            console.log('No blog posts found or blogs-data.json not available');
            this.posts = [];
        }
    }

    // Render blog posts to the grid
    renderPosts(filter = 'all') {
        const grid = document.getElementById('blogGrid');
        const emptyState = document.getElementById('emptyState');

        if (!grid) return;

        // Filter posts
        let filteredPosts = this.posts.filter(post => post.published !== false);
        if (filter !== 'all') {
            filteredPosts = filteredPosts.filter(post =>
                post.tags && post.tags.includes(filter)
            );
        }

        // Sort by date (newest first)
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Clear grid (except empty state)
        const cards = grid.querySelectorAll('.blog-card');
        cards.forEach(card => card.remove());

        // Show empty state if no posts
        if (filteredPosts.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        // Hide empty state
        if (emptyState) emptyState.style.display = 'none';

        // Render each post
        filteredPosts.forEach((post, index) => {
            const card = this.createPostCard(post, index);
            grid.appendChild(card);
        });

        // Trigger animations
        setTimeout(() => {
            grid.querySelectorAll('.blog-card').forEach(card => {
                card.classList.add('visible');
            });
        }, 100);
    }

    // Create a blog post card element
    createPostCard(post, index) {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.style.transitionDelay = `${index * 0.1}s`;

        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const readTime = this.calculateReadTime(post.content || '');
        const tagsHtml = (post.tags || []).map(tag =>
            `<span class="blog-card__tag">${tag}</span>`
        ).join('');

        card.innerHTML = `
            ${post.featuredImage ? `
                <div class="blog-card__image">
                    <img src="${post.featuredImage}" alt="${post.title}">
                </div>
            ` : ''}
            <div class="blog-card__content">
                <div class="blog-card__meta">
                    <span class="blog-card__date">${date}</span>
                    <span class="blog-card__read-time">${readTime} min read</span>
                </div>
                <h3 class="blog-card__title">${post.title}</h3>
                <p class="blog-card__excerpt">${post.excerpt || ''}</p>
                <div class="blog-card__tags">${tagsHtml}</div>
                <a href="blog-post.html?id=${post.id}" class="blog-card__link">
                    Read More →
                </a>
            </div>
        `;

        return card;
    }

    // Calculate estimated read time
    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.max(1, Math.ceil(words / wordsPerMinute));
    }

    // Setup filter buttons
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Apply filter
                const filter = btn.dataset.filter;
                this.currentFilter = filter;
                this.renderPosts(filter);
            });
        });
    }
}

// Initialize blog engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blogGrid')) {
        new BlogEngine();
    }
});
