import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useRoute } from "wouter";
import { parseMarkdown } from "@/lib/markdown";

const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

const posts: Record<string, any> = {};

Object.entries(mdFiles).forEach(([path, raw]) => {
  const { meta, content } = parseMarkdown(raw as string);
  const id = path.split('/').pop()?.replace('.md', '') || '';

  posts[id] = {
    date: meta.date || "Unknown Date",
    title: meta.title || "Untitled",
    readingTime: meta.readingTime || "5 min",
    content
  };
});

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('# ')) return <h1 key={i} className="text-xl md:text-2xl font-bold text-white mt-10 mb-4">{line.replace('# ', '')}</h1>;
    if (line.startsWith('## ')) return <h2 key={i} className="text-lg md:text-xl font-bold text-white mt-8 mb-3">{line.replace('## ', '')}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="text-base font-bold text-white mt-6 mb-2">{line.replace('### ', '')}</h3>;
    if (line.startsWith('- ')) {
      const text = line.replace('- ', '');
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return (
        <li key={i} className="ml-4 list-none text-muted-foreground my-1 flex items-start">
          <span className="text-primary mr-2 mt-[2px]">-</span>
          <span>
            {parts.map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
              return part;
            })}
          </span>
        </li>
      );
    }
    if (line.match(/^!\[.*\]\(.*\)/)) {
      const match = line.match(/^!\[(.*)\]\((.*)\)/);
      return match ? (
        <div key={i} className="my-8">
          <img src={match[2]} alt={match[1]} className="max-w-full h-auto border border-primary/20 opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
          <div className="text-[10px] text-muted-foreground mt-2 italic border-l border-primary/30 pl-2">fig: {match[1]}</div>
        </div>
      ) : null;
    }
    if (line === '') return <div key={i} className="h-4"></div>;

    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
          return part;
        })}
      </p>
    );
  });
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id || "";
  const post = posts[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
        <Nav />
        <div className="container mx-auto px-4 py-12">
          <div className="text-destructive font-mono text-xs md:text-sm">
            <span className="text-primary font-bold">guest@parthdoshi</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/blog</span>
            <span className="text-white">$</span> cat {postId}.md<br /><br />
            cat: {postId}.md: No such file or directory
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Nav />
      <main className="container mx-auto px-4 py-12">
        <div className="text-xs md:text-sm mb-8">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/blog</span>
          <span className="text-white">$</span> cat {postId}.md
        </div>

        <article className="ml-4 max-w-2xl">
          <div className="mb-8 border-b border-primary/20 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="text-xs text-muted-foreground font-mono flex flex-wrap gap-4">
              <span>DATE: {post.date}</span>
              <span>READ_TIME: {post.readingTime}</span>
              <span className="text-primary">AUTHOR: parth</span>
            </div>
          </div>

          <div className="font-mono text-xs md:text-sm">
            {renderMarkdown(post.content)}
          </div>
        </article>

        <div className="text-xs md:text-sm mt-16 mb-2 flex items-center">
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
