import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const gxs = useSpring(gx, { stiffness: 60, damping: 20 });
  const gys = useSpring(gy, { stiffness: 60, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    gx.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    gy.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
  const line = { hidden: { y: "112%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } };
  const fade = { hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-24" onMouseMove={onMove}>
      <motion.div className="glow" style={{ width: 620, height: 620, top: -160, right: -120, x: gxs, y: gys }} />

      <div className="shell relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fade} className="flex items-center justify-between mb-10">
            <span className="mono-label uppercase tracking-[0.18em]">Parth Doshi</span>
            <span className="mono-label uppercase tracking-[0.18em] hidden sm:inline">Pune, India · ECE (AI–ML)</span>
          </motion.div>

          <h1 className="display" style={{ fontSize: "clamp(2.9rem, 10vw, 7.5rem)" }}>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={line} className="block will-change-transform">I take things apart</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={line} className="block will-change-transform">
                to <span className="italic-accent">understand</span> them.
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fade} className="mt-9 measure text-base md:text-lg text-text-secondary leading-relaxed">
            Firmware and radios, sure — but also a city on foot with a GPS logger, a stack of
            chi-fi IEMs, and the odd bad argument in debate club. I'm a third-year ECE student
            in Pune doing security research on the hardware side.
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic><a href="#work" className="btn btn-solid" data-cursor="see">what I've built</a></Magnetic>
              <Magnetic><a href="mailto:parthdoshi404@gmail.com" className="btn" data-cursor="say hi">get in touch</a></Magnetic>
            </div>
            <span className="mono-label inline-flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" /> open to internships · 2026–27
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
        className="shell relative z-10 w-full mt-16">
        <div className="flex items-center gap-3 mono-label uppercase tracking-[0.2em]">
          <motion.span aria-hidden="true" animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>↓</motion.span>
          keep reading
        </div>
      </motion.div>
    </section>
  );
}
