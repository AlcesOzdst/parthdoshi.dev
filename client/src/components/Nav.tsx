import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function Nav() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b-2 border-primary/30 shadow-[0_4px_30px_hsla(var(--primary)/0.1)]"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center shadow-[0_0_15px_hsla(var(--primary)/0.6)]">
            <Terminal className="w-5 h-5 text-black" />
          </div>
          <span className="font-mono text-xl font-black tracking-[0.2em] text-white uppercase">
            PARTH<span className="text-primary">DOSHI</span>
          </span>
        </div>
        <div className="hidden md:flex gap-10 font-mono text-sm font-bold tracking-[0.2em] uppercase">
          <a href="#work" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 hover:drop-shadow-[0_0_8px_white]">
            <span className="text-accent">01.</span> Work
          </a>
          <a href="#expertise" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 hover:drop-shadow-[0_0_8px_white]">
            <span className="text-accent">02.</span> Arsenal
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 hover:drop-shadow-[0_0_8px_white]">
            <span className="text-accent">03.</span> Comms
          </a>
        </div>
        <a 
          href="#contact" 
          className="md:hidden border-2 border-primary bg-primary/10 px-4 py-2 font-mono text-xs font-bold text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest"
        >
          Connect
        </a>
      </div>
    </motion.nav>
  );
}
