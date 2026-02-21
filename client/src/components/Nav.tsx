import { Link, useLocation } from "wouter";
import { useState } from "react";

export function Nav() {
  const [location] = useLocation();
  const isBlog = location.startsWith("/blog");
  const isProject = location.startsWith("/projects");
  const isSubPage = isBlog || isProject;
  const [menuOpen, setMenuOpen] = useState(false);

  const currentDir = isBlog ? "~/blog" : isProject ? "~/projects" : "~";

  return (
    <nav className="w-full bg-black border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="text-sm flex items-center">
          <Link href="/">
            <a className="text-primary font-bold hover:underline cursor-pointer">parth@doshi</a>
          </Link>
          <span className="text-white">:</span>
          <span className="text-blue-400">{currentDir}</span>
          <span className="text-white">$</span>
        </div>

        {/* Desktop Nav */}
        {isSubPage ? (
          <div className="hidden md:flex gap-4 text-xs text-muted-foreground">
            <Link href="/">
              <a className="hover:text-primary hover:underline transition-colors">[0] cd ~</a>
            </Link>
            <Link href="/blog">
              <a className="hover:text-primary hover:underline transition-colors">[1] cd ~/blog</a>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex gap-4 text-xs text-muted-foreground">
            <a href="#about" className="hover:text-primary hover:underline transition-colors">[1] ./about.sh</a>
            <a href="#skills" className="hover:text-primary hover:underline transition-colors">[2] cat specs.txt</a>
            <a href="#projects" className="hover:text-primary hover:underline transition-colors">[3] ls ./projects</a>
            <Link href="/blog">
              <a className="hover:text-primary hover:underline transition-colors">[4] cd ./blog</a>
            </Link>
            <a href="#contact" className="hover:text-primary hover:underline transition-colors">[5] ssh connect</a>
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary text-xs border border-primary/30 px-2 py-1 hover:bg-primary/10 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? "[×]" : "[≡]"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-primary/10 bg-black/95 px-4 py-3 space-y-2 text-xs">
          {isSubPage ? (
            <>
              <Link href="/">
                <a onClick={() => setMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors py-1">→ cd ~</a>
              </Link>
              <Link href="/blog">
                <a onClick={() => setMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors py-1">→ cd ~/blog</a>
              </Link>
            </>
          ) : (
            <>
              <a href="#about" onClick={() => setMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors py-1">→ ./about.sh</a>
              <a href="#skills" onClick={() => setMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors py-1">→ cat specs.txt</a>
              <a href="#projects" onClick={() => setMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors py-1">→ ls ./projects</a>
              <Link href="/blog">
                <a onClick={() => setMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors py-1">→ cd ./blog</a>
              </Link>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-muted-foreground hover:text-primary transition-colors py-1">→ ssh connect</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
