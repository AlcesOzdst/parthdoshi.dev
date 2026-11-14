import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Copy, Check, FileText, ArrowUpRight, Eye } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [viewPdfPreview, setViewPdfPreview] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyText = () => {
    const resumeText = `PARTH DOSHI
Pune, Maharashtra | parth@alcesozdst.com
LinkedIn: linkedin.com/in/parthdoshi404 | GitHub: github.com/AlcesOzdst | Portfolio: parthdoshi.me

PROFESSIONAL SUMMARY
Cybersecurity student with hands-on experience in web application security, responsible vulnerability disclosure, embedded security research, and Linux-based environments. Developed practical skills through HackerOne, Hack The Box, TryHackMe, and self-hosted security labs. Experience includes hardware interfaces, network analysis, vulnerability assessment, embedded device testing, ESP32-based systems, IoT devices, and hardware-software integration, with an emphasis on Hardware Security.

EDUCATION
MIT World Peace University (MIT-WPU), Pune, India
B.Tech in Electronics & Communication Engineering (ECE), AI/ML Specialization
Expected Graduation: May 2028

EXPERIENCE
Research & Development | Internship | Jan 2025 – May 2025
PHN Technology Pvt. Ltd. | On-site · Pune, India
• Contributed to the research and development of IoT, embedded systems, and cybersecurity-focused solutions using ESP32, Raspberry Pi, and associated development platforms.
• Performed vulnerability assessments and security testing for embedded and web-based applications using industry-standard security methodologies.
• Assisted in developing ESP32- and Raspberry Pi-based IoT security prototypes.
• Documented security findings, testing procedures, and mitigation recommendations for internal R&D projects.

Independent Security Research Projects | 2024 – Present
HackerOne Bug Bounty Platform | Remote
• Perform web application security assessments across public bug bounty programs on HackerOne.
• Practice identifying Broken Access Control, IDOR, authentication, GraphQL, and API security issues.
• Document testing methodologies and findings to improve vulnerability assessment workflows.

President | Aug 2025 – Present
Hack-X, Cybersecurity Club – MIT World Peace University | Pune, India
• Lead the university cybersecurity community by organizing Capture The Flag (CTF) competitions, workshops, and technical events.
• Coordinate club operations, executive members, and technical initiatives promoting hands-on cybersecurity learning.

COMMUNITY & INDUSTRY ENGAGEMENT
Arsenal Volunteer | October 2026
Black Hat India 2026 – Informa Markets | Bengaluru, India
• Supported on-ground Arsenal operations and coordination, collaborating with the organizing team and fellow volunteers.

PROJECTS
Responsible Disclosure – IDOR in University ERP Portal | Burp Suite, Access Control Testing | July 2024
• Co-discovered and responsibly disclosed an IDOR vulnerability (CVSS 6.4) in MIT-WPU's PwC-hosted student ERP portal, exposing student profile photos through PRN manipulation.
• Authored a proof-of-concept report and disclosed the findings to PwC staff.

SkillBridge | Node.js, MySQL | 2024
• Built a peer-to-peer skill exchange platform with a Node.js/MySQL backend.

Bare-Metal Sensor Hub – EPB-F340Mini | Keil C51, Embedded C | 2025
• Developed multi-sensor firmware integrating an SSD1306 OLED, DHT11, HC-SR04, and KY-038 sensors across multiple design iterations.

SENU – Physical Second Brain | ESP32-C3, Embedded C++, PlatformIO, I²C, RTC | 2026
• Developed an embedded productivity device featuring OLED-based navigation, rotary encoder controls, RTC integration, configurable focus timers, and alarm management.
• Implemented non-blocking buzzer playback, tactile-button handling, RTC synchronization, and interactive firmware functionality.

Embedded Linux Security Lab | Kali Linux, QEMU, OpenWrt | 2026
• Configured an emulated IoTGoat environment using QEMU to simulate an embedded Linux target for security testing.
• Performed service discovery and network reconnaissance, identifying exposed SSH, HTTP, HTTPS, and UPnP services.

SECURITY PLATFORMS
• Hack The Box: Cybersecurity researcher profile; skills include Weak Authentication, Misconfiguration, and Reconnaissance.
• HackerOne: Actively participating in public bug bounty programs and security assessments.

TECHNICAL SKILLS
• Languages: Python, C, C++, Bash, JavaScript, SQL
• Security Tools: Burp Suite Professional, Nmap, Gobuster, ffuf, Wireshark, Metasploit, LinPEAS
• Security Domains: Web Application Security, IDOR/Broken Access Control, Embedded/Firmware Security
• Networking: TCP/IP, HTTP/HTTPS, SSH
• Embedded & Protocols: ESP32, Raspberry Pi, 8051 (C8051F340), UART, SPI, I2C, RS-232, RS-485
• Development & Cloud: Node.js, MySQL, Git, Docker, PlatformIO, Google Cloud Fundamentals`;

    navigator.clipboard.writeText(resumeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.05 }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-surface border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/90 backdrop-blur z-20">
              <div className="flex items-center gap-3">
                <span className="mono-label uppercase tracking-widest text-accent text-xs">
                  Curriculum Vitae
                </span>
                <span className="hidden sm:inline text-text-secondary text-xs">/</span>
                <span className="hidden sm:inline font-mono text-xs text-text-secondary">
                  Parth Doshi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewPdfPreview(!viewPdfPreview)}
                  className="btn py-1.5 px-3 text-xs flex items-center gap-1.5 border border-border"
                  title="Toggle PDF / Formatted Text"
                >
                  {viewPdfPreview ? (
                    <>
                      <FileText size={12} />
                      <span className="hidden sm:inline">Web Version</span>
                    </>
                  ) : (
                    <>
                      <Eye size={12} />
                      <span className="hidden sm:inline">PDF Preview</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyText}
                  className="btn py-1.5 px-3 text-xs flex items-center gap-1.5 border border-border"
                  title="Copy resume as plain text"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-accent" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="hidden sm:inline">Copy Text</span>
                    </>
                  )}
                </button>

                <a
                  href="/Parth_Doshi_Resume.pdf"
                  download="Parth_Doshi_Resume.pdf"
                  className="btn btn-solid py-1.5 px-3.5 text-xs flex items-center gap-1.5"
                >
                  <Download size={12} />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 text-text-secondary hover:text-text hover:bg-surface-hover rounded-md transition-colors ml-1"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Content View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-surface/20">
              {viewPdfPreview ? (
                <div className="w-full max-w-3xl mx-auto h-[750px] rounded-lg overflow-hidden border border-border bg-black shadow-sm">
                  <iframe
                    src="/Parth_Doshi_Resume.pdf#toolbar=0"
                    title="Parth Doshi Resume PDF"
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div
                  id="resume-printable-document"
                  className="max-w-3xl mx-auto bg-bg border border-border/80 p-8 sm:p-12 rounded-lg text-text shadow-sm space-y-6 font-sans text-xs leading-normal"
                >
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-border">
                    <h1 className="font-display text-3xl sm:text-4xl tracking-wider font-semibold uppercase mb-1">
                      Parth Doshi
                    </h1>
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
                      {/* PHN Tech */}
                      <div>
                        <div className="flex justify-between items-baseline font-semibold text-text">
                          <span>Research &amp; Development | Internship</span>
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

                      {/* HackerOne */}
                      <div>
                        <div className="flex justify-between items-baseline font-semibold text-text">
                          <span>Independent Security Research Projects</span>
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

                      {/* President */}
                      <div>
                        <div className="flex justify-between items-baseline font-semibold text-text">
                          <span>President</span>
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
                    <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
                      Technical Skills
                    </h2>
                    <div className="space-y-1 text-xs text-text-secondary">
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
                </div>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-2.5 border-t border-border bg-surface flex items-center justify-between text-xs font-mono text-text-secondary">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border text-[10px]">Esc</kbd> to exit</span>
              <span className="text-text-secondary/70">Original 1-page PDF · parth@alcesozdst.com</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
