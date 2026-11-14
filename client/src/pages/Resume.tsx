import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Download, Eye, FileText, ArrowUpRight } from "lucide-react";

export default function Resume() {
  const [viewPdfPreview, setViewPdfPreview] = useState(false);

  useEffect(() => {
    // Check screen width on mount
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setViewPdfPreview(true);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Header and Toggle Controls */}
      <div className="max-w-4xl mx-auto pt-24 sm:pt-28 pb-6 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border mb-8">
        <div>
          <span className="mono-label uppercase tracking-[0.16em] text-accent block mb-1">
            Curriculum Vitae
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Parth Doshi
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewPdfPreview(!viewPdfPreview)}
            className="btn py-2 px-3.5 text-xs flex items-center gap-2"
          >
            {viewPdfPreview ? (
              <>
                <FileText size={13} />
                <span>Web Version</span>
              </>
            ) : (
              <>
                <Eye size={13} />
                <span>PDF Preview</span>
              </>
            )}
          </button>

          <a
            href="/Parth_Doshi_Resume.pdf"
            download="Parth_Doshi_Resume.pdf"
            className="btn btn-solid py-2 px-3.5 text-xs flex items-center gap-2"
          >
            <Download size={13} />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>

      {/* Main Resume Sheet */}
      {viewPdfPreview ? (
        <div className="max-w-4xl mx-auto h-[900px] rounded-xl overflow-hidden border border-border bg-black shadow-lg">
          <iframe
            src="/Parth_Doshi_Resume.pdf#toolbar=0"
            title="Parth Doshi Resume PDF"
            className="w-full h-full border-0"
          />
        </div>
      ) : (
        <main
          id="resume-document"
          className="max-w-4xl mx-auto bg-surface/30 border border-border p-8 sm:p-14 rounded-xl shadow-lg space-y-6 font-sans text-xs leading-normal"
        >
          {/* Header */}
          <div className="text-center pb-4 border-b border-border">
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider font-semibold uppercase mb-1">
              Parth Doshi
            </h2>
            <p className="text-xs text-text-secondary mb-2">
              Pune, Maharashtra &nbsp;·&nbsp;{" "}
              <a href="mailto:parth@alcesozdst.com" className="hover:text-accent underline">
                parth@alcesozdst.com
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-accent">
              <a href="https://linkedin.com/in/parthdoshi404" target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
              <span className="text-text-secondary">|</span>
              <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
              <span className="text-text-secondary">|</span>
              <a href="https://www.parthdoshi.me" target="_blank" rel="noreferrer" className="hover:underline">
                Portfolio
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
              Professional Summary
            </h2>
            <p className="text-text-secondary text-xs leading-relaxed text-justify">
              Cybersecurity student with hands-on experience in web application security, responsible vulnerability disclosure, embedded security research, and Linux-based environments. Developed practical skills through HackerOne, Hack The Box, TryHackMe, and self-hosted security labs. Experience includes hardware interfaces, network analysis, vulnerability assessment, embedded device testing, ESP32-based systems, IoT devices, and hardware-software integration, with an emphasis on Hardware Security.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline font-medium text-text">
              <span className="font-semibold">MIT World Peace University (MIT-WPU)</span>
              <span className="text-text-secondary">Pune, India</span>
            </div>
            <div className="flex justify-between items-baseline italic text-text-secondary text-[11px]">
              <span>B.Tech in Electronics &amp; Communication Engineering (ECE), AI/ML Specialization</span>
              <span>Expected Graduation: May 2028</span>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-3">
              Experience
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline font-semibold text-text">
                  <span className="text-sm">Research &amp; Development | Internship</span>
                  <span className="font-normal font-mono text-[11px] text-text-secondary">Jan 2025 – May 2025</span>
                </div>
                <div className="flex justify-between items-baseline italic text-text-secondary text-[11px] mb-1.5">
                  <span>PHN Technology Pvt. Ltd.</span>
                  <span>On-site · Pune, India</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs">
                  <li>Contributed to the research and development of IoT, embedded systems, and cybersecurity-focused solutions using ESP32, Raspberry Pi, and associated development platforms.</li>
                  <li>Performed vulnerability assessments and security testing for embedded and web-based applications using industry-standard security methodologies.</li>
                  <li>Assisted in developing ESP32- and Raspberry Pi-based IoT security prototypes.</li>
                  <li>Documented security findings, testing procedures, and mitigation recommendations for internal R&amp;D projects.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline font-semibold text-text">
                  <span className="text-sm">Independent Security Research Projects</span>
                  <span className="font-normal font-mono text-[11px] text-text-secondary">2024 – Present</span>
                </div>
                <div className="flex justify-between items-baseline italic text-text-secondary text-[11px] mb-1.5">
                  <span>HackerOne Bug Bounty Platform</span>
                  <span>Remote</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs">
                  <li>Perform web application security assessments across public bug bounty programs on HackerOne.</li>
                  <li>Practice identifying Broken Access Control, IDOR, authentication, GraphQL, and API security issues.</li>
                  <li>Document testing methodologies and findings to improve vulnerability assessment workflows.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline font-semibold text-text">
                  <span className="text-sm">President</span>
                  <span className="font-normal font-mono text-[11px] text-accent">Aug 2025 – Present</span>
                </div>
                <div className="flex justify-between items-baseline italic text-text-secondary text-[11px] mb-1.5">
                  <span>Hack-X, Cybersecurity Club – MIT World Peace University</span>
                  <span>Pune, India</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs">
                  <li>Lead the university cybersecurity community by organizing Capture The Flag (CTF) competitions, workshops, and technical events.</li>
                  <li>Coordinate club operations, executive members, and technical initiatives promoting hands-on cybersecurity learning.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Community & Industry Engagement */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-3">
              Community &amp; Industry Engagement
            </h2>
            <div>
              <div className="flex justify-between items-baseline font-semibold text-text">
                <span className="text-sm">Arsenal Volunteer</span>
                <span className="font-normal font-mono text-[11px] text-text-secondary">October 2026</span>
              </div>
              <div className="flex justify-between items-baseline italic text-text-secondary text-[11px] mb-1.5">
                <span>
                  Black Hat India 2026 – Informa Markets{" "}
                  <a href="https://www.linkedin.com/in/parthdoshi404/details/volunteering-experiences" target="_blank" rel="noreferrer" className="text-accent underline inline-flex items-center gap-0.5">
                    (Certificate) <ArrowUpRight size={10} />
                  </a>
                </span>
                <span>Bengaluru, India</span>
              </div>
              <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs">
                <li>Supported on-ground Arsenal operations and coordination, collaborating with the organizing team and fellow volunteers.</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-3">
              Projects
            </h2>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-text">
                    Responsible Disclosure – IDOR in University ERP Portal{" "}
                    <span className="font-normal italic text-text-secondary">| Burp Suite, Access Control Testing</span>
                  </span>
                  <span className="font-mono text-[11px] text-text-secondary">July 2024</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs mt-1">
                  <li>Co-discovered and responsibly disclosed an IDOR vulnerability (CVSS 6.4) in MIT-WPU's PwC-hosted student ERP portal, exposing student profile photos through PRN manipulation.</li>
                  <li>Authored a proof-of-concept report and disclosed the findings to PwC staff.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-text">
                    SkillBridge{" "}
                    <span className="font-normal italic text-text-secondary">
                      | Node.js, MySQL{" "}
                      <a href="https://github.com/AlcesOzdst/SkillBridge" target="_blank" rel="noreferrer" className="text-accent underline inline-flex items-center gap-0.5">
                        (GitHub) <ArrowUpRight size={10} />
                      </a>
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-text-secondary">2024</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs mt-1">
                  <li>Built a peer-to-peer skill exchange platform with a Node.js/MySQL backend.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-text">
                    Bare-Metal Sensor Hub – EPB-F340Mini{" "}
                    <span className="font-normal italic text-text-secondary">| Keil C51, Embedded C</span>
                  </span>
                  <span className="font-mono text-[11px] text-text-secondary">2025</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs mt-1">
                  <li>Developed multi-sensor firmware integrating an SSD1306 OLED, DHT11, HC-SR04, and KY-038 sensors across multiple design iterations.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-text">
                    SENU – Physical Second Brain{" "}
                    <span className="font-normal italic text-text-secondary">
                      | ESP32-C3, Embedded C++, PlatformIO, I²C, RTC{" "}
                      <a href="https://github.com/AlcesOzdst/SENU" target="_blank" rel="noreferrer" className="text-accent underline inline-flex items-center gap-0.5">
                        (GitHub) <ArrowUpRight size={10} />
                      </a>
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-text-secondary">2026</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs mt-1">
                  <li>Developed an embedded productivity device featuring OLED-based navigation, rotary encoder controls, RTC integration, configurable focus timers, and alarm management.</li>
                  <li>Implemented non-blocking buzzer playback, tactile-button handling, RTC synchronization, and interactive firmware functionality.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-text">
                    Embedded Linux Security Lab{" "}
                    <span className="font-normal italic text-text-secondary">| Kali Linux, QEMU, OpenWrt</span>
                  </span>
                  <span className="font-mono text-[11px] text-text-secondary">2026</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs mt-1">
                  <li>Configured an emulated IoTGoat environment using QEMU to simulate an embedded Linux target for security testing.</li>
                  <li>Performed service discovery and network reconnaissance, identifying exposed SSH, HTTP, HTTPS, and UPnP services.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Platforms */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
              Security Platforms
            </h2>
            <div className="space-y-1 text-xs text-text-secondary">
              <div>
                <strong className="text-text">Hack The Box:</strong> Cybersecurity researcher profile; skills include Weak Authentication, Misconfiguration, and Reconnaissance.
              </div>
              <div>
                <strong className="text-text">HackerOne:</strong> Actively participating in public bug bounty programs and security assessments.
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-3">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-text-secondary">
              <div>
                <strong className="text-text">• Languages:</strong> Python, C, C++, Bash, JavaScript, SQL
              </div>
              <div>
                <strong className="text-text">• Security Tools:</strong> Burp Suite Professional, Nmap, Gobuster, ffuf, Wireshark, Metasploit, LinPEAS
              </div>
              <div>
                <strong className="text-text">• Security Domains:</strong> Web Application Security, IDOR/Broken Access Control, Embedded/Firmware Security
              </div>
              <div>
                <strong className="text-text">• Networking:</strong> TCP/IP, HTTP/HTTPS, SSH
              </div>
              <div>
                <strong className="text-text">• Embedded &amp; Protocols:</strong> ESP32, Raspberry Pi, 8051 (C8051F340), UART, SPI, I2C, RS-232, RS-485
              </div>
              <div>
                <strong className="text-text">• Development &amp; Cloud:</strong> Node.js, MySQL, Git, Docker, PlatformIO, Google Cloud Fundamentals
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}
