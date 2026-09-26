import { useEffect, useRef } from "react";

/**
 * Observes all `.reveal` elements within a container and adds
 * `.revealed` when they scroll into view.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref}> ... <div className="reveal"> ... </div> </div>
 *
 * For staggered reveals, set `data-delay="120"` (ms) on each child.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Immediately reveal everything
      const els = containerRef.current?.querySelectorAll(".reveal");
      els?.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay || "0", 10);
            if (delay > 0) {
              setTimeout(() => el.classList.add("revealed"), delay);
            } else {
              el.classList.add("revealed");
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const els = containerRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
