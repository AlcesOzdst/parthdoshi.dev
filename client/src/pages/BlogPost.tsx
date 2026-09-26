import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { parseMarkdown } from "@/lib/markdown";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const mdFiles = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true });

const posts: Record<string, { date: string; title: string; readingTime: string; summary: string; content: string }> = {};
Object.entries(mdFiles).forEach(([path, raw]) => {
  const { meta, content } = parseMarkdown(raw as string);
  const id = path.split("/").pop()?.replace(".md", "") || "";
  posts[id] = {
    date: meta.date || "",
    title: meta.title || "Untitled",
    readingTime: meta.readingTime || "5 min",
    summary: meta.summary || "",
    content,
  };
});

function fmtDate(d: string) {
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : t.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/* inline: **bold**, `code`, [text](url) */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((p, i) => {
    if (!p) return null;
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="text-text font-medium">{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`")) return <code key={i} className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-surface border border-border text-text">{p.slice(1, -1)}</code>;
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) return <a key={i} href={m[2]} target="_blank" rel="noreferrer" className="accent u-link">{m[1]}</a>;
    return <span key={i}>{p}</span>;
  });
}

function renderMarkdown(content: string): ReactNode[] {
  const lines = content.trim().split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { buf.push(lines[i]); i++; }
      i++; // skip closing fence
      out.push(
        <pre key={out.length} className="my-6 overflow-x-auto rounded-md border border-border bg-surface">
          {lang && <div className="px-4 pt-3 mono-label">{lang}</div>}
          <code className="block font-mono text-[0.8rem] leading-relaxed text-text-secondary whitespace-pre p-4 pt-2">{buf.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // grouped list
    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*] /, "")); i++; }
      out.push(
        <ul key={out.length} className="my-4 space-y-1.5 pl-5 list-disc marker:text-accent">
          {items.map((it, k) => <li key={k} className="text-text-secondary leading-relaxed pl-1">{inline(it)}</li>)}
        </ul>
      );
      continue;
    }

    if (line.trim() === "---") { out.push(<hr key={out.length} className="my-10 border-border" />); i++; continue; }
    if (line.startsWith("### ")) { out.push(<h3 key={out.length} className="display text-xl text-text mt-9 mb-3">{inline(line.slice(4))}</h3>); i++; continue; }
    if (line.startsWith("## ")) { out.push(<h2 key={out.length} className="display text-2xl text-text mt-12 mb-4">{inline(line.slice(3))}</h2>); i++; continue; }
    if (line.startsWith("# ")) { out.push(<h1 key={out.length} className="display text-3xl text-text mt-12 mb-4">{inline(line.slice(2))}</h1>); i++; continue; }
    if (/^\s*>\s?/.test(line)) { out.push(<blockquote key={out.length} className="my-6 pl-4 border-l-2 border-accent text-text-secondary italic">{inline(line.replace(/^\s*>\s?/, ""))}</blockquote>); i++; continue; }

    const img = line.match(/^!\[(.*)\]\((.*)\)/);
    if (img) {
      out.push(
        <figure key={out.length} className="my-8 space-y-2">
          <img src={img[2]} alt={img[1]} className="w-full rounded-md border border-border" loading="lazy" />
          {img[1] && <figcaption className="text-center mono-label">{img[1]}</figcaption>}
        </figure>
      );
      i++; continue;
    }

    if (line.trim() === "") { i++; continue; }

    out.push(<p key={out.length} className="mb-5 text-text-secondary leading-[1.8]">{inline(line)}</p>);
    i++;
  }
  return out;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const post = posts[params?.id || ""];

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="shell py-32 text-center" style={{ maxWidth: 680 }}>
          <p className="display text-3xl mb-6">Nothing here.</p>
          <Link href="/blog"><a className="btn">← back to writing</a></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />

      <header className="shell flex items-center justify-between h-16 border-b border-border" style={{ maxWidth: 760 }}>
        <Link href="/blog">
          <a className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-secondary hover:text-text transition-colors inline-flex items-center gap-2 group" data-cursor="back">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> The log
          </a>
        </Link>
        <Link href="/"><a className="mono-label uppercase tracking-[0.16em] hover:text-text transition-colors" data-cursor="home">Parth Doshi</a></Link>
      </header>

      <main className="shell" style={{ maxWidth: 720 }}>
        <article className="py-14 md:py-20">
          <p className="mono-label mb-4">{fmtDate(post.date)} · {post.readingTime}</p>
          <h1 className="display leading-[1.05] mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>{post.title}</h1>
          {post.summary && <p className="text-lg text-text-secondary leading-relaxed measure mb-10 pb-10 border-b border-border">{post.summary}</p>}
          <div>{renderMarkdown(post.content)}</div>

          <div className="mt-16 pt-6 border-t border-border">
            <Link href="/blog"><a className="btn" data-cursor="back">← more writing</a></Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
