import { motion } from "framer-motion";
import { ArrowUpRight, Database, Network, ShieldAlert, Cpu } from "lucide-react";

const projects = [
  {
    title: "Suricata IDS Deployment",
    type: "Network Security",
    description: "Architected a lightweight intrusion detection system optimized for Raspberry Pi 5. Configured custom rulesets to monitor, log, and alert on anomalous network traffic in real-time, proving edge-computing security capabilities.",
    tags: ["Suricata", "Raspberry Pi", "Linux", "Network Traffic Analysis"],
    icon: <ShieldAlert className="w-6 h-6" />,
    metrics: "100% Threat Detection Rate"
  },
  {
    title: "Project Omnis (SIH 2025)",
    type: "AI & Cyber Platform",
    description: "Developed an AI-driven cybersecurity platform designed to automate threat hunting and vulnerability assessments. Integrated machine learning models to analyze logs and predict attack vectors before exploitation.",
    tags: ["AI/ML", "Python", "Security Automation", "Threat Intel"],
    icon: <Database className="w-6 h-6" />,
    metrics: "SIH Finalist"
  },
  {
    title: "DDoS Mitigation Toolkit",
    type: "Network Resilience",
    description: "Built a comprehensive simulation toolkit to generate controlled volumetric attacks and implement network hardening strategies. Used to stress-test local infrastructure and evaluate firewall configurations.",
    tags: ["Python", "TCP/UDP", "Stress Testing", "Firewall Config"],
    icon: <Network className="w-6 h-6" />,
    metrics: "10Gbps Traffic Simulation"
  },
  {
    title: "Automated Fire Extinguisher",
    type: "IoT Safety System",
    description: "Engineered a closed-loop hardware system combining thermal sensors with automated extinguishing mechanisms. Built for rapid response in high-risk physical environments.",
    tags: ["IoT", "Hardware Design", "Sensors", "Embedded C++"],
    icon: <Cpu className="w-6 h-6" />,
    metrics: "< 2s Response Time"
  },
];

export function Projects() {
  return (
    <section id="work" className="py-32 relative bg-background border-t-2 border-primary/20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-accent/10 border border-accent/30 text-accent font-mono text-sm uppercase tracking-widest mb-6 font-bold">
              // Classified Deployments
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase glow-text">
              Case <span className="text-primary">Studies</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-black/50 border-2 border-white/5 hover:border-primary/50 transition-all duration-300 relative overflow-hidden flex flex-col">
                {/* Diagonal stripes on hover */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,85,0.03)_10px,rgba(255,0,85,0.03)_20px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Top accent bar */}
                <div className="h-2 w-full bg-white/10 group-hover:bg-primary transition-colors duration-300" />
                
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 text-white group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        {project.icon}
                      </div>
                      <div>
                        <div className="text-accent font-mono text-xs font-bold uppercase tracking-[0.2em] mb-1">{project.type}</div>
                        <h3 className="text-2xl font-black text-white tracking-tight uppercase">{project.title}</h3>
                      </div>
                    </div>
                    <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-black hover:bg-accent hover:border-accent transition-all group-hover:rotate-45 duration-300 shadow-lg">
                      <ArrowUpRight className="w-6 h-6" />
                    </a>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-1 border-l-[3px] border-white/10 pl-4 group-hover:border-primary/50 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-3 bg-black/60 border border-primary/20 px-4 py-3 mb-6 w-fit shadow-[0_0_10px_hsla(var(--primary)/0.1)]">
                      <div className="w-2 h-2 bg-primary animate-pulse" />
                      <span className="font-mono text-sm font-bold text-white tracking-widest uppercase">
                        RESULT: <span className="text-primary">{project.metrics}</span>
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground bg-white/5 border border-white/10 px-3 py-1.5 hover:text-white hover:border-accent/50 transition-colors cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
