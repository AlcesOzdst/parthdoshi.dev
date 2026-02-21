import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="comm-link" className="py-24 bg-[#020202] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Comm Link
            </h2>
            <p className="text-muted-foreground">
              Available for strategic partnerships and full-time roles.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-6"
          >
            <a href="mailto:contact@parthdoshi.me" className="tech-panel p-8 flex flex-col items-center justify-center text-center group">
              <Mail className="w-8 h-8 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
              <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Email</div>
              <div className="text-white text-sm group-hover:text-primary transition-colors">contact@parthdoshi.me</div>
            </a>
            
            <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="tech-panel p-8 flex flex-col items-center justify-center text-center group">
              <Github className="w-8 h-8 text-muted-foreground mb-4 group-hover:text-white transition-colors" />
              <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">GitHub</div>
              <div className="text-white text-sm group-hover:text-white transition-colors">AlcesOzdst</div>
            </a>
            
            <a href="#" className="tech-panel p-8 flex flex-col items-center justify-center text-center group">
              <Linkedin className="w-8 h-8 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
              <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">LinkedIn</div>
              <div className="text-white text-sm group-hover:text-primary transition-colors">Connect</div>
            </a>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
