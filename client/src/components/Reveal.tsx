import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, y = 26 }: Props) {
  const isServer = typeof window === "undefined";
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={isServer ? false : (reduce ? { opacity: 0 } : { opacity: 0, y })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
