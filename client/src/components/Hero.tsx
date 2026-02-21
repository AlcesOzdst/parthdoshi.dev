import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function Hero() {
  return (
    <section id="directives" className="relative min-h-[100svh] flex items-center pt-20 pb-16">
      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
        
        {/* Main Content - Highly Scannable */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Status: Available for Deployment
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            Architecting <br/>
            <span className="text-primary">Impenetrable</span> <br/>
            Infrastructure.
          </h1>
          
          <div className="space-y-4 mb-12">
            <div className="flex items-start gap-4">
              <Terminal className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-bold text-lg">Network Hardening</h3>
                <p className="text-muted-foreground text-sm">Designing resilient topologies that withstand volumetric attacks.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Terminal className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-bold text-lg">Intelligent Hardware</h3>
                <p className="text-muted-foreground text-sm">Building autonomous, closed-loop IoT security systems.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Terminal className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-bold text-lg">Threat Intelligence</h3>
                <p className="text-muted-foreground text-sm">Automating vulnerability assessments and incident response.</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href="#comm-link" className="btn-tactical-primary">
              Initiate Contact
            </a>
            <a href="#deployments" className="btn-tactical">
              View Logs
            </a>
          </div>
        </motion.div>

        {/* Right Column: Clean Metrics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col gap-6 lg:items-end"
        >
          <div className="tech-panel p-8 w-full max-w-sm">
            <div className="space-y-8 font-mono">
              <div>
                <div className="text-4xl text-white font-bold mb-1">100<span className="text-primary">%</span></div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Defense Capability</div>
              </div>
              <div>
                <div className="text-4xl text-white font-bold mb-1">&lt;2<span className="text-primary">s</span></div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Incident Response Time</div>
              </div>
              <div>
                <div className="text-4xl text-white font-bold mb-1">10<span className="text-primary">G</span></div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Traffic Mitigation</div>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
