import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import bgImage from "@/assets/images/cyber-bg.png";
import { useEffect, useState } from "react";
import { ShieldCheck, Network, Lock, Cpu, ArrowRight } from "lucide-react";

const terminalLines = [
  "> INITIALIZING SECURE BOOT...",
  "> KERNEL LOADED. VERIFYING INTEGRITY...",
  "> [OK] SIGNATURE MATCH.",
  "> ESTABLISHING ENCRYPTED TUNNEL...",
  "> LOADING IOT PROTOCOLS...",
  "> [OK] MQTT, COAP, HTTPS ACTIVE.",
  "> INTRUSION DETECTION SYSTEM: ONLINE.",
  "> SURICATA ENGINE: LISTENING...",
  "> DEPLOYING DDOS COUNTERMEASURES...",
  "> SYSTEM READY.",
  "> AWAITING COMMAND_ "
];

export function Hero() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < terminalLines.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, terminalLines[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 300 + 100); // Random delay between 100-400ms
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Available for deployment
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tighter mb-6 text-foreground leading-[1.1]">
            Securing the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/80 to-primary">
              Infrastructure
            </span> <br />
            of Tomorrow.
          </h1>
          
          <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-xl font-light leading-relaxed">
            I am a <strong className="text-white font-medium">Cybersecurity & IoT Engineer</strong>. I design robust network defenses, build intelligent hardware systems, and break things to make them unbreakable.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="h-12 px-8 rounded-sm font-mono text-sm tracking-widest uppercase bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_20px_hsla(var(--primary)/0.4)] transition-all" data-testid="btn-hire">
              Hire Me <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-sm font-mono text-sm tracking-widest uppercase border-white/20 text-white hover:bg-white/5 transition-all" data-testid="btn-projects">
              View Case Studies
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-mono font-light text-white mb-1 glow-text">10+</div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Systems Secured</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-light text-white mb-1 glow-text">15+</div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">IoT Deployments</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-light text-white mb-1 glow-text">100%</div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Uptime Focus</div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Column: Interactive Terminal/Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative w-full aspect-square max-h-[600px] lg:h-auto hidden md:block"
        >
          {/* Terminal Window */}
          <div className="absolute inset-4 glass-panel rounded-lg overflow-hidden border-white/10 flex flex-col scanline glow-box">
            {/* Terminal Header */}
            <div className="h-10 bg-black/60 border-b border-white/10 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="font-mono text-xs text-muted-foreground opacity-50">root@pd-mainframe:~</div>
              <div className="w-10"></div> {/* Spacer */}
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 p-6 font-mono text-xs sm:text-sm text-primary/80 leading-relaxed overflow-hidden flex flex-col justify-end">
              <div className="space-y-2 mb-4">
                {lines.map((line, i) => (
                  <div key={i} className={`${i === lines.length - 1 && currentIndex >= terminalLines.length ? 'text-white' : ''}`}>
                    {line}
                  </div>
                ))}
                {currentIndex >= terminalLines.length && (
                  <div className="flex">
                    <span className="text-white">&gt; </span>
                    <span className="typewriter-cursor"></span>
                  </div>
                )}
              </div>
            </div>

            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </div>

          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 -left-6 glass-panel px-4 py-3 rounded-md flex items-center gap-3 border-white/10"
          >
            <div className="p-2 rounded bg-primary/20 text-primary"><ShieldCheck className="w-4 h-4" /></div>
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">IDS Status</div>
              <div className="text-sm font-semibold text-white">Active & Monitoring</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-24 -right-6 glass-panel px-4 py-3 rounded-md flex items-center gap-3 border-white/10"
          >
            <div className="p-2 rounded bg-accent/20 text-accent"><Cpu className="w-4 h-4" /></div>
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Hardware Sync</div>
              <div className="text-sm font-semibold text-white">ESP8266 Connected</div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
