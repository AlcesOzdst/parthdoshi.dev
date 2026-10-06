import { Link } from "wouter";

export function TopBar({ onOpenResume }: { onOpenResume?: () => void }) {
  return (
    <div
      className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-5 border-b border-border backdrop-blur-md"
      style={{ backgroundColor: "color-mix(in srgb, var(--c-bg) 78%, transparent)" }}
    >
      <a href="#top" className="font-mono text-[13px] font-semibold text-text inline-flex items-center gap-2">
        <span className="status-dot" aria-hidden="true" />
        parthdoshi<span className="accent">.me</span>
      </a>
      <div className="flex items-center gap-4">
        {onOpenResume ? (
          <button
            onClick={onOpenResume}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent cursor-pointer py-2"
          >
            resume
          </button>
        ) : (
          <Link href="/resume" className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent py-2">
            resume
          </Link>
        )}
        <Link href="/blog" className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary py-2">
          writing
        </Link>
        <a href="#contact" className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary py-2">contact</a>
      </div>
    </div>
  );
}
