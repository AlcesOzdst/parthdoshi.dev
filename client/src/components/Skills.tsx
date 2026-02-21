export function Skills() {
  const specs = [
    { key: "OS", value: "Linux (Debian/Arch), Unix" },
    { key: "LANGUAGES", value: "Python, C/C++, Bash" },
    { key: "NETWORK", value: "TCP/IP, Wireshark, Suricata, DDoS Mitigation" },
    { key: "HARDWARE", value: "Raspberry Pi, ESP8266/ESP32, Sensor Arrays" },
    { key: "SECURITY", value: "SIEM, Vulnerability Assessment, Threat Modeling" },
  ];

  return (
    <section id="skills" className="py-8 border-t border-primary/20 border-dashed">
      <div className="container mx-auto px-4">
        
        <div className="text-sm md:text-base mb-6">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/skills</span>
          <span className="text-white">$</span> neofetch
        </div>

        <div className="ml-4 flex flex-col md:flex-row gap-8 text-sm">
          {/* ASCII Logo for Neofetch */}
          <div className="hidden md:block text-accent whitespace-pre leading-none select-none">
{`
      /\\
     /  \\
    /    \\
   /______\\
  /        \\
 /          \\
/____________\\
`}
          </div>

          <div>
            <div className="text-primary font-bold mb-2">parthdoshi@sys_specs</div>
            <div className="text-muted-foreground mb-4">--------------------</div>
            
            <div className="space-y-1">
              {specs.map((s, i) => (
                <div key={i} className="flex">
                  <span className="text-accent w-24 shrink-0">{s.key}</span>
                  <span className="text-white/50 mr-2">:</span>
                  <span className="text-primary">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <div className="w-4 h-4 bg-black border border-primary/50"></div>
              <div className="w-4 h-4 bg-destructive"></div>
              <div className="w-4 h-4 bg-primary"></div>
              <div className="w-4 h-4 bg-accent"></div>
              <div className="w-4 h-4 bg-blue-500"></div>
              <div className="w-4 h-4 bg-purple-500"></div>
              <div className="w-4 h-4 bg-cyan-500"></div>
              <div className="w-4 h-4 bg-white"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
