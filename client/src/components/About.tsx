import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="section-spacing border-t border-border relative">
      <div className="shell">
        <Reveal><p className="eyebrow mb-10">04 · Elsewhere</p></Reveal>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16">
          <div>
            <Reveal>
              <p className="display leading-[1.06]" style={{ fontSize: "clamp(1.7rem, 4vw, 3rem)" }}>
                I run <span className="italic-accent">Hack-X</span>, the security club at MIT-WPU.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-text-secondary leading-relaxed measure">
                We run CTFs, workshops, and the kind of hands-on laboratory sessions that turn
                a club into a team. I hosted an official competition track at HackMITWPU&rsquo;25,
                contributing to challenge execution. Beyond that, I study mechanical horology
                and pencil sketching, and I&rsquo;m a third-year ECE (AI&nbsp;·&nbsp;ML) student
                who just likes understanding how things actually work.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="card p-6 space-y-4">
              {[
                ["focus", "embedded & IoT security · firmware RE"],
                ["stack", "C · Python · ESP32 · Raspberry Pi"],
                ["ifaces", "UART · SPI · I²C · GPIO"],
                ["tools", "Ghidra · Binwalk · Wireshark · Burp"],
                ["based", "Pune, India"],
                ["status", "open to internships, 2026-2027"],
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
