import { Nav } from "@/components/Nav";
import { Link } from "wouter";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
            <Nav />
            <main className="container mx-auto px-4 py-20">
                <div className="font-mono text-sm">
                    <div className="mb-6">
                        <span className="text-primary font-bold">guest@parthdoshi</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white">$</span> cd /unknown-path
                    </div>

                    <div className="ml-4 mb-8">
                        <p className="text-destructive mb-2">bash: cd: /unknown-path: No such file or directory</p>
                        <p className="text-muted-foreground">ERROR 404 — The requested resource was not found on this server.</p>
                    </div>

                    <div className="mb-4">
                        <span className="text-primary font-bold">guest@parthdoshi</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white">$</span> <span className="text-accent">suggestion:</span> try one of these
                    </div>

                    <div className="ml-4 space-y-1 text-muted-foreground">
                        <Link href="/">
                            <a className="block hover:text-primary transition-colors">→ cd ~ <span className="text-primary/60"># go home</span></a>
                        </Link>
                        <Link href="/blog">
                            <a className="block hover:text-primary transition-colors">→ cd ~/blog <span className="text-primary/60"># read articles</span></a>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center">
                        <span className="text-primary font-bold">guest@parthdoshi</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white">$</span>
                        <span className="terminal-cursor"></span>
                    </div>
                </div>
            </main>
        </div>
    );
}
