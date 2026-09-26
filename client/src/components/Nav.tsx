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
        { label: "Research", href: "#research" },
        { label: "Projects", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Blog", href: "/blog", isRoute: true },
      ]
    : [
        { label: "Home", href: "/", isRoute: true },
        { label: "Blog", href: "/blog", isRoute: true },
      ];

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: "var(--c-bg)" }}>
      <div className="page-container flex items-center justify-between h-12">
        {/* Name */}
        <Link href="/">
          <span className="font-serif text-[15px] font-semibold text-text cursor-pointer" style={{ fontVariationSettings: "'WONK' 1, 'opsz' 20" }}>
            parth doshi
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.isRoute ? (
              <Link key={link.label} href={link.href}>
                <span className="text-[12px] font-sans text-text-secondary hover:text-text transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-sans text-text-secondary hover:text-text transition-colors"
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
                  className="block text-sm text-text-secondary hover:text-text transition-colors cursor-pointer py-0.5"
                >
                  {link.label}
                </span>
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-text-secondary hover:text-text transition-colors py-0.5"
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
