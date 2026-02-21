import { motion } from "framer-motion";
import { Link } from "wouter";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

export function Nav() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 glass-panel border-b border-white/5"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <span className="font-mono text-sm font-bold tracking-widest text-foreground">
            PARTH<span className="text-primary">DOSHI</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-xs tracking-widest uppercase">
          <a href="#work" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-primary/50">01.</span> Work
          </a>
          <a href="#expertise" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-primary/50">02.</span> Expertise
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-primary/50">03.</span> Contact
          </a>
        </div>
        <a 
          href="#contact" 
          className="md:hidden border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs text-primary hover:bg-primary/20 transition-colors uppercase tracking-widest"
        >
          Initialize
        </a>
      </div>
    </motion.nav>
  );
}
