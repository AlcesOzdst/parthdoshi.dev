import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/[0.05]"
    >
      <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-primary animate-pulse"></div>
          <span className="font-mono text-sm font-bold tracking-widest text-white uppercase">
            P.DOSHI // SYS_ARCHITECT
          </span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          <a href="#directives" className="hover:text-primary transition-colors">Directives</a>
          <a href="#deployments" className="hover:text-primary transition-colors">Deployments</a>
          <a href="#capabilities" className="hover:text-primary transition-colors">Capabilities</a>
          <a href="#comm-link" className="hover:text-primary transition-colors text-white">Comm Link</a>
        </div>
      </div>
    </motion.nav>
  );
}
