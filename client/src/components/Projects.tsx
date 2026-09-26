import { useScrollReveal } from "@/lib/useScrollReveal";

const projects = [
  {
    number: "004",
    title: "SkillBridge",
    accent: "amber" as const,
    line: "Peer-to-peer skill exchange platform. Users barter knowledge instead of paying for courses.",
    detail: "Full-stack matchmaking with session scheduling, profiles, and reviews. Solo-built from scratch.",
    stack: "Node.js · MySQL · Express",
    github: "https://github.com/AlcesOzdst",
  },
  {
    number: "005",
    title: "GNSS receiver build",
    accent: "pink" as const,
    line: "Custom GPS receiver parsing live satellite data from a Quectel L89 module.",
    detail: "NMEA 0183 sentence parser over UART via CP2102 bridge. Sub-3m accuracy, GPX tracks around Pune.",
    stack: "Python · UART · CP2102",
  },
  {
    number: "006",
    title: "Multi-sensor embedded firmware",
    accent: "amber" as const,
    line: "Bare-metal firmware for a C8051F340 driving four sensor peripherals on a single 8-bit bus.",
    detail: "Register-level drivers for SSD1306 OLED, DHT11, HC-SR04, and PIR. Real-time dashboard on-device.",
    stack: "C · I²C · SPI · GPIO",
  },
  {
    number: "007",
    title: "DDoS traffic classification",
    accent: "pink" as const,
    line: "ML pipeline that classifies DDoS attack patterns from raw packet captures.",
    detail: "tshark → statistical flow features → labeled by vector (SYN flood, UDP amp, slowloris) → classifier + mitigation report.",
    stack: "Python · tshark · scikit-learn",
    github: "https://github.com/AlcesOzdst",
  },
];

const accentClass = {
  amber: "entry-amber",
  pink: "entry-pink",
};

export function Projects() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="section-spacing" ref={ref}>
      <div className="page-container">
        <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mb-2 reveal" data-delay="0">
          Projects
        </h2>
        <p className="text-sm text-text-secondary mb-10 reveal" data-delay="30">
          Things I've built, wired up, or trained.
        </p>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <div
              key={p.number}
              className={`entry ${accentClass[p.accent]} reveal`}
              data-delay={String(60 + i * 80)}
            >
              {/* Number */}
              <span className="mono-label block mb-1.5" style={{ color: p.accent === "amber" ? "var(--c-amber)" : "var(--c-pink)" }}>
                {p.number}
              </span>

              {/* Title */}
              <h3 className="font-serif font-semibold text-base mb-1 leading-snug" style={{ fontVariationSettings: "'WONK' 1, 'opsz' 24" }}>
                {p.title}
              </h3>

              {/* One-liner */}
              <p className="text-sm text-text-secondary leading-relaxed mb-1">
                {p.line}
              </p>

              {/* Detail */}
              <p className="text-sm text-text-secondary leading-relaxed mb-2 opacity-75">
                {p.detail}
              </p>

              {/* Stack + link */}
              <div className="flex flex-wrap items-center gap-x-3">
                <span className="mono-label text-[10px] opacity-50">
                  {p.stack}
                </span>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mono-label text-[10px] hover:text-text transition-colors link-underline"
                  >
                    github ↗
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
