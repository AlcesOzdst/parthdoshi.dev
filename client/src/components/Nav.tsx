import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-white/[0.05]"
    >
      <div className="container mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl font-medium tracking-wide text-white">
            PARTH DOSHI<span className="text-primary">.</span>
          </span>
        </div>
        <div className="hidden md:flex gap-12 font-sans text-xs font-light tracking-[0.15em] uppercase text-muted-foreground">
          <a href="#vision" className="hover:text-primary transition-colors">Vision</a>
          <a href="#foundations" className="hover:text-primary transition-colors">Foundations</a>
          <a href="#architecture" className="hover:text-primary transition-colors">Architecture</a>
          <a href="#contact" className="hover:text-primary transition-colors">Initiate</a>
        </div>
        <div className="md:hidden w-8 h-px bg-white"></div>
      </div>
    </motion.nav>
  );
}
