import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Zap } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-background border-t-2 border-primary/20 overflow-hidden">
      {/* Intense Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto glass-panel p-2">
          <div className="bg-[#030105] p-8 md:p-16 border border-white/5 relative overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>

            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6 px-6 py-2 border-2 border-accent bg-accent/10"
              >
                <Zap className="w-5 h-5 text-accent animate-pulse" />
                <span className="font-mono text-sm font-bold text-accent uppercase tracking-[0.2em]">Secure Channel Open</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase glow-text"
              >
                Establish <span className="text-primary">Connection</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground font-mono text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Seeking to fortify your infrastructure, build a resilient IoT product, or augment your cybersecurity team? Transmit your payload below.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid lg:grid-cols-[2fr_1fr] gap-12"
            >
              {/* Brutalist Form Side */}
              <div className="space-y-6 font-mono bg-black/50 p-8 border border-white/10">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-accent uppercase tracking-widest">Protocol [Subject]</label>
                  <input type="text" placeholder="Project Inquiry" className="w-full bg-black border-2 border-white/10 px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg shadow-inner" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-accent uppercase tracking-widest">Return Address [Email]</label>
                  <input type="email" placeholder="you@enterprise.com" className="w-full bg-black border-2 border-white/10 px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg shadow-inner" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-accent uppercase tracking-widest">Payload [Message]</label>
                  <textarea rows={5} placeholder="How can I help secure your next project?" className="w-full bg-black border-2 border-white/10 px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg shadow-inner resize-none"></textarea>
                </div>
                <button className="cyber-button w-full mt-4">
                  Transmit Data
                </button>
              </div>

              {/* Aggressive Info Side */}
              <div className="flex flex-col gap-6">
                <a href="mailto:contact@parthdoshi.me" className="flex items-center gap-6 p-6 bg-black/50 border-2 border-white/10 hover:border-primary hover:bg-primary/5 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-colors">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest mb-1">Email Node</div>
                    <div className="text-lg font-black text-white group-hover:text-primary transition-colors">contact@parthdoshi.me</div>
                  </div>
                </a>
                
                <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 bg-black/50 border-2 border-white/10 hover:border-accent hover:bg-accent/5 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-colors">
                    <Github className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest mb-1">GitHub Repo</div>
                    <div className="text-lg font-black text-white group-hover:text-accent transition-colors">AlcesOzdst</div>
                  </div>
                </a>
                
                <a href="#" className="flex items-center gap-6 p-6 bg-black/50 border-2 border-white/10 hover:border-white hover:bg-white/5 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                    <Linkedin className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest mb-1">LinkedIn</div>
                    <div className="text-lg font-black text-white group-hover:drop-shadow-[0_0_8px_white] transition-all">Connect</div>
                  </div>
                </a>

                <div className="mt-auto p-6 border-l-4 border-primary bg-primary/10 font-mono text-sm font-bold text-primary uppercase tracking-widest">
                  Status: Available for hire
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
