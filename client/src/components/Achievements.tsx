import { Reveal } from "@/components/Reveal";

const items = [
  {
    tag: "AI Security",
    metric: "Top",
    unit: "finalist",
    title: "Smart India Hackathon (SIH 2025)",
    detail: "Project Omnis - AI-driven threat prediction and attack path forecasting with a 94% true-positive rate.",
  },
  {
    tag: "Firmware",
    metric: "RE",
    unit: "research",
    title: "Firmware Reverse Engineering",
    detail: "Investigating firmware extraction, static analysis and binary inspection with tools including Binwalk and Ghidra."
  },
  {
    tag: "Cybersecurity",
    metric: "CTF",
    unit: "host",
    title: "HackMITWPU'25 Track Host",
    detail: "Hosted a track at HackMITWPU'25, contributing to the execution of a campus cybersecurity competition rather than competing for the result."
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-spacing">
      <Reveal><h2 className="eyebrow mb-10">06 · Achievements &amp; Recognition</h2></Reveal>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((a, i) => (
          <Reveal key={a.tag} delay={i * 0.06}>
            <div className="card h-full p-6 md:p-7 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <span className="mono-label uppercase tracking-[0.16em]">{a.tag}</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="display accent leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}>{a.metric}</span>
                <span className="mono-label">{a.unit}</span>
              </div>
              <h3 className="display text-xl md:text-2xl leading-snug mb-1.5">{a.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mt-auto">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
