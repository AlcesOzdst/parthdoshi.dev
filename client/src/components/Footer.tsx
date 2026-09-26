export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="page-container space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="mono-label">© {new Date().getFullYear()} Parth Doshi</span>
          <div className="flex gap-4">
            <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="mono-label link-underline hover:text-text transition-colors">github</a>
            <a href="https://linkedin.com/in/parthdoshi404" target="_blank" rel="noreferrer" className="mono-label link-underline hover:text-text transition-colors">linkedin</a>
            <a href="mailto:parthdoshi404@gmail.com" className="mono-label link-underline hover:text-text transition-colors">email</a>
          </div>
        </div>
        <p className="mono-label" style={{ fontSize: "0.625rem", opacity: 0.7 }}>
          code: all rights reserved · writing &amp; content: CC BY-NC-ND 4.0
        </p>
      </div>
    </footer>
  );
}
