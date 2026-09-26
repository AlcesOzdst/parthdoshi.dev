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
      getComputedStyle(document.documentElement).getPropertyValue("--c-accent").trim() || "#52E0C4";

    // interaction targets (freq / amplitude multipliers), smoothly approached
    let tgFreq = 1, tgAmp = 1, curFreq = 1, curAmp = 1, hover = 0, tgHover = 0;

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

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      tgFreq = 0.6 + px * 1.8;         // left = calm, right = busy
      tgAmp = 0.45 + (1 - py) * 1.5;   // bottom = flat, top = loud
      tgHover = 1;
    };
    const onLeave = () => { tgFreq = 1; tgAmp = 1; tgHover = 0; };

    if (!reduce) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    const trace = () => {
      const mid = h / 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const p = x / w;
        const y =
          mid +
          Math.sin(p * 16 * curFreq + t) * (h * 0.17 * curAmp) * Math.sin(p * 3 + t * 0.5) +
          Math.sin(p * 42 * curFreq - t * 2) * (h * 0.04 * curAmp);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
    };

    const render = () => {
      curFreq += (tgFreq - curFreq) * 0.08;
      curAmp += (tgAmp - curAmp) * 0.08;
      hover += (tgHover - hover) * 0.08;

      ctx.clearRect(0, 0, w, h);
      // baseline
      ctx.globalAlpha = 0.16; ctx.strokeStyle = accent; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
      // glow
      ctx.globalAlpha = 0.12 + hover * 0.12; ctx.lineWidth = 5; trace(); ctx.stroke();
      // crisp
      ctx.globalAlpha = 0.9 + hover * 0.1; ctx.lineWidth = 1.6 + hover * 0.6; trace(); ctx.stroke();
      // playhead dot when tuning
      if (hover > 0.02) {
        const p = 1;
        const y = h / 2 + Math.sin(16 * curFreq + t) * (h * 0.17 * curAmp) * Math.sin(3 + t * 0.5);
        ctx.globalAlpha = hover; ctx.fillStyle = accent;
        ctx.beginPath(); ctx.arc(w - 2, y, 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      t += 0.03;
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      const mid = h / 2; ctx.strokeStyle = accent; ctx.lineWidth = 1.6; trace(); ctx.stroke();
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return <canvas ref={ref} className="scope-canvas" style={{ height }} data-cursor="tune" aria-hidden="true" />;
}
