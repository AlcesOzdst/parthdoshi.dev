import { Nav } from "@/components/Nav";
import { Link } from "wouter";

const posts = [
  {
    id: "zero-trust-architecture",
    date: "2026-02-15",
    title: "Implementing Zero Trust Architecture in Legacy Systems",
    summary: "A practical guide to securing outdated infrastructure without breaking operational dependencies. We explore micro-segmentation and identity-aware proxies.",
    readingTime: "8 min"
  },
  {
    id: "iot-vulnerabilities-2026",
    date: "2026-01-28",
    title: "The State of IoT Security: Firmware Analysis",
    summary: "Reverse-engineering common smart home devices to expose hardcoded credentials and unencrypted communication channels over MQTT.",
    readingTime: "12 min"
  },
  {
    id: "ddos-mitigation-strategies",
    date: "2025-11-10",
    title: "Beyond the Firewall: Advanced DDoS Mitigation",
    summary: "How to handle volumetric attacks exceeding 10Gbps using BGP Anycast, rate limiting, and edge-based traffic scrubbing.",
    readingTime: "6 min"
  }
];

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
            <article key={post.id} className="border-l border-primary/20 pl-6 hover:border-primary transition-colors group">
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors cursor-pointer">
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
              <div className="text-xs text-primary cursor-pointer hover:underline inline-flex items-center gap-2">
                <span>&gt; cat {post.id}.md</span>
                <span className="terminal-cursor opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>
            </article>
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
      
      <footer className="border-t border-primary/20 py-8 mt-12 text-center font-mono text-xs text-muted-foreground border-dashed">
        <p>SYSTEM.LOG("© {new Date().getFullYear()} Parth Doshi.")</p>
      </footer>
    </div>
  );
}
