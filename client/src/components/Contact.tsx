export function Contact() {
  return (
    <section id="contact" className="py-8 border-t border-primary/20 border-dashed mb-20">
      <div className="container mx-auto px-4">

        <div className="text-sm md:text-base mb-6">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span> ssh admin@parthdoshi.dev
        </div>

        <div className="ml-4 text-sm text-muted-foreground mb-6">
          The authenticity of host 'parthdoshi.dev (192.168.1.1)' can't be established.<br />
          ED25519 key fingerprint is SHA256:vX2R7y/QwK9G+M4LzT1B5N8cE3H6A0JjPqWtZ.<br />
          Are you sure you want to continue connecting (yes/no/[fingerprint])? <span className="text-primary">yes</span><br />
          Warning: Permanently added 'parthdoshi.dev' (ED25519) to the list of known hosts.
        </div>

        <div className="ml-4 text-sm space-y-3">
          <div className="flex gap-4">
            <span className="text-accent w-20 shrink-0">EMAIL:</span>
            <a href="mailto:parthdoshi404@gmail.com" className="text-primary hover:underline transition-colors">parthdoshi404@gmail.com</a>
          </div>
          <div className="flex gap-4">
            <span className="text-accent w-20 shrink-0">GITHUB:</span>
            <a href="https://github.com/AlcesOzdst" target="_blank" rel="noreferrer" className="text-primary hover:underline transition-colors">github.com/AlcesOzdst</a>
          </div>
          <div className="flex gap-4">
            <span className="text-accent w-20 shrink-0">LINKEDIN:</span>
            <a href="https://linkedin.com/in/parthdoshi404" target="_blank" rel="noreferrer" className="text-primary hover:underline transition-colors">linkedin.com/in/parthdoshi404</a>
          </div>
          <div className="flex gap-4">
            <span className="text-accent w-20 shrink-0">WEBSITE:</span>
            <a href="https://alcesozdst.com" target="_blank" rel="noreferrer" className="text-primary hover:underline transition-colors">alcesozdst.com</a>
          </div>
          <div className="flex gap-4">
            <span className="text-accent w-20 shrink-0">PHONE:</span>
            <span className="text-primary">+91 77099 06201</span>
          </div>
          <div className="flex gap-4">
            <span className="text-accent w-20 shrink-0">LOCATION:</span>
            <span className="text-primary">Pune, Maharashtra, India</span>
          </div>
        </div>

        <div className="text-sm md:text-base mt-10 mb-2 flex items-center">
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
