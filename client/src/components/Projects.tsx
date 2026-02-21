import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, ShieldAlert, Cpu, Database, Network } from "lucide-react";

const projects = [
  {
    title: "Suricata IDS Deployment",
    type: "Network Security",
    description: "Architected a lightweight intrusion detection system optimized for Raspberry Pi 5. Configured custom rulesets to monitor, log, and alert on anomalous network traffic in real-time, proving edge-computing security capabilities.",
    tags: ["Suricata", "Raspberry Pi", "Linux", "Network Traffic Analysis"],
    icon: <ShieldAlert className="w-5 h-5" />,
    metrics: "100% Threat Detection Rate in Sandbox"
  },
  {
    title: "Project Omnis (SIH 2025)",
    type: "AI & Cybersecurity Platform",
    description: "Developed an AI-driven cybersecurity platform designed to automate threat hunting and vulnerability assessments. Integrated machine learning models to analyze logs and predict attack vectors before exploitation.",
    tags: ["AI/ML", "Python", "Security Automation", "Threat Intelligence"],
    icon: <Database className="w-5 h-5" />,
    metrics: "Smart India Hackathon Finalist"
  },
  {
    title: "DDoS Mitigation Toolkit",
    type: "Network Resilience",
    description: "Built a comprehensive simulation toolkit to generate controlled volumetric attacks and implement network hardening strategies. Used to stress-test local infrastructure and evaluate firewall configurations.",
    tags: ["Python", "TCP/UDP", "Stress Testing", "Firewall Config"],
    icon: <Network className="w-5 h-5" />,
    metrics: "Simulated up to 10Gbps local traffic"
  },
  {
    title: "Automated Fire Detection & Extinguisher",
    type: "IoT Safety System",
    description: "Engineered a closed-loop hardware system combining thermal sensors with automated extinguishing mechanisms. Built for rapid response in high-risk physical environments.",
    tags: ["IoT", "Hardware Design", "Sensors", "Embedded C++"],
    icon: <Cpu className="w-5 h-5" />,
    metrics: "< 2s Response Time"
  },
];


export function Projects() {
  return (
    <section id="work" className="py-24 relative bg-[#030303] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-accent"></div>
              <span className="font-mono text-sm text-accent uppercase tracking-widest">Featured Deployments</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Case Studies</h2>
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
              <div className="h-full glass-panel p-8 md:p-10 rounded-xl border-white/5 hover:border-accent/40 transition-all duration-500 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-md bg-white/5 border border-white/10 text-white group-hover:text-accent group-hover:border-accent/30 transition-colors">
                        {project.icon}
                      </div>
                      <div>
                        <div className="text-accent font-mono text-xs uppercase tracking-wider mb-1">{project.type}</div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                      </div>
                    </div>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all group-hover:rotate-45 duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="font-mono text-xs text-white/80 bg-white/5 px-3 py-2 rounded border border-white/5 mb-6 inline-block">
                      <span className="text-accent mr-2">»</span>
                      {project.metrics}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-black/50 border border-white/10 px-3 py-1.5 rounded-sm">
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
