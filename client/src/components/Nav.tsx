import { Link } from "wouter";

export function Nav() {
  return (
    <nav className="fixed top-0 w-full border-b border-border/50 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-mono text-xl font-bold tracking-tighter text-primary glitch-effect" data-text="PD">PD</div>
        <div className="flex gap-6 font-mono text-sm">
          <a href="#work" className="hover:text-primary transition-colors uppercase" data-testid="link-work">Work</a>
          <a href="#skills" className="hover:text-primary transition-colors uppercase" data-testid="link-skills">Skills</a>
          <a href="#about" className="hover:text-primary transition-colors uppercase" data-testid="link-about">About</a>
        </div>
      </div>
    </nav>
  );
}
