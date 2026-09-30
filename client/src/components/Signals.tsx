import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/* ── graphics ─────────────────────────────────────────────── */
const barrelTeeth = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);
const pinionTeeth = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
const poiseAngles = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];
const hairspringD = "M 2.1 1.2 L 1.9 1.8 L 1.5 2.5 L 0.9 3.0 L 0.1 3.3 L -0.9 3.4 L -1.8 3.3 L -2.8 2.9 L -3.6 2.1 L -4.3 1.2 L -4.7 0.0 L -4.7 -1.3 L -4.4 -2.6 L -3.8 -3.8 L -2.8 -4.8 L -1.5 -5.6 L 0.1 -6.0 L 1.7 -6.0 L 3.3 -5.6 L 4.8 -4.7 L 6.0 -3.3 L 6.9 -1.7 L 7.4 0.2 L 7.3 2.1 L 6.7 4.1 L 5.5 5.8 L 3.9 7.3 L 1.9 8.3 L -0.3 8.7 L -2.6 8.5 L -4.9 7.7 L -6.9 6.4 L -8.5 4.4 L -9.6 2.1 L -10.0 -0.5 L -9.8 -3.1 L -8.8 -5.7 L -7.2 -8.0 L -4.9 -9.8 L -2.3 -10.9 L 0.7 -11.4 L 3.7 -11.0 L 6.6 -9.9 L 9.1 -7.9 L 11.0 -5.4 L 12.3 -2.4 L 12.7 0.9 L 12.2 4.3 L 10.9 7.5 L 8.7 10.2 L 5.8 12.3";

function CaliberScrew({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={2.2} stroke="var(--c-border)" strokeWidth={0.9} fill="var(--c-bg)" />
      <line x1={cx - 1.5} y1={cy - 1.5} x2={cx + 1.5} y2={cy + 1.5} stroke="var(--c-border)" strokeWidth={0.7} />
    </g>
  );
}

