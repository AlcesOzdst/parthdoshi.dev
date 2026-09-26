import { Reveal } from "@/components/Reveal";

const items = [
  {
    tag: "Competition",
    metric: "2nd",
    unit: "runner-up",
    title: "HackMITWPU’25 CTF",
    detail: "Capture-the-flag, on-campus — with team PARAM.",
  },
  {
    tag: "Experience",
    metric: "R&D",
    unit: "intern",
    title: "Robotics & Innovation — PHN Technology",
    detail: "Embedded / IoT prototyping across research projects.",
  },
  {
    tag: "Leadership",
    metric: "Lead",
    unit: "Hack-X",
    title: "President, campus security club",
    detail: "Runs CTFs, workshops, hackathons, and recruitment.",
  },
  {
    tag: "Competing",
    metric: "4+",
    unit: "arenas",
    title: "Pentathon · DEFCON Pune · CyberVault · SIH",
    detail: "NCIIPC-AICTE Pentathon and other national & regional events.",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-spacing border-t border-border">
      <Reveal><p className="eyebrow mb-10">03 — Achievements</p></Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
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
