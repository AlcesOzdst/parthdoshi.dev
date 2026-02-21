import { motion } from "framer-motion";

const skills = [
  {
    category: "Intrusion Detection",
    items: ["Suricata IDS/IPS", "SIEM Architecture", "Vulnerability Assessment", "Threat Modeling"]
  },
  {
    category: "Hardware Autonomy",
    items: ["Raspberry Pi Cortex", "ESP8266/ESP32", "Embedded C++", "Sensor Fusion"]
  },
  {
    category: "Network Topography",
    items: ["TCP/IP Stack", "Firewall Architecture", "DDoS Mitigation", "Packet Analysis"]
  },
  {
    category: "Command & Control",
    items: ["Python Engineering", "C / C++ Foundations", "Linux Infrastructure", "Bash Scripting"]
  }
];

export function Skills() {
  return (
    <section id="architecture" className="py-32 relative bg-background overflow-hidden">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-8 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="editorial-line"></div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Core <span className="italic text-primary">Infrastructure</span>
            </h2>
            <p className="font-sans text-muted-foreground font-light leading-relaxed text-lg">
              The tools and protocols that form the bedrock of a secure digital empire. Mastery over the lowest levels of hardware to the highest levels of network abstraction.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="monolith-card p-10 h-full border-t border-t-primary/20 hover:border-t-primary transition-all duration-500 relative group">
                
                {/* Subtle numbering */}
                <div className="absolute top-6 right-6 font-sans text-[10px] text-white/20">
                  0{index + 1}
                </div>
                
                <h3 className="font-serif text-2xl text-white mb-8 group-hover:text-primary transition-colors duration-500">
                  {skill.category}
                </h3>
                
                <ul className="space-y-4">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex flex-col font-sans text-sm font-light text-muted-foreground group-hover:text-white/80 transition-colors">
                      <span className="text-white/20 mb-1">■</span>
                      {item}
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
