import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Suricata IDS",
    description: "Lightweight intrusion detection on Raspberry Pi 5.",
    tags: ["Cybersecurity", "Raspberry Pi", "Network"],
  },
  {
    title: "DDoS Toolkit",
    description: "Network hardening through simulation and load testing.",
    tags: ["Security", "Python", "Networking"],
  },
  {
    title: "Project Omnis",
    description: "AI-driven cybersecurity platform — SIH 2025.",
    tags: ["AI", "Security", "Platform"],
  },
  {
    title: "Fire Detection",
    description: "IoT-based fire detection & auto-extinguisher.",
    tags: ["IoT", "Hardware", "Sensors"],
  },
  {
    title: "IoT Home Auto",
    description: "Smart home control with ESP8266 microcontrollers.",
    tags: ["IoT", "ESP8266", "C++"],
  },
  {
    title: "Noise Indicator",
    description: "Sound-reactive LED circuit design for decibel monitoring.",
    tags: ["Hardware", "Circuit Design", "LED"],
  }
];

export function Projects() {
  return (
    <section id="work" className="py-24 border-t border-border bg-black/50">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-primary uppercase">Archive.Logs</h2>
            <p className="font-mono text-muted-foreground mt-2 uppercase text-sm">Projects that reflect how I build, solve, and think.</p>
          </div>
          <div className="hidden md:block font-mono text-xs text-border">
            [QUERY: SELECT * FROM PROJECTS]
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Card key={i} className="rounded-none border-border bg-card/50 hover:border-primary/50 transition-colors group relative overflow-hidden" data-testid={`card-project-${i}`}>
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500 ease-out"></div>
              <CardHeader>
                <CardTitle className="font-mono text-xl text-foreground group-hover:text-primary transition-colors">{p.title}</CardTitle>
                <CardDescription className="font-sans text-muted-foreground mt-2 leading-relaxed">{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map(t => (
                    <Badge key={t} variant="outline" className="rounded-none font-mono text-xs border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-primary/80 transition-colors">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
