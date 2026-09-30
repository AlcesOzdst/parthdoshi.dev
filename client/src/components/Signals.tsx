import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/* ── graphics ─────────────────────────────────────────────── */
function WatchMovement() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 300 140" className="w-full h-[110px]" fill="none" aria-hidden="true">
      <circle cx="150" cy="70" r="58" stroke="var(--c-border)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="150" cy="70" r="48" stroke="var(--c-border)" strokeWidth="1" />
      
      {/* Escapement gear teeth */}
      <circle cx="120" cy="70" r="22" stroke="var(--c-border)" strokeWidth="1.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1={120 + 22 * Math.cos((deg * Math.PI) / 180)}
          y1={70 + 22 * Math.sin((deg * Math.PI) / 180)}
          x2={120 + 26 * Math.cos((deg * Math.PI) / 180)}
          y2={70 + 26 * Math.sin((deg * Math.PI) / 180)}
          stroke="var(--c-border)"
          strokeWidth="1.5"
        />
      ))}

      {/* Ruby bearing jewel */}
      <circle cx="170" cy="70" r="4" fill="#E5484D" />
      <circle cx="170" cy="70" r="8" stroke="var(--c-border)" strokeWidth="1" />

      {/* Oscillating Balance Wheel */}
      <motion.g
        style={{ originX: "170px", originY: "70px" }}
        animate={reduce ? {} : { rotate: [0, 40, -40, 0] }}
        transition={{ repeat: Infinity, duration: 0.55, ease: "easeInOut" }}
      >
        <circle cx="170" cy="70" r="32" stroke="var(--c-accent)" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <circle
            key={deg}
            cx={170 + 32 * Math.cos((deg * Math.PI) / 180)}
            cy={70 + 32 * Math.sin((deg * Math.PI) / 180)}
            r="1.8"
            fill="var(--c-accent)"
          />
        ))}
        <line x1="138" y1="70" x2="202" y2="70" stroke="var(--c-accent)" strokeWidth="1.5" />
        <line x1="170" y1="38" x2="170" y2="102" stroke="var(--c-accent)" strokeWidth="1.5" />
        <circle cx="170" cy="70" r="16" stroke="var(--c-accent)" strokeWidth="1" strokeDasharray="5 3" opacity="0.75" />
      </motion.g>

      {/* Pallet fork arms */}
      <path d="M142 56 L148 70 L142 84" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function SketchGraphic() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 300 140" className="w-full h-[110px]" fill="none" aria-hidden="true">
      {/* Sketch guide grid */}
      <line x1="40" y1="120" x2="260" y2="120" stroke="var(--c-border)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="80" y1="20" x2="80" y2="120" stroke="var(--c-border)" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
      <line x1="220" y1="20" x2="220" y2="120" stroke="var(--c-border)" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />

      {/* Cross-hatching shading */}
      {[0, 6, 12, 18, 24, 30].map((offset) => (
        <line
          key={offset}
          x1={155 + offset}
          y1={50 + offset * 0.5}
          x2={135 + offset}
          y2={95 + offset * 0.5}
          stroke="var(--c-border)"
          strokeWidth="1"
          opacity="0.8"
        />
      ))}

      {/* Hand-drawn contour paths using framer-motion pathLength */}
      <motion.path
        d="M90 75 L150 40 L210 75 L150 110 Z"
        stroke="var(--c-accent)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M90 75 L90 100 L150 130 L150 110"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
      />
      <motion.path
        d="M210 75 L210 100 L150 130"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
      />

      {/* Gesture curve */}
      <motion.path
        d="M70 115 C 110 125, 190 105, 230 115"
        stroke="var(--c-accent)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="4 2"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
      />

      {/* Vertex nodes */}
      <circle cx="150" cy="40" r="2.5" fill="var(--c-accent)" />
      <circle cx="150" cy="110" r="2.5" fill="var(--c-accent)" />
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
    line: "I pull it off the flash and read it - hardcoded keys, debug shells, the usual sins in plaintext.",
    more: "Right now I'm building an ESP32 teardown: dump the flash over UART, run Binwalk, then read the auth check in Ghidra. Attack, evidence, fix - the whole loop most vendors skip.",
    link: { label: "github ↗", href: "https://github.com/AlcesOzdst" },
  },
  {
    tag: "horology", title: "Mechanical movements", graphic: <WatchMovement />,
    line: "Automatic calibers, balance springs, and the micro-mechanics of physical time.",
    more: "Before microcontrollers and silicon, computing was gear trains, hairsprings, and jewels. I love popping a caseback to watch a mechanical escapement beat at 28,800 vibrations per hour: pure analog logic running on tension with zero firmware.",
  },
  {
    tag: "sketching", title: "Ink & graphite", graphic: <SketchGraphic />,
    line: "Pencil sketches, cross-hatching, and observing how physical objects are built.",
    more: "When staring at binaries and terminals all day, sketching forces you to look at the physical world with real patience. Perspective, proportions, and mechanical structures: drawing something by hand is just another way of taking it apart to understand it.",
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
            Firmware teardowns, mechanical movements, and sketch studies. Tap a card to open it up.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
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
