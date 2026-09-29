import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";

const projects = [
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
    href: "https://github.com/AlcesOzdst/DDoS_AssMnt",
  },
];

export function Projects() {
  return (
    <section id="work" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-12">
            <p className="eyebrow">02 — Selected work</p>
            <span className="mono-label hidden sm:inline">{projects.length} of them</span>
          </div>
        </Reveal>

        <div className="border-t border-border">
          {projects.map((p, i) => {
            const Wrapper: any = p.href ? "a" : "div";
            return (
              <Reveal key={p.number} delay={i * 0.06}>
                <Wrapper
                  {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer", "data-cursor": "view ↗" } : { "data-cursor": "build" })}
                  className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-x-5 md:gap-x-10 gap-y-2 items-baseline py-8 md:py-10 border-b border-border transition-colors duration-300 hover:bg-surface/30 rounded-sm -mx-4 px-4"
                >
                  <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors pt-2">
                    {p.number}
                  </span>

                  <div>
                    <h3 className="font-display font-bold tracking-[-0.02em] leading-[1.02] transition-transform duration-300 group-hover:translate-x-1"
                        style={{ fontSize: "clamp(1.7rem, 4.5vw, 3.2rem)" }}>
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
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
