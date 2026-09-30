import { Reveal } from "@/components/Reveal";

const pillars = [
  {
    n: "01",
    title: "Firmware & Reverse Engineering",
    body: "Firmware extraction, static analysis, and binary inspection - plus controlled secure-boot research. Reading what a device is actually running.",
  },
  {
    n: "02",
    title: "Embedded & IoT Security",
    body: "The device-to-cloud attack surface: MQTT, TLS, OTA, credential storage, network behaviour. Attacked in a lab, then hardened and re-tested.",
  },
  {
    n: "03",
    title: "Hardware Interfaces",
    body: "UART, SPI, I²C and the physical attack surface - probed, captured, and documented with real hardware evidence.",
  },
];

export function Focus() {
  return (
    <section id="focus" className="section-spacing">
      <Reveal><p className="eyebrow mb-10">01 — Focus</p></Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.06}>
            <div className="card h-full p-6 md:p-7">
              <span className="mono-label accent block mb-4">{p.n}</span>
              <h3 className="display text-xl md:text-2xl leading-snug mb-3">{p.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
