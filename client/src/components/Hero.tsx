import { useEffect, useState } from "react";

export function Hero() {
  const [text, setText] = useState("");
  const fullText =
    "Cybersecurity enthusiast & IoT Developer.\n" +
    "President of Hack-X Club at MITWPU.\n" +
    "Specializing in network defense, embedded systems, and threat intelligence.\n" +
    "Building infrastructure that doesn't break.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="pt-12 pb-8">
      <div className="container mx-auto px-4">

        <div className="mb-6 overflow-x-auto whitespace-pre text-xs sm:text-sm text-primary leading-none select-none">
          {`
  ____            _   _     ____            _     _ 
 |  _ \\ __ _ _ __| |_| |__ |  _ \\ ___  ___| |__ (_)
 | |_) / _\` | '__| __| '_ \\| | | / _ \\/ __| '_ \\| |
 |  __/ (_| | |  | |_| | | | |_| | (_) \\__ \\ | | | |
 |_|   \\__,_|_|   \\__|_| |_|____/ \\___/|___/_| |_|_|
                                                     
`}
        </div>

        <div className="text-sm md:text-base mb-6">
          <span className="text-primary font-bold">parth@root</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span> whoami
        </div>

        <div className="text-muted-foreground mb-8 ml-4 space-y-1">
          <p>Name: <span className="text-primary/80">Parth Doshi</span></p>
          <p>Role: <span className="text-primary/80">Cybersecurity Enthusiast & IoT Engineer</span></p>
          <p>Org:  <span className="text-primary/80">MITWPU, Pune — ECE (AI & ML)</span></p>
          <p>Club: <span className="text-accent">President @ Hack-X Club</span></p>
          <p>Status: <span className="text-green-400">● ACTIVE</span></p>
        </div>

        <div className="text-sm md:text-base mb-2">
          <span className="text-primary font-bold">parth@root</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span> cat mission_statement.txt
        </div>

        <div className="ml-4 max-w-3xl text-sm md:text-base whitespace-pre-wrap leading-relaxed">
          {text}
          <span className="terminal-cursor"></span>
        </div>

      </div>
    </section>
  );
}
