import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScopeTrace } from "@/components/ScopeTrace";

/* ── graphics ─────────────────────────────────────────────── */
function RouteLine() {
  const reduce = useReducedMotion();
  const d = "M6 118 C 40 40, 66 150, 98 96 S 150 30, 176 84 S 210 150, 236 78 S 276 44, 296 66";
  return (
    <svg viewBox="0 0 300 150" className="w-full h-[110px]" fill="none" aria-hidden="true">
      <motion.path d={d} stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 2.2, ease: "easeInOut" }} />
      <circle cx="6" cy="118" r="4" fill="var(--c-accent)" />
      <circle cx="296" cy="66" r="4" fill="none" stroke="var(--c-accent)" strokeWidth="2" />
    </svg>
  );
}
function FreqCurve() {
  const reduce = useReducedMotion();
  const d = "M4 92 C 40 70, 70 80, 110 86 S 150 98, 174 64 C 194 46, 206 50, 222 76 C 248 108, 274 112, 296 118";
  return (
    <svg viewBox="0 0 300 140" className="w-full h-[110px]" fill="none" aria-hidden="true">
      {[75, 150, 225].map((x) => <line key={x} x1={x} y1="8" x2={x} y2="120" stroke="var(--c-border)" strokeWidth="1" />)}
      <line x1="0" y1="120" x2="300" y2="120" stroke="var(--c-border)" strokeWidth="1" />
      <motion.path d={d} stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} />
    </svg>
  );
}
const hex = [
  "00000000  77 69 66 69 5f 70 61 73  73 3d 68 75 6e 74 65 72  |wifi_pass=hunter|",
  "00000010  32 00 61 70 69 5f 6b 65  79 3d 41 49 7a 61 53 79  |2.api_key=AIzaSy|",
  "00000020  43 00 61 64 6d 69 6e 3a  61 64 6d 69 6e 00 64 62  |C.admin:admin.db|",
  "00000030  67 5f 73 68 65 6c 6c 3d  6f 6e 00 ff ff ff ff ff  |g_shell=on......|",
];
function Hexdump() {
  return (
    <div className="font-mono text-[0.62rem] leading-relaxed text-text-secondary overflow-x-auto" aria-hidden="true">
      {hex.map((l, i) => <div key={i} className={i < 2 ? "text-text" : ""}>{l}</div>)}
    </div>
  );
}

/* ── panels ───────────────────────────────────────────────── */
const panels = [
  {
    tag: "firmware", title: "What the chip hides", graphic: <Hexdump />,
    line: "I pull it off the flash and read it — hardcoded keys, debug shells, the usual sins in plaintext.",
    more: "Right now I'm building an ESP32 teardown: dump the flash over UART, run Binwalk, then read the auth check in Ghidra. Attack, evidence, fix — the whole loop most vendors skip.",
    link: { label: "github ↗", href: "https://github.com/AlcesOzdst" },
  },
  {
    tag: "the city", title: "Where I've been", graphic: <RouteLine />,
    line: "Slow miles around Baner and Aundh, every one logged as GPX.",
    more: "Baner, Aundh, the river road at 6am. I keep every track because I like watching the map fill in — same reason I like memory maps and pin-outs.",
  },
  {
    tag: "sound", title: "Too many IEMs", graphic: <FreqCurve />,
    line: "A chi-fi habit I can't shake. I can point at the 3 kHz peak — and I will.",
    more: "Rotating a few budget sets at any time. Ask me about tuning and I won't stop: the Harman target is a suggestion, not a rule, and treble is where cheap sets go to die.",
  },
  {
    tag: "airwaves", title: "Radios & GNSS", graphic: <div className="h-[110px] flex items-center"><ScopeTrace height={90} /></div>,
    line: "ESP32, NRF24, LoRa, a GPS module decoding NMEA over UART.",
    more: "NRF24 for 2.4 GHz poking, LoRa for the long haul, a GPS module spitting NMEA sentences over UART. Radios are just the physical layer of everything — slow them down and they're all waveforms.",
  },
];

function Panel({ p, open, onToggle }: { p: typeof panels[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={open}
        data-cursor={open ? "close" : "open"}
        className="w-full text-left p-6 md:p-7 cursor-pointer"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="mono-label uppercase tracking-[0.14em] accent">{p.tag}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-text-secondary">
            <Plus size={16} />
          </motion.span>
        </div>
        <div className="mb-5">{p.graphic}</div>
        <h3 className="display text-2xl md:text-[1.7rem] mb-2">{p.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{p.line}</p>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-6 md:pb-7 -mt-1">
              <div className="border-t border-border pt-4 text-sm text-text-secondary leading-relaxed">
                {p.more}
                {p.link && (
                  <div className="mt-4">
                    <a href={p.link.href} target="_blank" rel="noreferrer" className="mono-label accent u-link" onClick={(e) => e.stopPropagation()}>
                      {p.link.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Signals() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="signals" className="section-spacing">
      <div>
        <Reveal><p className="eyebrow mb-5">06 — Off the clock</p></Reveal>
        <Reveal delay={0.05}>
          <p className="display text-3xl md:text-5xl mb-4 measure">
            Most things are just <span className="italic-accent">signals</span> once you slow them down.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-text-secondary measure mb-4 leading-relaxed">
            Firmware, footsteps, frequency response, the occasional bad argument. Tap a card to open it up.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {panels.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.06}>
              <Panel p={p} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
