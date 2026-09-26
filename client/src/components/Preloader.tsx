import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) { setDone(true); return; }
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.floor(Math.random() * 9) + 4);
      setCount(n);
      if (n >= 100) { clearInterval(id); setTimeout(() => setDone(true), 400); }
    }, 90);
    const safety = setTimeout(() => setDone(true), 3600); // never trap the page
    return () => { clearInterval(id); clearTimeout(safety); };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="mono-label" style={{ letterSpacing: "0.24em" }}>INITIALISING SIGNAL</span>
          <div className="preloader__count font-display">{String(count).padStart(3, "0")}</div>
          <div className="preloader__bar"><span style={{ transform: `scaleX(${count / 100})` }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
