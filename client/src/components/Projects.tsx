import { motion } from "framer-motion";

const projects = [
  {
    number: "01",
    title: "Suricata IDS Framework",
    domain: "Network Intelligence",
    description: "An edge-computing intrusion detection paradigm deployed on Raspberry Pi 5. Engineered to parse, log, and neutralize anomalous traffic streams at the network boundary.",
    outcome: "Eliminated blind spots in local infrastructure.",
  },
  {
    number: "02",
    title: "Project Omnis",
    domain: "AI Threat Prediction",
    description: "A visionary SIH 2025 platform bridging machine learning and cybersecurity. Automates vulnerability assessment to proactively dismantle attack vectors.",
    outcome: "Recognized as a leading innovation at the national level.",
  },
  {
    number: "03",
    title: "DDoS Mitigation Protocol",
    domain: "System Resilience",
    description: "A stress-testing apparatus designed to simulate volumetric attacks. Used to forge unbreakable firewall configurations and validate load-balancing architectures.",
    outcome: "Validated infrastructure against 10Gbps artificial surges.",
  },
  {
    number: "04",
    title: "Thermal Response Array",
    domain: "Hardware Automation",
    description: "A closed-loop IoT hardware manifestation combining real-time thermal sensors with an automated extinguishing response. True convergence of physical safety and digital logic.",
    outcome: "Sub-two-second physical response capability.",
  },
];

export function Projects() {
  return (
    <section id="foundations" className="py-32 relative bg-[#050505]">
      <div className="container mx-auto px-8 md:px-12">
        
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
              Foundational <span className="italic text-primary">Pillars</span>
            </h2>
            <p className="font-sans text-muted-foreground font-light leading-relaxed text-lg">
              A legacy is not built on concepts; it is built on execution. These architectural works represent the convergence of high-level theory and low-level precision.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center py-10 border-b border-white/[0.05] hover:border-primary/50 transition-colors duration-500">
                
                {/* Number */}
                <div className="md:col-span-1 font-sans text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {project.number}.
                </div>

                {/* Title & Domain */}
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 group-hover:pl-4 transition-all duration-500">
                    {project.title}
                  </h3>
                  <div className="font-sans text-xs uppercase tracking-[0.2em] text-primary/70 group-hover:pl-4 transition-all duration-500 delay-75">
                    {project.domain}
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Outcome */}
                <div className="md:col-span-2 text-right">
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Impact</div>
                  <div className="font-sans text-sm text-white/90 group-hover:text-primary transition-colors">
                    {project.outcome}
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
