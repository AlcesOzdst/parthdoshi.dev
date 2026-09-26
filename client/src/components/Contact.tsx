import { useScrollReveal } from "@/lib/useScrollReveal";

const links = [
  {
    label: "email",
    href: "mailto:parthdoshi404@gmail.com",
    display: "parthdoshi404@gmail.com",
  },
  {
    label: "github",
    href: "https://github.com/AlcesOzdst",
    display: "AlcesOzdst",
    external: true,
  },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/parthdoshi404",
    display: "parthdoshi404",
    external: true,
  },
];

export function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="section-spacing" ref={ref}>
      <div className="page-container">
        <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mb-2 reveal" data-delay="0">
          Contact
        </h2>

        <p className="text-sm text-text-secondary mb-8 reveal" data-delay="30">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 relative top-[-1px]"
            style={{ backgroundColor: "var(--c-amber)" }}
            aria-hidden="true"
          />
          president, Hack-X · MIT-WPU
        </p>

        <div className="space-y-3 reveal" data-delay="60">
          {links.map((link) => (
            <div key={link.label} className="flex items-baseline gap-4">
              <span className="mono-label w-12 flex-shrink-0">
                {link.label}
              </span>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="text-sm text-text hover:text-text-secondary transition-colors link-underline"
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
