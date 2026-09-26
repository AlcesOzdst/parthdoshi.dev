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
      <a href="#contact" className="font-mono text-[11px] uppercase tracking-[0.14em] accent">say hi →</a>
    </div>
  );
}
