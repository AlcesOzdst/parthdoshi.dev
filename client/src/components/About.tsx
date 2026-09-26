import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="section-spacing border-t border-border relative">
      <div className="shell">
        <Reveal><p className="eyebrow mb-10">01 — About</p></Reveal>

        <div className="grid md:grid-cols-[1.6fr_1fr] gap-12 md:gap-16">
          {/* Statement */}
          <div>
            <Reveal>
              <p className="font-display font-semibold tracking-[-0.02em] leading-[1.15]"
                 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)" }}>
                I come at security from the <span className="accent">hardware side</span> —
                reading a datasheet, soldering a test point, and following a signal from a
                pin into the firmware behind it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-text-secondary leading-relaxed max-w-[52ch]">
                Third-year ECE (AI&nbsp;·&nbsp;ML) student at MIT-WPU. I lead <span className="text-text">Hack-X</span>,
                our campus security club — CTFs, workshops, breaking things constructively —
                and placed 2nd runner-up at HackMITWPU&rsquo;25 with team PARAM. Away from the
                bench: slow loops around Baner with a GPX logger, debate club, and more chi-fi
                IEM reviews than anyone needs.
              </p>
            </Reveal>
          </div>

          {/* Spec panel */}
          <Reveal delay={0.15}>
            <div className="border border-border rounded-sm p-6 bg-surface/30 space-y-4">
              {[
                ["focus", "embedded & IoT security · firmware RE"],
                ["stack", "C · Python · ESP32 · Raspberry Pi"],
                ["ifaces", "UART · SPI · I²C · GPIO"],
                ["tools", "Ghidra · Binwalk · Wireshark · Burp"],
                ["based", "Pune, India"],
                ["status", "open to internships, 2026–27"],
              ].map(([k, v]) => (
                <div key={k} className="spec-row items-baseline border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="spec-key">{k}</span>
                  <span className="text-text">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
