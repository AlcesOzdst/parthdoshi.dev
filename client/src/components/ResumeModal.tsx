import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Copy, Check, FileText, Printer, ArrowUpRight } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `PARTH DOSHI
Pune, Maharashtra | parthdoshi404@gmail.com | +91-7709906201
LinkedIn: linkedin.com/in/parthdoshi404 | GitHub: github.com/AlcesOzdst | Portfolio: parthdoshi.me
Google Skills Boost: g.dev/Alcesozdst | TryHackMe: tryhackme.com/p/AlcesOzdst | Hack The Box | HackerOne

PROFESSIONAL SUMMARY
Cybersecurity student with hands-on experience in web application security, responsible vulnerability disclosure, embedded security research, and Linux-based environments. Built practical experience through Hack The Box, TryHackMe, HackerOne, and self-hosted security labs. Currently expanding into SOC operations through threat detection, log analysis, SIEM technologies, and incident response while actively developing defensive security projects.

EDUCATION
MIT World Peace University (MIT-WPU), Pune, India
B.Tech in Electronics & Communication Engineering (ECE), AI/ML Specialization
Expected Graduation: May 2028

EXPERIENCE
Research & Development Intern | Jan 2025 – May 2025
PHN Technology Pvt. Ltd. | Pune, India
• Contributed to the research and development of IoT, embedded systems, and cybersecurity-focused solutions using ESP32, Raspberry Pi, and platforms.
• Performed vulnerability assessments and security testing for embedded and web-based applications using industry-standard security methodologies.
• Assisted in developing ESP32 and Raspberry Pi-based IoT security prototypes.
• Documented security findings, testing procedures, and mitigation recommendations for internal R&D projects.

Independent Security Research Projects | 2024 – Present
HackerOne Bug Bounty Platform | Remote
• Actively perform web application security assessments across public bug bounty programs on HackerOne.
• Practiced identification of Broken Access Control, IDOR, Authentication, GraphQL and API security issues.
• Documented testing methodology and findings to improve vulnerability assessment workflow.

President | Aug 2025 – Present
Hack-X, Cybersecurity Club – MIT World Peace University | Pune, India
• Lead the university cybersecurity community by organizing Capture The Flag (CTF) competitions, workshops, and technical events.
• Coordinate club operations, executive members, and technical initiatives promoting hands-on cybersecurity learning.

Assistant Sponsorship Executive | Sep 2023 – Sep 2024
STeRG, MIT World Peace University | Pune, India
• Managed sponsorship outreach and coordinated with industry partners to support technical events and student initiatives.

PROJECTS
Responsible Disclosure – IDOR in University ERP Portal | Burp Suite, Web Security | July 2024
• Identified an Insecure Direct Object Reference (IDOR) vulnerability affecting the university ERP portal by manipulating student PRN identifiers.
• Demonstrated unauthorized access to student profile resources using Burp Suite by modifying PRN parameters.
• Assessed impact using CVSS v3.1 methodology and prepared a detailed proof-of-concept with remediation recommendations.
• Responsibly disclosed findings to the university administration.

ESP32 Marauder Custom Firmware | ESP32, PlatformIO, Embedded C++ | 2025
• Customized ESP32 Marauder firmware for wireless security experimentation by integrating NRF24L01 support, OLED interface, and custom menu navigation.
• Implemented embedded firmware enhancements using PlatformIO and ESP-IDF libraries for wireless security experimentation.
• Worked with SPI, I2C, and RF communication modules during firmware development.

SECURITY PLATFORMS
• Google Developer Program: g.dev/Alcesozdst – skills profile with earned gamified badges
• Hack The Box: cybersecurity researcher profile – skills in Weak Authentication, Misconfiguration, Reconnaissance
• TryHackMe: tryhackme.com/p/AlcesOzdst
• HackerOne: actively hunting on live programs for security assessment

TECHNICAL SKILLS
• Security: Burp Suite Professional, Nmap, Gobuster, ffuf, Wireshark, Metasploit, OpenVAS, LinPEAS, OWASP Top 10
• Networking: TCP/IP, HTTP/HTTPS, DNS, SSH
• Operating Systems: Linux, Kali Linux, Windows
• Programming: Python, C, C++, Bash, JavaScript, TypeScript, SQL, Solidity
• Embedded Systems: ESP32, Raspberry Pi, 8051, UART, SPI, I2C
• Development & Cloud: Git, Docker, PlatformIO, MySQL, Google Cloud Fundamentals`;

    navigator.clipboard.writeText(resumeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-bg border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Top Toolbar */}
            <div className="px-5 py-3 border-b border-border bg-surface flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-accent" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-text">
                  Parth_Doshi_Resume.pdf
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1.5 rounded bg-bg border border-border text-text-secondary hover:text-text text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy plain text"
                >
                  {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Text"}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="btn btn-solid !py-1.5 !px-3 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  title="Download as PDF or Print"
                >
                  <Download size={13} />
                  <span>Download / Print PDF</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded hover:bg-bg text-text-secondary hover:text-accent transition-colors ml-1 cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Document Content View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-surface/20">
              <div
                id="resume-printable-document"
                className="max-w-3xl mx-auto bg-bg border border-border/80 p-8 sm:p-12 rounded-lg text-text shadow-sm space-y-6 font-sans text-xs leading-normal print:p-0 print:border-0 print:shadow-none print:bg-white print:text-black"
              >
                {/* Header */}
                <div className="text-center pb-4 border-b border-border">
                  <h1 className="font-display text-3xl sm:text-4xl tracking-wider font-semibold uppercase mb-1">
                    Parth Doshi
                  </h1>
                  <p className="text-xs text-text-secondary mb-2">
                    Pune, Maharashtra &nbsp;·&nbsp;{" "}
                    <a href="mailto:parthdoshi404@gmail.com" className="hover:text-accent underline">
                      parthdoshi404@gmail.com
                    </a>{" "}
                    &nbsp;·&nbsp; +91-7709906201
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
                    <a href="https://alcesozdst.com" target="_blank" rel="noreferrer" className="hover:underline">
                      Portfolio
                    </a>
                    <span className="text-text-secondary">|</span>
                    <a href="https://g.dev/Alcesozdst" target="_blank" rel="noreferrer" className="hover:underline">
                      Google Skills Boost
                    </a>
                    <span className="text-text-secondary">|</span>
                    <a href="https://profile.hackthebox.com/profile/019c59d7-edfc-7172-b666-bedfbe635e49" target="_blank" rel="noreferrer" className="hover:underline">
                      Hack The Box
                    </a>
                    <span className="text-text-secondary">|</span>
                    <a href="https://tryhackme.com/p/AlcesOzdst" target="_blank" rel="noreferrer" className="hover:underline">
                      TryHackMe
                    </a>
                    <span className="text-text-secondary">|</span>
                    <a href="https://hackerone.com" target="_blank" rel="noreferrer" className="hover:underline">
                      HackerOne
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-text-secondary text-xs leading-relaxed text-justify">
                    Cybersecurity student with hands-on experience in web application security, responsible vulnerability disclosure, embedded security
                    research, and Linux-based environments. Built practical experience through Hack The Box, TryHackMe, HackerOne, and self-hosted
                    security labs. Currently expanding into SOC operations through threat detection, log analysis, SIEM technologies, and incident response
                    while actively developing defensive security projects.
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
                    {/* PHN Tech Intern */}
                    <div>
                      <div className="flex justify-between items-baseline font-semibold text-text">
                        <span>Research &amp; Development Intern</span>
                        <span className="font-normal font-mono text-[11px] text-text-secondary">Jan 2025 – May 2025</span>
                      </div>
                      <div className="flex justify-between items-baseline italic text-text-secondary text-[11px] mb-1.5">
                        <span>PHN Technology Pvt. Ltd.</span>
                        <span>Pune, India</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs">
                        <li>Contributed to the research and development of IoT, embedded systems, and cybersecurity-focused solutions using ESP32, Raspberry Pi, and platforms.</li>
                        <li>Performed vulnerability assessments and security testing for embedded and web-based applications using industry-standard security methodologies.</li>
                        <li>Assisted in developing ESP32 and Raspberry Pi-based IoT security prototypes.</li>
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
                        <li>Actively perform web application security assessments across public bug bounty programs on HackerOne.</li>
                        <li>Practiced identification of Broken Access Control, IDOR, Authentication, GraphQL and API security issues.</li>
                        <li>Documented testing methodology and findings to improve vulnerability assessment workflow.</li>
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

                    {/* STeRG */}
                    <div>
                      <div className="flex justify-between items-baseline font-semibold text-text">
                        <span>Assistant Sponsorship Executive</span>
                        <span className="font-normal font-mono text-[11px] text-text-secondary">Sep 2023 – Sep 2024</span>
                      </div>
                      <div className="flex justify-between items-baseline italic text-text-secondary text-[11px] mb-1.5">
                        <span>STeRG, MIT World Peace University</span>
                        <span>Pune, India</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs">
                        <li>Managed sponsorship outreach and coordinated with industry partners to support technical events and student initiatives.</li>
                      </ul>
                    </div>
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
                          <span className="font-normal italic text-text-secondary">| Burp Suite, Web Security</span>
                        </span>
                        <span className="font-mono text-[11px] text-text-secondary">July 2024</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs mt-1">
                        <li>Identified an Insecure Direct Object Reference (IDOR) vulnerability affecting the university ERP portal by manipulating student PRN identifiers.</li>
                        <li>Demonstrated unauthorized access to student profile resources using Burp Suite by modifying PRN parameters.</li>
                        <li>Assessed impact using CVSS v3.1 methodology and prepared a detailed proof-of-concept with remediation recommendations.</li>
                        <li>Responsibly disclosed findings to the university administration.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-text">
                          ESP32 Marauder Custom Firmware{" "}
                          <span className="font-normal italic text-text-secondary">| ESP32, PlatformIO, Embedded C++</span>
                        </span>
                        <span className="font-mono text-[11px] text-text-secondary">2025</span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs mt-1">
                        <li>Customized ESP32 Marauder firmware for wireless security experimentation by integrating NRF24L01 support, OLED interface, and custom menu navigation.</li>
                        <li>Implemented embedded firmware enhancements using PlatformIO and ESP-IDF libraries for wireless security experimentation.</li>
                        <li>Worked with SPI, I2C, and RF communication modules during firmware development.</li>
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
                      <strong className="text-text">Google Developer Program:</strong>{" "}
                      <a href="https://g.dev/Alcesozdst" target="_blank" rel="noreferrer" className="text-accent underline">
                        g.dev/Alcesozdst
                    </a>{" "}
                    – skills profile with earned gamified badges
                    </div>
                    <div>
                      <strong className="text-text">Hack The Box:</strong> cybersecurity researcher profile – skills in Weak Authentication, Misconfiguration, Reconnaissance
                    </div>
                    <div>
                      <strong className="text-text">TryHackMe:</strong>{" "}
                      <a href="https://tryhackme.com/p/AlcesOzdst" target="_blank" rel="noreferrer" className="text-accent underline">
                        tryhackme.com/p/AlcesOzdst
                      </a>{" "}
                      &nbsp;&nbsp;|&nbsp;&nbsp; <strong className="text-text">HackerOne:</strong> actively hunting on live programs for security assessment
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
                      <strong className="text-text">Security:</strong> Burp Suite Professional, Nmap, Gobuster, ffuf, Wireshark, Metasploit, OpenVAS, LinPEAS, OWASP Top 10
                    </div>
                    <div>
                      <strong className="text-text">Networking:</strong> TCP/IP, HTTP/HTTPS, DNS, SSH
                    </div>
                    <div>
                      <strong className="text-text">Operating Systems:</strong> Linux, Kali Linux, Windows
                    </div>
                    <div>
                      <strong className="text-text">Programming:</strong> Python, C, C++, Bash, JavaScript, TypeScript, SQL, Solidity
                    </div>
                    <div>
                      <strong className="text-text">Embedded Systems:</strong> ESP32, Raspberry Pi, 8051, UART, SPI, I2C
                    </div>
                    <div>
                      <strong className="text-text">Development &amp; Cloud:</strong> Git, Docker, PlatformIO, MySQL, Google Cloud Fundamentals
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-3 border-t border-border bg-surface flex items-center justify-between text-xs font-mono text-text-secondary">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border text-[10px]">Esc</kbd> to exit</span>
              <button
                onClick={handlePrint}
                className="text-accent hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Printer size={13} /> Print or Save as PDF ↗
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
