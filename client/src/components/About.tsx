import { useScrollReveal } from "@/lib/useScrollReveal";

export function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section-spacing" ref={ref}>
      <div className="page-container">
        <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mb-6 reveal" data-delay="0">
          About
        </h2>

        <div className="space-y-4 reveal" data-delay="60">
          <p className="text-text-secondary leading-[1.75]">
            Third-year ECE student specialising in AI & ML at MIT-WPU, Pune.
            Most of my time goes to security research — finding logic flaws
            in web apps, poking at smart contracts, and occasionally soldering
            things that talk over UART.
          </p>

          <p className="text-text-secondary leading-[1.75]">
            I run <span className="text-text">Hack-X</span>, our campus
            cybersecurity club. CTFs, workshops, breaking things constructively.
          </p>

          <p className="text-text-secondary leading-[1.75]">
            Outside the terminal: slow loops around Baner and Aundh (always
            with a GPX logger), philosophy in debate club, half-forgotten
            corners of Pune, and too many chi-fi IEM reviews I don't need.
          </p>
        </div>
      </div>
    </section>
  );
}
