import { useScrollReveal } from "@/lib/useScrollReveal";

const projects = [
  {
    number: "004",
    title: "GNSS receiver build",
    line: "Custom GPS receiver parsing live satellite data from a Quectel L89 module.",
    detail: "NMEA 0183 sentence parser over UART via a CP2102 bridge. Sub-3m accuracy, logging GPX tracks around Pune.",
    stack: "Python · UART · CP2102",
  },
  {
    number: "005",
    title: "Multi-sensor embedded firmware",
    line: "Bare-metal firmware for a C8051F340 driving four sensor peripherals on one 8-bit bus.",
    detail: "Register-level drivers for an SSD1306 OLED, DHT11, HC-SR04 and PIR, with a real-time dashboard on-device.",
    stack: "C · I²C · SPI · GPIO",
  },
  {
    number: "006",
    title: "SkillBridge",
    line: "Peer-to-peer skill-exchange platform — barter knowledge instead of paying for courses.",
    detail: "Full-stack matchmaking with session scheduling, profiles and reviews. Solo-built.",
    stack: "Node.js · MySQL · Express",
    github: "https://github.com/AlcesOzdst/SkillBridge",
  },
  {
    number: "007",
    title: "DDoS traffic classification",
    line: "ML pipeline that classifies DDoS attack patterns from raw packet captures.",
    detail: "tshark → statistical flow features → labelled by vector (SYN flood, UDP amp, slowloris) → classifier + mitigation report.",
    stack: "Python · tshark · scikit-learn",
    github: "https://github.com/AlcesOzdst/DDoS_AssMnt",
  },
];

export function Projects() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="section-spacing border-t" ref={ref}>
      <div className="page-container">
        <p className="eyebrow mb-2 reveal" data-delay="0">02 / work</p>
        <p className="text-sm text-text-secondary mb-10 reveal" data-delay="30">
          Things I've built, wired up, or trained.
        </p>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <div key={p.number} className="entry reveal" data-delay={String(60 + i * 70)}>
              <span className="mono-label block mb-1.5" style={{ color: "var(--c-accent)" }}>
                {p.number}
              </span>
              <h3 className="font-display font-semibold text-[1.05rem] mb-1 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-1">{p.line}</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-2.5 opacity-75">{p.detail}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="mono-label" style={{ fontSize: "0.65rem" }}>{p.stack}</span>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mono-label link-underline"
                    style={{ fontSize: "0.65rem", color: "var(--c-text)" }}
                  >
                    ↗ github
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