function WatchMovement() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 300 140" className="w-full h-[110px]" fill="none" aria-hidden="true">
      {/* Symmetrical Caliber Flange & Chassis */}
      <rect x="10" y="8" width="280" height="124" rx="18" stroke="var(--c-border)" strokeWidth="1.2" opacity="0.35" fill="none" />
      <rect x="16" y="14" width="268" height="112" rx="14" stroke="var(--c-border)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.2" fill="none" />

      {/* Perimeter Mounting Screws */}
      <CaliberScrew cx={22} cy={20} />
      <CaliberScrew cx={150} cy={14} />
      <CaliberScrew cx={278} cy={20} />
      <CaliberScrew cx={278} cy={120} />
      <CaliberScrew cx={150} cy={126} />
      <CaliberScrew cx={22} cy={120} />

      {/* Symmetrical Structural Bridges (Arnold & Son 7-bridge architecture) */}
      {/* Left Horizontal Barrel Bridge */}
      <path d="M 18 64 L 62 67 L 72 70 L 62 73 L 18 76 Z" stroke="var(--c-border)" strokeWidth="1.5" fill="var(--c-bg)" />
      <CaliberScrew cx={26} cy={70} />

      {/* Right Horizontal Barrel Bridge */}
      <path d="M 282 64 L 238 67 L 228 70 L 238 73 L 282 76 Z" stroke="var(--c-border)" strokeWidth="1.5" fill="var(--c-bg)" />
      <CaliberScrew cx={274} cy={70} />

      {/* Diagonal Top Bridges */}
      <path d="M 45 16 L 85 45 M 255 16 L 215 45" stroke="var(--c-border)" strokeWidth="1.2" opacity="0.45" />
      <CaliberScrew cx={45} cy={16} />
      <CaliberScrew cx={255} cy={16} />

      {/* Upper Escapement Bridge */}
      <path d="M 136 34 L 150 26 L 164 34" stroke="var(--c-border)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <CaliberScrew cx={150} cy={26} />

      {/* Left Twin Barrel (cx: 72, cy: 70, r: 28) */}
      <g transform="translate(72, 70)">
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="28s"
              repeatCount="indefinite"
            />
          )}
          <circle cx="0" cy="0" r="28" stroke="var(--c-border)" strokeWidth="1.4" fill="none" />
          <circle cx="0" cy="0" r="23" stroke="var(--c-border)" strokeWidth="0.8" opacity="0.5" fill="none" />
          {barrelTeeth.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={27 * Math.cos(rad)}
                y1={27 * Math.sin(rad)}
                x2={30.5 * Math.cos(rad)}
                y2={30.5 * Math.sin(rad)}
                stroke="var(--c-border)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            );
          })}
          {[0, 72, 144, 216, 288].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={15 * Math.cos(rad)}
                cy={15 * Math.sin(rad)}
                r="4.8"
                stroke="var(--c-border)"
                strokeWidth="1"
                fill="none"
              />
            );
          })}
          <circle cx="0" cy="0" r="7" stroke="var(--c-border)" strokeWidth="0.8" opacity="0.6" fill="none" />
          <circle cx="0" cy="0" r="4.5" stroke="#D4AF37" strokeWidth="1" fill="var(--c-bg)" />
          <circle cx="0" cy="0" r="2.6" fill="#E5484D" />
        </g>
      </g>

      {/* Right Twin Barrel (cx: 228, cy: 70, r: 28) */}
      <g transform="translate(228, 70)">
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="-360"
              dur="28s"
              repeatCount="indefinite"
            />
          )}
          <circle cx="0" cy="0" r="28" stroke="var(--c-border)" strokeWidth="1.4" fill="none" />
          <circle cx="0" cy="0" r="23" stroke="var(--c-border)" strokeWidth="0.8" opacity="0.5" fill="none" />
          {barrelTeeth.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={27 * Math.cos(rad)}
                y1={27 * Math.sin(rad)}
                x2={30.5 * Math.cos(rad)}
                y2={30.5 * Math.sin(rad)}
                stroke="var(--c-border)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            );
          })}
          {[0, 72, 144, 216, 288].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={15 * Math.cos(rad)}
                cy={15 * Math.sin(rad)}
                r="4.8"
                stroke="var(--c-border)"
                strokeWidth="1"
                fill="none"
              />
            );
          })}
          <circle cx="0" cy="0" r="7" stroke="var(--c-border)" strokeWidth="0.8" opacity="0.6" fill="none" />
          <circle cx="0" cy="0" r="4.5" stroke="#D4AF37" strokeWidth="1" fill="var(--c-bg)" />
          <circle cx="0" cy="0" r="2.6" fill="#E5484D" />
        </g>
      </g>

      {/* Left Transmission Pinion (cx: 114, cy: 70, r: 14) */}
      <g transform="translate(114, 70)">
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="-360"
              dur="14s"
              repeatCount="indefinite"
            />
          )}
          <circle cx="0" cy="0" r="14" stroke="var(--c-border)" strokeWidth="1.2" fill="none" />
          {pinionTeeth.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={13 * Math.cos(rad)}
                y1={13 * Math.sin(rad)}
                x2={15.5 * Math.cos(rad)}
                y2={15.5 * Math.sin(rad)}
                stroke="var(--c-border)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            );
          })}
          {[0, 90, 180, 270].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={13 * Math.cos((deg * Math.PI) / 180)}
              y2={13 * Math.sin((deg * Math.PI) / 180)}
              stroke="var(--c-border)"
              strokeWidth="0.9"
            />
          ))}
          <circle cx="0" cy="0" r="2.2" fill="#E5484D" />
        </g>
      </g>

      {/* Right Transmission Pinion (cx: 186, cy: 70, r: 14) */}
      <g transform="translate(186, 70)">
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="14s"
              repeatCount="indefinite"
            />
          )}
          <circle cx="0" cy="0" r="14" stroke="var(--c-border)" strokeWidth="1.2" fill="none" />
          {pinionTeeth.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={13 * Math.cos(rad)}
                y1={13 * Math.sin(rad)}
                x2={15.5 * Math.cos(rad)}
                y2={15.5 * Math.sin(rad)}
                stroke="var(--c-border)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            );
          })}
          {[0, 90, 180, 270].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={13 * Math.cos((deg * Math.PI) / 180)}
              y2={13 * Math.sin((deg * Math.PI) / 180)}
              stroke="var(--c-border)"
              strokeWidth="0.9"
            />
          ))}
          <circle cx="0" cy="0" r="2.2" fill="#E5484D" />
        </g>
      </g>

      {/* Pallet Fork / Anchor (pivot cx: 150, cy: 48) */}
      <g transform="translate(150, 48)">
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-8; 8; -8"
              keyTimes="0; 0.5; 1"
              dur="0.42s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          )}
          <circle cx="0" cy="0" r="1.8" fill="var(--c-border)" />
          <path d="M 0 0 L -8 7 M 0 0 L 8 7 M 0 0 L 0 14" stroke="var(--c-border)" strokeWidth="1.3" strokeLinecap="round" />
          <rect x="-9.5" y="6" width="3" height="3" rx="0.5" fill="#E5484D" />
          <rect x="6.5" y="6" width="3" height="3" rx="0.5" fill="#E5484D" />
          <path d="M -2.5 12 L 0 14.5 L 2.5 12" stroke="var(--c-border)" strokeWidth="1" fill="none" />
        </g>
      </g>

      {/* Central Grand Balance Wheel (cx: 150, cy: 70, r: 26) - The Ticking Heart */}
      <g transform="translate(150, 70)">
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-38; 38; -38"
              keyTimes="0; 0.5; 1"
              dur="0.42s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          )}
          <circle cx="0" cy="0" r="26" stroke="var(--c-accent)" strokeWidth="1.8" fill="none" />
          <circle cx="0" cy="0" r="23" stroke="var(--c-accent)" strokeWidth="0.8" opacity="0.4" fill="none" />

          {/* Microstella poise adjustment weights */}
          {poiseAngles.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={26 * Math.cos(rad)}
                cy={26 * Math.sin(rad)}
                r="1.1"
                fill="#D4AF37"
              />
            );
          })}

          {/* 3 curved sweeping spokes (NO CROSSHAIRS / NO RETICLE) */}
          <path d="M 5 0 Q 14 5 25 7" stroke="var(--c-accent)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M -2.5 4.3 Q -3 15 -19 16" stroke="var(--c-accent)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M -2.5 -4.3 Q -12 -10 -15 -20" stroke="var(--c-accent)" strokeWidth="1.4" strokeLinecap="round" fill="none" />

          {/* Coiled Breguet Hairspring */}
          <path
            d={hairspringD}
            stroke="var(--c-accent)"
            strokeWidth="0.85"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* Impulse roller ruby pin */}
          <circle cx="0" cy="-6" r="1.4" fill="#E5484D" />
        </g>
      </g>

      {/* Central Triangular Balance Cock (Suspension Bridge) */}
      <path d="M 130 118 L 150 70 L 170 118" stroke="var(--c-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 137 114 L 150 79 L 163 114" stroke="var(--c-border)" strokeWidth="1" opacity="0.5" fill="none" />
      <CaliberScrew cx={130} cy={118} />
      <CaliberScrew cx={170} cy={118} />

      {/* Top Incabloc Shock Setting holding the balance staff */}
      <circle cx="150" cy="70" r="5.5" stroke="#D4AF37" strokeWidth="1.2" fill="var(--c-bg)" />
      <circle cx="150" cy="70" r="3.2" fill="#E5484D" />
      <path
        d="M 148 68 C 148.5 66.5, 151.5 66.5, 152 68 C 152.5 70, 151 72, 150 72.5 C 149 72, 147.5 70, 148 68"
        stroke="#D4AF37"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Horological Text Engravings */}
      <text x="150" y="132" textAnchor="middle" fill="var(--c-text-secondary)" opacity="0.5" className="font-mono text-[7px] uppercase tracking-[0.22em]">
        ARNOLD &amp; SON INSPIRATION · CAL. A&amp;S5201 · TWIN BARREL · 28,800 VPH
      </text>
      <text x="150" y="24" textAnchor="middle" fill="var(--c-text-secondary)" opacity="0.4" className="font-mono text-[6.5px] uppercase tracking-[0.18em]">
        HAUTE HORLOGERIE SKELETON
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
    line: "Symmetrical skeleton calibers, twin barrels, and the micro-mechanics of physical time.",
    more: "Before microcontrollers and silicon, computing was gear trains, hairsprings, and jewels. Inspired by Swiss haute horlogerie like Arnold & Son's symmetrical skeleton calibers: twin mainspring barrels, radiating bridges, and an escapement beating at 28,800 vibrations per hour - pure analog logic running on tension with zero firmware.",
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
