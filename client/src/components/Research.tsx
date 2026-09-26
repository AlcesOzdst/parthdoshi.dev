import { useScrollReveal } from "@/lib/useScrollReveal";

const findings = [
  {
    number: "001",
    title: "CORS misconfiguration & exposed admin panel",
    program: "Under Armour",
    description:
      "Found a permissive CORS policy paired with an unauthenticated admin panel. Cross-origin credential theft → full account takeover on internal endpoints.",
    tags: "cors · access control",
  },
  {
    number: "002",
    title: "GraphQL introspection-based recon",
    program: "Whatnot · HackerOne",
    description:
      "Exposed introspection endpoint mapped the entire internal API schema — undocumented mutations, sensitive fields, the works.",
    tags: "graphql · info disclosure",
  },
  {
    number: "003",
    title: "Smart contract audit & CTF exploitation",
    program: "The Graph Protocol · Immunefi",
    description:
      "Reentrancy and access-control issues in production contracts. Separately broke an HTB CTF via abi.encodePacked hash collisions to bypass on-chain signature verification.",
    tags: "solidity · reentrancy · hash collision",
  },
];

export function Research() {
  const ref = useScrollReveal();

  return (
    <section id="research" className="section-spacing" ref={ref}>
      <div className="page-container">
        <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mb-2 reveal" data-delay="0">
          Research
        </h2>
        <p className="text-sm text-text-secondary mb-10 reveal" data-delay="30">
          Bugs reported, patterns documented.
        </p>

        <div className="space-y-8">
          {findings.map((f, i) => (
            <div
              key={f.number}
              className="entry entry-coral reveal"
              data-delay={String(60 + i * 80)}
            >
              {/* Number + program */}
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="mono-label" style={{ color: "var(--c-coral)" }}>
                  {f.number}
                </span>
                <span className="mono-label opacity-60">
                  {f.program}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif font-semibold text-base mb-1.5 leading-snug" style={{ fontVariationSettings: "'WONK' 1, 'opsz' 24" }}>
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-2">
                {f.description}
              </p>

              {/* Tags */}
              <span className="mono-label text-[10px] opacity-50">
                {f.tags}
              </span>
            </div>
          ))}
        </div>

        {/* HackerOne link */}
        <div className="mt-10 reveal" data-delay={String(60 + findings.length * 80 + 60)}>
          <a
            href="https://tryhackme.com/p/AlcesOzdst"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-text-secondary hover:text-text transition-colors link-underline"
          >
            TryHackMe profile ↗
          </a>
        </div>
      </div>
    </section>
  );
}
