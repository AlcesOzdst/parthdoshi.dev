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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Nav />
      <main className="container mx-auto px-4 py-12">
        <div className="text-sm md:text-base mb-8">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/blog</span>
          <span className="text-white">$</span> ls -la --time-style=long-iso
        </div>

        <div className="ml-4 space-y-12">
          {posts.map((post) => (
            <Link key={post.id} href={"/blog/" + post.id}>
              <a className="block border-l border-primary/20 pl-6 hover:border-primary transition-colors group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                  <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="text-xs text-muted-foreground font-mono flex gap-3">
                    <span>[{post.date}]</span>
                    <span>[{post.readingTime} read]</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {post.summary}
                </p>
                <div className="text-xs text-primary group-hover:underline inline-flex items-center gap-2">
                  <span>&gt; cat {post.id}.md</span>
                  <span className="terminal-cursor opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        <div className="text-sm md:text-base mt-16 mb-2 flex items-center">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/blog</span>
          <span className="text-white">$</span>
          <span className="terminal-cursor"></span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
