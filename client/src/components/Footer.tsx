import { Link } from "wouter";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border pt-14 pb-12 overflow-hidden bg-surface/10">
      <div className="shell">
        <div
          className="display tracking-[-0.02em] leading-none text-text/90 select-none mb-10"
          style={{ fontSize: "clamp(1.8rem, 6vw, 3.5rem)" }}
          aria-hidden="true"
        >
          Parth Doshi<span className="accent">.</span>
        </div>

        {/* Compact site directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-border/80 text-xs">
          <div>
            <span className="mono-label uppercase tracking-[0.14em] text-accent block mb-3 font-semibold">
              Core Pages
            </span>
            <ul className="space-y-1 text-text-secondary font-mono">
              <li><Link href="/" className="hover:text-text transition-colors py-1 inline-block">Home (/)</Link></li>
              <li><Link href="/resume" className="hover:text-text transition-colors py-1 inline-block">Resume &amp; CV (/resume)</Link></li>
              <li><Link href="/blog" className="hover:text-text transition-colors py-1 inline-block">The Log (/blog)</Link></li>
              <li><a href="/Parth_Doshi_Resume.pdf" download="Parth_Doshi_Resume.pdf" className="hover:text-text transition-colors py-1 inline-block">Resume PDF (Direct)</a></li>
            </ul>
          </div>

          <div>
            <span className="mono-label uppercase tracking-[0.14em] text-accent block mb-3 font-semibold">
              Selected Work
            </span>
            <ul className="space-y-1 text-text-secondary font-mono">
              <li><Link href="/projects/ddos-toolkit" className="hover:text-text transition-colors py-1 inline-block">DDoS Simulation Toolkit</Link></li>
              <li><Link href="/projects/project-omnis" className="hover:text-text transition-colors py-1 inline-block">Project Omnis (AI Threat)</Link></li>
              <li><Link href="/projects/suricata-ids" className="hover:text-text transition-colors py-1 inline-block">Suricata IDS (ARM Pi 5)</Link></li>
            </ul>
          </div>

          <div>
            <span className="mono-label uppercase tracking-[0.14em] text-accent block mb-3 font-semibold">
              Hardware Labs
            </span>
            <ul className="space-y-1 text-text-secondary font-mono">
              <li><Link href="/projects/thermal-response" className="hover:text-text transition-colors py-1 inline-block">Thermal Response Array</Link></li>
              <li><Link href="/projects/home-automation" className="hover:text-text transition-colors py-1 inline-block">IoT Home Automation</Link></li>
              <li><Link href="/projects/noise-indicator" className="hover:text-text transition-colors py-1 inline-block">Acoustic Noise Indicator</Link></li>
            </ul>
          </div>

          <div>
            <span className="mono-label uppercase tracking-[0.14em] text-accent block mb-3 font-semibold">
              Profiles &amp; Disambiguation
            </span>
            <ul className="space-y-1 text-text-secondary font-mono">
              <li><a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="hover:text-text transition-colors py-1 inline-block">GitHub (@AlcesOzdst)</a></li>
              <li><a href="https://linkedin.com/in/parthdoshi404" target="_blank" rel="noreferrer" className="hover:text-text transition-colors py-1 inline-block">LinkedIn (/in/parthdoshi404)</a></li>
              <li><a href="https://profile.hackthebox.com/profile/019c59d7-edfc-7172-b666-bedfbe635e49" target="_blank" rel="noreferrer" className="hover:text-text transition-colors py-1 inline-block">Hack The Box</a></li>
              <li><a href="https://g.dev/Alcesozdst" target="_blank" rel="noreferrer" className="hover:text-text transition-colors py-1 inline-block">Google Developer (g.dev)</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <span className="mono-label">© {year} Parth Doshi · Pune, India</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="mailto:parthdoshi404@gmail.com" className="mono-label u-link hover:text-text transition-colors py-1 inline-block">email: parthdoshi404@gmail.com</a>
            <a href="/feed.xml" className="mono-label u-link hover:text-text transition-colors py-1 inline-block">rss feed</a>
            <a href="/llms.txt" className="mono-label u-link hover:text-text transition-colors py-1 inline-block">llms.txt</a>
            <a href="#" className="mono-label u-link hover:text-text transition-colors py-1 inline-block">back to top ↑</a>
          </div>
        </div>
        <p className="mono-label mt-4" style={{ fontSize: "0.6rem", opacity: 0.6 }}>
          code: all rights reserved · writing: CC BY-NC-ND 4.0
        </p>
      </div>
    </footer>
  );
}
