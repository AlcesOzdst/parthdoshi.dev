import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ScopeTrace } from "@/components/ScopeTrace";

/* ── A GPS running route (SVG, draws on view) ─────────────── */
function RouteLine() {
  const reduce = useReducedMotion();
  const d = "M6 118 C 40 40, 66 150, 98 96 S 150 30, 176 84 S 210 150, 236 78 S 276 44, 296 66";
  return (
    <svg viewBox="0 0 300 150" className="w-full h-[110px]" fill="none" aria-hidden="true">
      <motion.path
        d={d} stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      <circle cx="6" cy="118" r="4" fill="var(--c-accent)" />
      <circle cx="296" cy="66" r="4" fill="none" stroke="var(--c-accent)" strokeWidth="2" />
    </svg>
  );
}

/* ── An IEM frequency-response curve ──────────────────────── */
function FreqCurve() {
  const reduce = useReducedMotion();
  const d = "M4 92 C 40 70, 70 80, 110 86 S 150 98, 174 64 C 194 46, 206 50, 222 76 C 248 108, 274 112, 296 118";
  return (
    <svg viewBox="0 0 300 140" className="w-full h-[110px]" fill="none" aria-hidden="true">
      {[75, 150, 225].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="120" stroke="var(--c-border)" strokeWidth="1" />
      ))}
      <line x1="0" y1="120" x2="300" y2="120" stroke="var(--c-border)" strokeWidth="1" />
      <motion.path
        d={d} stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ── A firmware hexdump (the "usual sins" hiding in plain sight) ── */
const hex = [
  "00000000  77 69 66 69 5f 70 61 73  73 3d 68 75 6e 74 65 72  |wifi_pass=hunter|",
  "00000010  32 00 61 70 69 5f 6b 65  79 3d 41 49 7a 61 53 79  |2.api_key=AIzaSy|",
  "00000020  43 00 61 64 6d 69 6e 3a  61 64 6d 69 6e 00 64 62  |C.admin:admin.db|",
  "00000030  67 5f 73 68 65 6c 6c 3d  6f 6e 00 ff ff ff ff ff  |g_shell=on......|",
];

function Panel({
  tag, title, children, line,
}: { tag: string; title: string; children: React.ReactNode; line: string }) {
  return (
    <div className="card p-6 md:p-7 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span className="mono-label uppercase tracking-[0.14em] accent">{tag}</span>
        <h3 className="display text-2xl md:text-[1.7rem]">{title}</h3>
      </div>
      <div className="mb-5">{children}</div>
      <p className="text-sm text-text-secondary leading-relaxed mt-auto">{line}</p>
    </div>
  );
}

export function Signals() {
  return (
    <section id="signals" className="section-spacing border-t border-border relative">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-5">01 — Signals I read</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="display text-3xl md:text-5xl mb-4 measure">
            Most things are just <span className="italic-accent">signals</span> once you slow them down.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-text-secondary measure mb-14 leading-relaxed">
            Firmware, footsteps, frequency response, the occasional bad argument — I like
            pulling them apart to see what they're actually saying.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <Panel tag="firmware" title="What the chip hides"
              line="I pull it off the flash and read it — hardcoded keys, debug shells, the usual sins sitting in plaintext.">
              <div className="font-mono text-[0.62rem] leading-relaxed text-text-secondary overflow-x-auto">
                {hex.map((l, i) => (
                  <div key={i} className={i < 2 ? "text-text" : ""}>{l}</div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel tag="the city" title="Where I've been"
              line="Slow miles around Baner and Aundh, every one logged as GPX. I like knowing exactly where I've been.">
              <RouteLine />
            </Panel>
          </Reveal>

          <Reveal delay={0.12}>
            <Panel tag="sound" title="Too many IEMs"
              line="A chi-fi habit I can't shake. I can point at the 3 kHz peak in a set — and I will absolutely tell you about it.">
              <FreqCurve />
            </Panel>
          </Reveal>

          <Reveal delay={0.16}>
            <Panel tag="airwaves" title="Radios & GNSS"
              line="ESP32, NRF24, LoRa, a GPS module decoding NMEA over UART. Everything's a waveform if you look close enough.">
              <div className="h-[110px] flex items-center"><ScopeTrace height={90} /></div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
