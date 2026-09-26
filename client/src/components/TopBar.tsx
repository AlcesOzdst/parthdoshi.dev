import { Link } from "wouter";

export function TopBar() {
  return (
    <div
      className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-5 border-b border-border backdrop-blur-md"
      style={{ backgroundColor: "color-mix(in srgb, var(--c-bg) 78%, transparent)" }}
    >
      <a href="#top" className="font-mono text-[13px] font-semibold inline-flex items-center gap-2">
        <span className="status-dot" aria-hidden="true" />
        parthdoshi<span className="accent">.me</span>
      </a>
      <div className="flex items-center gap-5">
        <Link href="/blog"><a className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">writing</a></Link>
        <a href="#contact" className="font-mono text-[11px] uppercase tracking-[0.14em] accent">say hi →</a>
      </div>
    </div>
  );
}
