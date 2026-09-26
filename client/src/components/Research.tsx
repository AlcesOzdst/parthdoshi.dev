import { useScrollReveal } from "@/lib/useScrollReveal";

const findings = [
  {
    number: "001",
    title: "CORS misconfiguration & exposed admin panel",
    program: "Under Armour",
    description:
      "A permissive CORS policy paired with an unauthenticated admin panel — cross-origin credential theft leading to account takeover on internal endpoints.",
    tags: "cors · access-control",
  },
  {
    number: "002",
    title: "GraphQL introspection-based recon",
    program: "Whatnot · HackerOne",
    description:
      "An exposed introspection endpoint mapped the entire internal API schema — undocumented mutations, sensitive fields, the works.",
    tags: "graphql · info-disclosure",
  },
  {
    number: "003",
    title: "Smart-contract audit & CTF exploitation",
    program: "The Graph · Immunefi",
    description:
      "Reentrancy and access-control issues in production contracts. Separately broke an HTB CTF via abi.encodePacked hash collisions to bypass on-chain signature verification.",
    tags: "solidity · reentrancy · hash-collision",
  },
];

export function Research() {
  const ref = useScrollReveal();

  return (
    <section id="research" className="section-spacing border-t" ref={ref}>
      <div className="page-container">
        <p className="eyebrow mb-2 reveal" data-delay="0">01 / findings</p>
        <p className="text-sm text-text-secondary mb-10 reveal" data-delay="30">
          Bugs reported, patterns documented.
        </p>

        <div className="space-y-8">
          {findings.map((f, i) => (
            <div key={f.number} className="entry reveal" data-delay={String(60 + i * 70)}>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="mono-label" style={{ color: "var(--c-accent)" }}>{f.number}</span>
                <span className="mono-label">{f.program}</span>
              </div>
              <h3 className="font-display font-semibold text-[1.05rem] mb-1.5 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">
                {f.description}
              </p>
              <span className="mono-label" style={{ fontSize: "0.65rem" }}>{f.tags}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 reveal" data-delay={String(60 + findings.length * 70 + 40)}>
          <a
            href="https://tryhackme.com/p/AlcesOzdst"
            target="_blank"
            rel="noreferrer"
            className="bracket-link"
          >
            tryhackme profile
          </a>
        </div>
      </div>
    </section>
  );
}
