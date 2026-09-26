import { useScrollReveal } from "@/lib/useScrollReveal";

const links = [
  { label: "email", href: "mailto:parthdoshi404@gmail.com", display: "parthdoshi404@gmail.com" },
  { label: "github", href: "https://github.com/AlcesOzdst", display: "AlcesOzdst", external: true },
  { label: "linkedin", href: "https://linkedin.com/in/parthdoshi404", display: "parthdoshi404", external: true },
  { label: "tryhackme", href: "https://tryhackme.com/p/AlcesOzdst", display: "AlcesOzdst", external: true },
];

export function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="section-spacing border-t" ref={ref}>
      <div className="page-container">
        <p className="eyebrow mb-2 reveal" data-delay="0">04 / contact</p>

        <p className="text-sm text-text-secondary mb-8 reveal flex items-center gap-2" data-delay="30">
          <span className="status-dot" aria-hidden="true" />
          open to embedded / IoT security internships · 2026–27
        </p>

        <div className="space-y-2.5 reveal" data-delay="60">
          {links.map((link) => (
            <div key={link.label} className="spec-row items-baseline">
              <span className="spec-key">{link.label}</span>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="text-text hover:text-accent transition-colors link-underline"
              >
                {link.display}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
