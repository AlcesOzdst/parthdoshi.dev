import { Link } from "wouter";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { FileText } from "lucide-react";

const SECTIONS = [
  { id: "focus", label: "Focus" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "findings", label: "Findings" },
  { id: "achievements", label: "Achievements" },
  { id: "signals", label: "Off the clock" },
  { id: "now", label: "Where I'm headed" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { label: "GH", href: "https://github.com/AlcesOzdst" },
  { label: "IN", href: "https://linkedin.com/in/parthdoshi404" },
  { label: "CV", href: "/resume" },
  { label: "THM", href: "https://tryhackme.com/p/AlcesOzdst" },
];

export function SideRail({ onOpenResume }: { onOpenResume?: () => void }) {
  const active = useScrollSpy(["top", ...SECTIONS.map((s) => s.id)]);

  return (
    <aside className="hidden md:flex md:flex-col md:justify-between md:sticky md:top-0 md:h-screen md:py-10 md:pr-8">
      <div>
        <a href="#top" className="block" data-cursor="top">
          <span className="display block text-2xl leading-none">Parth Doshi</span>
        </a>
        <p className="mono-label mt-3 leading-relaxed">
          Embedded &amp; IoT security<br />— in training · Pune, IN
        </p>
      </div>

      <nav className="flex flex-col gap-3.5" aria-label="Sections">
        {SECTIONS.map((s, i) => {
          const on = active === s.id;
          return (
            <a key={s.id} href={`#${s.id}`}
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
              style={{ color: on ? "var(--c-text)" : "var(--c-text-secondary)" }}>
              <span className="rail-num" style={{ color: on ? "var(--c-accent)" : "var(--c-faint)" }}>
                0{i + 1}
              </span>
              <span className="h-px transition-all duration-300"
                style={{ width: on ? 24 : 10, background: on ? "var(--c-accent)" : "var(--c-border-accent)" }} />
              <span className="group-hover:text-text transition-colors">{s.label}</span>
            </a>
          );
        })}

        {/* Resume Viewer / Downloader Button */}
        {onOpenResume ? (
          <button
            onClick={onOpenResume}
            className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:text-text transition-colors cursor-pointer text-left pt-1"
            data-cursor="resume"
          >
            <span className="rail-num text-accent">↓</span>
            <span className="h-px bg-accent/60" style={{ width: 14 }} />
            <span className="font-semibold">Resume / CV</span>
          </button>
        ) : (
          <Link href="/resume">
            <a className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:text-text transition-colors cursor-pointer pt-1" data-cursor="resume">
              <span className="rail-num text-accent">↓</span>
              <span className="h-px bg-accent/60" style={{ width: 14 }} />
              <span className="font-semibold">Resume / CV</span>
            </a>
          </Link>
        )}

        <Link href="/blog">
          <a className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary hover:text-text transition-colors cursor-pointer" data-cursor="read">
            <span className="rail-num accent">↗</span>
            <span className="h-px bg-border-accent" style={{ width: 10 }} />
            <span>Writing</span>
          </a>
        </Link>
      </nav>

      <div>
        <p className="mono-label inline-flex items-center gap-2 mb-4">
          <span className="status-dot" aria-hidden="true" /> open · 2026–27
        </p>
        <div className="flex gap-4 mb-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target={s.label === "CV" ? undefined : "_blank"} rel="noreferrer"
              className="mono-label u-link hover:text-text transition-colors">{s.label}</a>
          ))}
        </div>
        <p className="mono-label" style={{ fontSize: "0.6rem", opacity: 0.6 }}>© {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
}
