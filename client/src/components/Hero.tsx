import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-20">
      <div className="gridlines" />
      <div className="glow" style={{ width: 560, height: 560, top: -160, right: -120 }} />

      <div className="shell relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* top id row */}
          <motion.div variants={item} className="flex items-center justify-between mb-10 md:mb-14">
            <span className="mono-label uppercase tracking-[0.18em]">Parth Doshi</span>
            <span className="mono-label uppercase tracking-[0.18em] hidden sm:inline">ECE · AI–ML / Pune, IN</span>
          </motion.div>

          {/* headline */}
          <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.92]"
              style={{ fontSize: "clamp(2.6rem, 11vw, 8.5rem)" }}>
            <motion.span variants={item} className="block">Take it apart.</motion.span>
            <motion.span variants={item} className="block">See how it <span className="accent">breaks</span>.</motion.span>
            <motion.span variants={item} className="block">Make it hold.</motion.span>
          </h1>

          {/* sub */}
          <motion.p variants={item} className="mt-8 md:mt-10 max-w-[46ch] text-base md:text-lg text-text-secondary leading-relaxed">
            I do security research on the hardware side — pulling firmware off embedded
            devices, reversing it to find how they fail, and rebuilding them to hold up.
            Third-year ECE student in Pune.
          </motion.p>

          {/* meta + CTAs */}
          <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <a href="#work" className="btn btn-solid">selected work</a>
              <a href="mailto:parthdoshi404@gmail.com" className="btn">email me</a>
            </div>
            <span className="mono-label inline-flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" /> open to internships · 2026–27
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="shell relative z-10 w-full mt-16 md:mt-20"
      >
        <div className="flex items-center gap-3 mono-label uppercase tracking-[0.2em]">
          <motion.span
            aria-hidden="true"
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >↓</motion.span>
          scroll
        </div>
      </motion.div>
    </section>
  );
}
