import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/* ── graphics ─────────────────────────────────────────────── */
const cwAngles = [0, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270, 288, 306, 324, 342];
const twAngles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];
const escAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const poiseAngles = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];
const balSpokes = [
  "M 250.0 70.0 Q 262.5 73.5 272.5 84.0",
  "M 241.0 75.2 Q 231.8 84.2 218.0 87.5",
  "M 241.0 64.8 Q 237.7 52.0 241.5 38.5",
];
const hairspringD = "M 244.5 69.7 L 244.2 70.5 L 243.6 71.2 L 242.8 71.7 L 241.9 72.0 L 240.8 72.1 L 239.7 71.9 L 238.6 71.3 L 237.7 70.5 L 237.0 69.4 L 236.5 68.2 L 236.4 66.7 L 236.7 65.3 L 237.4 63.9 L 238.4 62.7 L 239.8 61.7 L 241.4 61.1 L 243.1 61.0 L 244.9 61.2 L 246.7 62.0 L 248.2 63.2 L 249.4 64.8 L 250.2 66.7 L 250.5 68.8 L 250.3 71.0 L 249.5 73.1 L 248.1 75.0 L 246.3 76.5 L 244.1 77.5 L 241.7 78.0 L 239.1 77.8 L 236.6 77.0 L 234.4 75.5 L 232.6 73.5 L 231.2 71.1 L 230.6 68.3 L 230.6 65.4 L 231.4 62.6 L 232.9 59.9 L 235.1 57.7 L 237.8 56.1 L 240.8 55.2 L 244.1 55.1 L 247.3 55.8 L 250.4 57.3 L 252.9 59.6 L 254.9 62.5 L 256.1 65.8 L 256.5 69.4 L 255.9 73.0 L 254.4 76.5 L 252.0 79.5 L 249.0 81.8 L 245.4 83.4 L 241.4 84.0 L 237.4 83.5 L 233.6 82.1 L 230.2 79.8 L 227.4 76.6 L 225.5 72.7 L 224.6 68.5";

function CaliberScrew({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={2.4} stroke="var(--c-border)" strokeWidth={1} fill="var(--c-bg)" />
      <line x1={cx - 1.6} y1={cy - 1.6} x2={cx + 1.6} y2={cy + 1.6} stroke="var(--c-border)" strokeWidth={0.8} />
    </g>
  );
}

