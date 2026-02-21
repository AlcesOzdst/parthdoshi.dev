import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Projects />
      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground bg-black/80">
        <p>SYSTEM.LOG("© {new Date().getFullYear()} Parth Doshi. Connection Terminated.")</p>
      </footer>
    </div>
  );
}
