import { motion } from "framer-motion";

const systems = [
  {
    class: "Network Defense",
    specs: ["Suricata IDS/IPS", "Volumetric DDoS Mitigation", "Firewall Topography", "Packet Analysis"]
  },
  {
    class: "Hardware Automation",
    specs: ["Raspberry Pi Cortex", "ESP8266/ESP32 Logic", "Sensor Arrays", "Embedded C++"]
  },
  {
    class: "Software Engineering",
    specs: ["Python Engineering", "C/C++ Core", "Bash Scripting", "Linux Admin"]
  },
  {
    class: "Threat Intelligence",
    specs: ["SIEM Architecture", "Vulnerability Auditing", "Log Correlation", "ML Security"]
  }
];

export function Skills() {
  return (
    <section id="capabilities" className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Capabilities
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((sys, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="tech-panel p-6"
            >
              <h3 className="text-lg font-bold text-white mb-6">
                {sys.class}
              </h3>
              
              <ul className="space-y-4 font-mono text-sm">
                {sys.specs.map((spec, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <span className="text-primary mr-3 opacity-80">▹</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
