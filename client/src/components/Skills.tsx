export function Skills() {
  const specs = [
    { key: "OS", value: "Kali Linux, Ubuntu, Windows, Debian" },
    { key: "LANG", value: "Python, C, Bash, JavaScript, SQL" },
    { key: "NETWORK", value: "Wireshark, Suricata, Snort, TCP/IP, Log Analysis" },
    { key: "SECURITY", value: "Nmap, Burp Suite, Metasploit, Hydra, sqlmap, OWASP ZAP" },
    { key: "INFRA", value: "Docker, VMs, Git, SIEM Fundamentals" },
    { key: "HARDWARE", value: "Raspberry Pi, Arduino, ESP32, ESP8266, 8051" },
    { key: "IOT", value: "IoT Prototyping, Sensor Arrays, Multisim, Blynk" },
  ];

  const certs = [
    { name: "National Academic Immersion Program", issuer: "SNIST Hyderabad" },
    { name: "Google Cloud Skills Boost", issuer: "Google Cloud" },
    { name: "API Security Fundamentals", issuer: "APIsec University" },
    { name: "Robotics & Innovation Intern", issuer: "PHN Technologies" },
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
  /   ◉◉   \\
 /    __    \\
/____________\\
`}
          </div>

          <div className="flex-1">
            <div className="text-primary font-bold mb-2">parthdoshi@sys_specs</div>
            <div className="text-muted-foreground mb-4">──────────────────────</div>

            <div className="space-y-1">
              {specs.map((s, i) => (
                <div key={i} className="flex flex-wrap">
                  <span className="text-accent w-20 shrink-0">{s.key}</span>
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

        {/* Certifications */}
        <div className="mt-10">
          <div className="text-sm md:text-base mb-4">
            <span className="text-primary font-bold">guest@parthdoshi</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/certs</span>
            <span className="text-white">$</span> ls -la
          </div>

          <div className="ml-4 overflow-x-auto text-xs sm:text-sm">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="text-muted-foreground border-b border-primary/20">
                  <th className="font-normal py-2 pr-4">TYPE</th>
                  <th className="font-normal py-2 pr-4">NAME</th>
                  <th className="font-normal py-2">ISSUER</th>
                </tr>
              </thead>
              <tbody>
                {certs.map((c, i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-colors">
                    <td className="py-2 pr-4 text-accent">cert</td>
                    <td className="py-2 pr-4 text-primary font-bold">{c.name}</td>
                    <td className="py-2 text-muted-foreground">{c.issuer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
