import { Link } from "wouter";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Hero() {
  const ref = useScrollReveal();

  return (
    <section className="pt-16 md:pt-24 pb-10" ref={ref}>
      <div className="page-container">
        {/* ID line — the datasheet header */}
        <p className="mono-label mb-6 reveal" data-delay="0">
          PARTH DOSHI &nbsp;//&nbsp; EMBEDDED · SECURITY
        </p>

        {/* Headline */}
        <h1
          className="text-[1.9rem] sm:text-[2.4rem] md:text-[2.75rem] font-semibold tracking-tight mb-5 reveal max-w-[600px]"
          style={{ lineHeight: 1.08 }}
          data-delay="60"
        >
          I build embedded systems — then take them apart to see how they break.
        </h1>

        <p
          className="text-text-secondary leading-relaxed max-w-[480px] mb-8 reveal"
          data-delay="120"
        >
          Third-year ECE (AI&nbsp;·&nbsp;ML) student in Pune. Firmware, radios, and the
          interfaces in between — UART, SPI, I²C. I do security research on the hardware
          side and write down what I find.
        </p>

        {/* Spec block */}
        <div className="space-y-1.5 mb-8 reveal" data-delay="160">
          <div className="spec-row">
            <span className="spec-key">focus</span>
            <span>embedded &amp; IoT security · firmware analysis · reverse engineering</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">stack</span>
            <span>C · Python · ESP32 · Raspberry&nbsp;Pi · UART/SPI/I²C</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">based</span>
            <span>Pune, India</span>
          </div>
        </div>

        {/* Status */}
        <p className="mono-label mb-7 reveal flex items-center gap-2" data-delay="200" style={{ fontSize: "0.75rem" }}>
          <span className="status-dot" aria-hidden="true" />
          open to embedded / IoT security internships · 2026–27
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 reveal" data-delay="240">
          <Link href="/blog" className="btn-pill btn-pill-primary">
            Read the writeups
          </Link>
          <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="bracket-link">github</a>
          <a href="mailto:parthdoshi404@gmail.com" className="bracket-link">email</a>
          <a href="https://linkedin.com/in/parthdoshi404" target="_blank" rel="noreferrer" className="bracket-link">linkedin</a>
        </div>
      </div>
    </section>
  );
}
