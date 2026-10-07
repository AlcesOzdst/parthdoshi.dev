import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const featuredProjects = [
  {
    number: "01",
    title: "ESP32 Marauder Custom Firmware",
    desc: "Customized ESP32 Marauder firmware for wireless security experimentation - integrated NRF24L01 transceivers, custom OLED UI, and menu navigation over SPI, I²C, and 2.4GHz RF communication.",
    tags: ["ESP32", "PlatformIO", "Embedded C++", "NRF24L01"],
  },
  {
    number: "02",
    title: "Responsible Disclosure: ERP IDOR",
    desc: "Discovered and reported an Insecure Direct Object Reference (IDOR) flaw in university ERP portal by manipulating PRN parameter tokens - demonstrated unauthorized student record access, mapped severity via CVSS v3.1, and prepared remediation report.",
    tags: ["Burp Suite", "Web Security", "CVSS v3.1", "IDOR"],
  },
  {
    number: "03",
    title: "C8051 Bare-Metal Sensor Hub",
    desc: "Bare-metal firmware for a Silicon Labs C8051F340 driving four peripherals on one 8-bit bus - hand-written register-level drivers for an SSD1306 OLED, DHT11, HC-SR04, and PIR sensor.",
    tags: ["Bare-Metal C", "C8051F340", "I²C", "SPI", "GPIO"],
  },
  {
    number: "04",
    title: "DDoS Traffic Classification",
    desc: "An ML pipeline that classifies attack patterns from raw packet captures: tshark → statistical flow features → labelled by vector → classifier + mitigation report.",
    tags: ["Python", "tshark", "scikit-learn"],
    href: "/projects/ddos-toolkit",
    isInternal: true,
  },
];

const labWriteups = [
  {
    slug: "project-omnis",
    title: "Project Omnis: AI Threat Prediction",
    desc: "Isolation Forests and autoencoders identifying anomalous access patterns in server logs (94% true positive rate, SIH 2025 finalist).",
    tags: ["AI", "SIEM", "Python"],
  },
  {
    slug: "suricata-ids",
    title: "Suricata IDS Deployment on ARM",
    desc: "Raspberry Pi 5 edge intrusion detection node with custom signature rules tuned for homelab inspection.",
    tags: ["Suricata", "ARM", "Raspberry Pi"],
  },
  {
    slug: "noise-indicator",
    title: "Acoustic Noise Level Indicator",
    desc: "Analog circuit using electret mic, op-amp amplifier, and voltage comparators to drive a 5-band LED volume meter.",
    tags: ["Analog Circuits", "Multisim", "Hardware"],
  },
];

export function Projects() {
  return (
    <section id="work" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-12">
            <h2 className="eyebrow">02 · Selected work</h2>
            <span className="mono-label hidden sm:inline">{featuredProjects.length + labWriteups.length} total builds</span>
          </div>
        </Reveal>

        <div className="border-t border-border">
          {featuredProjects.map((p, i) => {
            const content = (
              <div
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-x-5 md:gap-x-10 gap-y-2 items-baseline py-8 md:py-10 border-b border-border transition-colors duration-300 hover:bg-surface/30 rounded-sm -mx-4 px-4 cursor-pointer"
                data-cursor={p.href ? "view ↗" : "build"}
              >
                <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors pt-2">
                  {p.number}
                </span>

                <div>
                  <h3
                    className="font-display font-bold tracking-[-0.02em] leading-[1.02] transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontSize: "clamp(1.7rem, 4.5vw, 3.2rem)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.95rem] text-text-secondary leading-relaxed max-w-[60ch]">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[0.65rem] uppercase tracking-wider text-text-secondary border border-border rounded-full px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="hidden md:flex items-center self-center text-text-secondary group-hover:text-accent transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  {p.href ? <ArrowUpRight size={26} /> : <span className="mono-label">build</span>}
                </span>
              </div>
            );

            return (
              <Reveal key={p.number} delay={i * 0.05}>
                {p.href && p.isInternal ? (
                  <Link href={p.href}>
                    {content}
                  </Link>
                ) : p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>

        {/* Additional project writeups & lab experiments */}
        <div className="mt-14 pt-8">
          <Reveal>
            <h3 className="mono-label uppercase tracking-[0.16em] text-accent mb-6">
              Research writeups &amp; lab experiments
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {labWriteups.map((w, idx) => (
              <Reveal key={w.slug} delay={idx * 0.04}>
                <Link
                  href={`/projects/${w.slug}`}
                  className="group block p-5 rounded border border-border bg-surface/30 hover:bg-surface/60 hover:border-accent/40 transition-all duration-200 h-full"
                  data-cursor="open ↗"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-display text-lg text-text group-hover:text-accent transition-colors font-semibold">
                      {w.title}
                    </h4>
                    <ArrowUpRight size={16} className="text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {w.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {w.tags.map((t) => (
                      <span key={t} className="font-mono text-[0.6rem] text-text-secondary border border-border/80 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
