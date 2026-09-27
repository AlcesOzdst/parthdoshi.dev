import { useEffect, useRef, useState } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  ChevronRight, 
  Award,
  Terminal,
  Power,
  Copy,
  Check,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Key,
  Cpu
} from "lucide-react";

interface SecretSignal {
  id: number;
  name: string;
  protocol: string;
  targetFreq: number; // in MHz, e.g. 43.3
  targetPhase: number; // in degrees, e.g. 180
  toleranceFreq: number;
  tolerancePhase: number;
  rawBits: string;
  decodedPayload: string;
}

const SIGNALS: SecretSignal[] = [
  {
    id: 1,
    name: "ESP32 Bootloader Handshake",
    protocol: "UART 115200 8N1",
    targetFreq: 43.3,
    targetPhase: 180,
    toleranceFreq: 2.5,
    tolerancePhase: 25,
    rawBits: "01010000 01100001 01110010 01110100 01101000",
    decodedPayload: "PARTH::BOOT_ROM_OK",
  },
  {
    id: 2,
    name: "LoRa Long-Range Telemetry",
    protocol: "CSS / Chirp Spread Spectrum",
    targetFreq: 86.8,
    targetPhase: 90,
    toleranceFreq: 2.8,
    tolerancePhase: 30,
    rawBits: "01010011 01001001 01000111 01001110 01000001",
    decodedPayload: "PUNE_NODE_868MHZ::ALIVE",
  },
  {
    id: 3,
    name: "Differential Power Side-Channel",
    protocol: "AES-128 Crypto S-Box",
    targetFreq: 24.0,
    targetPhase: 270,
    toleranceFreq: 2.2,
    tolerancePhase: 25,
    rawBits: "01001011 01000101 01011001 01011111 01000110",
    decodedPayload: "DPA_LEAK_BYTE::0x5F",
  },
];

const SECRET_FLAG = "FLAG{43.3mhz_868mhz_dpa_signal_locked_pune}";

// Classic CRT Turn-On and Turn-Off Animations
const crtScreenVariants: any = {
  hidden: {
    scaleX: 0.001,
    scaleY: 0.003,
    opacity: 0,
    filter: "brightness(25) contrast(2)",
  },
  visible: {
    scaleX: [0.001, 1, 1, 1],
    scaleY: [0.003, 0.005, 1.03, 1],
    opacity: [0, 1, 1, 1],
    filter: [
      "brightness(30) contrast(3)",
      "brightness(14) contrast(2)",
      "brightness(2.2) contrast(1.1)",
      "brightness(1) contrast(1)",
    ],
    transition: {
      duration: 0.65,
      times: [0, 0.35, 0.8, 1],
      ease: "easeOut",
    },
  },
  exit: {
    scaleX: [1, 1, 0.015, 0],
    scaleY: [1, 0.004, 0.004, 0],
    opacity: [1, 1, 0.9, 0],
    filter: [
      "brightness(1) contrast(1)",
      "brightness(8) contrast(2)",
      "brightness(25) contrast(3)",
      "brightness(30)",
    ],
    transition: {
      duration: 0.48,
      times: [0, 0.45, 0.85, 1],
      ease: "easeInOut",
    },
  },
};

