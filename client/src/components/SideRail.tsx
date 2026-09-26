import { useScrollSpy } from "@/lib/useScrollSpy";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "findings", label: "Findings" },
  { id: "signals", label: "Off the clock" },
  { id: "now", label: "Where I'm headed" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { label: "GH", href: "https://github.com/AlcesOzdst" },
  { label: "IN", href: "https://linkedin.com/in/parthdoshi404" },
  { label: "THM", href: "https://tryhackme.com/p/AlcesOzdst" },
  { label: "HTB", href: "https://profile.hackthebox.com/profile/019c59d7-edfc-7172-b666-bedfbe635e49" },
];

export function SideRail() {
  const active = useScrollSpy(["top", ...SECTIONS.map((s) => s.id)]);

  return (
    <aside className="hidden md:flex md:flex-col md:justify-between md:sticky md:top-0 md:h-screen md:py-10 md:pr-8">
      {/* identity */}
      <div>
        <a href="#top" className="block" data-cursor="top">
          <span className="display block text-2xl leading-none">Parth Doshi</span>
        </a>
        <p className="mono-label mt-3 leading-relaxed">
          Embedded &amp; security<br />ECE (AI–ML) · Pune, IN
        </p>
      </div>

      {/* index */}
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
              <span
                className="h-px transition-all duration-300"
                style={{ width: on ? 24 : 10, background: on ? "var(--c-accent)" : "var(--c-border-accent)" }}
              />
              <span className="group-hover:text-text transition-colors">{s.label}</span>
            </a>
          );
        })}
      </nav>

      {/* footer of rail */}
      <div>
        <p className="mono-label inline-flex items-center gap-2 mb-4">
          <span className="status-dot" aria-hidden="true" /> open · 2026–27
        </p>
        <div className="flex gap-4 mb-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              className="mono-label u-link hover:text-text transition-colors">{s.label}</a>
          ))}
        </div>
        <p className="mono-label" style={{ fontSize: "0.6rem", opacity: 0.6 }}>© {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
}
