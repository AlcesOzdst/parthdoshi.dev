/**
 * Blog Build Script
 * Reads markdown files from blogs/posts/ and generates blogs-data.json
 * 
 * Usage: node blogs/build-blogs.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_FILE = path.join(__dirname, 'blogs-data.json');

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { metadata: {}, content: content };
    }

    const frontmatter = match[1];
    const body = match[2];

    // Parse YAML-like frontmatter
    const metadata = {};
    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Handle arrays (tags)
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(v =>
                    v.trim().replace(/["']/g, '')
                );
            }
            // Handle booleans
            else if (value === 'true') value = true;
            else if (value === 'false') value = false;
            // Handle quoted strings
            else if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            metadata[key] = value;
        }
    });

    return { metadata, content: body };
}

// Generate unique ID from filename
function generateId(filename) {
    return filename.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// Main build function
function buildBlogData() {
    console.log('🔨 Building blog data...\n');

    // Check if posts directory exists
    if (!fs.existsSync(POSTS_DIR)) {
        console.log('📁 Creating posts directory...');
        fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    // Read all markdown files
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    console.log(`📄 Found ${files.length} markdown file(s)\n`);

    const posts = [];

    files.forEach(filename => {
        const filepath = path.join(POSTS_DIR, filename);
        const content = fs.readFileSync(filepath, 'utf-8');
        const { metadata, content: body } = parseFrontmatter(content);

        const post = {
            id: generateId(filename),
            title: metadata.title || filename.replace('.md', ''),
            date: metadata.date || new Date().toISOString().split('T')[0],
            tags: Array.isArray(metadata.tags) ? metadata.tags : [],
            excerpt: metadata.excerpt || body.slice(0, 150).replace(/[#*`]/g, '') + '...',
            featuredImage: metadata.featuredImage || metadata.image || '',
            published: metadata.published !== false,
            content: body
        };

        posts.push(post);
        console.log(`  ✅ ${post.title} (${post.tags.join(', ')})`);
    });

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Write output
    const output = { posts, generatedAt: new Date().toISOString() };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

    console.log(`\n✨ Generated ${OUTPUT_FILE}`);
    console.log(`📊 ${posts.length} posts processed`);
}

// Run build
buildBlogData();
