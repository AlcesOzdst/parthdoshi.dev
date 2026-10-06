import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [location] = useLocation();
  const isHome = location === "/";
  const [open, setOpen] = useState(false);

  const links = isHome
    ? [
        { label: "signals", href: "#signals" },
        { label: "built", href: "#work" },
        { label: "resume", href: "/resume", isRoute: true },
        { label: "writing", href: "/blog", isRoute: true },
      ]
    : [
        { label: "home", href: "/", isRoute: true },
        { label: "resume", href: "/resume", isRoute: true },
        { label: "writing", href: "/blog", isRoute: true },
      ];

  const isServer = typeof window === "undefined";

  return (
    <motion.nav
      initial={isServer ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 border-b border-border backdrop-blur-md"
      style={{ backgroundColor: "color-mix(in srgb, var(--c-bg) 72%, transparent)" }}
    >
      <div className="shell flex items-center justify-between h-16">
        <Link href="/" className="font-mono text-[13px] font-semibold cursor-pointer tracking-tight inline-flex items-center gap-2">
          <span className="status-dot" aria-hidden="true" />
          parthdoshi<span className="accent">.me</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary hover:text-text transition-colors cursor-pointer u-link"
              >
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary hover:text-text transition-colors u-link">
                {l.label}
              </a>
            )
          )}
          <a href="#contact" className="btn btn-solid !py-2 !px-4">get in touch</a>
        </div>

        <button className="md:hidden p-1.5 text-text-secondary hover:text-text" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 space-y-3" style={{ backgroundColor: "var(--c-bg)" }}>
          {links.map((l) =>
            l.isRoute ? (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-mono text-xs uppercase tracking-[0.16em] text-text-secondary py-1 cursor-pointer"
              >
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block font-mono text-xs uppercase tracking-[0.16em] text-text-secondary py-1">{l.label}</a>
            )
          )}
          <a href="#contact" onClick={() => setOpen(false)} className="block font-mono text-xs uppercase tracking-[0.16em] accent py-1">get in touch →</a>
        </div>
      )}
    </motion.nav>
  );
}
