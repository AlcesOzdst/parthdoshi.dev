import { Reveal } from "@/components/Reveal";

const findings = [
  {
    number: "001",
    title: "CORS misconfiguration → account takeover",
    program: "Under Armour",
    description: "A permissive CORS policy paired with an unauthenticated admin panel — cross-origin credential theft leading to takeover on internal endpoints.",
    tags: "cors · access-control",
  },
  {
    number: "002",
    title: "GraphQL introspection-based recon",
    program: "Whatnot · HackerOne",
    description: "An exposed introspection endpoint mapped the entire internal API schema — undocumented mutations, sensitive fields, the works.",
    tags: "graphql · info-disclosure",
  },
  {
    number: "003",
    title: "Smart-contract audit & CTF exploitation",
    program: "The Graph · Immunefi",
    description: "Reentrancy and access-control issues in production contracts; separately broke an HTB CTF via abi.encodePacked hash collisions to bypass on-chain signature checks.",
    tags: "solidity · reentrancy · hash-collision",
  },
];

export function Research() {
  return (
    <section id="findings" className="section-spacing border-t border-border">
      <div>
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-10">
            <p className="eyebrow">02 — Findings</p>
            <a href="https://tryhackme.com/p/AlcesOzdst" target="_blank" rel="noreferrer" className="mono-label u-link hover:text-text transition-colors">
              tryhackme ↗
            </a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-sm overflow-hidden">
          {findings.map((f, i) => (
            <Reveal key={f.number} delay={i * 0.08}>
              <div className="h-full bg-bg p-6 md:p-7 transition-colors duration-300 hover:bg-surface/50 group">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-mono text-xs accent">{f.number}</span>
                  <span className="mono-label">{f.program}</span>
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug mb-3 group-hover:text-accent transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">{f.description}</p>
                <span className="mono-label" style={{ fontSize: "0.6rem" }}>{f.tags}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
