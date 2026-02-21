import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-[#020202] border-t border-white/[0.02]">
      <div className="container mx-auto px-8 md:px-12 relative z-10">
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="w-[1px] h-24 bg-primary/50 mx-auto mb-12"></div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Initiate <span className="italic text-primary">Dialogue</span>
            </h2>
            <p className="font-sans text-muted-foreground font-light leading-relaxed text-lg max-w-2xl mx-auto">
              Ready to construct a legacy of uncompromised security? Whether securing enterprise networks or engineering physical safeguards, the next chapter begins here.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid lg:grid-cols-5 gap-12 lg:gap-24"
          >
            {/* Form Side */}
            <div className="lg:col-span-3 space-y-8 font-sans">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Subject of Inquiry</label>
                <input type="text" placeholder="Strategic Partnership" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Return Coordinates</label>
                <input type="email" placeholder="executive@enterprise.com" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Correspondence</label>
                <textarea rows={4} placeholder="Outline your vision..." className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg resize-none"></textarea>
              </div>
              <button className="btn-editorial w-full mt-8 text-center bg-white text-black hover:text-black border-white hover:bg-white/90">
                Transmit Securely
              </button>
            </div>

            {/* Noble Info Side */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="space-y-12">
                
                <a href="mailto:contact@parthdoshi.me" className="group block">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">Direct Channel</div>
                  <div className="text-xl font-serif text-white group-hover:text-primary transition-colors flex items-center gap-4">
                    <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    contact@parthdoshi.me
                  </div>
                </a>
                
                <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="group block">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">Open Source Legacy</div>
                  <div className="text-xl font-serif text-white group-hover:text-primary transition-colors flex items-center gap-4">
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    AlcesOzdst
                  </div>
                </a>
                
                <a href="#" className="group block">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">Professional Network</div>
                  <div className="text-xl font-serif text-white group-hover:text-primary transition-colors flex items-center gap-4">
                    <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    Connect via LinkedIn
                  </div>
                </a>

              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
