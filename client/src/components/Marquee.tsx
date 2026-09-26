const ITEMS = [
  "FIRMWARE",
  "GPX TRACKS",
  "CHI-FI IEMs",
  "GHIDRA",
  "6AM RUNS",
  "ESP32",
  "CTF",
  "SOLDERING IRON",
  "NMEA OVER UART",
  "DEBATE CLUB",
  "BINWALK",
  "LORA / NRF24",
];

export function Marquee() {
  // Two copies of the track for a seamless loop
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {ITEMS.map((t, i) => (
        <span key={i} className="inline-flex items-center gap-10">
          <span className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-text-secondary">
            {t}
          </span>
          <span className="accent text-xl md:text-2xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee border-y border-border py-6 md:py-8 bg-surface/20">
      {track}
      {track}
    </div>
  );
}
