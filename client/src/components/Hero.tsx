import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { ScopeTrace } from "@/components/ScopeTrace";

const EASE = [0.22, 1, 0.36, 1] as const;

const lines: { text: string; accent?: string }[] = [
  { text: "Take it apart." },
  { text: "See how it ", accent: "breaks." },
  { text: "Make it hold." },
];

export function Hero() {
  const reduce = useReducedMotion();

  // glow drifts toward the cursor
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const gxs = useSpring(gx, { stiffness: 60, damping: 20 });
  const gys = useSpring(gy, { stiffness: 60, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    gx.set(((e.clientX - r.left) / r.width - 0.5) * 120);
    gy.set(((e.clientY - r.top) / r.height - 0.5) * 120);
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } } };
  const lineV = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
  };
  const fade = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center overflow-hidden pt-20" onMouseMove={onMove}>
      <div className="gridlines" />
      <motion.div className="glow" style={{ width: 620, height: 620, top: -180, right: -140, x: gxs, y: gys }} />

      <div className="shell relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fade} className="flex items-center justify-between mb-9 md:mb-14">
            <span className="mono-label uppercase tracking-[0.18em]">Parth Doshi</span>
            <span className="mono-label uppercase tracking-[0.18em] hidden sm:inline">ECE · AI–ML / Pune, IN</span>
          </motion.div>

          <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.9]"
              style={{ fontSize: "clamp(2.6rem, 11vw, 8.5rem)" }}>
            {lines.map((l, i) => (
              <span key={i} className="line-mask">
                <motion.span variants={lineV} className="block will-change-transform">
                  {l.text}
                  {l.accent && <span className="accent">{l.accent}</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={fade} className="mt-8 md:mt-10 max-w-[46ch] text-base md:text-lg text-text-secondary leading-relaxed">
            I do security research on the hardware side — pulling firmware off embedded
            devices, reversing it to find how they fail, and rebuilding them to hold up.
            Third-year ECE student in Pune.
          </motion.p>

          <motion.div variants={fade} className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic><a href="#work" className="btn btn-solid" data-cursor="work">selected work</a></Magnetic>
              <Magnetic><a href="mailto:parthdoshi404@gmail.com" className="btn" data-cursor="email">email me</a></Magnetic>
            </div>
            <span className="mono-label inline-flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" /> open to internships · 2026–27
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* signal trace */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="shell relative z-10 w-full mt-12 md:mt-16"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="mono-label uppercase tracking-[0.2em]">signal · live</span>
          <span className="flex-1 h-px bg-border" />
          <span className="mono-label">ch1</span>
        </div>
        <ScopeTrace height={130} />
      </motion.div>
    </section>
  );
}
