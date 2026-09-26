import { useScrollReveal } from "@/lib/useScrollReveal";

export function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section-spacing border-t" ref={ref}>
      <div className="page-container">
        <p className="eyebrow mb-6 reveal" data-delay="0">03 / about</p>

        <div className="space-y-4 reveal" data-delay="60">
          <p className="text-text-secondary leading-[1.75]">
            Third-year ECE student specialising in AI&nbsp;&amp;&nbsp;ML at MIT-WPU, Pune. I
            come at security from the hardware side — reading a datasheet, soldering a test
            point, and following a signal from a pin into the firmware behind it.
          </p>

          <p className="text-text-secondary leading-[1.75]">
            I lead <span className="text-text">Hack-X</span>, our campus cybersecurity club —
            CTFs, workshops, breaking things constructively. Placed 2nd runner-up at
            HackMITWPU&#39;25 with team PARAM.
          </p>

          <p className="text-text-secondary leading-[1.75]">
            Away from the bench: slow loops around Baner and Aundh (always with a GPX
            logger), debate club, half-forgotten corners of Pune, and more chi-fi IEM
            reviews than anyone needs.
          </p>
        </div>
      </div>
    </section>
  );
}
