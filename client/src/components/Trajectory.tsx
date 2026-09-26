import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { 
  Zap, 
  Cpu, 
  Radio, 
  Terminal, 
  Crosshair, 
  Flame, 
  Sparkles, 
  Activity, 
  RotateCcw,
  CheckCircle,
  AlertOctagon,
  Layers,
  ArrowRight
} from "lucide-react";

type AttackMode = "voltage-glitch" | "emfi" | "uart-sniffer" | "jtag-scan";

export function Trajectory() {
  const [mode, setMode] = useState<AttackMode>("voltage-glitch");
  const [glitching, setGlitching] = useState(false);
  const [glitchSuccess, setGlitchSuccess] = useState<boolean | null>(null);
  const [glitchWidth, setGlitchWidth] = useState(14); // ns
  const [glitchDelay, setGlitchDelay] = useState(42); // clock cycles
  const [logs, setLogs] = useState<string[]>([
    "SYS_INIT: ARM Cortex-M4 Secure Core clocked at 120MHz",
    "SECURE_BOOT: Verifying RSA-3072 signature on Flash sector 0x08000000...",
    "READY: Hardware testbed connected via differential active probe.",
  ]);
  const [selectedDieBlock, setSelectedDieBlock] = useState<string>("AES-256 Engine");
  const [emfiPulseCount, setEmfiPulseCount] = useState(0);
  const [uartBaud, setUartBaud] = useState<number>(115200);
  const [uartOutput, setUartOutput] = useState<string[]>([
    "U-Boot SPL 2024.04 (Parth-SecOS)",
    "DRAM: 512 MiB",
    "Hit 'Esc' within 2s to interrupt autoboot...",
  ]);
  const [jtagPads, setJtagPads] = useState<{ name: string; pin: number; active: boolean }[]>([
    { name: "TCK", pin: 4, active: true },
    { name: "TMS", pin: 7, active: true },
    { name: "TDI", pin: 2, active: true },
    { name: "TDO", pin: 9, active: true },
  ]);
  const [jtagScanned, setJtagScanned] = useState(false);

  // Trigger Voltage Glitch
  const triggerGlitch = () => {
    setGlitching(true);
    setGlitchSuccess(null);

    // Add log
    setLogs((prev) => [
      `[>] Arming pulse generator: Delay=${glitchDelay}cyc, Width=${glitchWidth}ns`,
      `[>] VCC Droop initiated on Core Power Rail...`,
      ...prev.slice(0, 8),
    ]);

    setTimeout(() => {
      setGlitching(false);
      // Sweet spot for glitch success is delay 38-45 and width 12-16
      const isSuccess = glitchDelay >= 38 && glitchDelay <= 45 && glitchWidth >= 12 && glitchWidth <= 16;
      setGlitchSuccess(isSuccess);

      if (isSuccess) {
        setLogs((prev) => [
          "⚡ [CORRUPTION DETECTED]: Instruction 'CMP R0, #0' skipped at cycle #42!",
          "🔓 [ROOT PRIVILEGE GRANTED]: Secure boot bypass verified! Register R0 forced to 0x1.",
          "★ DUMPING SECURE ENCLAVE KEYS TO HOST INTERFACE...",
          ...prev.slice(0, 7),
        ]);
      } else {
        setLogs((prev) => [
          "❌ [FAULT MISSED]: Chip reset watchdog triggered or brownout threshold not met.",
          `⚠️ Hint: Target auth check executes around ~40-44 cycles with 13-15ns pulse width.`,
          ...prev.slice(0, 7),
        ]);
      }
    }, 600);
  };

  // EMFI Probe click
  const triggerEmfi = (blockName: string) => {
    setSelectedDieBlock(blockName);
    setEmfiPulseCount((c) => c + 1);
    setLogs((prev) => [
      `🎯 EMFI localized B-field pulse delivered to: [${blockName.toUpperCase()}]`,
      `[+] Differential Fault Analysis (DFA): Byte corrupted at state matrix S-Box round 9!`,
      `[🔑] Partial round-key candidate leaked: 0x4861636B${Math.floor(Math.random() * 8999 + 1000).toString(16)}`,
      ...prev.slice(0, 7),
    ]);
  };

  // Run JTAG Scan
  const runJtagScan = () => {
    setJtagScanned(true);
    setLogs((prev) => [
      "[+] JTAGulator pinout scan executing across 16 header test pads...",
      "[+] Shift register pattern matched: TAP Controller state -> IDCODE read: 0x4BA00477 (ARM Cortex CoreSight)",
      "[🔓] Readout Protection (RDP Level 1) bypassed via cold-boot glitch! 512KB Flash dumped.",
      ...prev.slice(0, 7),
    ]);
  };

  return (
    <section id="now" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-3">07 — Where I&rsquo;m Headed</p>
              <h2 className="display text-3xl md:text-5xl leading-tight">
                Physical attack surfaces &amp; <span className="italic-accent">hardware security</span>.
              </h2>
            </div>
            <span className="mono-label text-accent font-medium">Interactive Silicon Testbed v2.6</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-text-secondary measure text-base mb-10 leading-relaxed">
            Software security assumes the silicon underneath is an honest actor. When you manipulate the clock,
            induce micro-droops on core power rails, or tap physical buses with an oscilloscope probe, physics wins.
            I am building fluency from silicon fault injection to firmware reverse engineering — teardown by teardown.
          </p>
        </Reveal>

        {/* Interactive Hardware Security Lab Console */}
        <Reveal delay={0.1}>
          <div className="card overflow-hidden border border-border bg-surface/30">
            {/* Console Title Bar */}
            <div className="px-5 py-3 border-b border-border bg-surface/90 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-text">
                  TARGET: PARTH-SEC-MCU (ARM CORTEX-M4F · 65nm)
                </span>
              </div>

              {/* Mode Selectors */}
              <div className="flex items-center gap-1.5 p-1 bg-bg rounded-lg border border-border">
                <button
                  onClick={() => setMode("voltage-glitch")}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    mode === "voltage-glitch" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
                  }`}
                >
                  <Zap size={12} /> Voltage Glitch
                </button>
                <button
                  onClick={() => setMode("emfi")}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    mode === "emfi" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
                  }`}
                >
                  <Crosshair size={12} /> EMFI Probe
                </button>
                <button
                  onClick={() => setMode("uart-sniffer")}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    mode === "uart-sniffer" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
                  }`}
                >
                  <Terminal size={12} /> UART Tap
                </button>
                <button
                  onClick={() => setMode("jtag-scan")}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    mode === "jtag-scan" ? "bg-accent text-accent-ink font-semibold" : "text-text-secondary hover:text-text"
                  }`}
                >
                  <Layers size={12} /> JTAG Scan
                </button>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid lg:grid-cols-[1.3fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-border">
              {/* Left Pane: Interactive Target Simulation */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Mode 1: Voltage Fault Injection */}
                {mode === "voltage-glitch" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                          <Zap size={16} className="text-accent" /> VCC Core Voltage Glitching
                        </h4>
                        <p className="mono-label text-[11px]">Induce clock-cycle brownout during RSA verification</p>
                      </div>
                      <span className="font-mono text-xs text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                        Target: CMP R0, #0
                      </span>
                    </div>

                    {/* Glitch Oscilloscope Waveform Display */}
                    <div className="h-32 bg-black/80 rounded-lg border border-border p-3 relative flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between text-[10px] font-mono text-text-secondary">
                        <span>CH1: VCC_CORE (1.20V NOMINAL)</span>
                        <span>SCALE: 200mV / 10ns</span>
                        <span className={glitching ? "text-accent font-bold" : "text-text-secondary"}>
                          {glitching ? "⚡ GLITCH TRIGGERED" : "ARMED"}
                        </span>
                      </div>

                      {/* SVG Oscilloscope Trace */}
                      <svg className="w-full h-16" viewBox="0 0 400 60" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="15" x2="400" y2="15" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                        <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                        <line x1="0" y1="45" x2="400" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                        {/* Voltage waveform */}
                        {glitching ? (
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            d={`M 0,20 L ${glitchDelay * 3},20 L ${glitchDelay * 3 + 2},56 L ${
                              glitchDelay * 3 + glitchWidth * 1.5
                            },56 L ${glitchDelay * 3 + glitchWidth * 1.5 + 4},20 L 400,20`}
                            fill="none"
                            stroke="#5FCE86"
                            strokeWidth="2.5"
                          />
                        ) : (
                          <path
                            d={`M 0,20 L ${glitchDelay * 3},20 L ${glitchDelay * 3 + 2},52 L ${
                              glitchDelay * 3 + glitchWidth * 1.2
                            },52 L ${glitchDelay * 3 + glitchWidth * 1.2 + 3},20 L 400,20`}
                            fill="none"
                            stroke="rgba(95, 206, 134, 0.6)"
                            strokeWidth="1.8"
                          />
                        )}
                      </svg>

                      <div className="flex items-center justify-between text-[10px] font-mono text-text-secondary">
                        <span>Trigger Offset: {glitchDelay} cyc</span>
                        <span>Pulse Width: {glitchWidth} ns</span>
                        <span>V_MIN: {glitching ? "0.22V" : "1.18V"}</span>
                      </div>
                    </div>

                    {/* Interactive Tuning Sliders */}
                    <div className="grid sm:grid-cols-2 gap-4 bg-surface/50 p-4 rounded-lg border border-border">
                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-text-secondary">Trigger Cycle Delay:</span>
                          <span className="text-accent font-semibold">{glitchDelay} cycles</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="60"
                          value={glitchDelay}
                          onChange={(e) => setGlitchDelay(Number(e.target.value))}
                          className="w-full accent-accent cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-text-secondary block mt-1">Target auth window: 38–45</span>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-text-secondary">Glitch Pulse Width:</span>
                          <span className="text-accent font-semibold">{glitchWidth} ns</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="25"
                          value={glitchWidth}
                          onChange={(e) => setGlitchWidth(Number(e.target.value))}
                          className="w-full accent-accent cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-text-secondary block mt-1">Target width: 12–16 ns</span>
                      </div>
                    </div>

                    {/* Fire Button */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={triggerGlitch}
                        disabled={glitching}
                        className="btn btn-solid flex-1 justify-center gap-2 py-3 text-xs font-bold cursor-pointer"
                        data-cursor="glitch"
                      >
                        <Zap size={14} />
                        {glitching ? "INJECTING FAULT..." : "FIRE VOLTAGE GLITCH PULSE"}
                      </button>

                      {glitchSuccess !== null && (
                        <div
                          className={`px-3 py-2 rounded text-xs font-mono font-medium flex items-center gap-1.5 ${
                            glitchSuccess
                              ? "bg-accent/15 text-accent border border-accent/40"
                              : "bg-red-500/15 text-red-400 border border-red-500/40"
                          }`}
                        >
                          {glitchSuccess ? (
                            <>
                              <CheckCircle size={14} /> EXPLOIT BYPASS!
                            </>
                          ) : (
                            <>
                              <AlertOctagon size={14} /> FAULT MISSED
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mode 2: EMFI Laser / Magnetic Probe */}
                {mode === "emfi" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                          <Crosshair size={16} className="text-accent" /> Silicon Decap &amp; EMFI Probe
                        </h4>
                        <p className="mono-label text-[11px]">Click a chip sector to deliver localized electromagnetic pulse</p>
                      </div>
                      <span className="mono-label text-accent font-mono">Pulses: {emfiPulseCount}</span>
                    </div>

                    {/* Silicon Die Floorplan Diagram */}
                    <div className="relative p-4 rounded-xl border border-border bg-black/90 aspect-[16/9] flex flex-col justify-between overflow-hidden">
                      <div className="text-[10px] font-mono text-text-secondary flex justify-between select-none">
                        <span>DIE_AREA: 4.8mm² · 65nm CMOS</span>
                        <span>PROBE: 500µm COIL TIP</span>
                      </div>

                      {/* Interactive Chip Subsections */}
                      <div className="grid grid-cols-3 gap-2.5 my-2">
                        {[
                          { name: "Flash Memory", role: "Bootloader & Firmware", color: "border-blue-500/40" },
                          { name: "AES-256 Engine", role: "Cryptographic Accelerator", color: "border-accent" },
                          { name: "SRAM Bank", role: "Runtime Stack & Heap", color: "border-amber-500/40" },
                          { name: "CPU Core", role: "ARM Pipeline & ALU", color: "border-purple-500/40" },
                          { name: "OTP Fuses", role: "Security & Lock Bits", color: "border-red-500/40" },
                          { name: "Clock PLL", role: "Internal Oscillator", color: "border-emerald-500/40" },
                        ].map((block) => (
                          <div
                            key={block.name}
                            onClick={() => triggerEmfi(block.name)}
                            className={`p-3 rounded-lg border bg-surface/40 hover:bg-accent/15 transition-all cursor-pointer group relative ${
                              selectedDieBlock === block.name ? "ring-2 ring-accent bg-accent/10" : ""
                            }`}
                          >
                            <span className="font-mono text-xs font-semibold block group-hover:text-accent transition-colors">
                              {block.name}
                            </span>
                            <span className="text-[10px] text-text-secondary font-mono block mt-0.5">{block.role}</span>
                            <span className="absolute bottom-1 right-2 text-[9px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                              PULSE ↝
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[10px] font-mono text-accent flex items-center justify-between">
                        <span>ACTIVE TARGET: {selectedDieBlock}</span>
                        <span>CLICK SECTOR TO LEAK S-BOX ROUND KEYS</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 3: UART Sniffer */}
                {mode === "uart-sniffer" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                          <Terminal size={16} className="text-accent" /> Serial Bus Sniffing &amp; Root Shell
                        </h4>
                        <p className="mono-label text-[11px]">Decode UART TX/RX lines &amp; interrupt U-Boot bootloader</p>
                      </div>
                      <div className="flex gap-1">
                        {[9600, 57600, 115200].map((b) => (
                          <button
                            key={b}
                            onClick={() => {
                              setUartBaud(b);
                              if (b === 115200) {
                                setLogs((prev) => ["[+] Baud locked at 115200 8N1. Clean ASCII stream recognized.", ...prev]);
                              } else {
                                setLogs((prev) => [`[!] Baud mismatch at ${b}: framing errors / garbage bytes received.`, ...prev]);
                              }
                            }}
                            className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                              uartBaud === b ? "bg-accent text-accent-ink font-bold" : "bg-surface border border-border text-text-secondary"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-border bg-black/90 p-4 font-mono text-xs space-y-2 h-48 overflow-y-auto">
                      <div className="text-text-secondary text-[11px] border-b border-border/60 pb-1">
                        TTY: /dev/ttyUSB0 (FTDI FT232R @ {uartBaud} baud)
                      </div>
                      {uartBaud === 115200 ? (
                        <>
                          {uartOutput.map((line, idx) => (
                            <div key={idx} className="text-text leading-relaxed">
                              {line}
                            </div>
                          ))}
                          <div className="flex items-center gap-2 pt-2">
                            <span className="text-accent">parth-mcu#</span>
                            <span className="text-text-secondary animate-pulse">id; cat /etc/shadow</span>
                          </div>
                          <div className="text-accent font-semibold text-[11px]">
                            uid=0(root) gid=0(root) groups=0(root) [PHYSICAL DEBUG SHELL ACQUIRED]
                          </div>
                        </>
                      ) : (
                        <div className="text-amber/80">
                          ??\x1b[0m\xff\xfe Framing Error: Inverted polarity or incorrect baud timing. Switch to 115200.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mode 4: JTAG Scan */}
                {mode === "jtag-scan" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                          <Layers size={16} className="text-accent" /> JTAG Boundary Scan &amp; Flash Extraction
                        </h4>
                        <p className="mono-label text-[11px]">Pinout discovery across unlabeled PCB test pads</p>
                      </div>
                      <button
                        onClick={runJtagScan}
                        className="btn btn-solid py-1 px-3 text-xs"
                      >
                        {jtagScanned ? "Re-scan Pads" : "Run JTAGulator Scan"}
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center font-mono">
                      {jtagPads.map((pad) => (
                        <div key={pad.name} className="p-3 rounded-lg border border-border bg-surface/50">
                          <span className="text-accent font-bold block text-sm">{pad.name}</span>
                          <span className="text-text-secondary text-[10px] block mt-0.5">Pad #{pad.pin}</span>
                          <span className="text-[10px] text-accent mt-1 inline-block">MATCHED</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-surface/40 border border-border text-xs font-mono text-text-secondary leading-relaxed">
                      {jtagScanned ? (
                        <span className="text-accent">
                          ✓ JTAG TAP Controller in RUN-TEST/IDLE. IDCODE: 0x4BA00477 (ARM CoreSight). Flash memory dumped: 512 KB.
                        </span>
                      ) : (
                        "Click 'Run JTAGulator Scan' to pulse test vectors across all 16 test pads and discover boundary pins."
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Pane: Live Telemetry Terminal & Roadmap */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-surface/10">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                      <Activity size={13} className="text-accent" /> Bus Telemetry &amp; Fault Log
                    </span>
                    <button
                      onClick={() => setLogs(["Console cleared. Hardware probe ready."])}
                      className="text-text-secondary hover:text-text transition-colors"
                      title="Clear log"
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>

                  {/* Terminal Box */}
                  <div className="rounded-lg border border-border bg-black/85 p-3.5 font-mono text-[11px] leading-relaxed space-y-1.5 h-44 overflow-y-auto">
                    {logs.map((log, i) => (
                      <div
                        key={i}
                        className={`${
                          log.includes("⚡") || log.includes("🔓") || log.includes("★")
                            ? "text-accent font-semibold"
                            : log.includes("❌")
                            ? "text-red-400"
                            : "text-text-secondary"
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trajectory Milestone Cards */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <span className="mono-label uppercase tracking-wider text-accent font-semibold block">
                    Research Milestones &amp; Trajectory
                  </span>
                  {[
                    {
                      label: "Current Focus",
                      title: "Firmware RE & Flash Extraction",
                      desc: "Dumping SPI flash, Ghidra disassembly, UART shell bypasses, and bare-metal logic analysis.",
                    },
                    {
                      label: "Immediate Next",
                      title: "Fault Injection & Power Analysis",
                      desc: "ChipWhisperer electromagnetic fault injection (EMFI), voltage glitching, and SCA key recovery.",
                    },
                    {
                      label: "Long-Term Goal",
                      title: "Silicon & Product Security Research",
                      desc: "Building hardware roots of trust and breaking the physical layer of secure enclaves in public.",
                    },
                  ].map((m) => (
                    <div key={m.label} className="p-2.5 rounded bg-surface/60 border border-border/80">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-accent font-semibold">{m.label}</span>
                        <span className="text-text-secondary">{m.title}</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-snug">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
