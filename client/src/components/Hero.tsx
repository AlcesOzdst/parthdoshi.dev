import { motion } from "framer-motion";
import bgImage from "@/assets/images/monolith-bg.png";

export function Hero() {
  return (
    <section id="vision" className="relative min-h-[100svh] flex items-center pt-24 overflow-hidden bg-background">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img src={bgImage} alt="Monolith background" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-8 md:px-12 relative z-10 grid lg:grid-cols-12 gap-12">
        
        {/* Main Editorial Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="editorial-line"></div>
          
          <div className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Cybersecurity & IoT Architect
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white leading-[1.05] mb-8">
            Building an Empire of <br/>
            <span className="bronze-gradient-text italic">Absolute Security.</span>
          </h1>
          
          <p className="text-muted-foreground text-lg sm:text-xl font-light leading-relaxed max-w-2xl mb-12">
            I don't just write code or patch vulnerabilities; I architect resilient foundations. I envision a legacy where the physical and digital worlds converge securely—an empire built on robust IoT systems and impenetrable networks.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <a href="#contact" className="btn-editorial bg-white text-black hover:text-black border-white hover:bg-white/90">
              Commission Work
            </a>
            <a href="#foundations" className="btn-editorial">
              Examine the Blueprint
            </a>
          </div>
        </motion.div>

        {/* Right Column: High-End Metric Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="lg:col-span-4 flex flex-col justify-end lg:items-end pb-12"
        >
          <div className="monolith-card p-8 border-l-2 border-l-primary relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="50" cy="50" r="40"/>
                <line x1="10" y1="50" x2="90" y2="50"/>
                <line x1="50" y1="10" x2="50" y2="90"/>
              </svg>
            </div>
            
            <div className="font-serif text-6xl text-white mb-2">100<span className="text-primary">%</span></div>
            <div className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Structural Integrity
            </div>
            
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Every system deployed—from intrusion detection arrays to automated IoT hardware—is designed to withstand the stress of modern digital warfare. This is the standard.
            </p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
