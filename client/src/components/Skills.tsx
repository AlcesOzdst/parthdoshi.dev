import { motion } from "framer-motion";
import { Code2, Cpu, ShieldAlert, Network, Terminal, Database } from "lucide-react";

const skills = [
  {
    category: "Cybersecurity",
    icon: <ShieldAlert className="w-5 h-5" />,
    items: ["Intrusion Detection (IDS/IPS)", "Network Hardening", "DDoS Mitigation", "Vulnerability Assessment", "SIEM Architecture"]
  },
  {
    category: "IoT & Hardware",
    icon: <Cpu className="w-5 h-5" />,
    items: ["Raspberry Pi Ecosystem", "ESP8266/ESP32", "Sensor Integration", "Embedded C++", "Microcontroller Comm."]
  },
  {
    category: "Networking & Protocols",
    icon: <Network className="w-5 h-5" />,
    items: ["TCP/IP Stack", "MQTT / CoAP", "Firewall Configuration", "Packet Analysis (Wireshark)", "Traffic Simulation"]
  },
  {
    category: "Development",
    icon: <Terminal className="w-5 h-5" />,
    items: ["Python", "C / C++", "Bash Scripting", "Linux (Debian/Arch)", "Git Version Control"]
  }
];

export function Skills() {
  return (
    <section id="expertise" className="py-24 relative border-t border-white/5 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-primary"></div>
              <span className="font-mono text-sm text-primary uppercase tracking-widest">Core Competencies</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Technical Arsenal</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md"
          >
            <p className="text-muted-foreground font-light leading-relaxed">
              Equipped with a deep understanding of low-level hardware interactions and high-level network architectures, enabling end-to-end security solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-lg border-white/5 hover:border-primary/30 transition-colors group relative overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 relative z-10">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 relative z-10">{skill.category}</h3>
              <ul className="space-y-3 relative z-10">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                    <span className="text-primary mt-1 opacity-50">▹</span>
                    <span>{item}</span>
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
