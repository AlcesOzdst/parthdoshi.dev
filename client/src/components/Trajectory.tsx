import { Reveal } from "@/components/Reveal";

const roadmap = [
  ["now", "firmware RE · flash extraction · static analysis (Ghidra, Binwalk)"],
  ["next", "hardware-interface analysis · secure boot · signed images · JTAG/SWD"],
  ["goal", "product & firmware security research"],
];

export function Trajectory() {
  return (
    <section id="now" className="section-spacing border-t border-border">
      <Reveal><p className="eyebrow mb-8">04 — Where I&rsquo;m headed</p></Reveal>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16">
        <div>
          <Reveal>
            <p className="display leading-[1.06]" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Toward <span className="italic-accent">embedded &amp; hardware</span> security research.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-text-secondary leading-relaxed measure">
              The plan is specific: get fluent enough with firmware and hardware that I can take a
              real device apart, find where it fails, and prove it. I&rsquo;m building it in public —
              one teardown and writeup at a time — and pointing it at product-security teams working
              on the devices most people never think to question.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="card p-6 space-y-5">
            {roadmap.map(([k, v]) => (
              <div key={k} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <span className="mono-label uppercase tracking-[0.16em] accent block mb-1.5">{k}</span>
                <span className="text-sm text-text leading-snug">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
