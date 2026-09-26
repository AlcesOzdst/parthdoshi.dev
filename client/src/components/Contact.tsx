import { Reveal } from "@/components/Reveal";

const socials = [
  { label: "github", href: "https://github.com/AlcesOzdst" },
  { label: "linkedin", href: "https://linkedin.com/in/parthdoshi404" },
  { label: "tryhackme", href: "https://tryhackme.com/p/AlcesOzdst" },
];

export function Contact() {
  return (
    <section id="contact" className="section-spacing border-t border-border relative overflow-hidden">
      <div className="glow" style={{ width: 520, height: 520, bottom: -220, left: -120 }} />
      <div className="relative z-10">
        <Reveal><p className="eyebrow mb-8">05 — Contact</p></Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] mb-10"
              style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}>
            Let&rsquo;s build something<br />
            that <span className="accent">doesn&rsquo;t break.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-text-secondary max-w-[48ch] mb-10 leading-relaxed">
            <span className="inline-flex items-center gap-2 mr-2"><span className="status-dot" aria-hidden="true" /></span>
            Looking for embedded / IoT / firmware security internships (2026–27). If that&rsquo;s
            your team, I&rsquo;d like to talk.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a href="mailto:parthdoshi404@gmail.com"
             data-cursor="copy ↗"
             className="inline-block display tracking-[-0.01em] u-link"
             style={{ fontSize: "clamp(1.05rem, 3vw, 1.7rem)" }}>
            parthdoshi404@gmail.com
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                 className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary hover:text-text transition-colors u-link">
                {s.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
