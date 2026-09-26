import { useScrollReveal } from "@/lib/useScrollReveal";

export function Currently() {
  const ref = useScrollReveal();

  return (
    <section className="pb-10" ref={ref}>
      <div className="page-container">
        <div className="reveal border-t border-b py-3 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4" data-delay="0">
          <span className="mono-label uppercase tracking-[0.14em] flex-shrink-0" style={{ color: "var(--c-accent)" }}>
            // currently
          </span>
          <p className="text-sm text-text-secondary leading-relaxed">
            reversing ESP32 firmware, parsing GNSS packets over UART, and prepping the
            next CTF — plus slow miles around Baner.
          </p>
        </div>
      </div>
    </section>
  );
}
