import { useScrollReveal } from "@/lib/useScrollReveal";

export function Hero() {
  const ref = useScrollReveal();

  return (
    <section className="pt-20 md:pt-32 pb-12 md:pb-16" ref={ref}>
      <div className="page-container">
        {/* Location — tiny, quiet */}
        <p className="mono-label mb-8 reveal" data-delay="0">
          Pune, India
        </p>

        {/* Headline — Fraunces with wonk gives this real personality */}
        <h1
          className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-serif font-bold tracking-tight mb-5 reveal max-w-[520px]"
          style={{ lineHeight: 1.15 }}
          data-delay="60"
        >
          I hunt bugs, build small things, and write it all down.
        </h1>

        {/* Subtext — deliberate line length */}
        <p
          className="text-text-secondary leading-relaxed max-w-[420px] mb-8 reveal"
          data-delay="120"
        >
          Security research, embedded systems, and the odd side project
          — a running log more than a resume.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 reveal" data-delay="180">
          <a href="#research" className="btn-pill btn-pill-primary">
            Read my findings
          </a>
          <a
            href="mailto:parthdoshi404@gmail.com"
            className="btn-pill btn-pill-secondary"
          >
            Say hi ↗
          </a>
        </div>
      </div>
    </section>
  );
}
