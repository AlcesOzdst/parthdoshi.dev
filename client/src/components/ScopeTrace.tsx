import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
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
  Terminal
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

  const currentSignal = SIGNALS[activeSignalIdx];

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
      // AudioContext not allowed without user gesture
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
        setSolvedSignals((prev) => [...prev, currentSignal.id]);
      }
      playBeep(880, "triangle", 0.18);
    } else if (!locked && isLocked) {
      setIsLocked(false);
    }
  }, [freq, phase, currentSignal, gameMode, isLocked, solvedSignals]);

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
      // X tunes freq between 10 and 100 MHz
      const newFreq = Math.round((10 + px * 90) * 10) / 10;
      // Y tunes phase between 0 and 360 deg
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
      // Horizontal center
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();
      // Grid verticals
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
          // Locked clean digital square-sine packet
          const square = Math.sin(p * waveFreq + t * 4 + radPhase) > 0 ? 1 : -1;
          const sine = Math.sin(p * waveFreq + t * 4 + radPhase);
          y = mid + (square * 0.6 + sine * 0.4) * (h * 0.32);
        } else {
          // Noisy unlocked signal with harmonics
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

      t += 0.035;
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      // static representation if reduced motion
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
    <div className="w-full card overflow-hidden border border-border bg-black/90 p-4 sm:p-5">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isLocked ? "bg-accent shadow-[0_0_8px_var(--c-accent)]" : "bg-amber/70 animate-pulse"}`} />
          <span className="font-mono text-xs uppercase tracking-wider text-text font-bold">
            SIGNAL · CH1
          </span>
          <span className="font-mono text-[11px] text-text-secondary">
            [{currentSignal.name}]
          </span>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          {/* Game / Free Toggle */}
          <button
            onClick={() => setGameMode(gameMode === "minigame" ? "free" : "minigame")}
            className="px-2.5 py-1 rounded font-mono text-[10px] uppercase tracking-wider bg-surface border border-border text-text-secondary hover:text-text transition-colors"
          >
            {gameMode === "minigame" ? "🎮 Game Mode" : "〰 Free Scope"}
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
        <div className="absolute bottom-1.5 left-3 text-[9px] font-mono text-text-secondary/70 select-none pointer-events-none">
          Drag on screen or use sliders below to tune carrier ↝
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
                  className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent"
                >
                  -1
                </button>
                <span className="text-accent font-semibold">{freq.toFixed(1)} MHz</span>
                <button
                  onClick={() => setFreq((f) => Math.min(100, Math.round((f + 1) * 10) / 10))}
                  className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent"
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
                  className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent"
                >
                  -15°
                </button>
                <span className="text-accent font-semibold">{phase}°</span>
                <button
                  onClick={() => setPhase((p) => Math.min(360, p + 15))}
                  className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] hover:text-accent"
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

          {/* Next Signal button when decoded */}
          <div className="pt-2 flex items-center justify-between border-t border-border/60 mt-2">
            <span className="text-[10px] text-text-secondary">
              Solved: {solvedSignals.length}/{SIGNALS.length}
            </span>
            <button
              onClick={() => {
                const nextIdx = (activeSignalIdx + 1) % SIGNALS.length;
                setActiveSignalIdx(nextIdx);
                // reset to a random detuned frequency
                setFreq(Math.round((SIGNALS[nextIdx].targetFreq - 15 + Math.random() * 8) * 10) / 10);
                setPhase(Math.round((SIGNALS[nextIdx].targetPhase - 60 + Math.random() * 30)));
                setIsLocked(false);
              }}
              className="px-2.5 py-1 rounded bg-accent/15 border border-accent/30 text-accent text-[10px] font-semibold hover:bg-accent/25 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Next Channel <ChevronRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
