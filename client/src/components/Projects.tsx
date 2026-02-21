import { motion } from "framer-motion";
import { ShieldAlert, Database, Network, Cpu } from "lucide-react";

const projects = [
  {
    id: "OP-SURICATA",
    title: "Edge IDS Framework",
    domain: "Network Intelligence",
    problem: "Topological blind spots in local infrastructure.",
    solution: "Decentralized intrusion detection on Raspberry Pi 5 with custom heuristic rulesets.",
    outcome: "100% threat detection at the network boundary.",
    icon: <ShieldAlert className="w-6 h-6" />
  },
  {
    id: "OP-OMNIS",
    title: "Predictive AI Platform",
    domain: "Threat Intelligence",
    problem: "Manual vulnerability assessment latency.",
    solution: "Machine learning platform analyzing large-scale logs to predict attack vectors.",
    outcome: "Recognized innovation at SIH 2025.",
    icon: <Database className="w-6 h-6" />
  },
  {
    id: "OP-RESILIENCE",
    title: "DDoS Mitigation Protocol",
    domain: "Infrastructure Hardening",
    problem: "Unverified firewall resilience under heavy load.",
    solution: "Stress-testing apparatus generating controlled volumetric attacks.",
    outcome: "Validated against 10Gbps artificial surges.",
    icon: <Network className="w-6 h-6" />
  },
  {
    id: "OP-THERMAL",
    title: "Autonomous Response Array",
    domain: "IoT Hardware",
    problem: "Delayed physical response to thermal anomalies.",
    solution: "Closed-loop hardware combining sensors with automated extinguishing mechanisms.",
    outcome: "Sub-two-second physical response capability.",
    icon: <Cpu className="w-6 h-6" />
  },
];

export function Projects() {
  return (
    <section id="deployments" className="py-24 bg-[#030303] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Classified Operations
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="tech-panel p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="font-mono text-xs text-primary mb-2 uppercase tracking-widest">
                    {project.id} // {project.domain}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="text-white/20 p-3 bg-white/5 rounded-md">
                  {project.icon}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-mono">Problem</div>
                  <div className="text-sm text-white/90">{project.problem}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-mono">Solution</div>
                  <div className="text-sm text-white/90">{project.solution}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="text-xs text-primary uppercase tracking-wider mb-1 font-mono">Verified Outcome</div>
                <div className="text-base font-medium text-white">
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
