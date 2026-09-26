import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, Shield, Cpu, Terminal, Award, ChevronRight } from "lucide-react";

interface RoleItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  status?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

const hackXTimeline: RoleItem[] = [
  {
    id: "president",
    role: "President",
    organization: "Hack-X Cybersecurity Club · MIT-WPU",
    location: "Pune, India",
    period: "Jul 2025 — Present",
    status: "Current",
    summary:
      "Directing a 60+ member student security collective. Refocused the club from surface-level web vulnerabilities to physical hardware security, embedded bus auditing, and binary exploitation.",
    highlights: [
      "Orchestrated campus-wide CTF competitions with bespoke hardware hacking & reverse engineering challenge tracks.",
      "Established technical syncs and hands-on workshop collaborations with DEFCON Pune and CyberVault Connect.",
      "Designed and lead weekly firmware teardown clinics: dumping SPI flash, tracing UART logic, and analyzing bootloaders.",
    ],
    tech: ["Hardware Security", "CTF Architecture", "Firmware RE", "Embedded Systems", "Leadership"],
  },
  {
    id: "tech-lead",
    role: "Technical Lead & Core Team",
    organization: "Hack-X Cybersecurity Club · MIT-WPU",
    location: "Pune, India",
    period: "Aug 2024 — Jun 2025",
    summary:
      "Engineered automated challenge infrastructure and led offensive/defensive training tracks for junior cohorts.",
    highlights: [
      "Authored original reverse engineering (x86/ARM binaries) and protocol analysis challenges for internal CTF qualifiers.",
      "Maintained containerized target sandboxes on local server clusters, simulating realistic multi-stage corporate network breaches.",
      "Conducted weekly live technical walk-throughs on GDB debugging, ELF binary structures, and wireless sniffing methodologies.",
    ],
    tech: ["GDB / Ghidra", "Docker Sandboxing", "Network Forensics", "x86/ARM Assembly", "Linux Internals"],
  },
  {
    id: "tech-member",
    role: "Technical Member",
    organization: "Hack-X Cybersecurity Club · MIT-WPU",
    location: "Pune, India",
    period: "Sep 2023 — Jul 2024",
    summary:
      "Earned placement via competitive CTF qualifiers. Supported hands-on workshop delivery and created reference writeups.",
    highlights: [
      "Built custom testbed setups using ESP32 and Raspberry Pi for IoT vulnerability demonstrations and packet capture analysis.",
      "Co-facilitated beginner workshops on Linux security foundations, Bash scripting, and port scanning with Nmap.",
      "Documented attack vectors and authored reference walkthroughs for past national competition challenges.",
    ],
    tech: ["ESP32 / RPi", "Wireshark", "Bash Scripting", "Nmap", "Linux Labs"],
  },
];

const internship: RoleItem = {
  id: "phn-intern",
  role: "Robotics & Innovation Intern",
  organization: "PHN Technology Pvt. Ltd.",
  location: "Pune, India",
  period: "Embedded & IoT R&D",
  summary:
    "Embedded systems R&D and hardware-software integration. Developed firmware routines across microcontroller architectures (ESP32, STM32, Arduino) interfacing analog sensors and hardware buses.",
  highlights: [
    "Programmed register-level and HAL firmware to interface sensor suites over UART, SPI, and I²C communication buses.",
    "Engineered serial telemetry logging scripts to stream real-time sensor packets for hardware-in-the-loop diagnostic testing.",
    "Validated prototype power draw and timing tolerances, eliminating serial communication jitter on edge test rigs.",
  ],
  tech: ["ESP32 / STM32", "Embedded C / C++", "UART / SPI / I²C", "Telemetry Pipelines", "Hardware Debugging"],
};

export function Experience() {
  const [activeTab, setActiveTab] = useState<"all" | "hackx" | "internship">("all");

  return (
    <section id="experience" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-3">03 — Experience &amp; Leadership</p>
              <h2 className="display text-3xl md:text-5xl leading-tight">
                Where I&rsquo;ve <span className="italic-accent">built &amp; led</span>.
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://linkedin.com/in/parthdoshi404"
                target="_blank"
                rel="noreferrer"
                className="mono-label u-link hover:text-text transition-colors inline-flex items-center gap-1.5"
                data-cursor="linkedin"
              >
                linkedin.com/in/parthdoshi404 <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Tab filters */}
        <Reveal delay={0.05}>
          <div className="flex gap-2 p-1 bg-surface border border-border rounded-lg inline-flex mb-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
                activeTab === "all" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
              }`}
            >
              All Timeline
            </button>
            <button
              onClick={() => setActiveTab("hackx")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
                activeTab === "hackx" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
              }`}
            >
              Hack-X Progression
            </button>
            <button
              onClick={() => setActiveTab("internship")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
                activeTab === "internship" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
              }`}
            >
              Industry R&amp;D
            </button>
          </div>
        </Reveal>

        <div className="space-y-12">
          {/* Hack-X Progression Section */}
          {(activeTab === "all" || activeTab === "hackx") && (
            <div>
              <Reveal delay={0.08}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded border border-border bg-surface flex items-center justify-center text-accent">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium">Hack-X Cybersecurity Club</h3>
                    <p className="mono-label">Campus Security Collective · From Tech Member to President</p>
                  </div>
                </div>
              </Reveal>

              <div className="relative border-l-2 border-border ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
                {hackXTimeline.map((item, i) => (
                  <Reveal key={item.id} delay={0.1 + i * 0.08}>
                    <div className="relative group">
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                          item.status === "Current"
                            ? "bg-accent border-accent shadow-[0_0_10px_var(--c-accent)]"
                            : "bg-bg border-border-accent group-hover:border-accent"
                        }`}
                      />

                      <div className="card p-6 md:p-7">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                              {item.role}
                            </h4>
                            {item.status && (
                              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30 font-medium">
                                {item.status}
                              </span>
                            )}
                          </div>
                          <span className="mono-label font-medium">{item.period}</span>
                        </div>

                        <p className="mono-label text-accent mb-4 block">{item.organization}</p>
                        <p className="text-sm text-text-secondary leading-relaxed mb-5">{item.summary}</p>

                        <div className="space-y-2 mb-6">
                          {item.highlights.map((h, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                              <span className="text-accent mt-1 select-none">▸</span>
                              <span className="leading-relaxed">{h}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface border border-border text-text-secondary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Internship Experience */}
          {(activeTab === "all" || activeTab === "internship") && (
            <div>
              <Reveal delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded border border-border bg-surface flex items-center justify-center text-accent">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium">Industry Engineering</h3>
                    <p className="mono-label">Robotics, Microcontrollers &amp; Hardware Telemetry</p>
                  </div>
                </div>
              </Reveal>

              <div className="relative border-l-2 border-border ml-4 sm:ml-6 pl-6 sm:pl-8">
                <Reveal delay={0.12}>
                  <div className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-bg border-border-accent group-hover:border-accent transition-transform duration-300 group-hover:scale-125" />

                    <div className="card p-6 md:p-7">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                            {internship.role}
                          </h4>
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface border border-border text-text-secondary">
                            R&amp;D Intern
                          </span>
                        </div>
                        <span className="mono-label font-medium">{internship.period}</span>
                      </div>

                      <p className="mono-label text-accent mb-4 block">{internship.organization} · {internship.location}</p>
                      <p className="text-sm text-text-secondary leading-relaxed mb-5">{internship.summary}</p>

                      <div className="space-y-2 mb-6">
                        {internship.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                            <span className="text-accent mt-1 select-none">▸</span>
                            <span className="leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        {internship.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface border border-border text-text-secondary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
