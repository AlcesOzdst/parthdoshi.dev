import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Command } from "lucide-react";

export function Contact() {
  return (
    <section id="comm-link" className="py-24 relative bg-[#020202] border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-4">
              [ SECURE SOCKET: OPEN ]
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4">
              Initiate <span className="text-primary">Comm Link</span>
            </h2>
            <p className="font-mono text-sm text-muted-foreground max-w-2xl border-l border-primary/30 pl-4">
              Ready to construct impenetrable infrastructure or fortify your existing network? Establish a secure connection below.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-[2fr_1fr] gap-8"
          >
            {/* Terminal Form */}
            <div className="tech-border bg-black/80 p-8">
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10 text-muted-foreground">
                <Command className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Transmit Encrypted Payload</span>
              </div>
              
              <div className="space-y-6 font-mono text-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] uppercase text-muted-foreground">Client ID [Name]</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] uppercase text-muted-foreground">Return Node [Email]</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-muted-foreground">Encrypted Message</label>
                  <textarea rows={5} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                </div>
                
                <button className="btn-tactical-primary w-full">
                  Execute Transmission
                </button>
              </div>
            </div>

            {/* Direct Nodes */}
            <div className="flex flex-col gap-4">
              <a href="mailto:contact@parthdoshi.me" className="tech-panel p-6 flex flex-col justify-center h-full group">
                <Mail className="w-6 h-6 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">SMTP Protocol</div>
                <div className="text-white font-medium group-hover:text-primary transition-colors">contact@parthdoshi.me</div>
              </a>
              
              <div className="grid grid-cols-2 gap-4 h-full">
                <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="tech-panel p-6 flex flex-col items-center justify-center text-center group">
                  <Github className="w-6 h-6 text-muted-foreground mb-3 group-hover:text-white transition-colors" />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Code Repo</div>
                </a>
                
                <a href="#" className="tech-panel p-6 flex flex-col items-center justify-center text-center group">
                  <Linkedin className="w-6 h-6 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-primary transition-colors">Network</div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
