import { Reveal } from "@/components/Reveal";

const rows = [
  { role: "President / Technical Lead", org: "Hack-X · MIT-WPU", detail: "CTFs, workshops, hackathons, recruitment" },
  { role: "2nd runner-up", org: "HackMITWPU'25 CTF · team PARAM", detail: "capture-the-flag, on-campus" },
  { role: "Robotics & Innovation Intern", org: "PHN Technology Pvt. Ltd.", detail: "embedded / IoT R&D" },
  { role: "Competed", org: "NCIIPC-AICTE Pentathon · DEFCON Pune · CyberVault Connect · SIH", detail: "national & regional" },
];

export function Experience() {
  return (
    <section id="experience" className="section-spacing border-t border-border">
      <Reveal><p className="eyebrow mb-10">Experience &amp; community</p></Reveal>

      <div className="border-t border-border">
        {rows.map((r, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-1 md:gap-8 py-6 border-b border-border">
              <span className="display text-xl md:text-2xl leading-tight">{r.role}</span>
              <span className="text-sm text-text-secondary self-center">{r.org}</span>
              <span className="mono-label self-center md:text-right">{r.detail}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