export function ScopeTrace({ height = 140 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const reduce = useReducedMotion();

  // Minigame State
  const [activeSignalIdx, setActiveSignalIdx] = useState(0);
  const [freq, setFreq] = useState<number>(20.0); // current user freq
  const [phase, setPhase] = useState<number>(60); // current user phase in deg
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [gameMode, setGameMode] = useState<"minigame" | "free">("minigame");
  const [solvedSignals, setSolvedSignals] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [copiedFlag, setCopiedFlag] = useState(false);

  const currentSignal = SIGNALS[activeSignalIdx];
  const allSolved = solvedSignals.length === SIGNALS.length;

  // Sound synthesis
  const playBeep = (freqHz: number, type: OscillatorType = "sine", duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqHz, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext blocked
    }
  };

  // CRT sound effects (power on flyback whistle / discharge click)
  const playCrtSound = (type: "power-on" | "power-off") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      if (type === "power-on") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(75, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.32);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.36);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.28);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.28);
      }
    } catch {
      // AudioContext blocked
    }
  };

  // Check lock condition
  useEffect(() => {
    if (gameMode !== "minigame") {
      setIsLocked(false);
      return;
    }

    const freqDiff = Math.abs(freq - currentSignal.targetFreq);
    const phaseDiff = Math.abs(phase - currentSignal.targetPhase);

    const locked = freqDiff <= currentSignal.toleranceFreq && phaseDiff <= currentSignal.tolerancePhase;
    if (locked && !isLocked) {
      setIsLocked(true);
      if (!solvedSignals.includes(currentSignal.id)) {
        const nextSolved = [...solvedSignals, currentSignal.id];
        setSolvedSignals(nextSolved);
        if (nextSolved.length === SIGNALS.length) {
          // All 3 channels decoded! Trigger CRT turn-on animation
          setTimeout(() => {
            playCrtSound("power-on");
            setShowDossierModal(true);
          }, 400);
        }
      }
      playBeep(880, "triangle", 0.18);
    } else if (!locked && isLocked) {
      setIsLocked(false);
    }
  }, [freq, phase, currentSignal, gameMode, isLocked, solvedSignals]);

  // Handle CRT turn-off / close
  const handleCloseCrt = () => {
    playCrtSound("power-off");
    setShowDossierModal(false);
  };

  // Handle modal escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showDossierModal) {
        handleCloseCrt();
      }
    };
    if (showDossierModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDossierModal]);

  const handleCopyFlag = () => {
    navigator.clipboard.writeText(SECRET_FLAG).then(() => {
      setCopiedFlag(true);
      setTimeout(() => setCopiedFlag(false), 2000);
    });
  };

  const mailSubject = encodeURIComponent("[SIGNAL_DECODED] CTF Flag Verified - Let's Connect");
  const mailBody = encodeURIComponent(`Hey Parth,

I solved the Signal Tuner minigame on your site and demodulated all 3 carrier signals (ESP32 Bootloader, LoRa 868MHz, and AES DPA Leak).

Flag: ${SECRET_FLAG}

Let's connect!`);
  const mailtoUrl = `mailto:parthdoshi404@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  // Canvas Oscilloscope Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, t = 0, raf = 0;
    const accent = "#5FCE86";

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse / touch interaction directly on canvas
    let isDragging = false;
    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      handlePointerMove(e);
    };
    const handlePointerUp = () => {
      isDragging = false;
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging && e.buttons === 0) return;
      const r = canvas.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      const newFreq = Math.round((10 + px * 90) * 10) / 10;
      const newPhase = Math.round((1 - py) * 360);
      setFreq(newFreq);
      setPhase(newPhase);
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;

      // Calculate SNR based on lock proximity
      const freqDist = Math.abs(freq - currentSignal.targetFreq);
      const phaseDist = Math.abs(phase - currentSignal.targetPhase);
      const maxDist = 60;
      const proximity = Math.max(0, 1 - (freqDist * 1.2 + phaseDist * 0.4) / maxDist);

      // Oscilloscope background grid
      ctx.strokeStyle = "rgba(95, 206, 134, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();

      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw Trace
      ctx.beginPath();
      const waveFreq = freq * 0.3;
      const radPhase = (phase * Math.PI) / 180;
      const noiseAmp = isLocked ? 0.02 : (1 - proximity) * 0.4;

      for (let x = 0; x <= w; x += 2) {
        const p = x / w;
        let y = mid;

        if (isLocked) {
          const square = Math.sin(p * waveFreq + t * 4 + radPhase) > 0 ? 1 : -1;
          const sine = Math.sin(p * waveFreq + t * 4 + radPhase);
          y = mid + (square * 0.6 + sine * 0.4) * (h * 0.32);
        } else {
          const primary = Math.sin(p * waveFreq + t * 3 + radPhase) * (h * 0.25);
          const harmonic = Math.sin(p * waveFreq * 2.8 - t * 2) * (h * 0.1);
          const noise = (Math.random() - 0.5) * (h * noiseAmp);
          y = mid + primary + harmonic + noise;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Glow effect
      ctx.shadowBlur = isLocked ? 14 : 4 + proximity * 8;
      ctx.shadowColor = isLocked ? "#5FCE86" : proximity > 0.6 ? "#E9DFC9" : "rgba(95, 206, 134, 0.4)";
      ctx.strokeStyle = isLocked ? "#5FCE86" : proximity > 0.6 ? "#E9DFC9" : "rgba(158, 140, 111, 0.7)";
      ctx.lineWidth = isLocked ? 2.6 : 1.6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Sweep Dot
      const sweepX = (t * 60) % w;
      ctx.fillStyle = isLocked ? "#5FCE86" : "#E9DFC9";
      ctx.beginPath();
      ctx.arc(sweepX, mid, 2, 0, Math.PI * 2);
      ctx.fill();

      // CRT scanlines overlay on canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1.5);
      }

      t += 0.035;
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [freq, phase, isLocked, currentSignal, reduce]);

  // Calculate SNR display
  const freqDist = Math.abs(freq - currentSignal.targetFreq);
  const phaseDist = Math.abs(phase - currentSignal.targetPhase);
  const snr = isLocked
    ? "+28.4 dB"
    : `${Math.round((14 - (freqDist * 1.5 + phaseDist * 0.1)) * 10) / 10} dB`;

  return (
    <>
      <div className="w-full card overflow-hidden border border-border bg-black/90 p-4 sm:p-5">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isLocked ? "bg-accent shadow-[0_0_8px_var(--c-accent)]" : "bg-amber/70 animate-pulse"}`} />
            <span className="font-mono text-xs uppercase tracking-wider text-text font-bold">
              SIGNAL : CH1
            </span>
            <span className="font-mono text-[11px] text-text-secondary">
              [{currentSignal.name}]
            </span>
          </div>

          {/* Top Controls */}
          <div className="flex items-center gap-2">
            {allSolved && (
              <button
                onClick={() => {
                  playCrtSound("power-on");
                  setShowDossierModal(true);
                }}
                className="px-2.5 py-1 rounded font-mono text-xs uppercase tracking-wider bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30 transition-colors flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(95,206,134,0.25)] animate-pulse"
                title="Power On Decrypted CRT Monitor"
              >
                <Sparkles size={13} /> CRT Terminal Unlocked
              </button>
            )}

            {/* Game / Free Toggle */}
            <button
              onClick={() => setGameMode(gameMode === "minigame" ? "free" : "minigame")}
              className="px-2.5 py-1 rounded font-mono text-[10px] uppercase tracking-wider bg-surface border border-border text-text-secondary hover:text-text transition-colors"
            >
              {gameMode === "minigame" ? "Game Mode" : "Free Scope"}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playBeep(440);
              }}
              className="p-1.5 rounded bg-surface border border-border text-text-secondary hover:text-accent transition-colors"
              title={soundEnabled ? "Mute audio" : "Enable signal sound"}
            >
              {soundEnabled ? <Volume2 size={13} className="text-accent" /> : <VolumeX size={13} />}
            </button>

            {/* Reset / Auto */}
            <button
              onClick={() => {
                setFreq(currentSignal.targetFreq);
                setPhase(currentSignal.targetPhase);
                playBeep(600);
              }}
              className="px-2 py-1 rounded bg-surface border border-border text-[10px] font-mono text-accent hover:bg-accent/10 transition-colors"
              title="Auto-tune PLL to carrier"
            >
              Auto-Lock
            </button>
          </div>
        </div>

        {/* Oscilloscope Screen Area */}
        <div className="relative my-3 rounded-lg overflow-hidden border border-border/60 bg-black">
          {/* On-screen telemetry overlay */}
          <div className="absolute top-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono select-none pointer-events-none z-10">
            <span className="text-text-secondary">
              FREQ: <strong className="text-accent">{freq.toFixed(1)} MHz</strong> (Target: {currentSignal.targetFreq} MHz)
            </span>
            <span className="text-text-secondary">
              PHASE: <strong className="text-accent">{phase}°</strong>
            </span>
            <span className={isLocked ? "text-accent font-bold" : "text-amber/90"}>
              SNR: {snr} {isLocked ? "● LOCKED" : "○ SEARCHING"}
            </span>
          </div>

          {/* Interactive Canvas */}
          <canvas
            ref={canvasRef}
            style={{ height }}
            className="w-full block cursor-crosshair"
            title="Drag horizontally to tune Frequency, vertically to tune Phase"
          />

          {/* Hint text at bottom of canvas */}
          <div className="absolute bottom-1.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-text-secondary/70 select-none pointer-events-none">
            <span>Drag on screen or use sliders below to tune carrier &rarr;</span>
            {allSolved ? (
              <span className="text-accent font-semibold flex items-center gap-1">
                ● ALL 3 CHANNELS SYNCHRONIZED
              </span>
            ) : (
              <span>Locked: {solvedSignals.length}/3 channels</span>
            )}
          </div>
        </div>

        {/* Interactive Controls & Demodulator Terminal */}
        <div className="grid sm:grid-cols-[1.4fr_1fr] gap-4 pt-2">
          {/* Sliders and Knob Controls */}
          <div className="space-y-3 bg-surface/40 p-3.5 rounded-lg border border-border/70">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className="text-text-secondary">Carrier Tuner (MHz):</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setFreq((f) => Math.max(10, Math.round((f - 1) * 10) / 10))}
                    className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent cursor-pointer"
                  >
                    -1
                  </button>
                  <span className="text-accent font-semibold">{freq.toFixed(1)} MHz</span>
                  <button
                    onClick={() => setFreq((f) => Math.min(100, Math.round((f + 1) * 10) / 10))}
                    className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent cursor-pointer"
                  >
                    +1
                  </button>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="0.5"
                value={freq}
                onChange={(e) => {
                  setFreq(Number(e.target.value));
                  playBeep(200 + Number(e.target.value) * 6, "sine", 0.03);
                }}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className="text-text-secondary">Trigger Phase Shift:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPhase((p) => Math.max(0, p - 15))}
                    className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent cursor-pointer"
                  >
                    -15°
                  </button>
                  <span className="text-accent font-semibold">{phase}°</span>
                  <button
                    onClick={() => setPhase((p) => Math.min(360, p + 15))}
                    className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent cursor-pointer"
                  >
                    +15°
                  </button>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={phase}
                onChange={(e) => setPhase(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Demodulated Bits / Status */}
          <div className="bg-black/90 p-3.5 rounded-lg border border-border/80 flex flex-col justify-between font-mono text-xs">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-1.5 mb-2">
                <span className="text-text-secondary text-[10px] flex items-center gap-1">
                  <Terminal size={11} className="text-accent" /> DEMODULATOR:
                </span>
                <span className="text-[10px] text-accent font-semibold">
                  {isLocked ? "PACKET DECODED" : "SYNCHRONIZING..."}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-text-secondary truncate">
                  RAW: <span className={isLocked ? "text-accent" : "opacity-40"}>{isLocked ? currentSignal.rawBits : "010?10?0 1?001??1 001?1???"}</span>
                </div>
                <div className="text-xs font-bold text-text truncate">
                  PAYLOAD:{" "}
                  <span className={isLocked ? "text-accent" : "text-text-secondary opacity-60"}>
                    {isLocked ? `"${currentSignal.decodedPayload}"` : "[CARRIER DRIFT - NO DATA]"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Channel Nav & Dossier Unlock */}
            <div className="pt-2.5 flex items-center justify-between border-t border-border/60 mt-2 gap-2">
              <span className="text-[10px] text-text-secondary flex items-center gap-1">
                <span>Channel {activeSignalIdx + 1}/{SIGNALS.length}</span>
                {allSolved && <CheckCircle2 size={11} className="text-accent" />}
              </span>

              <div className="flex items-center gap-2">
                {allSolved ? (
                  <button
                    onClick={() => {
                      playCrtSound("power-on");
                      setShowDossierModal(true);
                    }}
                    className="px-3 py-1 rounded bg-accent text-black text-xs font-bold hover:bg-accent/90 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(95,206,134,0.3)] animate-pulse"
                  >
                    <Power size={12} />
                    <span>View CRT Monitor</span>
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    const nextIdx = (activeSignalIdx + 1) % SIGNALS.length;
                    setActiveSignalIdx(nextIdx);
                    setFreq(Math.round((SIGNALS[nextIdx].targetFreq - 15 + Math.random() * 8) * 10) / 10);
                    setPhase(Math.round((SIGNALS[nextIdx].targetPhase - 60 + Math.random() * 30)));
                    setIsLocked(false);
                  }}
                  className="px-2.5 py-1 rounded bg-surface border border-border text-text hover:text-accent text-[10px] font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Signal</span>
                  <ChevronRight size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal CRT Monitor Modal with Turn-On / Turn-Off Animations */}
      <AnimatePresence>
        {showDossierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCrt}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* CRT Physical Bezel Frame (Horizontal Landscape Orientation) */}
            <motion.div
              variants={crtScreenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full max-w-5xl bg-[#141414] border-4 border-[#2C2B28] rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(95,206,134,0.18)] flex flex-col overflow-hidden origin-center"
            >
              {/* Top CRT Monitor Header Bar */}
              <div className="px-6 py-3.5 bg-[#1B1A17] border-b-2 border-[#2C2B28] flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_#5FCE86] animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-accent">
                      TEKTRONIX RF-DEMODULATOR // 2465B
                    </span>
                  </div>
                  <span className="hidden sm:inline font-mono text-[11px] text-text-secondary/80 bg-black/50 px-2.5 py-0.5 rounded border border-border/60">
                    PHOSPHOR: P31 GREEN
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline font-mono text-xs text-accent/90">
                    STATUS: ALL 3 CARRIERS SYNCHRONIZED
                  </span>

                  {/* Physical CRT Power Off Button */}
                  <button
                    onClick={handleCloseCrt}
                    className="px-3 py-1 rounded bg-[#252420] hover:bg-[#32302A] border border-border text-xs font-mono text-text hover:text-accent flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Power Off CRT Monitor (Esc)"
                  >
                    <Power size={13} className="text-accent" />
                    <span>PWR OFF</span>
                  </button>
                </div>
              </div>

              {/* CRT Curved Glass Display Area with Scanlines and Larger Text */}
              <div className="relative p-6 sm:p-10 bg-black overflow-hidden font-mono">
                {/* Horizontal Scanline Raster Texture */}
                <div 
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.38)_50%)] bg-[length:100%_4px] opacity-70 z-20" 
                  aria-hidden="true" 
                />

                {/* CRT Spherical Vignette / Radial Shadow */}
                <div 
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.88)] z-20" 
                  aria-hidden="true" 
                />

                {/* CRT Glass Reflection Glare */}
                <div 
                  className="pointer-events-none absolute -top-24 left-1/4 w-1/2 h-36 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-xl z-20 opacity-50" 
                  aria-hidden="true" 
                />

                {/* Main Horizontal Content Grid (2 Columns Side by Side) */}
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start text-text">
                  
                  {/* LEFT COLUMN: Decrypted Carrier Telemetry */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/80">
                      <span className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                        <Terminal size={16} /> Decrypted Carrier Log (3/3)
                      </span>
                      <span className="text-xs text-text-secondary bg-[#181816] px-2 py-0.5 rounded border border-border/70">
                        FREQ PLL LOCKED
                      </span>
                    </div>

                    <div className="space-y-3">
                      {SIGNALS.map((sig) => (
                        <div 
                          key={sig.id} 
                          className="p-4 rounded-lg bg-[#0E0E0C] border border-border/90 hover:border-accent/40 transition-colors space-y-2 shadow-inner"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-text font-bold text-sm">
                              <span className="text-accent">CH 0{sig.id} :</span>
                              <span>{sig.name}</span>
                            </div>
                            <span className="text-xs text-accent font-semibold font-mono bg-accent/10 px-2 py-0.5 rounded">
                              {sig.targetFreq} MHz
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-text-secondary">
                            <span>Protocol: {sig.protocol}</span>
                            <span className="font-mono text-[11px] opacity-75">Phase: {sig.targetPhase}°</span>
                          </div>

                          <div className="pt-1.5 border-t border-border/50 flex items-center justify-between">
                            <span className="text-xs text-text-secondary">PAYLOAD:</span>
                            <code className="text-sm sm:text-base font-bold text-accent tracking-wide text-shadow-[0_0_8px_rgba(95,206,134,0.6)]">
                              {sig.decodedPayload}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: CTF Flag & Recruiter Fast-Track Pass */}
                  <div className="space-y-5">
                    
                    {/* CTF Flag Container with Large Text */}
                    <div className="p-5 rounded-lg bg-[#0E0E0C] border border-accent/40 space-y-3 shadow-[0_0_20px_rgba(95,206,134,0.08)]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-accent font-bold flex items-center gap-1.5">
                          <Key size={15} /> Classified CTF Flag:
                        </span>
                        <span className="text-xs text-text-secondary">Verified Payload</span>
                      </div>

                      <div className="p-3.5 rounded bg-black border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <code className="text-sm sm:text-base font-bold text-accent tracking-wider select-all break-all text-shadow-[0_0_6px_rgba(95,206,134,0.5)]">
                          {SECRET_FLAG}
                        </code>
                        <button
                          onClick={handleCopyFlag}
                          className="px-4 py-2 rounded bg-accent/20 border border-accent/50 hover:bg-accent/30 text-accent text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 shadow-sm"
                        >
                          {copiedFlag ? (
                            <>
                              <Check size={14} /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} /> Copy Flag
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Recruiter / Researcher Direct Priority Pitch */}
                    <div className="p-5 rounded-lg bg-[#141310] border border-border/90 space-y-3.5">
                      <div className="space-y-1.5">
                        <h4 className="font-sans font-bold text-text text-base flex items-center gap-2">
                          <ShieldCheck size={18} className="text-accent" />
                          Recruiter or Hardware Researcher? Claim Priority Reply.
                        </h4>
                        <p className="font-sans text-sm text-text-secondary leading-relaxed">
                          You calibrated the carrier frequencies and matched phase triggers across all three channels. Most visitors skim portfolios in seconds; you took the time to investigate the RF signal.
                        </p>
                        <p className="font-sans text-sm text-text-secondary leading-relaxed">
                          If you are evaluating candidates for embedded or hardware security roles, IoT R&amp;D, or vulnerability research: send an email with this flag. It routes to my priority inbox for an immediate reply and coffee in Pune.
                        </p>
                      </div>

                      {/* Large Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={mailtoUrl}
                          className="btn btn-solid !py-2.5 !px-5 text-sm font-mono inline-flex items-center gap-2 cursor-pointer shadow-[0_0_18px_rgba(95,206,134,0.25)]"
                        >
                          <Mail size={16} />
                          <span>Send Priority Email With Flag &rarr;</span>
                        </a>

                        <a
                          href="https://linkedin.com/in/parthdoshi404"
                          target="_blank"
                          rel="noreferrer"
                          className="btn !py-2.5 !px-4 text-sm font-mono inline-flex items-center gap-2 text-text hover:text-accent cursor-pointer"
                        >
                          <span>Connect on LinkedIn</span>
                          <ArrowUpRight size={15} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Bottom CRT Monitor Frame Bar */}
              <div className="px-6 py-3 bg-[#1B1A17] border-t-2 border-[#2C2B28] flex items-center justify-between text-xs font-mono text-text-secondary select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>CRT BEAM ACTIVE // HORIZONTAL 60Hz RASTER</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-black border border-border text-[10px]">Esc</kbd> or click PWR OFF to collapse screen</span>
                  <button
                    onClick={handleCloseCrt}
                    className="text-accent hover:underline cursor-pointer font-semibold"
                  >
                    Return to Scope &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
