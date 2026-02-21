import bgImage from "@/assets/images/cyber-bg.png";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={bgImage} alt="Cyber background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <div className="inline-block border border-primary/30 bg-primary/10 px-3 py-1 mb-6 font-mono text-primary text-sm uppercase tracking-widest" data-testid="text-status">
            System Online // User: Parth Doshi
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none text-foreground">
            Architecting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Secure</span> Futures
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl font-mono">
            Cybersecurity & IoT Developer. Building resilient networks, intelligent devices, and secure platforms.
          </p>
          <div className="flex gap-4">
            <Button className="rounded-none font-mono uppercase tracking-widest bg-primary text-black hover:bg-primary/90" size="lg" data-testid="button-contact">
              Initialize Contact
            </Button>
            <Button variant="outline" className="rounded-none font-mono uppercase tracking-widest border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" size="lg" data-testid="button-logs">
              View Logs
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
           <div className="relative w-64 h-64 md:w-96 md:h-96 border border-border flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
             {/* Decorative element */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary"></div>
             <div className="font-mono text-6xl text-border opacity-50 mb-4 tracking-widest" data-testid="text-wasd">
               W A S D
             </div>
             <div className="font-mono text-xs text-primary/70 uppercase tracking-widest">
               [ Navigate / Explore ]
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
