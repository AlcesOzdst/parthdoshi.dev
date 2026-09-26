export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border pt-14 pb-10 overflow-hidden">
      <div className="shell">
        <div
          className="display tracking-[-0.02em] leading-none text-text/90 select-none"
          style={{ fontSize: "clamp(1.8rem, 6vw, 3.5rem)" }}
          aria-hidden="true"
        >
          Parth Doshi<span className="accent">.</span>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-border pt-6">
          <span className="mono-label">© {year} Parth Doshi — Pune, India</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="mono-label u-link hover:text-text transition-colors">github</a>
            <a href="https://linkedin.com/in/parthdoshi404" target="_blank" rel="noreferrer" className="mono-label u-link hover:text-text transition-colors">linkedin</a>
            <a href="mailto:parthdoshi404@gmail.com" className="mono-label u-link hover:text-text transition-colors">email</a>
            <a href="#" className="mono-label u-link hover:text-text transition-colors">back to top ↑</a>
          </div>
        </div>
        <p className="mono-label mt-4" style={{ fontSize: "0.6rem", opacity: 0.6 }}>
          code: all rights reserved · writing: CC BY-NC-ND 4.0
        </p>
      </div>
    </footer>
  );
}
