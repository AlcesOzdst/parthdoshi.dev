import { Reveal } from "@/components/Reveal";
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const recentPosts = [
  {
    slug: "building-in-public",
    title: "Building in Public: Hardware Security & Firmware Field Notes",
    date: "30 Sep 2026",
    readingTime: "3 min",
    summary: "Why I document my research in public: from raw UART flash extraction and logic analyzer captures to responsible vulnerability disclosures.",
  },
];

export function Writing() {
  return (
    <section id="writing" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-12">
            <h2 className="eyebrow">03 · Writing &amp; Field Notes</h2>
            <Link href="/blog">
              <span className="mono-label accent hover:text-text transition-colors cursor-pointer inline-flex items-center gap-1 group" data-cursor="all">
                all entries <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="border-t border-border">
          {recentPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-x-5 md:gap-x-10 gap-y-2 items-baseline py-8 md:py-10 border-b border-border transition-colors duration-300 hover:bg-surface/30 rounded-sm -mx-4 px-4 block"
                data-cursor="read ↗"
              >
                <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors pt-2">
                  0{i + 1}
                </span>

                <div>
                  <span className="mono-label block mb-2">{post.date} · {post.readingTime}</span>
                  <h3
                    className="font-display font-bold tracking-[-0.02em] leading-[1.05] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.6rem)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.95rem] text-text-secondary leading-relaxed max-w-[60ch]">
                    {post.summary}
                  </p>
                </div>

                <span className="hidden md:flex items-center self-center text-text-secondary group-hover:text-accent transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={24} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
