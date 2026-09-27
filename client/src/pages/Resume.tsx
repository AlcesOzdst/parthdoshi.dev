import { useState } from "react";
import { Link } from "wouter";
import { Download, Copy, Check, ArrowLeft, ArrowUpRight, Eye } from "lucide-react";

export default function Resume() {
  const [copied, setCopied] = useState(false);
  const [viewPdfPreview, setViewPdfPreview] = useState(false);

  const handleCopyText = () => {
    const el = document.getElementById("resume-document");
    if (!el) return;
    navigator.clipboard.writeText(el.innerText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-bg text-text py-8 px-4 sm:px-8 font-sans">
      {/* Top Action Nav */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link href="/">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent transition-colors cursor-pointer">
            <ArrowLeft size={14} /> Back to Portfolio
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewPdfPreview(!viewPdfPreview)}
            className="px-3 py-1.5 rounded bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye size={13} className={viewPdfPreview ? "text-accent" : ""} />
            <span>{viewPdfPreview ? "Text View" : "Original PDF View"}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="px-3 py-1.5 rounded bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>

          {/* Single direct download button for the original PDF */}
          <a
            href="/Parth_Doshi_Resume.pdf"
            download="Parth_Doshi_Resume.pdf"
            className="btn btn-solid !py-1.5 !px-3.5 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
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
        </main>
      )}
    </div>
  );
}
