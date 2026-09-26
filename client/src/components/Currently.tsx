import { useScrollReveal } from "@/lib/useScrollReveal";

export function Currently() {
  const ref = useScrollReveal();

  return (
    <section className="pb-8" ref={ref}>
      <div className="page-container">
        <div className="entry entry-amber py-3 reveal" data-delay="0">
          <span className="mono-label block mb-1" style={{ color: "var(--c-amber)" }}>
            currently
          </span>
          <p className="text-sm text-text-secondary leading-relaxed">
            hunting IDORs, chasing GNSS packets, running slow miles in Baner
          </p>
        </div>
      </div>
    </section>
  );
}
