import { motion } from "framer-motion";
import bgImage from "@/assets/images/cyber-bg.png";
import { useEffect, useState } from "react";
import { ShieldCheck, Cpu, ArrowRight, Zap, Target } from "lucide-react";

const terminalLines = [
  "> INITIATING OVERRIDE SEQUENCE...",
  "> BYPASSING MAINFRAME FIREWALLS...",
  "> ACCESS GRANTED.",
  "> DEPLOYING CYBER_GHOST PROTOCOL...",
  "> NEURAL LINK ESTABLISHED.",
  "> SCANNING FOR VULNERABILITIES...",
  "> 0-DAY EXPLOITS FOUND: 0",
  "> NETWORK INTEGRITY: 100%",
  "> AWAKENING AI CORES...",
  "> SYSTEM IS NOW SELF-AWARE.",
  "> WAITING FOR OPERATOR_INPUT "
];

export function Hero() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < terminalLines.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, terminalLines[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 250 + 50); // Faster, more erratic typing
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Intense Background Glows */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[800px] h-[800px] bg-accent/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      
      {/* Animated geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[80%] h-[120%] border border-primary/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[5%] w-[60%] h-[100%] border border-accent/10 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left Column: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 bg-primary/20 border-l-2 border-primary text-primary font-mono text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-[0_0_15px_hsla(var(--primary)/0.5)]">
              <Zap className="w-4 h-4" /> System Overclocked
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-foreground leading-[0.9]">
            <span className="block text-white glow-text">DEFEND.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 glow-text">DESTROY.</span>
            <span className="block text-accent glow-text-accent">DOMINATE.</span>
          </h1>
          
          <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-xl font-mono leading-relaxed border-l-2 border-accent/50 pl-4">
            Cybersecurity & IoT Specialist. I don't just secure networks—I build impenetrable fortresses and intelligent hardware that think for themselves.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <button className="cyber-button" data-testid="btn-hire">
              Engage Protocol
            </button>
            <button className="cyber-button-outline" data-testid="btn-projects">
              View Intel
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
            <div>
              <div className="text-4xl font-black text-primary mb-1 glow-text">10<span className="text-accent">+</span></div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Networks Hardened</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-1 glow-text">15<span className="text-accent">+</span></div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">IoT Arrays</div>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-1 glow-text">0<span className="text-accent">%</span></div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Breach Rate</div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Column: Intense Interactive Radar/Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative w-full aspect-square max-h-[600px] lg:h-[700px] hidden md:flex items-center justify-center"
        >
          {/* Radar Background Element */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-[80%] h-[80%] border border-accent/30 rounded-full flex items-center justify-center">
              <div className="w-[70%] h-[70%] border border-accent/30 rounded-full flex items-center justify-center">
                 <div className="w-[50%] h-[50%] border border-accent/30 rounded-full relative">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 rounded-full"
                     style={{ background: 'conic-gradient(from 0deg, transparent 70%, hsla(var(--accent)/0.8) 100%)' }}
                   />
                 </div>
              </div>
            </div>
          </div>

          {/* Core Terminal Window - Tilted and aggressive */}
          <motion.div 
            initial={{ rotateY: 20, rotateX: 10 }}
            animate={{ rotateY: [20, 15, 20], rotateX: [10, 5, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 w-[90%] h-[70%] glass-panel glow-box bg-black/80 scanline perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Terminal Header */}
            <div className="h-12 bg-primary/20 border-b border-primary/50 flex items-center px-4 justify-between">
              <div className="flex gap-2 font-mono text-primary text-xs font-bold tracking-widest">
                <Target className="w-4 h-4" /> ROOT_ACCESS
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-2 bg-primary/50"></div>
                <div className="w-4 h-2 bg-accent/50"></div>
                <div className="w-2 h-2 bg-white/50"></div>
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 p-6 font-mono text-sm text-accent leading-loose overflow-hidden flex flex-col justify-end h-[calc(100%-3rem)]">
              <div className="space-y-1 mb-4">
                {lines.map((line, i) => (
                  <div key={i} className={`${line.includes('100%') || line.includes('0-DAY') ? 'text-primary font-bold glow-text' : ''}`}>
                    {line}
                  </div>
                ))}
                {currentIndex >= terminalLines.length && (
                  <div className="flex text-primary">
                    <span>&gt; </span>
                    <span className="typewriter-cursor"></span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Floating Aggressive Badges */}
          <motion.div 
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-12 glass-panel p-4 z-30 border-l-[4px] border-l-accent bg-black/90"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/20 text-accent rounded-sm"><ShieldCheck className="w-6 h-6" /></div>
              <div>
                <div className="text-xs font-mono text-accent uppercase tracking-widest">Shield Status</div>
                <div className="text-lg font-black text-white">IMPENETRABLE</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 -right-8 glass-panel p-4 z-30 border-r-[4px] border-r-primary bg-black/90"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 text-primary rounded-sm"><Cpu className="w-6 h-6" /></div>
              <div className="text-right">
                <div className="text-xs font-mono text-primary uppercase tracking-widest">Hardware Sync</div>
                <div className="text-lg font-black text-white">OVERLOCKED</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
