import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, Cpu, Radio, Shield, Terminal, Zap, Layers } from "lucide-react";

const phases = [
  {
    phase: "01",
    status: "CURRENT FOCUS",
    statusColor: "text-accent bg-accent/15 border-accent/30",
    title: "Firmware Extraction & Binary Analysis",
    body: "Dumping flash images over serial interfaces (UART/SPI), disassembling vendor binaries in Ghidra, unpacking squashfs filesystems with Binwalk, and bypassing bootloader restrictions.",
    tools: ["Ghidra", "Binwalk", "GDB", "U-Boot", "ESP32 / ARM"],
  },
  {
    phase: "02",
    status: "NEXT MILESTONE",
    statusColor: "text-text-secondary bg-surface border-border",
    title: "Hardware Interface Probing & Secure Boot",
    body: "Tapping physical buses with logic analyzers, automated JTAG/SWD boundary scanning, auditing cryptographic image signatures, and analyzing hardware root-of-trust boundaries.",
    tools: ["Saleae Logic", "JTAG / SWD", "OpenOCD", "Secure Boot", "TrustZone"],
  },
  {
    phase: "03",
    status: "LONG-TERM HORIZON",
    statusColor: "text-text-secondary bg-surface border-border",
    title: "Physical Fault Injection & Silicon Security",
    body: "Power side-channel analysis (SCA/DPA) to leak cryptographic keys, localized clock and voltage fault injection (FI), and evaluating silicon enclave resilience against physical adversaries.",
    tools: ["ChipWhisperer", "Voltage Glitching", "EMFI", "DPA", "Hardware RoT"],
  },
];

const pinouts = [
  { label: "UART TX/RX", desc: "Interactive serial consoles & root shells at 115200 baud" },
  { label: "JTAG / SWD", desc: "Boundary scan, flash extraction & CPU register control" },
  { label: "SPI_FLASH", desc: "Direct flash dump bypass without bootloader interaction" },
  { label: "VCC_GLITCH", desc: "Precision voltage droops to skip security branch checks" },
];

export function Trajectory() {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <section id="now" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-3">07 — Where I&rsquo;m Headed</p>
              <h2 className="display text-3xl md:text-5xl leading-tight">
                Toward <span className="italic-accent">embedded &amp; hardware</span> security research.
              </h2>
            </div>
            <span className="mono-label text-accent font-medium">Roadmap · 2026–2027</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-text-secondary measure text-base mb-12 leading-relaxed">
            The trajectory is specific: build the physical fluency to dissect hardware, find where trust assumptions
            break, and prove it. Pointing it at product security teams working on the connected devices most people
            never think to question.
          </p>
        </Reveal>

        {/* 3-Pillar Clean Roadmap */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {phases.map((p, i) => (
            <Reveal key={p.phase} delay={0.08 + i * 0.08}>
              <div className="card h-full p-6 md:p-7 flex flex-col justify-between group hover:border-accent transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs text-accent font-bold">{p.phase}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-xl leading-snug mb-3 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {p.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface border border-border text-text-secondary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Subtle Hardware Interface Test-Points Strip */}
        <Reveal delay={0.25}>
          <div className="card p-5 bg-surface/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-text font-semibold">
                Physical Target Attack Interfaces:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {pinouts.map((pin, idx) => (
                <button
                  key={pin.label}
                  onMouseEnter={() => setActivePin(idx)}
                  onMouseLeave={() => setActivePin(null)}
                  onClick={() => setActivePin(activePin === idx ? null : idx)}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-colors cursor-pointer ${
                    activePin === idx
                      ? "bg-accent text-accent-ink border-accent font-semibold"
                      : "bg-surface border-border text-text-secondary hover:text-text hover:border-border-accent"
                  }`}
                >
                  {pin.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-accent min-h-[1.2rem] flex items-center">
              {activePin !== null ? (
                <span>↳ {pinouts[activePin].desc}</span>
              ) : (
                <span className="text-text-secondary/60">Hover any probe to inspect target vector</span>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
