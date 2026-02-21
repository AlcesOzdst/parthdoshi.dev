import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative border-t border-white/5 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel p-1 border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-[#050505] p-8 md:p-16 rounded-xl">
            <div className="text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-primary/20 bg-primary/5"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="font-mono text-xs text-primary uppercase tracking-widest">Connection Open</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6"
              >
                Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Handshake</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground font-light text-lg max-w-xl mx-auto"
              >
                Whether you need infrastructure secured, a resilient IoT system built, or are looking to expand your cybersecurity team, my inbox is open.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-12"
            >
              {/* Form Side */}
              <div className="space-y-4 font-mono">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider pl-1">Protocol / Subject</label>
                  <input type="text" placeholder="Project Inquiry" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider pl-1">Return Address / Email</label>
                  <input type="email" placeholder="you@enterprise.com" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider pl-1">Encrypted Payload / Message</label>
                  <textarea rows={4} placeholder="How can I help secure your next project?" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
                </div>
                <Button className="w-full h-12 bg-white text-black hover:bg-white/90 font-sans font-semibold text-sm uppercase tracking-widest rounded-md mt-4 group">
                  Transmit Payload <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Info Side */}
              <div className="flex flex-col justify-between p-6 rounded-lg bg-white/[0.02] border border-white/5">
                <div>
                  <h3 className="font-mono text-sm text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Direct Nodes</h3>
                  
                  <div className="space-y-6">
                    <a href="mailto:contact@parthdoshi.me" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase">Email</div>
                        <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">contact@parthdoshi.me</div>
                      </div>
                    </a>
                    
                    <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase">GitHub</div>
                        <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">github.com/AlcesOzdst</div>
                      </div>
                    </a>
                    
                    <a href="#" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase">LinkedIn</div>
                        <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">Connect Network</div>
                      </div>
                    </a>
                  </div>
                </div>
                
                <div className="mt-12 pt-6 border-t border-white/10 font-mono text-[10px] text-muted-foreground uppercase">
                  <span className="text-primary">Status:</span> Accepting new contract opportunities and full-time security engineering roles.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
