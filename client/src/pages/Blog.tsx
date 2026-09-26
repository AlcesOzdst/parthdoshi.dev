import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { parseMarkdown } from "@/lib/markdown";

const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

const posts = Object.entries(mdFiles).map(([path, raw]) => {
  const { meta } = parseMarkdown(raw as string);
  const id = path.split('/').pop()?.replace('.md', '') || '';

  return {
    id,
    date: meta.date || "Unknown date",
    title: meta.title || "Untitled",
    summary: meta.summary || "",
    readingTime: meta.readingTime || "5 min"
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="page-container py-20 md:py-28">
        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight mb-2">
          Writing
        </h1>
        <p className="text-sm text-text-secondary mb-12">
          Notes on cybersecurity, embedded systems, and building things.
        </p>

        <div className="space-y-10">
          {posts.map((post) => (
            <Link key={post.id} href={"/blog/" + post.id}>
              <a className="group block">
                <span className="mono-label text-[11px] block mb-1">
                  {post.date} · {post.readingTime}
                </span>

                <h2 className="font-serif font-semibold text-lg text-text group-hover:opacity-70 transition-opacity mb-1" style={{ fontVariationSettings: "'WONK' 1, 'opsz' 24" }}>
                  {post.title}
                </h2>

                <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                  {post.summary}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
