import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/useTheme";

export function Nav() {
  const [location] = useLocation();
  const isHome = location === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const links = isHome
    ? [
        { label: "findings", href: "#research" },
        { label: "work", href: "#projects" },
        { label: "about", href: "#about" },
        { label: "writing", href: "/blog", isRoute: true },
      ]
    : [
        { label: "home", href: "/", isRoute: true },
        { label: "writing", href: "/blog", isRoute: true },
      ];

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-sm"
      style={{ backgroundColor: "color-mix(in srgb, var(--c-bg) 88%, transparent)" }}
    >
      <div className="page-container flex items-center justify-between h-14">
        {/* Name / mark */}
        <Link href="/">
          <span className="font-mono text-[13px] font-semibold text-text cursor-pointer tracking-tight">
            parthdoshi<span style={{ color: "var(--c-accent)" }}>.me</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.isRoute ? (
              <Link key={link.label} href={link.href}>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary hover:text-text transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary hover:text-text transition-colors"
              >
                {link.label}
              </a>
            )
          )}

          <button
            onClick={toggle}
            className="p-1 text-text-secondary hover:text-text transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggle}
            className="p-1.5 text-text-secondary hover:text-text transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-text-secondary hover:text-text transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-3 space-y-2" style={{ backgroundColor: "var(--c-bg)" }}>
          {links.map((link) =>
            link.isRoute ? (
              <Link key={link.label} href={link.href}>
                <span
                  onClick={() => setMenuOpen(false)}
                  className="block font-mono text-xs uppercase tracking-[0.12em] text-text-secondary hover:text-text transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </span>
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block font-mono text-xs uppercase tracking-[0.12em] text-text-secondary hover:text-text transition-colors py-1"
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}