function WatchMovement() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 300 140" className="w-full h-[110px]" fill="none" aria-hidden="true">
      {/* Skeleton caliber plates & bridges */}
      <path
        d="M 25 35 C 50 18, 120 18, 180 24 C 230 20, 275 35, 285 70 C 290 100, 260 122, 200 122 C 140 122, 60 124, 25 95 C 15 75, 15 50, 25 35 Z"
        stroke="var(--c-border)"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.35"
      />
      <path
        d="M 40 45 C 65 32, 105 32, 142 42 C 160 48, 180 58, 198 56"
        stroke="var(--c-border)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <CaliberScrew cx={40} cy={45} />
      <CaliberScrew cx={142} cy={42} />
      <CaliberScrew cx={52} cy={98} />

      {/* Drive / Center Wheel (cx: 72, cy: 70) */}
      <motion.g
        style={{ originX: "72px", originY: "70px" }}
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      >
        <circle cx="72" cy="70" r="31.5" stroke="var(--c-border)" strokeWidth="1.5" />
        <circle cx="72" cy="70" r="26" stroke="var(--c-border)" strokeWidth="0.8" opacity="0.6" />
        {cwAngles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={72 + 31.5 * Math.cos(rad)}
              y1={70 + 31.5 * Math.sin(rad)}
              x2={72 + 35.5 * Math.cos(rad)}
              y2={70 + 35.5 * Math.sin(rad)}
              stroke="var(--c-border)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          );
        })}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={72 + 16 * Math.cos(rad)}
              cy={70 + 16 * Math.sin(rad)}
              r="4.8"
              stroke="var(--c-border)"
              strokeWidth="1"
              fill="none"
            />
          );
        })}
        <circle cx="72" cy="70" r="5.5" stroke="var(--c-border)" strokeWidth="1" fill="var(--c-bg)" />
        <line x1="69.5" y1="67.5" x2="74.5" y2="72.5" stroke="var(--c-border)" strokeWidth="0.9" />
      </motion.g>

      {/* Third Wheel (cx: 128, cy: 62) - Meshes with Center Wheel */}
      <motion.g
        style={{ originX: "128px", originY: "62px" }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        <circle cx="128" cy="62" r="21.5" stroke="var(--c-border)" strokeWidth="1.4" />
        <circle cx="128" cy="62" r="16.5" stroke="var(--c-border)" strokeWidth="0.8" opacity="0.6" />
        {twAngles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={128 + 21.5 * Math.cos(rad)}
              y1={62 + 21.5 * Math.sin(rad)}
              x2={128 + 25.0 * Math.cos(rad)}
              y2={62 + 25.0 * Math.sin(rad)}
              stroke="var(--c-border)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          );
        })}
        {[0, 90, 180, 270].map((deg) => {
          const rad0 = (deg * Math.PI) / 180;
          const rad1 = ((deg + 20) * Math.PI) / 180;
          return (
            <path
              key={deg}
              d={`M ${128 + 6 * Math.cos(rad0)} ${62 + 6 * Math.sin(rad0)} Q ${128 + 12 * Math.cos(rad1)} ${62 + 12 * Math.sin(rad1)} ${128 + 21.5 * Math.cos(rad1)} ${62 + 21.5 * Math.sin(rad1)}`}
              stroke="var(--c-border)"
              strokeWidth="1"
              fill="none"
            />
          );
        })}
        <circle cx="128" cy="62" r="5" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <circle cx="128" cy="62" r="3.2" fill="#E5484D" />
      </motion.g>

      {/* Escape Wheel (cx: 174, cy: 76) - Swiss club teeth */}
      <motion.g
        style={{ originX: "174px", originY: "76px" }}
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "linear" }}
      >
        <circle cx="174" cy="76" r="14" stroke="var(--c-border)" strokeWidth="1.2" />
        {escAngles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const radClub = rad + 0.22;
          const x1 = 174 + 13 * Math.cos(rad);
          const y1 = 76 + 13 * Math.sin(rad);
          const x2 = 174 + 17.5 * Math.cos(rad);
          const y2 = 76 + 17.5 * Math.sin(rad);
          const x3 = 174 + 18.5 * Math.cos(radClub);
          const y3 = 76 + 18.5 * Math.sin(radClub);
          return (
            <path
              key={deg}
              d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`}
              stroke="var(--c-border)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          );
        })}
        <circle cx="174" cy="76" r="2.4" fill="#E5484D" />
      </motion.g>

      {/* Swiss Pallet Fork (pivot cx: 198, cy: 56) */}
      <motion.g
        style={{ originX: "198px", originY: "56px" }}
        animate={reduce ? {} : { rotate: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 0.42, ease: "easeInOut" }}
      >
        <circle cx="198" cy="56" r="2" fill="var(--c-border)" />
        <path
          d="M 198 56 L 186 64 M 198 56 L 192 72 M 198 56 L 217 64"
          stroke="var(--c-border)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <rect x="184" y="62.5" width="3" height="4" rx="0.5" fill="#E5484D" />
        <rect x="190.5" y="70" width="3" height="4" rx="0.5" fill="#E5484D" />
        <path d="M 215 62 L 218.5 64 L 215 66" stroke="var(--c-border)" strokeWidth="1.2" fill="none" />
      </motion.g>

      {/* Balance Wheel (cx: 244, cy: 70) - The Ticking Heart */}
      <motion.g
        style={{ originX: "244px", originY: "70px" }}
        animate={reduce ? {} : { rotate: [-40, 40, -40] }}
        transition={{ repeat: Infinity, duration: 0.42, ease: "easeInOut" }}
      >
        <circle cx="244" cy="70" r="34" stroke="var(--c-accent)" strokeWidth="1.8" />
        <circle cx="244" cy="70" r="31" stroke="var(--c-accent)" strokeWidth="0.8" opacity="0.4" />

        {/* Microstella poise adjustment weights */}
        {poiseAngles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={244 + 34 * Math.cos(rad)}
              cy={70 + 34 * Math.sin(rad)}
              r="1.2"
              fill="#D4AF37"
            />
          );
        })}

        {/* 3 curved sweeping spokes */}
        {balSpokes.map((d, i) => (
          <path key={i} d={d} stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        ))}

        {/* Coiled Breguet Hairspring */}
        <path
          d={hairspringD}
          stroke="var(--c-accent)"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* Impulse roller ruby pin */}
        <circle cx="236.5" cy="69" r="1.5" fill="#E5484D" />
      </motion.g>

      {/* Balance Cock & Incabloc Shock Setting */}
      <path
        d="M 188 24 C 210 22, 234 42, 244 70"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
        fill="none"
      />
      <CaliberScrew cx={188} cy={24} />

      <circle cx="244" cy="70" r="6" stroke="#D4AF37" strokeWidth="1.2" fill="var(--c-bg)" />
      <circle cx="244" cy="70" r="3.4" fill="#E5484D" />
      <path
        d="M 241.5 68 C 242 66.5, 246 66.5, 246.5 68 C 247 70, 245 72.5, 244 73 C 243 72.5, 241 70, 241.5 68"
        stroke="#D4AF37"
        strokeWidth="0.8"
        fill="none"
      />

      {/* Swiss Caliber Engravings */}
      <text x="18" y="132" fill="var(--c-text-secondary)" opacity="0.45" className="font-mono text-[7px] uppercase tracking-[0.2em]">
        CAL. 2824-2 · 28,800 VPH · 25 JEWELS
      </text>
      <text x="244" y="24" textAnchor="middle" fill="var(--c-text-secondary)" opacity="0.4" className="font-mono text-[6.5px] uppercase tracking-[0.16em]">
        GLUCYDUR · INCABLOC
      </text>
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
