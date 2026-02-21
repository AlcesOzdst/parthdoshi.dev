import { motion } from "framer-motion";

const systems = [
  {
    class: "Network Defense",
    specs: ["Suricata IDS/IPS Config", "Volumetric DDoS Mitigation", "Firewall Topography", "Packet Analysis (Wireshark)"]
  },
  {
    class: "Hardware Automation",
    specs: ["Raspberry Pi Ecosystem", "ESP8266/ESP32 Logic", "Sensor Array Integration", "Embedded C++"]
  },
  {
    class: "Software Engineering",
    specs: ["Python Automation", "C/C++ Core Logic", "Bash/Shell Scripting", "Linux Server Admin"]
  },
  {
    class: "Threat Intelligence",
    specs: ["SIEM Architecture", "Vulnerability Auditing", "Log Correlation", "Machine Learning Security"]
  }
];

export function Skills() {
  return (
    <section id="capabilities" className="py-24 relative bg-background border-t border-white/5">
      
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-4">
              [ SYSTEM QUERY: CAPABILITIES ]
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Technical <span className="text-primary">Arsenal</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systems.map((sys, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="tech-border bg-black/50 p-6 h-full hover:bg-white/[0.02] transition-colors group">
                <div className="font-mono text-[10px] text-muted-foreground mb-4">SYS.{index + 1}</div>
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide group-hover:text-primary transition-colors">
                  {sys.class}
                </h3>
                
                <ul className="space-y-3 font-mono text-xs">
                  {sys.specs.map((spec, i) => (
                    <li key={i} className="flex items-start text-muted-foreground group-hover:text-white/80 transition-colors">
                      <span className="text-primary mr-2 opacity-50">&gt;</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
