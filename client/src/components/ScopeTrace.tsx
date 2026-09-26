import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function ScopeTrace({ height = 140 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, t = 0, raf = 0;
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--c-accent").trim() || "#CDFB4A";

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const trace = (time: number) => {
      const mid = h / 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const p = x / w;
        const y =
          mid +
          Math.sin(p * 16 + time) * (h * 0.17) * Math.sin(p * 3 + time * 0.5) +
          Math.sin(p * 42 - time * 2) * (h * 0.04);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      // baseline
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      // soft glow pass
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 5;
      trace(t);
      ctx.stroke();
      // crisp trace
      ctx.globalAlpha = 0.95;
      ctx.lineWidth = 1.6;
      trace(t);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    if (reduce) {
      render();
    } else {
      const loop = () => { render(); t += 0.03; raf = requestAnimationFrame(loop); };
      loop();
    }

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduce]);

  return <canvas ref={ref} className="scope-canvas" style={{ height }} aria-hidden="true" />;
}
