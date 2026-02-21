import { motion } from "framer-motion";
import { ShieldAlert, Database, Network, Cpu } from "lucide-react";

const projects = [
  {
    id: "OP-SURICATA",
    title: "Edge IDS Framework",
    domain: "Network Intelligence",
    description: "Architected a decentralized intrusion detection paradigm deployed on Raspberry Pi 5. Engineered custom heuristic rulesets to parse, log, and neutralize anomalous traffic streams directly at the network boundary.",
    outcome: "Eliminated topological blind spots in local infrastructure.",
    icon: <ShieldAlert className="w-5 h-5" />
  },
  {
    id: "OP-OMNIS",
    title: "Predictive AI Platform",
    domain: "Threat Intelligence",
    description: "A visionary SIH 2025 platform bridging machine learning and cybersecurity. Automates vulnerability assessment and analyzes large-scale logs to proactively dismantle attack vectors before exploitation.",
    outcome: "Recognized as a leading innovation at national level.",
    icon: <Database className="w-5 h-5" />
  },
  {
    id: "OP-RESILIENCE",
    title: "DDoS Mitigation Protocol",
    domain: "Infrastructure Hardening",
    description: "A stress-testing apparatus designed to simulate controlled volumetric attacks. Utilized to forge unbreakable firewall configurations and validate the integrity of load-balancing architectures.",
    outcome: "Validated infrastructure against 10Gbps artificial surges.",
    icon: <Network className="w-5 h-5" />
  },
  {
    id: "OP-THERMAL",
    title: "Autonomous Response Array",
    domain: "IoT Hardware",
    description: "A closed-loop hardware manifestation combining real-time thermal sensors with an automated extinguishing response. True convergence of physical safety and digital logic.",
    outcome: "Achieved sub-two-second physical response capability.",
    icon: <Cpu className="w-5 h-5" />
  },
];

export function Projects() {
  return (
    <section id="deployments" className="py-24 relative bg-[#030303] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-4">
              [ DIRECTORY: /ARCHIVE/DEPLOYMENTS ]
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Classified <span className="text-primary">Operations</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="tech-panel p-8 group relative"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="font-mono text-[10px] bg-white/5 px-2 py-1 text-muted-foreground border border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                  {project.id}
                </div>
                <div className="text-white/20 group-hover:text-primary transition-colors">
                  {project.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1 hover-glitch transition-all">
                {project.title}
              </h3>
              <div className="font-mono text-xs text-primary mb-6 uppercase tracking-wider">
                {project.domain}
              </div>

              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8 h-24 overflow-hidden text-ellipsis">
                {project.description}
              </p>

              <div className="pt-6 border-t border-white/5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Verified Outcome</div>
                <div className="text-sm font-medium text-white">
                  {project.outcome}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
