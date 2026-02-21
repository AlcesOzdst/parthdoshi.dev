import { motion } from "framer-motion";
import { Code2, Cpu, ShieldAlert, Network, Terminal, Crosshair } from "lucide-react";

const skills = [
  {
    category: "Cybersecurity",
    icon: <ShieldAlert className="w-8 h-8" />,
    items: ["Intrusion Detection (IDS/IPS)", "Network Hardening", "DDoS Mitigation", "Vulnerability Assessment", "SIEM Architecture"]
  },
  {
    category: "IoT & Hardware",
    icon: <Cpu className="w-8 h-8" />,
    items: ["Raspberry Pi Ecosystem", "ESP8266/ESP32", "Sensor Integration", "Embedded C++", "Microcontroller Comm."]
  },
  {
    category: "Networking & Protocols",
    icon: <Network className="w-8 h-8" />,
    items: ["TCP/IP Stack", "MQTT / CoAP", "Firewall Configuration", "Packet Analysis (Wireshark)", "Traffic Simulation"]
  },
  {
    category: "Development",
    icon: <Terminal className="w-8 h-8" />,
    items: ["Python", "C / C++", "Bash Scripting", "Linux (Debian/Arch)", "Git Version Control"]
  }
];

export function Skills() {
  return (
    <section id="expertise" className="py-32 relative bg-[#05010a] border-t-2 border-accent/20 overflow-hidden">
      {/* Glitch text background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap select-none pointer-events-none uppercase tracking-tighter mix-blend-overlay">
        ARSENAL
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 text-primary font-mono text-sm uppercase tracking-widest mb-6 font-bold flex items-center gap-2 w-fit">
              <Crosshair className="w-4 h-4" /> Weapons & Tactics
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase glow-text-accent">
              Core <span className="text-accent">Competencies</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-black/60 border-2 border-white/5 p-8 hover:border-accent hover:-translate-y-2 transition-all duration-300 relative overflow-hidden shadow-xl">
                {/* Number watermark */}
                <div className="absolute -bottom-4 -right-4 text-8xl font-black text-white/[0.03] group-hover:text-accent/[0.05] transition-colors duration-300 font-mono">
                  0{index + 1}
                </div>
                
                <div className="mb-8 p-4 bg-white/5 w-fit border border-white/10 text-white group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300 relative z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {skill.icon}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight relative z-10">{skill.category}</h3>
                
                <ul className="space-y-4 relative z-10">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-mono font-medium">
                      <span className="text-accent font-bold mt-0.5 group-hover:animate-pulse">_</span>
                      <span className="group-hover:text-white transition-colors">{item}</span>
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
