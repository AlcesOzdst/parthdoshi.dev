import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor]") as HTMLElement | null;
      if (t) { setActive(true); setLabel(t.getAttribute("data-cursor") || ""); }
      else { setActive(false); setLabel(""); }
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="cursor-root" aria-hidden="true">
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className={`cursor-ring${active ? " is-active" : ""}`} style={{ x: rx, y: ry }}>
        {label && <span className="cursor-label">{label}</span>}
      </motion.div>
    </div>
  );
}
