import { useState } from "react";
import { Link } from "wouter";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, Shield, Cpu, Terminal, Award, ChevronRight, FileText, Globe } from "lucide-react";

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

const experiences: RoleItem[] = [
  {
    id: "president",
    role: "President",
    organization: "Hack-X, Cybersecurity Club - MIT World Peace University",
    location: "Pune, India",
    period: "Aug 2025 - Present",
    status: "Current",
    summary:
      "Leading the university cybersecurity community by organizing Capture The Flag (CTF) competitions, workshops, and technical events.",
    highlights: [
      "Lead the university cybersecurity community by organizing Capture The Flag (CTF) competitions, workshops, and technical events.",
      "Coordinate club operations, executive members, and technical initiatives promoting hands-on cybersecurity learning.",
      "Refocused club initiatives toward physical hardware security, embedded bus auditing, and offensive security labs.",
    ],
    tech: ["Cybersecurity Leadership", "CTF Architecture", "Hardware Security", "Embedded Systems", "Workshops"],
  },
  {
    id: "phn-intern",
    role: "Research & Development Intern",
    organization: "PHN Technology Pvt. Ltd.",
    location: "Pune, India",
    period: "Jan 2025 - May 2025",
    summary:
      "Contributed to the research and development of IoT, embedded systems, and cybersecurity-focused solutions using ESP32, Raspberry Pi, and hardware platforms.",
    highlights: [
      "Contributed to the research and development of IoT, embedded systems, and cybersecurity-focused solutions using ESP32, Raspberry Pi, and platforms.",
      "Performed vulnerability assessments and security testing for embedded and web-based applications using industry-standard security methodologies.",
      "Assisted in developing ESP32 and Raspberry Pi-based IoT security prototypes.",
      "Documented security findings, testing procedures, and mitigation recommendations for internal R&D projects.",
    ],
    tech: ["ESP32", "Raspberry Pi", "Vulnerability Assessment", "Embedded Security", "IoT R&D"],
  },
  {
    id: "hackerone",
    role: "Independent Security Research Projects",
    organization: "HackerOne Bug Bounty Platform",
    location: "Remote",
    period: "2024 - Present",
    summary:
      "Actively performing web application security assessments across public bug bounty programs on HackerOne.",
    highlights: [
      "Actively perform web application security assessments across public bug bounty programs on HackerOne.",
      "Practiced identification of Broken Access Control, IDOR, Authentication, GraphQL and API security issues.",
      "Documented testing methodology and findings to improve vulnerability assessment workflow.",
    ],
    tech: ["HackerOne", "Burp Suite Pro", "IDOR", "GraphQL", "Broken Access Control", "API Security"],
  },
  {
    id: "sterg",
    role: "Assistant Sponsorship Executive",
    organization: "STeRG, MIT World Peace University",
    location: "Pune, India",
    period: "Sep 2023 - Sep 2024",
    summary:
      "Managed sponsorship outreach and coordinated with industry partners to support technical events and student initiatives.",
    highlights: [
      "Managed sponsorship outreach and coordinated with industry partners to support technical events and student initiatives.",
      "Facilitated industry relationships to drive student participation in engineering hackathons and symposiums.",
    ],
    tech: ["Industry Sponsorship", "Partner Outreach", "Event Coordination", "Technical Operations"],
  },
];

export function Experience({ onOpenResume }: { onOpenResume?: () => void }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "security" | "embedded">("all");

  const filteredItems = experiences.filter((item) => {
    if (activeFilter === "security") return item.id === "president" || item.id === "hackerone";
    if (activeFilter === "embedded") return item.id === "phn-intern" || item.id === "president";
    return true;
  });

  return (
    <section id="experience" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="eyebrow mb-3">04 · Experience &amp; Leadership</h2>
              <p className="display text-3xl md:text-5xl leading-tight">
                Where I&rsquo;ve <span className="italic-accent">built &amp; led</span>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {onOpenResume ? (
                <button
                  onClick={onOpenResume}
                  className="btn !py-1.5 !px-3 font-mono text-xs inline-flex items-center gap-1.5 cursor-pointer text-accent border-accent/40 hover:border-accent"
                  data-cursor="resume"
                >
                  <FileText size={13} />
                  <span>Resume / CV ↗</span>
                </button>
              ) : (
                <Link
                  href="/resume"
                  className="btn !py-1.5 !px-3 font-mono text-xs inline-flex items-center gap-1.5 cursor-pointer text-accent border-accent/40 hover:border-accent"
                  data-cursor="resume"
                >
                  <FileText size={13} />
                  <span>Resume / CV ↗</span>
                </Link>
              )}
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
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
                activeFilter === "all" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
              }`}
            >
              All Roles ({experiences.length})
            </button>
            <button
              onClick={() => setActiveFilter("security")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
                activeFilter === "security" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
              }`}
            >
              Security Research
            </button>
            <button
              onClick={() => setActiveFilter("embedded")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-colors ${
                activeFilter === "embedded" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
              }`}
            >
              IoT &amp; Embedded
            </button>
          </div>
        </Reveal>

        {/* Timeline List */}
        <div className="relative border-l-2 border-border ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {filteredItems.map((item, i) => (
            <Reveal key={item.id} delay={0.08 + i * 0.07}>
              <div className="relative group">
                {/* Timeline node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    item.status === "Current"
                      ? "bg-accent border-accent shadow-[0_0_10px_var(--c-accent)]"
                      : "bg-bg border-border-accent group-hover:border-accent"
                  }`}
                />

                <div className="card p-6 md:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                        {item.role}
                      </h3>
                      {item.status && (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30 font-medium">
                          {item.status}
                        </span>
                      )}
                    </div>
                    <span className="mono-label font-medium">{item.period}</span>
                  </div>

                  <p className="mono-label text-accent mb-4 block">
                    {item.organization} &nbsp;·&nbsp; {item.location}
                  </p>

                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    {item.summary}
                  </p>

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
    </section>
  );
}
