import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { parseMarkdown } from "@/lib/markdown";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";

const mdFiles = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true });

const posts = Object.entries(mdFiles)
  .map(([path, raw]) => {
    const { meta } = parseMarkdown(raw as string);
    const id = path.split("/").pop()?.replace(".md", "") || "";
    return {
      id,
      date: meta.date || "",
      title: meta.title || "Untitled",
      summary: meta.summary || "",
      readingTime: meta.readingTime || "5 min",
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function fmtDate(d: string) {
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : t.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Blog() {
  return (
    <div className="min-h-screen relative">
      <div className="grain" aria-hidden="true" />
      <Cursor />

      <header className="shell flex items-center justify-between h-16 border-b border-border">
        <Link href="/">
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-secondary hover:text-text transition-colors cursor-pointer inline-flex items-center gap-2" data-cursor="home">
            <ArrowLeft size={13} /> Parth Doshi
          </span>
        </Link>
        <span className="mono-label uppercase tracking-[0.16em]">The log</span>
      </header>

      <main className="shell" style={{ maxWidth: 760 }}>
        <div className="py-16 md:py-24">
          <Reveal>
            <p className="eyebrow mb-6">Writing</p>
            <h1 className="display leading-[1.02] mb-4" style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)" }}>
              Field notes from taking things <span className="italic-accent">apart</span>.
            </h1>
            <p className="text-text-secondary measure leading-relaxed">
              Firmware teardowns, hardware interfaces, CTF solves, and the occasional deep-dive
              into something I couldn&rsquo;t stop poking at.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 p-6 md:p-7 border border-border/80 rounded-md bg-surface/50 backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="mono-label uppercase tracking-[0.16em] accent text-[11px]">Building in public · Active Research</span>
              </div>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Rather than generic summaries, this space documents raw lab notes: UART flash dumping,
                hardware bus auditing, logic analyzer traces, and responsible vulnerability disclosures.
                Deep-dives are published here as research milestones conclude.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 border-t border-border">
            {posts.length === 0 && (
              <p className="mono-label py-10">No entries yet - the first writeup is on its way.</p>
            )}
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.05}>
                <Link
                  href={"/blog/" + post.id}
                  className="group block border-b border-border py-8 -mx-4 px-4 rounded-sm hover:bg-surface/40 transition-colors"
                  data-cursor="read ↗"
                >
                  <span className="mono-label block mb-2">{fmtDate(post.date)} · {post.readingTime}</span>
                  <h2 className="display text-2xl md:text-[1.9rem] leading-snug mb-2 inline-flex items-center gap-2 group-hover:text-accent transition-colors">
                    {post.title}
                    <ArrowUpRight size={20} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-accent" />
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed measure">{post.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
