import { useState } from "react";
import { Link } from "wouter";
import { Download, Copy, Check, ArrowLeft, Eye } from "lucide-react";

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
              &nbsp;·&nbsp;{" "}
              <a href="tel:7709906201" className="hover:text-accent">
                7709906201
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-accent">
              <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="hover:underline">
                GitHub: AlcesOzdst
              </a>
              <span className="text-text-secondary">|</span>
              <a href="https://linkedin.com/in/parthdoshi404" target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn: parthdoshi404
              </a>
              <span className="text-text-secondary">|</span>
              <a href="https://alcesozdst.com" target="_blank" rel="noreferrer" className="hover:underline">
                alcesozdst.com
              </a>
              <span className="text-text-secondary">|</span>
              <a href="mailto:parthdoshi404@gmail.com" className="hover:underline">
                parthdoshi404@gmail.com
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
              Summary
            </h2>
            <p className="text-text-secondary text-xs leading-relaxed text-justify">
              I am an ethical hacker and red teamer fueled by a relentless drive to explore, understand, and secure the
              digital world. With experience across penetration testing, IoT security, and CTF player, I approach every
              challenge with a mindset rooted in creativity, logic, and precision. My journey through Hack-X Club and
              ParamSafe has taught me to transform vulnerabilities into opportunities for learning and defense.
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-3">
              Work Experience
            </h2>

            <div>
              <div className="flex justify-between items-baseline font-semibold text-text">
                <span className="text-sm">Robotics &amp; Innovation Intern</span>
                <span className="font-normal font-mono text-[11px] text-text-secondary">Jan 2025 – May 2025</span>
              </div>
              <p className="mt-2 text-text-secondary text-xs leading-relaxed">
                Worked as a Robotics and Innovation Intern, contributing to the design and development of
                automation-driven systems and IoT-based solutions. Gained hands-on experience in integrating hardware with
                software to improve system efficiency, reliability, and security.
              </p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-3">
              Projects
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text text-xs">
                  Lightweight IDS using Suricata and Raspberry Pi 5
                </h3>
                <p className="mt-1 text-text-secondary text-xs leading-relaxed">
                  Built a custom Intrusion Detection System on Raspberry Pi 5 using Suricata, focusing on lightweight
                  deployment and real-time packet analysis. This project strengthened my understanding of network
                  forensics, rule creation, and traffic-based threat detection.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text text-xs">
                  DDoS Simulator
                </h3>
                <p className="mt-1 text-text-secondary text-xs leading-relaxed">
                  Designed a Python-based DDoS simulation system to evaluate and improve Suricata IDS detection efficiency
                  in controlled environments. Simulated high-volume traffic scenarios to analyze response thresholds,
                  tune rule sets, and strengthen network resilience across IoT and embedded devices.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-text font-medium">B.Tech ECE [AI-ML] MIT- World Peace University</span>
                <span className="font-mono text-[11px] text-text-secondary">2025 – 2028</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-text font-medium">
                  Int. B.Tech ECE [AI-ML] MIT- World Peace University{" "}
                  <span className="text-accent font-mono text-[11px]">(GPA: 8.06/10.00)</span>
                </span>
                <span className="font-mono text-[11px] text-text-secondary">2022 – 2025</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-text font-medium">
                  Class 10th Some Board <span className="text-accent font-mono text-[11px]">(79%)</span>
                </span>
                <span className="font-mono text-[11px] text-text-secondary">2022</span>
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
                <strong className="text-text">• Programming Languages:</strong> C, Python, Bash
              </div>
              <div>
                <strong className="text-text">• Platforms &amp; Environments:</strong> Linux (Ubuntu, Kali), Windows, Docker, VirtualBox, Raspberry Pi OS
              </div>
              <div>
                <strong className="text-text">• Web Technologies:</strong> HTML, JavaScript, API
              </div>
              <div>
                <strong className="text-text">• Defensive Tools:</strong> Suricata, Wireshark, Snort
              </div>
              <div>
                <strong className="text-text">• Offensive Tools:</strong> Burp Suite, Metasploit, Nmap, Hydra, sqlmap, dirsearch, John the Ripper, Aircrack-ng
              </div>
              <div>
                <strong className="text-text">• IoT/Hardware:</strong> Raspberry Pi, Arduino, ESP8266, Sensor Integration, Network Device Monitoring
              </div>
              <div className="md:col-span-2">
                <strong className="text-text">• Soft Skills:</strong> Problem Solving, Team Collaboration, Technical Writing, Leadership (Hack-X Club), Mentorship, Continuous Learning
              </div>
            </div>
          </div>

          {/* Online Courses */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
              Online Courses
            </h2>
            <ul className="list-disc list-outside ml-4 text-text-secondary space-y-1 text-xs">
              <li>
                <strong className="text-text">APISec University:</strong> API Security Fundamentals (June 2024)
              </li>
              <li>
                <strong className="text-text">Google Cloud:</strong> Build a Secure Google Cloud Network (Sept 2024)
              </li>
            </ul>
          </div>

          {/* Others */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 border-b border-border mb-2">
              Others
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
              <div>
                <strong className="text-text">• Hobbies:</strong> Sketching, Cooking
              </div>
              <div>
                <strong className="text-text">• Languages:</strong> English, Hindi, Gujarati
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="pt-2 border-t border-border">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-accent pb-1 mb-2">
              Declaration
            </h2>
            <p className="text-text-secondary text-xs italic mb-4">
              I hereby declare that all the details provided above are true to the best of my knowledge and belief.
            </p>
            <div className="flex justify-between items-baseline text-xs text-text-secondary font-mono">
              <span>Location: Pune, Maharashtra (India)</span>
              <span className="text-text font-semibold">(Parth Santosh Doshi)</span>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
