import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-white/5 py-8 text-center font-mono text-xs text-muted-foreground bg-black flex flex-col items-center justify-center">
        <div className="flex gap-2 mb-2">
          <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
        </div>
        <p>SYSTEM.LOG("© {new Date().getFullYear()} Parth Doshi. Secure Session Terminated.")</p>
      </footer>
    </div>
  );
}
