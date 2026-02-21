export function Contact() {
  return (
    <section id="contact" className="py-8 border-t border-primary/20 border-dashed mb-20">
      <div className="container mx-auto px-4">
        
        <div className="text-sm md:text-base mb-6">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span> ssh admin@parthdoshi.me
        </div>

        <div className="ml-4 text-sm text-muted-foreground mb-6">
          The authenticity of host 'parthdoshi.me (192.168.1.1)' can't be established.<br/>
          ED25519 key fingerprint is SHA256:vX2R7y/QwK9G+M4LzT1B5N8cE3H6A0JjPqWtZ.<br/>
          Are you sure you want to continue connecting (yes/no/[fingerprint])? <span className="text-primary">yes</span><br/>
          Warning: Permanently added 'parthdoshi.me' (ED25519) to the list of known hosts.
        </div>

        <div className="ml-4 text-sm space-y-2">
          <div className="flex gap-4">
            <span className="text-accent w-20">EMAIL:</span>
            <a href="mailto:contact@parthdoshi.me" className="text-primary hover:underline">contact@parthdoshi.me</a>
          </div>
          <div className="flex gap-4">
            <span className="text-accent w-20">GITHUB:</span>
            <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="text-primary hover:underline">github.com/AlcesOzdst</a>
          </div>
          <div className="flex gap-4">
            <span className="text-accent w-20">LINKEDIN:</span>
            <a href="#" className="text-primary hover:underline">linkedin.com/in/parthdoshi</a>
          </div>
        </div>

        <div className="text-sm md:text-base mt-8 mb-2 flex items-center">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <span className="terminal-cursor"></span>
        </div>

      </div>
    </section>
  );
}
