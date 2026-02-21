import { motion } from "framer-motion";
import bgImage from "@/assets/images/crypto-bg.png";
import { Terminal } from "lucide-react";

export function Hero() {
  return (
    <section id="directives" className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Tactical Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={bgImage} alt="Cryptographic Data" className="w-full h-full object-cover object-center mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-12 gap-12">
        
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="px-2 py-1 bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Root Access Granted
            </div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              ID: 0x9A4F2
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
            Architecting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50">
              Impenetrable
            </span> <br/>
            Infrastructure.
          </h1>
          
          <p className="font-mono text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mb-12 border-l border-primary/30 pl-4">
            I don't just patch systems; I engineer the fortresses they run on. By converging deep network intelligence with autonomous hardware logic, I build scalable security legacies designed to withstand tomorrow's threats.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#comm-link" className="btn-tactical-primary">
              Initialize Protocol
            </a>
            <a href="#deployments" className="btn-tactical">
              View Threat Logs
            </a>
          </div>
        </motion.div>

        {/* Right Column: Tactical Metric Display */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-4 flex flex-col justify-center lg:items-end"
        >
          <div className="tech-panel p-6 w-full max-w-sm relative overflow-hidden group">
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/50 shadow-[0_0_10px_var(--primary)] animate-[scan_2s_linear_infinite]" />
            
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
              <div className="font-mono text-[10px] text-primary uppercase tracking-widest">System Status</div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <div className="space-y-6 font-mono">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Defense Capability</div>
                <div className="text-3xl text-white font-bold">100<span className="text-primary">%</span></div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Network Resilience</div>
                <div className="text-xl text-white">Verified Secure</div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pt-4 border-t border-white/5">
                Every deployment—from edge IDS arrays to automated IoT hardware—is structurally fortified against volumetric and zero-day incursions.
              </p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
