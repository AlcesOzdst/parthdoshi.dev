export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="page-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="mono-label">
          © {new Date().getFullYear()} Parth Doshi
        </span>
        <div className="flex gap-4">
          <a
            href="https://github.com/AlcesOzdst"
            target="_blank"
            rel="noreferrer"
            className="mono-label hover:text-text transition-colors link-underline"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/parthdoshi404"
            target="_blank"
            rel="noreferrer"
            className="mono-label hover:text-text transition-colors link-underline"
          >
            linkedin
          </a>
          <a
            href="mailto:parthdoshi404@gmail.com"
            className="mono-label hover:text-text transition-colors link-underline"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
