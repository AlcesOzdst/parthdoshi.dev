import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { lazy, Suspense, useState, useEffect } from "react";

const ScopeTrace = lazy(() => import("@/components/ScopeTrace").then(m => ({ default: m.ScopeTrace })));

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ onOpenResume }: { onOpenResume?: () => void }) {
  const isServer = typeof window === "undefined";
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
  const line = { hidden: isServer ? { y: "0%" } : { y: "112%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } };
  const fade = { hidden: isServer ? { opacity: 1, y: 0 } : (reduce ? { opacity: 0 } : { opacity: 0, y: 18 }), show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

  return (
    <section id="top" className="min-h-[88vh] md:min-h-screen flex flex-col justify-center pt-16 md:pt-0">
      <motion.div variants={container} initial={isServer ? false : "hidden"} animate="show">
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
            <Magnetic><Link href="/resume" className="btn" data-cursor="resume">resume / cv ↗</Link></Magnetic>
          )}
          <Magnetic><a href="mailto:parthdoshi404@gmail.com" className="btn" data-cursor="say hi">get in touch</a></Magnetic>
          <Magnetic><Link href="/blog" className="btn" data-cursor="read">the log</Link></Magnetic>
        </motion.div>
      </motion.div>

      {/* signature signal minigame */}
      <motion.div variants={fade} initial={isServer ? false : "hidden"} animate="show"
        className="mt-14 md:mt-20 w-full">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="mono-label uppercase tracking-[0.2em] font-semibold">signal · ch1 [active intercept]</span>
          <span className="mono-label accent">interactive tuner &amp; demodulator minigame ↝</span>
        </div>
        {mounted ? (
          <Suspense fallback={<div className="h-[110px] w-full rounded border border-border/40 bg-surface/20" />}>
            <ScopeTrace height={110} />
          </Suspense>
        ) : (
          <div className="h-[110px] w-full rounded border border-border/40 bg-surface/20" />
        )}
      </motion.div>
    </section>
  );
}
