import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { ScopeTrace } from "@/components/ScopeTrace";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ onOpenResume }: { onOpenResume?: () => void }) {
  const reduce = useReducedMotion();
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
  const line = { hidden: { y: "112%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } };
  const fade = { hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

  return (
    <section id="top" className="min-h-[88vh] md:min-h-screen flex flex-col justify-center pt-16 md:pt-0">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p variants={fade} className="eyebrow mb-8">Embedded &amp; IoT security · in training</motion.p>

        <h1 className="display" style={{ fontSize: "clamp(2.7rem, 8vw, 6rem)" }}>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={line} className="block will-change-transform">I take things apart</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={line} className="block will-change-transform">
              to <span className="italic-accent">understand</span> them.
            </motion.span>
          </span>
        </h1>

        <motion.p variants={fade} className="mt-8 measure text-base md:text-lg text-text-secondary leading-relaxed">
          Embedded &amp; IoT security on the hardware side - I pull firmware off devices, follow the
          signal from a pin into the binary, and document how they break and how to fix them. ECE (AI&nbsp;·&nbsp;ML)
          student at MIT-WPU, Pune. (The teardowns, horology and sketching live further down.)
        </motion.p>

        <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic><a href="#work" className="btn btn-solid" data-cursor="see">the work</a></Magnetic>
          {onOpenResume ? (
            <Magnetic><button onClick={onOpenResume} className="btn" data-cursor="resume">resume / cv ↗</button></Magnetic>
          ) : (
            <Magnetic><Link href="/resume"><a className="btn" data-cursor="resume">resume / cv ↗</a></Link></Magnetic>
          )}
          <Magnetic><a href="mailto:parthdoshi404@gmail.com" className="btn" data-cursor="say hi">get in touch</a></Magnetic>
          <Magnetic><Link href="/blog"><a className="btn" data-cursor="read">the log</a></Link></Magnetic>
        </motion.div>
      </motion.div>

      {/* signature signal minigame */}
      <motion.div variants={fade} initial="hidden" animate="show"
        className="mt-14 md:mt-20 w-full">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="mono-label uppercase tracking-[0.2em] font-semibold">signal · ch1 [active intercept]</span>
          <span className="mono-label accent">interactive tuner &amp; demodulator minigame ↝</span>
        </div>
        <ScopeTrace height={110} />
      </motion.div>
    </section>
  );
}
