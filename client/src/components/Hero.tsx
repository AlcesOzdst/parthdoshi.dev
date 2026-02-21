import { useEffect, useState } from "react";

export function Hero() {
  const [text, setText] = useState("");
  const fullText = "Cybersecurity Engineer & IoT Developer.\nSpecializing in network defense, hardware automation, and threat intelligence.\nBuilding infrastructure that doesn't break.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 20); // Fast typing speed
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
        
        <div className="text-muted-foreground mb-8 ml-4">
          <p>Name: Parth Doshi</p>
          <p>Role: Security Architect & IoT Engineer</p>
          <p>Status: ACTIVE</p>
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
